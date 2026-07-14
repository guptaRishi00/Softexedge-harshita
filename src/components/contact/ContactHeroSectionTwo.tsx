"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { MdArrowOutward } from "react-icons/md";
import Header from "../page/Header";
import SpotlightGrid from "../ui/SpotlightGrid";

const premiumEase = [0.16, 1, 0.3, 1] as const;

const headlineContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.14, delayChildren: 0.1 },
  },
} as const;

const line = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: premiumEase },
  },
} as const;

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: premiumEase },
  }),
} as const;

// Button styled like the CtaSection "Connect With Us" button — white wipe-fill
// + arrow-flip, for the dark hero background.
function CtaStyleButton({
  label,
  href,
  gradId,
}: {
  label: string;
  href: string;
  gradId: string;
}) {
  const className =
    "group relative flex h-14 w-fit cursor-pointer items-center justify-between gap-4 overflow-hidden rounded-xl border border-white/20 pl-5 pr-2 transition-all duration-300 hover:border-white hover:pr-3.5 before:absolute before:inset-0 before:origin-left before:scale-x-0 before:bg-white before:transition-transform before:duration-300 before:ease-out hover:before:scale-x-100";

  const inner = (
    <>
      <span className="relative z-10 text-base font-bold tracking-tight text-white transition-colors duration-300 group-hover:text-black">
        {label}
      </span>

      <div className="relative z-10 flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl bg-white text-black transition-colors duration-300 group-hover:bg-black">
        <svg width="0" height="0" className="absolute">
          <title>Arrow gradient</title>
          <defs>
            <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop stopColor="#2E5BFF" offset="0%" />
              <stop stopColor="#149CCB" offset="100%" />
            </linearGradient>
          </defs>
        </svg>

        <MdArrowOutward className="absolute z-10 h-4 w-4 transition-transform duration-300 group-hover:-translate-y-8 group-hover:translate-x-8" />
        <MdArrowOutward
          className="absolute z-10 h-4 w-4 -translate-x-8 translate-y-8 transition-transform duration-300 group-hover:translate-x-0 group-hover:translate-y-0"
          style={{ fill: `url(#${gradId})` }}
        />
      </div>
    </>
  );

  return href.startsWith("/") ? (
    <Link href={href} className={className}>
      {inner}
    </Link>
  ) : (
    <a href={href} className={className}>
      {inner}
    </a>
  );
}

export default function ContactHeroSectionTwo() {
  const reduce = useReducedMotion();

  return (
    <section className="relative w-full bg-white px-3 pt-24 pb-0 font-sans selection:bg-[#2E5BFF]/20 md:pt-30">
      {/* Header — shared inner-page header */}
      <div className="absolute left-0 top-0 z-50 w-full">
        <Header />
      </div>

      {/* Black hero container with auto-moving spotlight pattern */}
      <div className="relative mx-auto flex min-h-[82vh] w-full flex-col items-center justify-center overflow-hidden rounded-[20px] border border-zinc-800/50 bg-black px-6 py-16 md:px-12 md:py-20 lg:px-16">
        <SpotlightGrid glowColor="#2E5BFF" glowVia="#5B7CFF" />

        {/* Centered scrim so the copy stays legible over the pattern */}
        <div className="pointer-events-none absolute inset-0 z-[5] bg-[radial-gradient(ellipse_65%_60%_at_center,rgba(0,0,0,0.72),transparent_75%)]" />

        {/* Brand glow */}
        <div className="pointer-events-none absolute -bottom-24 left-1/2 z-[5] h-80 w-80 -translate-x-1/2 rounded-full bg-[#2E5BFF]/25 blur-[120px]" />

        {/* Content */}
        <div className="relative z-10 flex w-full max-w-2xl flex-col items-center text-center">
          {/* Eyebrow */}
          <motion.span
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: premiumEase }}
            className="mb-6 text-xs font-bold uppercase tracking-[0.28em]"
          >
            <span className="bg-gradient-to-r from-[#2E5BFF] to-[#149CCB] bg-clip-text text-transparent">
              Contact Us
            </span>
          </motion.span>

          {/* Headline */}
          <motion.h1
            variants={headlineContainer}
            initial={reduce ? false : "hidden"}
            animate="visible"
            className="flex flex-col text-[3.25rem] font-bold leading-[0.95] tracking-tight text-white sm:text-[4rem] lg:text-[5.25rem]"
          >
            <motion.span variants={line}>Let&apos;s Build</motion.span>
            <motion.span variants={line}>Something</motion.span>
            <motion.span variants={line}>
              <span className="bg-gradient-to-r from-[#2E5BFF] to-[#149CCB] bg-clip-text text-transparent">
                Great Together.
              </span>
            </motion.span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            custom={0.9}
            variants={fadeUp}
            initial={reduce ? false : "hidden"}
            animate="visible"
            className="mt-8 max-w-md text-base font-medium leading-relaxed text-white/60 md:text-lg mx-auto"
          >
            Have a project in mind or just want to say hello?
            <br />
            We&apos;d love to hear from you.
          </motion.p>

          {/* CTAs */}
          <motion.div
            custom={1.1}
            variants={fadeUp}
            initial={reduce ? false : "hidden"}
            animate="visible"
            className="mt-10 flex flex-wrap items-center justify-center gap-3"
          >
            <CtaStyleButton
              label="Start a Conversation"
              href="#contact"
              gradId="c2-start-grad"
            />
            <CtaStyleButton
              label="View Our Work"
              href="/work"
              gradId="c2-work-grad"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
