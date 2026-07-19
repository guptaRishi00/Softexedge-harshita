"use client";

import {
  AnimatePresence,
  motion,
  useAnimationFrame,
  useMotionValue,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { MdArrowOutward } from "react-icons/md";
import { useIsDesktop } from "@/lib/useIsDesktop";

// Seconds for the auto-scroll to travel one track width (matches the old pace).
const SCROLL_SECONDS = 22;

// Wrap a value into the half-open range [min, max) — keeps the marquee seamless
// in both directions (auto-scroll and drag).
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

export default function BlogSection() {
  const isDesktop = useIsDesktop();
  const [index, setIndex] = useState(0);

  // Draggable auto-scroll marquee (motion-value driven so drag + auto-scroll
  // can share the same x without the framer keyframe/drag transform conflict).
  const x = useMotionValue(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const [loopWidth, setLoopWidth] = useState(0);
  const dragging = useRef(false);
  const lastPointerX = useRef(0);

  // Cycle through the typography words every 4.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // Seamless loop width = one CardTrack's width + the gap before the next copy.
  // (scrollWidth/2 would omit half that gap and hiccup once per loop.)
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

  useAnimationFrame((_, delta) => {
    if (!isDesktop || dragging.current || !loopWidth) return;
    const step = (loopWidth / SCROLL_SECONDS) * (delta / 1000);
    x.set(wrap(-loopWidth, 0, x.get() - step));
  });

  // Drag vs click: don't capture the pointer on press — only once movement
  // passes a small threshold. A clean press+release then reaches the card's
  // <Link> as a normal click; a real drag captures the pointer, pans the
  // track, and suppresses the trailing click via onClickCapture below.
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

  // Card list component to render identical tracks
  const CardTrack = () => (
    <div className="flex shrink-0 gap-4 md:gap-3 max-md:w-full max-md:flex-col">
      {blogPosts.map((post) => (
        <div
          key={post.id}
          className="w-[55vw] shrink-0 sm:w-[40vw] md:w-[30vw] lg:w-[25vw] max-md:w-full"
        >
          <Link href={post.href} draggable={false} className="block h-full">
            <article className="group flex h-full flex-col max-md:rounded-2xl max-md:border max-md:border-black/10 max-md:bg-white max-md:shadow-sm max-md:p-5">
              {/* IMAGE CONTAINER — grows taller on hover (desktop) */}
              <div className="relative aspect-square w-full overflow-hidden rounded-[1.25rem] bg-zinc-100 transition-[aspect-ratio] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] md:group-hover:aspect-[3/4]">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 55vw, 25vw"
                  className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] md:group-hover:scale-105"
                  draggable={false}
                />
                {/* Scrim so the info stays legible once it slides over the image */}
                <div className="pointer-events-none absolute inset-0 rounded-[1.25rem] bg-gradient-to-t from-black/75 via-black/15 to-transparent opacity-0 transition-opacity duration-500 md:group-hover:opacity-100" />
              </div>

              {/* CARD CONTENT — slides up inside the card, over the image, on hover */}
              <div className="relative z-10 mt-4 flex flex-1 flex-col px-2 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] md:group-hover:-mt-32 md:group-hover:px-4 md:group-hover:pb-4">
                <div className="mb-3 flex items-center gap-2 text-sm font-medium text-zinc-500 transition-colors duration-500 md:group-hover:text-white/70">
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
    <section className="w-full overflow-hidden bg-white text-black pb-16 md:pb-32">
      <div className="mx-auto w-full ">
        {/* HEADER LAYER */}
        <div className="mb-12 flex w-full flex-col items-start justify-between gap-8 px-4 md:mb-20 md:flex-row md:items-center md:px-10">
          <motion.div
            initial={isDesktop ? { opacity: 0, x: -20 } : false}
            whileInView={isDesktop ? { opacity: 1, x: 0 } : undefined}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, margin: "-50px" }}
            className="flex flex-col items-start"
          >
            <p className="mb-3 text-sm uppercase tracking-[0.3em] text-zinc-500 font-medium">
              Latest Insights
            </p>
            <h2 className="text-4xl font-bold tracking-tight text-zinc-900 md:text-5xl lg:text-6xl lg:leading-[1.05]">
              Thoughts & {/* Rotating Gradient Text */}
              {/* px/-mx fade band at each edge (no layout shift) — sliding
                  words dissolve at the edges, same as ExperimentalTestimonials. */}
              <span className="inline-grid overflow-hidden py-1 px-6 -mx-6 [mask-image:linear-gradient(to_right,transparent_0,black_24px,black_calc(100%-24px),transparent_100%)]">
                {isDesktop ? (
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={index}
                      // Exactly the AboutSection rotating-word config: enter
                      // from the left on the spring, exit right on a quick tween.
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
                      className="col-start-1 row-start-1 bg-gradient-to-r from-[#2E5BFF] to-[#149CCB] bg-clip-text pl-3 pr-2 leading-[1.3em] text-transparent"
                    >
                      {rotatingWords[index]}
                    </motion.span>
                  </AnimatePresence>
                ) : (
                  <span className="col-start-1 row-start-1 bg-gradient-to-r from-[#2E5BFF] to-[#149CCB] bg-clip-text pl-3 pr-2 leading-[1.3em] text-transparent">
                    {rotatingWords[0]}
                  </span>
                )}
              </span>
            </h2>
          </motion.div>

          {/* CTA — same style as the ExperimentalTestimonials CTA */}
          <div className="flex w-full items-center justify-end md:w-auto">
            <Link
              href="/blog"
              className="group flex h-16 w-fit cursor-pointer items-center justify-between gap-5 rounded-xl border border-transparent bg-white pl-0 pr-2.5 transition-all duration-300 hover:border-black hover:pl-6 hover:pr-3.5"
            >
              <span className="text-lg font-bold tracking-tight text-black transition-colors duration-300">
                Explore all articles
              </span>

              <div className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl bg-black text-white">
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

                <MdArrowOutward className="absolute z-10 h-5 w-5 transition-transform duration-300 group-hover:-translate-y-8 group-hover:translate-x-8" />
                <MdArrowOutward
                  className="absolute z-10 h-5 w-5 -translate-x-8 translate-y-8 transition-transform duration-300 group-hover:translate-x-0 group-hover:translate-y-0"
                  style={{ fill: "url(#blog-cta-grad)" }}
                />
              </div>
            </Link>
          </div>
        </div>

        {/* CONTAINER — clip only horizontally (the marquee track); vertical
            must stay visible or the card's hover growth gets cut at the
            bottom mid-transition. */}
        <div className="relative w-full overflow-x-clip">
          {/* Draggable, auto-scrolling track (two identical copies on desktop) */}
          <motion.div
            ref={trackRef}
            className="flex w-max flex-nowrap gap-4 md:gap-3 max-md:w-full max-md:flex-col md:cursor-grab md:select-none md:active:cursor-grabbing"
            style={isDesktop ? { x: xWrapped } : undefined}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            onClickCapture={handleClickCapture}
          >
            {isDesktop ? (
              <>
                <CardTrack />
                <CardTrack />
              </>
            ) : (
              <CardTrack />
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
