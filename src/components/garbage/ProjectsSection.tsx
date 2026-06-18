"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import DynamicButton from "../ui/DynamicButton";

const premiumEase = [0.22, 1, 0.36, 1] as const;

// Example project data
const projects = [
  {
    id: "01",
    client: "Aura Dynamics",
    category: "Brand Strategy & UI",
    image:
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1600&auto=format&fit=crop",
    link: "/portfolio/aura",
  },
  {
    id: "02",
    client: "Nexus Finance",
    category: "Web App & Motion",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1600&auto=format&fit=crop",
    link: "/portfolio/nexus",
  },
  {
    id: "03",
    client: "Vela Studio",
    category: "eCommerce Platform",
    image:
      "https://images.unsplash.com/photo-1592503254549-d83d24a4dfab?q=80&w=1600&auto=format&fit=crop",
    link: "/portfolio/vela",
  },
  {
    id: "04",
    client: "Kore Architecture",
    category: "Identity & Web Design",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1600&auto=format&fit=crop",
    link: "/portfolio/kore",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: premiumEase },
  },
};

// Component for the rotating gradient text
function RotatingWord({
  words,
  activeIndex,
}: {
  words: string[];
  activeIndex: number;
}) {
  const index = activeIndex % words.length;

  return (
    <span className="relative flex items-center justify-center overflow-hidden px-1 py-1 -my-1">
      <AnimatePresence mode="popLayout">
        <motion.span
          key={index}
          initial={{ y: "100%" }}
          animate={{ y: "0%" }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.6, ease: premiumEase }}
          className="block bg-gradient-to-r from-[#3445E7] via-[#2F85EA] to-[#07D6F3] bg-clip-text text-transparent pb-2"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export default function ProjectsSection() {
  const [wordIndex, setWordIndex] = useState(0);

  // Cycle the word every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => prev + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-white py-24 md:py-32 px-6 md:px-12 lg:px-20 text-zinc-900 overflow-hidden">
      <div className="max-w-[1600px] mx-auto w-full">
        {/* Header */}
        <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-8 mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: premiumEase }}
            className="flex-1"
          >
            <p className="text-zinc-500 font-medium tracking-[0.2em] uppercase mb-4 text-sm">
              Selected Works
            </p>

            {/* Single-Line Title with Rotating Word */}
            <h2 className="flex flex-wrap items-center gap-x-3 text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight text-zinc-900 leading-none">
              <span>Building digital</span>
              <RotatingWord
                words={["legacies.", "experiences.", "products.", "futures."]}
                activeIndex={wordIndex}
              />
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: premiumEase }}
            className="hidden xl:block shrink-0 mb-2"
          >
            <DynamicButton
              text="View All Projects"
              href="/portfolio"
              className="border border-zinc-200 hover:border-zinc-300 text-zinc-900 transition-colors py-4 px-6 rounded-xl"
            />
          </motion.div>
        </div>

        {/* Project Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-x-12 md:gap-y-20"
        >
          {projects.map((project) => (
            <motion.div variants={itemVariants} key={project.id}>
              <Link
                href={project.link}
                className="group flex flex-col gap-5 block"
              >
                {/* Image Container */}
                <div className="relative w-full aspect-[4/3] md:aspect-[4/5] lg:aspect-[4/3] overflow-hidden rounded-2xl md:rounded-[24px] bg-zinc-100 border border-zinc-200">
                  <img
                    src={project.image}
                    alt={project.client}
                    className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                  />
                  {/* Subtle Light Overlay on hover */}
                  <div className="absolute inset-0 bg-white/10 group-hover:bg-white/0 transition-colors duration-500 pointer-events-none" />
                </div>

                {/* Project Info */}
                <div className="flex flex-col gap-1 px-1">
                  <p className="text-sm font-mono tracking-widest uppercase text-transparent bg-gradient-to-r from-[#3445E7] to-[#07D6F3] bg-clip-text w-fit">
                    {project.category}
                  </p>
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl md:text-3xl font-medium tracking-tight text-zinc-900 group-hover:text-[#2F85EA] transition-colors duration-300">
                      {project.client}
                    </h3>

                    {/* Minimal Arrow Icon */}
                    <div className="w-8 h-8 rounded-full border border-zinc-200 text-zinc-900 flex items-center justify-center opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 group-hover:border-[#2F85EA] group-hover:text-[#2F85EA]">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile View All Button */}
        <div className="mt-16 block xl:hidden flex justify-center">
          <DynamicButton
            text="View All Projects"
            href="/portfolio"
            className="border border-zinc-200 hover:border-zinc-300 text-zinc-900 transition-colors py-4 px-6 rounded-xl w-full text-center"
          />
        </div>
      </div>
    </section>
  );
}
