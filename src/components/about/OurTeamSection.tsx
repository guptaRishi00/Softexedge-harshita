"use client";

import AutoScroll from "embla-carousel-auto-scroll";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
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

  // Scroll-velocity shift: the card row lurches horizontally in the scroll
  // direction (and springs back to rest), echoing the scroll like a parallax.
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 30,
    stiffness: 120,
    mass: 0.7,
  });
  // Looser spring + wider travel so the row glides horizontally with scroll
  // instead of snapping back (felt "stuck"). Over-width wrapper has a 7% edge
  // buffer, so keep the ±6% shift under it. Narrower input range = reaches full
  // travel at lower scroll speed (more responsive).
  const x = useTransform(smoothVelocity, [-1500, 1500], ["6%", "-6%"], {
    clamp: true,
  });

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
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-zinc-500">
                The Minds Behind the Craft
              </p>

              <h2 className="text-5xl font-bold tracking-tight text-zinc-900 md:text-6xl lg:text-[4.5rem] lg:leading-[1.05]">
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
