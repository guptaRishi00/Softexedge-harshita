"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { MdArrowOutward } from "react-icons/md";

const premiumEase = [0.22, 1, 0.36, 1] as const;

const services = [
  {
    number: "01",
    title: "Brand Strategy",
    description:
      "Positioning, narrative, and foundational architecture for industry leaders and visionary startups.",
    link: "/brand-strategy",
    image:
      "https://images.unsplash.com/photo-1703720074944-b60b730c7289?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fEJyYW5kaW5nfGVufDB8fDB8fHww",
  },
  {
    number: "02",
    title: "Digital Products",
    description:
      "Immersive websites, web applications, and scalable platforms engineered for flawless performance.",
    link: "/services",
    image:
      "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzF8fEJyYW5kaW5nfGVufDB8fDB8fHww",
  },
  {
    number: "03",
    title: "UI/UX & Motion",
    description:
      "Cinematic visual identities, motion graphics, and interface designs that captivate and convert.",
    link: "/services",
    image:
      "https://images.unsplash.com/photo-1581287053822-fd7bf4f4bfec?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDJ8fHVpJTIwdXh8ZW58MHx8MHx8fDA%3D",
  },
  {
    number: "04",
    title: "eCommerce",
    description:
      "High-converting online storefronts optimized for modern consumer behaviors and rapid scale.",
    link: "/services",
    image:
      "https://images.unsplash.com/photo-1586880244406-556ebe35f282?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8RWNvbW1lcmNlfGVufDB8fDB8fHww",
  },
];

export default function SubServices() {
  return (
    <section className="relative bg-white px-6 py-24 text-zinc-900 md:px-12 md:py-20 lg:px-20 font-sans overflow-visible">
      <div className="mx-auto max-w-[1700px]">
        {/* Header Section */}
        <div className="mb-20 flex flex-col items-center text-center md:mb-32">
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
            className="text-5xl font-medium leading-[1.05] tracking-tight text-zinc-950 md:text-6xl lg:text-[5rem]"
          >
            We engineer digital{" "}
            <span className="bg-gradient-to-r from-[#2E5BFF] to-[#149CCB] bg-clip-text text-transparent">
              advantage
            </span>
          </motion.h2>
        </div>

        {/* Stacking Cards Stack Container */}
        <div className="relative flex flex-col w-full space-y-16 md:space-y-24">
          {services.map((service, index) => {
            return (
              <div
                key={service.number}
                className="sticky top-24 md:top-20 w-full pb-12"
                style={{
                  paddingTop: `${index * 12}px`,
                }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.7, ease: premiumEase }}
                  className="w-full bg-[#0d0d0d] border border-zinc-800/80 rounded-[32px] p-6 md:p-12 lg:p-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[550px] lg:h-[620px]"
                >
                  {/* LEFT COLUMN: Strategic Info Descriptions */}
                  <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-8 lg:space-y-0">
                    <div className="space-y-6">
                      <h3 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-white">
                        {service.title}
                      </h3>

                      <p className="text-zinc-400 text-base md:text-lg font-light leading-relaxed max-w-md">
                        {service.description}
                      </p>
                    </div>

                    <div className="pt-4">
                      <Link
                        href={service.link}
                        className="inline-flex items-center gap-2 group text-sm font-semibold tracking-wider uppercase text-zinc-200 hover:text-white transition-colors"
                      >
                        Explore Expertise
                        <span className="p-2 rounded-full bg-zinc-900 border border-zinc-800 group-hover:bg-zinc-800 transition-colors">
                          <MdArrowOutward className="h-4 w-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                        </span>
                      </Link>
                    </div>
                  </div>

                  {/* RIGHT COLUMN: Cinematic Layout Previews */}
                  <div className="lg:col-span-7 relative w-full h-64 sm:h-80 lg:h-full overflow-hidden rounded-2xl bg-zinc-900 border border-zinc-800/50">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 ease-out hover:scale-105 select-none pointer-events-none"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
