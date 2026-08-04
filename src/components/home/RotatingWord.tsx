"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useIsDesktop } from "@/lib/useIsDesktop";

// One transition for both breakpoints: the slow overdamped spring (damping
// ratio ~2.1) and long fade-out are the intended feel, on mobile too.
const ENTER = {
  type: "spring",
  stiffness: 22,
  damping: 20,
  mass: 1,
} as const;
const EXIT = { duration: 1.5, ease: "easeInOut" } as const;

const ROTATE_MS = 6000;

export default function RotatingWord({
  words,
  activeIndex,
}: {
  words: string[];
  activeIndex: number;
}) {
  const isDesktop = useIsDesktop();
  // On mobile the parent's index drives nothing else (its card stack is
  // static there), so it owns the tick itself and re-renders this span alone
  // instead of the whole section.
  const [selfIndex, setSelfIndex] = useState(0);

  useEffect(() => {
    if (isDesktop) return;
    const interval = setInterval(
      () => setSelfIndex((prev) => prev + 1),
      ROTATE_MS,
    );
    return () => clearInterval(interval);
  }, [isDesktop]);

  const index = (isDesktop ? activeIndex : selfIndex) % words.length;

  return (
    <span className="relative flex items-center justify-center overflow-hidden px-6 -mx-6 py-2 -my-2 [mask-image:linear-gradient(to_right,transparent_0,black_24px,black_calc(100%-24px),transparent_100%)]">
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
          className="block bg-linear-to-r from-[#2E5BFF] to-[#149CCB] bg-clip-text px-2 py-2 text-transparent"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
