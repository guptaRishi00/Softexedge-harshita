import { ArrowRight, BriefcaseBusiness } from "lucide-react";
import Image from "next/image";

export default function AgencyShowcaseSection() {
  return (
    <section className="relative overflow-hidden bg-[#f6eeea] py-24">
      <div className="relative mx-auto flex max-w-328 flex-col items-center justify-between gap-20 px-6 lg:flex-row lg:px-12">
        <div className="relative flex w-full justify-center lg:w-1/2 lg:justify-start">
          <div className="relative h-[520px] w-[520px]">
            <div className="absolute left-0 top-0 overflow-hidden rounded-[38px]">
              <Image
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop"
                alt="Team"
                width={345}
                height={460}
                className="h-120 w-86.25 object-cover"
              />
            </div>

            <div className="absolute left-45 top-23.75 z-20 flex items-center gap-4">
              <div className="rounded-[34px] bg-[#11c44f] px-10 py-8 text-white shadow-[0_25px_60px_rgba(17,196,79,0.35)]">
                <h3 className="text-6xl font-semibold leading-none tracking-tighter">
                  28+
                </h3>

                <p className="mt-2 text-2xl leading-none text-white/90">
                  Years
                </p>
              </div>

              <div className="overflow-hidden rounded-[28px] shadow-[0_15px_40px_rgba(0,0,0,0.12)]">
                <Image
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800&auto=format&fit=crop"
                  alt="Portrait"
                  width={160}
                  height={160}
                  className="h-[160px] w-[160px] object-cover"
                />
              </div>
            </div>

            <div className="absolute bottom-[75px] left-[175px] z-30 flex items-center gap-5 rounded-[30px] border border-white/30 bg-[#f3e9de]/90 px-7 py-6 shadow-[0_25px_60px_rgba(0,0,0,0.08)] backdrop-blur-2xl">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-md">
                <BriefcaseBusiness size={28} className="text-[#7c3aed]" />
              </div>

              <div>
                <h4 className="text-[22px] font-semibold leading-[1.05] tracking-[-0.04em] text-black">
                  Working
                  <br />
                  Experience
                </h4>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full max-w-[620px] lg:w-1/2">
          <h2 className="text-5xl font-semibold leading-[0.95] tracking-[-0.07em] text-black md:text-7xl lg:text-[78px]">
            Powerful Agency
            <br />
            For Corporate
            <br />
            Business.
          </h2>

          <p className="mt-8 max-w-[560px] text-lg leading-relaxed text-black/45">
            We strive to develop real-world web solutions that are ideal for
            small to large projects with bespoke project requirements.
          </p>

          <div className="mt-10">
            <button className="group inline-flex items-center gap-4 rounded-full bg-[#6d28ff] px-8 py-5 text-base font-medium text-white shadow-[0_18px_45px_rgba(109,40,255,0.35)] transition duration-300 hover:scale-105">
              Read About Us
              <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-white/10 transition duration-300 group-hover:rotate-45">
                <ArrowRight size={16} />
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
