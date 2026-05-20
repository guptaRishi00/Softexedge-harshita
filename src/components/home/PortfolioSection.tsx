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
    image: "/assets/1.png",
  },
  {
    id: 2,
    title: "DENTOS",
    subtitle: "Dental ERP system",
    description:
      "Modular practice management suite: digital odontogram, patient records, scheduling, billing, and staff time tracking - all in one unified interface.",
    tech: ["REACT", "NEXT.JS", "MONGODB", "NODE.JS", "TYPESCRIPT"],
    year: "2024",
    image: "/assets/2.png",
  },
  {
    id: 3,
    title: "MEMENTO",
    subtitle: "Daily photo missions",
    description:
      "An app where users complete daily missions by sharing photos or videos. Document the ordinary. Make it extraordinary.",
    tech: ["REACT NATIVE", "NODE.JS", "AWS S3", "POSTGRESQL"],
    year: "2024",
    image: "/assets/3.png",
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
  },
];

export default function PortfolioSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const track = trackRef.current;
      if (!track) return;

      /* HORIZONTAL SCROLL */
      gsap.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: () => `+=${track.scrollWidth - window.innerWidth}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });

      /* TEXT REVEAL */
      gsap.utils.toArray<HTMLElement>(".project-content").forEach((content) => {
        const words = content.querySelectorAll(".word");

        gsap.fromTo(
          words,
          {
            opacity: 0,
            y: 80,
          },
          {
            opacity: 1,
            y: 0,
            stagger: 0.05,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: content,
              start: "left center",
              scrub: 1,
            },
          },
        );
      });

      /* IMAGE PARALLAX */
      gsap.utils.toArray<HTMLElement>(".project-image").forEach((img) => {
        gsap.fromTo(
          img,
          {
            scale: 1.15,
          },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: img,
              start: "left right",
              end: "right left",
              scrub: 1,
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
      id="portfolio"
      className="relative h-screen w-full overflow-hidden bg-black text-white"
    >
      <div ref={trackRef} className="flex h-full w-max">
        {projects.map((project, index) => (
          <div
            key={project.id}
            className="relative flex h-screen w-screen shrink-0 flex-col justify-between overflow-hidden p-6 md:p-12"
          >
            {/* BACKGROUND IMAGE */}
            <div className="absolute inset-0 -z-20 overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="project-image h-full w-full object-cover scale-[1.02]"
              />

              {/* SUBTLE BOTTOM GRADIENT */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
            </div>

            {/* TOP INDICATOR */}
            <div className="z-10 flex w-full justify-between text-[10px] uppercase tracking-[0.25em] text-[#4A8CFF] md:text-xs">
              <p>
                {index === 0
                  ? `I BUILT / P. 00${project.id}`
                  : `0${project.id} / 0${projects.length}`}
              </p>
            </div>

            {/* CONTENT */}
            <div className="project-content z-10 flex w-full flex-col justify-between gap-8 md:flex-row md:items-end">
              {/* LEFT SIDE */}
              <div className="flex max-w-xl flex-col gap-6">
                <div className="overflow-hidden">
                  <h2 className="text-3xl font-bold tracking-[-0.05em] text-white md:text-5xl">
                    {project.subtitle.split(" ").map((word, i) => (
                      <span
                        key={i}
                        className="word mr-3 inline-block will-change-transform"
                      >
                        {word}
                      </span>
                    ))}
                  </h2>

                  <p className="mt-5 max-w-lg text-sm font-semibold leading-relaxed text-white/75 md:text-base">
                    {project.description.split(" ").map((word, i) => (
                      <span
                        key={i}
                        className="word mr-1 inline-block will-change-transform"
                      >
                        {word}
                      </span>
                    ))}
                  </p>
                </div>

                {/* TECH STACK */}
                <div className="flex flex-wrap gap-3">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[10px] font-semibold tracking-[0.18em] text-white backdrop-blur-md md:text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* RIGHT SIDE */}
              <div className="flex flex-col items-start gap-4 md:items-end">
                <span className="text-sm font-semibold tracking-[0.25em] text-white/50">
                  {project.year}
                </span>

                <a
                  href="#"
                  className="group flex items-center gap-2 text-sm font-semibold tracking-[0.18em] text-[#4A8CFF] transition-colors hover:text-white"
                >
                  <span className="border-b border-[#4A8CFF]/30 pb-0.5 transition-colors group-hover:border-white/30">
                    VIEW PROJECT
                  </span>

                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </a>

                <a
                  href="#"
                  className="group flex items-center gap-2 text-sm font-semibold tracking-[0.18em] text-[#4A8CFF] transition-colors hover:text-white"
                >
                  <span className="border-b border-[#4A8CFF]/30 pb-0.5 transition-colors group-hover:border-white/30">
                    VISIT SITE
                  </span>

                  <span className="transition-transform duration-300 group-hover:translate-x-1">
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
