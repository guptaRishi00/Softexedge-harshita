"use client";

import { useGSAP } from "@gsap/react";
import { motion, type Variants } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useRef } from "react";
import Grainient from "../ui/Grainient";
import DynamicButton from "../ui/DynamicButton"; // Imported DynamicButton

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const serviceBlocks = [
  {
    id: "01",
    bannerTitle: "Development",
    image: "/assets/branding.webp",
    grayscale: false,
    title: "Development Services",
    desc: "Building robust, scalable, and intuitive digital experiences through cutting-edge web, app, and custom software engineering.",
    items: [
      { title: "Mobile App Development", number: "01" },
      { title: "UI/UX Design", number: "02" },
      { title: "Web Development", number: "03" },
      { title: "Custom Software Development", number: "04" },
      { title: "E Commerce", number: "04" },
    ],
  },
  {
    id: "02",
    bannerTitle: "Creative & Branding",
    image: "/assets/branding.webp",
    grayscale: false,
    title: "Creative & Branding Services",
    desc: "Crafting distinct visual identities and strategic brand narratives that resonate with your audience and leave a lasting impression.",
    items: [
      { title: "Logo Design", number: "01" },
      { title: "Poster Design", number: "02" },
      { title: "Brand Strategy", number: "03" },
    ],
  },
  {
    id: "03",
    bannerTitle: "Digital Marketing",
    image: "/assets/digital_creative_top.webp",
    grayscale: true,
    title: "Digital Marketing Services",
    desc: "Data-driven strategies designed to amplify your online presence, engage your target audience, and maximize ROI across all digital channels.",
    items: [
      { title: "SEO Services", number: "01" },
      { title: "Social Media Management", number: "02" },
      { title: "Influencer Marketing", number: "03" },
      { title: "Paid Advertising (PPC)", number: "04" },
      { title: "Content Marketing", number: "05" },
    ],
  },

  {
    id: "04",
    bannerTitle: "Videography",
    image: "/assets/branding.webp",
    grayscale: true,
    title: "Videography Services",
    desc: "High-quality, compelling visual storytelling tailored for modern platforms, from corporate communications to viral social media content.",
    items: [
      { title: "Corporate Video Production", number: "01" },
      { title: "Instagram Reels Production", number: "02" },
      { title: "Video Ad Production", number: "03" },
    ],
  },
];

