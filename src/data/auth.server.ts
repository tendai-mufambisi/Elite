// Owner sign-in. Web Crypto only (runs in Workers): no auth library, no user table.
//
// Password: PBKDF2-SHA256 stored in settings.admin_password_hash as
//   pbkdf2$<iterations>$<saltHex>$<hashHex>
// Session: stateless cookie "<expiryMs>.<HMAC-SHA256(expiryMs, ADMIN_SECRET) hex>".
// ADMIN_SECRET only signs cookies; it is not the password. Rotating it signs everyone out.
import type { D1Database } from "@cloudflare/workers-types";
import { bindings, getDb } from "./bindings.server";

export const COOKIE = "elite_admin";
const SHORT_SESSION_MS = 12 * 60 * 60 * 1000;
const LONG_SESSION_MS = 30 * 24 * 60 * 60 * 1000;
const PBKDF2_ITERATIONS = 100_000;
// Sign-in rate limit: this many failed attempts per IP within the window, then wait.
const MAX_FAILURES = 5;
const FAILURE_WINDOW_MS = 15 * 60 * 1000;

export const messages = {
  wrongPassword: "That password is not correct.",
  notConfigured: "Admin access is not configured on the server.",
  tooMany: "Too many attempts. Please wait 15 minutes and try again.",
};

const encoder = new TextEncoder();
const toHex = (bytes: ArrayBuffer | Uint8Array) =>
  [...new Uint8Array(bytes)].map((b) => b.toString(16).padStart(2, "0")).join("");
const fromHex = (hex: string): Uint8Array<ArrayBuffer> =>
  new Uint8Array((hex.match(/.{2}/g) ?? []).map((byte) => parseInt(byte, 16)));

/** Compares every character, so the time taken never reveals where two strings differ. */
export function constantTimeEqual(a: string, b: string): boolean {
  let diff = a.length ^ b.length;
  const length = Math.max(a.length, b.length);
  for (let i = 0; i < length; i++) diff |= (a.charCodeAt(i) || 0) ^ (b.charCodeAt(i) || 0);
  return diff === 0;
}

async function pbkdf2(password: string, salt: Uint8Array<ArrayBuffer>, iterations: number) {
  const key = await crypto.subtle.importKey("raw", encoder.encode(password), "PBKDF2", false, [
    "deriveBits",
  ]);
  const bits = await crypto.subtle.deriveBits(
    { name: "PBKDF2", hash: "SHA-256", salt, iterations },
    key,
    256,
  );
  return toHex(bits);
}

export async function hashPassword(password: string) {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  return `pbkdf2$${PBKDF2_ITERATIONS}$${toHex(salt)}$${await pbkdf2(password, salt, PBKDF2_ITERATIONS)}`;
}

/** Reads the iteration count from the stored string, so it can be raised without a migration. */
export async function verifyPassword(password: string, stored: string) {
  const [scheme, iterations, salt, hash] = stored.split("$");
  if (scheme !== "pbkdf2" || !iterations || !salt || !hash) return false;
  const actual = await pbkdf2(password, fromHex(salt), Number(iterations));
  return constantTimeEqual(actual, hash);
}

async function hmac(message: string, secret: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  return toHex(await crypto.subtle.sign("HMAC", key, encoder.encode(message)));
}

const adminSecret = (request?: Request) => bindings(request)?.ADMIN_SECRET || "";

async function createSessionCookie(secret: string, remember: boolean) {
  const maxAge = remember ? LONG_SESSION_MS : SHORT_SESSION_MS;
  const expiry = String(Date.now() + maxAge);
  const token = `${expiry}.${await hmac(expiry, secret)}`;
  return `${COOKIE}=${token}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=${Math.floor(maxAge / 1000)}`;
}

export const clearSessionCookie = () =>
  `${COOKIE}=; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=0`;

