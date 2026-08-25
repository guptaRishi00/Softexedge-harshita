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
        <div className="lg:px-3 lg:pt-3 px-3 pt-4">
          <Herosection />
        </div>
        {/* hello */}
        <section className="flex w-full flex-col items-start gap-4 overflow-hidden bg-white px-6 pt-12 pb-14 lg:pb-0 max-md:pt-16 sm:flex-row sm:items-center sm:gap-8 md:pt-20">
          <div className="w-full shrink-0 text-center sm:w-auto sm:text-left lg:mb-0 mb-3">
            <p className="text-sm font-medium tracking-wide text-black/60 max-md:text-base">
              Trusted By
            </p>
          </div>
          <div className="hidden h-6 w-px bg-black/10 md:block" />

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
          {/* Desktop only: GSAP pins each holder while the next section
              slides over it (Portfolio z-10, Service z-10, Contact z-30 are the
              opaque covers). Below md there is no overlap at all — every
              ScrollTrigger here lives inside `mm.add("(min-width: 768px)")`, so
              the sections simply stack and scroll normally. */}
          <div ref={aboutContainerRef} className="relative z-0 bg-white">
            <div
              ref={aboutInnerRef}
              className="origin-top md:will-change-transform bg-white pb-0 md:pb-[25vh] lg:pb-[30vh]"
            >
              <AboutSection />
            </div>
          </div>

          <div
            ref={portfolioRef}
            className="relative z-10 bg-[#0a0a0a] lg:shadow-[0_-8px_16px_-2px_rgb(0_0_0_/_0.18),0_-4px_8px_-4px_rgb(0_0_0_/_0.15)]"
          >
            <PortfolioSection />
          </div>

          <div className="relative z-20 bg-white md:-mt-[100vh]">
            <div
              ref={statsContainerRef}
              className="relative z-0 bg-white shadow-[0_-50px_80px_rgba(0,0,0,0.5)] max-md:shadow-none"
            >
              <div ref={statsInnerRef} className="bg-white">
                <StatsSection />
              </div>
            </div>

            <div
              ref={serviceContainerRef}
              className="relative z-10 w-full shadow-[0_-8px_16px_-2px_rgb(0_0_0_/_0.18),0_-4px_8px_-4px_rgb(0_0_0_/_0.15)] max-md:shadow-none"
            >
              <ServiceSection />
            </div>

            <div ref={testimonialsGroupRef} className="relative z-10 bg-white">
              <div
                ref={testimonialsInnerRef}
                className="origin-top md:will-change-transform"
              >
                <ExperimentalTestimonials />
                <TechLogoCarousel />
              </div>
            </div>

            <div
              ref={contactContainerRef}
              className="relative z-30 lg:shadow-[0_-12px_24px_-2px_rgb(0_0_0_/_0.24),0_-6px_12px_-4px_rgb(0_0_0_/_0.2)]"
            >
              <ContactSection />

              {/* hello? */}
            </div>

            <div className="[&>section]:pt-16 md:[&>section]:pt-30">
              <BlogSection />
            </div>
          </div>
        </div>

        <div className="relative z-10 w-full p-2 lg:p-3 bg-white">
          <Footer />
        </div>
      </main>
    </SmoothScroll>
  );
}
