"use client";

import { motion } from "framer-motion";
import {
  Palmtree,
  Smartphone,
  Monitor,
  Gift,
  Music,
  Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";

const premiumEase = [0.16, 1, 0.3, 1] as const;

const perks = [
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
  return (
    <section className="w-full bg-white px-6 py-24 md:px-10 md:py-32 font-sans selection:bg-[#2E5BFF]/20 selection:text-white">
      <div className="mx-auto w-full ">
        {/* Header */}
        <div className="flex flex-col mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: premiumEase }}
            className="mb-8 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-black/60"
          >
            Benefits
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: premiumEase }}
            className="text-4xl font-bold leading-[1.05em] tracking-tighter text-black md:text-6xl"
          >
            A snippet of our perks
          </motion.h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16 md:gap-y-20">
          {perks.map((perk, idx) => (
            <motion.div
              key={perk.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.6,
                delay: idx * 0.1,
                ease: premiumEase,
              }}
              className="flex flex-col"
            >
              {/* Icon & Title Row */}
              <div className="flex items-center gap-4 mb-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#2E5BFF] to-[#149CCB]">
                  <perk.icon
                    className="h-6 w-6 text-white"
                    strokeWidth={2.5}
                  />
                </div>
                <h3 className="text-2xl font-bold tracking-tight text-black">
                  {perk.title}
                </h3>
              </div>

              {/* Description */}
              <p className="text-base leading-relaxed text-black mb-8 max-w-sm">
                {perk.description}
              </p>

              {/* Bottom Divider */}
              <div className="h-[1px] w-full bg-gradient-to-r from-[#2E5BFF] to-[#149CCB]" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
