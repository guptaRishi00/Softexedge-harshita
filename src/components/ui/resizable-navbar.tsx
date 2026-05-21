"use client";

import { cn } from "@/lib/utils";
import { IconMenu2, IconX } from "@tabler/icons-react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";

import Link from "next/link";
import React, { useRef, useState } from "react";

interface NavbarProps {
  children: React.ReactNode;
  className?: string;
}

interface NavBodyProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

export interface NavItem {
  name: string;
  link: string;
  subItems?: { name: string; link: string }[];
  sections?: {
    title?: string;
    items: { name: string; link: string }[];
  }[];
}

interface NavItemsProps {
  items: NavItem[];
  className?: string;
  onItemClick?: () => void;
  visible?: boolean;
}

interface MobileNavProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface MobileNavHeaderProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface MobileNavMenuProps {
  children: React.ReactNode;
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const Navbar = ({ children, className }: NavbarProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll();

  const lastScroll = useRef(0);

  const [visible, setVisible] = useState<boolean>(false);
  const [isHidden, setIsHidden] = useState<boolean>(false);

  useMotionValueEvent(scrollY, "change", (latest: number) => {
    // Floating navbar after scroll
    const shouldBeVisible = latest > 80;

    setVisible((prev) => (prev === shouldBeVisible ? prev : shouldBeVisible));

    // Hide navbar on scroll down
    if (latest > lastScroll.current && latest > 120) {
      setIsHidden(true);
    } else {
      setIsHidden(false);
    }

    lastScroll.current = latest;
  });

  return (
    <motion.div
      ref={ref}
      animate={{
        y: isHidden ? -120 : 0,
      }}
      transition={{
        duration: 0.3,
        ease: "easeOut",
      }}
      className={cn(
        "fixed inset-x-0 top-0 z-[100] flex justify-center will-change-transform",
        className,
      )}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? typeof child.type === "string"
            ? child // If it's a native HTML element (like 'div'), return it as-is
            : React.cloneElement(
                child as React.ReactElement<{ visible?: boolean }>,
                { visible },
              )
          : child,
      )}
    </motion.div>
  );
};

export const NavBody = ({ children, className, visible }: NavBodyProps) => {
  return (
    <motion.div
      initial={{
        width: visible ? "98%" : "100%",
        y: visible ? 16 : 0,
        scale: visible ? 0.96 : 1,
        borderRadius: visible ? "20px" : "0px",
      }}
      animate={{
        width: visible ? "98%" : "100%",
        y: visible ? 16 : 0,
        scale: visible ? 0.96 : 1,
        borderRadius: visible ? "13px" : "0px",
      }}
      transition={{
        type: "spring",
        stiffness: 180,
        damping: 28,
      }}
      className={cn(
        `
        fixed left-1/2 top-0 z-50
        hidden lg:flex
        -translate-x-1/2
        items-center justify-between
        transition-all
        `,
        visible
          ? `
            px-6 py-3
            bg-gray-300
            backdrop-blur-xl
            shadow-[0_8px_40px_rgba(0,0,0,0.18)]
          `
          : `
            px-10 py-8
            bg-transparent
          `,
        className,
      )}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(
              child as React.ReactElement<{ visible?: boolean }>,
              { visible },
            )
          : child,
      )}
    </motion.div>
  );
};

