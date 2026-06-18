// src/components/career/CareerHeroSection.tsx
"use client";

import { motion } from "framer-motion";
import { MdArrowOutward } from "react-icons/md";
import Header from "../page/Header";

const premiumEase = [0.16, 1, 0.3, 1] as const;

export default function CareerHeroSection() {
  return (
    <section className="relative flex w-full flex-col overflow-hidden bg-white pt-24 pb-20 text-zinc-900 font-sans selection:bg-[#2E5BFF]/20">
      {/* HEADER */}
      <div className="absolute left-0 top-0 z-50 w-full">
        <Header />
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 flex w-full flex-col items-center px-6 md:px-12 pt-16 md:pt-24">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: premiumEase }}
          className="text-center"
        >
          <h1 className="text-[2.75rem] font-bold leading-[1.1] tracking-tight text-[#0A093D] sm:text-6xl md:text-7xl lg:text-[5.5rem] mb-2">
            Think. Create. Do.
          </h1>
          <h2 className="text-[2.75rem] font-bold leading-[1.1] tracking-tight bg-linear-to-r from-[#2E5BFF] to-[#149CCB] bg-clip-text text-transparent sm:text-6xl md:text-7xl lg:text-[5.5rem] mb-6">
            Grow With Us
          </h2>
        </motion.div>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: premiumEase }}
          className="text-center text-zinc-800 text-base md:text-lg max-w-xl mx-auto leading-relaxed mb-16"
        >
          We’re creating impactful digital solutions.
          <br />
          Join us on the journey.
        </motion.p>
        {/* Image Collage / Grid (3-column layout) */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.25, ease: premiumEase }}
          className="w-full flex flex-row items-start justify-center gap-4 md:gap-3 max-w-[1240px] mx-auto"
        >
          {/* Column 1 (Left) */}
          <div className="w-[34%] flex flex-col items-end gap-4 md:gap-3">
            {/* Image 1 (Top Left) - Portrait */}
            <div className="w-[80%] overflow-hidden rounded-2xl md:rounded-[2rem] shadow-xs hover:shadow-md transition-shadow duration-300">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop"
                alt="Creative agency team collaborating around table"
                className="w-full aspect-[3/4.2] object-cover hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>
            {/* Image 2 (Bottom Left) - Landscape */}
            <div className="w-full overflow-hidden rounded-2xl md:rounded-[2rem] shadow-xs hover:shadow-md transition-shadow duration-300">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop"
                alt="Two female colleagues working together on tablet"
                className="w-full aspect-[1.5/1] object-cover hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>
          </div>

          {/* Column 2 (Middle) */}
          <div className="w-[28%] flex flex-col gap-4 md:gap-3 pt-12 md:pt-20">
            {/* Image 3 (Middle Top) - Square */}
            <div className="w-full overflow-hidden rounded-2xl md:rounded-[2rem] shadow-xs hover:shadow-md transition-shadow duration-300">
              <img
                src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800&auto=format&fit=crop"
                alt="Team working closely on a laptop screen"
                className="w-full aspect-[1/1] object-cover hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>
            {/* Image 4 (Middle Bottom) - Portrait */}
            <div className="w-full overflow-hidden rounded-2xl md:rounded-[2rem] shadow-xs hover:shadow-md transition-shadow duration-300">
              <img
                src="https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=800&auto=format&fit=crop"
                alt="Diverse team celebrating success"
                className="w-full aspect-[3/4.2] object-cover hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>
          </div>

          {/* Column 3 (Right) */}
          <div className="w-[34%] flex flex-col items-start gap-4 md:gap-3 pt-24 md:pt-40">
            {/* Image 5 (Top Right) - Portrait */}
            <div className="w-[80%] overflow-hidden rounded-2xl md:rounded-[2rem] shadow-xs hover:shadow-md transition-shadow duration-300">
              <img
                src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=800&auto=format&fit=crop"
                alt="Female designer presenting whiteboard idea"
                className="w-full aspect-[3/4.2] object-cover hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>
            {/* Image 6 (Bottom Right) - Landscape */}
            <div className="w-full overflow-hidden rounded-2xl md:rounded-[2rem] shadow-xs hover:shadow-md transition-shadow duration-300">
              <img
                src="https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=800&auto=format&fit=crop"
                alt="Diverse creative team posing together"
                className="w-full aspect-[1.5/1] object-cover hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: premiumEase }}
          className="mt-16 md:mt-24"
        >
          <a
            href="mailto:careers@softexedge.com?subject=Application for Career"
            className="group flex h-16 w-fit cursor-pointer items-center justify-between gap-5 rounded-xl border border-transparent bg-white pl-0 pr-2.5 transition-all duration-300 hover:border-black hover:pl-6 hover:pr-3.5"
          >
            <span className="text-lg font-bold tracking-tight text-black transition-colors duration-300">
              Search Open Jobs
            </span>

            <div className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl bg-black text-white">
              <svg width="0" height="0" className="absolute">
                <title>Connect arrow gradient</title>
                <defs>
                  <linearGradient
                    id="career-icon-grad"
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
                style={{ fill: "url(#career-icon-grad)" }}
              />
            </div>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
