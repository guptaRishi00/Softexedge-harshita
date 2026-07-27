import type { Metadata } from "next";
import CtaSection from "@/components/digital-marketing/CtaSection";
import FaqSection from "@/components/digital-marketing/FaqSection";
import OurTechStack from "@/components/digital-marketing/OurTechStack";
import ProcessSection from "@/components/digital-marketing/ProcessSection";
import ProjectShowcase from "@/components/digital-marketing/ProjectShowcase";
import StrategyHeroSection from "@/components/digital-marketing/StrategyHeroSection";
import SubServices from "@/components/digital-marketing/SubServices";
import BlogSection from "@/components/home/BlogSection";
import ExperimentalTestimonials from "@/components/home/ExperimentalTestimonials";
import Footer from "@/components/layout/Footer";
import TechLogoCarousel from "@/components/ui/TechLogoCarousel";

export const metadata: Metadata = {
  title: "Digital Marketing",
  description:
    "Digital marketing programs planned through discovery and architecture, then engineered and deployed for measurable growth.",
};

export default function DigitalMarketingPage() {
  return (
    <div>
      <div className="overflow-x-clip w-full">
        <StrategyHeroSection />
        <SubServices>
          <ProcessSection />
        </SubServices>
        <OurTechStack />
        <ProjectShowcase />
        <ExperimentalTestimonials />
        <TechLogoCarousel />
        <div className="p-3">
          <CtaSection />
        </div>
        <div className="space-y-10">
          <FaqSection />
          <BlogSection />
        </div>
        <div className="p-3">
          <Footer />
        </div>
      </div>
    </div>
  );
}
