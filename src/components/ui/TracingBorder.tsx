"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// Tracing border: a comet orbits the card once, then dissolves — its energy
// gathers into two glowing corners (left blue, right cyan) while
// the connecting edges softly fade in.
export default function TracingBorder({
  active,
  radius = 20,
  gradientId,
  color,
}: {
  active: boolean;
  radius?: number;
  gradientId: string;
  // When set, the comet + border render as this solid color instead of the
  // default blue→cyan gradient.
  color?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => setSize({ w: el.offsetWidth, h: el.offsetHeight });
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const { w, h } = size;
  const inset = 1.5;
  const W = w - inset * 2;
  const H = h - inset * 2;
  const r = Math.max(0, Math.min(radius - inset, W / 2, H / 2));
  const k = Math.SQRT1_2;

  // Start at the 45° midpoint of the top-right corner arc
  const trCx = inset + W - r;
  const trCy = inset + r;
  const sx = (trCx + r * k).toFixed(2);
  const sy = (trCy - r * k).toFixed(2);
  const f = (n: number) => n.toFixed(2);

  const d =
    W > 0 && H > 0
      ? `M ${sx} ${sy}` +
        ` A ${r} ${r} 0 0 1 ${f(inset + W)} ${f(inset + r)}` +
        ` L ${f(inset + W)} ${f(inset + H - r)}` +
        ` A ${r} ${r} 0 0 1 ${f(inset + W - r)} ${f(inset + H)}` +
        ` L ${f(inset + r)} ${f(inset + H)}` +
        ` A ${r} ${r} 0 0 1 ${f(inset)} ${f(inset + H - r)}` +
        ` L ${f(inset)} ${f(inset + r)}` +
        ` A ${r} ${r} 0 0 1 ${f(inset + r)} ${f(inset)}` +
        ` L ${f(inset + W - r)} ${f(inset)}` +
        ` A ${r} ${r} 0 0 1 ${sx} ${sy} Z`
      : "";

  // Comet animation constants
  const TAIL = 0.25;
  const GAP = 0.75;

  // Corner pixel positions
  const blX = inset;
  const blY = inset + H;
  const trX = inset + W;
  const trY = inset;

  // Glow radius — how far the bright corner spot extends (in pixels). Larger =
  // the TR/BL corner weight reaches further along the adjacent edges.
  const glowR = Math.min(w, h) * 1.125;

  // Timing: the comet stays bright through its full lap and lands crisply at
  // the top-right corner (its start/end point) at t = LAP_DURATION. The instant
  // it lands, the corner glows bloom and the edges fade in (HANDOFF), while the
  // comet dissolves into that corner energy — a clean stop-then-handoff rather
  // than a fade that dims the comet before it arrives.
  const LAP_DURATION = 2.5;
  const HANDOFF = LAP_DURATION;

  return (
    <div ref={ref} className="pointer-events-none absolute inset-0 z-30">
      <AnimatePresence>
        {active && d && (
          <motion.svg
            key="trace"
            className="absolute inset-0 h-full w-full"
            viewBox={`0 0 ${w} ${h}`}
            fill="none"
            preserveAspectRatio="none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{
              opacity: 0,
              transition: { duration: 0.4, ease: "easeOut" },
            }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <title>Animated card border</title>
            <defs>
              {/* ── Comet gradient (for the revolving animation) ── */}
              <linearGradient
                id={`comet-${gradientId}`}
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop stopColor="#2E5BFF" offset="0%" />
                <stop stopColor="#149CCB" offset="100%" />
              </linearGradient>

              {/* ── Static border color (blue left → cyan right) ── */}
              <linearGradient
                id={`border-color-${gradientId}`}
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop stopColor="#2E5BFF" offset="0%" />
                <stop stopColor="#149CCB" offset="100%" />
              </linearGradient>

              {/* ── Corner mask gradients (white = visible, black = hidden) ── */}
              <radialGradient
                id={`mask-bl-${gradientId}`}
                cx={blX}
                cy={blY}
                r={glowR}
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="white" offset="0%" />
                <stop stopColor="white" offset="25%" />
                <stop stopColor="#555" offset="65%" />
                <stop stopColor="black" offset="100%" />
              </radialGradient>

              <radialGradient
                id={`mask-tr-${gradientId}`}
                cx={trX}
                cy={trY}
                r={glowR}
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="white" offset="0%" />
                <stop stopColor="white" offset="25%" />
                <stop stopColor="#555" offset="65%" />
                <stop stopColor="black" offset="100%" />
              </radialGradient>

              {/*
                Luminance mask — this is what actually creates the "weight
                shift":
                - base rect starts fully hidden (black) and fades up to the
                  faint #2e2e2e edge level → edges fade in
                - the two corner circles grow from r:0 to glowR, staggered
                  slightly (top-right first, since that's where the comet
                  lands) → weight visibly gathers into the corners
              */}
              <mask id={`corner-mask-${gradientId}`}>
                <motion.rect
                  x="0"
                  y="0"
                  width={w}
                  height={h}
                  initial={{ fill: "#000000" }}
                  animate={{ fill: "#2e2e2e" }}
                  transition={{
                    duration: 1.1,
                    delay: HANDOFF,
                    ease: "easeOut",
                  }}
                />
                <motion.circle
                  cx={trX}
                  cy={trY}
                  fill={`url(#mask-tr-${gradientId})`}
                  initial={{ r: 0 }}
                  animate={{ r: glowR }}
                  transition={{
                    duration: 0.9,
                    delay: HANDOFF,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                />
                <motion.circle
                  cx={blX}
                  cy={blY}
                  fill={`url(#mask-bl-${gradientId})`}
                  initial={{ r: 0 }}
                  animate={{ r: glowR }}
                  transition={{
                    duration: 0.9,
                    delay: HANDOFF + 0.12,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                />
              </mask>
            </defs>

            {/* ═══ Layer 1: Revolving comet — one full-brightness lap, then a
                 quick dissolve that fires only once it lands at the top-right
                 corner (delay = LAP_DURATION) so the handoff is instant.
                 Glow = a wide soft halo stroke under the crisp core stroke
                 (layered strokes animate cheaply; an feGaussianBlur filter
                 would re-rasterize every frame and stutter). ═══ */}
            <motion.g
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{
                duration: 0.3,
                delay: LAP_DURATION,
                ease: "easeOut",
              }}
            >
              {/* Halo */}
              <motion.path
                d={d}
                pathLength={1}
                stroke={color ?? `url(#comet-${gradientId})`}
                strokeWidth={6}
                strokeOpacity={0.28}
                strokeLinecap="round"
                strokeDasharray={`${TAIL} ${GAP}`}
                initial={{ strokeDashoffset: 1.0 }}
                animate={{ strokeDashoffset: 0 }}
                transition={{ duration: LAP_DURATION, ease: "easeInOut" }}
              />
              {/* Core */}
              <motion.path
                d={d}
                pathLength={1}
                stroke={color ?? `url(#comet-${gradientId})`}
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeDasharray={`${TAIL} ${GAP}`}
                initial={{ strokeDashoffset: 1.0 }}
                animate={{ strokeDashoffset: 0 }}
                transition={{ duration: LAP_DURATION, ease: "easeInOut" }}
              />
            </motion.g>

            {/* ═══ Layer 2: Corner-weighted static border, revealed entirely
                 by the animated mask above — same layered-stroke glow ═══ */}
            <g mask={`url(#corner-mask-${gradientId})`}>
              <path
                d={d}
                stroke={color ?? `url(#border-color-${gradientId})`}
                strokeWidth={5.5}
                strokeOpacity={0.25}
                strokeLinecap="round"
              />
              <path
                d={d}
                stroke={color ?? `url(#border-color-${gradientId})`}
                strokeWidth={2.25}
                strokeLinecap="round"
              />
            </g>
          </motion.svg>
        )}
      </AnimatePresence>
    </div>
  );
}
