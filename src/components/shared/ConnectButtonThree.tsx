"use client";

import { motion } from "framer-motion";
import React from "react";
import { MdArrowOutward } from "react-icons/md";

export default function ConnectButtonThree({ onClick, className = "" }: any) {
  return (
    <motion.button
      onClick={onClick}
      initial="initial"
      whileHover="hover"
      // Framer Motion handles the laggy border-radius calculation
      variants={{
        initial: { borderRadius: "8px" },
        hover: { borderRadius: "9999px" },
      }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      // Re-added the 'group' class here so the CSS arrow animations work!
      className={`group flex h-14 w-fit cursor-pointer items-center justify-between gap-4 bg-white pl-5 pr-1.5 shadow-lg ${className}`}
    >
      {/* TEXT */}
      <span className="text-[15px] font-bold tracking-tight text-black">
        Connect With Us
      </span>

      {/* ARROW CONTAINER */}
      <motion.div
        variants={{
          initial: { borderRadius: "8px" },
          hover: { borderRadius: "9999px" },
        }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        // Tailwind seamlessly handles the scale transform
        className="relative flex h-9 w-9 items-center justify-center overflow-hidden bg-black text-white transition-transform duration-300 ease-out group-hover:scale-90"
      >
        {/* FIRST ICON (Animates OUT) */}
        <MdArrowOutward className="absolute z-10 h-4 w-4 transition-transform duration-300 group-hover:-translate-y-6 group-hover:translate-x-6" />

        {/* SECOND ICON (Animates IN) */}
        <MdArrowOutward className="absolute z-10 h-4 w-4 -translate-x-6 translate-y-6 transition-transform duration-300 group-hover:translate-x-0 group-hover:translate-y-0" />
      </motion.div>
    </motion.button>
  );
}
