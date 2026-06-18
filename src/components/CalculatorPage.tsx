"use client";

import * as React from "react";
import { allCalculators, getCalculatorById } from "@/data/calculators";
import { getPostsByCalculatorId } from "@/data/blog/posts";
import { CalculatorForm } from "./CalculatorForm";
import { CalculatorChart } from "./CalculatorChart";
import { CalculatorResults } from "./CalculatorResults";
import { AdSlot } from "./AdSlot";
import Link from "next/link";
import { ChevronRight, ArrowLeft, Calendar, User } from "lucide-react";

interface CalculatorPageProps {
  calculatorId: string;
  overrides?: Record<string, number>;
  customTitle?: string;
  customDescription?: string;
  customEducationalContent?: { title: string; content: string }[];
}

function CalculatorPageInner({
  calculatorId,
  overrides,
  customTitle,
  customDescription,
  customEducationalContent,
}: CalculatorPageProps) {
  const config = getCalculatorById(calculatorId)!;

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
      // Reinitialize default values (or overrides) when calculatorId changes
      setValues(
        config.inputs.reduce((acc, input) => {
          acc[input.id] = overrides && overrides[input.id] !== undefined ? overrides[input.id] : input.default;
          return acc;
        }, {} as Record<string, number>)
      );
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [calculatorId, overrides]);

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

  // Find related calculators in the same category
  const relatedCalculators = React.useMemo(() => {
    return allCalculators
      .filter((c) => c.category === config.category && c.id !== config.id)
      .slice(0, 4);
  }, [config]);

  // Find related blog posts
  const relatedArticles = React.useMemo(() => {
    return getPostsByCalculatorId(calculatorId).slice(0, 4);
  }, [calculatorId]);

  const lastUpdated = "June 18, 2026";
  const displayTitle = customTitle || config.name;
  const displayDescription = customDescription || config.description;
  const displayEducationalContent = customEducationalContent || config.educationalContent;

  return (
    <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8 print:p-0">
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

      {/* Ad slot top (Mobile) */}
      <AdSlot position="top" />

      {/* Core Calculator Area */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Inputs */}
        <div className="lg:col-span-5 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 p-6 rounded-2xl shadow-sm dark:shadow-none space-y-6 print:border-none print:shadow-none print:p-0">
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

        {/* Right Side: Charts & Results */}
        <div className="lg:col-span-7 space-y-6 print:w-full">
          <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 p-6 rounded-2xl shadow-sm dark:shadow-none space-y-6 print:border-none print:shadow-none print:p-0">
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
          </div>
        </div>
      </section>

      {/* Mobile Mid Ad */}
      <AdSlot position="mid-content" />

      {/* Educational Guide + Related Articles/Calculators Sidebar */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-6 border-t border-zinc-200 dark:border-zinc-800 print:hidden">
        <div className="lg:col-span-8 space-y-6">
          <div className="prose prose-zinc dark:prose-invert max-w-none">
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

          <AdSlot position="in-content" />

          {config.faqs.length > 0 && (
            <div className="space-y-4 pt-6 border-t border-zinc-100 dark:border-zinc-800">
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
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1.5 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <aside className="lg:col-span-4 space-y-6">
          {/* Related Articles */}
          {relatedArticles.length > 0 && (
            <div className="bg-zinc-50 dark:bg-zinc-900/30 border border-zinc-100 dark:border-zinc-800/80 p-5 rounded-2xl space-y-4">
              <h3 className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-wider">
                Related Articles & Guides
              </h3>
              <div className="space-y-3">
                {relatedArticles.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="block p-3.5 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl hover:border-emerald-500/50 dark:hover:border-emerald-500/50 transition-all group"
                  >
                    <div className="text-xs font-bold text-zinc-800 dark:text-zinc-200 group-hover:text-emerald-500 transition-colors line-clamp-2">
                      {post.title}
                    </div>
                    <div className="text-[10px] text-zinc-400 dark:text-zinc-500 mt-1.5 flex items-center justify-between">
                      <span>{post.category}</span>
                      <span>{post.readTime}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Related Calculators */}
          <div className="bg-zinc-50 dark:bg-zinc-900/30 border border-zinc-100 dark:border-zinc-800/80 p-5 rounded-2xl space-y-4">
            <h3 className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-wider">
              Related Calculators
            </h3>
            <div className="space-y-3">
              {relatedCalculators.map((c) => (
                <Link
                  key={c.id}
                  href={`/${c.id}`}
                  className="block p-3.5 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl hover:border-emerald-500/50 dark:hover:border-emerald-500/50 transition-all group"
                >
                  <div className="text-xs font-bold text-zinc-800 dark:text-zinc-200 group-hover:text-emerald-500 transition-colors">
                    {c.name}
                  </div>
                  <div className="text-[10px] text-zinc-400 dark:text-zinc-500 mt-1 line-clamp-2">
                    {c.description}
                  </div>
                </Link>
              ))}
              {relatedCalculators.length === 0 && (
                <div className="text-xs text-zinc-400 py-2">No related calculators available.</div>
              )}
            </div>
          </div>
        </aside>
      </section>
    </article>
  );
}

export function CalculatorPage({
  calculatorId,
  overrides,
  customTitle,
  customDescription,
  customEducationalContent,
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
    />
  );
}
