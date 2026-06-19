"use client";

import { motion } from "framer-motion";
import { memo, useCallback, useState } from "react";
import {
  Zap,
  Layers,
  Shield,
  Compass,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

const premiumEase = [0.22, 1, 0.36, 1] as const;

interface CulturePillar {
  id: string;
  title: string;
  description: string;
  image: string;
  icon: LucideIcon;
}

const culturePillars: CulturePillar[] = [
  {
    id: "c1",
    title: "Bias for action",
    description:
      "We ship, learn, and refine. Momentum compounds — so we move while others are still deliberating, and let the work do the talking.",
    image:
      "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=80",
    icon: Zap,
  },
  {
    id: "c2",
    title: "Craft you can feel",
    description:
      "The details are the work. We sweat the pixel, the millisecond, and the edge case until the whole thing feels effortless.",
    image:
      "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=800&auto=format&fit=crop&q=80",
    icon: Layers,
  },
  {
    id: "c3",
    title: "Radical ownership",
    description:
      "No silos, no hand-offs to nowhere. Everyone owns the outcome end to end — and earns the trust that comes with it.",
    image:
      "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&auto=format&fit=crop&q=80",
    icon: Shield,
  },
  {
    id: "c4",
    title: "Curiosity, always",
    description:
      "We stay students of the craft, hold opinions loosely, and treat every project as a chance to get a little sharper.",
    image:
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&auto=format&fit=crop&q=80",
    icon: Compass,
  },
  {
    id: "c5",
    title: "Bold innovation",
    description:
      "We challenge conventions and embrace new tech. We dare to design what's next and never settle for the standard path.",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80",
    icon: Sparkles,
  },
];

function ValuesCarousel({ items }: { items: CulturePillar[] }) {
  // Triple the set of items to ensure seamless horizontal marquee looping
  const set = [...items, ...items, ...items];

  return (
    <div className="relative flex w-full overflow-hidden py-10">
      <motion.div
        className="flex gap-3 pr-3"
        animate={{ x: ["0%", "-33.333%"] }}
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          ease: "linear",
          duration: 35,
        }}
      >
        {set.map((pillar, idx) => {
          const Icon = pillar.icon;
          return (
            <div
              key={`${pillar.id}-${idx}`}
              className="group relative flex h-[460px] w-[320px] shrink-0 flex-col overflow-hidden rounded-[24px] border border-white/5 bg-zinc-950/80 transition-all duration-500 ease-out hover:border-white/20 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] md:h-[530px] md:w-[380px]"
            >
              {/* Top part: Image Section */}
              <div className="relative h-48 w-full overflow-hidden md:h-56 animate-none">
                <img
                  src={pillar.image}
                  alt={pillar.title}
                  loading="lazy"
                  draggable={false}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                {/* Subtle gradient overlay to dim the image and transition to content */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 to-transparent" />
              </div>

              {/* Middle part: Floating Icon Badge overlapping bottom of image */}
              <div className="relative">
                <div className="absolute -top-6 left-6 z-20 flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-zinc-900 text-zinc-400 transition-all duration-500 ease-out group-hover:border-transparent group-hover:bg-gradient-to-r group-hover:from-[#2E5BFF] group-hover:to-[#149CCB] group-hover:text-white group-hover:shadow-[0_0_20px_rgba(46,91,255,0.4)] md:h-14 md:w-14">
                  <Icon className="h-5 w-5 md:h-6 md:w-6" />
                </div>
              </div>

              {/* Bottom part: Text Content Section */}
              <div className="flex flex-grow flex-col justify-between px-6 pt-10 pb-6 md:px-8 md:pt-12 md:pb-8">
                <div>
                  <h3 className="text-xl font-bold tracking-tight text-white md:text-2xl transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-[#2E5BFF] group-hover:to-[#149CCB] group-hover:bg-clip-text group-hover:text-transparent">
                    {pillar.title}
                  </h3>
                  <p className="mt-3 text-sm font-light leading-[1.6em] text-zinc-400 transition-colors duration-300 group-hover:text-zinc-200 md:text-base">
                    {pillar.description}
                  </p>
                </div>

                {/* Accent/Footer line that animates on hover */}
                <div className="mt-6 h-[2px] w-8 bg-zinc-800 transition-all duration-500 ease-out group-hover:w-16 group-hover:bg-gradient-to-r group-hover:from-[#2E5BFF] group-hover:to-[#149CCB]" />
              </div>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}

// One proximity-grid cell, memoised so only cells whose intensity actually
// changes re-render. (Fix for the laggy hover: it previously re-rendered all
// 250 cells on every pointer move.)
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
      {/* Colored proximity glow */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-[#2E5BFF] via-[#149CCB] to-[#2E5BFF]"
        style={{ opacity: intensity * 0.8 }}
      />
      {/* Inner cell */}
      <div
        className="relative z-10 h-full w-full rounded-2xl transition-colors duration-300"
        style={{ backgroundColor: `rgb(${colorVal}, ${colorVal}, ${colorVal})` }}
      />
    </div>
  );
});

export default function OurValuesSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const totalItems = 250;
  const columns = 10;

  // A list of indices near the top (header/title area) that are lit by default to show interactivity
  const initialLitIndices = [13, 27, 32, 48, 54];

  const getIntensity = (index: number) => {
    const row = Math.floor(index / columns);
    const col = index % columns;

    // 1. If actively hovering, use standard proximity math based on the cursor.
    if (hoveredIndex !== null) {
      const hoverRow = Math.floor(hoveredIndex / columns);
      const hoverCol = hoveredIndex % columns;

      const distance = Math.sqrt((row - hoverRow) ** 2 + (col - hoverCol) ** 2);

      return distance > 3.5 ? 0 : 1 - distance / 1.79;
    }

    // 2. If NOT hovering, simulate hover math on the initial indices to make them look like real hovers.
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

  // Fixed-size, never-reordered grid → a positional id is a stable key.
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
    /* biome-ignore lint/a11y/noStaticElementInteractions: section-wide mouse leave grid handler */
    <section
      onMouseLeave={() => setHoveredIndex(null)}
      className="relative flex min-h-[850px] w-full flex-col overflow-hidden bg-black font-sans py-16 md:py-24"
    >
      {/* Background Proximity Grid Pattern (migrated from CtaSection) */}
      <div className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden pointer-events-none">
        <div
          className="grid w-[110%] -ml-[5%] gap-3 pointer-events-auto"
          style={{
            gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
          }}
        >
          {bgCells}
        </div>
      </div>

      {/* Slight black overlay to dim the grid background slightly */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-black/45" />

      {/* Top Header Section */}
      <div className="relative z-10 flex flex-col items-center px-6 text-center">
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
          It's not just what we build — it's how. A handful of principles shape
          every decision, every detail, and how we show up for each other.
        </motion.p>
      </div>

      {/* Culture Pillars Carousel */}
      <div className="relative z-20 mt-16 w-full pb-12 md:mt-24 md:pb-20">
        <ValuesCarousel items={culturePillars} />
      </div>
    </section>
  );
}
