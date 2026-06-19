"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { allCalculators, getCalculatorById } from "@/data/calculators";
import { getPostBySlug } from "@/data/blog/posts";
import { getRelatedCalculators, getRelatedPostsForCalculator } from "@/data/internalLinks";
import { CalculatorForm } from "./CalculatorForm";
import { CalculatorResults } from "./CalculatorResults";
import { RelatedContent, SerializableCalc } from "./RelatedContent";
import { AdSlot } from "./AdSlot";
import Link from "next/link";
import { ChevronRight, ArrowLeft, Calendar, User, Eye, X } from "lucide-react";
import { siteConfig } from "@/config/site";
import { trackCalculatorUse } from "./GoogleAnalytics";

const CalculatorChart = dynamic(
  () => import("./CalculatorChart").then((mod) => mod.CalculatorChart),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-80 bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-150 dark:border-zinc-800 rounded-xl animate-pulse flex items-center justify-center text-xs font-bold text-zinc-400">
        Loading interactive chart data...
      </div>
    ),
  }
);

interface CalculatorPageProps {
  calculatorId: string;
  overrides?: Record<string, number>;
  customTitle?: string;
  customDescription?: string;
  customEducationalContent?: { title: string; content: string }[];
  isEmbed?: boolean;
}

// Helper to format values on the mobile sticky summary bar
const formatSummaryValue = (val: number, format?: string, unit?: string) => {
  if (isNaN(val)) return "₹0";
  if (format === "currency") {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(val);
  }
  if (format === "percent") {
    return `${val.toFixed(2)}%`;
  }
  if (format === "number") {
    return new Intl.NumberFormat("en-IN", {
      maximumFractionDigits: 2,
    }).format(val);
  }
  return `${val} ${unit || ""}`;
};

