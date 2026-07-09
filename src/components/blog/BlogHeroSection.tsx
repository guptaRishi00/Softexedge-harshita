"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Header from "../page/Header";

const premiumEase = [0.16, 1, 0.3, 1] as const;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
} as const;

const wordVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: premiumEase },
  },
} as const;

// Detached from the word stagger — starts only after the last word
// has finished animating in (see delay below).
const imageVariants = {
  hidden: { width: 0, opacity: 0, margin: "0px" },
  visible: {
    width: "2.5em",
    opacity: 1,
    margin: "0 8px",
    transition: { duration: 1.2, ease: premiumEase, delay: 1.6 },
  },
} as const;

export default function BlogHeroSection() {
  return (
    <section className="relative w-full bg-[#FAFAFA] pt-40 pb-16 md:pt-48 md:pb-20 font-sans selection:bg-[#2E5BFF]/20">
      {/* Header */}
      <div className="absolute left-0 top-0 z-50 w-full">
        <Header />
      </div>

      <div className="mx-auto flex w-full flex-col items-start justify-start px-6 text-left md:px-8">
        {/* Title Container */}
        <motion.h1
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap items-center justify-start gap-y-3 gap-x-3 text-5xl font-bold leading-[1.1] tracking-tight text-zinc-900 md:gap-y-4 md:text-7xl lg:text-[5.5rem]"
        >
          <motion.span variants={wordVariants}>Explore</motion.span>
          <motion.span variants={wordVariants}>Our</motion.span>
          <motion.span variants={wordVariants}>Latest</motion.span>

          {/* Animated Inline Image — self-orchestrated, not part of the
              parent's stagger, so it waits for the words to finish first */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={imageVariants}
            className="relative inline-block h-[0.9em] overflow-hidden rounded-xl align-middle"
          >
            <div className="relative h-full w-[2.5em]">
              <Image
                src="https://images.unsplash.com/photo-1755497595318-7e5e3523854f?q=80&w=600&auto=format&fit=crop"
                alt="Creative Insights"
                fill
                sizes="300px"
                className="object-cover"
              />
            </div>
          </motion.div>

          <motion.span variants={wordVariants}>
            <span className="bg-gradient-to-r from-[#2E5BFF] to-[#149CCB] bg-clip-text text-transparent">
              Insights
            </span>
          </motion.span>
          <motion.span variants={wordVariants}>&</motion.span>
          <motion.span variants={wordVariants}>Perspectives</motion.span>
        </motion.h1>
      </div>
    </section>
  );
}
