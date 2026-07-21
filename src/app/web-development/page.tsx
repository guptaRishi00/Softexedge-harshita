import BlogSection from "@/components/home/BlogSection";
import ExperimentalTestimonials from "@/components/home/ExperimentalTestimonials";
import Footer from "@/components/layout/Footer";
import TechLogoCarousel from "@/components/ui/TechLogoCarousel";
import CtaSection from "@/components/web-development/CtaSection";
import FaqSection from "@/components/web-development/FaqSection";
import OurTechStack from "@/components/web-development/OurTechStack";
import ProcessSection from "@/components/web-development/ProcessSection";
import ProjectShowcase from "@/components/web-development/ProjectShowcase";
import StrategyHeroSection from "@/components/web-development/StrategyHeroSection";
import SubServices from "@/components/web-development/SubServices";

// Mirror of /brand-strategy with its own component copies under
// components/web-development/ so this page can diverge independently.
export default function WebDevelopmentPage() {
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
