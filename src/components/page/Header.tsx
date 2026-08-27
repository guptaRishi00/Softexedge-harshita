"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import {
  Navbar as AceternityNavbar,
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
  NavBody,
  type NavItem,
  NavItems,
} from "@/components/page/resizable-navbar";
import DynamicButton from "../ui/DynamicButton";

const CustomLogo = ({
  visible,
  onDark,
}: {
  visible?: boolean;
  onDark?: boolean;
}) => (
  <Link href="/" className="flex items-center gap-2 group">
    <Image
      src={visible || onDark ? "/assets/logo.png" : "/assets/logoBlue.png"}
      alt="Grovio Logo"
      width={85}
      height={30}
      // next/image lazy-loads by default (unlike a native img), so the navbar
      // mark — the topmost thing on the page — was waiting on the lazy pass and
      // popping in late. `priority` makes it eager + fetchpriority=high and adds
      // a preload hint.
      priority
      style={{ height: "auto" }}
      className="w-[88px] object-contain transition-all duration-300 md:w-[90px]"
    />
  </Link>
);

const navItems: NavItem[] = [
  {
    name: "Services",
    link: "/",
    dropdownItems: [
      {
        name: "Digital Marketing & Growth",
        count: "/4 services",
        link: "/digital-marketing",
        image:
          "https://images.unsplash.com/photo-1611926653458-09294b3142bf?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGRpZ2l0YWwlMjBtYXJrZXRpbmd8ZW58MHx8MHx8fDA%3D%3D",
      },
      {
        name: "AI & Marketing Automation",
        count: "/4 services",
        link: "/ai-marketing-automation",
        image:
          "https://plus.unsplash.com/premium_photo-1683120966127-14162cdd0935?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHNvZnR3YXJlfGVufDB8fDB8fHww",
      },
      {
        name: "Web Development",
        count: "/4 services",
        link: "/web-development",
        image:
          "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800&auto=format&fit=crop",
      },
      {
        name: "App Development",
        count: "/4 services",
        link: "/app-development",
        image:
          "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=800&auto=format&fit=crop",
      },
      {
        name: "Custom Software & SaaS",
        count: "/4 services",
        link: "/custom-software",
        image:
          "https://plus.unsplash.com/premium_photo-1685086785636-2a1a0e5b591f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8c29mdHdhcmV8ZW58MHx8MHx8fDA%3D",
      },
      {
        name: "Brand Strategy & Identity",
        count: "/4 services",
        link: "/brand-strategy",
        image:
          "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?q=80&w=800&auto=format&fit=crop",
      },
      {
        name: "UI/UX Design",
        count: "/4 services",
        link: "/ui-ux-design",
        image:
          "https://images.unsplash.com/photo-1545235617-9465d2a55698?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dWl1eHxlbnwwfHwwfHx8MA%3D%3D",
      },
      {
        name: "Video Production",
        count: "/4 services",
        link: "/video-production",
        image:
          "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=800&auto=format&fit=crop",
      },
    ],
  },
  {
    name: "About Us",
    link: "/about",
  },
  {
    name: "Careers",
    link: "/career",
  },
  {
    name: "Work",
    link: "/work",
  },
  {
    name: "Blog",
    link: "/blog",
  },
];

