// The owner-editable part of the site, as loaded from D1 by the root route.
// Everything falls back to content.ts / images.ts: when D1 is unreachable (or a field is
// left empty) the site renders exactly what it rendered before the dashboard existed.
// Pure module: safe in the browser. The D1 queries live in live.server.ts.
import { useMatch } from "@tanstack/react-router";
import {
  founder,
  projects as fallbackProjects,
  services as fallbackServices,
  site,
  stats as fallbackStats,
  whatsappPopup,
  type ProjectCategory,
} from "./content";
import { pagePhotoDefault } from "./page-photos";
import { hasImage, isVideoSlot, registerUploads, type ImageSlot } from "./images";

export type LiveProject = {
  id: number;
  title: string;
  category: string;
  /** Image slots, cover first. */
  images: string[];
};

export type LiveService = {
  slug: string;
  title: string;
  short: string;
  intro: string;
  benefits: string;
  finishes: string;
  faqs: string;
  cover: string;
  banner: string;
  gallery: { slot: string; label: string }[];
};

/** What the root loader returns. null = D1 unavailable, use the fallback. */
export type LiveData = {
  settings: Record<string, string>;
  media: ImageSlot[];
  projects: LiveProject[];
  services: LiveService[];
  pagePhotos: Record<string, string>;
} | null;

// Settings keys and their fallback values. Empty values in D1 fall back to these, except
// the optional extras (address, map, company profile) where empty means "not shown".
export const settingDefaults = {
  phone: site.phone,
  whatsapp_number: site.whatsappNumber,
  email: site.email,
  facebook: site.facebook,
  address: "",
  maps_embed_url: "",
  company_profile_pdf: "",
  founder_name: founder.name,
  founder_bio: founder.bio.join("\n"),
  whatsapp_popup_text: whatsappPopup.text,
  quote_text: site.quoteText,
  stat_years: String(fallbackStats[0].value),
  stat_jobs: String(fallbackStats[1].value),
  stat_satisfaction: String(fallbackStats[2].value),
} as const;
export type SettingKey = keyof typeof settingDefaults;
const optionalSettings: SettingKey[] = ["address", "maps_embed_url", "company_profile_pdf"];

const lines = (text: string) =>
  text
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

/** FAQ text: question line, answer line(s), blank line between questions. */
export function parseFaqs(text: string): [string, string][] {
  return text
    .split(/\n\s*\n/)
    .map((block) => lines(block))
    .filter((b) => b.length >= 2)
    .map((b) => [b[0]!, b.slice(1).join(" ")]);
}
export const formatFaqs = (faqs: readonly (readonly [string, string])[]) =>
  faqs.map(([q, a]) => `${q}\n${a}`).join("\n\n");

type FallbackService = (typeof fallbackServices)[number];
type Overridden =
  "title" | "short" | "intro" | "benefits" | "finishes" | "faqs" | "image" | "gallery";
// Omit applied to each service shape separately, so `"drawing" in s` checks keep working.
type DistributiveOmit<T, K extends PropertyKey> = T extends unknown ? Omit<T, K> : never;
export type ResolvedService = DistributiveOmit<
  FallbackService,
  Overridden | "banner" | "photoLabels"
> & {
  title: string;
  short: string;
  intro: string;
  benefits: readonly string[];
  finishes: readonly string[];
  faqs: readonly (readonly [string, string])[];
  image: string | undefined;
  banner?: string;
  gallery: readonly string[];
  photoLabels?: Readonly<Record<string, string>>;
};

export type ResolvedProject = {
  id: number;
  slot: string;
  images: string[];
  category: ProjectCategory | string;
  caption: string;
  video: boolean;
};

