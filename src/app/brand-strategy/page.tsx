import CtaSection from "@/components/brand-strategy/CtaSection";
import FaqSection from "@/components/brand-strategy/FaqSection";
import OurTechStack from "@/components/brand-strategy/OurTechStack";
import ProcessSection from "@/components/brand-strategy/ProcessSection";
import ProjectShowcase from "@/components/brand-strategy/ProjectShowcase";
import StrategyHeroSection from "@/components/brand-strategy/StrategyHeroSection";
import SubServices from "@/components/brand-strategy/SubServices";
import BlogSection from "@/components/home/BlogSection";

import ExperimentalTestimonials from "@/components/home/ExperimentalTestimonials";
import Footer from "@/components/layout/Footer";
import TechLogoCarousel from "@/components/ui/TechLogoCarousel";

type Props = {};

export default function BrandStrategyPage({}: Props) {
  return (
    <div>
      <div className="overflow-x-clip w-full">
        <StrategyHeroSection />
        <SubServices />
        {/* ProcessSection holds at the top while OurTechStack scrolls up over
            it. The two share a wrapper so ProcessSection releases once
            OurTechStack has passed, instead of sticking for the rest of the
            page. Both are opaque bg-black, so the z-index is what makes the
            overlap read. */}
        {/* -mb-[35vh] cancels the pb-[35vh] below in LAYOUT only: that padding
            has to stay in flow because it is the scroll travel that lets the
            overlap finish, but it must not push ProjectShowcase down. The
            negative margin pulls ProjectShowcase up over the padded tail
            instead, so the space is used, not seen.
            z-0 makes this wrapper a stacking context so its inner z-10 stays
            contained — otherwise that z-10 would paint over ProjectShowcase. */}
        <div className="relative z-0 -mb-[35vh]">
          {/* Must be a TOP offset. `bottom-0` does NOT mean "pin late": a
              bottom-sticky element is pushed DOWN as soon as its natural
              bottom rises above the offset line, and since this is the first
              child of a tall wrapper that happens immediately — it floats at
              the screen bottom while OurTechStack sits above it, killing the
              overlap entirely.
              To pin late and keep the overlap, offset by (viewport − section
              height): the section then catches exactly when its BOTTOM reaches
              the viewport bottom, i.e. after it has been read. 1040px is
              ProcessSection's approximate height at desktop widths; the value
              goes positive on tall screens, which correctly means "pin once
              fully visible". */}
          <div className="sticky top-[calc(100vh-1040px)] z-0">
            <ProcessSection />
          </div>
          {/* A sticky element releases once the wrapper's bottom passes it, so
              the overlapper only travels as far as its OWN height. OurTechStack
              is shorter than ProcessSection (whose aspect-[4/4.5] cards grow
              with viewport width), so unaided it stalls short and leaves a
              sliver of ProcessSection showing. The extra bottom padding buys
              that missing travel; bg-black is required because the padded area
              would otherwise be transparent and expose the pinned section. */}
          <div className="relative z-10 bg-black pb-[35vh]">
            <OurTechStack />
          </div>
        </div>
        <ProjectShowcase />
        <ExperimentalTestimonials />
        <TechLogoCarousel />
        <div className="p-3">
          <CtaSection />
        </div>
        <div className="space-y-10">
          <FaqSection />
          <BlogSection />
        </div>
        <div className="p-3">
          <Footer />
        </div>
      </div>
    </div>
  );
}
