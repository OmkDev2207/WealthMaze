"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronDown, BookOpen, TrendingUp, Calendar, ShieldCheck, Percent, FileText, BarChart3, Coins, Activity, Menu, X } from "lucide-react";

const categories = [
  {
    name: "Investing",
    slug: "sip-calculator", // Dynamic redirect to category featured tool
    desc: "Mutual funds, compounding, and SIP planners.",
    icon: TrendingUp,
  },
  {
    name: "Retirement",
    slug: "retirement-calculator",
    desc: "Early retirement plans & FIRE targets.",
    icon: Calendar,
  },
  {
    name: "Savings",
    slug: "fd-calculator",
    desc: "FD, RD, PPF, and savings growth.",
    icon: ShieldCheck,
  },
  {
    name: "Loans",
    slug: "emi-calculator",
    desc: "Calculate EMIs and interest timelines.",
    icon: Percent,
  },
  {
    name: "Tax",
    slug: "income-tax-calculator",
    desc: "Income tax slabs and capital gains.",
    icon: FileText,
  },
  {
    name: "Stock Market",
    slug: "stock-return-calculator",
    desc: "Dividend yield and CAGR returns.",
    icon: BarChart3,
  },
  {
    name: "Gold",
    slug: "gold-investment-calculator",
    desc: "Gold SIPs and Sovereign Gold Bonds.",
    icon: Coins,
  },
  {
    name: "Lifestyle",
    slug: "inflation-impact-calculator",
    desc: "Inflation timelines and financial freedom.",
    icon: Activity,
  },
];

export function HeaderNavigation() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  // Close menus on navigation
  const closeAll = () => {
    setIsOpen(false);
    setMobileMenuOpen(false);
  };

  return (
    <div className="flex items-center space-x-1 sm:space-x-4">
      {/* Desktop Navigation */}
      <nav className="hidden lg:flex items-center space-x-6 text-xs font-bold text-zinc-600 dark:text-zinc-300">
        <Link href="/" className="hover:text-emerald-500 transition-colors">
          Home
        </Link>

        {/* Dropdown Menu */}
        <div className="relative group">
          <button
            onClick={() => setIsOpen(!isOpen)}
            onMouseEnter={() => setIsOpen(true)}
            className="flex items-center space-x-1 hover:text-emerald-500 transition-colors focus:outline-none h-16"
            aria-expanded={isOpen}
            aria-haspopup="true"
            aria-controls="calculators-dropdown"
          >
            <span>Calculators</span>
            <ChevronDown className="h-3 w-3" />
          </button>

          {/* Mega Dropdown Panel */}
          {isOpen && (
            <div
              onMouseLeave={() => setIsOpen(false)}
              id="calculators-dropdown"
              role="menu"
              aria-label="Calculators Categories"
              className="absolute left-1/2 -translate-x-1/2 top-14 w-[560px] bg-white dark:bg-zinc-950 border border-zinc-150 dark:border-zinc-900 rounded-2xl shadow-xl p-5 grid grid-cols-2 gap-4 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
            >
              {categories.map((cat) => {
                const Icon = cat.icon;
                return (
                  <Link
                    key={cat.name}
                    href={`/${cat.slug}`}
                    onClick={closeAll}
                    className="flex items-start space-x-3 p-2.5 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-900/40 border border-transparent hover:border-zinc-100 dark:hover:border-zinc-800/50 transition-all group/item"
                  >
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 text-emerald-500 dark:text-emerald-400 flex items-center justify-center group-hover/item:bg-emerald-500 group-hover/item:text-white transition-colors">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="space-y-0.5">
                      <div className="text-[11px] font-bold text-zinc-800 dark:text-zinc-100 group-hover/item:text-emerald-500 transition-colors">
                        {cat.name}
                      </div>
                      <div className="text-[10px] text-zinc-400 dark:text-zinc-500 leading-normal line-clamp-1">
                        {cat.desc}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        <Link href="/blog" className="hover:text-emerald-500 transition-colors">
          Blog Hub
        </Link>
      </nav>

      <span className="hidden lg:inline-block h-4 w-[1px] bg-zinc-200 dark:bg-zinc-800" />

      {/* Featured Quick Link */}
      <Link
        href="/sip-calculator"
        className="hidden sm:inline-flex items-center justify-center px-4 h-9 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-xl text-xs font-semibold hover:bg-emerald-500 hover:text-white dark:hover:bg-emerald-500 dark:hover:text-white transition-all duration-200"
      >
        Featured SIP
      </Link>

      {/* Mobile Menu Toggle */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="lg:hidden p-2 text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200 focus:outline-none"
        aria-label="Toggle Menu"
      >
        {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="absolute left-0 right-0 top-16 bg-white dark:bg-zinc-950 border-b border-zinc-150 dark:border-zinc-900 shadow-xl p-5 lg:hidden z-40 max-h-[85vh] overflow-y-auto animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="space-y-6">
            {/* Core pages */}
            <div className="grid grid-cols-2 gap-3 pb-4 border-b border-zinc-100 dark:border-zinc-900">
              <Link
                href="/"
                onClick={closeAll}
                className="flex items-center justify-center h-10 bg-zinc-50 dark:bg-zinc-900/60 rounded-xl text-xs font-bold text-zinc-700 dark:text-zinc-300"
              >
                Home
              </Link>
              <Link
                href="/blog"
                onClick={closeAll}
                className="flex items-center justify-center h-10 bg-zinc-50 dark:bg-zinc-900/60 rounded-xl text-xs font-bold text-zinc-700 dark:text-zinc-300"
              >
                Blog Hub
              </Link>
            </div>

            {/* Calculators Categories */}
            <div className="space-y-3">
              <h4 className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
                Calculator Categories
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {categories.map((cat) => {
                  const Icon = cat.icon;
                  return (
                    <Link
                      key={cat.name}
                      href={`/${cat.slug}`}
                      onClick={closeAll}
                      className="flex items-center space-x-3 p-3 bg-zinc-50/50 dark:bg-zinc-900/20 border border-zinc-100 dark:border-zinc-900 rounded-xl hover:border-emerald-500/30 transition-all"
                    >
                      <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 text-emerald-500 flex items-center justify-center">
                        <Icon className="h-4 w-4" />
                      </div>
                      <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200">
                        {cat.name}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
