"use client";

import { motion, type Variants } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { MdArrowOutward } from "react-icons/md";
import { RiInstagramLine } from "react-icons/ri";
import Particles from "@/components/ui/Particles";

// Anything without a page of its own points at that section's anchor on the
// page that owns it. Home anchors use /home rather than /#… because / is a
// redirect to /home and a fragment is not guaranteed to survive the hop.
// Four columns of four. Every href resolves to a real route or to a section
// anchor on the page that owns it.
const footerLinkGroups = [
  [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Culture", href: "/about#culture" },
    { name: "Meet The Team", href: "/about#team" },
  ],
  [
    { name: "Work", href: "/work" },
    { name: "Blog & Resources", href: "/blog" },
    { name: "Testimonials", href: "/home#testimonials" },
    { name: "Careers", href: "/career" },
  ],
  [
    { name: "Web Development", href: "/web-development" },
    { name: "Brand Strategy", href: "/brand-strategy" },
    { name: "UI/UX Design", href: "/ui-ux-design" },
    { name: "App Development", href: "/app-development" },
  ],
  [
    { name: "Services", href: "/home#services" },
    { name: "Processes", href: "/brand-strategy#process" },
    { name: "FAQs", href: "/brand-strategy#faq" },
    { name: "Contact", href: "/contact" },
  ],
];

const socialLinks = [
  { icon: <FaFacebookF size={14} />, href: "#" },
  { icon: <RiInstagramLine size={14} />, href: "#" },
  { icon: <FaLinkedinIn size={14} />, href: "#" },
];

// Pre-keyed letters (avoids array-index keys) for the staggered brand reveal.
const brandLetters = "Softexedge"
  .split("")
  .map((char, i) => ({ char, id: `brand-${char}${i}` }));

const brandContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.045 } },
};

