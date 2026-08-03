"use client";

import { motion, type Variants } from "framer-motion";
import Link from "next/link";
import { useSyncExternalStore } from "react";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { MdArrowOutward } from "react-icons/md";
import { RiInstagramLine } from "react-icons/ri";

const footerLinkGroups = [
  {
    title: "Services",
    links: [
      { name: "Digital Marketing & Growth", href: "/digital-marketing" },
      { name: "AI & Marketing Automation", href: "/ai-marketing-automation" },
      { name: "Web Development", href: "/web-development" },
      { name: "App Development", href: "/app-development" },
      { name: "Custom Software & SaaS", href: "/custom-software" },
      { name: "Brand Strategy & Identity", href: "/brand-strategy" },
      { name: "UI/UX Design", href: "/ui-ux-design" },
      { name: "Video Production", href: "/video-production" },
    ],
  },
  {
    title: "Explore",
    links: [
      { name: "Our Services", href: "/home#services" },
      { name: "Portfolio", href: "/home#portfolio" },
      { name: "Testimonials", href: "/home#testimonials" },
      { name: "Culture", href: "/about#culture" },
      { name: "Meet The Team", href: "/about#team" },
      { name: "Our Process", href: "/brand-strategy#process" },
      { name: "FAQs", href: "/brand-strategy#faq" },
    ],
  },
  {
    title: "Pages",
    links: [
      { name: "Home", href: "/" },
      { name: "About", href: "/about" },
      { name: "Work", href: "/work" },
      { name: "Blog", href: "/blog" },
      { name: "Careers", href: "/career" },
      { name: "Contact", href: "/contact" },
    ],
  },
];

const socialLinks = [
  { icon: <FaFacebookF size={14} />, href: "#" },
  { icon: <RiInstagramLine size={14} />, href: "#" },
  { icon: <FaLinkedinIn size={14} />, href: "#" },
];

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

const premiumEase = [0.16, 1, 0.3, 1] as const;

const timeFormatters: Record<string, Intl.DateTimeFormat> = {
  "America/Toronto": new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: "America/Toronto",
    hour12: true,
  }),
  "Asia/Tokyo": new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: "Asia/Tokyo",
    hour12: true,
  }),
  "Europe/London": new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: "Europe/London",
    hour12: true,
  }),
  "Europe/Paris": new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: "Europe/Paris",
    hour12: true,
  }),
};

// One interval shared by every clock rather than one each: independent timers
// drift, so two clocks could straddle a second boundary and show different
// times. Subscribers get the same snapshot, and only these leaves re-render.
let sharedNow: Date | null = null;
let sharedTimer: ReturnType<typeof setInterval> | null = null;
const tickListeners = new Set<() => void>();

const subscribeToTick = (onTick: () => void) => {
  tickListeners.add(onTick);
  if (!sharedTimer) {
    sharedNow = new Date();
    sharedTimer = setInterval(() => {
      sharedNow = new Date();
      for (const listener of tickListeners) listener();
    }, 1000);
  }
  return () => {
    tickListeners.delete(onTick);
    if (tickListeners.size === 0 && sharedTimer) {
      clearInterval(sharedTimer);
      sharedTimer = null;
    }
  };
};

const getTick = () => sharedNow;
const getServerTick = () => null;

function LocalTime({ timeZone }: { timeZone: string }) {
  const time = useSyncExternalStore(subscribeToTick, getTick, getServerTick);

  if (!time) return "00:00:00 AM";
  try {
    return timeFormatters[timeZone].format(time);
  } catch {
    return "00:00:00 AM";
  }
}

