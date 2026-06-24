"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Header from "../page/Header";

const premiumEase = [0.16, 1, 0.3, 1] as const;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
} as const;

const textVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: premiumEase },
  },
} as const;

const bentoVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.8, ease: premiumEase },
  },
} as const;

// Mapped perfectly for a 3x3 desktop grid and a 2-column mobile grid
const BENTO_IMAGES = [
  {
    src: "/assets/alex-kotliarskyi-QBpZGqEMsKg-unsplash.jpg",
    alt: "Office setup",
    className:
      "col-span-2 aspect-[16/9] lg:aspect-auto lg:col-span-2 lg:row-span-2",
  },
  {
    src: "/assets/milad-fakurian-2gzQL38nWAM-unsplash.jpg",
    alt: "Abstract design",
    className:
      "col-span-1 aspect-square lg:aspect-auto lg:col-span-1 lg:row-span-1",
  },
  {
    src: "/assets/egor-litvinov-X1Txy1GTT5A-unsplash.jpg",
    alt: "Creative work",
    className:
      "col-span-1 aspect-square lg:aspect-auto lg:col-span-1 lg:row-span-1",
  },
  {
    src: "/assets/xiang-chi-WwCKehYfMCA-unsplash.jpg",
    alt: "Design architecture",
    className:
      "col-span-1 aspect-square lg:aspect-auto lg:col-span-1 lg:row-span-1",
  },
  {
    src: "/assets/laptop-screen-with-minimalist-ecommerce-dashboard.jpg",
    alt: "Dashboard interface",
    className:
      "col-span-1 aspect-square lg:aspect-auto lg:col-span-2 lg:row-span-1",
  },
];

export default function ContactHeroSection() {
  return (
    // Strictly plain white background
    <section className="relative flex min-h-screen w-full items-center overflow-hidden bg-white text-zinc-900 pt-24 pb-12 lg:pt-20 lg:pb-0">
      {/* Header */}
      <div className="absolute left-0 top-0 z-50 w-full">
        <Header />
      </div>

      {/* Full width layout container */}
      <div className="relative z-10 w-full px-6 md:px-12 lg:px-20 xl:px-32">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-20 xl:gap-24">
          {/* Left Column: Text Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-start text-left"
          >
            {/* Minimalist Live Pill */}
            <motion.div
              variants={textVariants}
              className="mb-8 inline-flex items-center gap-3 rounded-full border border-zinc-200 bg-zinc-50 px-5 py-2 text-xs font-bold uppercase tracking-widest text-zinc-800 md:text-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-black opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-black"></span>
              </span>
              Start a Project
            </motion.div>

            {/* Editorial Title */}
            <h1 className="mb-8 flex flex-col text-[3.5rem] font-black leading-[0.9] tracking-tighter text-black sm:text-7xl md:text-8xl lg:text-[100px]">
              <motion.span variants={textVariants} className="block">
                LET'S BUILD
              </motion.span>
              <motion.span
                variants={textVariants}
                // Hollow text effect for a high-end editorial look
                className="block text-transparent [-webkit-text-stroke:2px_#000] lg:[-webkit-text-stroke:3px_#000]"
              >
                TOGETHER.
              </motion.span>
            </h1>

            {/* Description */}
            <motion.p
              variants={textVariants}
              className="max-w-md text-lg font-medium leading-relaxed text-zinc-500 md:text-xl"
            >
              Have a project in mind, or just want to say hi? Tell us what
              you're building — we usually reply within a couple of hours.
            </motion.p>
          </motion.div>

          {/* Right Column: Bento Box Gallery */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="w-full"
          >
            <div className="grid grid-cols-2 gap-3 md:gap-4 lg:h-[600px] lg:grid-cols-3 lg:grid-rows-3">
              {BENTO_IMAGES.map((img, i) => (
                <motion.div
                  key={i}
                  variants={bentoVariants}
                  className={`group relative overflow-hidden rounded-2xl bg-zinc-100 ${img.className}`}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="(max-width: 1024px) 50vw, 33vw"
                    priority={i === 0}
                  />
                  {/* Subtle hover overlay to make it feel tactile */}
                  <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/5" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
