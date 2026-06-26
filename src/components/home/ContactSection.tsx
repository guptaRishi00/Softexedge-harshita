"use client";

import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
} from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";
import { useEffect, useState } from "react";

const premiumEase = [0.16, 1, 0.3, 1] as const;

const rotatingWords = ["the future.", "your vision.", "next gen.", "together."];

const channels = [
  {
    label: "Email",
    value: "hello@softexedge.com",
    href: "mailto:hello@softexedge.com",
    Icon: Mail,
    colSpan: "sm:col-span-2", // Full width
  },
  {
    label: "Phone",
    value: "+1 (800) 123-4567",
    href: "tel:+18001234567",
    Icon: Phone,
    colSpan: "sm:col-span-1", // Half width
  },
  {
    label: "Studio",
    value: "San Francisco",
    href: "#location",
    Icon: MapPin,
    colSpan: "sm:col-span-1", // Half width
  },
];

const inputClass =
  "w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-base text-white transition-all placeholder:text-zinc-500 hover:bg-white/10 focus:border-[#2E5BFF]/50 focus:bg-white/10 focus:outline-none focus:ring-4 focus:ring-[#2E5BFF]/20";

const GRID_COLUMNS = 8;
const boxyCellIds = Array.from({ length: 80 }, (_, i) => `box-${i}`);

