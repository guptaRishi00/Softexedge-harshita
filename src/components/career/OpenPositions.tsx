"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, MapPin } from "lucide-react";
import { useState } from "react";

const premiumEase = [0.16, 1, 0.3, 1] as const;

interface Job {
  id: string;
  title: string;
  blurb: string;
  category: string;
  meta: string[];
  about: string;
  responsibilities: string[];
  requirements: string[];
  perks: string[];
  goodToHave: string[];
}

const jobs: Job[] = [
  {
    id: "ui-ux-designer",
    title: "UI UX Designer",
    blurb: "Design beautiful and intuitive digital experiences.",
    category: "Engineering",
    meta: ["Hybrid - Full time", "Mumbai"],
    about:
      "We're looking for an exceptional UI UX Designer to craft stunning digital products. You'll work closely with engineering to build world-class experiences.",
    responsibilities: [
      "Create wireframes, prototypes, and high-fidelity designs.",
      "Conduct user research and usability testing.",
      "Collaborate with developers to ensure pixel-perfect implementation.",
    ],
    requirements: [
      "3+ years of experience in product design.",
      "Expertise in Figma and prototyping tools.",
      "Strong portfolio demonstrating UI and UX skills.",
    ],
    perks: [
      "Flexible hybrid work culture.",
      "Competitive salary and stock options.",
      "Top-tier design equipment.",
    ],
    goodToHave: [
      "Experience with Framer or Webflow.",
      "Basic understanding of frontend development.",
    ],
  },
  {
    id: "marketing-associate",
    title: "Marketing Associate",
    blurb: "Drive growth and brand awareness through creative campaigns.",
    category: "Product",
    meta: ["Onsite - Full time", "Mumbai"],
    about:
      "Join our product team to lead marketing initiatives, manage campaigns, and accelerate user acquisition.",
    responsibilities: [
      "Develop and execute marketing campaigns.",
      "Manage social media accounts and content calendar.",
      "Analyze campaign performance and optimize strategies.",
    ],
    requirements: [
      "1-3 years of marketing experience.",
      "Strong written and verbal communication skills.",
      "Data-driven mindset.",
    ],
    perks: [
      "Vibrant onsite work environment.",
      "Performance-based bonuses.",
      "Clear path to leadership roles.",
    ],
    goodToHave: [
      "Experience with SEO and paid advertising.",
      "Familiarity with analytics tools like Google Analytics.",
    ],
  },
  {
    id: "sales-representative",
    title: "Sales Representative",
    blurb: "Expand our client base and drive revenue growth.",
    category: "Sales",
    meta: ["Onsite - Full time", "Mumbai"],
    about:
      "We are looking for a driven Sales Representative to build relationships with key clients and close high-value deals.",
    responsibilities: [
      "Identify and prospect new sales opportunities.",
      "Conduct product demos and presentations.",
      "Negotiate and close contracts.",
    ],
    requirements: [
      "2+ years of B2B sales experience.",
      "Proven track record of meeting or exceeding quotas.",
      "Excellent negotiation and interpersonal skills.",
    ],
    perks: [
      "Uncapped commission structure.",
      "Travel opportunities.",
      "Comprehensive health benefits.",
    ],
    goodToHave: [
      "Experience selling software or agency services.",
      "Strong network in the tech industry.",
    ],
  },
];

