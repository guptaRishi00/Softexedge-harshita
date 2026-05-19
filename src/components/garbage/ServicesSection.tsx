// app/components/home/ServicesSection.tsx

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const leftServices = [
  "Digital PR",
  "Search & Growth Strategy",
  "Data & Insights",
];

const rightServices = [
  "Organic Social & Content",
  "Content Experience",
  "Onsite SEO",
];

export default function ServicesSection() {
  return (
    <section className="w-full bg-white px-5 py-10 md:px-8 md:py-14">
      {/* Top */}
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        {/* Heading */}
        <div className="flex items-end gap-5">
          <h2 className="text-[3.5rem] font-semibold leading-none tracking-[-0.08em] text-black sm:text-[5rem] md:text-[7rem]">
            Our
          </h2>

          {/* Small Image */}
          <div className="relative h-20 w-30 overflow-hidden rounded-full md:h-20 md:w-50">
            <Image
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=600&auto=format&fit=crop"
              alt="Team"
              fill
              className="object-cover"
            />
          </div>

          <h2 className="text-[3.5rem] font-semibold leading-none tracking-[-0.08em] text-black sm:text-[5rem] md:text-[7rem]">
            Services
          </h2>
        </div>

        {/* Button */}
        <Link
          href="/services"
          className="group flex w-fit items-center gap-2 rounded-full bg-white border-gray-200 border px-6 py-4 text-sm font-medium text-black transition hover:scale-[1.02] hover:bg-linear-to-r hover:from-[#3445E7] hover:via-[#2F85EA] hover:to-[#07D6F3] hover:text-white"
        >
          View All Services
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Link>
      </div>

      {/* Divider */}
      <div className="mt-10 h-px w-full bg-black/10" />

      {/* Services Grid */}
      <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-24">
        {/* Left Column */}
        <div>
          {leftServices.map((service, index) => (
            <div key={service}>
              <button className="group w-full py-5 text-left">
                <h3 className="text-[2.5rem] font-medium leading-[0.95] tracking-[-0.07em] text-black transition duration-300 group-hover:translate-x-2 md:text-5xl">
                  {service}
                </h3>
              </button>

              {index !== leftServices.length - 1 && (
                <div className="h-px w-full bg-black/10" />
              )}
            </div>
          ))}
        </div>

        {/* Right Column */}
        <div>
          {rightServices.map((service, index) => (
            <div key={service}>
              <button className="group w-full py-5 text-left">
                <h3 className="text-[2.5rem] font-medium leading-[0.95] tracking-[-0.07em] text-black transition duration-300 group-hover:translate-x-2 md:text-5xl">
                  {service}
                </h3>
              </button>

              {index !== rightServices.length - 1 && (
                <div className="h-px w-full bg-black/10" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
