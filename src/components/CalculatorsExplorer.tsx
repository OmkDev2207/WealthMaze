"use client";

import * as React from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { allCalculators, categories } from "@/data/calculators";
import { 
  Search, 
  ChevronRight, 
  TrendingUp, 
  Calendar, 
  ShieldCheck, 
  Percent, 
  FileText, 
  BarChart3, 
  Coins, 
  Activity, 
  Sparkles, 
  X, 
  ArrowLeft
} from "lucide-react";

// Map category slug to Lucide icon components
const iconMap: Record<string, React.ComponentType<any>> = {
  "investing": TrendingUp,
  "retirement": Calendar,
  "savings": ShieldCheck,
  "loans": Percent,
  "tax": FileText,
  "stock-market": BarChart3,
  "gold": Coins,
  "lifestyle": Activity,
};

// Map calculator IDs to keywords for rich search matching
const semanticKeywordsMap: Record<string, string[]> = {
  "sip-calculator": ["sip", "mutual fund", "monthly investment", "compound interest", "wealth", "money", "grow", "saving", "investing"],
  "lumpsum-calculator": ["lumpsum", "mutual fund", "one time investment", "compound", "wealth", "money", "saving", "investing"],
  "mutual-fund-return-calculator": ["mutual fund", "returns", "sip", "lumpsum", "compound", "wealth", "money", "investing"],
  "cagr-calculator": ["cagr", "annual growth rate", "compound interest", "stock returns", "mutual fund returns", "investment math", "money"],
  "xirr-calculator": ["xirr", "irr", "internal rate of return", "sip returns", "mutual fund returns", "cash flow", "money"],
  "swp-calculator": ["swp", "systematic withdrawal plan", "pension", "monthly income", "retirement", "mutual fund", "money"],
  "goal-based-investment-calculator": ["goal", "target wealth", "plan savings", "future cost", "house", "car", "education", "money"],
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
  "compound-interest-calculator": ["compound interest", "interest", "compounding", "investment return", "savings", "grow wealth", "money"],
  "investment-growth-calculator": ["investment growth", "portfolio", "growth", "interest", "wealth forecast", "mutual fund", "stocks"],
  "financial-independence-calculator": ["financial independence", "fire", "retirement", "passive income", "savings", "early retirement", "swr"],
  "savings-calculator": ["savings", "savings compounding", "apy", "interest rate", "deposits", "emergency fund", "money"],
  "inflation-calculator": ["inflation", "inflation rate", "purchasing power", "future cost", "price rise", "loss to inflation"]
};

