"use client";

import { motion, type Variants } from "framer-motion";
import Image from "next/image";

// Data matching the structure in your reference image
const blogPosts = [
  {
    id: 1,
    title:
      "Google IO 2026: What Your C-Suite Needs to Know (AI Mode Google Guide UPDATED)",
    author: "Carrie Rose",
    readTime: "15 mins",
    tag: "Resources",
    image: "/assets/branding.webp", // Replace with your actual image path
  },
  {
    id: 2,
    title: "Rise at Seven Appoints Hollie Lovell as Senior Operations Lead",
    author: "Ray Saddiq",
    readTime: "3 mins",
    image: "/assets/branding.webp",
  },
  {
    id: 3,
    title:
      "Rise at Seven Exits Sheffield and Triples Manchester as new HQ as they go for global expansion",
    author: "Ray Saddiq",
    readTime: "2 mins",
    image: "/assets/branding.webp",
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
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function BlogSection() {
  return (
    <section className="w-full bg-[#F8F9FA] py-20 text-black md:py-32">
      <div className="mx-auto max-w-[90rem] px-6">
        {/* HEADER */}
        <div className="mb-12 flex flex-col items-start justify-between gap-6 md:mb-16 md:flex-row md:items-end">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, margin: "-50px" }}
          >
            <h2 className="text-6xl font-medium tracking-tighter md:text-7xl lg:text-[5.5rem]">
              Blogs
            </h2>
          </motion.div>

          <motion.a
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, margin: "-50px" }}
            href="#"
            className="group flex items-center gap-2 rounded-full border border-zinc-300 bg-white px-5 py-2.5 text-sm font-semibold text-zinc-800 transition-all hover:border-black hover:bg-black hover:text-white"
          >
            Explore More Thoughts
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform group-hover:-translate-y-[2px] group-hover:translate-x-[2px]"
            >
              <path d="M7 7h10v10" />
              <path d="M7 17 17 7" />
            </svg>
          </motion.a>
        </div>

        {/* 3-COLUMN GRID */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 gap-6 md:grid-cols-3"
        >
          {blogPosts.map((post) => (
            <motion.article
              key={post.id}
              variants={fadeUpVariant}
              className="group flex cursor-pointer flex-col"
            >
              {/* IMAGE CONTAINER */}
              {/* The aspect-[4/5] gives it that tall, editorial look from the screenshot */}
              <div className="relative mb-5 w-full overflow-hidden rounded-[2rem] aspect-[4/4.5] md:aspect-[4/4.5] bg-zinc-200">
                {/* Optional Tag (e.g., "Resources") */}
                {post.tag && (
                  <div className="absolute left-5 top-5 z-20 rounded-full bg-white/20 px-4 py-1.5 text-xs font-semibold text-white backdrop-blur-md border border-white/20">
                    {post.tag}
                  </div>
                )}

                {/* Hover overlay to darken slightly on interaction */}
                <div className="absolute inset-0 z-10 bg-black/0 transition-colors duration-500 group-hover:bg-black/10" />

                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-[0.16,1,0.3,1] group-hover:scale-105"
                />
              </div>

              {/* CARD CONTENT */}
              <div className="flex flex-col px-1">
                {/* Meta details: Author & Read Time */}
                <div className="mb-3 flex items-center gap-4 text-[13px] font-semibold text-zinc-500">
                  {/* Author */}
                  <div className="flex items-center gap-2">
                    <div className="h-5 w-5 overflow-hidden rounded-full bg-zinc-300">
                      {/* Using a generic SVG placeholder for the avatar */}
                      <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="text-zinc-500"
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

                  {/* Read Time */}
                  <div className="flex items-center gap-1.5">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                    <span>{post.readTime}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-[1.35rem] font-medium leading-[1.15] tracking-tight text-zinc-900 transition-colors group-hover:text-[#3445E7]">
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
