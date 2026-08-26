"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { MdArrowOutward } from "react-icons/md";

const premiumEase = [0.22, 1, 0.36, 1] as const;

// Same helper (and reason) as blog/BlogCard: Tailwind's own hover:/group-hover:
// rules are already wrapped in `@media (hover: hover)` by v4, but behaviour that
// runs off React state has to be gated in JS. Here it keeps the title a plain
// link on desktop and turns it into the accordion toggle below md. 48rem === md.
const isDesktopViewport = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(min-width: 48rem)").matches;

export const STEP = 190;

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

export default function Card({
  i,
  imageHidden,
  registerRef,
  title1,
  title2,
  description,
  link,
  color,
  image,
  open = false,
  onToggle,
}: any) {
  // Below md the card is an accordion row, matching career/OpenPositions: the
  // title is the header and everything under it collapses. The mechanism is
  // pure CSS (`display: contents` + a grid-rows 0fr/1fr transition) rather than
  // a framer height animation, because framer writes inline styles at EVERY
  // breakpoint -- an inline height would follow the component onto desktop and
  // collapse the real layout there.
  const handleTitleClick = (e: React.MouseEvent) => {
    if (isDesktopViewport()) return;
    e.preventDefault();
    onToggle?.();
  };

  return (
    <div
      ref={registerRef}
      className="sticky w-full max-md:static max-md:[transform:none]! max-md:[margin-bottom:0px]!"
      style={{
        top: "5vh",
        transform: `translateY(${i * STEP}px)`,
        marginBottom: `max(0px, calc(22vh - ${STEP}px))`,
        zIndex: i,
      }}
    >
      <div
        className={`relative grid min-h-[50vh] max-md:min-h-0 md:h-[600px] w-full origin-top grid-cols-1 gap-12 max-md:gap-0 overflow-hidden ${color} px-4 max-md:px-3 max-md:pt-0 md:px-10 pb-24 pt-12 md:min-h-0 md:grid-cols-2 md:gap-16 before:absolute before:top-0 before:h-px before:bg-white/10 before:inset-x-10 max-md:before:inset-x-3 before:content-[''] ${
          open ? "max-md:pb-12" : "max-md:pb-0"
        } ${
          // The rule is a `::before` at both breakpoints now, not a `border-t`.
          // A border always spans the full padding box, so it ran edge to edge;
          // a positioned pseudo can be inset, and `inset-x-10` lines it up with
          // the card's own `md:px-10` gutter — the same treatment StatsSection
          // uses for its dividers. Mobile keeps `inset-x-3`, matching `px-3`.
          //
          // Below md the rules sit only BETWEEN services: every card draws its
          // own top rule EXCEPT the first, and no card draws a bottom one — so
          // four services show three dividers and the list has no outer edges.
          // Desktop keeps a rule on all four, including the first, which is why
          // the first card is silenced with `content-none` rather than by
          // withholding the pseudo outright.
          i === 0 ? "max-md:before:content-none" : ""
        }`}
      >
        <motion.div
          variants={contentContainer}
          data-no-mobile-entry
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-120px" }}
          className="flex w-full flex-col gap-12 md:gap-16 pr-4 max-md:contents"
        >
          <motion.a
            data-no-mobile-entry
            variants={contentItem}
            href={link}
            onClick={handleTitleClick}
            className="group inline-block max-md:order-1 max-md:flex max-md:w-full max-md:items-center max-md:justify-between max-md:gap-4 max-md:py-5"
          >
            <h3 className="text-5xl font-medium tracking-tight text-white max-md:min-w-0 max-md:leading-none max-md:tracking-[-0.04em] max-sm:text-2xl md:text-6xl lg:text-7xl">
              {title1}
              {title1 === "E" ? "-" : " "}
              {title2}
            </h3>

            <span className="relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#2a2a2a] bg-[#080808] md:hidden">
              <svg width="0" height="0" className="absolute">
                <title>Expand arrow gradient</title>
                <defs>
                  <linearGradient
                    id={`subservice-arrow-${i}`}
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

              <MdArrowOutward
                className={`h-4 w-4 transition-transform duration-300 ${
                  open ? "rotate-90" : ""
                }`}
                style={{ fill: `url(#subservice-arrow-${i})` }}
              />
            </span>
          </motion.a>

          {/* Both wrappers are `display: contents` from md up, so the desktop
              flex column still sees the paragraph as its own direct child --
              same box, same gap-16, same stagger order. (This used to wrap the
              paragraph AND a row of tag pills; the pills were removed, so the
              collapse machinery now carries the paragraph alone.) */}
          <div
            className={`contents max-md:order-3 max-md:grid max-md:transition-[grid-template-rows] max-md:duration-500 max-md:ease-[cubic-bezier(0.16,1,0.3,1)] ${
              open ? "max-md:grid-rows-[1fr]" : "max-md:grid-rows-[0fr]"
            }`}
          >
            {/* No padding on this grid item: a grid track cannot shrink below
                its item's own padding, so a `pb-*` here would leave the row
                48px tall when collapsed. The open-state bottom spacing lives on
                the card instead. */}
            <div className="contents max-md:flex max-md:min-h-0 max-md:flex-col max-md:gap-8 max-md:overflow-hidden">
              <motion.p
                data-no-mobile-entry
                variants={contentItem}
                className="max-w-xl text-lg font-light leading-[1.4em] text-zinc-300 md:text-xl"
              >
                {description}
              </motion.p>
            </div>
          </div>
        </motion.div>

        <div
          className={`relative w-full h-[350px] max-md:order-2 md:h-[450px] overflow-hidden rounded-2xl max-md:transition-[height] max-md:duration-500 max-md:ease-[cubic-bezier(0.16,1,0.3,1)] ${
            open ? "max-md:mt-6 max-md:mb-8" : "max-md:h-0"
          }`}
        >
          {image && (
            <Image
              src={image}
              alt={`${title1} ${title2}`}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className={`h-full w-full object-cover transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                imageHidden ? "scale-105 opacity-0" : "scale-100 opacity-100"
              } max-md:scale-100 max-md:opacity-100`}
            />
          )}
        </div>
      </div>
    </div>
  );
}
