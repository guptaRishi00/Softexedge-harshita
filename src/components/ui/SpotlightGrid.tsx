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

// Sweep mode: how many cells the light advances per second (before the `speed`
// multiplier), and how many cells the fading tail spans behind the head.
const SWEEP_CELLS_PER_SEC = 6;
const SWEEP_TRAIL = 4;

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
  // Lissajous swing amplitude as a fraction of the VISIBLE cell band (1 =
  // reaches the visible edge cells; lower keeps the spotlight nearer center).
  travel = 0.9,
  // Sweep mode: drops the reveal mask entirely (every cell stays visible) and
  // marches the glow across the grid column by column, left to right, on a
  // loop. maskRadius/travel are unused in this mode.
  sweep = false,
  // Sweep mode: the inclusive cell rectangle the light travels through, so it
  // can be kept clear of edges that sit under a scrim. Anything outside never
  // lights. Defaults cover the whole grid.
  sweepColStart = 0,
  sweepColEnd = COLUMNS - 1,
  sweepRowStart = 0,
  sweepRowEnd = ROWS - 1,
}: {
  speed?: number;
  glowColor?: string;
  glowVia?: string;
  maskRadius?: number;
  travel?: number;
  sweep?: boolean;
  sweepColStart?: number;
  sweepColEnd?: number;
  sweepRowStart?: number;
  sweepRowEnd?: number;
}) {
  const reduce = useReducedMotion();
  const rootRef = useRef<HTMLDivElement | null>(null);

  // Spotlight position in px (drives the reveal mask) plus the current focal
  // grid cell (drives the per-cell proximity glow). Both are driven by one
  // looping path so the lit cells always sit under the revealed spotlight.
  const mouseX = useMotionValue(-1000); // Start far off-screen
  const mouseY = useMotionValue(-1000);
  const [focus, setFocus] = useState<{ row: number; col: number } | null>(null);
  // Sweep mode only: index of the leading lit cell in the flat, row-major grid.
  const [sweepHead, setSweepHead] = useState(-1);

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

    const clamp = (v: number, lo: number, hi: number) =>
      Math.min(hi, Math.max(lo, v));

    let raf = 0;
    let start = 0;
    const tick = (now: number) => {
      if (!start) start = now;
      const t = ((now - start) / 1000) * speed;

      // Sweep: one cell at a time through the flat row-major index, so the
      // light runs left→right along a row, drops to the start of the next, and
      // continues top→bottom. The period overruns the grid by SWEEP_TRAIL so
      // the tail finishes fading off the last cell before it restarts at the
      // first. No mask here, so the px spotlight position is irrelevant.
      if (sweep) {
        // Head is an ordinal WITHIN the region (0 = its top-left cell), so the
        // cycle length is the region's cell count, not the whole grid's.
        const regionCount =
          (sweepColEnd - sweepColStart + 1) * (sweepRowEnd - sweepRowStart + 1);
        const period = regionCount + SWEEP_TRAIL;
        setSweepHead((t * SWEEP_CELLS_PER_SEC) % period);
        raf = requestAnimationFrame(tick);
        return;
      }

      // Grid renders at 120% width, shifted -5% left, vertically centered, so
      // its square cells overflow the container (extra columns off the right,
      // extra rows off the top/bottom). Solve which cell coordinates are
      // actually VISIBLE — their center lands inside [0,w]×[0,h] — and swing
      // the spotlight only across that band, so the glow never wanders onto a
      // clipped, off-screen box.
      const cell = (1.2 * dims.w) / COLUMNS;
      const gridTop = (dims.h - ROWS * cell) / 2;

      const colLo = clamp((0.05 * dims.w) / cell - 0.5, 0, COLUMNS - 1);
      const colHi = clamp((1.05 * dims.w) / cell - 0.5, 0, COLUMNS - 1);
      const rowLo = clamp(-gridTop / cell - 0.5, 0, ROWS - 1);
      const rowHi = clamp((dims.h - gridTop) / cell - 0.5, 0, ROWS - 1);

      const midCol = (colLo + colHi) / 2;
      const midRow = (rowLo + rowHi) / 2;
      const ampCol = (colHi - colLo) / 2;
      const ampRow = (rowHi - rowLo) / 2;

      // Two out-of-phase sines trace a continuous path across the visible band.
      const fCol = midCol + ampCol * travel * Math.sin(t * 0.55);
      // Phase -1.3 starts the spotlight near the top of the visible band.
      const fRow = midRow + ampRow * travel * Math.sin(t * 0.42 - 1.3);

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
  }, [
    reduce,
    mouseX,
    mouseY,
    speed,
    travel,
    sweep,
    sweepColStart,
    sweepColEnd,
    sweepRowStart,
    sweepRowEnd,
  ]);

  const getIntensity = (index: number) => {
    // Sweep is driven by the flat index, not a row/col position, and must be
    // checked before the `focus` guard below — focus stays null in this mode.
    // Only cells BEHIND the head light up, so the box at the head is brightest
    // and the few before it fade out as a tail.
    if (sweep) {
      const r = Math.floor(index / COLUMNS);
      const c = index % COLUMNS;
      if (r < sweepRowStart || r > sweepRowEnd) return 0;
      if (c < sweepColStart || c > sweepColEnd) return 0;

      // Position within the region, counted left→right then top→bottom.
      const regionCols = sweepColEnd - sweepColStart + 1;
      const ordinal = (r - sweepRowStart) * regionCols + (c - sweepColStart);

      const behind = sweepHead - ordinal;
      if (behind < 0 || behind > SWEEP_TRAIL) return 0;
      return 1 - behind / SWEEP_TRAIL;
    }

    if (!focus) return 0;

    const row = Math.floor(index / COLUMNS);
    const col = index % COLUMNS;

    const distance = Math.sqrt((row - focus.row) ** 2 + (col - focus.col) ** 2);

    if (distance > 3.5) return 0;
    return Math.max(0, 1 - distance / 1.79);
  };

  // Built unconditionally (hooks can't be called in a branch) but only applied
  // when not sweeping — sweep mode shows the whole grid, unmasked.
  const maskImage = useMotionTemplate`radial-gradient(${maskRadius}px circle at ${mouseX}px ${mouseY}px, black 0%, transparent 100%)`;

  return (
    <div
      ref={rootRef}
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      <motion.div
        className="absolute inset-0 flex items-center justify-center overflow-hidden transition-opacity duration-500"
        style={
          sweep
            ? undefined
            : {
                // Cuts a hole to reveal the pattern where the spotlight is
                WebkitMaskImage: maskImage,
                maskImage,
              }
        }
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
