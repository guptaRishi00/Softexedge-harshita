"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const premiumEase = [0.22, 1, 0.36, 1] as const;

const valuesData = [
  {
    id: "v1",
    title: "Relentless Innovation",
    subtitle: "Pushing digital boundaries",
    tag: "Focus",
    points: [
      "Forward-thinking brand strategies",
      "Bleeding-edge technology adoption",
      "Continuous digital evolution",
    ],
  },
  {
    id: "v2",
    title: "Uncompromising Quality",
    subtitle: "Obsessive attention to detail",
    tag: "Standard",
    points: [
      "Pixel-perfect UI/UX design",
      "Robust, scalable engineering",
      "Rigorous performance testing",
    ],
  },
  {
    id: "v3",
    title: "Strategic Partnership",
    subtitle: "Your success is our success",
    tag: "Commitment",
    points: [
      "Transparent, open communication",
      "Aligned business objectives",
      "Long-term growth support",
    ],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: premiumEase },
  },
};

export default function OurValuesSection() {
  return (
    <section className="relative flex min-h-[900px] w-full flex-col bg-black overflow-hidden font-sans">
      {/* Background Video Container with Deep Top Gradient */}
      <div className="absolute top-0 left-0 h-[85%] w-full">
        <video
          src="/assets/video2.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover"
        />
        {/* Enhanced cinematic gradient blending from pure black at the top to deep dark tones */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/20 to-black" />
      </div>

      {/* Top Header Section */}
      <div className="relative z-10 flex flex-col items-center pt-24 px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: premiumEase }}
          className="text-4xl md:text-5xl lg:text-[4.5rem] font-bold leading-tight tracking-tight text-white max-w-4xl"
        >
          3 Core Values Driving <br />
          <span className="bg-gradient-to-r from-[#2E5BFF] to-[#149CCB] bg-clip-text text-transparent">
            Our Digital Excellence
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease: premiumEase }}
          className="mt-6 text-base md:text-lg font-medium text-zinc-300 max-w-2xl"
        >
          Guiding our decisions, shaping our products, and fueling your success
          across every project we undertake.
        </motion.p>
      </div>

      {/* Cards Section */}
      <div className="relative z-20 mx-auto w-full max-w-[1400px] px-6 pb-32 mt-16 md:mt-20 lg:mt-24">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch"
        >
          {valuesData.map((value, index) => (
            <motion.div
              key={value.id}
              variants={cardVariants}
              className="group relative flex h-full min-h-[460px] flex-col overflow-hidden rounded-[24px] border border-white/10 bg-zinc-950/50 p-8 shadow-2xl backdrop-blur-md transition-all duration-500 hover:-translate-y-2 hover:border-white/20 hover:bg-zinc-900/60 lg:min-h-[440px] lg:p-10"
            >
              {/* Subtle hover glow effect in the corner */}
              <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-gradient-to-br from-[#2E5BFF]/20 to-[#149CCB]/20 blur-3xl transition-all duration-700 group-hover:scale-150 group-hover:opacity-80 opacity-40" />

              <div className="relative z-10 flex flex-col h-full">
                {/* Top content group */}
                <div>
                  <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-zinc-300 backdrop-blur-md">
                    {value.tag}
                  </span>
                  <h3 className="mt-6 text-2xl font-semibold tracking-tight text-white md:text-3xl">
                    {value.title}
                  </h3>
                  <p className="mt-3 text-sm font-medium leading-relaxed text-zinc-400 md:text-base">
                    {value.subtitle}
                  </p>
                </div>

                {/* Bottom content group */}
                <div className="mt-auto pt-8">
                  <div className="mb-6 h-[1px] w-full bg-gradient-to-r from-white/10 via-white/5 to-transparent" />
                  <ul className="flex flex-col gap-4">
                    {value.points.map((point, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-white transition-transform duration-300 group-hover:scale-110" />
                        <span className="text-sm leading-relaxed text-zinc-300 md:text-base">
                          {point}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
