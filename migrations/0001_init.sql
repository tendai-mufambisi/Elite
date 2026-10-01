-- Owner dashboard schema. Images are referenced by "slot": either a built-in slot from
-- src/data/images.ts (files shipped in /public) or an uploaded slot from the `media` table
-- (files in R2, served at /media/<key>).

-- Key/value settings: contact details, founder, figures, company profile PDF, password hash.
CREATE TABLE settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL DEFAULT '',
  updated_at TEXT DEFAULT (datetime('now'))
);

-- Images uploaded from the dashboard.
CREATE TABLE media (
  slot TEXT PRIMARY KEY,
  r2_key TEXT NOT NULL,
  src TEXT NOT NULL,
  alt TEXT NOT NULL DEFAULT '',
  width INTEGER NOT NULL DEFAULT 0,
  height INTEGER NOT NULL DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now'))
);

-- Projects page. The cover is the first image unless another is set as cover.
CREATE TABLE projects (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL DEFAULT '',
  category TEXT NOT NULL DEFAULT '',
  cover TEXT NOT NULL DEFAULT '',
  position INTEGER NOT NULL DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now'))
);
CREATE INDEX projects_position ON projects (position, id);

CREATE TABLE project_images (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  project_id INTEGER NOT NULL,
  slot TEXT NOT NULL,
  position INTEGER NOT NULL DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now'))
);
CREATE INDEX project_images_position ON project_images (project_id, position, id);

-- Service pages. Bullet lists are one item per line; FAQs are "question" then "answer"
-- lines, with a blank line between questions.
CREATE TABLE services (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL DEFAULT '',
  short TEXT NOT NULL DEFAULT '',
  intro TEXT NOT NULL DEFAULT '',
  benefits TEXT NOT NULL DEFAULT '',
  finishes TEXT NOT NULL DEFAULT '',
  faqs TEXT NOT NULL DEFAULT '',
  cover TEXT NOT NULL DEFAULT '',
  banner TEXT NOT NULL DEFAULT '',
  position INTEGER NOT NULL DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now'))
);
CREATE INDEX services_position ON services (position, id);

CREATE TABLE service_images (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  service_id INTEGER NOT NULL,
  slot TEXT NOT NULL,
  label TEXT NOT NULL DEFAULT '',
  position INTEGER NOT NULL DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now'))
);
CREATE INDEX service_images_position ON service_images (service_id, position, id);

-- Fixed photo spots (page banners, home sections, founder). `key` names the spot in code;
-- `slot` is the image shown there.
CREATE TABLE page_photos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  key TEXT UNIQUE NOT NULL,
  slot TEXT NOT NULL DEFAULT '',
  position INTEGER NOT NULL DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now'))
);
CREATE INDEX page_photos_position ON page_photos (position, id);

-- Failed sign-ins, for rate limiting by IP.
CREATE TABLE login_attempts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  ip TEXT NOT NULL,
  at INTEGER NOT NULL
);
CREATE INDEX login_attempts_ip ON login_attempts (ip, at);
