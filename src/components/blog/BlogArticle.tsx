"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { ArrowLeft, Calendar, Check, Clock, Link2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { type MouseEvent, useEffect, useRef, useState } from "react";
import { FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { MdArrowOutward } from "react-icons/md";
import type { BlogPost, ContentBlock } from "@/data/blog";
import Header from "../page/Header";

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

// URL-safe id for a heading. Matches the id we stamp onto the rendered <h2>
// so TOC links and anchors stay in sync from one source (the heading text).
const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

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
          className="relative -mt-6 aspect-[16/10] w-full overflow-hidden rounded-[20px] bg-zinc-100 md:aspect-[16/9]"
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
      <section className="w-full bg-white px-6 py-16 md:px-10 md:py-24">
        <div className="grid w-full  grid-cols-1 gap-12 lg:grid-cols-[200px_minmax(0,1fr)]">
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
      {related.length > 0 && (
        <section className="w-full overflow-hidden bg-white pb-16 md:py-32 ">
          <div className="w-full ">
            <div className="mb-12 flex w-full flex-col items-start justify-between gap-8 px-4 md:mb-20 md:flex-row md:items-center md:px-10">
              <div className="flex flex-col items-start">
                <p className="mb-3 text-sm font-medium uppercase tracking-[0.3em] text-zinc-500">
                  Related articles
                </p>
                <h2 className="text-4xl font-bold tracking-tight text-zinc-900 md:text-5xl lg:text-6xl lg:leading-[1.05]">
                  Continue reading
                </h2>
              </div>

              {/* Same CTA button as the BlogSection / ExperimentalTestimonials */}
              <div className="flex w-full items-center justify-end md:w-auto">
                <Link
                  href="/blog"
                  className="group flex h-16 w-fit cursor-pointer items-center justify-between gap-5 rounded-xl border border-transparent bg-white pl-0 pr-2.5 transition-all duration-300 hover:border-black hover:pl-6 hover:pr-3.5"
                >
                  <span className="text-lg font-bold tracking-tight text-black transition-colors duration-300">
                    Explore all articles
                  </span>

                  <div className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl bg-black text-white">
                    <svg width="0" height="0" className="absolute">
                      <title>Explore arrow gradient</title>
                      <defs>
                        <linearGradient
                          id="related-cta-grad"
                          x1="0%"
                          y1="0%"
                          x2="100%"
                          y2="0%"
                        >
                          <stop stopColor="#2E5BFF" offset="0%" />
                          <stop stopColor="#149CCB" offset="100%" />
                        </linearGradient>
                      </defs>
                    </svg>

                    <MdArrowOutward className="absolute z-10 h-5 w-5 transition-transform duration-300 group-hover:-translate-y-8 group-hover:translate-x-8" />
                    <MdArrowOutward
                      className="absolute z-10 h-5 w-5 -translate-x-8 translate-y-8 transition-transform duration-300 group-hover:translate-x-0 group-hover:translate-y-0"
                      style={{ fill: "url(#related-cta-grad)" }}
                    />
                  </div>
                </Link>
              </div>
            </div>

            <div className="mx-auto grid w-full grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3 px-3">
              {related.map((rp, i) => (
                <RelatedCard key={rp.slug} post={rp} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}

// ---------- Block renderer ----------
function Block({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case "heading":
      return (
        <h2
          id={slugify(block.text)}
          className="mt-14 mb-5 scroll-mt-28 text-2xl font-bold tracking-tight text-zinc-900 md:text-3xl"
        >
          {block.text}
        </h2>
      );
    case "paragraph":
      return (
        <p className="mb-6 text-lg leading-[1.25em] text-zinc-600">
          {block.text}
        </p>
      );
    case "quote":
      return (
        <blockquote className="my-10 border-l-2 border-[#2E5BFF] pl-6 md:pl-8">
          <p className="text-xl font-medium italic leading-[1.2em] text-zinc-800 md:text-2xl">
            “{block.text}”
          </p>
          {block.cite && (
            <cite className="mt-4 block text-sm font-semibold not-italic text-zinc-500">
              — {block.cite}
            </cite>
          )}
        </blockquote>
      );
    case "list":
      return (
        <ul className="my-8 flex flex-col gap-4">
          {block.items.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-[#2E5BFF] to-[#149CCB]" />
              <span className="text-lg leading-[1.25em] text-zinc-600">
                {item}
              </span>
            </li>
          ))}
        </ul>
      );
    case "callout":
      return (
        <div className="my-10 rounded-3xl border border-zinc-200 bg-[#F7F9FF] p-6 md:p-8">
          <span className="text-xs font-bold uppercase tracking-[0.2em]">
            <span className="bg-gradient-to-r from-[#2E5BFF] to-[#149CCB] bg-clip-text text-transparent">
              {block.label}
            </span>
          </span>
          <h3 className="mt-3 text-xl font-bold tracking-tight text-zinc-900 md:text-2xl">
            {block.title}
          </h3>
          <p className="mt-3 text-lg leading-[1.25em] text-zinc-600">
            {block.text}
          </p>
        </div>
      );
    case "image":
      return (
        <figure className="my-10">
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-zinc-100">
            <Image
              src={block.src}
              alt={block.caption ?? ""}
              fill
              sizes="(max-width: 768px) 100vw, 720px"
              className="object-cover"
            />
          </div>
          {block.caption && (
            <figcaption className="mt-3 text-center text-sm font-medium text-zinc-400">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );
    default:
      return null;
  }
}

// ---------- Share rail ----------
function ShareRail({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);

  const currentUrl = () =>
    typeof window !== "undefined" ? window.location.href : "";

  const openShare = (url: string) => {
    if (typeof window !== "undefined") {
      window.open(url, "_blank", "noopener,noreferrer,width=600,height=520");
    }
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl());
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // clipboard unavailable — no-op
    }
  };

  const btn =
    "flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-600 transition-all duration-300 hover:border-transparent hover:bg-zinc-900 hover:text-white";

  return (
    <>
      <span className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400">
        Share
      </span>
      <div className="flex gap-2.5">
        <button
          type="button"
          aria-label="Share on X"
          onClick={() =>
            openShare(
              `https://twitter.com/intent/tweet?text=${encodeURIComponent(
                title,
              )}&url=${encodeURIComponent(currentUrl())}`,
            )
          }
          className={btn}
        >
          <FaXTwitter className="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          aria-label="Share on LinkedIn"
          onClick={() =>
            openShare(
              `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                currentUrl(),
              )}`,
            )
          }
          className={btn}
        >
          <FaLinkedinIn className="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          aria-label="Copy link"
          onClick={copyLink}
          className={btn}
        >
          {copied ? (
            <Check className="h-3.5 w-3.5 text-green-500" />
          ) : (
            <Link2 className="h-3.5 w-3.5" />
          )}
        </button>
      </div>
    </>
  );
}

// ---------- Table of contents ----------
function TableOfContents({
  headings,
}: {
  headings: { id: string; text: string }[];
}) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // No headings — nothing to observe. Keeps the effect a no-op on SSR/prerender.
    if (headings.length === 0) return;

    const targets = headings
      .map((h) => document.getElementById(h.id))
      .filter((el): el is HTMLElement => el !== null);

    if (targets.length === 0) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        // Pick the topmost intersecting heading as the active section.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) {
          setActiveId(visible[0].target.id);
        }
      },
      // Trigger near the top: a heading counts as "active" once its top
      // crosses ~25% of the viewport, leaving room for the fixed header.
      { rootMargin: "-25% 0px -65% 0px", threshold: 0 },
    );

    for (const el of targets) {
      observerRef.current.observe(el);
    }

    return () => observerRef.current?.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  const handleClick = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      // Keep the URL hash in sync without an instant jump, then smooth-scroll.
      history.replaceState(null, "", `#${id}`);
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <nav
      aria-label="Table of contents"
      className="flex flex-col gap-3 rounded-2xl border border-zinc-200 bg-[#FAFAFA] p-5"
    >
      <span className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400">
        On this page
      </span>
      <ul className="flex flex-col gap-2.5">
        {headings.map((h) => {
          const isActive = h.id === activeId;
          return (
            <li key={h.id}>
              <a
                href={`#${h.id}`}
                onClick={(e) => handleClick(e, h.id)}
                className={
                  "block border-l-2 py-0.5 pl-3 text-sm leading-snug transition-colors duration-200 " +
                  (isActive
                    ? "border-[#2E5BFF] font-semibold text-zinc-900"
                    : "border-zinc-200 font-medium text-zinc-500 hover:border-zinc-400 hover:text-zinc-800")
                }
              >
                {h.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

// ---------- Related card ----------
function RelatedCard({ post, index }: { post: BlogPost; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: premiumEase }}
    >
      {/* Same card as the home BlogSection: square image that grows on hover
          while the meta + title slide up over it behind a scrim. */}
      <Link href={post.href} className="block h-full">
        <article className="group flex h-full flex-col max-md:rounded-2xl max-md:border max-md:border-black/10 max-md:bg-white max-md:p-5 max-md:shadow-sm">
          <div className="relative aspect-square w-full overflow-hidden rounded-[1.25rem] bg-zinc-100 transition-[aspect-ratio] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] md:group-hover:aspect-[3/4]">
            <Image
              src={post.image}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, (max-width: 1232px) 25vw, 288px"
              className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] md:group-hover:scale-105"
            />
            <div className="pointer-events-none absolute inset-0 rounded-[1.25rem] bg-gradient-to-t from-black/75 via-black/15 to-transparent opacity-0 transition-opacity duration-500 md:group-hover:opacity-100" />
          </div>

          <div className="relative z-10 mt-4 flex flex-1 flex-col px-2 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] md:group-hover:-mt-32 md:group-hover:px-4 md:group-hover:pb-4">
            <div className="mb-3 flex items-center gap-2 text-sm font-medium text-zinc-500 transition-colors duration-500 md:group-hover:text-white/70">
              <span className="text-zinc-800 transition-colors duration-500 md:group-hover:text-white">
                {post.author}
              </span>
              <span className="h-1 w-1 rounded-full bg-zinc-300 md:group-hover:bg-white/50" />
              <span>{post.readTime}</span>
            </div>

            <h3 className="text-lg font-bold leading-[1.2em] tracking-tight text-zinc-900 transition-colors duration-500 md:group-hover:text-white lg:text-xl">
              {post.title}
            </h3>
          </div>
        </article>
      </Link>
    </motion.div>
  );
}
