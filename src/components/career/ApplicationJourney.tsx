"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const premiumEase = [0.16, 1, 0.3, 1] as const;

interface Step {
  number: string;
  title: string;
  description: string;
  image: string;
}

const steps: Step[] = [
  {
    number: "01",
    title: "Apply",
    description:
      "Submit your application with your resume and portfolio. We review every profile carefully.",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&auto=format&fit=crop&q=60",
  },
  {
    number: "02",
    title: "Interview",
    description:
      "Let's talk about your journey, mindset, and how you approach creative problem solving.",
    image:
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&auto=format&fit=crop&q=60",
  },
  {
    number: "03",
    title: "Assignment",
    description:
      "Show us how you approach real-world challenges through a take-home project.",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&auto=format&fit=crop&q=60",
  },
  {
    number: "04",
    title: "Offer",
    description:
      "Welcome aboard! We'll share the offer, onboarding details, and get you set up for success.",
    image:
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200&auto=format&fit=crop&q=60",
  },
];

export default function ApplicationJourney() {
  return (
    <section className="relative w-full bg-white px-6 max-md:px-3 py-24 text-zinc-900 md:py-32">
      <div className="mx-auto w-full">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center mb-16 max-md:mb-8 md:mb-35">
          <motion.div
            data-no-mobile-entry
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: premiumEase }}
            className="mb-6 inline-flex items-center gap-2 text-sm font-medium uppercase tracking-[0.3em] text-zinc-500 max-md:text-xs"
          >
            The Process
          </motion.div>

          <motion.h2
            data-no-mobile-entry
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: premiumEase }}
            className="text-4xl font-bold leading-[1.05em] tracking-tighter text-zinc-900 max-md:text-[2.5rem] max-md:leading-[1.11] md:text-5xl lg:text-[6.5rem]"
          >
            Your Application{" "}
            <span className="inline-block bg-gradient-to-r from-[#2E5BFF] to-[#149CCB] bg-clip-text pb-[0.2em] pr-[0.08em] text-transparent">
              Journey
            </span>
          </motion.h2>

          <motion.p
            data-no-mobile-entry
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: premiumEase }}
            className="mt-6 max-w-3xl text-lg font-regular leading-[1.25em] text-zinc-600 md:text-xl"
          >
            We've streamlined our hiring process to be transparent, respectful
            of your time, and focused on discovering your true potential.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              data-no-mobile-entry
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: premiumEase,
              }}
              className="group relative h-[450px] w-full overflow-hidden rounded-[2.5rem]"
            >
              <Image
                src={step.image}
                alt={step.title}
                loading="lazy"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-500" />

              <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-10">
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-md">
                  <span className="text-sm font-bold text-white">
                    {step.number}
                  </span>
                </div>
                <h3 className="mb-3 text-2xl font-medium tracking-tight text-white md:text-3xl">
                  {step.title}
                </h3>
                <p className="text-base leading-[1.25em] text-white/80">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
