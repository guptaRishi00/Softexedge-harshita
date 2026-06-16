import AboutHeroSection from "@/components/about/AboutHeroSection";
import AboutTraditional from "@/components/about/AboutTraditional";
import OurTeamSection from "@/components/about/OurTeamSection";
import OurValuesSection from "@/components/about/OurValuesSection";
import CtaSection from "@/components/brand-strategy/CtaSection";
import FaqSection from "@/components/brand-strategy/FaqSection";
import BlogSection from "@/components/home/BlogSection";
import ExperimentalTestimonials from "@/components/home/ExperimentalTestimonials";
import Footer from "@/components/layout/Footer";
import LogoCarousel from "@/components/ui/LogoCarousel";

import {
  SiFigma,
  SiFramer,
  SiGraphql,
  SiGreensock,
  SiNextdotjs,
  SiNodedotjs,
  SiReact,
  SiTailwindcss,
  SiThreedotjs,
  SiTypescript,
  SiVercel,
} from "react-icons/si";

type Props = {};

export default function AboutPage({}: Props) {
  const techLogos = [
    { node: <SiReact />, title: "React", href: "https://react.dev" },
    { node: <SiNextdotjs />, title: "Next.js", href: "https://nextjs.org" },
    {
      node: <SiTypescript />,
      title: "TypeScript",
      href: "https://www.typescriptlang.org",
    },
    {
      node: <SiTailwindcss />,
      title: "Tailwind CSS",
      href: "https://tailwindcss.com",
    },
    { node: <SiNodedotjs />, title: "Node.js", href: "https://nodejs.org" },
    { node: <SiThreedotjs />, title: "Three.js", href: "https://threejs.org" },
    { node: <SiGreensock />, title: "GSAP", href: "https://gsap.com" },
    { node: <SiFramer />, title: "Framer", href: "https://www.framer.com" },
    { node: <SiGraphql />, title: "GraphQL", href: "https://graphql.org" },
    { node: <SiFigma />, title: "Figma", href: "https://www.figma.com" },
    { node: <SiVercel />, title: "Vercel", href: "https://vercel.com" },
  ];
  return (
    <div className="bg-white">
      <AboutHeroSection />
      <AboutTraditional />
      <OurValuesSection />
      <OurTeamSection />
      <div className="[&>section]:py-8 md:[&>section]:py-6">
        <ExperimentalTestimonials />
      </div>
      <section className="flex w-full flex-col items-center gap-6 overflow-hidden bg-white pt-8 pb-16 md:pt-6 md:pb-16">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-black/40">
          Trusted By
        </p>
        <LogoCarousel logos={techLogos} ariaLabel="Technology partners" />
      </section>
      <div className="px-3 [&>section]:py-8 md:[&>section]:py-6">
        <CtaSection />
      </div>
      <div className="[&>section]:py-8 md:[&>section]:py-6">
        <FaqSection />
      </div>
      <div className="[&>section]:py-12 md:[&>section]:py-20">
        <BlogSection />
      </div>
      <div className="px-3 pt-12 pb-3 md:pt-20">
        <Footer />
      </div>
    </div>
  );
}
