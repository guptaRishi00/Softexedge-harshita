// src/app/home/page.tsx
"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  SiNextdotjs,
  SiReact,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";

import AboutSection from "@/components/home/AboutSection";
import Herosection from "@/components/home/Herosection";
import PortfolioSection from "@/components/home/PortfolioSection";
import StatsSection from "@/components/home/StatsSection";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/layout/SmoothScroll";
import LogoLoop from "@/components/ui/LogoLoop";
import ExperimentalTestimonials from "@/components/home/ExperimentalTestimonials";
import BlogSection from "@/components/home/BlogSection";
import ContactSection from "@/components/home/ContactSection";
import ServiceSection from "@/components/home/ServiceSection";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

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

  const aboutContainerRef = useRef<HTMLDivElement>(null);
  const aboutInnerRef = useRef<HTMLDivElement>(null);
  const portfolioRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (
      !aboutContainerRef.current ||
      !aboutInnerRef.current ||
      !portfolioRef.current
    )
      return;

    // 1. PIN THE ABOUT SECTION
    // Yeh About ko freeze rakhega jab tak Portfolio section pura upar na aa jaye
    ScrollTrigger.create({
      trigger: aboutContainerRef.current,
      start: "top top",
      endTrigger: portfolioRef.current,
      end: "top top",
      pin: true,
      pinSpacing: false,
    });

    // 2. PARALLAX SCALE & FADE
    // Depth create karne ke liye About thoda shrink aur fade hoga
    gsap.to(aboutInnerRef.current, {
      scale: 0.85,
      opacity: 0,
      y: 40,
      ease: "none",
      scrollTrigger: {
        trigger: aboutContainerRef.current,
        start: "top top",
        endTrigger: portfolioRef.current,
        end: "top top",
        scrub: true,
      },
    });
  });

  return (
    <SmoothScroll>
      <main className="w-full bg-white">
        <div className="px-3 pt-3">
          <Herosection />
        </div>

        <section className="flex w-full items-center gap-8 overflow-hidden bg-white px-6 py-12 md:pt-20">
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

        <div className="relative">
          {/* === ABOUT SECTION WRAPPER === */}
          <div ref={aboutContainerRef} className="relative z-0 bg-black">
            {/* Yahan pb-[15vh] (aur md:pb-[25vh]) lagaya hai taaki fix space mil jaye */}
            {/* Isse content bottom se touch nahi hoga aur Portfolio smoothly slide karega */}
            <div
              ref={aboutInnerRef}
              className="origin-top will-change-transform bg-white pb-[15vh] md:pb-[25vh] lg:pb-[30vh]"
            >
              <AboutSection />
            </div>
          </div>

          {/* === PORTFOLIO SECTION === */}
          {/* Z-10 se ye hamesha upar rahega aur upar ki taraf shadow fekega */}
          <div
            ref={portfolioRef}
            className="relative z-10 bg-[#0a0a0a] shadow-[0_-50px_80px_rgba(0,0,0,0.5)]"
          >
            <PortfolioSection />
          </div>

          {/* === REMAINING SECTIONS === */}
          <div className="relative z-10 bg-white">
            <StatsSection />
            <div className="">
              <ServiceSection />
            </div>
            <ExperimentalTestimonials />
            <ContactSection />
            <BlogSection />
          </div>
        </div>

        <div className="relative z-10 w-full p-3 bg-white">
          <Footer />
        </div>
      </main>
    </SmoothScroll>
  );
}
