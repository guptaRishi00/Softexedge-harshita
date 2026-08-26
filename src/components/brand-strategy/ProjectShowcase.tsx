"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import CarouselDots from "@/components/ui/CarouselDots";
import { useInfiniteCarousel } from "@/lib/useInfiniteCarousel";
import { useIsDesktop } from "@/lib/useIsDesktop";
import SpecularBorder from "../ui/SpecularBorder";

const MotionImage = motion.create(Image);

const premiumEase = [0.16, 1, 0.3, 1] as const;

// A TWEEN, not the spring this used to be, because this choreography is
// layout-driven: a single hover animates BOTH row `height`s and ALL the card
// `flex` values, so every frame is a full relayout of the grid and of the
// images, gradients and text inside it. A spring at stiffness 100 / damping 24
// keeps emitting frames through its overshoot and settle tail for roughly a
// second after the movement already reads as finished — that tail was most of
// the cost, and it is what made the hover feel heavy. A fixed duration ends
// deterministically, and re-hovering interrupts cleanly instead of compounding
// with a still-settling spring. Matches the seven TracingBorder copies.
const smoothTween = {
  type: "tween",
  duration: 0.45,
  ease: premiumEase,
} as const;

const projects = [
  {
    id: 0,
    title: "Aura AI",
    href: "/work/aura-skincare",
    category: "SaaS",
    year: "2025",
    description: "Next-gen artificial intelligence platform interface.",
    image:
      "https://plus.unsplash.com/premium_photo-1773861007414-869af2ea91b8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDEyOHxDRHd1d1hKQWJFd3x8ZW58MHx8fHx8",
    baseFlex: 1.4,
  },
  {
    id: 1,
    title: "Nova Tech",
    href: "/work/nova-workspace",
    category: "SaaS",
    year: "2025",
    description: "Fintech dashboard for modern banking solutions.",
    image:
      "https://images.unsplash.com/photo-1775185172840-47fe371943e5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDEwMnxDRHd1d1hKQWJFd3x8ZW58MHx8fHx8",
    baseFlex: 1,
  },
  {
    id: 2,
    title: "Lumina Vision",
    href: "/work/lumina-festival",
    category: "Branding",
    year: "2024",
    description: "Immersive VR/AR experience branding.",
    image:
      "https://images.unsplash.com/photo-1775887065658-988ef1c262c6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDkyfENEd3V3WEpBYkV3fHxlbnwwfHx8fHw%3D",
    baseFlex: 2,
  },
  {
    id: 3,
    title: "Apex Dynamics",
    href: "/work/apex-analytics",
    category: "E-Commerce",
    year: "2024",
    description: "E-commerce platform for high-end sports gear.",
    image:
      "https://images.unsplash.com/photo-1772528205616-e65dc0994c7b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDE3OHxDRHd1d1hKQWJFd3x8ZW58MHx8fHx8",
    baseFlex: 1.7,
  },
  {
    id: 4,
    title: "Nexus Core",
    href: "/work",
    category: "Web App",
    year: "2024",
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
            className="mb-5 block ml-[3px] text-xs font-medium uppercase tracking-[0.25em] text-white/60 max-md:tracking-[0.3em] max-md:text-zinc-500"
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
              className="text-5xl font-bold leading-[0.9] tracking-tight text-white max-md:text-[2.5rem] max-md:leading-[1.11111] md:text-7xl lg:text-[5rem]"
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
              className="max-w-2xl text-xl font-light leading-[1.25em] text-white max-md:text-lg md:text-left"
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
            transition={smoothTween}
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
            transition={smoothTween}
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

        {/* Mobile: an endless native scroll-snap carousel, driven only by the
            reader's finger — no autoplay. Native scrolling IS the drag here:
            the browser owns the grab, the momentum and the snap, all on the
            compositor, so a swipe never touches React. That is also why there
            is no JS pointer-drag handler — one would have to fight the native
            gesture rather than add to it.

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
                      className="mr-4 w-[calc(100vw-1.5rem)] shrink-0 snap-start"
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
    href: string;
    category: string;
    year: string;
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
      transition={smoothTween}
      className="group relative h-full min-h-[300px] w-full cursor-pointer max-md:h-[460px]"
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
                  // Both states MUST list the same filter functions in the
                  // same order. The resting value used to be plain
                  // `brightness(0.85)` while the dimmed one added
                  // `grayscale(80%)`, and framer cannot interpolate between
                  // two filter lists of different shape — it swapped them
                  // discretely instead, which is the "blink" on hover.
                  // Spelling out `grayscale(0%)` at rest costs nothing
                  // visually and lets both functions animate as numbers.
                  filter:
                    isAnyHovered && !isHovered
                      ? "brightness(0.3) grayscale(80%)"
                      : "brightness(0.85) grayscale(0%)",
                }
              : undefined
          }
          transition={smoothTween}
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
            transition={smoothTween}
            className="flex items-start justify-between"
          >
            {/* Desktop keeps the title in the top slot. Below md this card
                adopts work/ProjectCard's resting layout instead — category chip
                left, year right, title moved down to the bottom slot — so the
                two showcases read the same on a phone. */}
            <div className="max-md:hidden">
              <h3 className="text-2xl font-medium tracking-tight text-white md:text-3xl">
                {project.title}
              </h3>
            </div>

            <span className="rounded-md border border-white/20 bg-black/20 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-widest text-white/80 backdrop-blur-md max-md:bg-black/50 max-md:backdrop-blur-none md:hidden">
              {project.category}
            </span>
            <span className="text-sm font-medium text-white/50 md:hidden">
              {project.year}
            </span>
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

          {/* Mobile details, always on — desktop reveals its copy on hover via
              the AnimatePresence block above, and there is no hover on touch.
              Classes are work/ProjectCard's resting bottom block verbatim (its
              md:/lg: title steps are dropped since this block is md:hidden), so
              the two cards match below md. */}
          <div className="md:hidden">
            <h3 className="text-3xl font-bold tracking-tight text-white">
              {project.title}
            </h3>
            <p className="mt-2 text-sm font-medium text-white/60">
              {project.description}
            </p>
          </div>
        </div>
      </div>

      {isHovered && <SpecularBorder radius={20} />}

      {/* Cover link rather than wrapping the card: the `motion.div` above IS
          the flex item whose `flex` value animates, so putting an anchor
          around it would hand the animated property to a non-flex-item and
          collapse the row. Same overlay idiom as home/PortfolioSection. z-30
          clears the z-20 content, which is inert text — there is nothing else
          interactive inside the card to shadow. */}
      <Link
        href={project.href}
        className="absolute inset-0 z-30 rounded-[20px]"
        aria-label={`View ${project.title}`}
      />
    </motion.div>
  );
}
