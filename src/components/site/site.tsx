import { Link, useRouterState } from "@tanstack/react-router";
import {
  ArrowDown,
  ArrowUpRight,
  ChevronDown,
  Mail,
  Menu,
  MessageCircle,
  Phone,
  X,
} from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import {
  founder,
  gutterProfiles,
  nav,
  notFoundPage,
  services,
  site,
  whatsappLink,
} from "@/data/content";
import { GutterProfileDrawing } from "@/components/site/illustrations";
import { Reveal } from "@/components/site/Reveal";
import { getImage, getVideo } from "@/data/images";
import {
  PageLoader,
  ParallaxDriver,
  RouteProgress,
  WhatsAppWidget,
} from "@/components/site/motion";

export function Media({
  slot,
  className = "",
  priority = false,
  sizes,
}: {
  slot: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  const image = getImage(slot);
  return (
    <img
      data-slot={slot}
      src={image.src}
      alt={image.alt}
      width={image.width}
      height={image.height}
      sizes={sizes}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      decoding={priority ? "sync" : "async"}
      className={className}
    />
  );
}

export function VideoSlot({ slot, className = "" }: { slot: string; className?: string }) {
  const video = getVideo(slot);
  return (
    <video
      data-slot={slot}
      className={`video-real ${className}`}
      src={video.src}
      poster={video.poster}
      width={video.width}
      height={video.height}
      controls
      muted
      preload="none"
      playsInline
      aria-label={video.title}
    />
  );
}

export function Logo({ light = false }: { light?: boolean }) {
  const logo = getImage("logo-main");
  return (
    <Link
      to="/"
      aria-label={`${site.name} home`}
      className={`brand-lockup ${light ? "brand-light" : ""}`}
    >
      <img data-slot="logo-main" src={logo.src} alt="" width={logo.width} height={logo.height} />
      <span className="wordmark">
        <span className="wordmark-name">{site.logo.name}</span>
        <span className="wordmark-sub">{site.logo.sub}</span>
      </span>
    </Link>
  );
}

export function FacebookIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M13.5 21v-7.5h2.5l.4-3h-2.9V8.6c0-.9.3-1.5 1.5-1.5h1.5V4.4a20 20 0 0 0-2.2-.1c-2.2 0-3.8 1.4-3.8 3.9v2.3H8v3h2.5V21h3Z" />
    </svg>
  );
}

