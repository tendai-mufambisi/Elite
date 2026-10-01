// Hash an owner dashboard password for D1, in the same format the Worker verifies:
//   pbkdf2$<iterations>$<saltHex>$<hashHex>   (PBKDF2-SHA256, 16-byte salt, 256-bit hash)
//
// Usage:
//   node scripts/hash-password.mjs "new password"
// Then store it (remote = production):
//   npx wrangler d1 execute elite-gutters --remote --command \
//     "INSERT INTO settings (key, value) VALUES ('admin_password_hash', '<hash>')
//      ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = datetime('now');"
import { pbkdf2Sync, randomBytes } from "node:crypto";

const password = process.argv[2];
if (!password || password.length < 8) {
  console.error('Usage: node scripts/hash-password.mjs "password" (at least 8 characters)');
  process.exit(1);
}

const iterations = 100_000;
const salt = randomBytes(16);
const hash = pbkdf2Sync(password, salt, iterations, 32, "sha256");
console.log(`pbkdf2$${iterations}$${salt.toString("hex")}$${hash.toString("hex")}`);
