"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import AgencyStats from "./AgencyStats";

const ROTATING_IMAGES = [
  "https://images.unsplash.com/photo-1778648185777-a16f70110e29?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDR8Q0R3dXdYSkFiRXd8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1761998066466-86bd7a1c00ba?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDg1fENEd3V3WEpBYkV3fHxlbnwwfHx8fHw%3D",
  "https://images.unsplash.com/photo-1778452419724-1f605dc17c46?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDE5fENEd3V3WEpBYkV3fHxlbnwwfHx8fHw%3D",
  "https://images.unsplash.com/photo-1769921824660-648d69d2642a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDEzNnxDRHd1d1hKQWJFd3x8ZW58MHx8fHx8",
  "https://images.unsplash.com/photo-1776602191233-154cbc983f0c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDcyfENEd3V3WEpBYkV3fHxlbnwwfHx8fHw%3D",
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.25, // Controls the delay between each word appearing
      delayChildren: 0.2,
    },
  },
} as const;

const wordVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }, // Slower, smoother entry
  },
} as const;

export default function StrategyHeroSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % ROTATING_IMAGES.length,
      );
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  // The expanding split-image, defined once and rendered in BOTH layouts —
  // desktop between "Build"/"Brands", mobile between "Brands"/"That". State
  // (isExpanded, currentImageIndex) lives in the parent, so the two copies
  // expand and rotate in sync; only one is visible per breakpoint.
  const splitImage = (
    <span
      className={`relative mx-1.5 inline-block h-[1em] max-md:h-[1.3em] shrink-0 overflow-hidden rounded-2xl align-middle shadow-sm transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] md:mx-2.5 ${
        isExpanded
          ? "w-[1.5em] mx-3 opacity-100 max-md:w-[1.8em] md:mx-5"
          : "w-0 opacity-0"
      }`}
    >
      {ROTATING_IMAGES.map((img, index) => (
        <Image
          key={img}
          src={img}
          alt="Brand visual"
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          priority={index === 0}
          className={`absolute inset-0 h-full w-full object-cover transition-all duration-1000 ease-in-out ${
            index === currentImageIndex
              ? "translate-x-0 opacity-100 blur-0"
              : "-translate-x-4 opacity-0 blur-sm"
          }`}
        />
      ))}
    </span>
  );

  return (
    <section className="relative flex min-h-screen w-full flex-col items-center justify-between overflow-hidden bg-white pt-24 pb-12 text-zinc-900">
      <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center opacity-60">
        <div className="h-[600px] w-[600px] rounded-full bg-zinc-100 blur-[120px]"></div>
      </div>

      <div className="relative z-10 flex flex-1 w-full max-w-7xl flex-col items-center justify-center text-center lg:mt-30 px-6 md:px-10">
        <motion.div
          data-no-mobile-entry
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-15 ml-[3px] inline-flex items-center text-md font-semibold uppercase tracking-widest bg-linear-to-r from-[#2E5BFF] to-[#149CCB] bg-clip-text text-transparent "
        >
          How we do it
        </motion.div>

        <motion.h1
          variants={containerVariants}
          data-no-mobile-entry
          initial="hidden"
          animate="visible"
          onAnimationComplete={() => setIsExpanded(true)} 
          className="mb-6 flex flex-col items-center text-[clamp(2.5rem,12.3vw,3rem)] font-bold leading-[1em] tracking-tight text-black sm:text-6xl md:text-7xl lg:text-[7rem]"
        >
          <span className="flex items-center justify-center whitespace-nowrap max-md:hidden">
            <motion.span data-no-mobile-entry variants={wordVariants}>We</motion.span>
            <motion.span data-no-mobile-entry variants={wordVariants} className="ml-3 md:ml-6">
              Build
            </motion.span>

            {splitImage}

            <motion.span data-no-mobile-entry variants={wordVariants}>Brands</motion.span>
          </span>

          <span className="mt-2 flex space-x-3 max-md:hidden md:mt-4 md:space-x-6">
            <motion.span data-no-mobile-entry variants={wordVariants}>That</motion.span>
            <motion.span data-no-mobile-entry variants={wordVariants}>People</motion.span>
            <motion.span data-no-mobile-entry variants={wordVariants}>Trust</motion.span>
          </span>

          {/* Mobile: same six words regrouped onto three lines, with the split
              animation between the middle pair. Plain spans — entry animation
              is disabled below md site-wide, so a word stagger would never be
              seen here anyway. */}
          <span className="flex items-center justify-center whitespace-nowrap md:hidden">
            We&nbsp;Build
          </span>
          <span className="mt-2 flex items-center justify-center whitespace-nowrap md:hidden">
            Brands
            {splitImage}
            That
          </span>
          <span className="mt-2 flex items-center justify-center whitespace-nowrap md:hidden">
            People&nbsp;Trust
          </span>
        </motion.h1>
      </div>

      <div className="relative z-20 w-full mt-16 md:mt-24">
        <AgencyStats />
      </div>
    </section>
  );
}
