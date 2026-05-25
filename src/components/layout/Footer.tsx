// src/components/layout/Footer.tsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FaFacebookF } from "react-icons/fa";
import { MdKeyboardArrowRight } from "react-icons/md";
import { RiInstagramLine } from "react-icons/ri";

const footerLinksCol1 = [
  { name: "Services", href: "/services" },
  { name: "Work", href: "#portfolio" },
  { name: "About", href: "#about" },
  { name: "Culture", href: "#" },
  { name: "Meet The Team", href: "#" },
];

const footerLinksCol2 = [
  { name: "Testimonials", href: "#" },
  { name: "Blog & Resources", href: "#" },
  { name: "Webinars", href: "#" },
  { name: "Careers", href: "#" },
];

const socialLinks = [
  { icon: <FaFacebookF size={14} />, href: "#" },
  { icon: <RiInstagramLine size={14} />, href: "#" },
];

export default function Footer() {
  const [mounted, setMounted] = useState(false);
  const [time, setTime] = useState(new Date());

  // Handle live ticking clock & prevent hydration mismatch
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
      {/* Subtle Noise Texture Overlay */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-[url('/noise.png')] opacity-[0.04] mix-blend-overlay" />

      <div className="relative z-10 mx-auto w-full flex flex-col px-6 md:px-10 lg:px-16">
        {/* TOP SECTION: Redesigned based on the image */}
        <div className="grid grid-cols-1 gap-12 border-b border-white/10 pb-16 lg:grid-cols-12 md:pb-20">
          {/* LEFT: Columns 1-3: Links Grid */}
          <div className="grid grid-cols-2 gap-10 lg:col-span-7 lg:gap-0 md:grid-cols-3">
            {/* Link Column 1 */}
            <div className="flex flex-col gap-4">
              {footerLinksCol1.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="group relative w-fit text-[1.1rem] font-medium tracking-tight text-white/90 transition-colors hover:text-white"
                >
                  {link.name}
                  {/* Animated Underline */}
                  <span className="absolute -bottom-1 left-0 h-[0.5px] w-0 bg-white transition-all duration-300 ease-out group-hover:w-full" />
                </Link>
              ))}
            </div>

            {/* Link Column 2 */}
            <div className="flex flex-col gap-4 lg:border-l lg:border-white/10 lg:pl-10">
              {footerLinksCol2.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="group relative w-fit text-[1.1rem] font-medium tracking-tight text-white/90 transition-colors hover:text-white"
                >
                  {link.name}
                  {/* Animated Underline */}
                  <span className="absolute -bottom-1 left-0 h-[0.5px] w-0 bg-white transition-all duration-300 ease-out group-hover:w-full" />
                </Link>
              ))}
            </div>
          </div>

          {/* RIGHT: Column 4: Newsletter & Socials */}
          <div className="flex flex-col items-start lg:col-span-5 lg:pl-12 ">
            <h3 className="mb-6 text-[2rem] font-semibold leading-tight tracking-[-0.04em] text-white">
              Stay updated with Softexedge news
            </h3>

            {/* Email Input */}
            <form className="relative flex w-full max-w-[420px] items-center rounded-xl bg-[#222222] p-1.5 transition-all duration-300 focus-within:ring-1 focus-within:ring-white/20">
              <input
                type="email"
                placeholder="Your Email Address"
                className="w-full bg-transparent px-5 py-3.5 text-base font-medium text-white placeholder:text-white/40 focus:outline-none"
                required
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="group flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-white text-black transition-transform hover:scale-105"
              >
                <div className="relative flex h-6 w-6 items-center justify-center overflow-hidden">
                  {/* Outgoing Arrow */}
                  <MdKeyboardArrowRight className="absolute left-0 top-0 h-full w-full transition-transform duration-300 ease-in-out group-hover:translate-x-[150%]" />

                  {/* Incoming Arrow */}
                  <MdKeyboardArrowRight className="absolute left-0 top-0 h-full w-full -translate-x-[150%] transition-transform duration-300 ease-in-out group-hover:translate-x-0" />
                </div>
              </button>
            </form>

            {/* Social Pills */}
            <div className="mt-8 flex flex-wrap gap-2.5">
              {socialLinks.map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  className="group flex items-center justify-center gap-1.5 rounded-lg bg-white px-3 py-1.5 text-black transition-colors hover:bg-gray-200"
                >
                  {social.icon}
                  <div className="relative flex h-4 w-4 items-center justify-center overflow-hidden">
                    {/* Outgoing Arrow */}
                    <MdKeyboardArrowRight className="absolute left-0 top-0 h-full w-full transition-transform duration-300 ease-in-out group-hover:translate-x-[150%]" />

                    {/* Incoming Arrow */}
                    <MdKeyboardArrowRight className="absolute left-0 top-0 h-full w-full -translate-x-[150%] transition-transform duration-300 ease-in-out group-hover:translate-x-0" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* MIDDLE SECTION: Giant Brand Name */}
        <div className="flex w-full justify-center border-b border-white/10 py-16 md:py-24">
          <h1 className="select-none text-[14vw] font-bold leading-[0.8] tracking-[-0.02em] text-white">
            SOFTEXEDGE
          </h1>
        </div>

        {/* BOTTOM SECTION: Timezones & Legal */}
        <div className="flex flex-col gap-16 pt-12 md:gap-24">
          {/* Timezones Grid */}
          <div className="grid grid-cols-2 justify-items-center gap-x-8 gap-y-12 text-xs font-semibold uppercase tracking-widest md:grid-cols-4">
            {/* Toronto */}
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

            {/* Tokyo */}
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

            {/* London */}
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

            {/* Paris */}
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

          {/* Legal & Social */}
          <div className="flex flex-col items-start justify-between gap-6 text-sm font-medium text-white/40 md:flex-row md:items-end">
            <div className="flex items-center gap-6">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-white"
              >
                © {new Date().getFullYear()} Softexedge Ltd. All rights reserved
              </a>
            </div>

            <p className="tracking-wide">Made by Softexedge</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
