"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function TracingBorder({
  active,
  radius = 20,
  gradientId,
  color,
  edgeComets = false,
}: {
  active: boolean;
  radius?: number;
  gradientId: string;
  color?: string;
  edgeComets?: boolean;
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
  const f = (n: number) => n.toFixed(2);

  const STOP_SHORT = 100;
  const sx = f(Math.max(inset + r, inset + W - r - STOP_SHORT));
  const sy = f(inset);

  const d =
    W > 0 && H > 0
      ? `M ${sx} ${sy}` +
        ` L ${f(inset + W - r)} ${f(inset)}` +
        ` A ${r} ${r} 0 0 1 ${f(inset + W)} ${f(inset + r)}` +
        ` L ${f(inset + W)} ${f(inset + H - r)}` +
        ` A ${r} ${r} 0 0 1 ${f(inset + W - r)} ${f(inset + H)}` +
        ` L ${f(inset + r)} ${f(inset + H)}` +
        ` A ${r} ${r} 0 0 1 ${f(inset)} ${f(inset + H - r)}` +
        ` L ${f(inset)} ${f(inset + r)}` +
        ` A ${r} ${r} 0 0 1 ${f(inset + r)} ${f(inset)}` +
        ` L ${sx} ${sy} Z`
      : "";

  const topD =
    W > 0 && H > 0
      ? `M ${f(inset + r)} ${f(inset)}` +
        ` L ${f(inset + W - r)} ${f(inset)}` +
        ` A ${r} ${r} 0 0 1 ${f(inset + W)} ${f(inset + r)}`
      : "";
  const bottomD =
    W > 0 && H > 0
      ? `M ${f(inset + W - r)} ${f(inset + H)}` +
        ` L ${f(inset + r)} ${f(inset + H)}` +
        ` A ${r} ${r} 0 0 1 ${f(inset)} ${f(inset + H - r)}`
      : "";
  const edgePaths = [
    { id: "top", d: topD },
    { id: "bottom", d: bottomD },
  ];

  const TAIL = 0.25;
  const GAP = 0.75;

  const blX = inset;
  const blY = inset + H;
  const trX = inset + W;
  const trY = inset;

  const glowR = Math.min(w, h) * 1.125;

  const LAP_DURATION = 2.5;
  const HANDOFF = LAP_DURATION - 0.15; 
  const DISSOLVE_START = LAP_DURATION - 0.2; 
  const DISSOLVE_DURATION = 0.7; 
  const BLOOM = 0.8; 

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

              <mask id={`corner-mask-${gradientId}`}>
                <motion.rect
                  x="0"
                  y="0"
                  width={w}
                  height={h}
                  initial={{ fill: "#000000" }}
                  animate={{ fill: "#2e2e2e" }}
                  transition={{
                    duration: BLOOM,
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
                    duration: BLOOM,
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
                    duration: BLOOM,
                    delay: HANDOFF + 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                />
              </mask>
            </defs>

            <motion.g
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{
                duration: DISSOLVE_DURATION,
                delay: DISSOLVE_START,
                ease: "easeOut",
              }}
            >
              {edgeComets
                ? 
                  edgePaths.map((edge) => (
                    <g key={edge.id}>
                      <motion.path
                        d={edge.d}
                        pathLength={1}
                        stroke={color ?? `url(#comet-${gradientId})`}
                        strokeWidth={6}
                        strokeOpacity={0.28}
                        strokeLinecap="round"
                        strokeDasharray={`${TAIL} ${GAP}`}
                        initial={{ strokeDashoffset: TAIL }}
                        animate={{ strokeDashoffset: TAIL - 1 }}
                        transition={{
                          duration: LAP_DURATION,
                          ease: "easeInOut",
                        }}
                      />
                      <motion.path
                        d={edge.d}
                        pathLength={1}
                        stroke={color ?? `url(#comet-${gradientId})`}
                        strokeWidth={2.5}
                        strokeLinecap="round"
                        strokeDasharray={`${TAIL} ${GAP}`}
                        initial={{ strokeDashoffset: TAIL }}
                        animate={{ strokeDashoffset: TAIL - 1 }}
                        transition={{
                          duration: LAP_DURATION,
                          ease: "easeInOut",
                        }}
                      />
                    </g>
                  ))
                : [
                    <g key="orbit">
                      <motion.path
                        d={d}
                        pathLength={1}
                        stroke={color ?? `url(#comet-${gradientId})`}
                        strokeWidth={6}
                        strokeOpacity={0.28}
                        strokeLinecap="round"
                        strokeDasharray={`${TAIL} ${GAP}`}
                        initial={{ strokeDashoffset: 1 + TAIL }}
                        animate={{ strokeDashoffset: TAIL }}
                        transition={{
                          duration: LAP_DURATION,
                          ease: "easeInOut",
                        }}
                      />
                      <motion.path
                        d={d}
                        pathLength={1}
                        stroke={color ?? `url(#comet-${gradientId})`}
                        strokeWidth={2.5}
                        strokeLinecap="round"
                        strokeDasharray={`${TAIL} ${GAP}`}
                        initial={{ strokeDashoffset: 1 + TAIL }}
                        animate={{ strokeDashoffset: TAIL }}
                        transition={{
                          duration: LAP_DURATION,
                          ease: "easeInOut",
                        }}
                      />
                    </g>,
                  ]}
            </motion.g>

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
