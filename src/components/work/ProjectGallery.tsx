"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { Project } from "@/data/projects";

const premiumEase = [0.16, 1, 0.3, 1] as const;

export default function ProjectGallery({
  project,
  images,
}: {
  project: Project;
  images?: string[];
}) {
  const gallery = images ?? project.gallery ?? [];
  if (gallery.length === 0) return null;

  return (
    <section className="bg-[#0a0a0a] px-4 pb-12 max-md:px-3 md:px-10 md:pb-16">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-9 md:gap-8">
          {gallery.map((image, index) => {
            const wide = index % 2 === 0;
            const lonelyLast = index === gallery.length - 1 && wide;
            const gridClass = lonelyLast
              ? "md:col-span-3"
              : wide
                ? "md:col-span-2"
                : "md:col-span-1";

            return (
              <motion.div
                key={image}
                data-no-mobile-entry
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: premiumEase }}
                className={`relative w-full overflow-hidden rounded-2xl md:rounded-[40px] bg-white/5 aspect-[4/3] md:aspect-auto md:min-h-[400px] lg:min-h-[500px] ${gridClass}`}
              >
                <Image
                  src={image}
                  alt={`${project.title} — view ${index + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1400px) 66vw, 930px"
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
