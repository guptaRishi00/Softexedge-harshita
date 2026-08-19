"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const premiumEase = [0.22, 1, 0.36, 1] as const;

export const STEP = 190;

const contentContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
} as const;

const contentItem = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: premiumEase },
  },
} as const;

export default function Card({
  i,
  imageHidden,
  registerRef,
  title1,
  title2,
  description,
  tags,
  link,
  color,
  image,
}: any) {
  return (
    <div
      ref={registerRef}
      className="sticky w-full max-md:static max-md:[transform:none]! max-md:[margin-bottom:0px]!"
      style={{
        top: "5vh",
        transform: `translateY(${i * STEP}px)`,
        marginBottom: `max(0px, calc(22vh - ${STEP}px))`,
        zIndex: i,
      }}
    >
      <div
        className={`relative grid min-h-[50vh] md:h-[600px] w-full origin-top grid-cols-1 gap-12 overflow-hidden border-t border-white/10 ${color} px-4 max-md:px-3 md:px-10 pb-24 pt-12 md:min-h-0 md:grid-cols-2 md:gap-16`}
      >
        <motion.div
          variants={contentContainer}
          data-no-mobile-entry
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-120px" }}
          className="flex w-full flex-col gap-12 md:gap-16 pr-4"
        >
          <motion.a
            data-no-mobile-entry
            variants={contentItem}
            href={link}
            className="group inline-block"
          >
            <h3 className="text-5xl font-medium tracking-tight text-white md:text-6xl lg:text-7xl">
              {title1}
              {title1 === "E" ? "-" : " "}
              {title2}
            </h3>
          </motion.a>

          <motion.p
            data-no-mobile-entry
            variants={contentItem}
            className="max-w-xl text-lg font-light leading-[1.4em] text-zinc-300 md:text-xl"
          >
            {description}
          </motion.p>

          {tags && tags.length > 0 && (
            <motion.div
              data-no-mobile-entry
              variants={contentItem}
              className="flex flex-wrap items-center gap-3 pt-4"
            >
              {tags.map((tag: string, index: number) => (
                <span
                  key={index}
                  className="rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-sm font-medium tracking-wide text-zinc-300 transition-colors "
                >
                  {tag}
                </span>
              ))}
            </motion.div>
          )}
        </motion.div>

        <div className="relative w-full h-[350px] md:h-[450px] overflow-hidden rounded-2xl">
          {image && (
            <Image
              src={image}
              alt={`${title1} ${title2}`}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className={`h-full w-full object-cover transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                imageHidden ? "scale-105 opacity-0" : "scale-100 opacity-100"
              }`}
            />
          )}
        </div>
      </div>
    </div>
  );
}
