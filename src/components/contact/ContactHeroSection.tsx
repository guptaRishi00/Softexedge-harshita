"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import Header from "../page/Header";

const premiumEase = [0.16, 1, 0.3, 1] as const;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
} as const;

const wordVariants = {
  hidden: { opacity: 0, y: 30 },
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

const cards = [
  {
    id: "01",
    title: "Got a\nproject?",
    img: "https://images.unsplash.com/photo-1513128034602-7814ccaddd4e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fHByb2plY3R8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: "02",
    title: "Have a\nquestion?",
    img: "https://plus.unsplash.com/premium_photo-1678000616480-d4a041e6eba1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8SGF2ZSUyMGElMjBxdWVzdGlvbiUzRnxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    id: "03",
    title: "Let's\ncollaborate.",
    img: "https://plus.unsplash.com/premium_photo-1661963789382-e6fc547f967e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y29sbGFib3JhdGV8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: "04",
    title: "Just want\nto say hi?",
    img: "https://images.unsplash.com/photo-1616428362406-4ffd9fcbf023?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8aGl8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: "05",
    title: "Share\nan idea?",
    img: "https://plus.unsplash.com/premium_photo-1679436985501-c6e960aa5578?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTd8fHNoYXJlfGVufDB8fDB8fHww",
  },
];

export default function ContactHeroSection() {
  const [activeIndex, setActiveIndex] = useState(2);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % cards.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative flex min-h-[100svh] w-full flex-col overflow-hidden bg-[#FAFAFA] font-sans">
      {/* Header */}
      <div className="absolute left-0 top-0 z-50 w-full">
        <Header />
      </div>

      {/* Main content area */}
      <div className="relative z-10 mx-auto flex w-full flex-1 flex-col items-center justify-center px-6 pt-32 pb-16 md:flex-row md:items-center md:gap-10 md:px-10 md:pt-36 lg:gap-16">
        {/* ─── Left Column: Text ─── */}
        <div className="flex w-full flex-col items-start md:w-1/2 lg:w-5/12">
          {/* Eyebrow */}
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: premiumEase }}
            className="mb-6 text-xs font-bold uppercase tracking-[0.25em] text-[#2E5BFF]"
          >
            Let&apos;s Connect
          </motion.span>

          {/* Headline */}
          <motion.h1
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col text-[3.5rem] font-bold leading-[1.05] tracking-tight text-black sm:text-[4.5rem] md:text-[5rem] lg:text-[5.5rem]"
          >
            <motion.span variants={wordVariants}>Great</motion.span>
            <motion.span variants={wordVariants}>conversations.</motion.span>
            <motion.span variants={wordVariants}>
              <span className="bg-gradient-to-r from-[#2E5BFF] to-[#149CCB] bg-clip-text text-transparent">
                Real results.
              </span>
            </motion.span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            custom={1.0}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mt-8 max-w-sm text-base font-medium leading-relaxed text-zinc-500 md:text-lg"
          >
            Whether it&apos;s a project, a question,
            <br />
            or just an idea &mdash; we&apos;d love to hear from you.
            <br />
            Let&apos;s build something great together.
          </motion.p>
        </div>

        {/* ─── Right Column: Card Stack ─── */}
        <div className="relative mt-20 flex h-[350px] w-full items-center justify-center sm:h-[450px] md:mt-0 md:h-[550px] md:w-1/2 lg:w-7/12">
          {cards.map((card, i) => {
            const offset = (i - activeIndex + cards.length) % cards.length;
            let relativeOffset = offset;
            if (relativeOffset > 2) relativeOffset -= cards.length;

            const x = `${relativeOffset * 50}%`;
            const scale = 1 - Math.abs(relativeOffset) * 0.15;
            const zIndex = 30 - Math.abs(relativeOffset) * 10;
            const isCenter = relativeOffset === 0;

            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, x: 0, scale: 0.5 }}
                animate={{ opacity: 1, x, scale }}
                transition={{
                  duration: 0.8,
                  ease: premiumEase,
                }}
                className="absolute aspect-[9/16] w-[150px] overflow-hidden rounded-2xl bg-zinc-900 shadow-2xl sm:w-[180px] md:w-[220px] lg:w-[260px]"
                style={{ zIndex }}
              >
                <Image
                  src={card.img}
                  alt={card.title}
                  fill
                  sizes="(max-width: 768px) 150px, (max-width: 1024px) 220px, 260px"
                  className="object-cover"
                />

                {/* Gradient overlay for text legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/10" />

                {/* Sparkle Icon for center card */}

                {/* Card content */}
                <div className="absolute bottom-5 left-5 right-5 flex flex-col text-white md:bottom-6 md:left-6 md:right-6">
                  <span className="whitespace-pre-line text-sm font-semibold leading-tight sm:text-base md:text-lg">
                    {card.title}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
