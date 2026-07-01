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
    const margin = 36;
    const contentWidth = pageWidth - margin * 2;

    const cleanPDFText = (text: any): string => {
      if (text === null || text === undefined) return "";
      let str = String(text);
      str = str.replace(/₹/g, "Rs. ");
      str = str.replace(/€/g, "EUR ");
      str = str.replace(/£/g, "GBP ");
      str = str.replace(/¥/g, "Yen ");
      str = str.replace(/₽/g, "RUB ");
      str = str.replace(/₩/g, "KRW ");
      str = str.replace(/د\.إ/g, "AED ");
      str = str.replace(/ر\.س/g, "SAR ");
      str = str.replace(/₺/g, "TRY ");
      str = str.replace(/₪/g, "ILS ");
      str = str.replace(/฿/g, "THB ");
      str = str.replace(/₱/g, "PHP ");
      str = str.replace(/₫/g, "VND ");
      str = str.replace(/[\u00A0\u202F\u2007\u2060\u200B-\u200D\uFEFF]/g, " ");
      str = str.replace(/[^\x20-\x7E]/g, "");
      return str.replace(/\s+/g, " ").trim();
    };

    const hasPage2 = Boolean(result.comparison || (result.schedule && result.schedule.length > 0));
    const totalPages = hasPage2 ? 2 : 1;
    const dateStr = new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

    // Helper to draw footer on any page
    const drawFooter = (pageNum: number) => {
      doc.setDrawColor(226, 232, 240);
      doc.setLineWidth(1);
      doc.line(margin, pageHeight - 38, pageWidth - margin, pageHeight - 38);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(8.5);
      doc.setTextColor(100, 116, 139);
      doc.text("Report generated via WealthMaze • Plan your financial independence at", margin, pageHeight - 22);

      doc.setFont("helvetica", "bold");
      doc.setTextColor(16, 185, 129);
      doc.textWithLink("https://wealthmaze.in", margin + 312, pageHeight - 22, { url: "https://wealthmaze.in" });

      doc.setFont("helvetica", "normal");
      doc.setTextColor(148, 163, 184);
      doc.text(`Page ${pageNum} of ${totalPages}`, pageWidth - margin - 50, pageHeight - 22);
    };

    // ==========================================
    // PAGE 1: PURE VECTOR EXECUTIVE REPORT
    // ==========================================
    doc.setFillColor(16, 185, 129); // Top emerald stripe
    doc.rect(margin, 36, contentWidth, 4, "F");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.setTextColor(15, 23, 42);
    const reportTitle = title ? `${title} — Assessment Dossier` : "Financial Assessment Dossier";
    doc.text(cleanPDFText(reportTitle), margin, 64);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9.5);
    doc.setTextColor(100, 116, 139);
    doc.text(`Generated: ${dateStr}`, pageWidth - margin - 100, 62);

    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(1);
    doc.line(margin, 78, pageWidth - margin, 78);

    let currentY = 104;

    // 1. INPUT PARAMETERS GRID
    if (inputsSummary && inputsSummary.length > 0) {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      doc.setTextColor(30, 41, 59);
      doc.text("1. Assessment Input Parameters", margin, currentY);
      currentY += 16;

      const cols = 2;
      const cardW = (contentWidth - 14) / 2;
      const cardH = 42;
      const gapY = 10;

      inputsSummary.forEach((inp, idx) => {
        const col = idx % cols;
        const row = Math.floor(idx / cols);
        const xPos = margin + col * (cardW + 14);
        const yPos = currentY + row * (cardH + gapY);

        doc.setFillColor(248, 250, 252);
        doc.setDrawColor(226, 232, 240);
        doc.roundedRect(xPos, yPos, cardW, cardH, 5, 5, "FD");

        doc.setFont("helvetica", "normal");
        doc.setFontSize(8.5);
        doc.setTextColor(100, 116, 139);
        doc.text(cleanPDFText(inp.label.toUpperCase()), xPos + 12, yPos + 16);

        doc.setFont("helvetica", "bold");
        doc.setFontSize(12.5);
        doc.setTextColor(15, 23, 42);
        doc.text(cleanPDFText(inp.value), xPos + 12, yPos + 32);
      });

      const numRows = Math.ceil(inputsSummary.length / cols);
      currentY += numRows * (cardH + gapY) + 20;
    }

    // 2. STRATEGIC WEALTH PROJECTION & OUTPUTS
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(30, 41, 59);
    doc.text("2. Strategic Wealth Projection", margin, currentY);
    currentY += 16;

    const numOuts = outputs.length;
    const outCols = Math.min(numOuts, 3);
    const outCardW = (contentWidth - (outCols - 1) * 12) / outCols;
    const outCardH = 64;

    outputs.forEach((out, idx) => {
      const col = idx % 3;
      const row = Math.floor(idx / 3);
      const xPos = margin + col * (outCardW + 12);
      const yPos = currentY + row * (outCardH + 12);

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
      doc.roundedRect(xPos, yPos, outCardW, outCardH, 6, 6, "FD");

      doc.setFont("helvetica", "bold");
      doc.setFontSize(8.5);
      doc.setTextColor(isTotal ? 5 : 100, isTotal ? 150 : 116, isTotal ? 105 : 139);
      doc.text(cleanPDFText(out.label.toUpperCase()), xPos + 12, yPos + 20);

      doc.setFont("helvetica", "bold");
      doc.setFontSize(isTotal ? 15.5 : 14);
      doc.setTextColor(isTotal ? 4 : 15, isTotal ? 120 : 23, isTotal ? 87 : 42);
      const formattedVal = formatValue(val, out.format, out.unit);
      doc.text(cleanPDFText(formattedVal), xPos + 12, yPos + 46);
    });

    const outRows = Math.ceil(numOuts / 3);
    currentY += outRows * (outCardH + 12) + 20;

    // 3. VECTOR PORTFOLIO ALLOCATION METER
    let investedVal = 0;
    let gainsVal = 0;
    outputs.forEach((out) => {
      const val = result.values[out.id] ?? 0;
      const lower = out.id.toLowerCase();
      if (lower.includes("invest") || lower.includes("principal") || lower.includes("loan")) {
        investedVal = val;
      } else if (lower.includes("return") || lower.includes("gain") || lower.includes("interest") || lower.includes("profit")) {
        gainsVal = val;
      }
    });
    if (investedVal === 0 && outputs.length >= 2) {
      investedVal = result.values[outputs[0].id] ?? 0;
      gainsVal = result.values[outputs[1].id] ?? 0;
    }
    const totalPie = investedVal + gainsVal;

    if (totalPie > 0 && currentY < pageHeight - 160) {
      const meterBoxH = 88;
      doc.setFillColor(248, 250, 252);
      doc.setDrawColor(226, 232, 240);
      doc.roundedRect(margin, currentY, contentWidth, meterBoxH, 6, 6, "FD");

      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.setTextColor(30, 41, 59);
      doc.text("Portfolio Allocation Breakdown", margin + 14, currentY + 22);

      const barX = margin + 14;
      const barY = currentY + 34;
      const barW = contentWidth - 28;
      const barH = 16;
      const invRatio = Math.min(1, Math.max(0, investedVal / totalPie));
      const w1 = invRatio * barW;
      const w2 = barW - w1;

      // Draw Principal Segment (#3b82f6)
      if (w1 > 0) {
        doc.setFillColor(59, 130, 246);
        doc.roundedRect(barX, barY, w1, barH, 3, 3, "F");
      }
      // Draw Returns Segment (#10b981)
      if (w2 > 0) {
        doc.setFillColor(16, 185, 129);
        doc.roundedRect(barX + w1, barY, w2, barH, 3, 3, "F");
      }

      const invPct = (invRatio * 100).toFixed(1);
      const gainPct = ((1 - invRatio) * 100).toFixed(1);

      // Legend Pills
      doc.setFillColor(59, 130, 246);
      doc.rect(margin + 14, currentY + 63, 10, 10, "F");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.setTextColor(51, 65, 85);
      doc.text(cleanPDFText(`Invested Principal: ${invPct}%`), margin + 28, currentY + 72);

      doc.setFillColor(16, 185, 129);
      doc.rect(margin + 230, currentY + 63, 10, 10, "F");
      doc.text(cleanPDFText(`Compound Wealth Gain: ${gainPct}%`), margin + 244, currentY + 72);
    }

    drawFooter(1);

    // ==========================================
    // PAGE 2: STRATEGY MATRIX & VECTOR BAR CHART
    // ==========================================
    if (hasPage2) {
      doc.addPage("a4", "portrait");
      doc.setFillColor(16, 185, 129);
      doc.rect(margin, 36, contentWidth, 4, "F");

      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.setTextColor(15, 23, 42);
      doc.text("Alternative Scenarios & Growth Timeline Analysis", margin, 62);

      doc.setDrawColor(226, 232, 240);
      doc.line(margin, 76, pageWidth - margin, 76);

      let p2Y = 100;

      // 1. COMPARISON TABLE
      if (result.comparison) {
        doc.setFont("helvetica", "bold");
        doc.setFontSize(12);
        doc.setTextColor(30, 41, 59);
        doc.text(cleanPDFText(result.comparison.title), margin, p2Y);
        p2Y += 14;

        const headers = result.comparison.headers;
        const rows = result.comparison.rows;
        const colW = contentWidth / headers.length;
        const rowH = 26;

        doc.setFillColor(241, 245, 249);
        doc.setDrawColor(226, 232, 240);
        doc.rect(margin, p2Y, contentWidth, rowH, "FD");

        doc.setFont("helvetica", "bold");
        doc.setFontSize(9);
        doc.setTextColor(51, 65, 85);
        headers.forEach((h, i) => {
          doc.text(cleanPDFText(String(h)), margin + 8 + i * colW, p2Y + 17);
        });
        p2Y += rowH;

        rows.forEach((row, rIdx) => {
          const isHighlight = rIdx === 0;
          if (isHighlight) {
            doc.setFillColor(236, 253, 245);
          } else if (rIdx % 2 === 1) {
            doc.setFillColor(248, 250, 252);
          } else {
            doc.setFillColor(255, 255, 255);
          }
          doc.setDrawColor(226, 232, 240);
          doc.rect(margin, p2Y, contentWidth, rowH, "FD");

          doc.setFont("helvetica", isHighlight ? "bold" : "normal");
          doc.setFontSize(8.5);
          doc.setTextColor(isHighlight ? 4 : 30, isHighlight ? 120 : 41, isHighlight ? 87 : 59);

          row.forEach((cell, cIdx) => {
            doc.text(cleanPDFText(String(cell)), margin + 8 + cIdx * colW, p2Y + 17);
          });
          p2Y += rowH;
        });
        p2Y += 28;
      }

      // 2. VECTOR GROWTH BAR CHART
      if (result.schedule && result.schedule.length > 0 && p2Y < pageHeight - 240) {
        doc.setFont("helvetica", "bold");
        doc.setFontSize(12);
        doc.setTextColor(30, 41, 59);
        doc.text("Multi-Year Corpus Growth Progression", margin, p2Y);
        p2Y += 14;

        const chartH = 210;
        doc.setFillColor(248, 250, 252);
        doc.setDrawColor(226, 232, 240);
        doc.roundedRect(margin, p2Y, contentWidth, chartH, 6, 6, "FD");

        const sched = result.schedule;
        const step = Math.max(1, Math.floor(sched.length / 6));
        const milestones = [];
        for (let i = 0; i < sched.length; i += step) {
          milestones.push(sched[i]);
        }
        if (milestones[milestones.length - 1] !== sched[sched.length - 1]) {
          milestones.push(sched[sched.length - 1]);
        }

        const keys = Object.keys(sched[0]);
        const valKey = keys.find((k) => k.toLowerCase().includes("balance") || k.toLowerCase().includes("value") || k.toLowerCase().includes("total")) || keys[keys.length - 1];
        const labelKey = keys[0];

        let maxVal = 0;
        milestones.forEach((m) => {
          const v = Number(String(m[valKey] || 0).replace(/[^0-9.]/g, ""));
          if (v > maxVal) maxVal = v;
        });

        const barAreaH = chartH - 64;
        const barBottomY = p2Y + chartH - 28;
        const numBars = milestones.length;
        const slotW = (contentWidth - 28) / numBars;
        const barW = Math.min(slotW * 0.55, 36);

        milestones.forEach((m, idx) => {
          const rawV = Number(String(m[valKey] || 0).replace(/[^0-9.]/g, ""));
          const barH = maxVal > 0 ? Math.max((rawV / maxVal) * barAreaH, 6) : 6;
          const barX = margin + 14 + idx * slotW + (slotW - barW) / 2;
          const barTopY = barBottomY - barH;

          // Razor sharp vector bar
          doc.setFillColor(16, 185, 129);
          doc.roundedRect(barX, barTopY, barW, barH, 2, 2, "F");

          // Value above bar
          doc.setFont("helvetica", "bold");
          doc.setFontSize(8);
          doc.setTextColor(15, 23, 42);
          const compactStr = cleanPDFText(formatCompact(rawV, "currency"));
          doc.text(compactStr, barX + barW / 2 - doc.getTextWidth(compactStr) / 2, barTopY - 6);

          // Milestone label below X axis
          doc.setFont("helvetica", "normal");
          doc.setFontSize(8);
          doc.setTextColor(100, 116, 139);
          const lblStr = cleanPDFText(String(m[labelKey] || `P${idx + 1}`));
          doc.text(lblStr, barX + barW / 2 - doc.getTextWidth(lblStr) / 2, barBottomY + 14);
        });
      }

      drawFooter(2);
    }

    const cleanTitle = (title || "calculator").toLowerCase().replace(/[^a-z0-9]+/g, "-");
    doc.save(`wealthmaze-${cleanTitle}-dossier.pdf`);
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
