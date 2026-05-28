"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const premiumEase = [0.22, 1, 0.36, 1] as const;

// Extracted exactly from your reference
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
  // Track which accordion item is open. Null means all are closed.
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative bg-white py-24 md:py-32 px-6 md:px-12 lg:px-20 text-zinc-900 overflow-hidden">
      <div className="max-w-[1500px] mx-auto w-full flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
        {/* LEFT COLUMN: Sticky Title */}
        <div className="w-full lg:w-[40%] lg:sticky lg:top-5 flex flex-col items-start">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: premiumEase }}
          >
            {/* Spaced out F A Q */}
            <p className="text-zinc-400 font-semibold tracking-[0.4em] uppercase mb-6 text-xs">
              F A Q
            </p>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-zinc-900 leading-[1.05]">
              FAQ
            </h2>
          </motion.div>
        </div>

        {/* RIGHT COLUMN: Interactive Accordion */}
        <div className="w-full lg:w-[95%] flex flex-col border-t border-zinc-200">
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
                className="border-b border-zinc-200"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full py-8 md:py-10 flex items-center justify-between gap-6 text-left group"
                >
                  <h3
                    className={`text-2xl md:text-3xl font-medium tracking-tight transition-colors duration-300 ${
                      isOpen
                        ? "text-zinc-900"
                        : "text-zinc-500 group-hover:text-zinc-900"
                    }`}
                  >
                    {faq.question}
                  </h3>

                  {/* Animated +/- Icon */}
                  <div className="relative shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full border flex items-center justify-center transition-colors duration-300 border-zinc-200 bg-zinc-50 group-hover:border-zinc-300 group-hover:bg-zinc-100">
                    {/* Horizontal Line (Always visible) */}
                    <motion.div
                      className={`absolute w-3 md:w-4 h-[2px] transition-colors duration-300 ${
                        isOpen ? "bg-[#2E5BFF]" : "bg-zinc-900"
                      }`}
                    />
                    {/* Vertical Line (Rotates and fades out to form a minus) */}
                    <motion.div
                      animate={{
                        rotate: isOpen ? 90 : 0,
                        opacity: isOpen ? 0 : 1,
                      }}
                      transition={{ duration: 0.4, ease: premiumEase }}
                      className="absolute w-[2px] h-3 md:h-4 bg-zinc-900"
                    />
                  </div>
                </button>

                {/* Expanding Answer Section */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: premiumEase }}
                      className="overflow-hidden"
                    >
                      <p className="text-zinc-600 font-light text-lg md:text-xl leading-relaxed pb-10 max-w-2xl">
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
