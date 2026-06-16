"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Header from "../page/Header";

const ROTATING_IMAGES = [
  "https://images.unsplash.com/photo-1513682121497-80211f36a7d3?w=600&auto=format&fit=crop&q=60",
  "https://plus.unsplash.com/premium_photo-1683120751955-3d7c14887ac8?w=600&auto=format&fit=crop&q=60",
  "https://plus.unsplash.com/premium_photo-1683121489634-5d3f7892a6fe?w=600&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=1200&auto=format&fit=crop",
];

// Framer Motion Variants for staggering the words
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.25, // Controls the delay between each word appearing
      delayChildren: 0.2,
    },
  },
} as const;

const wordVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }, // Slower, smoother entry
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
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % ROTATING_IMAGES.length,
      );
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative flex min-h-screen w-full flex-col items-center justify-between overflow-hidden bg-white px-6 md:px-10 pt-20 pb-12 text-zinc-900">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center opacity-60">
        <div className="h-[600px] w-[600px] rounded-full bg-zinc-100 blur-[120px]" />
      </div>

      {/* Header */}
      <div className="absolute left-0 top-0 z-50 w-full">
        <Header />
      </div>

      {/* Center Wrapper: flex-1 dynamically centers the content between Header and the strip */}
      <div className="relative z-10 flex flex-1 w-full max-w-7xl flex-col items-center justify-center text-center lg:mt-30">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-15 inline-flex items-center text-sm font-semibold uppercase tracking-widest bg-linear-to-r from-[#2E5BFF] to-[#149CCB] bg-clip-text text-transparent"
        >
          Say hello
        </motion.div>

        {/* Title Container */}
        <motion.h1
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          onAnimationComplete={() => setIsExpanded(true)} // Split triggers only AFTER words finish
          className="mb-6 flex flex-col items-center text-5xl font-bold leading-[1em] tracking-tight text-black sm:text-6xl md:text-[95px] lg:text-[118px] xl:text-[135px]"
        >
          {/* Line 1 */}
          <span className="flex items-center justify-center whitespace-nowrap">
            <motion.span variants={wordVariants}>Get</motion.span>
            <motion.span variants={wordVariants} className="ml-3 md:ml-6">
              In
            </motion.span>

            {/* Split Image Span */}
            <span
              className={`relative mx-1.5 inline-block h-[1em] shrink-0 overflow-hidden rounded-2xl align-middle shadow-sm transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] md:mx-2.5 ${
                isExpanded
                  ? "w-[1.5em] mx-3 opacity-100 md:mx-5"
                  : "w-0 opacity-0"
              }`}
            >
              {ROTATING_IMAGES.map((img, index) => (
                <img
                  key={img}
                  src={img}
                  alt="Contact visual"
                  className={`absolute inset-0 h-full w-full object-cover transition-all duration-1000 ease-in-out ${
                    index === currentImageIndex
                      ? "translate-x-0 opacity-100 blur-0"
                      : "-translate-x-4 opacity-0 blur-sm"
                  }`}
                />
              ))}
            </span>

            <motion.span variants={wordVariants}>Touch</motion.span>
          </span>

          {/* Line 2 */}
          <span className="mt-2 flex space-x-3 md:mt-4 md:space-x-6">
            <motion.span variants={wordVariants}>Let's</motion.span>
            <motion.span variants={wordVariants}>Work</motion.span>
            <motion.span variants={wordVariants}>Together</motion.span>
          </span>
        </motion.h1>
      </div>

      {/* Bottom: contact channels strip */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
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
