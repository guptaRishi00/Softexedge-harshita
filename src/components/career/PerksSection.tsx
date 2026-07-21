"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  CalendarDays,
  Clock,
  Headphones,
  Laptop,
  Plane,
  Smartphone,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

const premiumEase = [0.16, 1, 0.3, 1] as const;

interface Perk {
  icon: LucideIcon;
  title: string;
  description: string;
}

const perks: Perk[] = [
  {
    icon: Plane,
    title: "28 Days Holiday",
    description:
      "For some rest and relaxation...and that's excluding bank holidays. Need to leave early? Want to work from home? You can work to fit your schedule, no drama. ",
  },
  {
    icon: Smartphone,
    title: "Mobile Phone",
    description:
      "Get the latest iPhone after 12 months of being with us, for personal use. No catch. Need to leave early? Want to work from home? You can work to fit your schedule, no drama. ",
  },
  {
    icon: Laptop,
    title: "Equipment",
    description:
      "Your laptop, subscriptions, desk, chair, you name it! If you require tools to work, we've got you! Need to leave early? Want to work from home? You can work to fit your schedule, no drama. ",
  },
  {
    icon: CalendarDays,
    title: "2 Weeks off @ xmas",
    description:
      "We close at Christmas for time with family & friends... and that's on top of the 28 days holiday. Need to leave early? Want to work from home? You can work to fit your schedule, no drama. ",
  },
  {
    icon: Headphones,
    title: "Spotify",
    description:
      "Free Spotify subscription to listen to all those bangers whilst you're working away. Need to leave early? Want to work from home? You can work to fit your schedule, no drama. ",
  },
  {
    icon: Clock,
    title: "Flexible hours",
    description:
      "Need to leave early? Want to work from home? You can work to fit your schedule, no drama. Need to leave early? Want to work from home? You can work to fit your schedule, no drama. ",
  },
];

// Boxy-grid card background — same pattern/colors as ContactSection's
// ChannelCard (masked cell grid revealed by a mouse-following radial mask,
// parked at the right when idle).
const GRID_COLUMNS = 4;
const boxyCellIds = Array.from({ length: 80 }, (_, i) => `perk-box-${i}`);

function PerkCard({ icon: Icon, title, description }: Perk) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const hoveringRef = useRef(false);
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);

  const parkMaskRight = useCallback(() => {
    const el = cardRef.current;
    if (!el || el.offsetWidth === 0) return;
    mouseX.set(el.offsetWidth * 0.85);
    mouseY.set(el.offsetHeight / 2);
  }, [mouseX, mouseY]);

  const setCardRef = useCallback(
    (node: HTMLDivElement | null) => {
      cardRef.current = node;
      if (node && !hoveringRef.current) {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            if (cardRef.current && !hoveringRef.current) {
              mouseX.set(cardRef.current.offsetWidth * 0.85);
              mouseY.set(cardRef.current.offsetHeight / 2);
            }
          });
        });
      }
    },
    [mouseX, mouseY],
  );

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      if (!hoveringRef.current) parkMaskRight();
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [parkMaskRight]);

  const getIntensity = (i: number) => {
    if (hoveredIndex === null) return 0;
    const row = Math.floor(i / GRID_COLUMNS);
    const col = i % GRID_COLUMNS;
    const hoverRow = Math.floor(hoveredIndex / GRID_COLUMNS);
    const hoverCol = hoveredIndex % GRID_COLUMNS;
    const distance = Math.sqrt((row - hoverRow) ** 2 + (col - hoverCol) ** 2);
    return distance > 3.5 ? 0 : 1 - distance / 1.79;
  };

  const mask = useMotionTemplate`radial-gradient(280px circle at ${mouseX}px ${mouseY}px, black 0%, rgba(0,0,0,0.15) 100%)`;

  return (
    <div
      ref={setCardRef}
      onMouseMove={(e) => {
        hoveringRef.current = true;
        const { left, top } = e.currentTarget.getBoundingClientRect();
        mouseX.set(e.clientX - left);
        mouseY.set(e.clientY - top);
      }}
      onMouseLeave={() => {
        hoveringRef.current = false;
        setHoveredIndex(null);
        parkMaskRight();
      }}
      className="group relative block min-h-[280px] overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-950/20 transition-transform duration-300 md:min-h-[320px]"
    >
      <motion.div
        className="absolute inset-0 z-0 overflow-hidden"
        style={{ WebkitMaskImage: mask, maskImage: mask }}
      >
        <div
          className="grid gap-2 relative w-[110%] -left-[5%] -translate-y-6"
          style={{
            gridTemplateColumns: `repeat(${GRID_COLUMNS}, minmax(0, 1fr))`,
          }}
        >
          {boxyCellIds.map((id, i) => {
            const intensity = getIntensity(i);
            const colorVal = Math.round(22 + 14 * intensity);
            return (
              <div
                key={id}
                onMouseEnter={() => setHoveredIndex(i)}
                className="relative aspect-square w-full overflow-hidden rounded-md p-[0.8px]"
                style={{
                  backgroundColor: intensity > 0 ? "transparent" : "#161616",
                }}
              >
                <div
                  className="relative z-10 h-full w-full rounded-md"
                  style={{
                    backgroundColor: `rgb(${colorVal}, ${colorVal}, ${colorVal})`,
                  }}
                />
              </div>
            );
          })}
        </div>
      </motion.div>

      <div className="pointer-events-none relative z-10 flex h-full flex-col justify-between gap-6 p-6 sm:p-8">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-b from-zinc-800/80 to-zinc-900/80 text-zinc-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition-colors duration-300 group-hover:text-white">
          <Icon className="h-5 w-5" strokeWidth={1.5} />
        </span>
        <span className="flex flex-col gap-1">
          <span className="text-xl font-bold text-white sm:text-2xl">
            {title}
          </span>
          <span className="text-lg font-light leading-[1.3em] text-zinc-300 mt-6">
            {description}
          </span>
        </span>
      </div>
    </div>
  );
}

export default function PerksSection() {
  const reduce = useReducedMotion();

  return (
    <section className="w-full bg-black px-4 md:px-10 py-24 font-sans selection:bg-[#2E5BFF]/20 md:pt-20">
      <div className="mx-auto w-full">
        {/* Header */}
        <div className="mb-14 flex flex-col items-center text-center md:mb-30">
          <motion.span
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: premiumEase }}
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium uppercase tracking-[0.3em] text-zinc-500"
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
            A snippet of our{" "}
            <span className="inline-block bg-gradient-to-r from-[#2E5BFF] to-[#149CCB] bg-clip-text pb-[0.2em] pr-[0.08em] text-transparent">
              perks
            </span>
          </motion.h2>
        </div>

        {/* Perk cards — ChannelCard-style boxy-grid cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-5">
          {perks.map((perk, idx) => (
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
            >
              <PerkCard {...perk} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