function readCookie(request: Request, name: string) {
  const header = request.headers.get("cookie") ?? "";
  for (const part of header.split(";")) {
    const [key, ...rest] = part.trim().split("=");
    if (key === name) return rest.join("=");
  }
  return "";
}

export async function isAuthenticated(request: Request): Promise<boolean> {
  const secret = adminSecret(request);
  const token = readCookie(request, COOKIE);
  if (!secret || !token) return false;
  const [expiry, signature] = token.split(".");
  if (!expiry || !signature) return false;
  const valid = constantTimeEqual(await hmac(expiry, secret), signature);
  return valid && Date.now() < Number(expiry);
}

export class HttpError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
  }
}

/** The real protection: every admin read and write calls this first. */
export async function requireAdmin(request: Request) {
  if (!(await isAuthenticated(request))) throw new HttpError(401, "Please sign in again.");
}

/** CSRF guard: state-changing requests must come from this site's own pages. */
export function requireSameOrigin(request: Request) {
  if (["GET", "HEAD", "OPTIONS"].includes(request.method)) return;
  const origin = request.headers.get("origin");
  if (!origin || origin !== new URL(request.url).origin) {
    throw new HttpError(403, "This request did not come from the dashboard.");
  }
}

export async function getSetting(db: D1Database, key: string) {
  const row = await db
    .prepare("SELECT value FROM settings WHERE key = ?")
    .bind(key)
    .first<{ value: string }>();
  return row?.value ?? "";
}

export async function setSetting(db: D1Database, key: string, value: string) {
  await db
    .prepare(
      "INSERT INTO settings (key, value, updated_at) VALUES (?, ?, datetime('now')) " +
        "ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at",
    )
    .bind(key, value)
    .run();
}

const clientIp = (request: Request) =>
  request.headers.get("cf-connecting-ip") ?? request.headers.get("x-forwarded-for") ?? "unknown";

/** Returns the Set-Cookie header on success. */
export async function signIn(request: Request, password: string, remember: boolean) {
  const secret = adminSecret(request);
  if (!secret) throw new HttpError(500, messages.notConfigured);
  const db = getDb(request);
  const ip = clientIp(request);
  const since = Date.now() - FAILURE_WINDOW_MS;

  const failures = await db
    .prepare("SELECT COUNT(*) AS n FROM login_attempts WHERE ip = ? AND at > ?")
    .bind(ip, since)
    .first<{ n: number }>();
  if ((failures?.n ?? 0) >= MAX_FAILURES) throw new HttpError(429, messages.tooMany);

  const stored = await getSetting(db, "admin_password_hash");
  let ok: boolean;
  if (stored) {
    ok = await verifyPassword(password, stored);
  } else {
    // First-login bootstrap: with no password saved yet, ADMIN_SECRET is accepted once and
    // immediately stored as a hash, so it stops working as a login.
    ok = constantTimeEqual(password, secret);
    if (ok) await setSetting(db, "admin_password_hash", await hashPassword(password));
  }

  if (!ok) {
    await db.batch([
      db.prepare("INSERT INTO login_attempts (ip, at) VALUES (?, ?)").bind(ip, Date.now()),
      db.prepare("DELETE FROM login_attempts WHERE at < ?").bind(since),
    ]);
    throw new HttpError(401, messages.wrongPassword);
  }
  await db.prepare("DELETE FROM login_attempts WHERE ip = ?").bind(ip).run();
  return createSessionCookie(secret, remember);
}

export async function changePassword(request: Request, current: string, next: string) {
  const db = getDb(request);
  if (next.length < 8) throw new HttpError(400, "The new password must be at least 8 characters.");
  if (next === current) throw new HttpError(400, "The new password must be different.");
  const stored = await getSetting(db, "admin_password_hash");
  if (!stored || !(await verifyPassword(current, stored))) {
    throw new HttpError(400, "The current password is not correct.");
  }
  await setSetting(db, "admin_password_hash", await hashPassword(next));
}