function CalculatorsExplorerInner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialCategory = searchParams.get("category");
  const initialSearch = searchParams.get("search");

  const [searchQuery, setSearchQuery] = React.useState(initialSearch || "");
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(initialCategory);

  // Sync category and search state with query parameter
  React.useEffect(() => {
    setSelectedCategory(searchParams.get("category"));
    setSearchQuery(searchParams.get("search") || "");
  }, [searchParams]);

  const handleCategorySelect = (slug: string | null) => {
    const params = new URLSearchParams(window.location.search);
    if (slug) {
      params.set("category", slug);
      router.push(`/calculators?${params.toString()}`);
    } else {
      params.delete("category");
      router.push(`/calculators`);
    }
  };

  // Filter logic
  const filteredCalculators = React.useMemo(() => {
    return allCalculators.filter((calc) => {
      const matchesCategory =
        !selectedCategory ||
        calc.category.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-") === selectedCategory.toLowerCase();

      const calcKeywords = semanticKeywordsMap[calc.id] || [];
      const matchesSearch =
        !searchQuery ||
        calc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        calc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        calc.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        calcKeywords.some((keyword) => keyword.toLowerCase().includes(searchQuery.toLowerCase()));

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

  return (
    <div className="relative min-h-screen bg-zinc-50/30 dark:bg-zinc-950/20 pb-20">
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[450px] overflow-hidden -z-10 pointer-events-none opacity-40 dark:opacity-20">
        <div className="absolute -top-[100px] left-[15%] w-[350px] h-[350px] rounded-full bg-emerald-300 blur-[80px] dark:bg-emerald-950/40" />
        <div className="absolute -top-[120px] right-[20%] w-[400px] h-[400px] rounded-full bg-indigo-300 blur-[100px] dark:bg-indigo-950/40" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        {/* Navigation Breadcrumbs & Back */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <nav className="flex flex-wrap items-center gap-y-1 gap-x-2 text-xs font-semibold text-zinc-400 dark:text-zinc-500">
            <Link href="/" className="hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-zinc-600 dark:text-zinc-300">Calculators Directory</span>
          </nav>
          <Link
            href="/"
            className="inline-flex items-center text-xs font-bold text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5 mr-1.5" />
            Back to Home
          </Link>
        </div>

        {/* Hero Header */}
        <header className="space-y-4 max-w-3xl">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-950 dark:text-white leading-tight">
            Financial Calculators Directory
          </h1>
          <p className="text-sm sm:text-base text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium">
            Choose from our comprehensive collection of calculators. Compare mutual fund growth, calculate EMIs, compare loan options, check capital gains slabs, and evaluate retirement target plans.
          </p>
        </header>

        {/* Search & Filter Bar */}
        <section className="bg-white dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800/85 p-4 sm:p-6 rounded-2xl shadow-sm dark:shadow-none space-y-6">
          {/* Search Inputs */}
          <div className="relative max-w-2xl">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-zinc-400 dark:text-zinc-600" />
            </div>
            <input
              type="text"
              placeholder="Search by name, category, or keyword (e.g. SIP, Tax, Home Loan)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-12 pl-11 pr-10 bg-zinc-50/50 dark:bg-zinc-900/40 border border-zinc-250/70 dark:border-zinc-800 rounded-xl text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-zinc-400 hover:text-zinc-655 dark:hover:text-zinc-350"
                aria-label="Clear search query"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Category Filter Buttons */}
          <div className="space-y-3">
            <h2 className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
              Filter by Category
            </h2>
            <div className="flex flex-wrap gap-2.5">
              <button
                onClick={() => handleCategorySelect(null)}
                className={`px-4 h-9 rounded-xl border text-xs font-bold transition-all focus:outline-none ${
                  !selectedCategory
                    ? "bg-emerald-500 border-emerald-500 text-white shadow-md shadow-emerald-500/15"
                    : "bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-650 dark:text-zinc-400 hover:border-emerald-500/40 hover:bg-white dark:hover:bg-zinc-950"
                }`}
              >
                All Categories ({allCalculators.length})
              </button>
              {categories.map((cat) => {
                const Icon = iconMap[cat.slug] || Activity;
                const isSelected = selectedCategory?.toLowerCase() === cat.slug.toLowerCase();
                const catCount = allCalculators.filter(
                  (c) => c.category.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-") === cat.slug
                ).length;

                return (
                  <button
                    key={cat.slug}
                    onClick={() => handleCategorySelect(isSelected ? null : cat.slug)}
                    className={`inline-flex items-center px-4 h-9 rounded-xl border text-xs font-bold transition-all focus:outline-none gap-2 ${
                      isSelected
                        ? "bg-emerald-500 border-emerald-500 text-white shadow-md shadow-emerald-500/15"
                        : "bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-655 dark:text-zinc-400 hover:border-emerald-500/40 hover:bg-white dark:hover:bg-zinc-950"
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    <span>{cat.name}</span>
                    <span className={`text-[10px] font-bold ${isSelected ? "text-emerald-100" : "text-zinc-400 dark:text-zinc-500"}`}>
                      ({catCount})
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Directory Grid */}
        <div className="space-y-12">
          {/* Global Financial Calculators */}
          <section className="space-y-6">
            <div className="flex items-center justify-between border-b border-zinc-150 dark:border-zinc-900 pb-3.5">
              <h2 className="text-lg font-extrabold text-zinc-900 dark:text-white tracking-tight">
                {selectedCategory 
                  ? `Global ${categories.find((c) => c.slug === selectedCategory)?.name || "Category"} Calculators` 
                  : "Global Financial Calculators"}
                <span className="ml-2 px-2.5 py-0.5 bg-zinc-100 dark:bg-zinc-900 text-xs font-semibold text-zinc-500 dark:text-zinc-400 rounded-full">
                  {globalCalculators.length}
                </span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {globalCalculators.map((calc) => {
                const Icon = iconMap[calc.category.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-")] || Activity;
                const inputPreview = calc.inputs.slice(0, 3).map((inp) => inp.label).join(", ");

                return (
                  <Link
                    key={calc.id}
                    href={`/${calc.id}`}
                    className="group relative flex flex-col justify-between p-5 bg-white dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800 rounded-2xl shadow-sm dark:shadow-none hover:border-emerald-500/60 dark:hover:border-emerald-500/60 hover:shadow-md transition-all duration-300"
                  >
                    <div className="space-y-4">
                      <div className="flex justify-between items-start">
                        <span className="inline-flex items-center gap-1.5 px-2.5 h-6 bg-zinc-50 dark:bg-zinc-900 text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest rounded-lg border border-zinc-100 dark:border-zinc-800/40">
                          <Icon className="h-3 w-3 text-emerald-500" />
                          {calc.category}
                        </span>
                        <div className="text-zinc-300 dark:text-zinc-800 group-hover:text-emerald-500 transition-colors">
                          <ChevronRight className="h-4.5 w-4.5 transform group-hover:translate-x-0.5 transition-all" />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <h3 className="text-base font-extrabold text-zinc-900 dark:text-white group-hover:text-emerald-500 transition-colors">
                          {calc.name}
                        </h3>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed line-clamp-2">
                          {calc.description}
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 pt-3.5 border-t border-zinc-100 dark:border-zinc-900/60 flex flex-col space-y-2">
                      <span className="text-[9px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
                        Key Inputs
                      </span>
                      <span className="text-[10px] text-zinc-500 dark:text-zinc-400 truncate leading-relaxed">
                        {inputPreview || "Standard financial options"}
                      </span>
                    </div>
                  </Link>
                );
              })}

              {globalCalculators.length === 0 && (
                <div className="col-span-full py-10 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-850 rounded-2xl text-center text-sm text-zinc-450 font-medium">
                  No global calculators match your criteria.
                </div>
              )}
            </div>
          </section>

          {/* India-Specific Financial Tools */}
          <section className="space-y-6 pt-8 border-t border-zinc-200/50 dark:border-zinc-900">
            <div className="flex flex-col space-y-1.5 pb-3.5 border-b border-zinc-150 dark:border-zinc-900">
              <div className="flex items-center space-x-2">
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500 text-white font-bold text-[10px] shrink-0">i</span>
                <h2 className="text-lg font-extrabold text-zinc-900 dark:text-white tracking-tight">
                  {selectedCategory 
                    ? `Indian ${categories.find((c) => c.slug === selectedCategory)?.name || "Category"} Tools` 
                    : "Indian Taxes & Savings Schemes"}
                  <span className="ml-2 px-2.5 py-0.5 bg-zinc-100 dark:bg-zinc-900 text-xs font-semibold text-zinc-500 dark:text-zinc-400 rounded-full">
                    {indiaCalculators.length}
                  </span>
                </h2>
              </div>
              <p className="text-xs text-zinc-400 dark:text-zinc-500 leading-relaxed font-medium">
                These tools are tailored specifically to Indian tax structures (New/Old Slab regimes) and official savings schemes (PPF, EPF, NPS). They calculate strictly in Indian Rupees (INR/₹).
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {indiaCalculators.map((calc) => {
                const Icon = iconMap[calc.category.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-")] || Activity;
                const inputPreview = calc.inputs.slice(0, 3).map((inp) => inp.label).join(", ");

                return (
                  <Link
                    key={calc.id}
                    href={`/${calc.id}`}
                    className="group relative flex flex-col justify-between p-5 bg-white dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800 rounded-2xl shadow-sm dark:shadow-none hover:border-emerald-500/60 dark:hover:border-emerald-500/60 hover:shadow-md transition-all duration-300"
                  >
                    <div className="space-y-4">
                      <div className="flex justify-between items-start">
                        <span className="inline-flex items-center gap-1.5 px-2.5 h-6 bg-zinc-50 dark:bg-zinc-900 text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest rounded-lg border border-zinc-100 dark:border-zinc-800/40">
                          <Icon className="h-3 w-3 text-emerald-500" />
                          {calc.category}
                        </span>
                        <div className="text-zinc-300 dark:text-zinc-800 group-hover:text-emerald-500 transition-colors">
                          <ChevronRight className="h-4.5 w-4.5 transform group-hover:translate-x-0.5 transition-all" />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <h3 className="text-base font-extrabold text-zinc-900 dark:text-white group-hover:text-emerald-500 transition-colors">
                          {calc.name}
                        </h3>
                        <p className="text-xs text-zinc-550 dark:text-zinc-400 leading-relaxed line-clamp-2">
                          {calc.description}
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 pt-3.5 border-t border-zinc-100 dark:border-zinc-900/60 flex flex-col space-y-2">
                      <span className="text-[9px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
                        Key Inputs
                      </span>
                      <span className="text-[10px] text-zinc-500 dark:text-zinc-400 truncate leading-relaxed">
                        {inputPreview || "Standard financial options"}
                      </span>
                    </div>
                  </Link>
                );
              })}

              {indiaCalculators.length === 0 && (
                <div className="col-span-full py-10 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-850 rounded-2xl text-center text-sm text-zinc-450 font-medium">
                  No Indian calculators match your criteria.
                </div>
              )}
            </div>
          </section>

          {/* Reset Filters when overall match is 0 */}
          {filteredCalculators.length === 0 && (
            <div className="py-16 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-850 rounded-2xl text-center space-y-3">
              <p className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">
                No calculators found matching your criteria.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  handleCategorySelect(null);
                }}
                className="px-4 h-9 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-450 font-bold text-xs rounded-xl hover:bg-emerald-500 hover:text-white transition-all focus:outline-none"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function CalculatorsExplorer() {
  return (
    <React.Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-zinc-50/30 dark:bg-zinc-950/20">
        <div className="text-center space-y-2.5">
          <div className="w-10 h-10 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin mx-auto" />
          <p className="text-xs font-bold text-zinc-400 dark:text-zinc-500">Loading calculator directory...</p>
        </div>
      </div>
    }>
      <CalculatorsExplorerInner />
    </React.Suspense>
  );
}
