"use client";

import ConnectButton from "../shared/ConnectButton";
import { ReactLenis } from "lenis/react";

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
      "https://images.unsplash.com/photo-1645658043538-fc2bb1702cfe?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGJyYW5kJTIwc3RyYXRlZ3l8ZW58MHx8MHx8fDA%3D",
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
      "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGJyYW5kJTIwc3RyYXRlZ3l8ZW58MHx8MHx8fDA%3D",
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
      "https://images.unsplash.com/photo-1587440871875-191322ee64b0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8VUklMkZVWHxlbnwwfHwwfHx8MA%3D%3D",
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
      "https://plus.unsplash.com/premium_photo-1683746792239-6ce8cdd3ac78?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGUlMjBjb21tZXJjZXxlbnwwfHwwfHx8MA%3D%3D",
  },
];

export default function SubServices() {
  return (
    <ReactLenis root>
      <section className="relative w-full bg-black text-white">
        {/* HEADER SECTION */}
        <div className="mx-auto flex w-full flex-col items-start justify-between gap-6 px-6 py-20 md:flex-row md:items-end lg:px-12">
          <div className="flex flex-col gap-5">
            <span className="text-xs font-medium uppercase tracking-[0.25em] text-white/60">
              What We Offer
            </span>
            <h2 className="text-4xl font-bold leading-[1.05] tracking-tight text-white md:text-5xl lg:text-[4.5rem]">
              Our{" "}
              <span className="bg-linear-to-r from-[#2E5BFF] to-[#149CCB] bg-clip-text text-transparent">
                Services
              </span>
            </h2>
          </div>
          <p className="max-w-2xl text-2xl font-light leading-[1.25em] text-white md:text-left">
            Delivering scalable, high-performance solutions that elevate brands
            and drive revenue.
          </p>
        </div>

        {/* STACKING CARDS WRAPPER */}
        <div className="relative w-full">
          {services.map((service, i) => (
            <Card key={i} i={i} {...service} />
          ))}

          {/* MAGIC TRICK: The Runway */}
          <div className="pointer-events-none h-[100vh] w-full" />
        </div>

        {/* CTA / NEXT SECTION */}
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
      className="sticky w-full"
      style={{
        // Pins the card exactly spaced by 130px to leave the previous titles showing
        top: `calc(5vh + ${i * 130}px)`,
        // Later cards stack on top; fixed desktop height keeps earlier cards from poking through
        zIndex: i,
      }}
    >
      <div
        className={`relative grid min-h-[50vh] w-full origin-top grid-cols-1 gap-12 overflow-hidden border-t border-white/10 ${color} px-6 pb-24 pt-12 md:h-[600px] md:min-h-0 md:grid-cols-2 md:gap-16 lg:px-12`}
      >
        {/* LEFT COLUMN: Title, Description & Tags */}
        <div className="flex w-full flex-col gap-8 pr-4">
          <a href={link} className="group inline-block">
            <h3 className="text-5xl font-medium tracking-tight text-white transition-colors group-hover:text-zinc-400 md:text-6xl lg:text-7xl">
              {title1}
              {title1 === "E" ? "-" : " "}
              {title2}
            </h3>
          </a>

          <p className="max-w-xl text-lg font-light leading-[1.4em] text-zinc-300 md:text-xl">
            {description}
          </p>

          {/* Tags Container */}
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-3 pt-2">
              {tags.map((tag: string, index: number) => (
                <span
                  key={index}
                  className="rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-sm font-medium tracking-wide text-zinc-300 transition-colors hover:bg-white/10"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: Image Container */}
        {/* Set to a fixed height: 350px on mobile, 450px on medium screens and up */}
        <div className="relative w-full h-[350px] md:h-[450px] overflow-hidden rounded-2xl bg-zinc-900/50">
          {image && (
            <img
              src={image}
              alt={`${title1} ${title2}`}
              className="h-full w-full object-cover opacity-80 transition-transform duration-500 hover:opacity-100"
            />
          )}
        </div>
      </div>
    </div>
  );
}
