"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
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

  // Sticky offset for the mobile overlaps, measured on mount and resize only —
  // nothing here listens to scroll, so the hold itself stays a pure compositor
  // effect.
  //
  // Why an offset at all: `sticky; top: 0` freezes a section the moment its TOP
  // reaches the viewport top, which strands the tail of any section taller than
  // the screen. `sticky; bottom: 0` does NOT solve it — that pulls an element UP
  // into view from below and releases it on the way down, the opposite hold.
  // The idiom that works is a NEGATIVE top of (viewport - height), so the
  // section's BOTTOM rests on the viewport bottom: exactly what
  // brand-strategy/page.tsx does with `top-[min(0px,calc(100vh-992px))]`, only
  // measured here instead of hardcoded so it survives copy edits and width
  // changes. Sections shorter than the viewport clamp to 0 and simply stick at
  // the top.
  useEffect(() => {
    const holders = [
      aboutContainerRef,
      statsContainerRef,
      testimonialsGroupRef,
    ];

    const apply = () => {
      const mobile = window.matchMedia("(max-width: 767px)").matches;
      for (const ref of holders) {
        const el = ref.current;
        if (!el) continue;
        // Cleared above md so the desktop GSAP pins own positioning there.
        el.style.top = mobile
          ? `${Math.min(0, window.innerHeight - el.offsetHeight)}px`
          : "";
      }
    };

    apply();
    window.addEventListener("resize", apply);
    // Content settling after first paint (fonts, images) changes these heights,
    // and setting `top` cannot itself resize a sticky box, so this cannot loop.
    const ro = new ResizeObserver(apply);
    for (const ref of holders) if (ref.current) ro.observe(ref.current);

    return () => {
      window.removeEventListener("resize", apply);
      ro.disconnect();
    };
  }, []);

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
          {/* Below md the three overlaps are CSS `position: sticky` instead of
              GSAP pins. Same effect — the held section stays put while the next
              one slides over it — but the browser does it on the compositor,
              with no per-frame JS. The GSAP version measurably janked on a
              phone, which is the whole reason this is CSS.

              `bottom-0`, not `top-0`: every one of these sections is taller
              than a phone viewport, so sticking the TOP would freeze it with
              its own content still unread below the fold. Sticking the BOTTOM
              holds it only once it has been scrolled through — the same moment
              the desktop pins use (`start: "bottom bottom"`).

              Each holder is covered by an opaque, higher-z sibling
              (Portfolio z-10, Service z-10, Contact z-30), which is what makes
              the hand-off read as an overlap. */}
          <div
            ref={aboutContainerRef}
            className="relative z-0 bg-white max-md:sticky"
          >
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
              className="relative z-0 bg-white shadow-[0_-50px_80px_rgba(0,0,0,0.5)] max-md:sticky"
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

            <div
              ref={testimonialsGroupRef}
              className="relative z-10 bg-white max-md:sticky"
            >
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
