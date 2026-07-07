/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as React from "react";
import Link from "next/link";
import { allCalculators, categories } from "@/data/calculators";
import { blogPosts } from "@/data/blog/posts";
import { Search, ChevronRight, TrendingUp, Calendar, ShieldCheck, Percent, FileText, BarChart3, Coins, Activity, Flame, Clock, BookOpen, Sparkles, UserCheck, Zap } from "lucide-react";
import { homepageConfig } from "@/config/homepage";

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

const credibilityIconMap: Record<string, React.ComponentType<any>> = {
  Sparkles,
  UserCheck,
  ShieldCheck,
  Zap,
  BookOpen,
  TrendingUp,
};

const trendingIds = [
  "sip-calculator",
  "compound-interest-calculator",
  "retirement-calculator",
  "emi-calculator",
  "investment-growth-calculator",
  "net-worth-calculator",
];

const semanticKeywordsMap: Record<string, string[]> = {
  "sip-calculator": ["sip", "mutual fund", "monthly investment", "compound interest", "wealth", "money", "grow", "saving", "investing"],
  "lumpsum-calculator": ["lumpsum", "mutual fund", "one time investment", "compound", "wealth", "money", "saving", "investing"],
  "mutual-fund-return-calculator": ["mutual fund", "returns", "sip", "lumpsum", "compound", "wealth", "money", "investing"],
  "cagr-calculator": ["cagr", "annual growth rate", "compound interest", "stock returns", "mutual fund returns", "investment math", "money"],
  "xirr-calculator": ["xirr", "irr", "internal rate of return", "sip returns", "mutual fund returns", "cash flow", "money"],
  "swp-calculator": ["swp", "systematic withdrawal plan", "pension", "monthly income", "retirement", "mutual fund", "money"],
  "goal-based-investment-calculator": ["goal", "target wealth", "plan savings", "future cost", "house", "car", "education", "money"],
  "sip-goal-planner": ["sip goal", "goal planner", "target amount", "reverse sip", "cost of delay", "monthly investment needed", "money", "investing"],
  "retirement-calculator": ["retirement", "pension", "old age savings", "fire", "retirement corpus", "money", "savings"],
  "fire-calculator": ["fire", "financial independence retire early", "financial freedom", "retirement", "passive income", "money"],
  "net-worth-calculator": ["net worth", "assets", "liabilities", "wealth", "debt", "balance sheet", "money", "property", "house"],
  "how-long-until-1-crore": ["1 crore", "crore", "target wealth", "milestone", "crorepath", "money", "savings"],
  "inflation-impact-calculator": ["inflation", "purchasing power", "cost of living", "future value of money", "price rise", "money"],
  "financial-freedom-calculator": ["financial freedom", "fire", "passive income", "retirement", "wealth target", "money"],
  "emi-calculator": ["emi", "loan emi", "home loan", "house loan", "car loan", "vehicle loan", "personal loan", "interest", "mortgage", "bank"],
  "loan-prepayment-calculator": ["prepayment", "loan closure", "save interest", "home loan", "house loan", "car loan", "debt payoff"],
  "fd-calculator": ["fd", "fixed deposit", "bank deposit", "guaranteed interest", "savings", "safe investment", "money"],
  "rd-calculator": ["rd", "recurring deposit", "monthly savings", "bank deposit", "guaranteed interest", "money"],
  "ppf-calculator": ["ppf", "public provident fund", "tax free savings", "government scheme", "long term saving", "money"],
  "epf-calculator": ["epf", "employee provident fund", "pf", "salary savings", "retirement", "government scheme", "money"],
  "nps-calculator": ["nps", "national pension system", "pension", "retirement", "tax deduction", "government scheme", "money"],
  "stock-return-calculator": ["stock", "equity", "shares", "returns", "cagr", "market gains", "trading", "investing", "money"],
  "portfolio-return-calculator": ["portfolio", "stocks", "mutual funds", "returns", "weighted average", "investment gains", "money"],
  "dividend-yield-calculator": ["dividend", "passive income", "dividend yield", "stock income", "shares", "payout", "money"],
  "position-size-calculator": ["position size", "risk management", "stop loss", "trading size", "stocks", "forex", "money"],
  "income-tax-calculator": ["tax", "income tax", "salary tax", "slabs", "new tax regime", "old tax regime", "deductions", "government", "money"],
  "capital-gains-calculator": ["capital gains", "tax", "shares tax", "property tax", "house sale tax", "mutual fund tax", "money"],
  "gold-investment-calculator": ["gold", "physical gold", "sovereign gold bond", "sgb", "hedge", "inflation", "jewelry", "money"],
  "gold-sip-calculator": ["gold sip", "paper gold", "monthly gold savings", "gold ETF", "hedge", "inflation", "money"],
  "silver-investment-calculator": ["silver", "precious metal", "silver rate", "commodity", "inflation", "money"],
  "digital-gold-calculator": ["digital gold", "gold", "gst", "buy-sell spread", "safegold", "mmtc", "commodity", "money"],
  "compound-interest-calculator": ["compound interest", "interest", "compounding", "investment return", "savings", "grow wealth", "money"],
  "investment-growth-calculator": ["investment growth", "portfolio", "growth", "interest", "wealth forecast", "mutual fund", "stocks"],
  "financial-independence-calculator": ["financial independence", "fire", "retirement", "passive income", "savings", "early retirement", "swr"],
  "savings-calculator": ["savings", "savings compounding", "apy", "interest rate", "deposits", "emergency fund", "money"],
  "inflation-calculator": ["inflation", "inflation rate", "purchasing power", "future cost", "price rise", "loss to inflation"]
};

