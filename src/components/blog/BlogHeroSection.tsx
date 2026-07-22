"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { blogPosts, categories } from "@/data/blog";
import Header from "../page/Header";
import SpotlightGrid from "../ui/SpotlightGrid";

const premiumEase = [0.16, 1, 0.3, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay, ease: premiumEase },
  }),
} as const;

// Word-by-word stagger (mirrors the brand-strategy hero title).
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.25, delayChildren: 0.2 },
  },
} as const;

const wordVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: premiumEase },
  },
} as const;

// Unique author names for the "By Author" dropdown — from NON-featured posts
// only, since the list below excludes the featured post (a featured-only
// author would filter to an empty list).
const authors = [
  ...new Set(blogPosts.filter((p) => !p.featured).map((p) => p.author)),
];

type MenuKey = "category" | "author";

const menus: { key: MenuKey; label: string; options: string[] }[] = [
  { key: "category", label: "By Category", options: [...categories] },
  { key: "author", label: "By Author", options: ["All", ...authors] },
];

export default function BlogHeroSection() {
  const reduce = useReducedMotion();
  const [openMenu, setOpenMenu] = useState<MenuKey | null>(null);
  const menusRef = useRef<HTMLDivElement>(null);

  // Close the open dropdown on outside click / Escape.
  useEffect(() => {
    if (!openMenu) return;
    const onPointerDown = (e: MouseEvent) => {
      if (menusRef.current && !menusRef.current.contains(e.target as Node)) {
        setOpenMenu(null);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenMenu(null);
    };
    window.addEventListener("mousedown", onPointerDown);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("mousedown", onPointerDown);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [openMenu]);

  // Apply a filter: hand it to BlogListSection (which listens for this event)
  // and bring the list into view.
  const applyFilter = (type: MenuKey, value: string) => {
    window.dispatchEvent(
      new CustomEvent("blog:filter", { detail: { type, value } }),
    );
    setOpenMenu(null);
    document
      .getElementById("blog-list")
      ?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <section className="relative w-full bg-white px-3 pt-24 font-sans selection:bg-[#2E5BFF]/20 md:pt-28">
      {/* Header */}
      <div className="absolute left-0 top-0 z-50 w-full">
        <Header />
      </div>

      {/* Black hero container with auto-moving spotlight pattern */}
      <div className="relative mx-auto flex min-h-[70vh] w-full flex-col justify-end overflow-hidden rounded-[20px] border border-zinc-800/50 bg-black px-4 py-12 md:px-10 md:py-16 lg:py-20">
        {/* The light travels a rectangle inset from the card edges: from the
            2nd box in from the left and 3rd row down, ending on the third-last
            row (the grid is 8 rows, so that's row index 5). */}
        {/* Animation config matches CtaSection: scattered order, plus-shaped
            cells, 6-cell trail, speed 0.15. The sweep REGION stays this
            hero's own — those bounds are set to clear its scrim, not the
            CTA card's. */}
        <SpotlightGrid
          speed={0.15}
          sweep
          scatter
          plus
          sweepTrail={6}
          sweepColStart={1}
          sweepRowStart={2}
          sweepRowEnd={5}
        />

        {/* Left→right fade so the text sits cleanly over the pattern — same
            gradient CtaSection uses. */}
        {/* Left fade for the heading — full strength: the largest type sits
            on it and needs the contrast. */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-[5] w-full max-w-3xl bg-gradient-to-r from-black via-black/90 to-transparent" />

        {/* Bottom fade for the headline/filter row — held at 50% so the
            sweeping grid still reads through on the right of the card. */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-48 bg-gradient-to-t from-black via-black/95 to-transparent opacity-50" />

        {/* Content */}
        <div className="relative z-10">
          {/* Headline — words stagger in */}
          <motion.h1
            variants={containerVariants}
            initial={reduce ? false : "hidden"}
            animate="visible"
            className="text-left text-6xl font-medium leading-[0.9] tracking-tight text-white sm:text-7xl md:text-8xl lg:text-[7rem]"
          >
            {/* Line 1 */}
            <span className="flex flex-wrap items-center gap-x-4 md:gap-x-6">
              <motion.span variants={wordVariants}>News,</motion.span>
              <motion.span variants={wordVariants}>views</motion.span>
            </span>

            {/* Line 2 */}
            <motion.span variants={wordVariants} className="mt-1 block md:mt-2">
              and <span className="pr-2 text-white">everything else</span>
            </motion.span>
          </motion.h1>

          {/* List header: filter dropdowns (kept on the right) */}
          <motion.div
            custom={0.6}
            variants={fadeUp}
            initial={reduce ? false : "hidden"}
            animate="visible"
            className="mt-10 flex md:mt-14 md:justify-end"
          >
            <div ref={menusRef} className="flex flex-wrap items-center gap-3">
              {menus.map(({ key, label, options }) => (
                <div key={key} className="relative">
                  <button
                    type="button"
                    aria-haspopup="listbox"
                    aria-expanded={openMenu === key}
                    onClick={() =>
                      setOpenMenu((cur) => (cur === key ? null : key))
                    }
                    className="flex items-center gap-2 rounded-full border border-white/15 bg-[#222222] px-5 py-2.5 text-sm font-medium text-white/90 transition-colors duration-300 hover:border-white/40 "
                  >
                    {label}
                    <MdKeyboardArrowDown
                      className={`h-4 w-4 text-white/50 transition-transform duration-300 ${
                        openMenu === key ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {openMenu === key && (
                    <motion.ul
                      initial={reduce ? false : { opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25, ease: premiumEase }}
                      // Opens UPWARD: the buttons sit at the bottom of the
                      // overflow-hidden hero box, so a downward menu would be
                      // clipped by the container edge.
                      className="absolute bottom-full right-0 z-30 mb-2 max-h-72 w-56 overflow-y-auto rounded-2xl border border-white/10 bg-[#100f0f] p-1.5 shadow-xl shadow-black/40"
                    >
                      {options.map((option) => (
                        <li key={option}>
                          <button
                            type="button"
                            onClick={() => applyFilter(key, option)}
                            className="w-full rounded-xl px-4 py-2.5 text-left text-sm font-medium text-white/70 transition-colors duration-200 hover:bg-white/10 hover:text-white"
                          >
                            {option}
                          </button>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
