// app/components/layout/Footer.tsx

import Link from "next/link";
import {
  FaArrowUp,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTiktok,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";

const columnOne = ["Services", "Work", "About", "Culture", "Meet The Risers"];

const columnTwo = ["Testimonials", "Blog & Resources", "Webinars", "Careers"];

const columnThree = [
  "Sheffield",
  "Manchester",
  "London",
  "New York",
  "Contact",
];

const socials = [
  {
    icon: <FaFacebookF />,
    href: "#",
  },
  {
    icon: <FaXTwitter />,
    href: "#",
  },
  {
    icon: <FaLinkedinIn />,
    href: "#",
  },
  {
    icon: <FaYoutube />,
    href: "#",
  },
  {
    icon: <FaTiktok />,
    href: "#",
  },
  {
    icon: <FaInstagram />,
    href: "#",
  },
];

export default function Footer() {
  return (
    <footer id="contact" className="w-full">
      <div className="overflow-hidden rounded-[20px] bg-black text-white">
        {/* Top */}
        <div className="grid grid-cols-1 gap-14 px-6 py-8 md:px-8 lg:grid-cols-[1fr_1fr] lg:gap-20">
          {/* Left */}
          <div>
            <h3 className="max-w-md text-[2rem] font-medium leading-[1] tracking-[-0.06em] text-white md:text-[3rem]">
              Stay updated with Softexedge news
            </h3>

            {/* Email Input */}
            <div className="mt-8 flex h-[74px] items-center rounded-full bg-white/10 pl-7 pr-3 backdrop-blur-xl">
              <input
                type="email"
                placeholder="Your Email Address"
                className="h-full flex-1 bg-transparent text-lg text-white outline-none placeholder:text-white/45"
              />

              <button className="flex h-14 w-14 items-center justify-center rounded-full bg-[#c8f1e5] text-black transition hover:scale-105">
                <FaArrowUp className="rotate-45 text-lg" />
              </button>
            </div>

            {/* Socials */}
            <div className="mt-5 flex flex-wrap items-center gap-2">
              {socials.map((social, index) => (
                <Link
                  key={index}
                  href={social.href}
                  className="group flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-sm text-black transition hover:scale-105"
                >
                  <span className="text-[13px]">{social.icon}</span>

                  <FaArrowUp className="rotate-45 text-[10px] transition-transform duration-300 group-hover:translate-x-[2px] group-hover:-translate-y-[2px]" />
                </Link>
              ))}
            </div>
          </div>

          {/* Right Links */}
          <div className="grid grid-cols-2 gap-10 md:grid-cols-3">
            {/* Column 1 */}
            <div className="border-l border-white/15 pl-5">
              <ul className="space-y-2">
                {columnOne.map((item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="text-xl font-medium tracking-[-0.04em] text-white/95 transition hover:text-white/60"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2 */}
            <div className="border-l border-white/15 pl-5">
              <ul className="space-y-2">
                {columnTwo.map((item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="text-xl font-medium tracking-[-0.04em] text-white/95 transition hover:text-white/60"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3 */}
            <div className="border-l border-white/15 pl-5">
              <ul className="space-y-2">
                {columnThree.map((item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="text-xl font-medium tracking-[-0.04em] text-white/95 transition hover:text-white/60"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Giant Brand Text */}
        <div className="px-4 pt-10 md:px-6 lg:px-8">
          <h1 className="select-none text-[5rem] font-semibold leading-none tracking-[-0.1em] text-white sm:text-[7rem] md:text-[10rem] lg:text-[14rem] xl:text-[18rem]">
            Softexedge
          </h1>
        </div>

        {/* Bottom */}
        <div className="flex flex-col gap-4 px-6 pb-8 pt-3 text-sm text-white/75 md:flex-row md:items-center md:justify-between md:px-8">
          <div className="flex flex-wrap items-center gap-3">
            <span>© 2025 Softexedge Ltd. All rights reserved</span>

            <span>•</span>

            <span>Company Number 11055187</span>

            <span>•</span>

            <span>VAT Registered GB 322402945</span>

            <span>•</span>

            <Link href="#" className="hover:text-white">
              Privacy Policy
            </Link>

            <span>•</span>

            <Link href="#" className="hover:text-white">
              Terms & Conditions
            </Link>
          </div>

          <p className="text-white/70">Website Made By Softexedge</p>
        </div>
      </div>
    </footer>
  );
}
