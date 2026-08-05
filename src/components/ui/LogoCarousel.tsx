"use client";

import { motion } from "framer-motion";
import type React from "react";
import { useCallback, useEffect, useRef } from "react";

import { useIsDesktop } from "@/lib/useIsDesktop";
import { cn } from "@/lib/utils";

// Runs the -50% marquee on the compositor via the Web Animations API. Kept in
// the component rather than a globals.css keyframe on purpose: a CSS rule only
// ships when the stylesheet rebuilds, and a stale dev stylesheet silently
// leaves the track frozen. WAAPI transform animations are composited exactly
// like CSS ones, so there is no performance difference.
// How long one arrow press takes to slide the track.
const STEP_MS = 500;

export const useMarqueeHalf = (
  ref: React.RefObject<HTMLElement | null>,
  seconds: number,
  enabled: boolean,
  draggable = false,
  // When false the animation is created but held paused, so the track sits
  // still while `step()` and the drag keep working — they both read and write
  // the same `currentTime`, so they need the animation to exist either way.
  autoplay = true,
) => {
  // Imperative handle for arrow controls. Held in a ref so the returned
  // callback is stable across renders while the effect swaps the real
  // implementation on every re-run. Stays a no-op unless `draggable` is on,
  // since stepping reuses the drag path's cancel/resume machinery.
  const stepRef = useRef<(dx: number) => void>(() => {});

  useEffect(() => {
    const el = ref.current;
    if (!el || !enabled) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let animation: Animation | null = null;

    const period = seconds * 1000;

    const create = (atMs = 0) => {
      const created = el.animate(
        [
          { transform: "translate3d(-50%, 0, 0)" },
          { transform: "translate3d(0, 0, 0)" },
        ],
        {
          duration: period,
          iterations: Number.POSITIVE_INFINITY,
          easing: "linear",
        },
      );
      created.currentTime = atMs;
      if (!autoplay) created.pause();
      return created;
    };

    const sync = () => {
      if (reduced.matches) {
        animation?.cancel();
        animation = null;
        return;
      }
      if (animation) return;
      animation = create();
    };

    sync();
    reduced.addEventListener("change", sync);

    if (!draggable) {
      return () => {
        reduced.removeEventListener("change", sync);
        animation?.cancel();
      };
    }

    // Drag writes `transform` directly rather than scrubbing the animation's
    // currentTime. Scrubbing looks tidier but is slow: a PAUSED WAAPI animation
    // drops off the compositor, so every scrub repainted the whole track. A
    // plain transform write on a will-change'd element stays composited.
    // Position maps to time linearly (x = half * (t/period - 1)), so the drag
    // can hand a resume time back to a fresh animation.
    let dragging = false;
    let startPointerX = 0;
    let originX = 0;
    let currentX = 0;
    let half = 0;
    let frame = 0;
    let stepTimer = 0;
    const previousTouchAction = el.style.touchAction;
    // pan-y so the page still scrolls vertically; horizontal comes to us.
    el.style.touchAction = "pan-y";

    // The two copies are identical, so translating by one copy width is a no-op
    // visually — wrapping x keeps the numbers bounded with no seam.
    const wrapX = (x: number) => (((x % half) + half) % half) - half;

    const paint = () => {
      frame = 0;
      el.style.transform = `translate3d(${currentX}px, 0, 0)`;
    };

    const onDown = (event: PointerEvent) => {
      if (!animation) return;
      // measured ONCE per drag; reading layout on every move was the stall
      half = el.getBoundingClientRect().width / 2;
      if (half <= 0) return;
      originX = half * (Number(animation.currentTime ?? 0) / period - 1);
      currentX = originX;
      dragging = true;
      startPointerX = event.clientX;
      animation.cancel();
      animation = null;
      el.style.willChange = "transform";
      el.style.transform = `translate3d(${currentX}px, 0, 0)`;
      // Pointer capture is a nicety, not load-bearing: it throws NotFoundError
      // if the pointer is already gone. Letting that escape would abort the
      // handler with the animation cancelled and never restart it — a
      // permanently dead marquee — so failure here is ignored.
      try {
        el.setPointerCapture(event.pointerId);
      } catch {}
    };

    const onMove = (event: PointerEvent) => {
      if (!dragging) return;
      currentX = wrapX(originX + (event.clientX - startPointerX));
      // coalesce: many pointermoves per frame collapse into one style write
      if (!frame) frame = requestAnimationFrame(paint);
    };

    const onUp = (event: PointerEvent) => {
      if (!dragging) return;
      dragging = false;
      if (frame) {
        cancelAnimationFrame(frame);
        frame = 0;
      }
      try {
        el.releasePointerCapture(event.pointerId);
      } catch {}

      // A real drag must not fire the trailing click — tracks can hold links,
      // and letting go over one would otherwise navigate. Only swallow it when
      // the pointer actually travelled, so taps still work, and drop the
      // listener shortly after in case no click follows.
      if (Math.abs(event.clientX - startPointerX) > 6) {
        const swallow = (click: MouseEvent) => {
          click.preventDefault();
          click.stopPropagation();
        };
        el.addEventListener("click", swallow, { capture: true, once: true });
        setTimeout(
          () => el.removeEventListener("click", swallow, { capture: true }),
          300,
        );
      }

      const resumeAt =
        ((((currentX / half + 1) * period) % period) + period) % period;
      animation = create(resumeAt);
      el.style.transform = "";
      el.style.willChange = "";
    };

    // One arrow press. Same three moves as a drag — cancel the animation,
    // write transforms, recreate at the matching time — with a CSS transition
    // doing the travel instead of the pointer. A transform transition is
    // composited, so this never leaves the compositor either.
    const step = (dx: number) => {
      if (!animation || dragging) return;
      half = el.getBoundingClientRect().width / 2;
      if (half <= 0) return;

      originX = half * (Number(animation.currentTime ?? 0) / period - 1);
      animation.cancel();
      animation = null;
      el.style.willChange = "transform";
      el.style.transition = "";
      el.style.transform = `translate3d(${originX}px, 0, 0)`;
      // Flush the start position, otherwise the transition below has nothing
      // to interpolate from and the card teleports.
      void el.offsetWidth;

      // Travel to the UNWRAPPED target: wrapping mid-transition would animate
      // a whole copy-width slide. The wrap happens only when the position is
      // handed back to the animation, where it is a visual no-op.
      const target = originX + dx;
      el.style.transition = `transform ${STEP_MS}ms cubic-bezier(0.16, 1, 0.3, 1)`;
      el.style.transform = `translate3d(${target}px, 0, 0)`;

      window.clearTimeout(stepTimer);
      stepTimer = window.setTimeout(() => {
        currentX = wrapX(target);
        const resumeAt =
          ((((currentX / half + 1) * period) % period) + period) % period;
        el.style.transition = "";
        animation = create(resumeAt);
        el.style.transform = "";
        el.style.willChange = "";
      }, STEP_MS);
    };
    stepRef.current = step;

    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerup", onUp);
    el.addEventListener("pointercancel", onUp);

    return () => {
      reduced.removeEventListener("change", sync);
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerup", onUp);
      el.removeEventListener("pointercancel", onUp);
      if (frame) cancelAnimationFrame(frame);
      window.clearTimeout(stepTimer);
      stepRef.current = () => {};
      el.style.touchAction = previousTouchAction;
      el.style.transition = "";
      el.style.willChange = "";
      animation?.cancel();
    };
  }, [ref, seconds, enabled, draggable, autoplay]);

  return useCallback((dx: number) => stepRef.current(dx), []);
};

