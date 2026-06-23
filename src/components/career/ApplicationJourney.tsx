"use client";

import { motion } from "framer-motion";
import {
  BadgeCheck,
  ClipboardCheck,
  type LucideIcon,
  Mail,
  MessageCircleQuestion,
} from "lucide-react";

const premiumEase = [0.16, 1, 0.3, 1] as const;

interface Step {
  number: string;
  title: string;
  description: string;
  Icon: LucideIcon;
}

const steps: Step[] = [
  {
    number: "01",
    title: "Apply",
    description:
      "Submit your application with your resume and portfolio. We review every profile carefully.",
    Icon: BadgeCheck,
  },
  {
    number: "02",
    title: "Interview",
    description:
      "Let's talk about your journey, mindset, and how you approach creative problem solving.",
    Icon: MessageCircleQuestion,
  },
  {
    number: "03",
    title: "Assignment",
    description:
      "Show us how you approach real-world challenges through a take-home project.",
    Icon: ClipboardCheck,
  },
  {
    number: "04",
    title: "Offer",
    description:
      "Welcome aboard! We'll share the offer, onboarding details, and get you set up for success.",
    Icon: Mail,
  },
];

export default function ApplicationJourney() {
  return (
    <section className="relative w-full bg-zinc-50 px-6 py-24 text-zinc-900 md:py-32">
      <div className="mx-auto w-full">
        {/* Title Area */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: premiumEase }}
            className="mb-6 inline-flex items-center text-sm font-bold uppercase tracking-widest bg-linear-to-r from-[#2E5BFF] to-[#149CCB] bg-clip-text text-transparent md:text-base"
          >
            The Process
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: premiumEase }}
            className="text-4xl font-bold tracking-tight text-black sm:text-5xl md:text-6xl"
          >
            Your Application Journey
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: premiumEase }}
            className="mt-6 max-w-2xl text-lg text-zinc-500 md:text-xl"
          >
            We've streamlined our hiring process to be transparent, respectful
            of your time, and focused on discovering your true potential.
          </motion.p>
        </div>

        {/* Sticky Scroll Deck Sequence */}
        <div className="relative flex flex-col gap-8 md:gap-12 pb-32">
          {steps.map((step, index) => {
            const Icon = step.Icon;

            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: premiumEase }}
                className="sticky flex w-full flex-col overflow-hidden rounded-[2.5rem] border border-zinc-200 bg-white/95 p-8 shadow-[0_-10px_40px_rgba(0,0,0,0.03)] backdrop-blur-2xl md:flex-row md:items-center md:justify-between md:p-16 transition-all duration-500 hover:shadow-[0_-10px_40px_rgba(46,91,255,0.08)] group"
                style={{
                  // Dynamically stagger the stick top positions so they stack like a deck of cards
                  top: `calc(15vh + ${index * 2}rem)`,
                  // Z-index increases so the later cards go on top
                  zIndex: 10 + index,
                }}
              >
                {/* Giant Watermark Number */}
                <div className="pointer-events-none absolute -right-4 -top-8 select-none text-[12rem] font-bold leading-none tracking-tighter text-zinc-50 transition-colors duration-500 group-hover:text-[#2E5BFF]/[0.03] md:-bottom-12 md:-right-8 md:top-auto md:text-[20rem]">
                  {step.number}
                </div>

                {/* Left Content */}
                <div className="relative z-10 flex flex-col">
                  {/* Glowing Icon Container */}
                  <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-zinc-50 border border-zinc-100 transition-colors duration-500 group-hover:border-transparent group-hover:bg-[#2E5BFF]/10 group-hover:shadow-[0_0_30px_rgba(46,91,255,0.15)] md:h-20 md:w-20">
                    <Icon
                      className="h-8 w-8 text-zinc-400 transition-colors duration-500 group-hover:text-[#2E5BFF] md:h-10 md:w-10"
                      strokeWidth={1.5}
                    />
                  </div>

                  <h3 className="text-3xl font-bold tracking-tight text-zinc-900 md:text-5xl mb-4 transition-colors duration-300">
                    {step.title}
                  </h3>

                  <p className="text-lg leading-relaxed text-zinc-500 md:text-xl">
                    {step.description}
                  </p>
                </div>

                {/* Optional Right Graphic (Can be expanded later, keeps layout balanced) */}
                <div className="relative z-10 hidden md:flex h-48 w-48 shrink-0 items-center justify-center opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#2E5BFF] to-[#149CCB] opacity-10 blur-3xl" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
