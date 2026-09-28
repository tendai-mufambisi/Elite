import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

type Variant = "up" | "left" | "right" | "scale" | "wipe";

// Content is visible in the server-rendered HTML. After hydration, only elements that start
// below the fold are hidden and then animated in as they scroll into view.
export function Reveal({
  children,
  className = "",
  variant = "up",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  variant?: Variant;
  /** Stagger in milliseconds. */
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node || node.getBoundingClientRect().top < window.innerHeight) return;
    node.classList.add("reveal-pending");
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          node.classList.add("revealed");
          obs.unobserve(node);
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -6% 0px" },
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={`reveal reveal-${variant} ${className}`}
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as CSSProperties) : undefined}
    >
      {children}
    </div>
  );
}
