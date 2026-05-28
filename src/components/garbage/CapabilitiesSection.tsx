"use client";

import { motion } from "framer-motion";
import React from "react";

const premiumEase = [0.22, 1, 0.36, 1] as const;

// Updated content for a standard "Process" flow
const processSteps = [
  {
    id: "01",
    title: "Discovery & Research",
    description: (
      <>
        We start by diving deep into your business, understanding your goals,
        target audience, and market landscape. This establishes a{" "}
        <span className="font-semibold text-zinc-900">solid foundation</span>{" "}
        for the entire project before a single pixel is drawn.
      </>
    ),
  },
  {
    id: "02",
    title: "Strategy & Planning",
    description: (
      <>
        With insights in hand, we craft a comprehensive roadmap. We define the
        brand positioning, user journeys, and technical architecture to ensure a{" "}
        <span className="font-semibold text-zinc-900">
          clear, strategic path forward
        </span>{" "}
        that aligns with your business objectives.
      </>
    ),
  },
  {
    id: "03",
    title: "Design & Prototyping",
    description: (
      <>
        Our design team transforms strategy into intuitive, engaging visual
        experiences. We focus on aesthetics and usability, iterating through
        wireframes and prototypes to create interfaces that are{" "}
        <span className="font-semibold text-zinc-900">
          beautiful and highly functional
        </span>
        .
      </>
    ),
  },
  {
    id: "04",
    title: "Development & Testing",
    description: (
      <>
        We bring the designs to life using modern, scalable technologies.
        Rigorous QA, performance optimization, and testing ensure the final
        product is{" "}
        <span className="font-semibold text-zinc-900">
          fast, secure, and flawless
        </span>{" "}
        across all devices and platforms.
      </>
    ),
  },
  {
    id: "05",
    title: "Launch & Optimization",
    description: (
      <>
        We ensure a smooth deployment to the market. But handing over the keys
        isn't the end; we monitor performance, gather user data, and provide{" "}
        <span className="font-semibold text-zinc-900">
          long-term strategic support
        </span>{" "}
        to continuously scale your product.
      </>
    ),
  },
];

export default function ProcessSection() {
  return (
    <section className="relative bg-[#FAFAFA] py-24 md:py-32 px-6 md:px-12 lg:px-20 text-zinc-900">
      <div className="max-w-[1500px] mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24 relative items-start">
        {/* LEFT COLUMN: Sticky Headline & Progress Indicator */}
        <div className="w-full lg:w-[40%] lg:sticky lg:top-[20vh] flex flex-col gap-8">
          {/* Progress Indicator (01 --- 02 --- 03 style) */}
          <div className="flex items-center w-full max-w-xs mb-2">
            {processSteps.slice(0, 4).map((step, i) => (
              <div
                key={step.id}
                className="flex items-center flex-1 last:flex-none"
              >
                <span className="text-xs font-semibold text-zinc-400">
                  {step.id}
                </span>
                {i < 3 && (
                  <div className="h-[2px] bg-zinc-200 w-full mx-3 relative">
                    {/* Optional: Add a gradient line overlay here if you want active state tracking later */}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Massive Sticky Title */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: premiumEase }}
            className="text-5xl md:text-6xl lg:text-6xl font-bold leading-[1.05] tracking-tight uppercase"
          >
            How we build <br /> successful <br />
            <span className="bg-gradient-to-r from-[#3445E7] via-[#2F85EA] to-[#07D6F3] bg-clip-text text-transparent">
              products
            </span>
          </motion.h2>
        </div>

        {/* RIGHT COLUMN: Scrolling List */}
        <div className="w-full lg:w-[60%] flex flex-col">
          {processSteps.map((step, index) => (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1, ease: premiumEase }}
              key={step.id}
              className="flex flex-col md:flex-row gap-6 md:gap-10 py-12 md:py-16 border-t border-zinc-200 first:border-t-0 lg:first:border-t"
            >
              {/* Number - Gradient Colored */}
              <div className="text-3xl md:text-4xl font-semibold bg-gradient-to-r from-[#3445E7] via-[#2F85EA] to-[#07D6F3] bg-clip-text text-transparent shrink-0 md:mt-1">
                {step.id}
              </div>

              {/* Content Box */}
              <div className="flex flex-col gap-5">
                <h3 className="text-3xl md:text-4xl font-semibold text-zinc-900 tracking-tight">
                  {step.title}
                </h3>
                <p className="text-lg md:text-xl text-zinc-500 leading-[1.6em] font-light max-w-2xl">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
