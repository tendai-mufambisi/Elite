import { useEffect, useRef, useState } from "react";

type Stat = { readonly value: number; readonly suffix: string; readonly label: string };

const format = (n: number, decimals: number) =>
  n.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ",");

// The final figure is in the server-rendered HTML. After hydration, a figure that starts
// below the fold counts up from zero once it scrolls into view.
function Counter({ value, suffix }: { value: number; suffix: string }) {
  const decimals = Number.isInteger(value) ? 0 : 1;
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(value);
  useEffect(() => {
    const el = ref.current;
    if (!el || el.getBoundingClientRect().top < window.innerHeight) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setShown(0);
    let frame = 0;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        obs.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / 1600);
          setShown(value * (1 - Math.pow(1 - t, 3)));
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    obs.observe(el);
    return () => {
      obs.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value]);
  return (
    <span ref={ref} className="stat-value">
      {format(shown, decimals)}
      <span className="stat-suffix">{suffix}</span>
    </span>
  );
}

/** Row of headline figures that count up as they come into view. */
export function Stats({ items, className = "" }: { items: readonly Stat[]; className?: string }) {
  return (
    <dl className={`stats ${className}`}>
      {items.map((s) => (
        <div key={s.label} className="stat">
          <dt>{s.label}</dt>
          <dd>
            <Counter value={s.value} suffix={s.suffix} />
          </dd>
        </div>
      ))}
    </dl>
  );
}
