"use client";

import { motion, useAnimationFrame, useMotionValue, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { type MouseEvent, useEffect, useRef, useState } from "react";
import { MdArrowOutward } from "react-icons/md";
import CarouselDots from "@/components/ui/CarouselDots";
import type { BlogPost } from "@/data/blog";
import { NO_ENTRY, useIsDesktop, useIsMobile } from "@/lib/useIsDesktop";
import { useInfiniteCarousel } from "@/lib/useInfiniteCarousel";

const premiumEase = [0.16, 1, 0.3, 1] as const;

const SCROLL_SECONDS = 22;
const wrap = (min: number, max: number, v: number) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

// Desktop-only marquee driver, lifted out of the component for the same reason
// as BlogSection's: `useAnimationFrame` cannot be called conditionally, and
// calling it unconditionally keeps framer's frame loop alive at display refresh
// rate on mobile too, where the callback body only early-returned. Mounting it
// as a desktop-only child means mobile never registers it. The guard body is
// the old one minus the `!isDesktop` term, so desktop behaviour is unchanged.
function DesktopAutoScroll({
  x,
  loopWidth,
  dragging,
}: {
  x: ReturnType<typeof useMotionValue<number>>;
  loopWidth: number;
  dragging: React.RefObject<boolean>;
}) {
  useAnimationFrame((_, delta) => {
    if (dragging.current || !loopWidth) return;
    const step = (loopWidth / SCROLL_SECONDS) * (delta / 1000);
    // `+ step` runs the track LEFT TO RIGHT, matching home/BlogSection. `wrap`
    // still bounds x to [-loopWidth, 0), and the track copies are identical, so
    // the wrap lands on the same pixels. Desktop-only by construction: this
    // component is mounted inside `isDesktop && ...`; below md the section is
    // the native scroll-snap carousel, untouched.
    x.set(wrap(-loopWidth, 0, x.get() + step));
  });
  return null;
}

export default function RelatedArticles({ related }: { related: BlogPost[] }) {
  const isDesktop = useIsDesktop();
  // Entry animations are desktop-only; below md they land instantly (NO_ENTRY).
  const isMobile = useIsMobile();

  const x = useMotionValue(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const [loopWidth, setLoopWidth] = useState(0);
  const dragging = useRef(false);
  const lastPointerX = useRef(0);
  const isPanning = useRef(false);
  const startPointerX = useRef(0);

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

  // Below md this is a NATIVE scroll-snap carousel, same mechanics as
  // BlogSection on the homepage: native scrolling runs on the compositor
  // thread, where JS pointermove dragging cannot be. Desktop keeps its framer
  // `x` marquee untouched.
  const scrollerRef = useRef<HTMLDivElement>(null);
  useInfiniteCarousel(scrollerRef, related.length, 3, !isDesktop);

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
  };
  const handleClickCapture = (e: MouseEvent<HTMLDivElement>) => {
    if (isPanning.current) {
      e.preventDefault();
      e.stopPropagation();
      isPanning.current = false;
    }
  };

  const CardTrack = ({ className = "" }: { className?: string }) => (
    // max-md:gap-0 + per-card max-md:mr-4 instead of a flex gap: with a gap, N
    // cards have only N-1 gaps, so the repeated runs would be one gap short of
    // a whole run and the loop would drift each cycle.
    <div className={`flex shrink-0 gap-4 md:gap-3 max-md:gap-0 ${className}`}>
      {related.map((post) => (
        <div
          key={post.slug}
          data-slide
          className="w-[55vw] shrink-0 sm:w-[40vw] md:w-[30vw] lg:w-[25vw] max-md:mr-4 max-md:w-[80vw] max-md:snap-start"
        >
          <Link href={post.href} draggable={false} className="block h-full">
            <article className="group flex h-full flex-col max-md:rounded-2xl max-md:border max-md:border-black/10 max-md:bg-white max-md:p-2.5 max-md:pb-6 max-md:shadow-sm">
              <div className="relative aspect-square w-full overflow-hidden rounded-[1.25rem] bg-zinc-100 transition-[aspect-ratio] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] max-md:rounded-2xl md:group-hover:aspect-[3/4]">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 80vw, 25vw"
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
    <section className="w-full overflow-hidden bg-white pb-16 md:py-32">
      {isDesktop && (
        <DesktopAutoScroll x={x} loopWidth={loopWidth} dragging={dragging} />
      )}
      <div className="w-full">
        <div className="mb-12 flex w-full flex-col items-start justify-between gap-8 px-4 max-md:mb-8 max-md:px-3 md:mb-20 md:flex-row md:items-center md:px-10">
          <div className="flex flex-col items-start">
            <motion.p
              data-no-mobile-entry
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={
                isMobile ? NO_ENTRY : { duration: 0.6, ease: premiumEase }
              }
              className="mb-3 text-sm font-medium uppercase tracking-[0.3em] text-zinc-500 max-md:mb-6 max-md:text-xs"
            >
              Related articles
            </motion.p>
            <motion.h2
              data-no-mobile-entry
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={
                isMobile
                  ? NO_ENTRY
                  : { duration: 0.6, delay: 0.1, ease: premiumEase }
              }
              className="text-4xl font-bold tracking-tight text-zinc-900 max-md:text-[2.5rem] md:text-5xl lg:text-6xl lg:leading-[1.05]"
            >
              Continue reading
            </motion.h2>
          </div>

          <div className="flex w-full items-center justify-end max-md:hidden md:w-auto">
            <Link
              href="/blog"
              className="group flex h-16 w-fit cursor-pointer items-center justify-between gap-5 rounded-xl border border-transparent bg-white pl-0 pr-2.5 transition-all duration-300 hover:border-black hover:pl-3.5 hover:pr-3.5"
            >
              <span className="text-lg font-bold tracking-tight text-black transition-colors duration-300">
                Explore all articles
              </span>

              <div className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl bg-black text-white">
                <svg width="0" height="0" className="absolute">
                  <title>Explore arrow gradient</title>
                  <defs>
                    <linearGradient
                      id="related-cta-grad"
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

                <MdArrowOutward className="absolute z-10 h-5 w-5 transition-transform duration-300 group-hover:-translate-y-8 group-hover:translate-x-8" />
                <MdArrowOutward
                  className="absolute z-10 h-5 w-5 -translate-x-8 translate-y-8 transition-transform duration-300 group-hover:translate-x-0 group-hover:translate-y-0"
                  style={{ fill: "url(#related-cta-grad)" }}
                />
              </div>
            </Link>
          </div>

          {/* Mobile pagination dots, in the CTA's slot. The component owns its
              scroll listener, so swipes never re-render this section. */}
          <CarouselDots
            scrollerRef={scrollerRef}
            count={related.length}
            loop
            className="md:hidden"
          />
        </div>

        {/* pb-4/-mb-4: `overflow-x: auto` forces the computed `overflow-y` to
            `auto` too, so this box clips vertically. The padding gives the
            cards' `shadow-sm` room INSIDE the scroll box; the equal negative
            margin takes that height back out of the flow, so nothing below
            moves. */}
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
            {/* Desktop wraps by loopWidth off two copies; mobile needs three so
                the infinite carousel always has a full run of runway either
                side of the one it starts in. */}
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
