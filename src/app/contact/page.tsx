import React from "react";
import CtaSection from "@/components/brand-strategy/CtaSection";
import ContactFaqSection from "@/components/contact/ContactFaqSection";
import ContactHeroSectionTwo from "@/components/contact/ContactHeroSectionTwo";
import ContactSection from "@/components/home/ContactSection";
import ExperimentalTestimonials from "@/components/home/ExperimentalTestimonials";
import Footer from "@/components/layout/Footer";
import TechLogoCarousel from "@/components/ui/TechLogoCarousel";

type Props = {};

export default function ContactPage({}: any) {
  return (
    // Section spacing mirrors the about page: each section's vertical padding is
    // controlled by a `[&>section]` override wrapper so the inter-section gaps match.
    <div className="bg-white">
      <ContactHeroSectionTwo />
      <div className="[&>section]:py-16 md:[&>section]:py-30 mt-20">
        <ContactSection />
      </div>
      <div className="[&>section]:pt-16 [&>section]:pb-6 md:[&>section]:pt-40 md:[&>section]:pb-20">
        <ExperimentalTestimonials />
      </div>
      <TechLogoCarousel />
      <div className="[&>section]:py-16 md:[&>section]:pt-24">
        <ContactFaqSection />
      </div>
      <div className="px-3 [&>section]:py-16 md:[&>section]:pt-0">
        <CtaSection />
      </div>
      <div className="px-3 pt-16 pb-3 md:pt-10">
        <Footer />
      </div>
    </div>
  );
}
