"use client";

import { motion } from "framer-motion";
import { useRef, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const testimonials = [
  {
    quote:
      "SoftEXedge gives you the tools and the trust to build things you didn't think were possible at scale.",
    name: "Alex Rivera",
    role: "Lead Product Designer",
    initials: "AR",
  },
  {
    quote:
      "The level of technical excellence here is unmatched. Every day is an opportunity to learn something complex.",
    name: "Sarah Chen",
    role: "Sr. Backend Engineer",
    initials: "SC",
  },
  {
    quote:
      "They transformed a simple product into something people genuinely remember. The experience felt cinematic.",
    name: "Sophia Lin",
    role: "Creative Director",
    initials: "SL",
  },
  {
    quote:
      "Rare combination of strong engineering and elite visual storytelling. The interface felt alive.",
    name: "Daniel Reeves",
    role: "CEO · Aether AI",
    initials: "DR",
  },
];

export default function ExperimentalTestimonials() {
  const [api, setApi] = useState<CarouselApi>();
  const plugin = useRef(Autoplay({ delay: 3500, stopOnInteraction: true }));

  return (
    <section className="relative overflow-hidden bg-[#f8f9fa] py-20 text-black md:py-32">
      <div className="mx-auto flex w-full max-w-[90rem] flex-col gap-12 px-10 lg:flex-row lg:items-start lg:gap-20">
        {/* LEFT COLUMN: Title & Navigation */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: "-50px" }}
          // Added justify-between and matched the height to the carousel (600px) on large screens
          className="flex w-full flex-col justify-between lg:sticky lg:top-32 lg:h-[600px] lg:w-2/5 lg:shrink-0"
        >
          {/* TOP CONTENT */}
          <div>
            <h2 className="text-5xl font-bold tracking-tight md:text-6xl lg:text-[4rem] lg:leading-[1.1]">
              Voices of the <br />
              <span className="text-[#3445E7]">Collective</span>
            </h2>

            <p className="mt-6 max-w-md text-lg leading-relaxed text-zinc-500">
              Don't just take our word for it. Hear from the visionaries
              building our future every day.
            </p>
          </div>

          {/* BOTTOM CONTENT: Navigation Arrows */}
          <div className="mt-10 flex items-center gap-4 lg:mt-0">
            <button
              onClick={() => api?.scrollPrev()}
              className="group flex h-14 w-14 items-center justify-center rounded-full border border-zinc-200 bg-white text-black transition-all hover:border-black hover:bg-black hover:text-white active:scale-95"
              aria-label="Previous Testimonial"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-transform group-hover:-translate-y-1"
              >
                <path d="m18 15-6-6-6 6" />
              </svg>
            </button>
            <button
              onClick={() => api?.scrollNext()}
              className="group flex h-14 w-14 items-center justify-center rounded-full border border-zinc-200 bg-white text-black transition-all hover:border-black hover:bg-black hover:text-white active:scale-95"
              aria-label="Next Testimonial"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-transform group-hover:translate-y-1"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>
          </div>
        </motion.div>

        {/* RIGHT COLUMN: Vertical Carousel */}
        <div className="relative w-full lg:w-3/5">
          {/* Fade Masks for seamless vertical scrolling illusion */}
          <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-24 bg-gradient-to-b from-[#f8f9fa] to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-24 bg-gradient-to-t from-[#f8f9fa] to-transparent" />

          <Carousel
            setApi={setApi}
            orientation="vertical"
            plugins={[plugin.current]}
            opts={{
              loop: true,
              align: "start",
            }}
            className="h-[500px] w-full md:h-[600px] cursor-grab active:cursor-grabbing"
            onMouseEnter={() => plugin.current.stop()}
            onMouseLeave={() => plugin.current.play()}
          >
            <CarouselContent className="-mt-4 h-[500px] md:h-[600px]">
              {testimonials.map((item, index) => (
                <CarouselItem
                  key={index}
                  className="pt-4 md:basis-[60%] lg:basis-[55%]"
                >
                  <div className="group relative flex h-full w-full flex-col justify-between rounded-[2rem] border border-zinc-200 bg-white p-8 shadow-sm transition-all hover:shadow-xl hover:shadow-black/5 md:p-10">
                    {/* Outlined Quote Icon (Top Right) */}
                    <div className="absolute right-8 top-8 text-zinc-200 transition-colors group-hover:text-zinc-300">
                      <svg
                        width="48"
                        height="48"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
                        <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
                      </svg>
                    </div>

                    {/* Quote Text */}
                    <p className="relative z-10 mt-6 max-w-[90%] text-xl font-medium leading-relaxed tracking-tight text-zinc-900 md:text-2xl">
                      "{item.quote}"
                    </p>

                    {/* Bottom Profile */}
                    <div className="mt-12 flex items-center gap-4">
                      {/* Avatar Placeholder */}
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-sm font-bold text-zinc-500">
                        {item.initials}
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-zinc-900">
                          {item.name}
                        </h4>
                        <p className="mt-0.5 text-xs font-bold uppercase tracking-wider text-[#3445E7]">
                          {item.role}
                        </p>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </section>
  );
}
