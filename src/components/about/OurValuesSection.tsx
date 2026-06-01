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
      {/* Background Image Container with Deep Top Gradient */}
      <div className="absolute top-0 left-0 h-[85%] w-full">
        <img
          src="/assets/xiang-chi-WwCKehYfMCA-unsplash.jpg"
          alt="Our Team"
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
          className="text-4xl md:text-5xl lg:text-[4.5rem] font-medium leading-tight tracking-tight text-white max-w-4xl"
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
          {valuesData.map((value) => (
            <motion.div
              key={value.id}
              variants={cardVariants}
              className="flex flex-col justify-between h-full min-h-[460px] lg:min-h-[350px] rounded-[24px] border border-zinc-200 bg-white p-8 lg:p-10 shadow-2xl transition-all duration-500 hover:bg-zinc-50 hover:border-zinc-300"
            >
              {/* Top content group */}
              <div>
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h3 className="text-2xl md:text-3xl font-semibold tracking-tight text-zinc-900">
                    {value.title}
                  </h3>
                  {/* Tag */}
                  <span className="shrink-0 rounded-full bg-gradient-to-r from-[#2E5BFF] to-[#149CCB] px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white shadow-sm">
                    {value.tag}
                  </span>
                </div>
                <p className="text-sm md:text-base font-medium text-zinc-500 mb-8">
                  {value.subtitle}
                </p>
              </div>

              {/* Bottom content group (List Items pushed down for an elegant long card look) */}
              <ul className="flex flex-col gap-5 mt-auto pt-6 border-t border-zinc-100">
                {value.points.map((point, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#149CCB]" />
                    <span className="text-sm md:text-base leading-relaxed text-zinc-700">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
