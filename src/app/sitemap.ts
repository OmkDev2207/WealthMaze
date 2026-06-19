import { MetadataRoute } from "next";
import { allCalculators } from "@/data/calculators";
import { blogPosts } from "@/data/blog/posts";
import { programmaticPages } from "@/data/programmatic";
import { siteConfig } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;

  // All static page routes
  const staticPages = [
    "",
    "/about",
    "/contact",
    "/privacy",
    "/terms",
    "/disclaimer",
    "/blog",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  // Standard calculator page routes
  const calculatorPages = allCalculators.map((calc) => ({
    url: `${baseUrl}/${calc.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  // Programmatic SEO landing page routes
  const programmaticSEOPages = programmaticPages.map((page) => ({
    url: `${baseUrl}/${page.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  // Blog post routes
  const blogPostPages = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  return [
    ...staticPages,
    ...calculatorPages,
    ...programmaticSEOPages,
    ...blogPostPages,
  ];
}
