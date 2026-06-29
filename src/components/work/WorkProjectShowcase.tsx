"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { MdArrowOutward } from "react-icons/md";
import BorderGlow from "../ui/BorderGlow";

const premiumEase = [0.16, 1, 0.3, 1] as const;

const smoothSpring = {
  type: "spring",
  stiffness: 100,
  damping: 24,
  mass: 1,
} as const;

const categories = [
  "All",
  "E-Commerce",
  "SaaS",
  "Branding",
  "Campaign",
  "Web App",
] as const;

type Category = (typeof categories)[number];

interface Project {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  tech: string[];
  year: string;
  image: string;
  video?: string;
  category: Category;
  type: "image" | "video";
  href: string;
  featured?: boolean;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Aura Skincare",
    subtitle: "E-Commerce Experience",
    description:
      "Redefining digital beauty retail. We crafted a highly conversion-optimized, visually stunning headless e-commerce platform that elevated Aura's brand positioning and increased online sales by 140% in Q1.",
    tech: ["SHOPIFY", "NEXT.JS", "TAILWIND"],
    year: "2024",
    image: "/assets/zyro-O-Nemx50zDE-unsplash.jpg",
    category: "E-Commerce",
    type: "image",
    href: "/work/aura-skincare",
    featured: true,
  },
  {
    id: 2,
    title: "Finova Dashboard",
    subtitle: "Financial SaaS Platform",
    description:
      "A complete UX/UI overhaul for Finova's enterprise wealth management suite. By simplifying complex data visualizations and streamlining workflows, we reduced user onboarding time by over 60%.",
    tech: ["REACT", "D3.JS", "NODE.JS", "TYPESCRIPT"],
    year: "2024",
    image: "/assets/0d3a38da975f62a06fb71d3837c0c2dd.webp",
    category: "SaaS",
    type: "image",
    href: "/work/finova-dashboard",
  },
  {
    id: 3,
    title: "Lumina Festival",
    subtitle: "Event Branding & Web",
    description:
      "An immersive digital portal for Europe's premier light and sound festival. The site features dynamic WebGL interactions that mirror the festival's physical installations, driving record-breaking ticket sales.",
    tech: ["THREE.JS", "GSAP", "NEXT.JS", "CONTENTFUL"],
    year: "2023",
    image: "/assets/ux-store-jJT2r2n7lYA-unsplash.jpg",
    category: "Branding",
    type: "image",
    href: "/work/lumina-festival",
    featured: true,
  },
  {
    id: 4,
    title: "Nova Workspace",
    subtitle: "Product Launch Campaign",
    description:
      "A high-impact promotional micro-site and cinematic video campaign introducing Nova's next-generation modular office pods to the North American market.",
    tech: ["NEXT.JS", "FRAMER MOTION", "TAILWIND"],
    year: "2024",
    video: "/assets/video3.mp4",
    image: "/assets/f1a35da30130d44c9a129deaf2b6b9f4.webp",
    category: "Campaign",
    type: "video",
    href: "/work/nova-workspace",
  },
  {
    id: 5,
    title: "Zephyr Mobility",
    subtitle: "EV Automotive Marketing",
    description:
      "Launching the future of urban transit. We designed a sleek, high-performance marketing site for Zephyr's flagship electric scooter, focusing on 3D product storytelling and seamless pre-order flows.",
    tech: ["WEBGL", "REACT", "NODE.JS", "STRIPE"],
    year: "2023",
    image: "/assets/fotis-fotopoulos-SyvsTmuuZyM-unsplash.jpg",
    category: "Web App",
    type: "image",
    href: "/work/zephyr-mobility",
  },
  {
    id: 6,
    title: "Cake Commerce",
    subtitle: "Artisan Bakery Platform",
    description:
      "A delightful custom e-commerce experience for an artisan bakery brand, complete with 3D product visualizations, subscription models, and a seamless checkout experience.",
    tech: ["NEXT.JS", "STRIPE", "SANITY", "TAILWIND"],
    year: "2024",
    image: "/assets/cake.png",
    category: "E-Commerce",
    type: "image",
    href: "/work/cake-commerce",
    featured: true,
  },
  {
    id: 7,
    title: "Apex Analytics",
    subtitle: "Data Intelligence Dashboard",
    description:
      "Enterprise-grade analytics dashboard transforming complex datasets into actionable insights. Interactive data visualizations that empowered decision makers to identify trends 3× faster.",
    tech: ["REACT", "D3.JS", "PYTHON", "POSTGRESQL"],
    year: "2024",
    image:
      "/assets/project-dashboard-displaying-key-metrics-like-progress-budget-deadlines.jpg",
    category: "SaaS",
    type: "image",
    href: "/work/apex-analytics",
  },
  {
    id: 8,
    title: "Brand Elevate",
    subtitle: "Corporate Identity System",
    description:
      "A comprehensive brand identity overhaul for a Fortune 500 company, including logo redesign, design system, marketing collateral, and a showcase website that tells their brand story.",
    tech: ["FIGMA", "NEXT.JS", "FRAMER", "GSAP"],
    year: "2023",
    image: "/assets/branding.webp",
    category: "Branding",
    type: "image",
    href: "/work/brand-elevate",
  },
];

