import * as React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { blogPosts } from "@/data/blog/posts";
import { siteConfig } from "@/config/site";
import { Calendar, BookOpen, Clock, ChevronRight, BookMarked, Sparkles, ShieldCheck, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Om K. - Founder & Personal Finance Writer | WealthMaze",
  description: "Om K. is the founder of WealthMaze. Read his insights on behavioral finance, investing math, and practical money frameworks.",
  alternates: {
    canonical: `${siteConfig.url}/author/om-k`,
  },
  openGraph: {
    title: "Om K. - Founder & Personal Finance Writer | WealthMaze",
    description: "Om K. is the founder of WealthMaze. Read his insights on behavioral finance, investing math, and practical money frameworks.",
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

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
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
          <header className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 p-6 sm:p-10 rounded-3xl shadow-sm dark:shadow-none flex flex-col md:flex-row gap-8 items-start">
            <div className="h-24 w-24 sm:h-28 sm:w-28 rounded-2xl bg-[#F5F5F5] border border-zinc-200 dark:border-zinc-800 flex items-center justify-center p-4 shrink-0 select-none shadow-inner">
              <img
                src="https://wealthmaze.in/logo.png"
                alt="WealthMaze Logo"
                className="max-h-full max-w-full object-contain"
              />
            </div>

            <div className="space-y-4 flex-1">
              <div className="space-y-1">
                <span className="inline-flex items-center px-3 py-1 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-xs font-bold rounded-full">
                  Founder &amp; Author
                </span>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-950 dark:text-white tracking-tight">
                  Om K. — Founder, WealthMaze
                </h1>
              </div>

              <div className="space-y-3 text-sm sm:text-base leading-relaxed text-zinc-600 dark:text-zinc-300 max-w-4xl font-normal">
                <p>
                  I&apos;m not a financial advisor. I don&apos;t manage anyone&apos;s money. I don&apos;t have a Bloomberg terminal or a trading desk.
                </p>
                <p>
                  What I have is a genuine, years-long obsession with understanding how money actually works — and an equal obsession with why intelligent people consistently make financial decisions that work against them.
                </p>
                <p>
                  I built WealthMaze because the tools I wanted didn&apos;t exist in the form I wanted them. Every financial calculator I found was either cluttered with ads, required a signup to use, or quietly sent my financial data to a server somewhere. I wanted something fast, clean, and completely private. So I built it.
                </p>
              </div>

              <div className="flex flex-wrap gap-4 text-xs font-semibold text-zinc-400 dark:text-zinc-500 pt-2 border-t border-zinc-100 dark:border-zinc-900">
                <span className="flex items-center gap-1.5 text-zinc-700 dark:text-zinc-300">
                  <BookOpen className="h-4 w-4 text-emerald-500" />
                  {authorPosts.length} Articles Published
                </span>
              </div>
            </div>
          </header>

          {/* Author Deep Dive Grid Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* What drives my writing */}
            <div className="lg:col-span-2 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 p-6 sm:p-8 rounded-3xl space-y-4 shadow-sm dark:shadow-none flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-emerald-500" />
                  <h2 className="text-lg sm:text-xl font-bold text-zinc-950 dark:text-white">
                    What drives my writing
                  </h2>
                </div>
                <div className="space-y-3 text-sm sm:text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
                  <p>
                    I&apos;m particularly interested in behavioral finance — the study of the psychological patterns that shape how people think about and handle money. Why does someone with a high salary stay broke? Why do investors panic-sell at market lows when they intellectually know they should hold? Why does the advice that sounds most responsible — save more, spend less — often produce worse outcomes than focusing on earning more?
                  </p>
                  <p>
                    These questions don&apos;t have simple answers. The articles I write are my attempt to work through them honestly — using research, data, and real frameworks rather than recycled advice.
                  </p>
                </div>
              </div>
            </div>

            {/* What I read */}
            <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 p-6 sm:p-8 rounded-3xl space-y-4 shadow-sm dark:shadow-none flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <BookMarked className="h-5 w-5 text-emerald-500" />
                  <h2 className="text-lg sm:text-xl font-bold text-zinc-950 dark:text-white">
                    What I read
                  </h2>
                </div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  The books that have most shaped how I think about money:
                </p>
                <ul className="space-y-3 pt-1">
                  <li className="p-3.5 bg-zinc-50 dark:bg-zinc-900/60 rounded-xl border border-zinc-150 dark:border-zinc-800 text-xs sm:text-sm font-semibold text-zinc-800 dark:text-zinc-200 leading-snug">
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">The Psychology of Money</span>
                    <span className="block text-zinc-400 dark:text-zinc-500 text-xs font-normal mt-0.5">— Morgan Housel</span>
                  </li>
                  <li className="p-3.5 bg-zinc-50 dark:bg-zinc-900/60 rounded-xl border border-zinc-150 dark:border-zinc-800 text-xs sm:text-sm font-semibold text-zinc-800 dark:text-zinc-200 leading-snug">
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">The Almanack of Naval Ravikant</span>
                    <span className="block text-zinc-400 dark:text-zinc-500 text-xs font-normal mt-0.5">— Eric Jorgenson</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* What WealthMaze is */}
            <div className="lg:col-span-3 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 p-6 sm:p-8 rounded-3xl space-y-4 shadow-sm dark:shadow-none">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-emerald-500" />
                <h2 className="text-lg sm:text-xl font-bold text-zinc-950 dark:text-white">
                  What WealthMaze is
                </h2>
              </div>
              <div className="space-y-3 text-sm sm:text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
                <p>
                  WealthMaze is a financial calculator and education platform. Every calculator runs entirely in your browser — your income figures, investment amounts, and net worth data never leave your device. The articles represent my personal research and perspective on personal finance topics — not financial advice, and not content designed to sell you anything.
                </p>
                <p>
                  If something I&apos;ve written is wrong, incomplete, or could be explained better — I genuinely want to know. Reach out through the <Link href="/contact" className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline inline-flex items-center gap-1">contact page <Mail className="h-3.5 w-3.5 inline" /></Link>.
                </p>
                <p className="font-extrabold text-zinc-900 dark:text-white pt-2">
                  — Om K.
                </p>
              </div>
            </div>
          </div>

          {/* Articles Section */}
          <section className="space-y-6 pt-4">
            <div className="border-b border-zinc-200 dark:border-zinc-800 pb-4">
              <h2 className="text-2xl font-extrabold text-zinc-950 dark:text-white tracking-tight flex items-center gap-2.5">
                <BookOpen className="h-6 w-6 text-emerald-500" />
                Articles Written by Om K.
              </h2>
            </div>

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
