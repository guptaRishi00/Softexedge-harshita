"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { MdArrowOutward } from "react-icons/md";
import type { BlogPost } from "@/data/blog";
import SpecularBorder from "../ui/SpecularBorder";

// The hover treatment is desktop-only. iOS fires mouseenter on a tap, so a
// tapped card would scale up, zoom its image, dim its siblings and grow a
// specular border — and then hold that state until the next tap elsewhere.
// Tailwind's own hover:/group-hover: rules need no help (v4 already wraps
// them in `@media (hover: hover)`); this covers the framer-motion half,
// which runs off React state and so has to be gated in JS. 48rem === md.
const isDesktopViewport = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(min-width: 48rem)").matches;

const smoothSpring = {
  type: "spring",
  stiffness: 100,
  damping: 24,
  mass: 1,
} as const;

export default function BlogCard({
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
        onMouseEnter={() => {
          if (isDesktopViewport()) onHoverStart();
        }}
        // left unconditional so the state can never stick if the viewport
        // crosses md while a card is hovered
        onMouseLeave={onHoverEnd}
        animate={{
          scale: isHovered ? 1.01 : 1,
        }}
        transition={smoothSpring}
        className="group relative w-full cursor-pointer"
      >
        <div
          className={`relative flex w-full flex-col overflow-hidden rounded-[20px] bg-zinc-900/50 backdrop-blur-sm border border-white/5 transition-colors group-hover:bg-zinc-900 ${
            post.featured
              ? "h-auto md:h-[600px] md:flex-row"
              : "h-auto md:h-[600px]"
          }`}
        >
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
              <Image
                src={post.image}
                alt={post.title}
                loading="lazy"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="h-full w-full object-cover"
              />
            </motion.div>
            <div className="absolute left-4 top-5 z-20 md:left-6 md:top-6">
              <span className="rounded-md border border-white/20 bg-black/40 px-3 py-1.5 text-[0.65rem] font-bold uppercase tracking-widest text-white/90 backdrop-blur-md">
                {post.category}
              </span>
            </div>
          </div>

          <div
            className={`relative z-20 flex flex-1 flex-col justify-between p-6 max-md:py-8 md:p-8 ${post.featured ? "md:w-1/2" : ""}`}
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
                className={`mt-4 max-md:mt-3 font-regular leading-[1.25em] text-zinc-400 ${post.featured ? "text-base md:text-lg" : "text-sm md:text-base line-clamp-3"}`}
              >
                {post.excerpt}
              </p>
            </div>

            <div className="mt-8 flex items-center justify-between max-md:mt-4">
              <span className="group/cta relative inline-flex h-12 w-fit cursor-pointer items-center justify-between gap-3 overflow-hidden rounded-xl pl-0 pr-2 transition-all duration-300 hover:pl-5 hover:pr-2 group-hover:pl-5 group-hover:pr-2 max-md:h-[42px] max-md:gap-2 max-md:rounded-lg max-md:px-3 before:absolute before:inset-0 before:origin-left before:scale-x-0 before:bg-white before:transition-transform before:duration-300 before:ease-out hover:before:scale-x-100 group-hover:before:scale-x-100 max-md:before:scale-x-100">
                <span className="relative z-10 text-sm font-bold tracking-tight text-white transition-colors duration-300 group-hover/cta:text-black group-hover:text-black max-md:text-black">
                  Read Article
                </span>

                <span className="relative z-10 flex h-8 w-8 items-center justify-center overflow-hidden rounded-lg bg-white text-black transition-colors duration-300 group-hover/cta:bg-black group-hover:bg-black max-md:h-7 max-md:w-7 max-md:rounded-md max-md:bg-black">
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

                  <MdArrowOutward className="absolute z-10 h-4 w-4 transition-transform duration-300 group-hover/cta:-translate-y-8 group-hover/cta:translate-x-8 group-hover:-translate-y-8 group-hover:translate-x-8 max-md:h-3.5 max-md:w-3.5 max-md:-translate-y-8 max-md:translate-x-8" />
                  <MdArrowOutward
                    className="absolute z-10 h-4 w-4 -translate-x-8 translate-y-8 transition-transform duration-300 group-hover/cta:translate-x-0 group-hover/cta:translate-y-0 group-hover:translate-x-0 group-hover:translate-y-0 max-md:h-3.5 max-md:w-3.5 max-md:translate-x-0 max-md:translate-y-0"
                    style={{ fill: `url(#cta-blog-icon-grad-${post.id})` }}
                  />
                </span>
              </span>
            </div>
          </div>
        </div>

        {isHovered && <SpecularBorder radius={20} />}
      </motion.div>
    </Link>
  );
}
