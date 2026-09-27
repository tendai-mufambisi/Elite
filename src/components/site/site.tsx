import { Link } from '@tanstack/react-router';
import { ArrowDown, ArrowRight, ArrowUpRight, ChevronDown, Menu, Phone, X, MessageCircle } from 'lucide-react';
import { useEffect, useState, type ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { site, services } from '@/data/content';
import { getImage, videoSlots } from '@/data/images';

export function Media({ slot, className = '', priority = false }: { slot: string; className?: string; priority?: boolean }) {
  const image = getImage(slot);
  return <img data-slot={slot} src={image.src} alt={image.alt} width={1600} height={1000} loading={priority ? 'eager' : 'lazy'} className={className} />;
}
export function VideoSlot({ slot, className = '' }: { slot: string; className?: string }) {
  const video = videoSlots.find(v => v.slot === slot) ?? videoSlots[0];
  return <div data-slot={slot} className={`video-slot ${className}`} style={{ backgroundImage: `url(${video.poster})` }} role="img" aria-label={video.alt}><span className="video-label">PROJECT FILM <span aria-hidden="true">↗</span></span><span className="video-notice">Video coming soon</span></div>;
}
export function Logo({ light = false }: { light?: boolean }) {
  return <Link to="/" aria-label="Elite Gutters home" className={`brand-lockup ${light ? 'brand-light' : ''}`}><img data-slot="logo-main" src="/logo.svg" alt="Elite Gutters and Aluminium Products" width={340} height={92} /></Link>;
}
const nav = [
  { label: 'Why seamless', to: '/why-seamless-gutters' }, { label: 'Commercial', to: '/commercial-industrial' }, { label: 'Colour range', to: '/colour-range' }, { label: 'Projects', to: '/projects' }, { label: 'About', to: '/about' }, { label: 'Contact', to: '/contact' },
] as const;
export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => { const fn = () => setScrolled(window.scrollY > 25); fn(); window.addEventListener('scroll', fn, { passive: true }); return () => window.removeEventListener('scroll', fn); }, []);
  return <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
    <div className="header-inner"><Logo /><nav className="desktop-nav" aria-label="Main navigation"><Link to="/" activeOptions={{ exact: true }}>Home</Link><div className="nav-dropdown"><Link to="/services/$slug" params={{ slug: 'seamless-gutters' }}>Services <ChevronDown size={13}/></Link><div className="dropdown-panel">{services.map(s => <Link key={s.slug} to="/services/$slug" params={{ slug: s.slug }}>{s.title}<ArrowUpRight size={15}/></Link>)}</div></div>{nav.map(item => <Link key={item.to} to={item.to}>{item.label}</Link>)}</nav><div className="header-actions"><Button variant="brand" asChild className="header-quote"><Link to="/contact">Get a free quote <ArrowUpRight/></Link></Button><Button variant="iconPlain" size="icon" className="mobile-menu-toggle" aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen(!open)}>{open ? <X/> : <Menu/>}</Button></div></div>
    {open && <nav className="mobile-nav" aria-label="Mobile navigation"><Link onClick={() => setOpen(false)} to="/">Home</Link><span>OUR SERVICES</span>{services.map(s => <Link onClick={() => setOpen(false)} key={s.slug} to="/services/$slug" params={{ slug: s.slug }}>{s.title}</Link>)}{nav.map(item => <Link onClick={() => setOpen(false)} key={item.to} to={item.to}>{item.label}</Link>)}<Link onClick={() => setOpen(false)} to="/contact">Get a free quote</Link></nav>}
  </header>;
}
export function Footer() { return <footer className="footer"><div className="container footer-grid"><div className="footer-intro"><Logo light/><p>Thoughtful products. Precise finishes. A better look for the buildings we live and work in.</p><span className="footer-tagline">BUILD <i/> PROTECT <i/> ENHANCE</span></div><div><h3>EXPLORE</h3><Link to="/">Home</Link><Link to="/projects">Projects</Link><Link to="/colour-range">Colour range</Link><Link to="/about">About us</Link><Link to="/contact">Contact</Link></div><div><h3>OUR EXPERTISE</h3>{services.map(s => <Link key={s.slug} to="/services/$slug" params={{ slug: s.slug }}>{s.title}</Link>)}</div><div><h3>GET IN TOUCH</h3><a href={site.phoneHref}>{site.phone}</a><a href={`mailto:${site.email}`}>{site.email}</a><a href={site.facebook} target="_blank" rel="noreferrer">Facebook ↗</a><Button asChild variant="brand" className="footer-quote"><Link to="/contact">Let's talk about your project <ArrowUpRight/></Link></Button></div></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} Elite Gutters and Aluminium Products</span><span>Quality Finishes Last Longer</span><span>Website by Digits Digital</span></div></footer>; }
export function WhatsApp() { return <a className="whatsapp-float" href={site.whatsapp} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp"><MessageCircle size={25} strokeWidth={2.3}/></a>; }
export function SiteLayout({ children }: { children: ReactNode }) { return <><Header/><main>{children}</main><Footer/><WhatsApp/></>; }
export function Eyebrow({ children }: { children: ReactNode }) { return <p className="eyebrow"><span/> {children}</p>; }
export function SectionHead({ eyebrow, title, text, action }: { eyebrow: string; title: string; text?: string; action?: ReactNode }) { return <div className="section-head"><div><Eyebrow>{eyebrow}</Eyebrow><h2>{title}</h2></div><div className="section-head-aside">{text && <p>{text}</p>}{action}</div></div>; }
export function PageIntro({ eyebrow, title, text, slot = 'hero-home' }: { eyebrow: string; title: string; text: string; slot?: string }) { return <section className="page-intro"><Media slot={slot} className="page-intro-image" priority/><div className="page-intro-shade"/><div className="container page-intro-content"><Eyebrow>{eyebrow}</Eyebrow><h1>{title}</h1><p>{text}</p></div><span className="page-intro-index">ELITE / {eyebrow.toUpperCase()}</span></section>; }
export function QuoteBand({ title = 'Ready to transform your space?', text = 'Tell us what you have in mind. We’ll help you find a finish that fits.' }: { title?: string; text?: string }) { return <section className="quote-band"><div className="container quote-inner"><div><Eyebrow>START A CONVERSATION</Eyebrow><h2>{title}</h2><p>{text}</p></div><div className="quote-actions"><Button asChild variant="light" size="large"><Link to="/contact">Get a free quote <ArrowUpRight/></Link></Button><Button asChild variant="lightOutline" size="large"><a href={site.whatsapp} target="_blank" rel="noreferrer">WhatsApp us <ArrowUpRight/></a></Button></div></div></section>; }
export function ScrollCue() { return <span className="scroll-cue">SCROLL TO EXPLORE <ArrowDown size={15}/></span>; }
export function ArrowLink({ to, children }: { to: '/projects' | '/colour-range' | '/contact' | '/why-seamless-gutters'; children: ReactNode }) { return <Link className="arrow-link" to={to}>{children}<ArrowUpRight size={19}/></Link>; }
export function ContactLinks() { return <div className="contact-links"><a href={site.phoneHref}><Phone size={18}/> {site.phone}</a><a href={site.whatsapp} target="_blank" rel="noreferrer"><MessageCircle size={18}/> WhatsApp us</a></div>; }
export function Seo({}: Record<string, never>) { return null; }
