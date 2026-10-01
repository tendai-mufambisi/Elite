// Dashboard reads and writes. Every exported function expects requireAdmin() to have run.
// Images are referenced by slot: built-in slots (images.ts) are never deleted; uploaded
// slots (the `media` table) are removed from R2 as soon as nothing uses them any more.
import type { D1Database, R2Bucket } from "@cloudflare/workers-types";
import { getDb, getMedia } from "./bindings.server";
import { HttpError, getSetting, setSetting } from "./auth.server";
import { projectCategories } from "./content";
import { getImage, getVideo, hasImage, isVideoSlot } from "./images";
import { settingDefaults, type SettingKey } from "./live";
import { pagePhotoSpots } from "./page-photos";

const IMAGE_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/avif": "avif",
};
const MAX_IMAGE_BYTES = 10 * 1024 * 1024;
const MAX_PDF_BYTES = 25 * 1024 * 1024;

type Ctx = { db: D1Database; media: R2Bucket };
type BodyKey =
  "title" | "category" | "short" | "intro" | "benefits" | "finishes" | "faqs" | "label";
/** A parsed JSON request body; known fields are named so they can be read with dot access. */
export type Body = Partial<Record<BodyKey, unknown>> & Record<string, unknown>;
export const ctx = (request: Request): Ctx => ({ db: getDb(request), media: getMedia(request) });

const text = (value: unknown, max = 5000) =>
  (typeof value === "string" ? value : "").replace(/\r\n/g, "\n").trim().slice(0, max);

// ---------------------------------------------------------------------------------------
// Images
// ---------------------------------------------------------------------------------------

type MediaRow = { slot: string; src: string; alt: string; width: number; height: number };

/** Thumbnail info for any slot, built-in or uploaded. */
async function describe(db: D1Database, slots: string[]) {
  const unique = [...new Set(slots.filter(Boolean))];
  const uploaded = new Map<string, MediaRow>();
  const ids = unique.filter((s) => s.startsWith("upload-"));
  if (ids.length) {
    const { results } = await db
      .prepare(
        `SELECT slot, src, alt, width, height FROM media WHERE slot IN (${ids.map(() => "?").join(",")})`,
      )
      .bind(...ids)
      .all<MediaRow>();
    for (const row of results) uploaded.set(row.slot, row);
  }
  return (slot: string) => {
    const up = uploaded.get(slot);
    if (up) return { slot, src: up.src, alt: up.alt, video: false };
    if (isVideoSlot(slot)) {
      const v = getVideo(slot);
      return { slot, src: v.poster, alt: v.title, video: true };
    }
    if (hasImage(slot)) {
      const i = getImage(slot);
      return { slot, src: i.src, alt: i.alt, video: false };
    }
    return { slot, src: "", alt: "Missing photo", video: false };
  };
}

/** Validates and stores an uploaded image, returning its new slot. */
async function storeImage({ db, media }: Ctx, form: FormData, folder: string, alt: string) {
  const file = form.get("file");
  if (!(file instanceof File)) throw new HttpError(400, "Please choose a photo to upload.");
  const ext = IMAGE_TYPES[file.type];
  if (!ext) throw new HttpError(400, "Please upload a JPG, PNG, WebP or AVIF photo.");
  if (file.size === 0) throw new HttpError(400, "That file is empty. Please choose another photo.");
  if (file.size > MAX_IMAGE_BYTES) {
    throw new HttpError(400, "That image is larger than 10 MB. Please resize it and try again.");
  }
  const width = Math.max(0, Math.round(Number(form.get("width")) || 0));
  const height = Math.max(0, Math.round(Number(form.get("height")) || 0));
  const id = crypto.randomUUID();
  const key = `${folder}/${id}.${ext}`;
  await media.put(key, await file.arrayBuffer(), { httpMetadata: { contentType: file.type } });
  const slot = `upload-${id}`;
  await db
    .prepare("INSERT INTO media (slot, r2_key, src, alt, width, height) VALUES (?, ?, ?, ?, ?, ?)")
    .bind(
      slot,
      key,
      `/media/${key}`,
      text(form.get("alt"), 300) || alt,
      width || 1600,
      height || 1200,
    )
    .run();
  return slot;
}

