// app/components/ui/TextMarquee.tsx

"use client";

import Image from "next/image";

const items = [
  "Softexedge",
  "Best Agency",
  "Creative Studio",
  "Digital Partner",
];

export default function TextMarquee() {
  return (
    <section className="w-full overflow-hidden bg-white py-6">
      <div className="marquee">
        <div className="marquee-track">
          {/* First Set */}
          {[...Array(2)].map((_, loopIndex) => (
            <div key={loopIndex} className="flex shrink-0 items-center">
              {items.map((item, index) => (
                <div
                  key={index}
                  className="mx-8 flex shrink-0 items-center gap-8"
                >
                  <h2 className="whitespace-nowrap text-5xl font-semibold tracking-[-0.08em] text-black md:text-7xl">
                    {item}
                  </h2>

                  <div className="relative h-20 w-32 overflow-hidden rounded-full md:h-20 md:w-50">
                    <Image
                      src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1000&auto=format&fit=crop"
                      alt="Agency"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
