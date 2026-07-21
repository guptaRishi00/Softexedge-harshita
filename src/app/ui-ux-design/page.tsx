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

// Mirror of /brand-strategy with its own component copies under
// components/ui-ux-design/ so this page can diverge independently.
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
