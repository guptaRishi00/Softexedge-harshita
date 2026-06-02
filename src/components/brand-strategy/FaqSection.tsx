"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MdArrowOutward } from "react-icons/md";

const premiumEase = [0.22, 1, 0.36, 1] as const;

const faqs = [
  {
    question: "What services do you offer?",
    answer:
      "We provide a comprehensive suite of digital solutions, including brand strategy, UI/UX design, full-stack web development, and immersive digital experiences tailored to your specific goals.",
  },
  {
    question: "How do you approach a new project?",
    answer:
      "Every project begins with a deep discovery phase to align on business objectives. We then move through strategic architecture, creative concepting, and rigorous execution to ensure predictable excellence.",
  },
  {
    question: "What is your pricing structure?",
    answer:
      "Our pricing is value-based and tailored to the unique scope, timeline, and technical requirements of your project. We provide detailed, transparent proposals after our initial consultation.",
  },
  {
    question: "Can you work with clients internationally?",
    answer:
      "Yes, we work with clients globally. Digital communication tools allow us to collaborate effectively regardless of location, ensuring seamless project execution and regular updates.",
  },
  {
    question: "Do you provide ongoing support?",
    answer:
      "Absolutely. We don't just hand over the keys. We offer comprehensive post-launch maintenance, performance optimization, and strategic retainers to ensure long-term digital dominance.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative overflow-hidden bg-white px-6 py-24 text-zinc-900 md:px-12 md:py-20 lg:px-20">
      {/* Hidden SVG to define the custom gradient for the icon */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <linearGradient
            id="icon-gradient"
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

      <div className="mx-auto flex w-full max-w-[1500px] flex-col items-start gap-16 lg:flex-row lg:gap-24">
        {/* LEFT COLUMN: Sticky Title */}
        <div className="flex w-full flex-col items-start lg:sticky lg:top-5 lg:w-[50%]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: premiumEase }}
          >
            <h2 className="text-5xl font-bold leading-[1.05] tracking-tight text-zinc-900 md:text-6xl lg:text-[5rem]">
              Let's{" "}
              <span className="bg-gradient-to-r from-[#2E5BFF] to-[#149CCB] bg-clip-text text-transparent">
                Clear
              </span>{" "}
              Things Up
            </h2>
          </motion.div>
        </div>

        {/* RIGHT COLUMN: Interactive Accordion */}
        <div className="flex w-full flex-col gap-4 lg:w-[95%]">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.1,
                  ease: premiumEase,
                }}
                className="overflow-hidden rounded-[1rem] bg-zinc-100"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="group flex w-full items-center justify-between gap-6 px-6 py-6 text-left md:px-10 md:py-8"
                >
                  <h3 className="text-xl font-semibold tracking-tight text-zinc-900 md:text-2xl">
                    {faq.question}
                  </h3>

                  {/* MdArrowOutward Icon with dynamic styling */}
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.4, ease: premiumEase }}
                    className={`flex shrink-0 items-center justify-center transition-colors duration-300 ${
                      isOpen ? "" : "text-zinc-900"
                    }`}
                  >
                    <MdArrowOutward
                      size={28}
                      style={isOpen ? { fill: "url(#icon-gradient)" } : {}}
                    />
                  </motion.div>
                </button>

                {/* Expanding Answer Section */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: premiumEase }}
                    >
                      <p className="max-w-3xl px-6 pb-8 pt-0 text-base font-medium leading-relaxed text-zinc-600 md:px-10 md:pb-10 md:text-lg">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