export default function WorkProjectShowcase() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section className="relative overflow-hidden bg-[#0a0a0a] px-6 py-24 font-sans text-white md:py-32">
      {/* Subtle noise overlay */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03]" />

      {/* Section Header */}
      <div className="relative mx-auto mb-16 flex w-full flex-col gap-8 md:mb-24 md:flex-row md:items-end md:justify-between">
        <div className="flex flex-col gap-5">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: premiumEase }}
            className="ml-[3px] text-xs font-medium uppercase tracking-[0.25em] text-white/60"
          >
            Case Studies
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: premiumEase }}
            className="text-5xl font-bold leading-[0.9] tracking-tight text-white md:text-7xl lg:text-[5rem]"
          >
            Featured{" "}
            <span className="bg-gradient-to-r from-[#2E5BFF] to-[#149CCB] bg-clip-text pr-3 text-transparent">
              Projects
            </span>
          </motion.h2>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: premiumEase }}
          className="max-w-lg text-lg font-light leading-[1.4em] text-white/60 md:text-left"
        >
          Delivering scalable, high-performance solutions that elevate brands
          and drive measurable results.
        </motion.p>
      </div>

      {/* Category Filter Tabs */}
      <div className="relative mx-auto mb-12 flex w-full md:mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3, ease: premiumEase }}
          className="flex flex-wrap gap-2 md:gap-3"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className="relative rounded-full px-5 py-2.5 text-sm font-medium transition-colors duration-300"
            >
              {/* Active pill background with layoutId animation */}
              {activeCategory === category && (
                <motion.div
                  layoutId="activeCategory"
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-[#2E5BFF] to-[#149CCB]"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span
                className={`relative z-10 transition-colors duration-300 ${
                  activeCategory === category
                    ? "text-white"
                    : "text-white/50 hover:text-white/80"
                }`}
              >
                {category}
              </span>
            </button>
          ))}
        </motion.div>
      </div>

      {/* Project Grid */}
      <div className="relative mx-auto w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: premiumEase }}
            className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8"
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.1,
                  ease: premiumEase,
                }}
                className={project.featured ? "md:col-span-2" : "md:col-span-1"}
              >
                <ProjectCard
                  project={project}
                  isHovered={hoveredId === project.id}
                  isAnyHovered={hoveredId !== null}
                  onHoverStart={() => setHoveredId(project.id)}
                  onHoverEnd={() => setHoveredId(null)}
                />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  isHovered,
  isAnyHovered,
  onHoverStart,
  onHoverEnd,
}: {
  project: Project;
  isHovered: boolean;
  isAnyHovered: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
}) {
  return (
    <Link href={project.href}>
      <motion.div
        onMouseEnter={onHoverStart}
        onMouseLeave={onHoverEnd}
        animate={{
          scale: isHovered ? 1.01 : 1,
        }}
        transition={smoothSpring}
        className="group relative w-full cursor-pointer"
      >
        {/* BorderGlow: cursor-following glowing border around the card */}
        <BorderGlow
          borderRadius={20}
          backgroundColor="#000000"
          colors={["#2E5BFF", "#149CCB", "#7C3AED"]}
          glowColor="218 95 65"
          glowIntensity={2.6}
          glowRadius={50}
          edgeSensitivity={10}
          fillOpacity={0.9}
          className="w-full"
        >
          <div
            className={`relative w-full overflow-hidden rounded-[20px] ${
              project.featured
                ? "h-[400px] md:h-[600px]"
                : "h-[350px] md:h-[500px]"
            }`}
          >
            {/* Background image or video */}
            <motion.div
              animate={{
                scale: isHovered ? 1.06 : 1.02,
                filter:
                  isAnyHovered && !isHovered
                    ? "brightness(0.3) grayscale(80%)"
                    : "brightness(0.7)",
              }}
              transition={smoothSpring}
              className="absolute inset-0 h-full w-full"
            >
              {project.type === "video" && project.video ? (
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="h-full w-full object-cover"
                >
                  <source src={project.video} type="video/mp4" />
                </video>
              ) : (
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              )}
            </motion.div>

            {/* Gradient overlays */}
            <motion.div
              animate={{ opacity: isHovered ? 1 : 0.6 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-30 transition-opacity duration-700 group-hover:opacity-60" />

            {/* Card Content */}
            <div className="absolute inset-0 z-20 flex flex-col justify-between p-8 md:p-10">
              {/* Top: Category + Year */}
              <motion.div
                animate={{
                  opacity: isHovered ? 0 : 1,
                  y: isHovered ? -10 : 0,
                }}
                transition={smoothSpring}
                className="flex items-start justify-between"
              >
                <span className="rounded-md border border-white/20 bg-black/20 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-widest text-white/80 backdrop-blur-md">
                  {project.category}
                </span>
                <span className="text-sm font-medium text-white/50">
                  {project.year}
                </span>
              </motion.div>

              {/* Bottom: Title + Info */}
              <div>
                {/* Default bottom content (visible when not hovered) */}
                <motion.div
                  animate={{
                    opacity: isHovered ? 0 : 1,
                    y: isHovered ? 20 : 0,
                  }}
                  transition={smoothSpring}
                >
                  <h3 className="text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-sm font-medium text-white/60">
                    {project.subtitle}
                  </p>
                </motion.div>

                {/* Hover-revealed content */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 15 }}
                      transition={{
                        type: "spring",
                        stiffness: 120,
                        damping: 20,
                      }}
                      className="absolute bottom-8 left-8 right-8 md:bottom-10 md:left-10 md:right-10"
                    >
                      <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-zinc-400">
                        {project.subtitle}
                      </p>

                      <h3 className="text-4xl font-semibold tracking-tight text-white md:text-5xl lg:text-6xl">
                        {project.title}
                      </h3>

                      <p className="mt-4 max-w-xl text-sm font-light leading-relaxed text-zinc-300 md:text-base">
                        {project.description}
                      </p>

                      {/* Tech tags */}
                      <div className="mt-5 flex flex-wrap gap-2">
                        {project.tech.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-md border border-white/15 bg-white/5 px-3 py-1 text-[0.6rem] font-bold uppercase tracking-widest text-white/80 backdrop-blur-md"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* View Project CTA — matches CtaSection button style */}
                      <div className="mt-6">
                        <span className="group/cta relative inline-flex h-12 w-fit cursor-pointer items-center justify-between gap-3 overflow-hidden rounded-xl pl-0 pr-2 transition-all duration-300 hover:pl-5 hover:pr-2 before:absolute before:inset-0 before:origin-left before:scale-x-0 before:bg-white before:transition-transform before:duration-300 before:ease-out hover:before:scale-x-100">
                          <span className="relative z-10 text-sm font-bold tracking-tight text-white transition-colors duration-300 group-hover/cta:text-black">
                            View Project
                          </span>

                          <span className="relative z-10 flex h-8 w-8 items-center justify-center overflow-hidden rounded-lg bg-white text-black transition-colors duration-300 group-hover/cta:bg-black">
                            <svg width="0" height="0" className="absolute">
                              <title>View project arrow gradient</title>
                              <defs>
                                <linearGradient
                                  id={`cta-icon-grad-${project.id}`}
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

                            <MdArrowOutward className="absolute z-10 h-4 w-4 transition-transform duration-300 group-hover/cta:-translate-y-8 group-hover/cta:translate-x-8" />
                            <MdArrowOutward
                              className="absolute z-10 h-4 w-4 -translate-x-8 translate-y-8 transition-transform duration-300 group-hover/cta:translate-x-0 group-hover/cta:translate-y-0"
                              style={{
                                fill: `url(#cta-icon-grad-${project.id})`,
                              }}
                            />
                          </span>
                        </span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </BorderGlow>
      </motion.div>
    </Link>
  );
}
