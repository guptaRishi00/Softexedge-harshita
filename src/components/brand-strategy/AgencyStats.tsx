"use client";

import React, { useEffect, useRef } from "react";
import { useInView, animate } from "framer-motion";

// High-performance counter component that animates when scrolled into view
function Counter({ value }: any) {
  const ref = useRef<any>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;

    // Smoothly animate from 0 to the target value
    const controls = animate(0, value, {
      duration: 2,
      ease: "easeOut",
      onUpdate: (latest) => {
        if (ref.current) {
          ref.current.textContent = Math.floor(latest);
        }
      },
    });

    return () => controls.stop();
  }, [value, isInView]);

  return <span ref={ref}>0</span>;
}

export default function AgencyStats() {
  return (
    <section className="relative z-10 flex w-full flex-col items-center pt-10 pb-10 px-4">
      {/* Main Title */}
      <h2 className="mb-16 text-center text-3xl font-medium tracking-tight text-black sm:text-4xl md:text-5xl">
        The Backbone of Global Commerce
      </h2>

      {/* Stats Container with Responsive Dividers */}
      <div className="relative w-full py-10 text-center md:py-14">
        {/* Top subtle line */}
        <div className="absolute left-0 top-0 h-[1px] w-full bg-linear-to-r from-transparent via-blue-200 to-transparent opacity-60" />

        {/* Clean wrapper containing ONLY the stats to keep dividers perfectly balanced */}
        <div className="flex w-full flex-col divide-y divide-gray-200 md:flex-row md:divide-y-0 md:divide-x">
          {/* Stat 1 */}
          <div className="flex flex-1 flex-col items-center px-4 py-6 md:py-0">
            <h3 className="mb-3 text-5xl font-bold tracking-tight text-black md:text-8xl">
              <Counter value={250} />
              <span className="bg-linear-to-r from-[#2E5BFF] to-[#149CCB] bg-clip-text text-transparent">
                +
              </span>
            </h3>
            <p className="text-lg font-medium leading-relaxed text-black">
              digital products and projects <br /> successfully delivered
            </p>
          </div>

          {/* Stat 2 */}
          <div className="flex flex-1 flex-col items-center px-4 py-6 md:py-0">
            <h3 className="mb-3 text-5xl font-bold tracking-tight text-black md:text-8xl">
              <Counter value={98} />
              <span className="bg-linear-to-r from-[#2E5BFF] to-[#149CCB] bg-clip-text text-transparent">
                %
              </span>
            </h3>
            <p className="text-lg font-medium leading-relaxed text-black">
              client retention rate built <br /> on trust and results
            </p>
          </div>

          {/* Stat 3 */}
          <div className="flex flex-1 flex-col items-center px-4 py-6 md:py-0">
            <h3 className="mb-3 text-5xl font-bold tracking-tight text-black md:text-8xl">
              <Counter value={10} />
              <span className="bg-linear-to-r from-[#2E5BFF] to-[#149CCB] bg-clip-text text-transparent">
                +
              </span>
            </h3>
            <p className="text-lg font-medium leading-relaxed text-black">
              years of elite industry <br /> experience and consulting
            </p>
          </div>

          {/* Stat 4 */}
          <div className="flex flex-1 flex-col items-center px-4 py-6 md:py-0">
            <h3 className="mb-3 text-5xl font-bold tracking-tight text-black md:text-8xl">
              <Counter value={50} />
              <span className="bg-linear-to-r from-[#2E5BFF] to-[#149CCB] bg-clip-text text-transparent">
                +
              </span>
            </h3>
            <p className="text-lg font-medium leading-relaxed text-black">
              in-house designers, creators, <br /> and engineers
            </p>
          </div>
        </div>

        {/* Bottom subtle line */}
        <div className="absolute bottom-0 left-0 h-[1px] w-full bg-gradient-to-r from-transparent via-blue-200 to-transparent opacity-60" />
      </div>
    </section>
  );
}
