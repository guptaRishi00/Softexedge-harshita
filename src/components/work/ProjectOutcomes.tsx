"use client";

import { motion } from "framer-motion";
import type { Project } from "@/data/projects";

const premiumEase = [0.16, 1, 0.3, 1] as const;

export default function ProjectOutcomes({ project }: { project: Project }) {
  const phases = [
    {
      step: "01",
      title: "Discovery",
      body: `Mapped ${project.category} objectives, audience, and constraints, aligning stakeholders on a single success metric before any design work began.`,
    },
    {
      step: "02",
      title: "Design & Build",
      body: "Iterated in weekly cycles — design, prototype, build, review — so the working software was always the source of truth, never a deck.",
    },
    {
      step: "03",
      title: "Launch & Optimise",
      body: "Shipped behind a feature flag, measured the metrics that mattered, and ran a 30-day optimisation sprint to close the gap to target.",
    },
  ];

  return (
    <section className="bg-[#0a0a0a] px-4 py-24 max-md:px-3 max-md:pt-16 max-md:pb-20 md:px-10 md:pb-32 md:pt-20">
      <div className="mx-auto max-w-[1400px]">
        <div className="flex flex-col gap-16 lg:flex-row lg:items-start lg:gap-24">
          <motion.figure
            data-no-mobile-entry
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: premiumEase }}
            className="lg:w-1/2 rounded-3xl border border-white/5 bg-[#100F0F] p-8 max-md:relative max-md:flex max-md:min-h-[360px] max-md:flex-col max-md:justify-between max-md:px-5 md:p-12"
          >
            <span className="bg-linear-to-r from-[#2E5BFF] to-[#149CCB] bg-clip-text text-5xl font-bold leading-none text-transparent max-md:hidden">
              &ldquo;
            </span>

            <div className="absolute right-6 top-6 text-white/10 md:hidden">
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <title>Quote</title>
                <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
                <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
              </svg>
            </div>
            <blockquote className="mt-4 text-2xl font-medium leading-[1.3em] tracking-tight text-white max-md:z-10 max-md:mt-14 max-md:text-xl md:text-3xl">
              The team didn&rsquo;t just ship a product — they reframed how we
              think about our {project.category.toLowerCase()} experience. The
              result moved a metric we&rsquo;d been chasing for two quarters.
            </blockquote>
            <figcaption className="mt-8 flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/5 text-sm font-bold text-white/70 max-md:h-10 max-md:w-10">
                {project.title.charAt(0)}
              </div>
              <div className="flex flex-col">
                <span className="text-base font-bold text-white">
                  {project.title} Stakeholder
                </span>
              </div>
            </figcaption>
          </motion.figure>

          <div className="lg:w-1/2">
            <motion.h2
              data-no-mobile-entry
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: premiumEase }}
              className="mb-12 text-3xl font-bold tracking-tight text-white leading-[1.2em] max-md:text-[2.5rem] max-md:leading-[1.11] md:text-4xl"
            >
              How the engagement ran
            </motion.h2>

            <ol className="flex flex-col gap-8">
              {phases.map((phase, i) => (
                <motion.li
                  key={phase.step}
                  data-no-mobile-entry
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.8,
                    delay: i * 0.1,
                    ease: premiumEase,
                  }}
                  className="flex gap-6 md:gap-8"
                >
                  <span className="shrink-0 bg-linear-to-r from-[#2E5BFF] to-[#149CCB] bg-clip-text text-2xl font-bold text-transparent md:text-3xl">
                    {phase.step}
                  </span>
                  <div className="flex flex-col gap-2 border-l border-white/10 pl-6 md:pl-8">
                    <h3 className="text-xl font-bold tracking-tight text-white md:text-2xl">
                      {phase.title}
                    </h3>
                    <p className="text-lg font-light leading-[1.25em] text-white/70">
                      {phase.body}
                    </p>
                  </div>
                </motion.li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
