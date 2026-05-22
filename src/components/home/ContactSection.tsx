"use client";

import { ArrowRight, Mail, MapPin } from "lucide-react";
import Grainient from "@/components/ui/Grainient";

export default function ContactSection() {
  return (
    <section id="contact" className="relative w-full py-20 md:py-32">
      {/* Background Animated Gradient */}
      <div className="absolute inset-0 z-0">
        <Grainient
          color1="#ffffff"
          color2="#f8f9fa"
          color3="#e0e7ff"
          grainAmount={0.06}
          timeSpeed={0.15}
          className="opacity-80"
        />
        {/* Optional fade mask at the top/bottom if you want it to blend into other white sections */}
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#f8f9fa] to-transparent pointer-events-none" />
      </div>

      <div className="relative z-10 mx-auto max-w-[90rem] px-6 md:px-10">
        <div className="flex flex-col items-start gap-16 lg:flex-row lg:gap-24">
          {/* LEFT COLUMN: Header & Contact Info (Sticky removed) */}
          <div className="flex w-full flex-col justify-between lg:w-2/5">
            <div>
              {/* Tag */}
              <div className="mb-6 inline-flex items-center justify-center rounded-md bg-black px-3 py-1.5 shadow-sm">
                <span className="text-[11px] font-bold uppercase tracking-widest text-white">
                  Get in touch
                </span>
              </div>

              {/* Heading */}
              <h2 className="text-4xl font-bold tracking-tight text-zinc-900 md:text-5xl lg:text-[4rem] lg:leading-[1.05]">
                Let's build <br />
                <span className="text-[#3445E7]">the future.</span>
              </h2>

              <p className="mt-6 max-w-md text-lg leading-relaxed text-zinc-600">
                Whether you have a specific project in mind or just want to
                explore possibilities, our team is ready to collaborate.
              </p>
            </div>

            {/* Contact Details */}
            <div className="mt-12 flex flex-col gap-6">
              <div className="group flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-900 transition-colors hover:border-black hover:bg-black hover:text-white">
                  <Mail className="h-5 w-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold uppercase tracking-wider text-zinc-500">
                    Email Us
                  </span>
                  <a
                    href="mailto:hello@softedge.com"
                    className="text-lg font-medium text-zinc-900 transition-colors hover:text-[#3445E7]"
                  >
                    hello@softedge.com
                  </a>
                </div>
              </div>

              <div className="group flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-900 transition-colors hover:border-black hover:bg-black hover:text-white">
                  <MapPin className="h-5 w-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold uppercase tracking-wider text-zinc-500">
                    Visit Us
                  </span>
                  <p className="text-lg font-medium text-zinc-900">
                    San Francisco, CA
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: The Form Card */}
          <div className="w-full lg:w-3/5">
            <form className="flex w-full flex-col gap-6 rounded-[2rem] border border-zinc-200 bg-white/90 p-8 shadow-xl shadow-black/5 backdrop-blur-sm md:p-12">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* Name Input */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="name"
                    className="text-sm font-medium text-zinc-900"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    placeholder="John Doe"
                    className="w-full rounded-xl border border-zinc-200 bg-zinc-50/50 px-5 py-4 text-sm text-zinc-900 transition-colors placeholder:text-zinc-400 focus:border-zinc-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-zinc-900"
                    required
                  />
                </div>

                {/* Email Input */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-zinc-900"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="john@company.com"
                    className="w-full rounded-xl border border-zinc-200 bg-zinc-50/50 px-5 py-4 text-sm text-zinc-900 transition-colors placeholder:text-zinc-400 focus:border-zinc-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-zinc-900"
                    required
                  />
                </div>
              </div>

              {/* Service Selection */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="service"
                  className="text-sm font-medium text-zinc-900"
                >
                  What can we help you with?
                </label>
                <select
                  id="service"
                  defaultValue=""
                  className="w-full appearance-none rounded-xl border border-zinc-200 bg-zinc-50/50 px-5 py-4 text-sm text-zinc-900 transition-colors focus:border-zinc-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-zinc-900"
                >
                  <option value="" disabled className="text-zinc-400">
                    Select a service
                  </option>
                  <option value="design">Product Design</option>
                  <option value="engineering">Software Engineering</option>
                  <option value="marketing">Digital Marketing</option>
                  <option value="other">Other Inquiry</option>
                </select>
              </div>

              {/* Message Textarea */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="message"
                  className="text-sm font-medium text-zinc-900"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  placeholder="Tell us about your goals, timeline, and budget..."
                  className="w-full resize-none rounded-xl border border-zinc-200 bg-zinc-50/50 px-5 py-4 text-sm text-zinc-900 transition-colors placeholder:text-zinc-400 focus:border-zinc-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-zinc-900"
                  required
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="group mt-4 inline-flex w-full items-center justify-center gap-4 rounded-xl bg-black px-8 py-5 text-base font-semibold text-white transition-all hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:ring-offset-2 active:scale-[0.98] sm:w-auto"
              >
                <span>Send Message</span>
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
