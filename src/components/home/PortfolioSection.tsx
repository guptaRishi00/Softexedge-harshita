"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const AUTO_ADVANCE_SECONDS = 6;

const projects = [
  {
    id: 1,
    title: "Traul",
    subtitle: "On-Demand Logistics Platform",
    description:
      "A complete rebuild of an on-demand logistics platform — admin portal, driver app and customer app — engineered from scratch on React Native and Node.js, with real-time dispatch, geofencing and B2B billing built in, at roughly 75% lower cost than the previous vendor",
    tech: ["REACT NATIVE", "NODE.JS", "GEOFENCING", "PAYMENTS"],
    year: "2024",
    image: "/assets/traul3.png",
    category: "LOGISTICS",
    type: "image",
    href: "/work/traul",
  },
  {
    id: 2,
    title: "Finova Dashboard",
    subtitle: "Financial SaaS Platform",
    description:
      "A complete UX/UI overhaul for Finova's enterprise wealth management suite. By simplifying complex data visualizations and streamlining workflows, we reduced user onboarding time by over 60%",
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
      "An immersive digital portal for Europe's premier light and sound festival. The site features dynamic WebGL interactions that mirror the festival's physical installations, driving record-breaking ticket sales",
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
      "A high-impact promotional micro-site and cinematic video campaign introducing Nova's next-generation modular office pods to the North American market",
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
      "Launching the future of urban transit. We designed a sleek, high-performance marketing site for Zephyr's flagship electric scooter, focusing on 3D product storytelling and seamless pre-order flows",
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

  const { contextSafe } = useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        let moveCursor: (e: MouseEvent) => void = () => {};
        const cursor = cursorRef.current;

        if (cursor) {
          gsap.set(cursor, {
            scale: 0,
            autoAlpha: 0,
            xPercent: -50,
            yPercent: -50,
          });

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

        let cleanupAuto: () => void = () => {};
        const track = trackRef.current;
        if (track) {
          const totalWidth = track.scrollWidth - window.innerWidth;
          const holdPx = window.innerHeight;
          const xPhase = totalWidth / (totalWidth + holdPx);
          const scrollTween = gsap
            .timeline({
              scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: () => `+=${totalWidth + holdPx}`,
                pin: true,
                scrub: 1,
                anticipatePin: 1,
                invalidateOnRefresh: true,
                snap: {
                  snapTo: (value) => {
                    if (value >= xPhase) return value;
                    const steps = projects.length - 1;
                    return (
                      (Math.round((value / xPhase) * steps) / steps) * xPhase
                    );
                  },
                  duration: { min: 0.15, max: 0.4 },
                  delay: 0.08,
                  ease: "power1.inOut",
                },
              },
            })
            .to(track, {
              x: () => -totalWidth,
              ease: "none",
              force3D: true,
              duration: totalWidth,
            })
            .to({}, { duration: holdPx });

          const st = scrollTween.scrollTrigger;
          let autoTween: gsap.core.Tween | null = null;

          const stopAuto = () => {
            autoTween?.kill();
            autoTween = null;
          };

          const startAuto = () => {
            if (!st || autoTween) return;
            if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
              return;
            }
            const from = st.scroll();
            const to = st.start + totalWidth;
            if (from >= to) return;

            const proxy = { y: from };
            autoTween = gsap.to(proxy, {
              y: to,
              duration: ((to - from) / totalWidth) * AUTO_ADVANCE_SECONDS,
              ease: "none",
              onUpdate: () => st.scroll(proxy.y),
              onComplete: stopAuto,
            });
          };

          const interrupts = ["wheel", "touchstart", "pointerdown", "keydown"];
          for (const evt of interrupts) {
            window.addEventListener(evt, stopAuto, { passive: true });
          }

          ScrollTrigger.create({
            trigger: containerRef.current,
            start: "top top",
            end: () => `+=${totalWidth + holdPx}`,
            onEnter: startAuto,
            onLeave: stopAuto,
            onLeaveBack: stopAuto,
          });

          cleanupAuto = () => {
            stopAuto();
            for (const evt of interrupts) {
              window.removeEventListener(evt, stopAuto);
            }
          };

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

        return () => {
          if (moveCursor) {
            window.removeEventListener("mousemove", moveCursor);
          }
          cleanupAuto();
        };
      });
      return () => mm.revert();
    },
    { scope: containerRef },
  );
  const handleMouseEnter = contextSafe(() => {
    gsap.to(cursorRef.current, {
      scale: 1,
      autoAlpha: 1,
      duration: 0.4,
      ease: "back.out(1.5)",
    });
  });

  const handleMouseLeave = contextSafe(() => {
    gsap.to(cursorRef.current, {
      scale: 0,
      autoAlpha: 0,
      duration: 0.3,
      ease: "power3.inOut",
    });
  });

  return (
    <section
      ref={containerRef}
      id="portfolio"
      onMouseLeave={handleMouseLeave}
      className="relative h-auto w-full overflow-hidden bg-[#0a0a0a] text-white md:h-screen"
    >
      <div
        ref={trackRef}
        className="flex w-full flex-col md:h-full md:w-max md:flex-row"
      >
        {projects.map((project) => (
          <div
            key={project.id}
            // max-md:isolate — on mobile nothing above this panel creates a
            // stacking context (the GSAP transform on the track is md+ only),
            // so the -z-20 image holder escalates to the page wrapper's context
            // and the section's opaque bg-[#0a0a0a] paints OVER it: black
            // panels, no images. isolation scopes the -z-20 to this panel.
            className="project-panel relative flex h-[70svh] w-full shrink-0 flex-col justify-end overflow-hidden p-8 max-md:isolate max-md:px-3 max-md:last:pb-16 md:h-screen md:w-screen md:p-16 lg:px-20 lg:pb-12 lg:pt-20"
          >
            <Link
              href={project.href}
              className="absolute inset-0 z-20 cursor-none max-md:cursor-pointer"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <span className="sr-only">View {project.title}</span>
            </Link>

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
                <Image
                  src={project.image as string}
                  alt={project.title}
                  fill
                  sizes="100vw"
                  // Eager on purpose: this is the panel's background, not an
                  // incidental image. next/image defaults to lazy, which the
                  // raw <img> here never was, and a deferred load leaves the
                  // panel rendering as a black box until it arrives.
                  loading="eager"
                  className="h-full w-full object-cover"
                />
              )}
              <div className="absolute inset-0 bg-linear-to-t from-black/100 via-black/20 to-transparent" />
            </div>

            <div className="pointer-events-none relative z-10 flex w-full items-end justify-between">
              <div className="flex w-full flex-col items-start gap-4 max-md:gap-3 md:gap-5 lg:w-[80%]">
                <p className="reveal-item text-sm font-medium uppercase tracking-[0.3em] text-white max-md:text-xs">
                  {project.category}
                </p>

                <h2 className="reveal-item -ml-[0.05em] text-5xl font-bold leading-[0.9] tracking-[-0.05em] max-md:text-3xl md:text-7xl lg:text-[7rem]">
                  {project.title}
                </h2>

                <p className="reveal-item max-w-[95%] text-sm leading-[1.5] text-white/80 max-md:text-xs md:text-lg lg:max-w-[90%]">
                  {project.description}
                </p>

                <div className="reveal-item mt-2 flex flex-wrap gap-2 md:gap-3">
                  {project.tech.map((tag, i) => (
                    <span
                      key={i}
                      className="rounded-md border border-white/20 bg-black/20 px-4 py-1.5 text-[0.65rem] font-bold uppercase tracking-widest text-white/90 backdrop-blur-md max-md:px-3 max-md:py-1 max-md:text-[0.6rem] md:text-xs"
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

      <div
        ref={cursorRef}
        className={cn(
          "pointer-events-none fixed left-0 top-0 z-9999 hidden h-10 w-33 items-center justify-center rounded-lg bg-linear-to-r from-[#2E5BFF] to-[#149CCB] text-white md:flex",
          "invisible opacity-0",
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
