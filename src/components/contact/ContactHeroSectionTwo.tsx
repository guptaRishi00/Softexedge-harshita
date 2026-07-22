"use client";

import { motion, useReducedMotion } from "framer-motion";
import Header from "../page/Header";

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

const headlineWords = "Let's build something worth talking about."
  .split(" ")
  .map((word, i) => ({ word, id: `headline-${i}-${word}` }));

export default function ContactHeroSectionTwo() {
  const reduce = useReducedMotion();

  return (
    <section className="relative flex min-h-screen w-full flex-col overflow-hidden bg-black font-sans selection:bg-[#2E5BFF]/20">
      <video
        src="/assets/video5.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />

      {/* Slight left→right black scrim: enough weight behind the headline for
          legibility, fading to fully clear so the footage reads on the right. */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-black/80 via-black/50 to-transparent" />

      {/* Header — overlays the video, light variant like WorkHeroSection */}
      <div className="absolute left-0 top-0 z-50 w-full">
        <Header onDark />
      </div>

      <div className="relative z-10 flex min-h-screen w-full flex-1 flex-col items-center justify-center gap-10 px-6 py-28 md:flex-row md:justify-between md:gap-6 md:px-12 lg:gap-12 lg:px-10 lg:mt-14">
        {/* Content */}
        <div className="relative z-10 flex w-full flex-col items-start text-left md:w-[70%]">
          {/* Headline — wraps to fill the 70% column */}
          <motion.h1
            variants={headlineContainer}
            initial={reduce ? false : "hidden"}
            animate="visible"
            className="text-[2.75rem] font-bold leading-[0.95] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-[7rem]"
          >
            {headlineWords.map(({ word, id }) => (
              <motion.span
                key={id}
                variants={line}
                className="mr-[0.22em] inline-block"
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>
        </div>
      </div>
    </section>
  );
}
