"use client";

import React, { useState, useEffect } from "react";
import Header from "../page/Header";
import PixelTrail from "../ui/PixelTrail";

// All words below are exactly 5 letters long
const ROTATING_WORDS = ["trust", "crave", "share", "adore", "value"];

export default function StrategyHeroSection() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex(
        (prevIndex) => (prevIndex + 1) % ROTATING_WORDS.length,
      );
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative flex h-screen w-full flex-col items-center overflow-hidden bg-white px-6 py-26 text-zinc-900">
      <div className="absolute inset-0 z-0 opacity-40">
        <PixelTrail
          gridSize={50}
          trailSize={0.12}
          maxAge={300}
          color="#2E5BFF"
          className="w-full h-full"
        />
      </div>

      {/* Subtle Background Glow for Light Mode */}
      <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center opacity-60">
        <div className="h-[600px] w-[600px] rounded-full bg-zinc-100 blur-[120px]"></div>
      </div>

      {/* Header positioned at the top */}
      <div className="absolute top-0 left-0 z-50 w-full">
        <Header />
      </div>

      {/* Main Content (Center Aligned) */}
      <div className="relative z-10 mt-20 flex max-w-6xl flex-col items-center text-center md:mt-28">
        {/* Top Pill Badge */}
        <div className="mb-8 inline-flex items-center text-xs font-semibold uppercase tracking-widest text-zinc-600 backdrop-blur-md">
          How we do it
        </div>

        {/* Headline */}
        <h1 className="mb-6 text-6xl font-bold leading-[0.9em] tracking-tight text-black md:text-[120px]">
          We build brands that <br className="hidden md:block" /> people{" "}
          {/* Added 'text-left' here to align all cascading words uniformly */}
          <span className="relative inline-grid grid-cols-1 grid-rows-1 text-left">
            {ROTATING_WORDS.map((word, index) => (
              <span
                key={word}
                className={`col-start-1 row-start-1 bg-gradient-to-r from-[#2E5BFF] to-[#149CCB] bg-clip-text text-transparent transition-all duration-700 ease-in-out ${
                  index === currentWordIndex
                    ? "translate-y-0 opacity-100 blur-0"
                    : "translate-y-4 opacity-0 blur-sm"
                }`}
              >
                {word}
              </span>
            ))}
          </span>
        </h1>

        <p className="mt-4 max-w-3xl text-lg leading-[1.2em] font-medium lg:mt-10 text-zinc-500 md:text-xl">
          A brand is more than just a logo and a color palette. It&apos;s the
          emotional connection you have with your audience. We help you define,
          design, and deliver that connection.
        </p>
      </div>
    </section>
  );
}
