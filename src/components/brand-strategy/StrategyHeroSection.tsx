import React from "react";
import LogoLoop from "@/components/ui/LogoLoop";

import {
  SiNextdotjs,
  SiReact,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";
import Header from "../page/Header";

const techLogos = [
  { node: <SiReact />, title: "React", href: "https://react.dev" },
  { node: <SiNextdotjs />, title: "Next.js", href: "https://nextjs.org" },
  {
    node: <SiTypescript />,
    title: "TypeScript",
    href: "https://www.typescriptlang.org",
  },
  {
    node: <SiTailwindcss />,
    title: "Tailwind CSS",
    href: "https://tailwindcss.com",
  },
];

export default function StrategyHeroSection() {
  return (
    <section className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-white px-6 py-24 text-zinc-900">
      {/* Subtle Background Glow for Light Mode */}
      <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center opacity-60">
        <div className="h-[600px] w-[600px] rounded-full bg-zinc-100 blur-[120px]"></div>
      </div>

      {/* Header positioned at the top */}
      <div className="absolute top-0 left-0 w-full z-50">
        <Header />
      </div>

      {/* Main Content (Center Aligned) */}
      <div className="relative z-10 flex max-w-4xl flex-col items-center text-center mt-auto pt-20">
        {/* Top Pill Badge */}
        <div className="mb-8 inline-flex items-center rounded-lg border border-black/10 bg-black/5 px-4 py-1.5 text-xs font-semibold tracking-widest text-zinc-600 uppercase backdrop-blur-md">
          How we do it
        </div>

        {/* Headline */}
        <h1 className="mb-6 text-5xl font-bold leading-[1.1] tracking-tight text-zinc-900 md:text-7xl">
          We build brands that <br className="hidden md:block" /> people love.
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl text-lg leading-relaxed text-zinc-500 md:text-xl">
          A brand is more than just a logo and a color palette. It&apos;s the
          emotional connection you have with your audience. We help you define,
          design, and deliver that connection.
        </p>
      </div>

      {/* Trusted By & Logo Loop Section */}
      <div className="relative z-10 mt-auto pt-24 pb-10 flex w-full flex-col items-center">
        <p className="mb-8 text-xs font-semibold tracking-[0.2em] text-zinc-400 uppercase">
          Trusted By
        </p>

        {/* Logo Loop Container */}
        <div className="w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
          <LogoLoop
            logos={techLogos}
            speed={50}
            direction="left"
            logoHeight={28}
            gap={90}
            hoverSpeed={0}
            scaleOnHover
            fadeOut
            fadeOutColor="#ffffff" // Updated to match the white background
            ariaLabel="Technology partners"
          />
        </div>
      </div>
    </section>
  );
}
