// src/components/home/ServiceSection.tsx
"use client";

import { cn } from "@/lib/utils";
import { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MdKeyboardArrowRight } from "react-icons/md";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const services = [
  {
    title: "Branding",
    image:
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1000&auto=format&fit=crop",
    href: "#",
  },
  {
    title: "Web Development",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1000&auto=format&fit=crop",
    href: "#",
  },
  {
    title: "UI/UX Design",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop",
    href: "#",
  },
  {
    title: "Visual Content",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop",
    href: "#",
  },
  {
    title: "eCommerce",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1000&auto=format&fit=crop",
    href: "#",
  },
];

export default function ServiceSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  const { contextSafe } = useGSAP(
    () => {
      // 1. HEADER PARALLAX
      gsap.fromTo(
        ".service-header",
        { y: -40 },
        {
          y: 40,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );

      // 2. LIST PARALLAX
      gsap.fromTo(
        ".service-list",
        { y: 60 },
        {
          y: -60,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );

      // 3. CUSTOM CURSOR TRACKING
      const cursor = cursorRef.current;
      if (cursor) {
        gsap.set(cursor, { scale: 0, xPercent: -50, yPercent: -50 });

        const xTo = gsap.quickTo(cursor, "x", {
          duration: 0.15,
          ease: "power3",
          force3D: true,
        });
        const yTo = gsap.quickTo(cursor, "y", {
          duration: 0.15,
          ease: "power3",
          force3D: true,
        });

        const moveCursor = (e: MouseEvent) => {
          xTo(e.clientX);
          yTo(e.clientY);
        };

        window.addEventListener("mousemove", moveCursor);

        return () => {
          window.removeEventListener("mousemove", moveCursor);
        };
      }
    },
    { scope: containerRef },
  );

  const handleMouseEnter = contextSafe((index: number) => {
    setHoveredIndex(index);
    gsap.to(cursorRef.current, {
      scale: 1,
      duration: 0.4,
      ease: "back.out(1.5)",
    });
  });

  const handleMouseLeave = contextSafe(() => {
    setHoveredIndex(null);
    gsap.to(cursorRef.current, {
      scale: 0,
      duration: 0.3,
      ease: "power3.inOut",
    });
  });

  return (
    <section
      ref={containerRef}
      onMouseLeave={handleMouseLeave}
      className="relative w-full overflow-hidden bg-black py-32 text-white"
    >
      <div className="w-full px-4 md:px-10">
        {/* HEADER SECTION */}
        <div className="service-header mb-20 flex w-full flex-col-reverse items-start justify-between gap-8 pb-10 md:flex-row md:items-end">
          <h2 className="text-5xl font-bold tracking-tight text-white md:text-8xl">
            Our Services
          </h2>
          <p className="max-w-md text-sm font-medium leading-relaxed text-white/60 md:text-lg">
            We merge strategic thinking with bold creative execution to deliver
            scalable digital experiences that elevate your brand.
          </p>
        </div>

        {/* SERVICES LIST */}
        <div className="service-list flex w-full flex-col">
          {services.map((service, index) => (
            <a
              key={index}
              href={service.href}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
              // Made relative and removed default border classes
              className="group relative flex w-full cursor-none items-center justify-between py-6 md:py-10"
            >
              <div className="flex items-center">
                {/* IMAGE REVEAL CONTAINER */}
                <div
                  className={cn(
                    "relative h-[70px] shrink-0 overflow-hidden rounded-2xl opacity-0 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] md:h-[130px]",
                    "w-0 group-hover:mr-6 group-hover:w-[100px] group-hover:opacity-100 md:group-hover:mr-10 md:group-hover:w-[200px]",
                  )}
                >
                  <img
                    src={service.image}
                    alt={service.title}
                    className="absolute inset-0 h-full w-full scale-110 object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-100"
                  />
                </div>

                {/* TITLE */}
                <h3
                  className={cn(
                    "text-5xl font-bold leading-none tracking-[-0.04em] transition-colors duration-500 sm:text-7xl md:text-[clamp(4rem,8vw,10rem)]",
                    hoveredIndex !== null && hoveredIndex !== index
                      ? "text-white/20"
                      : "text-white",
                  )}
                >
                  {service.title}
                </h3>
              </div>

              {/* CUSTOM GRADIENT BORDER */}
              {index !== services.length - 1 && (
                <div
                  className={cn(
                    "absolute bottom-0 left-0 h-[1px] w-full transition-all duration-500",
                    hoveredIndex === index
                      ? "bg-gradient-to-r from-[#2E5BFF] to-[#149CCB]"
                      : "bg-white/10",
                  )}
                />
              )}
            </a>
          ))}
        </div>
      </div>

      {/* CUSTOM CURSOR FOLLOWER */}
      <div
        ref={cursorRef}
        className={cn(
          "pointer-events-none fixed left-0 top-0 z-[9999] flex h-10 w-40 items-center justify-center rounded-lg bg-white text-black shadow-xl",
          "will-change-transform",
        )}
      >
        <span className="ml-1 mt-px text-[0.65rem] font-bold uppercase tracking-[0.2em]">
          View Project
        </span>
        <MdKeyboardArrowRight />
      </div>
    </section>
  );
}
