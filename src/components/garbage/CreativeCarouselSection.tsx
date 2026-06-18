"use client";

import Autoplay from "embla-carousel-autoplay";
import { Play } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

const slides = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=2000&auto=format&fit=crop",
    title: "LFW METAVERSE | Marketing",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2000&auto=format&fit=crop",
    title: "Creative Fashion Experience",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=2000&auto=format&fit=crop",
    title: "Future Mobility Showcase",
  },
];

export default function FashionCarouselSection() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  const plugin = useRef(
    Autoplay({
      delay: 4000,
      stopOnInteraction: false,
    }),
  );

  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <section className="overflow-hidden bg-white py-0">
      <div className="w-full">
        <Carousel
          setApi={setApi}
          plugins={[plugin.current]}
          opts={{
            align: "center",
            loop: true,
          }}
          className="w-full"
          onMouseEnter={() => plugin.current.stop()}
          onMouseLeave={() => plugin.current.play()}
        >
          <CarouselContent className="ml-0">
            {slides.map((slide, index) => {
              const isActive = current === index;

              return (
                <CarouselItem
                  key={slide.id}
                  className="pl-0 basis-[88%] md:basis-[82%] lg:basis-[78%]"
                >
                  <div
                    className={cn(
                      "relative overflow-hidden rounded-[40px] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
                      isActive
                        ? "scale-100 opacity-100"
                        : "scale-[0.92] opacity-40",
                    )}
                  >
                    <div className="relative h-[320px] md:h-[500px] w-full">
                      <Image
                        src={slide.image}
                        alt={slide.title}
                        fill
                        className="object-cover"
                        priority
                      />
                    </div>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
