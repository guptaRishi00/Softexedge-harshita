// src/app/home/page.tsx
"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import {
  SiNextdotjs,
  SiReact,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";

import AboutSection from "@/components/home/AboutSection";
import BlogSection from "@/components/home/BlogSection";
import ContactSection from "@/components/home/ContactSection";
import ExperimentalTestimonials from "@/components/home/ExperimentalTestimonials";
import Herosection from "@/components/home/Herosection";
import PortfolioSection from "@/components/home/PortfolioSection";
import ServiceSection from "@/components/home/ServiceSection";
import StatsSection from "@/components/home/StatsSection";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/layout/SmoothScroll";
import LogoLoop from "@/components/ui/LogoLoop";
import TechLogoCarousel from "@/components/ui/TechLogoCarousel";

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

  // === NEW REFS FOR SERVICE SECTION ANIMATION ===
  const serviceContainerRef = useRef<HTMLDivElement>(null);
  const serviceInnerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // 1. ABOUT SECTION ANIMATION
    if (
      aboutContainerRef.current &&
      aboutInnerRef.current &&
      portfolioRef.current
    ) {
      ScrollTrigger.create({
        trigger: aboutContainerRef.current,
        start: "top top",
        endTrigger: portfolioRef.current,
        end: "top top",
        pin: true,
        pinSpacing: false,
      });

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
    }

    // 2. SERVICE SECTION SCALE UP & UN-ROTATE
    if (serviceContainerRef.current && serviceInnerRef.current) {
      gsap.fromTo(
        serviceInnerRef.current,
        {
          scale: 0.65, // Starts small
          rotation: 20, // Rotated 20 degrees
          borderRadius: "40px", // Giving it rounded edges while it acts as a card
          overflow: "hidden",
        },
        {
          scale: 1, // Ends at full size
          rotation: 0,
          borderRadius: "0px",
          ease: "none",
          scrollTrigger: {
            trigger: serviceContainerRef.current,
            start: "top bottom",
            end: "top top",
            scrub: 1,
          },
        },
      );
    }
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
          <div ref={aboutContainerRef} className="relative z-0 bg-black">
            <div
              ref={aboutInnerRef}
              className="origin-top will-change-transform bg-white pb-[15vh] md:pb-[25vh] lg:pb-[30vh]"
            >
              <AboutSection />
            </div>
          </div>

          <div
            ref={portfolioRef}
            className="relative z-10 bg-[#0a0a0a] shadow-[0_-50px_80px_rgba(0,0,0,0.5)]"
          >
            <PortfolioSection />
          </div>

          <div className="relative z-10 bg-white">
            <StatsSection />

            <div
              ref={serviceContainerRef}
              className="relative w-full bg-white overflow-hidden py-10"
            >
              <div
                ref={serviceInnerRef}
                className="w-full origin-center will-change-transform"
              >
                <ServiceSection />
              </div>
            </div>

            <ExperimentalTestimonials />
            <TechLogoCarousel />
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
