// src/app/career/page.tsx
import OurTeamSection from "@/components/about/OurTeamSection";
import ApplicationJourney from "@/components/career/ApplicationJourney";
import CareerHeroSection from "@/components/career/CareerHeroSection";
import CareerValues from "@/components/career/CareerValues";
import OpenPositions from "@/components/career/OpenPositions";
import PerksSection from "@/components/career/PerksSection";
import WhyJoinUs from "@/components/career/WhyJoinUs";
import Footer from "@/components/layout/Footer";

export default function CareerPage() {
  return (
    <main className="bg-white min-h-screen">
      <CareerHeroSection />
      {/* Section rhythm mirrors the about page's wrapper spacing */}
      <div className="[&>section]:pt-24 [&>section]:pb-16 md:[&>section]:pt-45 md:[&>section]:pb-24">
        <WhyJoinUs />
      </div>
      <div className="[&>section]:py-16 md:[&>section]:pt-24 md:[&>section]:pb-35">
        <OpenPositions />
      </div>
      <div className="[&>section]:py-16 md:[&>section]:pb-24 md:[&>section]:pt-16">
        <PerksSection />
      </div>
      <div className="[&>section]:py-16 md:[&>section]:pb-24 md:[&>section]:pt-30">
        <OurTeamSection />
      </div>
      {/* <CareerValues /> */}
      <div className="[&>section]:py-16 md:[&>section]:py-24">
        <ApplicationJourney />
      </div>
      <div className="px-3 pt-16 pb-3 md:pt-24">
        <Footer />
      </div>
    </main>
  );
}
