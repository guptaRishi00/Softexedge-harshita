"use client";

import QuoteCard from "./QuoteCard";

// Each carousel slot is one of three things — an image, an autoplaying video,
// or a quote card — mixed within a row. Card dimensions are unchanged.
export type CarouselItem =
  | { type: "image"; src: string }
  | { type: "video"; src: string }
  | { type: "quote"; text: string; author: string; role: string };

export default function CarouselCard({ item }: { item: CarouselItem }) {
  return (
    <div className="relative h-[160px] sm:h-[200px] md:h-[260px] aspect-[4/5] rounded-[2rem] overflow-hidden shadow-xs hover:shadow-lg transition-shadow duration-300">
      {item.type === "image" && (
        <img
          src={item.src}
          alt="Career Collage"
          className="w-full h-full object-cover transition-transform duration-[10s] ease-out hover:scale-110 pointer-events-none"
        />
      )}

      {item.type === "video" && (
        <video
          src={item.src}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover pointer-events-none"
        />
      )}

      {item.type === "quote" && <QuoteCard text={item.text} />}
    </div>
  );
}
