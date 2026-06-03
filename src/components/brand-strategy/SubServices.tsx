"use client";

import { cn } from "@/lib/utils";
import { useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { MdKeyboardArrowRight } from "react-icons/md";
import ConnectButton from "../shared/ConnectButton";

// Split the titles to allow the image to appear exactly between the words.
const services = [
  {
    title1: "Brand",
    title2: "Strategy",
    description:
      "Positioning, narrative, and foundational architecture for industry leaders.",
    link: "/brand-strategy",
    image:
      "https://images.unsplash.com/photo-1703720074944-b60b730c7289?w=1200&auto=format&fit=crop&q=80",
  },
  {
    title1: "Digital",
    title2: "Products",
    description:
      "Immersive websites, web applications, and scalable platforms.",
    link: "/services",
    image:
      "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=1200&auto=format&fit=crop&q=80",
  },
  {
    title1: "UI/UX",
    title2: "& Motion",
    description:
      "Cinematic visual identities, motion graphics, and interface designs.",
    link: "/services",
    image:
      "https://images.unsplash.com/photo-1581287053822-fd7bf4f4bfec?w=1200&auto=format&fit=crop&q=80",
  },
  {
    title1: "E",
    title2: "Commerce",
    description:
      "High-converting online storefronts optimized for modern consumers.",
    link: "/services",
    image:
      "https://images.unsplash.com/photo-1586880244406-556ebe35f282?w=1200&auto=format&fit=crop&q=80",
  },
];

export default function SubServices() {
  const containerRef = useRef<HTMLElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { contextSafe } = useGSAP(
    () => {
      const cursor = cursorRef.current;
      if (cursor) {
        // Initialize cursor size to 0
        gsap.set(cursor, { scale: 0, xPercent: -50, yPercent: -50 });

        const xTo = gsap.quickTo(cursor, "x", {
          duration: 0.15,
          ease: "power3",
          force3D: true,
        });
        const yTo = gsap.quickTo(cursor, "y", {
          duration: 0.15,
          ease: "power3",
          force3D: true,
        });

        const moveCursor = (e: MouseEvent) => {
          xTo(e.clientX);
          yTo(e.clientY);
        };

        window.addEventListener("mousemove", moveCursor);

        return () => {
          window.removeEventListener("mousemove", moveCursor);
        };
      }
    },
    { scope: containerRef, dependencies: [mounted] },
  );

  // Added overwrite: "auto" to prevent animation timeline conflicts
  const handleMouseEnter = contextSafe(() => {
    gsap.to(cursorRef.current, {
      scale: 1,
      duration: 0.4,
      ease: "back.out(1.5)",
      overwrite: "auto",
    });
  });

  const handleMouseLeave = contextSafe(() => {
    gsap.to(cursorRef.current, {
      scale: 0,
      duration: 0.3,
      ease: "power3.inOut",
      overwrite: "auto",
    });
  });

  // Failsafe: Hide the cursor immediately if the user starts scrolling to prevent it from leaking out of the section bounds.
  useEffect(() => {
    const handleScroll = () => {
      if (cursorRef.current) {
        gsap.to(cursorRef.current, {
          scale: 0,
          duration: 0.3,
          ease: "power3.inOut",
          overwrite: "auto",
        });
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={containerRef}
      onMouseLeave={handleMouseLeave}
      className="relative w-full overflow-hidden bg-black py-16 text-white md:py-24 mt-10"
    >
      <div className="mx-auto w-full max-w-[1480px] px-6 md:px-6">
        {/* HEADER SECTION */}
        <div className="mb-12 flex w-full flex-col items-start gap-4 pb-6 md:mb-16 md:pb-8">
          <h2 className="text-4xl font-bold leading-[1.05] tracking-tight text-white md:text-5xl lg:text-[4.5rem]">
            We Engineer Digital{" "}
            <span className="bg-gradient-to-r from-[#2E5BFF] to-[#149CCB] bg-clip-text text-transparent">
              Advantage
            </span>
          </h2>
        </div>

        {/* SERVICES LIST */}
        <div className="group/list flex w-full flex-col">
          {services.map((service, index) => (
            <a
              key={index}
              href={service.link}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              // CHANGED: Added slight padding internally (px-4 md:px-8) and rounded corners for a clean background card effect
              className="group relative flex w-full cursor-none flex-col items-start justify-center overflow-hidden rounded-sm px-4 py-8 md:flex-row md:items-center md:justify-between md:px-8 md:py-12"
            >
              {/* CHANGED: BACKGROUND IMAGE REVEAL */}
              <div className="absolute inset-0 z-0 opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100">
                <img
                  src={service.image}
                  alt={service.title1}
                  className="h-full w-full scale-105 object-cover transition-transform duration-700 ease-out group-hover:scale-100"
                />
                {/* Dark overlay to ensure text stays readable */}
                <div className="absolute inset-0 bg-black/60" />
              </div>

              <div className="relative z-10 flex w-full items-center justify-between md:w-auto md:justify-start">
                {/* TITLE */}
                <h3
                  className={cn(
                    "flex items-center text-3xl font-medium leading-none tracking-[-0.03em] transition-colors duration-500 sm:text-4xl md:text-[clamp(2rem,4vw,4.5rem)]",
                    "text-white group-hover/list:text-white/20 group-hover:!text-white",
                  )}
                >
                  {/* Rejoined the text simply */}
                  <span>
                    {service.title1}
                    {service.title1 === "E" ? "-" : " "}
                    {service.title2}
                  </span>
                </h3>
              </div>

              {/* DESCRIPTION */}
              <p
                className={cn(
                  "relative z-10 mt-4 max-w-sm text-sm font-medium leading-relaxed transition-all duration-500 md:mt-0 md:text-right",
                  "text-zinc-600 group-hover/list:text-zinc-800 group-hover:!text-zinc-200",
                )}
              >
                {service.description}
              </p>

              {/* CUSTOM GRADIENT BORDER */}
              <div
                className={cn(
                  "absolute bottom-0 left-0 z-20 h-[1px] w-full transition-all duration-500",
                  index === services.length - 1
                    ? "bg-transparent"
                    : "bg-white/10 group-hover:bg-transparent group-hover:bg-gradient-to-r group-hover:from-[#2E5BFF] group-hover:to-[#149CCB]",
                  index === services.length - 1 &&
                    "group-hover:bg-gradient-to-r group-hover:from-[#2E5BFF] group-hover:to-[#149CCB]",
                )}
              />
            </a>
          ))}
        </div>

        {/* CTA / CONNECT BUTTON SECTION */}
        <div className="mt-16 flex w-full items-center justify-center md:mt-24 gap-20">
          <ConnectButton className="scale-110 md:scale-125" />
        </div>
      </div>

      {/* CUSTOM CURSOR FOLLOWER */}
      {mounted && typeof document !== "undefined"
        ? createPortal(
            <div
              ref={cursorRef}
              className={cn(
                "pointer-events-none fixed left-0 top-0 z-[9999] flex h-8 w-28 items-center justify-center rounded-md bg-gradient-to-r from-[#2E5BFF] to-[#149CCB] text-white shadow-xl",
                "will-change-transform",
              )}
            >
              <span className="mt-px ml-1 text-[0.6rem] font-bold uppercase tracking-[0.2em]">
                Explore
              </span>
              <MdKeyboardArrowRight className="h-4 w-4" />
            </div>,
            document.body,
          )
        : null}
    </section>
  );
}
