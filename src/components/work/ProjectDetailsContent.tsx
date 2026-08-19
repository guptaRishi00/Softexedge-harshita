"use client";

import { motion } from "framer-motion";
import { MdArrowOutward } from "react-icons/md";
import type { Project } from "@/data/projects";
import Section, { premiumEase } from "./ProjectSection";

export default function ProjectDetailsContent({
  project,
}: {
  project: Project;
}) {
  const results = [
    { value: "140%", label: "Engagement lift" },
    { value: "2.4×", label: "Faster delivery" },
    { value: "98", label: "Performance score" },
  ];

  const deliverables = [
    `${project.category} strategy & art direction`,
    ...project.tech.map((t) => `${t} engineering & integration`),
    "Design system, motion language, and QA handoff",
  ];

  return (
    <section className="bg-[#0a0a0a] px-4 py-24 max-md:px-3 max-md:pt-16 max-md:pb-20 md:px-10 md:py-32">
      <div className="w-full">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-24">
          <div className="lg:col-span-4">
            <div className="sticky top-32 flex flex-col gap-12 rounded-2xl border border-white/5 bg-[#100F0F] p-8 max-md:gap-8 md:p-10">
              <motion.div
                data-no-mobile-entry
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: premiumEase }}
              >
                <h3 className="mb-4 text-sm font-bold uppercase tracking-widest text-white/40">
                  Client
                </h3>
                <p className="text-xl font-medium text-white leading-[1.2em]">
                  {project.title}
                </p>
              </motion.div>

              <motion.div
                data-no-mobile-entry
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1, ease: premiumEase }}
              >
                <h3 className="mb-4 text-sm font-bold uppercase tracking-widest text-white/40">
                  Services
                </h3>
                <p className="text-xl font-medium text-white leading-[1.2em]">
                  {project.category}
                </p>
              </motion.div>

              <motion.div
                data-no-mobile-entry
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
                data-no-mobile-entry
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3, ease: premiumEase }}
                className="pt-6 max-md:pt-0"
              >
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex h-14 w-fit cursor-pointer items-center justify-between gap-4 overflow-hidden rounded-xl pl-0 pr-2 transition-all duration-300 hover:border-white hover:pl-6 hover:pr-3.5 before:absolute before:inset-0 before:origin-left before:scale-x-0 before:bg-white before:transition-transform before:duration-300 before:ease-out max-md:h-12 max-md:gap-2.5 max-md:rounded-lg max-md:px-3.5 max-md:before:scale-x-100 hover:before:scale-x-100"
                >
                  <span className="relative z-10 text-base font-bold tracking-tight text-white transition-colors duration-300 max-md:text-sm max-md:text-black group-hover:text-black">
                    Visit Live Site
                  </span>

                  <div className="relative z-10 flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl bg-white text-black transition-colors duration-300 max-md:h-8 max-md:w-8 max-md:rounded-md max-md:bg-black group-hover:bg-black">
                    <svg width="0" height="0" className="absolute">
                      <title>Visit live site arrow gradient</title>
                      <defs>
                        <linearGradient
                          id={`live-site-grad-${project.id}`}
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

                    <MdArrowOutward className="absolute z-10 h-4 w-4 transition-transform duration-300 max-md:h-4 max-md:w-4 max-md:-translate-y-8 max-md:translate-x-8 group-hover:-translate-y-8 group-hover:translate-x-8" />
                    <MdArrowOutward
                      className="absolute z-10 h-4 w-4 -translate-x-8 translate-y-8 transition-transform duration-300 max-md:h-4 max-md:w-4 max-md:translate-x-0 max-md:translate-y-0 group-hover:translate-x-0 group-hover:translate-y-0"
                      style={{ fill: `url(#live-site-grad-${project.id})` }}
                    />
                  </div>
                </a>
              </motion.div>
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="flex max-w-3xl flex-col gap-24 max-md:gap-16">
              <Section heading="Overview">
                <p className="text-lg font-light leading-[1.2em] text-white/70 md:text-xl">
                  {project.description} This project challenged us to rethink
                  standard conventions and deliver an experience that not only
                  meets user needs but sets a new benchmark in the industry.
                </p>
              </Section>

              <Section heading="The Challenge">
                <p className="text-lg font-light leading-[1.2em] text-white/70 md:text-xl">
                  The primary hurdle was unifying a disjointed digital presence
                  into a cohesive, lightning-fast platform. Stakeholders
                  required a solution that could scale effortlessly while
                  maintaining a highly curated, premium aesthetic that resonated
                  with their core demographic.
                </p>
              </Section>

              <Section heading="Our Approach">
                <p className="text-lg font-light leading-[1.2em] text-white/70 md:text-xl">
                  We employed a modern tech stack focused on performance and
                  fluid interactivity. By leveraging advanced animation
                  techniques and an incredibly optimized asset pipeline, we
                  achieved a seamless user journey that feels both instantaneous
                  and deeply engaging.
                </p>
              </Section>

              <Section heading="Key Results">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                  {results.map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-2xl border border-white/5 bg-[#100F0F] p-6"
                    >
                      <p className="bg-linear-to-r from-[#2E5BFF] to-[#149CCB] bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
                        {stat.value}
                      </p>
                      <p className="mt-3 text-sm font-medium uppercase tracking-wider text-white/50">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </Section>

              <Section heading="What We Delivered">
                <ul className="flex flex-col gap-4">
                  {deliverables.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-[#2E5BFF] to-[#149CCB]" />
                      <span className="text-lg font-light leading-[1.25em] text-white/70">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </Section>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
