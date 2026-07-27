import type { Metadata } from "next";
import BlogSection from "@/components/home/BlogSection";
import ExperimentalTestimonials from "@/components/home/ExperimentalTestimonials";
import Footer from "@/components/layout/Footer";
import TechLogoCarousel from "@/components/ui/TechLogoCarousel";
import CtaSection from "@/components/ui-ux-design/CtaSection";
import FaqSection from "@/components/ui-ux-design/FaqSection";
import OurTechStack from "@/components/ui-ux-design/OurTechStack";
import ProcessSection from "@/components/ui-ux-design/ProcessSection";
import ProjectShowcase from "@/components/ui-ux-design/ProjectShowcase";
import StrategyHeroSection from "@/components/ui-ux-design/StrategyHeroSection";
import SubServices from "@/components/ui-ux-design/SubServices";

export const metadata: Metadata = {
  title: "UI/UX Design",
  description:
    "UI/UX design and motion work developed from wireframed architecture through to a polished, deployed interface.",
};

export default function UiUxDesignPage() {
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
