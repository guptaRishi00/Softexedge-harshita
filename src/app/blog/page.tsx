import BlogHeroSection from "@/components/blog/BlogHeroSection";
import BlogFeaturedSection from "@/components/blog/BlogFeaturedSection";
import BlogListSection from "@/components/blog/BlogListSection";
import CtaSection from "@/components/brand-strategy/CtaSection";
import Footer from "@/components/layout/Footer";
import ShrinkOnOverlap from "@/components/ui/ShrinkOnOverlap";

export default function BlogPage() {
  return (
    <div className="bg-[#FAFAFA]">
      <BlogHeroSection />

      <div className="relative z-0">
        <div className="sticky top-[calc(100vh-856px)] z-0 bg-[#FAFAFA]">
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
      <div className="px-3 [&>section]:pt-16 [&>section]:pb-8 md:[&>section]:pt-24 md:[&>section]:pb-12">
        <CtaSection />
      </div>
      <div className="[&>section]:py-16 md:[&>section]:py-24">
      </div>
      <div className="px-3 pt-8 pb-3 md:pt-12">
        <Footer />
      </div>
    </div>
  );
}
