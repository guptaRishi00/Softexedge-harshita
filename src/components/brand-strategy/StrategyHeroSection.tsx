"use client";

import React, { useState, useEffect } from "react";
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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % ROTATING_IMAGES.length,
      );
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative flex min-h-screen w-full flex-col items-center overflow-hidden bg-white px-6 pt-10 text-zinc-900">
      {/* Subtle Background Glow for Light Mode */}
      <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center opacity-60">
        <div className="h-[600px] w-[600px] rounded-full bg-zinc-100 blur-[120px]"></div>
      </div>

      {/* Header positioned at the top */}
      <div className="absolute left-0 top-0 z-50 w-full">
        <Header />
      </div>

      {/* Main Content (Center Aligned) */}
      <div className="relative z-10 mt-20 flex max-w-7xl flex-col items-center text-center md:mt-28">
        {/* Top Pill Badge */}
        <div className="mb-8 inline-flex items-center text-xs font-semibold uppercase tracking-widest bg-linear-to-r from-[#2E5BFF] to-[#149CCB] bg-clip-text text-transparent">
          How we do it
        </div>

        {/* Headline structured into 2 distinct lines (Size increased across breakpoints) */}
        <h1 className="mb-6 text-5xl font-bold leading-[1.05em] tracking-tight text-black sm:text-6xl md:text-[95px] lg:text-[115px] xl:text-[130px]">
          {/* LINE 1: We Build + Image Carousel + Brands */}
          <span className="whitespace-nowrap inline-flex items-center justify-center gap-2 md:gap-4">
            We Build
            <span className="relative inline-block h-[0.76em] w-[1.5em] overflow-hidden rounded-2xl align-middle shadow-sm shrink-0">
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
            Brands
          </span>
          <br />
          {/* LINE 2 */}
          That People <span className="text-black">Trust & Value</span>
        </h1>

        {/* Description (Increased max-width to max-w-5xl and bumped text sizes) */}
        <p className="mt-4 max-w-5xl text-xl font-medium leading-[1.3em] text-zinc-700 md:text-2xl lg:text-2xl lg:mt-14">
          A brand is more than just a logo and a color palette. It&apos;s the
          emotional connection you have with your audience. We help you define,
          design, and deliver that connection.
        </p>
      </div>

      <div className="w-full">
        <AgencyStats />
      </div>
    </section>
  );
}
