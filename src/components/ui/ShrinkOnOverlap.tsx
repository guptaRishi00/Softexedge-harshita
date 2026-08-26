"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { type ReactNode, useRef } from "react";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ShrinkOnOverlap({
  endSelector,
  targetSelector,
  scale = 0.85,
  y = 40,
  transformOrigin,
  className,
  children,
}: {
  endSelector: string;
  targetSelector?: string;
  scale?: number;
  y?: number;
  transformOrigin?: string;
  className?: string;
  children: ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const endTrigger = document.querySelector(endSelector);
      if (!containerRef.current || !innerRef.current || !endTrigger) return;

      const target = targetSelector
        ? gsap.utils.toArray<HTMLElement>(targetSelector)
        : innerRef.current;
      if (Array.isArray(target) ? target.length === 0 : !target) return;

      gsap.to(target, {
        scale,
        y,
        ease: "none",
        ...(transformOrigin ? { transformOrigin } : {}),
        scrollTrigger: {
          trigger: containerRef.current,
          start: "bottom bottom",
          endTrigger,
          end: "top top",
          scrub: true,
        },
      });
    });

    const refresh = () => ScrollTrigger.refresh();
    const frame = requestAnimationFrame(refresh);
    const timer = setTimeout(refresh, 400);
    window.addEventListener("load", refresh);
    let fontsPending = true;
    document.fonts?.ready.then(() => {
      if (fontsPending) refresh();
    });

    return () => {
      fontsPending = false;
      cancelAnimationFrame(frame);
      clearTimeout(timer);
      window.removeEventListener("load", refresh);
      mm.revert();
    };
  });

  return (
    <div ref={containerRef}>
      <div
        ref={innerRef}
        // `md:will-change-transform`, not the unscoped version this had. The
        // only thing that ever transforms this element is the GSAP tween
        // below, and that lives inside `mm.add("(min-width: 768px)")` — so
        // below md the hint promoted a full-section layer that nothing was
        // ever going to move, which is exactly what the project's mobile rules
        // forbid. It also matters here specifically: this element sits INSIDE
        // a `position: sticky` wrapper on all six pages that use it, and a
        // permanently promoted descendant is one of the things WebKit handles
        // differently from Blink when deciding how to composite a stuck
        // ancestor.
        className={cn("origin-top md:will-change-transform", className)}
      >
        {children}
      </div>
    </div>
  );
}
