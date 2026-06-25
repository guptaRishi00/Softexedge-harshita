"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, MapPin, Sparkles, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { MdArrowOutward } from "react-icons/md";
import { cn } from "@/lib/utils";

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

// Removed DetailList as we use custom bento cards inline

export default function OpenPositions() {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="w-full bg-black px-10 pt-16 pb-24 md:pt-20 md:pb-32 font-sans selection:bg-[#2E5BFF]/20">
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

        {/* Job List with ServiceSection hover style */}
        <div className="group/list flex w-full flex-col">
          {jobs.map((job, idx) => {
            const open = openId === job.id;
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
                className="group relative flex flex-col"
              >
                {/* Visible Row */}
                {/* biome-ignore lint/a11y/useKeyWithClickEvents: simple expandable row */}
                {/* biome-ignore lint/a11y/noStaticElementInteractions: simple expandable row */}
                <div
                  onClick={() => toggle(job.id)}
                  className="flex w-full cursor-pointer items-center justify-between py-6 md:py-12"
                >
                  {/* Left: Tag Reveal & Title */}
                  <div className="flex items-center">
                    <div
                      className={cn(
                        "relative shrink-0 overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
                        "max-w-0 group-hover:mr-4 group-hover:max-w-[150px] md:group-hover:mr-6",
                      )}
                    >
                      <div className="whitespace-nowrap rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-xs font-medium text-white/80 opacity-0 transition-opacity duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-100 md:text-sm">
                        {job.meta[0].includes(" - ") ? job.meta[0].split(" - ")[1] : job.meta[0]}
                      </div>
                    </div>

                    <h3
                      className={cn(
                        "text-3xl font-medium tracking-tight transition-colors duration-500 sm:text-5xl md:text-[clamp(3rem,6vw,7rem)] leading-none tracking-[-0.04em]",
                        "text-white group-hover/list:text-white/20 group-hover:!text-white",
                      )}
                    >
                      {job.title}
                    </h3>
                  </div>

                  {/* Right: Animated MdArrowOutward */}
                  <div className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/20 text-white transition-colors duration-300 group-hover:border-transparent group-hover:bg-[#1a1a1a] md:h-14 md:w-14">
                    <svg width="0" height="0" className="absolute">
                      <title>Arrow gradient</title>
                      <defs>
                        <linearGradient
                          id={`arrow-grad-${job.id}`}
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

                    <MdArrowOutward
                      className={cn(
                        "absolute z-10 h-5 w-5 transition-transform duration-300 group-hover:-translate-y-8 group-hover:translate-x-8 md:h-6 md:w-6",
                        open ? "rotate-90" : ""
                      )}
                    />
                    <MdArrowOutward
                      className={cn(
                        "absolute z-10 h-5 w-5 -translate-x-8 translate-y-8 transition-transform duration-300 group-hover:translate-x-0 group-hover:translate-y-0 md:h-6 md:w-6",
                        open ? "rotate-90" : ""
                      )}
                      style={{ fill: `url(#arrow-grad-${job.id})` }}
                    />
                  </div>
                </div>

                {/* CUSTOM GRADIENT BORDER */}
                <div
                  className={cn(
                    "absolute bottom-0 left-0 h-[1px] w-full transition-all duration-500 z-20",
                    "bg-white/10 group-hover:bg-transparent group-hover:bg-gradient-to-r group-hover:from-[#2E5BFF] group-hover:to-[#149CCB]",
                  )}
                />

                {/* Hidden Accordion Details */}
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: premiumEase }}
                      className="overflow-hidden"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 pt-6 pb-12">
                        {/* ABOUT THE ROLE - 2 columns */}
                        <div className="md:col-span-2 flex flex-col justify-center rounded-3xl border border-white/10 bg-white/[0.02] p-8 md:p-10 transition-colors hover:bg-white/[0.04]">
                          <h4 className="text-sm font-bold tracking-widest text-[#2E5BFF] uppercase mb-4">About the Role</h4>
                          <p className="text-lg md:text-xl leading-relaxed text-zinc-300 font-medium">
                            {job.about}
                          </p>
                        </div>

                        {/* WHY WORK WITH US - 1 column (Accent Card) */}
                        <div className="md:col-span-1 rounded-3xl border border-white/10 bg-gradient-to-br from-[#2E5BFF]/10 to-[#149CCB]/10 p-8 md:p-10 relative overflow-hidden group/perks">
                          <div className="absolute top-0 right-0 p-6 opacity-20 group-hover/perks:opacity-40 transition-opacity duration-500">
                            <Sparkles className="h-24 w-24 text-[#149CCB] blur-sm" />
                          </div>
                          <h4 className="text-xl font-bold text-white mb-6 flex items-center gap-2 relative z-10">
                            <Sparkles className="h-5 w-5 text-[#149CCB]" />
                            Why Work With Us
                          </h4>
                          <ul className="flex flex-col gap-4 relative z-10">
                            {job.perks.map((perk) => (
                              <li key={perk} className="flex items-start gap-3 text-sm md:text-base text-zinc-300 font-medium">
                                <CheckCircle2 className="mt-[2px] h-5 w-5 shrink-0 text-[#149CCB]" strokeWidth={2.5} />
                                <span>{perk}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* KEY RESPONSIBILITIES - 2 columns */}
                        <div className="md:col-span-2 rounded-3xl border border-white/10 bg-white/[0.02] p-8 md:p-10 transition-colors hover:bg-white/[0.04]">
                          <h4 className="text-xl font-bold text-white mb-6">Key Responsibilities</h4>
                          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
                            {job.responsibilities.map((res) => (
                              <li key={res} className="flex items-start gap-3 text-sm md:text-base text-zinc-400">
                                <div className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#2E5BFF]" />
                                <span>{res}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* REQUIREMENTS - 1 column */}
                        <div className="md:col-span-1 rounded-3xl border border-white/10 bg-white/[0.02] p-8 md:p-10 transition-colors hover:bg-white/[0.04]">
                          <h4 className="text-xl font-bold text-white mb-6">Requirements</h4>
                          <ul className="flex flex-col gap-5">
                            {job.requirements.map((req) => (
                              <li key={req} className="flex items-start gap-3 text-sm md:text-base text-zinc-400">
                                <div className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-white/40" />
                                <span>{req}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* GOOD TO HAVE - 2 columns */}
                        <div className="md:col-span-2 rounded-3xl border border-white/10 bg-white/[0.02] p-8 md:p-10 transition-colors hover:bg-white/[0.04] flex flex-col justify-center">
                          <h4 className="text-xl font-bold text-white mb-6">Good to Have</h4>
                          <div className="flex flex-wrap gap-3">
                            {job.goodToHave.map((good) => (
                              <span key={good} className="rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm md:text-base font-medium text-zinc-300 hover:bg-white/10 transition-colors cursor-default">
                                {good}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* APPLY BUTTON - 1 column CTA block */}
                        <div className="md:col-span-1 rounded-3xl border border-white/10 bg-white/[0.02] p-8 md:p-10 flex flex-col justify-center items-center relative overflow-hidden group/apply hover:border-white/20 transition-all duration-500">
                          <div className="absolute inset-0 bg-gradient-to-t from-[#2E5BFF]/10 to-transparent opacity-0 group-hover/apply:opacity-100 transition-opacity duration-500" />
                          <h4 className="text-lg font-medium text-white mb-6 relative z-10 text-center">Ready to make an impact?</h4>
                          
                          <a
                            href={`mailto:careers@softexedge.com?subject=Application for ${job.title}`}
                            className="group/btn relative z-10 flex h-14 w-full cursor-pointer items-center justify-between gap-4 rounded-xl border border-white/20 bg-black pl-5 pr-2 transition-all duration-300 hover:border-white hover:bg-white"
                          >
                            <span className="text-base font-bold tracking-tight text-white transition-colors duration-300 group-hover/btn:text-black">
                              Apply Now
                            </span>

                            <div className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl bg-white text-black transition-colors duration-300 group-hover/btn:bg-black">
                              <svg width="0" height="0" className="absolute">
                                <title>Apply arrow gradient</title>
                                <defs>
                                  <linearGradient
                                    id={`apply-grad-${job.id}`}
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

                              <MdArrowOutward className="absolute z-10 h-4 w-4 transition-transform duration-300 group-hover/btn:-translate-y-8 group-hover/btn:translate-x-8" />
                              <MdArrowOutward
                                className="absolute z-10 h-4 w-4 -translate-x-8 translate-y-8 transition-transform duration-300 group-hover/btn:translate-x-0 group-hover/btn:translate-y-0"
                                style={{ fill: `url(#apply-grad-${job.id})` }}
                              />
                            </div>
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
