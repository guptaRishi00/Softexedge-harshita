// src/components/home/ServiceSection.tsx
"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { MdKeyboardArrowRight } from "react-icons/md";
import { cn } from "@/lib/utils";

// Mirrors the Header "Services" dropdown (page/Header.tsx) — same names, links,
// and imagery.
const services = [
  {
    title: "Digital Marketing",
    image:
      "https://images.unsplash.com/photo-1611926653458-09294b3142bf?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGRpZ2l0YWwlMjBtYXJrZXRpbmd8ZW58MHx8MHx8fDA%3D",
    href: "/services",
  },
  {
    title: "AI & Marketing Automation",
    image:
      "https://plus.unsplash.com/premium_photo-1683120966127-14162cdd0935?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHNvZnR3YXJlfGVufDB8fDB8fHww",
    href: "/services",
  },
  {
    title: "Web Development",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800&auto=format&fit=crop",
    href: "/web-development",
  },
  {
    title: "App Development",
    image:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=800&auto=format&fit=crop",
    href: "/services",
  },
  {
    title: "Software Development",
    image:
      "https://plus.unsplash.com/premium_photo-1685086785636-2a1a0e5b591f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8c29mdHdhcmV8ZW58MHx8MHx8fDA%3D",
    href: "/services",
  },
  {
    title: "Brand Strategy and Identity",
    image:
      "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?q=80&w=800&auto=format&fit=crop",
    href: "/brand-strategy",
  },
  {
    title: "UI/UX Design",
    image:
      "https://images.unsplash.com/photo-1545235617-9465d2a55698?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dWl1eHxlbnwwfHwwfHx8MA%3D%3D",
    href: "/services",
  },
  {
    title: "Video Production",
    image:
      "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=800&auto=format&fit=crop",
    href: "/services",
  },
];

