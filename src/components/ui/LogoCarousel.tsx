"use client";

import { AnimatePresence, motion } from "framer-motion";
import type React from "react";
import { useCallback, useEffect, useState } from "react";

import { cn } from "@/lib/utils";

export type LogoCarouselItem = {
  node: React.ReactNode;
  title?: string;
  href?: string;
};

export interface LogoCarouselProps {
  logos: LogoCarouselItem[];
  /** Auto-advance interval in ms. Set to 0 to disable. */
  interval?: number;
  className?: string;
  ariaLabel?: string;
}

/**
 * A "spotlight" logo carousel — instead of an endless marquee, a glowing
 * highlight steps through the logos one at a time. The active logo lifts into
 * full colour while the rest sit muted; hovering a logo selects it and pauses
 * the auto-advance.
 */
export default function LogoCarousel({
  logos,
  interval = 2200,
  className,
  ariaLabel = "Technology partners",
}: LogoCarouselProps) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const count = logos.length;

  const advance = useCallback(() => {
    setActive((i) => (i + 1) % count);
  }, [count]);

  useEffect(() => {
    if (paused || interval <= 0 || count <= 1) return;
    const id = window.setInterval(advance, interval);
    return () => window.clearInterval(id);
  }, [advance, interval, paused, count]);

  return (
    <section
      aria-label={ariaLabel}
      className={cn(
        "relative flex flex-wrap items-center justify-center gap-2 sm:gap-3",
        className,
      )}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {logos.map((logo, i) => {
        const isActive = i === active;
        const content = (
          <>
            {/* Sliding spotlight that travels to the active item */}
            {isActive && (
              <motion.span
                layoutId="logo-carousel-spotlight"
                className="absolute inset-0 -z-10 rounded-2xl bg-black/[0.04] ring-1 ring-black/10"
                transition={{ type: "spring", stiffness: 320, damping: 30 }}
              />
            )}
            <motion.span
              className="text-2xl sm:text-3xl"
              animate={{
                scale: isActive ? 1.15 : 1,
                opacity: isActive ? 1 : 0.4,
                filter: isActive ? "grayscale(0)" : "grayscale(1)",
                color: isActive ? "#0a0a0a" : "#7a7a7a",
              }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              {logo.node}
            </motion.span>

            {/* Title reveals only for the active logo */}
            <AnimatePresence mode="popLayout">
              {isActive && logo.title && (
                <motion.span
                  key={logo.title}
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: "auto", opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="overflow-hidden whitespace-nowrap text-sm font-medium tracking-wide text-black/80"
                >
                  {logo.title}
                </motion.span>
              )}
            </AnimatePresence>
          </>
        );

        const itemClass =
          "relative flex items-center gap-2 rounded-2xl px-3 py-2.5 sm:px-4 outline-none transition-colors focus-visible:ring-2 focus-visible:ring-black/40";

        return logo.href ? (
          <a
            key={logo.title ?? i}
            href={logo.href}
            target="_blank"
            rel="noopener noreferrer"
            title={logo.title}
            className={itemClass}
            onFocus={() => setActive(i)}
            onMouseEnter={() => setActive(i)}
          >
            {content}
          </a>
        ) : (
          <button
            type="button"
            key={logo.title ?? i}
            title={logo.title}
            className={itemClass}
            onFocus={() => setActive(i)}
            onMouseEnter={() => setActive(i)}
            onClick={() => setActive(i)}
          >
            {content}
          </button>
        );
      })}
    </section>
  );
}
