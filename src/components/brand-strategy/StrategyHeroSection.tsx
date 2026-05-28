"use client";

import React from "react";
import Header from "../page/Header";

export default function StrategyHeroSection() {
  return (
    <section className="relative flex min-h-screen w-full flex-col items-center overflow-hidden bg-white px-6 py-24 text-zinc-900">
      {/* Subtle Background Glow for Light Mode */}
      <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center opacity-60">
        <div className="h-[600px] w-[600px] rounded-full bg-zinc-100 blur-[120px]"></div>
      </div>

      {/* Header positioned at the top */}
      <div className="absolute top-0 left-0 w-full z-50">
        <Header />
      </div>

      {/* Main Content (Center Aligned) */}
      <div className="relative z-10 flex max-w-4xl flex-col items-center text-center mt-20 md:mt-28">
        {/* Top Pill Badge */}
        <div className="mb-8 inline-flex items-center rounded-lg border border-black/10 bg-black/5 px-4 py-1.5 text-xs font-semibold tracking-widest text-zinc-600 uppercase backdrop-blur-md">
          How we do it
        </div>

        {/* Headline */}
        <h1 className="mb-6 text-5xl font-bold leading-[1.1] tracking-tight text-zinc-900 md:text-7xl">
          We build brands that <br className="hidden md:block" /> people love.
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl text-lg leading-relaxed text-zinc-500 md:text-xl">
          A brand is more than just a logo and a color palette. It&apos;s the
          emotional connection you have with your audience. We help you define,
          design, and deliver that connection.
        </p>
      </div>

      {/* Stats Section (Replacing Logo Loop) */}
      <div className="relative z-10 mt-auto pt-24 pb-10 flex w-full  flex-col items-center">
        {/* Section Heading */}
        <h2 className="mb-16 text-center text-4xl font-medium leading-[1.2] tracking-tight text-black md:text-5xl">
          The backbone <br />
          of global commerce
        </h2>

        {/* Stats Grid Container with Faded Borders */}
        <div className="relative flex w-full flex-col gap-12 py-10 md:flex-row md:gap-4 md:py-14 text-center">
          {/* Top Faded Border */}
          <div className="absolute left-0 top-0 h-[1px] w-full bg-gradient-to-r from-transparent via-blue-200 to-transparent opacity-60" />

          {/* Stat 1 */}
          <div className="flex flex-1 flex-col items-center px-2">
            <h3 className="mb-3 text-5xl md:text-6xl font-medium tracking-tight text-[#0A2540]">
              135+
            </h3>
            <p className="text-sm font-medium leading-relaxed text-[#425466]">
              currencies and payment <br />
              methods supported
            </p>
          </div>

          {/* Stat 2 */}
          <div className="flex flex-1 flex-col items-center px-2">
            <h3 className="mb-3 text-5xl md:text-6xl font-medium tracking-tight text-[#636B74]">
              US$1.9tn
            </h3>
            <p className="text-sm font-medium leading-relaxed text-[#425466]">
              in payments volume <br />
              processed in 2025
            </p>
          </div>

          {/* Stat 3 */}
          <div className="flex flex-1 flex-col items-center px-2">
            <h3 className="mb-3 text-5xl md:text-6xl font-medium tracking-tight text-[#636B74]">
              99.999%
            </h3>
            <p className="text-sm font-medium leading-relaxed text-[#425466]">
              historical uptime <br />
              for Stripe services
            </p>
          </div>

          {/* Stat 4 */}
          <div className="flex flex-1 flex-col items-center px-2">
            <h3 className="mb-3 text-5xl md:text-6xl font-medium tracking-tight text-[#636B74]">
              200m+
            </h3>
            <p className="text-sm font-medium leading-relaxed text-[#425466]">
              active subscriptions <br />
              managed on Stripe Billing
            </p>
          </div>

          {/* Bottom Faded Border */}
          <div className="absolute bottom-0 left-0 h-[1px] w-full bg-gradient-to-r from-transparent via-blue-200 to-transparent opacity-60" />
        </div>
      </div>
    </section>
  );
}
