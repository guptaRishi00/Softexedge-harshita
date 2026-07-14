"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Header from "../page/Header";
import SpotlightGrid from "../ui/SpotlightGrid";

const premiumEase = [0.16, 1, 0.3, 1] as const;

const headlineContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.14, delayChildren: 0.1 },
  },
} as const;

const line = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: premiumEase },
  },
} as const;

export default function ContactHeroSectionTwo() {
  const reduce = useReducedMotion();

  return (
    <section className="relative w-full bg-white px-3 pt-24 pb-0 font-sans selection:bg-[#2E5BFF]/20 md:pt-30">
      {/* Header — shared inner-page header */}
      <div className="absolute left-0 top-0 z-50 w-full">
        <Header />
      </div>

      {/* Black hero container with auto-moving spotlight pattern */}
      <div className="relative mx-auto flex min-h-[62vh] w-full flex-col items-center gap-10 overflow-hidden rounded-[20px] border border-zinc-800/50 bg-black px-6 py-12 md:flex-row md:justify-between md:gap-6 md:px-12 md:py-16 lg:gap-12 lg:px-16">
        <SpotlightGrid glowColor="#2E5BFF" glowVia="#5B7CFF" speed={3} />

        {/* Left-side scrim so the copy stays legible over the pattern */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-[5] w-full max-w-3xl bg-gradient-to-r from-black/20 via-black/5 to-transparent" />

        {/* Left: content */}
        <div className="relative z-10 flex w-full flex-col items-start text-left md:w-1/2">
          {/* Eyebrow */}
          <motion.span
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: premiumEase }}
            className="mb-6 text-xs font-bold uppercase tracking-[0.28em]"
          >
            <span className="bg-gradient-to-r from-[#2E5BFF] to-[#149CCB] bg-clip-text text-transparent">
              Contact Us
            </span>
          </motion.span>

          {/* Headline */}
          <motion.h1
            variants={headlineContainer}
            initial={reduce ? false : "hidden"}
            animate="visible"
            className="flex flex-col text-[3.25rem] font-bold leading-[0.95] tracking-tight text-white sm:text-[4rem] lg:text-[5.25rem]"
          >
            <motion.span variants={line}>Let&apos;s Build</motion.span>
            <motion.span variants={line}>Something</motion.span>
            <motion.span variants={line}>
              <span className="bg-gradient-to-r from-[#2E5BFF] to-[#149CCB] bg-clip-text text-transparent">
                Great Together.
              </span>
            </motion.span>
          </motion.h1>
        </div>

        {/* Right: abstract artwork */}
        <motion.div
          initial={reduce ? false : { opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: premiumEase, delay: 0.2 }}
          className="relative z-10 h-[280px] w-full overflow-hidden rounded-[20px] border border-white/10 md:h-[380px] md:w-1/2 lg:h-[440px]"
        >
          <Image
            src="/assets/kanhaiya-sharma-EiAqej-cGks-unsplash.jpg"
            alt="Abstract glass artwork"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 45vw"
            className="object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
}
