import CtaSection from "@/components/brand-strategy/CtaSection";
import FaqSection from "@/components/brand-strategy/FaqSection";
import ProcessSection from "@/components/brand-strategy/ProcessSection";
import ProjectShowcase from "@/components/brand-strategy/ProjectShowcase";
import StrategyHeroSection from "@/components/brand-strategy/StrategyHeroSection";
import SubServices from "@/components/brand-strategy/SubServices";
import ExperimentalTestimonials from "@/components/home/ExperimentalTestimonials";
import Footer from "@/components/layout/Footer";

type Props = {};

export default function BrandStrategyPage({}: Props) {
  return (
    <div>
      <div className="">
        <StrategyHeroSection />
        <SubServices />
        <ProcessSection />
        <ProjectShowcase />
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
