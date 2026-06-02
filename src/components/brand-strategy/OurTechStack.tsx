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

// Placeholder tech stack data
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

  // Reusable track to duplicate for the infinite loop
  const LogoTrack = () => (
    <div className="flex shrink-0 gap-8 md:gap-2 pr-8 md:pr-2">
      {techStack.map((tech) => (
        <div
          key={tech.id}
          className="flex shrink-0 items-center justify-center gap-1 rounded-xl border border-zinc-300 bg-zinc-50 px-16 py-16 transition-colors hover:border-[#2E5BFF]/30 hover:bg-[#2E5BFF]/5"
        >
          <tech.icon className="h-6 w-6 text-zinc-600" />
          <span className="text-lg font-bold tracking-tight text-zinc-800">
            {tech.name}
          </span>
        </div>
      ))}
    </div>
  );

  return (
    <section className="w-full bg-white py-20 text-black md:py-32 overflow-hidden">
      <div className="mx-auto w-full px-6 md:px-10 lg:px-16">
        {/* HEADER */}
        <div className="mb-16 flex flex-col items-start justify-start text-left">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="text-4xl font-bold tracking-tight text-zinc-900 md:text-5xl lg:text-[5rem]"
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
            className="mt-6 max-w-xl text-lg text-zinc-500"
          >
            Powered by modern, reliable, and scalable technologies to bring your
            vision to life.
          </motion.p>
        </div>

        {/* CAROUSEL CONTAINER */}
        <div
          className="relative w-full overflow-hidden rounded-3xl bg-white py-16 shadow-[0_0_40px_-15px_rgba(0,0,0,0.05)]"
          style={{
            maskImage:
              "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)",
          }}
        >
          {/* ANIMATED TRACK */}
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
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <LogoTrack />
            <LogoTrack />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