export type LogoCarouselItem = {
  node: React.ReactNode;
  title?: string;
  href?: string;
};

export interface LogoCarouselProps {
  logos: LogoCarouselItem[];
  speed?: number;
  className?: string;
  ariaLabel?: string;
}

export default function LogoCarousel({
  logos,
  speed = 28,
  className,
  ariaLabel = "Technology partners",
}: LogoCarouselProps) {
  const track = [...logos, ...logos];
  const isDesktop = useIsDesktop();
  const trackRef = useRef<HTMLDivElement>(null);
  useMarqueeHalf(trackRef, speed, !isDesktop);

  return (
    <section
      aria-label={ariaLabel}
      className={cn("relative w-full overflow-hidden", className)}
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent md:w-24" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent md:w-24" />
      {/* Below md the identical -50% travel is driven by useMarqueeHalf on the
          compositor, and framer is given no `animate` so it never touches the
          transform there. */}
      <motion.div
        ref={trackRef}
        className="flex w-max items-center gap-3 py-2"
        animate={isDesktop ? { x: ["-50%", "0%"] } : undefined}
        transition={
          isDesktop
            ? {
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
                ease: "linear",
                duration: speed,
              }
            : undefined
        }
      >
        {track.map((logo, i) => {
          const content = (
            <>
              <span className="flex shrink-0 items-center text-2xl text-zinc-900 md:text-[1.75rem]">
                {logo.node}
              </span>
              {logo.title && (
                <span className="whitespace-nowrap text-sm font-semibold tracking-tight text-zinc-900 md:text-base">
                  {logo.title}
                </span>
              )}
            </>
          );

          const boxClass =
            // max-md shrinks the CARD (box + padding), not its contents — the icon
            // and label keep their sizes.
            "flex h-20 w-48 shrink-0 items-center justify-center gap-3 rounded-2xl border border-zinc-300 bg-white px-7 shadow-sm max-md:h-16 max-md:w-40 max-md:gap-2 max-md:px-4 md:h-24 md:w-56 md:px-9";

          return logo.href ? (
            <a
              key={`${logo.title ?? "logo"}-${i}`}
              href={logo.href}
              target="_blank"
              rel="noopener noreferrer"
              title={logo.title}
              className={boxClass}
            >
              {content}
            </a>
          ) : (
            <div key={`${logo.title ?? "logo"}-${i}`} className={boxClass}>
              {content}
            </div>
          );
        })}
      </motion.div>
    </section>
  );
}