/** Menu link; service pages go through the typed /services/$slug route. */
function NavItemLink({ item }: { item: (typeof nav)[number] }) {
  if (item.to.startsWith("/services/")) {
    return (
      <Link to="/services/$slug" params={{ slug: item.to.split("/")[2]! }}>
        {item.label}
      </Link>
    );
  }
  return (
    <Link to={item.to as Exclude<(typeof nav)[number]["to"], `/services/${string}`>}>
      {item.label}
    </Link>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 25);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <div className="header-inner">
        <Logo />
        <nav className="desktop-nav" aria-label="Main navigation">
          <Link to="/" activeOptions={{ exact: true }}>
            Home
          </Link>
          <div className="nav-dropdown">
            <button
              type="button"
              className="nav-dropdown-trigger"
              aria-haspopup="true"
              data-status={pathname.startsWith("/services") ? "active" : undefined}
            >
              Services <ChevronDown size={13} aria-hidden="true" />
            </button>
            <div className="dropdown-panel">
              {services.map((s) => (
                <Link key={s.slug} to="/services/$slug" params={{ slug: s.slug }}>
                  {s.title}
                  <ArrowUpRight size={15} aria-hidden="true" />
                </Link>
              ))}
            </div>
          </div>
          {nav.map((item) => (
            <NavItemLink key={item.to} item={item} />
          ))}
        </nav>
        <div className="header-actions">
          <Button variant="brand" asChild className="header-quote">
            <Link to="/contact">
              Get a Free Quote <ArrowUpRight />
            </Link>
          </Button>
          <a href={site.phoneHref} className="mobile-call" aria-label={`Call ${site.phone}`}>
            <Phone size={19} />
          </a>
          <Button
            variant="iconPlain"
            size="icon"
            className="mobile-menu-toggle"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </Button>
        </div>
      </div>
      {open && (
        <nav id="mobile-nav" className="mobile-nav" aria-label="Mobile navigation">
          <Link to="/" activeOptions={{ exact: true }}>
            Home
          </Link>
          <span>Services</span>
          {services.map((s) => (
            <Link
              key={s.slug}
              to="/services/$slug"
              params={{ slug: s.slug }}
              className="mobile-sub"
            >
              {s.title}
            </Link>
          ))}
          <span>Explore</span>
          {nav.map((item) => (
            <NavItemLink key={item.to} item={item} />
          ))}
          <Button asChild variant="brand" size="large" className="mt-5">
            <Link to="/contact">
              Get a Free Quote <ArrowUpRight />
            </Link>
          </Button>
        </nav>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-intro">
          <Logo light />
          <p>{site.footerBlurb}</p>
          <span className="footer-tagline">
            BUILD <i /> PROTECT <i /> ENHANCE
          </span>
        </div>
        <nav aria-label="Services">
          <h2>Services</h2>
          {services.map((s) => (
            <Link key={s.slug} to="/services/$slug" params={{ slug: s.slug }}>
              {s.title}
            </Link>
          ))}
        </nav>
        <nav aria-label="Quick links">
          <h2>Quick links</h2>
          <Link to="/">Home</Link>
          {nav.map((item) => (
            <NavItemLink key={item.to} item={item} />
          ))}
          <Link to="/benefits-of-seamless-gutters">Benefits of Seamless Gutters</Link>
        </nav>
        <div>
          <h2>Get in touch</h2>
          <a href={site.phoneHref}>
            <Phone size={15} aria-hidden="true" /> {site.phone}
          </a>
          <a href={site.whatsapp} target="_blank" rel="noopener noreferrer">
            <MessageCircle size={15} aria-hidden="true" /> WhatsApp us
          </a>
          <a href={`mailto:${site.email}`}>
            <Mail size={15} aria-hidden="true" /> {site.email}
          </a>
          <a
            href={site.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="footer-social"
            aria-label="Elite Gutters on Facebook"
          >
            <FacebookIcon />
          </a>
          <Button asChild variant="brand" className="footer-quote">
            <Link to="/contact">
              Get a Free Quote <ArrowUpRight />
            </Link>
          </Button>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>
          © {new Date().getFullYear()} {site.name}
        </span>
        <span>
          {site.tagline} · {site.secondary}
        </span>
      </div>
      <div className="credit-strip">
        <p>
          Powered by{" "}
          <a
            href={site.credit.phoneHref}
            aria-label={`${site.credit.name}, call ${site.credit.phone}`}
          >
            {site.credit.name}
          </a>
        </p>
        <a href={site.credit.websiteHref} target="_blank" rel="noopener" className="credit-site">
          {site.credit.website}
        </a>
      </div>
    </footer>
  );
}

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <PageLoader />
      <RouteProgress />
      <Header />
      <main id="main" tabIndex={-1}>
        {children}
      </main>
      <Footer />
      <WhatsAppWidget />
      <ParallaxDriver />
    </>
  );
}

export function Eyebrow({ children, as: Tag = "p" }: { children: ReactNode; as?: "p" | "span" }) {
  return (
    <Tag className="eyebrow">
      <span aria-hidden="true" /> {children}
    </Tag>
  );
}

export function SectionHead({
  eyebrow,
  title,
  text,
  action,
}: {
  eyebrow: string;
  title: ReactNode;
  text?: string;
  action?: ReactNode;
}) {
  return (
    <div className="section-head">
      <div>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2>{title}</h2>
      </div>
      {(text || action) && (
        <div className="section-head-aside">
          {text && <p>{text}</p>}
          {action}
        </div>
      )}
    </div>
  );
}

export function PageIntro({
  eyebrow,
  title,
  text,
  slot,
  crumbs,
}: {
  eyebrow: string;
  title: string;
  text: string;
  /** Omit for a plain navy banner when there is no photo. */
  slot?: string | undefined;
  crumbs?: { label: string; to?: string }[];
}) {
  return (
    <section className={`page-intro ${slot ? "" : "page-intro-plain"}`}>
      {slot && (
        <div className="page-intro-media" data-parallax="0.22">
          <Media slot={slot} className="page-intro-image" priority sizes="100vw" />
        </div>
      )}
      <div className="page-intro-shade" />
      <div className="container page-intro-content">
        {crumbs && (
          <nav aria-label="Breadcrumb" className="crumbs">
            <ol>
              <li>
                <Link to="/">Home</Link>
              </li>
              {crumbs.map((c) => (
                <li key={c.label}>
                  {c.to ? <a href={c.to}>{c.label}</a> : <span aria-current="page">{c.label}</span>}
                </li>
              ))}
            </ol>
          </nav>
        )}
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1>{title}</h1>
        <p>{text}</p>
      </div>
    </section>
  );
}

