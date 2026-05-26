// src/components/home/StatsSection.tsx
"use client";

import { cn } from "@/lib/utils";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import PixelBlast from "../ui/PixelBlast";
import ColorBends from "../ui/ColorBends";

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

      // ANIMATED TEXT GRADIENT
      gsap.to(".animated-gradient-text", {
        backgroundPosition: "200% center",
        ease: "sine.inOut",
        duration: 3,
        repeat: -1,
        yoyo: true,
      });
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      id="stats"
      className="relative w-full overflow-hidden bg-black py-20 text-white md:py-10"
    >
      {/* PIXEL BLAST BACKGROUND */}
      <div className="absolute inset-0 flex items-center w-full justify-center gap-1">
        <PixelBlast
          variant="square"
          pixelSize={2}
          color="#2E5BFF"
          patternScale={4}
          patternDensity={0.25}
          pixelSizeJitter={0.65}
          enableRipples
          rippleSpeed={0.4}
          rippleThickness={0.12}
          rippleIntensityScale={1.5}
          liquid={false}
          liquidStrength={0.12}
          liquidRadius={1.2}
          liquidWobbleSpeed={5}
          speed={0.5}
          edgeFade={0}
          transparent
        />
      </div>

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
              <div className="absolute bottom-0 left-0 right-0 h-px bg-white/14" />
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
                    "via-[#149CCB]",
                    "to-[#2E5BFF]",
                    "bg-[size:200%_auto]",
                    "bg-clip-text",
                    "text-[7rem]",
                    "font-medium",
                    "leading-none",
                    "tracking-[-0.04em]",
                    "text-transparent",
                    "pb-2",
                    "md:text-[12rem]",
                  )}
                >
                  {stat.number}+
                </h2>
              </div>

              {/* TEXT */}
              <div className="mt-4 w-full pl-2 md:mt-0 md:w-[45%] md:pl-10">
                <p className="whitespace-pre-line text-3xl font-bold leading-[1.05] tracking-tight text-white/90 md:text-[4rem]">
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
