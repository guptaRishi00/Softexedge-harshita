"use client";

import Link from "next/link";
import { IoMdArrowForward } from "react-icons/io";
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
        "group relative flex w-fit cursor-pointer items-center gap-3 overflow-hidden rounded-xl bg-white px-6 py-4 text-sm font-medium text-black transition-all",
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

      {/* TYPEWRITER TEXT */}
      {/* TEXT ANIMATION */}
      <span
        className={cn(
          "relative z-10 overflow-hidden font-medium",
          textClassName,
        )}
      >
        <span className="relative block">
          {/* Default Text */}
          <span className="block transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-full group-hover:opacity-0">
            {text}
          </span>

          {/* Hover Text */}
          <span className="absolute left-0 top-full block text-white opacity-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:top-0 group-hover:opacity-100">
            {text}
          </span>
        </span>
      </span>

      {/* ICON */}
      {showIcon && (
        <span
          className={cn(
            "relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black text-white transition-all duration-500 group-hover:-rotate-45 group-hover:translate-x-1 group-hover:bg-white group-hover:text-black",
            iconClassName,
          )}
        >
          <IoMdArrowForward />
        </span>
      )}
    </Component>
  );
}
