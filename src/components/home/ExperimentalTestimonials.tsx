"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote:
      "The experience felt cinematic. Every interaction had weight, rhythm, and intention.",
    name: "Aarav Mehta",
    role: "Founder · Velora",
  },
  {
    quote:
      "They transformed a simple product into something people genuinely remember.",
    name: "Sophia Lin",
    role: "Creative Director · Nox",
  },
  {
    quote:
      "Rare combination of strong engineering and elite visual storytelling.",
    name: "Daniel Reeves",
    role: "CEO · Aether AI",
  },
  {
    quote:
      "The interface felt alive. Smooth, immersive, and insanely polished.",
    name: "Noah Carter",
    role: "Product Lead · Nexus",
  },
];

// Duplicate the array to create enough content for a seamless infinite loop
const loopedTestimonials = [...testimonials, ...testimonials, ...testimonials];

export default function TestimonialCarousel() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const marqueeTween = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    // 1. Initialize Lenis Smooth Scrolling
    const lenis = new Lenis({
      lerp: 0.08, // smoothness
      smoothWheel: true,
    });

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    const ticker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    // 2. Setup GSAP Animations
    let ctx = gsap.context(() => {
      // Animate the entire track fading in
      gsap.fromTo(
        trackRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        },
      );

      // Infinite Marquee Animation
      // We have 3 sets of items. We move exactly 1/3 of the total width to create a perfect loop.
      marqueeTween.current = gsap.to(trackRef.current, {
        xPercent: -33.333333,
        ease: "none",
        duration: 30, // Change this to speed up/slow down
        repeat: -1,
      });
    }, sectionRef);

    // Cleanup
    return () => {
      ctx.revert();
      gsap.ticker.remove(ticker);
      lenis.destroy();
    };
  }, []);

  // Pause marquee on hover so users can read the cards
  const handleMouseEnter = () => {
    gsap.to(marqueeTween.current, {
      timeScale: 0,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(marqueeTween.current, {
      timeScale: 1,
      duration: 0.5,
      ease: "power2.in",
    });
  };

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-white py-20 md:py-28 text-black"
    >
      {/* Background blur orbs */}
      <div className="pointer-events-none absolute left-[-5%] top-10 h-[20rem] w-[20rem] rounded-full bg-black/[0.03] blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-[-5%] h-[15rem] w-[15rem] rounded-full bg-black/[0.04] blur-3xl" />

      {/* Heading (Framer Motion) */}
      <div className="mx-auto mb-12 md:mb-16 max-w-7xl px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.35em] text-zinc-400">
            Testimonials
          </p>
          <h2 className="max-w-4xl text-[11vw] font-black uppercase leading-[0.85] tracking-[-0.04em] md:text-[6rem]">
            PEOPLE
            <br />
            TALK.
          </h2>
        </motion.div>
      </div>

      {/* Auto-moving Carousel */}
      <div className="relative w-full">
        {/* Container with Edge Masks for smooth fade in/out */}
        <div className="w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent_0%,white_10%,white_90%,transparent_100%)]">
          <div
            ref={trackRef}
            className="flex w-max gap-4 md:gap-6 px-6 py-8"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleMouseEnter}
            onTouchEnd={handleMouseLeave}
          >
            {loopedTestimonials.map((item, index) => (
              <div
                key={index}
                className="shrink-0 flex items-center justify-center"
              >
                {/* Individual Card (Framer Motion) */}
                <motion.div
                  whileHover={{
                    y: -10,
                    rotate: index % 2 === 0 ? -1.5 : 1.5,
                    scale: 1.02,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                  }}
                  className="group relative flex flex-col justify-between w-[75vw] md:w-[420px] h-full min-h-[320px] overflow-hidden rounded-[2rem] border border-zinc-200 bg-zinc-50 p-6 md:p-8 shadow-sm hover:shadow-xl hover:shadow-black/5 transition-shadow duration-500 cursor-grab active:cursor-grabbing"
                >
                  {/* Subtle noise glow */}
                  <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100">
                    <div className="absolute left-[-20%] top-[-20%] h-48 w-48 rounded-full bg-black/[0.04] blur-2xl" />
                  </div>

                  {/* Top Quote Mark */}
                  <div className="mb-8 flex items-start justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-400">
                      0{(index % testimonials.length) + 1}
                    </span>
                    <div className="text-5xl font-serif font-black leading-[0.5] text-zinc-200">
                      ”
                    </div>
                  </div>

                  {/* Quote */}
                  <h3 className="max-w-xl text-xl font-black leading-[1.25] tracking-tight md:text-2xl text-zinc-900 mb-10">
                    {item.quote}
                  </h3>

                  {/* Bottom Info */}
                  <div className="mt-auto flex items-end justify-between border-t border-zinc-200 pt-5 relative z-10">
                    <div>
                      <p className="text-sm md:text-base font-bold uppercase tracking-tight text-black">
                        {item.name}
                      </p>
                      <p className="mt-1 text-[10px] md:text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">
                        {item.role}
                      </p>
                    </div>

                    {/* Arrow Button */}
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-black/20 text-black transition-all duration-500 group-hover:border-black group-hover:bg-black group-hover:text-white">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="7" y1="17" x2="17" y2="7"></line>
                        <polyline points="7 7 17 7 17 17"></polyline>
                      </svg>
                    </div>
                  </div>

                  {/* Giant Faded Watermark */}
                  <div className="pointer-events-none absolute bottom-[-10%] right-[-5%] text-[6rem] md:text-[7rem] font-black leading-none tracking-[-0.08em] text-black/[0.02] select-none">
                    TALK
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
