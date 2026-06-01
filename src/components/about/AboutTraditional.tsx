"use client";

import React, { useEffect, useRef } from "react";
import { motion, useInView, animate } from "framer-motion";

// --- Sub-component: Animated Counter ---
function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;

    const controls = animate(0, value, {
      duration: 2,
      ease: "easeOut",
      onUpdate: (latest) => {
        if (ref.current) {
          ref.current.textContent = Math.floor(latest).toString() + suffix;
        }
      },
    });

    return () => controls.stop();
  }, [value, isInView, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

// --- Main Component ---
export default function AboutTraditional() {
  const stats = [
    { value: 10, suffix: "+", label: "Years Experience" },
    { value: 250, suffix: "+", label: "Projects Completed" },
    { value: 98, suffix: "%", label: "Client Satisfaction" },
    { value: 40, suffix: "+", label: "Team Members" },
  ];

  // Additional premium photos to ensure a beautiful, rich carousel track loop
  const carouselImages = [
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1531538606174-0f90ff5dce83?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=1200&auto=format&fit=crop",
  ];

  // Duplicate the array to create a perfect, seamless loop animation
  const duplicatedImages = [...carouselImages, ...carouselImages];

  return (
    <section className="w-full bg-white py-20 md:py-32 font-sans overflow-hidden">
      <div className="max-w-8xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
        {/* --- LEFT SIDE: All Unified Information --- */}
        <div className="lg:col-span-7 flex flex-col space-y-12">
          {/* Who We Are Block */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col items-start"
          >
            <span className="text-sm font-bold uppercase tracking-widest text-blue-600 mb-3">
              Who We Are
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-7xl font-bold text-black leading-[1em] mb-4">
              A collective of digital innovators.
            </h2>
            <p className="text-base md:text-lg text-gray-600 leading-relaxed">
              Founded on the belief that technology and creativity should
              seamlessly intersect, our agency brings together industry-leading
              strategists, designers, and engineers. We operate globally,
              partnering with visionary businesses to transform their digital
              presence.
            </p>
          </motion.div>

          {/* What We Do Block */}

          {/* Integrated Impact Metrics / Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="grid grid-cols-2 gap-6 pt-8 border-t border-gray-100"
          >
            {stats.map((stat, index) => (
              <div key={index} className="flex flex-col items-start">
                <h4 className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </h4>
                <p className="text-xs md:text-sm font-semibold text-gray-500 uppercase tracking-wider">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* --- RIGHT SIDE: Vertical Image Carousel --- */}
        <div className="lg:col-span-5 relative h-[500px] md:h-[650px] w-full overflow-hidden rounded-2xl bg-white">
          {/* Subtle overlay shading for premium depth layout */}
          <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-transparent z-10 pointer-events-none" />

          {/* Smooth Continuous Infinite Loop Moving Upwards */}
          <motion.div
            animate={{ y: [0, "-50%"] }}
            transition={{
              duration: 22,
              ease: "linear",
              repeat: Infinity,
            }}
            className="flex flex-col gap-4 p-4"
          >
            {duplicatedImages.map((src, index) => (
              <div
                key={index}
                className="relative h-[260px] md:h-[300px] w-full shrink-0 rounded-xl overflow-hidden "
              >
                <img
                  src={src}
                  alt={`Carousel snapshot ${index + 1}`}
                  className="w-full h-full object-cover select-none pointer-events-none"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