const fadeUpVariant: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const titleContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const titleWord: Variants = {
  hidden: { opacity: 0, y: "100%", rotateX: -20 },
  visible: {
    opacity: 1,
    y: "0%",
    rotateX: 0,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function ServiceSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const serviceRows = gsap.utils.toArray(".service-row");

      serviceRows.forEach((row: any) => {
        const giantNumber = row.querySelector(".giant-number");

        gsap.fromTo(
          giantNumber,
          { opacity: 0, x: -100, scale: 0.9 },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: row,
              start: "top 80%",
              end: "top 30%",
              scrub: 1,
            },
          },
        );

        gsap.to(giantNumber, {
          yPercent: 15,
          ease: "none",
          scrollTrigger: {
            trigger: row,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    },
    { scope: containerRef },
  );

  return (
    <>
      <style jsx global>{`
        @keyframes gradientMove {
          0% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 200% 50%;
          }
        }
      `}</style>

      <section
        ref={containerRef}
        id="services"
        className="relative min-h-screen w-full overflow-clip bg-black py-20 md:pt-0"
      >
        {serviceBlocks.map((block, index) => (
          <div
            key={block.id}
            className={`service-row relative flex w-full flex-col gap-16 lg:gap-32 ${index > 0 ? "mt-32" : ""}`}
          >
            <div className="banner-container relative flex h-[400px] w-full items-center justify-center overflow-hidden lg:h-[600px]">
              <Grainient
                color1="#3445E7"
                color2="#2F85EA"
                color3="#07D6F3"
                timeSpeed={2}
                colorBalance={-0.04}
                warpStrength={3.2}
                warpFrequency={5}
                warpSpeed={2}
                warpAmplitude={50}
                blendAngle={-135}
                blendSoftness={0}
                rotationAmount={500}
                noiseScale={2}
                grainAmount={0.1}
                grainScale={2}
                grainAnimated={false}
                contrast={1.5}
                gamma={1}
                saturation={1}
                centerX={0}
                centerY={0}
                zoom={0.9}
              />

              <Image
                src={block.image}
                alt={block.bannerTitle}
                width={1200}
                height={800}
                priority={index === 0}
                className={`banner-image absolute top-10 w-full max-w-7xl object-top lg:-top-10 ${block.grayscale ? "grayscale" : ""}`}
              />

              <motion.h1
                variants={titleContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, margin: "-100px" }}
                className="absolute bottom-8 left-8 z-20 flex flex-wrap items-start gap-[0.2em] text-5xl font-bold tracking-tight text-white drop-shadow-2xl md:bottom-12 md:left-16 md:text-8xl lg:text-7xl"
              >
                {block.bannerTitle.split(" ").map((word, i) => (
                  <div key={i} className="overflow-hidden pb-4">
                    <motion.span
                      variants={titleWord}
                      className="inline-block origin-bottom uppercase font-black"
                    >
                      {word}
                    </motion.span>
                  </div>
                ))}
              </motion.h1>
            </div>

            <div className="relative flex w-full flex-col gap-10 px-6 lg:flex-row lg:gap-20 lg:px-16">
              <div className="relative w-full lg:w-[35%]">
                <div className="left-pin-target z-0 flex overflow-visible px-8 lg:sticky lg:top-32 lg:justify-start">
                  <p className="giant-number pointer-events-none select-none overflow-visible bg-[linear-gradient(90deg,#2E5BFF,#149CCB,#2E5BFF,#149CCB,#2E5BFF)] bg-[length:220%_100%] bg-clip-text pb-6 text-[10rem] font-black leading-none tracking-normal text-transparent animate-[gradientMove_6s_linear_infinite] md:text-[16rem] lg:text-[18rem]">
                    {block.id}
                  </p>
                </div>
              </div>

              <div className="relative z-10 flex w-full flex-col items-start justify-between gap-16 lg:w-[65%] lg:gap-24 lg:pb-32">
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false, margin: "-100px" }}
                  variants={staggerContainer}
                  className="flex max-w-4xl flex-col items-start gap-6"
                >
                  <motion.h2
                    variants={titleContainer}
                    className="flex flex-wrap text-4xl font-bold leading-[1.1] tracking-tight text-white md:text-5xl lg:text-5xl"
                  >
                    {block.title.split(" ").map((word, i) => (
                      <div key={i} className="mr-[0.25em] overflow-hidden pb-2">
                        <motion.span
                          variants={titleWord}
                          className="inline-block origin-bottom"
                        >
                          {word}
                        </motion.span>
                      </div>
                    ))}
                  </motion.h2>

                  <motion.p
                    variants={fadeUpVariant}
                    className="text-base leading-relaxed text-zinc-400 md:text-lg"
                  >
                    {block.desc}
                  </motion.p>
                </motion.div>

                <motion.ul
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false, margin: "-50px" }}
                  variants={staggerContainer}
                  className="flex w-full flex-col border-t border-white/10"
                >
                  {block.items.map((item, i) => (
                    <motion.li
                      key={i}
                      variants={fadeUpVariant}
                      className="group relative flex cursor-pointer items-center justify-between overflow-hidden rounded-lg border-b border-white/10 px-6 py-6 text-white transition-colors duration-500 ease-out hover:text-black md:px-8 md:py-8"
                    >
                      <div className="absolute inset-0 z-0 translate-y-full rounded-lg bg-white transition-transform duration-500 ease-[0.16,1,0.3,1] group-hover:translate-y-0" />
                      <p className="relative z-10 text-xl font-medium transition-transform duration-500 ease-[0.16,1,0.3,1] group-hover:translate-x-4 md:text-2xl">
                        {item.title}
                      </p>
                    </motion.li>
                  ))}

                  {/* CTA Button Added Here */}
                  <motion.div variants={fadeUpVariant} className="mt-10">
                    <DynamicButton
                      text="Let's Connect"
                      href="#contact"
                      className=" px-8 py-4"
                    />
                  </motion.div>
                </motion.ul>
              </div>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
