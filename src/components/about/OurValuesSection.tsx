"use client";

import React from "react";
import { motion } from "framer-motion";
import { Zap, Shield, Handshake } from "lucide-react";

const premiumEase = [0.22, 1, 0.36, 1] as const;

const valuesData = [
  {
    id: "v1",
    number: "01",
    icon: Zap,
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
    number: "02",
    icon: Shield,
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
    number: "03",
    icon: Handshake,
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
      </div>

      {/* Top Header Section */}
      <div className="relative z-10 flex flex-col items-center pt-24 px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: premiumEase }}
          className="text-4xl md:text-5xl lg:text-[6.5rem] font-bold leading-[0.9em] tracking-tighter text-white max-w-6xl"
        >
          3 Core values driving <br />
          <span className="bg-linear-to-r from-[#2E5BFF] to-[#149CCB] bg-clip-text text-transparent">
            our digital excellence
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
          {valuesData.map((value) => {
            const Icon = value.icon;

            return (
              <motion.div
                key={value.id}
                variants={cardVariants}
                className="group relative flex h-full min-h-[460px] flex-col overflow-hidden rounded-[24px] border border-white/10 bg-zinc-950/80 p-8 shadow-2xl backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-white/20 hover:bg-zinc-900/90 lg:min-h-[480px] lg:p-10"
              >
                {/* Large Background Number for depth */}

                {/* Subtle hover glow effect in the corner */}
                <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-gradient-to-br from-[#2E5BFF]/20 to-[#149CCB]/20 blur-3xl transition-all duration-700 group-hover:scale-150 group-hover:opacity-80 opacity-40 z-0" />

                <div className="relative z-10 flex flex-col h-full">
                  {/* Top content group */}
                  <div>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-white shadow-inner transition-transform duration-500 group-hover:scale-110 group-hover:bg-white/10">
                        <Icon className="h-6 w-6" strokeWidth={1.5} />
                      </div>
                      <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-zinc-300 backdrop-blur-md">
                        {value.tag}
                      </span>
                    </div>

                    <h3 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">
                      {value.title}
                    </h3>
                    <p className="mt-3 text-sm font-medium leading-relaxed text-zinc-400 md:text-base">
                      {value.subtitle}
                    </p>
                  </div>

                  {/* Bottom content group (Upgraded List) */}
                  <div className="mt-auto pt-8">
                    <ul className="flex flex-col gap-3">
                      {value.points.map((point, i) => (
                        <li
                          key={i}
                          className="group/item flex items-center gap-4 rounded-xl border border-white/5 bg-white/[0.02] p-3.5 transition-all duration-300 hover:bg-white/[0.06] hover:border-white/10 hover:translate-x-1"
                        >
                          {/* Custom Gradient Dash/Bullet */}
                          <div className="relative flex h-5 w-5 shrink-0 items-center justify-center">
                            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#2E5BFF] to-[#149CCB] opacity-50 blur-[4px] transition-opacity duration-300 group-hover/item:opacity-100" />
                            <div className="relative h-2 w-2 rounded-full bg-gradient-to-r from-[#2E5BFF] to-[#149CCB]" />
                          </div>

                          <span className="text-sm font-medium leading-relaxed text-zinc-300 md:text-sm transition-colors duration-300 group-hover/item:text-white">
                            {point}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
