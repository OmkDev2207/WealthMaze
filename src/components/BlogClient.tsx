"use client";

import * as React from "react";
import Link from "next/link";
import { BlogPost } from "@/data/blog/posts";
import { Search, Calendar, User, Clock, ArrowRight } from "lucide-react";

interface BlogClientProps {
  posts: BlogPost[];
}

export function BlogClient({ posts }: BlogClientProps) {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);

  // Get unique categories
  const categories = React.useMemo(() => {
    return Array.from(new Set(posts.map((p) => p.category)));
  }, [posts]);

  // Filter posts
  const filteredPosts = React.useMemo(() => {
    return posts.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory = selectedCategory === null || post.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [posts, searchQuery, selectedCategory]);

  return (
    <div className="space-y-8">
      {/* Search and Category Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-100 dark:border-zinc-900 pb-6">
        {/* Categories list */}
        <div className="flex flex-wrap gap-2 order-2 md:order-1">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              selectedCategory === null
                ? "bg-emerald-500 text-white shadow-sm"
                : "bg-zinc-50 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            }`}
          >
            All Categories
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? "bg-emerald-500 text-white shadow-sm"
                  : "bg-zinc-50 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-80 order-1 md:order-2">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-zinc-400 dark:text-zinc-600" />
          </div>
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-10 pl-9 pr-4 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-xs text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
          />
        </div>
      </div>

      {/* Grid of articles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map((post) => (
          <article
            key={post.slug}
            className="group flex flex-col bg-white dark:bg-zinc-950 border border-zinc-150 dark:border-zinc-800 rounded-2xl shadow-sm dark:shadow-none hover:border-emerald-500/50 dark:hover:border-emerald-500/50 hover:shadow-md transition-all duration-200"
          >
            <div className="p-5 flex-grow flex flex-col space-y-3">
              {/* Category & Read Time */}
              <div className="flex justify-between items-center text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
                <span>{post.category}</span>
                <span className="flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  {post.readTime}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-base font-bold text-zinc-900 dark:text-white group-hover:text-emerald-500 transition-colors line-clamp-2">
                <Link href={`/blog/${post.slug}`} className="focus:outline-none">
                  {post.title}
                </Link>
              </h3>

              {/* Description */}
              <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-3 leading-relaxed flex-grow">
                {post.description}
              </p>

              {/* Footer details */}
              <div className="pt-4 border-t border-zinc-100 dark:border-zinc-900 flex justify-between items-center text-xs text-zinc-400 dark:text-zinc-500">
                <span className="flex items-center">
                  <User className="h-3.5 w-3.5 mr-1" />
                  {post.author.name}
                </span>
                <span className="flex items-center">
                  <Calendar className="h-3.5 w-3.5 mr-1" />
                  {post.publishedAt}
                </span>
              </div>
            </div>
            {/* CTA bar */}
            <Link
              href={`/blog/${post.slug}`}
              className="px-5 py-3.5 bg-zinc-50 dark:bg-zinc-900/30 border-t border-zinc-100 dark:border-zinc-900 text-xs font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 flex items-center justify-between rounded-b-2xl group-hover:bg-zinc-50 dark:group-hover:bg-zinc-900/60 transition-colors"
            >
              <span>Read Full Article</span>
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </article>
        ))}

        {filteredPosts.length === 0 && (
          <div className="col-span-full text-center py-12 bg-white dark:bg-zinc-950 border border-zinc-150 dark:border-zinc-800 rounded-2xl text-sm text-zinc-400">
            No articles found matching your query.
          </div>
        )}
      </div>
    </div>
  );
}
