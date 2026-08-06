"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { NO_ENTRY, useIsMobile } from "@/lib/useIsDesktop";
import Header from "../layout/Header";

const premiumEase = [0.16, 1, 0.3, 1] as const;

const APPEAR_DELAY = 0.1;
const LINE_STAGGER = 0.18;

export default function Herosection({}: any) {
  const mainVideoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // Entry animations are desktop-only; below md they land instantly (NO_ENTRY).
  const isMobile = useIsMobile();

  useEffect(() => {
    const video = mainVideoRef.current;
    const canvas = canvasRef.current;

    if (!video || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const CSS_WIDTH = 220;

    // `requestVideoFrameCallback` fires once per PRESENTED VIDEO frame — 24fps
    // for this asset — whereas rAF fires once per DISPLAY refresh, 60-120fps on
    // a phone. The old loop therefore re-copied the same decoded frame three to
    // five times over. Identical pixels, a fraction of the GPU uploads. rAF
    // stays as the fallback where rVFC is unavailable.
    const maybeRvfc = video as unknown as {
      requestVideoFrameCallback?: (cb: () => void) => number;
      cancelVideoFrameCallback?: (handle: number) => void;
    };
    const rvfc = maybeRvfc.requestVideoFrameCallback?.bind(video);
    const cancelRvfc = maybeRvfc.cancelVideoFrameCallback?.bind(video);

    let handle = 0;

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

      schedule();
    };

    const schedule = () => {
      handle = rvfc ? rvfc(drawFrame) : requestAnimationFrame(drawFrame);
    };

    const cancel = () => {
      if (!handle) return;
      if (rvfc && cancelRvfc) cancelRvfc(handle);
      else cancelAnimationFrame(handle);
      handle = 0;
    };

    // Cancel first: "play" fires again every time the video is resumed (it is
    // paused offscreen by VideoViewportPause), and without this each resume
    // would leave another concurrent draw loop running.
    const startLoop = () => {
      cancel();
      schedule();
    };

    video.addEventListener("play", startLoop);
    if (!video.paused) startLoop();

    return () => {
      video.removeEventListener("play", startLoop);
      cancel();
    };
  }, []);

  return (
    <div className="relative min-h-[96svh] rounded-[20px] overflow-hidden bg-zinc-950 lg:min-h-[96.5vh]">
      <video
        ref={mainVideoRef}
        src="/assets/video7.mp4"
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
              transition={
                isMobile
                  ? NO_ENTRY
                  : {
                      duration: 0.7,
                      ease: premiumEase,
                    }
              }
              className="md:hidden mb-3 inline-flex items-center justify-center text-md sm:text-sm font-medium text-white"
            >
              Brand. Build. Grow.
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 28, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={
                isMobile
                  ? NO_ENTRY
                  : {
                      duration: 0.7,
                      delay: APPEAR_DELAY,
                      ease: premiumEase,
                    }
              }
              className="text-[clamp(2.75rem,13.5vw,3.5rem)] sm:text-6xl md:text-5xl lg:text-9xl font-bold text-white tracking-tight leading-[0.9] md:leading-none"
            >
              We Build
            </motion.h1>

            <div className="flex flex-wrap items-center justify-center gap-2 md:gap-5">
              <motion.p
                initial={{ opacity: 0, y: 28, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={
                  isMobile
                    ? NO_ENTRY
                    : {
                        duration: 0.7,
                        delay: APPEAR_DELAY + LINE_STAGGER,
                        ease: premiumEase,
                      }
                }
                className="text-[clamp(2.75rem,13.5vw,3.5rem)] sm:text-6xl md:text-5xl lg:text-9xl font-bold text-white tracking-tight leading-[0.9] md:leading-none"
              >
                Digital
              </motion.p>

              {/* Canvas is visible on all screens again */}
              <motion.div
                initial={{ opacity: 0, y: 28, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={
                  isMobile
                    ? NO_ENTRY
                    : {
                        duration: 0.7,
                        delay: APPEAR_DELAY + LINE_STAGGER * 2,
                        ease: premiumEase,
                      }
                }
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
                transition={
                  isMobile
                    ? NO_ENTRY
                    : {
                        duration: 0.7,
                        delay: APPEAR_DELAY + LINE_STAGGER * 3,
                        ease: premiumEase,
                      }
                }
                className="text-[clamp(2.75rem,13.5vw,3.5rem)] sm:text-6xl md:text-5xl lg:text-9xl font-bold text-white tracking-tight leading-[0.9] md:leading-none"
              >
                Businesses
              </motion.p>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 28, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={
                isMobile
                  ? NO_ENTRY
                  : {
                      duration: 0.7,
                      delay: APPEAR_DELAY + LINE_STAGGER * 4,
                      ease: premiumEase,
                    }
              }
              className="absolute bottom-12 md:relative md:bottom-auto text-lg md:text-xl lg:text-5xl font-medium text-white md:mt-5"
            >
              not just websites
            </motion.p>
          </div>
        </div>
      </div>
    </div>
  );
}
