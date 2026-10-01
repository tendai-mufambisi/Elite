// Every image on the site is a slot defined here and rendered with a matching data-slot
// attribute. Real project media lives in /public/images/<category>/ and /public/videos/.
// To replace a photo, drop the new file in place (or change `src`) and update `width`,
// `height` and `alt` so they describe the new photo.

export type ImageSlot = {
  slot: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  /** AI-generated illustration, not client work. Always shown with an "Illustration" label. */
  illustrative?: boolean;
};

const img = (slot: string, src: string, width: number, height: number, alt: string): ImageSlot => ({
  slot,
  src: `/images/${src}`,
  alt,
  width,
  height,
});

// Project photos: one slot per photo.
const photos = [
  // Stills taken from the client's seamless gutter project videos.
  img(
    "charcoal-seamless-gutters-garage-pillars",
    "seamless-gutters/charcoal-seamless-gutters-garage-pillars.webp",
    569,
    744,
    "Charcoal seamless gutter along a tiled roofline with a matching downpipe beside charcoal pillars at a garage",
  ),
  img(
    "charcoal-seamless-gutters-double-storey",
    "seamless-gutters/charcoal-seamless-gutters-double-storey.webp",
    1080,
    1350,
    "Double-storey home with new charcoal seamless gutters along the roofline and a ladder set up for the installation",
  ),
  img(
    "seamless-gutter-installation-on-site",
    "seamless-gutters/seamless-gutter-installation-on-site.webp",
    478,
    850,
    "Elite Gutters installer on a ladder fitting a charcoal seamless gutter to a home",
  ),
  img(
    "charcoal-gutters-downpipes-pillars",
    "seamless-gutters/charcoal-gutters-downpipes-pillars.webp",
    478,
    850,
    "Charcoal seamless gutter and downpipe beside charcoal pillars at a garage entrance",
  ),
  img(
    "gutters-downpipes-home-with-fence",
    "seamless-gutters/gutters-downpipes-home-with-fence.webp",
    478,
    850,
    "Grey home with dark gutters and a downpipe behind a slatted boundary fence",
  ),
  img(
    "commercial-building-gutters-downpipes",
    "seamless-gutters/commercial-building-gutters-downpipes.webp",
    1080,
    1350,
    "Double-storey commercial building with gutters, downpipes and aluminium windows",
  ),
  img(
    "commercial-glass-balustrade-aluminium-windows",
    "seamless-gutters/commercial-glass-balustrade-aluminium-windows.webp",
    1080,
    1350,
    "Commercial building with a glass balcony balustrade and aluminium windows and doors",
  ),
  img(
    "pillar-yellow-house-garage-doors",
    "seamless-gutters/stainless-steel-gutters-fascia-pillar-cladding-charcoal-garage-doors.webp",
    1280,
    576,
    "Yellow single-storey home with stainless steel fascia boards and downpipes, galvanised gutters, stainless steel pillar cladding and three charcoal aluminium glass garage doors",
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
    "Double-storey home with bronze fascia boards and downpipes, galvanised gutters, bronze aluminium windows and a stainless steel balcony balustrade",
  ),
  img(
    "pillar-stainless-fascia-two-garage-doors",
    "pillar-cladding/stainless-steel-fascia-pillar-cladding-two-garage-doors.webp",
    1600,
    714,
    "Home with stainless steel fascia boards and downpipes, galvanised gutters, stainless steel pillar coverings and two single aluminium garage doors",
  ),
  img(
    "pillar-stainless-veranda",
    "pillar-cladding/stainless-steel-pillar-cladding-veranda.webp",
    571,
    1280,
    "Row of veranda pillars covered in polished stainless steel cladding",
  ),
  img(
    "balustrade-stainless-pillar-covering",
    "balustrades/stainless-steel-balustrades-pillar-covering-double-storey.webp",
    714,
    1218,
    "Double-storey home with curved stainless steel balcony balustrades and stainless steel pillar covering, behind a garden",
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
    "Double-storey home with bronze fascia boards and downpipes, galvanised gutters and stainless steel balcony balustrades",
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
    "burglar-proofing-folding-doors",
    "burglar-proofing/bronze-retractable-burglar-proofing-folding-doors.webp",
    780,
    1040,
    "Bronze retractable burglar proofing closed across a wide opening beside an open aluminium folding door",
  ),
  img(
    "burglar-proofing-windows",
    "burglar-proofing/charcoal-retractable-burglar-proofing-windows.webp",
    780,
    1040,
    "Charcoal aluminium windows with retractable burglar proofing fitted behind the glass on a face-brick home",
  ),
  img(
    "burglar-proofing-bronze-windows",
    "burglar-proofing/bronze-retractable-burglar-proofing-windows.webp",
    780,
    1040,
    "Bronze aluminium windows with matching retractable burglar proofing fitted behind the glass",
  ),
  // Stills taken from the client's waterproofing and roof painting videos.
  img(
    "waterproofing-flat-roof-parapet",
    "waterproofing/torch-on-waterproofing-flat-roof-parapet.webp",
    478,
    850,
    "Flat roof and parapet step sealed with torch-on waterproofing, beside a timber deck",
  ),
  img(
    "waterproofing-banner",
    "waterproofing/torch-on-waterproofing-flat-roof-banner.webp",
    478,
    208,
    "Flat roof and parapet sealed with torch-on waterproofing",
  ),
  img(
    "roof-painting-banner",
    "roof-painting/painted-tile-roof-banner.webp",
    478,
    208,
    "Freshly painted grey roof tiles below a painted gable",
  ),
  img(
    "waterproofing-flat-roof-finished",
    "waterproofing/torch-on-waterproofing-flat-roof-finished.webp",
    478,
    850,
    "Flat concrete roof finished with torch-on waterproofing, beside a double-storey home",
  ),
  img(
    "waterproofing-roof-edges",
    "waterproofing/torch-on-waterproofing-roof-edges.webp",
    478,
    850,
    "Torch-on waterproofing taken up and over the parapet edges of a flat roof",
  ),
  img(
    "waterproofing-team-on-roof",
    "waterproofing/waterproofing-team-on-roof.webp",
    478,
    850,
    "Waterproofing team member working on a roof with solar panels, above newly waterproofed parapets",
  ),
  img(
    "waterproofing-membrane-rolls",
    "waterproofing/torch-on-membrane-rolls-delivered.webp",
    478,
    850,
    "Rolls of torch-on waterproofing membrane being offloaded from a bakkie on site",
  ),
  img(
    "roof-painting-tile-roof",
    "roof-painting/painted-tile-roof-grey.webp",
    478,
    850,
    "Concrete tiled roof freshly painted grey, with painted gable and ridge",
  ),
  img(
    "roof-painting-tiles-close-up",
    "roof-painting/painted-roof-tiles-close-up.webp",
    478,
    850,
    "Close-up of freshly painted grey concrete roof tiles and ridge capping",
  ),
  img(
    "roof-painting-ridge",
    "roof-painting/painted-tile-roof-ridge.webp",
    478,
    850,
    "Painted grey tiled roof along the ridge line",
  ),
  img(
    "roof-painting-metal-sheet",
    "roof-painting/painted-metal-sheet-roof.webp",
    478,
    850,
    "Metal sheet roof freshly painted grey",
  ),
  img(
    "roof-painting-metal-roof-house",
    "roof-painting/painted-metal-roof-and-house.webp",
    478,
    850,
    "Painted grey metal sheet roof on a house, with a gutter along the edge",
  ),
  // Sample picture until the client supplies a real photo of the founder.
  img(
    "founder",
    "founder/founder-sample.svg",
    800,
    1000,
    "Sample placeholder picture for Mr Peter, founder",
  ),
  img(
    "colour-range-chart",
    "colour-range/colour-coated-gutter-colour-samples.webp",
    922,
    2048,
    "Display board of colour-coated steel gutter samples with a matching downpipe",
  ),
];

