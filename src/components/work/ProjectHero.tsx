"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import type { Project } from "@/data/projects";

const premiumEase = [0.16, 1, 0.3, 1] as const;

export default function ProjectHero({ project }: { project: Project }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <section
      ref={containerRef}
      className="relative flex h-[80vh] min-h-[600px] w-full items-end justify-center overflow-hidden bg-[#0a0a0a] md:h-screen"
    >
      {/* Parallax Background */}
      <motion.div
        style={{ y, scale }}
        className="absolute inset-0 h-full w-full"
      >
        {project.type === "video" && project.video ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            className="h-full w-full object-cover"
          >
            <source src={project.video} type="video/mp4" />
          </video>
        ) : (
          <img
            src={project.image}
            alt={project.title}
            className="h-full w-full object-cover"
          />
        )}
      </motion.div>

      {/* Overlays */}
      <div className="absolute inset-0 bg-black/40" />
      <motion.div
        style={{ opacity }}
        className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent"
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl px-6 pb-24 md:px-12 md:pb-32">
        <div className="flex flex-col gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: premiumEase }}
            className="flex items-center gap-4"
          >
            <span className="rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white backdrop-blur-md">
              {project.category}
            </span>
            <span className="text-sm font-medium tracking-wide text-white/60">
              {project.year}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: premiumEase }}
            className="max-w-5xl text-5xl font-bold leading-[0.9] tracking-tight text-white md:text-7xl lg:text-[6rem]"
          >
            {project.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: premiumEase }}
            className="max-w-2xl text-lg font-light leading-relaxed text-white/70 md:text-xl"
          >
            {project.subtitle}
          </motion.p>
        </div>
      </div>
    </section>
  );
}
