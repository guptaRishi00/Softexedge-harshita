"use client";

import React, { useRef } from "react";
import { motion, Variants } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Header from "../page/Header"; // Adjust import path as needed

const premiumEase = [0.22, 1, 0.36, 1] as const;

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: premiumEase },
  },
};

export default function ContactHeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Cinematic GSAP Reveal Animation for the Bento Grid
  useGSAP(
    () => {
      const tl = gsap.timeline({ delay: 0.3 });

      tl.fromTo(
        ".contact-bento",
        { clipPath: "inset(100% 0% 0% 0%)", y: 40 },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          y: 0,
          duration: 1.5,
          stagger: 0.15,
          ease: "power4.inOut",
        },
      ).fromTo(
        ".bento-content",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: "power3.out" },
        "-=0.8",
      );
    },
    { scope: containerRef },
  );

  return (
    <main className="relative flex min-h-screen w-full flex-col overflow-hidden bg-[#FAFAFA] font-sans text-zinc-900">
      <Header />

      <section className="relative z-10 flex w-full flex-1 items-center justify-center px-6 pb-12 pt-32 lg:px-10 lg:pb-16 lg:pt-28">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mx-auto grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-10"
        >
          {/* Left Column: Massive Typography */}
          <div className="flex flex-col items-start justify-center lg:col-span-5">
            <motion.div
              variants={itemVariants}
              className="mb-5 inline-flex w-fit items-center justify-center rounded-full border border-black/10 bg-white px-3 py-1"
            >
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-600">
                Contact Us
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-[3.5rem] font-bold leading-[1.05] tracking-tight text-zinc-900 md:text-[5rem] lg:text-[4.5rem]"
            >
              Let's build
              <br />
              <span className="bg-gradient-to-r from-[#2E5BFF] to-[#07D6F3] bg-clip-text text-transparent">
                the extraordinary.
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="mt-6 max-w-lg text-base font-medium leading-[1.6em] text-zinc-500 lg:mt-8 lg:text-lg"
            >
              Whether you have a clear vision or just a spark of an idea, our
              engineering and design teams are ready to bring it to life.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="mt-10 flex items-center gap-4 border-t border-zinc-200 pt-8 lg:mt-12"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-900 text-white">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                  Direct Line
                </p>
                <p className="text-lg font-bold text-zinc-900">
                  +1 (800) 123-4567
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Contact Methods Bento Grid */}
          <div
            ref={containerRef}
            className="grid h-[400px] w-full grid-cols-2 grid-rows-2 gap-4 lg:col-span-7 lg:h-[480px]"
          >
            {/* Top Wide Box: Primary Email CTA */}
            <a
              href="mailto:hello@softexedge.com"
              className="contact-bento group relative col-span-2 row-span-1 flex h-full w-full flex-col justify-between overflow-hidden rounded-[1.5rem] bg-zinc-900 p-6 text-white shadow-xl transition-transform hover:scale-[1.02] lg:rounded-[2rem] lg:p-8"
            >
              <div className="absolute inset-0 z-0 bg-[url('/noise.png')] opacity-[0.04] mix-blend-overlay" />
              <div className="absolute right-0 top-0 h-64 w-64 -translate-y-1/2 translate-x-1/2 rounded-full bg-gradient-to-bl from-[#07D6F3]/30 to-transparent blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

              <div className="bento-content flex items-center justify-between relative z-10">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800/50 backdrop-blur-sm">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-[#07D6F3]"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-zinc-900 transition-transform duration-300 group-hover:-rotate-45">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14M12 5l7 7" />
                  </svg>
                </div>
              </div>

              <div className="bento-content relative z-10">
                <p className="text-sm font-semibold uppercase tracking-widest text-zinc-400">
                  Email Us
                </p>
                <h3 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl">
                  hello@softexedge.com
                </h3>
              </div>
            </a>

            {/* Bottom Left Box: Location / HQ */}
            <div className="contact-bento group relative col-span-1 row-span-1 h-full w-full overflow-hidden rounded-[1.5rem] lg:rounded-[2rem]">
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <img
                src="/assets/alex-kotliarskyi-QBpZGqEMsKg-unsplash.jpg"
                alt="Softexedge Global HQ"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="bento-content absolute bottom-0 left-0 z-20 p-5 lg:p-6">
                <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-[#2E5BFF] text-white">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-white/80">
                  Global HQ
                </p>
                <p className="text-lg font-semibold text-white">New York, NY</p>
              </div>
            </div>

            {/* Bottom Right Box: Social & Booking */}
            <div className="contact-bento relative col-span-1 row-span-1 flex flex-col gap-3 lg:gap-4">
              {/* Top Half: Book a Call */}
              <a
                href="#book"
                className="group relative flex h-1/2 w-full items-center justify-between overflow-hidden rounded-[1rem] bg-white border border-black/5 p-5 shadow-sm transition-all hover:border-[#2E5BFF]/30 hover:shadow-md lg:rounded-[1.5rem]"
              >
                <div className="bento-content">
                  <p className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                    Consultation
                  </p>
                  <p className="text-lg font-bold text-zinc-900 transition-colors group-hover:text-[#2E5BFF]">
                    Book a Call
                  </p>
                </div>
                <div className="bento-content flex h-8 w-8 items-center justify-center rounded-full bg-zinc-100 transition-colors group-hover:bg-[#2E5BFF] group-hover:text-white">
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
                    <path d="M5 12h14M12 5l7 7" />
                  </svg>
                </div>
              </a>

              {/* Bottom Half: Social Links */}
              <div className="bento-content flex h-1/2 w-full items-center justify-center gap-3 rounded-[1rem] bg-zinc-100/80 p-4 lg:rounded-[1.5rem] lg:gap-4">
                {["LinkedIn", "Twitter", "Dribbble"].map((social) => (
                  <a
                    key={social}
                    href={`#${social.toLowerCase()}`}
                    className="flex h-12 flex-1 items-center justify-center rounded-xl bg-white text-sm font-semibold text-zinc-600 shadow-sm transition-all hover:bg-zinc-900 hover:text-white"
                  >
                    {social}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
