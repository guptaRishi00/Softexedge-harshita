"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { type ReactNode, useRef } from "react";
import LogoLoop from "@/components/ui/LogoLoop";
import {
  SiNextdotjs,
  SiReact,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// The "Trusted By" logo strip under the hero is hidden for now (2026-10-23).
// Set to true to bring it back.
const SHOW_TRUSTED_BY = false;

/**
 * The client "leaf" that owns /home's scroll choreography — the GSAP pins and
 * scrub tweens plus every wrapper div they attach refs to. Extracted verbatim
 * from `app/home/page.tsx` so the page itself can be a Server Component; the
 * sections arrive as ELEMENT props rendered by the server page, which is the
 * report-prescribed "pass the heavy sections as children" shape.
 *
 * Honest scope note: every section handed in is itself a `"use client"`
 * component, so this split does not move any of them out of the client bundle
 * — it relocates the directive, not the weight. The DOM this renders is
 * byte-identical to the old inline version (verified by diffing the
 * prerendered HTML); only which file owns the markup changed.
 */
export default function ScrollAnimator({
  hero,
  about,
  portfolio,
  stats,
  services,
  testimonials,
  techCarousel,
  contact,
  blog,
  footer,
}: {
  hero: ReactNode;
  about: ReactNode;
  portfolio: ReactNode;
  stats: ReactNode;
  services: ReactNode;
  testimonials: ReactNode;
  techCarousel: ReactNode;
  contact: ReactNode;
  /** Optional: the home page hides the blog for now. */
  blog?: ReactNode;
  footer: ReactNode;
}) {
  const techLogos = [
    {
      node: <SiReact aria-hidden />,
      title: "React",
      href: "https://react.dev",
    },
    {
      node: <SiNextdotjs aria-hidden />,
      title: "Next.js",
      href: "https://nextjs.org",
    },
    {
      node: <SiTypescript aria-hidden />,
      title: "TypeScript",
      href: "https://www.typescriptlang.org",
    },
    {
      node: <SiTailwindcss aria-hidden />,
      title: "Tailwind CSS",
      href: "https://tailwindcss.com",
    },
  ];

  const aboutContainerRef = useRef<HTMLDivElement>(null);
  const aboutInnerRef = useRef<HTMLDivElement>(null);

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
        statsContainerRef.current
      ) {
        // About (the section, not the slide-over padding under it) is taller
        // than most windows since its comparison cards got figures. Holding
        // it by its top would leave the cards' copy and the button below the
        // fold for good, so while it is taller than the window it is held
        // once its button sits 16px above the window's bottom. That is the
        // section's bottom edge less its bottom padding, which leaves the
        // cards plus button (~620px) whole in windows down to ~650px tall.
        const aboutSection = aboutInnerRef.current.firstElementChild;
        ScrollTrigger.create({
          trigger: aboutSection ?? aboutContainerRef.current,
          pin: aboutContainerRef.current,
          start: () => {
            if (
              !(aboutSection instanceof HTMLElement) ||
              aboutSection.offsetHeight <= window.innerHeight
            ) {
              return "top top";
            }
            const pad = Number.parseFloat(
              getComputedStyle(aboutSection).paddingBottom,
            );
            return `bottom bottom+=${Math.max(0, pad - 16)}`;
          },
          endTrigger: statsContainerRef.current,
          end: "top top",
          pinSpacing: false,
        });

        // The shrink follows Stats (the next section), not the pin: About
        // holds still until Stats enters at the bottom, then recedes as it
        // covers it.
        // Scale only. Origin-top shrinking moves content up, with the scroll;
        // the old `y: 40`, started at the pin, pushed it back down the moment
        // it locked, which read as something breaking.
        gsap.to(aboutInnerRef.current, {
          scale: 0.85,
          ease: "none",
          scrollTrigger: {
            trigger: statsContainerRef.current,
            start: "top bottom",
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
    <main className="w-full bg-white">
      <div className="lg:px-3 lg:pt-3 px-3 pt-4">{hero}</div>
      {/* hello */}
      {SHOW_TRUSTED_BY && (
        <section className="flex w-full flex-col items-start gap-4 overflow-hidden bg-white px-6 pt-12 pb-14 lg:pb-0 max-md:pt-16 sm:flex-row sm:items-center sm:gap-8 md:pt-20">
          <div className="w-full shrink-0 text-center sm:w-auto sm:text-left lg:mb-0 mb-3">
            <p className="text-sm font-medium tracking-wide text-black/60 max-md:text-base">
              Trusted By
            </p>
          </div>
          <div className="hidden h-6 w-px bg-black/10 md:block" />

          {/* Below sm the section is a column with items-start, which sizes this
            wrapper to its CONTENT. LogoLoop measures the wrapper to decide how
            many logo copies it needs and adds two more, the wrapper grows to fit
            them, the ResizeObserver fires again -- +2 copies every frame for as
            long as the page is open (measured: 2,129 -> 7,919 DOM nodes in 4s).
            self-stretch pins the wrapper to the section width; -mr-6 mirrors
            -ml-6 so the strip still runs edge to edge. */}
          <div className="relative min-w-0 flex-1 overflow-hidden max-sm:-mx-6 max-sm:self-stretch">
            <LogoLoop
              logos={techLogos}
              speed={50}
              direction="left"
              // Desktop runs left-to-right; below md `direction` still governs, so
              // the phone keeps the original travel.
              desktopDirection="right"
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
      )}

      <div className="relative">
        {/* Desktop only: GSAP pins each holder while the next section
            slides over it: About under the Stats/Services block (z-10),
            Stats under Services, Testimonials under Contact (z-30); the
            Testimonials/Contact block (z-20) slides over Portfolio's final
            hold. Below md there is no overlap at all — every ScrollTrigger
            here lives inside `mm.add("(min-width: 768px)")`, so the sections
            simply stack and scroll normally. */}
        {/* md:will-change-transform keeps the pinned wrapper on its own
            layer before and after it locks, so the switch to `fixed` does
            not rebuild (and flash) About's layer mid-scroll. */}
        <div
          ref={aboutContainerRef}
          className="relative z-0 bg-white md:will-change-transform"
        >
          <div
            ref={aboutInnerRef}
            className="origin-top md:will-change-transform bg-white pb-0 md:pb-[25vh] lg:pb-[30vh]"
          >
            {about}
          </div>
        </div>

        <div className="relative z-10 bg-white">
          <div
            ref={statsContainerRef}
            className="relative z-0 bg-white lg:shadow-[0_-8px_16px_-2px_rgb(0_0_0_/_0.18),0_-4px_8px_-4px_rgb(0_0_0_/_0.15)]"
          >
            <div ref={statsInnerRef} className="bg-white">
              {stats}
            </div>
          </div>

          <div
            ref={serviceContainerRef}
            className="relative z-10 w-full shadow-[0_-8px_16px_-2px_rgb(0_0_0_/_0.18),0_-4px_8px_-4px_rgb(0_0_0_/_0.15)] max-md:shadow-none"
          >
            {services}
          </div>
        </div>

        <div className="relative z-10 bg-[#0a0a0a]">{portfolio}</div>

        {/* md:-mt-[100vh] pulls this block over the last viewport of
            Portfolio's pin (its `+ innerHeight` hold is this slide-over
            room). pb-16 / md:pb-24 is the white gap between Contact and the
            footer. */}
        <div className="relative z-20 bg-white pb-16 md:-mt-[100vh] md:pb-24">
          <div
            ref={testimonialsGroupRef}
            className="relative z-10 bg-white shadow-[0_-50px_80px_rgba(0,0,0,0.5)] max-md:shadow-none"
          >
            <div
              ref={testimonialsInnerRef}
              className="origin-top md:will-change-transform"
            >
              {testimonials}
              {techCarousel}
            </div>
          </div>

          <div
            ref={contactContainerRef}
            className="relative z-30 lg:shadow-[0_-12px_24px_-2px_rgb(0_0_0_/_0.24),0_-6px_12px_-4px_rgb(0_0_0_/_0.2)]"
          >
            {contact}

            {/* hello? */}
          </div>

          {blog && (
            <div className="[&>section]:pt-16 md:[&>section]:pt-30">{blog}</div>
          )}
        </div>
      </div>

      <div className="relative z-10 w-full p-2 lg:p-3 bg-white">{footer}</div>
    </main>
  );
}