/** Deletes uploaded slots (R2 object + row) that nothing references any more. */
async function removeOrphans({ db, media }: Ctx, slots: string[]) {
  for (const slot of new Set(slots)) {
    if (!slot.startsWith("upload-")) continue;
    const used = await db
      .prepare(
        `SELECT 1 FROM project_images WHERE slot = ?1
         UNION ALL SELECT 1 FROM projects WHERE cover = ?1
         UNION ALL SELECT 1 FROM service_images WHERE slot = ?1
         UNION ALL SELECT 1 FROM services WHERE cover = ?1 OR banner = ?1
         UNION ALL SELECT 1 FROM page_photos WHERE slot = ?1 LIMIT 1`,
      )
      .bind(slot)
      .first();
    if (used) continue;
    const row = await db
      .prepare("SELECT r2_key FROM media WHERE slot = ?")
      .bind(slot)
      .first<{ r2_key: string }>();
    if (row) await media.delete(row.r2_key);
    await db.prepare("DELETE FROM media WHERE slot = ?").bind(slot).run();
  }
}

/** Moves one row up or down by renumbering the whole list, so gaps or ties never stick. */
async function move(
  db: D1Database,
  table: string,
  id: number,
  dir: number,
  scope?: [string, number],
) {
  const where = scope ? `WHERE ${scope[0]} = ?` : "";
  const stmt = db.prepare(`SELECT id FROM ${table} ${where} ORDER BY position, id`);
  const { results } = await (scope ? stmt.bind(scope[1]) : stmt).all<{ id: number }>();
  const ids = results.map((r) => r.id);
  const from = ids.indexOf(id);
  const to = from + (dir < 0 ? -1 : 1);
  if (from < 0 || to < 0 || to >= ids.length) return;
  [ids[from], ids[to]] = [ids[to]!, ids[from]!];
  await db.batch(
    ids.map((rowId, i) =>
      db.prepare(`UPDATE ${table} SET position = ? WHERE id = ?`).bind(i + 1, rowId),
    ),
  );
}

const nextPosition = async (db: D1Database, table: string, scope?: [string, number]) => {
  const where = scope ? `WHERE ${scope[0]} = ?` : "";
  const stmt = db.prepare(`SELECT COALESCE(MAX(position), 0) + 1 AS n FROM ${table} ${where}`);
  return (await (scope ? stmt.bind(scope[1]) : stmt).first<{ n: number }>())?.n ?? 1;
};

// ---------------------------------------------------------------------------------------
// Dashboard
// ---------------------------------------------------------------------------------------

export async function overview({ db }: Ctx) {
  const [counts, recent] = await db.batch<
    Record<"projects" | "services" | "photos" | "pdf", unknown>
  >([
    db.prepare(
      `SELECT (SELECT COUNT(*) FROM projects) AS projects, (SELECT COUNT(*) FROM services) AS services,
       (SELECT COUNT(*) FROM page_photos) AS photos,
       (SELECT value FROM settings WHERE key = 'company_profile_pdf') AS pdf`,
    ),
    db.prepare(
      "SELECT id, title, category, cover FROM projects ORDER BY created_at DESC, id DESC LIMIT 5",
    ),
  ]);
  const c = counts!.results[0]!;
  const recentRows = recent!.results as unknown as {
    id: number;
    title: string;
    category: string;
    cover: string;
  }[];
  const look = await describe(
    db,
    recentRows.map((r) => r.cover),
  );
  return {
    projects: Number(c.projects),
    services: Number(c.services),
    photos: Number(c.photos),
    companyProfile: Boolean(c.pdf),
    recent: recentRows.map((r) => ({ ...r, image: look(r.cover) })),
  };
}

// ---------------------------------------------------------------------------------------
// Projects
// ---------------------------------------------------------------------------------------

