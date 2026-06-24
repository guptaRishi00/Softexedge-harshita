"use client";

import { motion } from "framer-motion";
import { memo, useCallback, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MdArrowOutward } from "react-icons/md";

const premiumEase = [0.22, 1, 0.36, 1] as const;

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
      className="relative flex w-full flex-col overflow-hidden bg-black font-sans py-20 md:py-32"
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
      <div className="pointer-events-none absolute inset-0 z-[1] bg-black/55" />

      {/* Content Container */}
      <div className="relative z-10 mx-auto w-full max-w-[90rem] px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center lg:items-stretch">
          
          {/* Left Column: Image */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: premiumEase }}
            className="w-full lg:w-5/12 shrink-0 flex flex-col"
          >
            <div className="relative w-full aspect-[4/5] lg:h-[800px] overflow-hidden rounded-[2.5rem] bg-zinc-900 border border-white/10 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30 z-10" />
              <Image
                src="/assets/ux-store-jJT2r2n7lYA-unsplash.jpg"
                alt="Our Studio Culture"
                fill
                className="object-cover transition-transform duration-[20s] ease-out hover:scale-110"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>
          </motion.div>

          {/* Right Column: Content */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: premiumEase }}
            className="w-full lg:w-7/12 flex flex-col justify-center py-6 lg:py-12"
          >
            {/* Eyebrow */}
            <div className="flex items-center gap-3 text-sm font-semibold tracking-wider text-white">
              <span className="h-1.5 w-1.5 rounded-full bg-white" />
              Our Culture
            </div>

            {/* Headline */}
            <h2 className="mt-6 text-4xl md:text-5xl lg:text-[56px] font-bold tracking-tight text-white leading-[1.05em] lg:leading-[1em]">
              We've created an environment where everyone feels comfortable and open, but we can have a laugh along the way
            </h2>

            {/* Paragraph */}
            <p className="mt-8 text-lg font-medium text-zinc-400 leading-[1.6em]">
              We produce good work for good people, and with the idea that staff and the client will be happy throughout the full process. This in return will bring more work our way, whether that's via recommendation or further work from that client.
            </p>

            {/* Quote Card (Project Colors: Dark Theme) */}
            <div className="mt-12 relative flex flex-col gap-8 rounded-3xl bg-zinc-950 p-8 md:p-10 border border-white/10 shadow-2xl transition-colors hover:border-white/20">
              <p className="text-xl md:text-2xl font-medium leading-[1.4em] tracking-tight text-white">
                <span className="mr-3 inline-flex align-top font-serif text-4xl text-[#2E5BFF]">
                  "
                </span>
                My vision has always been to look after the clients we work with, but to also look after the staff just as much. That will get the best results for everyone.
              </p>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mt-4">
                {/* Profile */}
                <div className="flex items-center gap-4">
                  <div className="relative h-14 w-14 overflow-hidden rounded-full border border-white/10 bg-zinc-800">
                    <Image 
                      src="/assets/zyro-O-Nemx50zDE-unsplash.jpg"
                      alt="Andy Golpys"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col">
                    <h4 className="font-bold text-white text-lg">Andy Golpys</h4>
                    <p className="text-sm font-medium tracking-wide text-zinc-500 uppercase">Co-Founder</p>
                  </div>
                </div>

                {/* ExperimentalTestimonials CTA Button */}
                <Link href="/about" className="shrink-0 w-full sm:w-auto">
                  <button
                    type="button"
                    className="group flex h-16 w-full sm:w-fit cursor-pointer items-center justify-between gap-5 rounded-xl border border-transparent bg-white pl-0 pr-2.5 transition-all duration-300 hover:border-white/80 hover:bg-zinc-200 hover:pl-6 hover:pr-3.5"
                  >
                    <span className="text-lg font-bold tracking-tight text-black transition-colors duration-300 pl-4 sm:pl-0">
                      Learn about our culture
                    </span>

                    <div className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-black text-white">
                      <svg width="0" height="0" className="absolute">
                        <title>Connect arrow gradient</title>
                        <defs>
                          <linearGradient
                            id="culture-icon-grad"
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

                      <MdArrowOutward className="absolute z-10 h-5 w-5 transition-transform duration-300 group-hover:-translate-y-8 group-hover:translate-x-8" />
                      <MdArrowOutward
                        className="absolute z-10 h-5 w-5 -translate-x-8 translate-y-8 transition-transform duration-300 group-hover:translate-x-0 group-hover:translate-y-0"
                        style={{ fill: "url(#culture-icon-grad)" }}
                      />
                    </div>
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
