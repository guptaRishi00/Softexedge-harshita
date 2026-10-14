import type { Metadata } from "next";
import DuplicateHero from "@/components/duplicate/DuplicateHero";
import DuplicateIntro from "@/components/duplicate/DuplicateIntro";
import DuplicatePortfolio from "@/components/duplicate/DuplicatePortfolio";
import DuplicateVideoSection from "@/components/duplicate/DuplicateVideoSection";
import Header from "@/components/page/Header";

export const metadata: Metadata = {
  title: "Duplicate",
  description:
    "We build digital businesses, not just websites — brand, product, and the marketing that follows, from one team.",
  // A test copy of the home page, so keep it out of search results.
  robots: { index: false, follow: true },
};

// Header + a bespoke hero, nothing else. The header is `page/Header`, not the
// homepage's `layout/Header`: that one renders white links and a white logo
// for the dark video hero and would be invisible on this white background.
// Same links and CTA either way.
export default function DuplicatePage() {
  return (
    <main className="w-full bg-white">
      <DuplicateIntro />
      {/* Opacity only: a transform here would become the containing block
          for the header's fixed navbar. */}
      <div className="dup-reveal">
        <Header dropdown />
        <DuplicateHero />
        <DuplicateVideoSection />
        <DuplicatePortfolio />
      </div>
    </main>
  );
}
