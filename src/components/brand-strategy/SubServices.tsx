"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { MdArrowOutward } from "react-icons/md"; // Assuming you have react-icons installed

const premiumEase = [0.22, 1, 0.36, 1] as const;

const services = [
  {
    number: "01",
    title: "Brand Strategy",
    description:
      "Positioning, narrative, and foundational architecture for industry leaders and visionary startups.",
    link: "/brand-strategy",
    image:
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1200&auto=format&fit=crop",
  },
  {
    number: "02",
    title: "Digital Products",
    description:
      "Immersive websites, web applications, and scalable platforms engineered for flawless performance.",
    link: "/services",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop",
  },
  {
    number: "03",
    title: "UI/UX & Motion",
    description:
      "Cinematic visual identities, motion graphics, and interface designs that captivate and convert.",
    link: "/services",
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1200&auto=format&fit=crop",
  },
  {
    number: "04",
    title: "eCommerce",
    description:
      "High-converting online storefronts optimized for modern consumer behaviors and rapid scale.",
    link: "/services",
    image:
      "https://images.unsplash.com/photo-1592503254549-d83d24a4dfab?q=80&w=1200&auto=format&fit=crop",
  },
];

export default function SubServices() {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  return (
    <section className="relative bg-black px-6 py-24 text-white md:px-12 md:py-40 lg:px-20 font-sans">
      <div className="mx-auto max-w-[1600px]">
        {/* Header Section */}
        <div className="mb-20 flex flex-col items-start md:mb-32">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-6 text-xs font-semibold uppercase tracking-[0.4em] text-zinc-500"
          >
            Capabilities
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl font-medium leading-[1.05] tracking-tight md:text-6xl lg:text-[5rem]"
          >
            We engineer digital{" "}
            <span className="bg-gradient-to-r from-[#2E5BFF] to-[#149CCB] bg-clip-text text-transparent">
              advantage
            </span>
          </motion.h2>
        </div>

        {/* Two-Column Interactive Layout */}
        <div className="flex flex-col-reverse items-start gap-16 lg:flex-row lg:gap-24">
          {/* LEFT COLUMN: Interactive Service List */}
          <div className="flex w-full flex-col lg:w-1/2">
            {services.map((service, index) => {
              const isActive = activeIndex === index;

              return (
                <div
                  key={index}
                  onMouseEnter={() => setActiveIndex(index)}
                  className="group cursor-pointer border-b border-zinc-800 py-10 transition-colors duration-500 last:border-b-0 hover:border-zinc-500"
                >
                  <Link
                    href={service.link}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-baseline gap-6 md:gap-10">
                      <h3
                        className={`text-4xl font-medium tracking-tight transition-all duration-500 md:text-5xl lg:text-6xl ${
                          isActive
                            ? "text-white translate-x-2"
                            : "text-zinc-500 group-hover:text-zinc-300"
                        }`}
                      >
                        {service.title}
                      </h3>
                    </div>

                    {/* Animated Arrow */}
                    <motion.div
                      animate={{
                        opacity: isActive ? 1 : 0,
                        x: isActive ? 0 : -10,
                        rotate: isActive ? 45 : 0,
                      }}
                      transition={{ duration: 0.4, ease: premiumEase }}
                      className="hidden text-white md:block"
                    >
                      <MdArrowOutward size={40} />
                    </motion.div>
                  </Link>
                </div>
              );
            })}
          </div>

          {/* RIGHT COLUMN: Sticky Viewport & Content */}
          <div className="sticky top-10 flex w-full flex-col lg:top-32 lg:w-1/2">
            {/* Image Window */}
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[24px] bg-zinc-900">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeIndex}
                  src={services[activeIndex].image}
                  alt={services[activeIndex].title}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.6, ease: premiumEase }}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </AnimatePresence>

              {/* Subtle inner shadow/gradient for depth */}
              <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Dynamic Description & CTA */}
            <div className="mt-8 flex flex-col items-start">
              <AnimatePresence mode="wait">
                <motion.p
                  key={activeIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, ease: premiumEase }}
                  className="max-w-md text-lg font-light leading-relaxed text-zinc-400"
                >
                  {services[activeIndex].description}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
