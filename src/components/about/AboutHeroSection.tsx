"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, Variants, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Header from "../page/Header"; // Adjust import path as needed

const premiumEase = [0.22, 1, 0.36, 1] as const;

function AvatarGroup() {
  const [isHovered, setIsHovered] = useState(false);

  const avatars = [
    {
      name: "Sarah Chen",
      url: "https://images.unsplash.com/photo-1780387477222-730504564368?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDJ8dG93SlpGc2twR2d8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Marcus Doe",
      url: "https://plus.unsplash.com/premium_photo-1773833961204-e6534b9913e3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDE3fHRvd0paRnNrcEdnfHxlbnwwfHx8fHw%3D",
    },
    {
      name: "Elena Rostova",
      url: "https://images.unsplash.com/photo-1779399147786-316f949446bb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDE5fHRvd0paRnNrcEdnfHxlbnwwfHx8fHw%3D",
    },
    {
      name: "James Wilson",
      url: "https://plus.unsplash.com/premium_photo-1688572454849-4348982edf7d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDI2fHRvd0paRnNrcEdnfHxlbnwwfHx8fHw%3D",
    },
  ];

  return (
    <div
      className="flex py-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {avatars.map((avatar, index) => (
        <motion.div
          key={index}
          initial="initial"
          animate={isHovered ? "groupHover" : "initial"}
          whileHover="hover"
          variants={{
            initial: {
              scale: 1,
              zIndex: 0,
              marginLeft: index === 0 ? 0 : -12,
            },
            groupHover: {
              scale: 1,
              zIndex: 10,
              marginLeft: index === 0 ? 0 : 6,
            },
            hover: {
              scale: 1.15,
              zIndex: 50,
              marginLeft: index === 0 ? 0 : 6,
            },
          }}
          transition={{ duration: 0.5, ease: premiumEase }}
          className="relative flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full bg-gradient-to-r from-[#2E5BFF] to-[#07D6F3] p-[2px] shadow-sm transition-shadow hover:shadow-md"
        >
          <img
            className="h-full w-full rounded-full border-2 border-white object-cover"
            src={avatar.url}
            alt={`Team member ${avatar.name}`}
          />

          <motion.div
            variants={{
              initial: { opacity: 0, y: 5, scale: 0.8, pointerEvents: "none" },
              groupHover: {
                opacity: 0,
                y: 5,
                scale: 0.8,
                pointerEvents: "none",
              },
              hover: { opacity: 1, y: 0, scale: 1, pointerEvents: "auto" },
            }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute bottom-full left-1/2 mb-3 -translate-x-1/2 whitespace-nowrap rounded-md bg-zinc-900 px-2.5 py-1 text-[10px] font-semibold tracking-wide text-white shadow-xl"
          >
            {avatar.name}
            <div className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-zinc-900" />
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: premiumEase },
  },
};

// Rotating Quotes Array
const brandQuotes = [
  <>
    "Innovation distinguishes between a{" "}
    <span className="font-semibold text-white">leader</span> and a{" "}
    <span className="text-zinc-500">follower</span>."
  </>,
  <>
    "Design is not just how it looks, it is{" "}
    <span className="font-semibold text-white">how it works</span>."
  </>,
  <>
    "Make it <span className="font-semibold text-white">simple</span>, but make
    it <span className="text-zinc-500">significant</span>."
  </>,
];

