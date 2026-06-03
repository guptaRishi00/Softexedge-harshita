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
    <section className="relative z-10 flex w-full flex-col items-center px-4 pb-0 py-10 my-10">
      {/* Inline styles for the smooth moving gradient */}
      <style>{`
        .animate-gradient {
          background-size: 200% auto;
          animation: move-gradient 3s linear infinite;
        }
        @keyframes move-gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>

      {/* Main Title */}
      {/* <h2 className="mb-16 text-center text-3xl font-medium tracking-tight text-black sm:text-4xl md:text-5xl">
        The Backbone of Global Commerce
      </h2> */}

      <div className="relative w-full py-10 text-center md:py-14">
        <div className="flex w-full flex-col divide-y divide-gray-300 md:flex-row md:divide-x md:divide-y-0">
          <div className="flex flex-1 flex-col items-center px-4 py-6 md:py-0">
            <h3 className="mb-3 text-5xl font-bold tracking-tight text-black md:text-[6.5rem]">
              <Counter value={250} />
              <span className="animate-gradient bg-linear-to-r from-[#2E5BFF] via-[#149CCB] to-[#2E5BFF] bg-clip-text text-transparent">
                +
              </span>
            </h3>
            <p className="text-lg font-medium leading-[1em] text-black mt-5">
              Digital products and projects <br /> successfully delivered
            </p>
          </div>

          <div className="flex flex-1 flex-col items-center px-4 py-6 md:py-0">
            <h3 className="mb-3 text-5xl font-bold tracking-tight text-black md:text-[6.5rem]">
              <Counter value={98} />
              <span className="animate-gradient bg-linear-to-r from-[#2E5BFF] via-[#149CCB] to-[#2E5BFF] bg-clip-text text-transparent">
                %
              </span>
            </h3>
            <p className="text-lg font-medium leading-[1em] text-black mt-5">
              Client retention rate built <br /> on trust and results
            </p>
          </div>

          <div className="flex flex-1 flex-col items-center px-4 py-6 md:py-0">
            <h3 className="mb-3 text-5xl font-bold tracking-tight text-black md:text-[6.5rem]">
              <Counter value={10} />
              <span className="animate-gradient bg-linear-to-r from-[#2E5BFF] via-[#149CCB] to-[#2E5BFF] bg-clip-text text-transparent">
                +
              </span>
            </h3>
            <p className="text-lg font-medium leading-[1em] text-black mt-5">
              Years of elite industry <br /> experience and consulting
            </p>
          </div>

          <div className="flex flex-1 flex-col items-center px-4 py-6 md:py-0">
            <h3 className="mb-3 text-5xl font-bold tracking-tight text-black md:text-[6.5rem]">
              <Counter value={50} />
              <span className="animate-gradient bg-linear-to-r from-[#2E5BFF] via-[#149CCB] to-[#2E5BFF] bg-clip-text text-transparent">
                +
              </span>
            </h3>
            <p className="text-lg font-medium leading-[1em] text-black mt-5">
              In-house designers, creators, <br /> and engineers
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
