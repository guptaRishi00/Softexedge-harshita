import type { Metadata } from "next";
import CtaSection from "@/components/custom-software/CtaSection";
import FaqSection from "@/components/custom-software/FaqSection";
import OurTechStack from "@/components/custom-software/OurTechStack";
import ProcessSection from "@/components/custom-software/ProcessSection";
import ProjectShowcase from "@/components/custom-software/ProjectShowcase";
import StrategyHeroSection from "@/components/custom-software/StrategyHeroSection";
import SubServices from "@/components/custom-software/SubServices";
import BlogSection from "@/components/home/BlogSection";
import ExperimentalTestimonials from "@/components/home/ExperimentalTestimonials";
import Footer from "@/components/layout/Footer";
import TechLogoCarousel from "@/components/ui/TechLogoCarousel";

export const metadata: Metadata = {
  title: "Custom Software",
  description:
    "Custom software built with Next.js, TypeScript, and PostgreSQL, following our process from discovery through deployment.",
};

export default function CustomSoftwarePage() {
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
