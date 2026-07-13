"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Clock,
  Gift,
  Monitor,
  Music,
  Palmtree,
  Smartphone,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const premiumEase = [0.16, 1, 0.3, 1] as const;

type Tone = "gradient" | "dark" | "tint" | "plain";

interface Perk {
  icon: LucideIcon;
  title: string;
  description: string;
  wide: boolean;
  tone: Tone;
}

// Order matters: on the md+ 3-col grid the wide/narrow spans tile with no gaps
// (row1 wide+narrow, row2 narrow+wide, row3 wide+narrow). An alternating bento
// rhythm instead of six identical cards.
const perks: Perk[] = [
  {
    icon: Palmtree,
    title: "28 Days Holiday",
    description:
      "For some rest and relaxation...and that's excluding bank holidays.",
    wide: true,
    tone: "gradient",
  },
  {
    icon: Smartphone,
    title: "Mobile Phone",
    description:
      "Get the latest iPhone after 12 months of being with us, for personal use. No catch.",
    wide: false,
    tone: "plain",
  },
  {
    icon: Monitor,
    title: "Equipment",
    description:
      "Your laptop, subscriptions, desk, chair, you name it! If you require tools to work, we've got you!",
    wide: false,
    tone: "plain",
  },
  {
    icon: Gift,
    title: "2 Weeks off @ xmas",
    description:
      "We close at Christmas for time with family & friends... and that's on top of the 28 days holiday.",
    wide: true,
    tone: "dark",
  },
  {
    icon: Music,
    title: "Spotify",
    description:
      "Free Spotify subscription to listen to all those bangers whilst you're working away.",
    wide: true,
    tone: "tint",
  },
  {
    icon: Clock,
    title: "Flexible hours",
    description:
      "Need to leave early? Want to work from home? You can work to fit your schedule, no drama.",
    wide: false,
    tone: "plain",
  },
];

const toneShell: Record<Tone, string> = {
  gradient: "bg-gradient-to-br from-[#2E5BFF] to-[#149CCB] text-white ",
  dark: "bg-zinc-950 text-white",
  tint: "bg-[#2E5BFF]/[0.05] text-black border border-[#2E5BFF]/15",
  plain: "bg-white text-black border border-zinc-200",
};

const toneIconBox: Record<Tone, string> = {
  gradient: "bg-white/15 text-white",
  dark: "bg-gradient-to-br from-[#2E5BFF] to-[#149CCB] text-white",
  tint: "bg-gradient-to-br from-[#2E5BFF] to-[#149CCB] text-white",
  plain: "bg-gradient-to-br from-[#2E5BFF] to-[#149CCB] text-white",
};

const toneBody: Record<Tone, string> = {
  gradient: "text-white/90",
  dark: "text-zinc-400",
  tint: "text-zinc-600",
  plain: "text-zinc-600",
};

export default function PerksSection() {
  const reduce = useReducedMotion();

  return (
    <section className="w-full bg-white px-6 py-24 font-sans selection:bg-[#2E5BFF]/20 md:pt-32">
      <div className="mx-auto w-full">
        {/* Header */}
        <div className="mb-14 flex flex-col md:mb-20">
          <motion.span
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: premiumEase }}
            className="mb-6 text-xs font-semibold uppercase tracking-[0.25em] text-zinc-500"
          >
            Benefits
          </motion.span>

          <motion.h2
            initial={reduce ? false : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, delay: 0.08, ease: premiumEase }}
            className="max-w-2xl text-4xl font-bold leading-[1.02] tracking-tighter text-black md:text-6xl"
          >
            A snippet of our perks
          </motion.h2>
        </div>

        {/* Bento */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
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
                className={`group relative flex min-h-[220px] flex-col justify-between overflow-hidden rounded-3xl p-8 transition-transform duration-300 will-change-transform hover:-translate-y-1.5 md:min-h-[260px] ${
                  perk.wide ? "md:col-span-2" : "md:col-span-1"
                } ${toneShell[perk.tone]}`}
              >
                {/* Oversized watermark glyph for the feature tiles */}
                {perk.wide && (
                  <Icon
                    aria-hidden
                    strokeWidth={1.25}
                    className={`pointer-events-none absolute -bottom-8 -right-6 h-44 w-44 ${
                      perk.tone === "gradient" || perk.tone === "dark"
                        ? "text-white/[0.08]"
                        : "text-[#2E5BFF]/[0.07]"
                    }`}
                  />
                )}

                <div
                  className={`relative flex shrink-0 items-center justify-center rounded-2xl ${
                    perk.wide ? "h-16 w-16" : "h-14 w-14"
                  } ${toneIconBox[perk.tone]}`}
                >
                  <Icon
                    className={perk.wide ? "h-7 w-7" : "h-6 w-6"}
                    strokeWidth={2}
                  />
                </div>

                <div className="relative mt-8">
                  <h3
                    className={`font-bold tracking-tight ${
                      perk.wide ? "text-2xl md:text-3xl" : "text-xl md:text-2xl"
                    }`}
                  >
                    {perk.title}
                  </h3>
                  <p
                    className={`mt-3 max-w-md text-base leading-relaxed ${toneBody[perk.tone]}`}
                  >
                    {perk.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
