// src/components/home/ServiceSection.tsx
"use client";

import { useGSAP } from "@gsap/react";
import { motion, type Variants } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useRef } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const serviceBlocks = [
  {
    id: "01",
    bannerTitle: "Development",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2000&auto=format&fit=crop",
    grayscale: false,
    title: "Development Services Building robust, scalable, and intuitive",
    desc: "Building robust, scalable, and intuitive digital experiences through cutting-edge web, app, and custom software engineering.Building robust, scalable, and intuitive digital experiences through cutting-edge",
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
    image:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000&auto=format&fit=crop",
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
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2000&auto=format&fit=crop",
    grayscale: false,
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
    image:
      "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2000&auto=format&fit=crop",
    grayscale: false,
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

        // 🌟 ONLY PLAYS ONCE ON ENTRY (No more scrubbing) 🌟
        gsap.fromTo(
          giantNumber,
          { opacity: 0, x: -100, scale: 0.9 },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: row,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          },
        );
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
            className={`service-row relative flex w-full flex-col gap-16 lg:gap-20 ${index > 0 ? "mt-32" : ""}`}
          >
            <div className="banner-container relative flex h-[300px] w-full items-center justify-center overflow-hidden lg:h-[500px] bg-zinc-900">
              <Image
                src={block.image}
                alt={block.bannerTitle}
                fill
                priority={index === 0}
                className={`object-cover object-center opacity-60 ${block.grayscale ? "grayscale" : ""}`}
              />

              <div className="absolute inset-0 z-10 bg-gradient-to-t from-black via-transparent to-black/40" />

              {/* 🌟 BANNER TITLE (Clean Framer Motion slide-up on entry) 🌟 */}
              <motion.h1
                variants={titleContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="absolute bottom-8 left-8 z-20 flex flex-wrap items-start gap-[0.2em] text-5xl font-bold tracking-tight text-white drop-shadow-2xl md:bottom-12 md:left-16 md:text-8xl lg:text-8xl"
              >
                {block.bannerTitle.split(" ").map((word, i) => (
                  <div key={i} className="overflow-hidden pb-4">
                    <motion.span
                      variants={titleWord}
                      className="inline-block origin-bottom font-black uppercase"
                    >
                      {word}
                    </motion.span>
                  </div>
                ))}
              </motion.h1>
            </div>

            <div className="relative flex w-full flex-col gap-10 px-6 lg:flex-row lg:gap-20 lg:px-16">
              <div className="relative w-full lg:w-[30%]">
                <div className="left-pin-target z-0 flex overflow-visible px-8 lg:sticky lg:top-0 lg:justify-start">
                  <p className="giant-number pointer-events-none select-none overflow-visible bg-[linear-gradient(90deg,#2E5BFF,#149CCB,#2E5BFF,#149CCB,#2E5BFF)] bg-[length:220%_100%] bg-clip-text pb-6 text-[10rem] font-medium leading-[0.8] tracking-normal text-transparent animate-[gradientMove_6s_linear_infinite] md:text-[16rem] lg:text-[18rem]">
                    {block.id}
                  </p>
                </div>
              </div>

              <div className="relative z-10 flex w-full flex-col items-start justify-between gap-16 lg:w-[65%] lg:gap-24 lg:pb-5">
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  variants={staggerContainer}
                  className="flex max-w-4xl flex-col items-start gap-6"
                >
                  <motion.h2
                    variants={titleContainer}
                    className="flex flex-wrap text-4xl font-bold leading-[0.9] tracking-tight text-white md:text-5xl lg:text-5xl"
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
                    className="text-base leading-[1.3] text-zinc-400 md:text-lg"
                  >
                    {block.desc}
                  </motion.p>
                </motion.div>

                <motion.ul
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={staggerContainer}
                  className="flex w-full flex-col border-t border-white/50"
                >
                  {block.items.map((item, i) => (
                    <motion.li
                      key={i}
                      variants={fadeUpVariant}
                      className="group relative flex cursor-pointer items-center justify-between overflow-hidden border-b border-white/50 px-4 py-6 transition-colors duration-500 ease-out md:px-6 md:py-6"
                    >
                      <div className="flex items-center">
                        {/* FIXED: Changed md:group-hover:w-32 to md:group-hover:w-20 to exactly match the image size.
        Adjust the mr-2 / md:group-hover:mr-4 to increase/decrease the actual text gap.
      */}
                        <div className="relative w-0 overflow-hidden opacity-0 transition-all duration-500 ease-[0.22,1,0.36,1] group-hover:mr-2 group-hover:w-20 group-hover:opacity-100 md:group-hover:mr-4 md:group-hover:w-20">
                          <div className="relative h-12 w-20 overflow-hidden rounded-lg md:h-16 md:w-20">
                            <Image
                              src={block.image}
                              alt={item.title}
                              fill
                              className="scale-90 object-cover transition-transform duration-700 ease-out group-hover:scale-100"
                            />
                          </div>
                        </div>

                        <p className="relative z-10 text-2xl font-medium tracking-tight text-white transition-colors duration-500 ease-[0.22,1,0.36,1] group-hover:text-white md:text-4xl lg:text-[2rem]">
                          {item.title}
                        </p>
                      </div>
                    </motion.li>
                  ))}

                  {/* MINIMAL CTA WITH REACT-ICONS ARROW ANIMATION */}
                  {/* <motion.li variants={fadeUpVariant} className="mt-10 block">
                    <a
                      href="#contact"
                      className="group flex w-fit items-center gap-2 text-lg font-medium text-white transition-colors"
                    >
                      <span className="relative overflow-hidden pb-1">
                        Let&apos;s Connect
                        <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#2E5BFF] transition-all duration-300 ease-out group-hover:w-full" />
                      </span>

                      <div className="relative flex h-6 w-6 items-center justify-center overflow-hidden">
                        <MdKeyboardArrowRight className="absolute left-0 top-0 h-full w-full transition-transform duration-300 ease-in-out group-hover:translate-x-[150%]" />

                        <MdKeyboardArrowRight className="absolute left-0 top-0 h-full w-full -translate-x-[150%] transition-transform duration-300 ease-in-out group-hover:translate-x-0" />
                      </div>
                    </a>
                  </motion.li> */}
                </motion.ul>
              </div>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
