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

  const statsContainerRef = useRef<HTMLDivElement>(null);
  const statsInnerRef = useRef<HTMLDivElement>(null);
  const serviceContainerRef = useRef<HTMLDivElement>(null);

  const testimonialsGroupRef = useRef<HTMLDivElement>(null);
  const testimonialsInnerRef = useRef<HTMLDivElement>(null);
  const contactContainerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
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

      if (statsContainerRef.current && serviceContainerRef.current) {
        ScrollTrigger.create({
          trigger: statsContainerRef.current,
          start: "bottom bottom",
          endTrigger: serviceContainerRef.current,
          end: "top top",
          pin: true,
          pinSpacing: false,
        });

        if (statsInnerRef.current) {
          gsap.to(statsInnerRef.current.querySelectorAll(".stat-inner"), {
            scale: 0.85,
            ease: "none",
            scrollTrigger: {
              trigger: statsContainerRef.current,
              start: "bottom bottom",
              endTrigger: serviceContainerRef.current,
              end: "top top",
              scrub: true,
            },
          });
        }
      }

      if (testimonialsGroupRef.current && contactContainerRef.current) {
        ScrollTrigger.create({
          trigger: testimonialsGroupRef.current,
          start: "bottom bottom",
          endTrigger: contactContainerRef.current,
          end: "top top",
          pin: true,
          pinSpacing: false,
        });

        if (testimonialsInnerRef.current) {
          gsap.to(testimonialsInnerRef.current, {
            scale: 0.85,
            y: 40,
            ease: "none",
            scrollTrigger: {
              trigger: testimonialsGroupRef.current,
              start: "bottom bottom",
              endTrigger: contactContainerRef.current,
              end: "top top",
              scrub: true,
            },
          });
        }
      }
    });

    return () => mm.revert();
  });

  return (
    <SmoothScroll>
      <main className="w-full bg-white">
        <div className="px-3 pt-3">
          <Herosection />
        </div>

        <section className="flex w-full flex-col items-start gap-4 overflow-hidden bg-white px-6 py-12 sm:flex-row sm:items-center sm:gap-8 md:pt-20">
          <div className="w-full shrink-0 text-center sm:w-auto sm:text-left lg:mb-0 mb-3">
            <p className="text-sm font-medium tracking-wide text-black/60">
              Trusted By
            </p>
          </div>
          <div className="hidden h-6 w-px bg-black/10 md:block" />
          {/* -ml-6 cancels the section's px-6 so the marquee runs to the left
              edge in the stacked layout. Scoped to max-sm, not max-md: at sm the
              section turns into a row and the negative margin would pull the
              carousel under the "Trusted by" text. */}
          <div className="relative min-w-0 flex-1 overflow-hidden max-sm:-ml-6">
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
          <div ref={aboutContainerRef} className="relative z-0 bg-white">
            <div
              ref={aboutInnerRef}
              className="origin-top will-change-transform bg-white pb-[3vh] md:pb-[25vh] lg:pb-[30vh]"
            >
              <AboutSection />
            </div>
          </div>

          <div
            ref={portfolioRef}
            className="relative z-10 bg-[#0a0a0a] shadow-[0_-8px_16px_-2px_rgb(0_0_0_/_0.18),0_-4px_8px_-4px_rgb(0_0_0_/_0.15)]"
          >
            <PortfolioSection />
          </div>

          <div className="relative z-20 bg-white md:-mt-[100vh]">
            <div
              ref={statsContainerRef}
              className="relative z-0 bg-white shadow-[0_-50px_80px_rgba(0,0,0,0.5)]"
            >
              <div ref={statsInnerRef} className="bg-white">
                <StatsSection />
              </div>
            </div>

            <div
              ref={serviceContainerRef}
              className="relative z-10 w-full shadow-[0_-8px_16px_-2px_rgb(0_0_0_/_0.18),0_-4px_8px_-4px_rgb(0_0_0_/_0.15)]"
            >
              <ServiceSection />
            </div>

            <div ref={testimonialsGroupRef} className="relative z-10 bg-white">
              <div
                ref={testimonialsInnerRef}
                className="origin-top will-change-transform"
              >
                <ExperimentalTestimonials />
                <TechLogoCarousel />
              </div>
            </div>

            <div
              ref={contactContainerRef}
              className="relative z-30 shadow-[0_-12px_24px_-2px_rgb(0_0_0_/_0.24),0_-6px_12px_-4px_rgb(0_0_0_/_0.2)]"
            >
              <ContactSection />
            </div>

            <div className="[&>section]:pt-10 md:[&>section]:pt-30">
              <BlogSection />
            </div>
          </div>
        </div>

        <div className="relative z-10 w-full p-3 bg-white">
          <Footer />
        </div>
      </main>
    </SmoothScroll>
  );
}
