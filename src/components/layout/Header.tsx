"use client";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useState } from "react";
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
      style={{ height: "auto" }}
      className="w-[80px] object-contain md:w-[90px]"
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

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesExpanded, setIsServicesExpanded] = useState(false);
  const pathname = usePathname();

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
                          <title>Toggle {item.name}</title>
                          <path d="m6 9 6 6 6-6" />
                        </svg>
                      </button>

                      <AnimatePresence initial={false}>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{
                              duration: 0.3,
                              ease: [0.16, 1, 0.3, 1],
                            }}
                            className="w-full overflow-hidden"
                          >
                            <div className="mb-3 flex w-full flex-col rounded-xl bg-white/[0.06] px-3 py-1">
                              {item.dropdownItems?.map((sub, ssIdx) => (
                                <Link
                                  key={`mob-drop-${ssIdx}`}
                                  href={sub.link}
                                  onClick={closeAllMenus}
                                  className="w-full py-2.5 text-left text-base text-white/60 transition-colors hover:text-white"
                                >
                                  {sub.name}
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      href={item.link}
                      onClick={closeMobileMenu}
                      className="block w-full py-3.5 text-left text-xl font-medium text-white/90 transition-colors hover:text-white"
                    >
                      {item.name}
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
