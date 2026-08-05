"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { useIsDesktop } from "@/lib/useIsDesktop";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const AUTO_ADVANCE_SECONDS = 6;
// Mobile carousel: one slide every 4.5s, each slide taking 600ms, and autoplay
// resuming 1.5s after the finger lifts.
const MOBILE_AUTOPLAY_MS = 4500;
const MOBILE_RESUME_MS = 1500;
const MOBILE_SLIDE_MS = 600;
// A held pointer expires after this, so a missing pointerup can never stall it.
const MOBILE_STUCK_POINTER_MS = 5000;

const projects = [
  {
    id: 1,
    title: "Traul",
    subtitle: "On-Demand Logistics Platform",
    description:
      "Their last vendor billed premium rates for every small change. We rebuilt all three products — admin, driver, customer — from scratch, and the whole platform cost roughly a quarter of what those isolated changes did",
    tech: ["REACT NATIVE", "NODE.JS", "GEOFENCING", "PAYMENTS"],
    year: "2024",
    image: "/assets/traul3.png",
    category: "LOGISTICS",
    type: "image",
    href: "/work/traul",
  },
  {
    id: 2,
    title: "AquaLog",
    subtitle: "Aquaculture Farm Management",
    description:
      "Shrimp farms run on paper ledgers, in ponds with no signal, where one missed water reading costs a season. We built offline-first software for that reality — and Pond Safe, which turns one farmer's outbreak report into an early warning for every farm within 7km, without exposing who reported it",
    tech: ["REACT NATIVE", "POSTGIS", "RAG AI", "OFFLINE-FIRST"],
    year: "2025",
    image: "/assets/project-dashboard-displaying-key-metrics-like-progress-budget-deadlines.jpg",
    category: "AGRITECH",
    type: "image",
    href: "/work/aqualog",
  },
  {
    id: 3,
    title: "Authentica",
    subtitle: "Sovereign Proof of Creation",
    description:
      "In a world oversaturated with content, every creation carries its own signature. Authentica seals it to the blockchain, tracks its use across platforms, transfers ownership and revokes access on command — a proof that protects itself",
    tech: ["BLOCKCHAIN", "TRACEABILITY", "WEB3", "NEXT.JS"],
    year: "2025",
    image: "/assets/microsoft-copilot-pqMPnPo4_ZA-unsplash.jpg",
    category: "WEB3",
    type: "image",
    href: "/work/authentica",
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
  const isDesktop = useIsDesktop();

  // Mobile autoplay. Dragging is NOT implemented in JS: below `md` the track is
  // a native scroll-snap container, so the browser owns the drag, the momentum
  // and the snapping — nothing runs per frame while the user is in control.
  useEffect(() => {
    if (isDesktop) return;
    const track = trackRef.current;
    if (!track) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Every gate below is a synchronous check made at tick time, never a flag
    // set by an async callback. The previous version gated on an
    // IntersectionObserver `visible` flag and a setTimeout-cleared `paused`
    // flag; if either callback failed to arrive — a missed IO delivery, a
    // `pointerdown` whose `pointerup`/`pointercancel` never came — the flag
    // latched and autoplay was dead permanently with no way back.
    let pointerDown = false;
    let lastInteraction = 0;

    let tween = 0;
    let tweenStarted = 0;

    // Autoplay drives scrollLeft itself instead of asking for
    // `behavior: "smooth"`. Programmatic smooth scrolling is the one link here
    // with no guarantee — it is ignored outright in some mobile browsers and
    // fights `scroll-snap-type: mandatory` in others, which left the carousel
    // sitting still. A rAF tween always moves. Snap is switched off for the
    // duration so it cannot re-snap mid-tween, then restored to land the slide.
    const animateTo = (to: number) => {
      const from = track.scrollLeft;
      const distance = to - from;
      if (Math.abs(distance) < 1) return;

      const snapBefore = track.style.scrollSnapType;
      track.style.scrollSnapType = "none";
      const started = performance.now();
      tweenStarted = started;

      const step = (now: number) => {
        const p = Math.min(1, (now - started) / MOBILE_SLIDE_MS);
        const eased = p < 0.5 ? 4 * p * p * p : 1 - (-2 * p + 2) ** 3 / 2;
        track.scrollLeft = from + distance * eased;
        if (p < 1) {
          tween = requestAnimationFrame(step);
        } else {
          tween = 0;
          track.style.scrollSnapType = snapBefore;
        }
      };
      tween = requestAnimationFrame(step);
    };

    const stopTween = () => {
      if (!tween) return;
      cancelAnimationFrame(tween);
      tween = 0;
      track.style.scrollSnapType = "";
    };

    // Measured fresh each tick rather than tracked by an observer, so it can
    // never be stale. One layout read every 4.5s is nothing.
    const isOnScreen = () => {
      const rect = track.getBoundingClientRect();
      return rect.bottom > 0 && rect.top < window.innerHeight;
    };

    const advance = () => {
      const now = performance.now();
      // A tween whose rAF never ran (backgrounded tab, throttled renderer)
      // would otherwise leave `tween` set and block autoplay forever. Reclaim
      // it once it has overshot its own duration.
      if (tween && now - tweenStarted > MOBILE_SLIDE_MS * 3) stopTween();
      if (tween) return;
      // A pointerdown whose up/cancel never arrived must not stall autoplay
      // for good, so the held state expires on its own.
      if (pointerDown && now - lastInteraction < MOBILE_STUCK_POINTER_MS) return;
      if (now - lastInteraction < MOBILE_RESUME_MS) return;
      if (!isOnScreen()) return;

      const page = track.clientWidth;
      const atEnd = track.scrollLeft >= track.scrollWidth - page - 1;
      animateTo(atEnd ? 0 : track.scrollLeft + page);
    };
    const tick = setInterval(advance, MOBILE_AUTOPLAY_MS);

    // Pause only while the finger is actually down, plus a short settle — NOT
    // for a fixed spell after any touch. The previous version paused for
    // seconds on every `touchstart`, including the incidental touches of
    // scrolling the PAGE past the carousel, so on a phone it could sit still
    // for ~10s after each swipe and looked like it never moved at all.
    const hold = () => {
      stopTween();
      pointerDown = true;
      lastInteraction = performance.now();
    };
    const release = () => {
      pointerDown = false;
      lastInteraction = performance.now();
    };
    // wheel has no matching "up", so hold+release act as a debounce there
    const holdEvents = ["pointerdown", "wheel"] as const;
    const releaseEvents = ["pointerup", "pointercancel", "wheel"] as const;
    for (const evt of holdEvents) {
      track.addEventListener(evt, hold, { passive: true });
    }
    for (const evt of releaseEvents) {
      track.addEventListener(evt, release, { passive: true });
    }

    return () => {
      clearInterval(tick);
      stopTween();
      for (const evt of holdEvents) track.removeEventListener(evt, hold);
      for (const evt of releaseEvents) track.removeEventListener(evt, release);
    };
  }, [isDesktop]);

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
      // No bottom padding below `md`: the section background is #0a0a0a and
      // StatsSection under it is white at pt-0, so any padding here reads as a
      // black band rather than breathing room. The slide image meets the white
      // section directly, as it did before the carousel.
      className="relative h-auto w-full overflow-hidden bg-[#0a0a0a] text-white md:h-screen"
    >
      <div
        ref={trackRef}
        // Both breakpoints lay out in a row now; below `md` this element is
        // itself the scroll container (desktop instead has GSAP translate it).
        className="no-scrollbar flex w-full flex-row max-md:snap-x max-md:snap-mandatory max-md:overflow-x-auto max-md:overscroll-x-contain md:h-full md:w-max"
      >
        {projects.map((project) => (
          <div
            key={project.id}
            // max-md:isolate — on mobile nothing above this panel creates a
            // stacking context (the GSAP transform on the track is md+ only),
            // so the -z-20 image holder escalates to the page wrapper's context
            // and the section's opaque bg-[#0a0a0a] paints OVER it: black
            // panels, no images. isolation scopes the -z-20 to this panel.
            className="project-panel relative flex h-[70svh] w-full shrink-0 flex-col justify-end overflow-hidden p-8 max-md:isolate max-md:snap-center max-md:px-3 max-md:pb-12 md:h-screen md:w-screen md:p-16 lg:px-20 lg:pb-12 lg:pt-20"
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
