"use client";

import { AnimatePresence, motion } from "framer-motion";
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
      className="relative w-full overflow-hidden bg-[#0a0a0a] py-24 md:py-32"
    >
      {/* Prominent Background Dot Grid */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div
          className="absolute inset-0 opacity-[0.25]"
          style={{
            backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        {/* Soft edge fading so it blends nicely with adjacent sections */}
        <div className="absolute inset-0 bg-linear-to-b from-[#0a0a0a] via-transparent to-[#0a0a0a] opacity-90" />
        <div className="absolute inset-0 bg-linear-to-r from-[#0a0a0a] via-transparent to-[#0a0a0a] opacity-60" />
      </div>

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
            <div className="mb-8 inline-flex items-center text-sm font-bold uppercase tracking-widest bg-linear-to-r from-[#2E5BFF] to-[#149CCB] bg-clip-text text-transparent md:text-base">
              Get in touch
            </div>

            <h2 className="text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-[64px] lg:leading-[1.05]">
              Let's build <br />
              <span className="inline-grid overflow-hidden py-2">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={index}
                    initial={{ y: 40, opacity: 0, rotateX: -90 }}
                    animate={{ y: 0, opacity: 1, rotateX: 0 }}
                    exit={{ y: -40, opacity: 0, rotateX: 90 }}
                    transition={{ duration: 0.5, ease: premiumEase }}
                    className="col-start-1 row-start-1 origin-center bg-linear-to-r from-[#2E5BFF] to-[#149CCB] bg-clip-text pr-2 text-transparent"
                    style={{ transformPerspective: 1000 }}
                  >
                    {rotatingWords[index]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </h2>

            <p className="mt-6 text-lg font-medium leading-relaxed text-zinc-400 md:text-xl">
              Ready to redefine the standard? Whether you have a specific
              project in mind or just want to explore possibilities, our team is
              ready to collaborate.
            </p>

            {/* Clean Static Bento Contact Cards */}
            <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {channels.map(({ label, value, href, Icon, colSpan }) => (
                <div
                  key={label}
                  className={`group relative overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-950 transition-transform duration-300 hover:-translate-y-1 hover:bg-zinc-900 ${colSpan}`}
                >
                  <a
                    href={href}
                    className="flex h-full flex-col justify-between gap-6 p-6 sm:p-8"
                  >
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 text-zinc-400 transition-colors duration-300 group-hover:bg-[#2E5BFF]/20 group-hover:text-[#2E5BFF]">
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
                  </a>
                </div>
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
                      placeholder="John Doe"
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
                      placeholder="john@company.com"
                      className={inputClass}
                      required
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
                    placeholder="Tell us about your goals, timeline, and budget..."
                    className={`${inputClass} resize-none`}
                    required
                  />
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-white px-8 py-5 text-lg font-bold text-black transition-colors hover:bg-zinc-200 focus:outline-none focus:ring-4 focus:ring-white/20"
                  >
                    <span>Send Message</span>
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
