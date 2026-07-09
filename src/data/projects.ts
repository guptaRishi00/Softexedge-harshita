export const categories = [
  "All",
  "E-Commerce",
  "SaaS",
  "Branding",
  "Campaign",
  "Web App",
] as const;

export type Category = (typeof categories)[number];

export interface Project {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  tech: string[];
  year: string;
  image: string;
  video?: string;
  category: Category;
  type: "image" | "video";
  href: string;
  featured?: boolean;
  gallery?: string[];
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Aura Skincare",
    subtitle: "E-Commerce Experience",
    description:
      "Redefining digital beauty retail. We crafted a highly conversion-optimized, visually stunning headless e-commerce platform that elevated Aura's brand positioning and increased online sales by 140% in Q1.",
    tech: ["SHOPIFY", "NEXT.JS", "TAILWIND"],
    year: "2024",
    image: "/assets/zyro-O-Nemx50zDE-unsplash.jpg",
    category: "E-Commerce",
    type: "image",
    href: "/work/aura-skincare",
    featured: true,
    gallery: [
      "/assets/zyro-O-Nemx50zDE-unsplash.jpg",
      "/assets/cake.png",
      "/assets/f1a35da30130d44c9a129deaf2b6b9f4.webp",
      "/assets/ux-store-jJT2r2n7lYA-unsplash.jpg",
    ],
  },
  {
    id: 2,
    title: "Finova Dashboard",
    subtitle: "Financial SaaS Platform",
    description:
      "A complete UX/UI overhaul for Finova's enterprise wealth management suite. By simplifying complex data visualizations and streamlining workflows, we reduced user onboarding time by over 60%.",
    tech: ["REACT", "D3.JS", "NODE.JS", "TYPESCRIPT"],
    year: "2024",
    image: "/assets/0d3a38da975f62a06fb71d3837c0c2dd.webp",
    category: "SaaS",
    type: "image",
    href: "/work/finova-dashboard",
    gallery: [
      "/assets/0d3a38da975f62a06fb71d3837c0c2dd.webp",
      "/assets/project-dashboard-displaying-key-metrics-like-progress-budget-deadlines.jpg",
      "/assets/fotis-fotopoulos-SyvsTmuuZyM-unsplash.jpg",
      "/assets/branding.webp",
    ],
  },
  {
    id: 3,
    title: "Lumina Festival",
    subtitle: "Event Branding & Web",
    description:
      "An immersive digital portal for Europe's premier light and sound festival. The site features dynamic WebGL interactions that mirror the festival's physical installations, driving record-breaking ticket sales.",
    tech: ["THREE.JS", "GSAP", "NEXT.JS", "CONTENTFUL"],
    year: "2023",
    image: "/assets/ux-store-jJT2r2n7lYA-unsplash.jpg",
    category: "Branding",
    type: "image",
    href: "/work/lumina-festival",
    featured: true,
    gallery: [
      "/assets/ux-store-jJT2r2n7lYA-unsplash.jpg",
      "/assets/branding.webp",
      "/assets/zyro-O-Nemx50zDE-unsplash.jpg",
      "/assets/0d3a38da975f62a06fb71d3837c0c2dd.webp",
    ],
  },
  {
    id: 4,
    title: "Nova Workspace",
    subtitle: "Product Launch Campaign",
    description:
      "A high-impact promotional micro-site and cinematic video campaign introducing Nova's next-generation modular office pods to the North American market.",
    tech: ["NEXT.JS", "FRAMER MOTION", "TAILWIND"],
    year: "2024",
    video: "/assets/video3.mp4",
    image: "/assets/f1a35da30130d44c9a129deaf2b6b9f4.webp",
    category: "Campaign",
    type: "video",
    href: "/work/nova-workspace",
    gallery: [
      "/assets/f1a35da30130d44c9a129deaf2b6b9f4.webp",
      "/assets/fotis-fotopoulos-SyvsTmuuZyM-unsplash.jpg",
      "/assets/project-dashboard-displaying-key-metrics-like-progress-budget-deadlines.jpg",
      "/assets/cake.png",
    ],
  },
  {
    id: 5,
    title: "Zephyr Mobility",
    subtitle: "EV Automotive Marketing",
    description:
      "Launching the future of urban transit. We designed a sleek, high-performance marketing site for Zephyr's flagship electric scooter, focusing on 3D product storytelling and seamless pre-order flows.",
    tech: ["WEBGL", "REACT", "NODE.JS", "STRIPE"],
    year: "2023",
    image: "/assets/fotis-fotopoulos-SyvsTmuuZyM-unsplash.jpg",
    category: "Web App",
    type: "image",
    href: "/work/zephyr-mobility",
    gallery: [
      "/assets/fotis-fotopoulos-SyvsTmuuZyM-unsplash.jpg",
      "/assets/f1a35da30130d44c9a129deaf2b6b9f4.webp",
      "/assets/0d3a38da975f62a06fb71d3837c0c2dd.webp",
      "/assets/zyro-O-Nemx50zDE-unsplash.jpg",
    ],
  },
  {
    id: 6,
    title: "Cake Commerce",
    subtitle: "Artisan Bakery Platform",
    description:
      "A delightful custom e-commerce experience for an artisan bakery brand, complete with 3D product visualizations, subscription models, and a seamless checkout experience.",
    tech: ["NEXT.JS", "STRIPE", "SANITY", "TAILWIND"],
    year: "2024",
    image: "/assets/cake.png",
    category: "E-Commerce",
    type: "image",
    href: "/work/cake-commerce",
    featured: true,
    gallery: [
      "/assets/cake.png",
      "/assets/zyro-O-Nemx50zDE-unsplash.jpg",
      "/assets/f1a35da30130d44c9a129deaf2b6b9f4.webp",
      "/assets/ux-store-jJT2r2n7lYA-unsplash.jpg",
    ],
  },
  {
    id: 7,
    title: "Apex Analytics",
    subtitle: "Data Intelligence Dashboard",
    description:
      "Enterprise-grade analytics dashboard transforming complex datasets into actionable insights. Interactive data visualizations that empowered decision makers to identify trends 3× faster.",
    tech: ["REACT", "D3.JS", "PYTHON", "POSTGRESQL"],
    year: "2024",
    image:
      "/assets/project-dashboard-displaying-key-metrics-like-progress-budget-deadlines.jpg",
    category: "SaaS",
    type: "image",
    href: "/work/apex-analytics",
    gallery: [
      "/assets/project-dashboard-displaying-key-metrics-like-progress-budget-deadlines.jpg",
      "/assets/0d3a38da975f62a06fb71d3837c0c2dd.webp",
      "/assets/branding.webp",
      "/assets/zyro-O-Nemx50zDE-unsplash.jpg",
    ],
  },
  {
    id: 8,
    title: "Brand Elevate",
    subtitle: "Corporate Identity System",
    description:
      "A comprehensive brand identity overhaul for a Fortune 500 company, including logo redesign, design system, marketing collateral, and a showcase website that tells their brand story.",
    tech: ["FIGMA", "NEXT.JS", "FRAMER", "GSAP"],
    year: "2023",
    image: "/assets/branding.webp",
    category: "Branding",
    type: "image",
    href: "/work/brand-elevate",
    gallery: [
      "/assets/branding.webp",
      "/assets/ux-store-jJT2r2n7lYA-unsplash.jpg",
      "/assets/f1a35da30130d44c9a129deaf2b6b9f4.webp",
      "/assets/0d3a38da975f62a06fb71d3837c0c2dd.webp",
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.href.endsWith(`/${slug}`));
}