// AI-generated illustrations (used where no real photo exists yet; never in the Projects gallery).
const illustrations: ImageSlot[] = [
  {
    ...img(
      "gutter-closeup-illustration",
      "illustrations/seamless-gutter-closeup-illustration.webp",
      1200,
      912,
      "Illustration: close-up of a charcoal seamless gutter and matching fascia board on a modern roofline",
    ),
    illustrative: true,
  },
  // Supplied by the client as an example look; not one of their own jobs.
  {
    ...img(
      "gutter-downpipe-example",
      "illustrations/black-seamless-gutter-downpipe-example.webp",
      328,
      491,
      "Example of a black seamless gutter with a matching black downpipe at the corner of a brick home",
    ),
    illustrative: true,
  },
];

// Named page slots that reuse a project photo.
const aliases: Record<string, string> = {
  "hero-home": "fascia-bronze-double-storey",
  "og-default": "fascia-bronze-double-storey",
  "matched-bronze-01": "fascia-bronze-double-storey",
  "matched-charcoal-01": "gutters-charcoal-fascia-double-storey",
  "matched-stainless-01": "pillar-stainless-fascia-two-garage-doors",
  "commercial-hero": "aluminium-commercial-complex",
  "commercial-key-01": "commercial-building-gutters-downpipes",
  "about-01": "aluminium-windows-glass-balustrades",
};