const categories = projectCategories.filter((c) => c !== "All") as string[];
const category = (value: unknown) => {
  const c = text(value, 80);
  if (!categories.includes(c)) throw new HttpError(400, "Please choose a category.");
  return c;
};

export async function listProjects({ db }: Ctx) {
  const { results } = await db
    .prepare(
      `SELECT p.id, p.title, p.category, p.cover, (SELECT COUNT(*) FROM project_images i WHERE i.project_id = p.id) AS photos
       FROM projects p ORDER BY p.position, p.id`,
    )
    .all<{ id: number; title: string; category: string; cover: string; photos: number }>();
  const look = await describe(
    db,
    results.map((r) => r.cover),
  );
  return { categories, items: results.map((r) => ({ ...r, image: look(r.cover) })) };
}

export async function getProject({ db }: Ctx, id: number) {
  const project = await db
    .prepare("SELECT id, title, category, cover FROM projects WHERE id = ?")
    .bind(id)
    .first<{ id: number; title: string; category: string; cover: string }>();
  if (!project) throw new HttpError(404, "That project no longer exists.");
  const { results } = await db
    .prepare("SELECT id, slot FROM project_images WHERE project_id = ? ORDER BY position, id")
    .bind(id)
    .all<{ id: number; slot: string }>();
  const look = await describe(
    db,
    results.map((r) => r.slot),
  );
  return {
    ...project,
    categories,
    images: results.map((r) => ({ id: r.id, ...look(r.slot), cover: r.slot === project.cover })),
  };
}

export async function createProject({ db }: Ctx, body: Body) {
  const title = text(body.title, 200);
  if (!title) throw new HttpError(400, "Please give the project a caption.");
  // New projects go first, so the newest work leads the Projects page.
  await db.prepare("UPDATE projects SET position = position + 1").run();
  const row = await db
    .prepare("INSERT INTO projects (title, category, position) VALUES (?, ?, 1) RETURNING id")
    .bind(title, category(body.category))
    .first<{ id: number }>();
  return { id: row!.id };
}

export async function updateProject({ db }: Ctx, id: number, body: Body) {
  const title = text(body.title, 200);
  if (!title) throw new HttpError(400, "Please give the project a caption.");
  await db
    .prepare("UPDATE projects SET title = ?, category = ? WHERE id = ?")
    .bind(title, category(body.category), id)
    .run();
}

export async function deleteProject(c: Ctx, id: number) {
  const { results } = await c.db
    .prepare("SELECT slot FROM project_images WHERE project_id = ?")
    .bind(id)
    .all<{ slot: string }>();
  await c.db.batch([
    c.db.prepare("DELETE FROM project_images WHERE project_id = ?").bind(id),
    c.db.prepare("DELETE FROM projects WHERE id = ?").bind(id),
  ]);
  await removeOrphans(
    c,
    results.map((r) => r.slot),
  );
}

export const moveProject = (c: Ctx, id: number, dir: number) => move(c.db, "projects", id, dir);

export async function addProjectImage(c: Ctx, id: number, form: FormData) {
  const project = await c.db
    .prepare("SELECT title, cover FROM projects WHERE id = ?")
    .bind(id)
    .first<{ title: string; cover: string }>();
  if (!project) throw new HttpError(404, "That project no longer exists.");
  const slot = await storeImage(c, form, `projects/${id}`, project.title);
  const position = await nextPosition(c.db, "project_images", ["project_id", id]);
  const stmts = [
    c.db
      .prepare("INSERT INTO project_images (project_id, slot, position) VALUES (?, ?, ?)")
      .bind(id, slot, position),
  ];
  // The first photo becomes the cover automatically.
  if (!project.cover)
    stmts.push(c.db.prepare("UPDATE projects SET cover = ? WHERE id = ?").bind(slot, id));
  await c.db.batch(stmts);
}

