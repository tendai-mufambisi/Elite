import hero from "@/assets/hero-house.jpg";
import gutter from "@/assets/gutters-detail.jpg";
import bronze from "@/assets/bronze-home.jpg";
import balustrade from "@/assets/balustrade-home.jpg";

// Generated illustrative imagery. These are NOT photographs of client work, so while a
// slot uses one, the page shows the placeholder's own honest alt text.
const placeholders = {
  house: {
    src: hero,
    width: 1600,
    height: 1008,
    alt: "Illustrative image: contemporary double-storey home at dusk with dark roofline, glass balustrade and aluminium glazing",
  },
  gutter: {
    src: gutter,
    width: 1200,
    height: 912,
    alt: "Illustrative image: close view of a dark grey gutter and fascia on a modern roofline",
  },
  bronze: {
    src: bronze,
    width: 1200,
    height: 912,
    alt: "Illustrative image: patio with bronze-framed aluminium folding doors and matching downpipe",
  },
  balustrade: {
    src: balustrade,
    width: 1200,
    height: 912,
    alt: "Illustrative image: glass balcony balustrade with steel handrail and dark aluminium windows",
  },
} as const;
type PlaceholderKey = keyof typeof placeholders;

// TO SWAP IN REAL MEDIA: set `src` (e.g. '/media/fascia-stainless-01.jpg' in /public, or an
// imported asset) plus its real `width`/`height`. The `alt` below is then used as-is, so
// make sure it describes the actual photo.
export type ImageSlot = {
  slot: string;
  alt: string;
  placeholder: PlaceholderKey;
  src?: string;
  width?: number;
  height?: number;
};

