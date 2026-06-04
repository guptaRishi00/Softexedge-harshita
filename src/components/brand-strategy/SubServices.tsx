"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import ConnectButton from "../shared/ConnectButton";

const services = [
  {
    title1: "Brand",
    title2: "Strategy",
    description:
      "We don't just design logos; we architect complete brand ecosystems. By diving deep into market research and consumer psychology, we craft compelling narratives, crystal-clear positioning, and robust foundational strategies that empower industry leaders to dominate their space and resonate profoundly with their target audience.",
    link: "/brand-strategy",
    image:
      "https://images.unsplash.com/photo-1703720074944-b60b730c7289?w=1200&auto=format&fit=crop&q=80",
  },
  {
    title1: "Digital",
    title2: "Products",
    description:
      "Our engineering and product teams collaborate to build immersive, high-performance digital experiences. From complex, enterprise-grade web applications to lightning-fast, scalable platforms, we leverage cutting-edge technologies to solve real business problems and deliver intuitive tools that users love.",
    link: "/services",
    image:
      "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=1200&auto=format&fit=crop&q=80",
  },
  {
    title1: "UI/UX",
    title2: "& Motion",
    description:
      "We bring digital interfaces to life through cinematic visual identities and purposeful motion design. By obsessing over user journeys, micro-interactions, and accessibility, we create frictionless, visually stunning experiences that not only look spectacular but also guide users effortlessly.",
    link: "/services",
    image:
      "https://images.unsplash.com/photo-1581287053822-fd7bf4f4bfec?w=1200&auto=format&fit=crop&q=80",
  },
  {
    title1: "E",
    title2: "Commerce",
    description:
      "We engineer high-converting online storefronts tailored specifically for the modern digital consumer. By optimizing the entire purchasing funnel—from product discovery to seamless checkout flows—we build robust e-commerce solutions that maximize average order value, reduce cart abandonment, and drive sustainable growth.",
    link: "/services",
    image:
      "https://images.unsplash.com/photo-1586880244406-556ebe35f282?w=1200&auto=format&fit=crop&q=80",
  },
];

export default function SubServices() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [activeImage, setActiveImage] = useState(0);

  return (
    <section className="relative w-full overflow-hidden bg-black py-16 text-white md:py-20 md:pt-30 lg:pb-35">
      <div className="mx-auto w-full px-6 md:px-6 lg:px-6">
        {/* HEADER SECTION */}
        <div className="mb-16 flex w-full flex-col items-start justify-between gap-6 pb-6 md:mb-35 md:flex-row md:items-end md:pb-0">
          <h2 className="text-4xl font-bold leading-[1.05] tracking-tight text-white md:text-5xl lg:text-[4.5rem]">
            Our{" "}
            <span className="bg-gradient-to-r from-[#2E5BFF] to-[#149CCB] bg-clip-text text-transparent">
              Services
            </span>
          </h2>
          <p className="max-w-xl text-xl font-medium leading-[1.25em] text-zinc-400 md:mb-2 md:text-left">
            Delivering scalable, high-performance solutions that elevate brands
            and drive revenue. Delivering scalable, high-performance solutions
            that elevate brands and drive revenue.
          </p>
        </div>

        {/* MAIN CONTENT LAYOUT */}
        <div className="grid w-full grid-cols-1 items-stretch gap-12 md:grid-cols-2 md:gap-16 lg:gap-24">
          {/* LEFT SIDE: IMAGE & DESCRIPTION */}
          <div className="order-2 flex h-full w-full min-h-[300px] flex-col md:order-1 md:min-h-[500px]">
            {/* Image Container */}
            <div className="relative h-full w-full flex-1 overflow-hidden rounded-xl bg-zinc-900">
              {services.map((service, index) => (
                <img
                  key={`img-${index}`}
                  src={service.image}
                  alt={service.title1}
                  className={cn(
                    "absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-in-out",
                    activeImage === index
                      ? "scale-100 opacity-100"
                      : "scale-105 opacity-0 pointer-events-none",
                  )}
                />
              ))}
              <div className="absolute inset-0 bg-black/20" />
            </div>

            {/* Description Container */}
            <div className="mt-6 min-h-[120px] md:mt-8">
              <p className="text-base font-medium leading-relaxed text-zinc-400 md:text-lg">
                {services[activeImage]?.description}
              </p>
            </div>
          </div>

          {/* RIGHT SIDE: SERVICES LIST */}
          <div
            className="group/list order-1 flex h-full w-full flex-col md:order-2"
            onMouseLeave={() => setActiveIndex(null)}
          >
            {services.map((service, index: any) => (
              <a
                key={`link-${index}`}
                href={service.link}
                onMouseEnter={() => {
                  setActiveIndex(index);
                  setActiveImage(index);
                }}
                className="group flex flex-1 w-full flex-col items-start justify-center gap-2 border-b border-white/30 py-6 transition-all duration-500 last:border-none hover:opacity-100! group-hover/list:opacity-30 md:py-8 lg:py-10"
              >
                <h3 className="flex w-full items-center text-3xl font-medium tracking-tight text-white sm:text-4xl md:text-4xl lg:text-5xl">
                  <span>
                    {service.title1}
                    {service.title1 === "E" ? "-" : " "}
                    {service.title2}
                  </span>
                </h3>
              </a>
            ))}
          </div>
        </div>

        {/* CTA / CONNECT BUTTON SECTION */}
        <div className="mt-16 flex w-full items-center justify-center gap-20 md:mt-24">
          <ConnectButton className="scale-110 md:scale-125" />
        </div>

        {/* NON-EDGE-TO-EDGE BOTTOM BORDER */}
        <div className="mt-16 w-full border-b border-white/10 md:mt-35" />
      </div>
    </section>
  );
}
