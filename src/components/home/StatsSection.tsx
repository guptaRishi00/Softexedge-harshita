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
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      id="stats"
      className="relative w-full bg-white text-black overflow-hidden py-20 md:py-32"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 flex flex-col gap-16 md:gap-24">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="stat-row flex flex-col md:flex-row items-start md:items-center justify-center w-full will-change-transform"
          >
            <div className="w-full md:w-[55%] flex justify-start md:justify-end pr-8 md:pr-16">
              <h2 className="text-[8rem] md:text-[14rem] font-bold leading-[0.8] tracking-tighter flex items-start">
                {stat.number}
                <span className="text-4xl md:text-7xl font-bold mt-2 md:mt-4 ml-1">
                  +
                </span>
              </h2>
            </div>

            <div className="w-full md:w-[45%] pl-2 md:pl-10 mt-4 md:mt-0">
              <p className="text-3xl md:text-[4rem] font-medium leading-[1.1] whitespace-pre-line tracking-tight">
                {stat.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
