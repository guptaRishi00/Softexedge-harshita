"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import ProjectCard, { premiumEase } from "./ProjectCard";

import {
  categories,
  type Category,
  projects,
} from "@/data/projects";

export default function WorkProjectShowcase() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section className="relative overflow-hidden bg-black px-4 py-24 font-sans text-white md:px-10 md:py-32">
      {/* Subtle noise overlay */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03]" />

      {/* Section Header */}
      <div className="relative mx-auto mb-16 w-full md:mb-24">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: premiumEase }}
          className="mb-5 block ml-[3px] text-xs font-medium uppercase tracking-[0.25em] text-white/60"
        >
          Case Studies
        </motion.span>

        <div className="flex w-full flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: premiumEase }}
            className="text-5xl font-bold leading-[0.9] tracking-tight text-white md:text-7xl lg:text-[5rem]"
          >
            Featured{" "}
            <span className="bg-gradient-to-r from-[#2E5BFF] to-[#149CCB] bg-clip-text pr-3 text-transparent">
              Projects
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: premiumEase }}
            className="max-w-xl text-xl font-light leading-[1.25em] text-white md:text-left"
          >
            Delivering scalable, high-performance solutions that elevate brands
            and drive measurable results.
          </motion.p>
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="relative mx-auto mb-12 flex w-full md:mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3, ease: premiumEase }}
          className="flex flex-wrap gap-2 md:gap-3"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className="relative rounded-full px-5 py-2.5 text-sm font-medium transition-colors duration-300"
            >
              {/* Active pill background with layoutId animation */}
              {activeCategory === category && (
                <motion.div
                  layoutId="activeCategory"
                  className="absolute inset-0 rounded-full border border-white/10 bg-[#100f0f]"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span
                className={`relative z-10 transition-colors duration-300 ${
                  activeCategory === category
                    ? "text-white"
                    : "text-white/50 hover:text-white/80"
                }`}
              >
                {category}
              </span>
            </button>
          ))}
        </motion.div>
      </div>

      {/* Project Grid */}
      <div className="relative mx-auto w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: premiumEase }}
            className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8"
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.1,
                  ease: premiumEase,
                }}
                className={project.featured ? "md:col-span-2" : "md:col-span-1"}
              >
                <ProjectCard
                  project={project}
                  isHovered={hoveredId === project.id}
                  isAnyHovered={hoveredId !== null}
                  onHoverStart={() => setHoveredId(project.id)}
                  onHoverEnd={() => setHoveredId(null)}
                />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
