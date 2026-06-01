import React from "react";

export default function GlobalCommerceStats() {
  return (
    <section className="relative z-10 flex w-full flex-col items-center pt-24 pb-10">
      <h2 className="mb-16 text-center text-4xl font-medium leading-[1.2] tracking-tight text-black md:text-5xl">
        The backbone <br />
        of global commerce
      </h2>

      <div className="relative flex w-full flex-col gap-12 py-10 text-center md:flex-row md:gap-4 md:py-14">
        <div className="absolute left-0 top-0 h-[1px] w-full bg-gradient-to-r from-transparent via-blue-200 to-transparent opacity-60" />

        <div className="flex flex-1 flex-col items-center px-2">
          <h3 className="mb-3 text-5xl font-medium tracking-tight text-[#0A2540] md:text-6xl">
            135+
          </h3>
          <p className="text-sm font-medium leading-relaxed text-[#425466]">
            currencies and payment <br />
            methods supported
          </p>
        </div>

        <div className="flex flex-1 flex-col items-center px-2">
          <h3 className="mb-3 text-5xl font-medium tracking-tight text-[#636B74] md:text-6xl">
            US$1.9tn
          </h3>
          <p className="text-sm font-medium leading-relaxed text-[#425466]">
            in payments volume <br />
            processed in 2025
          </p>
        </div>

        <div className="flex flex-1 flex-col items-center px-2">
          <h3 className="mb-3 text-5xl font-medium tracking-tight text-[#636B74] md:text-6xl">
            99.999%
          </h3>
          <p className="text-sm font-medium leading-relaxed text-[#425466]">
            historical uptime <br />
            for Stripe services
          </p>
        </div>

        <div className="flex flex-1 flex-col items-center px-2">
          <h3 className="mb-3 text-5xl font-medium tracking-tight text-[#636B74] md:text-6xl">
            200m+
          </h3>
          <p className="text-sm font-medium leading-relaxed text-[#425466]">
            active subscriptions <br />
            managed on Stripe Billing
          </p>
        </div>

        <div className="absolute bottom-0 left-0 h-[1px] w-full bg-gradient-to-r from-transparent via-blue-200 to-transparent opacity-60" />
      </div>
    </section>
  );
}
