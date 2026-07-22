"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import Header from "../page/Header";

const premiumEase = [0.16, 1, 0.3, 1] as const;

// Background pattern + hover behaviour lifted from ContactSection's
// ChannelCard: a grid of boxy #161616 cells under a radial mask that follows
// the pointer, with cells near the cursor brightening by proximity.
const QUOTE_GRID_COLUMNS = 4;
const quoteCellIds = Array.from({ length: 32 }, (_, i) => `quote-cell-${i}`);

// Word-by-word stagger reveal (same pattern as the brand-strategy hero)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.15 },
  },
} as const;

const wordVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: premiumEase },
  },
} as const;

// Each carousel slot is one of three things — an image, an autoplaying video,
// or a quote card — mixed within a row. Card dimensions are unchanged.
type CarouselItem =
  | { type: "image"; src: string }
  | { type: "video"; src: string }
  | { type: "quote"; text: string; author: string; role: string };

const col1Items: CarouselItem[] = [
  {
    type: "image",
    src: "https://plus.unsplash.com/premium_photo-1661771773771-a093c948ba92?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2FyZWVyfGVufDB8fDB8fHww",
  },
  {
    type: "quote",
    text: "The best place I've grown — trusted with real work from day one.",
    author: "Priya Sharma",
    role: "Product Designer",
  },
  { type: "video", src: "/assets/video1.mp4" },
];

const col2Items: CarouselItem[] = [
  { type: "video", src: "/assets/video2.mp4" },
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1561489422-45de3d015e3e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTB8fGNhcmVlcnxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    type: "quote",
    text: "Great people, real ownership, and room to do the best work of your life.",
    author: "Arjun Mehta",
    role: "Engineering Lead",
  },
];

