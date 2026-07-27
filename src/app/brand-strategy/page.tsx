import CtaSection from "@/components/brand-strategy/CtaSection";
import FaqSection from "@/components/brand-strategy/FaqSection";
import OurTechStack from "@/components/brand-strategy/OurTechStack";
import ProcessSection from "@/components/brand-strategy/ProcessSection";
import ProjectShowcase from "@/components/brand-strategy/ProjectShowcase";
import StrategyHeroSection from "@/components/brand-strategy/StrategyHeroSection";
import SubServices, {
  SUBSERVICES_STICK_TOP,
} from "@/components/brand-strategy/SubServices";
import ShrinkOnOverlap from "@/components/ui/ShrinkOnOverlap";
import BlogSection from "@/components/home/BlogSection";

import ExperimentalTestimonials from "@/components/home/ExperimentalTestimonials";
import Footer from "@/components/layout/Footer";
import TechLogoCarousel from "@/components/ui/TechLogoCarousel";

type Props = {};

export default function BrandStrategyPage({}: Props) {
  return (
    <div>
      <div className="overflow-x-clip w-full">
        <StrategyHeroSection />
        <div className="relative z-0">
          <div
            className="sticky z-0 bg-black"
            style={{ top: SUBSERVICES_STICK_TOP }}
          >
            <ShrinkOnOverlap
              endSelector="#process-overlap"
              scale={0.96}
              y={12}
              className="origin-[center_calc(100%-100vh)]"
            >
              <SubServices />
            </ShrinkOnOverlap>
          </div>
          <div id="process-overlap" className="relative z-10 bg-black">
            <ProcessSection />
          </div>
        </div>
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
