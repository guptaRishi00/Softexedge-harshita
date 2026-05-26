"use client";

import { useEffect, useRef } from "react";
import Header from "../layout/Header";
import DynamicButton from "../ui/DynamicButton";

export default function StrategyHeroSection() {
  const mainVideoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // 2. Use an effect to sync the video frames to the canvas
  useEffect(() => {
    const video = mainVideoRef.current;
    const canvas = canvasRef.current;

    if (!video || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const drawFrame = () => {
      if (!video.paused && !video.ended) {
        // Match the canvas internal resolution to the video for sharp quality
        if (canvas.width !== video.videoWidth && video.videoWidth > 0) {
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
        }

        // Draw the current video frame onto the canvas
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      }

      // Loop this function for every frame the browser renders
      animationFrameId = requestAnimationFrame(drawFrame);
    };

    // Start drawing when the main video starts playing
    video.addEventListener("play", drawFrame);

    // Cleanup listener on unmount
    return () => {
      video.removeEventListener("play", drawFrame);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
  return (
    <div className="relative lg:min-h-[96.5vh] overflow-hidden bg-zinc-950">
      {/* 3. Attach the ref to the main background video */}
      <img
        src="/assets/cakeDark.png"
        alt="Creative Studio"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 z-10 backdrop-blur-sm" />

      <div className="absolute z-20 p-5 w-full flex flex-col items-center justify-center gap-10 h-full">
        <Header />

        <div className="w-full flex items-center justify-strat text-center px-5">
          <div className="flex flex-col items-start justify-start gap-2">
            <h1 className="text-4xl md:text-5xl lg:text-9xl font-medium text-white">
              Brand Strategy
            </h1>

            <p className="text-lg md:text-xl max-w-4xl text-start lg:text-xl font-light leading-[1.5em] text-white mt-5">
              Brand strategy is the invisible architecture behind every
              successful brand. It defines why your company exists beyond making
              money, who your audience really is, how you're different from
              every competitor in your space, and what you stand for
              consistently — across every touchpoint, every market, every year.
            </p>

            <DynamicButton
              text="View All Services"
              href="/brand-strategy/learn-more"
              className="mt-5"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
