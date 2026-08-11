import type { Metadata } from "next";
import "./globals.css";
import IosClickRescue from "@/components/ui/IosClickRescue";
import VideoViewportPause from "@/components/ui/VideoViewportPause";
import { cn } from "@/lib/utils";
import { SITE_URL } from "@/lib/site";

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
    <html lang="en" className={cn("h-full", "antialiased", "font-sans")}>
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
