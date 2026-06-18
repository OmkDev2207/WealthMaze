import { MetadataRoute } from "next";
import { allCalculators } from "@/data/calculators";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://wealthmaze.com";

  const staticPages = ["", "/about", "/contact", "/privacy", "/terms", "/disclaimer"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  const calculatorPages = allCalculators.map((calc) => ({
    url: `${baseUrl}/${calc.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  return [...staticPages, ...calculatorPages];
}