export const images: ImageSlot[] = [
  {
    slot: "logo-main",
    alt: "Elite Gutters and Aluminium Products logo",
    placeholder: "house",
    src: "/logo.svg",
    width: 340,
    height: 92,
  },
  {
    slot: "hero-home",
    alt: "Modern home finished with seamless gutters, matched fascia boards and aluminium doors",
    placeholder: "house",
  },
  { slot: "og-default", alt: "Elite Gutters and Aluminium Products project", placeholder: "house" },

  // Home: matched finishes
  {
    slot: "matched-bronze-01",
    alt: "Bronze fascia boards matched with bronze aluminium folding doors",
    placeholder: "bronze",
  },
  {
    slot: "matched-charcoal-01",
    alt: "Charcoal gutters, charcoal fascia and a charcoal garage door on one home",
    placeholder: "gutter",
  },
  {
    slot: "matched-stainless-01",
    alt: "Stainless steel gutters with stainless pillar cladding and glass balustrades",
    placeholder: "balustrade",
  },

  // Seamless gutters
  {
    slot: "gutters-charcoal-01",
    alt: "Charcoal seamless gutters and downpipes on a modern home",
    placeholder: "gutter",
  },
  {
    slot: "gutters-stainless-01",
    alt: "Stainless steel seamless gutters on a roofline",
    placeholder: "house",
  },
  {
    slot: "gutters-bronze-01",
    alt: "Bronze colour-coated gutters and downpipes",
    placeholder: "bronze",
  },
  {
    slot: "gutters-downpipe-01",
    alt: "Matching downpipe running from a seamless gutter",
    placeholder: "bronze",
  },
  {
    slot: "gutters-roofline-01",
    alt: "Long seamless gutter run along a roofline",
    placeholder: "balustrade",
  },

  // Fascia boards
  {
    slot: "fascia-bronze-01",
    alt: "Bronze fascia boards on a contemporary home",
    placeholder: "bronze",
  },
  {
    slot: "fascia-stainless-01",
    alt: "Stainless steel fascia boards on a modern home",
    placeholder: "house",
  },
  {
    slot: "fascia-charcoal-01",
    alt: "Charcoal fascia boards with matching gutters",
    placeholder: "gutter",
  },
  {
    slot: "fascia-matched-01",
    alt: "Fascia boards and gutters finished in the same colour",
    placeholder: "balustrade",
  },
  {
    slot: "fascia-detail-01",
    alt: "Close-up of a fascia board corner detail",
    placeholder: "gutter",
  },

  // Pillar cladding
  {
    slot: "pillar-stainless-01",
    alt: "Stainless steel pillar cladding on a modern entrance",
    placeholder: "house",
  },
  {
    slot: "pillar-entrance-01",
    alt: "Clad pillars framing a front entrance",
    placeholder: "balustrade",
  },
  {
    slot: "pillar-patio-01",
    alt: "Stainless steel clad pillars on a covered patio",
    placeholder: "bronze",
  },
  {
    slot: "pillar-commercial-01",
    alt: "Pillar cladding on a commercial building frontage",
    placeholder: "house",
  },

  // Balustrades
  {
    slot: "balustrade-glass-01",
    alt: "Glass balustrade on a balcony overlooking a garden",
    placeholder: "balustrade",
  },
  {
    slot: "balustrade-steel-01",
    alt: "Stainless steel balustrade with horizontal rails",
    placeholder: "house",
  },
  {
    slot: "balustrade-staircase-01",
    alt: "Glass staircase balustrade with stainless steel handrail",
    placeholder: "balustrade",
  },
  {
    slot: "balustrade-balcony-01",
    alt: "First-floor balcony with frameless glass balustrade",
    placeholder: "house",
  },
  {
    slot: "balustrade-handrail-01",
    alt: "Stainless steel handrail detail",
    placeholder: "balustrade",
  },

  // Aluminium doors & windows
  {
    slot: "aluminium-folding-bronze-01",
    alt: "Bronze aluminium folding doors opening onto a patio",
    placeholder: "bronze",
  },
  {
    slot: "aluminium-windows-charcoal-01",
    alt: "Charcoal aluminium windows on a modern home",
    placeholder: "balustrade",
  },
  {
    slot: "aluminium-patio-folding-01",
    alt: "Aluminium patio folding doors fully open",
    placeholder: "bronze",
  },
  {
    slot: "aluminium-shopfront-01",
    alt: "Aluminium shopfront with large glass panels",
    placeholder: "house",
  },
  {
    slot: "aluminium-sliding-01",
    alt: "Floor-to-ceiling aluminium sliding doors",
    placeholder: "house",
  },

  // Garage doors
  { slot: "garage-double-01", alt: "Automated double aluminium garage door", placeholder: "house" },
  { slot: "garage-single-01", alt: "Single aluminium garage door", placeholder: "gutter" },
  {
    slot: "garage-charcoal-01",
    alt: "Charcoal garage door matched to charcoal gutters and fascia",
    placeholder: "gutter",
  },
  {
    slot: "garage-matched-01",
    alt: "Garage door finished to match the roofline",
    placeholder: "house",
  },

  // Burglar proofing
  {
    slot: "burglar-aluminium-01",
    alt: "Aluminium burglar proofing on modern windows",
    placeholder: "balustrade",
  },
  {
    slot: "burglar-glass-01",
    alt: "Glass burglar proofing on a sliding door",
    placeholder: "bronze",
  },
  {
    slot: "burglar-window-01",
    alt: "Discreet burglar proofing on a large window",
    placeholder: "house",
  },
  {
    slot: "burglar-door-01",
    alt: "Security door with aluminium burglar proofing",
    placeholder: "bronze",
  },

  // Commercial & industrial
  {
    slot: "commercial-hero",
    alt: "Seamless gutters on a large commercial roof",
    placeholder: "gutter",
  },
  {
    slot: "commercial-key-01",
    alt: "Wide-opening industrial gutter on a warehouse roof",
    placeholder: "gutter",
  },
  {
    slot: "commercial-warehouse-01",
    alt: "Seamless gutters along a warehouse roof",
    placeholder: "gutter",
  },
  {
    slot: "commercial-school-01",
    alt: "Gutters and fascia on a school building",
    placeholder: "house",
  },
  {
    slot: "commercial-office-01",
    alt: "Office building with matched gutters and aluminium windows",
    placeholder: "balustrade",
  },
  {
    slot: "commercial-shopfront-01",
    alt: "Aluminium shopfront at a shopping centre",
    placeholder: "bronze",
  },
  {
    slot: "commercial-factory-01",
    alt: "Downpipes and gutters on a factory",
    placeholder: "gutter",
  },

  // Projects gallery (captions and categories are in content.ts)
  { slot: "project-01", alt: "Charcoal seamless gutters and downpipes", placeholder: "gutter" },
  { slot: "project-02", alt: "Stainless steel gutters on a modern roofline", placeholder: "house" },
  { slot: "project-03", alt: "Wide-profile gutters on a large roof", placeholder: "gutter" },
  { slot: "project-04", alt: "Bronze gutters with matching downpipes", placeholder: "bronze" },
  { slot: "project-05", alt: "Bronze fascia boards with matched gutters", placeholder: "bronze" },
  { slot: "project-06", alt: "Charcoal fascia on a contemporary home", placeholder: "gutter" },
  { slot: "project-07", alt: "Stainless steel fascia boards", placeholder: "house" },
  { slot: "project-08", alt: "Fascia and gutters in one finish", placeholder: "balustrade" },
  {
    slot: "project-09",
    alt: "Stainless steel pillar cladding at an entrance",
    placeholder: "house",
  },
  { slot: "project-10", alt: "Clad patio pillars", placeholder: "bronze" },
  {
    slot: "project-11",
    alt: "Pillar cladding on a commercial frontage",
    placeholder: "balustrade",
  },
  { slot: "project-12", alt: "Glass balustrade on a balcony", placeholder: "balustrade" },
  { slot: "project-13", alt: "Stainless steel staircase balustrade", placeholder: "house" },
  { slot: "project-14", alt: "Glass and stainless steel handrail", placeholder: "balustrade" },
  { slot: "project-15", alt: "Bronze aluminium folding doors", placeholder: "bronze" },
  { slot: "project-16", alt: "Charcoal aluminium windows", placeholder: "balustrade" },
  { slot: "project-17", alt: "Patio folding doors", placeholder: "bronze" },
  { slot: "project-18", alt: "Automated double garage door", placeholder: "house" },
  {
    slot: "project-19",
    alt: "Charcoal garage door matched to the roofline",
    placeholder: "gutter",
  },
  { slot: "project-20", alt: "Single aluminium garage door", placeholder: "house" },

  // About, colour range
  { slot: "about-team-01", alt: "The Elite Gutters team on site", placeholder: "bronze" },
  {
    slot: "colour-range-chart",
    alt: "Colour chart of colour-coated steel finishes for gutters and fascia boards",
    placeholder: "gutter",
  },
];

