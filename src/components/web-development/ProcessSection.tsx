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
      "https://images.unsplash.com/photo-1773332611514-238856b76198?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwcm9maWxlLXBhZ2V8OXx8fGVufDB8fHx8fA%3D%3D",
  },
];

export default function ProcessSection() {
  return (
    <section className="w-full bg-black font-sans pt-20 md:pt-32 md:pb-35">
      <div className="mx-auto w-full px-6 md:px-6">
        {/* Header Section */}
        <div className="mb-16 flex flex-col items-center gap-6 text-center md:mb-35">
          <div className="flex flex-col items-center gap-5">
            <span className="text-xs font-medium uppercase tracking-[0.25em] text-white/60">
              How We Work
            </span>
            <motion.h2
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-4xl font-bold leading-none tracking-tighter text-white md:text-[5rem]"
            >
              Our{" "}
              <span className="bg-linear-to-r from-[#2E5BFF] to-[#149CCB] bg-clip-text pr-3 text-transparent">
                Process
              </span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="max-w-2xl text-center text-2xl font-light leading-[1.25em] text-white md:mb-2"
          >
            A streamlined approach to turning complex challenges into elegant
            digital solutions, from initial concept to global scale. from
            initial concept to global scale.
          </motion.p>
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

        {/* NON-EDGE-TO-EDGE BOTTOM BORDER */}
        <div className="mt-16 w-full border-b border-white/10 md:mt-35" />
      </div>
    </section>
  );
}
