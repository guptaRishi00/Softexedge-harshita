"use client";

import { useGSAP } from "@gsap/react";
import { motion, type Variants } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useRef } from "react";
import Grainient from "../ui/Grainient";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const serviceBlocks = [
  {
    id: "01",
    bannerTitle: "Branding & Identity",
    image: "/assets/branding.webp",
    grayscale: true,
    title: "Designing the Future With Intelligent Creative Systems",
    desc: "I use AI as a creative amplifier—building custom tools, producing on-brand imagery, training custom LoRAs, and designing automated workflows that accelerate output. Across image, video, audio, copy, and code, AI removes the friction once inherent in ideation and iteration.",
    items: [
      { title: "Generative AI Systems", number: "01" },
      { title: "Brand Strategy & Architecture", number: "02" },
      { title: "Visual Identity Design", number: "03" },
      { title: "Automated Workflows", number: "04" },
    ],
  },
  {
    id: "02",
    bannerTitle: "Digital Experiences",
    image: "/assets/branding.webp",
    grayscale: false,
    title: "Crafting Immersive Web & App Interfaces",
    desc: "Every digital touchpoint should feel intentional. I design and develop high-performance, motion-rich websites and applications that do more than just function—they leave a lasting impression. From WebGL experiments to robust full-stack applications.",
    items: [
      { title: "Interactive Web Design", number: "01" },
      { title: "Full-Stack Development", number: "02" },
      { title: "Creative Coding & WebGL", number: "03" },
      { title: "UI/UX Systems", number: "04" },
    ],
  },
];

const fadeUpVariant: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export default function ServiceSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // IMAGE REVEAL
      const banners = gsap.utils.toArray(".banner-container");

      banners.forEach((banner: any) => {
        const image = banner.querySelector(".banner-image");

        gsap.fromTo(
          banner,
          {
            clipPath: "inset(15% 5% 15% 5% round 0px)",
          },
          {
            clipPath: "inset(0% 0% 0% 0% round 0px)",
            ease: "none",
            scrollTrigger: {
              trigger: banner,
              start: "top 90%",
              end: "center center",
              scrub: true,
            },
          },
        );

        gsap.fromTo(
          image,
          {
            scale: 1.2,
          },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: banner,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      });

      // SERVICE ROW ANIMATIONS
      const serviceRows = gsap.utils.toArray(".service-row");

      serviceRows.forEach((row: any) => {
        const giantNumber = row.querySelector(".giant-number");

        // NUMBER REVEAL (Restored)
        gsap.fromTo(
          giantNumber,
          {
            opacity: 0,
            x: -100,
            scale: 0.9,
          },
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

        // SUBTLE PARALLAX (Restored so it "moves like the same")
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
    <section
      ref={containerRef}
      id="services"
      className="relative w-full min-h-screen overflow-clip bg-white py-20 md:pt-10"
    >
      {serviceBlocks.map((block, index) => (
        <div
          key={block.id}
          className={`service-row relative flex w-full flex-col gap-16 lg:gap-32 ${
            index > 0 ? "mt-32" : ""
          }`}
        >
          {/* HERO SECTION */}
          <div className="banner-container relative flex h-[400px] w-full items-center justify-center overflow-hidden lg:h-[600px]">
            <Grainient
              color1="#3445E7"
              color2="#2F85EA"
              color3="#07D6F3"
              timeSpeed={0.7}
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
              className={`banner-image absolute top-10 w-full max-w-7xl object-top lg:-top-10 ${
                block.grayscale ? "grayscale" : ""
              }`}
            />

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, delay: 0.2 }}
              className="absolute bottom-8 left-8 z-20 flex flex-col items-start gap-3 text-5xl font-bold tracking-tight text-white drop-shadow-2xl md:bottom-12 md:left-16 md:text-8xl lg:text-9xl"
            >
              {block.bannerTitle}
            </motion.h1>
          </div>

          {/* CONTENT SECTION */}
          <div className="relative flex w-full flex-col gap-10 px-6 lg:flex-row lg:gap-20 lg:px-16">
            {/* LEFT SIDE - STICKY CONTAINER */}
            <div className="relative w-full lg:w-[35%]">
              {/* Added lg:sticky so it only pins on desktop and restored the smooth flex layout */}
              <div className="left-pin-target lg:sticky lg:top-32 flex items-center justify-center lg:justify-start z-0">
                <p className="giant-number pointer-events-none select-none text-[10rem] font-black leading-[0.7] tracking-[-0.08em] text-black/[0.07] md:text-[16rem] lg:text-[24rem]">
                  {block.id}
                </p>
              </div>
            </div>

            {/* RIGHT SIDE - SCROLLING CONTENT */}
            <div className="relative z-10 flex w-full flex-col items-start justify-between gap-16 lg:w-[65%] lg:gap-24 lg:pb-32">
              {/* TEXT */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={staggerContainer}
                className="flex max-w-4xl flex-col items-start gap-6"
              >
                <motion.h2
                  variants={fadeUpVariant}
                  className="text-4xl font-bold leading-[1.1] tracking-tight text-black md:text-5xl lg:text-6xl"
                >
                  {block.title}
                </motion.h2>

                <motion.p
                  variants={fadeUpVariant}
                  className="text-base leading-relaxed text-zinc-500 md:text-lg"
                >
                  {block.desc}
                </motion.p>
              </motion.div>

              {/* SERVICES */}
              <motion.ul
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={staggerContainer}
                className="flex w-full flex-col border-t border-black/10"
              >
                {block.items.map((item, i) => (
                  <motion.li
                    key={i}
                    variants={fadeUpVariant}
                    className="group relative flex cursor-pointer items-center justify-between overflow-hidden border-b border-black/10 px-6 py-6 transition-colors duration-500 ease-out hover:text-white md:px-8 md:py-8"
                  >
                    {/* BG HOVER */}
                    <div className="absolute inset-0 z-0 translate-y-full bg-black transition-transform duration-500 ease-[0.16,1,0.3,1] group-hover:translate-y-0" />

                    {/* TITLE */}
                    <p className="relative z-10 text-xl font-medium transition-transform duration-500 ease-[0.16,1,0.3,1] group-hover:translate-x-4 md:text-2xl">
                      {item.title}
                    </p>

                    {/* NUMBER */}
                    <p className="relative z-10 font-mono text-lg opacity-40 transition-all duration-500 group-hover:opacity-100 md:text-xl">
                      {item.number}
                    </p>
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
