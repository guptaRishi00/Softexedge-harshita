"use client";

import React, { useEffect, useRef } from "react";
import { motion, useInView, animate } from "framer-motion";

const premiumEase = [0.22, 1, 0.36, 1] as const;

// --- Sub-component: Animated Counter ---
function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;

    // Smoothly animate from 0 to the target value
    const controls = animate(0, value, {
      duration: 2.5,
      ease: premiumEase,
      onUpdate: (latest) => {
        if (ref.current) {
          ref.current.textContent = Math.floor(latest).toString() + suffix;
        }
      },
    });

    return () => controls.stop();
  }, [value, isInView, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

// --- Main Component ---
export default function AboutOverview() {
  const numerics = [
    {
      value: 10,
      suffix: "+",
      label: "Years of Excellence",
      desc: "Pushing digital boundaries.",
    },
    {
      value: 250,
      suffix: "+",
      label: "Projects Delivered",
      desc: "Global scale deployments.",
    },
    {
      value: 98,
      suffix: "%",
      label: "Client Retention",
      desc: "Built on trust & results.",
    },
    {
      value: 40,
      suffix: "+",
      label: "Industry Experts",
      desc: "In-house creative engineers.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: premiumEase },
    },
  };

  return (
    <section className="relative w-full overflow-hidden bg-black px-6 py-24 text-white md:px-12 md:py-32 font-sans">
      {/* Subtle Background Noise */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03] mix-blend-overlay"
        style={{ backgroundImage: "url('/noise.png')" }}
      />

      <div className="mx-auto max-w-[1200px]">
        {/* --- TOP SECTION: Centered Header --- */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="flex flex-col items-center text-center mb-20"
        >
          <motion.div
            variants={itemVariants}
            className="mb-6 flex items-center justify-center gap-4"
          >
            <div className="h-[1px] w-8 bg-zinc-700" />
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-zinc-400">
              About The Studio
            </p>
            <div className="h-[1px] w-8 bg-zinc-700" />
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-5xl md:text-7xl lg:text-[5.5rem] font-medium leading-[1.05] tracking-tight"
          >
            We don't follow trends.
            <br />
            <span className="bg-gradient-to-r from-[#2E5BFF] to-[#149CCB] bg-clip-text text-transparent pb-2">
              We dictate reality.
            </span>
          </motion.h2>
        </motion.div>

        {/* --- MIDDLE SECTION: Stacked Modular Cards --- */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="flex flex-col gap-6 mb-6"
        >
          {/* Card 1: Who We Are */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col items-center text-center bg-zinc-950 border border-zinc-800/60 rounded-[2rem] p-10 md:p-20 shadow-2xl transition-colors hover:border-zinc-700/80"
          >
            <h3 className="text-2xl md:text-4xl font-semibold text-zinc-100 mb-6 tracking-tight">
              Who We Are
            </h3>
            <p className="text-lg md:text-2xl leading-relaxed text-zinc-400 font-light max-w-4xl">
              We are a collective of relentless visionaries, strategists, and
              digital craftsmen. We don't just build websites; we engineer
              digital empires. Based globally, we partner with ambitious
              founders and disruptive enterprises to build products that command
              attention.
            </p>
          </motion.div>

          {/* Card 2: What We Do */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col items-center text-center bg-zinc-950 border border-zinc-800/60 rounded-[2rem] p-10 md:p-20 shadow-2xl transition-colors hover:border-zinc-700/80"
          >
            <h3 className="text-2xl md:text-4xl font-semibold text-zinc-100 mb-6 tracking-tight">
              What We Do
            </h3>
            <p className="text-lg md:text-2xl leading-relaxed text-zinc-400 font-light max-w-4xl">
              From foundational brand architecture to cinematic web experiences
              and high-performance software engineering, we provide end-to-end
              capabilities. Every pixel is intentional, designed to elevate your
              brand above the noise and drive measurable growth.
            </p>
          </motion.div>
        </motion.div>

        {/* --- BOTTOM SECTION: Numerics Grid --- */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {numerics.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="flex flex-col items-center text-center bg-zinc-950 border border-zinc-800/60 rounded-[1.5rem] p-10 transition-all duration-300 hover:bg-zinc-900/80 hover:border-zinc-700"
            >
              <h4 className="text-5xl md:text-6xl font-bold tracking-tight text-white mb-4">
                <Counter value={stat.value} suffix={stat.suffix} />
              </h4>
              <p className="text-sm font-semibold text-zinc-200 uppercase tracking-widest mb-2">
                {stat.label}
              </p>
              <p className="text-sm font-light text-zinc-500 leading-relaxed">
                {stat.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