function CalculatorPageInner({
  calculatorId,
  overrides,
  customTitle,
  customDescription,
  customEducationalContent,
  isEmbed = false,
}: CalculatorPageProps) {
  const config = getCalculatorById(calculatorId)!;

  // Mobile sticky dismiss state
  const [isStickyDismissed, setIsStickyDismissed] = React.useState(false);

  // Initialize values with overrides or defaults
  const [values, setValues] = React.useState<Record<string, number>>(() =>
    config.inputs.reduce((acc, input) => {
      acc[input.id] = overrides && overrides[input.id] !== undefined ? overrides[input.id] : input.default;
      return acc;
    }, {} as Record<string, number>)
  );

  // Sync state if calculatorId or overrides change
  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlValues: Record<string, number> = {};
    let hasUrlParams = false;

    config.inputs.forEach((input) => {
      const v = params.get(input.id);
      if (v !== null) {
        urlValues[input.id] = Number(v);
        hasUrlParams = true;
      }
    });

    if (hasUrlParams) {
      setValues((prev) => ({ ...prev, ...urlValues }));
    } else {
      setValues(
        config.inputs.reduce((acc, input) => {
          acc[input.id] = overrides && overrides[input.id] !== undefined ? overrides[input.id] : input.default;
          return acc;
        }, {} as Record<string, number>)
      );
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [calculatorId, overrides]);

  React.useEffect(() => {
    trackCalculatorUse(calculatorId, config.name);
  }, [calculatorId, config.name]);

  // Run calculation dynamically
  const result = React.useMemo(() => {
    try {
      return config.calculate(values);
    } catch (err) {
      console.error("Calculation error:", err);
      return { values: {}, chartData: [] };
    }
  }, [config, values]);

  // Update URL search parameters and local state
  const handleValueChange = React.useCallback((id: string, val: number) => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      params.set(id, String(val));
      window.history.replaceState(null, "", `${window.location.pathname}?${params.toString()}`);
    }
    setValues((prev) => ({ ...prev, [id]: val }));
  }, []);

  // Related calculators using the internal link graph — serialized (no functions)
  const relatedCalculators = React.useMemo((): SerializableCalc[] => {
    const ids = getRelatedCalculators(calculatorId, allCalculators, 4);
    return ids
      .map((id) => allCalculators.find((c) => c.id === id))
      .filter(Boolean)
      .map((c) => ({ id: c!.id, name: c!.name, category: c!.category, description: c!.description }));
  }, [calculatorId]);

  // Related blog posts using the internal link graph
  const relatedArticles = React.useMemo(() => {
    const slugs = getRelatedPostsForCalculator(calculatorId, 4);
    return slugs.map((slug) => getPostBySlug(slug)).filter(Boolean) as NonNullable<ReturnType<typeof getPostBySlug>>[];
  }, [calculatorId]);

  const lastUpdated = "June 18, 2026";
  const displayTitle = customTitle || config.name;
  const displayDescription = customDescription || config.description;
  const displayEducationalContent = customEducationalContent || config.educationalContent;

  // Find primary output to show in sticky bottom bar for mobile
  const primaryOutput = React.useMemo(() => {
    return (
      config.outputs.find(
        (out) =>
          out.id.toLowerCase().includes("total") ||
          out.id.toLowerCase().includes("maturity") ||
          out.id.toLowerCase().includes("corpus") ||
          out.id.toLowerCase().includes("worth") ||
          out.id.toLowerCase().includes("emi")
      ) || config.outputs[0]
    );
  }, [config]);

  if (isEmbed) {
    return (
      <div className="w-full p-4 space-y-4 print:p-0">
        <header className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-900">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-black tracking-tight text-emerald-500">WealthMaze</span>
            <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300">/ {displayTitle}</span>
          </div>
          <Link
            href={`${siteConfig.url}/${config.id}`}
            target="_blank"
            rel="noopener"
            className="text-[10px] font-bold text-emerald-500 hover:underline"
          >
            Full Version
          </Link>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
          {/* Left Side: Inputs */}
          <div className="lg:col-span-5 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 p-4 rounded-2xl shadow-sm dark:shadow-none">
            <CalculatorForm inputs={config.inputs} values={values} onChange={handleValueChange} />
          </div>

          {/* Right Side: Charts & Results */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 p-4 rounded-2xl shadow-sm dark:shadow-none space-y-4">
              <CalculatorResults outputs={config.outputs} result={result} calculatorName={config.name} />
              <div className="pt-4 border-t border-zinc-100 dark:border-zinc-805">
                <CalculatorChart chartData={result.chartData} calculatorId={config.id} />
              </div>
            </div>
          </div>
        </div>

        <footer className="text-center pt-1 text-[9px] text-zinc-400">
          Calculators powered by{" "}
          <a
            href={siteConfig.url}
            target="_blank"
            rel="noopener"
            className="text-emerald-500 hover:underline font-semibold"
          >
            WealthMaze
          </a>
        </footer>
      </div>
    );
  }

  return (
    <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8 print:p-0 pb-20 md:pb-8">
      {/* Breadcrumbs */}
      <nav className="flex items-center space-x-2 text-xs font-semibold text-zinc-400 dark:text-zinc-500 print:hidden">
        <Link href="/" className="hover:text-zinc-600 dark:hover:text-zinc-300">
          Home
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="capitalize">{config.category}</span>
        <ChevronRight className="h-3 w-3" />
        <span className="text-zinc-600 dark:text-zinc-300">{displayTitle}</span>
      </nav>

      {/* Back Button */}
      <div className="print:hidden">
        <Link
          href="/"
          className="inline-flex items-center text-xs font-semibold text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
        >
          <ArrowLeft className="h-4 w-4 mr-1.5" />
          Back to Calculators
        </Link>
      </div>

      {/* Hero Header */}
      <header className="space-y-3">
        <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
          {displayTitle}
        </h1>
        <p className="text-base text-zinc-500 dark:text-zinc-400 max-w-3xl">
          {displayDescription}
        </p>
        <div className="flex flex-wrap gap-4 text-xs font-semibold text-zinc-400 dark:text-zinc-500 pt-1 print:hidden">
          <div className="flex items-center">
            <User className="h-3.5 w-3.5 mr-1" />
            <span>Reviewed by WealthMaze Finance Board</span>
          </div>
          <div className="flex items-center">
            <Calendar className="h-3.5 w-3.5 mr-1" />
            <span>Updated on {lastUpdated}</span>
          </div>
        </div>
      </header>

      {/* Main Responsive Page Layout Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        {/* Left Column (col-span-12 xl:col-span-9) */}
        <div className="col-span-12 xl:col-span-9 space-y-8">
          
          {/* Ad slot top (Mobile) */}
          <AdSlot position="top" />

          {/* Core Calculator Area */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Side: Inputs Container */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 p-4 sm:p-6 rounded-2xl shadow-sm dark:shadow-none space-y-6 print:border-none print:shadow-none print:p-0">
                <h2 className="text-lg font-bold text-zinc-900 dark:text-white border-b border-zinc-100 dark:border-zinc-800 pb-3">
                  Calculator Inputs
                </h2>
                <CalculatorForm inputs={config.inputs} values={values} onChange={handleValueChange} />

                {/* Disclaimer */}
                <div className="p-4 bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-100 dark:border-zinc-800/80 rounded-xl text-[11px] leading-relaxed text-zinc-400 dark:text-zinc-500 print:hidden">
                  <h3 className="font-bold text-zinc-500 dark:text-zinc-400 mb-1 uppercase tracking-wider">
                    Financial Disclaimer
                  </h3>
                  Information provided on WealthMaze is for educational purposes only. All return calculations are estimates based on user inputs. Not financial advice.
                </div>
              </div>

              {/* Desktop-only AD box below inputs to fill layout gaps next to the chart */}
              <AdSlot position="below-inputs" />
            </div>

            {/* Right Side: Charts & Results */}
            <div className="lg:col-span-7 space-y-6 print:w-full" id="calc-results-section">
              <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 p-4 sm:p-6 rounded-2xl shadow-sm dark:shadow-none space-y-6 print:border-none print:shadow-none print:p-0">
                <h2 className="text-lg font-bold text-zinc-900 dark:text-white border-b border-zinc-100 dark:border-zinc-800 pb-3">
                  Calculation Output & Analysis
                </h2>
                <CalculatorResults outputs={config.outputs} result={result} calculatorName={config.name} />

                <div className="hidden print:block text-[10px] text-zinc-400 mt-6 border-t pt-4">
                  Report generated via WealthMaze. Calculate your financial future at wealthmaze.com.
                </div>

                {/* Interactive Chart */}
                <div className="print:hidden pt-4 border-t border-zinc-100 dark:border-zinc-800">
                  <h3 className="text-sm font-bold text-zinc-800 dark:text-zinc-200 mb-4">
                    Visualizing Your Growth
                  </h3>
                  <CalculatorChart chartData={result.chartData} calculatorId={config.id} />
                </div>

                {/* Embed this Tool Section (Strategy B) */}
                <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 space-y-2.5 print:hidden">
                  <h3 className="text-xs font-bold text-zinc-855 dark:text-zinc-200 uppercase tracking-wider">
                    Embed this Calculator
                  </h3>
                  <p className="text-[11px] leading-relaxed text-zinc-400 dark:text-zinc-500">
                    Copy this clean widget code to embed this calculator directly on your website or blog:
                  </p>
                  <div className="relative">
                    <textarea
                      readOnly
                      value={`<iframe src="${siteConfig.url}/embed/${config.id}" width="100%" height="700" style="border:none; border-radius:12px; overflow:hidden;" scrolling="no"></iframe>\n<p style="text-align:center; font-size:10px; color:#a1a1aa;">Calculators powered by <a href="${siteConfig.url}" target="_blank" rel="noopener">WealthMaze</a></p>`}
                      className="w-full h-20 text-[10px] font-mono p-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-500 text-zinc-600 dark:text-zinc-400"
                      onClick={(e) => (e.target as HTMLTextAreaElement).select()}
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* AD 1: Below results summary */}
          <AdSlot position="below-results" />

          {/* Related Content / Recommendations (Moved to Upper Level!) */}
          <div className="pt-6 border-t border-zinc-200 dark:border-zinc-800">
            <RelatedContent
              calculators={relatedCalculators}
              posts={relatedArticles}
              layout="grid"
            />
          </div>

          {/* Explanation: Educational Guide */}
          <div className="prose prose-zinc dark:prose-invert max-w-none pt-6 border-t border-zinc-200 dark:border-zinc-800">
            <h2 className="text-2xl font-extrabold text-zinc-900 dark:text-white tracking-tight mb-4">
              Educational Guide
            </h2>
            <div className="space-y-6 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
              {displayEducationalContent.map((sec, idx) => (
                <div key={idx} className="space-y-2">
                  <h3 className="text-base font-bold text-zinc-800 dark:text-zinc-200">
                    {sec.title}
                  </h3>
                  <p className="whitespace-pre-line">{sec.content}</p>
                </div>
              ))}
            </div>
          </div>

          {/* AD 2: Below first content section */}
          <AdSlot position="below-content" />

          {/* FAQ Section */}
          {config.faqs.length > 0 && (
            <div className="space-y-4 pt-6 border-t border-zinc-200 dark:border-zinc-800">
              <h2 className="text-xl font-bold text-zinc-900 dark:text-white tracking-tight">
                Frequently Asked Questions (FAQ)
              </h2>
              <div className="space-y-4">
                {config.faqs.map((faq, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-zinc-50 dark:bg-zinc-900/30 border border-zinc-100 dark:border-zinc-800/80 rounded-xl"
                  >
                    <h4 className="font-bold text-zinc-800 dark:text-zinc-200 text-sm">
                      {faq.question}
                    </h4>
                    <p className="text-xs text-zinc-550 dark:text-zinc-400 mt-1.5 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* AD 3: Below FAQ */}
          <AdSlot position="below-faq" />

        </div>

        {/* Right Column: Sidebar (rendered only if enough width exists >= 1280px) */}
        <aside className="hidden xl:block xl:col-span-3 space-y-6 print:hidden">
          <AdSlot position="sidebar" />
        </aside>
      </div>

      {/* Mobile Sticky Results Summary (UX booster) */}
      {primaryOutput && !isStickyDismissed && (
        <div className="fixed bottom-14 left-0 right-0 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md border-t border-zinc-200 dark:border-zinc-900 pl-4 pr-10 py-3 shadow-lg z-40 flex items-center justify-between md:hidden animate-in slide-in-from-bottom duration-300">
          <div className="flex flex-col pr-2">
            <span className="text-[9px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider leading-none">
              Live {primaryOutput.label}
            </span>
            <span className="text-sm font-black text-emerald-600 dark:text-emerald-400 tracking-tight mt-1">
              {formatSummaryValue(
                result.values[primaryOutput.id] ?? 0,
                primaryOutput.format,
                primaryOutput.unit
              )}
            </span>
          </div>
          <button
            onClick={() => {
              const element = document.getElementById("calc-results-section");
              if (element) {
                element.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className="flex items-center space-x-1 px-2.5 h-8 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-[9px] uppercase tracking-wider rounded-lg transition-colors shrink-0"
          >
            <Eye className="h-3 w-3" />
            <span>Show Results</span>
          </button>
          <button
            onClick={() => setIsStickyDismissed(true)}
            className="absolute top-2.5 right-2 p-1.5 text-zinc-400 hover:text-zinc-650 dark:text-zinc-500 dark:hover:text-zinc-350 transition-colors focus:outline-none"
            aria-label="Dismiss summary"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}
    </article>
  );
}

export function CalculatorPage({
  calculatorId,
  overrides,
  customTitle,
  customDescription,
  customEducationalContent,
  isEmbed = false,
}: CalculatorPageProps) {
  const config = getCalculatorById(calculatorId);
  if (!config) {
    return <div className="p-8 text-center text-zinc-500">Calculator not found.</div>;
  }
  return (
    <CalculatorPageInner
      calculatorId={calculatorId}
      overrides={overrides}
      customTitle={customTitle}
      customDescription={customDescription}
      customEducationalContent={customEducationalContent}
      isEmbed={isEmbed}
    />
  );
}
