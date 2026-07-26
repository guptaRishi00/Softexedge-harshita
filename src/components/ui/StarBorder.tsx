"use client";

import { AnimatePresence, motion } from "framer-motion";

/**
 * Star border, in two beats:
 *   1. SWEEP  — a light runs the TOP edge left→right while another runs the
 *               BOTTOM edge right→left. One pass, then it's gone.
 *   2. SETTLE — the moment the sweep ends, a glow fades in along the border,
 *               weighted toward the corner each light landed on (top-right,
 *               bottom-left) so it reads as the sweep's energy coming to rest.
 *
 * Every layer is clipped to a `thickness`px strip pinned to its edge and there
 * is deliberately NO blur filter anywhere, so the whole effect lives strictly
 * on the card's BORDER — nothing bleeds or blurs into the artwork.
 *
 * Absolute, pointer-events-none overlay — the same integration shape as
 * TracingBorder, so it drops into any `relative` card. Sweep keyframes live in
 * globals.css (Tailwind v4: no JS config).
 */
export default function StarBorder({
  active,
  color = "#2E5BFF",
  speed = 3,
  radius = 20,
  thickness = 4,
}: {
  active: boolean;
  // Colour surrounding the white-hot core of the travelling light.
  color?: string;
  // Seconds for ONE sweep. Also when the settle glow starts — a plain number
  // (not a CSS string) so the two beats can be sequenced off one value.
  speed?: number;
  // Corner radius in px — match the host card's so the light clips cleanly.
  radius?: number;
  // Height of the lit border line, in px. This is the ONLY vertical extent the
  // effect ever has.
  thickness?: number;
}) {
  // White-hot centre fading out through the brand colour: reads far brighter
  // than a flat colour at the same size, which is how the sweep stays prominent
  // without growing beyond the border line.
  const glow = `radial-gradient(circle, #ffffff, ${color} 20%, transparent 50%)`;
  const duration = `${speed}s`;

  // The settle glow fades in as the sweep lands.
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
          {/* TOP edge — sweep runs left → right */}
          <div
            className="absolute inset-x-0 top-0 overflow-hidden"
            style={{ height: thickness }}
          >
            <div
              className="animate-star-movement-top absolute inset-y-0 left-[-250%] w-[300%]"
              style={{ background: glow, animationDuration: duration }}
            />
          </div>
          {/* TOP settle — brightest at the right, where that light landed */}
          <motion.div
            className="absolute inset-x-0 top-0"
            style={{
              height: thickness,
              background: `linear-gradient(to right, transparent, ${color})`,
            }}
            {...settle}
          />

          {/* BOTTOM edge — sweep runs right → left */}
          <div
            className="absolute inset-x-0 bottom-0 overflow-hidden"
            style={{ height: thickness }}
          >
            <div
              className="animate-star-movement-bottom absolute inset-y-0 right-[-250%] w-[300%]"
              style={{ background: glow, animationDuration: duration }}
            />
          </div>
          {/* BOTTOM settle — brightest at the left, where that light landed */}
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
