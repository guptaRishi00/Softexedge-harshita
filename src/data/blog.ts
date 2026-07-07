// Single source of truth for blog content — consumed by the blog list
// (`BlogListSection`) and the article pages (`/blog/[slug]`).

export const categories = [
  "All",
  "Company News",
  "Resources",
  "Guides",
  "Case Studies",
] as const;

export type Category = (typeof categories)[number];
export type PostCategory = Exclude<Category, "All">;

export interface Author {
  name: string;
  role: string;
  avatar: string;
}

// Discriminated union of renderable article blocks.
export type ContentBlock =
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "quote"; text: string; cite?: string }
  | { type: "list"; items: string[] }
  | { type: "callout"; label: string; title: string; text: string }
  | { type: "image"; src: string; caption?: string };

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  author: string;
  readTime: string;
  category: Category;
  image: string;
  href: string;
  excerpt: string;
  featured?: boolean;
  // Article-detail fields:
  date: string;
  authorMeta: Author;
  lead: string;
  tags: string[];
  content: ContentBlock[];
}

// Portrait helpers (randomuser.me is allow-listed in next.config).
const portrait = (g: "men" | "women", n: number) =>
  `https://randomuser.me/api/portraits/${g}/${n}.jpg`;

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: "google-io-2026",
    title:
      "Google IO 2026: What Your C-Suite Needs to Know (AI Mode Google Guide UPDATED)",
    author: "Carrie Rose",
    readTime: "15 mins",
    category: "Resources",
    image:
      "https://images.unsplash.com/photo-1780006015851-2d1b3bcadbfd?w=600&auto=format&fit=crop&q=60",
    href: "/blog/google-io-2026",
    excerpt:
      "A comprehensive breakdown of the most significant announcements at Google IO, specifically tailored for enterprise leaders looking to implement new AI models.",
    featured: true,
    date: "May 14, 2026",
    authorMeta: {
      name: "Carrie Rose",
      role: "Chief Strategy Officer",
      avatar: portrait("women", 44),
    },
    lead: "Google I/O 2026 wasn't a developer conference — it read like a boardroom memo. The shift to AI Mode reshapes the questions every executive should be asking this quarter.",
    tags: ["AI", "Search", "Strategy", "Google I/O"],
    content: [
      {
        type: "paragraph",
        text: "Every year the keynote is dissected for its demos. This year the demos were beside the point. The real story was structural: Google is moving the default search experience from a list of ten blue links to a synthesised, conversational answer — and that changes how customers will discover you.",
      },
      {
        type: "heading",
        text: "The headline: search became a conversation",
      },
      {
        type: "paragraph",
        text: "AI Mode replaces the ranked page with a generated response that reasons across sources before a user ever clicks. For most queries, the answer is now the destination, not the doorway. That compresses the funnel and rewards brands that are quotable, structured, and demonstrably authoritative.",
      },
      {
        type: "paragraph",
        text: "The practical implication is uncomfortable but clarifying: being on page one is no longer the goal. Being the sentence the model chooses to cite is. Your content strategy has to optimise for extraction, not just ranking.",
      },
      {
        type: "callout",
        label: "Key takeaway",
        title: "Optimise to be cited, not just ranked",
        text: "In an AI-first results page, visibility is a function of how cleanly a model can lift, attribute, and trust your content. Clear structure and verifiable claims now outperform keyword density.",
      },
      {
        type: "heading",
        text: "What 'AI Mode' actually changes for your business",
      },
      {
        type: "paragraph",
        text: "Three things move at once. Discovery shifts from clicks to citations. Measurement shifts from sessions to influence — you will see fewer visits from queries you clearly won. And trust becomes a moat, because models disproportionately surface sources with consistent, corroborated expertise.",
      },
      {
        type: "quote",
        text: "The winners in an AI-mediated web won't be the loudest publishers. They'll be the most trustworthy ones the model can defend citing.",
        cite: "Carrie Rose, Chief Strategy Officer",
      },
      {
        type: "heading",
        text: "A pragmatic 90-day response",
      },
      {
        type: "paragraph",
        text: "You don't need to rebuild everything. You need to make your best material machine-legible and unmistakably yours. Start with the pages that already convert, then work outward.",
      },
      {
        type: "list",
        items: [
          "Audit your top 20 pages for structured data, clear headings, and answer-first opening paragraphs.",
          "Publish original data or point-of-view content that a model has no equivalent for.",
          "Consolidate thin, overlapping pages into definitive, citable resources.",
          "Instrument brand-mention and citation tracking, not just organic sessions.",
        ],
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1554260570-e9689a3418b8?w=1200&auto=format&fit=crop&q=60",
        caption:
          "Answer-first content earns citations; keyword-stuffed content earns silence.",
      },
      {
        type: "paragraph",
        text: "The teams that treat this as a distribution change rather than a marketing tweak will pull ahead. AI Mode is not the end of search — it's the beginning of search that answers. Position your expertise to be the answer.",
      },
    ],
  },
  {
    id: 2,
    slug: "rise-at-seven-expansion",
    title:
      "Rise at Seven Exits Sheffield and Triples Manchester as new HQ as they go for global expansion",
    author: "Ray Saddiq",
    readTime: "8 mins",
    category: "Company News",
    image:
      "https://plus.unsplash.com/premium_photo-1776661561367-93c4100618d6?w=600&auto=format&fit=crop&q=60",
    href: "/blog/rise-at-seven-expansion",
    excerpt:
      "Our journey to global expansion continues with a major strategic move to triple our presence in Manchester.",
    date: "April 28, 2026",
    authorMeta: {
      name: "Ray Saddiq",
      role: "Head of Communications",
      avatar: portrait("men", 32),
    },
    lead: "We're consolidating our northern operations and tripling our Manchester footprint — a deliberate bet on density, talent, and the next phase of global growth.",
    tags: ["Company", "Growth", "Manchester", "Hiring"],
    content: [
      {
        type: "paragraph",
        text: "Today we're announcing the biggest structural change in our company's history: the move to a new Manchester headquarters that triples our current space, and the wind-down of our original Sheffield office. This is not a retreat — it's a concentration of force.",
      },
      {
        type: "heading",
        text: "Why consolidate now",
      },
      {
        type: "paragraph",
        text: "Distributed teams gave us reach, but our best work has always come from rooms where strategists, designers, and engineers collide daily. Concentrating senior talent in one flagship space is how we intend to raise the ceiling on what we deliver, not just the volume.",
      },
      {
        type: "paragraph",
        text: "Manchester also gives us proximity to one of Europe's fastest-growing tech talent pools, a stronger international transport hub, and the kind of client-facing presence a global roster expects.",
      },
      {
        type: "callout",
        label: "By the numbers",
        title: "3× the space, 40+ new roles",
        text: "The new HQ triples our floor area and unlocks more than forty new positions across strategy, engineering, and creative over the next twelve months.",
      },
      {
        type: "heading",
        text: "What this means for our Sheffield team",
      },
      {
        type: "paragraph",
        text: "Every Sheffield colleague has been offered relocation with support, or a permanent remote arrangement where the role allows. No one is being left behind; the map is changing, not the commitment to our people.",
      },
      {
        type: "quote",
        text: "You don't triple your space because you're comfortable. You do it because you can see the next decade and want the room to build it.",
        cite: "Ray Saddiq, Head of Communications",
      },
      {
        type: "heading",
        text: "The global picture",
      },
      {
        type: "paragraph",
        text: "The Manchester HQ is the anchor for a wider expansion: satellite presence in three new international markets is planned across 2026 and 2027. A strong centre makes strong edges possible.",
      },
      {
        type: "list",
        items: [
          "New flagship HQ in central Manchester, opening Q3 2026.",
          "40+ roles across strategy, engineering, and creative.",
          "Relocation and remote options for every Sheffield team member.",
          "Groundwork for three new international markets by 2027.",
        ],
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&auto=format&fit=crop&q=60",
        caption: "The team that got us here is the team we're building around.",
      },
      {
        type: "paragraph",
        text: "To our clients: expect the same people, sharper. To future colleagues: the door in Manchester is open. This is the start of our most ambitious chapter yet.",
      },
    ],
  },
  {
    id: 3,
    slug: "future-framer-motion",
    title:
      "The Future of Framer Motion: Building Fluid Interfaces for the Next Decade",
    author: "Elena Rodriguez",
    readTime: "12 mins",
    category: "Guides",
    image:
      "https://images.unsplash.com/photo-1773332611613-dbdc64f09807?w=600&auto=format&fit=crop&q=60",
    href: "/blog/future-framer-motion",
    excerpt:
      "Explore the advanced techniques and undocumented features that will help you build the most fluid interfaces.",
    date: "April 10, 2026",
    authorMeta: {
      name: "Elena Rodriguez",
      role: "Principal Front-End Engineer",
      avatar: portrait("women", 68),
    },
    lead: "Motion is no longer decoration — it's how modern interfaces communicate state, hierarchy, and intent. Here's how we think about building it to last.",
    tags: ["Front-End", "Animation", "React", "Framer Motion"],
    content: [
      {
        type: "paragraph",
        text: "The gap between a good interface and a memorable one is increasingly measured in milliseconds and easing curves. But fluid motion is a discipline, not a set of tricks — and the teams that treat it as engineering, not garnish, ship the interfaces people remember.",
      },
      {
        type: "heading",
        text: "Animate meaning, not just movement",
      },
      {
        type: "paragraph",
        text: "The first question is never 'how should this move?' It's 'what is this movement telling the user?' A shared layout transition explains where an element went. A spring on a toggle communicates weight and consequence. When motion maps to meaning, it stops feeling gratuitous.",
      },
      {
        type: "paragraph",
        text: "Practically, that means reaching for layout animations and shared element transitions to preserve context across state changes, and reserving flashy effects for moments that genuinely deserve emphasis.",
      },
      {
        type: "callout",
        label: "Principle",
        title: "Spring physics over fixed durations",
        text: "Duration-based tweens feel mechanical because the real world doesn't move on a stopwatch. Spring-based motion — tuned by stiffness and damping — reads as physical and forgiving of interruption.",
      },
      {
        type: "heading",
        text: "Performance is a design constraint",
      },
      {
        type: "paragraph",
        text: "A beautiful animation that drops frames is a bug. Keep animations on the compositor by favouring transform and opacity, lean on hardware-friendly properties, and measure on mid-tier hardware, not your workstation. The user on a three-year-old phone is your real design target.",
      },
      {
        type: "quote",
        text: "The best animation is the one users feel but never notice. The moment they're admiring your transition, you've probably overdone it.",
        cite: "Elena Rodriguez, Principal Front-End Engineer",
      },
      {
        type: "heading",
        text: "Techniques we reach for",
      },
      {
        type: "paragraph",
        text: "A small, well-understood toolbox beats a sprawling one. These are the patterns that survive contact with real products.",
      },
      {
        type: "list",
        items: [
          "Scroll-linked motion with useScroll and useTransform for narrative pages.",
          "Velocity-driven effects (useVelocity) so motion reacts to how fast a user moves, not just where.",
          "Orchestrated entrances with staggerChildren for hierarchy and rhythm.",
          "AnimatePresence for clean, interruptible enter/exit states.",
        ],
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&auto=format&fit=crop&q=60",
        caption:
          "Fluid interfaces are engineered, profiled, and tuned — not sprinkled on.",
      },
      {
        type: "paragraph",
        text: "Build motion as a system: shared easing tokens, consistent spring configs, and a clear rule for when things move. Do that, and your interface will feel coherent for the next decade — not just this design cycle.",
      },
    ],
  },
  {
    id: 4,
    slug: "cloud-cost-reduction",
    title: "How We Reduced Cloud Costs by 40% Without Sacrificing Performance",
    author: "David Chen",
    readTime: "10 mins",
    category: "Case Studies",
    image:
      "https://images.unsplash.com/photo-1654875185977-4a97176ef3f9?w=600&auto=format&fit=crop&q=60",
    href: "/blog/cloud-cost-reduction",
    excerpt:
      "A deep dive into our infrastructure optimization process and the tools we used to cut costs dramatically.",
    date: "March 22, 2026",
    authorMeta: {
      name: "David Chen",
      role: "Head of Platform Engineering",
      avatar: portrait("men", 54),
    },
    lead: "We cut our cloud bill by 40% in a single quarter — and latency went down, not up. Here's the exact process, in order, with the numbers that mattered.",
    tags: ["Infrastructure", "Cloud", "Cost", "Case Study"],
    content: [
      {
        type: "paragraph",
        text: "Cloud spend has a way of becoming invisible. It grows a little every sprint, and one day it's the second-largest line on the P&L. When ours crossed that threshold, we ran a focused eight-week optimisation program. This is what worked — and what didn't.",
      },
      {
        type: "heading",
        text: "Step one: measure before you touch anything",
      },
      {
        type: "paragraph",
        text: "You cannot optimise what you can't attribute. Before changing a single resource we tagged every service, mapped cost to team and feature, and built one dashboard everyone trusted. Half of our eventual savings came from decisions this visibility made obvious.",
      },
      {
        type: "paragraph",
        text: "The uncomfortable finding: roughly a third of spend served idle or over-provisioned capacity, quietly running because nobody owned turning it off.",
      },
      {
        type: "callout",
        label: "Result",
        title: "−40% spend, −12% p95 latency",
        text: "Over eight weeks we cut total cloud cost by 40% while p95 latency actually improved by 12% — proof that waste and performance are often the same problem.",
      },
      {
        type: "heading",
        text: "The changes that moved the needle",
      },
      {
        type: "paragraph",
        text: "We resisted the urge to chase clever micro-optimisations first. The big wins were boring: right-sizing over-provisioned instances, adopting savings plans for steady baseline load, and moving spiky workloads onto autoscaling that actually scaled to zero.",
      },
      {
        type: "quote",
        text: "The cheapest server is the one you turned off. Most cloud waste isn't inefficiency — it's inertia.",
        cite: "David Chen, Head of Platform Engineering",
      },
      {
        type: "heading",
        text: "What we deliberately didn't do",
      },
      {
        type: "paragraph",
        text: "We didn't degrade the customer experience to hit a number, and we didn't rewrite services to save pennies. Optimisation that costs more engineering time than it saves in cloud time is a loss dressed as a win.",
      },
      {
        type: "list",
        items: [
          "Right-sized compute against real utilisation, not peak fear.",
          "Committed savings plans for predictable baseline load.",
          "Autoscaling that scales to zero for spiky, non-critical work.",
          "Storage lifecycle policies to tier or expire cold data automatically.",
          "A monthly cost review owned by engineering, not just finance.",
        ],
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&auto=format&fit=crop&q=60",
        caption:
          "Visibility first, then the boring wins — that's the whole playbook.",
      },
      {
        type: "paragraph",
        text: "The lasting change wasn't a config — it was a habit. Cost is now a first-class engineering metric with an owner and a monthly review. Savings you don't defend quietly reappear.",
      },
    ],
  },
  {
    id: 5,
    slug: "designing-accessibility",
    title: "Designing for Accessibility: Beyond Color Contrast",
    author: "Sarah Jenkins",
    readTime: "7 mins",
    category: "Resources",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=60",
    href: "/blog/designing-accessibility",
    excerpt:
      "Accessibility is more than just passing contrast checkers. Learn how to design true inclusive digital experiences.",
    date: "March 5, 2026",
    authorMeta: {
      name: "Sarah Jenkins",
      role: "Lead Product Designer",
      avatar: portrait("women", 12),
    },
    lead: "Passing a contrast checker is table stakes, not a finish line. Real accessibility is about whether people can actually accomplish what they came to do.",
    tags: ["Accessibility", "Design", "Inclusion", "UX"],
    content: [
      {
        type: "paragraph",
        text: "It's easy to treat accessibility as a checklist you clear before launch. But a product can pass every automated audit and still be miserable to use with a screen reader, a keyboard, or a distracted mind. Compliance is the floor; usability for everyone is the goal.",
      },
      {
        type: "heading",
        text: "Contrast is where accessibility starts, not ends",
      },
      {
        type: "paragraph",
        text: "Colour contrast matters — but it's the most automatable and therefore the least differentiating part of the work. The harder, more valuable questions are about focus order, semantic structure, motion sensitivity, and clarity of language.",
      },
      {
        type: "paragraph",
        text: "An interface that reads perfectly to a sighted mouse user can be a maze to someone tabbing through it. Accessibility lives in the parts your automated tools never see.",
      },
      {
        type: "callout",
        label: "Reframe",
        title: "Design for situations, not just disabilities",
        text: "Captions help someone who is deaf — and someone on a train. Large tap targets help tremor — and cold hands. Inclusive design quietly improves the experience for everyone.",
      },
      {
        type: "heading",
        text: "The things automated tests miss",
      },
      {
        type: "paragraph",
        text: "Automated checkers catch missing alt text and low contrast. They cannot tell you whether your focus order makes sense, whether an error message is understandable, or whether an animation might trigger vestibular discomfort. Those require judgement and, crucially, real users.",
      },
      {
        type: "quote",
        text: "Accessibility is not a feature you add. It's a quality of attention you bring to every decision.",
        cite: "Sarah Jenkins, Lead Product Designer",
      },
      {
        type: "heading",
        text: "A practical baseline",
      },
      {
        type: "paragraph",
        text: "Start with structure and behaviour, and test with the assistive technologies your users actually use. The list below is where we begin every project.",
      },
      {
        type: "list",
        items: [
          "Semantic HTML first — the right element gives you behaviour for free.",
          "Fully keyboard-operable flows with a visible, logical focus order.",
          "Respect prefers-reduced-motion for anyone sensitive to movement.",
          "Write errors and labels in plain, specific language.",
          "Test with a real screen reader, not just an automated audit.",
        ],
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&auto=format&fit=crop&q=60",
        caption: "Inclusive products are tested with people, not just linters.",
      },
      {
        type: "paragraph",
        text: "Build accessibility in from the first wireframe and it costs almost nothing. Bolt it on at the end and it costs everything. Choose the cheap path — and the humane one.",
      },
    ],
  },
  {
    id: 6,
    slug: "q3-retreat",
    title: "Q3 Company Retreat: Aligning Our Vision for 2027",
    author: "Ray Saddiq",
    readTime: "5 mins",
    category: "Company News",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&auto=format&fit=crop&q=60",
    href: "/blog/q3-retreat",
    excerpt:
      "Key takeaways and strategic alignments from our latest executive leadership retreat in the Swiss Alps.",
    date: "February 18, 2026",
    authorMeta: {
      name: "Ray Saddiq",
      role: "Head of Communications",
      avatar: portrait("men", 32),
    },
    lead: "Three days, one mountain, and a leadership team getting brutally honest about where we're headed. Here's what we committed to for 2027.",
    tags: ["Culture", "Leadership", "Strategy", "Team"],
    content: [
      {
        type: "paragraph",
        text: "Once a quarter we take the leadership team somewhere with no meeting rooms and worse Wi-Fi than anyone would like. The point isn't the view — it's the space to ask the questions the day-to-day never lets us reach. This is what came out of it.",
      },
      {
        type: "heading",
        text: "One conversation we kept avoiding",
      },
      {
        type: "paragraph",
        text: "For a year we'd optimised for growth and told ourselves focus could wait. The retreat forced the honest version: we were saying yes to too much, and it was quietly diluting the work we're proudest of. Naming it was uncomfortable and overdue.",
      },
      {
        type: "paragraph",
        text: "By the second evening we'd agreed on something simple and hard — do fewer things, and do them at a standard nobody can ignore.",
      },
      {
        type: "callout",
        label: "Commitment",
        title: "Fewer bets, deeper craft",
        text: "For 2027 we're narrowing our focus to the work where we're genuinely world-class, and raising the internal bar for everything that ships under our name.",
      },
      {
        type: "heading",
        text: "What we're carrying into 2027",
      },
      {
        type: "paragraph",
        text: "Alignment isn't a poster; it's a set of decisions you'd actually defend under pressure. We left with a short list we're willing to be held to.",
      },
      {
        type: "quote",
        text: "Strategy is what you say no to. We spent three days getting better at saying no to good ideas so we could say yes to the right ones.",
        cite: "Ray Saddiq, Head of Communications",
      },
      {
        type: "heading",
        text: "The commitments",
      },
      {
        type: "paragraph",
        text: "None of these are novel. What's new is that the whole leadership team put their name to them in the same room.",
      },
      {
        type: "list",
        items: [
          "Concentrate on the services where we can be genuinely best-in-class.",
          "Raise the internal quality bar for everything that ships.",
          "Invest in the team's growth as deliberately as we invest in clients'.",
          "Measure success by the depth of relationships, not just the count.",
        ],
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&auto=format&fit=crop&q=60",
        caption:
          "The best strategy sessions happen where the calendar can't reach.",
      },
      {
        type: "paragraph",
        text: "We came down the mountain with fewer priorities and more conviction. If 2026 was about proving we could grow, 2027 is about proving we could choose. We're ready for it.",
      },
    ],
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

// Related posts: same category first, then fill from the rest, excluding self.
export function getRelatedPosts(slug: string, count = 3): BlogPost[] {
  const current = getPostBySlug(slug);
  if (!current) return blogPosts.slice(0, count);

  const others = blogPosts.filter((post) => post.slug !== slug);
  const sameCategory = others.filter((p) => p.category === current.category);
  const rest = others.filter((p) => p.category !== current.category);
  return [...sameCategory, ...rest].slice(0, count);
}
