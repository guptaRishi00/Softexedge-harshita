"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FaFacebookF } from "react-icons/fa";
import { MdKeyboardArrowRight } from "react-icons/md";
import { RiInstagramLine } from "react-icons/ri";
import { motion, Variants } from "framer-motion"; // <-- 1. Import Variants
import Particles from "@/components/ui/Particles";

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

// 2. Explicitly type as Variants
const brandContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
};

// 3. Explicitly type as Variants and use "as const" for the ease array
const letterVariants: Variants = {
  hidden: { y: "120%", opacity: 0, rotate: 10 },
  visible: {
    y: "0%",
    opacity: 1,
    rotate: 0,
    transition: {
      duration: 1,
      ease: [0.22, 1, 0.36, 1] as const, // <-- 4. Fixes the TS Easing error
    },
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

  const brandName = "SOFTEXEDGE".split("");

  return (
    <footer className="relative w-full overflow-hidden rounded-[20px] bg-black pb-8 pt-16 text-white md:pt-24 lg:pt-32">
      <div className="pointer-events-none absolute inset-0 z-0 bg-[url('/noise.png')] opacity-[0.04] mix-blend-overlay" />

      <div className="relative z-10 mx-auto w-full flex flex-col px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 gap-12 border-b border-white/10 pb-16 lg:grid-cols-12 md:pb-20">
          <div className="grid grid-cols-2 gap-10 lg:col-span-7 lg:gap-0 md:grid-cols-3">
            <div className="flex flex-col gap-4">
              {footerLinksCol1.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="group relative w-fit text-[1.1rem] font-medium tracking-tight text-white/90 transition-colors hover:text-white"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 h-[0.5px] w-0 bg-white transition-all duration-300 ease-out group-hover:w-full" />
                </Link>
              ))}
            </div>

            <div className="flex flex-col gap-4 lg:border-l lg:border-white/10 lg:pl-10">
              {footerLinksCol2.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="group relative w-fit text-[1.1rem] font-medium tracking-tight text-white/90 transition-colors hover:text-white"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 h-[0.5px] w-0 bg-white transition-all duration-300 ease-out group-hover:w-full" />
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-start lg:col-span-5 lg:pl-12 ">
            <h3 className="mb-6 text-[2rem] font-semibold leading-tight tracking-[-0.04em] text-white">
              Stay updated with Softexedge news
            </h3>

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
                  <MdKeyboardArrowRight className="absolute left-0 top-0 h-full w-full transition-transform duration-300 ease-in-out group-hover:translate-x-[150%]" />
                  <MdKeyboardArrowRight className="absolute left-0 top-0 h-full w-full -translate-x-[150%] transition-transform duration-300 ease-in-out group-hover:translate-x-0" />
                </div>
              </button>
            </form>

            <div className="mt-8 flex flex-wrap gap-2.5">
              {socialLinks.map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  className="group flex items-center justify-center gap-1.5 rounded-lg bg-white px-3 py-1.5 text-black transition-colors hover:bg-gray-200"
                >
                  {social.icon}
                  <div className="relative flex h-4 w-4 items-center justify-center overflow-hidden">
                    <MdKeyboardArrowRight className="absolute left-0 top-0 h-full w-full transition-transform duration-300 ease-in-out group-hover:translate-x-[150%]" />
                    <MdKeyboardArrowRight className="absolute left-0 top-0 h-full w-full -translate-x-[150%] transition-transform duration-300 ease-in-out group-hover:translate-x-0" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* MIDDLE SECTION: Giant Brand Name with OGL Background */}
        <div className="relative flex w-full justify-center border-b border-white/10 py-24 md:py-20 overflow-hidden">
          {/* OGL Particles Background layer */}
          <div className="absolute inset-0 z-0">
            <Particles
              particleCount={400}
              particleSpread={15}
              speed={0.15}
              particleColors={["#ffffff", "#2E5BFF", "#149CCB"]}
              moveParticlesOnHover={true}
              particleHoverFactor={2}
              alphaParticles={true}
              particleBaseSize={80}
              sizeRandomness={1.2}
              cameraDistance={25}
              className="opacity-70"
            />
            {/* Fade masks to seamlessly blend the canvas into the black background */}
            <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black to-transparent pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black to-transparent pointer-events-none" />
          </div>

          {/* Foreground Animated Text */}
          <motion.h1
            variants={brandContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            className="relative z-10 flex select-none text-[13vw] font-bold leading-[0.8] tracking-[-0.02em] text-white overflow-hidden drop-shadow-[0_10px_40px_rgba(0,0,0,0.8)] pointer-events-none pr-2 md:pr-4"
          >
            {brandName.map((letter, index) => (
              <motion.span
                key={index}
                variants={letterVariants}
                className="inline-block"
              >
                {letter}
              </motion.span>
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
