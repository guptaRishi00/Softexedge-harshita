"use client";

import { motion } from "framer-motion";

const processSteps = [
  {
    id: "01",
    title: "Discovery",
    description:
      "Deep-dive into your brand's DNA and technical requirements to define the blueprint.",
    imgSrc:
      "https://images.unsplash.com/photo-1773332598451-8a0a59941912?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8", // Replace with actual image path
  },
  {
    id: "02",
    title: "Architecture",
    description:
      "Wireframing and UX logic focusing on conversion pathways and user intent.",
    imgSrc:
      "https://plus.unsplash.com/premium_photo-1779734722075-13c772baa2ea?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyNnx8fGVufDB8fHx8fA%3D%3D", // Replace with actual image path
  },
  {
    id: "03",
    title: "Development",
    description:
      "High-performance engineering using Next.js and Tailwind for optimized delivery.",
    imgSrc:
      "https://images.unsplash.com/photo-1773332585754-f1436987743b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxNXx8fGVufDB8fHx8fA%3D%3D", // Replace with actual image path
  },
  {
    id: "04",
    title: "Deployment",
    description:
      "Rigorous testing followed by global CDN deployment for maximum speed.",
    imgSrc:
      "https://images.unsplash.com/photo-1776602191233-154cbc983f0c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDY4fENEd3V3WEpBYkV3fHxlbnwwfHx8fHw%3D", // Replace with actual image path
  },
];

export default function ProcessSection() {
  return (
    <section className="w-full bg-white py-16 md:py-24 font-sans">
      <div className="mx-auto max-w-[1480px] px-6">
        {/* Header Section */}
        <div className="mb-12 flex items-center justify-between">
          <div>
            <span className="text-sm font-medium text-gray-500">
              What's cookin'
            </span>
            <motion.h2
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="mt-1 text-4xl font-extrabold tracking-tighter text-gray-950 md:text-8xl"
            >
              Our Process
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
              className="group flex flex-col"
            >
              {/* Image Card */}
              <div className="relative mb-6 aspect-[4/4.5] w-full overflow-hidden rounded-[20px]">
                <img
                  src={step.imgSrc}
                  alt={step.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Text Content */}
              <div className="flex flex-grow flex-col">
                <h3 className="mb-2 text-xl font-extrabold tracking-tight text-gray-950">
                  {step.title}
                </h3>

                <p className="mb-6 text-[15px] font-medium leading-relaxed text-gray-600">
                  {step.description}
                </p>

                {/* Button */}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
