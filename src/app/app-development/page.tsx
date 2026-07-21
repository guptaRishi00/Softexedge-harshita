import CtaSection from "@/components/app-development/CtaSection";
import FaqSection from "@/components/app-development/FaqSection";
import OurTechStack from "@/components/app-development/OurTechStack";
import ProcessSection from "@/components/app-development/ProcessSection";
import ProjectShowcase from "@/components/app-development/ProjectShowcase";
import StrategyHeroSection from "@/components/app-development/StrategyHeroSection";
import SubServices from "@/components/app-development/SubServices";
import BlogSection from "@/components/home/BlogSection";
import ExperimentalTestimonials from "@/components/home/ExperimentalTestimonials";
import Footer from "@/components/layout/Footer";
import TechLogoCarousel from "@/components/ui/TechLogoCarousel";

// Mirror of /brand-strategy with its own component copies under
// components/app-development/ so this page can diverge independently.
export default function AppDevelopmentPage() {
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
