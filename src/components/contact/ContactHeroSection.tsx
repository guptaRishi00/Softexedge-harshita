"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Header from "../page/Header";

const STACK_IMAGES = [
  {
    src: "/assets/alex-kotliarskyi-QBpZGqEMsKg-unsplash.jpg",
    alt: "Office setup",
  },
  {
    src: "/assets/milad-fakurian-2gzQL38nWAM-unsplash.jpg",
    alt: "Abstract design",
  },
  {
    src: "/assets/egor-litvinov-X1Txy1GTT5A-unsplash.jpg",
    alt: "Creative work",
  },
  {
    src: "/assets/xiang-chi-WwCKehYfMCA-unsplash.jpg",
    alt: "Design architecture",
  },
  {
    src: "/assets/laptop-screen-with-minimalist-ecommerce-dashboard.jpg",
    alt: "Dashboard interface",
  },
];

// Framer Motion Variants for staggering the words
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

export default function ContactHeroSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % STACK_IMAGES.length,
      );
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-white pt-24 pb-12 text-zinc-900">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center opacity-60">
        <div className="h-[600px] w-[600px] rounded-full bg-zinc-100 blur-[120px]"></div>
      </div>

      {/* Header */}
      <div className="absolute left-0 top-0 z-50 w-full">
        <Header />
      </div>

      {/* Center Wrapper */}
      <div className="relative z-10 flex w-full max-w-7xl flex-col items-center justify-center text-center px-6 md:px-10 mt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-15 ml-[3px] inline-flex items-center text-md font-semibold uppercase tracking-widest bg-linear-to-r from-[#2E5BFF] to-[#149CCB] bg-clip-text text-transparent "
        >
          Start a project
        </motion.div>

        {/* Title Container */}
        <motion.h1
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          onAnimationComplete={() => setIsExpanded(true)} // Split triggers only AFTER words finish
          className="mb-6 flex flex-col items-center text-5xl font-bold leading-[1em] tracking-tight text-black sm:text-6xl md:text-[95px] lg:text-[118px] xl:text-[135px]"
        >
          {/* Line 1 */}
          <span className="flex items-center justify-center whitespace-nowrap">
            <motion.span variants={wordVariants}>Let's</motion.span>

            {/* Split Image Span */}
            <span
              className={`relative mx-1.5 inline-block h-[1em] shrink-0 overflow-hidden rounded-2xl align-middle shadow-sm transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] md:mx-2.5 ${
                isExpanded
                  ? "w-[1.5em] mx-3 opacity-100 md:mx-5"
                  : "w-0 opacity-0"
              }`}
            >
              {STACK_IMAGES.map((img, index) => (
                <img
                  key={img.src}
                  src={img.src}
                  alt={img.alt}
                  className={`absolute inset-0 h-full w-full object-cover transition-all duration-1000 ease-in-out ${
                    index === currentImageIndex
                      ? "translate-x-0 opacity-100 blur-0"
                      : "-translate-x-4 opacity-0 blur-sm"
                  }`}
                />
              ))}
            </span>

            <motion.span variants={wordVariants}>Build</motion.span>
          </span>

          {/* Line 2 */}
          <span className="mt-2 flex space-x-3 md:mt-4 md:space-x-6">
            <motion.span variants={wordVariants}>Together.</motion.span>
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 max-w-xl text-lg font-medium leading-[1.2em] text-zinc-400"
        >
          Have a project in mind, or just want to say hi? Tell us what you're
          building — we usually reply within a couple of hours.
        </motion.p>
      </div>
    </section>
  );
}
