"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  Clock,
  Gift,
  Monitor,
  Music,
  Palmtree,
  Smartphone,
} from "lucide-react";

const premiumEase = [0.16, 1, 0.3, 1] as const;

interface Perk {
  icon: LucideIcon;
  title: string;
  description: string;
}

const perks: Perk[] = [
  {
    icon: Palmtree,
    title: "28 Days Holiday",
    description:
      "For some rest and relaxation...and that's excluding bank holidays.",
  },
  {
    icon: Smartphone,
    title: "Mobile Phone",
    description:
      "Get the latest iPhone after 12 months of being with us, for personal use. No catch.",
  },
  {
    icon: Monitor,
    title: "Equipment",
    description:
      "Your laptop, subscriptions, desk, chair, you name it! If you require tools to work, we've got you!",
  },
  {
    icon: Gift,
    title: "2 Weeks off @ xmas",
    description:
      "We close at Christmas for time with family & friends... and that's on top of the 28 days holiday.",
  },
  {
    icon: Music,
    title: "Spotify",
    description:
      "Free Spotify subscription to listen to all those bangers whilst you're working away.",
  },
  {
    icon: Clock,
    title: "Flexible hours",
    description:
      "Need to leave early? Want to work from home? You can work to fit your schedule, no drama.",
  },
];

export default function PerksSection() {
  const reduce = useReducedMotion();

  return (
    <section className="w-full bg-black px-6 py-24 font-sans selection:bg-[#2E5BFF]/20 md:pt-20">
      <div className="mx-auto w-full">
        {/* Header */}
        <div className="mb-14 flex flex-col items-center text-center md:mb-40">
          <motion.span
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: premiumEase }}
            className="mb-8 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-white/60"
          >
            Benefits
          </motion.span>

          <motion.h2
            initial={reduce ? false : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, delay: 0.08, ease: premiumEase }}
            className="text-4xl font-bold leading-[1.05em] tracking-tighter text-white md:text-5xl lg:text-[6.5rem]"
          >
            A snippet of our perks
          </motion.h2>
        </div>

        {/* Perk cards — uniform 3-col grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-5">
          {perks.map((perk, idx) => {
            const Icon = perk.icon;
            return (
              <motion.div
                key={perk.title}
                initial={reduce ? false : { opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.6,
                  delay: Math.min(idx * 0.08, 0.4),
                  ease: premiumEase,
                }}
                className="group relative flex flex-col rounded-[20px] border border-white/5 bg-zinc-900/50 p-8 backdrop-blur-sm transition-all duration-300 will-change-transform hover:-translate-y-1.5 hover:bg-zinc-900"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#2E5BFF] to-[#149CCB] text-white">
                    <Icon className="h-5 w-5" strokeWidth={2} />
                  </div>
                  <h3 className="text-xl font-bold tracking-tight text-white md:text-2xl">
                    {perk.title}
                  </h3>
                </div>

                <p className="mt-5 text-base leading-relaxed text-zinc-400">
                  {perk.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
