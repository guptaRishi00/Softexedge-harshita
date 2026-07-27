"use client";

import { AnimatePresence, motion } from "framer-motion";

export default function StarBorder({
  active,
  color = "#2E5BFF",
  speed = 3,
  radius = 20,
  thickness = 4,
}: {
  active: boolean;
  color?: string;
  speed?: number;
  radius?: number;
  thickness?: number;
}) {
  const glow = `radial-gradient(circle, #ffffff, ${color} 20%, transparent 50%)`;
  const duration = `${speed}s`;

  const settle = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.9, delay: speed, ease: "easeOut" },
  } as const;

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-30 overflow-hidden"
          style={{ borderRadius: radius }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.4, ease: "easeOut" } }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          <div
            className="absolute inset-x-0 top-0 overflow-hidden"
            style={{ height: thickness }}
          >
            <div
              className="animate-star-movement-top absolute inset-y-0 left-[-250%] w-[300%]"
              style={{ background: glow, animationDuration: duration }}
            />
          </div>
          <motion.div
            className="absolute inset-x-0 top-0"
            style={{
              height: thickness,
              background: `linear-gradient(to right, transparent, ${color})`,
            }}
            {...settle}
          />

          <div
            className="absolute inset-x-0 bottom-0 overflow-hidden"
            style={{ height: thickness }}
          >
            <div
              className="animate-star-movement-bottom absolute inset-y-0 right-[-250%] w-[300%]"
              style={{ background: glow, animationDuration: duration }}
            />
          </div>
          <motion.div
            className="absolute inset-x-0 bottom-0"
            style={{
              height: thickness,
              background: `linear-gradient(to left, transparent, ${color})`,
            }}
            {...settle}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
