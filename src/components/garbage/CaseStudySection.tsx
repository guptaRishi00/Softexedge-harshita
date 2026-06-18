"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useEffect, useRef } from "react";
import DynamicButton from "../ui/DynamicButton";

// Register GSAP plugins outside the component to prevent re-registration
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const projects = [
  {
    id: "01",
    client: "AETHER CORP",
    year: "2024",
    title: "AETHER",
    desc: "A cognitive AI platform engineered for next-generation enterprise automation. We designed a brutalist yet intuitive interface that visualizes complex neural networks in real-time.",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "02",
    client: "VELORA STUDIOS",
    year: "2023",
    title: "VELORA",
    desc: "A luxury digital commerce experience focusing on immersive storytelling. The architecture blends WebGL interactions with high-fashion editorial grid systems.",
    image:
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "03",
    client: "NEXUS GLOBAL",
    year: "2024",
    title: "NEXUS",
    desc: "Future-focused fintech infrastructure. We stripped away the noise of traditional banking dashboards to create a hyper-minimal, lightning-fast data visualization system.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1600&auto=format&fit=crop",
  },
];

export default function CaseStudySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>(".project-panel");

      if (!trackRef.current || panels.length === 0) return;

      const scrollTween = gsap.to(panels, {
        xPercent: -100 * (panels.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1.2,
          snap: {
            snapTo: 1 / (panels.length - 1),
            duration: { min: 0.2, max: 0.8 },
            ease: "power1.inOut",
          },
          end: () =>
            `+=${trackRef.current?.offsetWidth || window.innerWidth * 3}`,
        },
      });

      panels.forEach((panel, i) => {
        const image = panel.querySelector(".project-image");
        const imageWrapper = panel.querySelector(".image-wrapper");
        const title = panel.querySelector(".project-title");
        const metaTexts = panel.querySelectorAll(".project-meta");
        const desc = panel.querySelector(".project-desc");
        const giantNumber = panel.querySelector(".giant-number");
        const buttonWrapper = panel.querySelector(".button-wrapper");

        const isFirst = i === 0;

        // Image Reveal
        gsap.fromTo(
          imageWrapper,
          { clipPath: "inset(0% 100% 0% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.5,
            ease: "power4.inOut",
            scrollTrigger: isFirst
              ? undefined
              : {
                  trigger: panel,
                  containerAnimation: scrollTween,
                  start: "left 70%",
                },
          },
        );

        // Image Parallax
        gsap.fromTo(
          image,
          { scale: 1.3, xPercent: 15 },
          {
            scale: 1,
            xPercent: 0,
            ease: "none",
            scrollTrigger: {
              trigger: panel,
              containerAnimation: scrollTween,
              start: "left right",
              end: "right left",
              scrub: true,
            },
          },
        );

        // Text Stagger
        const tl = gsap.timeline({
          scrollTrigger: isFirst
            ? undefined
            : {
                trigger: panel,
                containerAnimation: scrollTween,
                start: "left 60%",
                toggleActions: "play none none reverse",
              },
        });

        tl.fromTo(
          metaTexts,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power3.out" },
        )
          .fromTo(
            title,
            { y: 100, opacity: 0, rotate: 2 },
            { y: 0, opacity: 1, rotate: 0, duration: 0.8, ease: "power4.out" },
            "-=0.4",
          )
          .fromTo(
            desc,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
            "-=0.6",
          )
          .fromTo(
            buttonWrapper,
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
            "-=0.6",
          );

        // Giant Background Number Parallax
        gsap.fromTo(
          giantNumber,
          { x: 200 },
          {
            x: -200,
            ease: "none",
            scrollTrigger: {
              trigger: panel,
              containerAnimation: scrollTween,
              start: "left right",
              end: "right left",
              scrub: true,
            },
          },
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="bg-[#f0f0f0] text-[#111] overflow-hidden"
    >
      <div
        ref={trackRef}
        style={{ width: `${projects.length * 100}vw` }}
        className="flex h-screen relative will-change-transform"
      >
        {projects.map((project, index) => (
          <div
            key={project.id}
            className="project-panel w-screen h-screen flex items-center justify-center relative shrink-0"
          >
            {/* Giant Outline Number */}
            <div
              className="giant-number absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[45vw] font-black leading-none pointer-events-none select-none z-0 tracking-tighter"
              style={{
                color: "transparent",
                WebkitTextStroke: "2px rgba(0,0,0,0.05)",
              }}
            >
              {project.id}
            </div>

            {/* Main Content Layout */}
            <div className="relative z-10 w-full h-full max-w-[90rem] mx-auto px-6 md:px-12 lg:px-24 grid grid-cols-1 md:grid-cols-12 items-center gap-8 md:gap-0">
              {/* Text Block */}
              <div className="md:col-span-7 md:col-start-1 flex flex-col justify-center order-2 md:order-1 mt-[-10vh] md:mt-0 relative z-20 mix-blend-difference text-white md:mix-blend-normal md:text-[#111]">
                {/* Meta Labels */}
                <div className="flex items-center gap-6 mb-6 md:mb-8 overflow-hidden">
                  <div className="project-meta text-[10px] md:text-xs font-semibold uppercase tracking-[0.2em]">
                    Client / {project.client}
                  </div>
                  <div className="project-meta text-[10px] md:text-xs font-semibold uppercase tracking-[0.2em] text-gray-400 md:text-gray-500">
                    {project.year}
                  </div>
                </div>

                {/* Title */}
                <div className="overflow-hidden pb-2 mb-4 md:mb-6 w-full">
                  <h2 className="project-title text-[clamp(4rem,12vw,10rem)] md:text-[clamp(5rem,8vw,12rem)] font-black tracking-tighter uppercase leading-[0.85] origin-bottom-left">
                    {project.title}
                  </h2>
                </div>

                {/* Description */}
                <div className="overflow-hidden">
                  <p className="project-desc max-w-md text-sm md:text-base font-medium leading-relaxed md:text-gray-600">
                    {project.desc}
                  </p>
                </div>

                {/* --- Replaced Static Button with DynamicButton --- */}
                <div className="button-wrapper mt-8 md:mt-12">
                  <DynamicButton
                    text="View Case Study"
                    href={`/work/${project.title.toLowerCase()}`} // Example routing
                    showIcon={true}
                  />
                </div>
              </div>

              {/* Image Block */}
              <div className="md:col-span-5 md:col-start-8 h-[50vh] md:h-[70vh] w-full order-1 md:order-2">
                <div className="image-wrapper relative w-full h-full overflow-hidden bg-gray-200">
                  <Image
                    src={project.image}
                    alt={`${project.title} preview`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="project-image object-cover origin-center"
                    priority={index === 0}
                    quality={90}
                  />
                  <div className="absolute inset-0 bg-black/10 mix-blend-overlay pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
