import { notFound } from "next/navigation";
import CtaSection from "@/components/brand-strategy/CtaSection";
import ContactFaqSection from "@/components/contact/ContactFaqSection";
import Footer from "@/components/layout/Footer";
import Header from "@/components/page/Header";
import NextProject from "@/components/work/NextProject";
import ProjectDetailsContent from "@/components/work/ProjectDetailsContent";
import ProjectGallery from "@/components/work/ProjectGallery";
import ProjectHero from "@/components/work/ProjectHero";
import ProjectOutcomes from "@/components/work/ProjectOutcomes";
import { getProjectBySlug, projects } from "@/data/projects";

export async function generateStaticParams() {
  return projects.map((project) => {
    // Extract slug from href (e.g. "/work/aura-skincare" -> "aura-skincare")
    const slug = project.href.split("/").pop();
    return {
      slug,
    };
  });
}

export default async function ProjectPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const project = getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  // Find next project
  const currentIndex = projects.findIndex((p) => p.id === project.id);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <div className="relative bg-[#0a0a0a]">
      {/* Header — shared site header, dark-hero variant (light links + logo) */}
      <div className="absolute left-0 top-0 z-50 w-full">
        <Header onDark />
      </div>

      <ProjectHero project={project} />
      <ProjectDetailsContent project={project} />
      <ProjectGallery project={project} />
      <ProjectOutcomes project={project} />
      <NextProject nextProject={nextProject} />

      <div className="bg-white pt-24">
        <ContactFaqSection />
        <div className="px-3">
          <CtaSection />
        </div>
      </div>

      <div className="px-3 pt-16 pb-3 md:pt-24 bg-white">
        <Footer />
      </div>
    </div>
  );
}
