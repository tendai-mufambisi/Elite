import { useRouter, useRouterState } from "@tanstack/react-router";
import { MessageCircle, Play, Volume2, VolumeX, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { site, whatsappPopup } from "@/data/content";
import { getImage, getVideo } from "@/data/images";

const reducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * One scroll loop for the whole site. Any element with data-parallax="0.3" moves at that
 * fraction of the scroll offset from the viewport centre, so it drifts slower than the page.
 * Phones get a gentler effect; reduced-motion users get none.
 */
export function ParallaxDriver() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  // Both effects below touch page DOM, so they wait until the route content has hydrated.
  useEffect(() => {
    // Stop the skeleton shimmer once each image has painted.
    const markLoaded = (img: HTMLImageElement) => img.setAttribute("data-loaded", "");
    const t = window.setTimeout(() => {
      const images = [
        ...document.querySelectorAll<HTMLImageElement>("main img[data-slot]:not([data-loaded])"),
      ];
      for (const img of images) {
        if (img.complete) markLoaded(img);
        else img.addEventListener("load", () => markLoaded(img), { once: true });
      }
    }, 400);
    return () => window.clearTimeout(t);
  }, [pathname]);
  useEffect(() => {
    if (reducedMotion()) return;
    let frame = 0;
    let items: HTMLElement[] = [];
    const collect = () => (items = [...document.querySelectorAll<HTMLElement>("[data-parallax]")]);
    const update = () => {
      frame = 0;
      const vh = window.innerHeight;
      const damp = window.innerWidth < 800 ? 0.55 : 1;
      for (const el of items) {
        const host = el.parentElement ?? el;
        const rect = host.getBoundingClientRect();
        if (rect.bottom < -200 || rect.top > vh + 200) continue;
        const offset = rect.top + rect.height / 2 - vh / 2;
        const speed = Number(el.dataset["parallax"]) * damp;
        // Oversized media layers never move further than their spare margin, so no gaps show.
        const slack = (el.offsetHeight - rect.height) / 2;
        let y = -offset * speed;
        if (slack > 0) {
          const progress = Math.max(-1, Math.min(1, offset / ((vh + rect.height) / 2)));
          y = -progress * slack * Math.min(1, Math.abs(speed) / 0.3) * Math.sign(speed);
        }
        el.style.transform = `translate3d(0, ${y.toFixed(1)}px, 0)`;
      }
    };
    const request = () => (frame ||= requestAnimationFrame(update));
    const late = window.setTimeout(() => (collect(), update()), 350);
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
    return () => {
      window.clearTimeout(late);
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
    };
  }, [pathname]);
  return null;
}

/**
 * Full-screen logo shown on the first visit until the page has loaded, then faded away.
 * Rendered on the server so it appears instantly; route changes never show it again.
 * A CSS fallback hides it after a few seconds even if scripts fail.
 */
export function PageLoader() {
  const [done, setDone] = useState(false);
  const [gone, setGone] = useState(false);
  useEffect(() => {
    let hide = 0;
    // Keep the logo up long enough to register, but never hold the page back.
    const finish = () => (hide = window.setTimeout(() => setDone(true), 450));
    if (document.readyState === "complete") finish();
    else window.addEventListener("load", finish, { once: true });
    const cap = window.setTimeout(() => setDone(true), 3500);
    return () => {
      window.removeEventListener("load", finish);
      window.clearTimeout(hide);
      window.clearTimeout(cap);
    };
  }, []);
  if (gone) return null;
  const logo = getImage("logo-full");
  return (
    <div
      className={`page-loader ${done ? "is-done" : ""}`}
      aria-hidden="true"
      onTransitionEnd={() => done && setGone(true)}
    >
      <img src={logo.src} alt="" width={logo.width} height={logo.height} decoding="sync" />
      <span className="page-loader-bar" />
    </div>
  );
}

/** Thin bar across the top while the router is loading the next page. */
export function RouteProgress() {
  // Driven by navigation events (client only), so the server and first client render agree.
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  useEffect(() => {
    const offStart = router.subscribe("onBeforeNavigate", () => setBusy(true));
    const offEnd = router.subscribe("onResolved", () => setBusy(false));
    return () => {
      offStart();
      offEnd();
    };
  }, [router]);
  return <div className={`route-progress ${busy ? "is-busy" : ""}`} aria-hidden="true" />;
}

