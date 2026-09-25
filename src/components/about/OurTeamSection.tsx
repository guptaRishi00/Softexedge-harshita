"use client";

import AutoScroll from "embla-carousel-auto-scroll";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { MdArrowBack, MdArrowForward } from "react-icons/md";

import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
}

const premiumEase = [0.16, 1, 0.3, 1] as const;

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Alex Rivera",
    role: "Lead Product Designer",
    image:
      "https://plus.unsplash.com/premium_photo-1727942418440-d085b3b5f065?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDM2fHRvd0paRnNrcEdnfHxlbnwwfHx8fHw%3D",
  },
  {
    id: 2,
    name: "Sarah Chen",
    role: "Sr. Backend Engineer",
    image:
      "https://images.unsplash.com/photo-1779406970957-71df0abe57f8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDYwfHRvd0paRnNrcEdnfHxlbnwwfHx8fHw%3D",
  },
  {
    id: 3,
    name: "Marcus Vance",
    role: "Creative Director",
    image:
      "https://images.unsplash.com/photo-1779912217721-a3cc453ae9d6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDExfHRvd0paRnNrcEdnfHxlbnwwfHx8fHw%3D",
  },
  {
    id: 4,
    name: "Sophia Lin",
    role: "Technical Architect",
    image:
      "https://images.unsplash.com/photo-1778991044742-993ad3f21f19?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDcyfHRvd0paRnNrcEdnfHxlbnwwfHx8fHw%3D",
  },
  {
    id: 5,
    name: "Daniel Reeves",
    role: "Motion Specialist",
    image:
      "https://images.unsplash.com/photo-1777892530292-64bd31592278?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDc2fHRvd0paRnNrcEdnfHxlbnwwfHx8fHw%3D",
  },
];

