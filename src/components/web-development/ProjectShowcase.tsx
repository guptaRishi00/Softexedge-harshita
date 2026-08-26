"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import TracingBorder from "../ui/TracingBorder";

const MotionImage = motion.create(Image);

const premiumEase = [0.16, 1, 0.3, 1] as const;

// A TWEEN, not the spring this used to be, because this choreography is
// layout-driven: a single hover animates BOTH row `height`s and ALL seven card
// `flex` values, so every frame is a full relayout of the grid and of the
// images, gradients and text inside it. A spring at stiffness 100 / damping 24
// keeps emitting frames through its overshoot and settle tail for roughly a
// second after the movement already reads as finished — that tail was most of
// the cost, and it is what made the hover feel heavy. A fixed duration ends
// deterministically, and re-hovering interrupts cleanly instead of compounding
// with a still-settling spring.
const smoothTween = {
  type: "tween",
  duration: 0.45,
  ease: premiumEase,
} as const;

const projects = [
  {
    id: 0,
    title: "Aura AI",
    href: "/work/aura-skincare",
    description: "Next-gen artificial intelligence platform interface.",
    image:
      "https://plus.unsplash.com/premium_photo-1773861007414-869af2ea91b8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDEyOHxDRHd1d1hKQWJFd3x8ZW58MHx8fHx8",
    baseFlex: 1.4,
  },
  {
    id: 1,
    title: "Nova Tech",
    href: "/work/nova-workspace",
    description: "Fintech dashboard for modern banking solutions.",
    image:
      "https://images.unsplash.com/photo-1775185172840-47fe371943e5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDEwMnxDRHd1d1hKQWJFd3x8ZW58MHx8fHx8",
    baseFlex: 1,
  },
  {
    id: 2,
    title: "Lumina Vision",
    href: "/work/lumina-festival",
    description: "Immersive VR/AR experience branding.",
    image:
      "https://images.unsplash.com/photo-1775887065658-988ef1c262c6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDkyfENEd3V3WEpBYkV3fHxlbnwwfHx8fHw%3D",
    baseFlex: 2,
  },
  {
    id: 3,
    title: "Apex Dynamics",
    href: "/work/apex-analytics",
    description: "E-commerce platform for high-end sports gear.",
    image:
      "https://images.unsplash.com/photo-1772528205616-e65dc0994c7b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDE3OHxDRHd1d1hKQWJFd3x8ZW58MHx8fHx8",
    baseFlex: 1.7,
  },
  {
    id: 4,
    title: "Nexus Core",
    href: "/work",
    description: "Cybersecurity infrastructure data visualization.",
    image:
      "https://images.unsplash.com/photo-1777646346045-df4bd1114148?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDYwfENEd3V3WEpBYkV3fHxlbnwwfHx8fHw%3D",
    baseFlex: 2,
  },
];

