// src/components/ui/DynamicButton.tsx
"use client";

import Link from "next/link";
import { MdKeyboardArrowRight } from "react-icons/md";
import { cn } from "@/lib/utils";

interface DynamicButtonProps {
  text?: string;
  href?: string;
  target?: "_blank" | "_self";
  className?: string;
  textClassName?: string;
  iconClassName?: string;
  showIcon?: boolean;

  glowColors?: {
    from: string;
    to: string;
  };

  onClick?: () => void;
}

export default function DynamicButton({
  text = "Explore Our Work",
  href,
  target = "_self",
  className = "",
  textClassName = "",
  iconClassName = "",
  showIcon = true,

  glowColors = {
    from: "#2E5BFF",
    to: "#149CCB",
  },

  onClick,
}: DynamicButtonProps) {
  const Component = href ? Link : "button";

  return (
    <Component
      href={href || ""}
      target={href ? target : undefined}
      onClick={onClick}
      className={cn(
        "group relative flex w-fit cursor-pointer hover:border-transparent items-center gap-3 overflow-hidden rounded-xl bg-white px-6 py-4 text-sm font-medium text-black transition-all",
        className,
      )}
    >
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to right, ${glowColors.from}, ${glowColors.to})`,
          }}
        />

        {/* Glow */}
        <div
          className="absolute inset-0 opacity-60 blur-2xl"
          style={{
            background: `linear-gradient(to right, ${glowColors.from}, ${glowColors.to})`,
          }}
        />
      </div>

      {/* Shine Sweep */}
      <div className="absolute inset-0 overflow-hidden rounded-lg">
        <div className="absolute left-[-120%] top-0 h-full w-[60%] rotate-12 bg-white/40 blur-xl transition-all duration-1000 group-hover:left-[140%]" />
      </div>

      {/* TYPEWRITER TEXT ANIMATION */}
      <span
        className={cn(
          "relative z-10 flex overflow-hidden font-bold",
          textClassName,
        )}
      >
        {/* Default Text (disappears quickly on hover) */}
        <span className="opacity-100 transition-opacity group-hover:opacity-0">
          {text}
        </span>

        {/* Hover Text (appears letter by letter) */}
        <span
          className="absolute left-0 top-0 flex text-white"
          aria-hidden="true"
        >
          {text.split("").map((char, index) => (
            <span
              key={index}
              className="opacity-0 transition-opacity group-hover:opacity-100"
              style={{ transitionDelay: `${index * 0.03}s` }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </span>
      </span>

      {/* ICON WITH ARROW ANIMATION */}
      {showIcon && (
        <span
          className={cn(
            "relative z-10 flex h-6 w-6 items-center justify-center overflow-hidden text-black transition-colors group-hover:text-white",
            iconClassName,
          )}
        >
          {/* Outgoing Arrow */}
          <MdKeyboardArrowRight
            size={24}
            className="absolute left-0 top-0 h-full w-full transition-transform duration-300 ease-in-out group-hover:translate-x-[150%]"
          />

          {/* Incoming Arrow */}
          <MdKeyboardArrowRight
            size={24}
            className="absolute left-0 top-0 h-full w-full translate-x-[-150%] transition-transform duration-300 ease-in-out group-hover:translate-x-0"
          />
        </span>
      )}
    </Component>
  );
}
