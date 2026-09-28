import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import IosClickRescue from "@/components/ui/IosClickRescue";
import VideoViewportPause from "@/components/ui/VideoViewportPause";
import { cn } from "@/lib/utils";
import { SITE_URL } from "@/lib/site";

// Loaded here rather than via @font-face in globals.css so Next emits a
// <link rel="preload"> for the woff2 (it used to be discovered only after the
// stylesheet was parsed) and a metric-matched fallback for the swap period.
// The variable is what globals.css's --font-sans points at.
const satoshi = localFont({
  src: "../../public/fonts/Satoshi-Variable.woff2",
  weight: "100 900",
  display: "swap",
  variable: "--font-satoshi",
});

// Default notch / browser-chrome colour for every route that doesn't set its
// own. A fixed white, NOT a prefers-color-scheme pair: the site has no dark
// theme, so a scheme-keyed default would paint a black notch above white pages
// on every dark-mode iPhone. Dark-topped routes (/contact, /work, /work/[slug])
// override this with their own `viewport` export.
export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Softexedge — Digital Agency",
    template: "%s | Softexedge",
  },
  description:
    "Softexedge is the digital agency behind the minds shaping brand strategy, web and app development, UI/UX design, and marketing that people trust.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(satoshi.variable, "h-full", "antialiased", "font-sans")}
    >
      <body className="min-h-full flex flex-col">
        <VideoViewportPause />
        {/* Touch devices only: re-dispatches the click iOS withholds when the
            page mutates during a tap's synthetic hover pass. */}
        <IosClickRescue />
        {children}
      </body>
    </html>
  );
}
