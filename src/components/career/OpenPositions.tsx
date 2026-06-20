"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  ChevronDown,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import { useState } from "react";
import { MdArrowOutward } from "react-icons/md";

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
    id: "social-media-manager",
    title: "Social Media Manager",
    blurb:
      "Plan, create, and manage content strategies that grow brand presence and drive engagement across platforms.",
    category: "Marketing",
    meta: ["Full-time", "Remote"],
    about:
      "We're looking for a creative and data-driven Social Media Manager to lead and manage our social presence across platforms. You'll be responsible for content strategy, execution, performance tracking, and community engagement — turning ideas into consistent brand impact.",
    responsibilities: [
      "Plan and execute social media strategies aligned with brand and business goals.",
      "Create, schedule, and publish content across Instagram, LinkedIn, Twitter/X, and other relevant platforms.",
      "Write engaging captions, hooks, and CTAs tailored to each platform.",
      "Collaborate with designers, video editors, and marketing teams to produce high-quality content.",
      "Manage content calendars and ensure timely delivery of posts and campaigns.",
      "Monitor analytics, insights, and trends to optimize performance and engagement.",
      "Respond to comments, messages, and build an active online community.",
      "Run end-to-end paid social campaigns (optional).",
      "Stay updated with platform trends, algorithm changes, and best practices.",
    ],
    requirements: [
      "1–3 years of experience managing brand or business social media accounts.",
      "Strong understanding of social media platforms, trends, and content formats.",
      "Excellent written communication and storytelling skills.",
      "Experience with content scheduling and analytics tools.",
      "Ability to manage multiple accounts and deadlines efficiently.",
      "Creative mindset with a keen eye for design.",
    ],
    perks: [
      "Flexible remote work culture.",
      "Competitive salary with performance-based growth.",
      "Opportunity to work on global projects and brands.",
      "Creative, collaborative, and growth-focused environment.",
      "Continuous learning and skill development support.",
    ],
    goodToHave: [
      "Experience working with creative agencies or SaaS brands.",
      "Basic knowledge of paid ads and performance marketing.",
      "Understanding of branding, design principles, and short-form video trends.",
      "Familiarity with tools like Meta Business Suite, Buffer, Hootsuite, or similar.",
    ],
  },
  {
    id: "frontend-developer",
    title: "Frontend Developer",
    blurb:
      "Build responsive, high-performance web interfaces using modern frameworks while ensuring seamless user experiences.",
    category: "Engineering",
    meta: ["Full-time", "Onsite", "Bengaluru, Karnataka"],
    about:
      "We're seeking a Frontend Developer who loves crafting fast, accessible, and pixel-perfect interfaces. You'll work closely with designers and backend engineers to ship polished products that feel effortless to use.",
    responsibilities: [
      "Build and maintain responsive interfaces with React and Next.js.",
      "Translate Figma designs into clean, reusable components.",
      "Optimize applications for speed, accessibility, and SEO.",
      "Integrate REST and GraphQL APIs with robust state management.",
      "Collaborate with designers and backend engineers across the stack.",
    ],
    requirements: [
      "2+ years of experience building production web apps.",
      "Strong command of React, TypeScript, and modern CSS.",
      "Familiarity with Next.js, Tailwind, and component-driven development.",
      "Understanding of web performance and accessibility best practices.",
      "An eye for detail and smooth interaction design.",
    ],
    perks: [
      "Modern, well-equipped onsite studio.",
      "Competitive salary with performance-based growth.",
      "Work on ambitious products with a senior team.",
      "Clear growth path and mentorship.",
    ],
    goodToHave: [
      "Experience with animation libraries like Framer Motion or GSAP.",
      "Familiarity with testing tools and CI workflows.",
      "Contributions to open-source or a strong portfolio.",
    ],
  },
  {
    id: "motion-graphics-editor",
    title: "Motion Graphics & Video Editor",
    blurb:
      "Produce engaging videos, reels, and motion graphics for social media, web, and brand campaigns.",
    category: "Design",
    meta: ["Full-time", "Delhi"],
    about:
      "We want a storyteller who can turn raw footage and ideas into scroll-stopping motion. You'll own the edit from concept to final cut across social, web, and brand campaigns.",
    responsibilities: [
      "Edit short-form and long-form video for social and brand campaigns.",
      "Design motion graphics, transitions, and animated typography.",
      "Collaborate with the content team on concepts and storyboards.",
      "Maintain a consistent visual style across all output.",
      "Manage project files, versions, and timely delivery.",
    ],
    requirements: [
      "2+ years of professional video editing experience.",
      "Proficiency in After Effects, Premiere Pro, or equivalent tools.",
      "Strong sense of pacing, rhythm, and visual storytelling.",
      "Ability to manage multiple projects under deadlines.",
    ],
    perks: [
      "Creative, idea-driven team culture.",
      "Competitive salary with performance-based growth.",
      "Access to top-tier gear and software.",
      "Variety of brands and formats to work on.",
    ],
    goodToHave: [
      "Experience with 3D tools like Blender or Cinema 4D.",
      "Sound design and color grading skills.",
      "A reel showcasing branded motion work.",
    ],
  },
  {
    id: "senior-graphic-designer",
    title: "Senior Graphic Designer",
    blurb:
      "Create high-impact visuals, brand systems, and marketing creatives across digital platforms while maintaining strong brand consistency.",
    category: "Design",
    meta: ["Full-time", "Remote"],
    about:
      "As a Senior Graphic Designer, you'll set the visual bar for our brands. You'll craft cohesive design systems and lead creative execution across campaigns, products, and platforms.",
    responsibilities: [
      "Design brand systems, marketing creatives, and campaign assets.",
      "Own visual consistency across digital and print touchpoints.",
      "Mentor junior designers and review creative output.",
      "Partner with marketing and product teams on creative direction.",
      "Translate briefs into polished, on-brand design.",
    ],
    requirements: [
      "4+ years of graphic design experience, ideally agency or in-house brand.",
      "Mastery of the Adobe Creative Suite and Figma.",
      "Strong portfolio demonstrating brand and campaign work.",
      "Excellent typography, layout, and composition skills.",
    ],
    perks: [
      "Flexible remote work culture.",
      "Competitive salary with performance-based growth.",
      "Creative ownership and a seat at the table.",
      "Continuous learning and skill development support.",
    ],
    goodToHave: [
      "Experience with motion or basic web design.",
      "Familiarity with design ops and component libraries.",
      "Illustration or art-direction experience.",
    ],
  },
];

