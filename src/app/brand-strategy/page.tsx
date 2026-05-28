import CtaSection from "@/components/brand-strategy/CtaSection";
import FaqSection from "@/components/brand-strategy/FaqSection";
import InteractiveProcessSection from "@/components/brand-strategy/InteractiveProcessSection";
import ProcessSection from "@/components/brand-strategy/ProcessSection";
import ProjectsSection from "@/components/brand-strategy/ProjectsSection";
import StrategyHeroSection from "@/components/brand-strategy/StrategyHeroSection";
import WhatweDoAbout from "@/components/brand-strategy/WhatWeDoAbout";
import WhatWeDoSection from "@/components/brand-strategy/WhatWeDoSection";
import ExperimentalTestimonials from "@/components/home/ExperimentalTestimonials";
import Footer from "@/components/layout/Footer";

type Props = {};

export default function BrandStrategyPage({}: Props) {
  return (
    <div>
      <div className="">
        <StrategyHeroSection />
        <WhatweDoAbout />
        <WhatWeDoSection />
        <InteractiveProcessSection />
        <ProcessSection />
        <ExperimentalTestimonials />
        <div className="p-3">
          <CtaSection />
        </div>
        <FaqSection />
        <div className="p-3">
          <Footer />
        </div>
      </div>
    </div>
  );
}
