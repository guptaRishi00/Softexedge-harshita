// src/components/home/PortfolioSection.tsx
"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useState } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import Link from "next/link";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const projects = [
  {
    id: 1,
    title: "Website Development",
    subtitle: "Journal on design culture",
    description:
      "Observations on exploring the intersections of music, architecture, and design — the things that shape how we build and feel. Observations on exploring the intersections of music, architecture, and design — the things that shape how we build and feel.",
    tech: ["TYPESCRIPT", "TAILWIND"],
    year: "2025",
    image: "/assets/zyro-O-Nemx50zDE-unsplash.jpg",
    category: "EDITORIAL",
    type: "image",
  },
  {
    id: 2,
    title: "App development",
    subtitle: "Dental ERP system",
    description:
      "Modular practice management suite: digital odontogram, patient records, scheduling, billing, and staff time tracking — all in one unified interface. Modular practice management suite: digital odontogram, patient records, scheduling, billing, and staff time tracking — all in one unified interface.",
    tech: ["REACT", "NEXT.JS", "MONGODB", "NODE.JS", "TYPESCRIPT"],
    year: "2024",
    image: "/assets/0d3a38da975f62a06fb71d3837c0c2dd.webp",
    category: "ENTERPRISE",
    type: "image",
  },
  {
    id: 3,
    title: "Creative and branding",
    subtitle: "Daily photo missions",
    description:
      "An app where users complete daily missions by sharing photos or videos. Document the ordinary. Make it extraordinary. An app where users complete daily missions by sharing photos or videos. Document the ordinary. Make it extraordinary. by sharing photos or videos. Document the ordinary. Make it extraordinary.",
    tech: ["REACT NATIVE", "NODE.JS", "AWS S3", "POSTGRESQL"],
    year: "2024",
    image: "/assets/ux-store-jJT2r2n7lYA-unsplash.jpg",
    category: "MOBILE",
    type: "image",
  },
  {
    id: 4,
    title: "Videography",
    subtitle: "This portfolio",
    description:
      "The site you're looking at right now. Built to feel cinematic. Built to move. Built to breathe. The site you're looking at right now. Built to feel cinematic. Built to move. Built to breathe. The site you're looking at right now. Built to feel cinematic. Built to move. Built to breathe.",
    tech: ["NEXT.JS", "TYPESCRIPT", "GSAP", "LENIS", "TAILWIND"],
    year: "2024",
    video: "/assets/video3.mp4",
    category: "WEB",
    type: "video",
  },
  {
    id: 5,
    title: "Digital Marketing",
    subtitle: "This portfolio",
    description:
      "The site you're looking at right now. Built to feel like something. Built to mean something. The site you're looking at right now. Built to feel like something. Built to mean something. The site you're looking at right now. Built to feel like something. Built to mean something.",
    tech: ["NEXT.JS", "TYPESCRIPT", "GSAP", "LENIS", "TAILWIND"],
    year: "2024",
    image: "/assets/f1a35da30130d44c9a129deaf2b6b9f4.webp",
    category: "WEB",
    type: "image",
  },
];

export default function PortfolioSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useGSAP(
    () => {
      const track = trackRef.current;
      if (!track) return;
      const totalWidth = track.scrollWidth - window.innerWidth;

      const scrollTween = gsap.to(track, {
        x: () => -totalWidth,
        ease: "none",
        force3D: true,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: () => `+=${totalWidth}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const newIndex = Math.round(self.progress * (projects.length - 1));
            setActiveIndex(newIndex);
          },
        },
      });

      gsap.utils
        .toArray<HTMLElement>(".project-panel")
        .forEach((panel, index) => {
          const isFirst = index === 0;
          const content = panel.querySelectorAll(".reveal-item");
          if (!isFirst) {
            gsap.set(content, { y: 60, opacity: 0 });
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
      className="relative h-screen w-full overflow-hidden bg-[#0a0a0a] text-white"
    >
      {/* TRACK */}
      <div
        ref={trackRef}
        className="flex h-full"
        style={{ width: `${projects.length * 100}vw` }}
      >
        {projects.map((project) => (
          <div
            key={project.id}
            className="project-panel relative flex h-screen w-screen shrink-0 flex-col justify-end overflow-hidden p-8 md:p-16 lg:px-20 lg:pt-20 lg:pb-10"
          >
            {/* BACKGROUND */}
            <div className="absolute inset-0 -z-20 overflow-hidden">
              {project.type === "video" ? (
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="h-full w-full object-cover"
                >
                  <source src={project.video} type="video/mp4" />
                </video>
              ) : (
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover"
                />
              )}
              <div className="absolute inset-0 bg-linear-to-t from-black/100 via-black/20 to-transparent" />
            </div>

            {/* CONTENT */}
            <div className="relative z-10 flex w-full items-end justify-between">
              <div className="flex w-full lg:w-[80%] flex-col items-start gap-6 md:gap-8">
                {/* MINIMAL CTA MOVED ABOVE TITLE */}
                <Link
                  href="#"
                  className="reveal-item group flex w-fit items-center gap-2 text-xl font-bold tracking-wide text-white transition-colors"
                >
                  <span className="relative overflow-hidden pb-1">
                    View Project
                    <span className="absolute bottom-0 left-0 h-[1.5px] w-0 bg-[#2E5BFF] transition-all duration-300 ease-out group-hover:w-full" />
                  </span>

                  <div className="relative flex h-6 w-6 items-center justify-center overflow-hidden">
                    {/* Outgoing Arrow */}
                    <MdKeyboardArrowRight className="absolute left-0 top-0 h-full w-full transition-transform duration-300 ease-in-out group-hover:translate-x-[150%]" />

                    {/* Incoming Arrow */}
                    <MdKeyboardArrowRight className="absolute left-0 top-0 h-full w-full -translate-x-[150%] transition-transform duration-300 ease-in-out group-hover:translate-x-0" />
                  </div>
                </Link>

                {/* Title */}
                <h2 className="reveal-item text-5xl md:text-7xl lg:text-[7rem] font-bold leading-[0.9] tracking-[-0.05em]">
                  {project.title}
                </h2>

                {/* Description */}
                <p className="reveal-item max-w-[95%] lg:max-w-[85%] text-sm leading-[1.3] text-white/80 md:text-lg">
                  {project.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
