"use client";

import { useMotionValueEvent, useScroll } from "framer-motion";
import { ReactLenis } from "lenis/react";
import { type ReactNode, useRef, useState } from "react";
import Card, { STEP } from "./SubServiceCard";

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
    link: "/services",
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
    link: "/services",
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
    link: "/services",
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

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end start"],
  });

  useMotionValueEvent(scrollYProgress, "change", () => {
    let active = 0;
    for (let j = 0; j < services.length; j++) {
      const el = cardRefs.current[j];
      if (!el) continue;
      const pinTop = window.innerHeight * 0.05 + j * STEP;
      if (el.getBoundingClientRect().top <= pinTop + 2) active = j;
    }
    setActiveIndex((cur) => (cur === active ? cur : active));
  });

  return (
    <ReactLenis root>
      <section className="relative w-full bg-black text-white">
        {/* HEADER SECTION */}
        <div className="mx-auto w-full px-4 md:px-10 pt-30 pb-32">
          <span className="mb-5 block ml-[3px] text-xs font-medium uppercase tracking-[0.25em] text-white/60">
            What We Offer
          </span>

          <div className="flex w-full flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <h2 className="text-4xl font-bold leading-[1.05] tracking-tight text-white md:text-5xl lg:text-[4.5rem]">
              Our{" "}
              <span className="bg-linear-to-r from-[#2E5BFF] to-[#149CCB] bg-clip-text text-transparent">
                Services
              </span>
            </h2>
            <p className="max-w-2xl text-xl font-light leading-[1.25em] text-white md:text-left">
              Delivering scalable, high-performance solutions that elevate
              brands and drive revenue.
            </p>
          </div>
        </div>

        {/* STACKING CARDS WRAPPER */}
        <div ref={container} className="group/cards relative w-full">
          {services.map((service, i) => (
            <Card
              key={i}
              i={i}
              imageHidden={activeIndex > i}
              registerRef={(el: HTMLDivElement | null) => {
                cardRefs.current[i] = el;
              }}
              {...service}
            />
          ))}

          {/* OVERLAP SLOT — a section passed as children lives INSIDE the
              sticky container and scrolls up over the still-pinned last card
              (z-40 sits above the cards' z 0–3). Nothing is rendered without
              children: the container ends with the last card, so once the
              stack is complete it immediately scrolls away rather than
              holding through a runway spacer. */}
          {children ? (
            <div className="relative z-40 w-full">{children}</div>
          ) : null}
        </div>

        {/* TRANSFORM RESERVE — the last card is PAINTED (services.length-1)
            STEPs below its layout box by its translateY, and a transform
            reserves no layout space. Without this the card spills over the
            section that follows. Sits OUTSIDE the sticky container so it does
            not extend the cards' containing block and delay their release. */}
        <div
          aria-hidden
          className="pointer-events-none w-full"
          style={{ height: (services.length - 1) * STEP }}
        />
      </section>
    </ReactLenis>
  );
}
