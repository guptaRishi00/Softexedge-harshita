"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const links = [
  { name: "Services", href: "#services" },
  { name: "Work", href: "#portfolio" },
  { name: "About", href: "#about" },
  { name: "Culture", href: "#" },
  { name: "Meet The Risers", href: "#" },
  { name: "Contact", href: "#contact" },
  { name: "Blog & Resources", href: "#" },
  { name: "Careers", href: "#" },
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
        {/* ROW 1: New Business & Email */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-4 md:gap-4 text-base font-medium pb-12 border-b border-white/15">
          <div className="col-span-1">
            <h3 className="text-white/90">New Business Inquiries</h3>
          </div>
          <div className="hidden md:block col-span-1" />
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

          <div className="col-span-1 md:col-span-3">
            <ul className="grid grid-cols-2 gap-y-4 gap-x-8 md:grid-cols-3">
              {links.map((link, index) => (
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
          <h1 className="text-[16vw] leading-[0.75] tracking-[-0.07em] font-bold text-white select-none">
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
            <Link href="#" className="transition-colors hover:text-white">
              LinkedIn
            </Link>

            <p className="tracking-wide">© 2023 - 2026 Design By Softexedge</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
