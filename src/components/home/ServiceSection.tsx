// src/components/home/ServiceSection.tsx
"use client";

import { cn } from "@/lib/utils";
import { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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

  useGSAP(
    () => {
      // HEADER PARALLAX: Moves down slightly, feeling "pushed back" in depth
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

      // LIST PARALLAX: Moves up slightly, feeling "pulled forward"
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
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden bg-black py-32 text-white"
    >
      <div className="w-full px-4 md:px-10">
        {/* HEADER SECTION */}
        <div className="service-header mb-20 flex w-full flex-col-reverse items-start justify-between gap-8 border-b border-white/15 pb-10 md:flex-row md:items-end">
          <p className="max-w-md text-lg font-medium leading-relaxed text-white/60 md:text-xl">
            We merge strategic thinking with bold creative execution to deliver
            scalable digital experiences that elevate your brand.
          </p>
          <h2 className="text-5xl font-bold tracking-tight text-white md:text-7xl">
            Our Services
          </h2>
        </div>

        {/* SERVICES LIST */}
        <div className="service-list flex w-full flex-col">
          {services.map((service, index) => (
            <a
              key={index}
              href={service.href}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group flex w-full items-center justify-between border-b border-white/10 py-6 transition-colors duration-500 hover:border-white/30 last:border-b-0 md:py-10"
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

              {/* HOVER ARROW INDICATOR */}
              <div className="hidden h-16 w-16 shrink-0 items-center justify-center rounded-full bg-white text-black opacity-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-100 md:flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="-translate-x-3 translate-y-3 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0 group-hover:translate-y-0"
                >
                  <line x1="7" y1="17" x2="17" y2="7"></line>
                  <polyline points="7 7 17 7 17 17"></polyline>
                </svg>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
