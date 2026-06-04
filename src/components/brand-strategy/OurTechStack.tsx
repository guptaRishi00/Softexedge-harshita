"use client";

import { motion } from "framer-motion";
import { useState } from "react";

// Update these paths to match the exact filenames in your public/assets folder
const techStack = [
  { id: 2, name: "Next.js", image: "/assets/nextjs.png" },
  { id: 3, name: "Tailwind CSS", image: "/assets/tailwind3.png" },
  { id: 4, name: "TypeScript", image: "/assets/typescript3.png" },
  { id: 5, name: "PostgreSQL", image: "/assets/postgres2.png" },
  { id: 6, name: "Framer Motion", image: "/assets/framer.png" },
  { id: 7, name: "React Native", image: "/assets/reactnative4.png" },
];

export default function OurTechStack() {
  const [isPaused, setIsPaused] = useState(false);

  const LogoTrack = () => (
    <div className="flex shrink-0 gap-3 pr-3">
      {techStack.map((tech) => (
        <div
          key={tech.id}
          className="flex h-50 w-68 shrink-0 items-center justify-center rounded-xl border border-zinc-800 bg-[#171717] transition-colors"
        >
          <img
            src={tech.image}
            alt={`${tech.name} logo`}
            className="h-10 w-auto object-contain"
          />
        </div>
      ))}
    </div>
  );

  return (
    // Removed md:pb-24 from the section so the border sits at the true bottom
    <section className="relative w-full overflow-hidden bg-black text-white">
      {/* Added pb-16 md:pb-24 here to keep your original spacing above the border */}
      <div className="mx-auto w-full md:pb-25">
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
            className="max-w-xl text-xl font-medium leading-[1.25em] text-zinc-400 md:mb-2 md:text-left"
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

      {/* Bottom Border (Not edge-to-edge) */}
      <div className="mx-auto w-full px-6 md:px-6">
        <div className="w-full border-b border-white/10" />
      </div>
    </section>
  );
}