const categories = ["All Categories", "Marketing", "Engineering", "Design"];

function DetailList({ heading, items }: { heading: string; items: string[] }) {
  return (
    <div>
      <h4 className="text-base font-bold text-zinc-900">{heading}</h4>
      <ul className="mt-4 flex flex-col gap-2.5">
        {items.map((item) => (
          <li
            key={item}
            className="flex gap-3 text-sm leading-relaxed text-zinc-500"
          >
            <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-zinc-400" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function OpenPositions() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All Categories");
  // Each box opens/closes independently; all start closed.
  const [openIds, setOpenIds] = useState<string[]>([]);

  const toggle = (id: string) =>
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );

  const filtered = jobs.filter((job) => {
    const matchesQuery = `${job.title} ${job.blurb}`
      .toLowerCase()
      .includes(query.trim().toLowerCase());
    const matchesCategory =
      category === "All Categories" || job.category === category;
    return matchesQuery && matchesCategory;
  });

  return (
    <section className="w-full bg-white px-6 py-20 text-zinc-900 md:py-28">
      {/* Shared gradient for the Apply arrow icon (defined once to avoid id clashes) */}
      <svg width="0" height="0" className="absolute">
        <title>Apply arrow gradient</title>
        <defs>
          <linearGradient
            id="apply-icon-grad"
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

      <div className="mx-auto w-full">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: premiumEase }}
          className="text-4xl font-bold tracking-tight text-zinc-950 sm:text-5xl md:text-6xl"
        >
          Find Your Career
        </motion.h2>

        {/* Search / filter bar */}
        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
          <label className="flex flex-1 items-center gap-2.5 rounded-full border border-zinc-200 px-5 py-3 transition-colors focus-within:border-zinc-400">
            <Search className="h-4 w-4 shrink-0 text-zinc-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search Job"
              aria-label="Search jobs"
              className="w-full bg-transparent text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none"
            />
          </label>

          <div className="relative">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              aria-label="Filter by job category"
              className="w-full cursor-pointer appearance-none rounded-full border border-zinc-200 py-3 pl-5 pr-12 text-sm text-zinc-600 transition-colors hover:border-zinc-400 focus:border-zinc-400 focus:outline-none sm:w-auto"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c === "All Categories" ? "Select Job Category" : c}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
          </div>

          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-zinc-200 px-5 py-3 text-sm font-medium text-zinc-600 transition-colors hover:border-zinc-400"
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filters
            <span className="ml-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-zinc-900 px-1.5 text-xs font-semibold text-white">
              {filtered.length}
            </span>
          </button>
        </div>

        {/* Job list — each role is a box that opens/closes independently */}
        <div className="mt-12 flex flex-col gap-4">
          {filtered.map((job) => {
            const open = openIds.includes(job.id);
            return (
              <div
                key={job.id}
                className="rounded-2xl border border-zinc-200 bg-white p-6 transition-colors hover:border-zinc-300 md:p-8"
              >
                <div className="flex flex-col items-start justify-between gap-5 md:flex-row md:items-center">
                  <div className="max-w-2xl">
                    <h3 className="text-2xl font-bold tracking-tight text-zinc-900 md:text-[1.75rem]">
                      {job.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-zinc-500 md:text-base">
                      {job.blurb}
                    </p>
                    <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-zinc-400">
                      {job.meta.join(" · ")}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => toggle(job.id)}
                    aria-expanded={open}
                    className="group inline-flex shrink-0 items-center gap-3 rounded-full bg-zinc-900 py-1.5 pl-5 pr-1.5 text-sm font-semibold text-white transition-colors hover:bg-zinc-800"
                  >
                    {open ? "Read Less" : "Read More"}
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-zinc-900">
                      <ArrowUpRight
                        className={`h-4 w-4 transition-transform duration-300 ${
                          open ? "rotate-90" : "group-hover:rotate-45"
                        }`}
                      />
                    </span>
                  </button>
                </div>

                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: premiumEase }}
                      className="overflow-hidden"
                    >
                      <div className="pt-10">
                        {/* About the Role */}
                        <div className="max-w-4xl">
                          <h4 className="text-base font-bold text-zinc-900">
                            About the Role
                          </h4>
                          <p className="mt-4 text-sm leading-relaxed text-zinc-500 md:text-base">
                            {job.about}
                          </p>
                        </div>

                        {/* Two columns: left = Key Responsibilities + Why Work With Us,
                            right = Requirements + Good to Have */}
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

                        {/* Apply — styled like the hero "Search Open Jobs" button */}
                        <a
                          href={`mailto:careers@softexedge.com?subject=Application for ${job.title}`}
                          className="group mt-10 flex h-16 w-fit cursor-pointer items-center justify-between gap-5 rounded-xl border border-transparent bg-white pl-0 pr-2.5 transition-all duration-300 hover:border-black hover:pl-6 hover:pr-3.5"
                        >
                          <span className="text-lg font-bold tracking-tight text-black transition-colors duration-300">
                            Apply Job
                          </span>

                          <div className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl bg-black text-white">
                            <MdArrowOutward className="absolute z-10 h-5 w-5 transition-transform duration-300 group-hover:-translate-y-8 group-hover:translate-x-8" />
                            <MdArrowOutward
                              className="absolute z-10 h-5 w-5 -translate-x-8 translate-y-8 transition-transform duration-300 group-hover:translate-x-0 group-hover:translate-y-0"
                              style={{ fill: "url(#apply-icon-grad)" }}
                            />
                          </div>
                        </a>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}

          {filtered.length === 0 && (
            <p className="py-16 text-center text-sm text-zinc-400">
              No roles match your search.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
