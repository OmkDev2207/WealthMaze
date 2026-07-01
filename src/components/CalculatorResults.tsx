/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as React from "react";
import { CalculatorOutput, CalculatorResult } from "@/data/calculators/types";
import { Download, Share2, Check } from "lucide-react";
import jsPDF from "jspdf";

import { useCurrency } from "@/lib/CurrencyContext";

interface CalculatorResultsProps {
  outputs: CalculatorOutput[];
  result: CalculatorResult;
  isIndiaSpecific?: boolean;
  title?: string;
  inputsSummary?: { label: string; value: string }[];
}

export function CalculatorResults({ outputs, result, isIndiaSpecific = false, title, inputsSummary }: CalculatorResultsProps) {
  const [copied, setCopied] = React.useState(false);
  const { formatCurrency: globalFormatCurrency, formatNumber: globalFormatNumber } = useCurrency();

  const formatCurrency = React.useCallback((val: number, compact = false) => {
    if (isIndiaSpecific) {
      if (isNaN(val)) return "₹0";
      const abs = Math.abs(val);
      const sign = val < 0 ? "-" : "";
      if (compact) {
        if (abs >= 1_00_00_000) {
          return `${sign}₹${(abs / 1_00_00_000).toFixed(2)} Cr`;
        }
        if (abs >= 1_00_000) {
          return `${sign}₹${(abs / 1_00_000).toFixed(2)} L`;
        }
      }
      return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
      }).format(val);
    }
    return globalFormatCurrency(val, compact);
  }, [isIndiaSpecific, globalFormatCurrency]);

  const formatNumber = React.useCallback((val: number, fractionDigits = 2) => {
    if (isIndiaSpecific) {
      if (isNaN(val)) return "0";
      return new Intl.NumberFormat("en-IN", {
        maximumFractionDigits: fractionDigits,
      }).format(val);
    }
    return globalFormatNumber(val, fractionDigits);
  }, [isIndiaSpecific, globalFormatNumber]);

  /** Full precision formatting – used for tooltips / accessibility */
  const formatValue = React.useCallback((val: number, format?: string, unit?: string) => {
    if (isNaN(val)) return "0";
    if (format === "currency") {
      return formatCurrency(val, false);
    }
    if (format === "percent") {
      return `${val.toFixed(2)}%`;
    }
    if (format === "number") {
      return formatNumber(val, 2);
    }
    let displayUnit = unit || "";
    if (displayUnit === "₹" && !isIndiaSpecific) {
      displayUnit = "";
    }
    return `${val} ${displayUnit}`;
  }, [formatCurrency, formatNumber, isIndiaSpecific]);

  /** Compact display formatting for result cards. */
  const formatCompact = React.useCallback((val: number, format?: string, unit?: string): string => {
    if (isNaN(val)) return "0";
    if (format === "currency") {
      return formatCurrency(val, true);
    }
    if (format === "percent") return `${val.toFixed(2)}%`;
    if (format === "number") {
      return formatNumber(val, 2);
    }
    let displayUnit = unit || "";
    if (displayUnit === "₹" && !isIndiaSpecific) {
      displayUnit = "";
    }
    return `${val} ${displayUnit}`;
  }, [formatCurrency, formatNumber, isIndiaSpecific]);

  const handleShare = () => {
    if (typeof window === "undefined") return;
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    if (typeof window === "undefined") return;

    const doc = new jsPDF({
      orientation: "portrait",
      unit: "pt",
      format: "a4",
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 40;
    const contentWidth = pageWidth - margin * 2;
    let y = 50;

    // 1. Header & Branding
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.setTextColor(16, 185, 129); // #10b981 emerald
    doc.text("WealthMaze", margin, y);

    const logoWidth = doc.getTextWidth("WealthMaze");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.setTextColor(39, 39, 42);
    const reportTitle = title ? `${title} — Assessment Report` : "Financial Calculator Report";
    doc.text(reportTitle, margin + logoWidth + 14, y - 1);

    y += 18;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(113, 113, 122);
    const dateStr = new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" });
    doc.text(`Generated on: ${dateStr}`, margin, y);

    y += 14;
    doc.setDrawColor(228, 228, 231);
    doc.setLineWidth(1.5);
    doc.line(margin, y, pageWidth - margin, y);
    y += 24;

    // 2. Inputs Summary Section
    if (inputsSummary && inputsSummary.length > 0) {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      doc.setTextColor(24, 24, 27);
      doc.text("Input Parameters", margin, y);
      y += 14;

      const numCols = 2;
      const colWidth = contentWidth / numCols;
      const rows = Math.ceil(inputsSummary.length / numCols);
      const boxHeight = rows * 28 + 12;

      doc.setFillColor(248, 250, 252);
      doc.setDrawColor(226, 232, 240);
      doc.setLineWidth(1);
      doc.roundedRect(margin, y, contentWidth, boxHeight, 6, 6, "FD");

      inputsSummary.forEach((inp, i) => {
        const col = i % numCols;
        const row = Math.floor(i / numCols);
        const xPos = margin + 14 + col * colWidth;
        const curY = y + 24 + row * 28;

        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        doc.setTextColor(100, 116, 139);
        doc.text(`${inp.label}: `, xPos, curY);
        const labelW = doc.getTextWidth(`${inp.label}: `);

        doc.setFont("helvetica", "bold");
        doc.setTextColor(15, 23, 42);
        doc.text(`${inp.value}`, xPos + labelW, curY);
      });

      y += boxHeight + 24;
    }

    // 3. Calculation Outputs & Statistics
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(24, 24, 27);
    doc.text("Calculation Output & Summary", margin, y);
    y += 14;

    const numOutCols = Math.min(outputs.length, 3);
    const outBoxWidth = (contentWidth - (numOutCols - 1) * 12) / numOutCols;

    outputs.forEach((out, idx) => {
      const col = idx % 3;
      if (col === 0 && idx > 0) {
        y += 68;
      }
      const boxX = margin + col * (outBoxWidth + 12);
      const val = result.values[out.id] ?? 0;
      const isTotal =
        out.id.toLowerCase().includes("total") ||
        out.id.toLowerCase().includes("maturity") ||
        out.id.toLowerCase().includes("corpus") ||
        out.id.toLowerCase().includes("worth");

      if (isTotal) {
        doc.setFillColor(236, 253, 245);
        doc.setDrawColor(16, 185, 129);
      } else {
        doc.setFillColor(255, 255, 255);
        doc.setDrawColor(226, 232, 240);
      }
      doc.roundedRect(boxX, y, outBoxWidth, 56, 6, 6, "FD");

      doc.setFont("helvetica", "bold");
      doc.setFontSize(8.5);
      doc.setTextColor(100, 116, 139);
      doc.text(out.label.toUpperCase(), boxX + 12, y + 18);

      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
      doc.setTextColor(isTotal ? 5 : 15, isTotal ? 150 : 23, isTotal ? 105 : 42);
      const formattedVal = formatValue(val, out.format, out.unit);
      doc.text(formattedVal, boxX + 12, y + 40);
    });

    const totalOutRows = Math.ceil(outputs.length / 3);
    y += totalOutRows * 68 + 14;

    const checkPageBreak = (neededHeight: number) => {
      if (y + neededHeight > pageHeight - 60) {
        doc.addPage();
        y = 50;
      }
    };

    // 4. Comparison Table (Alternative Investment Scenarios)
    if (result.comparison) {
      checkPageBreak(120);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      doc.setTextColor(24, 24, 27);
      doc.text(result.comparison.title, margin, y);
      y += 14;

      const headers = result.comparison.headers;
      const rows = result.comparison.rows;
      const colW = contentWidth / headers.length;

      doc.setFillColor(241, 245, 249);
      doc.setDrawColor(226, 232, 240);
      doc.rect(margin, y, contentWidth, 24, "FD");

      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.setTextColor(71, 85, 105);
      headers.forEach((h, i) => {
        doc.text(String(h), margin + 8 + i * colW, y + 16);
      });
      y += 24;

      rows.forEach((row, rIdx) => {
        checkPageBreak(24);
        if (rIdx % 2 === 1) {
          doc.setFillColor(248, 250, 252);
          doc.rect(margin, y, contentWidth, 24, "F");
        }
        doc.setDrawColor(226, 232, 240);
        doc.line(margin, y + 24, margin + contentWidth, y + 24);

        doc.setFont("helvetica", rIdx === 0 ? "bold" : "normal");
        doc.setFontSize(9);
        doc.setTextColor(rIdx === 0 ? 15 : 51, rIdx === 0 ? 23 : 65, rIdx === 0 ? 42 : 85);

        row.forEach((cell, cIdx) => {
          doc.text(String(cell), margin + 8 + cIdx * colW, y + 16);
        });
        y += 24;
      });
      y += 20;
    }

    // 5. Schedule Table
    if (result.schedule && result.schedule.length > 0) {
      checkPageBreak(120);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      doc.setTextColor(24, 24, 27);
      doc.text("Growth / Amortization Timeline (Summary)", margin, y);
      y += 14;

      const schedHeaders = Object.keys(result.schedule[0]);
      const schedColW = contentWidth / schedHeaders.length;

      doc.setFillColor(241, 245, 249);
      doc.setDrawColor(226, 232, 240);
      doc.rect(margin, y, contentWidth, 24, "FD");

      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.setTextColor(71, 85, 105);
      schedHeaders.forEach((h, i) => {
        doc.text(String(h), margin + 8 + i * schedColW, y + 16);
      });
      y += 24;

      const displayRows = result.schedule.slice(0, 15);
      displayRows.forEach((row, rIdx) => {
        checkPageBreak(22);
        if (rIdx % 2 === 1) {
          doc.setFillColor(248, 250, 252);
          doc.rect(margin, y, contentWidth, 22, "F");
        }
        doc.setDrawColor(226, 232, 240);
        doc.line(margin, y + 22, margin + contentWidth, y + 22);

        doc.setFont("helvetica", "normal");
        doc.setFontSize(8.5);
        doc.setTextColor(51, 65, 85);

        Object.values(row).forEach((val: any, cIdx) => {
          const displayVal = typeof val === "number" && cIdx > 0 ? formatValue(val, "currency") : String(val);
          doc.text(displayVal, margin + 8 + cIdx * schedColW, y + 15);
        });
        y += 22;
      });

      if (result.schedule.length > 15) {
        checkPageBreak(20);
        doc.setFont("helvetica", "italic");
        doc.setFontSize(8.5);
        doc.setTextColor(148, 163, 184);
        doc.text(`... Showing first 15 entries out of ${result.schedule.length} total periods. View full schedule online.`, margin + 8, y + 14);
        y += 20;
      }
    }

    // 6. Footer on all pages with embedded website link
    const pageCount = doc.getNumberOfPages();
    for (let p = 1; p <= pageCount; p++) {
      doc.setPage(p);
      doc.setDrawColor(228, 228, 231);
      doc.line(margin, pageHeight - 40, pageWidth - margin, pageHeight - 40);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(8.5);
      doc.setTextColor(113, 113, 122);
      doc.text("Report generated via WealthMaze • Calculate your financial future at:", margin, pageHeight - 24);

      doc.setFont("helvetica", "bold");
      doc.setTextColor(16, 185, 129);
      doc.textWithLink("https://wealthmaze.in", margin + 295, pageHeight - 24, { url: "https://wealthmaze.in" });

      doc.setFont("helvetica", "normal");
      doc.setTextColor(161, 161, 170);
      doc.text(`Page ${p} of ${pageCount}`, pageWidth - margin - 50, pageHeight - 24);
    }

    const cleanTitle = (title || "calculator").toLowerCase().replace(/[^a-z0-9]+/g, "-");
    doc.save(`wealthmaze-${cleanTitle}-report.pdf`);
  };

  return (
    <div className="space-y-6">
      {/* Output Cards — auto-fit grid adapts to available width whether sidebar is present or not */}
      <div className="grid gap-3" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))" }}>
        {outputs.map((out) => {
          const val = result.values[out.id] ?? 0;
          const isTotal =
            out.id.toLowerCase().includes("total") ||
            out.id.toLowerCase().includes("maturity") ||
            out.id.toLowerCase().includes("corpus") ||
            out.id.toLowerCase().includes("worth");

          return (
            <div
              key={out.id}
              title={formatValue(val, out.format, out.unit)} // full value on hover
              className={`min-w-0 p-4 rounded-xl border transition-all ${
                isTotal
                  ? "bg-gradient-to-br from-emerald-50 to-emerald-100/50 dark:from-emerald-950/20 dark:to-emerald-900/10 border-emerald-100 dark:border-emerald-900/30"
                  : "bg-white dark:bg-zinc-950 border-zinc-150 dark:border-zinc-800"
              }`}
            >
              <span className="block text-[11px] font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider leading-tight">
                {out.label}
              </span>
              <div
                className={`mt-1.5 font-bold tracking-tight break-words text-xl leading-tight ${
                  isTotal ? "text-emerald-600 dark:text-emerald-400" : "text-zinc-800 dark:text-zinc-100"
                }`}
              >
                {formatCompact(val, out.format, out.unit)}
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
          <div className="max-h-60 overflow-auto rounded-lg border border-zinc-100 dark:border-zinc-800">
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
