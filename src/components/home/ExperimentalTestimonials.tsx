// src/components/home/ExperimentalTestimonials.tsx
"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { MdArrowBack, MdArrowForward, MdArrowOutward } from "react-icons/md";
import { useIsDesktop } from "@/lib/useIsDesktop";

const testimonials = [
  {
    quote:
      "SoftEXedge gives you the tools and the trust to build things you didn't think were possible at scale. Before partnering with them, our design system",
    name: "Alex Rivera",
    role: "Lead Product Designer",
    initials: "AR",
  },
  {
    quote:
      "The level of technical excellence here is unmatched. Every day is an opportunity to learn something complex. We were struggling ",
    name: "Sarah Chen",
    role: "Sr. Backend Engineer",
    initials: "SC",
  },
  {
    quote:
      "They transformed a simple product into something people genuinely remember. The experience felt cinematic. From the fluid micro.",
    name: "Sophia Lin",
    role: "Creative Director",
    initials: "SL",
  },
  {
    quote:
      "A rare combination of strong engineering and elite visual storytelling. The interface truly felt alive. In the AI space, making ",
    name: "David Ross",
    role: "CEO · Aether AI",
    initials: "DR",
  },
];

// Duplicate so the arrow-driven row always has cards to reveal
const duplicatedTestimonials = [...testimonials, ...testimonials];

const rotatingWords = ["Collective", "Visionaries", "Innovators", "Future"];

const premiumEase = [0.16, 1, 0.3, 1] as const;