export async function setProjectCover({ db }: Ctx, id: number, imageId: number) {
  const image = await db
    .prepare("SELECT slot FROM project_images WHERE id = ? AND project_id = ?")
    .bind(imageId, id)
    .first<{ slot: string }>();
  if (!image) throw new HttpError(404, "That photo no longer exists.");
  await db.prepare("UPDATE projects SET cover = ? WHERE id = ?").bind(image.slot, id).run();
}

export async function deleteProjectImage(c: Ctx, id: number, imageId: number) {
  const image = await c.db
    .prepare("SELECT slot FROM project_images WHERE id = ? AND project_id = ?")
    .bind(imageId, id)
    .first<{ slot: string }>();
  if (!image) return;
  await c.db.prepare("DELETE FROM project_images WHERE id = ?").bind(imageId).run();
  // Deleting the cover promotes the next photo.
  const project = await c.db
    .prepare("SELECT cover FROM projects WHERE id = ?")
    .bind(id)
    .first<{ cover: string }>();
  if (project?.cover === image.slot) {
    const next = await c.db
      .prepare("SELECT slot FROM project_images WHERE project_id = ? ORDER BY position, id LIMIT 1")
      .bind(id)
      .first<{ slot: string }>();
    await c.db
      .prepare("UPDATE projects SET cover = ? WHERE id = ?")
      .bind(next?.slot ?? "", id)
      .run();
  }
  await removeOrphans(c, [image.slot]);
}

export const moveProjectImage = (c: Ctx, id: number, imageId: number, dir: number) =>
  move(c.db, "project_images", imageId, dir, ["project_id", id]);

// ---------------------------------------------------------------------------------------
// Services
// ---------------------------------------------------------------------------------------

export async function listServices({ db }: Ctx) {
  const { results } = await db
    .prepare(
      `SELECT s.id, s.slug, s.title, s.short, s.cover, (SELECT COUNT(*) FROM service_images i WHERE i.service_id = s.id) AS photos
       FROM services s ORDER BY s.position, s.id`,
    )
    .all<{
      id: number;
      slug: string;
      title: string;
      short: string;
      cover: string;
      photos: number;
    }>();
  const look = await describe(
    db,
    results.map((r) => r.cover),
  );
  return { items: results.map((r) => ({ ...r, image: r.cover ? look(r.cover) : null })) };
}

type ServiceRow = {
  id: number;
  slug: string;
  title: string;
  short: string;
  intro: string;
  benefits: string;
  finishes: string;
  faqs: string;
  cover: string;
  banner: string;
};

export async function getService({ db }: Ctx, id: number) {
  const service = await db
    .prepare(
      "SELECT id, slug, title, short, intro, benefits, finishes, faqs, cover, banner FROM services WHERE id = ?",
    )
    .bind(id)
    .first<ServiceRow>();
  if (!service) throw new HttpError(404, "That service no longer exists.");
  const { results } = await db
    .prepare(
      "SELECT id, slot, label FROM service_images WHERE service_id = ? ORDER BY position, id",
    )
    .bind(id)
    .all<{ id: number; slot: string; label: string }>();
  const look = await describe(db, [service.cover, service.banner, ...results.map((r) => r.slot)]);
  return {
    ...service,
    coverImage: service.cover ? look(service.cover) : null,
    bannerImage: service.banner ? look(service.banner) : null,
    images: results.map((r) => ({ id: r.id, label: r.label, ...look(r.slot) })),
  };
}

export async function updateService({ db }: Ctx, id: number, body: Body) {
  const title = text(body.title, 120);
  if (!title) throw new HttpError(400, "Please give the service a title.");
  await db
    .prepare(
      "UPDATE services SET title = ?, short = ?, intro = ?, benefits = ?, finishes = ?, faqs = ? WHERE id = ?",
    )
    .bind(
      title,
      text(body.short, 200),
      text(body.intro, 3000),
      text(body.benefits, 3000),
      text(body.finishes, 1000),
      text(body.faqs, 10000),
      id,
    )
    .run();
}

