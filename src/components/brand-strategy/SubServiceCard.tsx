"use client";

import { motion } from "framer-motion";

const premiumEase = [0.22, 1, 0.36, 1] as const;

// How much lower each card sits than the one before it in the finished stack.
export const STEP = 190;

// Card content reveals with a soft upward stagger as each card scrolls in.
const contentContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
} as const;

const contentItem = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: premiumEase },
  },
} as const;

// --- ISOLATED CARD COMPONENT ---
export default function Card({
  i,
  imageHidden,
  registerRef,
  title1,
  title2,
  description,
  tags,
  link,
  color,
  image,
}: any) {
  return (
    <div
      ref={registerRef}
      className="sticky w-full"
      style={{
        // Every card shares ONE sticky line and gets its 190px staircase
        // offset from a transform instead of from `top`. Sticky release
        // depends on `top + height`, so making that identical for every card
        // means they all unstick at the same scroll position: the finished
        // stack scrolls away as one rigid block instead of peeling apart from
        // the top card down.
        top: "5vh",
        transform: `translateY(${i * STEP}px)`,
        // The transform already pushes each card a STEP further down than the
        // one before, so the flow gap gives back that same STEP to keep the
        // original spacing and pin cadence. Clamped at 0 because 22vh is
        // under a STEP on short viewports, and a negative margin would drag
        // the cards into each other.
        marginBottom: `max(0px, calc(22vh - ${STEP}px))`,
        // Later cards stack on top; fixed desktop height keeps earlier cards from poking through
        zIndex: i,
      }}
    >
      <div
        className={`relative grid min-h-[50vh] md:h-[600px] w-full origin-top grid-cols-1 gap-12 overflow-hidden border-t border-white/10 ${color} px-4 md:px-10 pb-24 pt-12 md:min-h-0 md:grid-cols-2 md:gap-16`}
      >
        {/* LEFT COLUMN: Title, Description & Tags */}
        <motion.div
          variants={contentContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-120px" }}
          className="flex w-full flex-col gap-12 md:gap-16 pr-4"
        >
          <motion.a
            variants={contentItem}
            href={link}
            className="group inline-block"
          >
            <h3 className="text-5xl font-medium tracking-tight text-white md:text-6xl lg:text-7xl">
              {title1}
              {title1 === "E" ? "-" : " "}
              {title2}
            </h3>
          </motion.a>

          <motion.p
            variants={contentItem}
            className="max-w-xl text-lg font-light leading-[1.4em] text-zinc-300 md:text-xl"
          >
            {description}
          </motion.p>

          {/* Tags Container */}
          {tags && tags.length > 0 && (
            <motion.div
              variants={contentItem}
              className="flex flex-wrap items-center gap-3 pt-4"
            >
              {tags.map((tag: string, index: number) => (
                <span
                  key={index}
                  className="rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-sm font-medium tracking-wide text-zinc-300 transition-colors "
                >
                  {tag}
                </span>
              ))}
            </motion.div>
          )}
        </motion.div>

        {/* RIGHT COLUMN: Image Container */}
        {/* Set to a fixed height: 350px on mobile, 450px on medium screens and up */}
        <div className="relative w-full h-[350px] md:h-[450px] overflow-hidden rounded-2xl">
          {image && (
            <img
              src={image}
              alt={`${title1} ${title2}`}
              className={`h-full w-full object-cover transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                imageHidden ? "scale-105 opacity-0" : "scale-100 opacity-100"
              }`}
            />
          )}
        </div>
      </div>
    </div>
  );
}
