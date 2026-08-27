import type { Metadata, Viewport } from "next";
import React from "react";
import CtaSection from "@/components/brand-strategy/CtaSection";
import ContactFaqSection from "@/components/contact/ContactFaqSection";
import ContactHeroSectionTwo from "@/components/contact/ContactHeroSectionTwo";
import ContactSection from "@/components/home/ContactSection";
import ExperimentalTestimonials from "@/components/home/ExperimentalTestimonials";
import Footer from "@/components/layout/Footer";
import Header from "@/components/page/Header";
import ShrinkOnOverlap from "@/components/ui/ShrinkOnOverlap";
import TechLogoCarousel from "@/components/ui/TechLogoCarousel";

export const metadata: Metadata = {
  title: "Contact",
  description: "Let's build something worth talking about with Softexedge.",
};

// Same treatment as /work, and for the same reason: this page's root wrapper is
// `bg-white` while the hero under it is black, so the chrome read white against
// a black hero. Route-scoped, so only /contact gets it. Desktop browsers ignore
// theme-color entirely.
export const viewport: Viewport = {
  themeColor: "#000000",
};

type Props = {};

export default function ContactPage({}: any) {
  return (
    <div className="bg-white">
      {/* theme-color above only tints the browser CHROME; the notch/safe-area
          and the overscroll gutters are painted from the CANVAS, which
          propagates from <html> — or from <body> when html is transparent, as
          here (globals.css does `body { @apply bg-background }`, and
          --background is white). Both elements live in the root layout, so a
          route-scoped style tag is what darkens the canvas for /contact alone;
          it unmounts on client navigation away. The max-width guard leaves
          desktop — where the canvas shows only in rubber-band overscroll —
          exactly as it was. Copied deliberately from work/page.tsx: without it
          the notch stays white even with theme-color set. */}
      <style>{`@media (max-width:767px){html{background-color:#000}}`}</style>

      <Header onDark dropdown />

      <div className="relative z-0 md:-mb-[100vh]">
        <div className="z-0 bg-black md:sticky md:-top-[56px]">
          <ShrinkOnOverlap
            endSelector="#contact-overlap"
            targetSelector="#contact-hero-copy"
            scale={0.94}
            y={16}
            transformOrigin="50% 50%"
          >
            <ContactHeroSectionTwo />
          </ShrinkOnOverlap>
        </div>
        <div
          id="contact-overlap"
          className="relative z-10 bg-black md:pb-[100vh] [&>section]:py-16 md:[&>section]:py-30"
        >
          <ContactSection />
        </div>
      </div>

      {/* This `md:pb-*` must track ExperimentalTestimonials' own `pb-10`: a
          `[&>section]` rule outranks the section's own utility on specificity,
          so the gap to TechLogoCarousel is set HERE for this route, not by the
          component. Keep the two in step or /contact drifts from every other
          page. Desktop-only — the mobile `pb-6` / `max-md:pb-14` pair is
          untouched. */}
      <div className="relative z-10 [&>section]:pt-12 [&>section]:pb-6 max-md:[&>section]:pb-14 md:[&>section]:pt-28 md:[&>section]:pb-10">
        <ExperimentalTestimonials />
      </div>
      <div className="relative z-10 md:[&>section]:pb-20">
        <TechLogoCarousel />
      </div>
      <div className="relative z-10 [&>section]:py-0 md:[&>section]:pb-5 md:[&>section]:pt-10">
        <ContactFaqSection />
      </div>
      <div className="relative z-10 px-3 [&>section]:py-12 max-md:[&>section]:pt-9 max-md:[&>section]:pb-9 md:[&>section]:pb-14 md:[&>section]:pt-0">
        <CtaSection />
      </div>
      <div className="relative z-10 px-3 pt-7 pb-3 max-md:pb-4 md:pt-13">
        <Footer />
      </div>
    </div>
  );
}
