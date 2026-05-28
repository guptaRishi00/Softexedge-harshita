"use client";

import { useState } from "react";

import Image from "next/image";
import Link from "next/link";

export default function CtaSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const totalItems = 60;
  const columns = 10;

  const getIntensity = (index: any) => {
    if (hoveredIndex === null) return 0;

    const row = Math.floor(index / columns);
    const col = index % columns;

    const hoverRow = Math.floor(hoveredIndex / columns);
    const hoverCol = hoveredIndex % columns;

    const distance = Math.sqrt(
      Math.pow(row - hoverRow, 2) + Math.pow(col - hoverCol, 2),
    );

    if (distance > 3.5) return 0;
    return Math.max(0, 1 - distance / 1.79);
  };

  return (
    <div className="h-[60vh] bg-black rounded-[20px] overflow-hidden relative flex items-center justify-center mt-5">
      <div
        className="grid gap-2 w-[120%] -ml-[5%]"
        style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
      >
        {Array.from({ length: totalItems }).map((_, index) => {
          const intensity = getIntensity(index);
          const colorVal = Math.round(10 * (1 - intensity));
          const bgColor = `rgb(${colorVal}, ${colorVal}, ${colorVal})`;

          return (
            <div
              key={index}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="relative h-24 sm:h-32 rounded-2xl p-[1.5px] overflow-hidden transition-all duration-300 ease-out"
              style={{
                backgroundColor: intensity > 0 ? "transparent" : "#171717",
              }}
            >
              <div
                className="absolute inset-0 bg-linear-to-b from-[#2f3fd1] via-[#2F85EA] to-[#2f3fd1]"
                style={{ opacity: intensity }}
              />

              <div
                className="relative w-full h-full rounded-2xl z-10 transition-colors duration-300"
                style={{ backgroundColor: bgColor }}
              />
            </div>
          );
        })}
      </div>

      <div className="w-fit h-full bg-transparent absolute z-10 flex flex-col items-center justify-center gap-2">
        <h2 className="text-white text-3xl md:text-6xl text-center max-w-2xl font-medium leading-snug">
          Ready to Get Started? Let’s Connect
        </h2>

        <div className="lg:flex lg:gap-6 flex-col lg:flex-row flex items-center gap-4 mt-4">
          <Link
            href={"/contact"}
            className="bg-white font-medium text-md lg:px-7 lg:py-3 rounded-full hover:bg-linear-to-r hover:from-[#3445E7] hover:via-[#2F85EA] hover:to-[#07D6F3] hover:text-white transition-colors duration-300"
          >
            let's talk
          </Link>
          <Link
            href={"/contact"}
            className="bg-white font-medium text-md lg:px-7 lg:py-3 rounded-full hover:bg-linear-to-r hover:from-[#3445E7] hover:via-[#2F85EA] hover:to-[#07D6F3] hover:text-white transition-colors duration-300"
          >
            View our work
          </Link>
        </div>
      </div>
    </div>
  );
}
