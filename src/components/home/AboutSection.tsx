"use client";

import DynamicButton from "../ui/DynamicButton";
import { useEffect, useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";

/* =========================================
   EASING
========================================= */
const smoothEase = [0.16, 1, 0.3, 1] as const;
const exitEase = [0.7, 0, 0.84, 0] as const;

/* =========================================
   ROTATING WORD COMPONENT
========================================= */
function RotatingWord({ words }: { words: string[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <span className="relative inline-flex overflow-hidden align-bottom">
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{
            y: "100%",
            opacity: 0,
            rotateX: -90,
            filter: "blur(8px)",
          }}
          animate={{
            y: "0%",
            opacity: 1,
            rotateX: 0,
            filter: "blur(0px)",
          }}
          exit={{
            y: "-100%",
            opacity: 0,
            rotateX: 90,
            filter: "blur(8px)",
          }}
          transition={{
            duration: 0.7,
            ease: smoothEase,
          }}
          className="inline-block bg-gradient-to-r from-[#3445E7] via-[#2F85EA] to-[#07D6F3] bg-clip-text text-transparent"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

/* =========================================
   SECTION VARIANTS
========================================= */
const sectionVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 100,
    filter: "blur(12px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 1,
      ease: smoothEase,
      staggerChildren: 0.15,
    },
  },
  exit: {
    opacity: 0,
    y: -80,
    filter: "blur(10px)",
    transition: {
      duration: 0.7,
      ease: exitEase,
    },
  },
};

/* =========================================
   WORD CONTAINER
========================================= */
const wordContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.2,
    },
  },
};

/* =========================================
   WORD ANIMATION
========================================= */
const wordAnimation: Variants = {
  hidden: {
    opacity: 0,
    y: 80,
    rotateX: -90,
    filter: "blur(10px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: smoothEase,
    },
  },
};

/* =========================================
   TEXT REVEAL
========================================= */
const textReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: smoothEase,
    },
  },
};

const initialCards = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop",
  },
];

export default function AboutSection() {
  const [cards, setCards] = useState(initialCards);

  /* =========================================
     CARD LOOP
  ========================================= */
  useEffect(() => {
    const interval = setInterval(() => {
      setCards((prevCards) => {
        const newCards = [...prevCards];

        const first = newCards.shift();

        if (first) {
          newCards.push(first);
        }

        return newCards;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.section
      id="about"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      exit="exit"
      viewport={{ once: false, amount: 0.2 }}
      className="relative overflow-hidden bg-white px-6 py-24 text-zinc-900 before:absolute before:inset-0 before:bg-[linear-gradient(to_bottom,transparent,rgba(0,0,0,0.02))] md:px-12 lg:px-10"
    >
      {/* NOISE */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.04] mix-blend-multiply" />

      <div className="relative z-10 mx-auto">
        <div className="grid items-center gap-16 lg:grid-cols-[1fr_0.9fr]">
          {/* LEFT CONTENT */}
          <div className="relative">
            <motion.p
              variants={textReveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false }}
              className="mb-6 text-sm uppercase tracking-[0.3em] text-zinc-500"
            >
              About The Studio
            </motion.p>

            {/* WORD BY WORD TITLE */}
            <motion.h1
              variants={wordContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.2 }}
              className="max-w-5xl text-5xl font-semibold leading-[1.1] tracking-[-0.04em] md:text-7xl lg:text-[4rem] flex flex-wrap gap-x-4"
            >
              {"Building".split(" ").map((word, index) => (
                <motion.span
                  key={index}
                  variants={wordAnimation}
                  className="inline-block"
                >
                  {word}
                </motion.span>
              ))}

              <motion.span variants={wordAnimation} className="inline-block">
                <RotatingWord
                  words={[
                    "cinematic",
                    "immersive",
                    "innovative",
                    "dynamic",
                    "disruptive",
                  ]}
                />
              </motion.span>

              {"digital products for the next generation of"
                .split(" ")
                .map((word, index) => (
                  <motion.span
                    key={index}
                    variants={wordAnimation}
                    className="inline-block"
                  >
                    {word}
                  </motion.span>
                ))}

              <motion.span variants={wordAnimation} className="inline-block">
                <RotatingWord
                  words={[
                    "brands.",
                    "startups.",
                    "visionaries.",
                    "founders.",
                    "creators.",
                  ]}
                />
              </motion.span>
            </motion.h1>

            {/* DESCRIPTION */}
            <motion.div
              variants={textReveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false }}
              className="mt-10 max-w-2xl space-y-6"
            >
              <p className="text-base leading-relaxed text-zinc-600">
                We design immersive identities, motion-rich interfaces, and
                scalable digital systems that feel sharp, intentional, and
                unforgettable.
              </p>

              <div className="flex flex-wrap gap-4 pt-3">
                <DynamicButton
                  text="Start Project"
                  href="#contact"
                  className="border border-black/20 px-6 py-4 text-base"
                />
              </div>
            </motion.div>
          </div>

          {/* RIGHT VISUAL */}
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.9,
              y: 80,
            }}
            whileInView={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            transition={{
              duration: 1,
              ease: smoothEase,
            }}
            viewport={{ once: false }}
            className="relative flex items-center justify-center pt-10"
          >
            {/* OUTER RING */}
            <motion.div
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 40,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute h-[520px] w-[520px] rounded-full border border-black/10"
            />

            {/* INNER RING */}
            <motion.div
              animate={{
                rotate: -360,
              }}
              transition={{
                duration: 30,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute h-[420px] w-[420px] rounded-full border border-black/[0.06]"
            />

            {/* CARDS */}
            <div className="relative w-full max-w-[600px]">
              <div className="relative h-[560px] w-full">
                {cards.map((card, index) => (
                  <motion.div
                    key={card.id}
                    layout
                    animate={{
                      y: index * -25,
                      scale: 1 - index * 0.06,
                      opacity: 1 - index * 0.2,
                      zIndex: cards.length - index,
                    }}
                    transition={{
                      duration: 0.8,
                      ease: smoothEase,
                    }}
                    whileHover={{
                      scale: 1.02,
                      y: index * -30,
                    }}
                    className="absolute inset-0 overflow-hidden rounded-[28px] bg-zinc-200 shadow-2xl"
                  >
                    <img
                      src={card.url}
                      alt="Creative Studio"
                      className="h-full w-full object-cover"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  </motion.div>
                ))}
              </div>

              {/* GLOW */}
              <motion.div
                animate={{
                  opacity: [0.2, 0.5, 0.2],
                  scale: [1, 1.08, 1],
                }}
                transition={{
                  duration: 4,
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
