"use client";

import { motion } from "framer-motion";
import {
  BarChart3,
  Layers,
  Lightbulb,
  type LucideIcon,
  Network,
} from "lucide-react";

const premiumEase = [0.16, 1, 0.3, 1] as const;

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
} as const;

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: premiumEase },
  },
} as const;

interface ValueCard {
  title: string;
  description: string;
  Icon: LucideIcon;
  image: string;
}

const values: ValueCard[] = [
  {
    title: "Integrity",
    description:
      "We design complete brand identities, craft compelling messaging, and create visuals that make you stand out.",
    Icon: Layers,
    image:
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=900&auto=format&fit=crop&q=60",
  },
  {
    title: "Innovation",
    description:
      "We design complete brand identities, craft compelling messaging, and create visuals that make you stand out.",
    Icon: Lightbulb,
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=900&auto=format&fit=crop&q=60",
  },
  {
    title: "Collaboration",
    description:
      "We design complete brand identities, craft compelling messaging, and create visuals that make you stand out.",
    Icon: Network,
    image:
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=900&auto=format&fit=crop&q=60",
  },
  {
    title: "Results-Driven",
    description:
      "We design complete brand identities, craft compelling messaging, and create visuals that make you stand out.",
    Icon: BarChart3,
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=900&auto=format&fit=crop&q=60",
  },
];

export default function CareerValues() {
  return (
    <section className="w-full bg-white px-6 py-20 text-zinc-900 md:py-28">
      {/* Shared gradient for the card icons (defined once to avoid id clashes) */}
      <svg width="0" height="0" className="absolute">
        <title>Values icon gradient</title>
        <defs>
          <linearGradient
            id="values-icon-grad"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop stopColor="#2E5BFF" offset="0%" />
            <stop stopColor="#149CCB" offset="100%" />
          </linearGradient>
        </defs>
      </svg>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="mx-auto grid w-full grid-cols-1 gap-6 md:grid-cols-2"
      >
        {values.map(({ title, description, Icon, image }) => (
          <motion.div
            key={title}
            variants={cardVariants}
            className="relative flex min-h-[320px] flex-col justify-between overflow-hidden rounded-2xl p-7 md:min-h-[360px] md:p-8"
          >
            {/* Background image */}
            <img
              src={image}
              alt={title}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />
            {/* Darkening veil — deepest at the bottom-left where the text sits */}
            <div className="absolute inset-0 bg-gradient-to-tr from-black/90 via-black/55 to-black/20" />

            {/* Icon */}
            <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-xl bg-white shadow-lg">
              <Icon
                className="h-7 w-7"
                strokeWidth={1.8}
                stroke="url(#values-icon-grad)"
              />
            </div>

            {/* Title + description */}
            <div className="relative z-10">
              <h3 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
                {title}
              </h3>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/75">
                {description}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
