"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useIsDesktop } from "@/lib/useIsDesktop";

const ENTER = {
  type: "spring",
  stiffness: 22,
  damping: 20,
  mass: 1,
} as const;
const EXIT = { duration: 1.5, ease: "easeInOut" } as const;

// The wrapper and the gradient span are shared by both branches so the word
// occupies exactly the same box whether or not it animates — only the motion
// differs across the breakpoint, never the layout.
const WRAPPER =
  "relative flex items-center justify-center overflow-hidden px-6 -mx-6 py-2 -my-2 [mask-image:linear-gradient(to_right,transparent_0,black_24px,black_calc(100%-24px),transparent_100%)]";
const GRADIENT =
  "block bg-linear-to-r from-[#2E5BFF] to-[#149CCB] bg-clip-text px-2 py-2 text-transparent";

export default function RotatingWord({
  words,
  activeIndex,
}: {
  words: string[];
  activeIndex: number;
}) {
  const isDesktop = useIsDesktop();

  // Below md the word is static: no AnimatePresence, no timer, nothing to
  // re-render. The parent's `activeIndex` is desktop-only anyway (its interval
  // is gated on isDesktop), so mobile simply shows the first word.
  if (!isDesktop) {
    return (
      <span className={WRAPPER}>
        <span className={GRADIENT}>{words[0]}</span>
      </span>
    );
  }

  const index = activeIndex % words.length;

  return (
    <span className={WRAPPER}>
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{
            x: "-100%",
            opacity: 0,
          }}
          animate={{
            x: "0%",
            opacity: 1,
          }}
          exit={{
            x: "100%",
            opacity: 0,
            transition: EXIT,
          }}
          transition={ENTER}
          // Static will-change keeps the compositor layer alive between the
          // 6s cycles instead of creating and destroying one each time.
          style={{ willChange: "transform, opacity" }}
          className="block"
        >
          {/* The gradient + `bg-clip-text` sit on a STATIC child, never on the
              animated element: a background-clipped element cannot be cheaply
              composited, so animating it re-rasterised the glyph-clipped
              gradient every frame. As a child it rasterises once and the
              parent layer is merely translated. */}
          <span className={GRADIENT}>{words[index]}</span>
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
