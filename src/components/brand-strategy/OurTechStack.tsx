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
    <div className="flex shrink-0 gap-8 pr-8 md:gap-2 md:pr-2">
      {techStack.map((tech) => (
        <div
          key={tech.id}
          className="flex shrink-0 items-center justify-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900 px-16 py-16 transition-colors "
        >
          <tech.icon className="h-6 w-6 text-zinc-400" />
          <span className="text-lg font-bold tracking-tight text-white">
            {tech.name}
          </span>
        </div>
      ))}
    </div>
  );

  return (
    <section className="w-full overflow-hidden bg-black py-20 text-white md:py-10">
      <div className="mx-auto w-full ">
        <div className="mb-16  max-w-[1480px] px-10 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
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
            className="max-w-sm text-lg leading-relaxed text-zinc-400 md:mb-2 md:text-right"
          >
            Powered by modern, reliable, and scalable technologies to bring your
            vision to life.
          </motion.p>
        </div>

        <div
          className="relative w-full overflow-hidden rounded-3xl py-16 flex flex-col gap-6"
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
