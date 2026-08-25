"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

// Defaults reproduce the original fixed 10x8 grid exactly, so every existing
// call site (CtaSection) renders byte-identically without passing anything.
const DEFAULT_COLUMNS = 10;
const DEFAULT_ROWS = 8;

const SWEEP_CELLS_PER_SEC = 6;
const SWEEP_TRAIL = 4;
const PLUS_ARM = 0.35;

export default function SpotlightGrid({
  speed = 1,
  glowColor,
  glowVia,
  maskRadius = 600,
  travel = 0.9,
  sweep = false,
  sweepColStart = 0,
  sweepColEnd,
  sweepRowStart = 0,
  sweepRowEnd,
  scatter = false,
  sweepTrail = SWEEP_TRAIL,
  plus = false,
  columns = DEFAULT_COLUMNS,
  rows = DEFAULT_ROWS,
  cellClassName = "rounded-2xl",
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
  scatter?: boolean;
  sweepTrail?: number;
  plus?: boolean;
  /** Grid shape. Fewer columns = larger cells at the same container width. */
  columns?: number;
  rows?: number;
  /** Corner treatment for both cell layers, e.g. "rounded-none" for square. */
  cellClassName?: string;
}) {
  const TOTAL_ITEMS = columns * rows;

  const reduce = useReducedMotion();
  const rootRef = useRef<HTMLDivElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);

  // A call site can re-shape the CSS grid at a breakpoint via
  // `--spotlight-cols` (CtaSection does, at max-md). The sweep maths indexed
  // cells by the `columns` prop, so at those breakpoints it addressed a grid
  // that was not the one on screen: cells lit in a scattered comb and whole
  // bands of the rendered grid stayed dark. Read the real track count instead.
  // Seeded with `columns` so SSR and the first client render agree, and the
  // item count is fixed by the props, so no markup ever moves.
  const [renderedCols, setRenderedCols] = useState(columns);

  // Re-shaping the columns also multiplies the ROW count (80 cells over 5
  // columns is 16 rows, not 8), and the grid is centred, so it overflows the
  // container top and bottom. A row window authored against the prop shape then
  // lands short of the rows actually on screen — which reads as the pattern
  // glowing everywhere except the bottom edge. Measure the visible band instead.
  const [visibleRows, setVisibleRows] = useState<{
    start: number;
    end: number;
  } | null>(null);

  // Where the sweep starts horizontally, overridable per breakpoint via
  // `--spotlight-sweep-col-start` — the same escape hatch as `--spotlight-cols`,
  // and for the same reason: the bound is a prop, so it cannot vary by media
  // query, and a call site may want the glow off the text and over to one side
  // on narrow screens only. Unset (the default) keeps the prop-derived value.
  const [sweepColOverride, setSweepColOverride] = useState<number | null>(null);

  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;
    const read = () => {
      const style = getComputedStyle(el);
      const tracks = style.gridTemplateColumns
        .split(" ")
        .filter(Boolean).length;
      if (tracks > 0) setRenderedCols(tracks);

      const rawCol = style
        .getPropertyValue("--spotlight-sweep-col-start")
        .trim();
      const parsedCol = Number.parseInt(rawCol, 10);
      setSweepColOverride(
        rawCol !== "" && Number.isInteger(parsedCol) ? parsedCol : null,
      );

      const root = rootRef.current;
      const cell = el.firstElementChild;
      if (!root || !cell) return;
      const pitch =
        cell.getBoundingClientRect().height + (parseFloat(style.rowGap) || 0);
      if (!(pitch > 0)) return;
      const offset =
        el.getBoundingClientRect().top - root.getBoundingClientRect().top;
      const start = Math.max(0, Math.floor(-offset / pitch));
      const end = Math.ceil((root.clientHeight - offset) / pitch) - 1;
      // Same object when nothing moved: this runs from a ResizeObserver, and a
      // fresh object every tick would re-render on every scroll-driven reflow.
      setVisibleRows((prev) =>
        prev && prev.start === start && prev.end === end
          ? prev
          : { start, end },
      );
    };
    read();
    const ro = new ResizeObserver(read);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const COLUMNS = renderedCols;
  const ROWS = Math.ceil(TOTAL_ITEMS / COLUMNS);

  // Region bounds are authored against the prop shape, so they only mean
  // anything once rescaled into the shape actually rendered. Ends are mapped
  // through their exclusive edge (end + 1) so a region that reached the last
  // column still reaches it after rescaling. When nothing was re-shaped this
  // is the identity, which is what keeps every existing call site byte-equal.
  const gridClamp = (v: number, hi: number) => Math.min(hi, Math.max(0, v));
  const reshaped = COLUMNS !== columns;
  const colStart = gridClamp(
    sweepColOverride ??
      (reshaped
        ? Math.round((sweepColStart / columns) * COLUMNS)
        : sweepColStart),
    COLUMNS - 1,
  );
  // Rows use the measured band rather than the proportional map: the authored
  // window describes a grid that fitted its container, and the re-shaped one
  // does not. Falls back to the proportional map until the first measurement.
  const rowStart = reshaped
    ? gridClamp(
        visibleRows
          ? visibleRows.start
          : Math.round((sweepRowStart / rows) * ROWS),
        ROWS - 1,
      )
    : sweepRowStart;
  const colEnd = reshaped
    ? gridClamp(
        Math.round((((sweepColEnd ?? columns - 1) + 1) / columns) * COLUMNS) -
          1,
        COLUMNS - 1,
      )
    : (sweepColEnd ?? COLUMNS - 1);
  const rowEnd = reshaped
    ? gridClamp(
        visibleRows
          ? visibleRows.end
          : Math.round((((sweepRowEnd ?? rows - 1) + 1) / rows) * ROWS) - 1,
        ROWS - 1,
      )
    : (sweepRowEnd ?? ROWS - 1);

  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);
  // Refs, not state. These change up to 30x/sec on mobile, and every one of
  // those commits used to re-render the whole grid -- TOTAL_ITEMS cells, three
  // divs each, reconciled per frame. The loop now writes the two paint-only
  // properties (opacity, background-color) straight onto the cells, so it does
  // ZERO React work. `getIntensity` reads these refs during render as well, so
  // a genuine re-render (resize, prop change) still paints the current frame
  // rather than resetting the grid to dark.
  const focusRef = useRef<{ row: number; col: number } | null>(null);
  const sweepHeadRef = useRef(-1);

  const scatterSteps = useMemo(() => {
    if (!scatter) return null;
    const n = (colEnd - colStart + 1) * (rowEnd - rowStart + 1);
    let seed = 0x9e3779b9;
    const rnd = () => {
      seed = (seed * 1664525 + 1013904223) >>> 0;
      return seed / 0x100000000;
    };
    const order = Array.from({ length: n }, (_, i) => i);
    for (let i = n - 1; i > 0; i--) {
      const j = Math.floor(rnd() * (i + 1));
      [order[i], order[j]] = [order[j], order[i]];
    }
    const steps = new Array<number>(n);
    for (let s = 0; s < n; s++) steps[order[s]] = s;
    return steps;
  }, [scatter, colStart, colEnd, rowStart, rowEnd]);

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
    // Below md the main thread is the scarce resource: a 60fps setState loop
    // re-rendering the whole grid was each page's single largest constant
    // cost (and its per-frame mutations kept iOS withholding native clicks --
    // see IosClickRescue). ~30fps commits of a drift this slow are visually
    // identical there.
    const minFrameMs = window.matchMedia("(max-width: 767px)").matches ? 33 : 0;
    let lastCommit = -Infinity;
    const tick = (now: number) => {
      if (!start) start = now;
      if (now - lastCommit < minFrameMs) {
        raf = requestAnimationFrame(tick);
        return;
      }
      lastCommit = now;
      const t = ((now - start) / 1000) * speed;

      if (sweep) {
        const regionCount = (colEnd - colStart + 1) * (rowEnd - rowStart + 1);
        const period = regionCount + sweepTrail;
        const next = (t * SWEEP_CELLS_PER_SEC) % period;
        // Same whole-step gate as before, minus the functional setState that
        // React had to run (and mostly bail out of) on every frame.
        if (Math.floor(next) !== Math.floor(sweepHeadRef.current)) {
          sweepHeadRef.current = next;
          paintRef.current();
        }
        raf = requestAnimationFrame(tick);
        return;
      }

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

      const fCol = midCol + ampCol * travel * Math.sin(t * 0.55);
      const fRow = midRow + ampRow * travel * Math.sin(t * 0.42 - 1.3);

      mouseX.set(-0.05 * dims.w + (fCol + 0.5) * cell);
      mouseY.set(gridTop + (fRow + 0.5) * cell);
      focusRef.current = { row: fRow, col: fCol };
      paintRef.current();

      raf = requestAnimationFrame(tick);
    };

    // Run only while on screen. The loop used to run from mount to unmount,
    // so every page paid for its CTA's spotlight for the whole visit even
    // with the section a full viewport away. Offscreen frames are invisible
    // by definition, so pausing cannot change what anyone sees.
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        if (!raf) raf = requestAnimationFrame(tick);
      } else {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    });
    io.observe(el);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
    };
  }, [
    reduce,
    mouseX,
    mouseY,
    speed,
    travel,
    sweep,
    colStart,
    colEnd,
    rowStart,
    rowEnd,
    sweepTrail,
    COLUMNS,
    ROWS,
  ]);

  const getIntensity = (index: number) => {
    if (sweep) {
      const centreAt = (row: number, col: number) => {
        if (row < rowStart || row > rowEnd) return 0;
        if (col < colStart || col > colEnd) return 0;

        const regionCols = colEnd - colStart + 1;
        const ordinal = (row - rowStart) * regionCols + (col - colStart);
        const step = scatterSteps ? scatterSteps[ordinal] : ordinal;

        const behind = sweepHeadRef.current - step;
        if (behind < 0 || behind > sweepTrail) return 0;
        return Math.sin(Math.PI * (1 - behind / sweepTrail)) ** 2;
      };

      const r = Math.floor(index / COLUMNS);
      const c = index % COLUMNS;
      if (r < rowStart || r > rowEnd) return 0;
      if (c < colStart || c > colEnd) return 0;

      const own = centreAt(r, c);
      if (!plus) return own;

      const arm = Math.max(
        centreAt(r - 1, c),
        centreAt(r + 1, c),
        centreAt(r, c - 1),
        centreAt(r, c + 1),
      );
      return Math.max(own, arm * PLUS_ARM);
    }

    const focus = focusRef.current;
    if (!focus) return 0;

    const row = Math.floor(index / COLUMNS);
    const col = index % COLUMNS;

    const distance = Math.sqrt((row - focus.row) ** 2 + (col - focus.col) ** 2);

    if (distance > 3.5) return 0;
    return Math.max(0, 1 - distance / 1.79);
  };

  // Writes exactly what a re-render would have written, without the re-render.
  // Both properties are paint-only, so this forces no layout. Cell order
  // matches the render map: child 0 is the glow, child 1 is the core.
  const paintCells = () => {
    const grid = gridRef.current;
    if (!grid) return;
    const cells = grid.children;
    for (let index = 0; index < cells.length; index++) {
      const intensity = getIntensity(index);
      const glow = cells[index].firstElementChild as HTMLElement | null;
      const core = glow?.nextElementSibling as HTMLElement | null;
      if (glow) glow.style.opacity = String(intensity * 0.8);
      if (core) {
        const v = Math.round(15 * (1 - intensity));
        core.style.backgroundColor = `rgb(${v}, ${v}, ${v})`;
      }
    }
  };
  // Latest-ref so the loop always calls a fresh closure without that closure
  // having to enter the effect's dependency array.
  const paintRef = useRef<() => void>(() => {});
  paintRef.current = paintCells;

  const sweepStepMs = 1000 / Math.max(0.001, speed * SWEEP_CELLS_PER_SEC);
  const sweepTween = sweep ? `${sweepStepMs}ms linear` : undefined;

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
                WebkitMaskImage: maskImage,
                maskImage,
              }
        }
      >
        <div
          ref={gridRef}
          className="grid w-[120%] -ml-[5%] gap-3"
          style={{
            // The fallback is the `columns` prop, never the measured count:
            // feeding the measured value back in would latch. Resize past the
            // breakpoint and back, and the var is gone but the fallback would
            // still read 4, pinning the grid at the mobile shape forever.
            gridTemplateColumns: `repeat(var(--spotlight-cols, ${columns}), minmax(0, 1fr))`,
          }}
        >
          {Array.from({ length: TOTAL_ITEMS }).map((_, index) => {
            const intensity = getIntensity(index);
            const colorVal = Math.round(15 * (1 - intensity));
            const bgColor = `rgb(${colorVal}, ${colorVal}, ${colorVal})`;

            return (
              <div
                key={index}
                className={`relative aspect-square w-full overflow-hidden ${cellClassName} transition-all duration-300 ease-out`}
                style={{ backgroundColor: "#121212" }}
              >
                <div
                  className={
                    glowColor
                      ? "absolute inset-0"
                      : "absolute inset-0 bg-gradient-to-r from-[#2E5BFF] to-[#1473cb]"
                  }
                  style={{
                    opacity: intensity * 0.8,
                    transition: sweepTween && `opacity ${sweepTween}`,
                    background:
                      glowColor && glowVia
                        ? `linear-gradient(to bottom, ${glowColor}, ${glowVia}, ${glowColor})`
                        : glowColor,
                  }}
                />

                <div
                  className={`absolute inset-[2px] z-10 ${cellClassName} transition-colors duration-300`}
                  style={{
                    backgroundColor: bgColor,
                    transition: sweepTween && `background-color ${sweepTween}`,
                  }}
                />
              </div>
            );
          })}
        </div>

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/25 via-black/5 to-black/30" />
        <div className="pointer-events-none absolute inset-0 opacity-25 bg-[radial-gradient(circle_at_center,transparent_0%,#000_100%)]" />
      </motion.div>
    </div>
  );
}
