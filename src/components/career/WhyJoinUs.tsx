"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  Globe,
  Users,
  TrendingUp,
  BookOpen,
  type LucideIcon,
} from "lucide-react";

const premiumEase = [0.16, 1, 0.3, 1] as const;

interface BentoCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  className?: string;
  image: string;
}

function BentoCard({
  title,
  description,
  icon: Icon,
  className = "",
  image,
}: BentoCardProps) {
  return (
    <motion.div
      data-no-mobile-entry
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.8, ease: premiumEase },
        },
      }}
      className={`relative flex flex-col justify-end overflow-hidden rounded-[24px] bg-[#0a0a0a] min-h-[360px] md:min-h-[420px] lg:min-h-[480px] p-8 md:p-10 shadow-sm ${className}`}
    >
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 60vw"
          className="h-full w-full object-cover"
        />
        {/* The card sits on a pure-black section, so a 90% stop left 10% of the
            photo showing along the bottom edge — against #000 that reads as a
            hairline rule between this section and OpenPositions. Full black
            below md makes the edge disappear. */}
        <div className="absolute inset-0 bg-linear-to-t from-black/90 max-md:from-black via-black/20 to-transparent" />
      </div>

      <div className="pointer-events-none relative z-10 flex w-full flex-col items-start gap-4 md:gap-5">
        <div className="flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-2xl border border-white/20 bg-black/20 backdrop-blur-md shadow-sm">
          <Icon
            className="h-5 w-5 md:h-6 md:w-6 text-white"
            strokeWidth={1.5}
            aria-hidden="true"
          />
        </div>

        <div className="mt-2 md:mt-4">
          <h2 className="text-3xl font-bold leading-[1.1] tracking-[-0.03em] text-white md:text-4xl lg:text-5xl mb-3 md:mb-4">
            {title}
          </h2>
          <p className="max-w-[95%] text-sm leading-[1.5] text-white/80 md:text-base lg:max-w-[90%]">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function WhyJoinUs() {
  const cards = [
    {
      title: "Flexible Work Culture",
      description:
        "Work remotely or in a hybrid setup that fits your lifestyle. We prioritize outcomes and deep work over rigid hours, giving you the freedom to do your best work from anywhere.",
      icon: Globe,
      className: "md:col-span-3",
      image: "/assets/flexible.png",
    },
    {
      title: "Creative Team",
      description:
        "Work with passionate designers, developers, and marketers in a supportive, idea-driven culture.",
      icon: Users,
      className: "md:col-span-2",
      image: "/assets/flexible2.png",
    },
    {
      title: "Competitive Comp",
      description:
        "Attractive salary packages with performance-based bonuses, premium healthcare, and robust growth incentives.",
      icon: TrendingUp,
      className: "md:col-span-2",
      image: "/assets/competative.jpg",
    },
    {
      title: "Learning & Growth Support",
      description:
        "Access to premium learning resources, dedicated mentorship, conference budgets, and unlimited opportunities to continuously upskill your craft and accelerate your career.",
      icon: BookOpen,
      className: "md:col-span-3",
      image: "/assets/learning.jpg",
    },
  ];

  return (
    <section className="relative w-full overflow-hidden bg-black px-4 pt-24 pb-16 max-md:px-3 md:px-10 md:pt-32 md:pb-20 text-white">
      <div className="w-full">
        <div className="flex flex-col items-center text-center mb-16 max-md:items-start max-md:text-left md:mb-30">
          <motion.div
            data-no-mobile-entry
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: premiumEase }}
            className="mb-6 inline-flex items-center gap-2 text-sm font-medium uppercase tracking-[0.3em] text-zinc-400 max-md:text-xs"
          >
            Benefits
          </motion.div>

          <motion.h2
            data-no-mobile-entry
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: premiumEase }}
            className="text-4xl font-bold leading-[1.05em] tracking-tighter text-white max-md:text-[2.6rem] max-md:leading-[1.11] md:text-5xl lg:text-[6.5rem]"
          >
            Why{" "}
            <span className="inline-block bg-gradient-to-r from-[#2E5BFF] to-[#149CCB] bg-clip-text pb-[0.2em] pr-[0.08em] text-transparent">
              Join Us
            </span>
          </motion.h2>
          <motion.p
            data-no-mobile-entry
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: premiumEase }}
            className="mt-8 max-w-3xl text-lg font-light leading-[1.25em] text-white md:text-xl"
          >
            We're building an environment where exceptional talent can do their
            best work, supported by world-class benefits and a culture of
            continuous growth.
          </motion.p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-5 gap-9 md:gap-6 w-full"
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
        >
          {cards.map((card, index) => (
            <BentoCard key={index} {...card} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
