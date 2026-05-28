"use client";

import { motion } from "framer-motion";

const processSteps = [
  {
    id: "01",
    title: "Discovery",
    description:
      "Deep-dive into your brand's DNA and technical requirements to define the blueprint.",
  },
  {
    id: "02",
    title: "Architecture",
    description:
      "Wireframing and UX logic focusing on conversion pathways and user intent.",
  },
  {
    id: "03",
    title: "Development",
    description:
      "High-performance engineering using Next.js and Tailwind for optimized delivery.",
  },
  {
    id: "04",
    title: "Deployment",
    description:
      "Rigorous testing followed by global CDN deployment for maximum speed.",
  },
];

export default function ProcessSection() {
  return (
    <section className="w-full bg-white py-24">
      <div className="mx-auto max-w-8xl px-6">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-30 text-center text-4xl font-extrabold tracking-tight text-black md:text-5xl"
        >
          Our Process
        </motion.h2>

        {/* Timeline */}
        <div className="relative">
          {/* Steps */}
          <div className="grid grid-cols-1 gap-14 md:grid-cols-2 lg:grid-cols-4 lg:gap-10">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.15,
                }}
                viewport={{ once: true }}
                className="relative flex flex-col items-center text-center"
              >
                {/* Circle */}
                <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-black text-2xl font-bold text-white">
                  {step.id}
                </div>

                {/* Title */}
                <h3 className="mt-7 text-2xl font-extrabold text-black">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="mt-4 max-w-[240px] font-medium text-sm leading-[1.3em] text-gray-500">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
