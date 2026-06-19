"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, Calculator, TrendingUp, Clock } from "lucide-react";
import { BlogPost } from "@/data/blog/posts";

/** Serializable subset of CalculatorConfig — safe to pass from Server → Client Components */
export interface SerializableCalc {
  id: string;
  name: string;
  category: string;
  description: string;
}

interface RelatedContentProps {
  /** Related calculator objects — serializable subset only (no functions) */
  calculators?: SerializableCalc[];
  /** Related blog post objects */
  posts?: BlogPost[];
  /** Section title override for calculators panel */
  calculatorHeading?: string;
  /** Section title override for posts panel */
  postHeading?: string;
  /** Layout: 'sidebar' (stacked column) or 'grid' (inline row for bottom-of-page) */
  layout?: "sidebar" | "grid";
}

const categoryColors: Record<string, string> = {
  Investing: "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 border-emerald-100 dark:border-emerald-900/30",
  Loans: "bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-400 border-blue-100 dark:border-blue-900/30",
  Tax: "bg-orange-50 dark:bg-orange-950/30 text-orange-700 dark:text-orange-400 border-orange-100 dark:border-orange-900/30",
  Savings: "bg-violet-50 dark:bg-violet-950/30 text-violet-700 dark:text-violet-400 border-violet-100 dark:border-violet-900/30",
  "Stock Market": "bg-rose-50 dark:bg-rose-950/30 text-rose-700 dark:text-rose-400 border-rose-100 dark:border-rose-900/30",
  Gold: "bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400 border-amber-100 dark:border-amber-900/30",
  Retirement: "bg-cyan-50 dark:bg-cyan-950/30 text-cyan-700 dark:text-cyan-400 border-cyan-100 dark:border-cyan-900/30",
  Lifestyle: "bg-pink-50 dark:bg-pink-950/30 text-pink-700 dark:text-pink-400 border-pink-100 dark:border-pink-900/30",
};

function CalcCard({ calc }: { calc: SerializableCalc }) {
  const colorClass = categoryColors[calc.category] ?? categoryColors["Investing"];
  return (
    <Link
      href={`/${calc.id}`}
      className="group flex items-start gap-3 p-3.5 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl hover:border-emerald-400/70 dark:hover:border-emerald-500/50 hover:shadow-sm transition-all duration-200"
    >
      <div className="flex-shrink-0 mt-0.5">
        <div className="h-7 w-7 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 flex items-center justify-center">
          <Calculator className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-xs font-bold text-zinc-800 dark:text-zinc-200 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-1">
          {calc.name}
        </div>
        <div className="text-[10px] text-zinc-400 dark:text-zinc-500 mt-0.5 line-clamp-2 leading-relaxed">
          {calc.description}
        </div>
        <span className={`inline-flex items-center mt-1.5 px-1.5 py-0.5 rounded text-[9px] font-bold border ${colorClass}`}>
          {calc.category}
        </span>
      </div>
      <ArrowRight className="flex-shrink-0 h-3.5 w-3.5 text-zinc-300 dark:text-zinc-700 group-hover:text-emerald-500 transition-colors mt-1" />
    </Link>
  );
}

function PostCard({ post }: { post: BlogPost }) {
  const colorClass = categoryColors[post.category] ?? categoryColors["Investing"];
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex items-start gap-3 p-3.5 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl hover:border-indigo-400/70 dark:hover:border-indigo-500/50 hover:shadow-sm transition-all duration-200"
    >
      <div className="flex-shrink-0 mt-0.5">
        <div className="h-7 w-7 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 flex items-center justify-center">
          <BookOpen className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-xs font-bold text-zinc-800 dark:text-zinc-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2 leading-tight">
          {post.title}
        </div>
        <div className="flex items-center gap-2 mt-1.5">
          <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-bold border ${colorClass}`}>
            {post.category}
          </span>
          <span className="flex items-center text-[10px] text-zinc-400 dark:text-zinc-500">
            <Clock className="h-2.5 w-2.5 mr-0.5" />
            {post.readTime}
          </span>
        </div>
      </div>
      <ArrowRight className="flex-shrink-0 h-3.5 w-3.5 text-zinc-300 dark:text-zinc-700 group-hover:text-indigo-500 transition-colors mt-1" />
    </Link>
  );
}

/**
 * RelatedContent component — renders related calculators and/or blog posts.
 * Used by CalculatorPage (sidebar layout) and blog article pages (grid layout).
 */
export function RelatedContent({
  calculators = [],
  posts = [],
  calculatorHeading = "Related Calculators",
  postHeading = "Related Articles & Guides",
  layout = "sidebar",
}: RelatedContentProps) {
  const hasCalculators = calculators.length > 0;
  const hasPosts = posts.length > 0;

  if (!hasCalculators && !hasPosts) return null;

  if (layout === "grid") {
    // Bottom-of-page full-width grid layout
    return (
      <section className="mt-10 pt-8 border-t border-zinc-200 dark:border-zinc-800 space-y-8">
        {hasPosts && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-indigo-500" />
              <h2 className="text-base font-extrabold text-zinc-900 dark:text-white tracking-tight">
                {postHeading}
              </h2>
              <span className="ml-1 px-1.5 py-0.5 bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/30 text-[10px] font-bold rounded">
                {posts.length}
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {posts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          </div>
        )}

        {hasCalculators && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-emerald-500" />
              <h2 className="text-base font-extrabold text-zinc-900 dark:text-white tracking-tight">
                {calculatorHeading}
              </h2>
              <span className="ml-1 px-1.5 py-0.5 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/30 text-[10px] font-bold rounded">
                {calculators.length}
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {calculators.map((calc) => (
                <CalcCard key={calc.id} calc={calc} />
              ))}
            </div>
          </div>
        )}
      </section>
    );
  }

  // Sidebar stacked layout (default)
  return (
    <div className="space-y-6">
      {hasPosts && (
        <div className="bg-zinc-50 dark:bg-zinc-900/30 border border-zinc-100 dark:border-zinc-800/80 p-5 rounded-2xl space-y-3">
          <div className="flex items-center gap-2 border-b border-zinc-150 dark:border-zinc-800 pb-2.5">
            <BookOpen className="h-3.5 w-3.5 text-indigo-500" />
            <h3 className="text-xs font-black text-zinc-900 dark:text-white uppercase tracking-wider">
              {postHeading}
            </h3>
          </div>
          <div className="space-y-2">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      )}

      {hasCalculators && (
        <div className="bg-zinc-50 dark:bg-zinc-900/30 border border-zinc-100 dark:border-zinc-800/80 p-5 rounded-2xl space-y-3">
          <div className="flex items-center gap-2 border-b border-zinc-150 dark:border-zinc-800 pb-2.5">
            <Calculator className="h-3.5 w-3.5 text-emerald-500" />
            <h3 className="text-xs font-black text-zinc-900 dark:text-white uppercase tracking-wider">
              {calculatorHeading}
            </h3>
          </div>
          <div className="space-y-2">
            {calculators.map((calc) => (
              <CalcCard key={calc.id} calc={calc} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
