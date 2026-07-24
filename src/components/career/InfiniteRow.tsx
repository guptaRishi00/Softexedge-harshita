"use client";

import { motion } from "framer-motion";
import CarouselCard, { type CarouselItem } from "./CarouselCard";

export default function InfiniteRow({
  items,
  direction,
  speed,
}: {
  items: CarouselItem[];
  direction: "left" | "right";
  speed: number;
}) {
  return (
    <div className="relative flex w-full overflow-hidden">
      <motion.div
        className="flex w-max"
        animate={{
          // Translate by exactly one copy-width (1/6 of the 6-copy track) so
          // the loop reset is seamless. Fewer copies = far lighter DOM + video
          // decode load than the old 12, with no visible change.
          x:
            direction === "left"
              ? ["0%", "-16.666667%"]
              : ["-16.666667%", "0%"],
        }}
        transition={{
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop",
          ease: "linear",
          duration: speed,
        }}
      >
        {Array.from({ length: 6 }).map((_, loopIndex) => (
          <div key={loopIndex} className="flex shrink-0">
            {items.map((item) => (
              <div
                key={item.type === "quote" ? item.author : item.src}
                className="pr-3 shrink-0"
              >
                <CarouselCard item={item} />
              </div>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
