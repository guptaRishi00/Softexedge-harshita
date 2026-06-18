import { ArrowRight, PenTool, Sparkles } from "lucide-react";

export default function CreativeSolutionsSection() {
  const services = [
    "Brand Identity",
    "Websites",
    "Mobile app",
    "SEO",
    "Shopify",
    "Marketing",
    "Responsive design",
  ];

  return (
    <section className="relative overflow-hidden bg-white py-10">
      <div className="relative mx-auto flex w-full flex-col gap-20 px-6 lg:px-12">
        <div className="flex flex-col justify-between gap-20 lg:flex-row">
          <div className="w-full">
            <div className="mb-8 inline-flex items-center gap-5">
              <div className="flex items-center justify-center rounded-full bg-linear-to-r from-[#3445E7] via-[#2F85EA] to-[#07D6F3] px-3 py-3">
                <PenTool size={16} className="text-white" />
              </div>

              <p className="flex items-center gap-2 text-lg font-medium text-black/70">
                Creative
                <Sparkles
                  size={14}
                  className="fill-yellow-400 text-yellow-400"
                />
                Approach
              </p>
            </div>

            <h2 className="text-5xl font-semibold leading-[0.92] tracking-tighter text-black md:text-7xl">
              Creative Solutions
              <br />
              That Drive Engagement.
            </h2>
          </div>

          <div className="flex max-w-105 flex-col items-start gap-16">
            <p className="text-lg leading-relaxed text-black/70">
              Unsere Services sind so konzipiert, dass sie dazu beitragen,
              Marken zu formen, die dauerhaft bestehen bleiben.
            </p>

            <button className="group inline-flex items-center gap-4 rounded-full bg-linear-to-r from-[#3445E7] via-[#2F85EA] to-[#07D6F3] px-8 py-5 text-base font-medium text-white ">
              Get a project in min?
              <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-white/10 transition duration-300 group-hover:-rotate-45">
                <ArrowRight size={16} />
              </div>
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-30 lg:flex-row lg:items-center justify-between">
          <h3 className="text-2xl font-medium tracking-[-0.04em] text-black">
            We create digital products:
          </h3>

          <div className="flex flex-wrap gap-4">
            {services.map((service, index) => (
              <div
                key={index}
                className="rounded-full border border-black/10 bg-white/70 px-5 py-3 text-sm font-medium text-black transition duration-300 hover:-translate-y-1"
              >
                {service}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
