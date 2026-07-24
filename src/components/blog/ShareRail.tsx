"use client";

import { Check, Link2 } from "lucide-react";
import { useState } from "react";
import { FaLinkedinIn, FaXTwitter } from "react-icons/fa6";

// ---------- Share rail ----------
export default function ShareRail({ title }: { title: string }) {
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
