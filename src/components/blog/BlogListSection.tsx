"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MdArrowOutward } from "react-icons/md";
import {
  type BlogPost,
  blogPosts,
  type Category,
  categories,
} from "@/data/blog";
import TracingBorder from "../ui/TracingBorder";

const premiumEase = [0.16, 1, 0.3, 1] as const;

const smoothSpring = {
  type: "spring",
  stiffness: 100,
  damping: 24,
  mass: 1,
} as const;

export default function BlogListSection() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [activeAuthor, setActiveAuthor] = useState<string>("All");
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  // The hero's "By Category" / "By Author" dropdowns drive this list via a
  // window event (the two components are siblings with no shared parent state).
  useEffect(() => {
    const onFilter = (e: Event) => {
      const { type, value } = (e as CustomEvent<{ type: string; value: string }>)
        .detail;
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

  // The featured post opens the page (BlogFeaturedSection), so keep it out of
  // the list to avoid showing it twice.
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
      {/* Subtle noise overlay */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03]" />

      {/* Section Header */}
      <div className="relative mx-auto mb-16 flex w-full flex-col gap-8 px-6 md:mb-24 md:flex-row md:items-end md:justify-between">
        <div className="flex flex-col gap-5">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: premiumEase }}
            className="ml-[3px] text-xs font-medium uppercase tracking-[0.25em] text-white/60"
          >
            Insights & News
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: premiumEase }}
            className="text-5xl font-bold leading-[0.9] tracking-tight text-white md:text-7xl lg:text-[5rem]"
          >
            Explore our{" "}
            <span className="bg-gradient-to-r from-[#2E5BFF] to-[#149CCB] bg-clip-text pr-3 text-transparent">
              thinking.
            </span>
          </motion.h2>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: premiumEase }}
          className="max-w-lg text-lg font-light leading-[1.25em] text-white md:text-left"
        >
          Dive deep into our latest thoughts on technology, design, and business
          strategy.
        </motion.p>
      </div>

      {/* Category Filter Tabs */}
      <div className="relative mx-auto mb-12 flex w-full px-6 md:mb-16">
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
              {/* Active pill background with layoutId animation */}
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

      {/* Blog Grid */}
      <div className="relative mx-auto w-full px-6">
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

function BlogCard({
  post,
  isHovered,
  isAnyHovered,
  onHoverStart,
  onHoverEnd,
}: {
  post: BlogPost;
  isHovered: boolean;
  isAnyHovered: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
}) {
  return (
    <Link href={post.href}>
      <motion.div
        onMouseEnter={onHoverStart}
        onMouseLeave={onHoverEnd}
        animate={{
          scale: isHovered ? 1.01 : 1,
        }}
        transition={smoothSpring}
        className={`group relative flex w-full cursor-pointer flex-col overflow-hidden rounded-[20px] bg-zinc-900/50 backdrop-blur-sm border border-white/5 transition-colors hover:bg-zinc-900 ${
          post.featured
            ? "h-auto md:h-[600px] md:flex-row"
            : "h-auto md:h-[600px]"
        }`}
      >
        {/* Border light that traces the card once on hover and rests at the
            top-right corner. */}
        <TracingBorder
          active={isHovered}
          radius={20}
          color="#2E5BFF"
          gradientId={`blog-trace-${post.id}`}
        />

        {/* Image Section */}
        <div
          className={`relative overflow-hidden ${post.featured ? "h-64 md:h-full md:w-1/2 shrink-0" : "h-60 shrink-0"}`}
        >
          <motion.div
            animate={{
              scale: isHovered ? 1.08 : 1.0,
              filter:
                isAnyHovered && !isHovered
                  ? "brightness(0.5) grayscale(80%)"
                  : "brightness(0.9)",
            }}
            transition={{ ...smoothSpring, duration: 0.8 }}
            className="absolute inset-0 h-full w-full"
          >
            <img
              src={post.image}
              alt={post.title}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </motion.div>
          {/* Overlay for category tag */}
          <div className="absolute left-4 top-4 z-20 md:left-6 md:top-6">
            <span className="rounded-md border border-white/20 bg-black/40 px-3 py-1.5 text-[0.65rem] font-bold uppercase tracking-widest text-white/90 backdrop-blur-md">
              {post.category}
            </span>
          </div>
        </div>

        {/* Content Section */}
        <div
          className={`relative z-20 flex flex-1 flex-col justify-between p-6 md:p-8 ${post.featured ? "md:w-1/2" : ""}`}
        >
          <div>
            <div className="mb-4 flex items-center gap-3 text-xs font-medium text-white/50">
              <span className="text-white/80">{post.author}</span>
              <span className="h-1 w-1 rounded-full bg-white/20" />
              <span>{post.readTime}</span>
            </div>

            <h3
              className={`font-bold tracking-tight text-white ${post.featured ? "text-2xl md:text-3xl lg:text-4xl" : "text-xl md:text-2xl"}`}
            >
              {post.title}
            </h3>

            <p
              className={`mt-4 font-light leading-relaxed text-zinc-400 ${post.featured ? "text-base md:text-lg" : "text-sm md:text-base line-clamp-3"}`}
            >
              {post.excerpt}
            </p>
          </div>

          {/* View Article CTA */}
          <div className="mt-8 flex items-center justify-between">
            <span className="group/cta relative inline-flex h-12 w-fit cursor-pointer items-center justify-between gap-3 overflow-hidden rounded-xl pl-0 pr-2 transition-all duration-300 hover:pl-5 hover:pr-2 before:absolute before:inset-0 before:origin-left before:scale-x-0 before:bg-white before:transition-transform before:duration-300 before:ease-out hover:before:scale-x-100">
              <span className="relative z-10 text-sm font-bold tracking-tight text-white transition-colors duration-300 group-hover/cta:text-black">
                Read Article
              </span>

              <span className="relative z-10 flex h-8 w-8 items-center justify-center overflow-hidden rounded-lg bg-white text-black transition-colors duration-300 group-hover/cta:bg-black">
                <svg width="0" height="0" className="absolute">
                  <title>Read article arrow gradient</title>
                  <defs>
                    <linearGradient
                      id={`cta-blog-icon-grad-${post.id}`}
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
                  style={{ fill: `url(#cta-blog-icon-grad-${post.id})` }}
                />
              </span>
            </span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
