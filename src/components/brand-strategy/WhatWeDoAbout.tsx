"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import React, { useRef } from "react";

const premiumEase = [0.22, 1, 0.36, 1] as const;

export default function WhatWeDoAbout() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Parallax elements for background floating shapes
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden bg-white px-6 py-24 md:px-12 md:py-32 lg:py-40"
    >
      <div className="relative mx-auto flex max-w-5xl flex-col items-center text-center">
        {/* Top label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: premiumEase }}
          className="mb-10 flex items-center justify-center gap-4 md:mb-12"
        >
          <div className="h-px w-8 bg-stone-300 md:w-12" />
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-stone-400">
            About Us
          </span>
          <div className="h-px w-8 bg-stone-300 md:w-12" />
        </motion.div>

        {/* Title Section */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: premiumEase }}
          className="text-5xl font-bold leading-[1.1] tracking-tight text-stone-900 md:text-6xl lg:text-[5.5rem]"
        >
          We don't follow trends. <br className="hidden sm:block" />
          We{" "}
          <span className="bg-gradient-to-r from-[#2E5BFF] to-[#149CCB] bg-clip-text text-transparent">
            dictate
          </span>{" "}
          reality.
        </motion.h2>

        {/* Accent line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.2, ease: premiumEase }}
          className="mx-auto mt-10 h-[2px] w-24 bg-gradient-to-r from-[#2E5BFF] to-[#149CCB] md:mt-12"
        />

        {/* Description Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3, ease: premiumEase }}
          className="mx-auto mt-12 max-w-3xl space-y-6 md:mt-16"
        >
          <p className="text-xl font-medium leading-relaxed text-stone-800 md:text-2xl">
            We are a relentless collective of visionaries, strategists, and
            digital craftsmen. We don't just build websites; we engineer digital
            empires.
          </p>

          <p className="text-base leading-relaxed text-stone-500 md:text-lg">
            For the ambitious, the disruptive, and the unrelenting, we are the
            catalyst that transforms industry potential into global dominance.
            Our work doesn't just speak—it shifts paradigms, commands attention,
            and leaves competitors scrambling to catch up.
          </p>
        </motion.div>

        {/* Stats - Centered Grid Layout */}
        <div className="mt-20 w-full lg:mt-28">
          <div className="grid grid-cols-1 gap-16 sm:grid-cols-3 sm:gap-8">
            {[
              {
                label: "Industry Awards",
                value: "140+",
                sub: "Global recognitions",
              },
              {
                label: "Revenue Generated",
                value: "$2B+",
                sub: "Client valuation",
              },
              {
                label: "Global Reach",
                value: "Unlimited",
                sub: "No boundaries",
              },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.9,
                  delay: 0.4 + i * 0.15,
                  ease: premiumEase,
                }}
                className="flex flex-col items-center justify-center text-center"
              >
                <div className="group relative inline-flex flex-col items-center justify-center">
                  {/* Stat value with gradient */}
                  <span className="relative z-10 bg-gradient-to-r from-[#2E5BFF] to-[#149CCB] bg-clip-text text-transparent text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl">
                    {stat.value}
                  </span>

                  {/* Label */}
                  <div className="relative z-10 mt-4 flex flex-col items-center">
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-400">
                      {stat.label}
                    </span>
                    <span className="mt-1 text-xs text-stone-400/70">
                      {stat.sub}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6, ease: premiumEase }}
          className="mt-24 flex flex-col items-center justify-center md:mt-32"
        >
          <p className="max-w-md text-sm leading-relaxed text-stone-500">
            Ready to transcend the ordinary? Let's build something that makes
            the industry take notice.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
