"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
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

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1500;
    const increment = value / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.ceil(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <span>
      {count}
      <span className="bg-gradient-to-r from-[#2E5BFF] to-[#07D6F3] bg-clip-text text-transparent ml-1">
        {suffix}
      </span>
    </span>
  );
}

function EdgeToEdgeCarousel({ images }: { images: string[] }) {
  const repeatedImages = [...images, ...images];

  return (
    <div className="relative flex w-full overflow-hidden py-10">
      <motion.div
        className="flex w-max gap-4 px-4 md:gap-8 md:px-8"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 35,
        }}
      >
        {repeatedImages.map((src, idx) => (
          <div
            key={idx}
            className="relative h-[300px] w-[280px] shrink-0 overflow-hidden rounded-2xl md:h-[450px] md:w-[380px] shadow-[0_8px_30px_rgba(0,0,0,0.06)]"
          >
            <img
              src={src}
              alt={`Carousel frame ${idx}`}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-105"
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
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute left-1/2 top-[-10%] h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-gradient-to-b from-[#2E5BFF]/15 via-[#07D6F3]/10 to-transparent blur-[120px]" />
        <div className="absolute bottom-0 left-[10%] h-[500px] w-[500px] rounded-full bg-zinc-200/40 blur-[120px]" />
      </div>

      <div className="absolute left-0 top-0 z-50 w-full">
        <Header />
      </div>

      <div className="relative z-10 flex w-full flex-1 flex-col items-center pt-40 md:pt-48">
        <section className="flex w-full flex-col items-center px-6 text-center md:px-10">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: premiumEase }}
            className="text-[3rem] font-bold leading-[1.05] tracking-tight text-zinc-900 sm:text-6xl md:text-7xl lg:text-[6rem]"
          >
            The minds behind <br />
            <span className="bg-gradient-to-r from-[#2E5BFF] to-[#07D6F3] bg-clip-text text-transparent">
              digital excellence.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: premiumEase }}
            className="mt-6 max-w-2xl text-base font-medium text-zinc-600 md:text-lg leading-[1em]"
          >
            Softexedge is a premier digital marketing agency driving growth,
            innovation, and impactful brand strategies.
          </motion.p>
        </section>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mt-16 w-full md:mt-24"
        >
          <EdgeToEdgeCarousel images={WORK_IMAGES} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: premiumEase }}
          className="relative mt-16 grid w-full grid-cols-2 gap-8 px-6 py-16 md:mt-24 md:grid-cols-4 md:gap-4 md:px-12"
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className={cn(
                "flex flex-col items-center text-center",
                index !== 0 &&
                  "border-zinc-200 md:border-l md:border-t-0 md:pt-0",
                (index === 1 || index === 3) && "border-l border-zinc-200",
                (index === 2 || index === 3) && "border-t border-zinc-200 pt-8",
              )}
            >
              <h4 className="mb-5 text-5xl font-bold tracking-tighter text-zinc-900 md:text-6xl lg:text-8xl">
                <Counter value={stat.value} suffix={stat.suffix} />
              </h4>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500 md:text-sm">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </main>
  );
}
