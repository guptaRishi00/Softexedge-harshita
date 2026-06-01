"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import GridDistortion from "@/components/ui/GridDistortion";
import DynamicButton from "../ui/DynamicButton";

const premiumEase = [0.22, 1, 0.36, 1] as const;

export default function CtaSection() {
  return (
    <section className="relative w-full bg-white">
      <div className="mx-auto max-w-[1600px]">
        {/* Main CTA Container */}
        <div className="relative flex min-h-[70vh] w-full flex-col justify-between overflow-hidden rounded-[40px] bg-zinc-950 border border-zinc-800/50">
          {/* Background Grid Distortion */}
          <div className="absolute inset-0 z-0">
            <GridDistortion
              imageSrc="https://picsum.photos/1920/1080?grayscale"
              grid={10}
              mouse={0.25}
              strength={0.15}
              relaxation={0.9}
              className="h-full w-full object-cover opacity-100 "
            />
            {/* Heavy vignette overlay for text readability and cinematic depth */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/90 pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000_100%)] pointer-events-none opacity-80" />
          </div>

          {/* Top Content: Massive Typography */}
          <div className="relative z-10 p-8 pt-16 md:p-16 lg:p-24">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: premiumEase }}
            >
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-2 w-2 items-center justify-center rounded-full bg-emerald-500">
                  <div className="absolute h-4 w-4 animate-ping rounded-full bg-emerald-500/40" />
                </div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-zinc-400 md:text-sm">
                  Available for new projects
                </p>
              </div>

              <h2 className="text-5xl font-medium leading-[0.95] tracking-tight text-white md:text-7xl lg:text-[7.5rem]">
                Let's build something <br className="hidden md:block" />
                <span className="bg-gradient-to-r from-[#2E5BFF] to-[#149CCB] bg-clip-text text-transparent pr-4">
                  extraordinary.
                </span>
              </h2>
            </motion.div>
          </div>

          {/* Bottom Content: Actions & Meta Info */}
          <div className="relative z-10 flex flex-col items-start justify-between gap-10 p-8 md:flex-row md:items-end md:p-16 lg:p-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1, ease: premiumEase }}
            >
              <DynamicButton
                text="Start a Project"
                href="#contact"
                className="px-8 py-4 text-lg hover:border-transparent"
              />
            </motion.div>

            {/* Meta Information (Location, Email, etc.) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: premiumEase }}
              className="flex flex-col gap-6 text-sm font-medium text-zinc-400 md:flex-row md:gap-12 md:text-base lg:text-right"
            >
              <div className="flex flex-col gap-1">
                <span className="text-zinc-600 uppercase tracking-wider text-xs">
                  Drop us a line
                </span>
                <a
                  href="mailto:hello@youragency.com"
                  className="text-white hover:text-[#149CCB] transition-colors"
                >
                  hello@youragency.com
                </a>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-zinc-600 uppercase tracking-wider text-xs">
                  Local Time
                </span>
                <span className="text-white">New York, 10:42 AM</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
