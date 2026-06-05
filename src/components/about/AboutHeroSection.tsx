"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Header from "../page/Header";

const premiumEase = [0.22, 1, 0.36, 1] as const;

function AvatarGroup() {
  const [isHovered, setIsHovered] = useState(false);

  const avatars = [
    {
      name: "Sarah Chen",
      url: "https://images.unsplash.com/photo-1780387477222-730504564368?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDJ8dG93SlpGc2twR2d8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Marcus Doe",
      url: "https://plus.unsplash.com/premium_photo-1773833961204-e6534b9913e3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDE3fHRvd0paRnNrcEdnfHxlbnwwfHx8fHw%3D",
    },
    {
      name: "Elena Rostova",
      url: "https://images.unsplash.com/photo-1779399147786-316f949446bb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDE5fHRvd0paRnNrcEdnfHxlbnwwfHx8fHw%3D",
    },
    {
      name: "James Wilson",
      url: "https://plus.unsplash.com/premium_photo-1688572454849-4348982edf7d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDI2fHRvd0paRnNrcEdnfHxlbnwwfHx8fHw%3D",
    },
  ];

  return (
    <div
      className="flex py-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {avatars.map((avatar, index) => (
        <motion.div
          key={index}
          // Drive the animation using state for the group, and whileHover for the individual avatar
          initial="initial"
          animate={isHovered ? "groupHover" : "initial"}
          whileHover="hover"
          variants={{
            initial: {
              scale: 1,
              zIndex: 0,
              marginLeft: index === 0 ? 0 : -14, // Stacked tight (like -space-x-3.5)
            },
            groupHover: {
              scale: 1,
              zIndex: 10,
              marginLeft: index === 0 ? 0 : 6, // Expanded out (like space-x-1.5)
            },
            hover: {
              scale: 1.15,
              zIndex: 50,
              marginLeft: index === 0 ? 0 : 6, // Keep expanded spacing when hovering one
            },
          }}
          transition={{ duration: 0.5, ease: premiumEase }}
          className="relative flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full bg-gradient-to-r from-[#2E5BFF] to-[#75ddff] p-[2px] shadow-sm transition-shadow hover:shadow-md"
        >
          <img
            className="h-full w-full rounded-full object-cover"
            src={avatar.url}
            alt={`Team member ${avatar.name}`}
          />

          {/* Animated Tooltip */}
          <motion.div
            variants={{
              initial: { opacity: 0, y: 5, scale: 0.8, pointerEvents: "none" },
              groupHover: {
                opacity: 0,
                y: 5,
                scale: 0.8,
                pointerEvents: "none",
              }, // Keep hidden unless directly hovering
              hover: { opacity: 1, y: 0, scale: 1, pointerEvents: "auto" },
            }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded-md bg-zinc-900 px-2.5 py-1 text-[10px] font-medium tracking-wide text-white shadow-xl"
          >
            {avatar.name}
            {/* Tooltip Triangle Pointer */}
            <div className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-zinc-900" />
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}

export default function AboutHeroSection() {
  return (
    <main className="flex min-h-screen w-full flex-col bg-white font-sans text-black">
      <Header />

      <section className="flex w-full flex-1 flex-col items-center justify-center py-12 lg:py-10 mt-40">
        <div className="w-full px-6 lg:px-12">
          <div className="mb-12 flex w-full flex-col justify-between gap-10 md:flex-row md:items-start lg:mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: premiumEase }}
              className="flex flex-col md:w-3/5 lg:w-1/2"
            >
              <p className="mb-6 text-xs font-bold uppercase tracking-widest text-gray-800">
                ABOUT US
              </p>
              <h1 className="text-4xl font-bold leading-[1.1] tracking-tight text-black md:text-5xl lg:text-[4rem]">
                Journey towards
                <br />
                digital excellence
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: premiumEase }}
              className="flex flex-col gap-4 md:w-2/5 lg:w-[35%]"
            >
              <AvatarGroup />
              <p className="text-base text-black font-medium leading-[1.3em] lg:text-lg">
                Softexedge is a premier digital marketing agency committed to
                driving growth, innovation, and impactful brand strategies —
                trusted for measurable results and creative excellence.
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: premiumEase }}
            className="grid h-[400px] w-full grid-cols-1 gap-4 md:h-[500px] md:grid-cols-12 lg:h-[600px] lg:gap-6"
          >
            <div className="relative col-span-1 h-full w-full overflow-hidden rounded-[2rem] md:col-span-4 lg:col-span-4">
              <img
                src="/assets/microsoft-copilot-pqMPnPo4_ZA-unsplash.jpg"
                alt="Creative marketing workspace"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>

            <div className="relative col-span-1 h-full w-full overflow-hidden rounded-[2rem] md:col-span-8 lg:col-span-8">
              <img
                src="/assets/alex-kotliarskyi-QBpZGqEMsKg-unsplash.jpg"
                alt="Team analyzing digital marketing data"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
