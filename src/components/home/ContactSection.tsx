"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";

const premiumEase = [0.16, 1, 0.3, 1] as const;

const rotatingWords = ["the future.", "your vision.", "next gen.", "together."];

const channels = [
  {
    label: "Email Us",
    value: "hello@softexedge.com",
    href: "mailto:hello@softexedge.com",
    Icon: Mail,
  },
  {
    label: "Call Us",
    value: "+1 (800) 123-4567",
    href: "tel:+18001234567",
    Icon: Phone,
  },
  {
    label: "Visit Us",
    value: "San Francisco, CA",
    href: "#location",
    Icon: MapPin,
  },
];

const inputClass =
  "w-full rounded-xl border border-zinc-200 bg-zinc-50 px-5 py-4 text-sm text-zinc-900 transition-colors placeholder:text-zinc-400 focus:border-zinc-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-zinc-300";

export default function ContactSection() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="contact" className="relative w-full bg-white py-20 md:py-32">
      <div className="mx-auto max-w-[90rem] px-6 md:px-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          {/* LEFT: messaging + contact channels */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: premiumEase }}
            className="flex flex-col"
          >
            <span className="mb-6 inline-flex w-fit bg-linear-to-r from-[#2E5BFF] to-[#149CCB] bg-clip-text text-sm font-semibold uppercase tracking-[0.25em] text-transparent">
              Get in touch
            </span>

            <h2 className="text-4xl font-bold tracking-tight text-zinc-900 md:text-5xl lg:text-[4.5rem] lg:leading-[1.05]">
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

            <p className="mt-6 max-w-md text-lg leading-relaxed text-zinc-500">
              Whether you have a specific project in mind or just want to
              explore possibilities, our team is ready to collaborate.
            </p>

            <div className="mt-12 flex flex-col gap-5 border-t border-zinc-200 pt-10">
              {channels.map(({ label, value, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  className="group flex items-center gap-4"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-zinc-200 text-zinc-900 transition-colors group-hover:bg-zinc-900 group-hover:text-white">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="flex flex-col">
                    <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                      {label}
                    </span>
                    <span className="text-lg font-medium text-zinc-900 transition-colors group-hover:text-[#2E5BFF]">
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
            className="flex h-full w-full flex-col justify-between gap-6 rounded-[2rem] border border-zinc-200 bg-white p-8 shadow-sm md:p-10"
          >
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-zinc-700"
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

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-zinc-700"
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

            <div className="flex flex-col gap-2">
              <label
                htmlFor="service"
                className="text-sm font-medium text-zinc-700"
              >
                What can we help you with?
              </label>
              <select id="service" defaultValue="" className={inputClass}>
                <option value="" disabled>
                  Select a service
                </option>
                <option value="design">Product Design</option>
                <option value="engineering">Software Engineering</option>
                <option value="marketing">Digital Marketing</option>
                <option value="other">Other Inquiry</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="message"
                className="text-sm font-medium text-zinc-700"
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

            <button
              type="submit"
              className="group mt-2 inline-flex w-full cursor-pointer items-center justify-center gap-3 rounded-xl bg-zinc-900 px-8 py-5 text-base font-semibold text-white transition-colors hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-300 focus:ring-offset-2"
            >
              <span>Send Message</span>
              <div className="relative flex h-5 w-5 items-center justify-center overflow-hidden">
                <MdKeyboardArrowRight className="absolute left-0 top-0 h-full w-full transition-transform duration-300 ease-in-out group-hover:translate-x-[150%]" />
                <MdKeyboardArrowRight className="absolute left-0 top-0 h-full w-full -translate-x-[150%] transition-transform duration-300 ease-in-out group-hover:translate-x-0" />
              </div>
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
