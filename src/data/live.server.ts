import { bindings } from "./bindings.server";
import type { LiveData, LiveProject, LiveService } from "./live";

type Column =
  | "key"
  | "value"
  | "slot"
  | "src"
  | "alt"
  | "width"
  | "height"
  | "id"
  | "title"
  | "category"
  | "cover"
  | "project_id"
  | "service_id"
  | "label"
  | "slug"
  | "short"
  | "intro"
  | "benefits"
  | "finishes"
  | "faqs"
  | "banner";
type Row = Partial<Record<Column, unknown>>;
const str = (v: unknown) => (typeof v === "string" ? v : v == null ? "" : String(v));
const num = (v: unknown) => (typeof v === "number" ? v : Number(v) || 0);

/** Everything the public site reads from D1, in one round of queries. null on any failure. */
export async function loadLiveData(): Promise<LiveData> {
  const db = bindings()?.DB;
  if (!db) return null;
  try {
    const [settings, media, projects, projectImages, services, serviceImages, pagePhotos] =
      await db.batch<Row>([
        db.prepare("SELECT key, value FROM settings WHERE key != 'admin_password_hash'"),
        db.prepare("SELECT slot, src, alt, width, height FROM media"),
        db.prepare("SELECT id, title, category, cover FROM projects ORDER BY position, id"),
        db.prepare("SELECT project_id, slot FROM project_images ORDER BY position, id"),
        db.prepare(
          "SELECT id, slug, title, short, intro, benefits, finishes, faqs, cover, banner FROM services ORDER BY position, id",
        ),
        db.prepare("SELECT service_id, slot, label FROM service_images ORDER BY position, id"),
        db.prepare("SELECT key, slot FROM page_photos"),
      ]);

    const imagesFor = new Map<number, string[]>();
    for (const r of projectImages!.results) {
      const id = num(r.project_id);
      imagesFor.set(id, [...(imagesFor.get(id) ?? []), str(r.slot)]);
    }
    const galleryFor = new Map<number, { slot: string; label: string }[]>();
    for (const r of serviceImages!.results) {
      const id = num(r.service_id);
      galleryFor.set(id, [
        ...(galleryFor.get(id) ?? []),
        { slot: str(r.slot), label: str(r.label) },
      ]);
    }

    return {
      settings: Object.fromEntries(settings!.results.map((r) => [str(r.key), str(r.value)])),
      media: media!.results.map((r) => ({
        slot: str(r.slot),
        src: str(r.src),
        alt: str(r.alt),
        width: num(r.width),
        height: num(r.height),
      })),
      projects: projects!.results.map((r): LiveProject => {
        const images = imagesFor.get(num(r.id)) ?? [];
        const cover = str(r.cover);
        // Cover first, then the rest in their saved order.
        const ordered =
          cover && images.includes(cover) ? [cover, ...images.filter((s) => s !== cover)] : images;
        return { id: num(r.id), title: str(r.title), category: str(r.category), images: ordered };
      }),
      services: services!.results.map((r): LiveService => ({
        slug: str(r.slug),
        title: str(r.title),
        short: str(r.short),
        intro: str(r.intro),
        benefits: str(r.benefits),
        finishes: str(r.finishes),
        faqs: str(r.faqs),
        cover: str(r.cover),
        banner: str(r.banner),
        gallery: galleryFor.get(num(r.id)) ?? [],
      })),
      pagePhotos: Object.fromEntries(pagePhotos!.results.map((r) => [str(r.key), str(r.slot)])),
    };
  } catch (error) {
    console.error("Live data unavailable, using fallback content", error);
    return null;
  }
}
