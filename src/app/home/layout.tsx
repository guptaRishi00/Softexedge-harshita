import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description:
    "We build digital businesses, not just websites — brand, product, and the marketing that follows, from one team.",
};

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return children;
}
