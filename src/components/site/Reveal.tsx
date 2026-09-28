import { useEffect, useRef, type ReactNode } from "react";

// Content is visible in the server-rendered HTML. After hydration, only elements that start
// below the fold are hidden and then animated in as they scroll into view.
export function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
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
      { threshold: 0.08 },
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
}
