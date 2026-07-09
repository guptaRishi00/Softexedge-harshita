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
          {project.gallery.slice(0, 4).map((image, index) => {
            // Bento Grid for exactly 4 items:
            // 0: span 2 cols (wide)
            // 1: span 1 col (square/portrait)
            // 2: span 1 col (square/portrait)
            // 3: span 2 cols (wide)

            let gridClass = "";
            if (index === 0 || index === 3) {
              gridClass = "md:col-span-2";
            } else {
              gridClass = "md:col-span-1";
            }

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: premiumEase }}
                className={`relative w-full overflow-hidden rounded-2xl md:rounded-[40px] bg-white/5 aspect-[4/3] md:aspect-auto md:min-h-[400px] lg:min-h-[500px] ${gridClass}`}
              >
                <img
                  src={image}
                  alt={`${project.title} gallery image ${index + 1}`}
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