export const moveService = (c: Ctx, id: number, dir: number) => move(c.db, "services", id, dir);

const serviceTitle = async (db: D1Database, id: number) => {
  const row = await db
    .prepare("SELECT title FROM services WHERE id = ?")
    .bind(id)
    .first<{ title: string }>();
  if (!row) throw new HttpError(404, "That service no longer exists.");
  return row.title;
};

/** Replaces the main photo or the banner with an upload. */
export async function setServicePhoto(c: Ctx, id: number, field: string, form: FormData) {
  if (field !== "cover" && field !== "banner") throw new HttpError(400, "Unknown photo.");
  const title = await serviceTitle(c.db, id);
  const old = await c.db
    .prepare(`SELECT ${field} AS slot FROM services WHERE id = ?`)
    .bind(id)
    .first<{ slot: string }>();
  const slot = await storeImage(c, form, `services/${id}`, title);
  await c.db.prepare(`UPDATE services SET ${field} = ? WHERE id = ?`).bind(slot, id).run();
  await removeOrphans(c, [old?.slot ?? ""]);
}

export async function addServiceImage(c: Ctx, id: number, form: FormData) {
  const title = await serviceTitle(c.db, id);
  const slot = await storeImage(c, form, `services/${id}`, title);
  const position = await nextPosition(c.db, "service_images", ["service_id", id]);
  await c.db
    .prepare("INSERT INTO service_images (service_id, slot, label, position) VALUES (?, ?, ?, ?)")
    .bind(id, slot, text(form.get("label"), 120), position)
    .run();
}

export async function updateServiceImage({ db }: Ctx, id: number, imageId: number, body: Body) {
  await db
    .prepare("UPDATE service_images SET label = ? WHERE id = ? AND service_id = ?")
    .bind(text(body.label, 120), imageId, id)
    .run();
}

/** "Use as main photo": the gallery photo also becomes the service's main photo. */
export async function useServiceImageAsCover(c: Ctx, id: number, imageId: number) {
  const image = await c.db
    .prepare("SELECT slot FROM service_images WHERE id = ? AND service_id = ?")
    .bind(imageId, id)
    .first<{ slot: string }>();
  if (!image) throw new HttpError(404, "That photo no longer exists.");
  const old = await c.db
    .prepare("SELECT cover FROM services WHERE id = ?")
    .bind(id)
    .first<{ cover: string }>();
  await c.db.prepare("UPDATE services SET cover = ? WHERE id = ?").bind(image.slot, id).run();
  await removeOrphans(c, [old?.cover ?? ""]);
}

export async function deleteServiceImage(c: Ctx, id: number, imageId: number) {
  const image = await c.db
    .prepare("SELECT slot FROM service_images WHERE id = ? AND service_id = ?")
    .bind(imageId, id)
    .first<{ slot: string }>();
  if (!image) return;
  await c.db.prepare("DELETE FROM service_images WHERE id = ?").bind(imageId).run();
  await removeOrphans(c, [image.slot]);
}

export const moveServiceImage = (c: Ctx, id: number, imageId: number, dir: number) =>
  move(c.db, "service_images", imageId, dir, ["service_id", id]);

// ---------------------------------------------------------------------------------------
// Page photos
// ---------------------------------------------------------------------------------------

export async function listPagePhotos({ db }: Ctx) {
  const { results } = await db
    .prepare("SELECT key, slot FROM page_photos")
    .all<{ key: string; slot: string }>();
  const chosen = new Map(results.map((r) => [r.key, r.slot]));
  const look = await describe(db, [...chosen.values(), ...pagePhotoSpots.map((s) => s.slot)]);
  return {
    items: pagePhotoSpots.map((spot) => {
      const slot = chosen.get(spot.key) || spot.slot;
      return { ...spot, image: look(slot), custom: slot !== spot.slot };
    }),
  };
}

const spot = (key: string) => {
  const found = pagePhotoSpots.find((s) => s.key === key);
  if (!found) throw new HttpError(404, "Unknown photo spot.");
  return found;
};

