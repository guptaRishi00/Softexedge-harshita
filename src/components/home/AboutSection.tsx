export default function AboutSection() {
  return (
    <section className="relative h-auto w-full overflow-hidden rounded-[20px] bg-black p-4 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] bg-size-[24px_24px] opacity-[0.03]" />

      <div className="absolute left-1/2 top-1/2 h-[550px] w-[550px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/5 blur-3xl" />

      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-size-[90px_90px]" />

      <div className="relative z-10 flex h-full flex-col justify-between gap-14 p-4 md:p-6">
        <div className="flex items-center justify-between">
          <p className="hidden rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-[12px] text-white/50 backdrop-blur-xl md:block">
            Creative Direction & Development
          </p>

          <div className="hidden rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-[10px] text-white/50 backdrop-blur-xl md:block">
            Trusted By Global Companies
          </div>
        </div>

        <div className="grid flex-1 grid-cols-1 gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="flex flex-col justify-center">
            <h1 className="max-w-3xl text-4xl leading-none font-semibold tracking-tighter md:text-6xl lg:text-7xl">
              We create digital
              <span className="text-white/25"> experiences </span>
              for brands that lead industries.
            </h1>

            <div className="mt-6 max-w-lg space-y-5">
              <p className="text-sm leading-relaxed text-white/50">
                We collaborate with ambitious startups, modern enterprises, and
                global companies to design immersive websites and unforgettable
                digital identities.
              </p>

              <p className="text-sm leading-relaxed text-white/35">
                Every project is crafted with cinematic visuals and refined
                creative direction.
              </p>

              <button className="group flex w-fit items-center gap-3 rounded-full border border-white/10 bg-white px-5 py-4 text-sm font-medium text-black transition-all hover:bg-linear-to-r cursor-pointer hover:border-gray-900 hover:from-[#3445E7] hover:via-[#2F85EA] hover:to-[#07D6F3] hover:text-white">
                Explore Our Work
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </button>
            </div>
          </div>

          <div className="relative flex items-center justify-center py-8">
            <div className="absolute h-[430px] w-[300px] rotate-[-14deg] rounded-[28px] border border-white/10 bg-white/[0.03] backdrop-blur-xl" />

            <div className="absolute h-[430px] w-[300px] rotate-[-7deg] rounded-[28px] border border-white/10 bg-white/[0.04] backdrop-blur-xl" />

            <div className="absolute h-[430px] w-[300px] rotate-[6deg] rounded-[28px] border border-white/10 bg-white/[0.02] backdrop-blur-xl" />

            <div className="relative w-full max-w-[310px] overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.05] p-3 backdrop-blur-2xl">
              <div className="absolute inset-0 bg-gradient-to-b from-white/[0.08] to-transparent" />

              <div className="relative overflow-hidden rounded-[22px] border border-white/10">
                <img
                  src="https://plus.unsplash.com/premium_photo-1709927273247-1cfb4c2e84bf?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Ymx1ZXxlbnwwfHwwfHx8MA%3D%3D"
                  alt="Agency Team"
                  className="h-[420px] w-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-white/10 pt-3 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-white/35">
            <span>Branding</span>
            <span>•</span>
            <span>Web Design</span>
            <span>•</span>
            <span>Development</span>
            <span>•</span>
            <span>Creative Systems</span>
          </div>

          <p className="text-[10px] text-white/30 md:text-xs">
            Designed for brands shaping the future.
          </p>
        </div>
      </div>
    </section>
  );
}
