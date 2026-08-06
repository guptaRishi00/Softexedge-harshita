"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const HOLD_MS = 3500;
const SLIDE_MS = 700;
const EASE = "cubic-bezier(0.16, 1, 0.3, 1)";

// Slot geometry indexed by distance from the front. `origin-top` is what makes
// this read as a stack: scaling about the top edge keeps it anchored, so the
// negative y is the only thing lifting each card, and its top peeks above the
// one in front by exactly that amount.
const SLOTS = [
  { y: 0, scale: 1, opacity: 1 },
  { y: -16, scale: 0.94, opacity: 0.85 },
  { y: -30, scale: 0.88, opacity: 0.7 },
];

/**
 * Mobile-only card stack for AboutSection.
 *
 * Owns its own tick on purpose. The desktop stack is driven by AboutSection's
 * `frontIndex`, and ticking that on mobile re-rendered the entire section every
 * few seconds to move three boxes — the same trap TestimonialsRotatingWord was
 * pulled out of. Here the interval re-renders these three divs and nothing else.
 *
 * Motion is plain CSS transitions on transform + opacity, not a framer spring:
 * both are compositor properties, so once the transition starts the browser
 * interpolates them off the main thread with zero per-frame JS. `will-change`
 * is static rather than toggled, keeping the layers alive between cycles
 * instead of rebuilding them on every swap.
 */
export default function AboutImageStack({ images }: { images: string[] }) {
  const [front, setFront] = useState(0);
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const id = setInterval(() => {
      // Synchronous on-screen check at tick time rather than an
      // IntersectionObserver flag. An async flag that fails to arrive latches
      // and kills the loop permanently — exactly how the portfolio autoplay
      // died earlier. One layout read every 3.5s costs nothing.
      const el = hostRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      if (rect.bottom <= 0 || rect.top >= window.innerHeight) return;
      setFront((f) => (f + 1) % images.length);
    }, HOLD_MS);

    return () => clearInterval(id);
  }, [images.length]);

  return (
    <div ref={hostRef} className="absolute inset-0">
      {images.map((url, i) => {
        const offset = (i - front + images.length) % images.length;
        const slot = SLOTS[Math.min(offset, SLOTS.length - 1)];

        return (
          <div
            key={url}
            className="absolute inset-0 origin-top overflow-hidden rounded-[28px] border border-black/10 bg-zinc-200 shadow-sm"
            style={{
              transform: `translate3d(0, ${slot.y}px, 0) scale(${slot.scale})`,
              opacity: slot.opacity,
              zIndex: images.length - offset,
              transition: `transform ${SLIDE_MS}ms ${EASE}, opacity ${SLIDE_MS}ms ${EASE}`,
              willChange: "transform, opacity",
            }}
          >
            <Image
              src={url}
              alt="Creative Studio"
              fill
              sizes="100vw"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />
          </div>
        );
      })}
    </div>
  );
}
