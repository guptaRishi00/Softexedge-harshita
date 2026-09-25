"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

type ImageItem = string | { src: string; alt?: string };

type DomeGalleryProps = {
  images?: ImageItem[];
  gap?: number;
  grayscale?: boolean;
  autoRotate?: boolean;
  autoRotateSpeed?: number;
  /** Externally pause the auto-rotation (e.g. while another section overlaps
      this one). Same freeze/resume bookkeeping as the built-in
      IntersectionObserver pause, so the strip resumes where it stopped. */
  paused?: boolean;
  /** Same opt-in LogoLoop has: flip the travel direction from md up while
      mobile keeps the component's original leftward drift. */
  desktopDirection?: "left" | "right";
  imageBorderRadius?: string;
  cardOverlay?: boolean;
};

const DEFAULT_IMAGES: ImageItem[] = [
  {
    src: "https://images.unsplash.com/photo-1755331039789-7e5680e26e8f?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Abstract art",
  },
  {
    src: "https://images.unsplash.com/photo-1755569309049-98410b94f66d?q=80&w=772&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Modern sculpture",
  },
  {
    src: "https://images.unsplash.com/photo-1755497595318-7e5e3523854f?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Digital artwork",
  },
  {
    src: "https://images.unsplash.com/photo-1755353985163-c2a0fe5ac3d8?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Contemporary art",
  },
  {
    src: "https://images.unsplash.com/photo-1745965976680-d00be7dc0377?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Geometric pattern",
  },
  {
    src: "https://images.unsplash.com/photo-1752588975228-21f44630bb3c?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Textured surface",
  },
];

const WIDTH_PATTERN = [300, 180, 250, 205, 290, 225];
const HEIGHT_PATTERN = [0.34, 0.22, 0.29, 0.19, 0.31, 0.25];
const OFFSET_PATTERN = [0.14, 0.05, 0.22, 0.09, 0.17, 0.02];
const COLUMNS = 18;

type Card = {
  x: number;
  y: number;
  w: number;
  h: number;
  src: string;
  alt: string;
};

