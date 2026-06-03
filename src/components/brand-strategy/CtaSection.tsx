"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { MdArrowOutward } from "react-icons/md";
import ConnectButtonThree from "../shared/ConnectButtonThree";

const premiumEase = [0.22, 1, 0.36, 1] as const;

export default function CtaSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // CHANGED: Reduced total items and columns to make each square significantly bigger
  const totalItems = 80;
  const columns = 10;

  const getIntensity = (index: number) => {
    if (hoveredIndex === null) return 0;

    const row = Math.floor(index / columns);
    const col = index % columns;

    const hoverRow = Math.floor(hoveredIndex / columns);
    const hoverCol = hoveredIndex % columns;

    const distance = Math.sqrt(
      Math.pow(row - hoverRow, 2) + Math.pow(col - hoverCol, 2),
    );

    if (distance > 3.5) return 0;
    return Math.max(0, 1 - distance / 1.79);
  };

  return (
    <section className="relative w-full bg-white px-0 md:px-0 md:pt-10">
      <div className="mx-auto w-full">
        {/* Main CTA Container */}
        <div className="relative flex min-h-[60vh] w-full flex-col justify-between overflow-hidden rounded-[20px] border border-zinc-800/50 bg-black">
          {/* Interactive Proximity Background Grid */}
          <div className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden">
            <div
              // CHANGED: Slightly increased the gap from gap-2 to gap-3 to balance the larger squares, but you can change it back if you prefer tighter spacing.
              className="grid w-[120%] -ml-[5%] gap-3"
              style={{
                gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
              }}
            >
              {Array.from({ length: totalItems }).map((_, index) => {
                const intensity = getIntensity(index);
                const colorVal = Math.round(15 * (1 - intensity));
                const bgColor = `rgb(${colorVal}, ${colorVal}, ${colorVal})`;

                return (
                  <div
                    key={index}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    className="relative aspect-square w-full overflow-hidden rounded-2xl p-[2px] transition-all duration-300 ease-out"
                    style={{
                      backgroundColor:
                        intensity > 0 ? "transparent" : "#121212",
                    }}
                  >
                    {/* The colored glow that appears on hover */}
                    <div
                      className="absolute inset-0 bg-gradient-to-b from-[#2E5BFF] via-[#149CCB] to-[#2E5BFF]"
                      style={{ opacity: intensity * 0.8 }}
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

            {/* Overlays to ensure text remains highly readable over the active grid */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/80" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000_100%)] opacity-60" />
          </div>

          {/* Top Content: Massive Typography */}
          <div className="pointer-events-none relative z-10 p-8 pt-16 md:p-16 lg:p-24">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: premiumEase }}
            >
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-2 w-2 items-center justify-center rounded-full bg-[#2E5BFF]">
                  <div className="absolute h-4 w-4 animate-ping rounded-full bg-[#149CCB]/40" />
                </div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-zinc-400 md:text-sm">
                  Available for new projects
                </p>
              </div>

              <h2 className="text-5xl font-bold leading-[0.95] tracking-tight text-white md:text-7xl lg:text-[5rem]">
                Let's build something <br className="hidden md:block" />
                <span className="bg-gradient-to-r from-[#2E5BFF] to-[#149CCB] bg-clip-text pr-4 text-transparent">
                  extraordinary.
                </span>
              </h2>
            </motion.div>
          </div>

          {/* Bottom Content: Actions & Meta Info */}
          <div className="pointer-events-none relative z-10 flex flex-col items-start justify-between gap-10 p-8 md:flex-row md:items-end md:p-16 lg:p-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1, ease: premiumEase }}
              className="pointer-events-auto"
            >
              <ConnectButtonThree />
            </motion.div>

            {/* Meta Information (Location, Email, etc.) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: premiumEase }}
              className="pointer-events-auto flex flex-col gap-6 text-sm font-medium text-zinc-400 md:flex-row md:gap-12 md:text-base lg:text-right"
            >
              <div className="flex flex-col gap-1">
                <span className="text-xs uppercase tracking-wider text-zinc-600">
                  Drop us a line
                </span>
                <a
                  href="mailto:hello@youragency.com"
                  className="text-white transition-colors hover:text-[#149CCB]"
                >
                  hello@youragency.com
                </a>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs uppercase tracking-wider text-zinc-600">
                  Local Time
                </span>
                <span className="text-white">Assam, 6:55 PM</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
