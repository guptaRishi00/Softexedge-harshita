"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ConnectButton from "../shared/ConnectButton";
import { ReactLenis } from "lenis/react";

const services = [
  {
    title1: "Brand",
    title2: "Strategy",
    description:
      "We don't just design logos; we architect complete brand ecosystems. By diving deep into market research and consumer psychology, we craft compelling narratives, crystal-clear positioning, and robust foundational strategies.",
    link: "/brand-strategy",
    color: "bg-[#100F0F]",
    tags: ["Market Research", "Positioning", "Visual Identity", "Messaging"],
  },
  {
    title1: "Digital",
    title2: "Products",
    description:
      "Our engineering and product teams collaborate to build immersive, high-performance digital experiences. From complex, enterprise-grade web applications to lightning-fast, scalable platforms.",
    link: "/services",
    color: "bg-[#100F0F]",
    tags: ["Web Apps", "SaaS Platforms", "Architecture", "API Integration"],
  },
  {
    title1: "UI/UX",
    title2: "& Motion",
    description:
      "We bring digital interfaces to life through cinematic visual identities and purposeful motion design. By obsessing over user journeys, micro-interactions, and accessibility, we create frictionless experiences.",
    link: "/services",
    color: "bg-[#100F0F]",
    tags: ["User Research", "Wireframing", "Prototyping", "Interaction Design"],
  },
  {
    title1: "E",
    title2: "Commerce",
    description:
      "We engineer high-converting online storefronts tailored specifically for the modern digital consumer. By optimizing the entire purchasing funnel, we build robust e-commerce solutions.",
    link: "/services",
    color: "bg-[#100F0F]",
    tags: ["Shopify Plus", "Custom Storefronts", "CRO", "Payment Gateways"],
  },
];

export default function SubServices() {
  const container = useRef(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  return (
    <ReactLenis root>
      <section className="relative w-full bg-black text-white">
        {/* HEADER SECTION */}
        <div className="mx-auto flex w-full flex-col items-start justify-between gap-6 px-6 py-20 md:flex-row md:items-start lg:px-12">
          <h2 className="text-4xl font-bold leading-[1.05] tracking-tight text-white md:text-5xl lg:text-[4.5rem]">
            Our{" "}
            <span className="bg-gradient-to-r from-[#2E5BFF] to-[#149CCB] bg-clip-text text-transparent">
              Services
            </span>
          </h2>
          <p className="max-w-2xl text-2xl font-light leading-[1.25em] text-white md:text-left">
            Delivering scalable, high-performance solutions that elevate brands
            and drive revenue.
          </p>
        </div>

        {/* STACKING CARDS WRAPPER */}
        <div ref={container} className="relative w-full">
          {services.map((service, i) => (
            <Card
              key={i}
              i={i}
              totalCards={services.length}
              {...service}
              progress={scrollYProgress}
              range={[i * 0.25, 1]}
            />
          ))}

          {/* MAGIC TRICK: The Runway */}
          {/* This gives the user space to scroll so the final card stays stuck on screen for a moment. As the user scrolls down this empty space, the black CTA section smoothly slides UP over the stuck cards, hiding the exit mechanics perfectly. */}
          <div className="pointer-events-none h-[100vh] w-full" />
        </div>

        {/* CTA / NEXT SECTION */}
        {/* This must have a higher z-index and solid background to act as the "curtain" sliding over the stack */}
        <div className="relative z-50 flex min-h-[70vh] w-full flex-col items-center justify-center gap-16 bg-black px-6 shadow-lg:px-12">
          <ConnectButton className="scale-110 md:scale-125" />
          <div className="mt-16 w-full border-b border-white/10" />
        </div>
      </section>
    </ReactLenis>
  );
}

// --- ISOLATED CARD COMPONENT ---
function Card({
  i,
  totalCards,
  title1,
  title2,
  description,
  tags,
  link,
  color,
  progress,
  range,
}: any) {
  // If it is the last card in the array, it NEVER fades out.
  const isLastCard = i === totalCards - 1;
  const targetOpacity = isLastCard ? 1 : 0.4;

  const opacity = useTransform(progress, range, [1, targetOpacity]);

  return (
    <div
      className="sticky w-full"
      style={{
        // Pins the card exactly spaced by 130px to leave the previous titles showing
        top: `calc(5vh + ${i * 130}px)`,
      }}
    >
      <motion.div
        style={{ opacity }}
        // The cards sit perfectly flush in the document flow, no margins/gaps
        className={`relative flex min-h-[50vh] w-full origin-top flex-col justify-center gap-8 border-t border-white/10 ${color} px-6 pb-24 pt-12 md:flex-row md:items-start md:justify-between md:gap-16 lg:px-12`}
      >
        {/* Title */}
        <div className="w-full md:w-1/2">
          <a href={link} className="group inline-block">
            <h3 className="text-5xl font-medium tracking-tight text-white transition-colors group-hover:text-zinc-400 md:text-6xl lg:text-7xl">
              {title1}
              {title1 === "E" ? "-" : " "}
              {title2}
            </h3>
          </a>
        </div>

        {/* Description & Tags */}
        <div className="flex w-full flex-col gap-8 md:w-1/2">
          <p className="max-w-3xl text-lg font-light leading-[1.3em] text-white md:text-xl lg:text-2xl">
            {description}
          </p>

          {/* Tags Container */}
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-3">
              {tags.map((tag: string, index: number) => (
                <div
                  key={index}
                  // The wrapper uses p-[1px] to create the border size, and applies the requested gradient.
                  className="rounded-full bg-gradient-to-r from-[#2E5BFF] to-[#149CCB] p-[1px]"
                >
                  <span
                    // The inner span dynamically grabs the specific card's background color so it visually blends into the card
                    className={`block rounded-full ${color} px-4 py-1.5 text-sm font-medium tracking-wide text-zinc-300 transition-all hover:brightness-125`}
                  >
                    {tag}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
