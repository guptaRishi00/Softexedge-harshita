"use client";

import {
  motion,
  useInView,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import Link from "next/link";
import { type ReactNode, useEffect, useRef } from "react";
import { MdArrowOutward } from "react-icons/md";
import { useIsDesktop } from "@/lib/useIsDesktop";

const premiumEase = [0.22, 1, 0.36, 1] as const;
const exitEase = [0.32, 0, 0.67, 0] as const;

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 60, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 1.2,
      ease: premiumEase,
      staggerChildren: 0.15,
    },
  },
  exit: {
    opacity: 0,
    y: -40,
    filter: "blur(4px)",
    transition: { duration: 0.8, ease: exitEase },
  },
};

const wordContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
  },
};

const wordAnimation: Variants = {
  hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1, ease: premiumEase },
  },
};

const textReveal: Variants = {
  hidden: { opacity: 0, y: 30, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1, ease: premiumEase },
  },
};

// Keyed by the word itself (all unique), so no index keys.
const HEADLINE = [
  { word: "Because", accent: false },
  { word: "good", accent: false },
  { word: "ideas", accent: false },
  { word: "deserve", accent: false },
  { word: "better", accent: true },
  { word: "execution.", accent: true },
];

const COMPARISON = [
  {
    label: "The usual way",
    title: "A little all over the place.",
    // Each point names the part of the figure that shows it (geometry.ts tags
    // those parts with the same row index).
    points: [
      { part: "Speaker", text: "Marketing says one thing." },
      { part: "Server", text: "Tech does another." },
      {
        part: "Meter + cables",
        text: "And somehow, you're connecting the dots.",
      },
    ],
    way: "usual",
  },
  {
    label: "The Softexedge way",
    title: "Okay, now we're talking.",
    points: [
      { part: "One plate", text: "One shared vision." },
      { part: "Meter + speaker", text: "Business meets marketing." },
      { part: "Server + lamp", text: "Tech brings it all to life." },
    ],
    way: "ours",
  },
] as const;

/** Seconds each row (and its part in both figures) stays highlighted. */
const TOUR_STEP = 2.6;

/**
 * `figures` are the two comparison-card drawings (components/figures/ways),
 * built on the server and passed in by app/home/page.tsx.
 */
