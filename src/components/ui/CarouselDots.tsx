"use client";

import { useEffect, useRef, useState } from "react";
import { tweenScrollLeft } from "@/lib/tweenScrollLeft";
import { slideStride } from "@/lib/useInfiniteCarousel";

/**
 * Dot pagination for a native scroll-snap carousel — the same visual language
 * as OurValuesSection's quote dots: gray dots, the active one an elongated
 * gradient pill. Tapping a dot tweens the scroller to that card.
 *
 * A leaf on purpose: it owns the scroll listener and the active-index state,
 * so tracking the card during a swipe re-renders these few buttons and never
 * the host section. The listener is passive and rAF-coalesced — many scroll
 * events per frame collapse into one state read.
 */
export default function CarouselDots({
  scrollerRef,
  count,
  loop = false,
  className = "",
}: {
  scrollerRef: React.RefObject<HTMLDivElement | null>;
  count: number;
  /** Track renders repeated runs of the list; map position within one run. */
  loop?: boolean;
  className?: string;
}) {
  const [active, setActive] = useState(0);
  const frame = useRef(0);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const measure = () => {
      if (count < 2) return;
      if (loop) {
        // Position within ONE run: the track repeats, so a ratio against the
        // full scrollWidth would sweep the dots several times per lap.
        const stride = slideStride(el);
        if (stride <= 0) return;
        const i = Math.round(el.scrollLeft / stride) % count;
        setActive((i + count) % count);
        return;
      }
      const max = el.scrollWidth - el.clientWidth;
      if (max <= 0) return;
      const unit = max / (count - 1);
      setActive(
        Math.min(count - 1, Math.max(0, Math.round(el.scrollLeft / unit))),
      );
    };

    const onScroll = () => {
      // Cancel-and-rearm rather than a "one pending" guard: a guard flag that
      // only clears inside the rAF callback latches forever if that callback
      // never runs — the async-flag failure mode this codebase has hit before.
      // Re-arming per event cannot latch and still measures once per frame.
      cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(measure);
    };

    measure();
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, [scrollerRef, count, loop]);

  const jump = (i: number) => {
    const el = scrollerRef.current;
    if (!el || count < 2) return;
    if (loop) {
      const stride = slideStride(el);
      if (stride <= 0) return;
      // Step to the nearest occurrence of slide `i` rather than its absolute
      // index, so tapping "1" while in a later run does not rewind a full lap.
      const current = Math.round(el.scrollLeft / stride);
      let delta = (i - (current % count) + count) % count;
      if (delta > count / 2) delta -= count;
      tweenScrollLeft(el, (current + delta) * stride);
      return;
    }
    const max = el.scrollWidth - el.clientWidth;
    tweenScrollLeft(el, (max / (count - 1)) * i);
  };

  // Pre-built id array rather than key={index} — same pattern ChannelCard uses
  // for its grid cells, and it keeps biome's noArrayIndexKey clean.
  const ids = Array.from({ length: count }, (_, i) => `dot-${i}`);

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {ids.map((id, i) => (
        <button
          key={id}
          type="button"
          aria-label={`Go to slide ${i + 1}`}
          onClick={() => jump(i)}
          className={`h-1.5 rounded-full transition-all duration-300 ${
            i === active
              ? "w-6 bg-gradient-to-r from-[#2E5BFF] to-[#149CCB]"
              : "w-1.5 bg-zinc-300"
          }`}
        />
      ))}
    </div>
  );
}
