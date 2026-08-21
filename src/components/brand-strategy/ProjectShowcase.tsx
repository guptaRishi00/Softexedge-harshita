"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import CarouselDots from "@/components/ui/CarouselDots";
import { tweenScrollLeft } from "@/lib/tweenScrollLeft";
import { slideStride, useInfiniteCarousel } from "@/lib/useInfiniteCarousel";
import { useIsDesktop } from "@/lib/useIsDesktop";
import SpecularBorder from "../ui/SpecularBorder";

const MotionImage = motion.create(Image);

const smoothSpring = {
  type: "spring",
  stiffness: 100,
  damping: 24,
  mass: 1,
} as const;

const premiumEase = [0.16, 1, 0.3, 1] as const;

// Autoplay cadence for the mobile carousel. RESUME is the quiet period after a
// swipe: advancing on top of the reader is worse than not advancing at all.
const AUTOPLAY_MS = 4000;
const AUTOPLAY_RESUME_MS = 2500;

const projects = [
  {
    id: 0,
    title: "Aura AI",
    description: "Next-gen artificial intelligence platform interface.",
    image:
      "https://plus.unsplash.com/premium_photo-1773861007414-869af2ea91b8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDEyOHxDRHd1d1hKQWJFd3x8ZW58MHx8fHx8",
    baseFlex: 1.4,
  },
  {
    id: 1,
    title: "Nova Tech",
    description: "Fintech dashboard for modern banking solutions.",
    image:
      "https://images.unsplash.com/photo-1775185172840-47fe371943e5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDEwMnxDRHd1d1hKQWJFd3x8ZW58MHx8fHx8",
    baseFlex: 1,
  },
  {
    id: 2,
    title: "Lumina Vision",
    description: "Immersive VR/AR experience branding.",
    image:
      "https://images.unsplash.com/photo-1775887065658-988ef1c262c6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDkyfENEd3V3WEpBYkV3fHxlbnwwfHx8fHw%3D",
    baseFlex: 2,
  },
  {
    id: 3,
    title: "Apex Dynamics",
    description: "E-commerce platform for high-end sports gear.",
    image:
      "https://images.unsplash.com/photo-1772528205616-e65dc0994c7b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDE3OHxDRHd1d1hKQWJFd3x8ZW58MHx8fHx8",
    baseFlex: 1.7,
  },
  {
    id: 4,
    title: "Nexus Core",
    description: "Cybersecurity infrastructure data visualization.",
    image:
      "https://images.unsplash.com/photo-1777646346045-df4bd1114148?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDYwfENEd3V3WEpBYkV3fHxlbnwwfHx8fHw%3D",
    baseFlex: 2,
  },
];

