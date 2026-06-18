"use client";

import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";

const projects = [
  {
    id: "01",
    title: "Global FinTech Rebrand",
    description:
      "A complete strategic and visual overhaul for a leading financial institution, modernizing their digital presence and driving a 40% increase in user engagement.",
    images: [
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1556761175-4b46a572b786?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1600&auto=format&fit=crop",
    ],
  },
  {
    id: "02",
    title: "E-Commerce Platform",
    description:
      "Architecting a scalable, headless commerce experience for a luxury retail brand. The new architecture resulted in lightning-fast load times and seamless checkout flows.",
    images: [
      "https://images.unsplash.com/photo-1555421689-491a97ff2040?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1600&auto=format&fit=crop",
    ],
  },
  {
    id: "03",
    title: "AI Healthcare App",
    description:
      "Designing an intuitive, accessible patient interface powered by machine learning. We turned complex medical data into clear, actionable insights for everyday users.",
    images: [
      "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?q=80&w=1600&auto=format&fit=crop",
    ],
  },
  {
    id: "04",
    title: "Automotive Web3 Experience",
    description:
      "A groundbreaking digital showroom allowing users to customize and mint digital assets. We pushed the boundaries of WebGL to create a highly immersive interactive environment.",
    images: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=1600&auto=format&fit=crop",
    ],
  },
];

const ProjectCard = ({
  project,
  hoveredId,
  setHoveredId,
}: {
  project: (typeof projects)[0];
  hoveredId: string | null;
  setHoveredId: (id: string | null) => void;
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const isActive = hoveredId === project.id;
  const isAnyHovered = hoveredId !== null;

  // Auto-carousel timer for background images
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [project.images.length]);

  return (
    <motion.div
      onMouseEnter={() => setHoveredId(project.id)}
      onMouseLeave={() => setHoveredId(null)}
      animate={{
        flex: isActive ? 4 : isAnyHovered ? 0.75 : 1,
      }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-col justify-end overflow-hidden rounded-3xl bg-zinc-900 border border-white/5 cursor-pointer"
    >
      {/* Background Image Carousel */}
      <div className="absolute inset-0 z-0 h-full w-full overflow-hidden bg-zinc-900">
        <div className="relative h-full w-full transition-transform duration-700 ease-[0.22,1,0.36,1] group-hover:scale-105">
          <AnimatePresence mode="popLayout">
            <motion.img
              key={currentImageIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              src={project.images[currentImageIndex]}
              alt={`${project.title} showcase`}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </AnimatePresence>
        </div>
      </div>

      {/* Smooth Gradient Overlay (Lightens up when not hovered for a cleaner look) */}
      <div
        className="absolute inset-0 z-10 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-500 ease-out"
        style={{ opacity: isActive ? 1 : 0.3 }}
      />

      {/* Content Overlay */}
      <div className="absolute inset-x-0 bottom-0 z-20 flex w-full flex-col justify-end p-6 md:p-8">
        {/* Project ID Indicator (Always visible) */}
        <div className="mb-4 flex items-center gap-3">
          <div className="h-[2px] w-6 md:w-8 rounded-full bg-gradient-to-r from-[#2E5BFF] to-[#149CCB]" />
        </div>

        {/* Text Container - Only mounts/shows when isActive is true */}
        <AnimatePresence>
          {isActive && (
            <motion.div
              initial={{ opacity: 0, y: 15, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: 10, height: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="flex flex-col gap-3 min-w-[250px] md:min-w-[300px]"
            >
              <h3 className="font-semibold tracking-tight text-white text-2xl md:text-3xl lg:text-4xl whitespace-nowrap overflow-hidden text-ellipsis">
                {project.title}
              </h3>

              <p className="text-zinc-300 font-light leading-relaxed text-sm md:text-base line-clamp-3 md:line-clamp-2 max-w-lg">
                {project.description}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Minimalist Arrow Icon */}
      </div>
    </motion.div>
  );
};

export default function ProcessSectionNew() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section className="w-full bg-[#0A0A0A] px-6 py-24 md:px-12 lg:px-20 lg:py-32">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-12 md:mb-16">
          <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.3em] text-zinc-500">
            Selected Works
          </span>
          <h2 className="text-4xl font-medium tracking-tight text-white md:text-5xl lg:text-7xl">
            Our recent <br className="hidden md:block" />
            <span className="bg-gradient-to-r from-[#2E5BFF] to-[#149CCB] bg-clip-text text-transparent">
              transformations.
            </span>
          </h2>
        </div>

        {/* Flex Accordion Container */}
        <div className="flex flex-col md:flex-row gap-4 w-full h-[800px] md:h-[500px] lg:h-[600px]">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              hoveredId={hoveredId}
              setHoveredId={setHoveredId}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
