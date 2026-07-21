"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Calendar, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { MdArrowOutward } from "react-icons/md";
import { blogPosts } from "@/data/blog";

const premiumEase = [0.16, 1, 0.3, 1] as const;

// Upgrade an unsplash card thumbnail (w=600) to a larger crop.
const wide = (url: string) => url.replace("w=600", "w=1200");

// The blog landing opens with this: one prominent featured article rendered as
// an immersive dark cover — image backdrop, scrim + brand glow, overlaid text.
// Bridges the black spotlight hero above and the dark list below.
export default function BlogFeaturedSection() {
  const reduce = useReducedMotion();
  const featured = blogPosts.find((p) => p.featured) ?? blogPosts[0];

  return (
    <section className="relative w-full bg-[#FAFAFA] px-3 pt-20 pb-16 font-sans selection:bg-[#2E5BFF]/20 md:pb-24">
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: premiumEase }}
        className="group relative mx-auto flex min-h-[560px] w-full flex-col justify-end overflow-hidden rounded-[20px] border border-white/10 bg-black md:min-h-[680px]"
      >
        {/* Backdrop image */}
        <Image
          src={wide(featured.image)}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />

        {/* Scrims: strong bottom-up black for legibility + a soft top fade */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/10" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/50 to-transparent" />

        {/* Brand glow */}
        <div className="pointer-events-none absolute -bottom-24 -left-16 h-80 w-80 rounded-full bg-[#2E5BFF]/30 blur-[110px]" />
        <div className="pointer-events-none absolute -bottom-10 left-1/3 h-64 w-64 rounded-full bg-[#149CCB]/20 blur-[120px]" />

        {/* Whole-card link (stretched — keeps the markup a single anchor) */}
        <Link
          href={featured.href}
          aria-label={featured.title}
          className="absolute inset-0 z-20"
        />

        {/* Top pills */}
        <div className="pointer-events-none absolute left-4 top-6 z-10 flex flex-wrap items-center gap-3 md:left-10 md:top-10">
          <span className="rounded-full border border-white/20 bg-black/40 px-4 py-1.5 text-[0.65rem] font-bold uppercase tracking-widest text-white/90 backdrop-blur-md">
            Featured
          </span>
          <span className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-[0.65rem] font-bold uppercase tracking-widest backdrop-blur-md">
            <span className="bg-gradient-to-r from-[#2E5BFF] to-[#149CCB] bg-clip-text text-transparent">
              {featured.category}
            </span>
          </span>
        </div>

        {/* Bottom content */}
        {/* x-padding (px-4 md:px-10) matches CtaSection; y kept as it was. */}
        <div className="pointer-events-none relative z-10 flex flex-col gap-6 px-4 py-6 md:px-10 md:py-10 lg:py-14">
          <h2 className="max-w-4xl text-3xl font-bold leading-[1.05] tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
            {featured.title}
          </h2>

          <p className="line-clamp-2 max-w-2xl text-base font-medium leading-[1.6] text-white/70 md:text-lg">
            {featured.excerpt}
          </p>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
            <div className="flex items-center gap-3">
              <Image
                src={featured.authorMeta.avatar}
                alt={featured.authorMeta.name}
                width={40}
                height={40}
                className="h-10 w-10 rounded-full border border-white/20 object-cover"
              />
              <span className="text-sm font-bold text-white">
                {featured.authorMeta.name}
              </span>
            </div>
            <span className="hidden h-8 w-px bg-white/15 sm:block" />
            <span className="flex items-center gap-2 text-sm font-medium text-white/60">
              <Calendar className="h-4 w-4" />
              {featured.date}
            </span>
            <span className="flex items-center gap-2 text-sm font-medium text-white/60">
              <Clock className="h-4 w-4" />
              {featured.readTime} read
            </span>
          </div>

          {/* Read Article — visual affordance driven by the card hover (the
              stretched link above is the actual click target). White wipe-fill
              on the dark cover. */}
          <span className="relative mt-2 inline-flex h-12 w-fit items-center justify-between gap-3 overflow-hidden rounded-xl pl-5 pr-2 before:absolute before:inset-0 before:origin-left before:scale-x-0 before:bg-white before:transition-transform before:duration-300 before:ease-out group-hover:before:scale-x-100">
            <span className="relative z-10 text-sm font-bold tracking-tight text-white transition-colors duration-300 group-hover:text-black">
              Read Article
            </span>

            <span className="relative z-10 flex h-8 w-8 items-center justify-center overflow-hidden rounded-lg bg-white text-black transition-colors duration-300 group-hover:bg-black">
              <svg width="0" height="0" className="absolute">
                <title>Read article arrow gradient</title>
                <defs>
                  <linearGradient
                    id="cta-featured-icon-grad"
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

              <MdArrowOutward className="absolute z-10 h-4 w-4 transition-transform duration-300 group-hover:-translate-y-8 group-hover:translate-x-8" />
              <MdArrowOutward
                className="absolute z-10 h-4 w-4 -translate-x-8 translate-y-8 transition-transform duration-300 group-hover:translate-x-0 group-hover:translate-y-0"
                style={{ fill: "url(#cta-featured-icon-grad)" }}
              />
            </span>
          </span>
        </div>
      </motion.div>
    </section>
  );
}
