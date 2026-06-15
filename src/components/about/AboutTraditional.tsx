"use client";

import React, { useEffect, useRef } from "react";
import { motion, useInView, animate } from "framer-motion";
import { cn } from "@/lib/utils";

// --- Sub-component: Animated Counter ---
function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;

    const controls = animate(0, value, {
      duration: 2,
      ease: [0.16, 1, 0.3, 1], // Premium easing
      onUpdate: (latest) => {
        if (ref.current) {
          // Only update the number part
          ref.current.textContent = Math.floor(latest).toString();
        }
      },
    });

    return () => controls.stop();
  }, [value, isInView]);

  return (
    <span className="inline-flex items-center">
      <span ref={ref}>0</span>
      {suffix && (
        <span className="bg-gradient-to-r from-[#2E5BFF] to-[#149CCB] bg-clip-text text-transparent pr-1">
          {suffix}
        </span>
      )}
    </span>
  );
}

export default function AboutCinematic() {
  const stats = [
    { value: 10, suffix: "+", label: "Years Experience" },
    { value: 250, suffix: "+", label: "Projects Completed" },
    { value: 98, suffix: "%", label: "Client Satisfaction" },
    { value: 40, suffix: "+", label: "Team Members" },
  ];

  const premiumImages = [
    "https://images.unsplash.com/photo-1513682121497-80211f36a7d3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVvcGxlfGVufDB8fDB8fHww",
    "https://plus.unsplash.com/premium_photo-1683120751955-3d7c14887ac8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzd8fG9mZmljZXxlbnwwfHwwfHx8MA%3D%3D",
    "https://plus.unsplash.com/premium_photo-1683121489634-5d3f7892a6fe?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTN8fG9mZmljZXxlbnwwfHwwfHx8MA%3D%3D",
    "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=1200&auto=format&fit=crop",
  ];

  // Duplicate the array to create a perfect, seamless horizontal loop
  const duplicatedImages = [...premiumImages, ...premiumImages];

  return (
    <section className="relative w-full bg-black py-32 md:py-48 font-sans overflow-hidden text-white">
      {/* Background Noise for texture */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.04] mix-blend-overlay pointer-events-none" />

      <div className="mx-auto flex flex-col items-center">
        {/* --- PART 1: Massive Centered Typography --- */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center text-center max-w-5xl z-10 px-6 md:px-12"
        >
          <div className="mb-8 inline-flex items-center justify-center rounded-full ">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-300">
              Who We Are
            </span>
          </div>

          <h2 className="text-5xl md:text-7xl lg:text-[6.5rem] font-bold tracking-tighter leading-[0.9em] mb-8">
            A collective of <br className="hidden md:block" />
            <span className="bg-gradient-to-r from-[#2E5BFF] to-[#149CCB] bg-clip-text text-transparent">
              digital innovators.
            </span>
          </h2>

          <p className="text-lg md:text-lg text-zinc-400 leading-[1em] max-w-xl font-regular">
            Founded on the belief that technology and creativity should
            seamlessly intersect. We operate globally, partnering with visionary
            businesses to transform their digital presence.
          </p>
        </motion.div>

        {/* --- PART 2: Full-Bleed Horizontal Image Carousel --- */}
        <div className="relative w-full mt-24 md:mt-32 overflow-hidden flex items-center">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              duration: 30, // Adjust speed here (higher is slower)
              ease: "linear",
              repeat: Infinity,
            }}
            className="flex w-max gap-4 md:gap-2 px-4"
          >
            {duplicatedImages.map((src, index) => (
              <div
                key={index}
                className="relative h-[300px] w-[280px] md:h-[500px] md:w-[450px] shrink-0 rounded-[2rem] overflow-hidden group"
              >
                <div className="absolute inset-0 bg-black/20 z-10 mix-blend-overlay group-hover:bg-transparent transition-colors duration-500" />
                <img
                  src={src}
                  alt={`Agency showcase ${index + 1}`}
                  className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                />
              </div>
            ))}
          </motion.div>
        </div>

        {/* --- PART 3: Full-width Stats Strip --- */}
      </div>
    </section>
  );
}
