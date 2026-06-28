import { MetadataRoute } from "next";
import { allCalculators } from "@/data/calculators";
import { blogPosts } from "@/data/blog/posts";
import { programmaticPages } from "@/data/programmatic";
import { siteConfig } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;

  // All static page routes
  const staticPages = [
    { route: "", priority: 1.0, freq: "weekly" as const },
    { route: "/financial-health-score", priority: 0.95, freq: "weekly" as const },
    { route: "/about", priority: 0.7, freq: "monthly" as const },
    { route: "/contact", priority: 0.5, freq: "monthly" as const },
    { route: "/privacy", priority: 0.4, freq: "yearly" as const },
    { route: "/terms", priority: 0.4, freq: "yearly" as const },
    { route: "/disclaimer", priority: 0.4, freq: "yearly" as const },
    { route: "/blog", priority: 0.9, freq: "daily" as const },
    { route: "/resources", priority: 0.85, freq: "weekly" as const },
    { route: "/guides", priority: 0.8, freq: "weekly" as const },
    { route: "/free-tools", priority: 0.8, freq: "weekly" as const },
    { route: "/author/om-k", priority: 0.6, freq: "monthly" as const },
    { route: "/methodology", priority: 0.6, freq: "monthly" as const },
    { route: "/editorial-policy", priority: 0.6, freq: "monthly" as const },
    { route: "/content-update-policy", priority: 0.6, freq: "monthly" as const },
  ].map(({ route, priority, freq }) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: freq,
    priority,
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
