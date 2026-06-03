"use client";

import { cn } from "@/lib/utils";
import { useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { MdKeyboardArrowRight } from "react-icons/md";
import ConnectButton from "../shared/ConnectButton";
import ConnectButtonTwo from "../shared/ConnectButtonTwo";

// Split the titles to allow the image to appear exactly between the words.
const services = [
  {
    title1: "Brand",
    title2: "Strategy",
    description:
      "Positioning, narrative, and foundational architecture for industry leaders.",
    link: "/brand-strategy",
    image:
      "https://images.unsplash.com/photo-1703720074944-b60b730c7289?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fEJyYW5kaW5nfGVufDB8fDB8fHww",
  },
  {
    title1: "Digital",
    title2: "Products",
    description:
      "Immersive websites, web applications, and scalable platforms.",
    link: "/services",
    image:
      "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzF8fEJyYW5kaW5nfGVufDB8fDB8fHww",
  },
  {
    title1: "UI/UX",
    title2: "& Motion",
    description:
      "Cinematic visual identities, motion graphics, and interface designs.",
    link: "/services",
    image:
      "https://images.unsplash.com/photo-1581287053822-fd7bf4f4bfec?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDJ8fHVpJTIwdXh8ZW58MHx8MHx8fDA%3D",
  },
  {
    title1: "E",
    title2: "Commerce",
    description:
      "High-converting online storefronts optimized for modern consumers.",
    link: "/services",
    image:
      "https://images.unsplash.com/photo-1586880244406-556ebe35f282?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8RWNvbW1lcmNlfGVufDB8fDB8fHww",
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
      className="relative w-full overflow-hidden bg-black py-16 text-white md:py-20 mt-10"
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
              className="group relative flex w-full cursor-none flex-col items-start justify-center py-6 md:flex-row md:items-center md:justify-between md:py-8"
            >
              <div className="flex w-full items-center justify-between md:w-auto md:justify-start">
                {/* TITLE & EMBEDDED IMAGE REVEAL */}
                <h3
                  className={cn(
                    "flex items-center text-3xl font-medium leading-none tracking-[-0.03em] transition-colors duration-500 sm:text-4xl md:text-[clamp(2rem,4vw,4.5rem)]",
                    "text-white group-hover/list:text-white/20 group-hover:!text-white",
                  )}
                >
                  <span>{service.title1}</span>

                  {/* IMAGE REVEAL CONTAINER */}
                  {/* CHANGED: Added `mx-2` and `md:mx-3` to give the words an initial gap even when width is 0 */}
                  <div
                    className={cn(
                      "relative h-[35px] shrink-0 overflow-hidden rounded-xl opacity-0 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] md:h-[60px]",
                      "w-0 mx-2 group-hover:mx-4 group-hover:w-[60px] group-hover:opacity-100 md:mx-3 md:group-hover:mx-6 md:group-hover:w-[110px]",
                    )}
                  >
                    <img
                      src={service.image}
                      alt={service.title1 + " " + service.title2}
                      className="absolute inset-0 h-full w-full scale-110 object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-100"
                    />
                  </div>

                  <span>{service.title2}</span>
                </h3>
              </div>

              {/* DESCRIPTION */}
              <p
                className={cn(
                  "mt-3 max-w-sm text-sm font-medium leading-relaxed transition-all duration-500 md:mt-0 md:text-right",
                  "text-zinc-600 group-hover/list:text-zinc-800 group-hover:!text-zinc-300",
                )}
              >
                {service.description}
              </p>

              {/* CUSTOM GRADIENT BORDER */}
              <div
                className={cn(
                  "absolute bottom-0 left-0 h-[1px] w-full transition-all duration-500",
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