export default function ProjectShowcase() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const row1 = projects.slice(0, 3);
  const row2 = projects.slice(3, 7);

  const getRowHeight = (isRow1: boolean) => {
    if (hoveredId === null) return isRow1 ? "48%" : "52%";

    if (isRow1) {
      return hoveredId < 3 ? "58%" : "42%";
    }

    return hoveredId >= 3 ? "58%" : "42%";
  };

  return (
    <section className="relative overflow-hidden bg-black px-4 pt-35 font-sans text-white md:px-10 md:pb-40">
      <div className="pointer-events-none absolute inset-0 opacity-[0.04]" />

      <div className="relative mx-auto flex w-full flex-col gap-20 md:gap-5">
        <div className="mb-34 w-full">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: premiumEase, delay: 0 }}
            className="mb-5 block ml-[3px] text-xs font-medium uppercase tracking-[0.25em] text-white/60"
          >
            Selected Work
          </motion.span>

          <div className="flex w-full flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, ease: premiumEase, delay: 0.1 }}
              className="text-5xl font-bold leading-[0.9] tracking-tight text-white md:text-7xl lg:text-[5rem]"
            >
              Our{" "}
              <span className="bg-gradient-to-r from-[#2E5BFF] to-[#149CCB] bg-clip-text pr-3 text-transparent">
                Projects
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, ease: premiumEase, delay: 0.2 }}
              className="max-w-2xl text-left text-2xl font-light leading-[1.25em] text-white"
            >
              Delivering scalable, high-performance solutions that elevate
              brands and drive revenue. Delivering scalable, high-performance
              solutions that elevate brands and drive revenue.
            </motion.p>
          </div>
        </div>

        <div className="flex h-auto w-full flex-col gap-4 md:h-[100vh] md:gap-6">
          <motion.div
            animate={{
              height: getRowHeight(true),
            }}
            transition={smoothTween}
            className="flex h-[400px] w-full flex-col gap-4 md:h-auto md:flex-row md:gap-6"
          >
            {row1.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                hoveredId={hoveredId}
                setHoveredId={setHoveredId}
              />
            ))}
          </motion.div>

          <motion.div
            animate={{
              height: getRowHeight(false),
            }}
            transition={smoothTween}
            className="flex h-[500px] w-full flex-col gap-4 md:h-auto md:flex-row md:gap-6"
          >
            {row2.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                hoveredId={hoveredId}
                setHoveredId={setHoveredId}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  hoveredId,
  setHoveredId,
}: {
  project: {
    id: number;
    title: string;
    href: string;
    description: string;
    image: string;
    baseFlex: number;
  };
  hoveredId: number | null;
  setHoveredId: (id: number | null) => void;
}) {
  const isHovered = hoveredId === project.id;
  const isAnyHovered = hoveredId !== null;

  return (
    <motion.div
      onMouseEnter={() => setHoveredId(project.id)}
      onMouseLeave={() => setHoveredId(null)}
      animate={{
        flex: isHovered ? 4 : isAnyHovered ? 1.15 : project.baseFlex,
        scale: isHovered ? 1.01 : 1,
      }}
      transition={smoothTween}
      className="group relative h-full min-h-[300px] w-full cursor-pointer overflow-hidden rounded-[20px]"
    >
      <MotionImage
        src={project.image}
        alt={project.title}
        loading="lazy"
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        animate={{
          scale: isHovered ? 1.06 : 1.02,
          // Both states MUST list the same filter functions in the same order.
          // The resting value used to be plain `brightness(0.85)` while the
          // dimmed one added `grayscale(80%)`, and framer cannot interpolate
          // between two filter lists of different shape — it swapped them
          // discretely instead, which is the "blink" on hover. Spelling out
          // `grayscale(0%)` at rest costs nothing visually and lets both
          // functions animate as numbers.
          filter:
            isAnyHovered && !isHovered
              ? "brightness(0.3) grayscale(80%)"
              : "brightness(0.85) grayscale(0%)",
        }}
        transition={smoothTween}
        className="absolute inset-0 h-full w-full object-cover"
      />

      <motion.div
        animate={{
          opacity: isHovered ? 1 : 0.6,
        }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent"
      />

      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-30 transition-opacity duration-700 group-hover:opacity-60" />

      <div className="pointer-events-none absolute inset-0 z-10 rounded-[20px] border border-white/10 transition-opacity duration-500 group-hover:opacity-0" />

      <TracingBorder
        active={isHovered}
        radius={20}
        gradientId={`bs-trace-${project.id}`}
        color="#2E5BFF"
      />

      <div className="absolute inset-0 z-20 flex flex-col justify-between p-8 md:p-10">
        <motion.div
          animate={{
            opacity: isHovered ? 0 : 1,
            y: isHovered ? -10 : 0,
          }}
          transition={smoothTween}
          className="flex items-start justify-between"
        >
          <div>
            <h3 className="text-2xl font-medium tracking-tight text-white md:text-3xl">
              {project.title}
            </h3>
          </div>
        </motion.div>

        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{
                opacity: 0,
                y: 30,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: 15,
              }}
              transition={{
                type: "spring",
                stiffness: 120,
                damping: 20,
              }}
              className="max-w-md"
            >
              <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-zinc-400">
                Featured Case
              </p>

              <h3 className="text-4xl font-semibold tracking-tight text-white md:text-5xl lg:text-6xl">
                {project.title}
              </h3>

              <p className="mt-5 text-sm font-light leading-relaxed text-zinc-300 md:text-base">
                {project.description}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Cover link rather than wrapping the card: the `motion.div` above IS
          the flex item whose `flex` value animates, so putting an anchor
          around it would hand the animated property to a non-flex-item and
          collapse the row. Same overlay idiom as home/PortfolioSection. z-30
          clears the z-20 content, which is inert text — there is nothing else
          interactive inside the card to shadow. */}
      <Link
        href={project.href}
        className="absolute inset-0 z-30 rounded-[20px]"
        aria-label={`View ${project.title}`}
      />
    </motion.div>
  );
}
