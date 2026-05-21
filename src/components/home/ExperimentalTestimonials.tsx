"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const testimonials = [
  {
    quote:
      "SoftEXedge gives you the tools and the trust to build things you didn't think were possible at scale.",
    name: "Alex Rivera",
    role: "Lead Product Designer",
    initials: "AR",
  },
  {
    quote:
      "The level of technical excellence here is unmatched. Every day is an opportunity to learn something complex.",
    name: "Sarah Chen",
    role: "Sr. Backend Engineer",
    initials: "SC",
  },
  {
    quote:
      "They transformed a simple product into something people genuinely remember. The experience felt cinematic.",
    name: "Sophia Lin",
    role: "Creative Director",
    initials: "SL",
  },
  {
    quote:
      "Rare combination of strong engineering and elite visual storytelling. The interface felt alive.",
    name: "Daniel Reeves",
    role: "CEO · Aether AI",
    initials: "DR",
  },
];

export default function ExperimentalTestimonials() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount =
        window.innerWidth < 768 ? window.innerWidth * 0.8 : 450; // Approximate card width + gap

      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // AUTO SCROLL LOGIC
  useEffect(() => {
    if (isPaused) return;

    const autoScrollInterval = setInterval(() => {
      if (scrollContainerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } =
          scrollContainerRef.current;

        // Added a 20px buffer to ensure rounding errors don't prevent the rewind
        if (scrollLeft + clientWidth >= scrollWidth - 20) {
          scrollContainerRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          scroll("right");
        }
      }
    }, 3500);

    return () => clearInterval(autoScrollInterval);
  }, [isPaused]);

  return (
    <section className="relative overflow-hidden bg-white py-20 text-black md:py-32">
      <div className="mx-auto flex w-full flex-col gap-12 px-10 lg:flex-row lg:items-center lg:gap-20">
        {/* LEFT COLUMN: Title & Navigation */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: "-50px" }}
          className="flex w-full flex-col lg:w-1/3 lg:shrink-0"
        >
          <h2 className="text-5xl font-bold tracking-tight md:text-6xl lg:text-[4rem] lg:leading-[1.1]">
            Voices of the <br />
            <span className="text-[#3445E7]">Collective</span>
          </h2>

          <p className="mt-6 max-w-md text-lg leading-relaxed text-zinc-500">
            Don't just take our word for it. Hear from the visionaries building
            our future every day.
          </p>

          {/* Navigation Arrows */}
          <div className="mt-10 flex items-center gap-4">
            <button
              onClick={() => scroll("left")}
              className="group flex h-14 w-14 items-center justify-center rounded-full border border-zinc-200 bg-white text-black transition-all hover:border-black hover:bg-black hover:text-white active:scale-95"
              aria-label="Previous Testimonial"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-transform group-hover:-translate-x-1"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>
            <button
              onClick={() => scroll("right")}
              className="group flex h-14 w-14 items-center justify-center rounded-full border border-zinc-200 bg-white text-black transition-all hover:border-black hover:bg-black hover:text-white active:scale-95"
              aria-label="Next Testimonial"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-transform group-hover:translate-x-1"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </div>
        </motion.div>

        {/* RIGHT COLUMN: Carousel Cards */}
        <div
          className="w-full lg:w-2/3"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          {/* Scroll Container */}
          {/* ADDED: py-10 to prevent shadow clipping, and pr-[15vw] so the last card doesn't hit a wall */}
          <div
            ref={scrollContainerRef}
            className="flex w-full snap-x snap-mandatory gap-6 overflow-x-auto py-10 pr-[10vw] lg:pr-[25vw] [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {testimonials.map((item, index) => (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                viewport={{ once: true, margin: "-50px" }}
                key={index}
                className="group relative flex h-auto min-h-[340px] w-[85vw] shrink-0 snap-start flex-col justify-between rounded-3xl border border-zinc-200 bg-zinc-50 p-8 shadow-sm transition-all hover:-translate-y-2 hover:shadow-xl hover:shadow-black/5 md:w-[420px]"
              >
                {/* Outlined Quote Icon (Top Right) */}
                <div className="absolute right-8 top-8 text-zinc-200 transition-colors group-hover:text-zinc-300">
                  <svg
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
                    <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
                  </svg>
                </div>

                {/* Quote Text */}
                <p className="relative z-10 mt-8 max-w-[90%] text-xl font-medium leading-relaxed tracking-tight text-zinc-900 md:text-2xl">
                  "{item.quote}"
                </p>

                {/* Bottom Profile */}
                <div className="mt-12 flex items-center gap-4">
                  {/* Avatar Placeholder */}
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-zinc-200 text-sm font-bold text-zinc-500">
                    {item.initials}
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-zinc-900">
                      {item.name}
                    </h4>
                    <p className="mt-0.5 text-xs font-bold uppercase tracking-wider text-[#3445E7]">
                      {item.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
