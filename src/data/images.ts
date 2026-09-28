// Every image on the site is a slot defined here and rendered with a matching data-slot
// attribute. Real project media lives in /public/images/<category>/ and /public/videos/.
// To replace a photo, drop the new file in place (or change `src`) and update `width`,
// `height` and `alt` so they describe the new photo.

export type ImageSlot = { slot: string; src: string; alt: string; width: number; height: number };

const img = (slot: string, src: string, width: number, height: number, alt: string): ImageSlot => ({
  slot,
  src: `/images/${src}`,
  alt,
  width,
  height,
});

// Project photos: one slot per photo.
const photos = [
  img(
    "gutters-stainless-yellow-house",
    "seamless-gutters/stainless-steel-gutters-fascia-pillar-cladding-charcoal-garage-doors.webp",
    1280,
    576,
    "Yellow single-storey home with stainless steel gutters and fascia boards, stainless steel pillar cladding and three charcoal aluminium glass garage doors",
  ),
  img(
    "gutters-charcoal-fascia-double-storey",
    "seamless-gutters/charcoal-gutters-fascia-double-storey.webp",
    478,
    425,
    "Double-storey home with charcoal fascia boards, charcoal aluminium folding doors and a stainless steel balcony balustrade",
  ),
  img(
    "fascia-bronze-double-storey",
    "fascia-boards/bronze-fascia-downpipes-aluminium-windows-double-storey.webp",
    1600,
    714,
    "Double-storey home with bronze fascia boards and downpipes matched to bronze aluminium windows and a stainless steel balcony balustrade",
  ),
  img(
    "pillar-stainless-fascia-two-garage-doors",
    "pillar-cladding/stainless-steel-fascia-pillar-cladding-two-garage-doors.webp",
    1600,
    714,
    "Home with stainless steel fascia boards and gutters, stainless steel pillar coverings and two single aluminium garage doors",
  ),
  img(
    "pillar-stainless-veranda",
    "pillar-cladding/stainless-steel-pillar-cladding-veranda.webp",
    571,
    1280,
    "Row of veranda pillars covered in polished stainless steel cladding",
  ),
  img(
    "balustrade-glass-staircase",
    "balustrades/glass-staircase-balustrade-double-volume.webp",
    1200,
    1600,
    "Frameless glass staircase balustrade with stainless steel fixings in a double-volume entrance",
  ),
  img(
    "balustrade-tinted-glass-commercial",
    "balustrades/tinted-glass-balcony-balustrade-commercial-building.webp",
    1200,
    1600,
    "Commercial building with a tinted glass balcony balustrade, stainless steel columns and aluminium windows and doors",
  ),
  img(
    "balustrade-stainless-balconies",
    "balustrades/stainless-steel-balcony-balustrades-double-storey.webp",
    1280,
    576,
    "Double-storey home with stainless steel balcony balustrades",
  ),
  img(
    "aluminium-windows-glass-balustrades",
    "aluminium-doors-windows/aluminium-windows-glass-balustrades-modern-home.webp",
    1600,
    714,
    "Modern home with large aluminium windows, glass balustrades and an aluminium sliding gate",
  ),
  img(
    "aluminium-commercial-complex",
    "aluminium-doors-windows/commercial-complex-aluminium-windows-balcony.webp",
    1920,
    864,
    "Commercial office complex fitted with aluminium windows and a black balcony balustrade",
  ),
  img(
    "aluminium-new-build",
    "aluminium-doors-windows/aluminium-windows-folding-doors-new-build.webp",
    1600,
    714,
    "New double-storey build with aluminium windows and folding doors fitted",
  ),
  img(
    "folding-doors-gazebo",
    "folding-doors/aluminium-folding-doors-thatched-gazebo.webp",
    1600,
    655,
    "Aluminium folding doors being installed around a thatched gazebo",
  ),
  img(
    "folding-doors-interior",
    "folding-doors/aluminium-folding-doors-interior.webp",
    714,
    1600,
    "Five-panel aluminium folding doors inside a living area",
  ),
  img(
    "garage-three-charcoal-glass",
    "garage-doors/three-charcoal-aluminium-glass-garage-doors.webp",
    1600,
    714,
    "Three single charcoal aluminium and glass garage doors on a face-brick home",
  ),
  img(
    "garage-arched-glass-gate",
    "garage-doors/arched-aluminium-glass-garage-doors-sliding-gate.webp",
    1280,
    576,
    "Two arched aluminium and glass garage doors with a matching aluminium sliding gate",
  ),
  img(
    "colour-range-chart",
    "colour-range/colour-coated-gutter-colour-samples.webp",
    922,
    2048,
    "Display board of colour-coated steel gutter samples with a matching downpipe",
  ),
];

// Named page slots that reuse a project photo.
const aliases: Record<string, string> = {
  "hero-home": "gutters-stainless-yellow-house",
  "og-default": "gutters-stainless-yellow-house",
  "matched-bronze-01": "fascia-bronze-double-storey",
  "matched-charcoal-01": "gutters-charcoal-fascia-double-storey",
  "matched-stainless-01": "pillar-stainless-fascia-two-garage-doors",
  "commercial-hero": "aluminium-commercial-complex",
  "commercial-key-01": "balustrade-tinted-glass-commercial",
  "about-01": "aluminium-windows-glass-balustrades",
};

export const images: ImageSlot[] = [
  {
    slot: "logo-main",
    src: "/logo.svg",
    alt: "Elite Gutters and Aluminium Products logo",
    width: 340,
    height: 92,
  },
  ...photos,
  ...Object.entries(aliases).map(([slot, target]) => ({
    ...photos.find((p) => p.slot === target)!,
    slot,
  })),
];

// Portrait (9:16) project videos, audio removed.
export type VideoSlotData = {
  slot: string;
  title: string;
  src: string;
  poster: string;
  width: number;
  height: number;
};

const video = (
  slot: string,
  name: string,
  title: string,
  width = 478,
  height = 850,
): VideoSlotData => ({
  slot,
  title,
  src: `/videos/${name}.mp4`,
  poster: `/videos/${name}-poster.webp`,
  width,
  height,
});

export const videoSlots: VideoSlotData[] = [
  video(
    "video-featured",
    "charcoal-gutters-fascia-double-storey",
    "Walk-around of a double-storey home with charcoal gutters and fascia boards, aluminium windows and balustrades",
  ),
  video(
    "gutters-charcoal-video",
    "charcoal-gutters-fascia-double-storey",
    "Charcoal gutters and fascia boards on a double-storey home",
  ),
  video(
    "garage-doors-video",
    "automated-aluminium-garage-doors",
    "Automated aluminium garage doors opening by remote control",
  ),
  video(
    "project-video-charcoal",
    "charcoal-gutters-fascia-double-storey",
    "Charcoal gutters and fascia boards on a double-storey home",
  ),
  video(
    "project-video-garage",
    "automated-aluminium-garage-doors",
    "Automated aluminium garage doors opening by remote control",
  ),
  video(
    "project-video-gutters",
    "gutters-aluminium-gate-walkthrough",
    "Walk-around of a home with new gutters, downpipes and an aluminium sliding gate",
    476,
    848,
  ),
];

export function getImage(slot: string) {
  const entry = images.find((image) => image.slot === slot);
  if (!entry) throw new Error(`Unknown image slot "${slot}". Add it to src/data/images.ts.`);
  return entry;
}

export function getVideo(slot: string) {
  const entry = videoSlots.find((v) => v.slot === slot);
  if (!entry) throw new Error(`Unknown video slot "${slot}". Add it to src/data/images.ts.`);
  return entry;
}
