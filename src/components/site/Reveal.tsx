import { useEffect, useRef, type ReactNode } from 'react';
export function Reveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => { const node = ref.current; if (!node) return; const obs = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { node.classList.add('revealed'); obs.unobserve(node); } }, { threshold: .08 }); obs.observe(node); return () => obs.disconnect(); }, []);
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>;
}
