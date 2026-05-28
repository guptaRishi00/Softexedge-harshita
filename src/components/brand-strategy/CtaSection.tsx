"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import GridDistortion from "@/components/ui/GridDistortion";
import DynamicButton from "../ui/DynamicButton";

export default function CtaSection() {
  return (
    <section className="relative w-full h-150 md:h-[70vh] rounded-4xl flex items-center justify-center overflow-hidden bg-black text-white">
      {/* Background Grid Distortion */}
      <div className="absolute inset-0 z-0">
        <GridDistortion
          imageSrc="https://picsum.photos/1920/1080?grayscale"
          grid={10}
          mouse={0.25}
          strength={0.15}
          relaxation={0.9}
          className="w-full h-full object-cover opacity-70"
        />
        {/* Gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black pointer-events-none" />
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-zinc-400 font-semibold tracking-[0.4em] uppercase mb-4 text-sm md:text-base"
        >
          Let's Work Together
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-10"
        >
          Ready to elevate your <br className="hidden md:block" />
          <span className="bg-gradient-to-r from-[#2E5BFF] to-[#149CCB] bg-clip-text text-transparent">
            digital presence?
          </span>
        </motion.h2>

        <DynamicButton
          text="Let's Connect"
          href="#contact"
          className=" hover:border-transparent"
        />
      </div>
    </section>
  );
}
