"use client";

import { motion } from "framer-motion";
import React from "react";

const premiumEase = [0.22, 1, 0.36, 1] as const;

// Combined your strategy services with the flow from the video
const capabilities = [
  {
    id: "01",
    title: "Market & Competitor Analysis",
    description: (
      <>
        Deep-dive research into industry landscapes to identify white space and
        competitive advantages. We build every project on{" "}
        <span className="font-semibold text-zinc-900">solid foundations</span>{" "}
        before moving forward.
      </>
    ),
  },
  {
    id: "02",
    title: "Brand Positioning",
    description: (
      <>
        Defining the unique space your brand occupies in the minds of your
        target audience. We transform raw data into a{" "}
        <span className="font-semibold text-zinc-900">
          strategic visual experience
        </span>{" "}
        that represents your core values.
      </>
    ),
  },
  {
    id: "03",
    title: "Audience Personas",
    description: (
      <>
        Detailed psychographic and demographic profiling to ensure your
        messaging hits the mark. We develop{" "}
        <span className="font-semibold text-zinc-900">
          fast, stable, and secure
        </span>{" "}
        communication strategies.
      </>
    ),
  },
  {
    id: "04",
    title: "Visual Identity Systems",
    description: (
      <>
        Comprehensive design languages including typography, color palettes, and
        core brand marks. Everything from logos to digital applications is
        crafted to be{" "}
        <span className="font-semibold text-zinc-900">highly memorable</span>.
      </>
    ),
  },
  {
    id: "05",
    title: "Go-to-Market Strategy",
    description: (
      <>
        Actionable roadmaps for launching your new brand, product, or campaign
        to the world. Handing over the strategy is not the end; we provide{" "}
        <span className="font-semibold text-zinc-900">
          long-term strategic support
        </span>
        .
      </>
    ),
  },
];

export default function CapabilitiesSection() {
  return (
    // Note: No overflow-hidden here, so the sticky position works perfectly
    <section className="relative bg-[#FAFAFA] py-24 md:py-32 px-6 md:px-12 lg:px-20 text-zinc-900">
      <div className="max-w-[1500px] mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24 relative items-start">
        {/* LEFT COLUMN: Sticky Headline & Progress Indicator */}
        <div className="w-full lg:w-[40%] lg:sticky lg:top-[20vh] flex flex-col gap-8">
          {/* Progress Indicator (01 --- 02 --- 03 style from video) */}
          <div className="flex items-center w-full max-w-xs mb-2">
            {capabilities.slice(0, 4).map((cap, i) => (
              <div
                key={cap.id}
                className="flex items-center flex-1 last:flex-none"
              >
                <span className="text-xs font-semibold text-zinc-400">
                  {cap.id}
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
            From idea <br /> to successful <br />
            <span className="bg-gradient-to-r from-[#3445E7] via-[#2F85EA] to-[#07D6F3] bg-clip-text text-transparent">
              product
            </span>
          </motion.h2>
        </div>

        {/* RIGHT COLUMN: Scrolling List */}
        <div className="w-full lg:w-[60%] flex flex-col">
          {capabilities.map((cap, index) => (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1, ease: premiumEase }}
              key={cap.id}
              className="flex flex-col md:flex-row gap-6 md:gap-10 py-12 md:py-16 border-t border-zinc-200 first:border-t-0 lg:first:border-t"
            >
              {/* Number - Gradient Colored */}
              <div className="text-3xl md:text-4xl font-semibold bg-gradient-to-r from-[#3445E7] via-[#2F85EA] to-[#07D6F3] bg-clip-text text-transparent shrink-0 md:mt-1">
                {cap.id}
              </div>

              {/* Content Box */}
              <div className="flex flex-col gap-5">
                <h3 className="text-3xl md:text-4xl font-semibold text-zinc-900 tracking-tight">
                  {cap.title}
                </h3>
                <p className="text-lg md:text-xl text-zinc-500 leading-[-2.8em] font-light max-w-2xl">
                  {cap.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
