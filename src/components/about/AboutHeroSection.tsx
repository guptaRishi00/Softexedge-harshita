"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "../page/Header";

const premiumEase = [0.22, 1, 0.36, 1] as const;

function RotatingWord({
  words,
  activeIndex,
}: {
  words: string[];
  activeIndex: number;
}) {
  const index = activeIndex % words.length;
  // Calculate longest word to keep container width completely fixed
  const longestWord = words.reduce((a, b) => (a.length > b.length ? a : b));

  return (
    // 1. Outer wrapper keeps default overflow. This ensures it shares the EXACT
    // same typographic baseline as the text around it.
    <span className="relative inline-block">
      {/* 2. Invisible spacer dictates the exact width, height, and natural baseline */}
      <span className="invisible pointer-events-none whitespace-nowrap">
        {longestWord}
      </span>

      {/* 3. Absolute mask container traps the animating words without affecting the baseline */}
      <span className="absolute inset-0 overflow-hidden">
        <AnimatePresence>
          <motion.span
            key={index}
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.5, ease: premiumEase }}
            className="absolute left-0 top-0 w-full h-full whitespace-nowrap bg-gradient-to-r from-[#3445E7] via-[#2F85EA] to-[#07D6F3] bg-clip-text text-transparent"
          >
            {words[index]}
          </motion.span>
        </AnimatePresence>
      </span>
    </span>
  );
}

export default function AboutHeroSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => prev + 1);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Global Header */}
      <Header />

      {/* Hero Section */}
      <section className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-white py-24 font-sans text-black">
        <div className="pointer-events-none absolute inset-0 z-0 hidden md:block">
          {/* Top Right */}
          <motion.img
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=600&auto=format&fit=crop"
            alt="Team collaborating"
            className="absolute right-0 top-0 h-48 w-72 object-cover lg:h-64 lg:w-96"
          />

          {/* Middle Left */}
          <motion.img
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            src="https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?q=80&w=600&auto=format&fit=crop"
            alt="Casual office discussion"
            className="absolute left-0 top-[25%] -translate-y-10 h-64 w-40 object-cover lg:h-50 lg:w-48"
          />

          {/* Middle Right */}
          <motion.img
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            src="https://plus.unsplash.com/premium_photo-1668383209648-029c09c32811?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Q293b3JraW5nJTIwc3BhY2V8ZW58MHx8MHx8fDA%3D"
            alt="Coworking space"
            className="absolute right-0 top-[45%] h-56 w-48 object-cover lg:h-72 lg:w-64"
          />

          {/* Bottom Left */}
          <motion.img
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=600&auto=format&fit=crop"
            alt="Presentation"
            className="absolute bottom-0 -translate-x-30 left-0 h-56 w-72 object-cover lg:h-72 lg:w-96"
          />

          {/* Bottom Center (Collage/Polaroids) */}
          <motion.img
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            src="https://images.unsplash.com/photo-1601362840469-51e4d8d58785?q=80&w=800&auto=format&fit=crop"
            alt="Team polaroids"
            className="absolute bottom-0 left-1/2 h-40 w-64 translate-y-20 -translate-x-1/2 object-cover lg:h-56 lg:w-80"
          />
        </div>

        {/* CENTER TEXT CONTENT */}
        <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-6 text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 block text-lg font-medium text-gray-800 md:text-xl"
          >
            About Us
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="inline-block text-4xl font-medium leading-[1.05] tracking-tight text-black md:text-6xl lg:text-[4rem]"
          >
            We're a team of thinkers, makers, movers, shakers, and{" "}
            <RotatingWord
              words={["artists", "crafter", "builder", "shapers"]}
              activeIndex={activeIndex}
            />
          </motion.h1>
        </div>
      </section>
    </>
  );
}
