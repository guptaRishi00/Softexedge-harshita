import CtaSection from "@/components/ai-marketing-automation/CtaSection";
import FaqSection from "@/components/ai-marketing-automation/FaqSection";
import OurTechStack from "@/components/ai-marketing-automation/OurTechStack";
import ProcessSection from "@/components/ai-marketing-automation/ProcessSection";
import ProjectShowcase from "@/components/ai-marketing-automation/ProjectShowcase";
import StrategyHeroSection from "@/components/ai-marketing-automation/StrategyHeroSection";
import SubServices from "@/components/ai-marketing-automation/SubServices";
import BlogSection from "@/components/home/BlogSection";
import ExperimentalTestimonials from "@/components/home/ExperimentalTestimonials";
import Footer from "@/components/layout/Footer";
import TechLogoCarousel from "@/components/ui/TechLogoCarousel";

// Mirror of /brand-strategy with its own component copies under
// components/ai-marketing-automation/ so this page can diverge independently.
export default function AiMarketingAutomationPage() {
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
