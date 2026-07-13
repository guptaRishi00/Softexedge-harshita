"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { MdArrowOutward, MdKeyboardArrowDown } from "react-icons/md";
import Header from "../page/Header";

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

// Button styled like the CtaSection "Connect With Us" button (white wipe-fill +
// arrow-flip), color-inverted here for the light hero background.
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
    "group relative flex h-14 w-fit cursor-pointer items-center justify-between gap-4 overflow-hidden rounded-xl border border-zinc-300 pl-5 pr-2 transition-all duration-300 hover:pr-3.5 before:absolute before:inset-0 before:origin-left before:scale-x-0 before:bg-black before:transition-transform before:duration-300 before:ease-out hover:before:scale-x-100";

  const inner = (
    <>
      <span className="relative z-10 text-base font-bold tracking-tight text-black transition-colors duration-300 group-hover:text-white">
        {label}
      </span>

      <div className="relative z-10 flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl bg-black text-white transition-colors duration-300 group-hover:bg-white group-hover:text-black">
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
  return (
    <section className="relative flex min-h-[100svh] w-full flex-col overflow-hidden bg-white font-sans">
      {/* Header — shared inner-page header */}
      <div className="absolute left-0 top-0 z-50 w-full">
        <Header />
      </div>

      {/* Main content */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-1 flex-col items-center gap-10 px-6 pb-24 pt-32 md:flex-row md:gap-6 md:px-10 md:pb-16 md:pt-28 lg:gap-12">
        {/* ─── Left: copy ─── */}
        <div className="flex w-full flex-col items-start md:w-[44%]">
          {/* Eyebrow */}
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: premiumEase }}
            className="mb-6 text-xs font-bold uppercase tracking-[0.28em] text-[#2E5BFF]"
          >
            Contact Us
          </motion.span>

          {/* Headline */}
          <motion.h1
            variants={headlineContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col text-[3.25rem] font-bold leading-[0.95] tracking-tight text-black sm:text-[4rem] lg:text-[5.25rem]"
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
            initial="hidden"
            animate="visible"
            className="mt-8 max-w-md text-base font-medium leading-relaxed text-zinc-500 md:text-lg"
          >
            Have a project in mind or just want to say hello?
            <br />
            We&apos;d love to hear from you.
          </motion.p>

          {/* CTAs */}
          <motion.div
            custom={1.1}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mt-10 flex flex-wrap items-center gap-3"
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

        {/* ─── Right: illustration (effects baked into the PNG) ─── */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: premiumEase, delay: 0.2 }}
          className="relative h-[380px] w-full md:h-[560px] md:w-[56%] lg:h-[650px]"
        >
          <Image
            src="/assets/contact2.png"
            alt="3D mail illustration"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 55vw"
            className="object-contain"
          />
        </motion.div>
      </div>

      {/* Scroll indicator */}
    </section>
  );
}
