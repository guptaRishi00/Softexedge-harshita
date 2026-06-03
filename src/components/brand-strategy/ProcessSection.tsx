"use client";

import { motion } from "framer-motion";

const processSteps = [
  {
    id: "01",
    title: "Discovery",
    description:
      "Deep-dive into your brand's DNA and technical requirements to define the blueprint.",
    image:
      "https://images.unsplash.com/photo-1773332598451-8a0a59941912?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwcm9maWxlLXBhZ2V8MjV8fHxlbnwwfHx8fHw%3D",
  },
  {
    id: "02",
    title: "Architecture",
    description:
      "Wireframing and UX logic focusing on conversion pathways and user intent.",
    image:
      "https://plus.unsplash.com/premium_photo-1723291331030-d6874d63e5bf?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDV8fGFzc2VtYmxlfGVufDB8fDB8fHww",
  },
  {
    id: "03",
    title: "Development",
    description:
      "High-performance engineering using Next.js and Tailwind for optimized delivery.",
    image:
      "https://images.unsplash.com/photo-1773332598413-a6d5279d1ae8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwcm9maWxlLXBhZ2V8MTl8fHxlbnwwfHx8fHw%3D",
  },
  {
    id: "04",
    title: "Deployment",
    description:
      "Rigorous testing followed by global CDN deployment for maximum speed.",
    image:
      "https://images.unsplash.com/photo-1776602191233-154cbc983f0c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDcyfENEd3V3WEpBYkV3fHxlbnwwfHx8fHw%3D",
  },
];

export default function ProcessSection() {
  return (
    <section className="w-full bg-black py-16 md:py-24 font-sans">
      <div className="mx-auto max-w-[1480px] px-6">
        {/* Header Section */}
        <div className="mb-12 flex items-center justify-between">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="mt-1 text-4xl font-extrabold tracking-tighter text-white md:text-[5rem]"
            >
              Our{" "}
              <span className="bg-gradient-to-r from-[#2E5BFF] to-[#149CCB] bg-clip-text pr-3 text-transparent">
                Process
              </span>
            </motion.h2>
          </div>
        </div>

        {/* Process Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
              viewport={{ once: true }}
              className="group flex cursor-pointer flex-col"
            >
              {/* Image Container */}
              <div className="relative mb-6 flex aspect-[4/4.5] w-full items-center justify-center overflow-hidden rounded-[20px] bg-zinc-900">
                <img
                  src={step.image}
                  alt={step.title}
                  className="absolute inset-0 h-full w-full object-cover opacity-80 transition-all duration-700 ease-in-out group-hover:scale-110 group-hover:opacity-100"
                />
              </div>

              {/* Text Content */}
              <div className="flex flex-grow flex-col">
                <h3 className="mb-2 text-xl font-extrabold tracking-tight text-white">
                  {step.title}
                </h3>

                <p className="mb-6 text-[15px] font-medium leading-relaxed text-zinc-400">
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
