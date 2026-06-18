"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import React, { useState } from "react";

// Mock data: Replace with your actual clients, logos, and case study images
const clientsData = [
  {
    id: "01",
    client: "Stripe",
    industry: "Fintech",
    description:
      "Redefined their developer portal with a highly performant, visually striking 3D interface that increased engagement by 40%.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
    // In production, use an actual SVG path or img src here
    logoText: "stripe",
  },
  {
    id: "02",
    client: "Spotify",
    industry: "Audio Streaming",
    description:
      "Engineered a seamless cross-platform design system that unified the listening experience for millions of global users.",
    image:
      "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?q=80&w=1200&auto=format&fit=crop",
    logoText: "Spotify",
  },
  {
    id: "03",
    client: "Vercel",
    industry: "Cloud Infrastructure",
    description:
      "Designed a high-converting enterprise landing page featuring complex WebGL data visualizations and deep analytics tracking.",
    image:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200&auto=format&fit=crop",
    logoText: "▲ Vercel",
  },
  {
    id: "04",
    client: "Rivian",
    industry: "Electric Vehicles",
    description:
      "Developed the interactive digital showroom, allowing customers to explore vehicle configurations in real-time 3D.",
    image:
      "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=1200&auto=format&fit=crop",
    logoText: "RIVIAN",
  },
];

export default function KineticCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="relative w-full bg-black text-white font-sans overflow-hidden">
      {/* Background Noise Gradient */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay pointer-events-none z-0" />
      <div className="absolute top-0 inset-x-0 h-[50vh] bg-gradient-to-b from-black to-transparent pointer-events-none z-10" />

      <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">
        {/* Section Header */}
        <div className="mb-20 md:mb-32">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500 mb-4 block">
            Selected Partners
          </span>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter leading-[1em]">
            Companies we've <br />
            <span className="bg-gradient-to-r from-[#2E5BFF] to-[#149CCB] bg-clip-text text-transparent">
              propelled forward.
            </span>
          </h2>
        </div>

        <div className="relative flex flex-col md:flex-row items-start gap-12 lg:gap-24">
          {/* LEFT SIDE: Sticky Visual Context */}
          <div className="hidden md:block w-1/2 sticky top-32 h-[60vh] min-h-[500px] rounded-[2rem] overflow-hidden bg-zinc-900 border border-white/10 shadow-2xl z-20">
            <AnimatePresence mode="popLayout">
              <motion.img
                key={activeIndex}
                src={clientsData[activeIndex].image}
                alt={`${clientsData[activeIndex].client} showcase`}
                initial={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </AnimatePresence>

            {/* Overlay Gradient for readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

            {/* Floating Info Tag */}
            <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end z-10">
              <div>
                <p className="text-sm font-medium text-zinc-300 mb-1">
                  Project Context
                </p>
                <p className="text-lg font-bold text-white">
                  {clientsData[activeIndex].industry}
                </p>
              </div>
              <button className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-black transition-transform hover:scale-105">
                <ArrowUpRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* RIGHT SIDE: Scrolling Narrative Track */}
          <div className="w-full md:w-1/2 flex flex-col relative z-20 pb-[30vh]">
            {clientsData.map((item, index) => {
              const isActive = index === activeIndex;

              return (
                <motion.div
                  key={item.id}
                  // Triggers when the item hits the vertical center of the screen
                  onViewportEnter={() => setActiveIndex(index)}
                  viewport={{ margin: "-50% 0px -50% 0px" }}
                  className={`flex flex-col justify-center py-24 transition-opacity duration-700 ${
                    isActive ? "opacity-100" : "opacity-30 hover:opacity-50"
                  }`}
                >
                  {/* Mobile Image (Only visible on small screens) */}
                  <div className="block md:hidden w-full h-[300px] rounded-2xl overflow-hidden mb-8 border border-white/10 relative">
                    <img
                      src={item.image}
                      alt={item.client}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40" />
                  </div>

                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-sm font-mono text-zinc-500">
                      {item.id}
                    </span>
                    <div className="h-[1px] w-12 bg-zinc-700" />
                    <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">
                      {item.industry}
                    </span>
                  </div>

                  {/* Typography-based Logo (Replace with SVG img in production) */}
                  <h3 className="text-5xl lg:text-7xl font-black tracking-tighter mb-6 text-white">
                    {item.logoText}
                  </h3>

                  <p className="text-lg lg:text-xl text-zinc-400 leading-relaxed max-w-md font-medium">
                    {item.description}
                  </p>

                  {/* Mobile CTA */}
                  <div className="mt-8 flex md:hidden items-center gap-2 text-sm font-bold text-[#149CCB]">
                    View Case Study <ArrowUpRight className="h-4 w-4" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
