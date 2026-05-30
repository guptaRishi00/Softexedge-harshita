"use client";

import { motion, type Variants, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import DynamicButton from "../ui/DynamicButton";

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
    <section className="w-full bg-white py-20 text-black md:py-32">
      <div className="mx-auto w-full px-6 md:px-10">
        {/* HEADER (KEPT EXACTLY AS IT WAS) */}
        <div className="mb-12 flex flex-col items-start justify-between gap-8 md:mb-20 md:flex-row md:items-end">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, margin: "-50px" }}
            className="flex flex-col items-start"
          >
            <h2 className="text-4xl font-bold tracking-tight text-zinc-900 md:text-5xl lg:text-[4.5rem] lg:leading-[1.05]">
              Thoughts &{/* Rotating Gradient Text */}
              <span className="inline-grid overflow-hidden py-1">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={index}
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -30, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="col-start-1 row-start-1 bg-gradient-to-r pl-3 leading-[1.3em] from-[#2E5BFF] to-[#149CCB] bg-clip-text text-transparent pr-2"
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

        {/* 2-COLUMN GRID WITH REDESIGNED CARDS */}
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
              <div className="relative mb-8 w-full overflow-hidden rounded-[1.5rem] aspect-[4/3] lg:aspect-[16/10] bg-zinc-100">
                {/* Image */}
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-[0.16,1,0.3,1] group-hover:scale-105"
                />

                {/* Subtle dark gradient overlay to make the tag pop */}
                <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </div>

              {/* CARD CONTENT */}
              <div className="flex flex-1 flex-col px-2">
                {/* Meta details: Author & Read Time */}
                <div className="mb-5 flex items-center gap-3 text-sm font-semibold text-zinc-500 uppercase tracking-wider">
                  <span className="text-zinc-900">{post.author}</span>
                  <div className="h-1 w-1 rounded-full bg-zinc-300" />
                  <span>{post.readTime} read</span>
                </div>

                {/* Title */}
                <h3 className="mb-8 text-2xl font-bold leading-snug tracking-tight text-zinc-900 transition-colors duration-300 group-hover:text-[#2E5BFF] lg:text-[1.75rem]">
                  {post.title}
                </h3>

                {/* Footer Read Link */}
                <div className="mt-auto flex items-center gap-3 border-t border-zinc-200 pt-5">
                  <span className="text-sm font-bold uppercase tracking-widest text-zinc-900 transition-colors duration-300 group-hover:text-[#2E5BFF]">
                    Read Article
                  </span>

                  {/* Sliding Arrow Icon */}
                  <div className="relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-zinc-100 text-zinc-900 transition-colors duration-300 group-hover:bg-[#2E5BFF] group-hover:text-white">
                    <ArrowRight className="absolute h-4 w-4 -translate-x-[150%] transition-transform duration-300 ease-[0.16,1,0.3,1] group-hover:translate-x-0" />
                    <ArrowRight className="absolute h-4 w-4 transition-transform duration-300 ease-[0.16,1,0.3,1] group-hover:translate-x-[150%]" />
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
