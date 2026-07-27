import type { Metadata } from "next";
import BlogSection from "@/components/home/BlogSection";
import ExperimentalTestimonials from "@/components/home/ExperimentalTestimonials";
import Footer from "@/components/layout/Footer";
import TechLogoCarousel from "@/components/ui/TechLogoCarousel";
import CtaSection from "@/components/video-production/CtaSection";
import FaqSection from "@/components/video-production/FaqSection";
import OurTechStack from "@/components/video-production/OurTechStack";
import ProcessSection from "@/components/video-production/ProcessSection";
import ProjectShowcase from "@/components/video-production/ProjectShowcase";
import StrategyHeroSection from "@/components/video-production/StrategyHeroSection";
import SubServices from "@/components/video-production/SubServices";

export const metadata: Metadata = {
  title: "Video Production",
  description:
    "Video production carried from discovery and concept architecture through production to a fully deployed final cut.",
};

export default function VideoProductionPage() {
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
