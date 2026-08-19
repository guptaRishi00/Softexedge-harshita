"use client";

import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { ReactLenis } from "lenis/react";
import Image from "next/image";
import { type ReactNode, useRef, useState } from "react";

const premiumEase = [0.22, 1, 0.36, 1] as const;

const contentContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
} as const;

const contentItem = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: premiumEase },
  },
} as const;

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
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", () => {
    let active = 0;
    for (let j = 0; j < services.length; j++) {
      const el = cardRefs.current[j];
      if (!el) continue;
      const pinTop = window.innerHeight * 0.05 + j * 190;
      if (el.getBoundingClientRect().top <= pinTop + 2) active = j;
    }
    setActiveIndex((cur) => (cur === active ? cur : active));
  });

  return (
    <ReactLenis root>
      <section className="relative w-full bg-black text-white">
        <div className="mx-auto w-full px-4 md:px-10 pt-20 pb-32">
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
            <p className="max-w-2xl text-2xl font-light leading-[1.25em] text-white md:text-left">
              Delivering scalable, high-performance solutions that elevate
              brands and drive revenue.
            </p>
          </div>
        </div>

        <div ref={container} className="group/cards relative w-full">
          {services.map((service, i) => (
            <Card
              key={i}
              i={i}
              isLast={i === services.length - 1}
              imageHidden={activeIndex > i}
              registerRef={(el: HTMLDivElement | null) => {
                cardRefs.current[i] = el;
              }}
              {...service}
            />
          ))}

          {children ? (
            <div className="relative z-40 w-full">{children}</div>
          ) : (
            <div className="pointer-events-none h-[100vh] w-full" />
          )}
        </div>
      </section>
    </ReactLenis>
  );
}

function Card({
  i,
  isLast,
  imageHidden,
  registerRef,
  title1,
  title2,
  description,
  tags,
  link,
  color,
  image,
}: any) {
  return (
    <div
      ref={registerRef}
      className="sticky w-full mb-[22vh] max-md:static max-md:mb-0"
      style={{
        top: `calc(5vh + ${(isLast ? 0 : i) * 190}px)`,
        zIndex: i,
      }}
    >
      <div
        className={`relative grid ${isLast ? "min-h-[70vh] md:h-[780px]" : "min-h-[50vh] md:h-[600px]"} w-full origin-top grid-cols-1 gap-12 overflow-hidden border-t border-white/10 ${color} px-4 md:px-10 pb-24 pt-12 md:min-h-0 md:grid-cols-2 md:gap-16`}
      >
        <motion.div
          variants={contentContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-120px" }}
          className="flex w-full flex-col gap-12 md:gap-16 pr-4"
        >
          <motion.a
            variants={contentItem}
            href={link}
            className="group inline-block"
          >
            <h3 className="text-5xl font-medium tracking-tight text-white md:text-6xl lg:text-7xl">
              {title1}
              {title1 === "E" ? "-" : " "}
              {title2}
            </h3>
          </motion.a>

          <motion.p
            variants={contentItem}
            className="max-w-xl text-lg font-light leading-[1.4em] text-zinc-300 md:text-xl"
          >
            {description}
          </motion.p>

          {tags && tags.length > 0 && (
            <motion.div
              variants={contentItem}
              className="flex flex-wrap items-center gap-3 pt-4"
            >
              {tags.map((tag: string, index: number) => (
                <span
                  key={index}
                  className="rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-sm font-medium tracking-wide text-zinc-300 transition-colors hover:bg-white/10"
                >
                  {tag}
                </span>
              ))}
            </motion.div>
          )}
        </motion.div>

        <div className="relative w-full h-[350px] md:h-[450px] overflow-hidden rounded-2xl">
          {image && (
            <Image
              src={image}
              alt={`${title1} ${title2}`}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className={`h-full w-full object-cover transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                imageHidden ? "scale-105 opacity-0" : "scale-100 opacity-100"
              }`}
            />
          )}
        </div>
      </div>
    </div>
  );
}
