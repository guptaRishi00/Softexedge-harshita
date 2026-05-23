// src/components/layout/Footer.tsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FaFacebookF } from "react-icons/fa";
import { LuArrowUpRight } from "react-icons/lu";

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

const footerLinksCol3 = [
  { name: "Manchester", href: "#" },
  { name: "London", href: "#" },
  { name: "New York", href: "#" },
  { name: "Contact", href: "#contact" },
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
    <footer className="relative w-full bg-[#0e0e0e] text-white overflow-hidden pb-8 pt-16 md:pt-24 lg:pt-32">
      {/* Subtle Noise Texture Overlay */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.04] mix-blend-overlay bg-[url('/noise.png')]" />

      <div className="relative z-10 mx-auto w-full px-6 md:px-10 lg:px-16 flex flex-col">
        {/* TOP SECTION: Redesigned based on the image */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 border-b border-white/10 pb-16 md:pb-20">
          {/* Column 1: Newsletter & Socials */}
          <div className="lg:col-span-5 flex flex-col items-start lg:pr-12">
            <h3 className="text-[2rem] leading-tight font-semibold tracking-[-0.04em] text-white mb-6">
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
                <LuArrowUpRight className="h-6 w-6 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
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
                  <LuArrowUpRight
                    size={12}
                    className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Columns 2-4: Links Grid */}
          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-10 lg:gap-0">
            {/* Link Column 1 */}
            <div className="flex flex-col gap-4 lg:border-l lg:border-white/10 lg:pl-10">
              {footerLinksCol1.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-[1.1rem] font-medium tracking-tight text-white/90 transition-colors hover:text-white"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Link Column 2 */}
            <div className="flex flex-col gap-4 lg:border-l lg:border-white/10 lg:pl-10">
              {footerLinksCol2.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-[1.1rem] font-medium tracking-tight text-white/90 transition-colors hover:text-white"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Link Column 3 */}
            <div className="flex flex-col gap-4 lg:border-l lg:border-white/10 lg:pl-10">
              {footerLinksCol3.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-[1.1rem] font-medium tracking-tight text-white/90 transition-colors hover:text-white"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* MIDDLE SECTION: Giant Brand Name */}
        <div className="w-full flex justify-center py-16 md:py-24 border-b border-white/10">
          <h1 className="text-[14vw] leading-[0.8] tracking-[-0.02em] font-bold text-white select-none">
            SOFTEXEDGE
          </h1>
        </div>

        {/* BOTTOM SECTION: Timezones & Legal */}
        <div className="pt-12 flex flex-col gap-16 md:gap-24">
          {/* Timezones Grid */}
          <div className="grid grid-cols-2 gap-y-12 gap-x-8 md:grid-cols-4 text-xs font-semibold tracking-widest uppercase">
            {/* Toronto */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <span className="block h-1.5 w-1.5 rounded-full bg-white" />
                <span className="text-white">Toronto</span>
              </div>
              <div className="text-white/40 pl-4 tabular-nums">
                {formatTime("America/Toronto")}
              </div>
            </div>

            {/* Tokyo */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <span className="block h-1.5 w-1.5 rounded-full bg-white" />
                <span className="text-white">Tokyo</span>
              </div>
              <div className="text-white/40 pl-4 tabular-nums">
                {formatTime("Asia/Tokyo")}
              </div>
            </div>

            {/* London */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <span className="block h-1.5 w-1.5 rounded-full bg-white" />
                <span className="text-white">London</span>
              </div>
              <div className="text-white/40 pl-4 tabular-nums">
                {formatTime("Europe/London")}
              </div>
            </div>

            {/* Paris */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <span className="block h-1.5 w-1.5 rounded-full bg-white" />
                <span className="text-white">Paris</span>
              </div>
              <div className="text-white/40 pl-4 tabular-nums">
                {formatTime("Europe/Paris")}
              </div>
            </div>
          </div>

          {/* Legal & Social */}
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end text-sm font-medium text-white/40">
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
