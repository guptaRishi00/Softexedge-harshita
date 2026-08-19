import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Think. Create. Do. Grow with us — join Softexedge as we create impactful digital solutions.",
};

export default function CareerPage() {
  return (
    <main className="bg-white min-h-screen">
      <Header dropdown />

      <div className="relative z-0 md:-mb-[100vh]">
        <div className="z-0 bg-white md:sticky md:top-[calc(100vh-1200px)]">
          <ShrinkOnOverlap
            endSelector="#why-join-us"
            targetSelector="#career-hero-copy, #career-hero-carousel"
            transformOrigin="50% 0%"
          >
            <CareerHeroSection />
          </ShrinkOnOverlap>
        </div>
        <div
          id="why-join-us"
          className="relative z-10 bg-black md:pb-[100vh] [&>section]:pt-21 [&>section]:pb-13 md:[&>section]:pt-30 md:[&>section]:pb-24"
        >
          <WhyJoinUs />
        </div>
      </div>

      {/* -mt-px closes a rasterisation seam, not a layout gap: this block and
          #why-join-us abut at a FRACTIONAL y (2808.469), and the first opaque
          ancestor behind them is `main`, which is white. Each black edge gets
          antialiased there, so the residual uncovered fraction shows white as a
          full-width 1px rule. Overlapping by a pixel makes black cover the row. */}
      <div className="relative z-10 max-md:-mt-px [&>section]:pt-10 [&>section]:pb-13 md:[&>section]:pt-24 md:[&>section]:pb-24">
        <OpenPositions />
      </div>

      {/* -mt-px closes the same fractional-pixel seam as the block above: this
          boundary lands at y 3307.859 with white `main` behind two black
          sections. pt-10 (not py-13) makes the gap above match the
          WhyJoinUs -> OpenPositions one: 52 from the upper pb + 40 here. */}
      <div className="max-md:-mt-px [&>section]:pt-10 [&>section]:pb-13 md:[&>section]:py-24">
        <OurValuesSection />
      </div>

      {/* -mt-px: same fractional-pixel seam as the two boundaries above — this
          one lands at y 4698.141 with white `main` behind two black sections. */}
      <div className="relative z-0 max-md:-mt-px md:-mb-[100vh]">
        <div className="z-0 bg-black md:sticky md:top-[calc(100vh-1216px)]">
          <ShrinkOnOverlap
            endSelector="#our-team-career"
            className="[&>section]:pt-10 [&>section]:pb-20 md:[&>section]:pb-35 md:[&>section]:pt-24"
          >
            <PerksSection />
          </ShrinkOnOverlap>
        </div>
        <div
          id="our-team-career"
          className="relative z-10 bg-white md:pb-[100vh] [&>section]:pt-17 [&>section]:pb-9 md:[&>section]:pb-24 md:[&>section]:pt-28"
        >
          <OurTeamSection />
        </div>
      </div>

      <div className="[&>section]:pt-14 [&>section]:pb-11 md:[&>section]:pb-14 md:[&>section]:pt-10">
        <ApplicationJourney />
      </div>

      <div className="px-3 pt-7 pb-3 max-md:pb-4 md:pt-24">
        <Footer />
      </div>
    </main>
  );
}
