"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { MdArrowOutward } from "react-icons/md";
import SpotlightGrid from "../ui/SpotlightGrid";

const premiumEase = [0.22, 1, 0.36, 1] as const;

const avatars = [
  "https://i.pravatar.cc/150?img=11",
  "https://i.pravatar.cc/150?img=12",
  "https://i.pravatar.cc/150?img=5",
  "https://i.pravatar.cc/150?img=43",
  "https://i.pravatar.cc/150?img=14",
  "https://i.pravatar.cc/150?img=49",
];

export default function CtaSection() {
  return (
    <section className="relative w-full bg-white px-0 md:px-0 md:pt-0">
      <div className="mx-auto w-full">
        <div className="relative flex min-h-[45vh] w-full flex-col justify-between overflow-hidden rounded-[20px] border border-zinc-800/50 bg-black max-md:[--spotlight-cols:5] max-md:[--spotlight-sweep-col-start:3] max-md:[&_.grid]:gap-2">
          <SpotlightGrid
            speed={0.15}
            sweep
            scatter
            plus
            sweepTrail={6}
            sweepColStart={2}
            sweepRowStart={2}
            sweepRowEnd={5}
          />


          <div className="pointer-events-none absolute inset-y-0 left-0 z-[5] w-full max-w-3xl bg-gradient-to-r from-black via-black/90 to-transparent max-md:from-black/90 max-md:from-50% max-md:via-black/45 max-md:via-85%" />

          {/* The bottom scrim stacks on top of SpotlightGrid's own `to-black/30`
              bottom fade and its vignette, leaving the foot of the card ~30%
              darker than the head — enough to swallow the pattern's glow down
              there. Desktop needs the full weight to carry the contact row over
              a busier grid; mobile's 4-column grid is far darker to begin with. */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-48 bg-gradient-to-t from-black via-black/95 to-transparent opacity-50 max-md:opacity-10" />

          <div className="pointer-events-none relative z-10 px-4 py-8 pt-12 max-md:px-5 max-md:pb-12 max-md:pt-16 md:px-10 md:py-12 lg:py-16 lg:pb-0">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: premiumEase }}
            >
              <h2 className="text-5xl max-md:text-[2.5rem] font-bold leading-[1.05] max-md:leading-[1.11] tracking-tight text-white md:text-6xl lg:text-[5rem]">
                Let's build something <br className="hidden md:block" />
                <span className="bg-gradient-to-r from-[#2E5BFF] to-[#149CCB] bg-clip-text pr-4 text-transparent">
                  extraordinary.
                </span>
              </h2>

              {/* pr-12 on mobile only: the sweep now lives in the right 40% of the
                  card, and this was the one block whose lines ran into it.
                  Shortening the measure keeps body copy off the moving
                  pattern instead of relying on the scrim to hide it. */}
              <p className="mt-6 max-w-2xl text-lg font-light leading-[1.25em] text-white max-md:mt-8 max-md:pr-12 md:text-xl">
                Join the waitlist and be the first one to experience
                photorealism at scale. Get additional 50% discount on the first
                100 people.
              </p>

              <div className="mt-10 flex w-fit pointer-events-auto flex-col gap-3 max-md:mt-12 max-md:gap-4">
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex -space-x-3">
                    {avatars.map((src, i) => (
                      <div
                        key={i}
                        className="relative h-14 w-14 max-md:h-10 max-md:w-10 cursor-pointer overflow-hidden rounded-[16px] max-md:rounded-xl border-[2px] border-black bg-zinc-800 shadow-sm transition-transform hover:z-20 hover:scale-110"
                      >
                        <Image
                          src={src}
                          alt={`Creator ${i + 1}`}
                          fill
                          sizes="(max-width: 768px) 40px, 56px"
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-1 text-[#FFC107]">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className="h-6 w-6 fill-current"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    ))}
                  </div>
                </div>

                <p className="mt-1 text-base font-medium text-zinc-400">
                  Trusted by 27,000+ creators
                </p>
              </div>
            </motion.div>
          </div>

          <div className="pointer-events-none relative z-10 flex w-full flex-col gap-10 px-4 py-8 max-md:gap-12 max-md:px-5 max-md:pt-8 max-md:pb-14 md:flex-row md:items-center md:justify-between md:px-10 md:py-12 lg:py-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1, ease: premiumEase }}
              className="pointer-events-auto shrink-0"
            >
              <button
                type="button"
                className="group relative flex h-14 w-fit cursor-pointer items-center justify-between gap-4 overflow-hidden rounded-xl pl-0 pr-2 transition-all duration-300 hover:border-white hover:pl-6 hover:pr-3.5 before:absolute before:inset-0 before:origin-left before:scale-x-0 before:bg-white before:transition-transform before:duration-300 before:ease-out hover:before:scale-x-100 max-md:h-16 max-md:pl-6 max-md:pr-3.5 max-md:before:scale-x-100"
              >
                <span className="relative z-10 text-base font-bold tracking-tight text-white transition-colors duration-300 group-hover:text-black max-md:text-lg max-md:text-black">
                  Connect With Us
                </span>

                <div className="relative z-10 flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl bg-white text-black transition-colors duration-300 group-hover:bg-black max-md:h-10 max-md:w-10 max-md:bg-black">
                  <svg width="0" height="0" className="absolute">
                    <title>Connect arrow gradient</title>
                    <defs>
                      <linearGradient
                        id="cta-icon-grad"
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

                  <MdArrowOutward className="absolute z-10 h-4 w-4 transition-transform duration-300 group-hover:-translate-y-8 group-hover:translate-x-8 max-md:h-5 max-md:w-5 max-md:-translate-y-8 max-md:translate-x-8" />
                  <MdArrowOutward
                    className="absolute z-10 h-4 w-4 -translate-x-8 translate-y-8 transition-transform duration-300 group-hover:translate-x-0 group-hover:translate-y-0 max-md:h-5 max-md:w-5 max-md:translate-x-0 max-md:translate-y-0"
                    style={{ fill: "url(#cta-icon-grad)" }}
                  />
                </div>
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15, ease: premiumEase }}
              className="pointer-events-auto flex flex-col gap-1 text-left md:text-start"
            >
              <span className="text-xs uppercase tracking-wider text-zinc-500 font-medium">
                Drop us a line
              </span>
              <a
                href="mailto:hello@youragency.com"
                className="group relative w-fit text-base font-bold text-white/90 transition-colors duration-300 hover:text-white md:text-lg"
              >
                hello@youragency.com
                <span className="absolute -bottom-1 left-0 h-[0.5px] w-full origin-right scale-x-0 bg-white transition-transform duration-300 ease-out group-hover:origin-left group-hover:scale-x-100" />
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: premiumEase }}
              className="pointer-events-auto flex flex-col gap-1 text-left md:text-start"
            >
              <span className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                Give us a call
              </span>
              <span className="group relative w-fit cursor-pointer text-base font-bold text-white/90 transition-colors duration-300 hover:text-white md:text-lg">
                +1 (555) 123-4567
                <span className="absolute -bottom-1 left-0 h-[0.5px] w-full origin-right scale-x-0 bg-white transition-transform duration-300 ease-out group-hover:origin-left group-hover:scale-x-100" />
              </span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
