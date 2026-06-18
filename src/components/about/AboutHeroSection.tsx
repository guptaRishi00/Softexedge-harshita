"use client";

import { motion, useInView } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import Header from "../page/Header";

const cn = (...classes: (string | boolean | undefined | null)[]) => {
  return classes.filter(Boolean).join(" ");
};

const WORK_IMAGES = [
  "https://images.unsplash.com/photo-1780387477222-730504564368?w=800&auto=format&fit=crop&q=80",
  "https://plus.unsplash.com/premium_photo-1773833961204-e6534b9913e3?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1779399147786-316f949446bb?w=800&auto=format&fit=crop&q=80",
  "https://plus.unsplash.com/premium_photo-1688572454849-4348982edf7d?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80",
];

const stats = [
  { value: 10, suffix: "+", label: "Years of craft" },
  { value: 250, suffix: "+", label: "Projects shipped" },
  { value: 98, suffix: "%", label: "Client retention" },
  { value: 40, suffix: "+", label: "Team members" },
];

const premiumEase = [0.16, 1, 0.3, 1] as const;

const APPEAR_DELAY = 0.1;
const WORD_STAGGER = 0.18;
const LINE_ONE = ["The", "minds", "behind"];
// Split opens only after every word has appeared one by one
const SPLIT_DELAY = 1.7;

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

function EdgeToEdgeCarousel({ images }: { images: string[] }) {
  const SET_MIN = 12;
  const repeats = Math.max(2, Math.ceil(SET_MIN / images.length));
  const set = Array.from({ length: repeats }, () => images).flat();

  return (
    <div className="relative flex w-full overflow-hidden py-6">
      <motion.div
        className="flex w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          ease: "linear",
          duration: 65,
        }}
      >
        {[...set, ...set].map((src, idx) => (
          <div
            key={idx}
            aria-hidden={idx >= set.length}
            className="relative h-[100px] w-[150px] shrink-0 overflow-hidden rounded-lg mr-4 md:mr-3 md:h-[140px] md:w-[210px]"
          >
            <img
              src={src}
              alt=""
              loading="lazy"
              draggable={false}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out hover:scale-105"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default function AboutHeroSection() {
  return (
    <main className="relative flex min-h-screen w-full flex-col overflow-hidden bg-[#FAFAFA] font-sans selection:bg-[#2E5BFF]/20">
      <div className="absolute left-0 top-0 z-50 w-full">
        <Header />
      </div>

      {/* Changed py-32 to pt-48 pb-32 md:pt-56 to add extra space between the header and the content */}
      <div className="relative z-10 flex min-h-screen w-full flex-1 flex-col items-center justify-center px-6 pt-48 pb-32 md:pt-50 text-center md:px-10">
        <h1 className="text-[3rem] font-bold leading-[1.05] tracking-tight text-zinc-900 sm:text-6xl md:text-7xl lg:text-[6rem]">
          {LINE_ONE.map((word, i) => (
            <motion.span
              key={word}
              initial={{ opacity: 0, y: 28, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{
                duration: 0.7,
                delay: APPEAR_DELAY + i * WORD_STAGGER,
                ease: premiumEase,
              }}
              className="mr-[0.25em] inline-block"
            >
              {word}
            </motion.span>
          ))}
        </h1>

        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          transition={{
            height: { duration: 1.1, delay: SPLIT_DELAY, ease: premiumEase },
            opacity: {
              duration: 0.7,
              delay: SPLIT_DELAY + 0.25,
              ease: "easeOut",
            },
          }}
          className="w-screen overflow-hidden"
        >
          <motion.div
            initial={{ y: 24, scale: 0.96 }}
            animate={{ y: 0, scale: 1 }}
            transition={{
              duration: 1,
              delay: SPLIT_DELAY + 0.2,
              ease: premiumEase,
            }}
            className="py-4 md:py-7"
          >
            <EdgeToEdgeCarousel images={WORK_IMAGES} />
          </motion.div>
        </motion.div>

        <div>
          <motion.h1
            initial={{ opacity: 0, y: 28, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              duration: 0.7,
              delay: APPEAR_DELAY + LINE_ONE.length * WORD_STAGGER,
              ease: premiumEase,
            }}
            className="text-[3rem] font-bold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl lg:text-[6rem]"
          >
            <span className="bg-linear-to-r from-[#2E5BFF] to-[#149CCB] bg-clip-text pb-5 text-transparent">
              digital excellence.
            </span>
          </motion.h1>

          {/* <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.9,
              delay: APPEAR_DELAY + 0.35,
              ease: premiumEase,
            }}
            className="mx-auto mt-6 max-w-2xl text-base font-medium leading-[1.4em] text-zinc-600 md:text-lg"
          >
            Softexedge is a premier digital marketing agency driving growth,
            innovation, and impactful brand strategies.
          </motion.p> */}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, delay: 0.2, ease: premiumEase }}
        className="relative z-10 grid w-full grid-cols-2 gap-8 px-6 py-12 md:grid-cols-4 md:gap-4 md:px-12 md:py-20"
      >
        {stats.map((stat, index) => (
          <div
            key={index}
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
    </main>
  );
}
