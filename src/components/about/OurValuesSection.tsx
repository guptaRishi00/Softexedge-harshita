"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MdArrowOutward } from "react-icons/md";

const premiumEase = [0.22, 1, 0.36, 1] as const;

const quotes = [
  {
    text: "My vision has always been to look after the clients we work with, but to also look after the staff just as much. That will get the best results for everyone.",
    name: "Sidhartha Parasramka",
    role: "CEO",
    avatar: "/assets/ceo.jpeg",
  },
  {
    text: "Great work comes from teams that feel trusted. We give people the room to own their craft, and the results speak for themselves — for us and for our clients.",
    name: "Priya Sharma",
    role: "Creative Director",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    text: "Every project here starts with the same question: what would make this genuinely great? That standard, shared by everyone, is what keeps clients coming back.",
    name: "Arjun Mehta",
    role: "Head of Engineering",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
];

export default function OurValuesSection() {
  // Quote-card carousel: same card, three quotes cycling in place.
  const [quoteIndex, setQuoteIndex] = useState(0);

  // biome-ignore lint/correctness/useExhaustiveDependencies: quoteIndex re-arms the timer so a manual dot click gets a full 6s dwell
  useEffect(() => {
    const id = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % quotes.length);
    }, 6000);
    return () => clearInterval(id);
  }, [quoteIndex]);
  return (
    <section
      id="culture"
      className="relative flex w-full flex-col overflow-hidden bg-black font-sans py-20 md:py-32"
    >
      {/* Content Container */}
      <div className="relative z-10 mx-auto w-full px-4 md:px-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center lg:items-stretch">
          {/* Left Column: Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: premiumEase }}
            className="w-full lg:w-5/12 shrink-0 flex flex-col"
          >
            <div className="relative w-full aspect-[4/5] lg:aspect-auto lg:flex-1 overflow-hidden rounded-xl bg-zinc-900">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30 z-10" />
              <Image
                src="/assets/ceo2.png"
                alt="CEO"
                fill
                className="object-cover transition-transform duration-[20s] ease-out hover:scale-110"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>
          </motion.div>

          {/* Right Column: Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: premiumEase }}
            className="w-full lg:w-7/12 flex flex-col justify-center py-6 lg:py-12"
          >
            {/* Eyebrow */}
            <div className="mb-8">
              <span className="text-sm font-medium uppercase tracking-[0.3em] text-zinc-500">
                Our Culture
              </span>
            </div>

            {/* Headline */}
            <h2 className="text-5xl md:text-7xl lg:text-[80px] font-bold tracking-tighter leading-[0.9em] mb-8 text-white">
              We've built a culture of
              <span className="pl-5 bg-gradient-to-r from-[#2E5BFF] to-[#149CCB] bg-clip-text text-transparent">
                trust.
              </span>
            </h2>

            {/* Paragraph */}
            <p className="max-w-2xl text-lg font-light leading-[1.25em] text-white md:text-xl">
              We produce good work for good people, and with the idea that staff
              and the client will be happy throughout the full process. This in
              return will bring more work our way, whether that's via
              recommendation or further work from that client.
            </p>

            {/* Quote Card carousel — static shell, three quotes cycling in
                place (same placement, next card swaps in the same spot) */}
            <div className="mt-12 relative flex flex-col rounded-3xl border border-white/[0.06] bg-[#100f0f] p-8 md:p-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={quoteIndex}
                  initial={{ opacity: 0, x: 32 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -32 }}
                  transition={{ duration: 0.5, ease: premiumEase }}
                  className="flex flex-col gap-8"
                >
                  <p className="text-xl md:text-2xl font-medium leading-[1.2em] tracking-tight text-white">
                    {quotes[quoteIndex].text}
                  </p>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mt-4">
                    {/* Profile */}
                    <div className="flex items-center gap-4">
                      <div className="relative h-14 w-14 overflow-hidden rounded-full bg-zinc-800">
                        <Image
                          src={quotes[quoteIndex].avatar}
                          alt={quotes[quoteIndex].name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex flex-col">
                        <h4 className="font-bold text-white text-lg">
                          {quotes[quoteIndex].name}
                        </h4>
                        <p className="text-sm font-medium tracking-wide text-zinc-500 uppercase">
                          {quotes[quoteIndex].role}
                        </p>
                      </div>
                    </div>

                    {/* CTA Button (same style as CtaSection) */}
                    <Link href="/about" className="shrink-0 w-full sm:w-auto">
                      <button
                        type="button"
                        className="group relative flex h-14 w-full sm:w-fit cursor-pointer items-center justify-between gap-4 overflow-hidden rounded-xl pl-5 pr-2 transition-colors duration-300 hover:border-white before:absolute before:inset-0 before:origin-left before:scale-x-0 before:bg-white before:transition-transform before:duration-300 before:ease-out hover:before:scale-x-100"
                      >
                        <span className="relative z-10 text-base font-bold tracking-tight text-white transition-colors group-hover:text-black">
                          Connect With Me
                        </span>

                        <div className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white text-black transition-colors duration-300 group-hover:bg-black">
                          <svg width="0" height="0" className="absolute">
                            <title>Connect arrow gradient</title>
                            <defs>
                              <linearGradient
                                id="culture-icon-grad"
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

                          <MdArrowOutward className="absolute z-10 h-4 w-4 transition-transform duration-300 group-hover:-translate-y-8 group-hover:translate-x-8" />
                          <MdArrowOutward
                            className="absolute z-10 h-4 w-4 -translate-x-8 translate-y-8 transition-transform duration-300 group-hover:translate-x-0 group-hover:translate-y-0"
                            style={{ fill: "url(#culture-icon-grad)" }}
                          />
                        </div>
                      </button>
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Carousel dots */}
              <div className="mt-8 flex items-center gap-2">
                {quotes.map((q, i) => (
                  <button
                    key={q.name}
                    type="button"
                    aria-label={`Show quote ${i + 1}`}
                    onClick={() => setQuoteIndex(i)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === quoteIndex
                        ? "w-6 bg-gradient-to-r from-[#2E5BFF] to-[#149CCB]"
                        : "w-1.5 bg-white/20 hover:bg-white/40"
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
