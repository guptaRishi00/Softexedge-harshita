"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import AboutImageStack from "./AboutImageStack";

/**
 * The About section's original visual: the rotating photo card stack (three
 * studio photos, the front card flung off every 6 s on desktop; a CSS-driven
 * stack below md), the two slow rotating rings behind it and the blue glow.
 * Moved here verbatim from AboutSection on 2026-10-23 when the home page
 * switched to the analytics-console figure. It is still AboutSection's
 * fallback: drop the `visual` prop in app/home/page.tsx to bring it back.
 *
 * `frontIndex` is AboutSection's 6 s tick (it also drives the rotating
 * headline word), so the photos and the word keep changing together.
 */

const exitEase = [0.32, 0, 0.67, 0] as const;

const initialCards = [
  {
    id: 1,
    url: "/assets/h3.jpg",
  },
  {
    id: 2,
    url: "/assets/h6.jpg",
  },
  {
    id: 3,
    url: "/assets/h5.jpg",
  },
];

export default function AboutPhotoStack({ frontIndex, isDesktop }: { frontIndex: number; isDesktop: boolean }) {
  const visibleCards = [0, 1, 2].map((offset) => {
    const card = initialCards[(frontIndex + offset) % initialCards.length];
    return {
      ...card,
      offset,
      uniqueId: frontIndex + offset,
    };
  });

  return (
    <>
      <motion.div
        animate={isDesktop ? { rotate: 360 } : undefined}
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        className="absolute h-[320px] w-[320px] md:h-[520px] md:w-[520px] rounded-full border border-black/10"
      />
      <motion.div
        animate={isDesktop ? { rotate: -360 } : undefined}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="absolute h-[260px] w-[260px] md:h-[420px] md:w-[420px] rounded-full border border-black/[0.06]"
      />

      <div className="relative w-full max-w-[600px]">
        <div className="perspective-[1200px] relative h-[420px] w-full md:h-[560px]">
          {isDesktop ? (
            <AnimatePresence>
              {visibleCards.map((card) => (
                <motion.div
                  key={card.uniqueId}
                  initial={{
                    y: -30,
                    scale: 0.85,
                    opacity: 0,
                  }}
                  animate={{
                    y: card.offset * -25,
                    scale: 1 - card.offset * 0.05,
                    opacity: 1 - card.offset * 0.15,
                    zIndex: 10 - card.offset,
                    x: 0,
                    rotateZ: 0,
                  }}
                  exit={{
                    x: 1000,
                    y: 400,
                    rotateZ: 90,
                    opacity: 1,
                    scale: 1,
                    zIndex: 50,
                    transition: { duration: 1.1, ease: exitEase },
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 60,
                    damping: 20,
                    mass: 1,
                  }}
                  className="absolute inset-0 origin-bottom-right overflow-hidden rounded-[28px] bg-white will-change-transform"
                >
                  <Image
                    src={card.url}
                    alt="Creative Studio"
                    fill
                    sizes="(max-width: 768px) 100vw, 600px"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />
                </motion.div>
              ))}
            </AnimatePresence>
          ) : (
            // Below md the stack is CSS-transition driven and owns its own
            // tick, so it never re-renders this section. Desktop keeps the
            // framer/AnimatePresence version above, untouched.
            <AboutImageStack images={initialCards.map((c) => c.url)} />
          )}
        </div>

        <motion.div
          animate={
            isDesktop
              ? { opacity: [0.15, 0.4, 0.15], scale: [1, 1.05, 1] }
              : undefined
          }
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="pointer-events-none absolute -left-20 top-10 h-60 w-60 rounded-full bg-blue-200/30 blur-3xl max-md:hidden"
        />
      </div>
    </>
  );
}
