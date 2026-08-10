"use client";

import {
  AnimatePresence,
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { MdArrowOutward } from "react-icons/md";
import { NO_ENTRY, useIsDesktop, useIsMobile } from "@/lib/useIsDesktop";
import CarouselDots from "@/components/ui/CarouselDots";
import { useInfiniteCarousel } from "@/lib/useInfiniteCarousel";

const SCROLL_SECONDS = 22;

const premiumEase = [0.16, 1, 0.3, 1] as const;

const wrap = (min: number, max: number, v: number) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

const blogPosts = [
  {
    id: 1,
    title:
      "Google IO 2026: What Your C-Suite Needs to Know (AI Mode Google Guide UPDATED)",
    author: "Carrie Rose",
    readTime: "15 mins",
    tag: "Resources",
    image:
      "https://images.unsplash.com/photo-1780006015851-2d1b3bcadbfd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDI1fHFQWXNEenZKT1ljfHxlbnwwfHx8fHw%3D",
    href: "/blog/google-io-2026",
  },
  {
    id: 2,
    title:
      "Rise at Seven Exits Sheffield and Triples Manchester as new HQ as they go for global expansion",
    author: "Ray Saddiq",
    readTime: "8 mins",
    tag: "Company News",
    image:
      "https://plus.unsplash.com/premium_photo-1776661561367-93c4100618d6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDIwM3xxUFlzRHp2Sk9ZY3x8ZW58MHx8fHx8",
    href: "/blog/rise-at-seven-expansion",
  },
  {
    id: 3,
    title:
      "Rise at Seven Exits Sheffield and Triples Manchester as new HQ as they go for global expansion",
    author: "Ray Saddiq",
    readTime: "8 mins",
    tag: "Company News",
    image:
      "https://images.unsplash.com/photo-1773332611613-dbdc64f09807?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyMnx8fGVufDB8fHx8fA%3D%3D",
    href: "/blog/rise-at-seven-expansion",
  },
  {
    id: 4,
    title:
      "4 Ways Rise at Seven Exits Sheffield and Triples Manchester as new HQ as they go for global expansion",
    author: "Ray Saddiq",
    readTime: "8 mins",
    tag: "Company News",
    image:
      "https://images.unsplash.com/photo-1654875185977-4a97176ef3f9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDl8fHxlbnwwfHx8fHw%3D",
    href: "/blog/rise-at-seven-expansion",
  },
];

const rotatingWords = ["Perspectives", "Insights", "Ideas", "Stories"];

// Desktop-only marquee driver. `useAnimationFrame` cannot be called
// conditionally, and calling it unconditionally keeps framer's global frame
// loop alive at display refresh rate even on mobile, where the callback body
// just early-returned — a permanent per-frame tax on the breakpoint that
// doesn't use it. As a child that only mounts on desktop, mobile never
// registers it. Renders nothing, so conditional mounting cannot desync SSR.
function DesktopAutoScroll({
  x,
  loopWidth,
  trackInView,
  dragging,
}: {
  x: ReturnType<typeof useMotionValue<number>>;
  loopWidth: number;
  trackInView: boolean;
  dragging: React.RefObject<boolean>;
}) {
  useAnimationFrame((_, delta) => {
    if (!trackInView || dragging.current || !loopWidth) return;
    const step = (loopWidth / SCROLL_SECONDS) * (delta / 1000);
    x.set(wrap(-loopWidth, 0, x.get() - step));
  });
  return null;
}

export default function BlogSection() {
  const isDesktop = useIsDesktop();
  // Entry animations are desktop-only; below md they land instantly (NO_ENTRY).
  const isMobile = useIsMobile();
  const [index, setIndex] = useState(0);

  const x = useMotionValue(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const [loopWidth, setLoopWidth] = useState(0);
  const dragging = useRef(false);
  const lastPointerX = useRef(0);

  useEffect(() => {
    // Mobile renders rotatingWords[0] statically (the AnimatePresence branch is
    // isDesktop-only), so ticking `index` there only re-rendered the section
    // every 6s for nothing.
    if (!isDesktop) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isDesktop]);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const measure = () => {
      const first = el.firstElementChild as HTMLElement | null;
      if (!first) return;
      const styles = getComputedStyle(el);
      const gap = Number.parseFloat(styles.columnGap || styles.gap || "0") || 0;
      setLoopWidth(first.offsetWidth + gap);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [isDesktop]);

  const xWrapped = useTransform(x, (v) =>
    loopWidth ? wrap(-loopWidth, 0, v) : v,
  );

  const trackInView = useInView(trackRef, { margin: "200px" });

  // Below md this is a NATIVE scroll-snap carousel — same mechanics as
  // PortfolioSection, the one carousel that stayed smooth on device. JS
  // pointermove dragging pays main-thread latency; native scrolling runs on
  // the compositor thread and cannot be blocked by script. Desktop keeps its
  // framer `x` marquee untouched; the second CardTrack copy (needed only for
  // the desktop wrap) is CSS-hidden below md.
  const scrollerRef = useRef<HTMLDivElement>(null);
  useInfiniteCarousel(scrollerRef, blogPosts.length, 3, !isDesktop);

  const isPanning = useRef(false);
  const startPointerX = useRef(0);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDesktop) return;
    dragging.current = true;
    isPanning.current = false;
    startPointerX.current = e.clientX;
    lastPointerX.current = e.clientX;
  };
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return;
    const dx = e.clientX - lastPointerX.current;
    lastPointerX.current = e.clientX;
    if (!isPanning.current) {
      if (Math.abs(e.clientX - startPointerX.current) <= 6) return;
      isPanning.current = true;
      e.currentTarget.setPointerCapture(e.pointerId);
    }
    x.set(x.get() + dx);
  };
  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return;
    dragging.current = false;
    if (isPanning.current) e.currentTarget.releasePointerCapture?.(e.pointerId);
    // isPanning stays true until the trailing click is suppressed below.
  };
  const handleClickCapture = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isPanning.current) {
      e.preventDefault();
      e.stopPropagation();
      isPanning.current = false;
    }
  };

  const CardTrack = ({ className = "" }: { className?: string }) => (
    // max-md:gap-0 + per-card max-md:mr-4 instead of a flex gap: with a gap, N
    // cards have only N-1 gaps, so -50% of a two-copy track is one gap short of
    // exactly one copy and the loop drifts each cycle. Folding the spacing into
    // every card makes width = 2N*(card+gap), so -50% lands on the duplicate.
    <div className={`flex shrink-0 gap-4 md:gap-3 max-md:gap-0 ${className}`}>
      {blogPosts.map((post) => (
        <div
          key={post.id}
          data-slide
          className="w-[55vw] shrink-0 sm:w-[40vw] md:w-[30vw] lg:w-[25vw] max-md:mr-4 max-md:w-[80vw] max-md:snap-start"
        >
          <Link href={post.href} draggable={false} className="block h-full">
            <article className="group flex h-full flex-col max-md:rounded-2xl max-md:border max-md:border-black/10 max-md:bg-white max-md:p-2.5 max-md:pb-6 max-md:shadow-sm">
              {/* max-md:rounded-2xl mirrors the card's own class rather than a
                  literal value, so the two radii stay identical if the theme's
                  --radius-2xl ever changes. Desktop keeps rounded-[1.25rem]. */}
              <div className="relative aspect-square w-full overflow-hidden rounded-[1.25rem] bg-zinc-100 transition-[aspect-ratio] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] max-md:rounded-2xl md:group-hover:aspect-[3/4]">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 55vw, 25vw"
                  className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] md:group-hover:scale-105"
                  draggable={false}
                />
                <div className="pointer-events-none absolute inset-0 rounded-[1.25rem] bg-gradient-to-t from-black/75 via-black/15 to-transparent opacity-0 transition-opacity duration-500 md:group-hover:opacity-100" />
              </div>

              <div className="relative z-10 mt-4 flex flex-1 flex-col px-2 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] md:group-hover:-mt-32 md:group-hover:px-4 md:group-hover:pb-4">
                <div className="mb-3 flex items-center gap-2 text-sm font-medium text-zinc-500 transition-colors duration-500 max-md:mb-2 max-md:text-xs md:group-hover:text-white/70">
                  <span className="text-zinc-800 transition-colors duration-500 md:group-hover:text-white">
                    {post.author}
                  </span>
                  <span className="h-1 w-1 rounded-full bg-zinc-300 md:group-hover:bg-white/50" />
                  <span>{post.readTime}</span>
                </div>

                <h3 className="text-lg font-bold leading-[1.2em] tracking-tight text-zinc-900 transition-colors duration-500 md:group-hover:text-white lg:text-xl">
                  {post.title}
                </h3>
              </div>
            </article>
          </Link>
        </div>
      ))}
    </div>
  );

  return (
    <section className="w-full overflow-hidden bg-white text-black pb-10 max-md:pb-16 md:pb-32">
      {isDesktop && (
        <DesktopAutoScroll
          x={x}
          loopWidth={loopWidth}
          trackInView={trackInView}
          dragging={dragging}
        />
      )}
      <div className="mx-auto w-full ">
        <div className="mb-12 w-full px-4 max-md:mb-8 max-md:px-3 md:mb-20 md:px-10">
          <motion.p
            data-no-mobile-entry
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={
              isMobile ? NO_ENTRY : { duration: 0.6, ease: premiumEase }
            }
            className="mb-3 text-sm uppercase tracking-[0.3em] text-zinc-500 font-medium max-md:mb-6 max-md:text-xs"
          >
            Latest Insights
          </motion.p>

          <div className="flex w-full flex-col items-start justify-between gap-8 max-md:gap-8 md:flex-row md:items-center">
            <motion.div
              data-no-mobile-entry
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={
                isMobile
                  ? NO_ENTRY
                  : { duration: 0.6, delay: 0.1, ease: premiumEase }
              }
              className="flex flex-col items-start"
            >
              <h2 className="text-4xl font-bold tracking-tight text-zinc-900 max-md:text-[2.5rem] md:text-5xl lg:text-6xl lg:leading-[1.05]">
                Thoughts &
                <span className="inline-grid overflow-hidden py-1 px-6 -mx-6 [mask-image:linear-gradient(to_right,transparent_0,black_24px,black_calc(100%-24px),transparent_100%)]">
                  {isDesktop ? (
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={index}
                        initial={{ x: "-100%", opacity: 0 }}
                        animate={{ x: "0%", opacity: 1 }}
                        exit={{
                          x: "100%",
                          opacity: 0,
                          transition: { duration: 1.5, ease: "easeInOut" },
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 22,
                          damping: 20,
                          mass: 1,
                        }}
                        className="col-start-1 row-start-1 bg-gradient-to-r from-[#2E5BFF] to-[#149CCB] bg-clip-text pl-3 pr-2 leading-[1.3em] text-transparent max-md:pl-0"
                      >
                        {rotatingWords[index]}
                      </motion.span>
                    </AnimatePresence>
                  ) : (
                    <span className="col-start-1 row-start-1 bg-gradient-to-r from-[#2E5BFF] to-[#149CCB] bg-clip-text pl-3 pr-2 leading-[1.3em] text-transparent max-md:pl-0">
                      {rotatingWords[0]}
                    </span>
                  )}
                </span>
              </h2>
            </motion.div>

            <motion.div
              data-no-mobile-entry
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={
                isMobile
                  ? NO_ENTRY
                  : { duration: 0.6, delay: 0.2, ease: premiumEase }
              }
              className="flex w-full items-center justify-end max-md:hidden md:w-auto"
            >
              <Link
                href="/blog"
                className="group flex h-16 w-fit cursor-pointer items-center justify-between gap-5 rounded-xl border border-transparent bg-white pl-0 pr-2.5 transition-all duration-300 hover:border-black hover:pl-6 hover:pr-3.5 max-md:h-14 max-md:gap-3 max-md:border-0 max-md:pr-2.5"
              >
                <span className="text-lg font-bold tracking-tight text-black transition-colors duration-300 max-md:text-base">
                  Explore all articles
                </span>

                <div className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl bg-black text-white max-md:h-9 max-md:w-9 max-md:rounded-lg">
                  <svg width="0" height="0" className="absolute">
                    <title>Explore arrow gradient</title>
                    <defs>
                      <linearGradient
                        id="blog-cta-grad"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                      >
                        <stop stopColor="#2E5BFF" offset="0%" />
                        <stop stopColor="#149CCB" offset="100%" />
                      </linearGradient>
                    </defs>
                  </svg>

                  <MdArrowOutward className="absolute z-10 h-5 w-5 transition-transform duration-300 max-md:-translate-y-8 max-md:translate-x-8 group-hover:-translate-y-8 group-hover:translate-x-8" />
                  <MdArrowOutward
                    className="absolute z-10 h-5 w-5 -translate-x-8 translate-y-8 transition-transform duration-300 max-md:translate-x-0 max-md:translate-y-0 group-hover:translate-x-0 group-hover:translate-y-0"
                    style={{ fill: "url(#blog-cta-grad)" }}
                  />
                </div>
              </Link>
            </motion.div>

            {/* Mobile pagination dots, in the old arrow slot beside the title.
                The component owns its scroll listener, so swipes never
                re-render this section. */}
            <CarouselDots
              scrollerRef={scrollerRef}
              count={blogPosts.length}
              loop
              className="md:hidden"
            />
          </div>
        </div>

        {/* The cards had no x padding while the header sat at 12px, so their left
            edges did not line up on mobile. Desktop keeps 0 — the track is a
            full-bleed drag carousel there. */}
        {/* pt, not mt: the header above is a sibling with `max-md:mb-8`, and
            adjacent-sibling margins COLLAPSE — a margin-top of 24px was
            swallowed whole by that 32px margin-bottom and moved nothing.
            Padding never collapses, so this reliably adds to the 32px.

            pb-4/-mb-4: `overflow-x: auto` forces the computed `overflow-y` to
            `auto` too, so this box clips vertically whether or not that was
            wanted. The cards' bottom edge sat exactly on it, which sheared off
            the bottom of their `shadow-sm`. The padding gives the shadow room
            INSIDE the scroll box; the equal negative margin takes that height
            back out of the flow, so the section is not one pixel taller and
            nothing below moves. */}
        <div
          ref={scrollerRef}
          className="no-scrollbar relative w-full overflow-x-clip max-md:snap-x max-md:snap-mandatory max-md:overflow-x-auto max-md:overscroll-x-contain max-md:scroll-pl-3 max-md:pt-6 max-md:-mb-4 max-md:px-3 max-md:pb-4"
        >
          <motion.div
            ref={trackRef}
            className="flex w-max flex-nowrap gap-4 md:gap-3 max-md:gap-0 md:cursor-grab md:select-none md:active:cursor-grabbing"
            style={isDesktop ? { x: xWrapped } : undefined}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            onClickCapture={handleClickCapture}
          >
            {/* Two copies at every breakpoint now: desktop wraps by loopWidth,
                mobile needs them so the -50% marquee seam is invisible. */}
            <CardTrack />
            <CardTrack className="max-md:hidden" />
            <CardTrack className="md:hidden" />
            <CardTrack className="md:hidden" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
