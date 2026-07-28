"use client"; 

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import Header from "../layout/Header";

const premiumEase = [0.16, 1, 0.3, 1] as const;

const APPEAR_DELAY = 0.1;
const LINE_STAGGER = 0.18;

export default function Herosection({}: any) {
  const mainVideoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const video = mainVideoRef.current;
    const canvas = canvasRef.current;

    if (!video || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const drawFrame = () => {
      if (!video.paused && !video.ended) {
        if (canvas.width !== video.videoWidth && video.videoWidth > 0) {
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
        }

        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      }

      animationFrameId = requestAnimationFrame(drawFrame);
    };

    video.addEventListener("play", drawFrame);

    return () => {
      video.removeEventListener("play", drawFrame);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="relative min-h-[100svh] rounded-[20px] overflow-hidden bg-zinc-950 lg:min-h-[96.5vh]">
      <video
        ref={mainVideoRef}
        src="/assets/hero.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 z-10 backdrop-blur-xl" />

      <Header />

      <div className="absolute z-20 p-5 w-full flex flex-col items-center justify-center gap-10 h-full">
        <div className="w-full flex items-center justify-center text-center">
          <div className="flex flex-col items-center justify-center gap-4">
            <motion.h1
              initial={{ opacity: 0, y: 28, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{
                duration: 0.7,
                delay: APPEAR_DELAY,
                ease: premiumEase,
              }}
              className="text-4xl md:text-5xl lg:text-9xl font-bold text-white"
            >
              We Engineer
            </motion.h1>

            <div className="flex items-center justify-center gap-2 md:gap-5">
              <motion.p
                initial={{ opacity: 0, y: 28, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  duration: 0.7,
                  delay: APPEAR_DELAY + LINE_STAGGER,
                  ease: premiumEase,
                }}
                className="text-4xl md:text-5xl lg:text-9xl font-bold text-white"
              >
                Digital
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 28, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  duration: 0.7,
                  delay: APPEAR_DELAY + LINE_STAGGER * 2,
                  ease: premiumEase,
                }}
                className="w-16 h-10 sm:w-24 sm:h-14 md:w-[150px] md:h-[80px] lg:w-[200px] lg:h-[106px] xl:w-[220px] xl:h-[118px] overflow-hidden rounded-[20px] shrink-0 flex items-center justify-center border border-white/20 shadow-xl">
                <canvas
                  ref={canvasRef}
                  className="w-full h-full object-cover"
                />
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 28, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  duration: 0.7,
                  delay: APPEAR_DELAY + LINE_STAGGER * 3,
                  ease: premiumEase,
                }}
                className="text-4xl md:text-5xl lg:text-9xl font-bold text-white"
              >
                Solutions
              </motion.p>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 28, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{
                duration: 0.7,
                delay: APPEAR_DELAY + LINE_STAGGER * 4,
                ease: premiumEase,
              }}
              className="text-lg md:text-xl lg:text-5xl font-medium text-white mt-5"
            >
              crafted for impact
            </motion.p>
          </div>
        </div>
      </div>
    </div>
  );
}
