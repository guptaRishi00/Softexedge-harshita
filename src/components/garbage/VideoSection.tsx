import React from "react";

type Props = {};

export default function VideoSection({}: Props) {
  return (
    <div className="mt-16">
      <div className="group relative overflow-hidden rounded-[40px] border border-black/10 bg-black shadow-[0_30px_120px_rgba(0,0,0,0.18)]">
        {/* Video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="h-[520px] w-full object-cover transition duration-700 group-hover:scale-[1.03] md:h-[720px]"
          src="/assets/video1.mp4"
        />

        {/* Cinematic overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

        {/* Noise texture */}
        <div className="absolute inset-0 opacity-[0.04] mix-blend-overlay bg-[url('/noise.png')]" />

        {/* Top floating pills */}
        <div className="absolute left-4 top-4 flex flex-wrap items-center gap-3 md:left-6 md:top-6">
          <div className="rounded-full border border-white/15 bg-white/10 px-4 py-2 backdrop-blur-xl">
            <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-white/80 md:text-xs">
              AI Fashion Engine
            </p>
          </div>

          <div className="rounded-full border border-white/15 bg-white/10 px-4 py-2 backdrop-blur-xl">
            <p className="text-[10px] text-white/70 md:text-xs">
              Realistic campaign generation
            </p>
          </div>
        </div>

        {/* Floating controls */}
        <div className="absolute right-4 top-4 flex flex-col gap-3 md:right-6 md:top-6">
          <button className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white backdrop-blur-xl transition duration-300 hover:scale-110">
            ✦
          </button>

          <button className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-black transition duration-300 hover:scale-110">
            ↓
          </button>
        </div>

        {/* Bottom content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            {/* Left content */}
            <div className="max-w-2xl">
              <h3 className="text-3xl font-semibold leading-[0.95] tracking-[-0.04em] text-white md:text-5xl lg:text-6xl">
                Create studio-grade
                <br />
                campaigns instantly.
              </h3>

              <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/65 md:text-lg">
                Generate luxury fashion visuals, cinematic edits and branded
                marketing shots from a single product image using AI.
              </p>
            </div>

            {/* Right stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur-2xl">
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/50 md:text-xs">
                  Generation
                </p>

                <h4 className="mt-3 text-2xl font-semibold text-white md:text-3xl">
                  4K
                </h4>

                <p className="mt-2 text-xs text-white/60 md:text-sm">
                  Ultra realistic output
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur-2xl">
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/50 md:text-xs">
                  Delivery
                </p>

                <h4 className="mt-3 text-2xl font-semibold text-white md:text-3xl">
                  12s
                </h4>

                <p className="mt-2 text-xs text-white/60 md:text-sm">
                  Average render time
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black to-transparent" />
      </div>
    </div>
  );
}
