import AboutHeroSection from "@/components/about/AboutHeroSection";
import AboutOverview from "@/components/about/AboutOverview";
import AboutTraditional from "@/components/about/AboutTraditional";
import OurTeamSection from "@/components/about/OurTeamSection";
import OurValuesSection from "@/components/about/OurValuesSection";
import CtaSection from "@/components/brand-strategy/CtaSection";
import FaqSection from "@/components/brand-strategy/FaqSection";
import ExperimentalTestimonials from "@/components/home/ExperimentalTestimonials";
import Footer from "@/components/layout/Footer";
import LogoLoop from "@/components/ui/LogoLoop";
import React from "react";
import { Fa500Px } from "react-icons/fa";

import {
  SiNextdotjs,
  SiReact,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";

type Props = {};

export default function AboutPage({}: Props) {
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
  return (
    <div>
      <AboutHeroSection />
      <AboutTraditional />
      <OurValuesSection />
      <OurTeamSection />
      <section className="flex w-full items-center gap-8 overflow-hidden bg-white px-6 py-12 md:pt-0">
        <div className="shrink-0">
          <p className="text-sm font-medium tracking-wide text-black/60">
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

      <ExperimentalTestimonials />
      <div className="p-3">
        <CtaSection />
      </div>
      <FaqSection />
      <div className="p-3">
        <Footer />
      </div>
    </div>
  );
}
