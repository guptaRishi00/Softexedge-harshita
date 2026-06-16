"use client";
import React from "react";
import { motion } from "framer-motion";
import { Rocket, Gem, HeartHandshake } from "lucide-react";

const premiumEase = [0.22, 1, 0.36, 1] as const;

const valuesData = [
  {
    id: "v1",
    icon: Rocket,
    title: "Relentless Innovation",
    subtitle: "Pushing digital boundaries",
    tag: "Focus",
    description:
      "We constantly push the boundaries of what is digitally possible by adopting bleeding-edge technologies and crafting forward-thinking brand strategies. Our commitment to continuous digital evolution ensures your business always remains steps ahead of the competition.",
  },
  {
    id: "v2",
    icon: Gem,
    title: "Uncompromising Quality",
    subtitle: "Obsessive attention to detail",
    tag: "Standard",
    description:
      "Our obsessive attention to detail drives us to deliver pixel-perfect UI/UX design alongside robust, scalable engineering. Every project is subjected to rigorous performance testing to guarantee a flawless, high-performing user experience from day one.",
  },
  {
    id: "v3",
    icon: HeartHandshake,
    title: "Strategic Partnership",
    subtitle: "Your success is our success",
    tag: "Commitment",
    description:
      "We operate as an extension of your team, championing transparent and open communication. By deeply aligning our strategies with your core business objectives, we provide the dedicated, long-term support necessary to fuel your sustainable growth.",
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
    <section className="relative flex min-h-[900px] w-full flex-col overflow-hidden bg-black font-sans">
      {/* Background Video Container with Black Overlay */}
      <div className="absolute left-0 top-0 h-full w-full">
        <video
          src="/assets/video4.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover grayscale"
        />
        <div className="absolute inset-0 bg-black/60 pointer-events-none" />
      </div>

      {/* Top Header Section */}
      <div className="relative z-10 flex flex-col items-center px-6 pt-12 text-center md:pt-20">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: premiumEase }}
          className="mb-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-white/80"
        >
          What We Stand For
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease: premiumEase }}
          className="max-w-6xl text-4xl font-bold leading-[0.9em] tracking-tighter text-white md:text-5xl lg:text-[6.5rem]"
        >
          3 Core values driving <br />
          <span className="bg-gradient-to-r from-[#2E5BFF] to-[#149CCB] bg-clip-text text-transparent pr-1">
            our digital excellence
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: premiumEase }}
          className="mt-6 max-w-2xl text-lg font-light leading-[1.2em] text-white/70 md:text-xl"
        >
          Guiding our decisions, shaping our products, and fueling your success
          across every project we undertake.
        </motion.p>
      </div>

      {/* Cards Section */}
      <div className="relative z-20 mx-auto mt-16 w-full max-w-[1400px] px-6 pb-12 md:mt-20 md:pb-20 lg:mt-24">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 items-stretch gap-4 md:grid-cols-3 md:gap-3"
        >
          {valuesData.map((value) => {
            const Icon = value.icon;

            return (
              <motion.div
                key={value.id}
                variants={cardVariants}
                className="group relative flex h-full min-h-[480px] flex-col overflow-hidden rounded-[24px] border border-white/10 bg-zinc-950/80 p-8 shadow-2xl backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-white/20 hover:bg-zinc-900/90 lg:p-10"
              >
                <div className="relative z-10 flex h-full flex-col justify-between items-center text-center gap-8">
                  {/* Top: Minimal Tag */}
                  <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-widest text-zinc-500">
                    <span className="h-1 w-1 rounded-full bg-[#2E5BFF]" />
                    {value.tag}
                  </div>

                  {/* Middle: Big Centered Icon with Ambient Backlight */}
                  <div className="relative flex items-center justify-center my-4">
                    <div className="absolute h-24 w-24 rounded-full bg-white/5 opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-110 blur-xl transition-all duration-500" />
                    <div className="text-zinc-500 transition-all duration-500 group-hover:text-white group-hover:scale-110">
                      <Icon
                        className="h-16 w-16 md:h-20 md:w-20"
                        strokeWidth={1}
                      />
                    </div>
                  </div>

                  {/* Bottom: Clear Editorial Copy */}
                  <div className="space-y-4 w-full">
                    <div>
                      <h3 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">
                        {value.title}
                      </h3>
                      <p className="mt-1 text-xs font-medium text-zinc-500 tracking-wide uppercase">
                        {value.subtitle}
                      </p>
                    </div>
                    <p className="text-sm font-normal leading-[1.3em] text-zinc-400 transition-colors duration-300 group-hover:text-zinc-300 md:text-base">
                      {value.description}
                    </p>
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
