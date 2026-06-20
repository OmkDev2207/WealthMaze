import * as React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { BookOpen, Calculator, Sparkles, Shield, ChevronRight } from "lucide-react";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Free Personal Finance Resources & Calculators | WealthMaze",
  description: "Browse WealthMaze's free personal finance resource directory. Access interactive SIP calculators, EMI planners, retirement tools, and expert financial guides.",
  alternates: {
    canonical: `${siteConfig.url}/resources`,
  },
};

export default function ResourcesPage() {
  const guides = [
    { title: "Sovereign Gold Bonds vs Physical Gold", url: "/blog/sgb-vs-physical-gold", desc: "Understand tax implications, yield returns, and liquidity variances." },
    { title: "Emergency Fund Planning Guide", url: "/blog/emergency-fund-guide", desc: "Step-by-step instructions on compiling 6 months of expenses." },
    { title: "50/30/20 Budgeting Calculator Guide", url: "/blog/budget-rule-50-30-20", desc: "Structure your personal salary budget allocations." },
    { title: "Compounding Interest Mathematics", url: "/blog/compounding-explained", desc: "An in-depth review of compounding formulas and timeline growth." }
  ];

  const tools = [
    { title: "SIP Return Calculator", url: "/sip-calculator" },
    { title: "SIP Comparison Planner", url: "/sip-comparison-calculator" },
    { title: "Home Loan EMI Calculator", url: "/emi-calculator" },
    { title: "Loan Comparison Planner", url: "/loan-comparison-calculator" },
    { title: "Income Tax Regime Tool", url: "/income-tax-calculator" },
    { title: "FIRE Early Retirement Calculator", url: "/fire-calculator" }
  ];

  return (
    <div className="relative min-h-screen bg-zinc-50/30 dark:bg-zinc-950/20 py-12">
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[300px] overflow-hidden -z-10 pointer-events-none opacity-30 dark:opacity-10">
        <div className="absolute -top-[50px] left-[15%] w-[300px] h-[300px] rounded-full bg-emerald-300 blur-[85px]" />
        <div className="absolute -top-[50px] right-[20%] w-[350px] h-[350px] rounded-full bg-indigo-300 blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <header className="space-y-3 max-w-3xl">
          <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
            WealthMaze Resource Center
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
            Access our free library of financial planning assets, comparison calculators, tax calculators, and expert guides. Designed to build financial literacy and help you make smart money decisions.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Left: Guides & Tools */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Guides Section */}
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-emerald-500" />
                Featured Financial Guides
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {guides.map((g, i) => (
                  <div key={i} className="p-5 bg-white dark:bg-zinc-950 border border-zinc-150 dark:border-zinc-800 rounded-2xl shadow-sm space-y-2">
                    <h3 className="text-sm font-bold text-zinc-800 dark:text-zinc-200">
                      {g.title}
                    </h3>
                    <p className="text-xs text-zinc-450 dark:text-zinc-500 leading-relaxed">
                      {g.desc}
                    </p>
                    <Link href={g.url} className="text-xs font-bold text-emerald-500 hover:text-emerald-600 inline-flex items-center pt-2">
                      Read Guide <ChevronRight className="h-3.5 w-3.5 ml-0.5" />
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Tools Directories */}
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                <Calculator className="h-5 w-5 text-emerald-500" />
                Free Calculators & Planners
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {tools.map((t, i) => (
                  <Link key={i} href={t.url} className="p-3.5 bg-white dark:bg-zinc-950 border border-zinc-150 dark:border-zinc-800 rounded-xl hover:border-emerald-500/50 hover:shadow-md transition-all text-center">
                    <span className="text-xs font-bold text-zinc-700 dark:text-zinc-350">{t.title}</span>
                  </Link>
                ))}
              </div>
            </div>

          </div>

          {/* Right Sidebar: Backlink Asset Info */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-5 bg-white dark:bg-zinc-950 border border-zinc-150 dark:border-zinc-800 rounded-2xl space-y-4">
              <h3 className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest flex items-center gap-1.5">
                <Sparkles className="h-4 w-4 text-emerald-550" />
                Free Embed License
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                Are you a financial blogger, real estate agency, or advisor? You can embed any of our interactive tools on your website for free. 
              </p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed font-bold">
                Simply click &quot;Embed this Calculator&quot; below any tool to copy your iframe code.
              </p>
              <div className="p-3 bg-zinc-50 dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-800 rounded-xl text-[10px] text-zinc-400 font-mono leading-normal">
                {`<iframe src="${siteConfig.url}/embed/sip-calculator" width="100%" height="700" ...>`}
              </div>
            </div>

            <div className="p-5 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl space-y-2">
              <h4 className="text-xs font-bold text-emerald-600 dark:text-emerald-450 uppercase tracking-wider flex items-center gap-1.5">
                <Shield className="h-4 w-4" />
                Financial Board Approved
              </h4>
              <p className="text-[11px] leading-relaxed text-zinc-500 dark:text-zinc-400">
                All resource calculations, compounding rates, and loan amortizations conform to standard accounting principles, reviewed regularly by our editorial finance panel.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
