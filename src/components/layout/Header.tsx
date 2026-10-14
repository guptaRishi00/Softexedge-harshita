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
} from "@/components/ui/resizable-navbar";
import DynamicButton from "../ui/DynamicButton";

// `visible` is the navbar's scrolled state and is injected by BOTH NavBody and
// MobileNavHeader, so it alone cannot distinguish the two. `swapOnScroll` is
// opted into by the mobile call site only: the mobile bar turns white on scroll
// so the white wordmark must become blue, whereas the desktop bar turns dark and
// must keep logo.png.
const CustomLogo = ({
  visible,
  swapOnScroll,
}: {
  visible?: boolean;
  swapOnScroll?: boolean;
}) => (
  <Link href="/" className="flex items-center gap-2 group">
    <Image
      src={
        swapOnScroll && visible ? "/assets/logoBlue.png" : "/assets/logo.png"
      }
      alt="Grovio Logo"
      width={85}
      height={30}
      // See page/Header: next/image defaults to lazy, which made the navbar
      // mark pop in after first paint.
      priority
      style={{ height: "auto" }}
      className="w-[80px] object-contain md:w-[90px]"
    />
  </Link>
);

const navItems: NavItem[] = [
  {
    name: "Services",
    link: "/home#services",
    dropdownItems: [
      {
        name: "Digital Marketing & Growth",
        count: "/4 services",
        link: "/digital-marketing",
        image: "/assets/dm8.png",
      },

      {
        name: "Web Development",
        count: "/4 services",
        link: "/web-development",
        image: "/assets/web7.png",
      },
      {
        name: "AI & Marketing Automation",
        count: "/4 services",
        link: "/ai-marketing-automation",
        image: "/assets/ai9.jpg",
      },

      {
        name: "Custom Software & SaaS",
        count: "/4 services",
        link: "/custom-software",
        image: "/assets/saas3.jpg",
      },
      {
        name: "Brand Strategy & Identity",
        count: "/4 services",
        link: "/brand-strategy",
        image: "/assets/ui.jpg",
      },
      {
        name: "App Development",
        count: "/4 services",
        link: "/app-development",
        image: "/assets/app.jpg",
      },
      {
        name: "UI/UX Design",
        count: "/4 services",
        link: "/ui-ux-design",
        image: "/assets/ui2.jpg",
      },
      {
        name: "Video Production",
        count: "/4 services",
        link: "/video-production",
        image: "/assets/video5.jpg",
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
  {
    name: "Duplicate",
    link: "/duplicate",
  },
];

export default function Header() {
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

  return (
    <div className="relative w-full">
      <AceternityNavbar className="z-[100]">
        <NavBody>
          <CustomLogo />
          <NavItems
            items={navItems}
            className="text-[17px] font-medium text-white hover:text-gray-300 transition-colors"
          />
          <DynamicButton
            text="Get in Touch"
            href="/contact"
            className="relative px-8 py-3 rounded-lg"
            showIcon={false}
            instantHover
          />
        </NavBody>

        <MobileNav dropdown isOpen={isMobileMenuOpen}>
          <MobileNavHeader>
            {/* No `swapOnScroll`: the bar is dark at every scroll position now,
                so the white wordmark stays correct throughout. */}
            <CustomLogo />
            <MobileNavToggle
              className="text-white"
              isOpen={isMobileMenuOpen}
              onClick={toggleMobileMenu}
            />
          </MobileNavHeader>

          <MobileNavMenu isOpen={isMobileMenuOpen} onClose={closeMobileMenu}>
            {navItems.map((item, idx) => {
              const hasDropdown =
                (item.sections && item.sections.length > 0) ||
                (item.dropdownItems && item.dropdownItems.length > 0);
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
