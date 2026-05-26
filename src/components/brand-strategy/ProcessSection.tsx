"use client";

import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import React, { useRef } from "react";

const processSteps = [
  {
    id: "01",
    title: "Discovery & Alignment",
    description:
      "We dive deep into your business landscape, audience, and core objectives. Stripping away assumptions to uncover the fundamental truths of your brand.",
    image:
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "02",
    title: "Strategic Architecture",
    description:
      "Armed with data, we define your positioning, brand narrative, and the strategic blueprint. This is where we carve out your unique space in the market.",
    image:
      "https://images.unsplash.com/photo-1555421689-491a97ff2040?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "03",
    title: "Creative Concepting",
    description:
      "Strategy translates into visual and verbal identity. We explore multiple creative directions, ensuring the aesthetic perfectly aligns with the strategic foundation.",
    image:
      "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "04",
    title: "Execution & Build",
    description:
      "Our designers and engineers bring the concepts to life. We build scalable, high-performance digital products and identities with obsessive attention to detail.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1600&auto=format&fit=crop",
  },
];

const ProcessStep = ({
  step,
  index,
  total,
  progress,
}: {
  step: (typeof processSteps)[0];
  index: number;
  total: number;
  progress: MotionValue<number>;
}) => {
  // FIX: Check if it's the last item.
  // If it is, we lock the start/end to a safe [0, 1] range to prevent the offset error.
  const isLast = index === total - 1;
  const start = isLast ? 0 : index / (total - 1);
  const end = isLast ? 1 : (index + 1) / (total - 1);

  // FIX: Only apply the scale/opacity shrink if it's NOT the last slide
  const scale = useTransform(progress, [start, end], [1, isLast ? 1 : 0.92]);
  const opacity = useTransform(progress, [start, end], [1, isLast ? 1 : 0.2]);

  // 3. Local parallax for the image as it enters the screen from the bottom
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "start start"], // Tracks when the top of the section enters to when it hits the top
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-20%", "0%"]);

  return (
    <div
      ref={targetRef}
      className={`sticky top-0 h-[100dvh] w-full bg-[#0A0A0A] flex justify-center overflow-hidden ${
        index > 0 ? "border-t border-white/5 " : ""
      }`}
      style={{ zIndex: index }}
    >
      <motion.div
        style={{ scale, opacity }}
        className="w-full h-full flex flex-col items-center origin-top pt-20 md:pt-32"
      >
        {/* Header Content */}
        <div className="max-w-4xl text-center flex flex-col items-center z-20 px-6">
          <div className="text-sm md:text-base font-mono tracking-[0.2em] uppercase font-semibold mb-6 flex items-center gap-2">
            <span className="bg-gradient-to-r from-[#3445E7] via-[#2F85EA] to-[#07D6F3] bg-clip-text text-transparent">
              {step.id}
            </span>
            <span className="text-zinc-600">/</span>
            <span className="text-zinc-600">0{total}</span>
          </div>

          <h2 className="text-4xl md:text-6xl lg:text-[5rem] font-bold mb-6 tracking-tight text-white leading-[1.05]">
            {step.title}
          </h2>

          <p className="text-base md:text-xl text-zinc-400 font-light max-w-2xl leading-relaxed mb-12">
            {step.description}
          </p>
        </div>

        {/* Massive Image Showcase */}
        <div className="relative w-full max-w-[1400px] flex-1 mt-auto mx-auto overflow-hidden rounded-t-[32px] md:rounded-t-[64px] border-t border-x border-white/10 z-10 ">
          <motion.img
            style={{ y: imageY }}
            src={step.image}
            alt={step.title}
            className="absolute top-0 left-0 w-full h-[125%] object-cover"
          />
        </div>
      </motion.div>
    </div>
  );
};

export default function ProcessSection() {
  const containerRef = useRef<HTMLElement>(null);

  // Track scroll progress across the entire parent section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section ref={containerRef} className="relative w-full bg-[#0A0A0A]">
      {processSteps.map((step, index) => (
        <ProcessStep
          key={step.id}
          step={step}
          index={index}
          total={processSteps.length}
          progress={scrollYProgress}
        />
      ))}
    </section>
  );
}
