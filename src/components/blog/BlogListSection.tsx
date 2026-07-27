"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  blogPosts,
  type Category,
  categories,
} from "@/data/blog";
import BlogCard from "./BlogCard";

const premiumEase = [0.16, 1, 0.3, 1] as const;

export default function BlogListSection() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [activeAuthor, setActiveAuthor] = useState<string>("All");
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  useEffect(() => {
    const onFilter = (e: Event) => {
      const { type, value } = (
        e as CustomEvent<{ type: string; value: string }>
      ).detail;
      if (type === "category") {
        setActiveCategory(value as Category);
        setActiveAuthor("All");
      } else if (type === "author") {
        setActiveAuthor(value);
        setActiveCategory("All");
      }
    };
    window.addEventListener("blog:filter", onFilter);
    return () => window.removeEventListener("blog:filter", onFilter);
  }, []);

  const listPosts = blogPosts.filter((p) => !p.featured);
  const filteredPosts = listPosts.filter(
    (p) =>
      (activeCategory === "All" || p.category === activeCategory) &&
      (activeAuthor === "All" || p.author === activeAuthor),
  );

  return (
    <section
      id="blog-list"
      className="relative overflow-hidden bg-[#0a0a0a] py-24 font-sans text-white md:py-32"
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.03]" />

      <div className="relative mx-auto mb-16 w-full px-4 md:mb-24 md:px-10">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: premiumEase }}
          className="mb-5 block ml-[3px] text-xs font-medium uppercase tracking-[0.25em] text-white/60"
        >
          Insights & News
        </motion.span>

        <div className="flex w-full flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: premiumEase }}
            className="text-5xl font-bold leading-[0.9] tracking-tight text-white md:text-7xl lg:text-[4rem]"
          >
            Explore our{" "}
            <span className="bg-gradient-to-r from-[#2E5BFF] to-[#149CCB] bg-clip-text pr-3 text-transparent">
              thinking.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: premiumEase }}
            className="max-w-xl text-xl font-light leading-[1.25em] text-white md:text-left"
          >
            Dive deep into our latest thoughts on technology, design, and
            business strategy.
          </motion.p>
        </div>
      </div>

      <div className="relative mx-auto mb-12 flex w-full px-4 md:mb-16 md:px-10">
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
              onClick={() => {
                setActiveCategory(category);
                setActiveAuthor("All");
              }}
              className="relative rounded-full px-5 py-2.5 text-sm font-medium transition-colors duration-300"
            >
              {activeCategory === category && (
                <motion.div
                  layoutId="blogCategory"
                  className="absolute inset-0 rounded-full border border-white/10 bg-[#100f0f]"
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

      <div className="relative mx-auto w-full px-4 md:px-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeCategory}-${activeAuthor}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: premiumEase }}
            className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 md:gap-8"
          >
            {filteredPosts.length === 0 && (
              <p className="col-span-full py-16 text-center text-white/50">
                No posts found for this filter.
              </p>
            )}
            {filteredPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.1,
                  ease: premiumEase,
                }}
                className={
                  post.featured
                    ? "md:col-span-2 lg:col-span-2"
                    : "md:col-span-1 lg:col-span-1"
                }
              >
                <BlogCard
                  post={post}
                  isHovered={hoveredId === post.id}
                  isAnyHovered={hoveredId !== null}
                  onHoverStart={() => setHoveredId(post.id)}
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
