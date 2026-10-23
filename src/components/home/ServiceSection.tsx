"use client";

import { useGSAP } from "@gsap/react";
import { motion } from "framer-motion";
import gsap from "gsap";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { MdArrowOutward, MdKeyboardArrowRight } from "react-icons/md";
import { NO_ENTRY, useIsMobile } from "@/lib/useIsDesktop";
import { cn } from "@/lib/utils";

const premiumEase = [0.16, 1, 0.3, 1] as const;

// The four main services, in this order (2026-10-23). The other service
// pages (web, app, UI/UX, video) still exist; they are just not listed here.
const services = [
  {
    title: "Software & Product Engineering",
    image:
      "https://plus.unsplash.com/premium_photo-1685086785636-2a1a0e5b591f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8c29mdHdhcmV8ZW58MHx8MHx8fDA%3D",
    href: "/custom-software",
  },
  {
    title: "Digital Marketing & Growth",
    image:
      "https://images.unsplash.com/photo-1611926653458-09294b3142bf?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGRpZ2l0YWwlMjBtYXJrZXRpbmd8ZW58MHx8MHx8fDA%3D",
    href: "/digital-marketing",
  },
  {
    title: "Brand Strategy & Identity",
    image:
      "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?q=80&w=800&auto=format&fit=crop",
    href: "/brand-strategy",
  },
  {
    title: "AI & Automation",
    image:
      "https://plus.unsplash.com/premium_photo-1683120966127-14162cdd0935?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHNvZnR3YXJlfGVufDB8fDB8fHww",
    href: "/ai-marketing-automation",
  },
];