export default function ProjectShowcase() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const row1 = projects.slice(0, 3);
  const row2 = projects.slice(3, 7);

  const isDesktop = useIsDesktop();

  const scrollerRef = useRef<HTMLDivElement>(null);
  useInfiniteCarousel(scrollerRef, projects.length, 3, !isDesktop);

  // Self-advancing half of the mobile carousel. Deliberately an interval over a
  // scroll position rather than a frame loop: it wakes 4x a minute instead of
  // 60x a second, and it reads scrollLeft at tick time so a swipe or a dot tap
  // can never leave it pointing at a stale index.
  useEffect(() => {
    if (isDesktop) return;
    const el = scrollerRef.current;
    if (!el) return;

    let pointerDown = false;
    let lastInteraction = 0;
    // Starts true, i.e. fails OPEN: if the observer below never reports (no
    // IntersectionObserver, or a first callback that never arrives) the
    // carousel still advances. Gating on a false default means one missing
    // callback leaves it frozen forever, which is the worse failure.
    let onScreen = true;

    const hold = () => {
      pointerDown = true;
      lastInteraction = performance.now();
    };
    const release = () => {
      pointerDown = false;
      lastInteraction = performance.now();
    };

    el.addEventListener("pointerdown", hold, { passive: true });
    el.addEventListener("pointerup", release, { passive: true });
    el.addEventListener("pointercancel", release, { passive: true });

    // Offscreen ticks would silently skip cards the reader never saw, and cost
    // a tween for nothing.
    const io = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
      },
      { threshold: 0.2 },
    );
    io.observe(el);

    const tick = setInterval(() => {
      if (pointerDown || !onScreen) return;
      if (performance.now() - lastInteraction < AUTOPLAY_RESUME_MS) return;
      const stride = slideStride(el);
      if (stride <= 0) return;
      tweenScrollLeft(el, el.scrollLeft + stride);
    }, AUTOPLAY_MS);

    return () => {
      clearInterval(tick);
      io.disconnect();
      el.removeEventListener("pointerdown", hold);
      el.removeEventListener("pointerup", release);
      el.removeEventListener("pointercancel", release);
    };
  }, [isDesktop]);

  const getRowHeight = (isRow1: boolean) => {
    if (hoveredId === null) return isRow1 ? "48%" : "52%";

    if (isRow1) {
      return hoveredId < 3 ? "58%" : "42%";
    }

    return hoveredId >= 3 ? "58%" : "42%";
  };

  return (
    <section className="relative overflow-hidden bg-black px-4 pt-33 max-md:-mt-px max-md:px-3 max-md:pt-16 max-md:pb-20 font-sans text-white md:px-10 md:pb-35">
      <div className="pointer-events-none absolute inset-0 opacity-[0.04]" />

      <div className="relative mx-auto flex w-full flex-col gap-20 max-md:gap-10 md:gap-5">
        <div className="mb-34 w-full max-md:mb-0">
          <motion.span
            data-no-mobile-entry
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: premiumEase, delay: 0 }}
            className="mb-5 block ml-[3px] text-xs font-medium uppercase tracking-[0.25em] text-white/60"
          >
            Selected Work
          </motion.span>

          <div className="flex w-full flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <motion.h2
              data-no-mobile-entry
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, ease: premiumEase, delay: 0.1 }}
              className="text-5xl font-bold leading-[0.9] tracking-tight text-white max-md:text-[2.5rem] max-md:leading-[1.11] md:text-7xl lg:text-[5rem]"
            >
              Our{" "}
              <span className="bg-gradient-to-r from-[#2E5BFF] to-[#149CCB] bg-clip-text pr-3 text-transparent">
                Projects
              </span>
            </motion.h2>

            <motion.p
              data-no-mobile-entry
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, ease: premiumEase, delay: 0.2 }}
              className="max-w-2xl text-xl font-light leading-[1.25em] text-white md:text-left"
            >
              Delivering scalable, high-performance solutions that elevate
              brands and drive revenue. Delivering scalable, high-performance
              solutions that elevate brands and drive revenue.
            </motion.p>
          </div>

          {/* In the header, under the description — where BlogSection keeps
              its dots. Position is independent of the scroller they drive;
              CarouselDots only needs the ref. */}
          <CarouselDots
            scrollerRef={scrollerRef}
            count={projects.length}
            loop
            className="mt-8 md:hidden"
          />
        </div>

        {/* Below md the two stacked rows are replaced by the carousel in the
            md:hidden block underneath. Both branches use the same ProjectCard,
            and every image is `loading="lazy"`, so the hidden branch fetches
            nothing at either breakpoint. */}
        <div className="flex h-auto w-full flex-col gap-4 max-md:hidden md:h-[100vh] md:gap-6">
          <motion.div
            animate={isDesktop ? { height: getRowHeight(true) } : undefined}
            transition={smoothSpring}
            className="flex h-auto w-full flex-col gap-4 md:h-auto md:flex-row md:gap-6"
          >
            {row1.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                hoveredId={hoveredId}
                setHoveredId={setHoveredId}
              />
            ))}
          </motion.div>

          <motion.div
            animate={isDesktop ? { height: getRowHeight(false) } : undefined}
            transition={smoothSpring}
            className="flex h-auto w-full flex-col gap-4 md:h-auto md:flex-row md:gap-6"
          >
            {row2.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                hoveredId={hoveredId}
                setHoveredId={setHoveredId}
              />
            ))}
          </motion.div>
        </div>

        {/* Mobile: an endless native scroll-snap carousel that also advances
            itself — same mechanics as home/BlogSection, plus PortfolioSection's
            autoplay. It replaced a pure CSS marquee because pagination dots
            need a real scroll position to read: a continuously drifting
            transform has none, and dots against it would flicker between cards
            rather than mark one. Native scrolling still runs on the compositor,
            so a swipe never touches React.

            Three runs, because useInfiniteCarousel parks in the second one so
            there is a full run of runway in both directions. Per-card `mr-4`
            rather than a flex gap on the track keeps every run pixel-identical,
            which is what makes the wrap invisible. */}
        <div className="md:hidden">
          <div
            ref={scrollerRef}
            className="no-scrollbar relative -mx-3 snap-x snap-mandatory overflow-x-auto overscroll-x-contain scroll-pl-3 px-3"
          >
            <div className="flex w-max flex-nowrap">
              {[0, 1, 2].map((run) => (
                <div
                  key={run}
                  className="flex shrink-0"
                  aria-hidden={run !== 0}
                >
                  {projects.map((project) => (
                    <div
                      key={`${run}-${project.id}`}
                      data-slide
                      className="mr-4 w-[80vw] shrink-0 snap-start"
                    >
                      <ProjectCard
                        project={project}
                        hoveredId={hoveredId}
                        setHoveredId={setHoveredId}
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  hoveredId,
  setHoveredId,
}: {
  project: {
    id: number;
    title: string;
    description: string;
    image: string;
    baseFlex: number;
  };
  hoveredId: number | null;
  setHoveredId: (id: number | null) => void;
}) {
  const isHovered = hoveredId === project.id;
  const isAnyHovered = hoveredId !== null;
  // All card animation is desktop-only: iOS fires mouseenter on tap, and the
  // flex/scale/filter animates write inline styles that fight the static
  // mobile column layout.
  const isDesktop = useIsDesktop();

  return (
    <motion.div
      onMouseEnter={() => {
        if (isDesktop) setHoveredId(project.id);
      }}
      onMouseLeave={() => setHoveredId(null)}
      animate={
        isDesktop
          ? {
              flex: isHovered ? 4 : isAnyHovered ? 1.15 : project.baseFlex,
              scale: isHovered ? 1.01 : 1,
            }
          : undefined
      }
      transition={smoothSpring}
      className="group relative h-full min-h-[300px] w-full cursor-pointer max-md:h-[300px]"
    >
      <div className="relative h-full w-full overflow-hidden rounded-[20px]">
        <MotionImage
          src={project.image}
          alt={project.title}
          loading="lazy"
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          animate={
            isDesktop
              ? {
                  scale: isHovered ? 1.06 : 1.02,
                  filter:
                    isAnyHovered && !isHovered
                      ? "brightness(0.3) grayscale(80%)"
                      : "brightness(0.85)",
                }
              : undefined
          }
          transition={smoothSpring}
          className="absolute inset-0 h-full w-full object-cover"
        />

        <motion.div
          animate={isDesktop ? { opacity: isHovered ? 1 : 0.6 } : undefined}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent"
        />

        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-30 transition-opacity duration-700 group-hover:opacity-60" />

        <div className="pointer-events-none absolute inset-0 z-10 rounded-[20px] border border-white/10 transition-opacity duration-500 group-hover:opacity-0" />

        <div className="absolute inset-0 z-20 flex flex-col justify-between p-8 md:p-10">
          <motion.div
            animate={
              isDesktop
                ? { opacity: isHovered ? 0 : 1, y: isHovered ? -10 : 0 }
                : undefined
            }
            transition={smoothSpring}
            className="flex items-start justify-between"
          >
            <div>
              <h3 className="text-2xl font-medium tracking-tight text-white md:text-3xl">
                {project.title}
              </h3>
            </div>
          </motion.div>

          <AnimatePresence>
            {isHovered && (
              <motion.div
                data-no-mobile-entry
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: 15,
                }}
                transition={{
                  type: "spring",
                  stiffness: 120,
                  damping: 20,
                }}
                className="max-w-md"
              >
                <p className="mb-4 inline-block bg-gradient-to-r from-[#2E5BFF] to-[#149CCB] bg-clip-text pr-[0.3em] text-xs font-medium uppercase tracking-[0.3em] text-transparent">
                  Featured Case
                </p>

                <h3 className="text-4xl font-semibold tracking-tight text-white md:text-5xl lg:text-6xl">
                  {project.title}
                </h3>

                <p className="mt-5 text-sm font-light leading-relaxed text-zinc-300 md:text-base">
                  {project.description}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {isHovered && <SpecularBorder radius={20} />}
    </motion.div>
  );
}
