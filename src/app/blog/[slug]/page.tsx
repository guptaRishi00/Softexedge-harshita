import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogArticle from "@/components/blog/BlogArticle";
import CtaSection from "@/components/brand-strategy/CtaSection";
import Footer from "@/components/layout/Footer";
import { blogPosts, getPostBySlug, getRelatedPosts } from "@/data/blog";

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
  if (!post) return { title: "Article not found" };

  return {
    title: post.title,
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

      <div className="px-3 [&>section]:pt-12 [&>section]:pb-8 max-md:[&>section]:pt-9 max-md:[&>section]:pb-9 md:[&>section]:pt-16 md:[&>section]:pb-12">
        <CtaSection />
      </div>
      <div className="px-3 pt-11 pb-3 max-md:pb-4 md:pt-12">
        <Footer />
      </div>
    </div>
  );
}
