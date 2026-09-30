import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowUpRight,
  Building2,
  CloudRain,
  Layers,
  Palette,
  ShieldCheck,
  Sparkles,
  Waves,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import type { CSSProperties } from "react";
import { Button } from "@/components/ui/button";
import {
  ArrowLink,
  Eyebrow,
  FounderSection,
  GutterProfiles,
  Media,
  ParallaxBand,
  QuoteBand,
  ScrollCue,
  SectionHead,
} from "@/components/site/site";
import { ServiceDrawing } from "@/components/site/illustrations";
import { CardSlider, HeroVideo, Reel, TextRotator } from "@/components/site/motion";
import { Reveal } from "@/components/site/Reveal";
import { benefits, colours, home, projects, services, site } from "@/data/content";
import { getImage } from "@/data/images";
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

const captionFor = (slot: string) => projects.find((p) => p.slot === slot);
// Seamless gutters is the lead product; the rest follow in "More than gutters".
const [gutterService, ...otherServices] = services;

function Home() {
  return (
    <>
      <section className="hero">
        <HeroVideo slot={home.heroVideo} />
        <div className="hero-overlay" />
        <div className="hero-shapes" aria-hidden="true">
          <span className="shape shape-1" data-parallax="-0.12" />
          <span className="shape shape-2" data-parallax="0.08" />
          <span className="shape shape-3" data-parallax="-0.2" />
        </div>
        <div className="container hero-content">
          <Eyebrow>{site.tagline}</Eyebrow>
          <h1>{home.h1}</h1>
          <TextRotator lead={home.rotatorLead} words={home.rotator} />
          <p>{home.sub}</p>
          <div className="hero-actions">
            <Button asChild variant="brand" size="large">
              <Link to="/contact">
                Get a Free Gutter Quote <ArrowUpRight />
              </Link>
            </Button>
            <Button asChild variant="lightOutline" size="large">
              <a href={site.whatsapp} target="_blank" rel="noopener noreferrer">
                WhatsApp Us <ArrowUpRight />
              </a>
            </Button>
          </div>
          <p className="hero-note">{home.heroNote}</p>
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

      <section className="section spotlight">
        <div className="container content-split">
          <Reveal variant="left">
            <figure className="spotlight-media">
              <Media slot={home.spotlight.slot} />
              {getImage(home.spotlight.slot).illustrative && (
                <figcaption className="illus-tag">Illustration</figcaption>
              )}
            </figure>
          </Reveal>
          <Reveal variant="right">
            <Eyebrow>{home.spotlight.eyebrow}</Eyebrow>
            <h2>{home.spotlight.title}</h2>
            <p>{home.spotlight.text}</p>
            <ul className="check-list">
              {home.spotlight.points.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
            <div className="spotlight-actions">
              <Button asChild variant="brand" size="large">
                <Link to="/services/$slug" params={{ slug: gutterService!.slug }}>
                  Seamless gutters <ArrowUpRight />
                </Link>
              </Button>
              <ArrowLink to="/why-seamless-gutters">Why seamless?</ArrowLink>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section section-soft benefit-bullets-section">
        <div className="container benefit-bullets">
          <Reveal variant="left">
            <Eyebrow>{home.benefitBullets.eyebrow}</Eyebrow>
            <h2>{home.benefitBullets.title}</h2>
            <ArrowLink to="/benefits-of-seamless-gutters">{home.benefitBullets.link}</ArrowLink>
          </Reveal>
          <ul className="bullet-grid">
            {home.benefitBullets.bullets.map((b, i) => (
              <li key={b}>
                <Reveal delay={(i % 2) * 80 + Math.floor(i / 2) * 60}>
                  <span className="bullet-tick" aria-hidden="true">
                    ✓
                  </span>
                  {b}
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section reels-section">
        <div className="container">
          <Reveal>
            <SectionHead
              {...home.reelsHead}
              action={<ArrowLink to="/projects">All projects</ArrowLink>}
            />
          </Reveal>
          <div className="reels">
            {home.reels.map((r, i) => (
              <Reveal key={r.slot} variant="scale" delay={i * 120}>
                <Reel slot={r.slot} label={r.label} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <GutterProfiles />

      <ParallaxBand {...home.bands[0]!} />

      <section className="section">
        <div className="container colour-teaser">
          <Reveal variant="left">
            <Eyebrow>{home.colourTeaser.eyebrow}</Eyebrow>
            <h2>{home.colourTeaser.title}</h2>
            <p>{home.colourTeaser.text}</p>
            <ArrowLink to="/colour-range">View all gutter colours</ArrowLink>
          </Reveal>
          <Reveal variant="right">
            <div
              className="colour-bars"
              role="img"
              aria-label={`Gutter colours: ${colours.map(([n]) => n).join(", ")}`}
            >
              {colours.map(([name, colour], i) => (
                <span key={name} style={{ "--swatch": colour, "--i": i } as CSSProperties} />
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section section-soft">
        <div className="container">
          <Reveal>
            <SectionHead {...home.benefitsHead} />
          </Reveal>
          <div className="benefits-grid">
            {benefits.map((b, i) => {
              const Icon = benefitIcons[b.icon];
              return (
                <Reveal key={b.title} className="benefit-cell" delay={(i % 4) * 90}>
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

      <section className="feature" aria-labelledby="matched-title">
        <div className="feature-copy">
          <Reveal variant="left">
            <Eyebrow>{home.matched.eyebrow}</Eyebrow>
            <h2 id="matched-title">{home.matched.title}</h2>
            <p>{home.matched.text}</p>
            <ul className="matched-list">
              {home.matched.examples.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
            <ArrowLink to="/colour-range">Explore the colour range</ArrowLink>
          </Reveal>
        </div>
        <div className="feature-images">
          {home.matched.slots.map((m, i) => (
            <figure key={m.slot} className={"full" in m ? "feature-full" : undefined}>
              {"full" in m ? (
                <Media slot={m.slot} />
              ) : (
                // Each cropped photo drifts at its own speed.
                <div className="feature-media" data-parallax={["0.12", "-0.08", "0.05"][i]}>
                  <Media slot={m.slot} />
                </div>
              )}
              <figcaption>{m.label}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <SectionHead
              {...home.mosaicHead}
              action={<ArrowLink to="/projects">View all projects</ArrowLink>}
            />
          </Reveal>
          <ul className="mosaic">
            {home.mosaic.map((slot, i) => {
              const info = captionFor(slot);
              return (
                <li key={slot} className={`mosaic-item mosaic-${i + 1}`}>
                  <Reveal variant="wipe" delay={(i % 4) * 80}>
                    <Link to="/projects" className="mosaic-link">
                      <Media slot={slot} />
                      {info && (
                        <span className="mosaic-caption">
                          <small>{info.category}</small>
                          {info.caption}
                        </span>
                      )}
                    </Link>
                  </Reveal>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <ParallaxBand {...home.bands[1]!} />

      <section className="section section-soft">
        <div className="container">
          <Reveal>
            <SectionHead {...home.servicesHead} />
          </Reveal>
          <div className="services-grid services-grid-others">
            {otherServices.map((s, i) => (
              <Reveal key={s.slug} className="service-cell" delay={(i % 3) * 90}>
                <Link className="service-card" to="/services/$slug" params={{ slug: s.slug }}>
                  {s.image ? (
                    // The card's own photo first, then the rest of that service's gallery.
                    <CardSlider
                      slots={[...new Set([s.image, ...s.gallery])]}
                      labels={"photoLabels" in s ? s.photoLabels : undefined}
                      delay={i * 700}
                    />
                  ) : (
                    "drawing" in s && <ServiceDrawing kind={s.drawing} className="card-drawing" />
                  )}
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

      <FounderSection />

      <section className="section section-soft roof-care">
        <div className="container">
          <Reveal>
            <SectionHead {...home.roofCare.head} />
          </Reveal>
          <div className="roof-care-grid">
            {home.roofCare.items.map((item, i) => {
              const s = services.find((x) => x.slug === item.slug)!;
              return (
                <Reveal key={item.slug} delay={i * 120} className="roof-care-card">
                  <Reel slot={item.video} label={item.label} />
                  <div>
                    <h3>{s.title}</h3>
                    <p>{s.short}</p>
                    <ul className="check-list">
                      {item.points.map((x) => (
                        <li key={x}>{x}</li>
                      ))}
                    </ul>
                    <Button asChild variant="brand">
                      <Link to="/services/$slug" params={{ slug: s.slug }}>
                        {s.title} <ArrowUpRight />
                      </Link>
                    </Button>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <QuoteBand title={home.cta.title} text={home.cta.text} />
    </>
  );
}
