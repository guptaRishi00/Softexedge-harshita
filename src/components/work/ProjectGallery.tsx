"use client";

import { motion } from "framer-motion";
import type { Project } from "@/data/projects";

const premiumEase = [0.16, 1, 0.3, 1] as const;

export default function ProjectGallery({ project }: { project: Project }) {
  if (!project.gallery || project.gallery.length === 0) return null;

  return (
    <section className="bg-[#0a0a0a] px-6 pb-12 md:px-12 md:pb-16">
      <div className="mx-auto max-w-[1400px]">
        {/* Bento Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {project.gallery.map((image, index) => {
            // Bento rhythm that tiles for any image count, repeating every 4:
            // wide (2 cols) → narrow → narrow → wide. This keeps the varied
            // wide/narrow layout for 4, 6, or more images without stragglers
            // landing awkwardly. Each full 4-cycle fills 6 grid tracks (2 rows).
            const isWide = index % 4 === 0 || index % 4 === 3;
            const gridClass = isWide ? "md:col-span-2" : "md:col-span-1";

            return (
              <motion.div
                key={image}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: premiumEase }}
                className={`relative w-full overflow-hidden rounded-2xl md:rounded-[40px] bg-white/5 aspect-[4/3] md:aspect-auto md:min-h-[400px] lg:min-h-[500px] ${gridClass}`}
              >
                <img
                  src={image}
                  alt={`${project.title} — view ${index + 1}`}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
