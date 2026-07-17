import AboutHeroSection from "@/components/about/AboutHeroSection";
import AboutTraditional from "@/components/about/AboutTraditional";
import OurTeamSection from "@/components/about/OurTeamSection";
import OurValuesSection from "@/components/about/OurValuesSection";
import CtaSection from "@/components/brand-strategy/CtaSection";
import FaqSection from "@/components/brand-strategy/FaqSection";
import BlogSection from "@/components/home/BlogSection";
import ExperimentalTestimonials from "@/components/home/ExperimentalTestimonials";
import Footer from "@/components/layout/Footer";
import TechLogoCarousel from "@/components/ui/TechLogoCarousel";

type Props = {};

export default function AboutPage({}: Props) {
  return (
    <div className="bg-white">
      <AboutHeroSection />
      <div className="[&>section]:pt-24 [&>section]:pb-16 md:[&>section]:pt-45 md:[&>section]:pb-24">
        <AboutTraditional />
      </div>
      <div className="[&>section]:py-16 md:[&>section]:pt-16 md:[&>section]:pb-36">
        <OurValuesSection />
      </div>
      <div className="[&>section]:py-16 md:[&>section]:pb-10 md:[&>section]:pt-30">
        <OurTeamSection />
      </div>
      <div className="[&>section]:pt-16 [&>section]:pb-6 md:[&>section]:pt-24 md:[&>section]:pb-10">
        <ExperimentalTestimonials />
      </div>
      <TechLogoCarousel />
      <div className="px-3 [&>section]:py-16 md:[&>section]:pb-24 md:[&>section]:pt-0">
        <CtaSection />
      </div>
      <div className="[&>section]:py-16 md:[&>section]:pb-24 md:[&>section]:pt-3">
        <FaqSection />
      </div>
      <div className="[&>section]:py-16 md:[&>section]:pb-24 md:[&>section]:pt-10">
        <BlogSection />
      </div>
      <div className="px-3 pt-16 pb-3 md:pt-24">
        <Footer />
      </div>
    </div>
  );
}
