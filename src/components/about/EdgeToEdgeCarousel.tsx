"use client";

import { motion } from "framer-motion";

export default function EdgeToEdgeCarousel({ images }: { images: string[] }) {
  const SET_MIN = 12;
  const repeats = Math.max(2, Math.ceil(SET_MIN / images.length));
  const set = Array.from({ length: repeats }, () => images).flat();

  return (
    <div className="relative flex w-full overflow-hidden py-6">
      <motion.div
        className="flex w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          ease: "linear",
          duration: 65,
        }}
      >
        {[...set, ...set].map((src, idx) => (
          <div
            key={idx}
            aria-hidden={idx >= set.length}
            className="relative h-[100px] w-[150px] shrink-0 overflow-hidden rounded-lg mr-4 md:mr-3 md:h-[140px] md:w-[210px]"
          >
            <img
              src={src}
              alt=""
              loading="lazy"
              draggable={false}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out hover:scale-105"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
