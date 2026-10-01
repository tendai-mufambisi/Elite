import { getRequest } from "@tanstack/react-start/server";
import type { D1Database, R2Bucket } from "@cloudflare/workers-types";

export type Bindings = {
  DB: D1Database;
  MEDIA: R2Bucket;
  ADMIN_SECRET?: string;
};

type RuntimeRequest = Request & { runtime?: { cloudflare?: { env?: Partial<Bindings> } } };

/**
 * Under nitro's cloudflare preset the Worker env hangs off the request
 * (`request.runtime.cloudflare.env`), so bindings are only reachable during a request.
 * Returns undefined outside the Worker (e.g. `vite dev`), where the site uses its fallback.
 */
export function bindings(request?: Request): Partial<Bindings> | undefined {
  let req = request;
  if (!req) {
    try {
      req = getRequest();
    } catch {
      return undefined;
    }
  }
  return (req as RuntimeRequest | undefined)?.runtime?.cloudflare?.env;
}

export function getDb(request?: Request): D1Database {
  const db = bindings(request)?.DB;
  if (!db) throw new Error("D1 binding DB is not available. Check wrangler.jsonc.");
  return db;
}

export function getMedia(request?: Request): R2Bucket {
  const media = bindings(request)?.MEDIA;
  if (!media) throw new Error("R2 binding MEDIA is not available. Check wrangler.jsonc.");
  return media;
}
