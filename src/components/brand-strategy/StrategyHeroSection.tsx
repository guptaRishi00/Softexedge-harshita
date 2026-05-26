"use client";

import DynamicButton from "../ui/DynamicButton";
import { useEffect, useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Header from "../page/Header";

const premiumEase = [0.22, 1, 0.36, 1] as const;
const exitEase = [0.32, 0, 0.67, 0] as const;

function RotatingWord({
  words,
  activeIndex,
}: {
  words: string[];
  activeIndex: number;
}) {
  const index = activeIndex % words.length;

  return (
    <span className="relative flex items-center justify-center overflow-hidden px-2 -mx-2 py-2 -my-2">
      <AnimatePresence mode="popLayout">
        <motion.span
          key={index}
          initial={{
            y: "100%",
          }}
          animate={{
            y: "0%",
          }}
          exit={{
            y: "-100%",
          }}
          transition={{
            duration: 0.5,
            ease: premiumEase,
          }}
          className="block bg-linear-to-r from-[#3445E7] via-[#2F85EA] to-[#07D6F3] bg-clip-text px-2 py-2 text-transparent"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

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

const initialCards = [
  {
    id: 1,
    url: "/assets/61638371ffd9742247bca9a5f67e847c.webp",
  },
  {
    id: 2,
    url: "/assets/a42c1e60b056072d262e8d0bd5b72e2d.webp",
  },
  {
    id: 3,
    url: "/assets/brand.jpg",
  },
];

export default function StrategyHeroSection() {
  const [frontIndex, setFrontIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFrontIndex((prev) => prev + 1);
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  const visibleCards = [0, 1, 2].map((offset) => {
    const card = initialCards[(frontIndex + offset) % initialCards.length];
    return {
      ...card,
      offset,
      uniqueId: frontIndex + offset,
    };
  });

  return (
    <motion.section
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      exit="exit"
      viewport={{ once: true, amount: 0.1 }}
      className="relative overflow-hidden bg-white text-zinc-900 min-h-[96.5vh] flex flex-col rounded-[20px]"
    >
      {/* Background Noise */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.04] mix-blend-multiply pointer-events-none" />

      {/* Header positioned at the top */}
      <div className="absolute top-0 left-0 w-full z-50 p-5">
        <Header />
      </div>

      {/* Main Content Wrapper - Centered vertically */}
      <div className="relative z-10 mx-auto px-6 md:px-12 lg:px-10 flex-1 flex flex-col justify-center w-full pt-32 pb-24">
        <div className="grid items-center gap-16 lg:grid-cols-[1fr_0.9fr]">
          {/* LEFT CONTENT */}
          <div className="relative">
            <motion.h1
              variants={wordContainer}
              className="flex max-w-5xl flex-wrap items-center gap-x-4 gap-y-2 text-5xl font-bold leading-[0.9em] tracking-[-0.04em] md:text-7xl lg:text-[3.5rem]"
            >
              <motion.span variants={wordAnimation} className="block">
                Architecting
              </motion.span>

              <motion.span
                variants={wordAnimation}
                className="block bg-linear-to-r from-[#3445E7] via-[#2F85EA] leading-[1.2em] to-[#07D6F3] bg-clip-text py-1 text-transparent"
              >
                strategic
              </motion.span>

              {"brand foundations for the next generation of"
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
                  words={["brands.", "startups.", "visionaries.", "leaders."]}
                  activeIndex={frontIndex}
                />
              </motion.span>
            </motion.h1>

            <motion.div
              variants={textReveal}
              className="mt-10 max-w-2xl space-y-6"
            >
              <p className="text-base leading-relaxed text-zinc-600">
                Brand strategy is the invisible architecture behind every
                successful brand. It defines why your company exists beyond
                making money, who your audience really is, how you're different
                from every competitor in your space, and what you stand for
                consistently.
              </p>
              <div className="flex flex-wrap gap-4 pt-3">
                <DynamicButton
                  text="View All Services"
                  href="/brand-strategy/learn-more"
                  className="border border-black/20 rounded-2xl py-5 text-xl hover:border-transparent"
                />
              </div>
            </motion.div>
          </div>

          {/* RIGHT VISUAL */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 40 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.2, ease: premiumEase }}
            viewport={{ once: true }}
            className="relative flex items-center justify-center pt-10 lg:pt-0"
          >
            {/* RINGS */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
              className="absolute h-[520px] w-[520px] rounded-full border border-black/10"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="absolute h-[420px] w-[420px] rounded-full border border-black/[0.06]"
            />

            {/* CARD STACK ANIMATION */}
            <div className="relative w-full max-w-[600px]">
              <div className="perspective-[1200px] relative h-[560px] w-full">
                <AnimatePresence>
                  {visibleCards.map((card) => (
                    <motion.div
                      key={card.uniqueId}
                      layout
                      initial={{
                        y: -30,
                        scale: 0.85,
                        opacity: 0,
                      }}
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
                      }}
                      transition={{
                        duration: 3,
                        ease: premiumEase,
                      }}
                      className="absolute inset-0 origin-bottom-right overflow-hidden rounded-[28px] bg-zinc-200"
                    >
                      <img
                        src={card.url}
                        alt="Strategy Inspiration"
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* GLOW */}
              <motion.div
                animate={{ opacity: [0.15, 0.4, 0.15], scale: [1, 1.05, 1] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="pointer-events-none absolute -left-20 top-10 h-60 w-60 rounded-full bg-blue-200/30 blur-3xl"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
