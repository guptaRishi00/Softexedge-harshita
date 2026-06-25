"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";
import { MdArrowOutward } from "react-icons/md";
import Header from "../page/Header";

const premiumEase = [0.16, 1, 0.3, 1] as const;

// Word-by-word stagger reveal (same pattern as the brand-strategy hero)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.15 },
  },
} as const;

const wordVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: premiumEase },
  },
} as const;

const col1Images = [
  "https://plus.unsplash.com/premium_photo-1661771773771-a093c948ba92?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2FyZWVyfGVufDB8fDB8fHww",
  "https://images.unsplash.com/photo-1459180129673-eefb56f79b45?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGNhcmVlcnxlbnwwfHwwfHx8MA%3D%3D",
  "https://images.unsplash.com/photo-1506784926709-22f1ec395907?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGNhcmVlcnxlbnwwfHwwfHx8MA%3D%3D",
];

const col2Images = [
  "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzF8fGNhcmVlcnxlbnwwfHwwfHx8MA%3D%3D",
  "https://images.unsplash.com/photo-1561489422-45de3d015e3e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTB8fGNhcmVlcnxlbnwwfHwwfHx8MA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1661767467261-4a4bed92a507?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjF8fGNhcmVlcnxlbnwwfHwwfHx8MA%3D%3D",
];

const col3Images = [
  "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=800&auto=format&fit=crop",
];

function InfiniteRow({
  images,
  direction,
  speed,
}: {
  images: string[];
  direction: "left" | "right";
  speed: number;
}) {
  return (
    <div className="relative flex w-full overflow-hidden">
      <motion.div
        className="flex w-max"
        animate={{
          x:
            direction === "left"
              ? ["0%", "-33.333333%"]
              : ["-33.333333%", "0%"],
        }}
        transition={{
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop",
          ease: "linear",
          duration: speed,
        }}
      >
        {Array.from({ length: 3 }).map((_, loopIndex) => (
          <div key={loopIndex} className="flex shrink-0">
            {images.map((src, i) => (
              <div key={i} className="pr-3 shrink-0">
                <div className="relative h-[160px] sm:h-[200px] md:h-[260px] aspect-[4/5] rounded-[2rem] overflow-hidden shadow-xs hover:shadow-lg transition-shadow duration-300">
                  <img
                    src={src}
                    alt="Career Collage"
                    className="w-full h-full object-cover transition-transform duration-[10s] ease-out hover:scale-110 pointer-events-none"
                  />
                </div>
              </div>
            ))}
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
      <div className="relative z-10 flex w-full flex-col pt-16 md:pt-24">
        {/* Title & Subheadline with padding */}
        <div className="px-6 md:px-12 w-full max-w-[1200px] mx-auto text-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <h1 className="text-[2.75rem] font-bold leading-[1.05] tracking-tight text-black sm:text-6xl md:text-7xl lg:text-[6rem] mb-2">
              <motion.span variants={wordVariants} className="inline-block">
                Think.
              </motion.span>{" "}
              <motion.span variants={wordVariants} className="inline-block">
                Create.
              </motion.span>{" "}
              <motion.span variants={wordVariants} className="inline-block">
                Do.
              </motion.span>
            </h1>
            <h2 className="text-[2.75rem] font-bold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl lg:text-[6rem] mb-6">
              <motion.span
                variants={wordVariants}
                className="inline-block bg-linear-to-r from-[#2E5BFF] to-[#149CCB] bg-clip-text text-transparent pr-4"
              >
                Grow With Us
              </motion.span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: premiumEase }}
            className="text-center text-zinc-600 font-medium text-lg md:text-xl max-w-xl mx-auto leading-[1.2em] mb-16"
          >
            We’re creating impactful digital solutions.
            <br />
            Join us on the journey.
          </motion.p>
        </div>

        {/* Dynamic Image Carousel (Horizontal, Edge-to-Edge) */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: premiumEase }}
          className="w-full flex flex-col gap-3"
        >
          <InfiniteRow images={col1Images} direction="left" speed={40} />
          <InfiniteRow images={col2Images} direction="right" speed={45} />
        </motion.div>
      </div>
    </section>
  );
}
