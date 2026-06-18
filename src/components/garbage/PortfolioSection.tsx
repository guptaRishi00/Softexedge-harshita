import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

const projects = [
  {
    title: "Digital Banking App",
    category: "Product Design",
    description:
      "A complete mobile banking transformation for a leading European fintech firm, focusing on accessibility and speed.",
    image:
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1200&auto=format&fit=crop",
    color: "bg-blue-600",
    tags: ["Mobile", "Fintech", "UI/UX"],
  },
  {
    title: "Eco-Commerce Platform",
    category: "Web Development",
    description:
      "Architecture and development of a high-scale e-commerce engine with real-time carbon footprint tracking.",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1200&auto=format&fit=crop",
    color: "bg-green-600",
    tags: ["React", "Node.js", "E-commerce"],
  },
];

export default function PortfolioSection() {
  return (
    <section className="bg-white py-24 font-sans overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12">
        {/* SECTION HEADER */}
        <div className="mb-20">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-purple-50 px-4 py-1.5 text-sm font-bold text-[#6c2cff] ring-1 ring-inset ring-purple-100">
            Selected Work
          </div>
          <h2 className="text-5xl font-bold tracking-tight text-slate-950 md:text-7xl">
            Case Studies That <br />
            <span className="text-slate-400">Define Impact.</span>
          </h2>
        </div>

        {/* PROJECTS LIST */}
        <div className="flex flex-col gap-32">
          {projects.map((project, index) => (
            <div
              key={index}
              className={`flex flex-col gap-12 lg:flex-row lg:items-center ${index % 2 !== 0 ? "lg:flex-row-reverse" : ""}`}
            >
              {/* IMAGE SIDE */}
              <div className="relative group w-full lg:w-3/5">
                <div className="aspect-[16/10] overflow-hidden rounded-[40px] bg-slate-100 ring-1 ring-slate-200/50">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                {/* Floating "View" Button - Visible on Hover */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-slate-950/20 rounded-[40px]">
                  <div className="h-24 w-24 rounded-full bg-white flex items-center justify-center shadow-2xl scale-75 group-hover:scale-100 transition-transform duration-500">
                    <ArrowUpRight className="w-8 h-8 text-[#6c2cff]" />
                  </div>
                </div>

                {/* Floating Category Badge (Matches your Hero style) */}
                <div className="absolute top-8 left-8">
                  <span className="rounded-full bg-white/90 backdrop-blur-md px-5 py-2 text-sm font-bold text-slate-950 shadow-lg ring-1 ring-black/5">
                    {project.category}
                  </span>
                </div>
              </div>

              {/* CONTENT SIDE */}
              <div className="w-full lg:w-2/5">
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-bold uppercase tracking-widest text-slate-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="text-4xl font-bold text-slate-950 mb-6 leading-tight lg:text-5xl">
                  {project.title}
                </h3>

                <p className="text-lg leading-relaxed text-slate-600 mb-8 max-w-md">
                  {project.description}
                </p>

                <button className="group flex items-center gap-3 text-lg font-bold text-[#6c2cff] transition-all hover:gap-5">
                  View Full Case Study
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-purple-100 bg-transparent transition-all group-hover:bg-[#6c2cff] group-hover:border-[#6c2cff] group-hover:text-white">
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* BOTTOM CTA: VIEW ALL */}
        <div className="mt-32 flex justify-center">
          <button className="rounded-full border-2 border-slate-100 px-12 py-5 text-lg font-bold text-slate-950 transition-all hover:border-[#6c2cff] hover:text-[#6c2cff] hover:bg-purple-50">
            View all 20+ projects
          </button>
        </div>
      </div>
    </section>
  );
}