/** Muted, looping project video behind the hero. Reduced-motion visitors see the poster only. */
export function HeroVideo({ slot }: { slot: string }) {
  const video = getVideo(slot);
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    if (!reducedMotion()) ref.current?.play().catch(() => {});
  }, []);
  return (
    <div className="hero-slides" data-parallax="0.18">
      <video
        ref={ref}
        data-slot={slot}
        src={video.src}
        poster={video.poster}
        width={video.width}
        height={video.height}
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
        className="hero-video"
      />
    </div>
  );
}

/** "We install [seamless gutters]" with the last part cycling. Screen readers get the full list once. */
export function TextRotator({ lead, words }: { lead: string; words: readonly string[] }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (reducedMotion()) return;
    const t = window.setInterval(() => setI((n) => (n + 1) % words.length), 2400);
    return () => window.clearInterval(t);
  }, [words.length]);
  return (
    <p className="rotator">
      <span className="sr-only">
        {lead} {words.join(", ")}.
      </span>
      <span aria-hidden="true">
        {lead}{" "}
        <span className="rotator-window">
          <span key={i} className="rotator-word">
            {words[i]}
          </span>
        </span>
      </span>
    </p>
  );
}

/**
 * Photos of one service that slide sideways every few seconds, looping smoothly back to the
 * first. Moves only while on screen and not hovered; reduced-motion visitors see the first photo.
 */
export function CardSlider({
  slots,
  delay = 0,
  interval = 4200,
  labels,
}: {
  slots: readonly string[];
  delay?: number;
  interval?: number;
  /** Optional finish name per slot, shown on its photo. */
  labels?: Readonly<Record<string, string>> | undefined;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(true);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || slots.length < 2 || reducedMotion()) return;
    let visible = false;
    let hovered = false;
    let timer = 0;
    const obs = new IntersectionObserver(
      ([entry]) => {
        visible = !!entry?.isIntersecting;
        // Fetch the other photos only once the card is close to the screen.
        if (visible) setLoaded(true);
      },
      { rootMargin: "200px" },
    );
    obs.observe(el);
    const card = el.closest("a") ?? el;
    const enter = () => (hovered = true);
    const leave = () => (hovered = false);
    card.addEventListener("mouseenter", enter);
    card.addEventListener("mouseleave", leave);
    const start = window.setTimeout(() => {
      timer = window.setInterval(() => {
        if (visible && !hovered) {
          setAnimate(true);
          setIndex((i) => i + 1);
        }
      }, interval);
    }, delay);
    return () => {
      obs.disconnect();
      window.clearTimeout(start);
      window.clearInterval(timer);
      card.removeEventListener("mouseenter", enter);
      card.removeEventListener("mouseleave", leave);
    };
  }, [slots.length, delay, interval]);
  // A copy of the first photo sits at the end; once it slides in, jump back to the real first.
  const slides = slots.length > 1 ? [...slots, slots[0]!] : slots;
  const onTransitionEnd = () => {
    if (index >= slots.length) {
      setAnimate(false);
      setIndex(0);
    }
  };
  const active = index % slots.length;
  return (
    <div ref={ref} className="card-slider">
      <div
        className={`card-slider-track ${animate ? "" : "no-anim"}`}
        style={{ transform: `translateX(-${index * 100}%)` }}
        onTransitionEnd={onTransitionEnd}
      >
        {slides.map((slot, i) => {
          if (i > 0 && !loaded) return <div key={`${slot}-${i}`} className="card-slide" />;
          const image = getImage(slot);
          return (
            <div key={`${slot}-${i}`} className="card-slide">
              <img
                data-slot={slot}
                src={image.src}
                alt={i === 0 ? image.alt : ""}
                aria-hidden={i === 0 ? undefined : true}
                width={image.width}
                height={image.height}
                loading="lazy"
                decoding="async"
              />
              {labels?.[slot] && (
                <span className="card-slide-label" aria-hidden={i === 0 ? undefined : true}>
                  {labels[slot]}
                </span>
              )}
            </div>
          );
        })}
      </div>
      {slots.length > 1 && (
        <span className="card-dots" aria-hidden="true">
          {slots.map((slot, i) => (
            <i key={slot} className={i === active ? "is-active" : undefined} />
          ))}
        </span>
      )}
    </div>
  );
}

