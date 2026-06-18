"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import DynamicButton from "../ui/DynamicButton";

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

export default function WhatWeDoSection() {
  // 1. Initialize with 0 so the first item is open by default
  const [hoveredIndex, setHoveredIndex] = useState<number>(0);

  return (
    <section className="relative bg-black py-24 md:py-32 px-6 md:px-12 lg:px-20 text-white overflow-hidden">
      <div className="max-w-[1600px] mx-auto w-full flex flex-col lg:flex-row gap-16 lg:gap-20 relative items-start">
        {/* LEFT COLUMN: Sticky Info */}
        <div className="w-full lg:w-[40%] flex flex-col items-start relative lg:sticky lg:top-[4vh] h-fit">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: premiumEase }}
            className="flex flex-col items-start"
          >
            <p className="text-zinc-500 font-medium tracking-[0.1em] uppercase mb-4 text-sm">
              Sub services
            </p>
            <h2 className="text-5xl md:text-6xl lg:text-6xl font-medium leading-[1.05] tracking-tight mb-6">
              We engineer digital{" "}
              <span className="bg-linear-to-r from-[#2E5BFF] to-[#149CCB] bg-clip-text py-1 text-transparent">
                advantage
              </span>
            </h2>
            <p className="text-lg text-zinc-400 font-light leading-relaxed max-w-md mb-10">
              From foundational strategy to cinematic digital platforms, we
              provide end-to-end capabilities designed to elevate your brand
              above the noise
            </p>

            <DynamicButton
              text="View All Services"
              href="/services"
              className=" transition-colors py-4 px-6 rounded-xl"
            />
          </motion.div>
        </div>

        {/* RIGHT COLUMN: Interactive Service List */}
        <div
          className="w-full lg:w-[60%] flex flex-col border-t border-zinc-800 mt-4 lg:mt-0"
          // 2. Reset back to the first item if the mouse leaves the entire list area
          onMouseLeave={() => setHoveredIndex(0)}
        >
          {services.map((service, index) => {
            const isHovered = hoveredIndex === index;

            return (
              <Link href={service.link} key={index} className="block group">
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{
                    duration: 0.8,
                    delay: index * 0.1,
                    ease: premiumEase,
                  }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  // 3. Removed individual onMouseLeave so it doesn't flicker shut
                  className="relative flex flex-col md:flex-row items-start justify-between py-8 md:py-12 border-b border-zinc-800 transition-colors duration-500 group-hover:border-white/30 z-10 overflow-hidden"
                >
                  {/* Hover Image Background Reveal */}
                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 0.3, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.05 }}
                        transition={{ duration: 0.6, ease: premiumEase }}
                        className="absolute inset-0 z-0 pointer-events-none"
                      >
                        <img
                          src={service.image}
                          alt={service.title}
                          className="w-full h-full object-cover "
                        />
                        <div className="absolute inset-0 bg-linear-to-r from-black via-black/0 to-transparent" />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Content - Top aligned using items-start */}
                  <div className="relative z-10 flex flex-col md:flex-row items-start gap-4 md:gap-10 w-full">
                    {/* Title & Description Wrapper */}
                    <div className="flex-1 flex flex-col items-start gap-2">
                      <h3 className="text-3xl md:text-5xl font-medium tracking-tight text-zinc-300 transition-colors duration-300 group-hover:text-white group-hover:translate-x-2 transform">
                        {service.title}
                      </h3>
                      <div className="overflow-hidden w-full">
                        <motion.p
                          initial={{ height: 0, opacity: 0 }}
                          animate={{
                            height: isHovered ? "auto" : 0,
                            opacity: isHovered ? 1 : 0,
                            marginTop: isHovered ? "8px" : "0px",
                          }}
                          transition={{ duration: 0.4, ease: premiumEase }}
                          className="text-zinc-100 text-sm md:text-base max-w-md font-light leading-relaxed pl-3"
                        >
                          {service.description}
                        </motion.p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
