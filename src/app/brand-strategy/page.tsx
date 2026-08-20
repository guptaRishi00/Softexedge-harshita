import type { Metadata } from "next";
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
import Header from "@/components/page/Header";
import TechLogoCarousel from "@/components/ui/TechLogoCarousel";

export const metadata: Metadata = {
  title: "Brand Strategy",
  description:
    "Brand strategy shaped by deep discovery and conversion-focused architecture, turning positioning into a defined identity.",
};

type Props = {};

export default function BrandStrategyPage({}: Props) {
  return (
    <div>
      <div className="overflow-x-clip w-full">
        <Header dropdown />
        <div className="relative z-0">
          <div className="z-0 bg-white md:sticky md:top-[min(0px,calc(100vh-992px))]">
            <ShrinkOnOverlap
              endSelector="#subservices-overlap"
              className="origin-[center_calc(100%-100vh)]"
            >
              <StrategyHeroSection />
            </ShrinkOnOverlap>
          </div>
          <div
            id="subservices-overlap"
            className="z-10 bg-black md:sticky"
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
          <div id="process-overlap" className="relative z-20 bg-black max-md:-mt-px">
            <ProcessSection />
          </div>
        </div>
        <OurTechStack />
        <ProjectShowcase />
        <ExperimentalTestimonials />
        <TechLogoCarousel />
        <div className="p-3 max-md:pt-0 max-md:[&>section]:pt-0 max-md:[&>section]:pb-13">
          <CtaSection />
        </div>
        <div className="space-y-10 max-md:space-y-16">
          <FaqSection />
          <BlogSection />
        </div>
        <div className="px-3 pt-7 pb-3 max-md:pb-4 md:p-3">
          <Footer />
        </div>
      </div>
    </div>
  );
}
