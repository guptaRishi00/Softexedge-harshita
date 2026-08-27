"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useIsDesktop } from "@/lib/useIsDesktop";

const techStack = [
  { id: 2, name: "Next.js", image: "/assets/nextjs.png" },
  { id: 3, name: "Tailwind CSS", image: "/assets/tailwind3.png" },
  { id: 4, name: "TypeScript", image: "/assets/typescript3.png" },
  { id: 5, name: "PostgreSQL", image: "/assets/postgres2.png" },
  { id: 6, name: "Framer Motion", image: "/assets/framer.png" },
  { id: 7, name: "React Native", image: "/assets/reactnative4.png" },
];

export default function OurTechStack() {
  // Below md the marquee is CSS-driven (same 50s linear loop, second row
  // reversed): framer's x tween wrote an inline transform from the main
  // thread on every frame for both tracks, on every page, forever -- the
  // homepage's TechLogoCarousel already runs as a CSS marquee for the same
  // reason. Desktop keeps the framer tween untouched.
  const isDesktop = useIsDesktop();
  const LogoTrack = () => (
    <div className="flex shrink-0 gap-5 pr-5">
      {techStack.map((tech) => (
        <div
          key={tech.id}
          className="flex h-36 w-52 shrink-0 items-center justify-center rounded-3xl border border-zinc-800 bg-[#100f0f] transition-colors max-md:h-28 max-md:w-44"
        >
          <Image
            src={tech.image}
            alt={`${tech.name} logo`}
            width={118}
            height={36}
            className="h-9 max-md:h-7 w-auto object-contain"
          />
        </div>
      ))}
    </div>
  );

  return (
    <section className="relative w-full overflow-hidden bg-black pt-0 text-white max-md:-mt-px max-md:pb-4">
      <div className="mx-auto w-full md:pb-25">
        <div className="mx-auto mb-19 px-4 max-md:mb-8 max-md:px-3 md:px-10">
          <span className="mb-5 block ml-[3px] text-xs font-medium uppercase tracking-[0.25em] text-white/60 max-md:tracking-[0.3em] max-md:text-zinc-500">
            Our Toolkit
          </span>

          <div className="flex w-full flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <motion.h2
              data-no-mobile-entry
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className="text-4xl font-bold leading-none tracking-tight text-white max-md:text-[2.5rem] max-md:leading-[1.11111] md:text-5xl lg:text-[5rem]"
            >
              Our Tech{" "}
              <span className="bg-linear-to-r from-[#2E5BFF] to-[#149CCB] bg-clip-text text-transparent">
                Stack
              </span>
            </motion.h2>

            <motion.p
              data-no-mobile-entry
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="max-w-2xl text-xl font-light leading-[1.25em] text-white max-md:text-lg md:text-left"
            >
              Powered by modern, reliable, and scalable technologies to bring
              your vision to life.
            </motion.p>
          </div>
        </div>

        <div className="relative flex w-full flex-col gap-5 overflow-hidden rounded-3xl py-16 max-md:gap-4 max-md:py-6">
          <motion.div
            className="flex w-max flex-nowrap max-md:animate-[scroll_50s_linear_infinite]"
            animate={isDesktop ? { x: ["-50%", "0%"] } : undefined}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 50,
                ease: "linear",
              },
            }}
          >
            <LogoTrack />
            <LogoTrack />
            <LogoTrack />
            <LogoTrack />
          </motion.div>

          <motion.div
            className="flex w-max flex-nowrap max-md:animate-[scroll_50s_linear_infinite_reverse]"
            animate={isDesktop ? { x: ["0%", "-50%"] } : undefined}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 50,
                ease: "linear",
              },
            }}
          >
            <LogoTrack />
            <LogoTrack />
            <LogoTrack />
            <LogoTrack />
          </motion.div>
        </div>
      </div>

      <div className="mx-auto w-full px-4">
        <div className="w-full border-b border-white/10 max-md:hidden" />
      </div>
    </section>
  );
}
