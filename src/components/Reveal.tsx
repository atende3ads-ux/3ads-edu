import { useEffect, useRef, type ReactNode } from 'react';

export function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = ref.current;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!element || reducedMotion.matches || !('IntersectionObserver' in window)) return;
    // Keep first-screen / restored-scroll content visible. Only animate what is below.
    if (element.getBoundingClientRect().top < window.innerHeight) return;
    element.dataset.reveal = 'pending';
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        element.dataset.reveal = 'visible';
        observer.disconnect();
      }
    }, { threshold: 0.08 });
    const onMotionChange = () => {
      if (reducedMotion.matches) {
        delete element.dataset.reveal;
        observer.disconnect();
      }
    };
    observer.observe(element);
    reducedMotion.addEventListener('change', onMotionChange);
    return () => {
      observer.disconnect();
      reducedMotion.removeEventListener('change', onMotionChange);
      delete element.dataset.reveal;
    };
  }, []);
  return <div ref={ref} className={`reveal ${className}`} style={{ '--reveal-delay': `${delay}ms` } as React.CSSProperties}>{children}</div>;
}
