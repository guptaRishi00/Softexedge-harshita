"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const stats = [
  { number: "85", text: "Brands Directed" },
  { number: "18", text: "Different Sectors\nServed." },
  { number: "500", text: "Creative\nDeployments" },
  { number: "16", text: "Years of Vision" },
];

export default function StatsSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // 1. HORIZONTAL SCROLL TRIGGER ANIMATION
      const rows = gsap.utils.toArray<HTMLElement>(".stat-row");

      rows.forEach((row, index) => {
        const isMobile = window.innerWidth < 768;
        const shiftAmount = isMobile ? 35 : 120;
        const direction = index % 2 === 0 ? 1 : -1;

        gsap.fromTo(
          row,
          {
            x: shiftAmount * direction,
          },
          {
            x: -shiftAmount * direction,
            ease: "none",
            scrollTrigger: {
              trigger: row,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          },
        );
      });

      // 2. TEXT GRADIENT ANIMATION
      gsap.to(".animated-gradient-text", {
        backgroundPosition: "200% center",
        ease: "sine.inOut",
        duration: 3,
        repeat: -1,
        yoyo: true, // This creates the "coming and going" effect
      });
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      id="stats"
      className="relative w-full overflow-hidden bg-black py-20 text-white md:pt-20"
    >
      {/* SUBTLE DOT PATTERN */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.15]"
        style={{
          backgroundImage: "radial-gradient(#ffffff 1.5px, transparent 1.5px)",
          backgroundSize: "32px 32px",
          maskImage:
            "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)",
        }}
      />

      {/* SUBTLE BACKGROUND GLOW */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute left-1/4 top-0 h-[400px] w-[400px] rounded-full bg-[#4A8CFF]/10 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-[400px] w-[400px] rounded-full bg-[#7B61FF]/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col gap-16 px-4 md:gap-24">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="stat-row flex w-full flex-col items-start justify-center will-change-transform md:flex-row md:items-center"
          >
            {/* NUMBER */}
            <div className="flex w-full justify-start pr-8 md:w-[55%] md:justify-end md:pr-16">
              <h2
                className="
                  animated-gradient-text
                  flex items-start
                  bg-gradient-to-r
                  from-[#3445E7]
                  via-[#07D6F3]
                  to-[#3445E7]
                  bg-[size:200%_auto]
                  bg-clip-text
                  text-[8rem]
                  font-bold
                  leading-[0.8]
                  tracking-tighter
                  text-transparent
                  md:text-[14rem]
                "
              >
                {stat.number}

                <span className="ml-1 mt-2 text-4xl font-bold md:mt-4 md:text-7xl">
                  +
                </span>
              </h2>
            </div>

            {/* TEXT */}
            <div className="mt-4 w-full pl-2 md:mt-0 md:w-[45%] md:pl-10">
              <p className="whitespace-pre-line text-3xl font-medium leading-[1.1] tracking-tight text-white/90 md:text-[4rem]">
                {stat.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
