import type { Metadata } from "next";
import BlogHeroSection from "@/components/blog/BlogHeroSection";
import BlogFeaturedSection from "@/components/blog/BlogFeaturedSection";
import BlogListSection from "@/components/blog/BlogListSection";
import CtaSection from "@/components/brand-strategy/CtaSection";
import Footer from "@/components/layout/Footer";
import ShrinkOnOverlap from "@/components/ui/ShrinkOnOverlap";

export const metadata: Metadata = {
  title: "Blog",
  description: "News, views, and everything else from Softexedge.",
};

export default function BlogPage() {
  return (
    <div className="">
      <BlogHeroSection />

      <div className="relative z-0">
        <div className="z-0 bg-white md:sticky md:top-[calc(100vh-856px)]">
          <ShrinkOnOverlap
            endSelector="#blog-list"
            className="origin-[center_calc(100%-100vh)]"
          >
            <BlogFeaturedSection />
          </ShrinkOnOverlap>
        </div>
        <div id="blog-list" className="relative z-10 bg-[#0a0a0a]">
          <BlogListSection />
        </div>
      </div>
      <div className="px-3 [&>section]:pt-16 [&>section]:pb-8 max-md:[&>section]:pt-9 max-md:[&>section]:pb-9 md:[&>section]:pt-24 md:[&>section]:pb-8">
        <CtaSection />
      </div>
      <div className="[&>section]:py-16 md:[&>section]:py-24"></div>
      <div className="px-3 pt-11 pb-3 max-md:pb-4 md:pt-12">
        <Footer />
      </div>
    </div>
  );
}
