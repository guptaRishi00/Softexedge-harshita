"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import DynamicButton from "../ui/DynamicButton";

const blogPosts = [
  {
    id: 1,
    title:
      "Google IO 2026: What Your C-Suite Needs to Know (AI Mode Google Guide UPDATED)",
    author: "Carrie Rose",
    readTime: "15 mins",
    tag: "Resources",
    image:
      "https://images.unsplash.com/photo-1780006015851-2d1b3bcadbfd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDI1fHFQWXNEenZKT1ljfHxlbnwwfHx8fHw%3D",
  },
  {
    id: 2,
    title:
      "Rise at Seven Exits Sheffield and Triples Manchester as new HQ as they go for global expansion",
    author: "Ray Saddiq",
    readTime: "8 mins",
    tag: "Company News",
    image:
      "https://plus.unsplash.com/premium_photo-1776661561367-93c4100618d6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDIwM3xxUFlzRHp2Sk9ZY3x8ZW58MHx8fHx8",
  },
  {
    id: 3,
    title:
      "Rise at Seven Exits Sheffield and Triples Manchester as new HQ as they go for global expansion",
    author: "Ray Saddiq",
    readTime: "8 mins",
    tag: "Company News",
    image:
      "https://images.unsplash.com/photo-1773332611613-dbdc64f09807?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyMnx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 4,
    title:
      "4 Ways Rise at Seven Exits Sheffield and Triples Manchester as new HQ as they go for global expansion",
    author: "Ray Saddiq",
    readTime: "8 mins",
    tag: "Company News",
    image:
      "https://images.unsplash.com/photo-1654875185977-4a97176ef3f9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDl8fHxlbnwwfHx8fHw%3D",
  },
];

const rotatingWords = ["Perspectives.", "Insights.", "Ideas.", "Stories."];

export default function BlogSection() {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Cycle through the typography words every 4.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  // Card list component to render identical tracks
  const CardTrack = () => (
    <div className="flex shrink-0 gap-4 md:gap-8 lg:gap-5">
      {blogPosts.map((post) => (
        <div
          key={post.id}
          // INCREASED WIDTHS slightly (+5vw across breakpoints)
          className="w-[55vw] shrink-0 sm:w-[40vw] md:w-[30vw] lg:w-[25vw]"
        >
          <article className="group flex h-full cursor-pointer flex-col">
            {/* IMAGE CONTAINER - Kept aspect-square */}
            <div className="relative mb-4 aspect-square w-full overflow-hidden rounded-[1.25rem] bg-zinc-100">
              <Image
                src={post.image}
                alt={post.title}
                fill
                sizes="(max-width: 768px) 55vw, 25vw"
                className="object-cover transition-transform duration-700 ease-[0.16,1,0.3,1] group-hover:scale-105"
              />
              <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </div>

            {/* CARD CONTENT */}
            <div className="flex flex-1 flex-col px-2">
              {/* Moved Author and Read Time above the title */}
              <div className="mb-3 flex items-center gap-2 text-sm font-medium text-zinc-500">
                <span className="text-zinc-800">{post.author}</span>
                <span className="h-1 w-1 rounded-full bg-zinc-300" />
                <span>{post.readTime}</span>
              </div>

              <h3 className="text-lg font-bold leading-[1.2em] tracking-tight text-zinc-900 transition-colors duration-300 group-hover:text-[#2E5BFF] lg:text-xl">
                {post.title}
              </h3>
            </div>
          </article>
        </div>
      ))}
    </div>
  );

  return (
    <section className="w-full overflow-hidden bg-white text-black md:pt-0 pb-40">
      <div className="mx-auto w-full ">
        {/* HEADER LAYER */}
        <div className="mb-30 flex w-full flex-col items-start justify-between gap-8 px-6 md:mb-35 md:flex-row md:items-end md:px-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, margin: "-50px" }}
            className="flex flex-col items-start"
          >
            <h2 className="text-4xl font-bold tracking-tight text-zinc-900 md:text-5xl lg:text-[4.5rem] lg:leading-[1.05]">
              Thoughts & {/* Rotating Gradient Text */}
              <span className="inline-grid overflow-hidden py-1">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={index}
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -30, opacity: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="col-start-1 row-start-1 bg-gradient-to-r from-[#2E5BFF] to-[#149CCB] bg-clip-text pl-3 pr-2 leading-[1.3em] text-transparent"
                  >
                    {rotatingWords[index]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </h2>
          </motion.div>

          {/* Controls & CTA Container */}
          <div className="flex w-full items-center justify-end md:w-auto">
            <DynamicButton
              href="/blog"
              text="Explore all articles"
              className="rounded-2xl border border-black/20 py-5 text-sm"
            />
          </div>
        </div>

        {/* CONTAINER */}
        <div className="relative w-full overflow-hidden">
          {/* Main animated element container holding two identical tracks */}
          <motion.div
            className="flex w-max flex-nowrap gap-4 md:gap-6 lg:gap-3"
            animate={
              isPaused
                ? "paused"
                : {
                    x: ["0%", "-50%"],
                  }
            }
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 22,
                ease: "linear",
              },
            }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <CardTrack />
            <CardTrack />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
