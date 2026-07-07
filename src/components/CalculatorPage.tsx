/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { allCalculators, getCalculatorById } from "@/data/calculators";
import { getPostBySlug } from "@/data/blog/posts";
import { getRelatedCalculators, getRelatedPostsForCalculator } from "@/data/internalLinks";
import { programmaticPages } from "@/data/programmatic";
import { CalculatorForm } from "./CalculatorForm";
import { XirrCalculatorForm } from "./XirrCalculatorForm";
import { CalculatorResults } from "./CalculatorResults";
import { RelatedContent, SerializableCalc } from "./RelatedContent";
import { AdSlot } from "./AdSlot";
import Link from "next/link";
import { ChevronRight, ArrowLeft, Calendar, User, Eye, X, Share2, Link2, Check, Code, Copy } from "lucide-react";
import { siteConfig } from "@/config/site";
import { trackCalculatorUse } from "./GoogleAnalytics";
import { useCurrency } from "@/lib/CurrencyContext";

/** Inline social share bar — shown in calculator hero headers */
function SocialShareBar({ title, slug }: { title: string; slug?: string }) {
  const [copied, setCopied] = React.useState(false);
  const [showEmbedModal, setShowEmbedModal] = React.useState(false);
  const [embedCopied, setEmbedCopied] = React.useState(false);
  // Use state for the URL so that SSR and initial client render match.
  // After mount, update to the real page URL (no hydration mismatch).
  const [pageUrl, setPageUrl] = React.useState(siteConfig.url);

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPageUrl(window.location.href);
  }, []);

  const handleCopy = React.useCallback(() => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, []);

  const encodedUrl = encodeURIComponent(pageUrl);
  const encodedTitle = encodeURIComponent(`${title} | WealthMaze`);

  return (
    <div className="flex items-center gap-1.5 print:hidden" aria-label="Share this calculator">
      <span className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mr-0.5 flex items-center gap-1">
        <Share2 className="h-3 w-3" /> Share
      </span>

      {/* X / Twitter */}
      <a
        href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on X (Twitter)"
        className="p-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5" aria-hidden="true">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </a>

      {/* WhatsApp */}
      <a
        href={`https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on WhatsApp"
        className="p-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>

      {/* LinkedIn */}
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on LinkedIn"
        className="p-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5" aria-hidden="true">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      </a>

      {/* Copy Link */}
      <button
        onClick={handleCopy}
        aria-label={copied ? "Link copied!" : "Copy link to clipboard"}
        className="p-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors"
      >
        {copied ? (
          <Check className="h-3.5 w-3.5 text-emerald-500" />
        ) : (
          <Link2 className="h-3.5 w-3.5" />
        )}
      </button>

      {/* Embed Widget Button */}
      {slug && (
        <>
          <button
            onClick={() => setShowEmbedModal(true)}
            aria-label="Embed this calculator on your site"
            className="p-1.5 px-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 text-indigo-600 dark:text-indigo-400 font-bold text-[11px] flex items-center gap-1 transition-colors border border-indigo-200/50 dark:border-indigo-800/40 ml-1"
          >
            <Code className="h-3.5 w-3.5" />
            <span>Embed</span>
          </button>

          {showEmbedModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
              <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 max-w-lg w-full shadow-2xl relative text-left space-y-4">
                <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
                      <Code className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-zinc-900 dark:text-white text-base">
                        Embed This Calculator
                      </h3>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">
                        Add {title} to your website or blog in 1 click!
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowEmbedModal(false)}
                    className="p-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider block">
                    Copy Embed Code (HTML / Iframe)
                  </label>
                  <div className="relative">
                    <textarea
                      readOnly
                      rows={4}
                      value={`<iframe src="${siteConfig.url}/embed/${slug}" width="100%" height="700" frameborder="0" style="border: 1px solid #e4e4e7; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);"></iframe>\n<p style="font-size: 12px; text-align: center; margin-top: 8px;"><a href="${siteConfig.url}/${slug}" target="_blank" rel="noopener noreferrer" style="color: #6366f1; text-decoration: none; font-weight: bold;">Powered by WealthMaze Financial Calculators</a></p>`}
                      className="w-full text-xs font-mono bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3 text-zinc-700 dark:text-zinc-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                    />
                  </div>
                </div>

                <div className="p-3 bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/30 rounded-xl text-xs text-indigo-900 dark:text-indigo-300 flex items-start gap-2">
                  <span className="font-bold text-indigo-600 dark:text-indigo-400">💡 SEO Benefit:</span>
                  <span>
                    Embedding this tool on your WordPress, Medium, or financial blog provides an interactive experience for your readers while keeping them on your page longer!
                  </span>
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    onClick={() => setShowEmbedModal(false)}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      const code = `<iframe src="${siteConfig.url}/embed/${slug}" width="100%" height="700" frameborder="0" style="border: 1px solid #e4e4e7; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);"></iframe>\n<p style="font-size: 12px; text-align: center; margin-top: 8px;"><a href="${siteConfig.url}/${slug}" target="_blank" rel="noopener noreferrer" style="color: #6366f1; text-decoration: none; font-weight: bold;">Powered by WealthMaze Financial Calculators</a></p>`;
                      navigator.clipboard.writeText(code).then(() => {
                        setEmbedCopied(true);
                        setTimeout(() => setEmbedCopied(false), 2000);
                      });
                    }}
                    className="px-5 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/20 flex items-center gap-1.5 transition-all"
                  >
                    {embedCopied ? (
                      <>
                        <Check className="h-4 w-4" />
                        <span>Copied to Clipboard!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" />
                        <span>Copy Iframe Code</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}


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

function DeferredChart({ chartData, calculatorId, isIndiaSpecific, resultValues }: { chartData: any[]; calculatorId: string; isIndiaSpecific?: boolean; resultValues?: Record<string, number> }) {
  const [isVisible, setIsVisible] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="w-full min-h-[320px] flex flex-col justify-center">
      {isVisible ? (
        <CalculatorChart chartData={chartData} calculatorId={calculatorId} isIndiaSpecific={isIndiaSpecific} resultValues={resultValues} />
      ) : (
        <div className="w-full h-80 bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-150 dark:border-zinc-800 rounded-xl animate-pulse flex items-center justify-center text-xs font-bold text-zinc-400">
          Loading interactive chart data...
        </div>
      )}
    </div>
  );
}

interface CalculatorPageProps {
  calculatorId: string;
  overrides?: Record<string, number>;
  customTitle?: string;
  customDescription?: string;
  customEducationalContent?: { title: string; content: string }[];
  isEmbed?: boolean;
  slug?: string;
}

function getCounterpartSlug(slug: string): { label: string; url: string } | null {
  if (slug === "sip-calculator") {
    return { label: "Lump sum", url: "/lumpsum-calculator" };
  }
  if (slug === "lumpsum-calculator") {
    return { label: "SIP", url: "/sip-calculator" };
  }
  if (slug.endsWith("-sip-calculator")) {
    const base = slug.replace("-sip-calculator", "");
    return { label: "Lump sum", url: `/${base}-lumpsum-calculator` };
  }
  if (slug.endsWith("-lumpsum-calculator")) {
    const base = slug.replace("-lumpsum-calculator", "");
    return { label: "SIP", url: `/${base}-sip-calculator` };
  }
  return null;
}

function DisclaimerBox({ isMutualFund, amcName }: { isMutualFund: boolean; amcName: string }) {
  return (
    <div className="p-4 bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-100 dark:border-zinc-800/80 rounded-xl text-[11px] leading-relaxed text-zinc-450 dark:text-zinc-500 space-y-3 print:hidden">
      <div>
        <h3 className="font-bold text-zinc-500 dark:text-zinc-400 mb-1 uppercase tracking-wider">
          Financial Disclaimer
        </h3>
        Information provided on WealthMaze is for educational purposes only. All return calculations are estimates based on user inputs. Not financial advice.
      </div>
      {isMutualFund && (
        <div className="pt-2.5 border-t border-zinc-200/50 dark:border-zinc-800/50">
          <h3 className="font-bold text-zinc-500 dark:text-zinc-400 mb-1 uppercase tracking-wider">
            Mutual Fund Disclaimer
          </h3>
          Mutual fund investments are subject to market risks. Read all scheme related documents carefully before investing. Past performance is not indicative of future returns.
        </div>
      )}
      {amcName && (
        <div className="pt-2.5 border-t border-zinc-200/50 dark:border-zinc-800/50">
          <h3 className="font-bold text-zinc-500 dark:text-zinc-400 mb-1 uppercase tracking-wider">
            Non-Affiliation Disclaimer
          </h3>
          This calculator is an independent educational tool and is not affiliated with, sponsored by, or endorsed by {amcName}. All trademarks and brand names belong to their respective owners.
        </div>
      )}
    </div>
  );
}

function CalculatorPageInner({
  calculatorId,
  overrides,
  customTitle,
  customDescription,
  customEducationalContent,
  isEmbed = false,
  slug,
}: CalculatorPageProps) {
  const config = getCalculatorById(calculatorId)!;
  const { formatCurrency, formatNumber } = useCurrency();
  const counterpart = slug ? getCounterpartSlug(slug) : null;
  const isSIPActive = slug ? (slug === "sip-calculator" || slug.endsWith("-sip-calculator")) : true;

  const isMutualFund =
    calculatorId === "sip-calculator" ||
    calculatorId === "lumpsum-calculator" ||
    calculatorId === "mutual-fund-return-calculator" ||
    calculatorId === "step-up-sip-calculator";

  let amcName = "";
  if (slug) {
    const amcNames: Record<string, string> = {
      sbi: "SBI Mutual Fund (State Bank of India)",
      hdfc: "HDFC Mutual Fund (HDFC Asset Management Company)",
      icici: "ICICI Prudential Mutual Fund",
      "nippon-india": "Nippon India Mutual Fund",
      axis: "Axis Mutual Fund",
      kotak: "Kotak Mahindra Mutual Fund",
      uti: "UTI Mutual Fund",
      "aditya-birla": "Aditya Birla Sun Life Mutual Fund",
      tata: "Tata Mutual Fund",
      "mirae-asset": "Mirae Asset Mutual Fund",
    };
    const matchKey = Object.keys(amcNames).find(
      (key) => slug.startsWith(`${key}-`)
    );
    if (matchKey) {
      amcName = amcNames[matchKey];
    }
  }

  const formatSummaryValue = React.useCallback((val: number, format?: string, unit?: string) => {
    if (isNaN(val)) return "0";
    if (format === "currency") {
      if (config.isIndiaSpecific) {
        return new Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "INR",
          maximumFractionDigits: 0,
        }).format(val);
      }
      return formatCurrency(val, true);
    }
    if (format === "percent") {
      return `${val.toFixed(2)}%`;
    }
    if (format === "number") {
      if (config.isIndiaSpecific) {
        return new Intl.NumberFormat("en-IN", {
          maximumFractionDigits: 2,
        }).format(val);
      }
      return formatNumber(val, 2);
    }
    let displayUnit = unit || "";
    if (displayUnit === "₹" && !config.isIndiaSpecific) {
      displayUnit = "";
    }
    return `${val} ${displayUnit}`;
  }, [config.isIndiaSpecific, formatCurrency, formatNumber]);

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
      // eslint-disable-next-line react-hooks/set-state-in-effect
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

  const inputsSummary = React.useMemo(() => {
    return config.inputs.map((inp) => {
      const val = values[inp.id] ?? 0;
      return {
        label: inp.label,
        value: formatSummaryValue(val, inp.unit === "₹" ? "currency" : inp.unit === "%" ? "percent" : "number", inp.unit),
      };
    });
  }, [config.inputs, values, formatSummaryValue]);

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
    const targetId = slug || calculatorId;
    const ids = getRelatedCalculators(targetId, allCalculators, 6);
    return ids
      .map((id) => {
        const calc = allCalculators.find((c) => c.id === id);
        if (calc) return { id: calc.id, name: calc.name, category: calc.category, description: calc.description };
        const prog = programmaticPages.find((p) => p.id === id);
        if (prog) {
          const parent = allCalculators.find((c) => c.id === prog.parentCalculatorId);
          return {
            id: prog.id,
            name: prog.name,
            category: parent?.category || "Investing",
            description: prog.seoDescription,
          };
        }
        return null;
      })
      .filter(Boolean) as SerializableCalc[];
  }, [calculatorId, slug]);

  // Related blog posts using the internal link graph
  const relatedArticles = React.useMemo(() => {
    const targetId = slug || calculatorId;
    const slugs = getRelatedPostsForCalculator(targetId, 4);
    return slugs.map((s) => getPostBySlug(s)).filter(Boolean) as NonNullable<ReturnType<typeof getPostBySlug>>[];
  }, [calculatorId, slug]);

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
          <div className="lg:col-span-5 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 p-4 rounded-2xl shadow-sm dark:shadow-none space-y-4">
            {counterpart && (
              <div className="flex p-1 bg-zinc-100 dark:bg-zinc-900 rounded-xl relative print:hidden">
                <Link
                  href={isSIPActive ? "#" : counterpart.url}
                  onClick={(e) => {
                    if (isSIPActive) {
                      e.preventDefault();
                    }
                  }}
                  className={`flex-1 text-center py-2 text-xs font-bold rounded-lg transition-all ${
                    isSIPActive
                      ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm"
                      : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300"
                  }`}
                >
                  SIP
                </Link>
                <Link
                  href={!isSIPActive ? "#" : counterpart.url}
                  onClick={(e) => {
                    if (!isSIPActive) {
                      e.preventDefault();
                    }
                  }}
                  className={`flex-1 text-center py-2 text-xs font-bold rounded-lg transition-all ${
                    !isSIPActive
                      ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm"
                      : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300"
                  }`}
                >
                  Lumpsum
                </Link>
              </div>
            )}
            {config.id === "xirr-calculator" ? (
              <XirrCalculatorForm values={values} onBatchChange={(newVals) => setValues((prev) => ({ ...prev, ...newVals }))} />
            ) : (
              <CalculatorForm inputs={config.inputs} values={values} onChange={handleValueChange} isIndiaSpecific={config.isIndiaSpecific} />
            )}
            <div className="mt-4">
              <DisclaimerBox isMutualFund={isMutualFund} amcName={amcName} />
            </div>
          </div>

          {/* Right Side: Charts & Results */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 p-4 rounded-2xl shadow-sm dark:shadow-none space-y-4">
              <CalculatorResults outputs={config.outputs} result={result} isIndiaSpecific={config.isIndiaSpecific} title={config.name} inputsSummary={inputsSummary} />
              <div className="pt-4 border-t border-zinc-100 dark:border-zinc-805">
                <DeferredChart chartData={result.chartData} calculatorId={config.id} isIndiaSpecific={config.isIndiaSpecific} resultValues={result.values} />
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
    <article className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 space-y-8 print:p-0 pb-20 md:pb-8">
      {/* Breadcrumbs */}
      <nav className="flex flex-wrap items-center gap-y-1 gap-x-2 text-xs font-semibold text-zinc-400 dark:text-zinc-500 print:hidden">
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
        <div className="flex flex-wrap items-center justify-between gap-4 pt-1 print:hidden">
          <div className="flex flex-wrap gap-4 text-xs font-semibold text-zinc-400 dark:text-zinc-500">
            <div className="flex items-center">
              <Calendar className="h-3.5 w-3.5 mr-1" />
              <span>Updated on {lastUpdated}</span>
            </div>
          </div>
          {/* Social Share Buttons */}
          <SocialShareBar title={displayTitle} />
        </div>
      </header>

      {config.isIndiaSpecific && (
        <div className="p-4 bg-emerald-500/5 dark:bg-emerald-550/5 border border-emerald-500/10 dark:border-emerald-950/20 rounded-2xl text-xs leading-relaxed text-zinc-600 dark:text-zinc-400 flex items-start gap-2.5 print:hidden font-medium">
          <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500 text-white font-bold shrink-0">i</span>
          <p>
            <strong>Indian Financial Tool:</strong> This calculator is tailored specifically to standard regulations, tax slabs, and savings schemes of India (e.g. PPF, EPF, NPS, or India Income Tax slabs) and computes outputs strictly in Indian Rupees (INR).
          </p>
        </div>
      )}

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
              <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 p-3.5 sm:p-6 rounded-2xl shadow-sm dark:shadow-none space-y-6 print:border-none print:shadow-none print:p-0">
                <h2 className="text-lg font-bold text-zinc-900 dark:text-white border-b border-zinc-100 dark:border-zinc-800 pb-3">
                  Calculator Inputs
                </h2>
                {counterpart && (
                  <div className="flex p-1 bg-zinc-100 dark:bg-zinc-900 rounded-xl relative mb-6 print:hidden">
                    <Link
                      href={isSIPActive ? "#" : counterpart.url}
                      onClick={(e) => {
                        if (isSIPActive) {
                          e.preventDefault();
                        }
                      }}
                      className={`flex-1 text-center py-2 text-xs font-bold rounded-lg transition-all ${
                        isSIPActive
                          ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm"
                          : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300"
                      }`}
                    >
                      SIP
                    </Link>
                    <Link
                      href={!isSIPActive ? "#" : counterpart.url}
                      onClick={(e) => {
                        if (!isSIPActive) {
                          e.preventDefault();
                        }
                      }}
                      className={`flex-1 text-center py-2 text-xs font-bold rounded-lg transition-all ${
                        !isSIPActive
                          ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm"
                          : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300"
                      }`}
                    >
                      Lumpsum
                    </Link>
                  </div>
                )}
                {config.id === "xirr-calculator" ? (
                  <XirrCalculatorForm values={values} onBatchChange={(newVals) => setValues((prev) => ({ ...prev, ...newVals }))} />
                ) : (
                  <CalculatorForm inputs={config.inputs} values={values} onChange={handleValueChange} isIndiaSpecific={config.isIndiaSpecific} />
                )}

                <DisclaimerBox isMutualFund={isMutualFund} amcName={amcName} />
              </div>

              {/* Desktop-only AD box below inputs to fill layout gaps next to the chart */}
              <AdSlot position="below-inputs" />
            </div>

            {/* Right Side: Charts & Results */}
            <div className="lg:col-span-7 space-y-6 print:w-full" id="calc-results-section">
              <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 p-3.5 sm:p-6 rounded-2xl shadow-sm dark:shadow-none space-y-6 print:border-none print:shadow-none print:p-0">
                <h2 className="text-lg font-bold text-zinc-900 dark:text-white border-b border-zinc-100 dark:border-zinc-800 pb-3">
                  Calculation Output & Analysis
                </h2>
                <CalculatorResults outputs={config.outputs} result={result} isIndiaSpecific={config.isIndiaSpecific} title={config.name} inputsSummary={inputsSummary} />

                <div className="hidden print:block text-[10px] text-zinc-400 mt-6 border-t pt-4">
                  Report generated via WealthMaze. Calculate your financial future at wealthmaze.in.
                </div>

                {/* Interactive Chart */}
                 <div className="print:hidden pt-4 border-t border-zinc-100 dark:border-zinc-800">
                  <h3 className="text-sm font-bold text-zinc-800 dark:text-zinc-200 mb-4">
                    Visualizing Your Growth
                  </h3>
                  <DeferredChart chartData={result.chartData} calculatorId={config.id} isIndiaSpecific={config.isIndiaSpecific} resultValues={result.values} />
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
              calculatorHeading="Related Calculators"
              postHeading="Educational Guides & Related Articles"
              layout="grid"
            />
          </div>

          {/* Explanation: Educational Guide */}
          <div className="prose prose-zinc dark:prose-invert max-w-none pt-6 border-t border-zinc-200 dark:border-zinc-800">
            <div className="space-y-8 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
              {displayEducationalContent.map((sec, idx) => (
                <div key={idx} className="space-y-3">
                  <h2 className="text-xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
                    {sec.title}
                  </h2>
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
                    <h3 className="font-bold text-zinc-800 dark:text-zinc-200 text-sm">
                      {faq.question}
                    </h3>
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
        <div className="fixed bottom-[calc(3.5rem+env(safe-area-inset-bottom))] left-0 right-0 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md border-t border-zinc-200 dark:border-zinc-900 pl-4 pr-10 py-3 shadow-lg z-40 flex items-center justify-between md:hidden animate-in slide-in-from-bottom duration-300">
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
  slug,
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
      slug={slug}
    />
  );
}
