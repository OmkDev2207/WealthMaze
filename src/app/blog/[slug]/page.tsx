import * as React from "react";
import { Metadata } from "next";
import { notFound as nextNotFound } from "next/navigation";
import Link from "next/link";
import fs from "fs";
import path from "path";
import { getPostBySlug, blogPosts } from "@/data/blog/posts";
import { getCalculatorById } from "@/data/calculators";
import { getRelatedPostsForBlog, getRelatedCalculatorsForBlog } from "@/data/internalLinks";
import { Markdown } from "@/components/Markdown";
import { RelatedContent } from "@/components/RelatedContent";
import { Calendar, User, Clock, ArrowLeft, ChevronRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import { AdSlot } from "@/components/AdSlot";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const post = getPostBySlug(resolvedParams.slug);

  if (!post) {
    return { title: "Article Not Found - WealthMaze" };
  }

  return {
    title: `${post.title} | WealthMaze Guides`,
    description: post.description,
    keywords: [
      post.title,
      post.category,
      ...post.tags,
      "personal finance",
      "financial advice",
      "wealth building",
      "money tips",
    ],
    alternates: {
      canonical: `${siteConfig.url}/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      url: `${siteConfig.url}/blog/${post.slug}`,
      siteName: "WealthMaze",
      publishedTime: new Date(post.publishedAt).toISOString(),
      authors: [post.author.name],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  const post = getPostBySlug(slug);

  if (!post) {
    nextNotFound();
  }

  // Read the markdown content synchronously from the filesystem at build time
  let markdownContent = "";
  try {
    const filePath = path.join(process.cwd(), "src/content/blog", `${slug}.md`);
    markdownContent = fs.readFileSync(filePath, "utf8");
  } catch (err) {
    console.error("Failed to read markdown file:", err);
    markdownContent = "Article content is currently unavailable. Please try again later.";
  }

  // Related posts and calculators from the link graph
  const relatedPostSlugs = getRelatedPostsForBlog(post.slug, 5);
  const graphRelatedPosts = relatedPostSlugs
    .map((s) => getPostBySlug(s))
    .filter((p) => p !== undefined && p.slug !== post.slug) as typeof blogPosts;

  const relatedCalcIds = getRelatedCalculatorsForBlog(post.slug, 3);
  // Serialize to plain objects — removes calculate() function to avoid Client Component error
  const graphRelatedCalcs = relatedCalcIds
    .map((id) => getCalculatorById(id))
    .filter(Boolean)
    .map((c) => ({ id: c!.id, name: c!.name, category: c!.category, description: c!.description }));

  // Injected Article JSON-LD Schema
  const articleSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${siteConfig.url}/blog/${post.slug}#article`,
        "headline": post.title,
        "description": post.description,
        "datePublished": new Date(post.publishedAt).toISOString(),
        "dateModified": new Date(post.publishedAt).toISOString(),
        "keywords": [post.category, ...post.tags, "personal finance", "financial calculator"].join(", "),
        "author": {
          "@type": "Person",
          "name": post.author.name,
          "url": siteConfig.url,
        },
        "publisher": {
          "@type": "Organization",
          "name": "WealthMaze",
          "logo": {
            "@type": "ImageObject",
            "url": `${siteConfig.url}/favicon.ico`,
          },
        },
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": `${siteConfig.url}/blog/${post.slug}`,
        },
        "isPartOf": {
          "@type": "Blog",
          "@id": `${siteConfig.url}/blog`,
          "name": "WealthMaze Blog",
          "description": "Expert guides on financial calculators, investment planning, and personal finance for Indian investors.",
        },
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": siteConfig.url },
          { "@type": "ListItem", "position": 2, "name": "Blog", "item": `${siteConfig.url}/blog` },
          { "@type": "ListItem", "position": 3, "name": post.title, "item": `${siteConfig.url}/blog/${post.slug}` },
        ],
      },
    ],
  });

  return (
    <>
      {/* Inject JSON-LD Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: articleSchema }} />

      <div className="relative min-h-screen bg-zinc-50/30 dark:bg-zinc-950/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
          {/* Breadcrumbs */}
          <nav className="flex items-center space-x-2 text-xs font-semibold text-zinc-400 dark:text-zinc-500">
            <Link href="/" className="hover:text-zinc-600 dark:hover:text-zinc-300">
              Home
            </Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/blog" className="hover:text-zinc-600 dark:hover:text-zinc-300">
              Blog
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-zinc-600 dark:text-zinc-300 truncate max-w-xs">{post.title}</span>
          </nav>

          {/* Back button */}
          <div>
            <Link
              href="/blog"
              className="inline-flex items-center text-xs font-semibold text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
            >
              <ArrowLeft className="h-4 w-4 mr-1.5" />
              Back to Blog Hub
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Main Article Body */}
            <main className="lg:col-span-8 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 p-6 sm:p-8 rounded-2xl shadow-sm dark:shadow-none space-y-6">
              {/* Header */}
              <header className="space-y-4 border-b border-zinc-100 dark:border-zinc-900 pb-6">
                <span className="inline-flex items-center px-2.5 py-0.5 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-xs font-bold rounded-full">
                  {post.category}
                </span>

                <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 dark:text-white leading-tight">
                  {post.title}
                </h1>

                {/* Article Info Bar */}
                <div className="flex flex-wrap gap-4 text-xs font-semibold text-zinc-400 dark:text-zinc-500 pt-1">
                  <span className="flex items-center">
                    <User className="h-3.5 w-3.5 mr-1" />
                    {post.author.name}
                  </span>
                  <span className="flex items-center">
                    <Calendar className="h-3.5 w-3.5 mr-1" />
                    {post.publishedAt}
                  </span>
                  <span className="flex items-center">
                    <Clock className="h-3.5 w-3.5 mr-1" />
                    {post.readTime}
                  </span>
                </div>
              </header>

              {/* Render parsed Markdown body */}
              <article className="prose prose-zinc dark:prose-invert max-w-none">
                <Markdown content={markdownContent} />
              </article>

              {/* Universal Protective Financial Disclaimer Box */}
              <div className="p-5 bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-850 rounded-2xl text-xs leading-relaxed text-zinc-500 dark:text-zinc-400 space-y-2 mt-8">
                <h4 className="font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider text-xs flex items-center">
                  ⚠️ Legal & Financial Disclaimer
                </h4>
                <p>
                  The content provided on this page, including articles, calculators, guides, and links, is intended <strong>strictly for general informational, educational, and illustrative purposes</strong>. 
                </p>
                <p>
                  WealthMaze does not provide licensed investment, financial, legal, or tax advice. No calculations or editorial points represent guaranteed returns, future wealth outcomes, or tax liabilities. 
                </p>
                <p>
                  Financial markets, taxation rates, and lending guidelines carry inherent risk and change regularly. You should perform your own research and consult with a qualified, registered financial advisor, certified tax consultant, or legal expert before executing any financial strategy or investment plan.
                </p>
              </div>

              {/* Tags Section */}
              {post.tags.length > 0 && (
                <div className="pt-6 border-t border-zinc-100 dark:border-zinc-900 flex flex-wrap gap-1.5 items-center">
                  <span className="text-xs font-bold text-zinc-400 dark:text-zinc-500 mr-1.5 uppercase">Tags:</span>
                  {post.tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/blog/tag/${tag.toLowerCase()}`}
                      className="px-2.5 py-1 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-xs text-zinc-600 dark:text-zinc-400 hover:border-emerald-400/60 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
              )}
            </main>

            {/* Sidebar with Related Content via link graph */}
            <aside className="lg:col-span-4 space-y-6">
              <AdSlot position="sidebar" />
              <RelatedContent
                calculators={graphRelatedCalcs}
                posts={graphRelatedPosts.slice(0, 3)}
                calculatorHeading="Try These Calculators"
                postHeading="Related Articles"
                layout="sidebar"
              />
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