export default function OurTeamSection() {
  const [api, setApi] = useState<CarouselApi>();
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const xRaw = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"]);
  const xSmooth = useSpring(xRaw, {
    stiffness: 90,
    damping: 22,
    mass: 0.4,
  });
  const x = reduce ? "0%" : xSmooth;

  const autoScroll = useRef(
    AutoScroll({
      speed: 1.2,
      direction: "backward",
      playOnInit: true,
      stopOnInteraction: false,
      stopOnMouseEnter: false,
    }),
  );

  const handlePrev = useCallback(() => {
    if (!api) return;
    const autoScrollPlugin = api.plugins().autoScroll;
    if (autoScrollPlugin) autoScrollPlugin.stop();
    api.scrollPrev();
  }, [api]);

  // Embla reports the raw slide index across BOTH copies of the list; fold it
  // back so five members map to five dots.
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    if (!api) return;
    const sync = () =>
      setSelected(api.selectedScrollSnap() % teamMembers.length);
    sync();
    api.on("select", sync);
    api.on("reInit", sync);
    return () => {
      api.off("select", sync);
      api.off("reInit", sync);
    };
  }, [api]);

  const scrollToMember = useCallback(
    (index: number) => {
      if (!api) return;
      // Same courtesy the arrows extend: a deliberate jump should not be
      // fought by the autoplay a frame later.
      const autoScrollPlugin = api.plugins().autoScroll;
      if (autoScrollPlugin) autoScrollPlugin.stop();
      api.scrollTo(index);
    },
    [api],
  );

  const handleNext = useCallback(() => {
    if (!api) return;
    const autoScrollPlugin = api.plugins().autoScroll;
    if (autoScrollPlugin) autoScrollPlugin.stop();
    api.scrollNext();
  }, [api]);

  return (
    <section
      ref={sectionRef}
      id="team"
      className="w-full bg-white py-12 text-zinc-900 md:py-20 overflow-hidden"
    >
      <div className="mx-auto w-full">
        <Carousel
          setApi={setApi}
          opts={{
            align: "start",
            loop: true,
            dragFree: true,
          }}
          plugins={[autoScroll.current]}
          className="w-full"
        >
          <div className="mb-12 flex flex-col items-start justify-between gap-6 px-4 max-md:mb-8 max-md:px-3 md:px-10 md:mb-20 md:flex-row md:items-end">
            <div className="mb-3">
              <motion.p
                data-no-mobile-entry
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, ease: premiumEase }}
                className="mb-4 max-md:mb-6 text-sm font-medium uppercase tracking-[0.3em] text-zinc-500 max-md:text-xs"
              >
                The Minds Behind the Craft
              </motion.p>

              <motion.h2
                data-no-mobile-entry
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: 0.1, ease: premiumEase }}
                className="text-5xl font-bold tracking-tight text-zinc-900 max-md:text-[2.5rem] max-md:leading-[1.11] md:text-6xl lg:text-6xl lg:leading-[1.05]"
              >
                Meet Our{" "}
                <span className="bg-gradient-to-r from-[#2E5BFF] to-[#149CCB] bg-clip-text text-transparent">
                  Collective
                </span>
              </motion.h2>
            </div>

            <div className="relative flex gap-4 items-center min-w-24 min-h-12 max-md:hidden">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous team members"
                className="flex h-12 w-12 max-md:h-10 max-md:w-10 items-center justify-center rounded-full border border-zinc-300 text-zinc-900 transition-colors hover:bg-zinc-900 hover:text-white"
              >
                <MdArrowBack className="h-5 w-5 max-md:h-4 max-md:w-4" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next team members"
                className="flex h-12 w-12 max-md:h-10 max-md:w-10 items-center justify-center rounded-full border border-zinc-300 text-zinc-900 transition-colors hover:bg-zinc-900 hover:text-white"
              >
                <MdArrowForward className="h-5 w-5 max-md:h-4 max-md:w-4" />
              </button>
            </div>

            {/* Mobile pagination, in the slot the desktop arrows occupy.
                Driven by the embla api rather than the shared CarouselDots:
                that component measures a native scroll container's scrollLeft
                and `[data-slide]` stride, which this embla carousel does not
                have. The track renders two copies of the list, so the snap
                index is folded back into one run for the dot count. */}
            <div className="flex items-center gap-2 md:hidden">
              {teamMembers.map((member, i) => (
                <button
                  key={member.id}
                  type="button"
                  aria-label={`Show ${member.name}`}
                  aria-current={i === selected}
                  onClick={() => scrollToMember(i)}
                  className="-mx-[9px] -my-[19px] flex h-11 items-center px-[9px]"
                >
                  <span
                    className={`block h-1.5 rounded-full transition-all duration-300 ${
                      i === selected
                      ? "w-6 bg-gradient-to-r from-[#2E5BFF] to-[#149CCB]"
                      : "w-1.5 bg-zinc-300"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* The scroll parallax translates this wrapper by +/-6%. Desktop absorbs
              the travel inside the 114%-wide / -7%-margin overhang; mobile is
              w-full with no overhang, so the same translate exposed a gap equal
              to the shift -- left edge at the top of the travel, right edge at
              the bottom. transform-none! outranks framer's inline transform and
              holds from first paint, so no hydration gate is needed. */}
          <motion.div
            style={{ x }}
            className="w-[114%] -ml-[7%] max-md:w-full max-md:ml-0 max-md:transform-none!"
          >
            <CarouselContent className="-ml-4 md:-ml-3">
              {[...teamMembers, ...teamMembers].map((member, index) => (
                <CarouselItem
                  key={`${member.id}-${index}`}
                  className="pl-4 md:pl-3 basis-[85%] max-md:basis-[calc(100vw-4.5rem)] sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                >
                  <div className="group relative aspect-[3/4] w-full overflow-hidden rounded-[2rem] max-md:rounded-3xl bg-zinc-100 border border-zinc-200/60 shadow-xs transition-all duration-500 hover:shadow-xl hover:shadow-zinc-200/40">
                    <div className="absolute inset-x-0 bottom-0 z-0 h-40 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 max-md:opacity-100 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none" />

                    <div className="absolute inset-0 z-0 bg-black/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none" />

                    <div className="absolute bottom-0 inset-x-0 z-10 p-6 md:p-8 flex flex-col gap-1 bg-black/50 backdrop-blur-sm max-md:backdrop-blur-none translate-y-4 opacity-0 max-md:translate-y-0 max-md:opacity-100 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0 group-hover:opacity-100">
                      <h3 className="text-xl font-bold tracking-tight text-white transition-colors duration-300 md:text-2xl">
                        {member.name}
                      </h3>

                      <p className="w-fit bg-gradient-to-r from-[#2E5BFF] to-[#149CCB] bg-clip-text text-xs font-bold uppercase tracking-wider text-transparent">
                        {member.role}
                      </p>
                    </div>

                    {/* Eager, not lazy: AutoScroll runs `direction: "backward"`,
                        so cards enter the viewport from the LEFT on a continuous
                        transform. Browser lazy-loading tracks transform movement
                        poorly (Safari worst), so a card became visible before
                        its image started loading — blank card, then pop-in, at
                        the left edge. The track renders two copies of a 5-member
                        list, so all 10 cards resolve to 5 files. */}
                    <Image
                      src={member.image}
                      alt={member.name}
                      loading="eager"
                      fill
                      sizes="(max-width: 640px) 85vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] "
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </motion.div>
        </Carousel>
      </div>
    </section>
  );
}