const brandLetter: Variants = {
  hidden: { y: "110%" },
  visible: {
    y: "0%",
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Footer() {
  const [mounted, setMounted] = useState(false);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (timeZone: string) => {
    if (!mounted) return "00:00:00 AM";
    try {
      return new Intl.DateTimeFormat("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZone,
        hour12: true,
      }).format(time);
    } catch (e) {
      return "00:00:00 AM";
    }
  };

  return (
    <footer className="relative w-full overflow-hidden rounded-[20px] bg-black pb-8 pt-16 text-white md:pt-24 lg:pt-32">
      <div className="pointer-events-none absolute inset-0 z-0 bg-[url('/noise.png')] opacity-[0.04] mix-blend-overlay" />

      <div className="relative z-10 mx-auto w-full flex flex-col px-6 md:px-10 lg:px-16">
        {/* items-start so the links block and the newsletter block each size to
            their own content and sit at the top, instead of the grid's default
            stretch making them equal height. */}
        <div className="grid grid-cols-1 items-start gap-12 pb-16 lg:grid-cols-12 md:pb-20">
          <div className="grid grid-cols-2 gap-x-10 gap-y-14 lg:col-span-7 lg:grid-cols-4 lg:gap-x-12">
            {footerLinkGroups.map((group) => (
              <div key={group[0].name} className="flex flex-col gap-8">
                {group.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="group relative w-fit text-[1.1rem] font-medium tracking-tight text-white/90 transition-colors hover:text-white"
                  >
                    {link.name}
                    {/* UPDATED: Follow-through underline animation */}
                    <span className="absolute -bottom-1 left-0 h-[0.5px] w-full origin-right scale-x-0 bg-white transition-transform duration-300 ease-out group-hover:origin-left group-hover:scale-x-100" />
                  </Link>
                ))}
              </div>
            ))}
          </div>

          <div className="flex flex-col items-start lg:col-span-5 lg:pl-12 lg:-mt-1">
            <h3 className="mb-8 text-[2rem] font-semibold leading-tight tracking-[-0.04em] text-white">
              Stay updated with Softexedge news
            </h3>

            <form className="relative flex w-full max-w-[420px] items-center rounded-xl bg-[#222222] p-1.5 transition-all duration-300">
              <input
                type="email"
                placeholder="Your Email Address"
                className="w-full rounded-lg border border-transparent bg-transparent px-5 py-3.5 text-base font-medium text-white transition-all placeholder:text-white/40 focus:border-[#2E5BFF]/50 focus:bg-white/10 focus:outline-none focus:ring-4 focus:ring-[#2E5BFF]/20"
                required
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="group flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-white text-black transition-transform hover:scale-105"
              >
                <div className="relative flex h-6 w-6 items-center justify-center overflow-hidden">
                  {/* Same diagonal-swap arrow as the ExperimentalTestimonials CTA */}
                  <svg width="0" height="0" className="absolute">
                    <title>Subscribe arrow gradient</title>
                    <defs>
                      <linearGradient
                        id="footer-arrow-grad"
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
                    style={{ fill: "url(#footer-arrow-grad)" }}
                  />
                </div>
              </button>
            </form>

            <div className="mt-8 flex flex-wrap gap-3">
              {socialLinks.map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  className="group flex items-center justify-center gap-1.5 rounded-lg bg-white px-3 py-1.5 text-black transition-colors hover:bg-gray-200"
                >
                  {social.icon}
                  <div className="relative flex h-4 w-4 items-center justify-center overflow-hidden">
                    {/* Same diagonal-swap arrow as the ExperimentalTestimonials CTA
                        (reuses the footer-arrow-grad gradient defined above). */}
                    <MdArrowOutward className="absolute z-10 h-full w-full transition-transform duration-300 group-hover:-translate-y-6 group-hover:translate-x-6" />
                    <MdArrowOutward
                      className="absolute z-10 h-full w-full -translate-x-6 translate-y-6 transition-transform duration-300 group-hover:translate-x-0 group-hover:translate-y-0"
                      style={{ fill: "url(#footer-arrow-grad)" }}
                    />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* MIDDLE SECTION: Giant Brand Name */}
        <div className="relative flex w-full justify-center pt-8 pb-16 md:pt-10 md:pb-20 overflow-hidden">
          <motion.h1
            variants={brandContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            aria-label="Softexedge"
            className="relative z-10 flex select-none text-[17vw] font-medium leading-[0.85] tracking-normal text-white drop-shadow-[0_10px_40px_rgba(0,0,0,0.8)] pointer-events-none pr-2 md:pr-4"
          >
            {/* Each letter rises out of its own clip, staggered left→right.
                pb keeps descenders (g) inside the clip — Satoshi's descender
                reaches ~0.2em below the baseline, and leading-[0.85] shrinks
                the line box, so the allowance must be generous; -mb cancels
                the extra height so the tight layout is unchanged. */}
            {brandLetters.map(({ char, id }) => (
              <span
                key={id}
                aria-hidden="true"
                className="inline-block overflow-hidden pb-[0.3em] -mb-[0.3em]"
              >
                <motion.span variants={brandLetter} className="inline-block">
                  {char}
                </motion.span>
              </span>
            ))}
          </motion.h1>
        </div>

        {/* BOTTOM SECTION: Timezones & Legal */}
        <div className="flex flex-col gap-16 pt-12 md:gap-24">
          <div className="grid grid-cols-2 justify-items-center gap-x-8 gap-y-12 text-xs font-semibold uppercase tracking-widest md:grid-cols-4">
            <div className="flex flex-col items-start gap-3">
              <div className="flex items-center gap-2">
                <span className="block h-1.5 w-1.5 rounded-full bg-white" />
                <span className="bg-linear-to-r from-[#2E5BFF] to-[#149CCB] bg-clip-text font-black leading-none text-transparent">
                  Toronto
                </span>
              </div>
              <div className="tabular-nums text-white/40">
                {formatTime("America/Toronto")}
              </div>
            </div>

            <div className="flex flex-col items-start gap-3">
              <div className="flex items-center gap-2">
                <span className="block h-1.5 w-1.5 rounded-full bg-white" />
                <span className="bg-linear-to-r from-[#2E5BFF] to-[#149CCB] bg-clip-text font-black leading-none text-transparent">
                  Tokyo
                </span>
              </div>
              <div className="tabular-nums text-white/40">
                {formatTime("Asia/Tokyo")}
              </div>
            </div>

            <div className="flex flex-col items-start gap-3">
              <div className="flex items-center gap-2">
                <span className="block h-1.5 w-1.5 rounded-full bg-white" />
                <span className="bg-linear-to-r from-[#2E5BFF] to-[#149CCB] bg-clip-text font-black leading-none text-transparent">
                  London
                </span>
              </div>
              <div className="tabular-nums text-white/40">
                {formatTime("Europe/London")}
              </div>
            </div>

            <div className="flex flex-col items-start gap-3">
              <div className="flex items-center gap-2">
                <span className="block h-1.5 w-1.5 rounded-full bg-white" />
                <span className="bg-linear-to-r from-[#2E5BFF] to-[#149CCB] bg-clip-text font-black leading-none text-transparent">
                  Paris
                </span>
              </div>
              <div className="tabular-nums text-white/40">
                {formatTime("Europe/Paris")}
              </div>
            </div>
          </div>

          <div className="flex flex-col items-start justify-between gap-4 text-sm font-medium text-white/40 md:flex-row md:items-end">
            <p className="tracking-wide">© Made By Softexedge</p>

            <div className="flex flex-wrap items-center gap-6">
              <p className="tracking-wide">All Rights Reserved</p>
              <a href="#" className="transition-colors hover:text-white">
                Privacy Policy (we know, thrilling stuff)
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
