"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { useIsDesktop } from "@/lib/useIsDesktop";
import { portfolioProjects as projects } from "@/data/portfolio";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Desktop: px of horizontal travel per px of page scroll while pinned. At 1
// the pin was ~8,100 px at 1440x900 (5 x 1440 px of travel + the 900 px hold),
// which read as being stuck; 2 halves the travel part. The hold is untouched:
// it is the room StatsSection's `md:-mt-[100vh]` uses to slide over the last
// panel (ScrollAnimator).
const SCROLL_SPEED = 2;


export default function PortfolioSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const isDesktop = useIsDesktop();

  // Owns panel-video playback outright: they start here, not from `autoPlay`.
  //
  // The initial decision is a SYNCHRONOUS on-screen check rather than the
  // observer's first
  // callback. That ordering is the fix. These panels are offscreen at mount,
  // so the observer's one and only callback fired "not intersecting" while
  // `pause()` was still a no-op on a video that had not started yet; `autoPlay`
  // then started it, the panel never intersected again, and no second callback
  // ever came. The result was a 951KB video decoding for the entire visit
  // behind a panel four slides to the right.
  //
  // A video that IS on screen at mount still plays immediately and is only ever
  // stopped by an explicit "not intersecting", so the fail-open behaviour that
  // keeps a visible panel from sticking on a black frame is unchanged.
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const videos = Array.from(container.querySelectorAll("video"));
    if (videos.length === 0) return;

    const onScreen = (el: Element) => {
      const r = el.getBoundingClientRect();
      return (
        r.bottom > 0 &&
        r.top < window.innerHeight &&
        r.right > 0 &&
        r.left < window.innerWidth
      );
    };
    for (const v of videos) {
      if (onScreen(v)) v.play().catch(() => {});
    }

    if (typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const v = entry.target as HTMLVideoElement;
          if (entry.isIntersecting) v.play().catch(() => {});
          else v.pause();
        }
      },
      { rootMargin: "100px" },
    );
    for (const v of videos) io.observe(v);
    return () => io.disconnect();
  }, []);

  const { contextSafe } = useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        let moveCursor: (e: MouseEvent) => void = () => {};
        let guardTick: () => void = () => {};
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

          let lastX = -1;
          let lastY = -1;
          moveCursor = (e: MouseEvent) => {
            lastX = e.clientX;
            lastY = e.clientY;
            xTo(e.clientX);
            yTo(e.clientY);
          };

          // The pill only hides on a link's mouseleave, which never fires
          // while the pointer is still and the PAGE moves under it: the pin
          // scrolls panels sideways and then StatsSection slides over this
          // section, so the pill was left floating over the next section.
          // While it is visible, check what is actually under the pointer
          // and hide it unless that is one of this section's project links.
          // Started once and left to run: re-issuing it every tick restarts
          // the ease each frame and the pill only crawls out.
          let hideTween: gsap.core.Tween | null = null;
          guardTick = () => {
            if (lastX < 0 || hideTween?.isActive()) return;
            if (parseFloat(cursor.style.opacity || "0") < 0.05) return;
            const hit = document
              .elementFromPoint(lastX, lastY)
              ?.closest("[data-cursor-target]");
            if (hit && containerRef.current?.contains(hit)) return;
            hideTween = gsap.to(cursor, {
              scale: 0,
              autoAlpha: 0,
              duration: 0.2,
              ease: "power3.inOut",
              overwrite: "auto",
            });
          };

          window.addEventListener("mousemove", moveCursor);
          gsap.ticker.add(guardTick);
        }

        const track = trackRef.current;
        if (track) {
          // Count panels from the DOM: the "Our Projects" title slide is a
          // panel with no projects[] entry, so projects.length undercounts.
          // querySelectorAll, not children.length — the panels sit inside the
          // mobile slide wrapper (display:contents on md, but still one child).
          const panelCount = track.querySelectorAll(".project-panel").length;
          const totalWidth = track.scrollWidth - window.innerWidth;
          const holdPx = window.innerHeight;
          // Page-scroll distance that drives the horizontal travel.
          const travelPx = totalWidth / SCROLL_SPEED;
          const xPhase = travelPx / (travelPx + holdPx);
          const scrollTween = gsap
            .timeline({
              scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: () => `+=${travelPx + holdPx}`,
                pin: true,
                scrub: 1,
                anticipatePin: 1,
                invalidateOnRefresh: true,
                snap: {
                  snapTo: (value) => {
                    if (value >= xPhase) return value;
                    const steps = panelCount - 1;
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
              duration: travelPx,
            })
            .to({}, { duration: holdPx });

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
          gsap.ticker.remove(guardTick);
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
      onMouseLeave={isDesktop ? handleMouseLeave : undefined}
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
        {/* Panel row. `md:contents` erases the box on desktop so the GSAP
            track keeps translating panels directly; below md the reader swipes
            the native snap scroller (no autoplay). w-full (not w-max): panels
            size against the scroller's width, and their overflow still extends
            the scroller's scrollable range. */}
        <div className="flex w-full flex-row md:contents">
          {/* Title slide — typographic opener before the case studies. It
            carries the same `project-panel` class so the desktop GSAP (snap
            steps and the reveal loop, both keyed on panel order) treats it as
            panel 0 — which the reveal loop already leaves static. Pure text on
            the section's own #0a0a0a: no image to decode, nothing animating. */}
          <div className="project-panel relative isolate flex h-[70svh] w-full shrink-0 flex-col justify-center overflow-hidden bg-linear-to-br from-[#171717] via-[#0a0a0a] to-black p-8 max-md:snap-center max-md:px-3 md:h-screen md:w-screen md:p-16 lg:px-20">

            <h2 className="relative text-[3.25rem] font-bold leading-[0.9] tracking-[-0.04em] max-md:text-[2.75rem] md:text-8xl lg:text-[9rem]">
              Our{" "}
              {/* `pr-3` is load-bearing, not spacing: `bg-clip-text` paints the
                  gradient only within the element's box, and this h2's
                  `tracking-[-0.04em]` pulls the box in until the final "s"
                  overhangs it by ~2px at the 144px size — that sliver gets no
                  gradient and reads as a cut letter. Same fix the other
                  gradient headings already carry. */}
              <span className="bg-linear-to-r from-[#2E5BFF] to-[#149CCB] bg-clip-text pr-3 text-transparent">
                Projects
              </span>
            </h2>
            <p className="relative mt-8 max-w-xl text-lg font-light leading-[1.25em] text-white max-md:mt-6 max-md:text-base">
              {String(projects.length).padStart(2, "0")} case studies in brand,
              product and growth — scroll to explore
            </p>
          </div>

          {projects.map((project, panelIndex) => (
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
                data-cursor-target
                className="absolute inset-0 z-20 cursor-none max-md:cursor-pointer"
                // Same iOS first-tap-is-a-hover problem as ChannelCard: this
                // cursor pill is `hidden md:flex`, but animating it in during
                // the synthesised hover pass still costs the panel its first
                // tap, so the link needs tapping twice.
                onMouseEnter={isDesktop ? handleMouseEnter : undefined}
                onMouseLeave={isDesktop ? handleMouseLeave : undefined}
              >
                <span className="sr-only">View {project.title}</span>
              </Link>

              <div className="absolute inset-0 -z-20 overflow-hidden">
                {project.type === "video" ? (
                  // No `autoPlay` — the effect above starts it, so a panel
                  // that is offscreen at mount never begins decoding at all.
                  // `preload="none"` follows from that: this panel is four
                  // slides right of the entry point, so its 951KB was being
                  // pulled down on every visit for a background most readers
                  // never scroll to. Playback does not wait for the whole file
                  // either — `play()` starts as soon as enough is buffered.
                  <video
                    muted
                    loop
                    preload="none"
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
                    // Eager for the FIRST panel only. Eager everywhere meant
                    // all five full-viewport backgrounds were fetched and
                    // decoded during load — four of them for panels sitting
                    // off to the right of a horizontal scroller that the reader
                    // may never reach. On a phone those decodes land in the
                    // same window as first scroll and read as tap latency.
                    // The original "a deferred load leaves the panel black"
                    // note still holds for the panel you can actually see on
                    // arrival, which is exactly the one kept eager.
                    loading={panelIndex === 0 ? "eager" : "lazy"}
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

                  <h2 className="reveal-item -ml-[0.05em] text-5xl font-bold leading-[0.9] tracking-[-0.05em] max-md:text-[2.125rem] md:text-7xl lg:text-[7rem]">
                    {project.title}
                  </h2>

                  <p className="reveal-item max-w-[95%] text-sm leading-[1.5] text-white/80 max-md:text-sm md:text-lg lg:max-w-[90%]">
                    {project.description}
                  </p>

                  <div className="reveal-item mt-2 flex flex-wrap gap-2 md:gap-3">
                    {project.tech.map((tag, i) => (
                      <span
                        key={i}
                        // No backdrop-filter below md. Every one of these chips
                        // makes the compositor snapshot and blur what is behind it
                        // on EVERY frame, and the panels put ~19 of them inside a
                        // horizontal scroller — the single biggest cost while
                        // swiping. The heavier flat bg keeps them just as legible
                        // over the photo. Desktop keeps the blur.
                        className="rounded-md border border-white/20 bg-black/20 px-4 py-1.5 text-[0.65rem] font-bold uppercase tracking-widest text-white/90 backdrop-blur-md max-md:bg-black/50 max-md:px-3 max-md:py-1 max-md:text-[0.6rem] max-md:backdrop-blur-none md:text-xs"
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
