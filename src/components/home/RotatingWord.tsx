"use client";

import { AnimatePresence, motion } from "framer-motion";

export default function RotatingWord({
  words,
  activeIndex,
  isDesktop,
}: {
  words: string[];
  activeIndex: number;
  isDesktop: boolean;
}) {
  const index = activeIndex % words.length;

  if (!isDesktop) {
    return (
      <span className="relative flex items-center justify-center overflow-hidden px-6 -mx-6 py-2 -my-2 [mask-image:linear-gradient(to_right,transparent_0,black_24px,black_calc(100%-24px),transparent_100%)]">
        <span className="block bg-linear-to-r from-[#2E5BFF] to-[#149CCB] bg-clip-text px-2 py-2 text-transparent">
          {words[0]}
        </span>
      </span>
    );
  }

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
            transition: { duration: 1.5, ease: "easeInOut" },
          }}
          transition={{
            type: "spring",
            stiffness: 22,
            damping: 20,
            mass: 1,
          }}
          className="block bg-linear-to-r from-[#2E5BFF] to-[#149CCB] bg-clip-text px-2 py-2 text-transparent"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
