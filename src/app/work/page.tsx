import type { Metadata } from "next";
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

export default function WorkPage() {
  return (
    <div className="bg-white">
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
          className="relative z-20 bg-white md:pb-[100vh] [&>section]:pt-13 [&>section]:pb-11 md:[&>section]:pt-26 md:[&>section]:pb-10"
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
