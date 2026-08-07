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

// The outgoing card's pose: drops away and fades instead of teleporting behind
// the stack. Desktop's AnimatePresence gives its exiting card a real exit; the
// mobile version had none, so at each swap the front card's z-index flipped in
// ONE frame and its 700ms tween then played out hidden behind the others —
// which reads as a pop, not a cycle. Still transform+opacity only, so the exit
// costs the compositor nothing extra.
const EXIT = { y: 56, scale: 0.92, opacity: 0 };

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
  // Index of the card currently playing its exit, or null. Kept separate from
  // `front` so the promotion of the others is not delayed by it.
  const [leaving, setLeaving] = useState<number | null>(null);
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
      setFront((f) => {
        setLeaving(f);
        return (f + 1) % images.length;
      });
    }, HOLD_MS);

    return () => clearInterval(id);
  }, [images.length]);

  // Clear the exit pose once it has finished, so the card can slide back into
  // the deepest slot for its next turn. A timer, not transitionend: the event
  // can be dropped (interrupted transition, backgrounded tab) and would leave
  // the card stuck invisible — the latch failure this codebase keeps hitting.
  useEffect(() => {
    if (leaving === null) return;
    const t = setTimeout(() => setLeaving(null), SLIDE_MS);
    return () => clearTimeout(t);
  }, [leaving]);

  return (
    <div ref={hostRef} className="absolute inset-0">
      {images.map((url, i) => {
        const offset = (i - front + images.length) % images.length;
        const isLeaving = i === leaving;
        const slot = isLeaving
          ? EXIT
          : SLOTS[Math.min(offset, SLOTS.length - 1)];

        return (
          <div
            key={url}
            className="absolute inset-0 origin-top overflow-hidden rounded-[28px] border border-black/10 bg-zinc-200 shadow-sm"
            style={{
              transform: `translate3d(0, ${slot.y}px, 0) scale(${slot.scale})`,
              opacity: slot.opacity,
              // The leaver stays ON TOP for its whole exit — that is the point:
              // it must be seen leaving rather than cut behind the stack.
              zIndex: isLeaving ? images.length + 1 : images.length - offset,
              // Once invisible it snaps to its back-slot pose with no
              // transition, so the audience never sees it travel back.
              transition:
                leaving === null && offset === images.length - 1
                  ? "none"
                  : `transform ${SLIDE_MS}ms ${EASE}, opacity ${SLIDE_MS}ms ${EASE}`,
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
