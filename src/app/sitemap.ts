import type { MetadataRoute } from "next";
import { blogPosts } from "@/data/blog";
import { projects } from "@/data/projects";
import { SITE_URL } from "@/lib/site";

const baseUrl = SITE_URL;

const staticRoutes = [
  "/home",
  "/about",
  "/career",
  "/contact",
  "/blog",
  "/work",
  "/brand-strategy",
  "/web-development",
  "/app-development",
  "/ui-ux-design",
  "/digital-marketing",
  "/video-production",
  "/custom-software",
  "/ai-marketing-automation",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
  }));

  const blogEntries: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
  }));

  const workEntries: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${baseUrl}${project.href}`,
  }));

  return [...staticEntries, ...blogEntries, ...workEntries];
}
