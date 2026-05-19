"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const projects = [
  {
    id: 1,
    title: "MEMOIR",
    subtitle: "Journal on design culture",
    description:
      "Observations on exploring the intersections of music, architecture, and design - the things that shape how we build and feel.",
    tech: ["TYPESCRIPT", "TAILWIND"],
    year: "2025",
    image:
      "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=2560&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "DENTOS",
    subtitle: "Dental ERP system",
    description:
      "Modular practice management suite: digital odontogram, patient records, scheduling, billing, and staff time tracking - all in one unified interface.",
    tech: ["REACT", "NEXT.JS", "MONGODB", "NODE.JS", "TYPESCRIPT"],
    year: "2024",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2560&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "MEMENTO",
    subtitle: "Daily photo missions",
    description:
      "An app where users complete daily missions by sharing photos or videos. Document the ordinary. Make it extraordinary.",
    tech: ["REACT NATIVE", "NODE.JS", "AWS S3", "POSTGRESQL"],
    year: "2024",
    image:
      "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=2560&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "ZARCEROG",
    subtitle: "This portfolio",
    description:
      "The site you're looking at right now. Built to feel like something. Built to mean something. Kept raw.",
    tech: ["NEXT.JS", "TYPESCRIPT", "GSAP", "LENIS", "TAILWIND"],
    year: "2024",
    image:
      "https://images.unsplash.com/photo-1617791160505-6f00504e3519?q=80&w=2560&auto=format&fit=crop",
  },
];

export default function PortfolioSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const track = trackRef.current;
      if (!track) return;

      gsap.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: () => `+=${track.scrollWidth - window.innerWidth}`, // Sync pin duration with track scroll length
          pin: true,
          scrub: 1, // Smooth scrub effect
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      id="portfolio"
      className="relative h-screen w-full overflow-hidden bg-black text-[#EBE9E0]"
    >
      <div ref={trackRef} className="flex h-full w-max">
        {projects.map((project, index) => (
          <div
            key={project.id}
            className="relative flex h-screen w-screen shrink-0 flex-col justify-between overflow-hidden p-6 md:p-12"
          >
            {/* Background Image & Dark Overlay */}
            <div className="absolute inset-0 -z-20">
              <img
                src={project.image}
                alt={project.title}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-[#0a0a0a]/70 mix-blend-multiply" />
            </div>

            {/* Top Indicator */}
            <div className="z-10 flex w-full justify-between text-[10px] tracking-widest text-[#086bff] uppercase md:text-xs">
              <p>
                {index === 0
                  ? `I BUILT / P. 00${project.id}`
                  : `0${project.id} / 0${projects.length}`}
              </p>
            </div>

            {/* Bottom Content Area */}
            <div className="z-10 flex w-full flex-col justify-between gap-8 md:flex-row md:items-end">
              {/* Left Side: Info & Tech Stack */}
              <div className="flex max-w-xl flex-col gap-4">
                <div>
                  <h2 className="text-2xl font-semibold text-[#66C2A5] md:text-3xl">
                    {project.subtitle}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-[#EBE9E0]/70 md:text-base">
                    {project.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="border border-[#EBE9E0]/20 bg-black/20 px-2 py-1 text-[10px] tracking-wider text-[#EBE9E0] backdrop-blur-sm md:text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right Side: Year & Links */}
              <div className="flex flex-col items-start gap-3 md:items-end text-xs tracking-widest">
                <span className="text-[#EBE9E0]/40">{project.year}</span>
                <a
                  href="#"
                  className="group flex items-center gap-2 text-[#086bff] transition-colors hover:text-white"
                >
                  <span className="border-b border-[#086bff]/30 pb-0.5 transition-colors group-hover:border-white/30">
                    VIEW PROJECT
                  </span>
                  <span className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </a>
                <a
                  href="#"
                  className="group flex items-center gap-2 text-[#086bff] transition-colors hover:text-white"
                >
                  <span className="border-b border-[#086bff]/30 pb-0.5 transition-colors group-hover:border-white/30">
                    VISIT SITE
                  </span>
                  <span className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
