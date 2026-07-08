"use client";

import { motion } from "framer-motion";
import { Calendar, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { MdArrowOutward } from "react-icons/md";
import { blogPosts } from "@/data/blog";
import Header from "../page/Header";

const premiumEase = [0.16, 1, 0.3, 1] as const;

// Upgrade an unsplash card thumbnail (w=600) to a larger crop.
const wide = (url: string) => url.replace("w=600", "w=1200");

// The blog landing opens with this: a single prominent featured article
// (falls back to the first post) shown above the list.
export default function BlogFeaturedSection() {
  const featured = blogPosts.find((p) => p.featured) ?? blogPosts[0];

  return (
    <section className="relative flex min-h-[100svh] flex-col justify-center w-full overflow-hidden bg-[#FAFAFA] font-sans selection:bg-[#2E5BFF]/20">
      {/* Header */}
      <div className="absolute left-0 top-0 z-50 w-full">
        <Header />
      </div>

      <div className="relative z-10 mx-auto w-full px-6 pt-36 pb-16 md:px-10 md:pt-40 md:pb-24">
        {/* Eyebrow */}

        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: premiumEase }}
            className="order-2 lg:order-1"
          >
            <span className="inline-flex items-center text-[0.7rem] font-bold uppercase tracking-[0.2em]">
              <span className="bg-gradient-to-r from-[#2E5BFF] to-[#149CCB] bg-clip-text text-transparent">
                {featured.category}
              </span>
            </span>

            <Link href={featured.href}>
              <h1 className="mt-6 text-4xl font-bold leading-[1.1] tracking-tight text-zinc-900 md:text-5xl lg:text-[3.5rem]">
                {featured.title}
              </h1>
            </Link>

            <p className="mt-6 max-w-xl text-lg font-medium leading-[1.6] text-zinc-500">
              {featured.excerpt}
            </p>

            {/* Meta */}
            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
              <div className="flex items-center gap-3">
                <Image
                  src={featured.authorMeta.avatar}
                  alt={featured.authorMeta.name}
                  width={40}
                  height={40}
                  className="h-10 w-10 rounded-full object-cover"
                />
                <span className="text-sm font-bold text-zinc-900">
                  {featured.authorMeta.name}
                </span>
              </div>
              <span className="hidden h-8 w-px bg-zinc-200 sm:block" />
              <span className="flex items-center gap-2 text-sm font-medium text-zinc-500">
                <Calendar className="h-4 w-4" />
                {featured.date}
              </span>
              <span className="flex items-center gap-2 text-sm font-medium text-zinc-500">
                <Clock className="h-4 w-4" />
                {featured.readTime} read
              </span>
            </div>

            {/* Read Article CTA — same button as the blog list cards, adapted
                to this light section (dark at rest → fills dark on hover). */}
            <Link
              href={featured.href}
              className="group/cta relative mt-10 inline-flex h-12 w-fit cursor-pointer items-center justify-between gap-3 overflow-hidden rounded-xl pl-0 pr-2 transition-all duration-300 hover:pl-5 hover:pr-2 before:absolute before:inset-0 before:origin-left before:scale-x-0 before:bg-zinc-900 before:transition-transform before:duration-300 before:ease-out hover:before:scale-x-100"
            >
              <span className="relative z-10 text-sm font-bold tracking-tight text-zinc-900 transition-colors duration-300 group-hover/cta:text-white">
                Read Article
              </span>

              <span className="relative z-10 flex h-8 w-8 items-center justify-center overflow-hidden rounded-lg bg-zinc-900 text-white transition-colors duration-300 group-hover/cta:bg-white">
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

                <MdArrowOutward className="absolute z-10 h-4 w-4 transition-transform duration-300 group-hover/cta:-translate-y-8 group-hover/cta:translate-x-8" />
                <MdArrowOutward
                  className="absolute z-10 h-4 w-4 -translate-x-8 translate-y-8 transition-transform duration-300 group-hover/cta:translate-x-0 group-hover/cta:translate-y-0"
                  style={{ fill: "url(#cta-featured-icon-grad)" }}
                />
              </span>
            </Link>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: premiumEase }}
            className="order-1 lg:order-2"
          >
            <Link href={featured.href} className="group block">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[24px] bg-zinc-100">
                <Image
                  src={wide(featured.image)}
                  alt={featured.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 600px"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <span className="absolute left-5 top-5 rounded-md border border-white/20 bg-black/40 px-3 py-1.5 text-[0.65rem] font-bold uppercase tracking-widest text-white/90 backdrop-blur-md">
                  Featured
                </span>
              </div>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
