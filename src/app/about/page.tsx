import type { Metadata } from "next";
import AboutHeroSection from "@/components/about/AboutHeroSection";
import AboutTraditional from "@/components/about/AboutTraditional";
import OurTeamSection from "@/components/about/OurTeamSection";
import OurValuesSection from "@/components/about/OurValuesSection";
import ShrinkOnOverlap from "@/components/ui/ShrinkOnOverlap";
import CtaSection from "@/components/brand-strategy/CtaSection";
import FaqSection from "@/components/brand-strategy/FaqSection";
import BlogSection from "@/components/home/BlogSection";
import ExperimentalTestimonials from "@/components/home/ExperimentalTestimonials";
import Footer from "@/components/layout/Footer";
import Header from "@/components/page/Header";
import TechLogoCarousel from "@/components/ui/TechLogoCarousel";

export const metadata: Metadata = {
  title: "About",
  description: "The minds behind digital excellence at Softexedge.",
};

type Props = {};

export default function AboutPage({}: Props) {
  return (
    <div className="bg-white">
      <Header dropdown />
      <div className="relative z-0 md:-mb-[150vh]">
        <div className="md:sticky md:top-[calc(100vh-1104px)] z-0 bg-[#FAFAFA]">
          <ShrinkOnOverlap
            endSelector="#about-traditional"
            targetSelector="#about-hero-inner"
          >
            <AboutHeroSection />
          </ShrinkOnOverlap>
        </div>
        <div
          id="about-traditional"
          className="relative z-10 bg-black max-md:-mb-px md:pb-[150vh] [&>section]:pt-21 [&>section]:pb-13 md:[&>section]:pt-45 md:[&>section]:pb-24"
        >
          <AboutTraditional />
        </div>
      </div>
      <div className="relative z-0 md:-mb-[100vh]">
        <div className="md:sticky md:top-[calc(100vh-994px)] z-0 bg-black">
          <ShrinkOnOverlap
            endSelector="#our-team"
            className="[&>section]:py-13 md:[&>section]:pt-16 md:[&>section]:pb-36"
          >
            <OurValuesSection />
          </ShrinkOnOverlap>
        </div>
        <div
          id="our-team"
          className="relative z-10 bg-white md:pb-[100vh] [&>section]:pt-17 [&>section]:pb-9 md:[&>section]:pb-10 md:[&>section]:pt-30"
        >
          <OurTeamSection />
        </div>
      </div>
      <div className="[&>section]:pt-13 [&>section]:pb-6 max-md:[&>section]:pb-11 md:[&>section]:pt-24 md:[&>section]:pb-10">
        <ExperimentalTestimonials />
      </div>

      <div className="max-md:[&>section]:pt-1 max-md:[&>section]:pb-11">
        <TechLogoCarousel />
      </div>
      <div className="px-3 [&>section]:py-16 max-md:[&>section]:pt-9 max-md:[&>section]:pb-9 md:[&>section]:pb-24 md:[&>section]:pt-0">
        <CtaSection />
      </div>
      <div className="[&>section]:py-16 max-md:[&>section]:pt-9 max-md:[&>section]:pb-10 md:[&>section]:pb-24 md:[&>section]:pt-3">
        <FaqSection />
      </div>
      <div className="[&>section]:py-16 max-md:[&>section]:pt-10 max-md:[&>section]:pb-11 md:[&>section]:pb-14 md:[&>section]:pt-10">
        <BlogSection />
      </div>
      <div className="px-3 pt-11 pb-3 max-md:pb-4 md:pt-24">
        <Footer />
      </div>
    </div>
  );
}
