"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import DomeGallery from "../ui/DomeGallery";

const premiumEase = [0.16, 1, 0.3, 1] as const;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.25,
      delayChildren: 0.2,
    },
  },
} as const;

const wordVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
} as const;

const GALLERY_MEDIA = [
  {
    src: "/assets/w1.jpg",
    alt: "Abstract art",
  },
  {
    src: "/assets/w2.jpg",
    alt: "Modern sculpture",
  },
  {
    src: "/assets/w3.jpg",
    alt: "Digital artwork",
  },
  {
    src: "/assets/w4.jpg",
    alt: "Contemporary art",
  },
  {
    src: "/assets/w5.jpg",
    alt: "Geometric pattern",
  },
  {
    src: "/assets/w6.jpg",
    alt: "Textured surface",
  },
];

export default function WorkHeroSection() {
  // Desktop: the showcase (#work-showcase) slides over this pinned hero, and
  // the dome kept animating underneath the covering layer — DomeGallery's own
  // IntersectionObserver can't catch that, because the pinned hero never
  // leaves the viewport, it only gets covered. Observing the OVERLAPPING
  // element instead: the moment any part of #work-showcase enters the
  // viewport the overlap has begun, so the dome pauses; scrolling back above
  // it resumes. Mounted only from md up — below md there is no pin (the
  // sections stack in normal flow) and the dome's built-in viewport pause
  // already governs, so mobile behaviour is byte-identical.
  const [overlapped, setOverlapped] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(min-width: 768px)").matches) return;
    const target = document.getElementById("work-showcase");
    if (!target) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) setOverlapped(entry.isIntersecting);
      },
      // The -1px bottom margin is load-bearing: at scroll 0 the showcase's
      // top sits EXACTLY at the viewport bottom (hero is min-h-screen), and
      // the IO spec counts merely TOUCHING boxes as intersecting (ratio 0,
      // isIntersecting true) - without the margin the dome arrived paused on
      // first paint and never moved. Shrinking the root's bottom edge by 1px
      // means the showcase must actually intrude into the viewport before it
      // counts as overlapping.
      { threshold: 0, rootMargin: "0px 0px -1px 0px" },
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  return (
    <main className="relative flex min-h-screen w-full flex-col overflow-hidden bg-black font-sans selection:bg-[#2E5BFF]/20">
      <div
        id="work-hero-dome"
        className="absolute left-0 top-[-20vh] z-0 h-[140vh] w-[117.65%] -ml-[8.82%] origin-center"
      >
        <DomeGallery
          images={GALLERY_MEDIA}
          autoRotate
          paused={overlapped}
          desktopDirection="right"
          autoRotateSpeed={1}
          grayscale={false}
          cardOverlay
        />
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[5] md:hidden bg-[radial-gradient(ellipse_70%_30%_at_50%_52%,rgba(0,0,0,0.62)_0%,rgba(0,0,0,0.4)_55%,rgba(0,0,0,0)_100%)]"
      />

      <div
        id="work-hero-copy"
        className="relative z-10 flex min-h-screen w-full flex-1 flex-col items-center justify-center px-6 text-center md:px-10 pointer-events-none origin-top"
      >
        <motion.h1
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-6 mt-16 md:mt-24 flex flex-col items-center text-[clamp(2.875rem,calc(17.2vw_-_8px),3.75rem)] font-bold leading-[1em] max-sm:leading-[1.1] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-[7rem]"
        >
          <span className="flex items-center justify-center whitespace-nowrap">
            <motion.span variants={wordVariants}>Our</motion.span>
            <motion.span variants={wordVariants} className="ml-3 md:ml-6">
              Creative
            </motion.span>
          </span>

          <span className="mt-2 flex space-x-3 md:mt-4 md:space-x-6">
            <motion.span variants={wordVariants}>
              <span className="bg-linear-to-r from-[#2E5BFF] to-[#149CCB] bg-clip-text text-transparent">
                Portfolio
              </span>
            </motion.span>
          </span>
        </motion.h1>
      </div>
    </main>
  );
}
