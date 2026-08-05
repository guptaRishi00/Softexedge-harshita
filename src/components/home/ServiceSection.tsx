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

const services = [
  {
    title: "Digital Marketing & Growth",
    image:
      "https://images.unsplash.com/photo-1611926653458-09294b3142bf?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGRpZ2l0YWwlMjBtYXJrZXRpbmd8ZW58MHx8MHx8fDA%3D",
    href: "/digital-marketing",
  },
  {
    title: "AI & Marketing Automation",
    image:
      "https://plus.unsplash.com/premium_photo-1683120966127-14162cdd0935?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHNvZnR3YXJlfGVufDB8fDB8fHww",
    href: "/ai-marketing-automation",
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
    href: "/app-development",
  },
  {
    title: "Custom Software & SaaS",
    image:
      "https://plus.unsplash.com/premium_photo-1685086785636-2a1a0e5b591f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8c29mdHdhcmV8ZW58MHx8MHx8fDA%3D",
    href: "/custom-software",
  },
  {
    title: "Brand Strategy & Identity",
    image:
      "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?q=80&w=800&auto=format&fit=crop",
    href: "/brand-strategy",
  },
  {
    title: "UI/UX Design",
    image:
      "https://images.unsplash.com/photo-1545235617-9465d2a55698?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dWl1eHxlbnwwfHwwfHx8MA%3D%3D",
    href: "/ui-ux-design",
  },
  {
    title: "Video Production",
    image:
      "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=800&auto=format&fit=crop",
    href: "/video-production",
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
            if (!containerRef.current?.contains(e.target as Node)) {
              hideCursor();
            }
          };

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
      id="services"
      ref={containerRef}
      onMouseLeave={handleMouseLeave}
      className="relative w-full overflow-hidden bg-black pt-16 pb-10 max-md:pb-16 max-md:pt-20 md:pt-32 md:pb-24 text-white"
    >
      <div className="w-full px-4 max-md:px-3 md:px-10">
        <div className="mb-10 w-full pb-10">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={
              isMobile ? NO_ENTRY : { duration: 0.6, ease: premiumEase }
            }
            className="mb-6 text-xs lg:text-sm uppercase tracking-[0.3em] text-zinc-500 font-medium max-md:mb-8"
          >
            What We Offer
          </motion.p>

          {/* flex-col-reverse puts the description above the title; on mobile the
              order should read tag -> title -> description, i.e. natural DOM order. */}
          <div className="flex w-full flex-col-reverse items-start justify-between gap-8 max-md:flex-col max-md:gap-10 md:flex-row md:items-center">
            <motion.h2
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
          {services.map((service, index) => (
            <a
              key={index}
              href={service.href}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="group relative flex w-full cursor-none items-center justify-between py-9 md:py-12 max-md:cursor-pointer max-md:pr-6"
            >
              <div className="flex items-center">
                <div
                  className={cn(
                    "relative h-[50px] shrink-0 overflow-hidden rounded-2xl opacity-0 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] md:h-[100px]",
                    "w-0 group-hover:mr-4 group-hover:w-[80px] group-hover:opacity-100 md:group-hover:mr-8 md:group-hover:w-[150px]",
                    // No thumbnail below md: it is a hover reveal, and touch has
                    // no hover, so the list shows titles only — desktop's
                    // resting state.
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
                </div>

                <h3
                  className={cn(
                    "text-3xl font-medium leading-none tracking-[-0.04em] transition-colors duration-500 sm:text-5xl md:text-[clamp(2.5rem,5vw,5rem)]",
                    "text-white group-hover/list:text-white/20 group-hover:!text-white",
                  )}
                >
                  {service.title}
                </h3>
              </div>

              {/* Touch has no hover, so the "View Services" cursor that signals
                  the affordance on desktop never appears — a small arrow pinned
                  to the row's top-right corner carries that signal instead. The
                  row reserves pr-6 below md — 24px clears the arrow's 20px band,
                  while pr-9 was wide enough to wrap the two longest titles onto
                  a second line. `right-0` resolves against the padding box, so
                  the arrow stays flush right regardless of that gutter. */}
              <MdArrowOutward
                aria-hidden="true"
                className="pointer-events-none absolute right-0 top-9 h-5 w-5 text-white/40 md:hidden"
              />

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
