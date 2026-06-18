# SoftexEdge — Workspace Map

This document maps the directory structure, technologies, and entry points of the **softexedge-may-2026** codebase. It acts as the structural blueprint for development.

---

## 🛠️ Core Technologies & Libraries

The project is a frontend-only, highly animated, and interactive brochure/marketing site. It does not use databases, authentication, backend APIs, or external data stores.

*   **Framework**: [Next.js 16.2.5 (App Router)](https://nextjs.org/) + [React 19.2.4](https://react.dev/) (with React Compiler enabled)
*   **Language**: [TypeScript 5 (Strict)](https://www.typescriptlang.org/)
*   **Package Manager & Runtime**: [Bun](https://bun.sh/) (with `bun.lock`)
*   **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) & [PostCSS](https://postcss.org/)
*   **Linters/Formatters**: [Biome 2.2.0](https://biomejs.dev/) (`biome.json`)
*   **Animations**:
    *   [GSAP (GreenSock Animation Platform)](https://gsap.com/) (with `ScrollTrigger` and `@gsap/react`)
    *   [Framer Motion](https://www.framer.com/motion/)
*   **Smooth Scrolling**: [Lenis](https://lenis.darkroom.engineering/) (applied via React wrappers)
*   **3D / WebGL Effects**:
    *   [Three.js](https://threejs.org/) with [@react-three/fiber](https://r3f.docs.pmnd.rs/getting-started/introduction) and [@react-three/drei](https://github.com/pmndrs/drei)
    *   [OGL](https://github.com/oogl/ogl) (Minimal WebGL library)
    *   [Postprocessing](https://github.com/vanruesc/postprocessing)
*   **UI Components**:
    *   [Radix UI Slot](https://www.radix-ui.com/primitives/docs/utilities/slot)
    *   [Embla Carousel](https://www.embla-carousel.com/) (with Autoplay and Auto-Scroll extensions)
    *   [Lucide React](https://lucide.dev/), [Tabler Icons](https://tabler.io/icons), & [React Icons](https://react-icons.github.io/react-icons/)
*   **Typography**: Satoshi Variable (served locally via `next/font`)

---

## 📂 Directory Layout

Below is the directory hierarchy and brief descriptions of each major folder/file in the project workspace:

```text
softexedge-may-2026/
├── .claude/                   # Claude configuration logs and maps
│   ├── CODEBASE_MAP.md        # Detailed codebase summary and gotchas
│   └── SESSION_LOG.md         # History of session activities
├── public/                    # Static assets served at "/"
│   ├── assets/                # Portfolio images, hero.mp4, and logos
│   └── fonts/                 # Satoshi-Variable.woff2 local font
├── src/                       # Application source code
│   ├── app/                   # Next.js App Router directories and styling
│   │   ├── about/             # /about route page
│   │   ├── brand-strategy/    # /brand-strategy route page
│   │   ├── contact/           # /contact route page
│   │   ├── home/              # /home route page
│   │   ├── globals.css        # Global CSS stylesheet (Tailwind v4 imports + custom utilities)
│   │   ├── layout.tsx         # Root layout configuring font families and HTML wrap
│   │   └── page.tsx           # Entry route redirecting "/" to "/home"
│   ├── components/            # Page sections and reusable UI components
│   │   ├── about/             # Sections for About Page (Hero, Team, Values, etc.)
│   │   ├── brand-strategy/    # Sections for Brand Strategy Page (Sub-services, Process, Showcase, etc.)
│   │   ├── contact/           # Sections for Contact Page (Hero, FAQ)
│   │   ├── garbage/           # DEAD CODE (Unused files/components, safe to delete)
│   │   ├── home/              # Sections for Home Page (Hero, Stats, About, Portfolio, Services, etc.)
│   │   ├── layout/            # Base layouts (Footer, Home Header, and Smooth Scroll wrapper)
│   │   ├── page/              # Inner pages layout elements (Inner Header and resizable-navbar)
│   │   ├── shared/            # Shared components (multiple ConnectButton variants)
│   │   └── ui/                # Base UI components and custom interactive WebGL/Three.js components
│   └── lib/                   # Utility libraries and helpers
│       └── utils.ts           # Tailored class merger utility: cn()
├── package.json               # Node.js project manifest and dependency versions
├── bun.lock                   # Bun lockfile specifying dependency trees
├── tsconfig.json              # TypeScript configuration
├── biome.json                 # Biome formatting and linting rules
├── next.config.ts             # Next.js application configuration
└── postcss.config.mjs         # PostCSS configuration file
```

---

## 🔑 Key Architectural Entry Points

1.  **Root Layout**: `src/app/layout.tsx`
    *   Defines the HTML structure and registers the Satoshi Variable font locally.
    *   Applies globals CSS (`src/app/globals.css`).
2.  **Redirect Entry**: `src/app/page.tsx`
    *   Performs a client-side/server-side redirect from the root path (`/`) to `/home`.
3.  **Pages (Routes)**:
    *   **Home Page**: `src/app/home/page.tsx`
        *   Loads section components, registers GSAP plugins, and wraps the content in `<SmoothScroll>` (Lenis wrapper).
    *   **About Page**: `src/app/about/page.tsx`
        *   Inner page presenting team members, core values, numerics, and FAQ.
    *   **Brand Strategy**: `src/app/brand-strategy/page.tsx`
        *   Inner page detailing brand processes, stack, and showcases.
    *   **Contact Page**: `src/app/contact/page.tsx`
        *   Form and FAQs section for client conversion.

---

## ⚠️ Known Gotchas & Risks

*   **Duplicate Navigation Header**:
    *   `src/components/layout/Header.tsx` (along with `SmoothScroll.tsx`) is used *only* on the `/home` page.
    *   `src/components/page/Header.tsx` (along with `resizable-navbar.tsx`) is used on the inner pages (`/about`, `/brand-strategy`, `/contact`).
*   **Duplicate Components in `ui/` vs `page/`**:
    *   `src/components/ui/resizable-navbar.tsx` is nearly identical to `src/components/page/resizable-navbar.tsx`.
*   **No Global Navigation**:
    *   The Header navigation is imported and rendered directly inside each individual page's hero component, rather than once in `layout.tsx`.
*   **Next.js 16 / React 19 Quirks**:
    *   Ensure compliance with Next.js 16 App Router changes. Read `node_modules/next/dist/docs/` when introducing complex features or hooks.
*   **Dead Code**:
    *   The folder `src/components/garbage/` contains 24 unused components that are completely disconnected from the rest of the application.
