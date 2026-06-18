"use client";

import { motion } from "framer-motion";
import Header from "../page/Header";

const premiumEase = [0.16, 1, 0.3, 1] as const;

// Headline reveals word-by-word (project hero convention)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.16, delayChildren: 0.2 },
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

const contactItems = [
  {
    label: "Email",
    value: "hello@softexedge.com",
    href: "mailto:hello@softexedge.com",
  },
  {
    label: "Phone",
    value: "+1 (800) 123-4567",
    href: "tel:+18001234567",
  },
  {
    label: "Studio",
    value: "New York, NY",
    href: "#location",
  },
];

export default function ContactHeroSection() {
  return (
    <section className="relative flex min-h-screen w-full flex-col items-center justify-between overflow-hidden bg-white px-6 pb-12 pt-24 text-zinc-900 md:px-10">
      {/* Header */}
      <div className="absolute left-0 top-0 z-50 w-full">
        <Header />
      </div>

      {/* Center content */}
      <div className="relative z-10 flex w-full max-w-7xl flex-1 flex-col items-center justify-center text-center lg:mt-20">
        {/* Gradient eyebrow (brand-signature text gradient) */}
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: premiumEase }}
          className="mb-8 inline-flex items-center bg-linear-to-r from-[#2E5BFF] to-[#149CCB] bg-clip-text text-sm font-semibold uppercase tracking-[0.3em] text-transparent"
        >
          Say hello
        </motion.span>

        {/* Giant word-stagger headline with a brand-gradient accent word */}
        <motion.h1
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center text-5xl font-bold leading-[0.95em] tracking-tight text-black sm:text-6xl md:text-[95px] lg:text-[118px] xl:text-[135px]"
        >
          <span className="flex gap-3 md:gap-6">
            <motion.span variants={wordVariants}>Let's</motion.span>
            <motion.span variants={wordVariants}>build</motion.span>
          </span>
          <span className="mt-1 flex md:mt-3">
            <motion.span
              variants={wordVariants}
              className="bg-linear-to-r from-[#2E5BFF] to-[#149CCB] bg-clip-text pb-5 text-transparent"
            >
              together.
            </motion.span>
          </span>
        </motion.h1>

        {/* Subline */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: premiumEase }}
          className="mt-7 max-w-xl text-base leading-relaxed text-zinc-500 md:text-lg"
        >
          Have a project in mind, or just want to say hi? Tell us what you're
          building — we usually reply within a couple of hours.
        </motion.p>
      </div>

      {/* Bottom: contact channels strip */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.9, ease: premiumEase }}
        className="relative z-20 w-full max-w-4xl lg:py-6"
      >
        <div className="flex flex-col divide-y divide-zinc-200 border-t border-zinc-200 sm:flex-row sm:divide-x sm:divide-y-0">
          {contactItems.map((c) => (
            <a
              key={c.label}
              href={c.href}
              className="group flex flex-1 flex-col items-center gap-1 px-6 py-5 text-center transition-colors hover:bg-zinc-50"
            >
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-400">
                {c.label}
              </span>
              <span className="text-base font-semibold text-zinc-900 transition-colors group-hover:text-[#2E5BFF] md:text-lg">
                {c.value}
              </span>
            </a>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