function resolve(data: LiveData) {
  const setting = (key: SettingKey): string => {
    const value = data?.settings[key]?.trim() ?? "";
    if (value || optionalSettings.includes(key)) return value;
    return settingDefaults[key];
  };
  // A slot is only usable if it exists (built-in or uploaded); otherwise fall back.
  const usable = (slot: string | undefined, fallback: string) =>
    slot && (hasImage(slot) || isVideoSlot(slot)) ? slot : fallback;

  const whatsappNumber = setting("whatsapp_number").replace(/\D/g, "") || site.whatsappNumber;
  const quoteText = setting("quote_text");
  const phone = setting("phone");
  const liveSite = {
    ...site,
    phone,
    phoneHref: `tel:+${phone.replace(/\D/g, "")}`,
    whatsappNumber,
    email: setting("email"),
    facebook: setting("facebook"),
    quoteText,
    whatsapp: `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(quoteText)}`,
    address: setting("address"),
    mapsEmbedUrl: setting("maps_embed_url"),
    companyProfile: setting("company_profile_pdf"),
  };

  const statValue = (key: SettingKey, fallback: number) => {
    const n = Number(setting(key).replace(/[^\d.]/g, ""));
    return Number.isFinite(n) && n > 0 ? n : fallback;
  };
  const stats = fallbackStats.map((s, i) => ({
    ...s,
    value: statValue((["stat_years", "stat_jobs", "stat_satisfaction"] as const)[i]!, s.value),
  }));

  const projects: ResolvedProject[] = data
    ? data.projects
        .map((p) => {
          const images = p.images.filter((s) => hasImage(s) || isVideoSlot(s));
          const slot = images[0] ?? "";
          return {
            id: p.id,
            slot,
            images,
            category: p.category,
            caption: p.title,
            video: isVideoSlot(slot),
          };
        })
        .filter((p) => p.slot)
    : fallbackProjects.map((p, i) => ({
        id: i + 1,
        slot: p.slot,
        images: [p.slot],
        category: p.category,
        caption: p.caption,
        video: Boolean(p.video),
      }));

  // Services keep their code-only parts (drawings, methods, videos) and take the owner's
  // text and photos from D1, in the owner's order.
  const bySlug = new Map(data?.services.map((s) => [s.slug, s]) ?? []);
  const ordered = data
    ? [
        ...data.services
          .map((s) => fallbackServices.find((f) => f.slug === s.slug))
          .filter((f): f is FallbackService => Boolean(f)),
        ...fallbackServices.filter((f) => !bySlug.has(f.slug)),
      ]
    : [...fallbackServices];
  const services: ResolvedService[] = ordered.map((f) => {
    const s = bySlug.get(f.slug);
    if (!s) return f as ResolvedService;
    const gallery = s.gallery.filter((g) => hasImage(g.slot));
    const cover = s.cover && hasImage(s.cover) ? s.cover : undefined;
    return {
      ...f,
      title: s.title || f.title,
      short: s.short || f.short,
      intro: s.intro || f.intro,
      benefits: s.benefits ? lines(s.benefits) : f.benefits,
      finishes: lines(s.finishes),
      faqs: s.faqs ? parseFaqs(s.faqs) : f.faqs,
      image: cover,
      banner: s.banner && hasImage(s.banner) ? s.banner : "banner" in f ? f.banner : undefined,
      gallery: gallery.map((g) => g.slot),
      photoLabels: Object.fromEntries(gallery.filter((g) => g.label).map((g) => [g.slot, g.label])),
    } as ResolvedService;
  });

  return {
    live: Boolean(data),
    site: liveSite,
    founder: {
      ...founder,
      name: setting("founder_name"),
      bio: lines(setting("founder_bio")),
    },
    whatsappPopup: { ...whatsappPopup, text: setting("whatsapp_popup_text") },
    stats,
    projects,
    services,
    /** Image slot for a fixed photo spot (see page-photos.ts). */
    photo: (key: string) => usable(data?.pagePhotos[key], pagePhotoDefault(key)),
    whatsappLink: (text: string) =>
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`,
  };
}

export type Live = ReturnType<typeof resolve>;

const cache = new WeakMap<object, Live>();
let fallback: Live | undefined;

export function resolveLive(data: LiveData): Live {
  if (!data) return (fallback ??= resolve(null));
  let resolved = cache.get(data);
  if (!resolved) {
    // Uploaded photos must be known to getImage() before anything renders.
    registerUploads(data.media);
    resolved = resolve(data);
    cache.set(data, resolved);
  }
  return resolved;
}

/** Live site content for any component under the root route. */
export function useLive(): Live {
  const data = useMatch({ from: "__root__", select: (m) => m.loaderData as LiveData | undefined });
  return resolveLive(data ?? null);
}
