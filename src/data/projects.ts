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
    image:
      "https://images.unsplash.com/photo-1580870069867-74c57ee1bb07?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8c2tpbmNhcmV8ZW58MHx8MHx8fDA%3D",
    category: "E-Commerce",
    type: "image",
    href: "/work/aura-skincare",
    featured: true,
    gallery: [
      "/assets/zyro-O-Nemx50zDE-unsplash.jpg",
      "/assets/cake.png",
      "/assets/f1a35da30130d44c9a129deaf2b6b9f4.webp",
      "/assets/ux-store-jJT2r2n7lYA-unsplash.jpg",
      "/assets/laptop-screen-with-minimalist-ecommerce-dashboard.jpg",
      "/assets/microsoft-copilot-pqMPnPo4_ZA-unsplash.jpg",
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
    image:
      "https://images.unsplash.com/photo-1542744173-05336fcc7ad4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGRhc2hib2FyZHxlbnwwfHwwfHx8MA%3D%3D",
    category: "SaaS",
    type: "image",
    href: "/work/finova-dashboard",
    gallery: [
      "/assets/0d3a38da975f62a06fb71d3837c0c2dd.webp",
      "/assets/project-dashboard-displaying-key-metrics-like-progress-budget-deadlines.jpg",
      "/assets/fotis-fotopoulos-SyvsTmuuZyM-unsplash.jpg",
      "/assets/branding.webp",
      "/assets/microsoft-copilot-qUJ8fgoaLTg-unsplash.jpg",
      "/assets/laptop-screen-with-minimalist-ecommerce-dashboard.jpg",
    ],
  },
  {
    id: 10,
    title: "Orbit CRM",
    subtitle: "Sales Automation Platform",
    description:
      "A ground-up build of Orbit's customer-relationship platform. Pipeline automation, live team dashboards, and a keyboard-first workflow cut average deal admin time nearly in half.",
    tech: ["NEXT.JS", "POSTGRES", "TRPC", "TAILWIND"],
    year: "2023",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
    category: "SaaS",
    type: "image",
    href: "/work/orbit-crm",
    gallery: [
      "/assets/laptop-screen-with-minimalist-ecommerce-dashboard.jpg",
      "/assets/project-dashboard-displaying-key-metrics-like-progress-budget-deadlines.jpg",
      "/assets/microsoft-copilot-pqMPnPo4_ZA-unsplash.jpg",
      "/assets/branding2.png",
      "/assets/0d3a38da975f62a06fb71d3837c0c2dd.webp",
      "/assets/microsoft-copilot-qUJ8fgoaLTg-unsplash.jpg",
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
    image:
      "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmVzdGl2YWx8ZW58MHx8MHx8fDA%3D",
    category: "Branding",
    type: "image",
    href: "/work/lumina-festival",
    featured: true,
    gallery: [
      "/assets/ux-store-jJT2r2n7lYA-unsplash.jpg",
      "/assets/branding.webp",
      "/assets/zyro-O-Nemx50zDE-unsplash.jpg",
      "/assets/0d3a38da975f62a06fb71d3837c0c2dd.webp",
      "/assets/brand.jpg",
      "/assets/creative.jpg",
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
    image:
      "https://images.unsplash.com/photo-1761327076784-49b85d203d03?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDV8eEh4WVRNSExnT2N8fGVufDB8fHx8fA%3D%3D",
    category: "Campaign",
    type: "video",
    href: "/work/nova-workspace",
    gallery: [
      "/assets/f1a35da30130d44c9a129deaf2b6b9f4.webp",
      "/assets/fotis-fotopoulos-SyvsTmuuZyM-unsplash.jpg",
      "/assets/project-dashboard-displaying-key-metrics-like-progress-budget-deadlines.jpg",
      "/assets/cake.png",
      "/assets/digital_creative_top.webp",
      "/assets/microsoft-copilot-pqMPnPo4_ZA-unsplash.jpg",
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
      "/assets/competative.jpg",
      "/assets/laptop-screen-with-minimalist-ecommerce-dashboard.jpg",
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
    image:
      "https://images.unsplash.com/photo-1761327076784-49b85d203d03?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDV8eEh4WVRNSExnT2N8fGVufDB8fHx8fA%3D%3D",
    category: "E-Commerce",
    type: "image",
    href: "/work/cake-commerce",
    featured: true,
    gallery: [
      "/assets/cake.png",
      "/assets/zyro-O-Nemx50zDE-unsplash.jpg",
      "/assets/f1a35da30130d44c9a129deaf2b6b9f4.webp",
      "/assets/ux-store-jJT2r2n7lYA-unsplash.jpg",
      "/assets/laptop-screen-with-minimalist-ecommerce-dashboard.jpg",
      "/assets/creative.jpg",
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
      "/assets/microsoft-copilot-qUJ8fgoaLTg-unsplash.jpg",
      "/assets/laptop-screen-with-minimalist-ecommerce-dashboard.jpg",
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
    image:
      "https://images.unsplash.com/photo-1633533452148-a9657d2c9a5f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YnJhbmR8ZW58MHx8MHx8fDA%3D",
    category: "Branding",
    type: "image",
    href: "/work/brand-elevate",
    gallery: [
      "/assets/branding.webp",
      "/assets/ux-store-jJT2r2n7lYA-unsplash.jpg",
      "/assets/f1a35da30130d44c9a129deaf2b6b9f4.webp",
      "/assets/0d3a38da975f62a06fb71d3837c0c2dd.webp",
      "/assets/brand.jpg",
      "/assets/creative.jpg",
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.href.endsWith(`/${slug}`));
}
