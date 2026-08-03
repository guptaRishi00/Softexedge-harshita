"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
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

const duplicatedTestimonials = [...testimonials, ...testimonials];

const rotatingWords = ["Collective", "Visionaries", "Innovators", "Future"];

const premiumEase = [0.16, 1, 0.3, 1] as const;

export default function ExperimentalTestimonials() {
  const isDesktop = useIsDesktop();
  const [wordIndex, setWordIndex] = useState(0);
  const [active, setActive] = useState(0);
  const [step, setStep] = useState(452);

  useEffect(() => {
    const id = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 6000);
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
    <section
      id="testimonials"
      className="relative overflow-hidden bg-white pt-16 pb-8 text-zinc-900 md:pt-32"
    >
      <div className="mx-auto flex w-full flex-col gap-10 px-4 max-md:px-3 md:px-10 lg:flex-row lg:items-stretch lg:gap-10">
        <motion.div
          initial={isDesktop ? { opacity: 0, x: -30 } : false}
          whileInView={isDesktop ? { opacity: 1, x: 0 } : undefined}
          transition={{ duration: 0.8, ease: premiumEase }}
          viewport={{ once: true, margin: "-50px" }}
          className="flex w-full shrink-0 flex-col justify-between lg:w-1/3"
        >
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, ease: premiumEase }}
              className="mb-6 text-sm uppercase tracking-[0.3em] text-zinc-500 font-medium max-md:text-xs"
            >
              Testimonials
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.1, ease: premiumEase }}
              className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl lg:leading-[0.95em]"
            >
              Voices of the <br />
              <span className="inline-grid overflow-hidden py-2 px-6 -mx-6 [mask-image:linear-gradient(to_right,transparent_0,black_24px,black_calc(100%-24px),transparent_100%)]">
                {isDesktop ? (
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={wordIndex}
                      initial={{ x: "-100%", opacity: 0 }}
                      animate={{ x: "0%", opacity: 1 }}
                      exit={{
                        x: "100%",
                        opacity: 0,
                        transition: { duration: 1.5, ease: "easeInOut" },
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 22,
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
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.2, ease: premiumEase }}
              className="mt-5 max-w-sm text-lg leading-[1.25em] text-zinc-600 font-regular max-md:text-base"
            >
              Don't just take our word for it. Hear from the visionaries
              building our future every day
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.2, ease: premiumEase }}
              className="mt-8 flex items-start"
            >
              <Link
                href="/contact"
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
              </Link>
            </motion.div>
          </div>

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

        {/* Edge to edge on mobile without disturbing the text column's 12px inset:
            -mx-3 pulls the box out over the wrapper's px-3, and the width must be
            grown by BOTH paddings to match — `w-full` alone resolves to the
            wrapper's content box (100% - 24px), so a negative margin shifts it
            left but leaves 24px of dead space on the right. */}
        <div className="relative -mr-6 flex h-[360px] w-full items-center overflow-hidden md:h-[440px] lg:flex-1 max-md:-mx-3 max-md:h-auto max-md:w-[calc(100%+1.5rem)]">
          <motion.div
            // Desktop paginates by arrows (-active * step). Mobile has no arrows,
            // so it self-scrolls: the track holds exactly two copies of the list,
            // and -50% of its own width is precisely one copy — a seamless loop.
            animate={isDesktop ? { x: -active * step } : { x: ["-50%", "0%"] }}
            transition={
              isDesktop
                ? { duration: 0.6, ease: premiumEase }
                : {
                    duration: 40,
                    ease: "linear",
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "loop",
                  }
            }
            // max-md:gap-0 + per-card mr-4 (below) instead of a flex gap: with a
            // gap, N cards have only N-1 gaps, so -50% of the track is one gap
            // short of exactly one copy and the loop jumps each cycle. Folding the
            // spacing into each card makes width = 2N*(card+gap), so -50% lands
            // precisely on the duplicate.
            className="flex w-max flex-row gap-4 px-4 md:gap-3 max-md:gap-0 max-md:px-0"
          >
            {duplicatedTestimonials.map((item, i) => (
              <div
                key={`${item.name}-${i}`}
                className="group relative flex min-h-[360px] w-[300px] shrink-0 flex-col justify-between rounded-3xl border border-zinc-200 bg-linear-to-br from-white to-[#efefef] p-8 transition-colors max-md:mr-4 max-md:px-5 sm:w-[360px] md:min-h-[440px] md:w-[440px] md:py-10"
              >
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

                <p className="relative z-10 mt-10 max-w-[100%] text-xl font-medium leading-[1.3em] lg:leading-[1.5em] tracking-tight text-zinc-900 max-md:text-sm md:mt-14 md:text-xl lg:text-2xl">
                  "{item.quote}"
                </p>

                <div className="mt-8 flex items-center gap-4 md:mt-10">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-black/10 bg-black text-sm font-bold text-white max-md:h-10 max-md:w-10 max-md:text-xs md:h-14 md:w-14 md:text-base">
                    {item.initials}
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-zinc-900 max-md:text-sm">
                      {item.name}
                    </h4>
                    <p className="mt-1 text-xs font-bold uppercase tracking-wider text-zinc-500 max-md:text-[0.65rem] md:text-sm">
                      {item.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
