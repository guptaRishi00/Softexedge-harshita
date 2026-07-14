"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { blogPosts } from "@/data/blog";
import Header from "../page/Header";
import SpotlightGrid from "../ui/SpotlightGrid";

const premiumEase = [0.16, 1, 0.3, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay, ease: premiumEase },
  }),
} as const;

// Word-by-word stagger + split reveal (mirrors the brand-strategy hero title).
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.25, delayChildren: 0.2 },
  },
} as const;

const wordVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: premiumEase },
  },
} as const;

export default function BlogHeroSection() {
  const reduce = useReducedMotion();
  const [isExpanded, setIsExpanded] = useState(false);
  const total = blogPosts.length;

  return (
    <section className="relative w-full bg-white px-3 pt-24 font-sans selection:bg-[#2E5BFF]/20 md:pt-28">
      {/* Header */}
      <div className="absolute left-0 top-0 z-50 w-full">
        <Header />
      </div>

      {/* Black hero container with auto-moving spotlight pattern */}
      <div className="relative mx-auto flex min-h-[70vh] w-full flex-col justify-end overflow-hidden rounded-[20px] border border-zinc-800/50 bg-black px-6 py-12 md:px-12 md:py-16 lg:px-16 lg:py-20">
        <SpotlightGrid speed={2} />

        {/* Bottom fade so the text sits cleanly over the pattern */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-2/3 bg-gradient-to-t from-black via-black/80 to-transparent" />

        {/* Content */}
        <div className="relative z-10">
          {/* Headline — words stagger in, then the image splits open */}
          <motion.h1
            variants={containerVariants}
            initial={reduce ? false : "hidden"}
            animate="visible"
            onAnimationComplete={() => setIsExpanded(true)}
            className="text-left text-6xl font-bold leading-[0.9] tracking-tight text-white sm:text-7xl md:text-8xl lg:text-[7rem]"
          >
            {/* Line 1: News, [split image] views */}
            <span className="flex flex-wrap items-center gap-x-4 md:gap-x-6">
              <motion.span variants={wordVariants}>News,</motion.span>

              {/* Split image span — expands open once the words finish */}
              <span
                className={`relative inline-block h-[0.78em] shrink-0 overflow-hidden rounded-[0.22em] align-middle transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isExpanded || reduce
                    ? "w-[1.02em] opacity-100"
                    : "w-0 opacity-0"
                }`}
              >
                <Image
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500&auto=format&fit=crop&q=80"
                  alt="The team at work"
                  fill
                  sizes="180px"
                  className="object-cover"
                />
              </span>

              <motion.span variants={wordVariants}>views</motion.span>
            </span>

            {/* Line 2 */}
            <motion.span variants={wordVariants} className="mt-1 block md:mt-2">
              and everything else
            </motion.span>
          </motion.h1>

          {/* List header: count + filters */}
          <motion.div
            custom={0.6}
            variants={fadeUp}
            initial={reduce ? false : "hidden"}
            animate="visible"
            className="mt-10 flex flex-col gap-6 md:mt-14 md:flex-row md:items-center md:justify-between"
          >
            <p className="text-sm text-white/50 md:text-base">
              Showing{" "}
              <span className="font-semibold text-white">1-{total}</span> of{" "}
              <span className="font-semibold text-white">{total}</span> posts.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              {["By Category", "By Author"].map((label) => (
                <button
                  key={label}
                  type="button"
                  className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-medium text-white/90 transition-colors duration-300 hover:border-white/40 hover:bg-white/10"
                >
                  {label}
                  <MdKeyboardArrowDown className="h-4 w-4 text-white/50" />
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
