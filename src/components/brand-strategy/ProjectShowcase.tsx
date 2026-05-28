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
      "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1400&auto=format&fit=crop",
    baseFlex: 1.4,
  },
  {
    id: 1,
    title: "Nova Tech",
    description: "Fintech dashboard for modern banking solutions.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1400&auto=format&fit=crop",
    baseFlex: 1,
  },
  {
    id: 2,
    title: "Lumina Vision",
    description: "Immersive VR/AR experience branding.",
    image:
      "https://images.unsplash.com/photo-1617791160505-6f00504e3519?q=80&w=1400&auto=format&fit=crop",
    baseFlex: 2,
  },
  {
    id: 3,
    title: "Apex Dynamics",
    description: "E-commerce platform for high-end sports gear.",
    image:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1400&auto=format&fit=crop",
    baseFlex: 1.7,
  },
  {
    id: 4,
    title: "Nexus Core",
    description: "Cybersecurity infrastructure data visualization.",
    image:
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1400&auto=format&fit=crop",
    baseFlex: 2,
  },
  {
    id: 5,
    title: "Vanguard",
    description: "Web3 decentralized application architecture.",
    image:
      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=1400&auto=format&fit=crop",
    baseFlex: 1,
  },
  {
    id: 6,
    title: "Orbit Media",
    description: "Global streaming service content delivery network.",
    image:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1400&auto=format&fit=crop",
    baseFlex: 1.2,
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
    <section className="relative overflow-hidden bg-black px-4 py-24 text-white md:px-8 md:py-32">
      {/* Noise Texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "url('https://grainy-gradients.vercel.app/noise.svg')",
        }}
      />

      <div className="relative mx-auto flex max-w-[1600px] flex-col gap-14">
        {/* Header */}
        <div className="flex flex-col items-center text-center">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.35em] text-zinc-600 md:text-sm">
            Selected Works
          </p>

          <h2 className="text-5xl font-bold tracking-[-0.05em] md:text-7xl lg:text-[8rem] leading-[0.9]">
            Our Projects
          </h2>

          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-zinc-500 md:text-base">
            Crafted digital experiences blending cinematic interaction,
            editorial layouts, and immersive motion systems.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="flex h-auto w-full flex-col gap-3 md:h-[80vh] md:gap-4">
          {/* ROW 1 */}
          <motion.div
            animate={{
              height: getRowHeight(true),
            }}
            transition={{
              duration: 0.7,
              ease: premiumEase,
            }}
            className="flex h-[320px] w-full flex-col gap-3 md:h-auto md:flex-row md:gap-4"
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
            className="flex h-[420px] w-full flex-col gap-3 md:h-auto md:flex-row md:gap-4"
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
        scale: isHovered ? 1.015 : 1,
      }}
      transition={{
        duration: 0.7,
        ease: premiumEase,
      }}
      // Reduced image border radius to 20px
      className="group relative h-full min-h-[180px] w-full cursor-pointer overflow-hidden rounded-[20px]"
    >
      {/* Background Image */}
      <motion.img
        src={project.image}
        alt={project.title}
        loading="lazy"
        animate={{
          scale: isHovered ? 1.08 : 1.02,
          filter:
            isAnyHovered && !isHovered
              ? "brightness(0.35) grayscale(70%)"
              : "brightness(0.8)",
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
          opacity: isHovered ? 1 : 0.75,
        }}
        transition={{
          duration: 0.5,
        }}
        className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"
      />

      {/* Glass Reflection */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-40 transition-opacity duration-700 group-hover:opacity-70" />

      {/* Border Glow */}
      <div className="absolute inset-0 border border-white/10 rounded-[20px]" />

      {/* Content */}
      <div className="absolute inset-0 z-20 flex flex-col justify-between p-6 md:p-8">
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
            <p className="mb-2 text-xs uppercase tracking-[0.3em] text-zinc-400">
              Project
            </p>

            <h3 className="text-xl font-semibold tracking-tight text-white md:text-2xl">
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
              <p className="mb-3 text-xs uppercase tracking-[0.3em] text-zinc-400">
                Featured Project
              </p>

              <h3 className="text-3xl font-bold tracking-tight text-white md:text-5xl">
                {project.title}
              </h3>

              <p className="mt-4 text-sm leading-relaxed text-zinc-300 md:text-base">
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
                className="mt-6 h-[1px] bg-white/40"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
