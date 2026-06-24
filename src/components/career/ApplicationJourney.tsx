"use client";

import { motion } from "framer-motion";

const premiumEase = [0.16, 1, 0.3, 1] as const;

interface Step {
  number: string;
  title: string;
  description: string;
  image: string;
}

const steps: Step[] = [
  {
    number: "01",
    title: "Apply",
    description:
      "Submit your application with your resume and portfolio. We review every profile carefully.",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&auto=format&fit=crop&q=60",
  },
  {
    number: "02",
    title: "Interview",
    description:
      "Let's talk about your journey, mindset, and how you approach creative problem solving.",
    image:
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&auto=format&fit=crop&q=60",
  },
  {
    number: "03",
    title: "Assignment",
    description:
      "Show us how you approach real-world challenges through a take-home project.",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&auto=format&fit=crop&q=60",
  },
  {
    number: "04",
    title: "Offer",
    description:
      "Welcome aboard! We'll share the offer, onboarding details, and get you set up for success.",
    image:
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200&auto=format&fit=crop&q=60",
  },
];

export default function ApplicationJourney() {
  return (
    <section className="relative w-full bg-zinc-50 px-6 py-24 text-zinc-900 md:py-32">
      <div className="mx-auto w-full">
        {/* Title Area */}
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: premiumEase }}
            className="mb-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-zinc-400"
          >
            The Process
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: premiumEase }}
            className="text-4xl font-bold leading-[1.05em] tracking-tighter text-zinc-900 md:text-5xl lg:text-[6.5rem]"
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

        {/* Step cards — scroll-stacking deck (text left, image right) */}
        <div className="relative">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className="sticky w-full"
              style={{
                // Each card pins slightly lower so they stack like a deck.
                top: `calc(8vh + ${index * 2.5}rem)`,
                zIndex: index,
              }}
            >
              <div className="grid grid-cols-1 gap-6 rounded-[2.5rem] border border-zinc-200 bg-white p-6 md:grid-cols-2 md:items-center md:gap-10 md:p-8 lg:p-10">
                {/* Left: title + description */}
                <div className="flex flex-col justify-center gap-4 md:px-4 lg:px-6">
                  <h3 className="text-3xl font-bold tracking-tight text-zinc-900 md:text-4xl lg:text-5xl">
                    {step.title}
                  </h3>
                  <p className="text-base leading-relaxed text-zinc-500 md:text-lg">
                    {step.description}
                  </p>
                </div>

                {/* Right: image — same rounded box style as SubServices */}
                <div className="relative h-[350px] w-full overflow-hidden rounded-2xl md:h-[450px]">
                  <img
                    src={step.image}
                    alt={step.title}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          ))}

          {/* Runway: lets the last card stay pinned briefly */}
          <div className="pointer-events-none h-[30vh] w-full" />
        </div>
      </div>
    </section>
  );
}
