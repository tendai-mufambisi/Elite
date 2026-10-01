# Owner dashboard

The owner manages project photos, service pages, page photos and contact details from a
private dashboard at `/admin`. Changes go live as soon as they are saved; no redeploy.

## Signing in

- There is no visible "Admin" link. The way in is the **©** in the footer copyright line
  ("© 2026 Elite Gutters…"), which links to `/admin/login`. The address can also be typed in.
- Password only (one owner, no username).
- Sessions last **12 hours**, or **30 days** with "Keep me signed in" ticked (the default).
- Sign out from the bottom of the dashboard menu.
- After **5 wrong passwords** from the same connection, sign-in is blocked for **15 minutes**.

## What each section controls

| Section         | What it changes on the website                                                                                                                                                                                                                                |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Dashboard**   | Counts and the latest projects, with shortcuts.                                                                                                                                                                                                               |
| **Projects**    | The Projects page. Add a project (caption + category), add photos, set the cover, reorder with the arrows, delete. New projects appear first. Captions also label the home "Recent projects" tiles.                                                           |
| **Services**    | Each service page: title, short line, introduction, key benefits, finishes, questions and answers, main photo, banner and gallery (with optional labels shown on the home page service cards). The order here is the order in the menu, footer and home page. |
| **Page photos** | Fixed photos: home sections ("Our speciality", "Gutters that match", the six "Recent projects" tiles, the photo bands), the quote banner, page banners, the About photo and the founder photo. "Use original" puts the built-in photo back.                   |
| **Settings**    | Phone, WhatsApp number, email, Facebook, address and Google map (optional), founder name and bio, WhatsApp messages, the figures (years, jobs, satisfied clients), the company profile PDF, and the password.                                                 |

Layout, design, section order, the long-form pages (Why Seamless, Benefits, Commercial, About
text), drawings, gutter profiles, coverage map and videos stay in the code.

## Uploads

- Photos: JPG, PNG, WebP or AVIF, up to 10 MB. The dashboard shrinks them in the browser to
  at most 2000 px on the long side and saves them as WebP before uploading.
- Company profile: PDF only, up to 25 MB. When none is uploaded, the footer link is hidden.
- Uploads are stored in R2 and served from this site at `/media/...`. Replacing or deleting a
  photo also deletes the old file, so storage does not fill up.

## Changing or resetting the password

- **Change:** Settings › Change password (needs the current password; at least 8 characters).
- **Reset** (forgotten password): generate a new hash and store it in D1.

  ```sh
  node scripts/hash-password.mjs "new password"
  npx wrangler d1 execute elite-gutters --remote --command \
    "INSERT INTO settings (key, value) VALUES ('admin_password_hash', '<hash>') ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = datetime('now');"
  ```

- **First sign-in fallback:** if no password hash is stored yet, the value of the
  `ADMIN_SECRET` secret is accepted once and saved as the password. Change it straight away in
  Settings. Normally the real hash is seeded instead (above), so this is never needed.

Never put a plaintext password in a file, migration or chat.

## Cloudflare resources

| Binding        | Type          | Name                  | Used for                                                                       |
| -------------- | ------------- | --------------------- | ------------------------------------------------------------------------------ |
| `DB`           | D1 database   | `elite-gutters`       | Projects, services, page photos, settings, password hash, sign-in attempts     |
| `MEDIA`        | R2 bucket     | `elite-gutters-media` | Uploaded photos and the company profile PDF                                    |
| `ADMIN_SECRET` | Secret        | —                     | Signs session cookies only (not the password). Changing it signs everyone out. |
| `ASSETS`       | Static assets | —                     | The built site and the built-in photos in `public/`                            |

`wrangler.jsonc` is the single source of truth for the Worker name and bindings; the build
merges it into `.output/server/wrangler.json`. Migrations live in `migrations/`.

## How the site uses the data

The root route loads everything editable from D1 once per visit (`src/data/live.server.ts`).
Each value falls back to the built-in content in `src/data/content.ts`, so if D1 is unreachable
the site shows exactly what it showed before the dashboard existed. `migrations/0002_seed.sql`
is generated from that same content (`bun scripts/gen-seed.ts`).

## Commands

```sh
# Local: real local D1 + R2 (state kept in .wrangler/state). Needs ADMIN_SECRET in .dev.vars.
bun run db:migrate:local
bun run local                      # build + serve at http://localhost:8799

# Regenerate the seed after changing built-in content (before the first production migration)
bun scripts/gen-seed.ts

# Production (only when approved)
npx wrangler d1 create elite-gutters          # put the database_id into wrangler.jsonc
npx wrangler r2 bucket create elite-gutters-media
npx wrangler secret put ADMIN_SECRET --name elite-gutters   # long random string
bun run db:migrate:remote
# store the owner's password hash (see "Changing or resetting the password")
rm -rf .output && bun run build && npx wrangler deploy --config .output/server/wrangler.json
```

## Security notes

- One shared password; there are no user accounts and no audit log of who changed what.
- Every `/api/admin/*` request checks the signed session cookie on the server, and every
  change must come from this site's own pages (Origin check). The page redirects are only a
  convenience.
- The session cookie is `HttpOnly`, `Secure` and `SameSite=Lax`.
- The dashboard is hidden from search engines (`noindex` on every admin page, and
  `Disallow: /admin` and `/api/` in `robots.txt` for every crawler group).
