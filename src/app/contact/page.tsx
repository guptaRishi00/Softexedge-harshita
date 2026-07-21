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
      <div className="[&>section]:py-16 md:[&>section]:py-30">
        <ContactSection />
      </div>
      <div className="[&>section]:pt-12 [&>section]:pb-6 md:[&>section]:pt-28 md:[&>section]:pb-8">
        <ExperimentalTestimonials />
      </div>
      {/* Trim the carousel's own md:pb-32 — page-scoped, it's a shared component. */}
      <div className="md:[&>section]:pb-20">
        <TechLogoCarousel />
      </div>
      <div className="[&>section]:py-12 md:[&>section]:pb-5 md:[&>section]:pt-3">
        <ContactFaqSection />
      </div>
      <div className="px-3 [&>section]:py-12 md:[&>section]:pb-16 md:[&>section]:pt-0">
        <CtaSection />
      </div>
      <div className="px-3 pt-16 pb-3 md:pt-8 ">
        <Footer />
      </div>
    </div>
  );
}
