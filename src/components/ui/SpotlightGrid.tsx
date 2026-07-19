"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

const TOTAL_ITEMS = 80;
const COLUMNS = 10;
const ROWS = TOTAL_ITEMS / COLUMNS;

/**
 * Auto-moving spotlight pattern: a dark grid revealed by a soft radial mask
 * that drifts on its own (no mouse), with the cells under the spotlight lit by
 * the brand gradient. Renders as an absolute, pointer-events-none background;
 * drop it inside any `relative` dark container. Reduced-motion safe.
 * `speed` multiplies the wander rate (1 = the shared CtaSection pace).
 * `glowColor` overrides the default blue→darker-blue gradient on the lit cells —
 * solid on its own, or a vertical glowColor→glowVia→glowColor gradient when
 * `glowVia` is also set.
 */
export default function SpotlightGrid({
  speed = 1,
  glowColor,
  glowVia,
  // Mask circle radius in px (bigger = larger revealed area).
  maskRadius = 600,
  // Lissajous swing amplitude as a fraction of the half-grid (1 = reaches the
  // edges; lower keeps the spotlight nearer the center).
  travel = 0.9,
}: {
  speed?: number;
  glowColor?: string;
  glowVia?: string;
  maskRadius?: number;
  travel?: number;
}) {
  const reduce = useReducedMotion();
  const rootRef = useRef<HTMLDivElement | null>(null);

  // Spotlight position in px (drives the reveal mask) plus the current focal
  // grid cell (drives the per-cell proximity glow). Both are driven by one
  // looping path so the lit cells always sit under the revealed spotlight.
  const mouseX = useMotionValue(-1000); // Start far off-screen
  const mouseY = useMotionValue(-1000);
  const [focus, setFocus] = useState<{ row: number; col: number } | null>(null);

  // Auto-drive the spotlight on a slow Lissajous wander (no mouse needed).
  useEffect(() => {
    if (reduce) return;
    const el = rootRef.current;
    if (!el) return;

    const dims = { w: el.clientWidth, h: el.clientHeight };
    const ro = new ResizeObserver(() => {
      dims.w = el.clientWidth;
      dims.h = el.clientHeight;
    });
    ro.observe(el);

    let raf = 0;
    let start = 0;
    const tick = (now: number) => {
      if (!start) start = now;
      const t = ((now - start) / 1000) * speed;

      // Continuous cell coordinates tracing two out-of-phase sines.
      const midCol = (COLUMNS - 1) / 2;
      const midRow = (ROWS - 1) / 2;
      const fCol = midCol + midCol * travel * Math.sin(t * 0.55);
      // Phase -1.3 starts the spotlight near the TOP of the box, so it's
      // visible on first view (consumers scrim the bottom of the container).
      const fRow = midRow + midRow * travel * Math.sin(t * 0.42 - 1.3);

      // Grid renders at 120% width, shifted -5% left, vertically centered.
      const cell = (1.2 * dims.w) / COLUMNS;
      const gridTop = (dims.h - ROWS * cell) / 2;
      mouseX.set(-0.05 * dims.w + (fCol + 0.5) * cell);
      mouseY.set(gridTop + (fRow + 0.5) * cell);
      setFocus({ row: fRow, col: fCol });

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [reduce, mouseX, mouseY, speed, travel]);

  const getIntensity = (index: number) => {
    if (!focus) return 0;

    const row = Math.floor(index / COLUMNS);
    const col = index % COLUMNS;

    const distance = Math.sqrt((row - focus.row) ** 2 + (col - focus.col) ** 2);

    if (distance > 3.5) return 0;
    return Math.max(0, 1 - distance / 1.79);
  };

  return (
    <div
      ref={rootRef}
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      <motion.div
        className="absolute inset-0 flex items-center justify-center overflow-hidden transition-opacity duration-500"
        style={{
          // This mask cuts a hole to reveal the pattern where the spotlight is
          WebkitMaskImage: useMotionTemplate`radial-gradient(${maskRadius}px circle at ${mouseX}px ${mouseY}px, black 0%, transparent 100%)`,
          maskImage: useMotionTemplate`radial-gradient(${maskRadius}px circle at ${mouseX}px ${mouseY}px, black 0%, transparent 100%)`,
        }}
      >
        <div
          className="grid w-[120%] -ml-[5%] gap-3"
          style={{
            gridTemplateColumns: `repeat(${COLUMNS}, minmax(0, 1fr))`,
          }}
        >
          {Array.from({ length: TOTAL_ITEMS }).map((_, index) => {
            const intensity = getIntensity(index);
            const colorVal = Math.round(15 * (1 - intensity));
            const bgColor = `rgb(${colorVal}, ${colorVal}, ${colorVal})`;

            return (
              <div
                key={index}
                className="relative aspect-square w-full overflow-hidden rounded-2xl p-[2px] transition-all duration-300 ease-out"
                style={{
                  backgroundColor: intensity > 0 ? "transparent" : "#121212",
                }}
              >
                {/* The colored glow that follows the spotlight */}
                <div
                  className={
                    glowColor
                      ? "absolute inset-0"
                      : // Brand blue fading to a slightly darker tone of itself
                        // (not the cyan) so the lit cells stay monochrome-blue.
                        "absolute inset-0 bg-gradient-to-r from-[#2E5BFF] to-[#274DD9]"
                  }
                  style={{
                    opacity: intensity * 0.8,
                    background:
                      glowColor && glowVia
                        ? `linear-gradient(to bottom, ${glowColor}, ${glowVia}, ${glowColor})`
                        : glowColor,
                  }}
                />

                {/* The inner dark cell */}
                <div
                  className="relative z-10 h-full w-full rounded-2xl transition-colors duration-300"
                  style={{ backgroundColor: bgColor }}
                />
              </div>
            );
          })}
        </div>

        {/* General Overlays to ensure pattern blends nicely */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/25 via-black/5 to-black/30" />
        <div className="pointer-events-none absolute inset-0 opacity-25 bg-[radial-gradient(circle_at_center,transparent_0%,#000_100%)]" />
      </motion.div>
    </div>
  );
}
