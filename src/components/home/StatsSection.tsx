// src/components/home/StatsSection.tsx
"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const stats = [
  { number: "85", text: "Brands Directed" },
  { number: "18", text: "Different Sectors" },
  { number: "500", text: "Creative Deployments" },
  { number: "16", text: "Years of Vision" },
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
      className="relative w-full overflow-hidden bg-linear-to-r from-white to-[#efefef] py-28 text-black md:py-24"
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
              <div className="absolute bottom-0 left-10 right-10 h-px bg-black/10 max-md:hidden" />
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
                "py-10",
                "will-change-transform",
                "md:flex-row",
                "md:items-center",
                "md:px-10",
                "md:py-10",
                "max-md:mx-4",
                "max-md:my-2",
                "max-md:rounded-2xl",
                "max-md:border",
                "max-md:border-black/10",
                "max-md:bg-white",
                "max-md:shadow-sm",
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

              <div className="mt-4 w-full pl-2 md:mt-0 md:w-[90%] md:pl-1">
                <p className="whitespace-pre-line text-3xl font-bold leading-[1.05] tracking-tight text-black/90 md:text-[5rem]">
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