export default function AboutHeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [quoteIndex, setQuoteIndex] = useState(0);

  // Quote rotation logic
  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % brandQuotes.length);
    }, 4000); // Change quote every 4 seconds
    return () => clearInterval(interval);
  }, []);

  // Simplified GSAP reveal animation (no parallax)
  useGSAP(
    () => {
      const tl = gsap.timeline({ delay: 0.3 });

      // Reveal the boxes from bottom to top with a wipe
      tl.fromTo(
        ".bento-box",
        { clipPath: "inset(100% 0% 0% 0%)", y: 40 },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          y: 0,
          duration: 1.5,
          stagger: 0.15,
          ease: "power4.inOut",
        },
      )
        // Subtle scale down during reveal
        .fromTo(
          ".bento-img",
          { scale: 1.4 },
          { scale: 1, duration: 1.5, stagger: 0.15, ease: "power4.inOut" },
          "<",
        );
    },
    { scope: containerRef },
  );

  return (
    <main className="relative flex min-h-screen w-full flex-col overflow-hidden bg-[#FAFAFA] font-sans text-zinc-900">
      <Header />

      <section className="relative z-10 flex w-full flex-1 items-center justify-center px-6 pb-12 pt-32 lg:px-10 lg:pb-16 lg:pt-28 lg:mt-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mx-auto grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-10"
        >
          {/* Left Column: Typography & Content */}
          <div className="flex flex-col items-start justify-center lg:col-span-5">
            <motion.div
              variants={itemVariants}
              className="mb-5 inline-flex w-fit items-center justify-center rounded-xl border border-black/10 bg-white px-3 py-1"
            >
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-600">
                About Us
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-4xl font-bold leading-[1.05] tracking-tight text-zinc-900 md:text-6xl lg:text-[4rem]"
            >
              Journey towards
              <br />
              <span className="bg-gradient-to-r from-[#2E5BFF] to-[#07D6F3] bg-clip-text text-transparent">
                digital excellence.
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="mt-6 max-w-lg text-base font-medium leading-[1.6em] text-zinc-500 lg:mt-8 lg:text-lg"
            >
              Softexedge is a premier digital marketing agency committed to
              driving growth, innovation, and impactful brand strategies—trusted
              for measurable results and creative excellence.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="mt-10 flex flex-col items-start gap-4 border-t border-zinc-200 pt-6 sm:flex-row sm:items-center sm:gap-5 lg:mt-12"
            >
              <AvatarGroup />
              <div className="flex flex-col">
                <span className="text-sm font-bold text-zinc-900">
                  Trusted globally
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
                  By industry leaders
                </span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Visual Bento Grid (Height Reduced) */}
          <div
            ref={containerRef}
            className="grid h-[380px] w-full grid-cols-2 gap-4 lg:col-span-7 lg:h-[460px]"
          >
            {/* Left Tall Image */}
            <div className="bento-box relative col-span-1 h-full w-full overflow-hidden rounded-[1.5rem] lg:rounded-[2rem] bg-zinc-200">
              <div className="absolute inset-0 z-10 bg-black/10 transition-colors duration-500 hover:bg-transparent" />
              <img
                src="/assets/microsoft-copilot-pqMPnPo4_ZA-unsplash.jpg"
                alt="Creative marketing workspace"
                className="bento-img h-full w-full object-cover"
              />
            </div>

            {/* Right Stacked Column */}
            <div className="col-span-1 flex h-full flex-col gap-4">
              {/* Top Accent Box with Rotating Text */}
              <div className="bento-box relative flex h-[45%] w-full flex-col justify-between overflow-hidden rounded-[1.5rem] bg-zinc-900 p-5 text-white shadow-xl lg:rounded-[2rem] lg:p-6">
                <div className="absolute inset-0 z-0 bg-[url('/noise.png')] opacity-[0.04] mix-blend-overlay" />
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="relative z-10 text-[#07D6F3]"
                >
                  <path
                    d="M12 2L2 7L12 12L22 7L12 2Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2 17L12 22L22 17"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2 12L12 17L22 12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                {/* Crossfading Quote Container */}
                <div className="relative z-10 min-h-[4.5rem]">
                  <AnimatePresence mode="wait">
                    <motion.h3
                      key={quoteIndex}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className="text-base font-light leading-snug tracking-tight lg:text-xl"
                    >
                      {brandQuotes[quoteIndex]}
                    </motion.h3>
                  </AnimatePresence>
                </div>
              </div>

              {/* Bottom Square Image */}
              <div className="bento-box relative h-[55%] w-full overflow-hidden rounded-[1.5rem] lg:rounded-[2rem] bg-zinc-200">
                <div className="absolute inset-0 z-10 bg-black/10 transition-colors duration-500 hover:bg-transparent" />
                <img
                  src="/assets/alex-kotliarskyi-QBpZGqEMsKg-unsplash.jpg"
                  alt="Team analyzing digital marketing data"
                  className="bento-img h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
