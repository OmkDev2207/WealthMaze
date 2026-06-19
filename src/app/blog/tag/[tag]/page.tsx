import * as React from "react";
import { Metadata } from "next";
import { notFound as nextNotFound } from "next/navigation";
import { blogPosts } from "@/data/blog/posts";
import { BlogClient } from "@/components/BlogClient";
import { siteConfig } from "@/config/site";

interface PageProps {
  params: Promise<{ tag: string }>;
}

export async function generateStaticParams() {
  const allTags = new Set<string>();
  blogPosts.forEach((p) => p.tags.forEach((tag) => allTags.add(tag.toLowerCase())));
  return Array.from(allTags).map((tag) => ({
    tag: tag,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const tagParam = resolvedParams.tag.toLowerCase();

  // Find if tag exists in any post
  const hasTag = blogPosts.some((p) =>
    p.tags.some((t) => t.toLowerCase() === tagParam)
  );

  if (!hasTag) {
    return { title: "Tag Not Found - WealthMaze" };
  }

  // Find exact case of the tag from the first match
  const firstMatchPost = blogPosts.find((p) =>
    p.tags.some((t) => t.toLowerCase() === tagParam)
  );
  const tagName = firstMatchPost?.tags.find((t) => t.toLowerCase() === tagParam) || tagParam;

  return {
    title: `#${tagName} Investment Articles & Guides | WealthMaze`,
    description: `Browse all WealthMaze articles tagged "${tagName}". Expert guides on personal finance, investment calculators, and tax planning.`,
    alternates: {
      canonical: `${siteConfig.url}/blog/tag/${tagParam}`,
    },
    openGraph: {
      title: `#${tagName} Articles | WealthMaze`,
      description: `Browse expert finance guides and calculators tagged "${tagName}" on WealthMaze.`,
      url: `${siteConfig.url}/blog/tag/${tagParam}`,
      type: "website",
      siteName: "WealthMaze",
    },
    twitter: {
      card: "summary_large_image",
      title: `#${tagName} Articles | WealthMaze`,
      description: `Expert finance guides and calculators tagged "${tagName}" on WealthMaze.`,
    },
  };
}

export default async function TagPage({ params }: PageProps) {
  const resolvedParams = await params;
  const tagParam = resolvedParams.tag.toLowerCase();

  const firstMatchPost = blogPosts.find((p) =>
    p.tags.some((t) => t.toLowerCase() === tagParam)
  );

  if (!firstMatchPost) {
    nextNotFound();
  }

  const tagDisplay = firstMatchPost.tags.find((t) => t.toLowerCase() === tagParam) || tagParam;
  const filteredPosts = blogPosts.filter((p) =>
    p.tags.some((t) => t.toLowerCase() === tagParam)
  );

  return (
    <div className="relative min-h-screen bg-zinc-50/30 dark:bg-zinc-950/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <header className="space-y-3 max-w-3xl">
          <span className="text-xs font-bold text-emerald-500 uppercase tracking-widest leading-none">
            Topic Tag
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
            Articles Tagged #{tagDisplay}
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
            Browse all educational resources, comparison guides, and calculator tutorials tagged with #{tagDisplay}.
          </p>
        </header>

        <BlogClient posts={filteredPosts} />
      </div>
    </div>
  );
}
