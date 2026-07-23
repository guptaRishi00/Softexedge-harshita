"use client";

import { motion } from "framer-motion";
import type { Project } from "@/data/projects";

const premiumEase = [0.16, 1, 0.3, 1] as const;

// Post-gallery content: closes the case-study narrative with a client
// testimonial and the engagement timeline, before the "Next Project" CTA.
// Narrative arc: hero (what) → details (how) → gallery (showcase) → here
// (impact + how-it-ran) → next project.
export default function ProjectOutcomes({ project }: { project: Project }) {
  // Three-phase engagement timeline. Illustrative — the phase shape is
  // consistent across projects; the per-project touch is the category label.
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
    <section className="bg-[#0a0a0a] px-6 py-24 md:px-12 md:py-32">
      <div className="mx-auto max-w-[1400px]">
        <div className="mx-auto max-w-3xl">
          {/* ---------- Testimonial ---------- */}
          <motion.figure
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: premiumEase }}
            className="rounded-3xl border border-white/5 bg-[#100F0F] p-8 md:p-12"
          >
            <span className="bg-linear-to-r from-[#2E5BFF] to-[#149CCB] bg-clip-text text-5xl font-bold leading-none text-transparent">
              &ldquo;
            </span>
            <blockquote className="mt-4 text-2xl font-medium leading-[1.3em] tracking-tight text-white md:text-3xl">
              The team didn&rsquo;t just ship a product — they reframed how we
              think about our {project.category.toLowerCase()} experience. The
              result moved a metric we&rsquo;d been chasing for two quarters.
            </blockquote>
            <figcaption className="mt-8 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/5 text-sm font-bold text-white/70">
                {project.title.charAt(0)}
              </div>
              <div className="flex flex-col">
                <span className="text-base font-bold text-white">
                  {project.title} Stakeholder
                </span>
                <span className="text-sm font-medium text-white/50">
                  Illustrative testimonial — replace with a real quote.
                </span>
              </div>
            </figcaption>
          </motion.figure>

          {/* ---------- Engagement timeline ---------- */}
          <div className="mt-24">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: premiumEase }}
              className="mb-12 text-3xl font-bold tracking-tight text-white leading-[1.2em] md:text-4xl"
            >
              How the engagement ran
            </motion.h2>

            <ol className="flex flex-col gap-8">
              {phases.map((phase, i) => (
                <motion.li
                  key={phase.step}
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
