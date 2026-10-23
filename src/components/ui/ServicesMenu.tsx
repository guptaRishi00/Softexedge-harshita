"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import RollingText from "@/components/ui/RollingText";
import { cn } from "@/lib/utils";

type Service = { name: string; link: string; image?: string };

/**
 * Header "Services" dropdown (both resizable-navbars): service links on the
 * left, one large image on the right that cross-fades to whichever link is
 * hovered or focused. Link labels use the header links' hover effect
 * (RollingText: staggered slide-up roll on the link's `.group` hover/focus).
 * All images are stacked and only opacity/scale change, so swapping never
 * shifts layout.
 */
export default function ServicesMenu({
  items,
  onItemClick,
}: {
  items: Service[];
  onItemClick?: () => void;
}) {
  const [active, setActive] = useState(0);

  return (
    <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] gap-3 overflow-hidden rounded-[2rem] border border-black/5 bg-white p-3 shadow-[0_40px_100px_rgba(15,23,42,0.14)]">
      <ul className="flex flex-col justify-center py-4 pl-5">
        {items.map((sub, i) => (
          <li key={sub.link}>
            <Link
              href={sub.link}
              onClick={onItemClick}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              className="group flex items-center rounded-lg py-2 text-[22px] font-medium leading-tight tracking-[-0.02em] text-zinc-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2E5BFF]"
            >
              <RollingText text={sub.name} />
            </Link>
          </li>
        ))}
      </ul>

      {/* Decorative: every image's meaning is the link text beside it. */}
      <div
        aria-hidden="true"
        className="relative min-h-[420px] overflow-hidden rounded-[1.25rem] bg-zinc-100"
      >
        {items.map(
          (sub, i) =>
            sub.image && (
              <Image
                key={sub.link}
                src={sub.image}
                alt=""
                fill
                sizes="(min-width: 1280px) 540px, 45vw"
                className={cn(
                  "object-cover transition-[opacity,scale] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none",
                  active === i
                    ? "scale-100 opacity-100"
                    : "scale-[1.04] opacity-0",
                )}
              />
            ),
        )}
      </div>
    </div>
  );
}
