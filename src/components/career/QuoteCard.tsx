"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

const QUOTE_GRID_COLUMNS = 4;
const MASK_EDGE_ALPHA = 0.6;
const MASK_RADIUS = 220;
const quoteCellIds = Array.from({ length: 32 }, (_, i) => `quote-cell-${i}`);

export default function QuoteCard({ text }: { text: string }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const hoveringRef = useRef(false);
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);

  const parkMask = useCallback(() => {
    const el = cardRef.current;
    if (!el || el.offsetWidth === 0) return;
    mouseX.set(el.offsetWidth * 0.85);
    mouseY.set(el.offsetHeight / 2);
  }, [mouseX, mouseY]);

  const setCardRef = useCallback(
    (node: HTMLDivElement | null) => {
      cardRef.current = node;
      if (node && !hoveringRef.current) {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            if (cardRef.current && !hoveringRef.current) {
              mouseX.set(cardRef.current.offsetWidth * 0.85);
              mouseY.set(cardRef.current.offsetHeight / 2);
            }
          });
        });
      }
    },
    [mouseX, mouseY],
  );

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      if (!hoveringRef.current) parkMask();
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [parkMask]);

  const getIntensity = (i: number) => {
    if (hoveredIndex === null) return 0;
    const row = Math.floor(i / QUOTE_GRID_COLUMNS);
    const col = i % QUOTE_GRID_COLUMNS;
    const hoverRow = Math.floor(hoveredIndex / QUOTE_GRID_COLUMNS);
    const hoverCol = hoveredIndex % QUOTE_GRID_COLUMNS;
    const distance = Math.sqrt((row - hoverRow) ** 2 + (col - hoverCol) ** 2);
    return distance > 3.5 ? 0 : 1 - distance / 1.79;
  };

  const mask = useMotionTemplate`radial-gradient(${MASK_RADIUS}px circle at ${mouseX}px ${mouseY}px, black 0%, rgba(0,0,0,${MASK_EDGE_ALPHA}) 100%)`;

  return (
    // biome-ignore lint/a11y/noStaticElementInteractions: decorative card — pointer only drives the background mask
    <div
      ref={setCardRef}
      onMouseMove={(e) => {
        hoveringRef.current = true;
        const { left, top } = e.currentTarget.getBoundingClientRect();
        mouseX.set(e.clientX - left);
        mouseY.set(e.clientY - top);
      }}
      onMouseLeave={() => {
        hoveringRef.current = false;
        setHoveredIndex(null);
        parkMask();
      }}
      className="relative flex h-full w-full flex-col justify-start gap-1 overflow-hidden bg-black p-3.5 md:gap-2 md:p-7"
    >
      <motion.div
        className="absolute inset-0 z-0 overflow-hidden"
        style={{ WebkitMaskImage: mask, maskImage: mask }}
      >
        <div className="relative -left-[5%] grid w-[110%] -translate-y-6 grid-cols-4 gap-1">
          {quoteCellIds.map((id, i) => {
            const intensity = getIntensity(i);
            const colorVal = Math.round(22 + 14 * intensity);
            return (
              // biome-ignore lint/a11y/noStaticElementInteractions: decorative background cell — hover only tints it
              <div
                key={id}
                onMouseEnter={() => setHoveredIndex(i)}
                className="relative aspect-square w-full overflow-hidden rounded-md p-[0.8px]"
                style={{
                  backgroundColor: intensity > 0 ? "transparent" : "#161616",
                }}
              >
                <div
                  className="relative z-10 h-full w-full rounded-md"
                  style={{
                    backgroundColor: `rgb(${colorVal}, ${colorVal}, ${colorVal})`,
                  }}
                />
              </div>
            );
          })}
        </div>
      </motion.div>

      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="relative z-10 h-7 w-7 shrink-0 text-[#464646] max-md:fill-black md:h-12 md:w-12"
      >
        <title>Quote</title>
        <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
        <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
      </svg>

      <p className="relative z-10 text-sm font-regular leading-[1.25em] mt-3 max-md:mt-1.5 tracking-tight text-white md:text-base">
        {text}
      </p>
    </div>
  );
}
