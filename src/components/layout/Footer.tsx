// src/components/layout/Footer.tsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";

const col1Links = [
  { name: "Brand Strategy", href: "/services" },
  { name: "Web Development", href: "/services" },
  { name: "Brand Identity", href: "/services" },
  { name: "eCommerce", href: "/services" },
  { name: "User Experience", href: "/services" },
  { name: "Web and Mobile Application", href: "/services" },
  { name: "Visual Content", href: "/services" },
  { name: "UI Design", href: "/services" },
];

const col2Links = [
  { name: "About Us", href: "#about" },
  { name: "Case Studies", href: "#portfolio" },
  { name: "Book Consultation", href: "#contact" },
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
    <footer className="relative w-full bg-black text-white overflow-hidden pb-8 pt-16 md:pt-24 lg:pt-32">
      {/* Subtle Noise Texture Overlay */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.06] mix-blend-overlay bg-[url('/noise.png')]" />

      <div className="relative z-10 mx-auto w-full px-6 md:px-10 lg:px-16 flex flex-col">
        {/* ROW 1: New Business & Email Input */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-4 md:gap-4 text-base font-medium pb-12 border-b border-white/15">
          <div className="col-span-1 md:col-span-2 pr-8">
            <h3 className="text-white/90 mb-4">Stay Connected</h3>
            <form className="relative flex w-full max-w-md items-center rounded-xl border border-white/20 bg-white/5 p-1 transition-all duration-300 focus-within:border-white/50 focus-within:bg-white/10">
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full bg-transparent px-4 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none"
                required
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="group relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-white text-black transition-all hover:scale-105"
              >
                {/* Gradient Hover Effect */}
                <div className="absolute inset-0 opacity-0 transition-opacity duration-300 bg-gradient-to-r from-[#3445E7] via-[#2F85EA] to-[#07D6F3] group-hover:opacity-100" />
                <ArrowRight className="relative z-10 h-5 w-5 transition-colors group-hover:text-white" />
              </button>
            </form>
          </div>
          <div className="col-span-1">
            <h3 className="text-white/50 md:text-white/90">Email</h3>
          </div>
          <div className="col-span-1">
            <a
              href="mailto:hello@softexedge.com"
              className="text-white/90 transition-colors hover:text-white/50"
            >
              hello@softexedge.com
            </a>
          </div>
        </div>

        {/* ROW 2: Navigation Links */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4 md:gap-4 text-base font-medium py-12 border-b border-white/15">
          <div className="col-span-1">
            <h3 className="text-white/90">Navigation</h3>
          </div>

          <div className="col-span-1 md:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Column 1 Links */}
            <ul className="flex flex-col gap-4">
              {col1Links.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-white/50 transition-colors hover:text-white"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Column 2 Links */}
            <ul className="flex flex-col gap-4">
              {col2Links.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-white/50 transition-colors hover:text-white"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ROW 3: Giant Brand Name */}
        <div className="w-full flex justify-center py-16 md:py-24 border-b border-white/15">
          <h1 className="text-[14vw] leading-[0.8] tracking-[-0.02em] font-bold bg-gradient-to-r from-[#2E5BFF] to-[#149CCB] bg-clip-text text-transparent select-none">
            SOFTEXEDGE
          </h1>
        </div>

        {/* ROW 4: Timezones & Footer Bottom */}
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
                LinkedIn
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-white"
              >
                Instagram
              </a>
            </div>

            <p className="tracking-wide">
              © {new Date().getFullYear()} Copyright. Made by Softexedge
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
