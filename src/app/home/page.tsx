import Herosection from "@/components/home/Herosection";
import AboutSection from "@/components/home/AboutSection";
// Blog hidden on the home page for now; restore with the `blog` prop below.
// import BlogSection from "@/components/home/BlogSection";
import ContactSection from "@/components/home/ContactSection";
import WaysFigure from "@/components/figures/ways/WaysFigure";
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
        about={
          <AboutSection
            figures={{
              usual: <WaysFigure way="usual" />,
              ours: <WaysFigure way="ours" />,
            }}
          />
        }
        portfolio={<PortfolioSection />}
        stats={<StatsSection />}
        services={<ServiceSection />}
        testimonials={<ExperimentalTestimonials showEyebrow={false} />}
        techCarousel={<TechLogoCarousel />}
        contact={<ContactSection showEyebrow={false} />}
        // blog={<BlogSection showEyebrow={false} />}
        footer={<Footer />}
      />
    </SmoothScroll>
  );
}
