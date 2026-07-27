"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import { MdArrowOutward } from "react-icons/md";
import type { Project } from "@/data/projects";

export default function NextProject({ nextProject }: { nextProject: Project }) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["20%", "0%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1]);

  return (
    <section
      ref={containerRef}
      className="relative bg-[#0a0a0a] px-4 pt-12 pb-24 md:px-10 md:pt-16 md:pb-32"
    >
      <Link href={nextProject.href} className="block w-full">
        <motion.div
          style={{ y, scale }}
          className="relative mx-auto flex min-h-[500px] w-full max-w-7xl cursor-pointer flex-col items-center justify-center overflow-hidden rounded-[40px] bg-white/5 md:min-h-[600px]"
        >
          <div className="absolute inset-0 z-0 overflow-hidden">
            <div className="h-full w-full opacity-40">
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
            </div>
          </div>

          <div className="absolute inset-0 z-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

          <div className="relative z-10 flex flex-col items-center justify-center text-center">
            <span className="mb-6 text-sm font-bold uppercase tracking-[0.25em] text-white/60">
              Next Project
            </span>

            <h2 className="px-4 text-5xl font-bold leading-[1.2em] tracking-tight text-white md:text-7xl lg:text-[6rem]">
              {nextProject.title}
            </h2>

            <div className="mt-12 pointer-events-auto">
              <div className="group relative flex h-14 w-fit items-center justify-between gap-4 overflow-hidden rounded-xl pl-0 pr-2 transition-all duration-300 hover:border-white hover:pl-6 hover:pr-3.5 before:absolute before:inset-0 before:origin-left before:scale-x-0 before:bg-white before:transition-transform before:duration-300 before:ease-out hover:before:scale-x-100">
                <span className="relative z-10 text-base font-bold tracking-tight text-white transition-colors duration-300 group-hover:text-black">
                  View Case Study
                </span>

                <div className="relative z-10 flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl bg-white text-black transition-colors duration-300 group-hover:bg-black">
                  <svg width="0" height="0" className="absolute">
                    <title>View case study arrow gradient</title>
                    <defs>
                      <linearGradient
                        id={`next-project-grad-${nextProject.id}`}
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                      >
                        <stop stopColor="#2E5BFF" offset="0%" />
                        <stop stopColor="#149CCB" offset="100%" />
                      </linearGradient>
                    </defs>
                  </svg>

                  <MdArrowOutward className="absolute z-10 h-4 w-4 transition-transform duration-300 group-hover:-translate-y-8 group-hover:translate-x-8" />
                  <MdArrowOutward
                    className="absolute z-10 h-4 w-4 -translate-x-8 translate-y-8 transition-transform duration-300 group-hover:translate-x-0 group-hover:translate-y-0"
                    style={{
                      fill: `url(#next-project-grad-${nextProject.id})`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </Link>
    </section>
  );
}