export default function Header({
  onDark = false,
  dropdown = false,
}: {
  onDark?: boolean;
  /**
   * Opt in to the homepage's mobile navbar: a shrinking floating pill whose
   * menu opens inline. Default false so the other routes keep the overlay.
   */
  dropdown?: boolean;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  // Sub-service routes (/brand-strategy, /web-development, ...) are not
  // top-level nav items — they live inside the Services dropdown. Arriving on
  // one should reveal where you are, so the accordion starts open there.
  const isSubServiceRoute = navItems
    .flatMap((i) => i.dropdownItems ?? [])
    .some((sub) => pathname.startsWith(sub.link));
  const [isServicesExpanded, setIsServicesExpanded] =
    useState(isSubServiceRoute);

  // Seeding useState only covers a fresh mount; an App Router navigation can
  // keep this Header instance alive, so re-open when the route BECOMES a
  // sub-service one. Keyed on isSubServiceRoute rather than pathname so a
  // manual collapse while already on a sub-service page is not undone on the
  // next render.
  useEffect(() => {
    if (isSubServiceRoute) setIsServicesExpanded(true);
  }, [isSubServiceRoute]);

  const toggleMobileMenu = useCallback(
    () => setIsMobileMenuOpen((prev) => !prev),
    [],
  );
  const closeMobileMenu = useCallback(() => setIsMobileMenuOpen(false), []);
  const toggleServicesExpanded = useCallback(
    () => setIsServicesExpanded((prev) => !prev),
    [],
  );
  const closeAllMenus = useCallback(() => {
    setIsMobileMenuOpen(false);
    setIsServicesExpanded(false);
  }, []);

  if (pathname.startsWith("/leads")) return null;

  const ctaBorder =
    pathname.startsWith("/about") ||
    pathname.startsWith("/career") ||
    pathname.startsWith("/contact") ||
    pathname.startsWith("/blog") ||
    pathname.startsWith("/brand-strategy")
      ? " border border-gray-300 hover:border-none"
      : "";

  return (
    <div className="relative w-full">
      <AceternityNavbar className="z-[100]">
        <NavBody>
          <CustomLogo onDark={onDark} />
          <NavItems
            items={navItems}
            onDark={onDark}
            className="text-[17px] font-medium transition-colors"
          />
          <DynamicButton
            text="Get in Touch"
            href="/contact"
            className={`relative px-8 py-3 rounded-lg${ctaBorder}`}
            showIcon={false}
            instantHover
          />
        </NavBody>

        <MobileNav dropdown={dropdown} isOpen={isMobileMenuOpen}>
          <MobileNavHeader className="transition-colors duration-300">
            <CustomLogo onDark={onDark} />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={toggleMobileMenu}
              onDark={onDark}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={closeMobileMenu}
            dropdown={dropdown}
          >
            {navItems.map((item, idx) => {
              const hasDropdown =
                item.dropdownItems && item.dropdownItems.length > 0;
              // startsWith, not ===, so /work/<slug> and /blog/<slug> still mark
              // their section. "/" is excluded because it would match every
              // path — that entry is the Services dropdown, which renders as a
              // button below and never reaches the Link branch anyway.
              const isActive =
                item.link !== "/" && pathname.startsWith(item.link);
              const isExpanded = item.name === "Services" && isServicesExpanded;

              return (
                <div
                  key={`mobile-link-container-${idx}`}
                  className="w-full border-b border-white/[0.07] last:border-b-0"
                >
                  {hasDropdown ? (
                    <div className="flex w-full flex-col">
                      <button
                        type="button"
                        onClick={toggleServicesExpanded}
                        className="flex w-full items-center justify-between py-3.5 text-left text-xl font-medium text-white/90"
                      >
                        <span>{item.name}</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className={`shrink-0 text-white/50 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
                        >
                          <title>{`Toggle ${item.name}`}</title>
                          <path d="m6 9 6 6 6-6" />
                        </svg>
                      </button>

                      {/* Same always-mounted grid-rows accordion as the menu
                          itself (see MobileNavMenu): a tap flips classes, CSS
                          runs the reveal, no framer height tween on the main
                          thread and no mount cost at tap time. */}
                      <div
                        className={`grid w-full transition-[grid-template-rows,opacity,visibility] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                          isExpanded
                            ? "visible grid-rows-[1fr] opacity-100"
                            : "invisible grid-rows-[0fr] opacity-0"
                        }`}
                      >
                        <div className="min-h-0 w-full overflow-hidden">
                          <div className="mb-3 flex w-full flex-col rounded-xl bg-white/[0.06] px-3 py-1">
                            {item.dropdownItems?.map((sub, ssIdx) => (
                              <Link
                                key={`mob-drop-${ssIdx}`}
                                href={sub.link}
                                onClick={closeAllMenus}
                                aria-current={
                                  pathname.startsWith(sub.link)
                                    ? "page"
                                    : undefined
                                }
                                className="flex w-full items-center gap-2 py-2.5 text-left text-base text-white/60 transition-colors hover:text-white"
                              >
                                {sub.name}
                                {pathname.startsWith(sub.link) && (
                                  // Same activeDotGradient as the top-level
                                  // rows, at the same 6px, so "you are here"
                                  // reads identically at both menu depths.
                                  <span
                                    aria-hidden
                                    className="h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-[#2E5BFF] to-[#149CCB]"
                                  />
                                )}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={item.link}
                      onClick={closeMobileMenu}
                      aria-current={isActive ? "page" : undefined}
                      className="flex w-full items-center gap-2 py-3.5 text-left text-xl font-medium text-white/90 transition-colors hover:text-white"
                    >
                      {item.name}
                      {isActive && (
                        // activeDotGradient: 6px dot in the site's brand
                        // gradient, marking the page you are on. Lives inside
                        // MobileNav, which is lg:hidden, so it is mobile-only by
                        // construction — no max-md: needed and desktop cannot
                        // see it. aria-hidden because aria-current on the link
                        // already carries this meaning for assistive tech.
                        <span
                          aria-hidden
                          className="h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-[#2E5BFF] to-[#149CCB]"
                        />
                      )}
                    </Link>
                  )}
                </div>
              );
            })}

            <Link
              href="/contact"
              onClick={closeMobileMenu}
              className="mt-5 flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-[#2E5BFF] to-[#149CCB] py-3.5 text-base font-bold tracking-tight text-white"
            >
              Get in Touch
            </Link>
          </MobileNavMenu>
        </MobileNav>
      </AceternityNavbar>
    </div>
  );
}
