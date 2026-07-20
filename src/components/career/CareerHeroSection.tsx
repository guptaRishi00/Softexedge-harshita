"use client";

import { motion } from "framer-motion";
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

// Each carousel slot is one of three things — an image, an autoplaying video,
// or a quote card — mixed within a row. Card dimensions are unchanged.
type CarouselItem =
  | { type: "image"; src: string }
  | { type: "video"; src: string }
  | { type: "quote"; text: string; author: string; role: string };

const col1Items: CarouselItem[] = [
  {
    type: "image",
    src: "https://plus.unsplash.com/premium_photo-1661771773771-a093c948ba92?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2FyZWVyfGVufDB8fDB8fHww",
  },
  {
    type: "quote",
    text: "The best place I've grown — trusted with real work from day one.",
    author: "Priya Sharma",
    role: "Product Designer",
  },
  { type: "video", src: "/assets/video1.mp4" },
];

const col2Items: CarouselItem[] = [
  { type: "video", src: "/assets/video2.mp4" },
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1561489422-45de3d015e3e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTB8fGNhcmVlcnxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    type: "quote",
    text: "Great people, real ownership, and room to do the best work of your life.",
    author: "Arjun Mehta",
    role: "Engineering Lead",
  },
];

function CarouselCard({ item }: { item: CarouselItem }) {
  return (
    <div className="relative h-[160px] sm:h-[200px] md:h-[260px] aspect-[4/5] rounded-[2rem] overflow-hidden shadow-xs hover:shadow-lg transition-shadow duration-300">
      {item.type === "image" && (
        <img
          src={item.src}
          alt="Career Collage"
          className="w-full h-full object-cover transition-transform duration-[10s] ease-out hover:scale-110 pointer-events-none"
        />
      )}

      {item.type === "video" && (
        <video
          src={item.src}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover pointer-events-none"
        />
      )}

      {item.type === "quote" && (
        <div className="flex h-full w-full flex-col justify-start gap-1 bg-[#0a0a0a] p-5 md:gap-2 md:p-7">
          <span className="bg-linear-to-r from-[#2E5BFF] to-[#149CCB] bg-clip-text text-5xl font-bold leading-none text-transparent md:text-6xl">
            “
          </span>
          <p className="text-sm font-medium leading-[1.3em] tracking-tight text-white md:text-base">
            {item.text}
          </p>
        </div>
      )}
    </div>
  );
}

function InfiniteRow({
  items,
  direction,
  speed,
}: {
  items: CarouselItem[];
  direction: "left" | "right";
  speed: number;
}) {
  return (
    <div className="relative flex w-full overflow-hidden">
      <motion.div
        className="flex w-max"
        animate={{
          // Translate by exactly one copy-width (1/6 of the 6-copy track) so
          // the loop reset is seamless. Fewer copies = far lighter DOM + video
          // decode load than the old 12, with no visible change.
          x:
            direction === "left"
              ? ["0%", "-16.666667%"]
              : ["-16.666667%", "0%"],
        }}
        transition={{
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop",
          ease: "linear",
          duration: speed,
        }}
      >
        {Array.from({ length: 6 }).map((_, loopIndex) => (
          <div key={loopIndex} className="flex shrink-0">
            {items.map((item) => (
              <div
                key={item.type === "quote" ? item.author : item.src}
                className="pr-3 shrink-0"
              >
                <CarouselCard item={item} />
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
            className="text-center text-zinc-600 font-light text-lg md:text-xl max-w-xl mx-auto leading-[1.25em] mb-16"
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
          <InfiniteRow items={col1Items} direction="left" speed={40} />
          <InfiniteRow items={col2Items} direction="right" speed={45} />
        </motion.div>
      </div>
    </section>
  );
}
