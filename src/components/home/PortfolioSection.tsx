"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useState } from "react";
import DynamicButton from "../ui/DynamicButton"; // Import added

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
            className="project-panel relative flex h-screen w-screen shrink-0 flex-col justify-end overflow-hidden p-8 md:p-16 lg:p-20"
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
              <div className="absolute inset-0 bg-gradient-to-t from-black/100 via-black/20 to-transparent" />
            </div>

            {/* CONTENT */}
            <div className="relative z-10 flex w-full items-end justify-between">
              {/* Left Content */}
              <div className="flex w-3/4 lg:w-[80%] flex-col gap-10">
                <h2 className="reveal-item text-5xl md:text-7xl lg:text-[7rem] font-bold leading-[0.9] tracking-[-0.05em]">
                  {project.title}
                </h2>
                <div className="flex flex-col items-baseline gap-3">
                  <p className="reveal-item text-lg md:text-2xl text-white uppercase font-black tracking-wide">
                    {project.subtitle}
                  </p>
                  <p className="reveal-item text-sm md:text-lg text-white/80 leading-[1.8] max-w-[85%]">
                    {project.description}
                  </p>
                </div>
              </div>

              {/* Right CTA */}
              <div className="reveal-item pb-4">
                <DynamicButton
                  text="View Project"
                  className="bg-white text-black"
                  href="/"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
