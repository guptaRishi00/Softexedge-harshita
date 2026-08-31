"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Fragment, useRef } from "react";
import CarouselDots from "@/components/ui/CarouselDots";
import { useInfiniteCarousel } from "@/lib/useInfiniteCarousel";
import { useIsDesktop } from "@/lib/useIsDesktop";

const processSteps = [
  {
    id: "01",
    title: "Discovery",
    description:
      "Deep-dive into your brand's DNA and technical requirements to define the blueprint.",
    image:
      "https://images.unsplash.com/photo-1773332598451-8a0a59941912?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwcm9maWxlLXBhZ2V8MjV8fHxlbnwwfHx8fHw%3D",
  },
  {
    id: "02",
    title: "Architecture",
    description:
      "Wireframing and UX logic focusing on conversion pathways and user intent.",
    image:
      "https://plus.unsplash.com/premium_photo-1723291331030-d6874d63e5bf?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDV8fGFzc2VtYmxlfGVufDB8fDB8fHww",
  },
  {
    id: "03",
    title: "Development",
    description:
      "High-performance engineering using Next.js and Tailwind for optimized delivery.",
    image:
      "https://images.unsplash.com/photo-1773332598413-a6d5279d1ae8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwcm9maWxlLXBhZ2V8MTl8fHxlbnwwfHx8fHw%3D",
  },
  {
    id: "04",
    title: "Deployment",
    description:
      "Rigorous testing followed by global CDN deployment for maximum speed.",
    image:
      "https://images.unsplash.com/photo-1773332611514-238856b76198?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwcm9maWxlLXBhZ2V8OXx8fGVufDB8fHx8fA%3D%3D",
  },
];

export default function ProcessSection() {
  // Below md the grid becomes a native scroll-snap carousel, same mechanics as
  // home/BlogSection: native scrolling runs on the compositor thread, so a
  // swipe never touches React. Only the dots re-render, and they own their own
  // listener.
  //
  // The track repeats the four steps three times so the loop is endless (the
  // hook parks in the middle run, leaving a full run of runway either way).
  // Tripling the cards does NOT triple the image cost: the three runs point at
  // the same four URLs, so the browser serves clones from cache — same four
  // downloads, twelve <img> elements.
  const scrollerRef = useRef<HTMLDivElement>(null);
  const isDesktop = useIsDesktop();

  useInfiniteCarousel(scrollerRef, processSteps.length, 3, !isDesktop);

  return (
    <section
      id="process"
      // `before:` top rule, mobile only: this is the closing line under the
      // last SubServices card. It lives here rather than on that card because
      // this section's wrapper (#process-overlap, z-20, bg-black,
      // max-md:-mt-px) paints over SubServices' final pixel row — a rule
      // drawn there is occluded and reads darker than its siblings. Same
      // token as those rules (inset-x-3, h-px, bg-white/10) so it matches.
      className="relative w-full bg-black font-sans pt-20 max-md:pb-24 md:pt-20 md:pb-30 max-md:before:absolute max-md:before:top-0 max-md:before:inset-x-3 max-md:before:h-px max-md:before:bg-white/10 max-md:before:content-['']"
    >
      <div className="mx-auto w-full px-4 max-md:px-3 md:px-10">
        <div className="mb-16 md:mb-35">
          <span className="mb-5 block ml-[3px] text-xs font-medium uppercase tracking-[0.25em] text-white/60 max-md:tracking-[0.3em] max-md:text-zinc-500">
            How We Work
          </span>

          <div className="flex w-full flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <motion.h2
              data-no-mobile-entry
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-4xl font-bold leading-none tracking-tighter text-white max-md:text-[2.5rem] max-md:leading-[1.11111] max-md:tracking-tight md:text-[5rem]"
            >
              Our{" "}
              <span className="bg-linear-to-r from-[#2E5BFF] to-[#149CCB] bg-clip-text pr-3 text-transparent">
                Process
              </span>
            </motion.h2>

            <motion.p
              data-no-mobile-entry
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="max-w-2xl text-xl font-light leading-[1.25em] text-white max-md:text-lg md:text-left"
            >
              A streamlined approach to turning complex challenges into elegant
              digital solutions, from initial concept to global scale. from
              initial concept to global scale.
            </motion.p>
          </div>

          <CarouselDots
            scrollerRef={scrollerRef}
            count={processSteps.length}
            loop
            className="mt-8 md:hidden"
          />
        </div>

        {/* -mx-3/px-3 below md: the container above is padded, so without this
            the track would be inset and the next card's peek would stop 12px
            short of the screen edge. Full-bleed scroller, cards still aligned
            to the same 12px gutter as the heading. */}
        <div
          ref={scrollerRef}
          className="no-scrollbar relative w-full max-md:-mx-3 max-md:w-auto max-md:snap-x max-md:snap-mandatory max-md:overflow-x-auto max-md:overscroll-x-contain max-md:scroll-pl-3 max-md:px-3"
        >
          <div className="grid grid-cols-1 gap-8 max-md:flex max-md:w-max max-md:flex-nowrap max-md:gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {/* Runs 1 and 2 are `md:hidden` clones: a display:none grid child
                creates no track, so the desktop grid is still exactly the four
                real steps in four columns. The gap lives on this flex track and
                applies uniformly between every pair, so all runs are
                pixel-identical and the wrap is invisible. */}
            {[0, 1, 2].map((run) => (
              <Fragment key={run}>
                {processSteps.map((step, index) => (
                  <motion.div
                    key={`${run}-${step.id}`}
                    aria-hidden={run !== 0 || undefined}
                    data-slide
                    data-no-mobile-entry
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.1,
                    }}
                    viewport={{ once: true }}
                    className={`group flex cursor-pointer flex-col max-md:relative max-md:h-[450px] max-md:w-[80vw] max-md:shrink-0 max-md:snap-start max-md:overflow-hidden max-md:rounded-[2.5rem] ${
                      run === 0 ? "" : "md:hidden"
                    }`}
                  >
                    {/* Below md this becomes career/ApplicationJourney's card: the
                    image fills the whole card, a scrim darkens the bottom, and
                    the copy is overlaid on it. Desktop keeps the stacked
                    image-above-text layout, so every override is max-md. */}
                    <div className="relative mb-6 flex aspect-[4/4.5] w-full items-center justify-center overflow-hidden rounded-[20px] bg-zinc-900 max-md:absolute max-md:inset-0 max-md:mb-0 max-md:aspect-auto max-md:rounded-none">
                      <Image
                        src={step.image}
                        alt={step.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                        className="absolute inset-0 h-full w-full object-cover opacity-80 transition-all duration-700 ease-in-out group-hover:scale-110 group-hover:opacity-100 max-md:opacity-100"
                      />

                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent md:hidden" />
                    </div>

                    <div className="flex flex-grow flex-col max-md:absolute max-md:inset-0 max-md:z-10 max-md:justify-end max-md:p-8 max-md:py-11">
                      <h3 className="mb-2 text-xl max-md:mb-3 max-md:text-2xl font-extrabold max-md:font-medium tracking-tight text-white">
                        {step.title}
                      </h3>

                      <p className="mb-6 text-[15px] max-md:mb-0 max-md:text-base font-regular leading-[1.5em] max-md:leading-[1.25em] text-zinc-400 max-md:text-white/80">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </Fragment>
            ))}
          </div>
        </div>

        <div className="mt-16 w-full border-b border-white/10 max-md:hidden md:-mx-6 md:mt-30 md:w-[calc(100%_+_3rem)]" />
      </div>
    </section>
  );
}
