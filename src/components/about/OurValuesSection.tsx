"use client";

import { motion } from "framer-motion";
import { memo, useCallback, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Zap,
  Layers,
  Shield,
  Compass,
  Sparkles,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";

const premiumEase = [0.22, 1, 0.36, 1] as const;

interface CulturePillar {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

const culturePillars: CulturePillar[] = [
  {
    id: "c1",
    title: "Bias for action",
    description:
      "We ship, learn, and refine. Momentum compounds — so we move while others are still deliberating, and let the work do the talking.",
    icon: Zap,
  },
  {
    id: "c2",
    title: "Craft you can feel",
    description:
      "The details are the work. We sweat the pixel, the millisecond, and the edge case until the whole thing feels effortless.",
    icon: Layers,
  },
  {
    id: "c3",
    title: "Radical ownership",
    description:
      "No silos, no hand-offs to nowhere. Everyone owns the outcome end to end — and earns the trust that comes with it.",
    icon: Shield,
  },
  {
    id: "c4",
    title: "Curiosity, always",
    description:
      "We stay students of the craft, hold opinions loosely, and treat every project as a chance to get a little sharper.",
    icon: Compass,
  },
  {
    id: "c5",
    title: "Bold innovation",
    description:
      "We challenge conventions and embrace new tech. We dare to design what's next and never settle for the standard path.",
    icon: Sparkles,
  },
];

// One proximity-grid cell, memoised so only cells whose intensity actually changes re-render
const Cell = memo(function Cell({
  index,
  intensity,
  onEnter,
}: {
  index: number;
  intensity: number;
  onEnter: (i: number) => void;
}) {
  const colorVal = Math.round(7 * (1 - intensity));
  return (
    // biome-ignore lint/a11y/noStaticElementInteractions: decorative proximity-glow cell
    <div
      onMouseEnter={() => onEnter(index)}
      className="relative aspect-square w-full overflow-hidden rounded-2xl p-[2px] transition-all duration-300 ease-out"
      style={{ backgroundColor: intensity > 0 ? "transparent" : "#080808" }}
    >
      <div
        className="absolute inset-0 bg-gradient-to-b from-[#2E5BFF] via-[#149CCB] to-[#2E5BFF]"
        style={{ opacity: intensity * 0.8 }}
      />
      <div
        className="relative z-10 h-full w-full rounded-2xl transition-colors duration-300"
        style={{
          backgroundColor: `rgb(${colorVal}, ${colorVal}, ${colorVal})`,
        }}
      />
    </div>
  );
});

export default function OurValuesSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const totalItems = 250;
  const columns = 10;
  const initialLitIndices = [13, 27, 32, 48, 54];

  const getIntensity = (index: number) => {
    const row = Math.floor(index / columns);
    const col = index % columns;

    if (hoveredIndex !== null) {
      const hoverRow = Math.floor(hoveredIndex / columns);
      const hoverCol = hoveredIndex % columns;
      const distance = Math.sqrt((row - hoverRow) ** 2 + (col - hoverCol) ** 2);
      return distance > 3.5 ? 0 : 1 - distance / 1.79;
    }

    let maxIntensity = 0;
    for (const litIndex of initialLitIndices) {
      const litRow = Math.floor(litIndex / columns);
      const litCol = litIndex % columns;
      const distance = Math.sqrt((row - litRow) ** 2 + (col - litCol) ** 2);
      if (distance <= 3.5) {
        maxIntensity = Math.max(maxIntensity, 1 - distance / 1.79);
      }
    }
    return maxIntensity;
  };

  const handleCellEnter = useCallback((i: number) => setHoveredIndex(i), []);

  const cellIds = Array.from(
    { length: totalItems },
    (_, index) => `cell-${index}`,
  );
  const bgCells = cellIds.map((id, index) => (
    <Cell
      key={id}
      index={index}
      intensity={getIntensity(index)}
      onEnter={handleCellEnter}
    />
  ));

  return (
    <section
      onMouseLeave={() => setHoveredIndex(null)}
      className="relative flex w-full flex-col overflow-hidden bg-black font-sans py-16 md:py-24"
    >
      {/* Background Proximity Grid Pattern */}
      <div className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden pointer-events-none">
        <div
          className="grid w-[110%] -ml-[5%] gap-3 pointer-events-auto"
          style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
        >
          {bgCells}
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 z-[1] bg-black/45" />

      {/* Content Container */}
      <div className="relative z-10 mx-auto w-full max-w-[90rem] px-6 lg:px-10">
        {/* Header Section (Unchanged) */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-24">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: premiumEase }}
            className="mb-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-white/60"
          >
            How We Work
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: premiumEase }}
            className="max-w-6xl text-4xl font-bold leading-[1.05em] tracking-tighter text-white md:text-5xl lg:text-[6.5rem]"
          >
            Built on a culture of <br />
            <span className="bg-gradient-to-r from-[#2E5BFF] to-[#149CCB] bg-clip-text text-transparent pb-2">
              curiosity & craft
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: premiumEase }}
            className="mt-6 max-w-2xl text-lg font-light leading-[1.25em] text-zinc-400 md:text-xl"
          >
            It's not just what we build — it's how. A handful of principles
            shape every decision, every detail, and how we show up for each
            other.
          </motion.p>
        </div>

        {/* New 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Left Column: Full Height Image */}
          <div className="lg:col-span-5 relative">
            <div className="h-[350px] sm:h-[450px] lg:h-full lg:absolute lg:inset-0 w-full overflow-hidden rounded-[2.5rem] border border-white/10 bg-zinc-900 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 z-10" />
              <img
                src="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=1200&auto=format&fit=crop&q=80"
                alt="Our Studio Culture"
                className="h-full w-full object-cover transition-transform duration-[20s] ease-out hover:scale-110"
              />
            </div>
          </div>

          {/* Right Column: Values List & CTA */}
          <div className="lg:col-span-7 flex flex-col justify-center py-4 lg:py-12">
            <div className="flex flex-col gap-12 lg:gap-16">
              {culturePillars.map((pillar, idx) => {
                const Icon = pillar.icon;
                return (
                  <motion.div
                    key={pillar.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{
                      duration: 0.6,
                      delay: idx * 0.1,
                      ease: premiumEase,
                    }}
                    className="group relative flex gap-6 md:gap-8 items-start"
                  >
                    {/* Floating Icon */}
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-zinc-900/50 text-zinc-400 transition-all duration-500 ease-out group-hover:border-transparent group-hover:bg-[#2E5BFF]/10 group-hover:text-[#2E5BFF] group-hover:shadow-[0_0_30px_rgba(46,91,255,0.2)] md:h-16 md:w-16">
                      <Icon
                        className="h-6 w-6 md:h-7 md:w-7"
                        strokeWidth={1.5}
                      />
                    </div>

                    {/* Content */}
                    <div className="flex flex-col pt-1 md:pt-2">
                      <h3 className="text-xl font-bold tracking-tight text-white md:text-3xl transition-colors duration-300">
                        {pillar.title}
                      </h3>
                      <p className="mt-3 text-base font-medium leading-[1.6em] text-zinc-400 md:text-lg">
                        {pillar.description}
                      </p>
                      {/* Subtle hover line */}
                      <div className="mt-5 h-[2px] w-0 bg-gradient-to-r from-[#2E5BFF] to-[#149CCB] transition-all duration-500 ease-out group-hover:w-20" />
                    </div>
                  </motion.div>
                );
              })}

              {/* CTA Section */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: premiumEase }}
                className="mt-8 pt-12 border-t border-white/10"
              >
                <div className="flex flex-col sm:flex-row items-center gap-6 justify-between rounded-3xl bg-zinc-900/40 p-8 border border-white/5 backdrop-blur-sm">
                  <div className="flex flex-col">
                    <h4 className="text-2xl font-bold text-white mb-2">
                      Want to build with us?
                    </h4>
                    <p className="text-zinc-400 font-medium">
                      We're always looking for ambitious partners.
                    </p>
                  </div>
                  <Link
                    href="/contact"
                    className="group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-2xl bg-white px-8 py-4 font-bold text-black transition-all hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto shrink-0"
                  >
                    <div className="absolute inset-0 bg-linear-to-r from-[#2E5BFF] to-[#149CCB] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <span className="relative z-10 flex items-center gap-2 transition-colors duration-300 group-hover:text-white">
                      Get in touch
                      <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
