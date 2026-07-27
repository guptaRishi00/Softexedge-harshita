import React from "react";
import CtaSection from "@/components/brand-strategy/CtaSection";
import ContactFaqSection from "@/components/contact/ContactFaqSection";
import ContactHeroSectionTwo from "@/components/contact/ContactHeroSectionTwo";
import ContactSection from "@/components/home/ContactSection";
import ExperimentalTestimonials from "@/components/home/ExperimentalTestimonials";
import Footer from "@/components/layout/Footer";
import Header from "@/components/page/Header";
import ShrinkOnOverlap from "@/components/ui/ShrinkOnOverlap";
import TechLogoCarousel from "@/components/ui/TechLogoCarousel";

type Props = {};

export default function ContactPage({}: any) {
  return (
    <div className="bg-white">
      <Header onDark />

      <div className="relative z-0 -mb-[100vh]">
        <div className="sticky -top-[56px] z-0 bg-black">
          <ShrinkOnOverlap
            endSelector="#contact-overlap"
            targetSelector="#contact-hero-copy"
            scale={0.94}
            y={16}
            transformOrigin="50% 50%"
          >
            <ContactHeroSectionTwo />
          </ShrinkOnOverlap>
        </div>
        <div
          id="contact-overlap"
          className="relative z-10 bg-black pb-[100vh] [&>section]:py-16 md:[&>section]:py-30"
        >
          <ContactSection />
        </div>
      </div>

      <div className="relative z-10 [&>section]:pt-12 [&>section]:pb-6 md:[&>section]:pt-28 md:[&>section]:pb-8">
        <ExperimentalTestimonials />
      </div>
      <div className="relative z-10 md:[&>section]:pb-20">
        <TechLogoCarousel />
      </div>
      <div className="relative z-10 [&>section]:py-12 md:[&>section]:pb-5 md:[&>section]:pt-3">
        <ContactFaqSection />
      </div>
      <div className="relative z-10 px-3 [&>section]:py-12 md:[&>section]:pb-16 md:[&>section]:pt-0">
        <CtaSection />
      </div>
      <div className="relative z-10 px-3 pt-16 pb-3 md:pt-8 ">
        <Footer />
      </div>
    </div>
  );
}
