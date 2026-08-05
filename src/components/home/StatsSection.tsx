"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Grounded in the 2025 company profile: 5 years, five countries (India, UAE,
// France, USA, UK), four client regions, four service pillars. The component
// renders a "+" after every number, so each figure is stated as a floor.
const stats = [
  { number: "05", text: "Years Building Systems" },
  { number: "05", text: "Countries On The Ground" },
  { number: "04", text: "Continents Served" },
  { number: "04", text: "Systems Under One Roof" },
];

export default function StatsSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        const rows = gsap.utils.toArray<HTMLElement>(".stat-row");

        rows.forEach((row, index) => {
          const isMobile = window.innerWidth < 768;

          const shiftAmount = isMobile ? 35 : 120;
          const direction = index % 2 === 0 ? 1 : -1;

          const inner = row.querySelector(".stat-inner");

          if (!inner) return;

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
      });

      return () => mm.revert();
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      id="stats"
      className="relative w-full overflow-hidden bg-white pb-5 text-black max-md:pt-4 lg:pt-16 lg:pb-24 "
    >
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
            {index !== stats.length - 1 && (
              // left/right-3 matches `.stat-inner`'s max-md:px-3 so the rule
              // ends flush with the content; md:left-10/right-10 keeps desktop.
              <div className="absolute bottom-0 left-3 right-3 h-px bg-black/10 md:left-10 md:right-10" />
            )}

            <div
              className={cn(
                "stat-inner",
                "flex",
                "w-full",
                "max-md:w-auto",
                "flex-col",
                "items-start",
                "justify-center",
                "px-4",
                // mobile-only by construction: `md:py-10` below re-asserts 40px
                // from 768px up, so this base value governs only under md
                "py-6",
                "will-change-transform",
                "md:flex-row",
                "md:items-center",
                "md:px-10",
                "md:py-10",
                "max-md:px-3",
                "max-md:my-1",
                "max-md:bg-white",
              )}
            >
              <div className="flex w-full justify-start pr-8 md:w-[55%] md:justify-end md:pr-10">
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
                    "text-[4.5rem]",
                    // max-sm, not max-md: `sm:text-[7rem]` owns 640-767px, and a
                    // max-md override would collide with it in that band.
                    "max-sm:text-5xl",
                    "sm:text-[7rem]",
                    "font-bold",
                    "leading-none",
                    "tracking-[-0.04em]",
                    "text-transparent",
                    "pb-2",
                    "md:text-[10rem]",
                  )}
                >
                  {stat.number}
                  <span className="text-[0.4em] font-bold tracking-[0.2em] ml-1">
                    +
                  </span>
                </h2>
              </div>

              <div className="mt-4 w-full pl-2 md:mt-0 md:w-[90%] md:pl-1 max-md:pl-0">
                <p className="whitespace-pre-line text-3xl font-bold leading-[1.05] tracking-tight text-black/90 max-md:text-2xl md:text-[5rem]">
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
