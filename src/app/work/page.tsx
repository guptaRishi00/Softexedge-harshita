import type { Metadata, Viewport } from "next";
import CtaSection from "@/components/brand-strategy/CtaSection";
import FaqSection from "@/components/brand-strategy/FaqSection";
import BlogSection from "@/components/home/BlogSection";
import ExperimentalTestimonials from "@/components/home/ExperimentalTestimonials";
import Footer from "@/components/layout/Footer";
import Header from "@/components/page/Header";
import ShrinkOnOverlap from "@/components/ui/ShrinkOnOverlap";
import TechLogoCarousel from "@/components/ui/TechLogoCarousel";
import WorkHeroSection from "@/components/work/WorkHeroSection";
import WorkProjectShowcase from "@/components/work/WorkProjectShowcase";

export const metadata: Metadata = {
  title: "Our Work",
  description: "Our creative portfolio, showcasing work from Softexedge.",
};

// Route-scoped, so only /work gets it. Without a theme-color iOS samples the
// page background for the status-bar/notch area, and this page's root wrapper
// is `bg-white` — the hero underneath it is black, so the notch read white
// against a black hero. Desktop browsers ignore theme-color entirely.
export const viewport: Viewport = {
  themeColor: "#000000",
};

export default function WorkPage() {
  return (
    <div className="bg-white">
      {/* iOS paints the notch / safe-area (and the overscroll gutters) from the
          CANVAS, whose colour propagates from <html> — or from <body> when html
          is transparent, which is the case here: globals.css does
          `body { @apply bg-background }` and --background is oklch(1 0 0), white.
          The `theme-color` above only tints the browser chrome, so on its own it
          left the notch white. Both html and body live in the root layout, so a
          route-scoped style tag is what darkens the canvas for /work alone; it
          unmounts on client navigation away. max-width guard keeps desktop —
          where the canvas is only ever visible in rubber-band overscroll —
          exactly as it was. */}
      <style>{`@media (max-width:767px){html{background-color:#000}}`}</style>

      <Header onDark dropdown />

      <div className="relative z-0 md:-mb-[100vh]">
        <div className="z-0 bg-black md:sticky md:top-0">
          <ShrinkOnOverlap
            endSelector="#work-showcase"
            targetSelector="#work-hero-copy, #work-hero-dome"
          >
            <WorkHeroSection />
          </ShrinkOnOverlap>
        </div>
        <div
          id="work-showcase"
          className="z-10 bg-black md:sticky md:top-[calc(100vh-4096px)]"
        >
          <ShrinkOnOverlap
            endSelector="#work-testimonials"
            className="origin-[center_calc(100%-100vh)]"
          >
            <WorkProjectShowcase />
          </ShrinkOnOverlap>
        </div>
        <div
          id="work-testimonials"
          className="relative z-20 bg-white md:pb-[100vh] [&>section]:pt-16 [&>section]:pb-11 md:[&>section]:pt-26 md:[&>section]:pb-10"
        >
          <ExperimentalTestimonials />
        </div>
      </div>

      <div className="relative z-10 max-md:[&>section]:pt-1 max-md:[&>section]:pb-11 md:[&>section]:pb-24">
        <TechLogoCarousel />
      </div>
      <div className="relative z-10 px-3 [&>section]:py-16 max-md:[&>section]:pt-9 max-md:[&>section]:pb-9 md:[&>section]:pb-24 md:[&>section]:pt-10">
        <CtaSection />
      </div>
      <div className="relative z-10 [&>section]:py-16 max-md:[&>section]:pt-9 max-md:[&>section]:pb-10 md:[&>section]:pb-30 md:[&>section]:pt-5">
        <FaqSection />
      </div>
      <div className="relative z-10 [&>section]:py-16 max-md:[&>section]:pt-10 max-md:[&>section]:pb-11 md:[&>section]:pb-14 md:[&>section]:pt-0">
        <BlogSection />
      </div>
      <div className="relative z-10 px-3 pt-11 pb-3 max-md:pb-4 md:pt-24">
        <Footer />
      </div>
    </div>
  );
}
