"use client";

import { motion } from "framer-motion";

export default function AboutTraditional() {
  return (
    <section className="relative w-full bg-black py-12 md:py-20 font-sans overflow-hidden text-white">
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.04] mix-blend-overlay pointer-events-none" />

      <div className="mx-auto flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center text-center max-w-5xl z-10 px-4 md:px-10"
        >
          <div className="mb-8 inline-flex items-center justify-center rounded-full ">
            <span className="text-sm font-medium uppercase tracking-[0.3em] text-zinc-500">
              Who We Are
            </span>
          </div>

          <h2 className="text-5xl md:text-7xl lg:text-[6.5rem] font-bold tracking-tighter leading-[0.9em] mb-8">
            A collective of <br className="hidden md:block" />
            <span className="bg-linear-to-r from-[#2E5BFF] to-[#149CCB] bg-clip-text text-transparent">
              digital innovators.
            </span>
          </h2>

          <p className="max-w-3xl text-lg font-light leading-[1.25em] text-white md:text-xl">
            Founded on the belief that technology and creativity should
            seamlessly intersect. We operate globally, partnering with visionary
            businesses to transform their digital presence. Founded on the
            belief that technology and.
          </p>
        </motion.div>

        <div className="relative z-10 mt-20 w-full max-w-[96rem] px-4 md:mt-28 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 90, scale: 0.93 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="group relative aspect-video w-full overflow-hidden rounded-2xl bg-zinc-900"
          >
            <video
              src="/assets/video1.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
            />

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

            <div className="absolute bottom-0 left-0 p-6 md:p-10">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/70">
                Our studio in motion
              </span>
              <p className="mt-1 text-2xl font-semibold tracking-tight text-white md:text-3xl">
                Crafting digital experiences
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
