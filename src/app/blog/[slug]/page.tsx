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
      <div className="px-3 [&>section]:py-16 md:[&>section]:py-24">
        <CtaSection />
      </div>
      <div className="px-3 pt-16 pb-3 md:pt-24">
        <Footer />
      </div>
    </div>
  );
}