export default function ServiceSection() {
  const containerRef = useRef<HTMLElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  // Entry animations are desktop-only; below md they land instantly (NO_ENTRY).
  const isMobile = useIsMobile();

  useEffect(() => {
    setMounted(true);
  }, []);

  const { contextSafe } = useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
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

          // Started once and left to run: the guard below calls this every
          // tick, and re-issuing the tween each frame restarts its ease, so
          // the pill only crawled out.
          let hideTween: gsap.core.Tween | null = null;
          const hideCursor = () => {
            if (hideTween?.isActive()) return;
            hideTween = gsap.to(cursor, {
              scale: 0,
              autoAlpha: 0,
              duration: 0.2,
              ease: "power3.inOut",
              overwrite: "auto",
            });
          };

          let lastX = -1;
          let lastY = -1;

          const moveCursor = (e: MouseEvent) => {
            lastX = e.clientX;
            lastY = e.clientY;
            xTo(e.clientX);
            yTo(e.clientY);
            if (!containerRef.current?.contains(e.target as Node)) {
              hideCursor();
            }
          };

          // A bounds check is not enough here: this section stays pinned
          // (so its box still contains the pointer) while ContactSection
          // slides over it, and the pill kept floating over Contact. While it
          // is visible, check what is actually under the pointer and hide it
          // unless that is one of this section's service rows.
          const guardTick = () => {
            if (lastX < 0) return;
            if (parseFloat(cursor.style.opacity || "0") < 0.05) return;
            const hit = document
              .elementFromPoint(lastX, lastY)
              ?.closest("[data-cursor-target]");
            if (hit && containerRef.current?.contains(hit)) return;
            hideCursor();
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
      id="services"
      ref={containerRef}
      onMouseLeave={isMobile ? undefined : handleMouseLeave}
      className="relative w-full overflow-hidden bg-black pt-16 pb-10 max-md:pb-18 max-md:pt-20 md:pt-32 md:pb-32 text-white"
    >
      <div className="w-full px-4 max-md:px-3 md:px-10">
        <div className="mb-10 w-full pb-10 max-md:mb-5 max-md:pb-5">
          {/* flex-col-reverse puts the description above the title; on mobile the
              order should read title -> description, i.e. natural DOM order. */}
          <div className="flex w-full flex-col-reverse items-start justify-between gap-8 max-md:flex-col max-md:gap-10 md:flex-row md:items-center">
            <motion.h2
              data-no-mobile-entry
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={
                isMobile
                  ? NO_ENTRY
                  : { duration: 0.6, delay: 0.1, ease: premiumEase }
              }
              className="text-4xl font-bold tracking-tight text-white max-md:text-[2.5rem] md:text-[80px]"
            >
              Our{" "}
              <span className="bg-linear-to-r from-[#2E5BFF] to-[#149CCB] bg-clip-text text-transparent">
                Services
              </span>
            </motion.h2>
            <motion.p
              data-no-mobile-entry
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={
                isMobile
                  ? NO_ENTRY
                  : { duration: 0.6, delay: 0.2, ease: premiumEase }
              }
              className="max-w-2xl text-md max-md:text-lg lg:text-xl font-light leading-[1.25em] text-white md:text-left"
            >
              We merge strategic thinking with bold creative execution to
              deliver scalable digital experiences that elevate your brand
            </motion.p>
          </div>
        </div>

        <div className="group/list flex w-full flex-col">
          {services.map((service, index) => {
            return (
              <a
                key={index}
                href={service.href}
                // See ChannelCard: on iOS the synthesised hover pass on the
                // first tap animates the desktop cursor pill in, which makes
                // Safari swallow that tap's click. The pill is `hidden md:flex`,
                // so there is nothing to show on touch anyway.
                onMouseEnter={isMobile ? undefined : handleMouseEnter}
                onMouseLeave={isMobile ? undefined : handleMouseLeave}
                data-cursor-target
                className="group relative flex w-full cursor-none items-center justify-between py-9 md:py-12 max-md:cursor-pointer max-md:pr-11"
              >
                <div className="flex items-center">
                  <h3
                    className={cn(
                      "text-2xl font-medium leading-none tracking-[-0.04em] transition-colors duration-500 sm:text-5xl md:text-[clamp(2.5rem,5vw,5rem)]",
                      "text-white group-hover/list:text-white/20 group-hover:!text-white",
                    )}
                  >
                    <span
                      className={cn(
                        "relative inline-block h-[50px] align-middle overflow-hidden rounded-2xl opacity-0 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] md:h-[100px]",
                        "w-0 group-hover:mr-[0.1933em] group-hover:w-[80px] group-hover:opacity-100 md:group-hover:w-[150px]",

                        "max-md:hidden",
                      )}
                    >
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        // 150px at every width now: the mobile 100vw candidate only
                        // existed for the full-bleed card thumbnail, which is gone.
                        sizes="150px"
                        className="absolute inset-0 h-full w-full scale-110 object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-100"
                      />
                    </span>
                    {service.title}
                  </h3>
                </div>

                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute right-0 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center overflow-hidden rounded-full border border-[#2a2a2a] bg-[#080808] md:hidden"
                >
                  <svg width="0" height="0" className="absolute">
                    <title>Service arrow gradient</title>
                    <defs>
                      <linearGradient
                        id={`service-arrow-grad-${index}`}
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                      >
                        <stop stopColor="#2E5BFF" offset="0%" />
                        <stop stopColor="#149CCB" offset="100%" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <MdArrowOutward
                    className="h-4 w-4"
                    style={{ fill: `url(#service-arrow-grad-${index})` }}
                  />
                </div>

                {/* Every row draws its bottom rule at every breakpoint,
                    including the last — the list reads as fully framed rows. */}
                <div
                  className={cn(
                    "absolute bottom-0 left-0 h-[1px] w-full transition-all duration-500",
                    "bg-white/10 group-hover:bg-transparent group-hover:bg-gradient-to-r group-hover:from-[#2E5BFF] group-hover:to-[#149CCB]",
                  )}
                />
              </a>
            );
          })}
        </div>
      </div>

      {mounted && typeof document !== "undefined"
        ? createPortal(
            <div
              ref={cursorRef}
              className={cn(
                "pointer-events-none fixed left-0 top-0 z-[9999] hidden h-10 w-40 items-center justify-center rounded-lg bg-gradient-to-r from-[#2E5BFF] to-[#149CCB] text-white md:flex",
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
