import Herosection from "@/components/home/Herosection";
import AboutSection from "@/components/home/AboutSection";
import BlogSection from "@/components/home/BlogSection";
import ContactSection from "@/components/home/ContactSection";
import ExperimentalTestimonials from "@/components/home/ExperimentalTestimonials";
import PortfolioSection from "@/components/home/PortfolioSection";
import ServiceSection from "@/components/home/ServiceSection";
import StatsSection from "@/components/home/StatsSection";
import Footer from "@/components/layout/Footer";
import TechLogoCarousel from "@/components/ui/TechLogoCarousel";

import ScrollAnimator from "@/components/home/ScrollAnimator";
import SmoothScroll from "@/components/layout/SmoothScroll";

// Sections are imported STATICALLY on purpose. They were briefly wrapped in
// `next/dynamic` for the perf audit's Step 2; that measured ZERO payload change
// (316 KB either way, because `ssr: true` still needs every chunk to hydrate)
// AND cost real work: each lazy chunk resolving re-rendered this subtree, so
// Herosection/Header/Navbar/MobileNav all rendered 4x on mount instead of 1x.
// Measured both ways in a production build. Do not reintroduce them here.
//
// No `"use client"` on this file any more. The scroll choreography and the
// wrapper divs its refs attach to now live in `home/ScrollAnimator`, and the
// sections are handed to it as element props — the "leaf" shape the audit asks
// for.
//
// Measured caveat, recorded so nobody re-derives it: every section below is
// itself a `"use client"` component, so this does NOT move any of them to the
// server. It relocates the directive, not the bundle. /home measured 316 KB of
// JS both before and after.

export default function HomePage() {
  return (
    <SmoothScroll>
      <ScrollAnimator
        hero={<Herosection />}
        about={<AboutSection />}
        portfolio={<PortfolioSection />}
        stats={<StatsSection />}
        services={<ServiceSection />}
        testimonials={<ExperimentalTestimonials />}
        techCarousel={<TechLogoCarousel />}
        contact={<ContactSection />}
        blog={<BlogSection />}
        footer={<Footer />}
      />
    </SmoothScroll>
  );
}
