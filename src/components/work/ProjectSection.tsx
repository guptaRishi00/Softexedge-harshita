"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

export const premiumEase = [0.16, 1, 0.3, 1] as const;

// Animated body section wrapper — one definition of the motion config so the
// five body sections stay consistent without repeating the motion props.
export default function Section({
  heading,
  children,
}: {
  heading: string;
  children: ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: premiumEase }}
    >
      <h2 className="mb-8 text-3xl font-bold tracking-tight text-white leading-[1.2em] md:text-4xl">
        {heading}
      </h2>
      {children}
    </motion.div>
  );
}