export default function AboutSection({
  figures,
}: {
  figures?: Record<"usual" | "ours", ReactNode>;
}) {
  const isDesktop = useIsDesktop();
  const frame = useRef<HTMLDivElement>(null);
  const frameInView = useInView(frame, { amount: 0.4 });
  const reduceMotion = useReducedMotion();
  const tour = Boolean(figures) && frameInView && !reduceMotion;

  // Legend tour: every TOUR_STEP seconds the next row lights, with the parts
  // it names in both figures; the rest tone down (ways.css). Written as an
  // attribute on the frame, so the section never re-renders for it.
  useEffect(() => {
    const el = frame.current;
    if (!el) return;
    if (!tour) {
      delete el.dataset.active;
      return;
    }
    let step = 0;
    el.dataset.active = "0";
    const id = window.setInterval(() => {
      step = (step + 1) % 3;
      el.dataset.active = String(step);
    }, TOUR_STEP * 1000);
    return () => window.clearInterval(id);
  }, [tour]);

  return (
    <motion.section
      id="about"
      variants={sectionVariants}
      initial={isDesktop ? "hidden" : false}
      whileInView={isDesktop ? "visible" : undefined}
      exit={isDesktop ? "exit" : undefined}
      viewport={{ once: true, amount: 0.2 }}
      className="relative overflow-hidden bg-white px-4 py-10 text-zinc-900 before:absolute before:inset-0 max-md:px-3 max-md:pb-14 max-md:pt-8 md:px-10 lg:mb-20"
    >
      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center text-center md:pt-20">
        <motion.p
          variants={textReveal}
          className="text-xl font-semibold tracking-tight text-zinc-500 max-md:text-lg md:text-2xl"
        >
          Why us?
        </motion.p>

        <motion.h2
          variants={wordContainer}
          className="mt-5 flex max-w-4xl flex-wrap items-baseline justify-center gap-x-4 gap-y-2 text-[2.125rem] font-bold leading-[0.95em] tracking-[-0.04em] max-md:mt-4 max-md:gap-x-2.5 max-md:gap-y-1 md:text-6xl lg:text-[4rem]"
        >
          {HEADLINE.map(({ word, accent }) => (
            <motion.span
              key={word}
              variants={wordAnimation}
              className={
                accent
                  ? "block bg-linear-to-r from-[#2E5BFF] to-[#149CCB] bg-clip-text pb-2 text-transparent"
                  : "block"
              }
            >
              {word}
            </motion.span>
          ))}
        </motion.h2>

        <motion.p
          variants={textReveal}
          className="mt-8 max-w-2xl text-xl leading-[1.35em] text-zinc-600 max-md:mt-6 max-md:text-lg"
        >
          We help you figure out what software to build, how to market it to the
          right people, and how to bring it all together under one roof.
        </motion.p>

        {/* The two "ways" read as one comparison, so they share a frame. Card
            copy stays left-aligned for scanning; only the column is centred.
            Chrome follows a Vercel-style system: hairline ring + stacked soft
            shadows, the featured (Softexedge) card polarity-flipped to dark.
            Each card leads with its figure, the same three instruments drawn
            scattered (usual) and bolted to one plate (ours). */}
        <motion.div
          ref={frame}
          variants={textReveal}
          className="mt-12 grid w-full grid-cols-1 gap-2 rounded-3xl bg-zinc-50 p-2 text-left shadow-[inset_0_0_0_1px_rgba(0,0,0,0.06)] max-md:mt-10 md:grid-cols-2"
        >
          {COMPARISON.map(({ label, title, points, way }) => {
            const ours = way === "ours";
            return (
              <div
                key={label}
                className={
                  ours
                    ? "flex flex-col overflow-hidden rounded-2xl bg-[#131313] shadow-[0_0_0_1px_rgba(0,0,0,0.9),0_2px_2px_rgba(0,0,0,0.04),0_8px_16px_-4px_rgba(0,0,0,0.16)]"
                    : "flex flex-col overflow-hidden rounded-2xl bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.08),0_2px_2px_rgba(0,0,0,0.04),0_8px_8px_-8px_rgba(0,0,0,0.04)]"
                }
              >
                {figures && (
                  <div
                    className={
                      ours
                        ? "border-b border-white/[0.08] px-3 pt-3"
                        : "border-b border-black/[0.06] bg-[#fafafa] px-3 pt-3"
                    }
                  >
                    {figures[way]}
                  </div>
                )}
                <div className="p-7 max-md:p-5">
                  <p
                    className={`text-xs font-medium uppercase tracking-[0.14em] ${ours ? "text-[#5CC6EE]" : "text-zinc-500"}`}
                  >
                    {label}
                  </p>
                  <h3
                    className={`mt-3 text-2xl font-semibold tracking-tight max-md:text-xl ${ours ? "text-zinc-50" : "text-zinc-900"}`}
                  >
                    {title}
                  </h3>
                  {/* A legend: each point beside the part of the figure that
                      shows it. The tour lights one row at a time. */}
                  <ul className="ways-legend mt-5 space-y-2.5 max-md:mt-4">
                    {points.map(({ part, text }, index) => (
                      <li
                        key={text}
                        data-row={index}
                        className="grid grid-cols-[8.5rem_1fr] items-baseline gap-3 max-md:grid-cols-[6.75rem_1fr]"
                      >
                        <span
                          className={`text-sm font-medium ${ours ? "text-zinc-400" : "text-zinc-500"}`}
                        >
                          {part}
                        </span>
                        <span
                          className={`text-[1.0625rem] max-md:text-base ${ours ? "text-zinc-200" : "text-zinc-700"}`}
                        >
                          {text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </motion.div>

        <motion.div variants={textReveal} className="mt-10 max-md:mt-8">
          {/* Below md only the gradient arrow is pinned from the desktop hover
              state — touch has no hover, so the resting state must carry it.
              The hover state's left inset is not pinned either. */}
          <Link
            href="/contact"
            className="group flex h-16 w-fit cursor-pointer items-center justify-between gap-5 rounded-xl border border-transparent bg-white pl-0 pr-2.5 transition-all duration-300 hover:border-black hover:pl-3.5 hover:pr-3.5 max-md:gap-4 max-md:border-0 max-md:pr-3"
          >
            <span className="text-lg font-bold tracking-tight text-black transition-colors duration-300">
              Connect With Us
            </span>

            <div className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl bg-black text-white max-md:h-10 max-md:w-10 max-md:rounded-lg">
              <svg width="0" height="0" className="absolute">
                <title>Connect arrow gradient</title>
                <defs>
                  <linearGradient
                    id="about-connect-icon-grad"
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

              <MdArrowOutward className="absolute z-10 h-5 w-5 transition-transform duration-300 max-md:-translate-y-8 max-md:translate-x-8 group-hover:-translate-y-8 group-hover:translate-x-8" />
              <MdArrowOutward
                className="absolute z-10 h-5 w-5 -translate-x-8 translate-y-8 transition-transform duration-300 max-md:translate-x-0 max-md:translate-y-0 group-hover:translate-x-0 group-hover:translate-y-0"
                style={{ fill: "url(#about-connect-icon-grad)" }}
              />
            </div>
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
}
