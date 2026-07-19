"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useRef, useState } from "react";
import Header from "../page/Header";
import SpotlightGrid from "../ui/SpotlightGrid";

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

export default function ContactHeroSectionTwo() {
  const reduce = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  return (
    <section className="relative w-full bg-white pt-24 pb-0 font-sans selection:bg-[#2E5BFF]/20 md:pt-30">
      {/* Header — shared inner-page header, on the white top strip */}
      <div className="absolute left-0 top-0 z-50 w-full">
        <Header />
      </div>

      {/* Full-bleed black hero with auto-moving spotlight pattern — flows
          straight into the black ContactSection below (no card framing) */}
      <div className="relative mx-auto flex min-h-[62vh] w-full flex-col items-center gap-10 overflow-hidden bg-black px-6 py-12 md:flex-row md:justify-between md:gap-6 md:px-12 md:py-28 lg:gap-12 lg:px-16">
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
            className="flex flex-col text-[3.5rem] font-bold leading-[0.95] tracking-tight text-white sm:text-[4.5rem] lg:text-[6.5rem]"
          >
            <motion.span variants={line}>Let&apos;s build</motion.span>
            <motion.span variants={line}>something</motion.span>
            <motion.span variants={line}>
              <span className="bg-gradient-to-r from-[#2E5BFF] to-[#149CCB] bg-clip-text pr-2 text-transparent">
                great.
              </span>
            </motion.span>
          </motion.h1>
        </div>

        {/* Right: simple rectangle video with a play button */}
        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.95, y: 40 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.2, ease: premiumEase }}
          className="relative z-10 flex w-full items-center justify-center md:w-2/5"
        >
          <div className="relative w-full max-w-[420px]">
            <div className="relative h-[300px] w-full overflow-hidden rounded-[28px] border border-white/10 bg-zinc-900 md:h-[420px] lg:h-[460px]">
              {/* biome-ignore lint/a11y/useMediaCaption: decorative showreel with no dialogue */}
              <video
                ref={videoRef}
                src="/assets/hero.mp4"
                preload="metadata"
                playsInline
                loop
                onClick={togglePlay}
                className="h-full w-full cursor-pointer object-cover"
              />

              {/* Centered play button — hidden while playing (click the video
                  itself to pause) */}
              {!isPlaying && (
                <button
                  type="button"
                  onClick={togglePlay}
                  aria-label="Play video"
                  className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-black shadow-[0_8px_30px_rgba(0,0,0,0.4)] transition-transform duration-300 hover:scale-110 md:h-20 md:w-20"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="ml-1 h-6 w-6 md:h-7 md:w-7"
                  >
                    <title>Play</title>
                    <path d="M8 5.14v13.72c0 .8.87 1.3 1.56.9l11-6.86a1.05 1.05 0 0 0 0-1.8l-11-6.86A1.05 1.05 0 0 0 8 5.14z" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
