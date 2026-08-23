"use client";

import { useEffect, useState } from "react";
import ProjectShowcase from "@/components/brand-strategy/ProjectShowcase";
import PortfolioSection from "@/components/home/PortfolioSection";

/**
 * Picks the projects section for this page: ProjectShowcase on desktop,
 * home/PortfolioSection below md.
 *
 * Conditional MOUNT rather than a CSS `max-md:hidden` / `md:hidden` pair,
 * because PortfolioSection's heavy half — the pinned horizontal scroll, the
 * follow cursor, the auto-advance — lives inside `gsap.matchMedia("(min-width:
 * 768px)")`. Rendered-but-hidden on desktop it would still register those
 * ScrollTriggers against a `display: none` section and add its pin distance to
 * the page, which is exactly the kind of thing that would disturb this page's
 * own sticky/ShrinkOnOverlap stack.
 *
 * The default is deliberately INVERTED relative to `useIsDesktop`: state starts
 * false = "not mobile", so the server and the first client render both emit
 * ProjectShowcase. Desktop therefore paints the right section immediately and
 * never mounts PortfolioSection at all — the desktop view cannot change. Mobile
 * pays for that with one swap after hydration. Starting `true` instead would
 * put the mobile section in the SSR output and flash it on every desktop load.
 */
export default function ProjectsSlot() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return isMobile ? <PortfolioSection /> : <ProjectShowcase />;
}
