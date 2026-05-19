"use client";

import { motion } from "framer-motion";
import DynamicButton from "../ui/DynamicButton";
import { ArrowUpRight } from "lucide-react";

const stats = [
  {
    value: "120+",
    label: "Projects Delivered",
  },
  {
    value: "40+",
    label: "Global Clients",
  },
  {
    value: "6Y",
    label: "Creative Experience",
  },
];

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-black px-6 py-24 text-white md:px-12 lg:px-24"
    >
      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(52,69,231,0.15),transparent_35%)]" />

      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:90px_90px]" />

      <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#3445E7]/20 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* TOP LABEL */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mb-14 flex flex-wrap items-center justify-between gap-4"
        >
          <div className="rounded-full border border-white/10 bg-white/[0.04] px-5 py-2 text-xs uppercase tracking-[0.25em] text-white/50 backdrop-blur-xl">
            Creative Direction • Development • AI Systems
          </div>

          <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs text-white/40 backdrop-blur-xl md:flex">
            Trusted by modern brands worldwide
          </div>
        </motion.div>

        {/* MAIN GRID */}
        <div className="grid items-center gap-16 lg:grid-cols-[1fr_0.9fr]">
          {/* LEFT */}
          <div className="relative">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
              className="mb-6 text-sm uppercase tracking-[0.3em] text-white/35"
            >
              About The Studio
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9 }}
              viewport={{ once: true }}
              className="max-w-5xl text-5xl font-semibold leading-[0.95] tracking-[-0.06em] md:text-7xl lg:text-6xl"
            >
              Building
              <span className="text-white/20"> cinematic </span>
              digital products for the next generation
              <span className="text-white/20"> of brands.</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              viewport={{ once: true }}
              className="mt-10 max-w-xl space-y-6"
            >
              <p className="text-base leading-relaxed text-white/55">
                We design immersive identities, motion-rich interfaces, and
                scalable digital systems that feel sharp, intentional, and
                unforgettable.
              </p>

              <p className="text-sm leading-relaxed text-white/35">
                Combining strategy, development, animation, and AI-enhanced
                creative workflows, every experience is crafted to leave a
                lasting visual fingerprint.
              </p>

              <div className="flex flex-wrap gap-4 pt-3">
                <DynamicButton
                  text="Start Project"
                  href="#contact"
                  className="px-6 py-4 text-base"
                />

                <button className="group flex items-center gap-2 rounded-full border border-white/10 px-5 py-4 text-sm text-white/70 transition-all duration-300 hover:border-white/30 hover:bg-white/5 hover:text-white">
                  View Case Studies
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
                </button>
              </div>
            </motion.div>

            {/* STATS */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              viewport={{ once: true }}
              className="mt-16 grid grid-cols-3 gap-4"
            >
              {stats.map((item, index) => (
                <div
                  key={index}
                  className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl"
                >
                  <h3 className="text-3xl font-semibold tracking-tight md:text-4xl">
                    {item.value}
                  </h3>

                  <p className="mt-2 text-xs uppercase tracking-[0.2em] text-white/35">
                    {item.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="relative flex items-center justify-center"
          >
            {/* GLOW RINGS */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                repeat: Infinity,
                duration: 30,
                ease: "linear",
              }}
              className="absolute h-[520px] w-[520px] rounded-full border border-white/10"
            />

            <motion.div
              animate={{ rotate: -360 }}
              transition={{
                repeat: Infinity,
                duration: 40,
                ease: "linear",
              }}
              className="absolute h-[420px] w-[420px] rounded-full border border-white/[0.06]"
            />

            {/* FLOATING CARDS */}
            <motion.div
              animate={{
                y: [0, -14, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 6,
                ease: "easeInOut",
              }}
              className="relative w-full max-w-[430px]"
            >
              {/* MAIN CARD */}
              <div className="group relative overflow-hidden rounded-[36px] border border-white/10 bg-white/[0.04] p-4 backdrop-blur-2xl">
                <div className="absolute inset-0 bg-gradient-to-b from-white/[0.08] to-transparent" />

                <div className="relative overflow-hidden rounded-[28px]">
                  <img
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop"
                    alt="Creative Studio"
                    className="h-[560px] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
                </div>

                {/* FLOATING INFO */}
                <motion.div
                  animate={{
                    y: [0, -8, 0],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 4,
                    ease: "easeInOut",
                  }}
                  className="absolute bottom-8 left-8 right-8 rounded-2xl border border-white/10 bg-black/40 p-5 backdrop-blur-xl"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.25em] text-white/40">
                        Creative Process
                      </p>

                      <h3 className="mt-2 text-2xl font-medium leading-tight">
                        Strategy meets motion
                        <br />
                        and immersive design.
                      </h3>
                    </div>

                    <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/10">
                      <ArrowUpRight className="h-5 w-5" />
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* FLOATING MINI CARD */}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
