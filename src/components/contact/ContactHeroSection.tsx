"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import Header from "../page/Header";

const premiumEase = [0.16, 1, 0.3, 1] as const;

// Headline reveals word-by-word (project hero convention)
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

const images = [
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
  { src: "/assets/web.jpg", alt: "Web development" },
];

export default function ContactHeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Spring-smoothed parallax so the scroll motion is buttery (not jumpy)
  const springConfig = { stiffness: 80, damping: 30, mass: 0.4 } as const;
  const y1 = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -400]),
    springConfig,
  );
  const y2 = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 400]),
    springConfig,
  );

  // Fade out text when scrolling down
  const opacityText = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scaleText = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-white px-6 text-zinc-900 md:px-10"
    >
      {/* Header */}
      <div className="absolute left-0 top-0 z-50 w-full">
        <Header />
      </div>

      {/* Animated Background Images - Rotated Grid */}
      <div className="absolute inset-0 z-0 flex items-center justify-center opacity-100 pointer-events-none">
        <div className="grid h-[150vh] w-[150vw] -rotate-12 grid-cols-3 gap-4 md:gap-8 lg:w-[120vw]">
          {/* Column 1 - Slides up */}
          <motion.div
            style={{ y: y1 }}
            className="flex flex-col gap-4 md:gap-8 pt-[10vh]"
          >
            <div className="relative h-[30vh] w-full overflow-hidden rounded-2xl md:h-[50vh]">
              <Image
                src={images[0].src}
                alt={images[0].alt}
                fill
                className="object-cover"
              />
            </div>
            <div className="relative h-[30vh] w-full overflow-hidden rounded-2xl md:h-[50vh]">
              <Image
                src={images[1].src}
                alt={images[1].alt}
                fill
                className="object-cover"
              />
            </div>
            <div className="relative h-[30vh] w-full overflow-hidden rounded-2xl md:h-[50vh]">
              <Image
                src={images[4].src}
                alt={images[4].alt}
                fill
                className="object-cover"
              />
            </div>
          </motion.div>

          {/* Column 2 - Slides down */}
          <motion.div
            style={{ y: y2 }}
            className="flex flex-col gap-4 md:gap-8 pt-[20vh]"
          >
            <div className="relative h-[30vh] w-full overflow-hidden rounded-2xl md:h-[50vh]">
              <Image
                src={images[2].src}
                alt={images[2].alt}
                fill
                className="object-cover"
              />
            </div>
            <div className="relative h-[30vh] w-full overflow-hidden rounded-2xl md:h-[50vh]">
              <Image
                src={images[3].src}
                alt={images[3].alt}
                fill
                className="object-cover"
              />
            </div>
            <div className="relative h-[30vh] w-full overflow-hidden rounded-2xl md:h-[50vh]">
              <Image
                src={images[5].src}
                alt={images[5].alt}
                fill
                className="object-cover"
              />
            </div>
          </motion.div>

          {/* Column 3 - Slides up */}
          <motion.div
            style={{ y: y1 }}
            className="flex flex-col gap-4 md:gap-8"
          >
            <div className="relative h-[30vh] w-full overflow-hidden rounded-2xl md:h-[50vh]">
              <Image
                src={images[4].src}
                alt={images[4].alt}
                fill
                className="object-cover"
              />
            </div>
            <div className="relative h-[30vh] w-full overflow-hidden rounded-2xl md:h-[50vh]">
              <Image
                src={images[0].src}
                alt={images[0].alt}
                fill
                className="object-cover"
              />
            </div>
            <div className="relative h-[30vh] w-full overflow-hidden rounded-2xl md:h-[50vh]">
              <Image
                src={images[1].src}
                alt={images[1].alt}
                fill
                className="object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* White veil to ensure text readability */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-white/25 via-white/50 to-white pointer-events-none" />
      <div className="absolute inset-0 z-0 bg-white/40 backdrop-blur-[2px] pointer-events-none" />

      {/* Center content */}
      <motion.div
        style={{ opacity: opacityText, scale: scaleText }}
        className="relative z-10 flex w-full max-w-7xl flex-1 flex-col items-center justify-center text-center pt-24"
      >
        {/* Eyebrow badge */}
        <motion.span
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: premiumEase }}
          className="mb-8 inline-flex items-center rounded-full border border-zinc-200 bg-white/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-700 backdrop-blur-md"
        >
          Start a Project
        </motion.span>

        {/* Giant word-stagger headline */}
        <motion.h1
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center text-5xl font-bold leading-[0.95em] tracking-tight text-zinc-900 sm:text-6xl md:text-[95px] lg:text-[118px] xl:text-[135px]"
        >
          <span className="flex gap-3 md:gap-6">
            <motion.span variants={wordVariants}>Let's</motion.span>
            <motion.span variants={wordVariants}>build</motion.span>
          </span>
          <span className="mt-1 flex md:mt-3">
            <motion.span
              variants={wordVariants}
              className="bg-linear-to-r from-[#2E5BFF] to-[#149CCB] bg-clip-text pb-5 text-transparent"
            >
              together.
            </motion.span>
          </span>
        </motion.h1>

        {/* Subline */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: premiumEase }}
          className="mt-7 max-w-xl text-base leading-relaxed text-zinc-500 md:text-lg"
        >
          Have a project in mind, or just want to say hi? Tell us what you're
          building — we usually reply within a couple of hours.
        </motion.p>
      </motion.div>
    </section>
  );
}
