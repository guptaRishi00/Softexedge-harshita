"use client"; 

import { useEffect, useRef } from "react";
import Header from "../layout/Header";

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
            <h1 className="text-4xl md:text-5xl lg:text-9xl font-bold text-white">
              We Engineer
            </h1>

            <div className="flex items-center justify-center gap-2 md:gap-5">
              <p className="text-4xl md:text-5xl lg:text-9xl font-bold text-white">
                Digital
              </p>

              <div className="w-16 h-10 sm:w-24 sm:h-14 md:w-[150px] md:h-[80px] lg:w-[200px] lg:h-[106px] xl:w-[220px] xl:h-[118px] overflow-hidden rounded-[20px] shrink-0 flex items-center justify-center border border-white/20 shadow-xl">
                <canvas
                  ref={canvasRef}
                  className="w-full h-full object-cover"
                />
              </div>

              <p className="text-4xl md:text-5xl lg:text-9xl font-bold text-white">
                Solutions
              </p>
            </div>

            <p className="text-lg md:text-xl lg:text-5xl font-medium text-white mt-5">
              crafted for impact
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
