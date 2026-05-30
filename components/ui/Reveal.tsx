"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

/**
 * Fades + lifts its children into view once, on scroll. Pure IntersectionObserver
 * (no animation library). Respects prefers-reduced-motion via the global CSS rule
 * that neutralises animation duration.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: React.ElementType;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -24px 0px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      data-reveal=""
      style={visible ? { animationDelay: `${delay}ms` } : undefined}
      className={cn(
        visible ? "animate-[fade-up_0.5s_ease-out_both]" : "opacity-0",
        className
      )}
    >
      {children}
    </Tag>
  );
}
