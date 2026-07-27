import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description: "We engineer digital solutions crafted for impact.",
};

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return children;
}