export const images: ImageSlot[] = [
  {
    slot: "logo-main",
    src: "/images/brand/logo-icon.png",
    alt: "Elite Gutters and Aluminium Products logo",
    width: 256,
    height: 256,
  },
  // Full logo with the company name, shown on the page loader.
  {
    slot: "logo-full",
    src: "/images/brand/logo-full.webp",
    alt: "Elite Gutters and Aluminium Products",
    width: 480,
    height: 480,
  },
  ...photos,
  ...illustrations,
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
  // Square, muted loop behind the home page hero.
  video(
    "hero-video",
    "hero-seamless-gutters",
    "Charcoal seamless gutters on a double-storey home during installation",
    960,
    960,
  ),
  video(
    "video-pillar-cladding-garage-doors",
    "stainless-pillar-cladding-aluminium-garage-doors",
    "Yellow home with stainless steel pillar cladding and aluminium glass garage doors",
  ),
  video(
    "video-gutters-double-storey",
    "seamless-gutters-double-storey-installation",
    "Seamless gutters and downpipes being installed on a double-storey home",
  ),
  video(
    "video-gutters-single-storey",
    "charcoal-seamless-gutters-installation-single-storey",
    "Charcoal seamless gutters being fitted to a single-storey home",
  ),
  video(
    "video-gutters-pillars",
    "charcoal-gutters-downpipes-pillars",
    "Charcoal seamless gutters and downpipes on a finished home",
  ),
  video(
    "video-gutters-fence",
    "gutters-downpipes-home-with-fence",
    "Walk-past of a finished home with gutters and downpipes",
  ),
  video(
    "video-commercial-building",
    "commercial-building-gutters-aluminium-glass",
    "Commercial building with gutters, downpipes, aluminium windows and glass balustrades",
  ),
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
    "Walk-around of a yellow home with bronze fascia boards and downpipes and galvanised gutters",
    476,
    848,
  ),
  video(
    "video-waterproofing-flat-roof",
    "torch-on-waterproofing-flat-roof",
    "Flat roof and parapets sealed with torch-on waterproofing",
  ),
  video(
    "video-waterproofing-membrane",
    "torch-on-membrane-delivery",
    "Torch-on membrane rolls delivered and carried to site",
  ),
  video(
    "video-roof-painting",
    "roof-painting-walkaround",
    "Walk across freshly painted tiled and metal sheet roofs",
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
