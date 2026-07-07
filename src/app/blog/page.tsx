import BlogFeaturedSection from "@/components/blog/BlogFeaturedSection";
import BlogListSection from "@/components/blog/BlogListSection";
import CtaSection from "@/components/brand-strategy/CtaSection";
import FaqSection from "@/components/brand-strategy/FaqSection";
import Footer from "@/components/layout/Footer";

export default function BlogPage() {
  return (
    <div className="bg-white">
      <BlogFeaturedSection />
      <BlogListSection />
      <div className="px-3 [&>section]:py-16 md:[&>section]:py-24">
        <CtaSection />
      </div>
      <div className="[&>section]:py-16 md:[&>section]:py-24">
        {/* <FaqSection /> */}
      </div>
      <div className="px-3 pt-16 pb-3 md:pt-24">
        <Footer />
      </div>
    </div>
  );
}
