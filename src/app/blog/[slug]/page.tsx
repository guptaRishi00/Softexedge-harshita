import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogArticle from "@/components/blog/BlogArticle";
import CtaSection from "@/components/brand-strategy/CtaSection";
import Footer from "@/components/layout/Footer";
import { blogPosts, getPostBySlug, getRelatedPosts } from "@/data/blog";

// Only the known slugs are valid — anything else 404s.
export const dynamicParams = false;

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Article not found — Softexedge" };

  return {
    title: `${post.title} — Softexedge`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      images: [{ url: post.image }],
    },
  };
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const related = getRelatedPosts(slug, 3);

  return (
    <div className="bg-white">
      <BlogArticle post={post} related={related} />
      {/* CtaSection→Footer gap matches the /blog index (pb-12 + pt-12 at md):
          the old py-24/pt-24 pairing doubled up to ~192px. */}
      <div className="px-3 [&>section]:pt-12 [&>section]:pb-8 md:[&>section]:pt-16 md:[&>section]:pb-12">
        <CtaSection />
      </div>
      <div className="px-3 pt-8 pb-3 md:pt-12">
        <Footer />
      </div>
    </div>
  );
}
