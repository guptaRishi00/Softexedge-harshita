// src/components/home/StatsSection.tsx
"use client";

import { cn } from "@/lib/utils";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import PixelBlast from "../ui/PixelBlast";
import ColorBends from "../ui/ColorBends";
import DotGrid from "../ui/DotGrid";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const stats = [
  { number: "85", text: "Brands Directed" },
  { number: "18", text: "Different Sectors\nServed" },
  { number: "500", text: "Creative\nDeployments" },
  { number: "16", text: "Years of Vision" },
];

export default function StatsSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // ONLY ANIMATE INNER CONTENT
      const rows = gsap.utils.toArray<HTMLElement>(".stat-row");

      rows.forEach((row, index) => {
        const isMobile = window.innerWidth < 768;

        const shiftAmount = isMobile ? 35 : 120;
        const direction = index % 2 === 0 ? 1 : -1;

        const inner = row.querySelector(".stat-inner");

        if (!inner) return;

        // FLOATING HORIZONTAL MOTION
        gsap.fromTo(
          inner,
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
              scrub: 1.2,
            },
          },
        );

        // REVEAL ANIMATION
        gsap.fromTo(
          inner,
          {
            opacity: 0,
            y: 80,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power3.out",

            scrollTrigger: {
              trigger: row,
              start: "top 85%",
            },
          },
        );
      });
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      id="stats"
      className="relative w-full overflow-hidden bg-white py-20 text-black md:py-20"
    >
      {/* PIXEL BLAST BACKGROUND */}
      {/* <div className="absolute inset-0 flex items-center w-full justify-center gap-1">
        <DotGrid
          dotSize={4}
          gap={22}
          baseColor="#E5E7EB" // Changed to light gray for light theme
          activeColor="#2E5BFF"
          proximity={150}
          shockRadius={250}
          shockStrength={1}
          resistance={2000}
          returnDuration={4.4}
        />
      </div> */}

      {/* CONTENT */}
      <div className="relative z-10 flex w-full flex-col">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={cn(
              "stat-row",
              "relative",
              "w-full",
              "overflow-hidden",
              "pointer-events-auto",
            )}
          >
            {/* STATIC FULL WIDTH BORDER */}
            {index !== stats.length - 1 && (
              <div className="absolute bottom-0 left-0 right-0 h-px bg-black/10" />
            )}

            {/* MOVING CONTENT */}
            <div
              className={cn(
                "stat-inner",
                "flex",
                "w-full",
                "flex-col",
                "items-start",
                "justify-center",
                "px-4",
                "py-10",
                "will-change-transform",
                "md:flex-row",
                "md:items-center",
                "md:px-10",
                "md:py-14",
              )}
            >
              {/* NUMBER */}
              <div className="flex w-full justify-start pr-8 md:w-[55%] md:justify-end md:pr-16">
                <h2
                  className={cn(
                    "relative",
                    "flex",
                    "items-start",
                    "overflow-visible",
                    "bg-linear-to-r",
                    "from-[#2E5BFF]",
                    "to-[#149CCB]",
                    "bg-clip-text",
                    "text-[7rem]",
                    "font-bold",
                    "leading-none",
                    "tracking-[-0.04em]",
                    "text-transparent",
                    "pb-2",
                    "md:text-[12rem]",
                  )}
                >
                  {stat.number}
                  <span className="text-[0.4em] font-bold tracking-[0.2em] mt-[-0.2em] ml-1">
                    +
                  </span>
                </h2>
              </div>

              {/* TEXT */}
              <div className="mt-4 w-full pl-2 md:mt-0 md:w-[45%] md:pl-10">
                <p className="whitespace-pre-line text-3xl font-bold leading-[1.05] tracking-tight text-black/90 md:text-[4rem]">
                  {stat.text}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
