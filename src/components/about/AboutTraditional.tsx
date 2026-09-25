"use client";

import { motion } from "framer-motion";
import DesktopAutoplayVideo from "@/components/ui/DesktopAutoplayVideo";

export default function AboutTraditional() {
  return (
    <section className="relative w-full bg-black py-12 md:py-20 font-sans overflow-hidden text-white">
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.04] mix-blend-overlay pointer-events-none max-md:hidden" />

      <div className="mx-auto flex flex-col items-center max-md:items-start">
        <motion.div
          data-no-mobile-entry
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center text-center max-w-5xl z-10 px-4 max-md:items-start max-md:px-3 max-md:text-left md:px-10"
        >
          <div className="mb-8 inline-flex items-center justify-center rounded-full max-md:mb-6">
            <span className="text-sm font-medium uppercase tracking-[0.3em] text-zinc-500 max-md:text-xs">
              Who We Are
            </span>
          </div>

          <h2 className="text-5xl max-md:text-[2.6rem] md:text-7xl lg:text-[6.5rem] font-bold tracking-tighter max-md:tracking-tight leading-[0.9em] max-md:leading-[1.11] mb-8 max-md:mb-10">
            <span className="max-md:hidden">
              A collective of <br className="hidden md:block" />
            </span>
            <span className="md:hidden">{"Built by "}</span>
            <span className="bg-linear-to-r from-[#2E5BFF] to-[#149CCB] bg-clip-text text-transparent">
              digital innovators.
            </span>
          </h2>

          <p className="max-w-3xl text-lg font-light leading-[1.25em] text-white md:text-xl">
            <span className="max-md:hidden">
              Founded on the belief that technology and creativity should
              seamlessly intersect. We operate globally, partnering with
              visionary businesses to transform their digital presence. Founded
              on the belief that technology and.
            </span>
            <span className="md:hidden">
              Technology and creativity, working as one. We partner with
              visionary businesses worldwide to transform their digital
              presence.
            </span>
          </p>
        </motion.div>

        <div className="relative z-10 mt-20 w-full max-w-[96rem] px-4 max-md:mt-12 max-md:px-3 md:mt-28 md:px-10">
          <motion.div
            data-no-mobile-entry
            initial={{ opacity: 0, y: 90, scale: 0.93 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            // Mobile matches OurValuesSection's portrait image. Both sit in a
            // `px-3` container at the same 351px content width, so copying its
            // 4/5 ratio yields the identical rendered height — and unlike a
            // fixed px height it tracks whatever the viewport is. Desktop keeps
            // 16/9.
            className="group relative aspect-video max-md:aspect-[4/5] w-full overflow-hidden rounded-2xl bg-zinc-900"
          >
            <DesktopAutoplayVideo
              src="/assets/video1.mp4"
              poster="/assets/video1-poster.jpg"
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
