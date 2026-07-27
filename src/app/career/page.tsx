import OurTeamSection from "@/components/about/OurTeamSection";
import OurValuesSection from "@/components/about/OurValuesSection";
import ApplicationJourney from "@/components/career/ApplicationJourney";
import CareerHeroSection from "@/components/career/CareerHeroSection";
import OpenPositions from "@/components/career/OpenPositions";
import PerksSection from "@/components/career/PerksSection";
import WhyJoinUs from "@/components/career/WhyJoinUs";
import Footer from "@/components/layout/Footer";
import Header from "@/components/page/Header";
import ShrinkOnOverlap from "@/components/ui/ShrinkOnOverlap";

export default function CareerPage() {
  return (
    <main className="bg-white min-h-screen">
      <Header />

      <div className="relative z-0 -mb-[100vh]">
        <div className="sticky top-[calc(100vh-1200px)] z-0 bg-white">
          <ShrinkOnOverlap endSelector="#why-join-us">
            <CareerHeroSection />
          </ShrinkOnOverlap>
        </div>
        <div
          id="why-join-us"
          className="relative z-10 bg-black pb-[100vh] [&>section]:pt-24 [&>section]:pb-16 md:[&>section]:pt-30 md:[&>section]:pb-24"
        >
          <WhyJoinUs />
        </div>
      </div>

      <div className="relative z-10 [&>section]:py-16 md:[&>section]:pt-24 md:[&>section]:pb-24">
        <OpenPositions />
      </div>

      <div className="[&>section]:py-16 md:[&>section]:py-24">
        <OurValuesSection />
      </div>

      <div className="relative z-0 -mb-[100vh]">
        <div className="sticky top-[calc(100vh-1216px)] z-0 bg-black">
          <ShrinkOnOverlap
            endSelector="#our-team-career"
            className="[&>section]:py-16 md:[&>section]:pb-35 md:[&>section]:pt-24"
          >
            <PerksSection />
          </ShrinkOnOverlap>
        </div>
        <div
          id="our-team-career"
          className="relative z-10 bg-white pb-[100vh] [&>section]:py-16 md:[&>section]:pb-24 md:[&>section]:pt-28"
        >
          <OurTeamSection />
        </div>
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
