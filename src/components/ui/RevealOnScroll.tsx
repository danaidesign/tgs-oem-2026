"use client";

import { useEffect, useRef, ReactNode } from "react";

type RevealType = "up" | "left" | "right" | "scale" | "fade";

interface Props {
  children: ReactNode;
  animation?: RevealType;
  delay?: number;
  duration?: number;
  threshold?: number;
  className?: string;
}

export function RevealOnScroll({
  children,
  animation = "up",
  delay = 0,
  duration,
  threshold = 0.12,
  className = "",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (delay)     el.style.transitionDelay  = `${delay}ms`;
    if (duration)  el.style.transitionDuration = `${duration}ms`;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.dataset.visible = "true";
          io.disconnect();
        }
      },
      { threshold }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [delay, duration, threshold]);

  return (
    <div ref={ref} data-reveal={animation} className={className}>
      {children}
    </div>
  );
}
