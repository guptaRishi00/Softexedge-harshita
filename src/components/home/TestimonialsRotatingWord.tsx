"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useIsDesktop } from "@/lib/useIsDesktop";

const rotatingWords = ["Collective", "Visionaries", "Innovators", "Future"];
const ROTATE_MS = 6000;

// Shared by both branches so the word occupies the same box whether or not it
// rotates — only the motion differs across the breakpoint, never the layout.
const WRAPPER =
  "inline-grid overflow-hidden py-2 px-6 -mx-6 [mask-image:linear-gradient(to_right,transparent_0,black_24px,black_calc(100%-24px),transparent_100%)]";
const GRADIENT =
  "bg-linear-to-r from-[#2E5BFF] to-[#149CCB] bg-clip-text text-transparent";

// Owns its own tick. The index used to live in ExperimentalTestimonials, so
// every 6s swap re-rendered that whole ~290-line section — including the
// 8-card testimonial track — to change one word, and the commit landed exactly
// as the animation started. Here the tick re-renders this span alone.
export default function TestimonialsRotatingWord() {
  const [index, setIndex] = useState(0);
  const isDesktop = useIsDesktop();

  useEffect(() => {
    // No tick below md: the word is static there, so the interval would only
    // re-render this span to swap a value nothing reads.
    if (!isDesktop) return;
    const interval = setInterval(
      () => setIndex((prev) => (prev + 1) % rotatingWords.length),
      ROTATE_MS,
    );
    return () => clearInterval(interval);
  }, [isDesktop]);

  // Below md the word is static: no AnimatePresence, no timer, nothing to
  // re-render — same treatment RotatingWord already gets in AboutSection.
  if (!isDesktop) {
    return (
      <span className={WRAPPER}>
        <span
          className={`col-start-1 row-start-1 whitespace-nowrap ${GRADIENT}`}
        >
          {rotatingWords[0]}
        </span>
      </span>
    );
  }

  return (
    <span className={WRAPPER}>
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          // Same swap BlogSection uses now: a plain fade in place — the word
          // fades away and the next fades in from nothing. No travel.
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.9, ease: "easeInOut" },
          }}
          transition={{ duration: 1.1, ease: "easeInOut" }}
          // Static will-change keeps the compositor layer alive between the 6s
          // cycles instead of rebuilding it each time.
          style={{ willChange: "opacity" }}
          className="col-start-1 row-start-1 whitespace-nowrap"
        >
          {/* The gradient + `bg-clip-text` sit on a STATIC child, never on the
              animated element: a background-clipped element cannot be cheaply
              composited, so animating it re-rasterises the glyph-clipped
              gradient every frame. As a child it rasterises once and the parent
              layer is merely translated. */}
          <span className={GRADIENT}>{rotatingWords[index]}</span>
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
