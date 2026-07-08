"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// A single light segment that traces the card's rounded border exactly once on
// hover, then decelerates to a stop resting on the top-right corner. Built as a
// measured SVG rounded-rect path whose start point IS the top-right corner, so
// one full `strokeDashoffset` lap (pathLength = 1, size-independent) begins and
// ends precisely there regardless of the card's aspect ratio.
export default function TracingBorder({
  active,
  radius = 20,
  gradientId,
}: {
  active: boolean;
  radius?: number;
  gradientId: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // offsetWidth/Height = layout size, unaffected by the card's hover scale.
    const measure = () => setSize({ w: el.offsetWidth, h: el.offsetHeight });
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const { w, h } = size;
  const inset = 1.5; // keep the stroke inside the card's rounded clip
  const W = w - inset * 2;
  const H = h - inset * 2;
  const r = Math.max(0, Math.min(radius - inset, W / 2, H / 2));
  const k = Math.SQRT1_2; // sin/cos 45° — the true corner point on the arc

  // Center of the top-right corner arc, and the 45° midpoint that reads as the
  // visual corner. The path starts and closes there.
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

  // Dash is 100% of the perimeter (1). Gap is also 1.
  // Animating dashoffset from 1 (hidden) to 0 (fully drawn) makes the border
  // wrap around the entire card, ending at the top-right corner where it started.
  const DASH = 1;
  const REST = 0;
  const START = 1;

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
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <title>Animated card border</title>
            <defs>
              <radialGradient
                id={gradientId}
                cx="100%"
                cy="0%"
                r="120%"
              >
                <stop stopColor="#149CCB" offset="0%" />
                <stop stopColor="#2E5BFF" offset="30%" />
                <stop stopColor="rgba(46, 91, 255, 0)" offset="100%" />
              </radialGradient>

              <filter
                id={`liquid-${gradientId}`}
                x="-20%"
                y="-20%"
                width="140%"
                height="140%"
              >
                <feTurbulence
                  type="fractalNoise"
                  baseFrequency="0.03"
                  numOctaves="3"
                  result="noise"
                >
                  <animate
                    attributeName="baseFrequency"
                    values="0.03; 0.04; 0.03"
                    dur="3s"
                    repeatCount="indefinite"
                  />
                </feTurbulence>
                <feDisplacementMap
                  in="SourceGraphic"
                  in2="noise"
                  scale="4"
                  xChannelSelector="R"
                  yChannelSelector="G"
                  result="displaced"
                />
                <feGaussianBlur in="displaced" stdDeviation="1.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="displaced" />
                </feMerge>
              </filter>
            </defs>

            {/* Glowing liquid trail */}
            <motion.path
              d={d}
              pathLength={1}
              stroke={`url(#${gradientId})`}
              strokeWidth={3}
              strokeLinecap="round"
              strokeDasharray="1 1"
              initial={{ strokeDashoffset: START }}
              animate={{ strokeDashoffset: REST }}
              transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
              style={{ filter: `url(#liquid-${gradientId})` }}
            />
          </motion.svg>
        )}
      </AnimatePresence>
    </div>
  );
}
