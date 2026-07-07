"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import DynamicButton from "../ui/DynamicButton";

const navLinks = [
  { name: "Services", href: "/brand-strategy" },
  { name: "About Us", href: "/about" },
  { name: "Careers", href: "/career" },
  { name: "Work", href: "/work" },
];

// Dedicated header for the (dark) Work hero: white logo + white links so the
// nav stays legible over the colour dome background.
export default function WorkHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full">
      <div className="mx-auto flex w-full items-center justify-between px-6 py-6 md:px-10 md:py-8">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/assets/logo.png"
            alt="Softexedge"
            width={90}
            height={32}
            priority
            style={{ width: "90px", height: "auto" }}
            className="object-contain"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="group relative text-[17px] font-medium text-white/90 transition-colors hover:text-white"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 h-[1.5px] w-full origin-right scale-x-0 bg-white transition-transform duration-300 ease-out group-hover:origin-left group-hover:scale-x-100" />
            </Link>
          ))}
        </nav>

        {/* CTA + mobile toggle */}
        <div className="flex items-center gap-3">
          <div className="hidden lg:block">
            <DynamicButton
              text="Get in Touch"
              href="/contact"
              className="px-4 py-3 rounded-lg"
              showIcon={false}
            />
          </div>
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/25 text-white transition-colors hover:bg-white/10 lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden px-6 lg:hidden"
          >
            <div className="flex flex-col gap-1 border-t border-white/10 py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="py-3 text-lg font-medium text-white/90 transition-colors hover:text-white"
                >
                  {link.name}
                </Link>
              ))}
              <DynamicButton
                text="Get in Touch"
                href="/contact"
                className="mt-2 w-full justify-center px-4 py-3 rounded-lg"
                showIcon={false}
              />
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
