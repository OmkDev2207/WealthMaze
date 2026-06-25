import * as React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { blogPosts } from "@/data/blog/posts";
import { siteConfig } from "@/config/site";
import { Calendar, BookOpen, Clock, ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Om K. - Personal Finance Writer & Founder | WealthMaze",
  description: "Om K. is the founder of WealthMaze. Read his practical articles on mutual fund SIPs, loan EMIs, retirement target planning, and wealth compounding.",
  alternates: {
    canonical: `${siteConfig.url}/author/om-k`,
  },
  openGraph: {
    title: "Om K. - Personal Finance Writer & Founder | WealthMaze",
    description: "Om K. is the founder of WealthMaze. Read his practical articles on mutual fund SIPs, loan EMIs, retirement target planning, and wealth compounding.",
    url: `${siteConfig.url}/author/om-k`,
    type: "profile",
    siteName: "WealthMaze",
  },
};

export default function AuthorProfilePage() {
  // Filter posts written by Om K.
  const authorPosts = blogPosts.filter((post) => post.author.name === "Om K.");

  const breadcrumbSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": siteConfig.url },
      { "@type": "ListItem", "position": 2, "name": "Author Profile: Om K.", "item": `${siteConfig.url}/author/om-k` },
    ],
  });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbSchema }} />

      <div className="relative min-h-screen bg-zinc-50/30 dark:bg-zinc-950/20">
        {/* Decorative background gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[350px] overflow-hidden -z-10 pointer-events-none opacity-35 dark:opacity-10">
          <div className="absolute -top-[50px] left-[10%] w-[350px] h-[350px] rounded-full bg-emerald-200 blur-[90px] dark:bg-emerald-950/20" />
          <div className="absolute -top-[50px] right-[15%] w-[300px] h-[300px] rounded-full bg-indigo-200 blur-[80px] dark:bg-indigo-950/20" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          {/* Breadcrumbs */}
          <nav className="flex flex-wrap items-center gap-y-1 gap-x-2 text-xs font-semibold text-zinc-400 dark:text-zinc-500" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-zinc-600 dark:hover:text-zinc-300">
              Home
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-zinc-600 dark:text-zinc-300">Authors</span>
            <ChevronRight className="h-3 w-3" />
            <span className="text-zinc-600 dark:text-zinc-300 font-bold">Om K.</span>
          </nav>

          {/* Author Header Card */}
          <header className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 p-6 sm:p-8 rounded-2xl shadow-sm dark:shadow-none flex flex-col md:flex-row gap-6 items-start md:items-center">
            <div className="h-20 w-20 sm:h-24 sm:w-24 rounded-[12px] bg-[#F5F5F5] border border-zinc-200 dark:border-zinc-800 flex items-center justify-center p-3 sm:p-4 shrink-0 select-none shadow-inner">
              <img
                src="https://wealthmaze.in/logo.png"
                alt="WealthMaze Logo"
                className="max-h-full max-w-full object-contain"
              />
            </div>

            <div className="space-y-3 flex-1">
              <div className="space-y-1">
                <span className="inline-flex items-center px-2.5 py-0.5 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-xs font-bold rounded-full">
                  Founder &amp; Author
                </span>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 dark:text-white tracking-tight">
                  Om K.
                </h1>
              </div>

              <p className="text-sm sm:text-base leading-relaxed text-zinc-600 dark:text-zinc-300 max-w-3xl">
                Om K. is the founder of WealthMaze and an active equity investor with a background in finance management. He studies markets not just through numbers, but through the lens of behavioral finance — understanding why people make the financial decisions they do, and how those decisions shape long-term wealth outcomes. Om built WealthMaze to bridge the gap between complex financial tools and everyday investors who deserve clear, unbiased answers. His writing focuses on the ideas most finance content gets wrong — the psychology, the math, and the real-world decisions that actually determine financial outcomes.
              </p>

              <div className="flex gap-4 text-xs font-semibold text-zinc-400 dark:text-zinc-500 pt-1">
                <span className="flex items-center gap-1">
                  <BookOpen className="h-3.5 w-3.5" />
                  {authorPosts.length} Articles Published
                </span>
              </div>
            </div>
          </header>

          {/* Articles Section */}
          <section className="space-y-6">
            <h2 className="text-xl font-bold text-zinc-950 dark:text-white tracking-tight flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-emerald-500" />
              Articles Written by Om K.
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {authorPosts.map((post) => (
                <article
                  key={post.slug}
                  className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-sm dark:shadow-none hover:shadow-md dark:hover:border-zinc-700 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <span className="inline-flex items-center px-2 py-0.5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 text-[10px] font-bold rounded-full uppercase">
                      {post.category}
                    </span>

                    <h3 className="text-base font-bold text-zinc-950 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors leading-snug">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </h3>

                    <p className="text-xs text-zinc-500 dark:text-zinc-450 leading-relaxed line-clamp-3">
                      {post.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-4 mt-4 border-t border-zinc-100 dark:border-zinc-900 text-[10px] font-semibold text-zinc-400 dark:text-zinc-550">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {post.publishedAt}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {post.readTime}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