export default function ServiceSection() {
  const containerRef = useRef<HTMLElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  // Ensure portal only renders on the client side to avoid Next.js hydration errors
  useEffect(() => {
    setMounted(true);
  }, []);

  const { contextSafe } = useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        // 1. CUSTOM CURSOR TRACKING
        const cursor = cursorRef.current;
        if (cursor) {
          gsap.set(cursor, {
            scale: 0,
            autoAlpha: 0,
            xPercent: -50,
            yPercent: -50,
          });

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

          const hideCursor = () =>
            gsap.to(cursor, {
              scale: 0,
              autoAlpha: 0,
              duration: 0.2,
              ease: "power3.inOut",
              overwrite: "auto",
            });

          let lastX = -1;
          let lastY = -1;

          const moveCursor = (e: MouseEvent) => {
            lastX = e.clientX;
            lastY = e.clientY;
            xTo(e.clientX);
            yTo(e.clientY);
            // Scrolling never fires mouseleave, so the follower can stay
            // "active" after the section scrolls away and then trail over
            // other sections on the next move (worst on Safari). Force-hide
            // it whenever the pointer isn't actually over this section.
            if (!containerRef.current?.contains(e.target as Node)) {
              hideCursor();
            }
          };

          // Scrolling with a stationary mouse fires neither mouseleave nor
          // mousemove, so the fixed pill would keep floating over whatever
          // section scrolls under the cursor. Scroll events are unreliable
          // here (Lenis drives the scroll, and pinned sections move via
          // transforms without any scroll event), so poll on GSAP's ticker
          // instead — it only does real work while the pill is visible.
          const guardTick = () => {
            const el = containerRef.current;
            if (!el || lastX < 0) return;
            if (parseFloat(cursor.style.opacity || "0") < 0.05) return;
            const r = el.getBoundingClientRect();
            if (
              lastX < r.left ||
              lastX > r.right ||
              lastY < r.top ||
              lastY > r.bottom
            ) {
              hideCursor();
            }
          };

          window.addEventListener("mousemove", moveCursor);
          gsap.ticker.add(guardTick);

          return () => {
            window.removeEventListener("mousemove", moveCursor);
            gsap.ticker.remove(guardTick);
          };
        }
      });

      return () => mm.revert();
    },
    { scope: containerRef, dependencies: [mounted] }, // Add mounted to dependencies so GSAP attaches after portal renders
  );

  const handleMouseEnter = contextSafe(() => {
    gsap.to(cursorRef.current, {
      scale: 1,
      autoAlpha: 1,
      duration: 0.4,
      ease: "back.out(1.5)",
    });
  });

  const handleMouseLeave = contextSafe(() => {
    gsap.to(cursorRef.current, {
      scale: 0,
      autoAlpha: 0,
      duration: 0.3,
      ease: "power3.inOut",
    });
  });

  return (
    <section
      ref={containerRef}
      onMouseLeave={handleMouseLeave}
      className="relative w-full overflow-hidden bg-black py-16 md:pt-32 md:pb-24 text-white"
    >
      <div className="w-full px-4 md:px-10">
        {/* HEADER SECTION */}
        <div className="mb-10 flex w-full flex-col-reverse items-start justify-between gap-8 pb-10 md:flex-row md:items-center">
          <div>
            <p className="mb-6 text-sm uppercase tracking-[0.3em] text-zinc-500 font-medium">
              What We Offer
            </p>
            <h2 className="text-5xl font-bold tracking-tight text-white md:text-[80px]">
              Our Services
            </h2>
          </div>
          <p className="max-w-lg text-xl font-light leading-[1.25em] text-white md:text-left">
            We merge strategic thinking with bold creative execution to deliver
            scalable digital experiences that elevate your brand
          </p>
        </div>

        {/* SERVICES LIST */}
        <div className="group/list flex w-full flex-col max-md:gap-4">
          {services.map((service, index) => (
            <a
              key={index}
              href={service.href}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="group relative flex w-full cursor-none items-center justify-between py-6 md:py-12 max-md:cursor-pointer max-md:rounded-2xl max-md:border max-md:border-white/10 max-md:bg-white/5 max-md:p-5 max-md:shadow-sm"
            >
              <div className="flex items-center">
                {/* IMAGE REVEAL CONTAINER */}
                <div
                  className={cn(
                    "relative h-[50px] shrink-0 overflow-hidden rounded-2xl opacity-0 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] md:h-[100px]",
                    "w-0 group-hover:mr-4 group-hover:w-[80px] group-hover:opacity-100 md:group-hover:mr-8 md:group-hover:w-[150px]",
                    "max-md:mr-4 max-md:w-[80px] max-md:opacity-100",
                  )}
                >
                  <img
                    src={service.image}
                    alt={service.title}
                    className="absolute inset-0 h-full w-full scale-110 object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-100"
                  />
                </div>

                {/* TITLE */}
                <h3
                  className={cn(
                    "text-3xl font-medium leading-none tracking-[-0.04em] transition-colors duration-500 sm:text-5xl md:text-[clamp(2.5rem,5vw,5rem)]",
                    "text-white group-hover/list:text-white/20 group-hover:!text-white",
                  )}
                >
                  {service.title}
                </h3>
              </div>

              {/* CUSTOM GRADIENT BORDER */}
              {index !== services.length - 1 && (
                <div
                  className={cn(
                    "absolute bottom-0 left-0 h-[1px] w-full transition-all duration-500",
                    "bg-white/10 group-hover:bg-transparent group-hover:bg-gradient-to-r group-hover:from-[#2E5BFF] group-hover:to-[#149CCB]",
                  )}
                />
              )}
            </a>
          ))}
        </div>
      </div>

      {/* CUSTOM CURSOR FOLLOWER - TELEPORTED TO DOCUMENT BODY */}
      {mounted && typeof document !== "undefined"
        ? createPortal(
            <div
              ref={cursorRef}
              className={cn(
                "pointer-events-none fixed left-0 top-0 z-[9999] hidden h-10 w-40 items-center justify-center rounded-lg bg-gradient-to-r from-[#2E5BFF] to-[#149CCB] text-white md:flex",
                // CSS-hidden by default so Safari never paints it before GSAP
                // applies the inline transform/opacity (autoAlpha overrides this).
                "invisible opacity-0",
                "will-change-transform",
              )}
            >
              <span className="mt-px ml-1 text-[0.65rem] font-bold uppercase tracking-[0.2em]">
                View Services
              </span>
              <MdKeyboardArrowRight />
            </div>,
            document.body,
          )
        : null}
    </section>
  );
}