function DetailList({ heading, items }: { heading: string; items: string[] }) {
  return (
    <div>
      <h4 className="text-base font-bold text-white">{heading}</h4>
      <ul className="mt-4 flex flex-col gap-2.5">
        {items.map((item) => (
          <li
            key={item}
            className="flex gap-3 text-sm leading-relaxed text-zinc-400"
          >
            <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-[#2E5BFF]" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function OpenPositions() {
  const [openIds, setOpenIds] = useState<string[]>([]);

  const toggle = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  return (
    <section className="w-full bg-black px-10 py-24 md:py-32 font-sans selection:bg-[#2E5BFF]/20">
      <div className="mx-auto w-full">
        {/* Header matching the image */}
        <div className="flex flex-col items-center mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: premiumEase }}
            className="mb-8 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-white/60"
          >
            Open Positions
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: premiumEase }}
            className="text-4xl font-bold leading-[1.05em] tracking-tighter text-white md:text-5xl lg:text-[6.5rem]"
          >
            Open Positions
          </motion.h2>
        </div>

        {/* Job List matching the image exactly */}
        <div className="flex flex-col border-t border-white/10">
          {jobs.map((job, idx) => {
            const open = openIds.includes(job.id);
            return (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.6,
                  delay: idx * 0.1,
                  ease: premiumEase,
                }}
                className="border-b border-white/10"
              >
                {/* Visible Row */}
                {/* biome-ignore lint/a11y/useKeyWithClickEvents: simple expandable row */}
                {/* biome-ignore lint/a11y/noStaticElementInteractions: simple expandable row */}
                <div
                  onClick={() => toggle(job.id)}
                  className="flex flex-col md:flex-row md:items-center justify-between py-8 cursor-pointer gap-6 px-4 -mx-4 rounded-xl"
                >
                  {/* Left: Title */}
                  <div className="flex-1">
                    <h3 className="text-2xl font-medium tracking-tight text-white">
                      {job.title}
                    </h3>
                  </div>

                  {/* Center: Outline Pills */}
                  <div className="flex flex-wrap items-center gap-2.5 md:gap-3 flex-1 md:justify-center">
                    <span className="rounded-lg border border-white/20 px-4 py-2 text-sm text-zinc-300 font-medium whitespace-nowrap">
                      {job.category}
                    </span>
                    <span className="rounded-lg border border-white/20 px-4 py-2 text-sm text-zinc-300 font-medium whitespace-nowrap">
                      {job.meta[0]}
                    </span>
                    <span className="rounded-lg border border-white/20 px-4 py-2 text-sm text-zinc-300 font-medium flex items-center gap-1.5 whitespace-nowrap">
                      <MapPin className="h-4 w-4 text-zinc-400" />
                      {job.meta[1] || job.meta[0]}
                    </span>
                  </div>

                  {/* Right: Dropdown indicator arrow */}
                  <div className="flex-1 flex md:justify-end">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white">
                      <ChevronDown
                        className={`h-5 w-5 transition-transform duration-300 ${
                          open ? "rotate-180" : ""
                        }`}
                      />
                    </span>
                  </div>
                </div>

                {/* Hidden Accordion Details */}
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: premiumEase }}
                      className="overflow-hidden px-4"
                    >
                      <div className="pb-10 pt-4 border-t border-white/5">
                        <div className="max-w-4xl">
                          <h4 className="text-base font-bold text-white">
                            About the Role
                          </h4>
                          <p className="mt-4 text-sm leading-relaxed text-zinc-400 md:text-base">
                            {job.about}
                          </p>
                        </div>

                        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-2">
                          <div className="flex flex-col gap-10">
                            <DetailList
                              heading="Key Responsibilities"
                              items={job.responsibilities}
                            />
                            <DetailList
                              heading="Why Work With Us"
                              items={job.perks}
                            />
                          </div>
                          <div className="flex flex-col gap-10">
                            <DetailList
                              heading="Requirements"
                              items={job.requirements}
                            />
                            <DetailList
                              heading="Good to Have"
                              items={job.goodToHave}
                            />
                          </div>
                        </div>

                        {/* Apply button — now inside the dropdown */}
                        <div className="mt-10">
                          <a
                            href={`mailto:careers@softexedge.com?subject=Application for ${job.title}`}
                            className="inline-flex items-center justify-center rounded-full bg-linear-to-r from-[#2E5BFF] to-[#149CCB] px-8 py-3 text-sm font-semibold text-white shadow-lg"
                          >
                            Apply Now
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
