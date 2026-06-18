"use client";

import * as React from "react";
import { CalculatorOutput, CalculatorResult } from "@/data/calculators/types";
import { Download, Share2, Check } from "lucide-react";

interface CalculatorResultsProps {
  outputs: CalculatorOutput[];
  result: CalculatorResult;
  calculatorName: string;
}

export function CalculatorResults({ outputs, result, calculatorName }: CalculatorResultsProps) {
  const [copied, setCopied] = React.useState(false);

  const formatValue = (val: number, format?: string, unit?: string) => {
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

  const handleShare = () => {
    if (typeof window === "undefined") return;
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <div className="space-y-6">
      {/* Output Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {outputs.map((out) => {
          const val = result.values[out.id] ?? 0;
          const isTotal = out.id.toLowerCase().includes("total") || out.id.toLowerCase().includes("maturity") || out.id.toLowerCase().includes("corpus") || out.id.toLowerCase().includes("worth");

          return (
            <div
              key={out.id}
              className={`p-5 rounded-xl border transition-all ${
                isTotal
                  ? "bg-gradient-to-br from-emerald-50 to-emerald-100/50 dark:from-emerald-950/20 dark:to-emerald-900/10 border-emerald-100 dark:border-emerald-900/30"
                  : "bg-white dark:bg-zinc-950 border-zinc-150 dark:border-zinc-800"
              }`}
            >
              <span className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
                {out.label}
              </span>
              <div
                className={`text-2xl font-bold mt-1 tracking-tight ${
                  isTotal ? "text-emerald-600 dark:text-emerald-400" : "text-zinc-800 dark:text-zinc-100"
                }`}
              >
                {formatValue(val, out.format, out.unit)}
              </div>
            </div>
          );
        })}
      </div>

      {/* Share & Download Actions */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={handlePrint}
          className="inline-flex items-center px-4 h-10 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-lg transition-colors focus:outline-none"
          id="btn-download-pdf"
        >
          <Download className="h-4 w-4 mr-2" />
          Download PDF Report
        </button>

        <button
          onClick={handleShare}
          className="inline-flex items-center px-4 h-10 text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/30 hover:bg-emerald-100 dark:hover:bg-emerald-950/50 rounded-lg transition-colors focus:outline-none"
          id="btn-share-results"
        >
          {copied ? (
            <>
              <Check className="h-4 w-4 mr-2 text-emerald-600" />
              Copied Link!
            </>
          ) : (
            <>
              <Share2 className="h-4 w-4 mr-2" />
              Share Results
            </>
          )}
        </button>
      </div>

      {/* Comparison Table */}
      {result.comparison && (
        <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800">
          <h3 className="text-sm font-bold text-zinc-800 dark:text-zinc-200 mb-3">
            {result.comparison.title}
          </h3>
          <div className="overflow-x-auto rounded-lg border border-zinc-100 dark:border-zinc-800">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-zinc-50 dark:bg-zinc-900/60 border-b border-zinc-100 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 font-semibold">
                  {result.comparison.headers.map((h, i) => (
                    <th key={i} className="p-3">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                {result.comparison.rows.map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-900/20 text-zinc-700 dark:text-zinc-300">
                    {row.map((cell, cIdx) => (
                      <td key={cIdx} className={`p-3 ${cIdx === 0 ? "font-semibold text-zinc-800 dark:text-zinc-200" : ""}`}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Schedule Table (Amortization or Yearly growth) */}
      {result.schedule && (
        <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800">
          <h3 className="text-sm font-bold text-zinc-800 dark:text-zinc-200 mb-3">
            Amortization / Yearly Growth Timeline
          </h3>
          <div className="max-h-60 overflow-y-auto rounded-lg border border-zinc-100 dark:border-zinc-800">
            <table className="w-full text-left border-collapse text-xs">
              <thead className="sticky top-0 bg-zinc-50 dark:bg-zinc-900 border-b border-zinc-100 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 font-semibold z-10">
                <tr className="border-b border-zinc-100 dark:border-zinc-800">
                  {Object.keys(result.schedule[0]).map((key, idx) => (
                    <th key={idx} className="p-3">
                      {key}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                {result.schedule.map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-900/20 text-zinc-700 dark:text-zinc-300">
                    {Object.values(row).map((val: any, cIdx) => (
                      <td key={cIdx} className="p-3">
                        {typeof val === "number" && cIdx > 0 ? formatValue(val, "currency") : val}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
