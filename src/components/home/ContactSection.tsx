// src/components/home/ContactSection.tsx
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MapPin } from "lucide-react";
import Grainient from "@/components/ui/Grainient";
import { MdKeyboardArrowRight } from "react-icons/md";

const rotatingWords = ["the future.", "your vision.", "next gen.", "together."];

export default function ContactSection() {
  const [index, setIndex] = useState(0);

  // Cycle through the words every 2.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="contact" className="relative w-full py-20 bg-black md:py-32">
      {/* Background Animated Gradient (Dark Theme) */}
      <div className="absolute inset-0 z-0">
        <Grainient
          color1="#000000"
          color2="#0a0a0a"
          color3="#051024" // Subtle deep blue tint
          grainAmount={0.08}
          timeSpeed={0.15}
          className="opacity-100"
        />
        {/* Optional fade mask at the top/bottom if you want it to blend into other black sections */}
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black to-transparent pointer-events-none" />
      </div>

      <div className="relative z-10 mx-auto max-w-[90rem] px-6 md:px-10">
        <div className="flex flex-col items-start gap-16 lg:flex-row lg:gap-24">
          {/* LEFT COLUMN: Header & Contact Info */}
          <div className="flex w-full flex-col justify-between lg:w-2/5">
            <div>
              {/* Tag */}
              <div className="mb-6 inline-flex items-center justify-center rounded-md bg-white/10 border border-white/10 px-3 py-1.5 shadow-sm backdrop-blur-md">
                <span className="text-[11px] font-bold uppercase tracking-widest text-white">
                  Get in touch
                </span>
              </div>

              {/* Heading */}
              <h2 className="text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-[5rem] lg:leading-[1.05]">
                Let's build <br />
                {/* Rotating Gradient Text */}
                <span className="inline-grid overflow-hidden py-1">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={index}
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -30, opacity: 0 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className="col-start-1 row-start-1 leading-[1.3em] bg-linear-to-r from-[#2E5BFF] to-[#149CCB] text-transparent bg-clip-text pr-2"
                    >
                      {rotatingWords[index]}
                    </motion.span>
                  </AnimatePresence>
                </span>
              </h2>

              <p className="mt-6 max-w-md text-lg leading-relaxed text-zinc-400">
                Whether you have a specific project in mind or just want to
                explore possibilities, our team is ready to collaborate.
              </p>
            </div>

            {/* Contact Details */}
            <div className="mt-12 flex flex-col gap-6">
              <div className="group flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-all hover:border-white hover:bg-white hover:text-black">
                  <Mail className="h-5 w-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold uppercase tracking-wider text-zinc-500">
                    Email Us
                  </span>
                  <a
                    href="mailto:hello@softedge.com"
                    className="text-lg font-medium text-white transition-colors hover:text-[#149CCB]"
                  >
                    hello@softedge.com
                  </a>
                </div>
              </div>

              <div className="group flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-all hover:border-white hover:bg-white hover:text-black">
                  <MapPin className="h-5 w-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold uppercase tracking-wider text-zinc-500">
                    Visit Us
                  </span>
                  <p className="text-lg font-medium text-white">
                    San Francisco, CA
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: The Form Card */}
          <div className="w-full lg:w-3/5">
            <form className="flex w-full flex-col gap-6 rounded-[2rem] border border-white/10 bg-[#0a0a0a]/60 backdrop-blur-xl p-8 md:p-12 shadow-2xl">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* Name Input */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="name"
                    className="text-sm font-medium text-zinc-300"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    placeholder="John Doe"
                    className="w-full rounded-xl border border-white/10 bg-black/50 px-5 py-4 text-sm text-white transition-colors placeholder:text-zinc-600 focus:border-white/30 focus:bg-black focus:outline-none focus:ring-1 focus:ring-white/20"
                    required
                  />
                </div>

                {/* Email Input */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-zinc-300"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="john@company.com"
                    className="w-full rounded-xl border border-white/10 bg-black/50 px-5 py-4 text-sm text-white transition-colors placeholder:text-zinc-600 focus:border-white/30 focus:bg-black focus:outline-none focus:ring-1 focus:ring-white/20"
                    required
                  />
                </div>
              </div>

              {/* Service Selection */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="service"
                  className="text-sm font-medium text-zinc-300"
                >
                  What can we help you with?
                </label>
                <select
                  id="service"
                  defaultValue=""
                  className="w-full appearance-none rounded-xl border border-white/10 bg-black/50 px-5 py-4 text-sm text-white transition-colors focus:border-white/30 focus:bg-black focus:outline-none focus:ring-1 focus:ring-white/20"
                >
                  <option value="" disabled className="text-zinc-600">
                    Select a service
                  </option>
                  <option value="design" className="bg-[#111]">
                    Product Design
                  </option>
                  <option value="engineering" className="bg-[#111]">
                    Software Engineering
                  </option>
                  <option value="marketing" className="bg-[#111]">
                    Digital Marketing
                  </option>
                  <option value="other" className="bg-[#111]">
                    Other Inquiry
                  </option>
                </select>
              </div>

              {/* Message Textarea */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="message"
                  className="text-sm font-medium text-zinc-300"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  placeholder="Tell us about your goals, timeline, and budget..."
                  className="w-full resize-none rounded-xl border border-white/10 bg-black/50 px-5 py-4 text-sm text-white transition-colors placeholder:text-zinc-600 focus:border-white/30 focus:bg-black focus:outline-none focus:ring-1 focus:ring-white/20"
                  required
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="group mt-4 inline-flex w-full items-center justify-center gap-4 rounded-xl bg-white px-8 py-5 text-base font-semibold text-black transition-all hover:text-white hover:bg-linear-to-r hover:from-[#2E5BFF] hover:to-[#149CCB] cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black active:scale-[0.98] sm:w-auto"
              >
                <span>Send Message</span>
                <MdKeyboardArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
