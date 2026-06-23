"use client";

import { motion } from "framer-motion";
import { MdArrowOutward } from "react-icons/md";
import Header from "../page/Header";
import { useMemo } from "react";

const premiumEase = [0.16, 1, 0.3, 1] as const;

const col1Images = [
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800&auto=format&fit=crop",
];

const col2Images = [
  "https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop",
];

const col3Images = [
  "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=800&auto=format&fit=crop",
];

function InfiniteColumn({ images, direction, speed }: { images: string[], direction: "up" | "down", speed: number }) {
  // Duplicate array to create a seamless loop
  const loopImages = [...images, ...images, ...images];

  return (
    <div className="relative flex flex-col w-full h-[1000px] overflow-hidden rounded-[2rem] [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]">
      <motion.div
        className="flex flex-col gap-4 absolute w-full"
        animate={{
          y: direction === "up" ? ["0%", "-33.33%"] : ["-33.33%", "0%"]
        }}
        transition={{
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop",
          ease: "linear",
          duration: speed,
        }}
      >
        {loopImages.map((src, i) => (
          <div key={i} className="relative w-full aspect-[4/5] rounded-[2rem] overflow-hidden shadow-xs hover:shadow-lg transition-shadow duration-300">
            <img
              src={src}
              alt="Career Collage"
              className="w-full h-full object-cover transition-transform duration-[10s] ease-out hover:scale-110"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default function CareerHeroSection() {
  return (
    <section className="relative flex w-full flex-col overflow-hidden bg-white pt-24 pb-32 text-zinc-900 font-sans selection:bg-[#2E5BFF]/20">
      {/* HEADER */}
      <div className="absolute left-0 top-0 z-50 w-full">
        <Header />
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 flex w-full flex-col items-center px-6 md:px-12 pt-16 md:pt-24">
        
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: premiumEase }}
          className="text-center"
        >
          <div className="mb-6 inline-flex items-center text-sm font-bold uppercase tracking-widest bg-linear-to-r from-[#2E5BFF] to-[#149CCB] bg-clip-text text-transparent md:text-base">
            Careers
          </div>
          
          <h1 className="text-[2.75rem] font-bold leading-[1.05] tracking-tight text-black sm:text-6xl md:text-7xl lg:text-[6rem] mb-2">
            Think. Create. Do.
          </h1>
          <h2 className="text-[2.75rem] font-bold leading-[1.05] tracking-tight bg-linear-to-r from-[#2E5BFF] to-[#149CCB] bg-clip-text text-transparent sm:text-6xl md:text-7xl lg:text-[6rem] mb-6">
            Grow With Us
          </h2>
        </motion.div>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: premiumEase }}
          className="text-center text-zinc-600 font-medium text-lg md:text-xl max-w-xl mx-auto leading-relaxed mb-16"
        >
          We’re creating impactful digital solutions.
          <br />
          Join us on the journey.
        </motion.p>

        {/* Dynamic Image Collage Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: premiumEase }}
          className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[1200px] mx-auto mb-16"
        >
          <InfiniteColumn images={col1Images} direction="up" speed={40} />
          {/* Middle column offset and scrolling down */}
          <div className="hidden md:block pt-16">
            <InfiniteColumn images={col2Images} direction="down" speed={45} />
          </div>
          <div className="hidden md:block pt-32">
            <InfiniteColumn images={col3Images} direction="up" speed={35} />
          </div>
        </motion.div>

        {/* Premium CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: premiumEase }}
        >
          <a
            href="mailto:careers@softexedge.com?subject=Application for Career"
            className="group flex h-16 w-fit cursor-pointer items-center justify-between gap-5 rounded-xl border border-transparent bg-white pl-0 pr-2.5 transition-all duration-300 hover:border-black hover:pl-6 hover:pr-3.5"
          >
            <span className="text-lg font-bold tracking-tight text-black transition-colors duration-300">
              Search Open Jobs
            </span>

            <div className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl bg-black text-white">
              <svg width="0" height="0" className="absolute">
                <title>Connect arrow gradient</title>
                <defs>
                  <linearGradient
                    id="career-icon-grad"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop stopColor="#2E5BFF" offset="0%" />
                    <stop stopColor="#149CCB" offset="100%" />
                  </linearGradient>
                </defs>
              </svg>

              <MdArrowOutward className="absolute z-10 h-5 w-5 transition-transform duration-300 group-hover:-translate-y-8 group-hover:translate-x-8" />
              <MdArrowOutward
                className="absolute z-10 h-5 w-5 -translate-x-8 translate-y-8 transition-transform duration-300 group-hover:translate-x-0 group-hover:translate-y-0"
                style={{ fill: "url(#career-icon-grad)" }}
              />
            </div>
          </a>
        </motion.div>
        
      </div>
    </section>
  );
}
