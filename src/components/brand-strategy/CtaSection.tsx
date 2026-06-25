// src/components/home/CtaSection.tsx
"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import type React from "react";
import { useState } from "react";
import { MdArrowOutward } from "react-icons/md";

const premiumEase = [0.22, 1, 0.36, 1] as const;

// Helper array for the realistic avatars
const avatars = [
  "https://i.pravatar.cc/150?img=11",
  "https://i.pravatar.cc/150?img=12",
  "https://i.pravatar.cc/150?img=5",
  "https://i.pravatar.cc/150?img=43",
  "https://i.pravatar.cc/150?img=14",
  "https://i.pravatar.cc/150?img=49",
];

export default function CtaSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Set up motion values to track the mouse position for the spotlight
  const mouseX = useMotionValue(-1000); // Start far off-screen
  const mouseY = useMotionValue(-1000);

  const totalItems = 80;
  const columns = 10;

  const getIntensity = (index: number) => {
    if (hoveredIndex === null) return 0;

    const row = Math.floor(index / columns);
    const col = index % columns;

    const hoverRow = Math.floor(hoveredIndex / columns);
    const hoverCol = hoveredIndex % columns;

    const distance = Math.sqrt((row - hoverRow) ** 2 + (col - hoverCol) ** 2);

    if (distance > 3.5) return 0;
    return Math.max(0, 1 - distance / 1.79);
  };

  // Update motion values as the mouse moves over the section
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  };

  return (
    <section className="relative w-full bg-white px-0 md:px-0 md:pt-0">
      <div className="mx-auto w-full">
        {/* Main CTA Container - Reduced height to 45vh */}
        <div
          className="relative flex min-h-[45vh] w-full flex-col justify-between overflow-hidden rounded-[20px] border border-zinc-800/50 bg-black"
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {/* Interactive Proximity Background Grid */}
          <motion.div
            className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden transition-opacity duration-500"
            style={{
              // This mask cuts a hole to reveal the pattern where the mouse is
              WebkitMaskImage: useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, black 0%, transparent 100%)`,
              maskImage: useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, black 0%, transparent 100%)`,
            }}
          >
            <div
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

            {/* General Overlays to ensure pattern blends nicely */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/25 via-black/5 to-black/30" />
            <div className="pointer-events-none absolute inset-0 opacity-25 bg-[radial-gradient(circle_at_center,transparent_0%,#000_100%)]" />
          </motion.div>

          {/* TEXT BLOCK-OUT LAYERS (Z-5) */}
          {/* These permanent black gradients sit ABOVE the spotlight grid but BELOW the text, ensuring the spotlight never reveals the grid behind typography. */}
          <div className="pointer-events-none absolute inset-0 z-[5]">
            {/* Top-Left Fade for Heading */}
            <div className="absolute inset-y-0 left-0 w-full max-w-3xl bg-gradient-to-r from-black via-black/90 to-transparent" />
            {/* Bottom Fade for Footer/CTA Elements */}
            <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black via-black/95 to-transparent" />
          </div>

          {/* Top Content: Massive Typography & Social Proof */}
          {/* Reduced padding (p-8 md:p-12) to match shorter section */}
          <div className="pointer-events-none relative z-10 p-8 pt-12 md:p-12 lg:p-16 lg:pb-0">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: premiumEase }}
            >
              {/* Main Heading */}
              <h2 className="text-5xl font-bold leading-[1.05] tracking-tight text-white md:text-6xl lg:text-[5rem]">
                Let's build something <br className="hidden md:block" />
                <span className="bg-gradient-to-r from-[#2E5BFF] to-[#149CCB] bg-clip-text pr-4 text-transparent">
                  extraordinary.
                </span>
              </h2>

              {/* Subtext describing the offer/value */}
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400 md:text-xl">
                Join the waitlist and be the first one to experience
                photorealism at scale. Get additional 50% discount on the first
                100 people.
              </p>

              {/* Avatar Stack and Ratings Area */}
              <div className="mt-10 flex w-fit pointer-events-auto flex-col gap-3">
                <div className="flex flex-wrap items-center gap-4">
                  {/* Overlapping Avatars */}
                  <div className="flex -space-x-3">
                    {avatars.map((src, i) => (
                      <div
                        key={i}
                        className="relative h-14 w-14 cursor-pointer overflow-hidden rounded-[16px] border-[2px] border-black bg-zinc-800 shadow-sm transition-transform hover:z-20 hover:scale-110"
                      >
                        <img
                          src={src}
                          alt={`Creator ${i + 1}`}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ))}
                  </div>

                  {/* 5-Star Rating */}
                  <div className="flex items-center gap-1 text-[#FFC107]">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className="h-6 w-6 fill-current"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    ))}
                  </div>
                </div>

                {/* Trust Text */}
                <p className="mt-1 text-base font-medium text-zinc-400">
                  Trusted by 27,000+ creators
                </p>
              </div>
            </motion.div>
          </div>

          {/* Bottom Content: Actions & Meta Info */}
          {/* Reduced padding (p-8 md:p-12) to match shorter section */}
          <div className="pointer-events-none relative z-10 flex w-full flex-col gap-10 p-8 md:flex-row md:items-center md:justify-between md:p-12 lg:p-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1, ease: premiumEase }}
              className="pointer-events-auto shrink-0"
            >
              <button
                type="button"
                className="group flex h-14 w-fit cursor-pointer items-center justify-between gap-4 rounded-xl border border-white/20 bg-transparent pl-5 pr-2 transition-all duration-300 hover:border-white hover:bg-white"
              >
                <span className="text-base font-bold tracking-tight text-white transition-colors duration-300 group-hover:text-black">
                  Connect With Us
                </span>

                <div className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl bg-white text-black transition-colors duration-300 group-hover:bg-black">
                  <svg width="0" height="0" className="absolute">
                    <title>Connect arrow gradient</title>
                    <defs>
                      <linearGradient
                        id="cta-icon-grad"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                      >
                        <stop stopColor="#2E5BFF" offset="0%" />
                        <stop stopColor="#149CCB" offset="100%" />
                      </linearGradient>
                    </defs>
                  </svg>

                  <MdArrowOutward className="absolute z-10 h-4 w-4 transition-transform duration-300 group-hover:-translate-y-8 group-hover:translate-x-8" />
                  <MdArrowOutward
                    className="absolute z-10 h-4 w-4 -translate-x-8 translate-y-8 transition-transform duration-300 group-hover:translate-x-0 group-hover:translate-y-0"
                    style={{ fill: "url(#cta-icon-grad)" }}
                  />
                </div>
              </button>
            </motion.div>

            {/* Drop us a line */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15, ease: premiumEase }}
              className="pointer-events-auto flex flex-col gap-1 text-left md:text-start"
            >
              <span className="text-xs uppercase tracking-wider text-zinc-500">
                Drop us a line
              </span>
              <a
                href="mailto:hello@youragency.com"
                className="text-base font-bold text-white md:text-lg"
              >
                hello@youragency.com
              </a>
            </motion.div>

            {/* Give us a call */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: premiumEase }}
              className="pointer-events-auto flex flex-col gap-1 text-left md:text-start"
            >
              <span className="text-xs uppercase tracking-wider text-zinc-500">
                Give us a call
              </span>
              <span className="text-base font-bold text-white md:text-lg">
                +1 (555) 123-4567
              </span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
