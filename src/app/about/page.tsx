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
      <div className="[&>section]:py-16 md:[&>section]:py-24">
        <AboutTraditional />
      </div>
      <div className="[&>section]:py-16 md:[&>section]:py-24">
        <OurValuesSection />
      </div>
      <div className="[&>section]:py-16 md:[&>section]:py-24">
        <OurTeamSection />
      </div>
      <div className="[&>section]:pt-16 [&>section]:pb-6 md:[&>section]:pt-24 md:[&>section]:pb-10">
        <ExperimentalTestimonials />
      </div>
      <section className="w-full overflow-hidden bg-white pt-6 pb-16 md:pt-6 md:pb-24">
        <LogoCarousel logos={techLogos} ariaLabel="Technology partners" />
      </section>
      <div className="px-3 [&>section]:py-16 md:[&>section]:py-24">
        <CtaSection />
      </div>
      <div className="[&>section]:py-16 md:[&>section]:py-24">
        <FaqSection />
      </div>
      <div className="[&>section]:py-16 md:[&>section]:py-24">
        <BlogSection />
      </div>
      <div className="px-3 pt-16 pb-3 md:pt-24">
        <Footer />
      </div>
    </div>
  );
}
