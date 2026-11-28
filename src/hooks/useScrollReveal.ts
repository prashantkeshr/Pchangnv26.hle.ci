import { useEffect, useRef } from 'react';

export function useScrollReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    const targets = el.querySelectorAll('.animate-on-scroll, .stagger-children');
    targets.forEach((t) => observer.observe(t));

    if (el.classList.contains('animate-on-scroll') || el.classList.contains('stagger-children')) {
      observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  return ref;
}