export async function setPagePhoto(c: Ctx, key: string, form: FormData) {
  const found = spot(key);
  const old = await c.db
    .prepare("SELECT slot FROM page_photos WHERE key = ?")
    .bind(key)
    .first<{ slot: string }>();
  const slot = await storeImage(c, form, "pages", `${found.group}: ${found.label}`);
  await c.db
    .prepare(
      "INSERT INTO page_photos (key, slot) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET slot = excluded.slot",
    )
    .bind(key, slot)
    .run();
  await removeOrphans(c, [old?.slot ?? ""]);
}

/** Puts the built-in photo back. */
export async function resetPagePhoto(c: Ctx, key: string) {
  const found = spot(key);
  const old = await c.db
    .prepare("SELECT slot FROM page_photos WHERE key = ?")
    .bind(key)
    .first<{ slot: string }>();
  await c.db
    .prepare(
      "INSERT INTO page_photos (key, slot) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET slot = excluded.slot",
    )
    .bind(key, found.slot)
    .run();
  await removeOrphans(c, [old?.slot ?? ""]);
}

// ---------------------------------------------------------------------------------------
// Settings
// ---------------------------------------------------------------------------------------

const editableSettings = Object.keys(settingDefaults).filter(
  (k) => k !== "company_profile_pdf",
) as SettingKey[];

export async function getSettings({ db }: Ctx) {
  const { results } = await db
    .prepare("SELECT key, value FROM settings WHERE key != 'admin_password_hash'")
    .all<{ key: string; value: string }>();
  const values = Object.fromEntries(results.map((r) => [r.key, r.value]));
  return {
    values: Object.fromEntries(editableSettings.map((k) => [k, values[k] ?? ""])),
    companyProfile: values["company_profile_pdf"] ?? "",
  };
}

export async function saveSettings({ db }: Ctx, body: Body) {
  const values = Object.fromEntries(editableSettings.map((k) => [k, text(body[k], 3000)]));
  const maps = values["maps_embed_url"] ?? "";
  if (maps && !maps.startsWith("https://www.google.com/maps/embed")) {
    throw new HttpError(
      400,
      "The map link must be a Google Maps embed link (Share > Embed a map > copy the src link).",
    );
  }
  const email = values["email"] ?? "";
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new HttpError(400, "Please enter a valid email address.");
  }
  await db.batch(
    Object.entries(values).map(([key, value]) =>
      db
        .prepare(
          "INSERT INTO settings (key, value, updated_at) VALUES (?, ?, datetime('now')) " +
            "ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at",
        )
        .bind(key, value),
    ),
  );
}

export async function setCompanyProfile({ db, media }: Ctx, form: FormData) {
  const file = form.get("file");
  if (!(file instanceof File)) throw new HttpError(400, "Please choose a PDF to upload.");
  if (file.type !== "application/pdf")
    throw new HttpError(400, "The company profile must be a PDF.");
  if (file.size === 0) throw new HttpError(400, "That file is empty. Please choose another PDF.");
  if (file.size > MAX_PDF_BYTES) {
    throw new HttpError(
      400,
      "That PDF is larger than 25 MB. Please make it smaller and try again.",
    );
  }
  const key = `docs/${crypto.randomUUID()}/elite-gutters-company-profile.pdf`;
  await media.put(key, await file.arrayBuffer(), {
    httpMetadata: {
      contentType: "application/pdf",
      contentDisposition: 'inline; filename="Elite Gutters - Company Profile.pdf"',
    },
  });
  const old = await getSetting(db, "company_profile_pdf");
  await setSetting(db, "company_profile_pdf", `/media/${key}`);
  if (old.startsWith("/media/")) await media.delete(old.slice("/media/".length));
}

export async function removeCompanyProfile({ db, media }: Ctx) {
  const old = await getSetting(db, "company_profile_pdf");
  await setSetting(db, "company_profile_pdf", "");
  if (old.startsWith("/media/")) await media.delete(old.slice("/media/".length));
}
