import React from "react";
import CtaSection from "@/components/brand-strategy/CtaSection";
import ContactFaqSection from "@/components/contact/ContactFaqSection";
import ContactHeroSection from "@/components/contact/ContactHeroSection";
import ContactSection from "@/components/home/ContactSection";
import ExperimentalTestimonials from "@/components/home/ExperimentalTestimonials";
import Footer from "@/components/layout/Footer";

type Props = {};

export default function ContactPage({}: any) {
  return (
    // Section spacing mirrors the about page: each section's vertical padding is
    // controlled by a `[&>section]` override wrapper so the inter-section gaps match.
    <div className="bg-white">
      <ContactHeroSection />
      <div className="[&>section]:py-8 md:[&>section]:py-20">
        <ContactSection />
      </div>
      <div className="[&>section]:py-8 md:[&>section]:py-20">
        <ExperimentalTestimonials />
      </div>
      <div className="[&>section]:py-8 md:[&>section]:py-6 mt-14">
        <ContactFaqSection />
      </div>
      <div className="px-3 [&>section]:py-8 md:[&>section]:py-6">
        <CtaSection />
      </div>
      <div className="px-3 pt-12 pb-3 md:pt-20">
        <Footer />
      </div>
    </div>
  );
}
