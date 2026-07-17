"use client";

import AutoScroll from "embla-carousel-auto-scroll";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useCallback, useRef, useState } from "react";

import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
}

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

  // Position-linked parallax: the card row's horizontal offset tracks the
  // section's scroll progress directly (not scroll *velocity*), so it moves in
  // lockstep with the scroll — scrolling down drifts the cards one way,
  // scrolling up reverses — with no laggy velocity spring settling back to rest.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  // Over-width wrapper has a 7% edge buffer, so keep the ±6% travel under it.
  const xRaw = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"]);
  // Gentle spring smooths the pixel steps without the velocity-model lag.
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
          <div className="mb-12 flex flex-col items-start justify-between gap-6 px-6 md:mb-20 md:flex-row md:items-end">
            <div>
              <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-zinc-500">
                The Minds Behind the Craft
              </p>

              <h2 className="text-5xl font-bold tracking-tight text-zinc-900 md:text-6xl lg:text-6xl lg:leading-[1.05]">
                Meet Our{" "}
                <span className="bg-gradient-to-r from-[#2E5BFF] to-[#149CCB] bg-clip-text text-transparent">
                  Collective
                </span>
              </h2>
            </div>

            <div className="relative hidden gap-3 md:flex items-center min-w-24 min-h-12">
              <CarouselPrevious
                className="static translate-y-0 hover:bg-black hover:text-white hover:border-black transition-colors duration-300"
                onClick={handlePrev}
              />
              <CarouselNext
                className="static translate-y-0 hover:bg-black hover:text-white hover:border-black transition-colors duration-300"
                onClick={handleNext}
              />
            </div>
          </div>

          <motion.div style={{ x }} className="w-[114%] -ml-[7%]">
            <CarouselContent className="-ml-4 md:-ml-3">
              {[...teamMembers, ...teamMembers].map((member, index) => (
                <CarouselItem
                  key={`${member.id}-${index}`}
                  className="pl-4 md:pl-3 basis-[85%] sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                >
                  <div className="group relative aspect-[3/4] w-full overflow-hidden rounded-[2rem] bg-zinc-100 border border-zinc-200/60 shadow-xs transition-all duration-500 hover:shadow-xl hover:shadow-zinc-200/40">
                    <div className="absolute inset-x-0 bottom-0 z-0 h-40 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none" />

                    <div className="absolute inset-0 z-0 bg-black/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none" />

                    <div className="absolute bottom-0 inset-x-0 z-10 p-6 md:p-8 flex flex-col gap-1 bg-black/50 backdrop-blur-sm translate-y-4 opacity-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0 group-hover:opacity-100">
                      <h3 className="text-xl font-bold tracking-tight text-white transition-colors duration-300 md:text-2xl">
                        {member.name}
                      </h3>

                      <p className="text-xs font-bold uppercase tracking-wider text-zinc-300">
                        {member.role}
                      </p>
                    </div>

                    <img
                      src={member.image}
                      alt={member.name}
                      loading="lazy"
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
