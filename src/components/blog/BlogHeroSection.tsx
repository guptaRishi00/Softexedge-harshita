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
      <div className="absolute left-0 top-0 z-50 w-full">
        <Header dropdown />
      </div>

      <div className="relative mx-auto flex min-h-[70vh] w-full flex-col justify-end overflow-hidden rounded-[20px] border border-zinc-800/50 bg-black px-4 py-12 max-md:min-h-[46svh] max-md:px-5 max-md:[--spotlight-cols:5] max-md:[--spotlight-sweep-col-start:3] max-md:[&_.grid]:-translate-x-[8px] max-md:[&_.grid]:gap-2 md:px-10 md:py-16 lg:py-20">
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

        <div className="pointer-events-none absolute inset-y-0 left-0 z-[5] w-full max-w-3xl bg-gradient-to-r from-black via-black/90 to-transparent max-md:from-black/90 max-md:from-50% max-md:via-black/10 max-md:via-85%" />

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-48 bg-gradient-to-t from-black via-black/95 to-transparent opacity-50 max-md:opacity-10" />

        <div className="relative z-10">
          {/* Mobile size is fluid, same technique as WorkHeroSection: the second
              line ("and everything else", incl. the inner pr-2) must stay on ONE
              line or it orphans "else". Its natural width is 329.6px at 38.85px, so
              the fit line is ~12.4vw - 8px; 11.5vw - 8px leaves ~12px of margin at
              390 and the 2.125rem floor keeps 375 and 360 on two lines. The 2.5rem
              cap is the About-hero / CtaSection size family. */}
          <motion.h1
            variants={containerVariants}
            initial={reduce ? false : "hidden"}
            animate="visible"
            className="text-left text-6xl font-medium leading-[0.9] tracking-tight text-white max-md:text-[clamp(2.25rem,calc(13.6vw_-_8px),2.875rem)] max-md:leading-[1.05] sm:text-7xl md:text-8xl lg:text-[7rem]"
          >
            <span className="flex flex-wrap items-center gap-x-4 md:gap-x-6">
              <motion.span variants={wordVariants}>News,</motion.span>
              <motion.span variants={wordVariants}>views</motion.span>
            </span>

            <motion.span variants={wordVariants} className="mt-1 block md:mt-2">
              and <span className="pr-2 text-white">everything else</span>
            </motion.span>
          </motion.h1>

          <motion.div
            custom={0.6}
            variants={fadeUp}
            initial={reduce ? false : "hidden"}
            animate="visible"
            className="mt-10 flex max-md:hidden md:mt-14 md:justify-end"
          >
            <div ref={menusRef} className="flex flex-wrap items-center gap-3 max-md:relative">
              {menus.map(({ key, label, options }) => (
                <div key={key} className="relative max-md:static">
                  <button
                    type="button"
                    aria-haspopup="listbox"
                    aria-expanded={openMenu === key}
                    onClick={() =>
                      setOpenMenu((cur) => (cur === key ? null : key))
                    }
                    className="flex items-center gap-2 rounded-full border border-white/15 bg-[#222222] px-5 py-2.5 text-sm font-medium text-white/90 transition-colors duration-300 max-md:rounded-lg hover:border-white/40 "
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
                      // `right-0` anchors this 224px panel to its trigger's RIGHT
                      // edge, so it grows leftwards and runs outside the
                      // overflow-hidden card on a phone. Anchoring per-trigger does
                      // not fix it either: the two triggers WRAP to separate rows at
                      // 320, so whichever is "on the right" changes with width.
                      // Instead the row is the containing block below md (it is
                      // `max-md:relative` and each trigger wrapper is `max-md:static`),
                      // so both panels align to the row's left edge — 33..257, inside
                      // the card at every mobile width, wrapped or not.
                      className="absolute bottom-full right-0 z-30 mb-2 max-h-72 w-56 overflow-y-auto rounded-2xl border border-white/10 bg-[#100f0f] p-1.5 shadow-xl shadow-black/40 max-md:left-0 max-md:right-auto"
                    >
                      {options.map((option) => (
                        <li key={option}>
                          <button
                            type="button"
                            onClick={() => applyFilter(key, option)}
                            className="w-full rounded-xl px-4 py-2.5 text-left text-sm font-medium text-white/70 transition-colors duration-200 hover:bg-white/10 hover:text-white max-md:py-2"
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
