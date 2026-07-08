"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Header from "../page/Header";
import DomeGallery from "../ui/DomeGallery";

const premiumEase = [0.16, 1, 0.3, 1] as const;

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

const stats = [
  { value: 250, suffix: "+", label: "Projects delivered" },
  { value: 15, suffix: "+", label: "Industries served" },
  { value: 98, suffix: "%", label: "Client satisfaction" },
  { value: 40, suffix: "+", label: "Awards earned" },
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

export default function WorkHeroSection() {
  return (
    <main className="relative flex min-h-screen w-full flex-col overflow-hidden bg-black font-sans selection:bg-[#2E5BFF]/20">
      {/* Header — shared site header, dark-hero variant (light links + logo) */}
      <div className="absolute left-0 top-0 z-50 w-full">
        <Header onDark />
      </div>

      {/* Rotating dome background (colour, slow horizontal auto-rotation) */}
      <div className="absolute inset-0 z-0 h-full w-full">
        <DomeGallery
          fit={0.8}
          minRadius={600}
          maxVerticalRotationDeg={0}
          segments={34}
          dragDampening={2}
          autoRotate
          autoRotateSpeed={4}
          grayscale={false}
        />
      </div>

      {/* Black overlay so the text (and header) stays clear over the imagery.
          A flat tint plus a touch more darkening toward the centre where the
          title sits. */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-black/45" />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.35)_0%,transparent_65%)]" />

      {/* Main Content */}
      <div className="relative z-10 flex min-h-screen w-full flex-1 flex-col items-center justify-center px-6 pt-48 pb-32 md:pt-50 text-center md:px-10 pointer-events-none">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-15 ml-[3px] inline-flex items-center text-md font-semibold uppercase tracking-widest bg-linear-to-r from-[#2E5BFF] to-[#149CCB] bg-clip-text text-transparent"
        >
          Selected Work
        </motion.div>

        {/* Title Container */}
        <motion.h1
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-6 flex flex-col items-center text-5xl font-bold leading-[1em] tracking-tight text-white sm:text-6xl md:text-[95px] lg:text-[118px] xl:text-[135px]"
        >
          {/* Line 1 */}
          <span className="flex items-center justify-center whitespace-nowrap">
            <motion.span variants={wordVariants}>Our</motion.span>
            <motion.span variants={wordVariants} className="ml-3 md:ml-6">
              Creative
            </motion.span>
          </span>

          {/* Line 2 */}
          <span className="mt-2 flex space-x-3 md:mt-4 md:space-x-6">
            <motion.span variants={wordVariants}>
              <span className="bg-linear-to-r from-[#2E5BFF] to-[#149CCB] bg-clip-text text-transparent">
                Portfolio
              </span>
            </motion.span>
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2, ease: premiumEase }}
          className="mt-4 max-w-2xl text-lg font-medium leading-[1.4em] text-zinc-300 md:text-xl"
        >
          From concept to launch — explore the digital experiences we've crafted
          for ambitious brands across the globe.
        </motion.p>
      </div>

      {/* Bottom Stats */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, delay: 0.2, ease: premiumEase }}
        className="relative z-10 grid w-full grid-cols-2 gap-8 px-6 py-12 md:grid-cols-4 md:gap-4 md:px-12 md:py-20 pointer-events-none"
      >
        {stats.map((stat, index) => (
          <div
            key={index}
            className={[
              "flex flex-col items-center text-center",
              index !== 0 ? "border-white/15 md:border-l md:border-t-0" : "",
              index === 1 || index === 3 ? "border-l border-white/15" : "",
              index === 2 || index === 3 ? "border-t border-white/15" : "",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            <h4 className="mb-5 text-6xl font-bold tracking-tighter text-white md:text-7xl lg:text-9xl">
              <Counter value={stat.value} suffix={stat.suffix} />
            </h4>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-zinc-400 md:text-base">
              {stat.label}
            </p>
          </div>
        ))}
      </motion.div>
    </main>
  );
}
