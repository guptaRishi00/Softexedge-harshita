"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// TYPE-only: erased at compile time, so it costs nothing at runtime. The real
// module is pulled in by the dynamic `import("lenis")` inside the effect.
import type Lenis from "lenis";
import { type ReactNode, useEffect } from "react";

export default function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Below md this page registers NO ScrollTriggers — every one on /home is
    // gated behind `mm.add("(min-width: 768px)")`, and the mobile overlaps are
    // pure CSS `position: sticky` rather than pins — and Lenis is skipped so
    // native scrolling owns the page. An earlier mobile branch still called
    // `ScrollTrigger.refresh()` after 100ms: a forced layout pass over the
    // whole subtree with nothing to refresh. Returning early removes that
    // wasted work; nothing else in this effect is needed on mobile.
    if (window.matchMedia("(max-width: 767px)").matches) {
      return;
    }

    // Lenis is imported DYNAMICALLY rather than at module scope. It is ~481K
    // in node_modules and is the only thing this component needs it for, yet a
    // static import put it in the initial payload of every page that renders
    // SmoothScroll — including phones, which return above and never construct
    // it. Deferring it means mobile downloads none of it, and desktop fetches
    // it after hydration instead of before first paint. Native scrolling is
    // already correct in the gap, so nothing moves on screen.
    let lenis: Lenis | undefined;
    let update: ((time: number) => void) | undefined;
    let timer: ReturnType<typeof setTimeout> | undefined;
    // The effect can be torn down before the import settles (StrictMode's
    // double-invoke does exactly this), so the late callback has to know it
    // was cancelled or it would leak a Lenis instance and a ticker callback
    // that nothing holds a reference to.
    let cancelled = false;

    import("lenis").then(({ default: LenisCtor }) => {
      if (cancelled) return;

      lenis = new LenisCtor({
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

      update = (time: number) => {
        lenis?.raf(time * 1000);
      };

      gsap.ticker.add(update);
      gsap.ticker.lagSmoothing(0);

      timer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
    });

    return () => {
      cancelled = true;
      if (update) gsap.ticker.remove(update);
      if (timer) clearTimeout(timer);
      lenis?.destroy();
    };
  }, []);

  return <>{children}</>;
}
