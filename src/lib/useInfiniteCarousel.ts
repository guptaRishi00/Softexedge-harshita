"use client";

import { useEffect } from "react";

/**
 * Distance from one slide to the next, measured from the DOM rather than
 * derived from `scrollWidth / copies` — the tracks carry their own horizontal
 * padding (testimonials centres its cards with `px-11`), so a scrollWidth
 * ratio is off by that padding and the modular arithmetic drifts.
 *
 * Returns 0 when it cannot be measured, which every caller treats as "skip".
 */
export function slideStride(scroller: HTMLElement): number {
  const slides = scroller.querySelectorAll<HTMLElement>("[data-slide]");
  if (slides.length < 2) return 0;
  return slides[1].offsetLeft - slides[0].offsetLeft;
}

/**
 * Endless native scroll-snap carousel.
 *
 * The track renders `copies` identical runs of the list. Scrolling starts in
 * the second run, so there is always a full run of runway in both directions;
 * when the position reaches within one slide of either true end, scrollLeft
 * jumps by exactly one run. Because the runs are pixel-identical the jump is
 * invisible, and because it lands on the same snap boundary the snap engine
 * does not re-animate.
 *
 * Wrapping at the EXTREMES rather than at the middle is deliberate: assigning
 * scrollLeft during an iOS momentum fling kills the momentum, and the extremes
 * are where a fling has already run out.
 */
export function useInfiniteCarousel(
  ref: React.RefObject<HTMLDivElement | null>,
  itemCount: number,
  copies: number,
  enabled: boolean,
) {
  useEffect(() => {
    const el = ref.current;
    if (!el || !enabled || itemCount < 2 || copies < 2) return;

    let frame = 0;
    let started = false;

    const runWidth = () => slideStride(el) * itemCount;

    // Park in the second run so the first backward swipe has somewhere to go.
    const start = () => {
      const w = runWidth();
      if (w <= 0) return;
      started = true;
      el.scrollLeft = w;
    };

    const wrap = () => {
      frame = 0;
      const w = runWidth();
      if (w <= 0) return;
      if (!started) {
        start();
        return;
      }
      const stride = w / itemCount;
      const max = el.scrollWidth - el.clientWidth;
      if (el.scrollLeft <= stride) el.scrollLeft += w;
      else if (el.scrollLeft >= max - stride) el.scrollLeft -= w;
    };

    const onScroll = () => {
      // Cancel-and-rearm, never a "one pending" flag: a flag cleared only
      // inside the callback latches forever if that callback never runs.
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(wrap);
    };

    start();
    // Widths depend on layout that may not be final at mount (fonts, images).
    const ro = new ResizeObserver(() => {
      if (!started) start();
    });
    ro.observe(el);

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
      ro.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [ref, itemCount, copies, enabled]);
}
