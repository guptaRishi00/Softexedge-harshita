// src/app/career/page.tsx
import OurTeamSection from "@/components/about/OurTeamSection";
import ApplicationJourney from "@/components/career/ApplicationJourney";
import CareerHeroSection from "@/components/career/CareerHeroSection";
import OpenPositions from "@/components/career/OpenPositions";
import PerksSection from "@/components/career/PerksSection";
import WhyJoinUs from "@/components/career/WhyJoinUs";
import Footer from "@/components/layout/Footer";

export default function CareerPage() {
  return (
    <main className="bg-white min-h-screen">
      <CareerHeroSection />

      <div className="[&>section]:pt-24 [&>section]:pb-16 md:[&>section]:pt-30 md:[&>section]:pb-24">
        <WhyJoinUs />
      </div>

      <div className="[&>section]:py-16 md:[&>section]:pt-24 md:[&>section]:pb-24">
        <OpenPositions />
      </div>

      <div className="[&>section]:py-16 md:[&>section]:pb-35 md:[&>section]:pt-24">
        <PerksSection />
      </div>

      <div className="[&>section]:py-16 md:[&>section]:pb-24 md:[&>section]:pt-28">
        <OurTeamSection />
      </div>

      <div className="[&>section]:py-16 md:[&>section]:pb-24 md:[&>section]:pt-10">
        <ApplicationJourney />
      </div>

      <div className="px-3 pt-16 pb-3 md:pt-24">
        <Footer />
      </div>
    </main>
  );
}
