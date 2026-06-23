"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import Header from "../page/Header";

const premiumEase = [0.16, 1, 0.3, 1] as const;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.16, delayChildren: 0.2 },
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

const STACK_IMAGES = [
  { src: "/assets/alex-kotliarskyi-QBpZGqEMsKg-unsplash.jpg", alt: "Office setup" },
  { src: "/assets/milad-fakurian-2gzQL38nWAM-unsplash.jpg", alt: "Abstract design" },
  { src: "/assets/egor-litvinov-X1Txy1GTT5A-unsplash.jpg", alt: "Creative work" },
  { src: "/assets/xiang-chi-WwCKehYfMCA-unsplash.jpg", alt: "Design architecture" },
  { src: "/assets/laptop-screen-with-minimalist-ecommerce-dashboard.jpg", alt: "Dashboard interface" },
];

export default function ContactHeroSection() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    // Auto-advance the stack every 3 seconds
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % STACK_IMAGES.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative flex h-screen w-full items-center overflow-hidden bg-white text-zinc-900 pt-20">
      {/* Header */}
      <div className="absolute left-0 top-0 z-50 w-full">
        <Header />
      </div>

      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center opacity-40">
        <div className="h-[600px] w-[600px] rounded-full bg-zinc-100 blur-[120px]" />
      </div>

      {/* Full width layout container */}
      <div className="relative z-10 w-full px-6 md:px-12 lg:px-20 xl:px-32">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-24">
          
          {/* Left Column: Text Content */}
          <div className="flex flex-col items-start text-left">
            {/* Tag / Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="mb-8 inline-flex items-center text-sm font-bold uppercase tracking-widest bg-linear-to-r from-[#2E5BFF] to-[#149CCB] bg-clip-text text-transparent md:text-base"
            >
              Start a Project
            </motion.div>

            {/* Title */}
            <motion.h1
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="mb-6 flex flex-col text-5xl font-bold leading-[1.05em] tracking-tight text-black sm:text-6xl md:text-7xl lg:text-[80px]"
            >
              <span className="flex gap-3 md:gap-4">
                <motion.span variants={wordVariants}>Let's</motion.span>
                <motion.span variants={wordVariants}>build</motion.span>
              </span>
              <span className="mt-1 flex md:mt-2">
                <motion.span
                  variants={wordVariants}
                  className="bg-linear-to-r from-[#2E5BFF] to-[#149CCB] bg-clip-text pb-2 text-transparent"
                >
                  together.
                </motion.span>
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7, ease: premiumEase }}
              className="max-w-xl text-lg font-medium leading-relaxed text-zinc-600 md:text-xl"
            >
              Have a project in mind, or just want to say hi? Tell us what you're
              building — we usually reply within a couple of hours.
            </motion.p>
          </div>

          {/* Right Column: Image Stack Animation */}
          <div className="relative mx-auto w-full max-w-md lg:max-w-lg">
            <div className="relative aspect-[4/3] w-full lg:aspect-[4/3]">
              <AnimatePresence mode="sync">
                {STACK_IMAGES.map((img, i) => {
                  // Calculate distance from the current front index
                  let diff = i - index;
                  if (diff < 0) diff += STACK_IMAGES.length;

                  // Only render the top 3 cards to keep the stack clean
                  if (diff > 2) return null;

                  return (
                    <motion.div
                      key={img.src}
                      initial={{ 
                        opacity: 0, 
                        scale: 0.85, 
                        y: 80 
                      }}
                      animate={{
                        opacity: 1 - diff * 0.2, // Fade out cards further back
                        scale: 1 - diff * 0.06,  // Scale down cards further back
                        y: diff * 28,            // Move cards down the stack
                        zIndex: 10 - diff,       // Proper layering
                      }}
                      exit={{
                        opacity: 0,
                        scale: 1.05,
                        x: 150, // Top card flies to the right when exiting
                        rotate: 8, // Adds a nice tossing/swiping effect
                        transition: { duration: 0.5, ease: premiumEase },
                      }}
                      transition={{ 
                        duration: 0.8, 
                        ease: premiumEase 
                      }}
                      className="absolute left-0 top-0 h-[90%] w-full origin-bottom overflow-hidden rounded-2xl bg-zinc-100 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] ring-1 ring-black/5"
                    >
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 90vw, 40vw"
                        priority={diff === 0}
                      />
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
