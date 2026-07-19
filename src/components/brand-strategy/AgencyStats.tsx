"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const stats = [
  {
    value: 250,
    suffix: "+",
    label: "projects delivered",
  },
  {
    value: 98,
    suffix: "%",
    label: "client retention",
  },
  {
    value: 10,
    suffix: "+",
    label: "years experience",
  },
  {
    value: 50,
    suffix: "+",
    label: "team members",
  },
];

const premiumEase = [0.16, 1, 0.3, 1] as const;

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;

    let frame = 0;
    let startTime = 0;
    const duration = 1600;

    const tick = (now: number) => {
      if (!startTime) startTime = now;
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      setCount(Math.round(value * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value]);

  return (
    <span ref={ref}>
      {count}
      <span className="bg-linear-to-r from-[#2E5BFF] to-[#149CCB] bg-clip-text text-transparent ml-1 pr-1">
        {suffix}
      </span>
    </span>
  );
}

export default function AgencyStats() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: 0.2, ease: premiumEase }}
      className="relative z-10 grid w-full grid-cols-2 gap-8 px-6 py-12 md:grid-cols-4 md:gap-4 md:px-12 md:py-20"
    >
      {stats.map((stat, index) => (
        <div
          key={stat.label}
          className={cn(
            "flex flex-col items-center text-center",
            index !== 0 && "border-zinc-200 md:border-l md:border-t-0",
            (index === 1 || index === 3) && "border-l border-zinc-200",
            (index === 2 || index === 3) && "border-t border-zinc-200",
          )}
        >
          <h4 className="mb-5 text-4xl font-bold tracking-tighter text-zinc-900 md:text-5xl lg:text-7xl">
            <Counter value={stat.value} suffix={stat.suffix} />
          </h4>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-zinc-500 md:text-base">
            {stat.label}
          </p>
        </div>
      ))}
    </motion.div>
  );
}
