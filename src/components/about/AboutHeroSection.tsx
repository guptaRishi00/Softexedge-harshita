"use client";

import { motion } from "framer-motion";
import React from "react";
import Counter from "./Counter";
import EdgeToEdgeCarousel from "./EdgeToEdgeCarousel";

const cn = (...classes: (string | boolean | undefined | null)[]) => {
  return classes.filter(Boolean).join(" ");
};

const WORK_IMAGES = [
  "https://images.unsplash.com/photo-1780387477222-730504564368?w=800&auto=format&fit=crop&q=80",
  "https://plus.unsplash.com/premium_photo-1773833961204-e6534b9913e3?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1779399147786-316f949446bb?w=800&auto=format&fit=crop&q=80",
  "https://plus.unsplash.com/premium_photo-1688572454849-4348982edf7d?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80",
];

const stats = [
  { value: 10, suffix: "+", label: "Years of craft" },
  { value: 250, suffix: "+", label: "Projects shipped" },
  { value: 98, suffix: "%", label: "Client retention" },
  { value: 40, suffix: "+", label: "Team members" },
];

const premiumEase = [0.16, 1, 0.3, 1] as const;

const APPEAR_DELAY = 0.1;
const WORD_STAGGER = 0.18;
const LINE_ONE = ["The", "minds", "behind"];
const SPLIT_DELAY = 1.7;

export default function AboutHeroSection() {
  return (
    <main className="relative flex min-h-screen w-full flex-col overflow-hidden bg-white font-sans selection:bg-[#2E5BFF]/20">
      <div
        id="about-hero-inner"
        className="flex w-full flex-1 flex-col pb-4 md:pb-25 origin-[center_calc(100%-100vh)]"
      >
        <div className="relative z-10 flex min-h-screen w-full flex-1 flex-col items-center justify-center px-6 pt-48 pb-32 max-md:px-3 max-md:pt-28 max-md:pb-16 md:pt-50 text-center md:px-10">
          <h1 className="text-[3.4rem] font-bold leading-[1.05] tracking-tight text-zinc-900 sm:text-6xl md:text-7xl lg:text-[6rem]">
            {LINE_ONE.map((word, i) => (
              <motion.span
                key={word}
                initial={{ opacity: 0, y: 28, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  duration: 0.7,
                  delay: APPEAR_DELAY + i * WORD_STAGGER,
                  ease: premiumEase,
                }}
                className="mr-[0.25em] inline-block"
              >
                {word}
              </motion.span>
            ))}
          </h1>

          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            transition={{
              height: { duration: 1.1, delay: SPLIT_DELAY, ease: premiumEase },
              opacity: {
                duration: 0.7,
                delay: SPLIT_DELAY + 0.25,
                ease: "easeOut",
              },
            }}
            className="w-[117.65vw] overflow-hidden"
          >
            <motion.div
              initial={{ y: 24, scale: 0.96 }}
              animate={{ y: 0, scale: 1 }}
              transition={{
                duration: 1,
                delay: SPLIT_DELAY + 0.2,
                ease: premiumEase,
              }}
              className="py-4 md:py-7"
            >
              <EdgeToEdgeCarousel images={WORK_IMAGES} />
            </motion.div>
          </motion.div>

          <div>
            <motion.h1
              initial={{ opacity: 0, y: 28, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{
                duration: 0.7,
                delay: APPEAR_DELAY + LINE_ONE.length * WORD_STAGGER,
                ease: premiumEase,
              }}
              className="text-[3.4rem] font-bold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl lg:text-[6rem]"
            >
              <span className="bg-linear-to-r from-[#2E5BFF] to-[#149CCB] bg-clip-text pb-5 text-transparent">
                digital excellence<span className="max-sm:hidden">.</span>
              </span>
            </motion.h1>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: premiumEase }}
          className="relative z-10 grid w-full grid-cols-2 gap-8 px-6 py-12 max-md:gap-10 max-md:px-3 max-md:py-8 md:grid-cols-4 md:gap-4 md:px-12 md:py-20"
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className={cn(
                "flex flex-col items-center text-center",
                // Dividers are a desktop-only treatment: the 2-col mobile grid
                // reads cleaner without them. `md:border-t-0` is gone with the
                // base `border-t` it existed to cancel.
                index !== 0 && "border-zinc-200 md:border-l",
              )}
            >
              <h4 className="mb-5 text-5xl font-bold tracking-tighter text-zinc-900 max-md:mb-3 max-md:text-[2.5rem] md:text-6xl lg:text-[5rem]">
                <Counter value={stat.value} suffix={stat.suffix} />
              </h4>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-500 max-md:text-xs md:text-base">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </main>
  );
}
