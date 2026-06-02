"use client";

import { motion } from "framer-motion";
import {
  MdOutlineSearch,
  MdOutlineDesignServices,
  MdOutlineCode,
  MdRocketLaunch,
} from "react-icons/md";

const processSteps = [
  {
    id: "01",
    title: "Discovery",
    description:
      "Deep-dive into your brand's DNA and technical requirements to define the blueprint.",
    Icon: MdOutlineSearch,
  },
  {
    id: "02",
    title: "Architecture",
    description:
      "Wireframing and UX logic focusing on conversion pathways and user intent.",
    Icon: MdOutlineDesignServices,
  },
  {
    id: "03",
    title: "Development",
    description:
      "High-performance engineering using Next.js and Tailwind for optimized delivery.",
    Icon: MdOutlineCode,
  },
  {
    id: "04",
    title: "Deployment",
    description:
      "Rigorous testing followed by global CDN deployment for maximum speed.",
    Icon: MdRocketLaunch,
  },
];

export default function ProcessSection() {
  return (
    // Changed background to bg-zinc-950 for the dark theme
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
              // Changed text-gray-950 to text-white
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
              className="group flex flex-col cursor-pointer"
            >
              {/* Icon Container - Updated for dark mode */}
              <div className="relative mb-6 flex aspect-[4/4.5] w-full items-center justify-center overflow-hidden rounded-[20px] bg-zinc-900 text-zinc-500 transition-colors duration-500 group-hover:bg-zinc-800 group-hover:text-[#2E5BFF]">
                <step.Icon className="h-20 w-20 transition-transform duration-500 group-hover:scale-110" />
              </div>

              {/* Text Content */}
              <div className="flex flex-grow flex-col">
                {/* Changed text to white */}
                <h3 className="mb-2 text-xl font-extrabold tracking-tight text-white">
                  {step.title}
                </h3>

                {/* Changed text to a lighter gray for contrast */}
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
