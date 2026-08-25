"use client";

import { useMotionValueEvent, useScroll } from "framer-motion";
import { ReactLenis } from "lenis/react";
import { type ReactNode, useRef, useState } from "react";
import { useIsMobile } from "@/lib/useIsDesktop";
import Card, { STEP } from "./SubServiceCard";

const BASE_HEIGHT = 3330;
const EXTRA_TAIL = 400;
const POST_STACK_SCROLL = 450;

const CARD_MARGIN = "max(0px, 22vh - 190px)";
const STACK_HOLD = `max(0px, calc(${1170 + EXTRA_TAIL - POST_STACK_SCROLL}px + ${CARD_MARGIN} - 95vh))`;

export const SUBSERVICES_STICK_TOP = `calc(100vh - ${BASE_HEIGHT + EXTRA_TAIL}px - 4 * ${CARD_MARGIN})`;

const services = [
  {
    title1: "Brand",
    title2: "Strategy",
    description:
      "We don't just design logos; we architect complete brand ecosystems. By diving deep into market research and consumer psychology, we craft compelling narratives, crystal-clear positioning, and robust foundational strategies.",
    link: "/brand-strategy",
    color: "bg-black",
    tags: ["Market Research", "Positioning", "Visual Identity", "Messaging"],
    image:
      "https://plus.unsplash.com/premium_photo-1779749660854-baa8b5457d06?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzOXx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title1: "Digital",
    title2: "Products",
    description:
      "Our engineering and product teams collaborate to build immersive, high-performance digital experiences. From complex, enterprise-grade web applications to lightning-fast, scalable platforms.",
    link: "/custom-software",
    color: "bg-black",
    tags: ["Web Apps", "SaaS Platforms", "Architecture", "API Integration"],
    image:
      "https://images.unsplash.com/photo-1779896412280-cff477924a69?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1MHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title1: "UI/UX",
    title2: "& Motion",
    description:
      "We bring digital interfaces to life through cinematic visual identities and purposeful motion design. By obsessing over user journeys, micro-interactions, and accessibility, we create frictionless experiences.",
    link: "/ui-ux-design",
    color: "bg-black",
    tags: ["User Research", "Wireframing", "Prototyping", "Interaction Design"],
    image:
      "https://images.unsplash.com/photo-1773332585754-f1436987743b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw4NXx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title1: "E",
    title2: "Commerce",
    description:
      "We engineer high-converting online storefronts tailored specifically for the modern digital consumer. By optimizing the entire purchasing funnel, we build robust e-commerce solutions.",
    link: "/web-development",
    color: "bg-black",
    tags: ["Shopify Plus", "Custom Storefronts", "CRO", "Payment Gateways"],
    image:
      "https://images.unsplash.com/photo-1688561808434-886a6dd97b8c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZSUyMGNvbW1lcmNlfGVufDB8fDB8fHww",
  },
];

export default function SubServices({ children }: { children?: ReactNode }) {
  const container = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  // Non-markup prop gating only (the documented useIsMobile contract): below md
  // this component's desktop machinery must not run, but it must not change
  // what is rendered either.
  const isMobile = useIsMobile();
  // Mobile-only accordion state (the card ignores it from md up). Single-open,
  // all closed initially — same behaviour as career/OpenPositions.
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end start"],
  });

  useMotionValueEvent(scrollYProgress, "change", () => {
    // activeIndex only drives imageHidden, which the mobile classes override —
    // so below md this callback was 4 forced-layout reads per scroll frame for
    // nothing. That per-frame layout thrash on the scroll path is exactly what
    // reads as "laggy" on a phone.
    if (isMobile) return;
    let active = 0;
    for (let j = 0; j < services.length; j++) {
      const el = cardRefs.current[j];
      if (!el) continue;
      const pinTop = window.innerHeight * 0.05 + j * STEP;
      if (el.getBoundingClientRect().top <= pinTop + 2) active = j;
    }
    setActiveIndex((cur) => (cur === active ? cur : active));
  });

  const content = (
    <section className="relative w-full bg-black text-white">
      <div className="mx-auto w-full px-4 max-md:px-3 max-md:pt-20 max-md:pb-16 md:px-10 pt-30 pb-32">
        <span className="mb-5 block ml-[3px] text-xs font-medium uppercase tracking-[0.25em] text-white/60 max-md:tracking-[0.3em] max-md:text-zinc-500">
          What We Offer
        </span>

        <div className="flex w-full flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <h2 className="text-4xl font-bold leading-[1.05] tracking-tight text-white max-md:text-[2.5rem] max-md:leading-[1.11111] md:text-5xl lg:text-[4.5rem]">
            Our{" "}
            <span className="bg-linear-to-r from-[#2E5BFF] to-[#149CCB] bg-clip-text text-transparent">
              Services
            </span>
          </h2>
          <p className="max-w-2xl text-xl font-light leading-[1.25em] text-white max-md:text-lg md:text-left">
            Delivering scalable, high-performance solutions that elevate brands
            and drive revenue.
          </p>
        </div>
      </div>

      <div ref={container} className="group/cards relative w-full">
        {services.map((service, i) => (
          <Card
            key={i}
            i={i}
            imageHidden={activeIndex > i}
            registerRef={(el: HTMLDivElement | null) => {
              cardRefs.current[i] = el;
            }}
            open={openIndex === i}
            isLast={i === services.length - 1}
            onToggle={() => setOpenIndex((prev) => (prev === i ? null : i))}
            {...service}
          />
        ))}

        {children ? (
          <div className="relative z-40 w-full">{children}</div>
        ) : null}

        <div
          aria-hidden
          className="pointer-events-none w-full max-md:hidden"
          style={{ height: STACK_HOLD }}
        />
      </div>

      <div
        aria-hidden
        className="pointer-events-none w-full max-md:hidden"
        style={{
          height: `calc(${(services.length - 1) * STEP + EXTRA_TAIL}px - ${STACK_HOLD})`,
        }}
      />
    </section>
  );

  // Below md Lenis is not mounted AT ALL, rather than mounted with
  // autoRaf={false}. Stopping the rAF loop still left the instance
  // CONSTRUCTED: it kept the `lenis` class on <html> and kept its wheel,
  // touch, scroll and resize listeners attached — and on iOS those touch
  // listeners sit directly in the path of native momentum scrolling, which is
  // the "stucky" feel. Home's SmoothScroll already skips Lenis below md for
  // the same reason. `isMobile` is correct on the FIRST client render, so this
  // never remounts and the desktop tree is byte-identical to before.
  return isMobile ? content : <ReactLenis root>{content}</ReactLenis>;
}
