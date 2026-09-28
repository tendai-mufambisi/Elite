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
import { nav, notFoundPage, services, site } from "@/data/content";
import { getImage, getVideo } from "@/data/images";

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
            <Link key={item.to} to={item.to}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <Button variant="brand" asChild className="header-quote">
            <Link to="/contact">
              Get a Free Quote <ArrowUpRight />
            </Link>
          </Button>
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
            <Link key={item.to} to={item.to}>
              {item.label}
            </Link>
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
            <Link key={item.to} to={item.to}>
              {item.label}
            </Link>
          ))}
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
        <span>{site.credit}</span>
      </div>
    </footer>
  );
}

export function WhatsApp() {
  return (
    <a
      className="whatsapp-float"
      href={site.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Elite Gutters on WhatsApp"
    >
      <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M17.5 14.4c-.3-.1-1.8-.9-2-1s-.5-.1-.7.1-.8 1-.9 1.2-.3.2-.6.1a8 8 0 0 1-2.4-1.5 9 9 0 0 1-1.6-2.1c-.2-.3 0-.5.1-.6l.5-.5.3-.5v-.5l-1-2.2c-.2-.6-.5-.5-.7-.5h-.6a1.1 1.1 0 0 0-.8.4 3.3 3.3 0 0 0-1 2.5 5.8 5.8 0 0 0 1.2 3.1 13.3 13.3 0 0 0 5.1 4.5c1.9.8 2.6.9 3.6.7a3 3 0 0 0 2-1.4 2.4 2.4 0 0 0 .2-1.4c-.1-.1-.3-.2-.6-.3ZM12 21.8a9.9 9.9 0 0 1-5-1.4l-.4-.2-3.7 1 1-3.6-.2-.4a9.9 9.9 0 1 1 8.3 4.6ZM20.5 3.5A11.8 11.8 0 0 0 1.9 17.7L.2 24l6.4-1.7a11.8 11.8 0 0 0 5.6 1.4 11.8 11.8 0 0 0 8.3-20.2Z" />
      </svg>
    </a>
  );
}

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main id="main" tabIndex={-1}>
        {children}
      </main>
      <Footer />
      <WhatsApp />
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
      {slot && <Media slot={slot} className="page-intro-image" priority />}
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
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="quote-band">
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
    "/projects" | "/colour-range" | "/contact" | "/why-seamless-gutters" | "/commercial-industrial";
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