export default function Footer() {
  return (
    <footer className="relative w-full overflow-hidden rounded-[20px] bg-black pb-8 pt-8 text-white md:pt-24 lg:pt-32">
      <div className="pointer-events-none absolute inset-0 z-0 bg-[url('/noise.png')] opacity-[0.04] mix-blend-overlay" />

      <div className="relative z-10 mx-auto w-full flex flex-col px-6 max-md:gap-12 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 items-start gap-12 pb-16 max-md:contents lg:grid-cols-12 md:pb-20">
          <div className="grid grid-cols-2 gap-x-10 gap-y-12 max-md:order-3 lg:col-span-7 lg:flex lg:gap-28">
            {footerLinkGroups.map(({ title, links }, groupIndex) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.6,
                  ease: premiumEase,
                  delay: groupIndex * 0.05,
                }}
                className="flex flex-col gap-2.5"
              >
                <p className="mb-2 text-sm font-medium uppercase tracking-[0.3em] text-zinc-500">
                  {title}
                </p>
                {links.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="group relative w-fit text-[0.95rem] font-medium tracking-tight text-white/90 transition-colors hover:text-white"
                  >
                    {link.name}
                    <span className="absolute -bottom-1 left-0 h-[0.5px] w-full origin-right scale-x-0 bg-white transition-transform duration-300 ease-out group-hover:origin-left group-hover:scale-x-100" />
                  </Link>
                ))}
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: premiumEase, delay: 0.15 }}
            className="flex flex-col items-start max-md:order-1 lg:col-span-5 lg:pl-12 lg:-mt-1"
          >
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
                    <MdArrowOutward className="absolute z-10 h-full w-full transition-transform duration-300 group-hover:-translate-y-6 group-hover:translate-x-6" />
                    <MdArrowOutward
                      className="absolute z-10 h-full w-full -translate-x-6 translate-y-6 transition-transform duration-300 group-hover:translate-x-0 group-hover:translate-y-0"
                      style={{ fill: "url(#footer-arrow-grad)" }}
                    />
                  </div>
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="relative flex w-full justify-center pt-8 pb-16 max-md:hidden md:pt-10 md:pb-20 overflow-hidden">
          <motion.h1
            variants={brandContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            aria-label="Softexedge"
            className="relative z-10 flex select-none text-[18vw] font-medium leading-[0.85] text-white drop-shadow-[0_10px_40px_rgba(0,0,0,0.8)] pointer-events-none pr-2 md:pr-4"
          >
            {brandLetters.map(({ char, id }) => (
              <span
                key={id}
                aria-hidden="true"
                // Letter-tightening lives in the MARGINS, never in letter-spacing:
                // spacing applies inside this overflow-hidden box, shrinking it
                // below the glyph's ink and shearing the right of x/f/t. Instead
                // px gives the ink room, -ml cancels it so the S stays flush
                // left, and -mr does the tightening (net advance − 0.04em).
                className="inline-block overflow-hidden px-[0.06em] ml-[-0.06em] mr-[-0.1em] pb-[0.3em] -mb-[0.3em]"
              >
                <motion.span variants={brandLetter} className="inline-block">
                  {char}
                </motion.span>
              </span>
            ))}
          </motion.h1>
        </div>

        <div className="flex flex-col gap-16 pt-12 max-md:contents md:gap-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: premiumEase }}
            className="grid grid-cols-2 justify-items-center gap-x-8 gap-y-12 text-xs font-semibold uppercase tracking-widest max-md:order-2 md:grid-cols-4"
          >
            <div className="flex flex-col items-start gap-3">
              <div className="flex items-center gap-2">
                <span className="block h-1.5 w-1.5 rounded-full bg-white" />
                <span className="bg-linear-to-r from-[#2E5BFF] to-[#149CCB] bg-clip-text font-black leading-none text-transparent">
                  Toronto
                </span>
              </div>
              <div className="tabular-nums text-white/40">
                <LocalTime timeZone="America/Toronto" />
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
                <LocalTime timeZone="Asia/Tokyo" />
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
                <LocalTime timeZone="Europe/London" />
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
                <LocalTime timeZone="Europe/Paris" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: premiumEase, delay: 0.05 }}
            className="flex flex-col items-start justify-between gap-4 text-sm font-medium text-white/40 max-md:order-4 max-md:pb-4 md:flex-row md:items-end"
          >
            <p className="tracking-wide">© Made By Softexedge</p>

            <div className="flex flex-wrap items-center gap-6">
              <p className="tracking-wide">All Rights Reserved</p>
              <a href="#" className="transition-colors hover:text-white">
                Privacy Policy ( peek responsibly )
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
