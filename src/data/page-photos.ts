// Fixed photo spots the owner can change from the dashboard ("Page photos").
// `slot` is the built-in image shown until the owner picks another one.
import { founder, home } from "./content";

export type PagePhotoSpot = { key: string; label: string; group: string; slot: string };

// Tile shapes in the home "Recent projects" grid, in order.
const mosaicShapes = ["large", "tall", "tall", "wide", "small", "small"];

export const pagePhotoSpots: PagePhotoSpot[] = [
  { key: "home-spotlight", label: "Our speciality", group: "Home", slot: home.spotlight.slot },
  ...home.matched.slots.map((m, i) => ({
    key: `home-matched-${i + 1}`,
    label: `Gutters that match: photo ${i + 1}`,
    group: "Home",
    slot: m.slot,
  })),
  ...home.mosaic.map((slot, i) => ({
    key: `home-mosaic-${i + 1}`,
    label: `Recent projects: tile ${i + 1} (${mosaicShapes[i] ?? "small"})`,
    group: "Home",
    slot,
  })),
  ...home.bands.map((b, i) => ({
    key: `home-band-${i + 1}`,
    label: `Full-width photo band ${i + 1}`,
    group: "Home",
    slot: b.slot,
  })),
  {
    key: "quote-band",
    label: "Free quote banner (bottom of every page)",
    group: "Every page",
    slot: "garage-three-charcoal-glass",
  },
  { key: "about-banner", label: "Banner", group: "About", slot: "balustrade-stainless-balconies" },
  { key: "about-photo", label: "Our story photo", group: "About", slot: "about-01" },
  { key: "founder-photo", label: "Founder photo", group: "About", slot: founder.photoSlot },
  {
    key: "why-banner",
    label: "Banner",
    group: "Why Seamless",
    slot: "pillar-stainless-fascia-two-garage-doors",
  },
  {
    key: "why-photo-1",
    label: "What is a seamless gutter photo",
    group: "Why Seamless",
    slot: "fascia-bronze-double-storey",
  },
  {
    key: "why-photo-2",
    label: "Stainless steel photo",
    group: "Why Seamless",
    slot: "pillar-stainless-veranda",
  },
  {
    key: "benefits-banner",
    label: "Banner",
    group: "Benefits",
    slot: "fascia-bronze-double-storey",
  },
  {
    key: "benefits-photo-1",
    label: "What are seamless gutters photo",
    group: "Benefits",
    slot: "gutter-closeup-illustration",
  },
  {
    key: "benefits-photo-2",
    label: "Installation photo",
    group: "Benefits",
    slot: "gutters-charcoal-fascia-double-storey",
  },
  {
    key: "colour-banner",
    label: "Banner",
    group: "Colour Range",
    slot: "fascia-bronze-double-storey",
  },
  {
    key: "colour-chart",
    label: "Colour sample board",
    group: "Colour Range",
    slot: "colour-range-chart",
  },
  {
    key: "commercial-banner",
    label: "Banner",
    group: "Commercial & Industrial",
    slot: "commercial-hero",
  },
  {
    key: "commercial-photo",
    label: "Key benefits photo",
    group: "Commercial & Industrial",
    slot: "commercial-key-01",
  },
  {
    key: "projects-banner",
    label: "Banner",
    group: "Projects",
    slot: "aluminium-commercial-complex",
  },
  {
    key: "contact-banner",
    label: "Banner",
    group: "Contact",
    slot: "aluminium-windows-glass-balustrades",
  },
];

export const pagePhotoDefault = (key: string) =>
  pagePhotoSpots.find((s) => s.key === key)?.slot ?? "";
