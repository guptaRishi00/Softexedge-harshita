// src/components/home/PortfolioSection.tsx
"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const projects = [
  {
    id: 1,
    title: "Aura Skincare",
    subtitle: "E-Commerce Experience",
    description:
      "Redefining digital beauty retail. We crafted a highly conversion-optimized, visually stunning headless e-commerce platform that elevated Aura's brand positioning and increased online sales by 140% in Q1.",
    tech: ["SHOPIFY", "NEXT.JS", "TAILWIND"],
    year: "2024",
    image: "/assets/zyro-O-Nemx50zDE-unsplash.jpg",
    category: "E-COMMERCE",
    type: "image",
    href: "/work/aura-skincare",
  },
  {
    id: 2,
    title: "Finova Dashboard",
    subtitle: "Financial SaaS Platform",
    description:
      "A complete UX/UI overhaul for Finova's enterprise wealth management suite. By simplifying complex data visualizations and streamlining workflows, we reduced user onboarding time by over 60%.",
    tech: ["REACT", "D3.JS", "NODE.JS", "TYPESCRIPT"],
    year: "2024",
    image: "/assets/0d3a38da975f62a06fb71d3837c0c2dd.webp",
    category: "ENTERPRISE",
    type: "image",
    href: "/work/finova-dashboard",
  },
  {
    id: 3,
    title: "Lumina Festival",
    subtitle: "Event Branding & Web",
    description:
      "An immersive digital portal for Europe's premier light and sound festival. The site features dynamic WebGL interactions that mirror the festival's physical installations, driving record-breaking ticket sales.",
    tech: ["THREE.JS", "GSAP", "NEXT.JS", "CONTENTFUL"],
    year: "2023",
    image: "/assets/ux-store-jJT2r2n7lYA-unsplash.jpg",
    category: "BRANDING",
    type: "image",
    href: "/work/lumina-festival",
  },
  {
    id: 4,
    title: "Nova Workspace",
    subtitle: "Product Launch Campaign",
    description:
      "A high-impact promotional micro-site and cinematic video campaign introducing Nova's next-generation modular office pods to the North American market.",
    tech: ["NEXT.JS", "FRAMER MOTION", "TAILWIND"],
    year: "2024",
    video: "/assets/video3.mp4",
    category: "CAMPAIGN",
    type: "video",
    href: "/work/nova-workspace",
  },
  {
    id: 5,
    title: "Zephyr Mobility",
    subtitle: "EV Automotive Marketing",
    description:
      "Launching the future of urban transit. We designed a sleek, high-performance marketing site for Zephyr's flagship electric scooter, focusing on 3D product storytelling and seamless pre-order flows.",
    tech: ["WEBGL", "REACT", "NODE.JS", "STRIPE"],
    year: "2023",
    image: "/assets/f1a35da30130d44c9a129deaf2b6b9f4.webp",
    category: "AUTOMOTIVE",
    type: "image",
    href: "/work/zephyr-mobility",
  },
];

export default function PortfolioSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);

  const { contextSafe } = useGSAP(
    () => {
      // 1. CUSTOM CURSOR TRACKING
      let moveCursor: (e: MouseEvent) => void = () => {};
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

        moveCursor = (e: MouseEvent) => {
          xTo(e.clientX);
          yTo(e.clientY);
        };

        window.addEventListener("mousemove", moveCursor);
      }

      // 2. HORIZONTAL SCROLL ANIMATION
      const track = trackRef.current;
      if (track) {
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
              const newIndex = Math.round(
                self.progress * (projects.length - 1),
              );
              setActiveIndex(newIndex);
            },
          },
        });

        // 3. TEXT REVEALS ON SCROLL
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
      }

      // CLEANUP LISTENER
      return () => {
        if (moveCursor) {
          window.removeEventListener("mousemove", moveCursor);
        }
      };
    },
    { scope: containerRef },
  );
  const handleMouseEnter = contextSafe(() => {
    gsap.to(cursorRef.current, {
      scale: 1,
      duration: 0.4,
      ease: "back.out(1.5)",
    });
  });

  const handleMouseLeave = contextSafe(() => {
    gsap.to(cursorRef.current, {
      scale: 0,
      duration: 0.3,
      ease: "power3.inOut",
    });
  });

  return (
    <section
      ref={containerRef}
      id="portfolio"
      onMouseLeave={handleMouseLeave}
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
            className="project-panel relative flex h-screen w-screen shrink-0 flex-col justify-end overflow-hidden p-8 md:p-16 lg:px-20 lg:pb-12 lg:pt-20"
          >
            {/* FULL BLEED INTERACTIVE LINK WRAPPER */}
            <Link
              href={project.href}
              className="absolute inset-0 z-20 cursor-none"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <span className="sr-only">View {project.title}</span>
            </Link>

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
            <div className="pointer-events-none relative z-10 flex w-full items-end justify-between">
              <div className="flex w-full flex-col items-start gap-4 md:gap-5 lg:w-[80%]">
                {/* Title */}
                <h2 className="reveal-item text-5xl font-bold leading-[0.9] tracking-[-0.05em] md:text-7xl lg:text-[7rem]">
                  {project.title}
                </h2>

                {/* Description */}
                <p className="reveal-item max-w-[95%] text-sm leading-[1.5] text-white/80 md:text-lg lg:max-w-[90%]">
                  {project.description}
                </p>

                {/* Tech Tags */}
                <div className="reveal-item mt-2 flex flex-wrap gap-2 md:gap-3">
                  {project.tech.map((tag, i) => (
                    <span
                      key={i}
                      className="rounded-md border border-white/20 bg-black/20 px-4 py-1.5 text-[0.65rem] font-bold uppercase tracking-widest text-white/90 backdrop-blur-md md:text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CUSTOM CURSOR FOLLOWER */}
      <div
        ref={cursorRef}
        className={cn(
          "pointer-events-none fixed left-0 top-0 z-9999 flex h-10 w-33 items-center justify-center rounded-lg bg-linear-to-r from-[#2E5BFF] to-[#149CCB] text-white",
          "will-change-transform",
        )}
      >
        <span className="mt-px ml-1 text-[0.65rem] font-bold uppercase tracking-[0.2em]">
          View Project
        </span>
      </div>
    </section>
  );
}
