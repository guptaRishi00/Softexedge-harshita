"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const techStack = [
  { id: 2, name: "Next.js", image: "/assets/nextjs.png" },
  { id: 3, name: "Tailwind CSS", image: "/assets/tailwind3.png" },
  { id: 4, name: "TypeScript", image: "/assets/typescript3.png" },
  { id: 5, name: "PostgreSQL", image: "/assets/postgres2.png" },
  { id: 6, name: "Framer Motion", image: "/assets/framer.png" },
  { id: 7, name: "React Native", image: "/assets/reactnative4.png" },
];

export default function OurTechStack() {
  const LogoTrack = () => (
    <div className="flex shrink-0 gap-5 pr-5">
      {techStack.map((tech) => (
        <div
          key={tech.id}
          className="flex h-36 w-52 shrink-0 items-center justify-center rounded-3xl border border-zinc-800 bg-[#100f0f] transition-colors"
        >
          <Image
            src={tech.image}
            alt={`${tech.name} logo`}
            width={118}
            height={36}
            className="h-9 w-auto object-contain"
          />
        </div>
      ))}
    </div>
  );

  return (
    <section className="relative w-full overflow-hidden bg-black pt-0 text-white">
      <div className="mx-auto w-full md:pb-25">
        <div className="mx-auto mb-20 px-4 md:px-10">
          <span className="mb-5 block ml-[3px] text-xs font-medium uppercase tracking-[0.25em] text-white/60">
            Our Toolkit
          </span>

          <div className="flex w-full flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className="text-4xl font-bold leading-none tracking-tight text-white md:text-5xl lg:text-[5rem]"
            >
              Our Tech{" "}
              <span className="bg-linear-to-r from-[#2E5BFF] to-[#149CCB] bg-clip-text text-transparent">
                Stack
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="max-w-2xl text-xl font-light leading-[1.25em] text-white md:text-left"
            >
              Powered by modern, reliable, and scalable technologies to bring
              your vision to life.
            </motion.p>
          </div>
        </div>

        <div className="relative flex w-full flex-col gap-5 overflow-hidden rounded-3xl py-16">
          <motion.div
            className="flex w-max flex-nowrap"
            animate={{ x: ["0%", "-50%"] }}
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
            className="flex w-max flex-nowrap"
            animate={{ x: ["-50%", "0%"] }}
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
        <div className="w-full border-b border-white/10" />
      </div>
    </section>
  );
}
