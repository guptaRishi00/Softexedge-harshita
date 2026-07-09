"use client";

import { motion } from "framer-motion";
import { MdArrowOutward } from "react-icons/md";
import type { Project } from "@/data/projects";

const premiumEase = [0.16, 1, 0.3, 1] as const;

export default function ProjectDetailsContent({
  project,
}: {
  project: Project;
}) {
  return (
    <section className="bg-[#0a0a0a] px-6 py-24 md:px-12 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-24">
          {/* Sticky Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-32 flex flex-col gap-12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: premiumEase }}
              >
                <h3 className="mb-4 text-sm font-bold uppercase tracking-widest text-white/40">
                  Client
                </h3>
                <p className="text-xl font-medium text-white">
                  {project.title}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1, ease: premiumEase }}
              >
                <h3 className="mb-4 text-sm font-bold uppercase tracking-widest text-white/40">
                  Services
                </h3>
                <p className="text-xl font-medium text-white">
                  {project.category}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2, ease: premiumEase }}
              >
                <h3 className="mb-4 text-sm font-bold uppercase tracking-widest text-white/40">
                  Tech Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-white/80"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3, ease: premiumEase }}
                className="pt-6"
              >
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex w-fit items-center gap-3 overflow-hidden rounded-full bg-white px-6 py-4 text-black transition-transform hover:scale-105"
                >
                  <span className="text-sm font-bold tracking-tight">
                    Visit Live Site
                  </span>
                  <MdArrowOutward className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
                </a>
              </motion.div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-8">
            <div className="flex flex-col gap-24">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: premiumEase }}
              >
                <h2 className="mb-8 text-3xl font-bold tracking-tight text-white md:text-4xl">
                  Overview
                </h2>
                <p className="text-lg font-light leading-relaxed text-white/70 md:text-xl md:leading-loose">
                  {project.description} This project challenged us to rethink
                  standard conventions and deliver an experience that not only
                  meets user needs but sets a new benchmark in the industry.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: premiumEase }}
              >
                <h2 className="mb-8 text-3xl font-bold tracking-tight text-white md:text-4xl">
                  The Challenge
                </h2>
                <p className="text-lg font-light leading-relaxed text-white/70 md:text-xl md:leading-loose">
                  The primary hurdle was unifying a disjointed digital presence
                  into a cohesive, lightning-fast platform. Stakeholders
                  required a solution that could scale effortlessly while
                  maintaining a highly curated, premium aesthetic that resonated
                  with their core demographic.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: premiumEase }}
              >
                <h2 className="mb-8 text-3xl font-bold tracking-tight text-white md:text-4xl">
                  Our Approach
                </h2>
                <p className="text-lg font-light leading-relaxed text-white/70 md:text-xl md:leading-loose">
                  We employed a modern tech stack focused on performance and
                  fluid interactivity. By leveraging advanced animation
                  techniques and an incredibly optimized asset pipeline, we
                  achieved a seamless user journey that feels both instantaneous
                  and deeply engaging.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
