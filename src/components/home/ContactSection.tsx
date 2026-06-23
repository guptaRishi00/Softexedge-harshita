"use client";

import { AnimatePresence, motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { Mail, MapPin, Phone, ArrowRight, Sparkles } from "lucide-react";
import { useEffect, useState, MouseEvent } from "react";

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

// --- Premium Spotlight Card Component ---
function SpotlightCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className={`group relative overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-950 ${className}`}
      onMouseMove={handleMouseMove}
    >
      {/* Dynamic Hover Spotlight */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[2rem] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              600px circle at ${mouseX}px ${mouseY}px,
              rgba(46, 91, 255, 0.15),
              transparent 80%
            )
          `,
        }}
      />
      {/* Border Glow Spotlight */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[2rem] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              300px circle at ${mouseX}px ${mouseY}px,
              rgba(20, 156, 203, 0.4),
              transparent 80%
            )
          `,
          WebkitMaskImage: "linear-gradient(black, black) content-box, linear-gradient(black, black)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          padding: "1px",
        }}
      />
      <div className="relative z-10 h-full w-full">{children}</div>
    </div>
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
    <section id="contact" className="relative w-full overflow-hidden bg-black py-24 md:py-32">
      {/* Background Orbs */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          className="absolute -left-[10%] -top-[10%] h-[600px] w-[600px] rounded-full bg-[#2E5BFF] opacity-30 blur-[150px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 2 }}
          className="absolute -bottom-[20%] -right-[10%] h-[700px] w-[700px] rounded-full bg-[#149CCB] opacity-20 blur-[150px]"
        />
        
        {/* Subtle dot pattern */}
        <div 
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
            backgroundSize: "32px 32px"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[85rem] px-6 md:px-10">
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
              Ready to redefine the standard? Whether you have a specific project in mind or just want to explore possibilities, our team is ready to collaborate.
            </p>

            {/* Bento-style contact cards with Spotlight */}
            <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {channels.map(({ label, value, href, Icon, colSpan }, i) => (
                <SpotlightCard key={label} className={colSpan}>
                  <a href={href} className="flex h-full flex-col justify-between gap-6 p-6 sm:p-8">
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
                </SpotlightCard>
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
            <div className="h-full overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-950">
              <form className="flex h-full flex-col justify-between gap-8 p-8 sm:p-10 md:p-12">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
                  <div className="flex flex-col gap-3">
                    <label htmlFor="name" className="pl-1 text-xs font-bold uppercase tracking-wider text-zinc-400">
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
                    <label htmlFor="email" className="pl-1 text-xs font-bold uppercase tracking-wider text-zinc-400">
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
                  <label htmlFor="service" className="pl-1 text-xs font-bold uppercase tracking-wider text-zinc-400">
                    What can we help you with?
                  </label>
                  <div className="relative">
                    <select
                      id="service"
                      defaultValue=""
                      className={`${inputClass} appearance-none pr-12 [&>option]:bg-zinc-900 [&>option]:text-white cursor-pointer`}
                    >
                      <option value="" disabled className="text-zinc-500">Select a service</option>
                      <option value="design">Product Design</option>
                      <option value="engineering">Software Engineering</option>
                      <option value="marketing">Digital Marketing</option>
                      <option value="other">Other Inquiry</option>
                    </select>
                    <div className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-zinc-500">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <label htmlFor="message" className="pl-1 text-xs font-bold uppercase tracking-wider text-zinc-400">
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
                    className="inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-white px-8 py-5 text-lg font-bold text-black transition-colors hover:bg-zinc-200 focus:outline-none"
                  >
                    <span>Send Message</span>
                  </button>
                </div>
              </form>
            </div >
          </motion.div>
        </div>
      </div>
    </section>
  );
}
