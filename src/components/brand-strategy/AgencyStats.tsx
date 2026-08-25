"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const stats = [
  {
    value: 250,
    suffix: "+",
    label: "projects delivered",
  },
  {
    value: 98,
    suffix: "%",
    label: "client retention",
  },
  {
    value: 10,
    suffix: "+",
    label: "years experience",
  },
  {
    value: 50,
    suffix: "+",
    label: "team members",
  },
];

const premiumEase = [0.16, 1, 0.3, 1] as const;

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;

    let frame = 0;
    let startTime = 0;
    const duration = 1600;

    const tick = (now: number) => {
      if (!startTime) startTime = now;
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      setCount(Math.round(value * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value]);

  return (
    <span ref={ref}>
      {count}
      <span className="bg-linear-to-r from-[#2E5BFF] to-[#149CCB] bg-clip-text text-transparent ml-1 pr-1">
        {suffix}
      </span>
    </span>
  );
}

export default function AgencyStats() {
  return (
    <>
      <motion.div
        data-no-mobile-entry
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, delay: 0.2, ease: premiumEase }}
        className="relative z-10 grid w-full grid-cols-2 gap-8 px-6 py-12 max-md:hidden md:grid-cols-4 md:gap-4 md:px-12 md:py-20"
      >
        {stats.map((stat, index) => (
          <div
            key={stat.label}
            className={cn(
              "flex flex-col items-center text-center",
              index !== 0 && "border-zinc-200 md:border-l md:border-t-0",
              (index === 1 || index === 3) && "border-l border-zinc-200",
              (index === 2 || index === 3) && "border-t border-zinc-200",
            )}
          >
            <h4 className="mb-5 text-5xl font-bold tracking-tighter text-zinc-900 md:text-6xl lg:text-[5rem]">
              <Counter value={stat.value} suffix={stat.suffix} />
            </h4>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-zinc-500 md:text-base">
              {stat.label}
            </p>
          </div>
        ))}
      </motion.div>

      {/* Mobile: the stats run as an edge-to-edge marquee instead of the 2-col
        grid above — same treatment as AboutHeroSection. Two identical copies
        translate by -50%, exactly one copy, so the seam is invisible, and the
        travel is a CSS keyframe on `transform`, so it runs on the compositor
        with no per-frame JS.

        Values are static here rather than <Counter>: that component counts up
        on ITS OWN first intersection, so eight copies drifting past would each
        start at a different moment and show the same stat with different
        numbers side by side. The count-up stays on desktop, where each stat is
        on screen exactly once. */}
      <div className="marquee relative z-10 w-full py-6 md:hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        <div
          className="marquee-track motion-reduce:animate-none"
          // reverse + 31s copied from AboutHeroSection so the two pages drift
          // identically. Inline because `.marquee-track` is unlayered CSS setting
          // the `animation` SHORTHAND, which outranks @layer utilities.
          style={{ animationDuration: "31s", animationDirection: "reverse" }}
        >
          {[...stats, ...stats].map((stat, index) => (
            <div
              key={`${stat.label}-${index}`}
              // second run is decorative; screen readers hear each stat once
              aria-hidden={index >= stats.length}
              className="flex w-[52vw] shrink-0 flex-col items-center text-center"
            >
              <h4 className="mb-3 text-[3.25rem] font-bold tracking-tighter text-zinc-900">
                {stat.value}
                <span className="bg-linear-to-r from-[#2E5BFF] to-[#149CCB] bg-clip-text text-transparent ml-1 pr-1">
                  {stat.suffix}
                </span>
              </h4>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-500">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
