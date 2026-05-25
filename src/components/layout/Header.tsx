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

const CustomLogo = () => (
  <Link href="/" className="flex items-center gap-2 group">
    <Image
      src="/assets/logo.png"
      alt="Grovio Logo"
      width={85}
      height={30}
      style={{ width: "90px", height: "auto" }}
      className="object-contain"
    />
  </Link>
);

// UPDATED: Used dropdownItems for the new grid layout with images
const navItems: NavItem[] = [
  {
    name: "Services",
    link: "/",
    dropdownItems: [
      {
        name: "Brand Strategy",
        count: "/1 services",
        link: "/services",
        image:
          "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=800&auto=format&fit=crop",
      },
      {
        name: "Web Development",
        count: "/1 services",
        link: "/services",
        image:
          "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800&auto=format&fit=crop",
      },
      {
        name: "Brand Identity",
        count: "/1 services",
        link: "/services",
        image:
          "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?q=80&w=800&auto=format&fit=crop",
      },
      {
        name: "eCommerce",
        count: "/1 services",
        link: "/services",
        image:
          "https://images.unsplash.com/photo-1592503254549-d83d24a4dfab?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZSUyMGNvbW1lcmNlfGVufDB8fDB8fHww",
      },
      {
        name: "User Experience Design",
        count: "/1 services",
        link: "/services",
        image:
          "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=800&auto=format&fit=crop",
      },
      {
        name: "Web & Mobile Applications",
        count: "/1 services",
        link: "/services",
        image:
          "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=800&auto=format&fit=crop",
      },
      {
        name: "Visual Content",
        count: "/1 services",
        link: "/services",
        image:
          "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=800&auto=format&fit=crop",
      },
      {
        name: "UI Design",
        count: "/1 services",
        link: "/services",
        image:
          "https://images.unsplash.com/photo-1545235617-9465d2a55698?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dWl1eHxlbnwwfHwwfHx8MA%3D%3D",
      },
    ],
  },
  {
    name: "About Us",
    link: "#about",
  },
  {
    name: "Case Studies",
    link: "#portfolio",
  },
  {
    name: "Book Consultation",
    link: "#contact",
  },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesExpanded, setIsServicesExpanded] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
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
    setExpandedSection(null);
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
            className="relative px-4 py-3 rounded-lg"
            showIcon={false}
          />
        </NavBody>

        <MobileNav>
          <MobileNavHeader className="transition-all duration-300">
            <CustomLogo />
            <MobileNavToggle
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
                  className="w-full text-center"
                >
                  {hasDropdown ? (
                    <div className="flex flex-col items-center">
                      <button
                        onClick={toggleServicesExpanded}
                        className={`flex items-center gap-2 text-neutral-300 hover:text-white py-2 text-lg`}
                      >
                        <span>{item.name}</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className={`transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
                        >
                          <path d="m6 9 6 6 6-6" />
                        </svg>
                      </button>

                      <AnimatePresence mode="wait">
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden w-full flex flex-col items-center bg-white/5 rounded-2xl mt-2 py-2 gap-2"
                          >
                            {/* NEW: Handle grid dropdown items for Mobile */}
                            {item.dropdownItems ? (
                              <div className="w-full flex flex-col items-center gap-1 pb-2 pt-2">
                                {item.dropdownItems.map((sub, ssIdx) => (
                                  <Link
                                    key={`mob-drop-${ssIdx}`}
                                    href={sub.link}
                                    onClick={closeAllMenus}
                                    className="text-neutral-400 hover:text-white py-2 text-sm"
                                  >
                                    {sub.name}
                                  </Link>
                                ))}
                              </div>
                            ) : (
                              /* ORIGINAL: Handle standard sections for Mobile */
                              item.sections?.map((section, sIdx) => {
                                const sectionLabel =
                                  section.title ||
                                  (sIdx === 0
                                    ? "Marketing"
                                    : "Software Development");
                                const isSectionExpanded =
                                  expandedSection === sectionLabel;

                                return (
                                  <div
                                    key={`mob-sec-${sIdx}`}
                                    className="w-full flex flex-col items-center"
                                  >
                                    <button
                                      onClick={() =>
                                        setExpandedSection(
                                          isSectionExpanded
                                            ? null
                                            : sectionLabel,
                                        )
                                      }
                                      className="w-full py-3 flex items-center justify-center gap-2 text-zinc-500 font-bold uppercase tracking-widest text-[11px]"
                                    >
                                      {sectionLabel}
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="14"
                                        height="14"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className={`transition-transform duration-200 ${isSectionExpanded ? "rotate-180" : ""}`}
                                      >
                                        <path d="m6 9 6 6 6-6" />
                                      </svg>
                                    </button>
                                    <AnimatePresence>
                                      {isSectionExpanded && (
                                        <motion.div
                                          initial={{ height: 0, opacity: 0 }}
                                          animate={{
                                            height: "auto",
                                            opacity: 1,
                                          }}
                                          exit={{ height: 0, opacity: 0 }}
                                          className="overflow-hidden flex flex-col items-center gap-2 pb-4"
                                        >
                                          {section.items.map((sub, ssIdx) => (
                                            <Link
                                              key={`mob-sub-${ssIdx}`}
                                              href={sub.link}
                                              onClick={closeAllMenus}
                                              className="text-neutral-400 hover:text-white py-1 text-sm"
                                            >
                                              {sub.name}
                                            </Link>
                                          ))}
                                        </motion.div>
                                      )}
                                    </AnimatePresence>
                                  </div>
                                );
                              })
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      href={item.link}
                      onClick={closeMobileMenu}
                      className={`relative text-neutral-300 hover:text-white block py-2 text-lg`}
                    >
                      <span className="block">{item.name}</span>
                    </Link>
                  )}
                </div>
              );
            })}

            <div className="flex w-full flex-col gap-4 mt-4">
              <Link
                href="#contact"
                onClick={closeMobileMenu}
                className="relative px-5 py-3 border border-white text-white font-semibold rounded-full overflow-hidden group transition-all duration-300 text-center"
              >
                <span className="absolute inset-0 w-0 bg-gradient-to-r from-[#a881fb] to-[#d0bfff] transition-all duration-[250ms] ease-out group-hover:w-full"></span>
                <span
                  className={`relative z-10 group-hover:text-black uppercase tracking-wide text-sm font-semibold transition-colors duration-200`}
                >
                  Get in Touch
                </span>
              </Link>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </AceternityNavbar>
    </div>
  );
}
