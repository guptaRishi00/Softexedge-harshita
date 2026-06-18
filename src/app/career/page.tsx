// src/app/career/page.tsx
import CareerHeroSection from "@/components/career/CareerHeroSection";
import WhyJoinUs from "@/components/career/WhyJoinUs";

export default function CareerPage() {
  return (
    <main className="bg-white min-h-screen">
      <CareerHeroSection />
      <WhyJoinUs />
    </main>
  );
}
