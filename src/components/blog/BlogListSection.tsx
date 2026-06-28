"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { MdArrowOutward } from "react-icons/md";

const premiumEase = [0.16, 1, 0.3, 1] as const;

const smoothSpring = {
  type: "spring",
  stiffness: 100,
  damping: 24,
  mass: 1,
} as const;

const categories = [
  "All",
  "Company News",
  "Resources",
  "Guides",
  "Case Studies",
] as const;

type Category = (typeof categories)[number];

interface BlogPost {
  id: number;
  title: string;
  author: string;
  readTime: string;
  category: Category;
  image: string;
  href: string;
  excerpt: string;
  featured?: boolean;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title:
      "Google IO 2026: What Your C-Suite Needs to Know (AI Mode Google Guide UPDATED)",
    author: "Carrie Rose",
    readTime: "15 mins",
    category: "Resources",
    image:
      "https://images.unsplash.com/photo-1780006015851-2d1b3bcadbfd?w=600&auto=format&fit=crop&q=60",
    href: "/blog/google-io-2026",
    excerpt:
      "A comprehensive breakdown of the most significant announcements at Google IO, specifically tailored for enterprise leaders looking to implement new AI models.",
    featured: true,
  },
  {
    id: 2,
    title:
      "Rise at Seven Exits Sheffield and Triples Manchester as new HQ as they go for global expansion",
    author: "Ray Saddiq",
    readTime: "8 mins",
    category: "Company News",
    image:
      "https://plus.unsplash.com/premium_photo-1776661561367-93c4100618d6?w=600&auto=format&fit=crop&q=60",
    href: "/blog/rise-at-seven-expansion",
    excerpt:
      "Our journey to global expansion continues with a major strategic move to triple our presence in Manchester.",
  },
  {
    id: 3,
    title:
      "The Future of Framer Motion: Building Fluid Interfaces for the Next Decade",
    author: "Elena Rodriguez",
    readTime: "12 mins",
    category: "Guides",
    image:
      "https://images.unsplash.com/photo-1773332611613-dbdc64f09807?w=600&auto=format&fit=crop&q=60",
    href: "/blog/future-framer-motion",
    excerpt:
      "Explore the advanced techniques and undocumented features that will help you build the most fluid interfaces.",
  },
  {
    id: 4,
    title: "How We Reduced Cloud Costs by 40% Without Sacrificing Performance",
    author: "David Chen",
    readTime: "10 mins",
    category: "Case Studies",
    image:
      "https://images.unsplash.com/photo-1654875185977-4a97176ef3f9?w=600&auto=format&fit=crop&q=60",
    href: "/blog/cloud-cost-reduction",
    excerpt:
      "A deep dive into our infrastructure optimization process and the tools we used to cut costs dramatically.",
  },
  {
    id: 5,
    title: "Designing for Accessibility: Beyond Color Contrast",
    author: "Sarah Jenkins",
    readTime: "7 mins",
    category: "Resources",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=60",
    href: "/blog/designing-accessibility",
    excerpt:
      "Accessibility is more than just passing contrast checkers. Learn how to design true inclusive digital experiences.",
  },
  {
    id: 6,
    title: "Q3 Company Retreat: Aligning Our Vision for 2027",
    author: "Ray Saddiq",
    readTime: "5 mins",
    category: "Company News",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&auto=format&fit=crop&q=60",
    href: "/blog/q3-retreat",
    excerpt:
      "Key takeaways and strategic alignments from our latest executive leadership retreat in the Swiss Alps.",
  },
];

export default function BlogListSection() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const filteredPosts =
    activeCategory === "All"
      ? blogPosts
      : blogPosts.filter((p) => p.category === activeCategory);

  return (
    <section className="relative overflow-hidden bg-[#0a0a0a] py-24 font-sans text-white md:py-32">
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
          className="max-w-lg text-lg font-light leading-[1.4em] text-white/60 md:text-left"
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
              onClick={() => setActiveCategory(category)}
              className="relative rounded-full px-5 py-2.5 text-sm font-medium transition-colors duration-300"
            >
              {/* Active pill background with layoutId animation */}
              {activeCategory === category && (
                <motion.div
                  layoutId="blogCategory"
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

      {/* Blog Grid */}
      <div className="relative mx-auto w-full px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: premiumEase }}
            className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 md:gap-8"
          >
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
        {/* Animated gradient border on hover */}
        <div
          className="pointer-events-none absolute inset-0 z-10 overflow-hidden rounded-[20px] p-[2px] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            WebkitMask:
              "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          }}
        >
          <div
            className="absolute left-[-50%] top-[-50%] h-[200%] w-[200%] group-hover:[animation:spin_2.2s_linear_infinite]"
            style={{
              background:
                "conic-gradient(from 0deg, transparent 0deg, #2E5BFF 30deg, #149CCB 65deg, transparent 100deg, transparent 260deg, #149CCB 295deg, #2E5BFF 330deg, transparent 360deg)",
              willChange: "transform",
            }}
          />
        </div>

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
              className={`font-bold tracking-tight text-white transition-colors duration-300 group-hover:text-[#149CCB] ${post.featured ? "text-2xl md:text-3xl lg:text-4xl" : "text-xl md:text-2xl"}`}
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
