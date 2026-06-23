"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import {
  Globe,
  Users,
  TrendingUp,
  BookOpen,
  type LucideIcon,
} from "lucide-react";
import type React from "react";
import { useState } from "react";

const premiumEase = [0.16, 1, 0.3, 1] as const;

interface GridCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  minHeightClass: string;
}

function GridBackgroundCard({
  title,
  description,
  icon: Icon,
  minHeightClass,
}: GridCardProps) {
  const DEFAULT_INDEX = 16;
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(
    DEFAULT_INDEX,
  );
  const [hasInteracted, setHasInteracted] = useState(false);

  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);

  const columns = 6;
  const rows = 5;
  const totalItems = columns * rows;

  const cursorMask = useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, black 0%, transparent 100%)`;
  const idleMask =
    "radial-gradient(400px circle at 75% 45%, black 0%, transparent 100%)";
  const maskImage = hasInteracted ? cursorMask : idleMask;

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
    if (!hasInteracted) setHasInteracted(true);
    const { left, top } = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  };

  return (
    // biome-ignore lint/a11y/noStaticElementInteractions: local mouse proximity tracking
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        setHasInteracted(false);
        setHoveredIndex(DEFAULT_INDEX);
      }}
      className={`group relative flex ${minHeightClass} w-full flex-col justify-between overflow-hidden rounded-[24px] border border-zinc-200 bg-white p-8 md:p-10 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#2E5BFF]/10`}
    >
      {/* Light Mode Interactive Proximity Background Grid */}
      <motion.div
        className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden transition-opacity duration-500"
        style={{
          WebkitMaskImage: maskImage,
          maskImage: maskImage,
        }}
      >
        <div
          className="grid w-[110%] -ml-[5%] -mt-[5%] gap-2.5"
          style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
        >
          {Array.from({ length: totalItems }).map((_, index) => {
            const intensity = getIntensity(index);
            // Light mode boxes: transition from white/zinc-50 to transparent to reveal gradient
            const colorVal = Math.round(255 - 15 * intensity); // 255 (white) to 240 (light gray)
            const bgColor = `rgb(${colorVal}, ${colorVal}, ${colorVal})`;

            return (
              // biome-ignore lint/a11y/noStaticElementInteractions: cell hover tracking
              <div
                // biome-ignore lint/suspicious/noArrayIndexKey: stable static grid layout
                key={index}
                onMouseEnter={() => setHoveredIndex(index)}
                className="relative aspect-square w-full overflow-hidden rounded-[14px] p-[1.5px] transition-all duration-300 ease-out"
                style={{
                  backgroundColor: intensity > 0 ? "transparent" : "#f4f4f5", // zinc-100 base
                }}
              >
                {/* Glow outline gradient underneath */}
                <div
                  className="absolute inset-0 bg-gradient-to-b from-[#2E5BFF] via-[#149CCB] to-[#2E5BFF]"
                  style={{ opacity: intensity * 0.4 }}
                />

                {/* Inner light cell */}
                <div
                  className="relative z-10 h-full w-full rounded-[13px] transition-colors duration-300"
                  style={{
                    backgroundColor: intensity > 0.8 ? "transparent" : bgColor,
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* Blend overlays for light mode */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-white/80" />
      </motion.div>

      {/* Grid Text Overlay Fade Protection (Light Mode) */}
      <div className="pointer-events-none absolute inset-0 z-[5]">
        <div className="absolute inset-y-0 left-0 w-full max-w-xl bg-gradient-to-r from-white via-white/80 to-transparent" />
      </div>

      {/* Card Content (z-10) */}
      <div className="relative z-10 flex flex-col h-full justify-between max-w-[90%] text-left">
        {/* Top: Animated Icon */}
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-zinc-200 bg-white shadow-xs transition-all duration-500 group-hover:border-transparent group-hover:bg-[#2E5BFF]/10 group-hover:shadow-[0_0_20px_rgba(46,91,255,0.15)]">
          <Icon
            className="h-6 w-6 text-zinc-600 transition-colors duration-500 group-hover:text-[#2E5BFF]"
            strokeWidth={1.5}
          />
        </div>

        {/* Bottom: Text */}
        <div className="mt-8">
          <h4 className="text-2xl font-bold tracking-tight text-zinc-900 mb-3 transition-colors duration-300">
            {title}
          </h4>
          <p className="text-zinc-500 text-sm md:text-base leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function WhyJoinUs() {
  return (
    <section className="relative w-full bg-white px-10 py-24 md:py-32 text-zinc-900 border-t border-zinc-100">
      <div className="w-full mx-auto">
        {/* Title Section */}
        <div className="flex flex-col items-start mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: premiumEase }}
            className="mb-6 inline-flex items-center text-sm font-bold uppercase tracking-widest bg-linear-to-r from-[#2E5BFF] to-[#149CCB] bg-clip-text text-transparent md:text-base"
          >
            Benefits
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: premiumEase }}
            className="max-w-3xl text-4xl font-bold leading-[1.05em] tracking-tight text-black sm:text-5xl md:text-6xl lg:text-[4.5rem]"
          >
            Why Join Us
          </motion.h2>
        </div>

        {/* Light Boxy Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {/* Column 1 (Left) */}
          <div className="flex flex-col gap-6 w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: 0.1, ease: premiumEase }}
              className="w-full"
            >
              <GridBackgroundCard
                title="Flexible Work Culture"
                description="Work remotely or in a hybrid setup that fits your lifestyle. We prioritize outcomes and deep work over rigid hours."
                icon={Globe}
                minHeightClass="min-h-[380px] md:min-h-[460px]"
              />
            </motion.div>

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
                icon={Users}
                minHeightClass="min-h-[280px] md:min-h-[320px]"
              />
            </motion.div>
          </div>

          {/* Column 2 (Right) */}
          <div className="flex flex-col gap-6 w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: 0.15, ease: premiumEase }}
              className="w-full"
            >
              <GridBackgroundCard
                title="Competitive Compensation"
                description="Attractive salary packages with performance-based bonuses, premium healthcare, and growth incentives."
                icon={TrendingUp}
                minHeightClass="min-h-[280px] md:min-h-[320px]"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: 0.25, ease: premiumEase }}
              className="w-full"
            >
              <GridBackgroundCard
                title="Learning & Growth Support"
                description="Access to premium learning resources, dedicated mentorship, and unlimited opportunities to continuously upskill your craft."
                icon={BookOpen}
                minHeightClass="min-h-[380px] md:min-h-[460px]"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
