"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

export type Channel = {
  label: string;
  value: string;
  href: string;
  Icon: LucideIcon;
  colSpan: string;
};

const boxyCellIds = Array.from({ length: 80 }, (_, i) => `box-${i}`);

export default function ChannelCard({
  label,
  value,
  href,
  Icon,
  colSpan,
}: Channel) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const cardRef = useRef<HTMLAnchorElement>(null);
  const hoveringRef = useRef(false);
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);

  const parkMaskRight = useCallback(() => {
    const el = cardRef.current;
    if (!el || el.offsetWidth === 0) return;
    mouseX.set(el.offsetWidth * 0.85);
    mouseY.set(el.offsetHeight / 2);
  }, [mouseX, mouseY]);

  const setCardRef = useCallback(
    (node: HTMLAnchorElement | null) => {
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
      if (!hoveringRef.current) parkMaskRight();
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [parkMaskRight]);

  const gridColumns = colSpan.includes("sm:col-span-1") ? 3 : 6;

  const getIntensity = (i: number) => {
    if (hoveredIndex === null) return 0;
    const row = Math.floor(i / gridColumns);
    const col = i % gridColumns;
    const hoverRow = Math.floor(hoveredIndex / gridColumns);
    const hoverCol = hoveredIndex % gridColumns;
    const distance = Math.sqrt((row - hoverRow) ** 2 + (col - hoverCol) ** 2);
    return distance > 3.5 ? 0 : 1 - distance / 1.79;
  };

  const mask = useMotionTemplate`radial-gradient(280px circle at ${mouseX}px ${mouseY}px, black 0%, rgba(0,0,0,0.15) 100%)`;

  return (
    <a
      href={href}
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
        parkMaskRight();
      }}
      className={`group relative overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-950/20 transition-transform duration-300 block ${colSpan}`}
    >
      <motion.div
        className="absolute inset-0 z-0 overflow-hidden"
        style={{ WebkitMaskImage: mask, maskImage: mask }}
      >
        <div
          className="grid gap-2 relative w-[110%] -left-[5%] -translate-y-6"
          style={{
            gridTemplateColumns: `repeat(${gridColumns}, minmax(0, 1fr))`,
          }}
        >
          {boxyCellIds.map((id, i) => {
            const intensity = getIntensity(i);
            const colorVal = Math.round(22 + 14 * intensity);
            return (
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

      <div className="pointer-events-none relative z-10 flex h-full flex-col justify-between gap-6 p-6 sm:p-8">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-900 text-zinc-400 transition-colors duration-300 group-hover:bg-zinc-900 group-hover:text-white">
          <Icon className="h-5 w-5" strokeWidth={2} />
        </span>
        <span className="flex flex-col gap-1">
          <span className="text-sm font-semibold tracking-wide text-zinc-500 uppercase">
            {label}
          </span>
          <span className="text-lg font-medium text-white sm:text-xl">
            {value}
          </span>
        </span>
      </div>
    </a>
  );
}
