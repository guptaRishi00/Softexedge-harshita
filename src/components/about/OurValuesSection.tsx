"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { MdArrowOutward } from "react-icons/md";
import DotGrid from "../ui/DotGrid";

const premiumEase = [0.22, 1, 0.36, 1] as const;

export default function OurValuesSection() {
  return (
    <section className="relative flex w-full flex-col overflow-hidden bg-black font-sans py-20 md:py-32">
      {/* Background DotGrid Pattern */}
      <div className="absolute inset-0 flex items-center w-full justify-center gap-1 opacity-50">
        <DotGrid
          dotSize={3}
          gap={30}
          baseColor="#27272a"
          activeColor="#2E5BFF"
          proximity={150}
          shockRadius={250}
          shockStrength={1}
          resistance={2000}
          returnDuration={4.4}
        />
      </div>
      <div className="pointer-events-none absolute inset-0 z-[1] bg-black/40" />

      {/* Content Container */}
      <div className="relative z-10 mx-auto w-full  px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center lg:items-stretch">
          {/* Left Column: Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: premiumEase }}
            className="w-full lg:w-5/12 shrink-0 flex flex-col"
          >
            <div
              className="relative w-full aspect-[4/5] lg:h-[800px] overflow-hidden bg-zinc-900"
              style={{
                // Asymmetric rounded shape via clip-path — heavy radius on
                // top-left + bottom-right, subtle on the others (round edges).
                clipPath: "inset(0 round 5rem 1.5rem 5rem 1.5rem)",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30 z-10" />
              <Image
                src="https://plus.unsplash.com/premium_photo-1693671725924-302f7a2c450b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Z3Jvd3RofGVufDB8fDB8fHww"
                alt="Our Studio Culture"
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
            <div className="mb-8 inline-flex items-center justify-start rounded-full">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/60">
                Our Culture
              </span>
            </div>

            {/* Headline */}
            <h2 className="text-5xl md:text-7xl lg:text-[90px] font-bold tracking-tighter leading-[0.9em] mb-8 text-white">
              We've built a culture of
              <span className="pl-5 bg-gradient-to-r from-[#2E5BFF] to-[#149CCB] bg-clip-text text-transparent">
                trust.
              </span>
            </h2>

            {/* Paragraph */}
            <p className="mt-8 text-lg font-medium text-zinc-400 leading-[1.2em]">
              We produce good work for good people, and with the idea that staff
              and the client will be happy throughout the full process. This in
              return will bring more work our way, whether that's via
              recommendation or further work from that client.
            </p>

            {/* Quote Card (Project Colors: Dark Theme) */}
            <div className="mt-12 relative flex flex-col gap-8 rounded-3xl bg-zinc-950 p-8 md:p-10">
              <p className="text-xl md:text-2xl font-medium leading-[1.4em] tracking-tight text-white">
                <span className="mr-3 inline-flex align-top font-serif text-4xl text-[#2E5BFF]">
                  "
                </span>
                My vision has always been to look after the clients we work
                with, but to also look after the staff just as much. That will
                get the best results for everyone.
              </p>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mt-4">
                {/* Profile */}
                <div className="flex items-center gap-4">
                  <div className="relative h-14 w-14 overflow-hidden rounded-full bg-zinc-800">
                    <Image
                      src="/assets/zyro-O-Nemx50zDE-unsplash.jpg"
                      alt="Andy Golpys"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col">
                    <h4 className="font-bold text-white text-lg">
                      Andy Golpys
                    </h4>
                    <p className="text-sm font-medium tracking-wide text-zinc-500 uppercase">
                      Co-Founder
                    </p>
                  </div>
                </div>

                {/* ExperimentalTestimonials CTA Button */}
                <Link href="/about" className="shrink-0 w-full sm:w-auto">
                  <button
                    type="button"
                    className="group flex h-16 w-full sm:w-fit cursor-pointer items-center justify-between gap-5 rounded-xl border border-transparent pl-0 pr-2.5 transition-all duration-300 hover:border-white hover:pl-6 hover:pr-3.5"
                  >
                    <span className="text-lg font-bold tracking-tight text-white transition-colors duration-300 pl-4 sm:pl-0">
                      Connect With Us
                    </span>

                    <div className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white text-black">
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

                      <MdArrowOutward className="absolute z-10 h-5 w-5 transition-transform duration-300 group-hover:-translate-y-8 group-hover:translate-x-8" />
                      <MdArrowOutward
                        className="absolute z-10 h-5 w-5 -translate-x-8 translate-y-8 transition-transform duration-300 group-hover:translate-x-0 group-hover:translate-y-0"
                        style={{ fill: "url(#culture-icon-grad)" }}
                      />
                    </div>
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
