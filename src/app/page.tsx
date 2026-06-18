"use client";

import * as React from "react";
import Link from "next/link";
import { allCalculators, categories } from "@/data/calculators";
import { Search, ChevronRight, TrendingUp, Calendar, ShieldCheck, Percent, FileText, BarChart3, Coins, Activity, Sparkles } from "lucide-react";

// Map category string to Lucide icon components dynamically
const iconMap: Record<string, React.ComponentType<any>> = {
  TrendingUp: TrendingUp,
  Calendar: Calendar,
  ShieldCheck: ShieldCheck,
  Percent: Percent,
  FileText: FileText,
  BarChart3: BarChart3,
  Coins: Coins,
  Activity: Activity,
};

export default function HomePage() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);

  // Filter calculators based on selected category & search query
  const filteredCalculators = React.useMemo(() => {
    return allCalculators.filter((calc) => {
      const matchesCategory =
        selectedCategory === null ||
        calc.category.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-") === selectedCategory;

      const matchesSearch =
        calc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        calc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        calc.category.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="relative min-h-screen bg-zinc-50/30 dark:bg-zinc-950/20">
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[450px] overflow-hidden -z-10 pointer-events-none opacity-40 dark:opacity-20">
        <div className="absolute -top-[100px] left-[10%] w-[350px] h-[350px] rounded-full bg-emerald-300 blur-[80px] dark:bg-emerald-950/40" />
        <div className="absolute -top-[120px] right-[15%] w-[400px] h-[400px] rounded-full bg-indigo-300 blur-[100px] dark:bg-indigo-950/40" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* Hero Section */}
        <section className="text-center max-w-3xl mx-auto space-y-6 pt-4">
          <div className="inline-flex items-center gap-1.5 px-3 h-7 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-full text-xs font-semibold">
            <Sparkles className="h-3 w-3" />
            <span>Introducing WealthMaze v1.0</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-zinc-950 dark:text-white leading-tight">
            Every Financial Calculator <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-emerald-500 to-indigo-500 bg-clip-text text-transparent">
              You Need. In One Place.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-zinc-500 dark:text-zinc-400 leading-relaxed">
            Plan investments, calculate returns, track wealth growth and make smarter financial decisions with our simple, accurate, and lightning-fast tools.
          </p>

          {/* Interactive Search Bar */}
          <div className="relative max-w-xl mx-auto pt-2">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-zinc-400 dark:text-zinc-600" />
            </div>
            <input
              type="text"
              placeholder="Search calculators (e.g. SIP, EMI, Income Tax)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-14 pl-12 pr-4 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl text-base text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 shadow-sm transition-all"
            />
          </div>
        </section>

        {/* Featured Categories Grid */}
        <section className="space-y-6">
          <div className="flex justify-between items-end border-b border-zinc-100 dark:border-zinc-900 pb-3">
            <h2 className="text-lg font-bold text-zinc-900 dark:text-white tracking-tight">
              Browse by Financial Need
            </h2>
            {selectedCategory && (
              <button
                onClick={() => setSelectedCategory(null)}
                className="text-xs font-semibold text-emerald-500 hover:text-emerald-600 focus:outline-none"
              >
                Clear Filter
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {categories.map((cat) => {
              const Icon = iconMap[cat.icon] || Activity;
              const catSlug = cat.slug;
              const isSelected = selectedCategory === catSlug;

              return (
                <button
                  key={cat.slug}
                  onClick={() => setSelectedCategory(isSelected ? null : catSlug)}
                  className={`flex flex-col items-center justify-center p-4 rounded-xl border text-center transition-all duration-200 group focus:outline-none ${
                    isSelected
                      ? "bg-emerald-500 border-emerald-500 text-white shadow-lg shadow-emerald-500/20"
                      : "bg-white dark:bg-zinc-950 border-zinc-150 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:border-emerald-500/50 dark:hover:border-emerald-500/50 hover:shadow-md hover:-translate-y-0.5"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center mb-2.5 transition-all ${
                      isSelected
                        ? "bg-white/20 text-white"
                        : "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-500 dark:text-emerald-400"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-bold tracking-tight">{cat.name}</span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Calculator List Library */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-900 pb-3">
            <h2 className="text-lg font-bold text-zinc-900 dark:text-white tracking-tight">
              {searchQuery || selectedCategory
                ? `Search Results (${filteredCalculators.length})`
                : `Calculators Directory (${allCalculators.length})`}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCalculators.map((calc) => (
              <Link
                key={calc.id}
                href={`/${calc.id}`}
                className="group p-5 bg-white dark:bg-zinc-950 border border-zinc-150 dark:border-zinc-800 rounded-2xl shadow-sm dark:shadow-none hover:border-emerald-500/50 dark:hover:border-emerald-500/50 hover:shadow-md transition-all duration-200"
              >
                <div className="flex justify-between items-start">
                  <span className="inline-flex items-center px-2.5 h-5 bg-zinc-50 dark:bg-zinc-900 text-[9px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider rounded-md">
                    {calc.category}
                  </span>
                  <ChevronRight className="h-4 w-4 text-zinc-300 dark:text-zinc-700 group-hover:translate-x-0.5 group-hover:text-emerald-500 transition-all" />
                </div>
                <h3 className="text-base font-bold text-zinc-800 dark:text-zinc-100 mt-3 group-hover:text-emerald-500 transition-colors">
                  {calc.name}
                </h3>
                <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-1.5 leading-relaxed line-clamp-2">
                  {calc.description}
                </p>
              </Link>
            ))}

            {filteredCalculators.length === 0 && (
              <div className="col-span-full text-center py-10 bg-white dark:bg-zinc-950 border border-zinc-150 dark:border-zinc-800 rounded-2xl text-sm text-zinc-400">
                No calculators matched your search query. Try searching for something else.
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
