import * as React from "react";
import { Metadata } from "next";
import { notFound as nextNotFound } from "next/navigation";
import Link from "next/link";
import fs from "fs";
import path from "path";
import { getPostBySlug, blogPosts } from "@/data/blog/posts";
import { getCalculatorById } from "@/data/calculators";
import { Markdown } from "@/components/Markdown";
import { Calendar, User, Clock, ArrowLeft, ChevronRight, Calculator } from "lucide-react";

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
    alternates: {
      canonical: `https://wealthmaze.com/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      url: `https://wealthmaze.com/blog/${post.slug}`,
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

  // Related posts (same category, excluding current)
  const relatedPosts = blogPosts
    .filter((p) => p.category === post.category && p.slug !== post.slug)
    .slice(0, 3);

  // Related calculators
  const relatedCalculators = post.relatedCalculators
    .map((id) => getCalculatorById(id))
    .filter((c) => c !== undefined);

  // Injected Article JSON-LD Schema
  const articleSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": post.title,
    "description": post.description,
    "datePublished": new Date(post.publishedAt).toISOString(),
    "author": {
      "@type": "Organization",
      "name": "WealthMaze",
      "url": "https://wealthmaze.com",
    },
    "publisher": {
      "@type": "Organization",
      "name": "WealthMaze",
      "logo": {
        "@type": "ImageObject",
        "url": "https://wealthmaze.com/favicon.ico",
      },
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://wealthmaze.com/blog/${post.slug}`,
    },
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
                    <span
                      key={tag}
                      className="px-2.5 py-1 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-xs text-zinc-600 dark:text-zinc-400"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </main>

            {/* Sidebar with Calculators & Related Posts */}
            <aside className="lg:col-span-4 space-y-6">
              {/* Related Calculators (Internal Link Hub) */}
              {relatedCalculators.length > 0 && (
                <div className="bg-zinc-50 dark:bg-zinc-900/30 border border-zinc-100 dark:border-zinc-800/80 p-5 rounded-2xl space-y-4">
                  <div className="flex items-center space-x-2 border-b border-zinc-150 dark:border-zinc-800 pb-2">
                    <Calculator className="h-4.5 w-4.5 text-emerald-500" />
                    <h3 className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-wider">
                      Interactive Planners
                    </h3>
                  </div>
                  <div className="space-y-3">
                    {relatedCalculators.map((c) => {
                      if (!c) return null;
                      return (
                        <Link
                          key={c.id}
                          href={`/${c.id}`}
                          className="block p-3.5 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl hover:border-emerald-500/50 dark:hover:border-emerald-500/50 transition-all group"
                        >
                          <div className="text-xs font-bold text-zinc-800 dark:text-zinc-200 group-hover:text-emerald-500 transition-colors">
                            {c.name}
                          </div>
                          <div className="text-[10px] text-zinc-400 dark:text-zinc-500 mt-1 line-clamp-2">
                            {c.description}
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Related Posts */}
              {relatedPosts.length > 0 && (
                <div className="bg-zinc-50 dark:bg-zinc-900/30 border border-zinc-100 dark:border-zinc-800/80 p-5 rounded-2xl space-y-4">
                  <h3 className="text-sm font-bold text-zinc-900 dark:text-white border-b border-zinc-150 dark:border-zinc-800 pb-2 uppercase tracking-wider">
                    Recommended Reading
                  </h3>
                  <div className="space-y-3">
                    {relatedPosts.map((rp) => (
                      <Link
                        key={rp.slug}
                        href={`/blog/${rp.slug}`}
                        className="block p-3.5 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl hover:border-emerald-500/50 dark:hover:border-emerald-500/50 transition-all group"
                      >
                        <div className="text-xs font-bold text-zinc-800 dark:text-zinc-200 group-hover:text-emerald-500 transition-colors line-clamp-2">
                          {rp.title}
                        </div>
                        <div className="text-[10px] text-zinc-400 dark:text-zinc-500 mt-1 flex justify-between items-center">
                          <span>{rp.readTime}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
