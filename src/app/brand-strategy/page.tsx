import CapabilitiesSection from "@/components/brand-strategy/CapabilitiesSection";
import FaqSection from "@/components/brand-strategy/FaqSection";
import ProcessSection from "@/components/brand-strategy/ProcessSection";
import ProjectsSection from "@/components/brand-strategy/ProjectsSection";
import StrategyHeroSection from "@/components/brand-strategy/StrategyHeroSection";
import WhatWeDoSection from "@/components/brand-strategy/WhatWeDoSection";
import ExperimentalTestimonials from "@/components/home/ExperimentalTestimonials";

type Props = {};

export default function BrandStrategyPage({}: Props) {
  return (
    <div>
      <div className="">
        <StrategyHeroSection />
        <WhatWeDoSection />
        <CapabilitiesSection />
        <ProcessSection />
        <ProjectsSection />
        <ExperimentalTestimonials />
        <FaqSection />
      </div>
    </div>
  );
}
