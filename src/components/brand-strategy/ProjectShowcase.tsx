"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const premiumEase = [0.22, 1, 0.36, 1] as const;

const projects = [
  {
    id: 0,
    title: "Aura AI",
    description: "Next-gen artificial intelligence platform interface.",
    image:
      "https://plus.unsplash.com/premium_photo-1773861007414-869af2ea91b8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDEyOHxDRHd1d1hKQWJFd3x8ZW58MHx8fHx8",
    baseFlex: 1.4,
  },
  {
    id: 1,
    title: "Nova Tech",
    description: "Fintech dashboard for modern banking solutions.",
    image:
      "https://images.unsplash.com/photo-1775185172840-47fe371943e5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDEwMnxDRHd1d1hKQWJFd3x8ZW58MHx8fHx8",
    baseFlex: 1,
  },
  {
    id: 2,
    title: "Lumina Vision",
    description: "Immersive VR/AR experience branding.",
    image:
      "https://images.unsplash.com/photo-1775887065658-988ef1c262c6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDkyfENEd3V3WEpBYkV3fHxlbnwwfHx8fHw%3D",
    baseFlex: 2,
  },
  {
    id: 3,
    title: "Apex Dynamics",
    description: "E-commerce platform for high-end sports gear.",
    image:
      "https://images.unsplash.com/photo-1772528205616-e65dc0994c7b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDE3OHxDRHd1d1hKQWJFd3x8ZW58MHx8fHx8",
    baseFlex: 1.7,
  },
  {
    id: 4,
    title: "Nexus Core",
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
    <section className="relative overflow-hidden bg-black px-6 py-32 text-white md:px-12 md:py-48 font-sans">
      {/* Noise Texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "url('https://grainy-gradients.vercel.app/noise.svg')",
        }}
      />

      <div className="relative mx-auto flex max-w-[1600px] flex-col gap-20 md:gap-24">
        {/* Header - Left Aligned & Breathable */}
        <div className="flex w-full max-w-4xl flex-col items-start text-left">
          <p className="mb-6 text-xs font-semibold uppercase tracking-[0.35em] text-zinc-500 md:text-sm">
            Selected Works
          </p>

          <h2 className="text-5xl font-bold tracking-tight text-white md:text-7xl lg:text-[7.5rem] leading-[0.9]">
            Our Projects
          </h2>

          <p className="mt-8 max-w-xl text-base font-medium leading-relaxed text-zinc-400 md:text-lg">
            Crafted digital experiences blending cinematic interaction,
            editorial layouts, and immersive motion systems.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="flex h-auto w-full flex-col gap-4 md:h-[80vh] md:gap-6">
          {/* ROW 1 */}
          <motion.div
            animate={{
              height: getRowHeight(true),
            }}
            transition={{
              duration: 0.7,
              ease: premiumEase,
            }}
            className="flex h-[320px] w-full flex-col gap-4 md:h-auto md:flex-row md:gap-6"
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

          {/* ROW 2 */}
          <motion.div
            animate={{
              height: getRowHeight(false),
            }}
            transition={{
              duration: 0.7,
              ease: premiumEase,
            }}
            className="flex h-[420px] w-full flex-col gap-4 md:h-auto md:flex-row md:gap-6"
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
      transition={{
        duration: 0.7,
        ease: premiumEase,
      }}
      // Adjusted border radius to 20px per user request
      className="group relative h-full min-h-[220px] w-full cursor-pointer overflow-hidden rounded-[20px]"
    >
      {/* Background Image */}
      <motion.img
        src={project.image}
        alt={project.title}
        loading="lazy"
        animate={{
          scale: isHovered ? 1.06 : 1.02,
          filter:
            isAnyHovered && !isHovered
              ? "brightness(0.3) grayscale(80%)"
              : "brightness(0.85)",
        }}
        transition={{
          duration: 0.8,
          ease: premiumEase,
        }}
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Permanent Overlay */}
      <motion.div
        animate={{
          opacity: isHovered ? 1 : 0.6,
        }}
        transition={{
          duration: 0.5,
        }}
        className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent"
      />

      {/* Glass Reflection */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-30 transition-opacity duration-700 group-hover:opacity-60" />

      {/* Border Glow - Matched border radius to 20px */}
      <div className="absolute inset-0 rounded-[20px] border border-white/10 transition-colors duration-500 group-hover:border-white/20" />

      {/* Content */}
      <div className="absolute inset-0 z-20 flex flex-col justify-between p-8 md:p-10">
        {/* Idle Title */}
        <motion.div
          animate={{
            opacity: isHovered ? 0 : 1,
            y: isHovered ? -10 : 0,
          }}
          transition={{
            duration: 0.4,
          }}
          className="flex items-start justify-between"
        >
          <div>
            <h3 className="text-2xl font-medium tracking-tight text-white md:text-3xl">
              {project.title}
            </h3>
          </div>
        </motion.div>

        {/* Hover Content */}
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
                duration: 0.5,
                ease: premiumEase,
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

              <motion.div
                initial={{
                  width: 0,
                }}
                animate={{
                  width: "80px",
                }}
                transition={{
                  delay: 0.15,
                  duration: 0.5,
                  ease: premiumEase,
                }}
                className="mt-8 h-[1px] bg-white/40"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
