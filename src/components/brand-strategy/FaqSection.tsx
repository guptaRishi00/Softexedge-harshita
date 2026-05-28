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
    <section className="relative bg-white py-24 md:py-20 px-6 md:px-12 lg:px-20 text-zinc-900 overflow-hidden">
      <div className="max-w-375 mx-auto w-full flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
        {/* LEFT COLUMN: Sticky Title */}
        <div className="w-full lg:w-[30%] lg:sticky lg:top-5 flex flex-col items-start">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: premiumEase }}
          >
            <p className="text-zinc-400 font-semibold tracking-[0.4em] uppercase mb-6 text-xs">
              F A Q
            </p>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-zinc-900 leading-[1.05]">
              FAQ
            </h2>
          </motion.div>
        </div>

        {/* RIGHT COLUMN: Interactive Accordion */}
        <div className="w-full lg:w-[95%] flex flex-col gap-4">
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
                className="bg-zinc-100 rounded-[1rem] overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-6 md:px-10 md:py-8 flex items-center justify-between gap-6 text-left group"
                >
                  <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-zinc-900">
                    {faq.question}
                  </h3>

                  {/* MdArrowOutward Icon */}
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.4, ease: premiumEase }}
                    className="shrink-0 text-zinc-900 flex items-center justify-center"
                  >
                    <MdArrowOutward size={28} />
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
                      <p className="text-zinc-600 font-medium text-base md:text-lg leading-relaxed px-6 pb-8 md:px-10 md:pb-10 pt-0 max-w-3xl">
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
