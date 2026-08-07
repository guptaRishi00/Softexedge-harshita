"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { type ReactNode, useEffect } from "react";

export default function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Below md this page registers NO ScrollTriggers (every one on /home is
    // gated behind `mm.add("(min-width: 768px)")`), and Lenis is skipped so
    // native scrolling owns the page. The previous mobile branch still called
    // `ScrollTrigger.refresh()` after 100ms — a forced layout pass over the
    // whole subtree that had nothing to refresh. Returning early removes that
    // wasted work; nothing else in this effect is needed on mobile.
    if (window.matchMedia("(max-width: 767px)").matches) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
    });

    lenis.on("scroll", () => {
      ScrollTrigger.update();
    });

    const update = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(update);
      clearTimeout(timer);
    };
  }, []);

  return <>{children}</>;
}
