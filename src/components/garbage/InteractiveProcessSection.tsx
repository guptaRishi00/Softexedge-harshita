"use client";

import { motion } from "framer-motion";
import React from "react";

const processSteps = [
  {
    id: "01",
    title: "Discovery",
    subtitle: "Research & Positioning",
    description:
      "We immerse ourselves in your business, audience, and competitive landscape to uncover the strategic truths that will differentiate your brand.",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1400&auto=format&fit=crop",
  },
  {
    id: "02",
    title: "Architecture",
    subtitle: "Systems & Frameworks",
    description:
      "We design the structural foundation—positioning, messaging, and experience frameworks—that guide every decision and interaction.",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1400&auto=format&fit=crop",
  },
  {
    id: "03",
    title: "Execution",
    subtitle: "Design & Development",
    description:
      "Every pixel and interaction is crafted with obsessive precision, transforming strategy into tangible, high-performing digital experiences.",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1400&auto=format&fit=crop",
  },
  {
    id: "04",
    title: "Evolution",
    subtitle: "Growth & Iteration",
    description:
      "We continuously measure, learn, and refine—ensuring your digital presence scales with your ambitions and market dynamics.",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1400&auto=format&fit=crop",
  },
];

const premiumEase = [0.22, 1, 0.36, 1] as const;

export default function ProcessBentoSection() {
  return (
    <section className="relative overflow-hidden bg-[#FAFAF9] px-6 py-24 md:px-12 md:py-32">
      <div className="relative mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-16 grid grid-cols-1 gap-8 md:mb-24 md:grid-cols-12 md:items-end">
          <motion.div
            className="md:col-span-7"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: premiumEase }}
          >
            <span className="mb-6 inline-block text-xs font-medium uppercase tracking-[0.2em] text-stone-400">
              How We Work
            </span>
            <h2 className="text-4xl font-semibold leading-[1.1] tracking-tight text-stone-900 md:text-5xl lg:text-6xl">
              From insight
              <br />
              <span className="bg-gradient-to-r from-[#2E5BFF] to-[#149CCB] bg-clip-text text-transparent">
                to impact.
              </span>
            </h2>
          </motion.div>

          <motion.p
            className="text-base leading-relaxed text-stone-500 md:col-span-4 md:col-start-9"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: premiumEase, delay: 0.1 }}
          >
            A deliberate four-phase process designed to eliminate ambiguity and
            create digital products with clarity, purpose, and lasting value.
          </motion.p>
        </div>

        {/* Circular Cards Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-16">
          {processSteps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.8,
                ease: premiumEase,
                delay: index * 0.15,
              }}
              className="group relative mx-auto flex aspect-square w-full max-w-[480px] flex-col items-center justify-center overflow-hidden rounded-full p-8 text-center sm:p-12 shadow-sm ring-1 ring-stone-200/50 transition-all duration-700 hover:shadow-2xl hover:shadow-[#2E5BFF]/20"
            >
              {/* Image Background */}
              <img
                src={step.image}
                alt={step.title}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 ease-[0.22,1,0.36,1] group-hover:scale-110"
              />

              {/* Dark Overlay for Text Legibility (Darkens on Hover) */}
              <div className="absolute inset-0 bg-stone-900/40 backdrop-blur-[2px] transition-all duration-700 ease-[0.22,1,0.36,1] group-hover:bg-stone-900/70 group-hover:backdrop-blur-md" />

              {/* Centered Content Container */}
              <div className="relative z-10 flex flex-col items-center justify-center text-white">
                {/* Step ID */}
                <span className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 font-mono text-sm font-bold backdrop-blur-md transition-colors duration-500 group-hover:border-transparent group-hover:bg-[#2E5BFF]">
                  {step.id}
                </span>

                <span className="mb-2 text-xs font-semibold uppercase tracking-widest text-stone-300">
                  {step.subtitle}
                </span>

                <h3 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
                  {step.title}
                </h3>

                {/* Expandable Description (Hidden by default, reveals on hover) */}
                <div className="grid grid-rows-[0fr] opacity-0 transition-all duration-700 ease-[0.22,1,0.36,1] group-hover:mt-4 group-hover:grid-rows-[1fr] group-hover:opacity-100">
                  <div className="overflow-hidden">
                    <p className="max-w-[300px] text-sm font-light leading-relaxed text-stone-200 md:text-base">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Hover Animated Border Accent */}
              <div className="absolute inset-0 z-20 rounded-full border-[3px] border-transparent transition-colors duration-700 ease-[0.22,1,0.36,1] group-hover:border-[#2E5BFF]/50" />
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-24 flex flex-col items-start justify-between gap-6 border-t border-stone-200 pt-10 sm:flex-row sm:items-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-sm text-stone-500">Ready to start your project?</p>
          <button className="group flex items-center gap-2 text-sm font-medium text-stone-900 transition-colors hover:text-[#2E5BFF]">
            Begin with Discovery
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              <path
                d="M3 8H13M13 8L9 4M13 8L9 12"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
