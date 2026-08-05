"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const rotatingWords = ["Collective", "Visionaries", "Innovators", "Future"];
const ROTATE_MS = 6000;

// Owns its own tick. The index used to live in ExperimentalTestimonials, so
// every 6s swap re-rendered that whole ~290-line section — including the
// 8-card testimonial track — to change one word, and the commit landed exactly
// as the animation started. Here the tick re-renders this span alone.
export default function TestimonialsRotatingWord() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () => setIndex((prev) => (prev + 1) % rotatingWords.length),
      ROTATE_MS,
    );
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="inline-grid overflow-hidden py-2 px-6 -mx-6 [mask-image:linear-gradient(to_right,transparent_0,black_24px,black_calc(100%-24px),transparent_100%)]">
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ x: "-100%", opacity: 0 }}
          animate={{ x: "0%", opacity: 1 }}
          exit={{
            x: "100%",
            opacity: 0,
            transition: { duration: 1.5, ease: "easeInOut" },
          }}
          transition={{
            type: "spring",
            stiffness: 22,
            damping: 20,
            mass: 1,
          }}
          // Static will-change keeps the compositor layer alive between the 6s
          // cycles instead of rebuilding it each time.
          style={{ willChange: "transform, opacity" }}
          className="col-start-1 row-start-1 whitespace-nowrap"
        >
          {/* The gradient + `bg-clip-text` sit on a STATIC child, never on the
              animated element: a background-clipped element cannot be cheaply
              composited, so animating it re-rasterises the glyph-clipped
              gradient every frame. As a child it rasterises once and the parent
              layer is merely translated. */}
          <span className="bg-linear-to-r from-[#2E5BFF] to-[#149CCB] bg-clip-text text-transparent">
            {rotatingWords[index]}
          </span>
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
