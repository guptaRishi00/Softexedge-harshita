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
      <WhyJoinUs />
      <OpenPositions />
      <PerksSection />
      <OurTeamSection />
      {/* <CareerValues /> */}
      <ApplicationJourney />
      <div className="px-3 pt-16 pb-3 md:pt-2">
        <Footer />
      </div>
    </main>
  );
}
