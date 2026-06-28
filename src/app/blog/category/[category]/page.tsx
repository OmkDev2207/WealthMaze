import * as React from "react";
import { Metadata } from "next";
import { notFound as nextNotFound } from "next/navigation";
import { blogPosts } from "@/data/blog/posts";
import { BlogClient } from "@/components/BlogClient";
import { siteConfig } from "@/config/site";

interface PageProps {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  const categories = Array.from(new Set(blogPosts.map((p) => p.category)));
  const params: { category: string }[] = [];
  categories.forEach((cat) => {
    params.push({ category: cat.toLowerCase() });
    const kebab = cat.toLowerCase().replace(/\s+/g, "-");
    if (kebab !== cat.toLowerCase()) {
      params.push({ category: kebab });
    }
  });
  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const decodedParam = decodeURIComponent(resolvedParams.category).toLowerCase();
  
  // Find match case-insensitively supporting spaces or hyphens
  const matchingPost = blogPosts.find(
    (p) => p.category.toLowerCase() === decodedParam || p.category.toLowerCase().replace(/\s+/g, "-") === decodedParam
  );

  if (!matchingPost) {
    return { title: "Category Not Found - WealthMaze" };
  }

  const categoryName = matchingPost.category;

  return {
    title: `${categoryName} Financial Guides & Calculators | WealthMaze`,
    description: `Expert articles and interactive calculators for ${categoryName}. Read WealthMaze guides on compound interest, tax slabs, EMI maths, and investment planning.`,
    alternates: {
      canonical: `${siteConfig.url}/blog/category/${resolvedParams.category}`,
    },
    openGraph: {
      title: `${categoryName} Financial Guides | WealthMaze`,
      description: `Read expert ${categoryName} articles on WealthMaze. Interactive calculators and guides for smarter money decisions.`,
      url: `${siteConfig.url}/blog/category/${resolvedParams.category}`,
      type: "website",
      siteName: "WealthMaze",
    },
    twitter: {
      card: "summary_large_image",
      title: `${categoryName} Financial Guides | WealthMaze`,
      description: `Expert ${categoryName} articles and interactive calculators on WealthMaze.`,
    },
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const resolvedParams = await params;
  const decodedParam = decodeURIComponent(resolvedParams.category).toLowerCase();

  const matchingPost = blogPosts.find(
    (p) => p.category.toLowerCase() === decodedParam || p.category.toLowerCase().replace(/\s+/g, "-") === decodedParam
  );

  if (!matchingPost) {
    nextNotFound();
  }

  const categoryName = matchingPost.category;
  const filteredPosts = blogPosts.filter((p) => p.category === categoryName);

  return (
    <div className="relative min-h-screen bg-zinc-50/30 dark:bg-zinc-950/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <header className="space-y-3 max-w-3xl">
          <span className="text-xs font-bold text-emerald-500 uppercase tracking-widest leading-none">
            Topic Category
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
            {categoryName} Guides
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
            All WealthMaze articles and resources related to {categoryName.toLowerCase()}. Use these guides to learn compound math, evaluate loan EMIs, plan retirement milestones, and structure tax savings.
          </p>
        </header>

        <BlogClient posts={filteredPosts} />
      </div>
    </div>
  );
}
