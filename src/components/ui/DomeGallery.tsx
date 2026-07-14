"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type ImageItem = string | { src: string; alt?: string };

type DomeGalleryProps = {
  images?: ImageItem[];
  // The single gap (px) used everywhere: between columns, between cards in a
  // column, and at the loop seam.
  gap?: number;
  grayscale?: boolean;
  // Kept from the dome era: a slow ambient drift, now a horizontal marquee.
  autoRotate?: boolean;
  autoRotateSpeed?: number;
  imageBorderRadius?: string;
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

// Deterministic "uneven" patterns (no randomness — stable across SSR/renders).
// Column widths in px; card heights as fractions of the container height.
const WIDTH_PATTERN = [300, 180, 250, 205, 290, 225];
const HEIGHT_PATTERN = [0.34, 0.22, 0.29, 0.19, 0.31, 0.25];
// How far above the top edge each column starts (fraction of height) — offsets
// the rows so horizontal seams never align across columns.
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

/**
 * Flat 2D gallery wall (formerly a 3D dome — the sphere, drag and enlarge
 * interactions are gone). Masonry-style: uneven card widths per column and
 * uneven card heights per row, with ONE constant gap everywhere. Renders as an
 * ambient background; `autoRotate` drifts the wall horizontally in a seamless
 * loop. Reduced-motion users get a static wall.
 */
export default function DomeGallery({
  images = DEFAULT_IMAGES,
  gap = 16,
  grayscale = true,
  autoRotate = false,
  autoRotateSpeed = 4,
  imageBorderRadius = "20px",
}: DomeGalleryProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [dims, setDims] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const measure = () =>
      setDims({ w: el.clientWidth, h: el.clientHeight });
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

  // One strip of COLUMNS masonry columns; the strip is tiled horizontally to
  // cover the viewport and loop. stripPitch includes a trailing gap so the
  // seam between copies equals every other gap.
  const { cards, stripPitch, copies } = useMemo(() => {
    const { w, h } = dims;
    if (w === 0 || h === 0 || pool.length === 0) {
      return { cards: [] as Card[], stripPitch: 0, copies: 0 };
    }

    const built: Card[] = [];
    let x = 0;
    for (let c = 0; c < COLUMNS; c++) {
      const colW = WIDTH_PATTERN[c % WIDTH_PATTERN.length];
      // 5 is coprime with the pattern lengths, so every column gets a
      // different phase of the height/offset cycles.
      let hIdx = (c * 5) % HEIGHT_PATTERN.length;
      let y = -OFFSET_PATTERN[(c * 5 + 2) % OFFSET_PATTERN.length] * h;
      let r = 0;
      while (y < h && r < 12) {
        const cardH = HEIGHT_PATTERN[hIdx] * h;
        // Step 2 across columns keeps horizontal neighbours on different
        // images; step 1 down a column does the same vertically.
        const img = pool[(r + 2 * c) % pool.length];
        built.push({ x, y, w: colW, h: cardH, src: img.src, alt: img.alt });
        y += cardH + gap;
        hIdx = (hIdx + 1) % HEIGHT_PATTERN.length;
        r++;
      }
      x += colW + gap;
    }

    const pitch = x; // sum of widths + a gap per column (incl. the seam)
    return {
      cards: built,
      stripPitch: pitch,
      copies: Math.max(2, Math.ceil(w / pitch) + 1),
    };
  }, [dims, pool, gap]);

  // Ambient horizontal drift, looping over exactly one strip pitch.
  useEffect(() => {
    if (!autoRotate || stripPitch === 0) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const track = trackRef.current;
    if (!track) return;

    const pxPerSecond = 25 * autoRotateSpeed;
    let raf = 0;
    let start = 0;
    const tick = (now: number) => {
      if (!start) start = now;
      const offset = (((now - start) / 1000) * pxPerSecond) % stripPitch;
      track.style.transform = `translate3d(${-offset}px, 0, 0)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [autoRotate, autoRotateSpeed, stripPitch]);

  return (
    <div
      ref={rootRef}
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div ref={trackRef} className="absolute inset-0 will-change-transform">
        {Array.from({ length: copies }).map((_, copy) =>
          cards.map((card, i) => (
            <div
              // Layout is deterministic: a card is identified by its copy+slot.
              key={`${copy}-${
                // biome-ignore lint/suspicious/noArrayIndexKey: static layout, never reorders
                i
              }`}
              className="absolute overflow-hidden"
              style={{
                left: card.x + copy * stripPitch,
                top: card.y,
                width: card.w,
                height: card.h,
                borderRadius: imageBorderRadius,
              }}
              aria-hidden={copy > 0}
            >
              <img
                src={card.src}
                alt={copy === 0 ? card.alt : ""}
                draggable={false}
                className="h-full w-full object-cover"
                style={{ filter: grayscale ? "grayscale(1)" : undefined }}
              />
            </div>
          )),
        )}
      </div>
    </div>
  );
}
