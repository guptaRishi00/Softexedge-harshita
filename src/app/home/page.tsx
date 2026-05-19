"use client";

import Lenis from "lenis";
import { useEffect } from "react";

import Herosection from "@/components/home/Herosection";
import LogoLoop from "@/components/ui/LogoLoop";
import Footer from "@/components/layout/Footer";

import {
  SiNextdotjs,
  SiReact,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";
import AboutSection from "@/components/home/AboutSection";
import StatsSection from "@/components/home/StatsSection";
import ServiceSection from "@/components/home/ServiceSection";

export default function HomePage() {
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

  useEffect(() => {
    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <main className="space-y-14 px-3 py-3">
      <Herosection />

      <section className="flex items-center gap-8 overflow-hidden px-6 py-4">
        <div className="shrink-0">
          <p className="text-sm font-medium tracking-wide text-black/60 uppercase">
            Trusted By
          </p>
        </div>

        <div className="h-6 w-px bg-black/10" />

        <div className="relative min-w-0 flex-1 overflow-hidden">
          <LogoLoop
            logos={techLogos}
            speed={50}
            direction="left"
            logoHeight={28}
            gap={90}
            hoverSpeed={0}
            scaleOnHover
            fadeOut
            fadeOutColor="#ffffff"
            ariaLabel="Technology partners"
          />
        </div>
      </section>

      <AboutSection />
      <StatsSection />
      <ServiceSection />
      {/* <Footer /> */}
    </main>
  );
}
