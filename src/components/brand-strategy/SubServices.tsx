"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { MdArrowOutward } from "react-icons/md";

const premiumEase = [0.22, 1, 0.36, 1] as const;

const services = [
  {
    number: "01",
    title: "Brand Strategy",
    description:
      "Positioning, narrative, and foundational architecture for industry leaders and visionary startups.",
    link: "/brand-strategy",
    image:
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1200&auto=format&fit=crop",
  },
  {
    number: "02",
    title: "Digital Products",
    description:
      "Immersive websites, web applications, and scalable platforms engineered for flawless performance.",
    link: "/services",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop",
  },
  {
    number: "03",
    title: "UI/UX & Motion",
    description:
      "Cinematic visual identities, motion graphics, and interface designs that captivate and convert.",
    link: "/services",
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1200&auto=format&fit=crop",
  },
  {
    number: "04",
    title: "eCommerce",
    description:
      "High-converting online storefronts optimized for modern consumer behaviors and rapid scale.",
    link: "/services",
    image:
      "https://images.unsplash.com/photo-1592503254549-d83d24a4dfab?q=80&w=1200&auto=format&fit=crop",
  },
];

// Helper to determine the relative position of a card (-1 for left, 0 for center, 1 for right, etc.)
const getRelativeOffset = (
  index: number,
  activeIndex: number,
  total: number,
) => {
  let diff = index - activeIndex;
  // Adjust for infinite wrapping
  if (diff > Math.floor(total / 2)) diff -= total;
  if (diff < -Math.floor(total / 2)) diff += total;
  return diff;
};

export default function SubServices() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-playing carousel logic
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % services.length);
    }, 4000); // Changes every 4 seconds

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <section className="relative overflow-hidden bg-black px-6 py-24 text-white md:px-12 md:py-40 lg:px-20 font-sans">
      <div className="mx-auto max-w-[1600px]">
        {/* Header Section */}
        <div className="mb-16 flex flex-col items-center text-center md:mb-24">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-6 text-xs font-semibold uppercase tracking-[0.4em] text-zinc-500"
          >
            Capabilities
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl font-medium leading-[1.05] tracking-tight md:text-6xl lg:text-[5rem]"
          >
            We engineer digital{" "}
            <span className="bg-gradient-to-r from-[#2E5BFF] to-[#149CCB] bg-clip-text text-transparent">
              advantage
            </span>
          </motion.h2>
        </div>

        {/* Carousel Container */}
        <div
          className="relative flex h-[600px] w-full items-center justify-center md:h-[750px]"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {services.map((service, index) => {
            const offset = getRelativeOffset(
              index,
              activeIndex,
              services.length,
            );
            const isActive = offset === 0;

            return (
              <motion.div
                key={index}
                animate={{
                  // Position calculations based on relative offset
                  x:
                    offset === 0
                      ? "0%"
                      : offset === 1
                        ? "95%"
                        : offset === -1
                          ? "-95%"
                          : "0%",
                  scale: offset === 0 ? 1 : 0.8,
                  opacity: offset === 0 ? 1 : Math.abs(offset) === 2 ? 0 : 0.5,
                  filter: offset === 0 ? "blur(0px)" : "blur(12px)",
                  zIndex: offset === 0 ? 30 : 10,
                }}
                transition={{ duration: 0.8, ease: premiumEase }}
                className={`absolute flex w-full max-w-[90%] flex-col gap-6 md:max-w-3xl lg:max-w-4xl lg:gap-10 ${
                  isActive ? "cursor-default" : "pointer-events-none"
                }`}
              >
                {/* Independent Image Block */}
                <div className="relative w-full aspect-[4/3] md:aspect-[16/9] overflow-hidden rounded-[32px] bg-zinc-900 shadow-2xl">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.4)] pointer-events-none" />
                </div>

                {/* Independent Text Block (Fades out when inactive to reduce clutter) */}
                <div
                  className={`flex w-full flex-col items-start justify-between gap-6 transition-opacity duration-500 md:flex-row md:items-end px-2 ${
                    isActive ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <div className="flex max-w-xl flex-col gap-4">
                    <div className="flex items-center gap-4">
                      <h3 className="text-3xl font-medium tracking-tight text-white md:text-6xl">
                        {service.title}
                      </h3>
                    </div>
                    <p className="text-sm font-light leading-relaxed text-zinc-400 md:text-lg font-medium">
                      {service.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Carousel Indicators */}
        <div className="mt-8 flex items-center justify-center gap-3">
          {services.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                activeIndex === index
                  ? "w-8 bg-white"
                  : "w-2 bg-zinc-700 hover:bg-zinc-500"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
