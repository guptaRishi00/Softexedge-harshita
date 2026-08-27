import Herosection from "@/components/home/Herosection";
import AboutSection from "@/components/home/AboutSection";
import BlogSection from "@/components/home/BlogSection";
import ContactSection from "@/components/home/ContactSection";
import ExperimentalTestimonials from "@/components/home/ExperimentalTestimonials";
import PortfolioSection from "@/components/home/PortfolioSection";
import ServiceSection from "@/components/home/ServiceSection";
import StatsSection from "@/components/home/StatsSection";
import Footer from "@/components/layout/Footer";
import TechLogoCarousel from "@/components/ui/TechLogoCarousel";

import ScrollAnimator from "@/components/home/ScrollAnimator";
import SmoothScroll from "@/components/layout/SmoothScroll";

export default function HomePage() {
  return (
    <SmoothScroll>
      <ScrollAnimator
        hero={<Herosection />}
        about={<AboutSection />}
        portfolio={<PortfolioSection />}
        stats={<StatsSection />}
        services={<ServiceSection />}
        testimonials={<ExperimentalTestimonials />}
        techCarousel={<TechLogoCarousel />}
        contact={<ContactSection />}
        blog={<BlogSection />}
        footer={<Footer />}
      />
    </SmoothScroll>
  );
}
