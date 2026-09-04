"use client";

import { motion } from "framer-motion";
import type { CarouselItem } from "./CarouselCard";
import InfiniteRow from "./InfiniteRow";

const premiumEase = [0.16, 1, 0.3, 1] as const;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.15 },
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

// Shown in place of the video in the marquee's repeated copies, so only the
// first copy holds a real <video>. Swap these for actual poster frames of the
// videos if you want the repeats to look identical to the playing card.
const col1Still = "/assets/meet2.jpg";
const col2Still = "/assets/meet.jfif";

const col1Items: CarouselItem[] = [
  {
    type: "image",
    src: col1Still,
  },
  {
    type: "quote",
    text: "The best place I've grown — trusted with real work from day one.",
    author: "Priya Sharma",
    role: "Product Designer",
  },
  { type: "video", src: "/assets/video1.mp4", still: col1Still },
];

const col2Items: CarouselItem[] = [
  { type: "video", src: "/assets/video2.mp4", still: col2Still },
  {
    type: "image",
    src: col2Still,
  },
  {
    type: "quote",
    text: "Great people, real ownership, and room to do the best work of your life.",
    author: "Arjun Mehta",
    role: "Engineering Lead",
  },
];

export default function CareerHeroSection() {
  return (
    <section className="relative flex w-full flex-col overflow-hidden bg-white pt-24 pb-32 text-zinc-900 font-sans selection:bg-[#2E5BFF]/20 max-md:min-h-svh max-md:justify-center max-md:pb-24">
      <div className="relative z-10 flex w-full flex-col pt-16 md:pt-24">
        <div
          id="career-hero-copy"
          className="px-6 max-md:px-3 md:px-12 w-full max-w-[1200px] mx-auto text-center"
        >
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <h1 className="text-[2.5rem] font-bold leading-[1.05] tracking-tight text-black sm:text-6xl md:text-7xl lg:text-[6rem] mb-2">
              <motion.span variants={wordVariants} className="inline-block">
                Think.
              </motion.span>{" "}
              <motion.span variants={wordVariants} className="inline-block">
                Create.
              </motion.span>{" "}
              <motion.span variants={wordVariants} className="inline-block">
                Do.
              </motion.span>
            </h1>
            <h2 className="text-[2.5rem] font-bold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl lg:text-[6rem] mb-6">
              <motion.span
                variants={wordVariants}
                className="inline-block bg-linear-to-r from-[#2E5BFF] to-[#149CCB] bg-clip-text text-transparent pr-4"
              >
                Grow With Us
              </motion.span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: premiumEase }}
            className="text-center text-zinc-600 font-regular text-lg md:text-xl max-w-xl mx-auto leading-[1.25em] mb-16 max-md:mb-10"
          >
            We’re creating impactful digital solutions.
            <br />
            Join us on the journey.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: premiumEase }}
          className="w-full"
        >
          <div
            id="career-hero-carousel"
            className="w-[117.65%] -ml-[8.82%] flex flex-col gap-3"
          >
            <InfiniteRow items={col1Items} direction="left" speed={40} />
            <InfiniteRow items={col2Items} direction="right" speed={45} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
