"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef, useState } from "react";
import { MdArrowOutward } from "react-icons/md";
import type { Project } from "@/data/projects";

const premiumEase = [0.16, 1, 0.3, 1] as const;

export default function NextProject({ nextProject }: { nextProject: Project }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["20%", "0%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1]);

  return (
    <section
      ref={containerRef}
      className="relative bg-[#0a0a0a] px-6 py-24 md:px-12 md:py-32"
    >
      <Link href={nextProject.href}>
        <motion.div
          style={{ y, scale }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="group relative mx-auto flex min-h-[500px] w-full max-w-7xl cursor-pointer flex-col items-center justify-center overflow-hidden rounded-[40px] bg-white/5 md:min-h-[600px]"
        >
          {/* Background Media (revealed on hover) */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <motion.div
              initial={false}
              animate={{
                scale: isHovered ? 1.05 : 1.2,
                opacity: isHovered ? 0.4 : 0,
              }}
              transition={{ duration: 0.8, ease: premiumEase }}
              className="h-full w-full"
            >
              {nextProject.type === "video" && nextProject.video ? (
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="h-full w-full object-cover"
                >
                  <source src={nextProject.video} type="video/mp4" />
                </video>
              ) : (
                <img
                  src={nextProject.image}
                  alt={nextProject.title}
                  className="h-full w-full object-cover"
                />
              )}
            </motion.div>
          </div>

          <div className="absolute inset-0 z-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center justify-center text-center">
            <motion.span
              animate={{ y: isHovered ? -10 : 0, opacity: isHovered ? 0.6 : 1 }}
              transition={{ duration: 0.5, ease: premiumEase }}
              className="mb-6 text-sm font-bold uppercase tracking-[0.25em] text-white/60"
            >
              Next Project
            </motion.span>

            <motion.h2
              animate={{ y: isHovered ? -10 : 0, scale: isHovered ? 1.05 : 1 }}
              transition={{ duration: 0.5, ease: premiumEase }}
              className="px-4 text-5xl font-bold tracking-tight text-white md:text-7xl lg:text-[6rem]"
            >
              {nextProject.title}
            </motion.h2>

            <motion.div
              initial={false}
              animate={{
                opacity: isHovered ? 1 : 0,
                y: isHovered ? 20 : 40,
              }}
              transition={{ duration: 0.5, ease: premiumEase }}
              className="absolute -bottom-8 flex items-center gap-3 rounded-full bg-white px-6 py-3 text-black"
            >
              <span className="text-sm font-bold tracking-tight">
                View Case Study
              </span>
              <MdArrowOutward className="h-5 w-5" />
            </motion.div>
          </div>
        </motion.div>
      </Link>
    </section>
  );
}
