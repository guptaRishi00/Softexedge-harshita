"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { MdKeyboardArrowDown } from "react-icons/md";
import { blogPosts } from "@/data/blog";
import Header from "../page/Header";

const premiumEase = [0.16, 1, 0.3, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay, ease: premiumEase },
  }),
} as const;

export default function BlogHeroSection() {
  const reduce = useReducedMotion();
  const total = blogPosts.length;

  return (
    <section className="relative w-full overflow-hidden bg-white pb-14 pt-40 font-sans selection:bg-[#2E5BFF]/20 md:pb-20 md:pt-48">
      {/* Header */}
      <div className="absolute left-0 top-0 z-50 w-full">
        <Header />
      </div>

      <div className="mx-auto w-full px-6 md:px-10">
        {/* Headline */}
        <h1 className="text-left text-6xl font-bold leading-[0.9] tracking-tight text-zinc-900 sm:text-7xl md:text-8xl lg:text-[7rem]">
          {/* Line 1: News, [inline image] views */}
          <span className="flex flex-wrap items-center gap-x-4 md:gap-x-6">
            <motion.span
              custom={0.1}
              variants={fadeUp}
              initial={reduce ? false : "hidden"}
              animate="visible"
            >
              News,
            </motion.span>

            <motion.span
              initial={reduce ? false : { opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.35, ease: premiumEase }}
              className="relative inline-block h-[0.78em] w-[1.02em] shrink-0 overflow-hidden rounded-[0.22em] align-middle"
            >
              <Image
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500&auto=format&fit=crop&q=80"
                alt="The team at work"
                fill
                sizes="180px"
                className="object-cover"
              />
            </motion.span>

            <motion.span
              custom={0.2}
              variants={fadeUp}
              initial={reduce ? false : "hidden"}
              animate="visible"
            >
              views
            </motion.span>
          </span>

          {/* Line 2 */}
          <motion.span
            custom={0.3}
            variants={fadeUp}
            initial={reduce ? false : "hidden"}
            animate="visible"
            className="mt-1 block md:mt-2"
          >
            and everything else
          </motion.span>
        </h1>

        {/* List header: count + filters */}
        <motion.div
          custom={0.6}
          variants={fadeUp}
          initial={reduce ? false : "hidden"}
          animate="visible"
          className="mt-12 flex flex-col gap-6 md:mt-20 md:flex-row md:items-center md:justify-between"
        >
          <p className="text-sm text-zinc-500 md:text-base">
            Showing{" "}
            <span className="font-semibold text-zinc-900">1-{total}</span> of{" "}
            <span className="font-semibold text-zinc-900">{total}</span> posts.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            {["By Category", "By Author"].map((label) => (
              <button
                key={label}
                type="button"
                className="flex items-center gap-2 rounded-full border border-zinc-300 bg-transparent px-5 py-2.5 text-sm font-medium text-zinc-800 transition-colors duration-300 hover:border-zinc-900"
              >
                {label}
                <MdKeyboardArrowDown className="h-4 w-4 text-zinc-500" />
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
