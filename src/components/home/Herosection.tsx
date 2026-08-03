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

    let animationFrameId = 0;

    // The canvas is never wider than 220 CSS px (xl breakpoint), so sizing the
    // backing store to the source video's 1920x1080 meant scaling ~2M pixels
    // down to a thumbnail on every frame. Draw at display size instead (~26k
    // px at 1x). Height is derived from the video so the backing store keeps
    // the video's aspect ratio — CSS `object-cover` then crops exactly as it
    // did before at every breakpoint, i.e. no visual change. DPR is honoured
    // (capped at 2) so it stays sharp on retina, where a flat 220px store
    // would have been upscaled and looked soft.
    const CSS_WIDTH = 220;

    const sizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.round(CSS_WIDTH * dpr);
      const height = Math.round((width * video.videoHeight) / video.videoWidth);
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
    };

    const drawFrame = () => {
      // Stop the loop while paused instead of spinning a no-op frame forever;
      // the "play" listener below restarts it.
      if (video.paused || video.ended) return;

      if (video.videoWidth > 0) sizeCanvas();

      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      animationFrameId = requestAnimationFrame(drawFrame);
    };

    // Cancel first: "play" fires again every time the video is resumed (it is
    // paused offscreen by VideoViewportPause), and without this each resume
    // would leave another concurrent draw loop running.
    const startLoop = () => {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(drawFrame);
    };

    video.addEventListener("play", startLoop);
    if (!video.paused) startLoop();

    return () => {
      video.removeEventListener("play", startLoop);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="relative min-h-[96svh] rounded-[20px] overflow-hidden bg-zinc-950 lg:min-h-[96.5vh]">
      {/* Frosted backdrop: the blur lives on the video's OWN layer (filter),
          not a full-viewport backdrop-filter overlay. backdrop-blur re-captures
          and re-blurs the whole viewport every frame over the moving video;
          blurring the single video layer is the same pixels far cheaper. Same
          24px radius as the old backdrop-blur-xl. scale-110 pushes the ~24px
          filter edge-bleed under the container's rounded overflow-hidden clip.
          The canvas pill stays sharp: ctx.drawImage reads raw frames, which CSS
          filters never touch. */}
      <video
        ref={mainVideoRef}
        src="/assets/video6.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover scale-110 blur-xl"
      />

      <Header />

      <div className="absolute z-20 p-5 w-full flex flex-col items-center justify-center gap-10 h-full">
        <div className="w-full flex items-center justify-center text-center -mt-20 md:mt-0">
          <div className="flex flex-col items-center justify-center gap-2 md:gap-4">
            {/* Mobile-only description (styled as a tag) */}
            <motion.div
              initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{
                duration: 0.7,
                ease: premiumEase,
              }}
              className="md:hidden mb-3 inline-flex items-center justify-center text-md sm:text-sm font-medium text-white"
            >
              Innovate. Build. Scale.
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 28, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{
                duration: 0.7,
                delay: APPEAR_DELAY,
                ease: premiumEase,
              }}
              className="text-5xl sm:text-6xl md:text-5xl lg:text-9xl font-bold text-white tracking-tight leading-[0.9] md:leading-none"
            >
              We Engineer
            </motion.h1>

            <div className="flex flex-wrap items-center justify-center gap-2 md:gap-5">
              <motion.p
                initial={{ opacity: 0, y: 28, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  duration: 0.7,
                  delay: APPEAR_DELAY + LINE_STAGGER,
                  ease: premiumEase,
                }}
                className="text-5xl sm:text-6xl md:text-5xl lg:text-9xl font-bold text-white tracking-tight leading-[0.9] md:leading-none"
              >
                Digital
              </motion.p>

              {/* Canvas is visible on all screens again */}
              <motion.div
                initial={{ opacity: 0, y: 28, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  duration: 0.7,
                  delay: APPEAR_DELAY + LINE_STAGGER * 2,
                  ease: premiumEase,
                }}
                className="flex w-20 h-12 sm:w-28 sm:h-16 md:w-[150px] md:h-[80px] lg:w-[200px] lg:h-[106px] xl:w-[220px] xl:h-[118px] overflow-hidden rounded-[10px] lg:rounded-[20px] shrink-0 items-center justify-center border border-white/20 lg:shadow-xl"
              >
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
                className="text-5xl sm:text-6xl md:text-5xl lg:text-9xl font-bold text-white tracking-tight leading-[0.9] md:leading-none"
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
              className="absolute bottom-12 md:relative md:bottom-auto text-lg md:text-xl lg:text-5xl font-medium text-white md:mt-5"
            >
              crafted for impact
            </motion.p>
          </div>
        </div>
      </div>
    </div>
  );
}
