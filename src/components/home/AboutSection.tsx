"use client";

import { motion, type Variants } from "framer-motion";
import Link from "next/link";
import { type ReactNode, useEffect, useState } from "react";
import { MdArrowOutward } from "react-icons/md";
import { useIsDesktop } from "@/lib/useIsDesktop";
import AboutPhotoStack from "./AboutPhotoStack";
import RotatingWord from "./RotatingWord";

const premiumEase = [0.22, 1, 0.36, 1] as const;
const exitEase = [0.32, 0, 0.67, 0] as const;

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 60, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 1.2,
      ease: premiumEase,
      staggerChildren: 0.15,
    },
  },
  exit: {
    opacity: 0,
    y: -40,
    filter: "blur(4px)",
    transition: { duration: 0.8, ease: exitEase },
  },
};

const wordContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
  },
};

const wordAnimation: Variants = {
  hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1, ease: premiumEase },
  },
};

const textReveal: Variants = {
  hidden: { opacity: 0, y: 30, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1, ease: premiumEase },
  },
};

/**
 * `visual` fills the right-hand column. The home page passes the analytics
 * console figure (components/figures/dashboard). Without it the section falls
 * back to the original rotating photo stack (AboutPhotoStack), so restoring
 * the photos is just dropping the prop in app/home/page.tsx.
 */
export default function AboutSection({ visual }: { visual?: ReactNode }) {
  const [frontIndex, setFrontIndex] = useState(0);
  const isDesktop = useIsDesktop();

  // Desktop only: this index drives the rotating headline word and, when the
  // photo stack is shown, its cards (below `md` the stack and RotatingWord
  // own their own ticks). Ticking it on mobile re-rendered the whole section
  // every 6s to change one word.
  useEffect(() => {
    if (!isDesktop) return;
    const interval = setInterval(() => {
      setFrontIndex((prev) => prev + 1);
    }, 6000);

    return () => clearInterval(interval);
  }, [isDesktop]);

  return (
    <motion.section
      id="about"
      variants={sectionVariants}
      initial={isDesktop ? "hidden" : false}
      whileInView={isDesktop ? "visible" : undefined}
      exit={isDesktop ? "exit" : undefined}
      viewport={{ once: true, amount: 0.2 }}
      className="relative overflow-hidden bg-white px-4 py-10 text-zinc-900 before:absolute before:inset-0 max-md:px-3 max-md:pb-14 max-md:pt-8 md:px-10 lg:mb-20"
    >
      <div className="relative z-10 mx-auto">
        <div className="grid items-center gap-16 max-md:gap-8 lg:grid-cols-[1fr_0.9fr]">
          {/* Below md the two grid items swap via `order` so the image leads and
              the copy follows. The copy column is already tag -> title ->
              description -> button, so nothing inside it needs reordering. */}
          <div className="relative mt-20 max-md:order-2 max-md:mt-0 max-md:bg-white">
            <motion.p
              variants={textReveal}
              className="mb-6 text-sm uppercase tracking-[0.3em] text-zinc-500 font-medium pl-[5px] max-md:mb-9 max-md:text-xs"
            >
              About The Studio
            </motion.p>

            <motion.h1
              variants={wordContainer}
              className="flex max-w-5xl flex-wrap items-baseline gap-x-4 gap-y-2 text-3xl font-bold leading-[0.9em] max-md:text-[2.125rem] tracking-[-0.04em] max-md:gap-x-2.5 max-md:gap-y-0.5 max-md:leading-[0.8em] md:text-6xl lg:text-[3.5rem]"
            >
              <motion.span variants={wordAnimation} className="block">
                We build
              </motion.span>

              <motion.span
                variants={wordAnimation}
                className="block bg-linear-to-r from-[#2E5BFF] to-[#149CCB] bg-clip-text pb-3 text-transparent"
              >
                the product
              </motion.span>

              {"and the demand that fills it, for"
                .split(" ")
                .map((word, index) => (
                  <motion.span
                    key={index}
                    variants={wordAnimation}
                    className="block"
                  >
                    {word}
                  </motion.span>
                ))}

              <motion.span variants={wordAnimation} className="block">
                <RotatingWord
                  words={["founders", "startups", "brands", "challengers"]}
                  activeIndex={frontIndex}
                />
              </motion.span>
            </motion.h1>

            <motion.div
              variants={textReveal}
              className="mt-10 max-w-2xl space-y-6 max-md:mt-8 max-md:space-y-6"
            >
              <p className="text-xl leading-[1.25em] text-zinc-600 font-regular max-md:text-lg">
                Most agencies hand over a design file and wish you luck. We stay
                on it — the brand, the build, the launch, and the marketing that
                follows — so one team is accountable when the numbers come in
              </p>
              <div className="flex flex-wrap gap-4 pt-3">
                {/* Below md only the gradient arrow is pinned from the desktop
                    hover state — touch has no hover, so the resting state must
                    carry it. The hover state's left inset is deliberately NOT
                    pinned: it pushed the label 16px right of the body copy
                    above, so the base `pl-0` governs here and the label lines
                    up with the paragraph's left edge. */}
                <Link
                  href="/contact"
                  className="group flex h-16 w-fit cursor-pointer items-center justify-between gap-5 rounded-xl border border-transparent bg-white pl-0 pr-2.5 transition-all duration-300 hover:border-black hover:pl-3.5 hover:pr-3.5 max-md:gap-4 max-md:border-0 max-md:pr-3"
                >
                  <span className="text-lg font-bold tracking-tight text-black transition-colors duration-300">
                    Connect With Us
                  </span>

                  <div className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl bg-black text-white max-md:h-10 max-md:w-10 max-md:rounded-lg">
                    <svg width="0" height="0" className="absolute">
                      <title>Connect arrow gradient</title>
                      <defs>
                        <linearGradient
                          id="about-connect-icon-grad"
                          x1="0%"
                          y1="0%"
                          x2="100%"
                          y2="0%"
                        >
                          <stop stopColor="#2E5BFF" offset="0%" />
                          <stop stopColor="#149CCB" offset="100%" />
                        </linearGradient>
                      </defs>
                    </svg>

                    <MdArrowOutward className="absolute z-10 h-5 w-5 transition-transform duration-300 max-md:-translate-y-8 max-md:translate-x-8 group-hover:-translate-y-8 group-hover:translate-x-8" />
                    <MdArrowOutward
                      className="absolute z-10 h-5 w-5 -translate-x-8 translate-y-8 transition-transform duration-300 max-md:translate-x-0 max-md:translate-y-0 group-hover:translate-x-0 group-hover:translate-y-0"
                      style={{ fill: "url(#about-connect-icon-grad)" }}
                    />
                  </div>
                </Link>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={isDesktop ? { opacity: 0, scale: 0.95, y: 40 } : false}
            whileInView={isDesktop ? { opacity: 1, scale: 1, y: 0 } : undefined}
            transition={{ duration: 1.2, ease: premiumEase }}
            viewport={{ once: false }}
            // max-md:mb-8 stacks on top of the grid's 32px row-gap (the image
            // leads on mobile via order-1, so its bottom margin is the space
            // before the copy). Margin rather than a bigger gap keeps the
            // 768-1023 band — where the grid is still one column but the copy
            // comes first — exactly as it was.
            className="relative flex items-center justify-center pt-10 max-md:order-1 max-md:mb-8 max-md:pt-0"
          >
            {visual ?? (
              <AboutPhotoStack frontIndex={frontIndex} isDesktop={isDesktop} />
            )}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