export default function DomeGallery({
  images = DEFAULT_IMAGES,
  gap = 16,
  grayscale = true,
  autoRotate = false,
  autoRotateSpeed = 4,
  paused = false,
  desktopDirection,
  imageBorderRadius = "20px",
  cardOverlay = false,
}: DomeGalleryProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [dims, setDims] = useState({ w: 0, h: 0 });
  // Compact geometry below md. Scaling the RENDERED card is not enough: x/y are
  // accumulated from colW/cardH + gap, so shrinking only the card leaves the
  // stride intact and the gaps visibly grow. The factor has to go into the
  // layout inputs so card size and spacing shrink together.
  // Read here rather than via a hook: cards only exist once `dims` is measured
  // (both start at 0, so the server renders none), and this is set in the same
  // measure pass, so there is nothing to mismatch on hydration.
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const measure = () => {
      setDims({ w: el.clientWidth, h: el.clientHeight });
      setCompact(window.matchMedia("(max-width: 767px)").matches);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const pool = useMemo(
    () =>
      images
        .map((img) =>
          typeof img === "string"
            ? { src: img, alt: "" }
            : { src: img.src || "", alt: img.alt || "" },
        )
        .filter((img) => img.src),
    [images],
  );

  const { cards, stripPitch, copies } = useMemo(() => {
    const { w, h } = dims;
    if (w === 0 || h === 0 || pool.length === 0) {
      return { cards: [] as Card[], stripPitch: 0, copies: 0 };
    }

    const built: Card[] = [];
    // One factor for size AND stride, so the composition scales uniformly.
    // `copies` and the row loop below both refill from these, so coverage of the
    // container holds automatically at any factor.
    const f = compact ? 0.7 : 1;
    // Heights take an EXTRA factor below md. At `f` alone the cards keep
    // their desktop aspect, and the tall entries in HEIGHT_PATTERN still read
    // as long strips on a phone; this squats them without touching widths.
    // The `r < 12` cap below is not reached even at this factor — measured
    // max 9 rows per column at 390 — because the strip is duplicated
    // horizontally, so per-column depth is far lower than cards/COLUMNS.
    const hf = compact ? 0.75 : 1;
    const g = gap * f;
    let x = 0;
    for (let c = 0; c < COLUMNS; c++) {
      const colW = WIDTH_PATTERN[c % WIDTH_PATTERN.length] * f;
      let hIdx = (c * 5) % HEIGHT_PATTERN.length;
      let y = -OFFSET_PATTERN[(c * 5 + 2) % OFFSET_PATTERN.length] * h;
      let r = 0;
      while (y < h && r < 12) {
        const cardH = HEIGHT_PATTERN[hIdx] * h * f * hf;
        const img = pool[(r + 2 * c) % pool.length];
        built.push({ x, y, w: colW, h: cardH, src: img.src, alt: img.alt });
        y += cardH + g;
        hIdx = (hIdx + 1) % HEIGHT_PATTERN.length;
        r++;
      }
      x += colW + g;
    }

    const pitch = x; 
    return {
      cards: built,
      stripPitch: pitch,
      copies: Math.max(2, Math.ceil(w / pitch) + 1),
    };
  }, [dims, pool, gap, compact]);

  // The prop is read through a ref so a pause/unpause does NOT re-run the
  // main effect below — re-running it would zero `start` and visibly snap the
  // strip back to offset 0. The tiny effect after it just nudges the running
  // machinery through syncRef.
  const pausedRef = useRef(paused);
  const syncRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (!autoRotate || stripPitch === 0) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const track = trackRef.current;
    const root = rootRef.current;
    if (!track || !root) return;

    const pxPerSecond = 25 * autoRotateSpeed;
    // Rightward travel keeps the translate inside [-stripPitch, 0] (offset -
    // stripPitch, increasing) rather than going positive: copies are laid out
    // from x=0 rightward, so a positive translate would pull the strip's left
    // edge into view with nothing behind it, while shifting within one period
    // is seamless. `compact` (set in the same measure pass as dims) pins
    // mobile to the original leftward math.
    const rightward = desktopDirection === "right" && !compact;
    let raf = 0;
    let start = 0;
    let pausedAt = 0;
    let inView = true;
    const tick = (now: number) => {
      if (!start) start = now;
      const offset = (((now - start) / 1000) * pxPerSecond) % stripPitch;
      track.style.transform = `translate3d(${
        rightward ? offset - stripPitch : -offset
      }px, 0, 0)`;
      raf = requestAnimationFrame(tick);
    };
    // Freeze/resume shared by both pause sources (viewport exit and the
    // `paused` prop): offset is absolute-time-derived, so resuming pushes the
    // origin forward by the paused span to continue exactly where it stopped.
    const freeze = () => {
      if (!raf) return;
      cancelAnimationFrame(raf);
      raf = 0;
      pausedAt = performance.now();
    };
    const resume = () => {
      if (raf || !inView || pausedRef.current) return;
      if (start) start += performance.now() - pausedAt;
      raf = requestAnimationFrame(tick);
    };
    syncRef.current = () => (pausedRef.current ? freeze() : resume());

    if (!pausedRef.current) raf = requestAnimationFrame(tick);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          inView = entry.isIntersecting;
          if (inView) resume();
          else freeze();
        }
      },
      { rootMargin: "200px" },
    );
    observer.observe(root);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
      syncRef.current = null;
    };
  }, [autoRotate, autoRotateSpeed, stripPitch, compact, desktopDirection]);

  useEffect(() => {
    pausedRef.current = paused;
    syncRef.current?.();
  }, [paused]);

  return (
    <div
      ref={rootRef}
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div ref={trackRef} className="absolute inset-0 will-change-transform">
        {Array.from({ length: copies }).map((_, copy) =>
          cards.map((card, i) => (
            <div
              key={`${copy}-${
                // biome-ignore lint/suspicious/noArrayIndexKey: static layout, never reorders
                i
              }`}
              // Targeting hook for call sites that need to resize the cards at a
              // breakpoint. Purely a selector; carries no styling of its own.
              data-dome-card
              className={`absolute overflow-hidden${
                cardOverlay ? " group pointer-events-auto" : ""
              }`}
              style={{
                left: card.x + copy * stripPitch,
                top: card.y,
                width: card.w,
                height: card.h,
                borderRadius: imageBorderRadius,
              }}
              aria-hidden={copy > 0}
            >
              <Image
                src={card.src}
                alt={copy === 0 ? card.alt : ""}
                fill
                sizes="300px"
                // The first copy of the real image set is on screen at load and
                // one of them is the page's LCP; lazy-loading it cost 2.2 s of
                // "resource load delay" on /work. Every repeat stays lazy.
                loading={copy === 0 && i < images.length ? "eager" : "lazy"}
                draggable={false}
                className="h-full w-full object-cover"
                style={{ filter: grayscale ? "grayscale(1)" : undefined }}
              />
              {cardOverlay && (
                <div className="pointer-events-none absolute inset-0 bg-black/40 transition-opacity duration-500 group-hover:opacity-0" />
              )}
            </div>
          )),
        )}
      </div>
    </div>
  );
}
