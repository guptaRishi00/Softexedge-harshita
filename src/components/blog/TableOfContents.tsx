"use client";

import { motion } from "framer-motion";
import { type MouseEvent, useEffect, useRef, useState } from "react";

const premiumEase = [0.16, 1, 0.3, 1] as const;

export default function TableOfContents({
  headings,
}: {
  headings: { id: string; text: string }[];
}) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (headings.length === 0) return;

    const targets = headings
      .map((h) => document.getElementById(h.id))
      .filter((el): el is HTMLElement => el !== null);

    if (targets.length === 0) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) {
          setActiveId(visible[0].target.id);
        }
      },
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
      history.replaceState(null, "", `#${id}`);
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <motion.nav
      aria-label="Table of contents"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: premiumEase }}
      className="flex flex-col gap-4 rounded-2xl border border-zinc-200 bg-[#FAFAFA] p-8 md:p-10"
    >
      <span className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400">
        On this page
      </span>
      <ul className="flex flex-col gap-3.5">
        {headings.map((h) => {
          const isActive = h.id === activeId;
          return (
            <li key={h.id}>
              <a
                href={`#${h.id}`}
                onClick={(e) => handleClick(e, h.id)}
                className={
                  "block border-l-2 py-1.5 pl-3 text-sm leading-snug transition-colors duration-200 " +
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
    </motion.nav>
  );
}
