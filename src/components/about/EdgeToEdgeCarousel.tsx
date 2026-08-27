"use client";

import Image from "next/image";

export default function EdgeToEdgeCarousel({ images }: { images: string[] }) {
  const SET_MIN = 12;
  const repeats = Math.max(2, Math.ceil(SET_MIN / images.length));
  const set = Array.from({ length: repeats }, () => images).flat();

  return (
    <div className="relative flex w-full overflow-hidden py-6">
      {/* Driven by the global `scroll` keyframe rather than framer: direction
          has to differ per breakpoint, and framer resolves `animate` in JS, so
          a per-viewport value would mean useIsMobile() writing a transform into
          the SSR markup — a hydration mismatch. A CSS animation flips with a
          plain media variant. Deliberately NOT the `.marquee-track` class: that
          carries `:hover { animation-play-state: paused }`, which would be new
          desktop behaviour. Travel and timing are identical to the framer
          version (0 -> -50%, 65s, linear, infinite); BOTH breakpoints now play
          it in reverse to run rightward like TechLogoCarousel — desktop used to
          be the odd one out, running leftward.
          The `md:` variant is spelled out rather than dropping the prefix and
          letting one unvariant `[animation-direction:reverse]` cover both: the
          base `[animation:...]` here is the animation SHORTHAND, which resets
          `animation-direction` to normal, and two unvariant arbitrary
          properties would then be decided by Tailwind's own sort order. A
          variant always sorts after the unvariant shorthand, so keeping both
          prefixed is what guarantees the reverse actually wins. */}
      <div className="flex w-max [animation:scroll_65s_linear_infinite] motion-reduce:[animation:none] max-md:[animation-direction:reverse] md:[animation-direction:reverse]">
        {[...set, ...set].map((src, idx) => (
          <div
            key={idx}
            aria-hidden={idx >= set.length}
            className="relative h-[240px] w-[175px] shrink-0 overflow-hidden rounded-lg mr-4 md:mr-3 md:h-[140px] md:w-[210px]"
          >
            {/* Eager, not lazy: cards stream through the viewport on a
                continuous transform, which browser lazy-loading tracks poorly
                (Safari worst) — images started loading only after becoming
                visible, so each entering card flashed blank then popped in.
                Every card cycles through the viewport within half a loop and
                there are only 5 unique files behind the 30 cards, so eager
                costs 5 requests up front and ends the pop-in. Must be an
                explicit loading="eager" — next/image defaults to lazy even
                without the prop (unlike native img). */}
            <Image
              src={src}
              alt=""
              width={210}
              height={140}
              loading="eager"
              draggable={false}
              sizes="(max-width: 768px) 175px, 210px"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out hover:scale-105"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
