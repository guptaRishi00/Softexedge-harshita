"use client";

import { IconMenu2, IconX } from "@tabler/icons-react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { cn } from "@/lib/utils";

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
  dropdownItems?: {
    name: string;
    link: string;
    count?: string;
    image?: string;
  }[];
}

interface NavItemsProps {
  items: NavItem[];
  className?: string;
  onItemClick?: () => void;
  visible?: boolean;
  // Force the light (over-dark-hero) link treatment even before scroll.
  onDark?: boolean;
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
    const shouldBeVisible = latest > 80;
    setVisible((prev) => (prev === shouldBeVisible ? prev : shouldBeVisible));

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
      animate={{ y: isHidden ? -120 : 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={cn(
        "fixed inset-x-0 top-0 z-[100] flex justify-center",
        className,
      )}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? typeof child.type === "string"
            ? child
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
        width: visible ? "90%" : "100%",
        y: visible ? 16 : 0,
        borderRadius: visible ? "12px" : "0px",
      }}
      animate={{
        width: visible ? "70%" : "100%",
        y: visible ? 16 : 0,
        borderRadius: visible ? "10px" : "0px",
      }}
      transition={{
        type: "spring",
        stiffness: 180,
        damping: 28,
      }}
      className={cn(
        `fixed left-1/2 top-0 z-50 hidden lg:flex -translate-x-1/2 items-center justify-between transition-colors duration-300`,
        visible
          ? `px-6 py-3 bg-black/60 backdrop-blur-2xl`
          : `px-10 py-8 bg-transparent`,
        className,
      )}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? typeof child.type === "string"
            ? child
            : React.cloneElement(
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
  onDark,
}: NavItemsProps) => {
  const [hovered, setHovered] = useState<number | null>(null);

  // CHANGED: Added a check to see if the currently hovered item actually has a dropdown
  const hoveredItemHasDropdown =
    hovered !== null &&
    ((items[hovered].subItems && items[hovered].subItems.length > 0) ||
      (items[hovered].sections && items[hovered].sections.length > 0) ||
      (items[hovered].dropdownItems &&
        items[hovered].dropdownItems.length > 0));

  return (
    <div
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "hidden flex-1 flex-row items-center justify-center space-x-2 text-sm font-medium transition duration-200 lg:flex lg:space-x-2",
        className,
      )}
    >
      {/* CINEMATIC BACKDROP BLUR */}
      <AnimatePresence>
        {/* CHANGED: Now only triggers if the hovered item has a dropdown */}
        {hoveredItemHasDropdown && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed left-1/2 top-1/2 h-[300vh] w-[300vw] -translate-x-1/2 -translate-y-1/2 bg-black/20 backdrop-blur-md -z-10 pointer-events-none"
          />
        )}
      </AnimatePresence>

      {items.map((item, idx) => {
        const hasDropdown =
          (item.subItems && item.subItems.length > 0) ||
          (item.sections && item.sections.length > 0) ||
          (item.dropdownItems && item.dropdownItems.length > 0);

        return (
          <div
            key={`link-container-${idx}`}
            onMouseEnter={() => setHovered(idx)}
            className="py-1"
          >
            <Link
              onClick={onItemClick}
              className={cn(
                "relative px-4 py-2 transition-colors flex items-center gap-1 group",
                hovered === idx
                  ? "text-black"
                  : visible || onDark
                    ? "text-white hover:text-zinc-300"
                    : "text-black hover:text-zinc-600",
              )}
              href={item.link}
            >
              {hovered === idx && (
                <motion.div
                  layoutId="hovered"
                  className="absolute inset-0 h-full w-full rounded-lg bg-white shadow-md"
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
                  initial={{ opacity: 0, y: 15, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 15, scale: 0.98 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className={cn(
                    "absolute top-[calc(100%+16px)] left-1/2 -translate-x-1/2 z-[110]",
                    item.dropdownItems
                      ? "w-[90vw] max-w-[1400px]" // Perfect Mega Menu Width
                      : item.sections
                        ? item.sections.length > 1
                          ? "w-[650px]"
                          : "w-[320px]"
                        : "w-64",
                  )}
                >
                  {/* FULL WIDTH WHITE THEME GRID */}
                  {item.dropdownItems ? (
                    <div className="bg-white border border-black/5 rounded-[2rem] overflow-hidden p-3 shadow-[0_40px_100px_rgba(0,0,0,0.15)] grid grid-cols-2 md:grid-cols-4 gap-2">
                      {item.dropdownItems.map((sub, sIdx) => (
                        <Link
                          key={`sub-${sIdx}`}
                          href={sub.link}
                          onClick={onItemClick}
                          className="group relative h-[180px] lg:h-[220px] overflow-hidden rounded-[1.5rem] bg-zinc-50 border border-black/5 px-6 py-6 transition-all duration-500 hover:bg-transparent hover:shadow-xl"
                        >
                          {/* Hover Image */}
                          {sub.image && (
                            <div className="absolute inset-0 z-0 opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100">
                              <img
                                src={sub.image}
                                alt={sub.name}
                                className="h-full w-full object-cover  scale-105 transition-transform duration-700 ease-out group-hover:scale-100"
                              />
                            </div>
                          )}

                          {/* Subtle top gradient scrim — replaces the hard
                              black boxes; keeps the hover title and arrow
                              legible over the image without covering it. */}
                          <div className="pointer-events-none absolute inset-0 z-[5] bg-gradient-to-b from-black/55 via-transparent to-black/30 opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100" />

                          {/* Content Layer */}
                          <div className="relative z-10 flex h-full flex-col justify-between text-zinc-900 transition-colors duration-400 group-hover:text-white">
                            <div className="flex justify-between items-start w-full">
                              <span className="relative inline-block max-w-[70%] transition-all duration-400 ease-out group-hover:translate-x-1">
                                <span className="relative text-xl lg:text-2xl font-bold tracking-tight bg-gradient-to-r from-zinc-900 to-zinc-900 group-hover:from-[#2E5BFF] group-hover:to-[#149CCB] bg-clip-text text-transparent">
                                  {sub.name}
                                </span>
                              </span>
                            </div>

                            {/* Hover Arrow Indicator */}
                            <div className="flex justify-start">
                              <span className="relative inline-flex opacity-0 -translate-x-4 transition-all duration-400 ease-out group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-[#149CCB]">
                                <svg
                                  className="relative w-6 h-6"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                                  />
                                </svg>
                              </span>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    /* STANDARD LIGHT THEME DROPDOWN */
                    <div className="bg-white border border-black/5 rounded-2xl overflow-hidden p-6 shadow-2xl">
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
                                    className="block px-4 py-3 text-[16px] font-medium text-zinc-900 hover:text-white hover:bg-gradient-to-r hover:from-[#2E5BFF] hover:to-[#149CCB] rounded-xl transition-all duration-200"
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
                              className="block px-4 py-3 text-[16px] font-medium text-zinc-500 hover:text-black hover:bg-zinc-100 rounded-xl transition-all duration-200"
                            >
                              {sub.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
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
          ? typeof child.type === "string"
            ? child
            : React.cloneElement(
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
  onDark,
}: {
  isOpen: boolean;
  onClick: () => void;
  onDark?: boolean;
}) => {
  const color = onDark ? "text-white" : "text-black";
  return isOpen ? (
    <IconX
      className={cn("cursor-pointer transition-colors", color)}
      onClick={onClick}
    />
  ) : (
    <IconMenu2
      className={cn("cursor-pointer transition-colors", color)}
      onClick={onClick}
    />
  );
};
