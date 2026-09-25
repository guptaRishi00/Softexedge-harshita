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
import LogoCarousel from "./LogoCarousel";

const techLogos = [
  { node: <SiReact aria-hidden />, title: "React", href: "https://react.dev" },
  { node: <SiNextdotjs aria-hidden />, title: "Next.js", href: "https://nextjs.org" },
  {
    node: <SiTypescript aria-hidden />,
    title: "TypeScript",
    href: "https://www.typescriptlang.org",
  },
  {
    node: <SiTailwindcss aria-hidden />,
    title: "Tailwind CSS",
    href: "https://tailwindcss.com",
  },
  { node: <SiNodedotjs aria-hidden />, title: "Node.js", href: "https://nodejs.org" },
  { node: <SiThreedotjs aria-hidden />, title: "Three.js", href: "https://threejs.org" },
  { node: <SiGreensock aria-hidden />, title: "GSAP", href: "https://gsap.com" },
  { node: <SiFramer aria-hidden />, title: "Framer", href: "https://www.framer.com" },
  { node: <SiGraphql aria-hidden />, title: "GraphQL", href: "https://graphql.org" },
  { node: <SiFigma aria-hidden />, title: "Figma", href: "https://www.figma.com" },
  { node: <SiVercel aria-hidden />, title: "Vercel", href: "https://vercel.com" },
];

export default function TechLogoCarousel() {
  return (
    <section className="w-full overflow-hidden bg-white max-md:pb-20 max-md:pt-0 md:pb-32">
      <LogoCarousel logos={techLogos} ariaLabel="Technology partners" />
    </section>
  );
}
