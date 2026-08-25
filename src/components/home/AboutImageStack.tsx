"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const HOLD_MS = 3500;
const SLIDE_MS = 700;
const EASE = "cubic-bezier(0.16, 1, 0.3, 1)";

// Only the front card is visible. The queued ones sit at the identical pose
// with opacity 0, so nothing peeks above or behind the front card and the swap
// reads as one image becoming the next rather than a deck being dealt.
const FRONT = { y: 0, scale: 1, opacity: 1, blur: 0 };
const HIDDEN = { y: 0, scale: 1, opacity: 0, blur: 0 };

// The outgoing card dissipates: it drifts up a little, expands slightly and
// fades — smoke, not a card being dropped.
//
// `blur` is 0 rather than the 12 it used to be. The old note argued the blur
// was cheap because the element is already promoted, but promotion is not what
// costs here: transform and opacity are interpolated by the compositor from an
// existing raster, whereas an ANIMATED `filter: blur()` has to re-rasterise the
// card at a new sigma on every frame — ~40 fresh Gaussians over a full-width
// image per cycle, forever, and this component renders on mobile ONLY, which is
// the breakpoint that could least afford it. Restore the effect by setting this
// back to 12; nothing else has to change.
const EXIT = { y: -22, scale: 1.06, opacity: 0, blur: 0 };

/**
 * Mobile-only image cycler for AboutSection.
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
        const isFront = offset === 0 && !isLeaving;
        const slot = isLeaving ? EXIT : isFront ? FRONT : HIDDEN;

        return (
          <div
            key={url}
            className="absolute inset-0 origin-center overflow-hidden rounded-[28px] border border-black/10 bg-zinc-200 shadow-sm"
            style={{
              transform: `translate3d(0, ${slot.y}px, 0) scale(${slot.scale})`,
              opacity: slot.opacity,
              filter: slot.blur ? `blur(${slot.blur}px)` : "none",
              // The leaver stays ON TOP for its whole exit — it has to be seen
              // dissipating, not cut away behind the incoming image.
              zIndex: isLeaving ? images.length + 1 : images.length - offset,
              // Opacity is always transitionable, even while queued. A card
              // promoted to front changes its opacity and its transition in the
              // same commit, and "transition was none a moment ago" is exactly
              // the case where a fade is liable not to start — keeping opacity
              // in the list at all times means the incoming image always fades.
              // transform and filter join only for the two cards on screen, so
              // a released leaver drops its blur and scale instantly instead of
              // spending 700ms animating a blur nobody can see.
              transition:
                isFront || isLeaving
                  ? `transform ${SLIDE_MS}ms ${EASE}, opacity ${SLIDE_MS}ms ${EASE}, filter ${SLIDE_MS}ms ${EASE}`
                  : `opacity ${SLIDE_MS}ms ${EASE}`,
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
