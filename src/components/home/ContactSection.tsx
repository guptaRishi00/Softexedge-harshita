"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MapPin } from "lucide-react";
import Grainient from "@/components/ui/Grainient";
import { MdKeyboardArrowRight } from "react-icons/md";

const rotatingWords = ["the future.", "your vision.", "next gen.", "together."];

export default function ContactSection() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="contact" className="relative w-full bg-black py-20 md:py-32">
      <div className="absolute inset-0 z-0">
        <Grainient
          color1="#000000"
          color2="#0a0a0a"
          color3="#051024"
          grainAmount={0.08}
          timeSpeed={0.15}
          className="opacity-100"
        />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-[90rem] px-6 md:px-10">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10">
          <div className="relative flex h-full w-full flex-col justify-between overflow-hidden rounded-[2rem] border border-white/10 p-8 shadow-2xl md:p-12">
            <img
              src="/assets/microsoft-copilot-qUJ8fgoaLTg-unsplash.jpg"
              alt="Background"
              className="absolute inset-0 z-0 h-full w-full object-cover "
            />

            <div className="absolute inset-0 z-0 bg-black/90" />

            <div className="relative z-10">
              <div className="mb-6 inline-flex items-center justify-center rounded-md border border-white/10 bg-white/10 px-3 py-1.5 shadow-sm backdrop-blur-md">
                <span className="text-[11px] font-bold uppercase tracking-widest text-white">
                  Get in touch
                </span>
              </div>

              <h2 className="text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-[4.5rem] lg:leading-[1.05]">
                Let's build <br />
                <span className="inline-grid overflow-hidden py-1">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={index}
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -30, opacity: 0 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className="col-start-1 row-start-1 bg-linear-to-r from-[#2E5BFF] to-[#149CCB] bg-clip-text pr-2 text-transparent leading-[1.3em]"
                    >
                      {rotatingWords[index]}
                    </motion.span>
                  </AnimatePresence>
                </span>
              </h2>

              <p className="mt-6 max-w-sm text-lg leading-relaxed text-zinc-300">
                Whether you have a specific project in mind or just want to
                explore possibilities, our team is ready to collaborate.
              </p>
            </div>

            <div className="relative z-10 mt-12 flex flex-col gap-6">
              <div className="group flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-all hover:border-white hover:bg-white hover:text-black">
                  <Mail className="h-5 w-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold uppercase tracking-wider text-zinc-400">
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
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-all hover:border-white hover:bg-white hover:text-black">
                  <MapPin className="h-5 w-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold uppercase tracking-wider text-zinc-400">
                    Visit Us
                  </span>
                  <p className="text-lg font-medium text-white">
                    San Francisco, CA
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="h-full w-full">
            <form className="flex h-full w-full flex-col justify-between gap-6 rounded-[2rem] border border-white/10 bg-[#0a0a0a]/60 p-8 shadow-2xl backdrop-blur-xl md:p-12">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
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

              <button
                type="submit"
                className="group mt-4 inline-flex w-full cursor-pointer items-center justify-center gap-4 rounded-xl bg-white px-8 py-5 text-base font-semibold text-black transition-all hover:bg-linear-to-r hover:from-[#2E5BFF] hover:to-[#149CCB] hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black active:scale-[0.98] sm:w-auto"
              >
                <span>Send Message</span>

                <div className="relative flex h-5 w-5 items-center justify-center overflow-hidden">
                  <MdKeyboardArrowRight className="absolute left-0 top-0 h-full w-full transition-transform duration-300 ease-in-out group-hover:translate-x-[150%]" />
                  <MdKeyboardArrowRight className="absolute left-0 top-0 h-full w-full -translate-x-[150%] transition-transform duration-300 ease-in-out group-hover:translate-x-0" />
                </div>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
