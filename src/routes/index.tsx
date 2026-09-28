import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowUpRight,
  Building2,
  ChevronLeft,
  ChevronRight,
  CloudRain,
  Layers,
  Palette,
  ShieldCheck,
  Sparkles,
  Waves,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { useRef, type CSSProperties } from "react";
import { Button } from "@/components/ui/button";
import {
  ArrowLink,
  Eyebrow,
  Media,
  QuoteBand,
  ScrollCue,
  SectionHead,
  VideoSlot,
} from "@/components/site/site";
import { Reveal } from "@/components/site/Reveal";
import { benefits, colours, home, projects, services, site } from "@/data/content";
import { pageHead } from "@/data/seo";

export const Route = createFileRoute("/")({
  head: () => pageHead(home.metaTitle, home.metaDescription, "/", undefined, "hero-home"),
  component: Home,
});

const benefitIcons: Record<(typeof benefits)[number]["icon"], LucideIcon> = {
  shield: ShieldCheck,
  waves: Waves,
  "cloud-rain": CloudRain,
  layers: Layers,
  palette: Palette,
  sparkles: Sparkles,
  wrench: Wrench,
  building: Building2,
};

// One image project per category for the home carousel.
const featured = projects.filter(
  (p, i, all) => !p.video && all.findIndex((q) => !q.video && q.category === p.category) === i,
);

function Home() {
  const track = useRef<HTMLDivElement>(null);
  const scrollTrack = (dir: 1 | -1) =>
    track.current?.scrollBy({ left: dir * track.current.clientWidth * 0.8, behavior: "smooth" });

  return (
    <>
      <section className="hero">
        <Media slot="hero-home" className="hero-image" priority sizes="100vw" />
        <div className="hero-overlay" />
        <div className="container hero-content">
          <Eyebrow>{site.tagline}</Eyebrow>
          <h1>{home.h1}</h1>
          <p>{home.sub}</p>
          <div className="hero-actions">
            <Button asChild variant="brand" size="large">
              <Link to="/contact">
                Get a Free Quote <ArrowUpRight />
              </Link>
            </Button>
            <Button asChild variant="lightOutline" size="large">
              <a href={site.whatsapp} target="_blank" rel="noopener noreferrer">
                WhatsApp Us <ArrowUpRight />
              </a>
            </Button>
          </div>
          <ScrollCue />
        </div>
        <span className="hero-aside" aria-hidden="true">
          {site.secondary}
        </span>
      </section>

      <div className="trust-strip">
        <div className="container trust-inner">
          <span>{home.trustLabel}</span>
          {home.trust.map((x) => (
            <strong key={x}>{x}</strong>
          ))}
        </div>
      </div>

      <section className="section">
        <div className="container">
          <Reveal>
            <SectionHead {...home.servicesHead} />
          </Reveal>
          <div className="services-grid">
            {services.map((s, i) => (
              <Reveal key={s.slug} className="service-cell">
                <Link className="service-card" to="/services/$slug" params={{ slug: s.slug }}>
                  <Media slot={s.image} />
                  <span className="service-card-index">
                    0{i + 1} / 0{services.length}
                  </span>
                  <div className="service-card-content">
                    <div>
                      <h3>{s.title}</h3>
                      <p>{s.short}</p>
                    </div>
                    <span className="service-card-icon" aria-hidden="true">
                      <ArrowUpRight size={19} />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="feature" aria-labelledby="matched-title">
        <div className="feature-copy">
          <Eyebrow>{home.matched.eyebrow}</Eyebrow>
          <h2 id="matched-title">{home.matched.title}</h2>
          <p>{home.matched.text}</p>
          <ul className="matched-list">
            {home.matched.examples.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
          <ArrowLink to="/colour-range">Explore the colour range</ArrowLink>
        </div>
        <div className="feature-images">
          {home.matched.slots.map((m) => (
            <figure key={m.slot}>
              <Media slot={m.slot} />
              <figcaption>{m.label}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="section section-soft">
        <div className="container">
          <Reveal>
            <SectionHead {...home.benefitsHead} />
          </Reveal>
          <div className="benefits-grid">
            {benefits.map((b) => {
              const Icon = benefitIcons[b.icon];
              return (
                <Reveal key={b.title} className="benefit-cell">
                  <article className="benefit">
                    <span className="benefit-icon" aria-hidden="true">
                      <Icon size={26} strokeWidth={1.8} />
                    </span>
                    <h3>{b.title}</h3>
                    <p>{b.text}</p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section" aria-roledescription="carousel" aria-label="Featured projects">
        <div className="container">
          <Reveal>
            <SectionHead
              {...home.projectsHead}
              action={
                <div className="carousel-controls">
                  <button
                    type="button"
                    onClick={() => scrollTrack(-1)}
                    aria-label="Previous projects"
                  >
                    <ChevronLeft />
                  </button>
                  <button type="button" onClick={() => scrollTrack(1)} aria-label="Next projects">
                    <ChevronRight />
                  </button>
                  <ArrowLink to="/projects">View all projects</ArrowLink>
                </div>
              }
            />
          </Reveal>
          <div className="project-scroll" ref={track}>
            {featured.map((p) => (
              <Link to="/projects" className="project-tile" key={p.slot}>
                <Media slot={p.slot} />
                <span>
                  <small>{p.category}</small>
                  {p.caption} ↗
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-soft">
        <div className="container colour-teaser">
          <div>
            <Eyebrow>{home.colourTeaser.eyebrow}</Eyebrow>
            <h2>{home.colourTeaser.title}</h2>
            <p>{home.colourTeaser.text}</p>
            <ArrowLink to="/colour-range">View all colours</ArrowLink>
          </div>
          <div
            className="colour-bars"
            role="img"
            aria-label={`Colour range: ${colours.map(([n]) => n).join(", ")}`}
          >
            {colours.map(([name, colour]) => (
              <span key={name} style={{ "--swatch": colour } as CSSProperties} />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead {...home.videoHead} />
          <VideoSlot slot="video-featured" />
        </div>
      </section>

      <QuoteBand title={home.cta.title} text={home.cta.text} />
    </>
  );
}
