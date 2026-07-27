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
        ? document.querySelector(targetSelector)
        : innerRef.current;
      if (!target) return;

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

    return () => mm.revert();
  });

  return (
    <div ref={containerRef}>
      <div
        ref={innerRef}
        className={cn("origin-top will-change-transform", className)}
      >
        {children}
      </div>
    </div>
  );
}
