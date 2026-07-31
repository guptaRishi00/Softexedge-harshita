"use client";

import { AnimatePresence, motion, type Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MdArrowOutward } from "react-icons/md";
import { useIsDesktop } from "@/lib/useIsDesktop";
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

const initialCards = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1773332611612-ffdaa753afb1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwcm9maWxlLXBhZ2V8Mjd8fHxlbnwwfHx8fHw%3D",
  },
  {
    id: 2,
    url: "/assets/a.jpg",
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1773332598289-ed0444ad1d6f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwcm9maWxlLXBhZ2V8NHx8fGVufDB8fHx8fA%3D%3D",
  },
];

export default function AboutSection() {
  const [frontIndex, setFrontIndex] = useState(0);
  const isDesktop = useIsDesktop();

  useEffect(() => {
    const interval = setInterval(() => {
      setFrontIndex((prev) => prev + 1);
    }, 6000);

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
      id="about"
      variants={sectionVariants}
      initial={isDesktop ? "hidden" : false}
      whileInView={isDesktop ? "visible" : undefined}
      exit={isDesktop ? "exit" : undefined}
      viewport={{ once: false, amount: 0.2 }}
      className="relative overflow-hidden bg-white px-4 py-10 text-zinc-900 before:absolute before:inset-0 max-md:px-3 max-md:pt-4 md:px-10 lg:mb-20"
    >
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.04] mix-blend-multiply" />

      <div className="relative z-10 mx-auto">
        <div className="grid items-center gap-16 max-md:gap-8 lg:grid-cols-[1fr_0.9fr]">
          <div className="relative mt-20 max-md:mt-0 max-md:bg-white">
            <motion.p
              variants={textReveal}
              className="mb-6 text-sm uppercase tracking-[0.3em] text-zinc-500 font-medium pl-[5px] max-md:mb-4 max-md:text-xs"
            >
              About The Studio
            </motion.p>

            <motion.h1
              variants={wordContainer}
              className="flex max-w-5xl flex-wrap items-baseline gap-x-4 gap-y-2 text-3xl font-bold leading-[0.9em] tracking-[-0.04em] max-md:gap-x-2.5 max-md:gap-y-0.5 max-md:leading-[0.8em] md:text-6xl lg:text-[3.5rem]"
            >
              <motion.span variants={wordAnimation} className="block">
                Building
              </motion.span>

              <motion.span
                variants={wordAnimation}
                className="block bg-linear-to-r from-[#2E5BFF] to-[#149CCB] bg-clip-text py-1 text-transparent"
              >
                cinematic
              </motion.span>

              {"digital products for the next generation of"
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
                  words={["brands", "startups", "founders", "creators"]}
                  activeIndex={frontIndex}
                  isDesktop={isDesktop}
                />
              </motion.span>
            </motion.h1>

            <motion.div
              variants={textReveal}
              className="mt-10 max-w-2xl space-y-6 max-md:mt-6 max-md:space-y-4"
            >
              <p className="text-xl leading-[1.25em] text-zinc-600 font-regular max-md:text-base">
                We design immersive identities, motion-rich interfaces, and
                scalable digital systems that feel sharp, intentional, and
                unforgettable
              </p>
              <div className="flex flex-wrap gap-4 pt-3">
                <Link
                  href="/contact"
                  className="group flex h-16 w-fit cursor-pointer items-center justify-between gap-5 rounded-xl border border-transparent bg-white pl-0 pr-2.5 transition-all duration-300 hover:border-black hover:pl-6 hover:pr-3.5 max-md:h-12 max-md:gap-3 max-md:pr-2"
                >
                  <span className="text-lg font-bold tracking-tight text-black transition-colors duration-300 max-md:text-base">
                    Connect With Us
                  </span>

                  <div className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl bg-black text-white max-md:h-9 max-md:w-9 max-md:rounded-lg">
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

                    <MdArrowOutward className="absolute z-10 h-5 w-5 transition-transform duration-300 group-hover:-translate-y-8 group-hover:translate-x-8" />
                    <MdArrowOutward
                      className="absolute z-10 h-5 w-5 -translate-x-8 translate-y-8 transition-transform duration-300 group-hover:translate-x-0 group-hover:translate-y-0"
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
            className="relative flex items-center justify-center pt-10 max-md:pt-0"
          >
            <motion.div
              animate={isDesktop ? { rotate: 360 } : undefined}
              transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
              className="absolute h-[320px] w-[320px] md:h-[520px] md:w-[520px] rounded-full border border-black/10"
            />
            <motion.div
              animate={isDesktop ? { rotate: -360 } : undefined}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="absolute h-[260px] w-[260px] md:h-[420px] md:w-[420px] rounded-full border border-black/[0.06]"
            />

            <div className="relative w-full max-w-[600px]">
              <div className="perspective-[1200px] relative h-[420px] w-full md:h-[560px]">
                {isDesktop ? (
                  <AnimatePresence>
                    {visibleCards.map((card) => (
                      <motion.div
                        key={card.uniqueId}
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
                          transition: { duration: 1.1, ease: exitEase },
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 60,
                          damping: 20,
                          mass: 1,
                        }}
                        className="absolute inset-0 origin-bottom-right overflow-hidden rounded-[28px] bg-zinc-200 will-change-transform"
                      >
                        <Image
                          src={card.url}
                          alt="Creative Studio"
                          fill
                          sizes="(max-width: 768px) 100vw, 600px"
                          className="h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                ) : (
                  <div className="absolute inset-0 overflow-hidden rounded-[28px] border border-black/10 bg-zinc-200 shadow-sm">
                    <Image
                      src={initialCards[0].url}
                      alt="Creative Studio"
                      fill
                      sizes="(max-width: 768px) 100vw, 600px"
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />
                  </div>
                )}
              </div>

              <motion.div
                animate={
                  isDesktop
                    ? { opacity: [0.15, 0.4, 0.15], scale: [1, 1.05, 1] }
                    : undefined
                }
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
