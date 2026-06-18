// src/components/career/WhyJoinUs.tsx
"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import type React from "react";
import { useState } from "react";

const premiumEase = [0.16, 1, 0.3, 1] as const;

interface GridCardProps {
  title: string;
  description: string;
  minHeightClass: string;
}

function GridBackgroundCard({
  title,
  description,
  minHeightClass,
}: GridCardProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Set up motion values to track the mouse position for the spotlight mask
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);

  const columns = 6;
  const rows = 5;
  const totalItems = columns * rows;

  const getIntensity = (index: number) => {
    if (hoveredIndex === null) return 0;

    const row = Math.floor(index / columns);
    const col = index % columns;

    const hoverRow = Math.floor(hoveredIndex / columns);
    const hoverCol = hoveredIndex % columns;

    const distance = Math.sqrt((row - hoverRow) ** 2 + (col - hoverCol) ** 2);

    if (distance > 2.5) return 0;
    return Math.max(0, 1 - distance / 1.5);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  };

  return (
    // biome-ignore lint/a11y/noStaticElementInteractions: local mouse proximity tracking
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setHoveredIndex(null)}
      className={`relative flex ${minHeightClass} w-full flex-col justify-between overflow-hidden rounded-[24px] border border-zinc-800/50 bg-black p-8 md:p-10`}
    >
      {/* Interactive Proximity Background Grid */}
      <motion.div
        className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden transition-opacity duration-500"
        style={{
          WebkitMaskImage: useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, black 0%, transparent 100%)`,
          maskImage: useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, black 0%, transparent 100%)`,
        }}
      >
        <div
          className="grid w-[110%] -ml-[5%] -mt-[5%] gap-2.5"
          style={{
            gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
          }}
        >
          {Array.from({ length: totalItems }).map((_, index) => {
            const intensity = getIntensity(index);
            const colorVal = Math.round(18 * (1 - intensity)); // Grid cell darkness (transitions to black under mouse)
            const bgColor = `rgb(${colorVal}, ${colorVal}, ${colorVal})`;

            return (
              // biome-ignore lint/a11y/noStaticElementInteractions: cell hover tracking
              <div
                // biome-ignore lint/suspicious/noArrayIndexKey: stable static grid layout
                key={index}
                onMouseEnter={() => setHoveredIndex(index)}
                className="relative aspect-square w-full overflow-hidden rounded-[14px] p-[1.5px] transition-all duration-300 ease-out"
                style={{
                  backgroundColor: intensity > 0 ? "transparent" : "#121212",
                }}
              >
                {/* Glow outline gradient */}
                <div
                  className="absolute inset-0 bg-gradient-to-b from-[#2E5BFF] via-[#149CCB] to-[#2E5BFF]"
                  style={{ opacity: intensity * 0.75 }}
                />

                {/* Inner dark cell */}
                <div
                  className="relative z-10 h-full w-full rounded-[13px] transition-colors duration-300"
                  style={{ backgroundColor: bgColor }}
                />
              </div>
            );
          })}
        </div>

        {/* Blend overlays */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />
      </motion.div>

      {/* Grid Text Overlay Fade Protection */}
      <div className="pointer-events-none absolute inset-0 z-[5]">
        <div className="absolute inset-y-0 left-0 w-full max-w-xl bg-gradient-to-r from-black via-black/80 to-transparent" />
      </div>

      {/* Card Content (z-10) */}
      <div className="relative z-10 flex flex-col justify-start max-w-[85%] text-left">
        <h4 className="text-2xl font-bold tracking-tight text-white mb-4">
          {title}
        </h4>
        <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}

export default function WhyJoinUs() {
  return (
    <section className="relative w-full bg-white px-6 py-20 md:px-12 md:py-28 text-zinc-900 border-t border-zinc-100">
      <div className="w-full mx-auto">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: premiumEase }}
          className="text-4xl font-bold tracking-tight text-zinc-950 sm:text-5xl md:text-6xl mb-16 text-left"
        >
          Why Join Us
        </motion.h2>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {/* Column 1 (Left) */}
          <div className="flex flex-col gap-6 w-full">
            {/* Card 1: Flexible Work Culture (Taller) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: 0.1, ease: premiumEase }}
              className="w-full"
            >
              <GridBackgroundCard
                title="Flexible Work Culture"
                description="Work remotely or in a hybrid setup that fits your lifestyle and productivity."
                minHeightClass="min-h-[380px] md:min-h-[460px]"
              />
            </motion.div>

            {/* Card 2: Creative & Collaborative Team (Shorter) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: 0.2, ease: premiumEase }}
              className="w-full"
            >
              <GridBackgroundCard
                title="Creative & Collaborative Team"
                description="Work with passionate designers, developers, and marketers in a supportive, idea-driven culture."
                minHeightClass="min-h-[280px] md:min-h-[320px]"
              />
            </motion.div>
          </div>

          {/* Column 2 (Right) */}
          <div className="flex flex-col gap-6 w-full">
            {/* Card 3: Competitive Compensation (Shorter) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: 0.15, ease: premiumEase }}
              className="w-full"
            >
              <GridBackgroundCard
                title="Competitive Compensation"
                description="Attractive salary packages with performance-based bonuses and growth incentives."
                minHeightClass="min-h-[280px] md:min-h-[320px]"
              />
            </motion.div>

            {/* Card 4: Learning & Growth Support (Taller) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: 0.25, ease: premiumEase }}
              className="w-full"
            >
              <GridBackgroundCard
                title="Learning & Growth Support"
                description="Access to learning resources, mentorship, and opportunities to upskill continuously."
                minHeightClass="min-h-[380px] md:min-h-[460px]"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
