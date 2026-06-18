"use client";

import { motion } from "framer-motion";
import DotGrid from "../ui/DotGrid";

const premiumEase = [0.22, 1, 0.36, 1] as const;

const culturePillars = [
  {
    id: "c1",
    title: "Bias for action",
    description:
      "We ship, learn, and refine. Momentum compounds — so we move while others are still deliberating, and let the work do the talking.",
  },
  {
    id: "c2",
    title: "Craft you can feel",
    description:
      "The details are the work. We sweat the pixel, the millisecond, and the edge case until the whole thing feels effortless.",
  },
  {
    id: "c3",
    title: "Radical ownership",
    description:
      "No silos, no hand-offs to nowhere. Everyone owns the outcome end to end — and earns the trust that comes with it.",
  },
  {
    id: "c4",
    title: "Curiosity, always",
    description:
      "We stay students of the craft, hold our opinions loosely, and treat every project as a chance to get a little sharper.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: premiumEase },
  },
};

export default function OurValuesSection() {
  return (
    <section className="relative flex min-h-[900px] w-full flex-col overflow-hidden bg-black font-sans">
      {/* Interactive dot-grid background */}
      <div aria-hidden="true" className="absolute inset-0 z-0">
        <DotGrid
          dotSize={3}
          gap={28}
          baseColor="#27272a"
          activeColor="#2E5BFF"
          proximity={130}
          className="!p-0"
        />
      </div>

      {/* Top Header Section */}
      <div className="relative z-10 flex flex-col items-center px-6 pt-12 text-center md:pt-20">
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
          className="max-w-6xl text-4xl font-bold leading-[0.9em] tracking-tighter text-white md:text-5xl lg:text-[6.5rem]"
        >
          Built on a culture of <br />
          <span className="bg-gradient-to-r from-[#2E5BFF] to-[#149CCB] bg-clip-text text-transparent pr-1">
            curiosity & craft
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: premiumEase }}
          className="mt-6 max-w-2xl text-lg font-light leading-[1.2em] text-white/70 md:text-xl"
        >
          It's not just what we build — it's how. A handful of principles shape
          every decision, every detail, and how we show up for each other.
        </motion.p>
      </div>

      {/* Culture Pillars — editorial grid */}
      <div className="relative z-20 mx-auto mt-16 w-full max-w-[1400px] px-6 pb-12 md:mt-20 md:pb-20 lg:mt-24">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5"
        >
          {culturePillars.map((pillar) => (
            <motion.div
              key={pillar.id}
              variants={cardVariants}
              className="group relative overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1.5 hover:border-white/25 hover:bg-white/[0.06] lg:p-10"
            >
              <div className="relative z-10">
                {/* Static gradient marker (replaces the index number) */}
                <span className="block h-1 w-10 rounded-full bg-gradient-to-r from-[#2E5BFF] to-[#149CCB]" />

                <h3 className="mt-6 text-2xl font-semibold tracking-tight text-white md:text-3xl">
                  {pillar.title}
                </h3>
                <p className="mt-3 text-sm font-light leading-[1.5em] text-zinc-400 transition-colors duration-300 group-hover:text-zinc-300 md:text-base">
                  {pillar.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
