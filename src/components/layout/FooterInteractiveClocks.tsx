"use client";

import AutoScroll from "embla-carousel-auto-scroll";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

/**
 * The Footer's interactive clock strip, extracted per the audit's Step 3.
 *
 * Everything that made the clocks client-only lives here now: the shared 1s
 * tick behind `useSyncExternalStore`, the four `Intl.DateTimeFormat` instances,
 * the embla + AutoScroll marquee and the IntersectionObserver that parks it
 * offscreen. Footer keeps only the markup around it.
 *
 * Straight about the limit: this does NOT make Footer a Server Component. Its
 * body is full of framer `whileInView` entrance animations and `useIsMobile()`
 * gating, which are client-only for reasons unrelated to the clocks. The win
 * is a smaller, self-contained interactive leaf, not a server-rendered footer.
 */

const timeFormatters: Record<string, Intl.DateTimeFormat> = {
  "America/Toronto": new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: "America/Toronto",
    hour12: true,
  }),
  "Asia/Tokyo": new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: "Asia/Tokyo",
    hour12: true,
  }),
  "Europe/London": new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: "Europe/London",
    hour12: true,
  }),
  "Europe/Paris": new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: "Europe/Paris",
    hour12: true,
  }),
};

// One interval shared by every clock rather than one each: independent timers
// drift, so two clocks could straddle a second boundary and show different
// times. Subscribers get the same snapshot, and only these leaves re-render.
let sharedNow: Date | null = null;
let sharedTimer: ReturnType<typeof setInterval> | null = null;
const tickListeners = new Set<() => void>();

const subscribeToTick = (onTick: () => void) => {
  tickListeners.add(onTick);
  if (!sharedTimer) {
    sharedNow = new Date();
    sharedTimer = setInterval(() => {
      sharedNow = new Date();
      for (const listener of tickListeners) listener();
    }, 1000);
  }
  return () => {
    tickListeners.delete(onTick);
    if (tickListeners.size === 0 && sharedTimer) {
      clearInterval(sharedTimer);
      sharedTimer = null;
    }
  };
};

const getTick = () => sharedNow;
const getServerTick = () => null;

// DOM order, which is the order the desktop grid renders in. The old markup
// also carried `max-md:order-*` (1,3,2,4) to re-sequence the two-column mobile
// grid; that grid is gone, so the override goes with it and the carousel simply
// follows this list.
const offices = [
  { city: "Toronto", timeZone: "America/Toronto" },
  { city: "Tokyo", timeZone: "Asia/Tokyo" },
  { city: "London", timeZone: "Europe/London" },
  { city: "Paris", timeZone: "Europe/Paris" },
];

function OfficeClock({ city, timeZone }: { city: string; timeZone: string }) {
  return (
    <div className="flex flex-col items-start gap-3">
      <div className="flex items-center gap-2">
        <span className="block h-1.5 w-1.5 rounded-full bg-white" />
        <span className="bg-linear-to-r from-[#2E5BFF] to-[#149CCB] bg-clip-text font-black leading-none text-transparent">
          {city}
        </span>
      </div>
      <div className="tabular-nums text-white/40">
        <LocalTime timeZone={timeZone} />
      </div>
    </div>
  );
}

function LocalTime({ timeZone }: { timeZone: string }) {
  const time = useSyncExternalStore(subscribeToTick, getTick, getServerTick);

  if (!time) return "00:00:00 AM";
  try {
    return timeFormatters[timeZone].format(time);
  } catch {
    return "00:00:00 AM";
  }
}

export default function FooterInteractiveClocks() {
  // Mobile clocks are an embla carousel rather than a CSS marquee: the ask was
  // infinite AND draggable, and a keyframe marquee cannot be dragged — the
  // animation owns the transform. embla + AutoScroll is already how
  // OurTeamSection does exactly this, and drag comes free with it. `backward`
  // matches the travel direction of every other carousel on the site
  // (rightward, entering from the left) per TechLogoCarousel.
  const clockAutoScroll = useRef(
    AutoScroll({
      speed: 0.7,
      direction: "backward",
      playOnInit: true,
      stopOnInteraction: false,
      stopOnMouseEnter: false,
    }),
  );

  // Run the clock marquee only while it is on screen. AutoScroll is a per-frame
  // JS transform write from the main thread, and a footer is offscreen for
  // nearly the whole visit — so this loop was costing every page frame-time
  // the entire session (including on DESKTOP, where the mobile carousel is
  // md:hidden but still mounted; a display:none element never intersects, so
  // this gate also stops that invisible copy). Fail-OPEN: playOnInit starts it
  // and only an explicit "not intersecting" stops it, so a missed IO delivery
  // leaves the marquee running — never frozen.
  const [clockApi, setClockApi] = useState<CarouselApi>();
  useEffect(() => {
    if (!clockApi || typeof IntersectionObserver === "undefined") return;
    const autoScroll = clockApi.plugins()?.autoScroll;
    const root = clockApi.rootNode();
    if (!autoScroll || !root) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) autoScroll.play();
        else autoScroll.stop();
      },
      { rootMargin: "100px" },
    );
    io.observe(root);
    return () => io.disconnect();
  }, [clockApi]);

  return (
    <>
      <div className="grid grid-cols-4 justify-items-center gap-x-8 gap-y-12 max-md:hidden">
        {offices.map((office) => (
          <OfficeClock key={office.city} {...office} />
        ))}
      </div>

      {/* Two copies so the loop has something to wrap into; the second is
          decorative, and every clock reads the same shared tick, so the
          duplicate never disagrees with its original. */}
      <Carousel
        opts={{ align: "start", loop: true, dragFree: true }}
        plugins={[clockAutoScroll.current]}
        setApi={setClockApi}
        // -mx-6 cancels the container's px-6 so the track runs to the
        // black panel's own edges; w-auto lets the negative margins
        // actually widen the box, which a fixed w-full would not.
        // Edge fade uses the same mask idiom as the hero stats
        // marquee. Kept to 6% a side (~21px of a 351px panel) so it
        // only softens clocks entering and leaving, rather than
        // reading as a vignette.
        className="w-full text-[11px] md:hidden max-md:-mx-6 max-md:w-auto max-md:[mask-image:linear-gradient(to_right,transparent_0%,black_6%,black_94%,transparent_100%)]"
      >
        <CarouselContent className="-ml-8">
          {[...offices, ...offices].map((office, index) => (
            <CarouselItem
              key={`${office.city}-${index}`}
              aria-hidden={index >= offices.length}
              className="basis-auto pl-8"
            >
              <OfficeClock {...office} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </>
  );
}
