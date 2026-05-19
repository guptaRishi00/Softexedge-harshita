"use client";
import {
  Navbar as AceternityNavbar,
  NavBody,
  NavItems,
  MobileNav,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
  NavItem,
} from "@/components/ui/resizable-navbar";
import {
  useScroll,
  useMotionValueEvent,
  motion,
  AnimatePresence,
} from "framer-motion";
import { useState } from "react";
import Image from "next/image";

import Link from "next/link";
import { usePathname } from "next/navigation";

// Custom Logo Component moved outside to prevent re-creation during render
const CustomLogo = () => (
  <Link href="/" className="flex items-center gap-2 group">
    <Image
      src="/assets/logoWhite.svg"
      alt="Grovio Logo"
      width={85}
      height={30}
      className="object-cover"
    />
  </Link>
);

export default function Header() {
  const navItems: NavItem[] = [
    {
      name: "Services",
      link: "#",
      sections: [
        {
          items: [
            {
              name: "Software Development",
              link: "/our-services/graphic-design",
            },
            { name: "Branding & Design", link: "/our-services/video-editing" },
            {
              name: "Social Media Management",
              link: "/our-services/social-media-management",
            },
            {
              name: "Performance Marketing",
              link: "/our-services/performance-marketing",
            },
          ],
        },
      ],
    },
    {
      name: "About Us",
      link: "/about",
    },
    {
      name: "Case Studies",
      link: "/case-studies",
    },
    {
      name: "Book Consultation",
      link: "/case-studies",
    },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesExpanded, setIsServicesExpanded] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const pathname = usePathname();

  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 100);
  });

  if (pathname.startsWith("/leads")) return null;

  return (
    <div className={`relative w-full `}>
      <AceternityNavbar className="z-[100]">
        {/* Desktop Navigation */}
        <NavBody className="">
          <div className="flex items-center gap-2">
            <CustomLogo />
          </div>

          <NavItems
            items={navItems}
            className={`text-[17px] font-medium text-white hover:text-gray-300 transition-colors `}
          />

          <div className="flex items-center gap-4">
            {/* Contact Us Button - Styled as requested */}
            {/* Contact Us Button - Styled as requested */}
            <Link
              href="/contact-us"
              className={`relative px-4 py-3 bg-white hover:bg-linear-to-r hover:from-[#3445E7] hover:via-[#2F85EA] hover:to-[#07D6F3] hover:text-white text-black font-semibold overflow-hidden group transition-all duration-300 hover:scale-105 rounded-full`}
            >
              <span
                className={`relative z-10 group-hover:text-white font-semibold`}
              >
                Get in Touch
              </span>
            </Link>
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader
            className={`${isScrolled ? "bg-black/90 backdrop-blur-md border-b border-white/5 shadow-2xl" : "bg-transparent"} transition-all duration-300`}
          >
            <CustomLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
            className={!isScrolled ? "backdrop-blur-none bg-black" : ""}
          >
            {navItems.map((item, idx) => {
              const hasDropdown = item.sections && item.sections.length > 0;
              const isExpanded = item.name === "Services" && isServicesExpanded;

              return (
                <div
                  key={`mobile-link-container-${idx}`}
                  className="w-full text-center"
                >
                  {hasDropdown ? (
                    <div className="flex flex-col items-center">
                      <button
                        onClick={() =>
                          setIsServicesExpanded(!isServicesExpanded)
                        }
                        className={`flex items-center gap-2 text-neutral-300 hover:text-white py-2 text-lg `}
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
                            {item.sections?.map((section, sIdx) => {
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
                                        isSectionExpanded ? null : sectionLabel,
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
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="overflow-hidden flex flex-col items-center gap-2 pb-4"
                                      >
                                        {section.items.map((sub, ssIdx) => (
                                          <Link
                                            key={`mob-sub-${ssIdx}`}
                                            href={sub.link}
                                            onClick={() => {
                                              setIsMobileMenuOpen(false);
                                              setIsServicesExpanded(false);
                                              setExpandedSection(null);
                                            }}
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
                            })}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      href={item.link}
                      onClick={() => setIsMobileMenuOpen(false)}
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
                href="/contact-us"
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative px-5 py-3 border border-white text-white font-semibold rounded-full overflow-hidden group transition-all duration-300 text-center"
              >
                <span className="absolute inset-0 w-0 bg-linear-to-r from-[#a881fb] to-[#d0bfff] transition-all duration-[250ms] ease-out group-hover:w-full"></span>
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
