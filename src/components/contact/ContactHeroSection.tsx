"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Header from "../page/Header";
import { cn } from "@/lib/utils";

const premiumEase = [0.16, 1, 0.3, 1] as const;

const contactStats = [
  { value: 2, suffix: "hr", label: "Avg Reply Time" },
  { value: 24, suffix: "/7", label: "Availability" },
  { value: 98, suffix: "%", label: "Client Satisfaction" },
  { value: 500, suffix: "+", label: "Consultations" },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;

    let frame = 0;
    let startTime = 0;
    const duration = 1600;

    const tick = (now: number) => {
      if (!startTime) startTime = now;
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      setCount(Math.round(value * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value]);

  return (
    <span ref={ref}>
      {count}
      <span className="bg-linear-to-r from-[#2E5BFF] to-[#149CCB] bg-clip-text text-transparent ml-1 pr-1">
        {suffix}
      </span>
    </span>
  );
}

const ROTATING_IMAGES = [
  "/assets/alex-kotliarskyi-QBpZGqEMsKg-unsplash.jpg",
  "/assets/milad-fakurian-2gzQL38nWAM-unsplash.jpg",
  "/assets/egor-litvinov-X1Txy1GTT5A-unsplash.jpg",
  "/assets/xiang-chi-WwCKehYfMCA-unsplash.jpg",
  "/assets/laptop-screen-with-minimalist-ecommerce-dashboard.jpg",
];

// Framer Motion Variants for staggering the words
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.25,
      delayChildren: 0.2,
    },
  },
} as const;

const wordVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
} as const;

export default function ContactHeroSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  const { scrollY } = useScroll();
  const topX = useTransform(scrollY, [0, 500], [0, -200]);
  const bottomX = useTransform(scrollY, [0, 500], [0, 200]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % ROTATING_IMAGES.length,
      );
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative flex min-h-screen w-full flex-col items-center justify-between overflow-hidden bg-white pt-24 pb-12 text-zinc-900">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center opacity-60">
        <div className="h-[600px] w-[600px] rounded-full bg-zinc-100 blur-[120px]"></div>
      </div>

      {/* Header */}
      <div className="absolute left-0 top-0 z-50 w-full">
        <Header />
      </div>

      {/* Center Wrapper: flex-1 dynamically centers the content between Header and Stats */}
      <div className="relative z-10 flex flex-1 w-full max-w-7xl flex-col items-center justify-center text-center lg:mt-30 px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-15 ml-[3px] inline-flex items-center text-md font-semibold uppercase tracking-widest bg-linear-to-r from-[#2E5BFF] to-[#149CCB] bg-clip-text text-transparent"
        >
          Start a project
        </motion.div>

        {/* Title Container */}
        <motion.h1
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          onAnimationComplete={() => setIsExpanded(true)}
          className="mb-6 flex flex-col items-center text-5xl font-bold leading-[1em] tracking-tight text-black sm:text-6xl md:text-[95px] lg:text-[118px] xl:text-[135px]"
        >
          {/* Line 1 */}
          <motion.span
            style={{ x: topX }}
            className="flex items-center justify-center whitespace-nowrap"
          >
            <motion.span variants={wordVariants}>Let's</motion.span>

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

            <motion.span variants={wordVariants}>Build</motion.span>
          </motion.span>

          {/* Line 2 */}
          <motion.span
            style={{ x: bottomX }}
            className="mt-2 flex space-x-3 md:mt-4 md:space-x-6"
          >
            <motion.span variants={wordVariants}>Together.</motion.span>
          </motion.span>
        </motion.h1>
      </div>

      {/* Bottom Stats */}
      <div className="relative z-20 w-full mt-16 md:mt-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: premiumEase }}
          className="relative z-10 grid w-full grid-cols-2 gap-8 px-6 py-12 md:grid-cols-4 md:gap-4 md:px-12 md:py-20"
        >
          {contactStats.map((stat, index) => (
            <div
              key={stat.label}
              className={cn(
                "flex flex-col items-center text-center",
                index !== 0 && "border-zinc-200 md:border-l md:border-t-0",
                (index === 1 || index === 3) && "border-l border-zinc-200",
                (index === 2 || index === 3) && "border-t border-zinc-200",
              )}
            >
              <h4 className="mb-5 text-6xl font-bold tracking-tighter text-zinc-900 md:text-7xl lg:text-9xl">
                <Counter value={stat.value} suffix={stat.suffix} />
              </h4>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-zinc-500 md:text-base">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