export default function ExperimentalTestimonials() {
  const isDesktop = useIsDesktop();
  const [wordIndex, setWordIndex] = useState(0);
  const [active, setActive] = useState(0);
  // Step = card width + gap (per breakpoint) so the arrows move exactly one card.
  const [step, setStep] = useState(452);

  // Cycle through the headline words every 2.5 seconds
  useEffect(() => {
    // 4.5s (was 2.5s): with the 0.35s exit + ~2s spring settle, a 2.5s cycle
    // kept the word perpetually mid-animation — too fast and reading as lag.
    // Matching the AboutSection cadence gives it time to settle and rest.
    const id = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 4500);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const update = () =>
      setStep(
        window.innerWidth < 640 ? 316 : window.innerWidth < 768 ? 376 : 452,
      );
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const paginate = (d: number) => {
    setActive((a) => (a + d + testimonials.length) % testimonials.length);
  };

  return (
    <section className="relative overflow-hidden bg-white pt-16 pb-8 text-zinc-900 md:pt-32">
      <div className="mx-auto flex w-full flex-col gap-10 px-4 md:px-10 lg:flex-row lg:items-stretch lg:gap-10">
        {/* LEFT COLUMN: title + description + CTA on top, arrows pinned to the bottom */}
        <motion.div
          initial={isDesktop ? { opacity: 0, x: -30 } : false}
          whileInView={isDesktop ? { opacity: 1, x: 0 } : undefined}
          transition={{ duration: 0.8, ease: premiumEase }}
          viewport={{ once: true, margin: "-50px" }}
          className="flex w-full shrink-0 flex-col justify-between lg:w-1/3"
        >
          {/* TOP */}
          <div>
            <p className="mb-6 text-sm uppercase tracking-[0.3em] text-zinc-500 font-medium">
              Testimonials
            </p>
            <h2 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl lg:leading-[0.95em]">
              Voices of the <br />
              {/* px/-mx gives the mask a fade band at each edge without
                  shifting layout — sliding words dissolve at the edges
                  instead of hard-clipping; the resting word sits fully in
                  the opaque zone. */}
              <span className="inline-grid overflow-hidden py-2 px-6 -mx-6 [mask-image:linear-gradient(to_right,transparent_0,black_24px,black_calc(100%-24px),transparent_100%)]">
                {isDesktop ? (
                  // mode="wait": the current word finishes sliding out (right)
                  // and disappears BEFORE the next word enters — sequential,
                  // matching the AboutSection rotating word.
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={wordIndex}
                      initial={{ x: "-100%", opacity: 0 }}
                      animate={{ x: "0%", opacity: 1 }}
                      exit={{
                        // Slide out right and vanish there, then the next
                        // word slides in. Long easeInOut so the exit glides
                        // instead of darting (easeIn accelerated away too fast).
                        x: "100%",
                        opacity: 0,
                        transition: { duration: 1.1, ease: "easeInOut" },
                      }}
                      // Exactly the AboutSection rotating-word config.
                      transition={{
                        type: "spring",
                        stiffness: 30,
                        damping: 20,
                        mass: 1,
                      }}
                      className="col-start-1 row-start-1 whitespace-nowrap bg-linear-to-r from-[#2E5BFF] to-[#149CCB] bg-clip-text text-transparent will-change-transform"
                    >
                      {rotatingWords[wordIndex]}
                    </motion.span>
                  </AnimatePresence>
                ) : (
                  <span className="col-start-1 row-start-1 whitespace-nowrap bg-linear-to-r from-[#2E5BFF] to-[#149CCB] bg-clip-text text-transparent">
                    {rotatingWords[0]}
                  </span>
                )}
              </span>
            </h2>

            <p className="mt-5 max-w-sm text-lg leading-[1.25em] text-zinc-600 font-regular">
              Don't just take our word for it. Hear from the visionaries
              building our future every day
            </p>

            <div className="mt-8 flex items-start">
              <button
                type="button"
                className="group flex h-16 w-fit cursor-pointer items-center justify-between gap-5 rounded-xl border border-transparent bg-white pl-0 pr-2.5 transition-all duration-300 hover:border-black hover:pl-6 hover:pr-3.5"
              >
                <span className="text-lg font-bold tracking-tight text-black transition-colors duration-300">
                  Connect With Us
                </span>

                <div className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl bg-black text-white">
                  <svg width="0" height="0" className="absolute">
                    <title>Connect arrow gradient</title>
                    <defs>
                      <linearGradient
                        id="testimonial-icon-grad"
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
                    style={{ fill: "url(#testimonial-icon-grad)" }}
                  />
                </div>
              </button>
            </div>
          </div>

          {/* BOTTOM: navigation arrows + counter */}
          <div className="mt-12 flex items-center gap-4 max-md:hidden">
            <button
              type="button"
              onClick={() => paginate(-1)}
              aria-label="Previous testimonial"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-zinc-300 text-zinc-900 transition-colors hover:bg-zinc-900 hover:text-white"
            >
              <MdArrowBack className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => paginate(1)}
              aria-label="Next testimonial"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-zinc-300 text-zinc-900 transition-colors hover:bg-zinc-900 hover:text-white"
            >
              <MdArrowForward className="h-5 w-5" />
            </button>
          </div>
        </motion.div>

        {/* RIGHT COLUMN: card row, navigated by the arrows */}
        <div className="relative -mr-6 flex h-[360px] w-full items-center overflow-hidden md:h-[440px] lg:flex-1 max-md:h-auto max-md:overflow-visible">
          <motion.div
            animate={isDesktop ? { x: -active * step } : undefined}
            transition={{ duration: 0.6, ease: premiumEase }}
            className="flex w-max flex-row gap-4 px-4 md:gap-3 max-md:w-full max-md:flex-col max-md:px-0"
          >
            {(isDesktop ? duplicatedTestimonials : testimonials).map(
              (item, i) => (
                <div
                  key={`${item.name}-${i}`}
                  className="group relative flex min-h-[360px] w-[300px] shrink-0 flex-col justify-between rounded-3xl border border-zinc-200 bg-linear-to-br from-white to-[#efefef] p-8 transition-colors hover:border-zinc-300 hover:bg-linear-to-br hover:from-white hover:to-zinc-200 sm:w-[360px] md:min-h-[440px] md:w-[440px] md:py-10"
                >
                  {/* Outlined Quote Icon (Top Right) */}
                  <div className="absolute right-6 top-6 text-black/10 transition-colors group-hover:text-black/20 md:right-8 md:top-8">
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
                      <title>Quote</title>
                      <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
                      <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
                    </svg>
                  </div>

                  {/* Quote Text */}
                  <p className="relative z-10 mt-6 max-w-[100%] text-lg font-medium leading-[1.5em] tracking-tight text-zinc-900 md:mt-14 md:text-xl lg:text-2xl">
                    "{item.quote}"
                  </p>

                  {/* Bottom Profile */}
                  <div className="mt-8 flex items-center gap-4 md:mt-10">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-black/10 bg-black text-sm font-bold text-white md:h-14 md:w-14 md:text-base">
                      {item.initials}
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-zinc-900">
                        {item.name}
                      </h4>
                      <p className="mt-1 text-xs font-bold uppercase tracking-wider text-zinc-500 md:text-sm">
                        {item.role}
                      </p>
                    </div>
                  </div>
                </div>
              ),
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
