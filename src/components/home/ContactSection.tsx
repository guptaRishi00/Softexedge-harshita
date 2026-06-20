"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";
import { memo, useCallback, useEffect, useState } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";

const premiumEase = [0.16, 1, 0.3, 1] as const;

const rotatingWords = ["the future.", "your vision.", "next gen.", "together."];

const channels = [
  {
    label: "Email",
    value: "hello@softexedge.com",
    href: "mailto:hello@softexedge.com",
    Icon: Mail,
  },
  {
    label: "Phone",
    value: "+1 (800) 123-4567",
    href: "tel:+18001234567",
    Icon: Phone,
  },
  {
    label: "Studio",
    value: "San Francisco, CA",
    href: "#location",
    Icon: MapPin,
  },
];

const inputClass =
  "w-full rounded-2xl border border-white/10 bg-zinc-950/50 px-5 py-4 text-base text-white transition-all placeholder:text-zinc-500 hover:bg-zinc-950/80 focus:border-zinc-500 focus:bg-zinc-900 focus:outline-none focus:ring-4 focus:ring-zinc-500/20";

// One proximity-grid cell, memoised so only cells whose intensity actually
// changes re-render (same bg pattern as OurValuesSection).
const Cell = memo(function Cell({
  index,
  intensity,
  onEnter,
}: {
  index: number;
  intensity: number;
  onEnter: (i: number) => void;
}) {
  const colorVal = Math.round(7 * (1 - intensity));
  return (
    // biome-ignore lint/a11y/noStaticElementInteractions: decorative proximity-glow cell
    <div
      onMouseEnter={() => onEnter(index)}
      className="relative aspect-square w-full overflow-hidden rounded-2xl p-[2px] transition-all duration-300 ease-out"
      style={{ backgroundColor: intensity > 0 ? "transparent" : "#080808" }}
    >
      {/* Colored proximity glow */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-[#2E5BFF] via-[#149CCB] to-[#2E5BFF]"
        style={{ opacity: intensity * 0.8 }}
      />
      {/* Inner cell */}
      <div
        className="relative z-10 h-full w-full rounded-2xl transition-colors duration-300"
        style={{
          backgroundColor: `rgb(${colorVal}, ${colorVal}, ${colorVal})`,
        }}
      />
    </div>
  );
});

export default function ContactSection() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  // Background proximity-glow grid (same pattern as OurValuesSection)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const totalItems = 250;
  const columns = 10;
  // Cells near the top lit by default to hint interactivity.
  const initialLitIndices = [13, 27, 32, 48, 54];

  const getIntensity = (gridIndex: number) => {
    const row = Math.floor(gridIndex / columns);
    const col = gridIndex % columns;

    if (hoveredIndex !== null) {
      const hoverRow = Math.floor(hoveredIndex / columns);
      const hoverCol = hoveredIndex % columns;
      const distance = Math.sqrt((row - hoverRow) ** 2 + (col - hoverCol) ** 2);
      return distance > 3.5 ? 0 : 1 - distance / 1.79;
    }

    let maxIntensity = 0;
    for (const litIndex of initialLitIndices) {
      const litRow = Math.floor(litIndex / columns);
      const litCol = litIndex % columns;
      const distance = Math.sqrt((row - litRow) ** 2 + (col - litCol) ** 2);
      if (distance <= 3.5) {
        maxIntensity = Math.max(maxIntensity, 1 - distance / 1.79);
      }
    }
    return maxIntensity;
  };

  const handleCellEnter = useCallback((i: number) => setHoveredIndex(i), []);

  // Fixed-size, never-reordered grid → a positional id is a stable key.
  const cellIds = Array.from({ length: totalItems }, (_, i) => `cell-${i}`);
  const bgCells = cellIds.map((id, gridIndex) => (
    <Cell
      key={id}
      index={gridIndex}
      intensity={getIntensity(gridIndex)}
      onEnter={handleCellEnter}
    />
  ));

  return (
    // biome-ignore lint/a11y/noStaticElementInteractions: section-wide grid mouse-leave reset
    <section
      id="contact"
      onMouseLeave={() => setHoveredIndex(null)}
      className="relative w-full overflow-hidden bg-black py-20 md:py-32"
    >
      {/* Background Proximity Grid Pattern (same as OurValuesSection) */}
      <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center overflow-hidden">
        <div
          className="grid w-[110%] -ml-[5%] gap-3 pointer-events-auto"
          style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
        >
          {bgCells}
        </div>
      </div>

      {/* Slight black overlay to dim the grid background */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-black/45" />

      <div className="relative z-10 mx-auto w-full max-w-[90rem] px-6 md:px-10">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-8">
          {/* LEFT: messaging + contact channels */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: premiumEase }}
            className="flex flex-col lg:col-span-5 lg:pr-12 xl:pr-20"
          >
            <div className="mb-6 inline-flex w-fit items-center rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-white shadow-sm backdrop-blur-md">
              Get in touch
            </div>

            <h2 className="text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl lg:leading-[1.1]">
              Let's build <br />
              <span className="inline-grid overflow-hidden py-1">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={index}
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -30, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="col-start-1 row-start-1 bg-linear-to-r from-[#2E5BFF] to-[#149CCB] bg-clip-text pr-2 leading-[1.3em] text-transparent"
                  >
                    {rotatingWords[index]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </h2>

            <p className="mt-6 text-lg leading-relaxed text-zinc-400 md:text-xl">
              Whether you have a specific project in mind or just want to
              explore possibilities, our team is ready to collaborate.
            </p>

            {/* Bento-style contact cards (Dark Mode) */}
            <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {channels.map(({ label, value, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  className="group flex items-center gap-5 rounded-3xl border border-white/5 bg-zinc-900/40 p-5 transition-all hover:border-white/20 hover:bg-zinc-800/60 hover:shadow-lg hover:shadow-black/50"
                >
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/5 text-zinc-400 shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:bg-white group-hover:text-[#2E5BFF]">
                    <Icon className="h-6 w-6" strokeWidth={1.5} />
                  </span>
                  <span className="flex flex-col gap-0.5">
                    <span className="text-sm font-medium text-zinc-500 transition-colors group-hover:text-zinc-400">
                      {label}
                    </span>
                    <span className="text-lg font-bold text-white transition-colors group-hover:text-white">
                      {value}
                    </span>
                  </span>
                </a>
              ))}
            </div>
          </motion.div>

          {/* RIGHT: contact form */}
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: premiumEase }}
            className="relative flex h-full w-full flex-col justify-between gap-6 rounded-[2.5rem] border border-white/5 bg-zinc-900/30 p-8 shadow-2xl backdrop-blur-xl md:p-12 lg:col-span-7"
          >
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
              <div className="flex flex-col gap-3">
                <label
                  htmlFor="name"
                  className="pl-1 text-sm font-semibold tracking-wide text-zinc-300"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="John Doe"
                  className={inputClass}
                  required
                />
              </div>

              <div className="flex flex-col gap-3">
                <label
                  htmlFor="email"
                  className="pl-1 text-sm font-semibold tracking-wide text-zinc-300"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="john@company.com"
                  className={inputClass}
                  required
                />
              </div>
            </div>

            <div className="flex flex-col gap-3 pt-2">
              <label
                htmlFor="service"
                className="pl-1 text-sm font-semibold tracking-wide text-zinc-300"
              >
                What can we help you with?
              </label>
              <div className="relative">
                <select
                  id="service"
                  defaultValue=""
                  className={`${inputClass} appearance-none pr-12 [&>option]:bg-zinc-900 [&>option]:text-white`}
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

            <div className="flex flex-col gap-3 pt-2">
              <label
                htmlFor="message"
                className="pl-1 text-sm font-semibold tracking-wide text-zinc-300"
              >
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                placeholder="Tell us about your goals, timeline, and budget..."
                className={`${inputClass} resize-none`}
                required
              />
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="group inline-flex w-full cursor-pointer items-center justify-center gap-3 rounded-2xl bg-white px-8 py-5 text-lg font-semibold text-zinc-900 transition-all hover:bg-zinc-200 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] focus:outline-none focus:ring-4 focus:ring-zinc-500 active:scale-[0.98]"
              >
                <span>Send Message</span>
                <div className="relative flex h-5 w-5 items-center justify-center overflow-hidden">
                  <MdKeyboardArrowRight className="absolute left-0 top-0 h-full w-full transition-transform duration-300 ease-in-out group-hover:translate-x-[150%]" />
                  <MdKeyboardArrowRight className="absolute left-0 top-0 h-full w-full -translate-x-[150%] transition-transform duration-300 ease-in-out group-hover:translate-x-0" />
                </div>
              </button>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
