"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { useIsDesktop } from "@/lib/useIsDesktop";
import Header from "../page/Header";
import SpotlightGrid from "../ui/SpotlightGrid";

const premiumEase = [0.16, 1, 0.3, 1] as const;
const exitEase = [0.32, 0, 0.67, 0] as const;

// Rotating stack images (the current abstract + two studio shots).
const CARDS = [
  { id: 1, url: "/assets/kanhaiya-sharma-EiAqej-cGks-unsplash.jpg" },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1773332611612-ffdaa753afb1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwcm9maWxlLXBhZ2V8Mjd8fHxlbnwwfHx8fHw%3D",
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1773332598289-ed0444ad1d6f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwcm9maWxlLXBhZ2V8NHx8fGVufDB8fHx8fA%3D%3D",
  },
];

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
  const isDesktop = useIsDesktop();
  const [frontIndex, setFrontIndex] = useState(0);

  // Cycle the stack every 4.5s (desktop, motion-allowed) — same as AboutSection.
  useEffect(() => {
    if (!isDesktop || reduce) return;
    const interval = setInterval(() => setFrontIndex((p) => p + 1), 4500);
    return () => clearInterval(interval);
  }, [isDesktop, reduce]);

  const visibleCards = [0, 1, 2].map((offset) => {
    const card = CARDS[(frontIndex + offset) % CARDS.length];
    return { ...card, offset, uniqueId: frontIndex + offset };
  });

  return (
    <section className="relative w-full bg-white px-3 pt-24 pb-0 font-sans selection:bg-[#2E5BFF]/20 md:pt-30">
      {/* Header — shared inner-page header */}
      <div className="absolute left-0 top-0 z-50 w-full">
        <Header />
      </div>

      {/* Black hero container with auto-moving spotlight pattern */}
      <div className="relative mx-auto flex min-h-[62vh] w-full flex-col items-center gap-10 overflow-hidden rounded-[20px] border border-zinc-800/50 bg-black px-6 py-12 md:flex-row md:justify-between md:gap-6 md:px-12 md:py-16 lg:gap-12 lg:px-16">
        <SpotlightGrid speed={4} maskRadius={950} travel={0.35} />

        {/* Left-side scrim so the copy stays legible over the pattern */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-[5] w-full max-w-3xl bg-gradient-to-r from-black/20 via-black/5 to-transparent" />

        {/* Left: content */}
        <div className="relative z-10 flex w-full flex-col items-start text-left md:w-3/5">
          {/* Headline — two lines */}
          <motion.h1
            variants={headlineContainer}
            initial={reduce ? false : "hidden"}
            animate="visible"
            className="flex flex-col text-[3.25rem] font-bold leading-[0.95] tracking-tight text-white sm:text-[4rem] lg:text-[5.25rem]"
          >
            <motion.span variants={line}>Let&apos;s build</motion.span>
            <motion.span variants={line}>
              <span className="bg-gradient-to-r from-[#2E5BFF] to-[#149CCB] bg-clip-text text-transparent">
                something great.
              </span>
            </motion.span>
          </motion.h1>
        </div>

        {/* Right: stacking card animation (same as home AboutSection) */}
        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.95, y: 40 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.2, ease: premiumEase }}
          className="relative z-10 flex w-full items-center justify-center md:w-2/5"
        >
          {/* Decorative rings */}
          <motion.div
            animate={isDesktop && !reduce ? { rotate: 360 } : undefined}
            transition={{ duration: 50, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="pointer-events-none absolute h-[260px] w-[260px] rounded-full border border-white/10 md:h-[440px] md:w-[440px]"
          />
          <motion.div
            animate={isDesktop && !reduce ? { rotate: -360 } : undefined}
            transition={{ duration: 40, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="pointer-events-none absolute h-[210px] w-[210px] rounded-full border border-white/[0.06] md:h-[360px] md:w-[360px]"
          />

          {/* Card stack */}
          <div className="relative w-full max-w-[420px]">
            <div className="perspective-[1200px] relative h-[300px] w-full md:h-[420px] lg:h-[460px]">
              {isDesktop && !reduce ? (
                <AnimatePresence>
                  {visibleCards.map((card) => (
                    <motion.div
                      key={card.uniqueId}
                      initial={{ y: -30, scale: 0.85, opacity: 0 }}
                      animate={{
                        y: card.offset * -25,
                        scale: 1 - card.offset * 0.05,
                        opacity: 1 - card.offset * 0.15,
                        zIndex: 10 - card.offset,
                        x: 0,
                        rotateZ: 0,
                      }}
                      exit={{
                        x: 1000,
                        y: 400,
                        rotateZ: 90,
                        opacity: 1,
                        scale: 1,
                        zIndex: 50,
                        transition: { duration: 1.1, ease: exitEase },
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 60,
                        damping: 20,
                        mass: 1,
                      }}
                      className="absolute inset-0 origin-bottom-right overflow-hidden rounded-[28px] bg-zinc-800 will-change-transform"
                    >
                      <img
                        src={card.url}
                        alt="Our work"
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />
                    </motion.div>
                  ))}
                </AnimatePresence>
              ) : (
                <div className="absolute inset-0 overflow-hidden rounded-[28px] border border-white/10 bg-zinc-800">
                  <img
                    src={CARDS[0].url}
                    alt="Our work"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
