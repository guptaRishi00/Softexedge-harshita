// src/components/home/ExperimentalTestimonials.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import DynamicButton from "../ui/DynamicButton"; // Adjust this import path as needed
import ConnectButtonTwo from "../shared/ConnectButtonTwo";

const testimonials = [
  {
    quote:
      "SoftEXedge gives you the tools and the trust to build things you didn't think were possible at scale. Before partnering with them, our design system was disjointed and hard to maintain. They didn't just unify our components; they established a scalable.",
    name: "Alex Rivera",
    role: "Lead Product Designer",
    initials: "AR",
  },
  {
    quote:
      "The level of technical excellence here is unmatched. Every day is an opportunity to learn something complex. We were struggling with massive latency spikes during peak traffic, and their engineering team came in and completely refactored our microservices. The sheer performance gains and robust infrastructure they delivered have given us total peace of mind.",
    name: "Sarah Chen",
    role: "Sr. Backend Engineer",
    initials: "SC",
  },
  {
    quote:
      "They transformed a simple product into something people genuinely remember. The experience felt cinematic. From the fluid micro-interactions to the flawless typographic hierarchy, every single detail was meticulously crafted. They fundamentally understand.",
    name: "Sophia Lin",
    role: "Creative Director",
    initials: "SL",
  },
  {
    quote:
      "A rare combination of strong engineering and elite visual storytelling. The interface truly felt alive. In the AI space, making complex data models accessible to everyday users is incredibly difficult. SoftEXedge managed to take our dense, highly technical.",
    role: "CEO · Aether AI",
    initials: "DR",
  },
];

// Duplicate the array to create a seamless infinite loop
const duplicatedTestimonials = [...testimonials, ...testimonials];

const rotatingWords = ["Collective", "Visionaries", "Innovators", "Future"];

export default function ExperimentalTestimonials() {
  const [index, setIndex] = useState(0);

  // Cycle through the words every 2.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden bg-white text-zinc-900 md:py-20">
      {/* CSS Keyframes for the continuous vertical marquee */}
      <style>{`
        @keyframes scroll-y {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        .animate-scroll-y {
          animation: scroll-y 40s linear infinite; /* Slightly slowed down to account for taller cards */
        }
        .animate-scroll-y:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="mx-auto flex w-full flex-col gap-12 px-6 md:px-6 lg:flex-row lg:items-start lg:gap-5">
        {/* LEFT COLUMN: Title and CTA */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: "-50px" }}
          className="flex w-full flex-col lg:sticky lg:top-30 lg:h-[600px] lg:w-2/5 lg:shrink-0"
        >
          <div>
            <h2 className="text-5xl font-bold tracking-tight md:text-6xl lg:text-[5rem] lg:leading-[1.0]">
              Voices of the <br />
              {/* Rotating Gradient Text */}
              <span className="inline-grid overflow-hidden py-1">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={index}
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -30, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="col-start-1 row-start-1 bg-linear-to-r from-[#2E5BFF] to-[#149CCB] text-transparent bg-clip-text"
                  >
                    {rotatingWords[index]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </h2>

            <p className="mt-6 max-w-md text-lg leading-relaxed text-zinc-600">
              Don't just take our word for it. Hear from the visionaries
              building our future every day.
            </p>

            <div className="mt-10">
              {/* <DynamicButton
                text="Let's Connect"
                href="#contact"
                className="px-8 py-4 border border-zinc-200 hover:border-transparent"
              /> */}
              <ConnectButtonTwo className="" />
            </div>
          </div>
        </motion.div>

        {/* RIGHT COLUMN: Vertical Marquee */}
        <div className="relative w-full lg:w-3/5 h-[600px] md:h-[750px] overflow-hidden">
          {/* Fade Masks for seamless vertical scrolling illusion */}
          <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-32 bg-gradient-to-b from-white to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-32 bg-gradient-to-t from-white to-transparent" />

          {/* Scrolling Container */}
          <div className="animate-scroll-y flex flex-col gap-6 pt-4 pb-6 px-1">
            {duplicatedTestimonials.map((item, index) => (
              <div
                key={index}
                /* INCREASED HEIGHT: min-h-[350px] for mobile, min-h-[420px] for desktop */
                className="group relative flex w-full min-h-[350px] md:min-h-[420px] shrink-0 flex-col justify-between rounded-3xl border border-zinc-200 bg-zinc-50/50 backdrop-blur-md p-8 shadow-sm transition-all hover:bg-white hover:shadow-xl hover:shadow-zinc-200/50 md:p-10"
              >
                {/* Outlined Quote Icon (Top Right) - Increased size to 48x48 */}
                <div className="absolute right-8 top-8 text-zinc-200 transition-colors group-hover:text-zinc-300">
                  <svg
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
                    <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
                  </svg>
                </div>

                {/* Quote Text - Increased to text-xl (mobile) and text-2xl/3xl (desktop) */}
                <p className="relative z-10 mt-6 max-w-[90%] text-xl font-medium leading-[1.3em] tracking-tight text-zinc-800 md:text-2xl lg:text-xl">
                  "{item.quote}"
                </p>

                {/* Bottom Profile */}
                <div className="mt-10 flex items-center gap-4">
                  {/* Avatar Placeholder - Increased to h-12 w-12 */}
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-zinc-100 border border-zinc-200 text-sm font-bold text-zinc-600">
                    {item.initials}
                  </div>
                  <div>
                    {/* Name - Increased to text-base */}
                    <h4 className="text-base font-bold text-zinc-900">
                      {item.name}
                    </h4>
                    {/* Role - Increased to text-xs */}
                    <p className="mt-1 text-xs font-bold uppercase tracking-wider text-zinc-700">
                      {item.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
