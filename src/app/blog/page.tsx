import * as React from "react";
import { Metadata } from "next";
import { blogPosts } from "@/data/blog/posts";
import { BlogClient } from "@/components/BlogClient";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: siteConfig.metadata.blog.title,
  description: siteConfig.metadata.blog.description,
  alternates: {
    canonical: `${siteConfig.url}/blog`,
  },
  openGraph: {
    title: siteConfig.metadata.blog.title,
    description: siteConfig.metadata.blog.description,
    url: `${siteConfig.url}/blog`,
    type: "website",
    siteName: "WealthMaze",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.metadata.blog.title,
    description: siteConfig.metadata.blog.description,
  },
};

export default function BlogIndexPage() {
  const breadcrumbSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": siteConfig.url },
      { "@type": "ListItem", "position": 2, "name": "Blog & Guides", "item": `${siteConfig.url}/blog` },
    ],
  });

  return (
    <>
    <div className="relative min-h-screen bg-zinc-50/30 dark:bg-zinc-950/20">
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[350px] overflow-hidden -z-10 pointer-events-none opacity-30 dark:opacity-10">
        <div className="absolute -top-[50px] left-[15%] w-[300px] h-[300px] rounded-full bg-emerald-300 blur-[80px] dark:bg-emerald-950/30" />
        <div className="absolute -top-[50px] right-[20%] w-[350px] h-[350px] rounded-full bg-indigo-300 blur-[100px] dark:bg-indigo-950/30" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <header className="space-y-3 max-w-3xl">
          <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
            WealthMaze Content Hub
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
            Gain deep insights into personal finance, investment formulas, tax laws, and saving tips. Connect the dots between calculator numbers and your real-world financial decisions.
          </p>
        </header>

        <BlogClient posts={blogPosts} />
      </div>
    </div>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbSchema }} />
    </>
  );
}