export function QuoteBand({
  title = "Ready to upgrade your roofline?",
  text = "Tell us what you have in mind. We will help you find a finish that fits.",
  slot = "garage-three-charcoal-glass",
}: {
  title?: string;
  text?: string;
  /** Background photo that scrolls slower than the page. */
  slot?: string;
}) {
  return (
    <section className="quote-band">
      <div className="band-media" data-parallax="0.3" aria-hidden="true">
        <img src={getImage(slot).src} alt="" loading="lazy" decoding="async" />
      </div>
      <div className="container quote-inner">
        <div>
          <Eyebrow>Free quote</Eyebrow>
          <h2>{title}</h2>
          <p>{text}</p>
        </div>
        <div className="quote-actions">
          <Button asChild variant="light" size="large">
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
      </div>
    </section>
  );
}

export function ScrollCue() {
  return (
    <span className="scroll-cue" aria-hidden="true">
      SCROLL TO EXPLORE <ArrowDown size={15} />
    </span>
  );
}

export function ArrowLink({
  to,
  children,
}: {
  to:
    | "/projects"
    | "/colour-range"
    | "/contact"
    | "/why-seamless-gutters"
    | "/commercial-industrial"
    | "/benefits-of-seamless-gutters";
  children: ReactNode;
}) {
  return (
    <Link className="arrow-link" to={to}>
      {children}
      <ArrowUpRight size={19} aria-hidden="true" />
    </Link>
  );
}

export function FaqList({ faqs }: { faqs: readonly (readonly [string, string])[] }) {
  return (
    <div>
      {faqs.map(([q, a]) => (
        <details className="faq-item" key={q}>
          <summary>{q}</summary>
          <p>{a}</p>
        </details>
      ))}
    </div>
  );
}

export function NotFound() {
  return (
    <section className="not-found">
      <div className="container">
        <Eyebrow>Error 404</Eyebrow>
        <h1>{notFoundPage.title}</h1>
        <p>{notFoundPage.text}</p>
        <div className="related-links">
          {services.map((s) => (
            <Link key={s.slug} to="/services/$slug" params={{ slug: s.slug }}>
              {s.title}
              <ArrowUpRight aria-hidden="true" />
            </Link>
          ))}
        </div>
        <div className="not-found-actions">
          <Button asChild variant="brand" size="large">
            <Link to="/">
              Back to home <ArrowUpRight />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="large"
            className="rounded-none font-bold uppercase"
          >
            <Link to="/contact">Contact us</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

/** Full-width photo band: the photo drifts slower than the page while the text scrolls normally. */
export function ParallaxBand({
  slot,
  eyebrow,
  title,
}: {
  slot: string;
  eyebrow: string;
  title: string;
}) {
  const image = getImage(slot);
  return (
    <section className="parallax-band">
      <div className="band-media" data-parallax="0.35">
        <img
          data-slot={slot}
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="parallax-band-shade" />
      <div className="container parallax-band-content">
        <Eyebrow>{eyebrow}</Eyebrow>
        <p className="parallax-band-title">{title}</p>
      </div>
    </section>
  );
}

/** "Meet the founder". Renders nothing until the client details are filled in content.ts. */
export function FounderSection() {
  if (!founder.name) return null;
  return (
    <section className="section founder">
      <div className="container content-split">
        {founder.photoSlot && <Media slot={founder.photoSlot} className="founder-photo" />}
        <div>
          <Eyebrow>Meet the founder</Eyebrow>
          <h2>{founder.name}</h2>
          <p className="founder-role">{founder.role}</p>
          {founder.bio.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Domestic & industrial gutter profiles (seamless gutters page and home). */
export function GutterProfiles() {
  return (
    <section className="section" id="gutter-profiles">
      <div className="container">
        <Reveal>
          <SectionHead eyebrow={gutterProfiles.eyebrow} title={gutterProfiles.title} />
        </Reveal>
        <div className="profile-grid">
          {gutterProfiles.profiles.map((p) => (
            <article key={p.kind} className={`profile-card profile-${p.kind}`}>
              <GutterProfileDrawing kind={p.label.toLowerCase()} size={p.size} />
              <p className="profile-downpipe">
                Downpipe size: <strong>{p.downpipe}</strong>
              </p>
              <h3>
                {p.label} <small>({p.for})</small>
              </h3>
              <ul className="check-list">
                {p.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <div className="profile-note">
          <p>{gutterProfiles.note}</p>
          <Button asChild variant="brand" size="large">
            <a
              href={whatsappLink(gutterProfiles.whatsappText)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle /> WhatsApp Us
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