/** Portrait project video in a phone-style frame. Plays muted while on screen; tap for sound. */
export function Reel({ slot, label }: { slot: string; label: string }) {
  const video = getVideo(slot);
  const ref = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reducedMotion()) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) el.play().catch(() => {});
        else el.pause();
      },
      { threshold: 0.45 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  const toggleSound = () => {
    const el = ref.current;
    if (!el) return;
    el.muted = !el.muted;
    setMuted(el.muted);
    if (el.paused) el.play().catch(() => {});
  };
  return (
    <figure className={`reel ${playing ? "is-playing" : ""}`}>
      <div className="reel-frame">
        <video
          ref={ref}
          data-slot={slot}
          src={video.src}
          poster={video.poster}
          width={video.width}
          height={video.height}
          muted
          loop
          playsInline
          preload="none"
          aria-label={video.title}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        />
        {!playing && (
          <button
            type="button"
            className="reel-play"
            onClick={() => ref.current?.play()}
            aria-label={`Play video: ${label}`}
          >
            <Play size={26} fill="currentColor" />
          </button>
        )}
        <button
          type="button"
          className="reel-sound"
          onClick={toggleSound}
          aria-label={muted ? "Turn sound on" : "Mute"}
        >
          {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>
      </div>
      <figcaption>{label}</figcaption>
    </figure>
  );
}

/**
 * Loud WhatsApp button: pulsing rings, a periodic nudge, and a chat bubble that types in
 * after a few seconds. The bubble is small, sits above the button and can be dismissed.
 */
export function WhatsAppWidget() {
  const [stage, setStage] = useState<"hidden" | "typing" | "open">("hidden");
  const [dismissed, setDismissed] = useState(true);
  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem("wa-bubble") === "closed";
    } catch {
      /* storage blocked */
    }
    setDismissed(seen);
    if (seen) return;
    const a = window.setTimeout(() => setStage("typing"), 3500);
    const b = window.setTimeout(() => setStage("open"), 5200);
    // On phones, tuck the bubble away on its own so it never sits over content for long.
    const c = window.innerWidth < 700 ? window.setTimeout(() => setStage("hidden"), 19000) : 0;
    return () => {
      window.clearTimeout(a);
      window.clearTimeout(b);
      window.clearTimeout(c);
    };
  }, []);
  const close = () => {
    setStage("hidden");
    setDismissed(true);
    try {
      sessionStorage.setItem("wa-bubble", "closed");
    } catch {
      /* storage blocked */
    }
  };
  const showBubble = !dismissed && stage !== "hidden";
  return (
    <div className="wa-widget">
      {showBubble && (
        <div
          className="wa-bubble"
          role="dialog"
          aria-label="WhatsApp chat invitation"
          aria-live="polite"
        >
          <button type="button" className="wa-bubble-close" onClick={close} aria-label="Close">
            <X size={14} />
          </button>
          <div className="wa-bubble-head">
            <span className="wa-avatar" aria-hidden="true">
              E
            </span>
            <div>
              <strong>{site.shortName}</strong>
              <small>{stage === "typing" ? "typing…" : "online"}</small>
            </div>
          </div>
          {stage === "typing" ? (
            <div className="wa-typing" aria-label="typing">
              <i />
              <i />
              <i />
            </div>
          ) : (
            <>
              <p className="wa-message">
                <b>{whatsappPopup.greeting}</b> {whatsappPopup.text}
              </p>
              <a
                className="wa-bubble-cta"
                href={site.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                onClick={close}
              >
                <MessageCircle size={16} /> {whatsappPopup.cta}
              </a>
            </>
          )}
        </div>
      )}
      <a
        className="whatsapp-float"
        href={site.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Elite Gutters on WhatsApp"
      >
        <span className="wa-ring" aria-hidden="true" />
        <span className="wa-ring wa-ring-2" aria-hidden="true" />
        <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M17.5 14.4c-.3-.1-1.8-.9-2-1s-.5-.1-.7.1-.8 1-.9 1.2-.3.2-.6.1a8 8 0 0 1-2.4-1.5 9 9 0 0 1-1.6-2.1c-.2-.3 0-.5.1-.6l.5-.5.3-.5v-.5l-1-2.2c-.2-.6-.5-.5-.7-.5h-.6a1.1 1.1 0 0 0-.8.4 3.3 3.3 0 0 0-1 2.5 5.8 5.8 0 0 0 1.2 3.1 13.3 13.3 0 0 0 5.1 4.5c1.9.8 2.6.9 3.6.7a3 3 0 0 0 2-1.4 2.4 2.4 0 0 0 .2-1.4c-.1-.1-.3-.2-.6-.3ZM12 21.8a9.9 9.9 0 0 1-5-1.4l-.4-.2-3.7 1 1-3.6-.2-.4a9.9 9.9 0 1 1 8.3 4.6ZM20.5 3.5A11.8 11.8 0 0 0 1.9 17.7L.2 24l6.4-1.7a11.8 11.8 0 0 0 5.6 1.4 11.8 11.8 0 0 0 8.3-20.2Z" />
        </svg>
        <span className="wa-label">WhatsApp us</span>
      </a>
    </div>
  );
}
