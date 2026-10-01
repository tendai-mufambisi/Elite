-- The owner's dashboard password, as a PBKDF2 hash (never the password itself).
-- To change it later, see docs/admin-access.md.
INSERT INTO settings (key, value) VALUES
  ('admin_password_hash', 'pbkdf2$100000$220718eac6d3195b259f0fc1eae20121$69a7b22368fc74aa3f0d6c8f3b640b2a79ecc486eec21edae02abffc27f572a9')
ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = datetime('now');