export function HomePageClient() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);

  // Filter calculators based on selected category & search query
  const filteredCalculators = React.useMemo(() => {
    return allCalculators.filter((calc) => {
      const matchesCategory =
        selectedCategory === null ||
        calc.category.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-") === selectedCategory;

      const calcKeywords = semanticKeywordsMap[calc.id] || [];
      const matchesSearch =
        calc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        calc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        calc.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        calcKeywords.some((keyword) => keyword.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (searchQuery.length >= 3 && (
          "wealthmaze".includes(searchQuery.toLowerCase()) ||
          "wealth".includes(searchQuery.toLowerCase()) ||
          "maze".includes(searchQuery.toLowerCase()) ||
          "weal".includes(searchQuery.toLowerCase())
        ));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Split into global and India-specific calculators
  const globalCalculators = React.useMemo(() => {
    return filteredCalculators.filter((calc) => !calc.isIndiaSpecific);
  }, [filteredCalculators]);

  const indiaCalculators = React.useMemo(() => {
    return filteredCalculators.filter((calc) => calc.isIndiaSpecific);
  }, [filteredCalculators]);

  // Find trending calculators objects
  const trendingCalculators = React.useMemo(() => {
    return trendingIds
      .map((id) => allCalculators.find((c) => c.id === id))
      .filter((c) => c !== undefined);
  }, []);

  // Get recent 3 blog posts
  const recentPosts = React.useMemo(() => {
    return [...blogPosts]
      .sort((a, b) => {
        const dateA = new Date(a.publishedAt).getTime();
        const dateB = new Date(b.publishedAt).getTime();
        return (isNaN(dateB) ? 0 : dateB) - (isNaN(dateA) ? 0 : dateA);
      })
      .slice(0, 3);
  }, []);

  return (
    <div className="relative min-h-screen bg-zinc-50/30 dark:bg-zinc-950/20">
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[450px] overflow-hidden -z-10 pointer-events-none opacity-40 dark:opacity-20">
        <div className="absolute -top-[100px] left-[10%] w-[350px] h-[350px] rounded-full bg-emerald-300 blur-[80px] dark:bg-emerald-950/40" />
        <div className="absolute -top-[120px] right-[15%] w-[400px] h-[400px] rounded-full bg-indigo-300 blur-[100px] dark:bg-indigo-950/40" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {/* Hero Section */}
        <section className="text-center max-w-3xl mx-auto space-y-6 pt-4">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-zinc-950 dark:text-white leading-tight">
            Every Financial Calculator <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-emerald-500 to-indigo-500 bg-clip-text text-transparent">
              You Need. In One Place.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-zinc-500 dark:text-zinc-400 leading-relaxed">
            Plan investments, calculate returns, track wealth growth and make smarter financial decisions with our simple, accurate, and lightning-fast tools.
          </p>

          {/* Premium Trust Badge */}
          <div className="flex items-center justify-center pt-2">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-500/5 dark:bg-emerald-500/10 border border-emerald-500/20 rounded-full text-xs font-bold text-emerald-600 dark:text-emerald-450 shadow-2xs">
              <ShieldCheck className="h-3.5 w-3.5 shrink-0" />
              <span>{homepageConfig.trustBadge.text}</span>
            </div>
          </div>

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

          {/* Compact Financial Health Score Banner (Note 4) */}
          <div className="pt-2 max-w-2xl mx-auto">
            <div className="p-3 bg-gradient-to-r from-emerald-500/10 via-indigo-500/10 to-emerald-500/10 border border-emerald-500/30 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 shadow-sm hover:border-emerald-500 transition-all">
              <div className="flex items-center space-x-2 text-left">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                <span className="text-xs font-extrabold text-zinc-800 dark:text-zinc-200 leading-tight">
                  How financially healthy are you? Take the 3-minute quiz → Get your free score out of 100.
                </span>
              </div>
              <Link
                href="/financial-health-score"
                className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs font-extrabold shrink-0 shadow-sm transition-all flex items-center space-x-1"
              >
                <span>Take Quiz</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* Trending Calculators Section */}
        {!searchQuery && !selectedCategory && (
          <section className="space-y-6">
            <div className="flex items-center space-x-2 border-b border-zinc-100 dark:border-zinc-900 pb-3">
              <Flame className="h-5 w-5 text-amber-500 animate-pulse" />
              <h2 className="text-lg font-bold text-zinc-900 dark:text-white tracking-tight">
                Trending Calculators
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {trendingCalculators.map((calc) => {
                if (!calc) return null;
                return (
                  <Link
                    key={calc.id}
                    href={`/${calc.id}`}
                    className="p-4 bg-white dark:bg-zinc-950 border border-zinc-150 dark:border-zinc-800 rounded-2xl shadow-sm dark:shadow-none hover:border-emerald-500/50 dark:hover:border-emerald-500/50 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
                  >
                    <span className="text-[9px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest block mb-2">
                      {calc.category}
                    </span>
                    <h3 className="text-xs font-bold text-zinc-800 dark:text-zinc-150 group-hover:text-emerald-500 leading-tight">
                      {calc.name}
                    </h3>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* Featured Categories Grid */}
        {!searchQuery && (
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
        )}

        {/* Credibility Grid Section */}
        {!searchQuery && !selectedCategory && (
          <section className="space-y-8 pt-4">
            <div className="text-center max-w-3xl mx-auto space-y-2.5">
              <h2 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight">
                {homepageConfig.credibility.title}
              </h2>
              <p className="text-xs text-zinc-550 dark:text-zinc-400">
                {homepageConfig.credibility.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {homepageConfig.credibility.cards.map((card, idx) => {
                const Icon = credibilityIconMap[card.iconName] || ShieldCheck;
                return (
                  <div
                    key={idx}
                    className="p-5 bg-white dark:bg-zinc-950 border border-zinc-150 dark:border-zinc-800/80 rounded-2xl shadow-sm dark:shadow-none hover:border-emerald-500/50 dark:hover:border-emerald-500/50 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex flex-col space-y-3"
                  >
                    <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 text-emerald-500 flex items-center justify-center shrink-0">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-sm font-bold text-zinc-850 dark:text-zinc-100">
                        {card.title}
                      </h3>
                      <p className="text-xs text-zinc-450 dark:text-zinc-550 leading-relaxed">
                        {card.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Learn & Guides Section (Recents / Popular) */}
        {!searchQuery && !selectedCategory && (
          <section className="space-y-6">
            <div className="flex justify-between items-end border-b border-zinc-100 dark:border-zinc-900 pb-3">
              <div className="flex items-center space-x-2">
                <BookOpen className="h-5 w-5 text-emerald-500" />
                <h2 className="text-lg font-bold text-zinc-900 dark:text-white tracking-tight">
                  Learn & Financial Guides
                </h2>
              </div>
              <Link
                href="/blog"
                className="text-xs font-semibold text-emerald-500 hover:text-emerald-600 transition-colors"
              >
                View All Articles &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recentPosts.map((post) => (
                <article
                  key={post.slug}
                  className="p-5 bg-white dark:bg-zinc-950 border border-zinc-150 dark:border-zinc-800 rounded-2xl shadow-sm dark:shadow-none hover:border-emerald-500/50 dark:hover:border-emerald-500/50 hover:shadow-md transition-all duration-200 flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2.5">
                    <div className="flex justify-between items-center text-[9px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
                      <span>{post.category}</span>
                      <span className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {post.readTime}
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-zinc-800 dark:text-zinc-150 leading-snug line-clamp-2">
                      <Link href={`/blog/${post.slug}`} className="hover:text-emerald-500 transition-colors">
                        {post.title}
                      </Link>
                    </h3>
                    <p className="text-xs text-zinc-400 dark:text-zinc-500 line-clamp-2 leading-relaxed">
                      {post.description}
                    </p>
                  </div>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-xs font-bold text-emerald-500 hover:text-emerald-600 flex items-center justify-between pt-2 border-t border-zinc-100 dark:border-zinc-900"
                  >
                    <span>Read Article</span>
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* Calculator List Library */}
        <div className="space-y-12">
          {/* Global Financial Calculators */}
          <section className="space-y-6">
            <div className="flex items-center justify-between border-b border-zinc-150 dark:border-zinc-900 pb-3">
              <h2 className="text-lg font-bold text-zinc-900 dark:text-white tracking-tight">
                {searchQuery || selectedCategory
                  ? `Global Financial Calculators (${globalCalculators.length})`
                  : `Global Financial Calculators Directory (${globalCalculators.length})`}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {globalCalculators.map((calc) => (
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

              {globalCalculators.length === 0 && (
                <div className="col-span-full text-center py-8 bg-white dark:bg-zinc-950 border border-zinc-150 dark:border-zinc-800 rounded-2xl text-sm text-zinc-400">
                  No global calculators match your criteria.
                </div>
              )}
            </div>
          </section>

          {/* India-Specific Financial Tools */}
          <section className="space-y-6 pt-8 border-t border-zinc-200/50 dark:border-zinc-900">
            <div className="flex flex-col space-y-1 pb-3 border-b border-zinc-150 dark:border-zinc-900">
              <div className="flex items-center space-x-2">
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500 text-white font-bold text-[10px] shrink-0">i</span>
                <h2 className="text-lg font-bold text-zinc-900 dark:text-white tracking-tight">
                  {searchQuery || selectedCategory
                    ? `Indian Taxes & Savings Schemes Matches (${indiaCalculators.length})`
                    : `Indian Taxes & Savings Schemes (${indiaCalculators.length})`}
                </h2>
              </div>
              <p className="text-xs text-zinc-400 dark:text-zinc-500 leading-relaxed font-medium">
                These tools are tailored specifically to Indian tax structures (New/Old Slab regimes) and official savings schemes (PPF, EPF, NPS). They calculate strictly in Indian Rupees (INR/₹).
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {indiaCalculators.map((calc) => (
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

              {indiaCalculators.length === 0 && (
                <div className="col-span-full text-center py-8 bg-white dark:bg-zinc-950 border border-zinc-150 dark:border-zinc-800 rounded-2xl text-sm text-zinc-400">
                  No Indian calculators match your criteria.
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
