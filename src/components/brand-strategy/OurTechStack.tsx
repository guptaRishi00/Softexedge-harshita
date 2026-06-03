"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
  Code2,
  Database,
  Globe,
  Layers,
  LayoutTemplate,
  MonitorSmartphone,
  Cpu,
} from "lucide-react";

const techStack = [
  { id: 1, name: "React", icon: Code2 },
  { id: 2, name: "Next.js", icon: Globe },
  { id: 3, name: "Tailwind CSS", icon: LayoutTemplate },
  { id: 4, name: "TypeScript", icon: Cpu },
  { id: 5, name: "PostgreSQL", icon: Database },
  { id: 6, name: "Framer Motion", icon: Layers },
  { id: 7, name: "React Native", icon: MonitorSmartphone },
];

export default function OurTechStack() {
  const [isPaused, setIsPaused] = useState(false);

  const LogoTrack = () => (
    // Updated spacing: gap-3 handles internal spacing, pr-3 acts as the gap between tracks
    <div className="flex shrink-0 gap-3 pr-3">
      {techStack.map((tech) => (
        <div
          key={tech.id}
          className="flex shrink-0 items-center justify-center gap-2 rounded-xl border border-zinc-800 bg-[#040404] px-16 py-16 transition-colors "
        >
          <tech.icon
            className="h-10 w-10"
            style={{ stroke: "url(#icon-gradient)" }}
          />
          <span className="text-3xl font-bold tracking-tight text-white">
            {tech.name}
          </span>
        </div>
      ))}
    </div>
  );

  return (
    <section className="relative w-full overflow-hidden bg-black py-16 text-white md:py-10">
      {/* Hidden SVG to define the gradient */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <linearGradient id="icon-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop stopColor="#2E5BFF" offset="0%" />
            <stop stopColor="#149CCB" offset="100%" />
          </linearGradient>
        </defs>
      </svg>

      <div className="mx-auto w-full">
        <div className="mx-auto mb-20 flex flex-col items-start justify-between gap-6 px-6 md:flex-row md:items-end md:px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="text-4xl font-bold leading-none tracking-tight text-white md:text-5xl lg:text-[5rem]"
          >
            Our Tech{" "}
            <span className="bg-gradient-to-r from-[#2E5BFF] to-[#149CCB] bg-clip-text text-transparent">
              Stack
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="max-w-sm text-lg leading-[1.25em] text-zinc-400 md:mb-2 md:text-right"
          >
            Powered by modern, reliable, and scalable technologies to bring your
            vision to life.
          </motion.p>
        </div>

        <div
          className="relative flex w-full flex-col gap-3 overflow-hidden rounded-3xl py-16"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <motion.div
            className="flex w-max flex-nowrap"
            animate={
              isPaused
                ? "paused"
                : {
                    x: ["0%", "-50%"],
                  }
            }
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 25,
                ease: "linear",
              },
            }}
          >
            <LogoTrack />
            <LogoTrack />
          </motion.div>

          <motion.div
            className="flex w-max flex-nowrap"
            animate={
              isPaused
                ? "paused"
                : {
                    x: ["-50%", "0%"],
                  }
            }
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 25,
                ease: "linear",
              },
            }}
          >
            <LogoTrack />
            <LogoTrack />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