export const NavItems = ({
  items,
  className,
  onItemClick,
  visible,
}: NavItemsProps) => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "hidden flex-1 flex-row items-center justify-center space-x-2 text-sm font-medium transition duration-200 lg:flex lg:space-x-2",
        className,
      )}
    >
      {items.map((item, idx) => {
        const hasDropdown =
          (item.subItems && item.subItems.length > 0) ||
          (item.sections && item.sections.length > 0);

        return (
          <div
            key={`link-container-${idx}`}
            onMouseEnter={() => setHovered(idx)}
            className="relative py-1"
          >
            <Link
              onClick={onItemClick}
              className={cn(
                "relative px-4 py-2 transition-colors flex items-center gap-1 group",
                visible
                  ? "text-black hover:text-black"
                  : "text-white hover:text-black",
              )}
              href={item.link}
            >
              {hovered === idx && (
                <motion.div
                  layoutId="hovered"
                  className="absolute inset-0 h-full w-full rounded-full bg-gray-100"
                />
              )}

              <span className="relative z-20">{item.name}</span>

              {hasDropdown && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={cn(
                    "relative z-20 transition-transform duration-200",
                    hovered === idx && "rotate-180 text-black",
                  )}
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              )}
            </Link>

            <AnimatePresence>
              {hasDropdown && hovered === idx && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className={cn(
                    "absolute top-full left-1/2 -translate-x-1/2 pt-2 z-[110]",
                    item.sections
                      ? item.sections.length > 1
                        ? "w-[650px]"
                        : "w-[320px]"
                      : "w-64",
                  )}
                >
                  <div className="bg-white backdrop-blur-xl border border-[#1b38f4]/20 rounded-2xl overflow-hidden p-6 shadow-2xl">
                    {item.sections ? (
                      <div
                        className={cn(
                          "grid gap-10",
                          item.sections.length > 1
                            ? "grid-cols-2"
                            : "grid-cols-1",
                        )}
                      >
                        {item.sections.map((section, sIdx) => (
                          <div
                            key={`section-${sIdx}`}
                            className="flex flex-col gap-4"
                          >
                            {section.title && (
                              <h3 className="text-[13px] uppercase tracking-[0.25em] text-zinc-900 font-bold px-4 pt-2">
                                {section.title}
                              </h3>
                            )}

                            <div className="flex flex-col gap-1">
                              {section.items.map((sub, ssIdx) => (
                                <Link
                                  key={`sub-${ssIdx}`}
                                  href={sub.link}
                                  onClick={onItemClick}
                                  className="block px-4 py-3 text-[16px] font-medium text-zinc-900 hover:text-white hover:bg-linear-to-r hover:from-[#3445E7] hover:via-[#2F85EA] hover:to-[#07D6F3] rounded-xl transition-all duration-200"
                                >
                                  {sub.name}
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-col gap-2">
                        {item.subItems?.map((sub, sIdx) => (
                          <Link
                            key={`sub-${sIdx}`}
                            href={sub.link}
                            onClick={onItemClick}
                            className="block px-4 py-3 text-[16px] font-medium text-zinc-400 hover:text-white hover:bg-[#1b38f4]/25 rounded-xl transition-all duration-200"
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};

export const MobileNav = ({ children, className, visible }: MobileNavProps) => {
  return (
    <div
      className={cn(
        "relative z-50 mx-auto flex w-full flex-col items-center justify-between bg-transparent px-0 py-2 lg:hidden transition-all duration-300",
        visible && "bg-white/90 backdrop-blur-md",
        className,
      )}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(
              child as React.ReactElement<{ visible?: boolean }>,
              { visible },
            )
          : child,
      )}
    </div>
  );
};

export const MobileNavHeader = ({
  children,
  className,
  visible,
}: MobileNavHeaderProps) => {
  return (
    <div
      className={cn(
        "fixed inset-x-0 top-0 z-[70] flex w-full flex-row items-center justify-between px-6 py-4 transition-all duration-300",
        visible
          ? "bg-white/90 backdrop-blur-md border-b border-black/5 shadow-xl"
          : "bg-transparent",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const MobileNavMenu = ({
  children,
  className,
  isOpen,
}: MobileNavMenuProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: "100%" }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: "100%" }}
          transition={{
            duration: 0.35,
            ease: "easeInOut",
          }}
          className={cn(
            "fixed inset-0 z-[60] flex h-screen w-full flex-col items-center justify-center gap-8 bg-black px-4",
            className,
          )}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const MobileNavToggle = ({
  isOpen,
  onClick,
  visible,
}: {
  isOpen: boolean;
  onClick: () => void;
  visible?: boolean;
}) => {
  return isOpen ? (
    <IconX
      className={cn(
        "cursor-pointer transition-colors",
        visible ? "text-black" : "text-white",
      )}
      onClick={onClick}
    />
  ) : (
    <IconMenu2
      className={cn(
        "cursor-pointer transition-colors",
        visible ? "text-black" : "text-white",
      )}
      onClick={onClick}
    />
  );
};
