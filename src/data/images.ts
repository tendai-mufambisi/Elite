import hero from '@/assets/hero-house.jpg';
import gutter from '@/assets/gutters-detail.jpg';
import bronze from '@/assets/bronze-home.jpg';
import balustrade from '@/assets/balustrade-home.jpg';

export const images = [
  { slot: 'hero-home', alt: 'Contemporary home with charcoal roofline, aluminium glazing and glass balustrade', src: hero },
  { slot: 'gutters-detail', alt: 'Close view of charcoal seamless gutter and matching fascia on a modern home', src: gutter },
  { slot: 'bronze-home', alt: 'Contemporary patio with bronze aluminium folding doors and matched roofline', src: bronze },
  { slot: 'balustrade-home', alt: 'Modern glass balcony balustrade with aluminium windows and charcoal gutters', src: balustrade },
  { slot: 'matched-bronze-01', alt: 'Bronze aluminium doors and matching roofline finish', src: bronze },
  { slot: 'matched-charcoal-01', alt: 'Charcoal gutters and fascia fitted to a contemporary roofline', src: gutter },
  { slot: 'matched-stainless-01', alt: 'Glass and stainless steel balustrade on a modern balcony', src: balustrade },
  ...Array.from({ length: 24 }, (_, i) => ({ slot: `project-${String(i + 1).padStart(2, '0')}`, alt: ['Modern home with finished roofline and glazing', 'Detail of seamless gutter and fascia installation', 'Bronze aluminium folding doors on contemporary home', 'Glass balustrade on a contemporary balcony'][i % 4], src: [hero, gutter, bronze, balustrade][i % 4] })),
  { slot: 'colour-range-chart', alt: 'Selection of colour-coated steel finishes', src: gutter },
  { slot: 'logo-main', alt: 'Elite Gutters and Aluminium Products logo', src: '/logo.svg' },
] as const;

export const videoSlots = [
  { slot: 'video-featured', poster: hero, alt: 'Featured architectural project video placeholder' },
  { slot: 'project-video-01', poster: gutter, alt: 'Gutter installation video placeholder' },
  { slot: 'project-video-02', poster: bronze, alt: 'Aluminium doors video placeholder' },
  { slot: 'project-video-03', poster: balustrade, alt: 'Balustrade video placeholder' },
] as const;

export function getImage(slot: string) { return images.find((image) => image.slot === slot) ?? images[0]; }
