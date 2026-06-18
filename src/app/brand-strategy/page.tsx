import CtaSection from "@/components/brand-strategy/CtaSection";
import FaqSection from "@/components/brand-strategy/FaqSection";
import OurTechStack from "@/components/brand-strategy/OurTechStack";
import ProcessSection from "@/components/brand-strategy/ProcessSection";
import ProjectShowcase from "@/components/brand-strategy/ProjectShowcase";
import StrategyHeroSection from "@/components/brand-strategy/StrategyHeroSection";
import SubServices from "@/components/brand-strategy/SubServices";
import BlogSection from "@/components/home/BlogSection";

import ExperimentalTestimonials from "@/components/home/ExperimentalTestimonials";
import Footer from "@/components/layout/Footer";

type Props = {};

export default function BrandStrategyPage({}: Props) {
  return (
    <div>
      <div className="overflow-x-clip w-full">
        <StrategyHeroSection />
        <SubServices />
        <ProcessSection />
        <OurTechStack />
        <ProjectShowcase />
        <ExperimentalTestimonials />
        <div className="p-3">
          <CtaSection />
        </div>
        <div className="space-y-25">
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
