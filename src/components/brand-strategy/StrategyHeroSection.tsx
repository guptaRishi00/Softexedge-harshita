"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Header from "../page/Header";
import ImageTrail from "../ui/ImageTrail";
import AgencyStats from "./AgencyStats";

const ROTATING_IMAGES = [
  "https://images.unsplash.com/photo-1778648185777-a16f70110e29?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDR8Q0R3dXdYSkFiRXd8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1761998066466-86bd7a1c00ba?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDg1fENEd3V3WEpBYkV3fHxlbnwwfHx8fHw%3D",
  "https://images.unsplash.com/photo-1778452419724-1f605dc17c46?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDE5fENEd3V3WEpBYkV3fHxlbnwwfHx8fHw%3D",
  "https://images.unsplash.com/photo-1769921824660-648d69d2642a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDEzNnxDRHd1d1hKQWJFd3x8ZW58MHx8fHx8",
  "https://images.unsplash.com/photo-1776602191233-154cbc983f0c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDcyfENEd3V3WEpBYkV3fHxlbnwwfHx8fHw%3D",
];

export default function StrategyHeroSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    // CHANGED: Reduced delay from 1500ms to 600ms so it splits much sooner
    const expandTimer = setTimeout(() => {
      setIsExpanded(true);
    }, 600);

    const interval = setInterval(() => {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % ROTATING_IMAGES.length,
      );
    }, 2500);

    return () => {
      clearTimeout(expandTimer);
      clearInterval(interval);
    };
  }, []);

  return (
    <section className="relative flex min-h-screen w-full flex-col items-center overflow-hidden bg-white px-6 pt-10 text-zinc-900">
      <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center opacity-60">
        <div className="h-[600px] w-[600px] rounded-full bg-zinc-100 blur-[120px]"></div>
      </div>

      <div className="absolute left-0 top-0 z-50 w-full">
        <Header />
      </div>

      <div className="relative z-10 mt-20 flex max-w-7xl flex-col items-center text-center md:mt-28">
        <div className="mb-8 inline-flex items-center text-md font-semibold uppercase tracking-widest bg-gradient-to-r from-[#2E5BFF] to-[#149CCB] bg-clip-text text-transparent">
          How we do it
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          // CHANGED: Sped up the initial entry duration from 0.8 to 0.6
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6 text-5xl font-bold leading-[1em] tracking-tight py-10 text-black sm:text-6xl md:text-[95px] lg:text-[118px] xl:text-[150px]"
        >
          <span className="whitespace-nowrap inline-flex items-center justify-center">
            <span>We Build</span>

            <span
              // CHANGED: Reduced duration-[1200ms] to duration-[800ms] for a faster split
              className={`relative inline-block h-[0.76em] overflow-hidden rounded-2xl align-middle shadow-sm shrink-0 transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isExpanded
                  ? "w-[1.5em] mx-3 opacity-100 md:mx-5"
                  : "w-0 mx-1.5 opacity-0 md:mx-2.5"
              }`}
            >
              {ROTATING_IMAGES.map((img, index) => (
                <img
                  key={img}
                  src={img}
                  alt="Brand visual"
                  className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 mesh-smooth ease-in-out ${
                    index === currentImageIndex
                      ? "translate-x-0 opacity-100 blur-0"
                      : "-translate-x-4 opacity-0 blur-sm"
                  }`}
                />
              ))}
            </span>

            <span>Brands</span>
          </span>
          <br />
          {/* LINE 2 */}
          That People Trust
        </motion.h1>
      </div>

      <div className="w-full">
        <AgencyStats />
      </div>
    </section>
  );
}
