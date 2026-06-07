import CtaSection from "@/components/brand-strategy/CtaSection";
import ContactFaqSection from "@/components/contact/ContactFaqSection";
import ContactHeroSection from "@/components/contact/ContactHeroSection";
import ContactSection from "@/components/home/ContactSection";
import ExperimentalTestimonials from "@/components/home/ExperimentalTestimonials";
import Footer from "@/components/layout/Footer";
import React from "react";

type Props = {};

export default function ContactPage({}: any) {
  return (
    <div>
      <ContactHeroSection />
      <ContactSection />
      <ExperimentalTestimonials />
      <ContactFaqSection />
      <div className="p-3 space-y-16">
        <CtaSection />
        <Footer />
      </div>
    </div>
  );
}
