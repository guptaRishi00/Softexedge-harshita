import type { Metadata } from "next";
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
    const slug = project.href.split("/").pop();
    return {
      slug,
    };
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Project not found" };

  return {
    title: project.title,
    description: project.description,
  };
}

export default async function ProjectPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const project = getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  const currentIndex = projects.findIndex((p) => p.id === project.id);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  const gallery = project.gallery ?? [];
  const galleryMid = Math.ceil(gallery.length / 2);
  const galleryA = gallery.slice(0, galleryMid);
  const galleryB = gallery.slice(galleryMid);

  return (
    <div className="relative bg-black">
      <div className="absolute left-0 top-0 z-50 w-full">
        <Header onDark dropdown />
      </div>

      <ProjectHero project={project} />
      <ProjectDetailsContent project={project} />
      <ProjectGallery project={project} images={galleryA} />
      <ProjectOutcomes project={project} />
      <ProjectGallery project={project} images={galleryB} />
      <NextProject nextProject={nextProject} />

      <div className="bg-white pt-24 max-md:pt-16">
        <ContactFaqSection />
        <div className="px-3 max-md:[&>section]:pt-9 max-md:[&>section]:pb-9">
          <CtaSection />
        </div>
      </div>

      <div className="px-3 pt-11 pb-3 max-md:-mt-px max-md:pb-4 md:pt-24 bg-white">
        <Footer />
      </div>
    </div>
  );
}
