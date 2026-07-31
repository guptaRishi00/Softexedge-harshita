"use client";

import Image from "next/image";
import QuoteCard from "./QuoteCard";

export type CarouselItem =
  | { type: "image"; src: string }
  | { type: "video"; src: string; still?: string }
  | { type: "quote"; text: string; author: string; role: string };

const IMAGE_CLASS =
  "w-full h-full object-cover transition-transform duration-[10s] ease-out hover:scale-110 pointer-events-none";

export default function CarouselCard({
  item,
  stillOnly = false,
}: {
  item: CarouselItem;
  // InfiniteRow repeats its items 6x to make the marquee seamless. Only the
  // first copy renders the real <video>; the rest ask for the still so the page
  // holds one decoder instead of six. Falls back to the video if no still is
  // given, so a missing `still` degrades to the old behaviour rather than a
  // blank card.
  stillOnly?: boolean;
}) {
  return (
    <div className="relative h-[160px] sm:h-[200px] md:h-[260px] aspect-[4/5] rounded-[2rem] overflow-hidden shadow-xs hover:shadow-lg transition-shadow duration-300">
      {item.type === "image" && (
        <Image
          src={item.src}
          alt="Career Collage"
          width={208}
          height={260}
          sizes="(max-width: 640px) 128px, (max-width: 768px) 160px, 208px"
          className={IMAGE_CLASS}
        />
      )}

      {item.type === "video" &&
        (stillOnly && item.still ? (
          <Image
            src={item.still}
            alt="Career Collage"
            width={208}
            height={260}
            sizes="(max-width: 640px) 128px, (max-width: 768px) 160px, 208px"
            className={IMAGE_CLASS}
          />
        ) : (
          <video
            src={item.src}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover pointer-events-none"
          />
        ))}

      {item.type === "quote" && <QuoteCard text={item.text} />}
    </div>
  );
}
