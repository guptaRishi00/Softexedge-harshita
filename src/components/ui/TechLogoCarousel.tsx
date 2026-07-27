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

export default function TechLogoCarousel() {
  return (
    <section className="w-full overflow-hidden bg-white py-16 md:pb-32">
      <LogoCarousel logos={techLogos} ariaLabel="Technology partners" />
    </section>
  );
}
