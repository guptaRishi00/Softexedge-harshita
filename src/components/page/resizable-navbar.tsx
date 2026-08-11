"use client";

import { IconMenu2, IconX } from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
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
  onDark?: boolean;
}

interface MobileNavProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
  /**
   * Opt-in mobile treatment, ported from `ui/resizable-navbar` so `/about` can
   * match the homepage: the bar shrinks to a floating pill on scroll and the
   * menu opens as an inline dropdown inside that same surface, instead of a
   * full-screen overlay.
   *
   * Off by default — the other routes on this Header keep the overlay.
   */
  dropdown?: boolean;
  isOpen?: boolean;
}

interface MobileNavHeaderProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
  dropdown?: boolean;
  /** Dropdown mode only: the bar is currently a dark pill. */
  floating?: boolean;
}

interface MobileNavMenuProps {
  children: React.ReactNode;
  className?: string;
  isOpen: boolean;
  onClose: () => void;
  dropdown?: boolean;
}

export const Navbar = ({ children, className }: NavbarProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState<boolean>(false);

  // Same treatment as the homepage copy (ui/resizable-navbar): a native passive
  // listener plus a direct style write and a CSS transition. framer's
  // useScroll/useMotionValueEvent ran library code on every scroll frame; the
  // per-frame `setIsHidden` (unguarded in this copy) re-rendered the component
  // and re-ran the cloneElement pass over the whole nav subtree on every scroll
  // direction change; and the slide itself was a framer spring. The CSS
  // transition below is the same 300ms ease-out, run by the compositor.
  // `visible` stays React state — children restyle from it, but it flips only
  // when the 80px threshold is crossed, not per frame.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let lastScroll = 0;
    let hidden = false;

    const onScroll = () => {
      const latest = window.scrollY;

      const shouldBeVisible = latest > 80;
      setVisible((prev) => (prev === shouldBeVisible ? prev : shouldBeVisible));

      const shouldHide = latest > lastScroll && latest > 120;
      if (shouldHide !== hidden) {
        hidden = shouldHide;
        el.style.translate = hidden ? "0 -120px" : "0 0";
      }
      lastScroll = latest;
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        "fixed inset-x-0 top-0 z-[100] flex justify-center transition-[translate] duration-300 ease-out",
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
      <AnimatePresence>
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
                  className="absolute inset-0 h-full w-full rounded-lg bg-white shadow-[0_4px_6px_-1px_rgb(0_0_0_/_0.1),0_2px_4px_-2px_rgb(0_0_0_/_0.1),0_-4px_6px_-1px_rgb(0_0_0_/_0.1),0_-2px_4px_-2px_rgb(0_0_0_/_0.1)]"
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
                      ? "w-[90vw] max-w-[1400px]" 
                      : item.sections
                        ? item.sections.length > 1
                          ? "w-[650px]"
                          : "w-[320px]"
                        : "w-64",
                  )}
                >
                  {item.dropdownItems ? (
                    <div className="bg-white border border-black/5 rounded-[2rem] overflow-hidden p-3 shadow-[0_40px_100px_rgba(0,0,0,0.15)] grid grid-cols-2 md:grid-cols-4 gap-2">
                      {item.dropdownItems.map((sub, sIdx) => (
                        <Link
                          key={`sub-${sIdx}`}
                          href={sub.link}
                          onClick={onItemClick}
                          className="group relative h-[180px] lg:h-[220px] overflow-hidden rounded-[1.5rem] bg-zinc-50 border border-black/5 px-6 py-6 transition-all duration-500 hover:bg-transparent hover:shadow-xl"
                        >
                          {sub.image && (
                            <div className="absolute inset-0 z-0 opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100">
                              <Image
                                src={sub.image}
                                alt={sub.name}
                                fill
                                sizes="(max-width: 768px) 50vw, 25vw"
                                className="h-full w-full object-cover  scale-105 transition-transform duration-700 ease-out group-hover:scale-100"
                              />
                            </div>
                          )}

                          <div className="pointer-events-none absolute inset-0 z-[5] bg-gradient-to-b from-black/70 via-black/20 to-transparent opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100" />

                          <div className="relative z-10 flex h-full flex-col justify-between text-zinc-900 transition-colors duration-400 group-hover:text-white">
                            <div className="flex justify-between items-start w-full">
                              <span className="relative inline-block max-w-[70%] transition-all duration-400 ease-out group-hover:translate-x-1">
                                <span className="relative text-xl lg:text-2xl font-bold tracking-tight bg-gradient-to-r from-zinc-900 to-zinc-900 group-hover:from-[#2E5BFF] group-hover:to-[#149CCB] bg-clip-text text-transparent">
                                  {sub.name}
                                </span>
                              </span>
                            </div>

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

export const MobileNav = ({
  children,
  className,
  visible,
  dropdown,
  isOpen,
}: MobileNavProps) => {
  if (dropdown) {
    // Floating whenever scrolled OR open, so opening at the very top still
    // detaches the bar into a card rather than leaving a full-bleed strip.
    const floating = visible || isOpen;

    // No `fixed` here: the parent Navbar is already
    // `fixed inset-x-0 top-0 flex justify-center`, so this only declares width
    // and the parent centres it.
    return (
      <div
        className={cn(
          "z-50 flex flex-col overflow-hidden lg:hidden",
          // CSS transitions rather than framer `animate`: no JS per frame, and
          // every state is readable from computed style.
          "transition-[width,translate,border-radius,background-color,border-color] duration-200 ease-out",
          isOpen ? "w-[96%]" : visible ? "w-[88%]" : "w-full",
          floating
            ? "translate-y-2.5 rounded-[18px] border border-white/10 bg-[#0b0b10]/90 backdrop-blur-md shadow-2xl"
            : "translate-y-0 rounded-none border border-transparent bg-transparent",
          className,
        )}
      >
        {React.Children.map(children, (child) =>
          React.isValidElement(child)
            ? typeof child.type === "string"
              ? child
              : React.cloneElement(
                  child as React.ReactElement<{
                    visible?: boolean;
                    dropdown?: boolean;
                    floating?: boolean;
                  }>,
                  { visible, dropdown: true, floating },
                )
            : child,
        )}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative z-50 mx-auto flex w-full flex-col items-center justify-between bg-transparent px-0 py-2 lg:hidden transition-colors duration-300",
        visible && "bg-white",
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
  dropdown,
  floating,
}: MobileNavHeaderProps) => {
  if (dropdown) {
    // In dropdown mode the surrounding MobileNav owns the background, blur and
    // positioning, so this is just the row. Extra top room only while the bar
    // is full-width — once it shrinks to a pill the same value reads top-heavy.
    return (
      <div
        className={cn(
          "relative flex w-full shrink-0 flex-row items-center justify-between px-6 pb-2.5",
          visible ? "pt-2.5" : "pt-6",
          className,
        )}
      >
        {React.Children.map(children, (child) => {
          if (!React.isValidElement(child)) return child;
          if (typeof child.type === "string") return child;
          const el = child as React.ReactElement<{
            visible?: boolean;
            onDark?: boolean;
          }>;
          // The homepage can pin its logo and icon white because its hero is a
          // dark video at every scroll position. Here the hero is light, so the
          // white treatment has to follow the pill: dark surface -> white marks,
          // top of a light hero -> the page's own `onDark` (blue logo, black
          // icon on /about).
          return React.cloneElement(el, {
            visible,
            onDark: el.props.onDark || floating,
          });
        })}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "fixed inset-x-0 top-0 z-[70] flex w-full flex-row items-center justify-between px-6 py-4 transition-colors duration-300",
        visible
          ? "bg-white border-b border-black/5 shadow-xl"
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
  dropdown,
}: MobileNavMenuProps) => {
  if (dropdown) {
    // Height is a layout property and cannot be composited, but this is a
    // one-shot tap on a small subtree — not a loop — so the cost is paid once
    // per open rather than every frame.
    return (
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="mobile-dropdown"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            className="w-full overflow-hidden"
          >
            <div
              className={cn("flex w-full flex-col px-6 pt-1 pb-5", className)}
            >
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

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
  // A real <button>, not an <svg onClick>. iOS dispatches click reliably only on
  // natively interactive elements; a bare SVG is not one, so the first tap is
  // spent on the hover/focus pass and the menu opens only on the second. Also
  // gives the control a name and keyboard access, which the raw icon lacked.
  const color = onDark ? "text-white" : "text-black";
  const Icon = isOpen ? IconX : IconMenu2;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={isOpen ? "Close menu" : "Open menu"}
      aria-expanded={isOpen}
      className="flex cursor-pointer items-center justify-center bg-transparent p-0"
    >
      <Icon className={cn("transition-colors", color)} />
    </button>
  );
};
