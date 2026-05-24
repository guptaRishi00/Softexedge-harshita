// src/components/home/BlogSection.tsx
"use client";

import { motion, type Variants, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import DynamicButton from "../ui/DynamicButton";

// Reduced to exactly two posts for the new layout
const blogPosts = [
  {
    id: 1,
    title:
      "Google IO 2026: What Your C-Suite Needs to Know (AI Mode Google Guide UPDATED)",
    author: "Carrie Rose",
    readTime: "15 mins",
    tag: "Resources",
    image:
      "https://plus.unsplash.com/premium_photo-1726739717949-6c5079fa9a08?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Z29vZ2xlJTIwYWl8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: 2,
    title:
      "Rise at Seven Exits Sheffield and Triples Manchester as new HQ as they go for global expansion",
    author: "Ray Saddiq",
    readTime: "8 mins",
    tag: "Company News",
    image: "/assets/google.webp",
  },
];

// --- ANIMATION VARIANTS ---
const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const fadeUpVariant: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const rotatingWords = ["Perspectives.", "Insights.", "Ideas.", "Stories."];

export default function BlogSection() {
  const [index, setIndex] = useState(0);

  // Cycle through the words every 2.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full bg-[#f8f9fa] py-20 text-black md:py-32">
      <div className="mx-auto w-full px-6 md:px-10">
        {/* HEADER */}
        <div className="mb-12 flex flex-col items-start justify-between gap-8 md:mb-20 md:flex-row md:items-end">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, margin: "-50px" }}
            className="flex flex-col items-start"
          >
            <h2 className="text-4xl font-black tracking-tight text-zinc-900 md:text-5xl lg:text-[4.5rem] lg:leading-[1.05]">
              Thoughts & <br />
              {/* Rotating Gradient Text */}
              <span className="inline-grid overflow-hidden py-1">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={index}
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -30, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="col-start-1 row-start-1 bg-gradient-to-r leading-[1.3em] from-[#2E5BFF] to-[#149CCB] bg-clip-text text-transparent pr-2"
                  >
                    {rotatingWords[index]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </h2>
          </motion.div>

          <DynamicButton
            href="/blog"
            text="Explore all articles"
            className="border border-black/20 rounded-2xl py-5 text-sm"
          />
        </div>

        {/* 2-COLUMN GRID */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:gap-16"
        >
          {blogPosts.map((post) => (
            <motion.article
              key={post.id}
              variants={fadeUpVariant}
              className="group flex cursor-pointer flex-col"
            >
              {/* IMAGE CONTAINER */}
              <div className="relative mb-6 w-full overflow-hidden rounded-[2rem] aspect-[4/3] lg:aspect-[16/10] bg-zinc-200 border border-black/5">
                {/* Floating Tag */}
                {post.tag && (
                  <div className="absolute left-6 top-6 z-20 rounded-full bg-white/90 px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider text-zinc-900 shadow-sm backdrop-blur-md">
                    {post.tag}
                  </div>
                )}

                {/* Subtle Hover overlay */}
                <div className="absolute inset-0 z-10 bg-black/0 transition-colors duration-500 group-hover:bg-black/5" />

                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-[0.16,1,0.3,1] group-hover:scale-105"
                />
              </div>

              {/* CARD CONTENT */}
              <div className="flex flex-col px-2">
                {/* Meta details: Author & Read Time */}
                <div className="mb-4 flex items-center gap-4 text-sm font-medium text-zinc-500">
                  {/* Author */}
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-6 w-6 items-center justify-center overflow-hidden rounded-full bg-zinc-200 text-zinc-400">
                      <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-4 w-4"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span>{post.author}</span>
                  </div>

                  {/* Bullet Separator */}
                  <div className="h-1 w-1 rounded-full bg-zinc-300" />

                  {/* Read Time */}
                  <div className="flex items-center gap-1.5">
                    <span>{post.readTime} read</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-medium leading-[1.3] tracking-tight text-zinc-900 transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-[#2E5BFF] group-hover:to-[#149CCB] group-hover:bg-clip-text group-hover:text-transparent lg:text-[1.75rem]">
                  {post.title}
                </h3>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
