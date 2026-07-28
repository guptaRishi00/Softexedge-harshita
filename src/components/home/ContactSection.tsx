"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { useIsDesktop } from "@/lib/useIsDesktop";
import ChannelCard from "./ChannelCard";

const premiumEase = [0.16, 1, 0.3, 1] as const;

const rotatingWords = ["the future", "your vision", "next gen", "together"];

const channels = [
  {
    label: "Email",
    value: "hello@softexedge.com",
    href: "mailto:hello@softexedge.com",
    Icon: Mail,
    colSpan: "sm:col-span-2",
  },
  {
    label: "Phone",
    value: "+1 (800) 123-4567",
    href: "tel:+18001234567",
    Icon: Phone,
    colSpan: "sm:col-span-1",
  },
  {
    label: "Studio",
    value: "San Francisco",
    href: "#location",
    Icon: MapPin,
    colSpan: "sm:col-span-1",
  },
];

const inputClass =
  "w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-base text-white transition-all placeholder:text-zinc-500  focus:border-[#2E5BFF]/50 focus:bg-white/10 focus:outline-none focus:ring-4 focus:ring-[#2E5BFF]/20";

const GRID_COLUMNS = 8;

export default function ContactSection() {
  const isDesktop = useIsDesktop();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="contact"
      className="relative w-full overflow-hidden bg-black py-16 md:pt-32 md:pb-32"
    >
      <div className="relative z-10 mx-auto w-full px-4 md:px-10">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-12">
          <motion.div
            initial={isDesktop ? { opacity: 0, y: 40 } : false}
            whileInView={isDesktop ? { opacity: 1, y: 0 } : undefined}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: premiumEase }}
            className="flex flex-col lg:col-span-5 lg:pr-8"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, ease: premiumEase }}
              className="mb-6 text-sm uppercase tracking-[0.3em] text-zinc-500 font-medium"
            >
              Get in touch
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.1, ease: premiumEase }}
              className="text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-[64px] lg:leading-[0.9em]"
            >
              Let&apos;s build <br />
              <span className="inline-grid overflow-hidden py-2 px-6 -mx-6 [mask-image:linear-gradient(to_right,transparent_0,black_24px,black_calc(100%-24px),transparent_100%)]">
                {isDesktop ? (
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={index}
                      initial={{ x: "-100%", opacity: 0 }}
                      animate={{ x: "0%", opacity: 1 }}
                      exit={{
                        x: "100%",
                        opacity: 0,
                        transition: { duration: 1.5, ease: "easeInOut" },
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 22,
                        damping: 20,
                        mass: 1,
                      }}
                      className="col-start-1 row-start-1 whitespace-nowrap bg-linear-to-r pb-3 from-[#2E5BFF] to-[#149CCB] bg-clip-text pr-2 text-transparent"
                    >
                      {rotatingWords[index]}
                    </motion.span>
                  </AnimatePresence>
                ) : (
                  <span className="col-start-1 row-start-1 whitespace-nowrap bg-linear-to-r pb-3 from-[#2E5BFF] to-[#149CCB] bg-clip-text pr-2 text-transparent">
                    {rotatingWords[0]}
                  </span>
                )}
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.2, ease: premiumEase }}
              className="mt-6 text-lg font-light leading-[1.25em] text-white"
            >
              Ready to redefine the standard? Whether you have a specific
              project in mind or just want to explore possibilities, our team is
              ready to collaborate
            </motion.p>

            <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {channels.map((channel) => (
                <ChannelCard key={channel.label} {...channel} />
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={isDesktop ? { opacity: 0, y: 40 } : false}
            whileInView={isDesktop ? { opacity: 1, y: 0 } : undefined}
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
                    <input type="tel" id="phone" className={inputClass} />
                  </div>

                  <div className="flex flex-col gap-3">
                    <label
                      htmlFor="company"
                      className="pl-1 text-xs font-bold uppercase tracking-wider text-zinc-400"
                    >
                      Company
                    </label>
                    <input type="text" id="company" className={inputClass} />
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
                    className="group relative cursor-pointer inline-flex w-full overflow-hidden items-center justify-center gap-3 rounded-2xl bg-white px-8 py-5 text-lg font-bold text-black transition-colors focus:outline-none focus:ring-4 focus:ring-white/20 hover:text-white"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-[#2E5BFF] to-[#149CCB] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <span className="relative z-10 transition-colors duration-300">
                      Send Message
                    </span>
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
