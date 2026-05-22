"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useState } from "react";
import DynamicButton from "../ui/DynamicButton";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const projects = [
  {
    id: 1,
    title: "MEMOIR",
    subtitle: "Journal on design culture",
    description:
      "Observations on exploring the intersections of music, architecture, and design — the things that shape how we build and feel.",
    tech: ["TYPESCRIPT", "TAILWIND"],
    year: "2025",
    image: "/assets/5.png",
    category: "EDITORIAL",
  },
  {
    id: 2,
    title: "DENTOS",
    subtitle: "Dental ERP system",
    description:
      "Modular practice management suite: digital odontogram, patient records, scheduling, billing, and staff time tracking — all in one unified interface.",
    tech: ["REACT", "NEXT.JS", "MONGODB", "NODE.JS", "TYPESCRIPT"],
    year: "2024",
    image: "/assets/2.png",
    category: "ENTERPRISE",
  },
  {
    id: 3,
    title: "MEMENTO",
    subtitle: "Daily photo missions",
    description:
      "An app where users complete daily missions by sharing photos or videos. Document the ordinary. Make it extraordinary.",
    tech: ["REACT NATIVE", "NODE.JS", "AWS S3", "POSTGRESQL"],
    year: "2024",
    image: "/assets/6.png",
    category: "MOBILE",
  },
  {
    id: 4,
    title: "ZARCEROG",
    subtitle: "This portfolio",
    description:
      "The site you're looking at right now. Built to feel like something. Built to mean something. Kept raw.",
    tech: ["NEXT.JS", "TYPESCRIPT", "GSAP", "LENIS", "TAILWIND"],
    year: "2024",
    image: "/assets/4.png",
    category: "WEB",
  },
];

export default function PortfolioSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useGSAP(
    () => {
      const track = trackRef.current;

      if (!track) return;

      const totalWidth = track.scrollWidth - window.innerWidth;

      /* =========================================
         HORIZONTAL SCROLL
      ========================================= */
      const scrollTween = gsap.to(track, {
        x: () => -totalWidth,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: () => `+=${totalWidth}`,
          pin: true,
          scrub: 1.2,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            if (progressRef.current) {
              gsap.set(progressRef.current, {
                scaleX: self.progress,
              });
            }

            const newIndex = Math.min(
              projects.length - 1,
              Math.floor(self.progress * projects.length),
            );

            setActiveIndex(newIndex);
          },
        },
      });

      /* =========================================
         PROJECT CONTENT REVEAL
      ========================================= */
      gsap.utils
        .toArray<HTMLElement>(".project-panel")
        .forEach((panel, index) => {
          const isFirst = index === 0;

          const content = panel.querySelectorAll(".reveal-item");

          const image = panel.querySelector(".project-bg-image");

          /* INITIAL STATES */
          if (!isFirst) {
            gsap.set(content, {
              y: 60,
              opacity: 0,
            });
          }

          /* IMAGE ZOOM */
          gsap.fromTo(
            image,
            {
              scale: 1.2,
            },
            {
              scale: 1,
              ease: "none",
              scrollTrigger: {
                trigger: panel,
                containerAnimation: scrollTween,
                start: "left right",
                end: "right left",
                scrub: 1.5,
              },
            },
          );

          /* CONTENT REVEAL */
          if (!isFirst) {
            gsap.to(content, {
              y: 0,
              opacity: 1,
              duration: 1,
              stagger: 0.08,
              ease: "power3.out",
              scrollTrigger: {
                trigger: panel,
                containerAnimation: scrollTween,
                start: "left 85%",
                toggleActions: "play none none none",
              },
            });
          }
        });
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      id="portfolio"
      className="relative h-screen w-full overflow-hidden bg-[#0a0a0a] text-white selection:bg-white/20"
    >
      {/* PROGRESS BAR */}
      <div className="fixed left-0 top-0 z-50 h-[2px] w-full bg-white/5">
        <div
          ref={progressRef}
          className="h-full origin-left bg-white"
          style={{ transform: "scaleX(0)" }}
        />
      </div>

      {/* SIDE NAVIGATION */}
      <div className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-4 md:flex">
        {projects.map((_, i) => (
          <div
            key={i}
            className={`h-2 w-2 rounded-full transition-all duration-500 ${
              i === activeIndex
                ? "scale-125 bg-white"
                : "bg-white/20 hover:bg-white/40"
            }`}
          />
        ))}
      </div>

      {/* TRACK */}
      <div ref={trackRef} className="flex h-full w-max">
        {projects.map((project) => (
          <div
            key={project.id}
            className="project-panel relative flex h-screen w-screen shrink-0 flex-col justify-end overflow-hidden p-8 md:p-16 lg:p-20"
          >
            {/* BACKGROUND IMAGE */}
            <div className="absolute inset-0 -z-20">
              <img
                src={project.image}
                alt={project.title}
                className="project-bg-image h-full w-full object-cover"
              />

              {/* CINEMATIC OVERLAYS */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-black/30" />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />

              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(0,0,0,0.4)_0%,_transparent_60%)]" />

              {/* NOISE */}
              <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iMSIvPjwvc3ZnPg==')]" />
            </div>

            {/* MAIN CONTENT */}
            <div className="relative z-10 grid w-full gap-12 md:grid-cols-12 md:items-end">
              {/* LEFT COLUMN */}
              <div className="flex flex-col gap-8 md:col-span-4">
                {/* CATEGORY */}
                <div className="reveal-item flex items-center gap-4">
                  <span className="text-[11px] font-semibold tracking-[0.3em] text-white/50">
                    {project.category}
                  </span>
                </div>

                {/* TITLE */}
                <div className="overflow-hidden">
                  <h2 className="reveal-item text-5xl font-bold leading-[0.9] tracking-[-0.05em] text-white md:text-7xl lg:text-8xl">
                    {project.title}
                  </h2>

                  <p className="reveal-item mt-3 text-lg font-medium tracking-wide text-white/60 md:text-xl">
                    {project.subtitle}
                  </p>
                </div>

                {/* DESCRIPTION */}
                <p className="reveal-item max-w-md text-sm leading-[1.8] text-white/50 md:text-base">
                  {project.description}
                </p>

                {/* TECH STACK */}
                <div className="reveal-item flex max-w-2xl flex-wrap gap-3">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="tech-pill rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[10px] font-semibold tracking-[0.15em] text-white/70 backdrop-blur-md transition-all duration-300 hover:border-white/20 hover:bg-white/10 md:px-5 md:text-[11px]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* RIGHT COLUMN */}
              <div className="flex flex-col items-start justify-end gap-6 md:col-span-8 md:items-end">
                {/* BUTTON */}
                <DynamicButton text="VIEW CASE STUDY" href="/" className="" />

                {/* VISIT SITE */}
                <a
                  href="#"
                  className="reveal-item group flex items-center gap-3 text-xs font-medium tracking-[0.2em] text-white/40 transition-colors duration-300 hover:text-white"
                >
                  <span className="relative">
                    VISIT SITE
                    <span className="absolute -bottom-1 left-0 h-px w-0 bg-white transition-all duration-500 group-hover:w-full" />
                  </span>

                  <svg
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M7 17L17 7M17 7H7M17 7v10"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