// Video slots: set `src` to an .mp4 (e.g. '/media/gutters-charcoal.mp4') to replace the
// "coming soon" poster with a playable video. `poster` should be a matching still.
export type VideoSlotData = {
  slot: string;
  title: string;
  placeholder: PlaceholderKey;
  src?: string;
  poster?: string;
};

export const videoSlots: VideoSlotData[] = [
  { slot: "video-featured", title: "Featured project video", placeholder: "house" },
  {
    slot: "gutters-charcoal-video",
    title: "Charcoal seamless gutters video",
    placeholder: "gutter",
  },
  { slot: "project-video-01", title: "Seamless gutter installation video", placeholder: "gutter" },
  { slot: "project-video-02", title: "Aluminium folding doors video", placeholder: "bronze" },
  { slot: "project-video-03", title: "Glass balustrade video", placeholder: "balustrade" },
];

export function getImage(slot: string) {
  const entry = images.find((image) => image.slot === slot);
  if (!entry) throw new Error(`Unknown image slot "${slot}". Add it to src/data/images.ts.`);
  if (entry.src)
    return {
      src: entry.src,
      alt: entry.alt,
      width: entry.width ?? 1600,
      height: entry.height ?? 1000,
      isPlaceholder: false,
    };
  return { ...placeholders[entry.placeholder], isPlaceholder: true };
}

export function getVideo(slot: string) {
  const entry = videoSlots.find((video) => video.slot === slot);
  if (!entry) throw new Error(`Unknown video slot "${slot}". Add it to src/data/images.ts.`);
  return { ...entry, poster: entry.poster ?? placeholders[entry.placeholder].src };
}
