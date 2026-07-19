import CtaSection from "@/components/brand-strategy/CtaSection";
import FaqSection from "@/components/brand-strategy/FaqSection";
import BlogSection from "@/components/home/BlogSection";
import ExperimentalTestimonials from "@/components/home/ExperimentalTestimonials";
import Footer from "@/components/layout/Footer";
import TechLogoCarousel from "@/components/ui/TechLogoCarousel";
import WorkHeroSection from "@/components/work/WorkHeroSection";
import WorkProjectShowcase from "@/components/work/WorkProjectShowcase";

export default function WorkPage() {
  return (
    <div className="bg-white">
      <WorkHeroSection />
      <WorkProjectShowcase />
      <div className="[&>section]:pt-16 [&>section]:pb-6 md:[&>section]:pt-24 md:[&>section]:pb-10">
        <ExperimentalTestimonials />
      </div>
      <TechLogoCarousel />
      <div className="px-3 [&>section]:py-16 md:[&>section]:pb-24 md:[&>section]:pt-0">
        <CtaSection />
      </div>
      <div className="[&>section]:py-16 md:[&>section]:pb-30 md:[&>section]:pt-0">
        <FaqSection />
      </div>
      <div className="[&>section]:py-16 md:[&>section]:pb-24 md:[&>section]:pt-0">
        <BlogSection />
      </div>
      <div className="px-3 pt-16 pb-3 md:pt-24">
        <Footer />
      </div>
    </div>
  );
}