// Contact channel card with the same interactive proximity-glow grid as
// CtaSection: a cursor-following mask reveals the dark cell grid, and cells near
// the pointer glow with the brand gradient.
function ChannelCard({
  label,
  value,
  href,
  Icon,
  colSpan,
}: (typeof channels)[number]) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);

  // For half-width cards (sm:col-span-1), use 3 columns to make the squares medium-large.
  // For full-width cards (sm:col-span-2), use 6 columns.
  const gridColumns = colSpan.includes("sm:col-span-1") ? 3 : 6;

  const getIntensity = (i: number) => {
    if (hoveredIndex === null) return 0;
    const row = Math.floor(i / gridColumns);
    const col = i % gridColumns;
    const hoverRow = Math.floor(hoveredIndex / gridColumns);
    const hoverCol = hoveredIndex % gridColumns;
    const distance = Math.sqrt((row - hoverRow) ** 2 + (col - hoverCol) ** 2);
    return distance > 3.5 ? 0 : 1 - distance / 1.79;
  };

  const mask = useMotionTemplate`radial-gradient(280px circle at ${mouseX}px ${mouseY}px, black 0%, rgba(0,0,0,0.15) 100%)`;

  return (
    <a
      href={href}
      onMouseMove={(e) => {
        const { left, top } = e.currentTarget.getBoundingClientRect();
        mouseX.set(e.clientX - left);
        mouseY.set(e.clientY - top);
      }}
      onMouseLeave={() => setHoveredIndex(null)}
      className={`group relative overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-950/20 transition-transform duration-300 block ${colSpan}`}
    >
      {/* Interactive proximity grid */}
      <motion.div
        className="absolute inset-0 z-0 overflow-hidden"
        style={{ WebkitMaskImage: mask, maskImage: mask }}
      >
        <div
          className="grid gap-2 relative w-[110%] -left-[5%] -translate-y-6"
          style={{
            gridTemplateColumns: `repeat(${gridColumns}, minmax(0, 1fr))`,
          }}
        >
          {boxyCellIds.map((id, i) => {
            const intensity = getIntensity(i);
            const colorVal = Math.round(22 * (1 - intensity));
            return (
              // biome-ignore lint/a11y/noStaticElementInteractions: decorative proximity-glow cell
              <div
                key={id}
                onMouseEnter={() => setHoveredIndex(i)}
                className="relative aspect-square w-full overflow-hidden rounded-md p-[0.8px]"
                style={{
                  backgroundColor: intensity > 0 ? "transparent" : "#161616",
                }}
              >
                <div
                  className="relative z-10 h-full w-full rounded-md"
                  style={{
                    backgroundColor: `rgb(${colorVal}, ${colorVal}, ${colorVal})`,
                  }}
                />
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Removed black overlay for maximum pattern visibility */}

      <div className="pointer-events-none relative z-10 flex h-full flex-col justify-between gap-6 p-6 sm:p-8">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-900 text-zinc-400 transition-colors duration-300 group-hover:bg-[#2E5BFF] group-hover:text-white">
          <Icon className="h-5 w-5" strokeWidth={2} />
        </span>
        <span className="flex flex-col gap-1">
          <span className="text-sm font-semibold tracking-wide text-zinc-500 uppercase">
            {label}
          </span>
          <span className="text-lg font-bold text-white sm:text-xl">
            {value}
          </span>
        </span>
      </div>
    </a>
  );
}

export default function ContactSection() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="contact"
      className="relative w-full overflow-hidden bg-black py-24 md:py-32"
    >
      <div className="relative z-10 mx-auto w-full px-6 md:px-10">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-12">
          {/* LEFT: messaging + contact channels */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: premiumEase }}
            className="flex flex-col lg:col-span-5 lg:pr-8"
          >
            <div className="mb-8 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-white/60">
              Get in touch
            </div>

            <h2 className="text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-[64px] lg:leading-[0.9em]">
              Let's build <br />
              <span className="inline-grid overflow-hidden py-2">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={index}
                    initial={{ x: 40, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -40, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="col-start-1 row-start-1 whitespace-nowrap bg-linear-to-r pb-3 from-[#2E5BFF] to-[#149CCB] bg-clip-text pr-2 text-transparent"
                  >
                    {rotatingWords[index]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </h2>

            <p className="mt-6 text-lg font-medium leading-[1.2em] text-zinc-400">
              Ready to redefine the standard? Whether you have a specific
              project in mind or just want to explore possibilities, our team is
              ready to collaborate.
            </p>

            {/* Clean Static Bento Contact Cards */}
            <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {channels.map((channel) => (
                <ChannelCard key={channel.label} {...channel} />
              ))}
            </div>
          </motion.div>

          {/* RIGHT: contact form */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: premiumEase }}
            className="lg:col-span-7"
          >
            <div className="h-full overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-950 transition-transform duration-300 hover:border-white/20">
              <form className="flex h-full flex-col justify-between gap-8 p-8 sm:p-10 md:p-12">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
                  <div className="flex flex-col gap-3">
                    <label
                      htmlFor="name"
                      className="pl-1 text-xs font-bold uppercase tracking-wider text-zinc-400"
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className={inputClass}
                      required
                    />
                  </div>

                  <div className="flex flex-col gap-3">
                    <label
                      htmlFor="email"
                      className="pl-1 text-xs font-bold uppercase tracking-wider text-zinc-400"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      className={inputClass}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
                  <div className="flex flex-col gap-3">
                    <label
                      htmlFor="phone"
                      className="pl-1 text-xs font-bold uppercase tracking-wider text-zinc-400"
                    >
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      className={inputClass}
                    />
                  </div>

                  <div className="flex flex-col gap-3">
                    <label
                      htmlFor="company"
                      className="pl-1 text-xs font-bold uppercase tracking-wider text-zinc-400"
                    >
                      Company
                    </label>
                    <input
                      type="text"
                      id="company"
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <label
                    htmlFor="service"
                    className="pl-1 text-xs font-bold uppercase tracking-wider text-zinc-400"
                  >
                    What can we help you with?
                  </label>
                  <div className="relative">
                    <select
                      id="service"
                      defaultValue=""
                      className={`${inputClass} appearance-none pr-12 [&>option]:bg-zinc-900 [&>option]:text-white cursor-pointer`}
                    >
                      <option value="" disabled className="text-zinc-500">
                        Select a service
                      </option>
                      <option value="design">Product Design</option>
                      <option value="engineering">Software Engineering</option>
                      <option value="marketing">Digital Marketing</option>
                      <option value="other">Other Inquiry</option>
                    </select>
                    <div className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-zinc-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <title>Select dropdown chevron</title>
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <label
                    htmlFor="message"
                    className="pl-1 text-xs font-bold uppercase tracking-wider text-zinc-400"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className={`${inputClass} resize-none`}
                    required
                  />
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="group relative inline-flex w-full overflow-hidden items-center justify-center gap-3 rounded-2xl bg-white px-8 py-5 text-lg font-bold text-black transition-colors focus:outline-none focus:ring-4 focus:ring-white/20 hover:text-white"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-[#2E5BFF] to-[#149CCB] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <span className="relative z-10 transition-colors duration-300">Send Message</span>
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
