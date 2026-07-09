"use client";

import { motion } from "framer-motion";
import Header from "../page/Header";
import DomeGallery from "../ui/DomeGallery";

const premiumEase = [0.16, 1, 0.3, 1] as const;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.25,
      delayChildren: 0.2,
    },
  },
} as const;

const wordVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
} as const;

export default function WorkHeroSection() {
  return (
    <main className="relative flex min-h-screen w-full flex-col overflow-hidden bg-black font-sans selection:bg-[#2E5BFF]/20">
      {/* Header — shared site header, dark-hero variant (light links + logo) */}
      <div className="absolute left-0 top-0 z-50 w-full">
        <Header onDark />
      </div>

      {/* Rotating dome background (colour, slow horizontal auto-rotation) */}
      <div className="absolute left-0 top-[-20vh] z-0 h-[140vh] w-full">
        <DomeGallery
          fit={1}
          fitBasis="max"
          minRadius={600}
          maxVerticalRotationDeg={0}
          segments={34}
          dragDampening={2}
          autoRotate
          autoRotateSpeed={1}
          grayscale={false}
        />
      </div>

      {/* Black overlay so the text (and header) stays clear over the imagery.
          A flat tint plus a touch more darkening toward the centre where the
          title sits. */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-black/70" />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.6)_0%,transparent_65%)]" />

      {/* Main Content — Title only, vertically centered */}
      <div className="relative z-10 flex min-h-screen w-full flex-1 flex-col items-center justify-center px-6 text-center md:px-10 pointer-events-none">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-15 ml-[3px] inline-flex items-center text-md font-semibold uppercase tracking-widest bg-linear-to-r from-[#2E5BFF] to-[#149CCB] bg-clip-text text-transparent"
        >
          Selected Work
        </motion.div>

        {/* Title Container */}
        <motion.h1
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-6 flex flex-col items-center text-5xl font-bold leading-[1em] tracking-tight text-white sm:text-6xl md:text-[95px] lg:text-[118px] xl:text-[135px]"
        >
          {/* Line 1 */}
          <span className="flex items-center justify-center whitespace-nowrap">
            <motion.span variants={wordVariants}>Our</motion.span>
            <motion.span variants={wordVariants} className="ml-3 md:ml-6">
              Creative
            </motion.span>
          </span>

          {/* Line 2 */}
          <span className="mt-2 flex space-x-3 md:mt-4 md:space-x-6">
            <motion.span variants={wordVariants}>
              <span className="bg-linear-to-r from-[#2E5BFF] to-[#149CCB] bg-clip-text text-transparent">
                Portfolio
              </span>
            </motion.span>
          </span>
        </motion.h1>
      </div>
    </main>
  );
}
