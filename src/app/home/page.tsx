import {
  SiNextdotjs,
  SiReact,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";
import AboutSection from "@/components/home/AboutSection";
import Herosection from "@/components/home/Herosection";
import PortfolioSection from "@/components/home/PortfolioSection";
import StatsSection from "@/components/home/StatsSection";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/layout/SmoothScroll";
import LogoLoop from "@/components/ui/LogoLoop";
import ExperimentalTestimonials from "@/components/home/ExperimentalTestimonials";
import BlogSection from "@/components/home/BlogSection";
import ContactSection from "@/components/home/ContactSection";
import ServiceSection from "@/components/home/ServiceSection";

export default function HomePage() {
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
  ];

  return (
    <SmoothScroll>
      <main className="w-full bg-white">
        <div className="px-3 pt-3">
          <Herosection />
        </div>
        <section className="w-full flex items-center gap-8 overflow-hidden px-6 py-12 md:pt-20 bg-white">
          <div className="shrink-0">
            <p className="text-sm font-medium tracking-wide text-black/60">
              Trusted By
            </p>
          </div>
          <div className="h-6 w-px bg-black/10" />
          <div className="relative min-w-0 flex-1 overflow-hidden">
            <LogoLoop
              logos={techLogos}
              speed={50}
              direction="left"
              logoHeight={28}
              gap={90}
              hoverSpeed={0}
              scaleOnHover
              fadeOut
              fadeOutColor="#ffffff"
              ariaLabel="Technology partners"
            />
          </div>
        </section>
        <div className="">
          <AboutSection />
          <PortfolioSection />
          <StatsSection />
          <div className="">
            <ServiceSection />
          </div>
          <ExperimentalTestimonials />
          <ContactSection />
          <BlogSection />
        </div>
        <div className="p-3 w-full">
          <Footer />
        </div>
      </main>
    </SmoothScroll>
  );
}
