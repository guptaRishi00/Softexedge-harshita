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
      <div className="px-3 [&>section]:pt-16 [&>section]:pb-8 md:[&>section]:pt-24 md:[&>section]:pb-12">
        <CtaSection />
      </div>
      <div className="[&>section]:py-16 md:[&>section]:py-24">
        {/* <FaqSection /> */}
      </div>
      <div className="px-3 pt-8 pb-3 md:pt-12">
        <Footer />
      </div>
    </div>
  );
}
