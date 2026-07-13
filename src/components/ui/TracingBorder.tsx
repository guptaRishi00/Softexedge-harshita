"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// Tracing border: a comet orbits the card twice, then dissolves — its energy
// gathers into two glowing corners (bottom-left cyan, top-right blue) while
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

  // Timing: the comet completes its 2 laps, then dissolves right as the
  // corner glows bloom and the edges fade in — one continuous handoff
  // instead of a hard cut between "comet" and "static" states.
  const LAP_DURATION = 5;
  const HANDOFF = LAP_DURATION - 0.15;

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
                y2="100%"
              >
                <stop stopColor="#2E5BFF" offset="0%" />
                <stop stopColor="#149CCB" offset="50%" />
                <stop stopColor="#2E5BFF" offset="100%" />
              </linearGradient>

              {/* ── Static border color (cyan at BL → blue at TR) ── */}
              <linearGradient
                id={`border-color-${gradientId}`}
                x1="0%"
                y1="100%"
                x2="100%"
                y2="0%"
              >
                <stop stopColor="#149CCB" offset="0%" />
                <stop stopColor="#2E5BFF" offset="100%" />
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

              {/* Soft outer glow filter */}
              <filter
                id={`glow-${gradientId}`}
                x="-10%"
                y="-10%"
                width="120%"
                height="120%"
              >
                <feGaussianBlur
                  in="SourceGraphic"
                  stdDeviation="2"
                  result="blur"
                />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* ═══ Layer 1: Revolving comet — 2 laps, then dissolves ═══ */}
            <motion.path
              d={d}
              pathLength={1}
              stroke={color ?? `url(#comet-${gradientId})`}
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeDasharray={`${TAIL} ${GAP}`}
              initial={{ strokeDashoffset: 2.0, opacity: 1 }}
              animate={{ strokeDashoffset: [2, 1, 0], opacity: 0 }}
              transition={{
                strokeDashoffset: {
                  duration: LAP_DURATION,
                  times: [0, 0.45, 1],
                  ease: ["easeIn", "easeOut"],
                },
                opacity: {
                  duration: 0.45,
                  delay: LAP_DURATION - 0.45,
                  ease: "easeOut",
                },
              }}
              style={{ filter: `url(#glow-${gradientId})` }}
            />

            {/* ═══ Layer 2: Corner-weighted static border, revealed entirely
                 by the animated mask above ═══ */}
            <path
              d={d}
              stroke={color ?? `url(#border-color-${gradientId})`}
              strokeWidth={2.25}
              strokeLinecap="round"
              mask={`url(#corner-mask-${gradientId})`}
              style={{ filter: `url(#glow-${gradientId})` }}
            />
          </motion.svg>
        )}
      </AnimatePresence>
    </div>
  );
}
