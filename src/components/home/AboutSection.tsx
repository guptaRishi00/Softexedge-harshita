"use client";

import { motion, AnimatePresence } from "framer-motion";
import DynamicButton from "../ui/DynamicButton";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef, useEffect, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

/* =========================================
   REPEATING SCROLL TITLE ANIMATION
   Animates EVERY time section enters viewport
========================================= */

function AnimatedTitle({ text }: { text: string }) {
  const words = text.split(" ");

  return (
    <div className="flex flex-wrap leading-[0.95]">
      {words.map((word, index) => (
        <motion.span
          key={index}
          initial={{
            opacity: 0,
            y: 140,
            rotate: 6,
            filter: "blur(12px)",
          }}
          whileInView={{
            opacity: 1,
            y: 0,
            rotate: 0,
            filter: "blur(0px)",
          }}
          viewport={{
            once: false, // IMPORTANT
            amount: 0.4,
          }}
          transition={{
            duration: 1,
            delay: index * 0.05,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mr-4 inline-block will-change-transform"
        >
          {word === "cinematic" || word === "brands." ? (
            <span className="bg-gradient-to-r from-[#3445E7] via-[#2F85EA] to-[#07D6F3] bg-clip-text text-transparent">
              {word}
            </span>
          ) : (
            word
          )}
        </motion.span>
      ))}
    </div>
  );
}

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  /* =========================================
     CAROUSEL
  ========================================= */

  const images = [
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop",
  ];

  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  /* =========================================
     GSAP SECTION ANIMATIONS
  ========================================= */

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center",
          end: "bottom center",
          scrub: 1,
        },
      });

      /* LEFT CONTENT */

      tl.fromTo(
        ".left-content",
        {
          x: -120,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          ease: "power3.out",
        },
        0,
      );

      /* IMAGE */

      tl.fromTo(
        imageRef.current,
        {
          scale: 0.92,
          opacity: 0,
        },
        {
          scale: 1,
          opacity: 1,
          ease: "power3.out",
        },
        0,
      );

      /* CARD */

      tl.fromTo(
        cardRef.current,
        {
          y: 100,
          rotate: 2,
        },
        {
          y: 0,
          rotate: 0,
          ease: "power3.out",
        },
        0,
      );

      /* FLOATING CARD */

      gsap.to(".floating-card", {
        y: -12,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  /* =========================================
     3D PARALLAX
  ========================================= */

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateY = (x / rect.width - 0.5) * 10;
    const rotateX = (y / rect.height - 0.5) * -10;

    gsap.to(cardRef.current, {
      rotateX,
      rotateY,
      transformPerspective: 1000,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  const resetCard = () => {
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 1,
      ease: "elastic.out(1,0.5)",
    });
  };

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative overflow-hidden bg-white px-6 py-24 text-zinc-900 before:absolute before:inset-0 before:bg-[linear-gradient(to_bottom,transparent,rgba(0,0,0,0.02))] md:px-12 lg:px-10"
    >
      {/* NOISE */}

      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.04] mix-blend-multiply" />

      <div className="relative z-10 mx-auto">
        <div className="grid items-center gap-16 lg:grid-cols-[1fr_0.9fr]">
          {/* =========================================
              LEFT CONTENT
          ========================================= */}

          <div className="left-content relative">
            <motion.p
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8 }}
              className="mb-6 text-sm uppercase tracking-[0.3em] text-zinc-500"
            >
              About The Studio
            </motion.p>

            {/* =========================================
                TITLE
            ========================================= */}

            <h1 className="max-w-5xl text-5xl font-semibold leading-[0.95] tracking-[-0.06em] md:text-7xl lg:text-6xl">
              <AnimatedTitle text="Building cinematic digital products for the next generation of brands." />
            </h1>

            {/* DESCRIPTION */}

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{
                duration: 1,
                delay: 0.4,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-10 max-w-xl space-y-6"
            >
              <p className="text-base leading-relaxed text-zinc-600">
                We design immersive identities, motion-rich interfaces, and
                scalable digital systems that feel sharp, intentional, and
                unforgettable.
              </p>

              <p className="text-sm leading-relaxed text-zinc-500">
                Combining strategy, development, animation, and AI-enhanced
                creative workflows, every experience is crafted to leave a
                lasting visual fingerprint.
              </p>

              {/* BUTTONS */}

              <motion.div
                initial={{ opacity: 0, x: -25 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false }}
                transition={{ delay: 0.8 }}
                className="flex flex-wrap gap-4 pt-3"
              >
                <DynamicButton
                  text="Start Project"
                  href="#contact"
                  className="border border-black/20 px-6 py-4 text-base"
                />

                <button className="group flex items-center gap-2 rounded-full border border-black/10 px-5 py-4 text-sm text-zinc-700 transition-all duration-300 hover:border-black/20 hover:bg-black/[0.03] hover:text-black">
                  View Case Studies
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
                </button>
              </motion.div>
            </motion.div>
          </div>

          {/* =========================================
              RIGHT VISUAL
          ========================================= */}

          <motion.div
            initial={{ opacity: 0, x: 120 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{
              duration: 1.2,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative flex items-center justify-center"
          >
            {/* GLOW RINGS */}

            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                repeat: Infinity,
                duration: 30,
                ease: "linear",
              }}
              className="absolute h-[520px] w-[520px] rounded-full border border-black/10"
            />

            <motion.div
              animate={{ rotate: -360 }}
              transition={{
                repeat: Infinity,
                duration: 40,
                ease: "linear",
              }}
              className="absolute h-[420px] w-[420px] rounded-full border border-black/[0.06]"
            />

            {/* MAIN CARD */}

            <motion.div className="relative w-full max-w-[600px]">
              <div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={resetCard}
                className="group relative overflow-hidden rounded-[36px] border border-black/10 bg-white/80 p-4 shadow-[0_20px_80px_rgba(0,0,0,0.08)] backdrop-blur-2xl will-change-transform"
              >
                {/* OVERLAY */}

                <div className="absolute inset-0 bg-gradient-to-b from-black/[0.03] to-transparent" />

                {/* IMAGE */}

                <div className="relative overflow-hidden rounded-[28px]">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={currentImage}
                      ref={imageRef}
                      src={images[currentImage]}
                      alt="Creative Studio"
                      initial={{ opacity: 0, x: 100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{
                        duration: 0.9,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="h-[560px] w-full object-cover will-change-transform"
                    />
                  </AnimatePresence>

                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                  {/* INDICATORS */}

                  <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 gap-2">
                    {images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImage(index)}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          currentImage === index
                            ? "w-8 bg-white"
                            : "w-2 bg-white/50"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* FLOATING CARD */}

                <motion.div className="floating-card absolute bottom-8 left-8 right-8 rounded-2xl border border-black/10 bg-white/80 p-5 shadow-xl backdrop-blur-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">
                        Creative Process
                      </p>

                      <h3 className="mt-2 text-2xl font-medium leading-tight text-zinc-900">
                        Strategy meets motion
                        <br />
                        and immersive design.
                      </h3>
                    </div>

                    <div className="flex h-12 w-12 items-center justify-center rounded-full border border-black/10 bg-black/[0.04]">
                      <ArrowUpRight className="h-5 w-5 text-zinc-900" />
                    </div>
                  </div>
                </motion.div>

                {/* LIGHT EFFECT */}

                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <div className="absolute -left-20 top-0 h-60 w-60 rounded-full bg-blue-200/40 blur-3xl" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