// Port of ContactSection's ChannelCard background: boxy cell grid, a radial
// mask that tracks the pointer and parks at 85%/50% when idle, and cells that
// brighten by grid-distance from the hovered one. Its own component because
// those hooks cannot live inside CarouselCard's `item.type === "quote"` branch.
function QuoteCard({ text }: { text: string }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const hoveringRef = useRef(false);
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);

  const parkMask = useCallback(() => {
    const el = cardRef.current;
    if (!el || el.offsetWidth === 0) return;
    mouseX.set(el.offsetWidth * 0.85);
    mouseY.set(el.offsetHeight / 2);
  }, [mouseX, mouseY]);

  // Two rAFs so the park happens after layout — offsetWidth is 0 on the first
  // frame inside the marquee track.
  const setCardRef = useCallback(
    (node: HTMLDivElement | null) => {
      cardRef.current = node;
      if (node && !hoveringRef.current) {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            if (cardRef.current && !hoveringRef.current) {
              mouseX.set(cardRef.current.offsetWidth * 0.85);
              mouseY.set(cardRef.current.offsetHeight / 2);
            }
          });
        });
      }
    },
    [mouseX, mouseY],
  );

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      if (!hoveringRef.current) parkMask();
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [parkMask]);

  const getIntensity = (i: number) => {
    if (hoveredIndex === null) return 0;
    const row = Math.floor(i / QUOTE_GRID_COLUMNS);
    const col = i % QUOTE_GRID_COLUMNS;
    const hoverRow = Math.floor(hoveredIndex / QUOTE_GRID_COLUMNS);
    const hoverCol = hoveredIndex % QUOTE_GRID_COLUMNS;
    const distance = Math.sqrt((row - hoverRow) ** 2 + (col - hoverCol) ** 2);
    return distance > 3.5 ? 0 : 1 - distance / 1.79;
  };

  // 140px, not the source's 280px: these tiles are only ~130-210px wide, so
  // the original radius blanketed the card and left no visible falloff.
  const mask = useMotionTemplate`radial-gradient(140px circle at ${mouseX}px ${mouseY}px, black 0%, rgba(0,0,0,0.15) 100%)`;

  return (
    // biome-ignore lint/a11y/noStaticElementInteractions: decorative card — pointer only drives the background mask
    <div
      ref={setCardRef}
      onMouseMove={(e) => {
        hoveringRef.current = true;
        const { left, top } = e.currentTarget.getBoundingClientRect();
        mouseX.set(e.clientX - left);
        mouseY.set(e.clientY - top);
      }}
      onMouseLeave={() => {
        hoveringRef.current = false;
        setHoveredIndex(null);
        parkMask();
      }}
      className="relative flex h-full w-full flex-col justify-start gap-1 overflow-hidden bg-black p-5 md:gap-2 md:p-7"
    >
      <motion.div
        className="absolute inset-0 z-0 overflow-hidden"
        style={{ WebkitMaskImage: mask, maskImage: mask }}
      >
        <div className="relative -left-[5%] grid w-[110%] -translate-y-6 grid-cols-4 gap-1">
          {quoteCellIds.map((id, i) => {
            const intensity = getIntensity(i);
            const colorVal = Math.round(22 + 14 * intensity);
            return (
              // biome-ignore lint/a11y/noStaticElementInteractions: decorative background cell — hover only tints it
              <div
                key={id}
                onMouseEnter={() => setHoveredIndex(i)}
                className="relative aspect-square w-full overflow-hidden rounded-md p-[0.8px]"
                style={{
                  backgroundColor: intensity > 0 ? "transparent" : "#161616",
                }}
              >
                <div
                  className="relative z-10 h-full w-full rounded-md"
                  style={{
                    backgroundColor: `rgb(${colorVal}, ${colorVal}, ${colorVal})`,
                  }}
                />
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Outlined quote icon — the same mark ExperimentalTestimonials uses.
          Stroke follows currentColor. */}
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="relative z-10 h-10 w-10 shrink-0 text-[#464646] md:h-12 md:w-12"
      >
        <title>Quote</title>
        <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
        <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
      </svg>

      <p className="relative z-10 text-sm font-regular leading-[1.25em] mt-3 tracking-tight text-white md:text-base">
        {text}
      </p>
    </div>
  );
}

function CarouselCard({ item }: { item: CarouselItem }) {
  return (
    <div className="relative h-[160px] sm:h-[200px] md:h-[260px] aspect-[4/5] rounded-[2rem] overflow-hidden shadow-xs hover:shadow-lg transition-shadow duration-300">
      {item.type === "image" && (
        <img
          src={item.src}
          alt="Career Collage"
          className="w-full h-full object-cover transition-transform duration-[10s] ease-out hover:scale-110 pointer-events-none"
        />
      )}

      {item.type === "video" && (
        <video
          src={item.src}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover pointer-events-none"
        />
      )}

      {item.type === "quote" && <QuoteCard text={item.text} />}
    </div>
  );
}

function InfiniteRow({
  items,
  direction,
  speed,
}: {
  items: CarouselItem[];
  direction: "left" | "right";
  speed: number;
}) {
  return (
    <div className="relative flex w-full overflow-hidden">
      <motion.div
        className="flex w-max"
        animate={{
          // Translate by exactly one copy-width (1/6 of the 6-copy track) so
          // the loop reset is seamless. Fewer copies = far lighter DOM + video
          // decode load than the old 12, with no visible change.
          x:
            direction === "left"
              ? ["0%", "-16.666667%"]
              : ["-16.666667%", "0%"],
        }}
        transition={{
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop",
          ease: "linear",
          duration: speed,
        }}
      >
        {Array.from({ length: 6 }).map((_, loopIndex) => (
          <div key={loopIndex} className="flex shrink-0">
            {items.map((item) => (
              <div
                key={item.type === "quote" ? item.author : item.src}
                className="pr-3 shrink-0"
              >
                <CarouselCard item={item} />
              </div>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default function CareerHeroSection() {
  return (
    <section className="relative flex w-full flex-col overflow-hidden bg-white pt-24 pb-32 text-zinc-900 font-sans selection:bg-[#2E5BFF]/20">
      {/* HEADER */}
      <div className="absolute left-0 top-0 z-50 w-full">
        <Header />
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 flex w-full flex-col pt-16 md:pt-24">
        {/* Title & Subheadline with padding */}
        <div className="px-6 md:px-12 w-full max-w-[1200px] mx-auto text-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <h1 className="text-[2.75rem] font-bold leading-[1.05] tracking-tight text-black sm:text-6xl md:text-7xl lg:text-[6rem] mb-2">
              <motion.span variants={wordVariants} className="inline-block">
                Think.
              </motion.span>{" "}
              <motion.span variants={wordVariants} className="inline-block">
                Create.
              </motion.span>{" "}
              <motion.span variants={wordVariants} className="inline-block">
                Do.
              </motion.span>
            </h1>
            <h2 className="text-[2.75rem] font-bold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl lg:text-[6rem] mb-6">
              <motion.span
                variants={wordVariants}
                className="inline-block bg-linear-to-r from-[#2E5BFF] to-[#149CCB] bg-clip-text text-transparent pr-4"
              >
                Grow With Us
              </motion.span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: premiumEase }}
            className="text-center text-zinc-600 font-regular text-lg md:text-xl max-w-xl mx-auto leading-[1.25em] mb-16"
          >
            We’re creating impactful digital solutions.
            <br />
            Join us on the journey.
          </motion.p>
        </div>

        {/* Dynamic Image Carousel (Horizontal, Edge-to-Edge) */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: premiumEase }}
          className="w-full flex flex-col gap-3"
        >
          <InfiniteRow items={col1Items} direction="left" speed={40} />
          <InfiniteRow items={col2Items} direction="right" speed={45} />
        </motion.div>
      </div>
    </section>
  );
}
