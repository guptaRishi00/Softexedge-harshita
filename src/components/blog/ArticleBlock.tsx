import Image from "next/image";
import type { ContentBlock } from "@/data/blog";

// URL-safe id for a heading. Matches the id we stamp onto the rendered <h2>
// so TOC links and anchors stay in sync from one source (the heading text).
export const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

// ---------- Block renderer ----------
export default function Block({ block }: { block: ContentBlock }) {
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
