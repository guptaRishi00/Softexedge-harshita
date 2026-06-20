"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import {
  BadgeCheck,
  ClipboardCheck,
  type LucideIcon,
  Mail,
  MessageCircleQuestion,
} from "lucide-react";
import { useRef } from "react";

const premiumEase = [0.16, 1, 0.3, 1] as const;

interface Step {
  number: string;
  title: string;
  description: string;
  Icon: LucideIcon;
  filled?: boolean;
}

const steps: Step[] = [
  {
    number: "01",
    title: "Apply",
    description:
      "Submit your application with your resume and portfolio. We review every profile carefully.",
    Icon: BadgeCheck,
    filled: true,
  },
  {
    number: "02",
    title: "Interview",
    description: "Let's talk about your journey, mindset, and how you think.",
    Icon: MessageCircleQuestion,
  },
  {
    number: "03",
    title: "Assignment",
    description: "Show us how you approach real-world challenges.",
    Icon: ClipboardCheck,
  },
  {
    number: "04",
    title: "Offer",
    description:
      "Welcome aboard! We'll share the offer and onboarding details.",
    Icon: Mail,
  },
];

function JourneyStep({ step, iconLeft }: { step: Step; iconLeft: boolean }) {
  const { number, title, description, Icon, filled } = step;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: premiumEase }}
      className="relative grid grid-cols-[auto_1fr] items-center gap-5 md:grid-cols-2 md:gap-0"
    >
      {/* Icon box */}
      <div
        className={`flex ${
          iconLeft
            ? "md:order-1 md:justify-end md:pr-12"
            : "md:order-2 md:justify-start md:pl-12"
        }`}
      >
        <div
          className={`flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl md:h-24 md:w-24 ${
            filled
              ? "bg-gradient-to-br from-[#2E5BFF] to-[#149CCB] shadow-lg shadow-[#2E5BFF]/20"
              : "bg-zinc-100"
          }`}
        >
          <Icon
            className="h-8 w-8 md:h-9 md:w-9"
            strokeWidth={1.8}
            {...(filled
              ? { color: "#ffffff" }
              : { stroke: "url(#journey-icon-grad)" })}
          />
        </div>
      </div>

      {/* Text */}
      <div
        className={`${
          iconLeft
            ? "md:order-2 md:pl-12 md:text-left"
            : "md:order-1 md:pr-12 md:text-right"
        }`}
      >
        <p className="text-3xl font-bold tracking-tight text-zinc-900">
          {number}
        </p>
        <h3 className="mt-1 text-xl font-bold tracking-tight text-zinc-900">
          {title}
        </h3>
        <p
          className={`mt-3 max-w-xs text-sm leading-relaxed text-zinc-500 ${
            iconLeft ? "" : "md:ml-auto"
          }`}
        >
          {description}
        </p>
      </div>
    </motion.div>
  );
}

export default function ApplicationJourney() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 70%", "end 55%"],
  });
  // Spring-smoothed so the gradient line fills smoothly as you scroll.
  const lineScale = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 30,
    mass: 0.4,
  });

  return (
    <section className="w-full bg-white px-6 py-20 text-zinc-900 md:py-28">
      {/* Shared gradient for the line icons (defined once to avoid id clashes) */}
      <svg width="0" height="0" className="absolute">
        <title>Journey icon gradient</title>
        <defs>
          <linearGradient
            id="journey-icon-grad"
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

      <div className="mx-auto w-full">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: premiumEase }}
          className="text-4xl font-bold tracking-tight text-zinc-950 sm:text-5xl md:text-6xl"
        >
          Your Application Journey
        </motion.h2>

        <div ref={ref} className="relative mt-14 md:mt-20">
          {/* Center line with scroll-driven gradient fill (md and up) */}
          <div className="absolute left-1/2 top-0 hidden h-full w-0.5 -translate-x-1/2 bg-zinc-200 md:block">
            <motion.div
              style={{ scaleY: lineScale }}
              className="h-full w-full origin-top rounded-full bg-gradient-to-b from-[#2E5BFF] to-[#149CCB]"
            />
          </div>

          <div className="flex flex-col gap-12 md:gap-20">
            {steps.map((step, i) => (
              <JourneyStep
                key={step.number}
                step={step}
                iconLeft={i % 2 === 0}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
