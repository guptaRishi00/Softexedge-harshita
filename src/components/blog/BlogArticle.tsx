"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/data/blog";
import Header from "../page/Header";
import Block, { slugify } from "./ArticleBlock";
import RelatedArticles from "./RelatedArticles";
import ShareRail from "./ShareRail";
import TableOfContents from "./TableOfContents";

const premiumEase = [0.16, 1, 0.3, 1] as const;

// Upgrade an unsplash card thumbnail (w=600) to a hero-sized crop.
const wide = (url: string, w = 1600) => url.replace("w=600", `w=${w}`);

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.08, ease: premiumEase },
  }),
} as const;

export default function BlogArticle({
  post,
  related,
}: {
  post: BlogPost;
  related: BlogPost[];
}) {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.4,
  });

  // Table of contents: derive from the article's heading blocks.
  const toc = post.content
    .filter(
      (block): block is { type: "heading"; text: string } =>
        block.type === "heading",
    )
    .map((block) => ({ id: slugify(block.text), text: block.text }));

  return (
    <main className="relative w-full bg-white font-sans selection:bg-[#2E5BFF]/20">
      {/* Reading progress bar */}
      <motion.div
        style={{ scaleX: progress }}
        className="fixed left-0 top-0 z-[200] h-[3px] w-full origin-left bg-linear-to-r from-[#2E5BFF] to-[#149CCB]"
      />

      {/* Header */}
      <div className="absolute left-0 top-0 z-50 w-full">
        <Header />
      </div>

      {/* ---------- HERO ---------- */}
      <section className="relative w-full overflow-hidden bg-[#FAFAFA] px-6 pb-16 pt-36 md:px-10 md:pb-20 md:pt-44">
        <div className="w-full ">
          <motion.div
            initial="hidden"
            animate="visible"
            custom={0}
            variants={fadeUp}
          >
            <Link
              href="/blog"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-zinc-500 transition-colors hover:text-zinc-900"
            >
              <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
              All Articles
            </Link>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            custom={1}
            variants={fadeUp}
            className="mt-8"
          >
            <span className="inline-flex items-center gap-2 rounded-md border border-zinc-200 bg-white px-4 py-1.5 text-[0.7rem] font-bold uppercase tracking-[0.2em]">
              <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-[#2E5BFF] to-[#149CCB]" />
              <span className="bg-gradient-to-r from-[#2E5BFF] to-[#149CCB] bg-clip-text text-transparent">
                {post.category}
              </span>
            </span>
          </motion.div>

          <motion.h1
            initial="hidden"
            animate="visible"
            custom={2}
            variants={fadeUp}
            className="mt-6 max-w-5xl text-4xl font-bold leading-[1.08] tracking-tight text-zinc-900 md:text-5xl lg:text-6xl"
          >
            {post.title}
          </motion.h1>

          <motion.p
            initial="hidden"
            animate="visible"
            custom={3}
            variants={fadeUp}
            className="mt-6 text-lg font-medium leading-[1.25em] text-zinc-500 md:text-xl max-w-5xl"
          >
            {post.lead}
          </motion.p>

          {/* Meta row */}
          <motion.div
            initial="hidden"
            animate="visible"
            custom={4}
            variants={fadeUp}
            className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4 border-t border-zinc-200 pt-8"
          >
            <div className="flex items-center gap-3">
              <Image
                src={post.authorMeta.avatar}
                alt={post.authorMeta.name}
                width={44}
                height={44}
                className="h-11 w-11 rounded-full object-cover"
              />
              <div className="flex flex-col">
                <span className="text-sm font-bold text-zinc-900">
                  {post.authorMeta.name}
                </span>
                <span className="text-xs font-medium text-zinc-500">
                  {post.authorMeta.role}
                </span>
              </div>
            </div>
            <span className="hidden h-8 w-px bg-zinc-200 sm:block" />
            <div className="flex items-center gap-2 text-sm font-medium text-zinc-500">
              <Calendar className="h-4 w-4" />
              {post.date}
            </div>
            <div className="flex items-center gap-2 text-sm font-medium text-zinc-500">
              <Clock className="h-4 w-4" />
              {post.readTime} read
            </div>
          </motion.div>
        </div>
      </section>

      {/* ---------- COVER IMAGE ---------- */}
      {/* Edge-to-edge with the site's standard p-3 inset + rounded-[20px],
          same framing as the CtaSection / Footer / home hero blocks. */}
      <div className="w-full bg-white px-3">
        <motion.figure
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease: premiumEase }}
          className="relative -mt-6 aspect-[16/9] w-full overflow-hidden rounded-[20px] bg-zinc-100 md:aspect-[2/1]"
        >
          <Image
            src={wide(post.image)}
            alt={post.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </motion.figure>
      </div>

      {/* ---------- BODY ---------- */}
      <section className="w-full bg-white px-6 py-16 md:px-10 md:pt-24 md:pb-14">
        <div className="grid w-full  grid-cols-1 gap-12 lg:grid-cols-[380px_minmax(0,1fr)]">
          {/* Sticky left rail: table of contents (above) + share (below) */}
          <aside className="hidden lg:block">
            <div className="sticky top-32 flex flex-col gap-6">
              <TableOfContents headings={toc} />
              <div className="h-px w-full bg-zinc-200" />
              <ShareRail title={post.title} />
            </div>
          </aside>

          {/* Prose */}
          <article className="w-full max-w-[1000px]">
            {post.content.map((block, i) => (
              <Block key={`${block.type}-${i}`} block={block} />
            ))}

            {/* Tags */}
            <div className="mt-14 flex flex-wrap gap-2 border-t border-zinc-200 pt-8">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md border border-zinc-200 bg-zinc-50 px-4 py-1.5 text-sm font-medium text-zinc-600"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Author bio */}
            <div className="mt-12 flex flex-col gap-5 rounded-3xl border border-zinc-200 bg-[#FAFAFA] p-6 sm:flex-row sm:items-center md:p-8">
              <Image
                src={post.authorMeta.avatar}
                alt={post.authorMeta.name}
                width={72}
                height={72}
                className="h-18 w-18 shrink-0 rounded-2xl object-cover"
              />
              <div className="flex flex-col gap-1">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400">
                  Written by
                </span>
                <span className="text-xl font-bold text-zinc-900">
                  {post.authorMeta.name}
                </span>
                <span className="text-sm font-medium text-zinc-500">
                  {post.authorMeta.role} at Softexedge. Writing on{" "}
                  {post.tags.slice(0, 2).join(" & ").toLowerCase()} and the
                  craft of building modern digital products.
                </span>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* ---------- RELATED ---------- */}
      {related.length > 0 && <RelatedArticles related={related} />}
    </main>
  );
}
