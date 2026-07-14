"use client";

import { motion } from "framer-motion";
import type React from "react";

import { cn } from "@/lib/utils";

export type LogoCarouselItem = {
  node: React.ReactNode;
  title?: string;
  href?: string;
};

export interface LogoCarouselProps {
  logos: LogoCarouselItem[];
  /** Seconds for one full loop — lower is faster. */
  speed?: number;
  className?: string;
  ariaLabel?: string;
}

/**
 * Each logo sits inside its own card/container, and the whole row scrolls
 * infinitely (left → right). The set is duplicated so the `x: -50% → 0%`
 * loop is seamless.
 */
export default function LogoCarousel({
  logos,
  speed = 28,
  className,
  ariaLabel = "Technology partners",
}: LogoCarouselProps) {
  const track = [...logos, ...logos];

  return (
    <section
      aria-label={ariaLabel}
      className={cn("relative w-full overflow-hidden", className)}
    >
      {/* Subtle white edge fades so the marquee dissolves at the sides */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent md:w-24" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent md:w-24" />
      <motion.div
        className="flex w-max items-center gap-3 py-2"
        animate={{ x: ["-50%", "0%"] }}
        transition={{
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop",
          ease: "linear",
          duration: speed,
        }}
      >
        {track.map((logo, i) => {
          const content = (
            <>
              <span className="flex shrink-0 items-center text-2xl text-zinc-900 md:text-[1.75rem]">
                {logo.node}
              </span>
              {logo.title && (
                <span className="whitespace-nowrap text-sm font-semibold tracking-tight text-zinc-900 md:text-base">
                  {logo.title}
                </span>
              )}
            </>
          );

          const boxClass =
            "flex h-20 w-48 shrink-0 items-center justify-center gap-3 rounded-2xl border border-zinc-300 bg-white px-7 shadow-sm md:h-24 md:w-56 md:px-9";

          return logo.href ? (
            <a
              key={`${logo.title ?? "logo"}-${i}`}
              href={logo.href}
              target="_blank"
              rel="noopener noreferrer"
              title={logo.title}
              className={boxClass}
            >
              {content}
            </a>
          ) : (
            <div key={`${logo.title ?? "logo"}-${i}`} className={boxClass}>
              {content}
            </div>
          );
        })}
      </motion.div>
    </section>
  );
}
