"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MdArrowOutward } from "react-icons/md";
import type { Project } from "@/data/projects";
import { useIsDesktop } from "@/lib/useIsDesktop";
import { cn } from "@/lib/utils";
import SpecularBorder from "../ui/SpecularBorder";

export const premiumEase = [0.16, 1, 0.3, 1] as const;

const CTA_ACTIVATE_DELAY = 450;

const smoothSpring = {
  type: "spring",
  stiffness: 100,
  damping: 24,
  mass: 1,
} as const;

export default function ProjectCard({
  project,
  isHovered: isHoveredProp,
  isAnyHovered: isAnyHoveredProp,
  onHoverStart,
  onHoverEnd,
}: {
  project: Project;
  isHovered: boolean;
  isAnyHovered: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
}) {
  // Hover is desktop-only. iOS fires `mouseenter` on a tap and then holds that
  // state until the next tap elsewhere, so a tapped card would sit stuck in its
  // hovered pose. Gating the two flags here rather than at each use means every
  // animate/AnimatePresence below resolves to its resting value on touch, and
  // the desktop branch is untouched.
  const isDesktop = useIsDesktop();
  const isHovered = isHoveredProp && isDesktop;
  const isAnyHovered = isAnyHoveredProp && isDesktop;

  const [ctaActive, setCtaActive] = useState(false);

  useEffect(() => {
    if (!isHovered) {
      setCtaActive(false);
      return;
    }
    const timer = setTimeout(() => setCtaActive(true), CTA_ACTIVATE_DELAY);
    return () => clearTimeout(timer);
  }, [isHovered]);

  return (
    <Link href={project.href}>
      <motion.div
        onMouseEnter={() => {
          if (isDesktop) onHoverStart();
        }}
        onMouseLeave={onHoverEnd}
        animate={{
          scale: isHovered ? 1.01 : 1,
        }}
        transition={smoothSpring}
        className="group relative w-full cursor-pointer"
      >
        <div
          className={`relative w-full overflow-hidden rounded-[20px] ${
            project.featured
              ? "h-[400px] md:h-[600px]"
              : "h-[350px] md:h-[500px]"
          }`}
        >
          <motion.div
            animate={{ scale: isHovered ? 1.06 : 1.02 }}
            transition={smoothSpring}
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
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                loading="lazy"
                className="h-full w-full object-cover"
              />
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isAnyHovered && !isHovered ? 0.35 : 0 }}
            transition={{ duration: 0.4, ease: premiumEase }}
            className="pointer-events-none absolute inset-0 bg-black"
          />

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent" />

          <motion.div
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.4, ease: premiumEase }}
            className="pointer-events-none absolute inset-0 bg-black/35"
          />

          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-30 transition-opacity duration-700 group-hover:opacity-60" />

          <div className="absolute inset-0 z-20 flex flex-col justify-between p-8 md:p-10">
            <motion.div
              animate={{
                opacity: isHovered ? 0 : 1,
                y: isHovered ? -10 : 0,
              }}
              transition={smoothSpring}
              className="flex items-start justify-between"
            >
              <span className="rounded-md border border-white/20 bg-black/20 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-widest text-white/80 backdrop-blur-md max-md:bg-black/50 max-md:backdrop-blur-none">
                {project.category}
              </span>
              <span className="text-sm font-medium text-white/50">
                {project.year}
              </span>
            </motion.div>

            <div>
              <motion.div
                animate={{
                  opacity: isHovered ? 0 : 1,
                  y: isHovered ? 20 : 0,
                }}
                transition={smoothSpring}
              >
                <h3 className="text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl">
                  {project.title}
                </h3>
                <p className="mt-2 text-sm font-medium text-white/60">
                  {project.subtitle}
                </p>
              </motion.div>

              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 15 }}
                    transition={{
                      type: "spring",
                      stiffness: 120,
                      damping: 20,
                    }}
                    className="absolute bottom-8 left-8 right-8 md:bottom-10 md:left-10 md:right-10"
                  >
                    <h3 className="text-4xl font-semibold tracking-tight text-white md:text-5xl lg:text-6xl">
                      {project.title}
                    </h3>

                    <p className="mt-4 max-w-xl text-sm font-light leading-[1.5em] text-zinc-300 md:text-base">
                      {project.description}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {project.tech.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-md border border-white/15 bg-white/5 px-3 py-1 text-[0.6rem] font-bold uppercase tracking-widest text-white/80 backdrop-blur-md"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="mt-6">
                      <span
                        className={cn(
                          "group/cta relative inline-flex h-12 w-fit cursor-pointer items-center justify-between gap-3 overflow-hidden rounded-xl pl-0 pr-2 transition-all duration-300 hover:pl-5 hover:pr-2 before:absolute before:inset-0 before:origin-left before:scale-x-0 before:bg-white before:transition-transform before:duration-300 before:ease-out hover:before:scale-x-100",
                          ctaActive && "pl-5 pr-2 before:scale-x-100",
                        )}
                      >
                        <span
                          className={cn(
                            "relative z-10 text-sm font-bold tracking-tight text-white transition-colors duration-300 group-hover/cta:text-black",
                            ctaActive && "text-black",
                          )}
                        >
                          View Project
                        </span>

                        <span
                          className={cn(
                            "relative z-10 flex h-8 w-8 items-center justify-center overflow-hidden rounded-lg bg-white text-black transition-colors duration-300 group-hover/cta:bg-black",
                            ctaActive && "bg-black",
                          )}
                        >
                          <svg width="0" height="0" className="absolute">
                            <title>View project arrow gradient</title>
                            <defs>
                              <linearGradient
                                id={`cta-icon-grad-${project.id}`}
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

                          <MdArrowOutward
                            className={cn(
                              "absolute z-10 h-4 w-4 transition-transform duration-300 group-hover/cta:-translate-y-8 group-hover/cta:translate-x-8",
                              ctaActive && "-translate-y-8 translate-x-8",
                            )}
                          />
                          <MdArrowOutward
                            className={cn(
                              "absolute z-10 h-4 w-4 -translate-x-8 translate-y-8 transition-transform duration-300 group-hover/cta:translate-x-0 group-hover/cta:translate-y-0",
                              ctaActive && "translate-x-0 translate-y-0",
                            )}
                            style={{
                              fill: `url(#cta-icon-grad-${project.id})`,
                            }}
                          />
                        </span>
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {isHovered && <SpecularBorder radius={20} />}
      </motion.div>
    </Link>
  );
}
