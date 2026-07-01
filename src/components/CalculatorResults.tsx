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

    // Helper to draw rounded rectangle on Canvas
    const drawRoundRect = (
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      width: number,
      height: number,
      radius: number,
      fillColor?: string,
      strokeColor?: string,
      lineWidth = 1
    ) => {
      ctx.beginPath();
      ctx.moveTo(x + radius, y);
      ctx.lineTo(x + width - radius, y);
      ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
      ctx.lineTo(x + width, y + height - radius);
      ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
      ctx.lineTo(x + radius, y + height);
      ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
      ctx.lineTo(x, y + radius);
      ctx.quadraticCurveTo(x, y, x + radius, y);
      ctx.closePath();
      if (fillColor) {
        ctx.fillStyle = fillColor;
        ctx.fill();
      }
      if (strokeColor) {
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = lineWidth;
        ctx.stroke();
      }
    };

    const hasPage2 = Boolean(result.comparison || (result.schedule && result.schedule.length > 0));
    const totalPages = hasPage2 ? 2 : 1;
    const dateStr = new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    const fontStack = "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";

    // --- PAGE 1 RENDERER ---
    const renderPage1 = (): HTMLCanvasElement => {
      const canvas = document.createElement("canvas");
      canvas.width = 1200;
      canvas.height = 1600;
      const ctx = canvas.getContext("2d");
      if (!ctx) return canvas;

      // Background
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, 1200, 1600);

      // Header Banner
      ctx.fillStyle = "#0f172a";
      ctx.fillRect(0, 0, 1200, 140);

      // Badge
      drawRoundRect(ctx, 60, 26, 260, 32, 6, "#10b98120", "#10b981", 1.5);
      ctx.font = `bold 13px ${fontStack}`;
      ctx.fillStyle = "#10b981";
      ctx.fillText("WEALTHMAZE FINANCIAL DOSSIER", 76, 47);

      // Report Title
      ctx.font = `bold 36px ${fontStack}`;
      ctx.fillStyle = "#ffffff";
      const reportTitle = title ? `${title} Projection Report` : "Financial Assessment Report";
      ctx.fillText(reportTitle, 60, 102);

      // Date & Branding Right
      ctx.font = `bold 22px ${fontStack}`;
      ctx.fillStyle = "#10b981";
      ctx.textAlign = "right";
      ctx.fillText("WealthMaze", 1140, 60);
      ctx.font = `16px ${fontStack}`;
      ctx.fillStyle = "#94a3b8";
      ctx.fillText(`Generated: ${dateStr}`, 1140, 95);
      ctx.textAlign = "left";

      let currentY = 180;

      // 1. INPUT PARAMETERS GRID
      if (inputsSummary && inputsSummary.length > 0) {
        ctx.font = `bold 22px ${fontStack}`;
        ctx.fillStyle = "#1e293b";
        ctx.fillText("1. Assessment Input Parameters", 60, currentY);
        currentY += 25;

        const cols = 2;
        const cardW = 525;
        const cardH = 74;
        const gapX = 30;
        const gapY = 16;

        inputsSummary.forEach((inp, idx) => {
          const col = idx % cols;
          const row = Math.floor(idx / cols);
          const xPos = 60 + col * (cardW + gapX);
          const yPos = currentY + row * (cardH + gapY);

          drawRoundRect(ctx, xPos, yPos, cardW, cardH, 12, "#f8fafc", "#e2e8f0", 1.5);

          ctx.font = `600 15px ${fontStack}`;
          ctx.fillStyle = "#64748b";
          ctx.fillText(inp.label.toUpperCase(), xPos + 22, yPos + 28);

          ctx.font = `bold 22px ${fontStack}`;
          ctx.fillStyle = "#0f172a";
          ctx.fillText(inp.value, xPos + 22, yPos + 56);
        });

        const numRows = Math.ceil(inputsSummary.length / cols);
        currentY += numRows * (cardH + gapY) + 30;
      }

      // 2. HERO OUTPUTS & DONUT CHART
      ctx.font = `bold 22px ${fontStack}`;
      ctx.fillStyle = "#1e293b";
      ctx.fillText("2. Strategic Wealth Projection & Allocation", 60, currentY);
      currentY += 25;

      const leftW = 510;
      const rightW = 540;
      const rightX = 600;

      // Draw output metric cards on Left Side
      let cardY = currentY;
      outputs.forEach((out) => {
        const val = result.values[out.id] ?? 0;
        const isTotal =
          out.id.toLowerCase().includes("total") ||
          out.id.toLowerCase().includes("maturity") ||
          out.id.toLowerCase().includes("corpus") ||
          out.id.toLowerCase().includes("worth");

        const boxH = isTotal ? 130 : 96;
        if (isTotal) {
          drawRoundRect(ctx, 60, cardY, leftW, boxH, 16, "#ecfdf5", "#10b981", 2.5);
          ctx.font = `bold 14px ${fontStack}`;
          ctx.fillStyle = "#059669";
          ctx.fillText(out.label.toUpperCase(), 84, cardY + 36);

          ctx.font = `bold 38px ${fontStack}`;
          ctx.fillStyle = "#047857";
          ctx.fillText(formatValue(val, out.format, out.unit), 84, cardY + 86);
        } else {
          drawRoundRect(ctx, 60, cardY, leftW, boxH, 14, "#ffffff", "#cbd5e1", 1.5);
          ctx.font = `bold 13px ${fontStack}`;
          ctx.fillStyle = "#64748b";
          ctx.fillText(out.label.toUpperCase(), 84, cardY + 32);

          ctx.font = `bold 28px ${fontStack}`;
          ctx.fillStyle = "#0f172a";
          ctx.fillText(formatValue(val, out.format, out.unit), 84, cardY + 72);
        }
        cardY += boxH + 16;
      });

      // Draw Donut Chart Container on Right Side
      const chartBoxH = Math.max(cardY - currentY - 16, 380);
      drawRoundRect(ctx, rightX, currentY, rightW, chartBoxH, 16, "#f8fafc", "#e2e8f0", 1.5);

      ctx.font = `bold 18px ${fontStack}`;
      ctx.fillStyle = "#1e293b";
      ctx.fillText("Portfolio Allocation Breakdown", rightX + 28, currentY + 40);

      // Identify slices for Donut Chart
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
      const donutCenterX = rightX + rightW / 2;
      const donutCenterY = currentY + chartBoxH / 2 - 20;
      const outerR = 110;
      const innerR = 70;

      if (totalPie > 0) {
        const invAngle = (investedVal / totalPie) * Math.PI * 2;

        // Slice 1: Invested Principal (#3b82f6)
        ctx.beginPath();
        ctx.arc(donutCenterX, donutCenterY, outerR, -Math.PI / 2, -Math.PI / 2 + invAngle);
        ctx.arc(donutCenterX, donutCenterY, innerR, -Math.PI / 2 + invAngle, -Math.PI / 2, true);
        ctx.closePath();
        ctx.fillStyle = "#3b82f6";
        ctx.fill();

        // Slice 2: Returns / Gain (#10b981)
        ctx.beginPath();
        ctx.arc(donutCenterX, donutCenterY, outerR, -Math.PI / 2 + invAngle, -Math.PI / 2 + Math.PI * 2);
        ctx.arc(donutCenterX, donutCenterY, innerR, -Math.PI / 2 + Math.PI * 2, -Math.PI / 2 + invAngle, true);
        ctx.closePath();
        ctx.fillStyle = "#10b981";
        ctx.fill();

        // Donut Center Text
        ctx.textAlign = "center";
        ctx.font = `bold 13px ${fontStack}`;
        ctx.fillStyle = "#64748b";
        ctx.fillText("TOTAL CORPUS", donutCenterX, donutCenterY - 6);
        ctx.font = `bold 20px ${fontStack}`;
        ctx.fillStyle = "#0f172a";
        const totalOut = outputs.find((o) => o.id.toLowerCase().includes("total") || o.id.toLowerCase().includes("maturity"));
        const totalDisplayVal = totalOut ? formatCompact(result.values[totalOut.id] ?? totalPie, totalOut.format, totalOut.unit) : formatCompact(totalPie, "currency");
        ctx.fillText(totalDisplayVal, donutCenterX, donutCenterY + 18);
        ctx.textAlign = "left";

        // Legend below Donut
        const legendY = currentY + chartBoxH - 64;
        const invPct = ((investedVal / totalPie) * 100).toFixed(1);
        const gainPct = ((gainsVal / totalPie) * 100).toFixed(1);

        // Legend 1
        drawRoundRect(ctx, rightX + 34, legendY, 16, 16, 4, "#3b82f6");
        ctx.font = `600 14px ${fontStack}`;
        ctx.fillStyle = "#334155";
        ctx.fillText(`Principal: ${invPct}%`, rightX + 58, legendY + 13);

        // Legend 2
        drawRoundRect(ctx, rightX + 270, legendY, 16, 16, 4, "#10b981");
        ctx.fillText(`Est. Gain: ${gainPct}%`, rightX + 294, legendY + 13);
      } else {
        ctx.textAlign = "center";
        ctx.font = `italic 16px ${fontStack}`;
        ctx.fillStyle = "#94a3b8";
        ctx.fillText("Allocation visualization available upon calculation", donutCenterX, donutCenterY);
        ctx.textAlign = "left";
      }

      // Footer Banner
      ctx.strokeStyle = "#e2e8f0";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(60, 1520);
      ctx.lineTo(1140, 1520);
      ctx.stroke();

      ctx.font = `15px ${fontStack}`;
      ctx.fillStyle = "#64748b";
      ctx.fillText("Report generated via WealthMaze • Plan your financial independence at https://wealthmaze.in", 60, 1555);
      ctx.textAlign = "right";
      ctx.fillText(`Page 1 of ${totalPages}`, 1140, 1555);
      ctx.textAlign = "left";

      return canvas;
    };

    // --- PAGE 2 RENDERER ---
    const renderPage2 = (): HTMLCanvasElement | null => {
      if (!hasPage2) return null;
      const canvas = document.createElement("canvas");
      canvas.width = 1200;
      canvas.height = 1600;
      const ctx = canvas.getContext("2d");
      if (!ctx) return null;

      // Background
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, 1200, 1600);

      // Header Banner Small
      ctx.fillStyle = "#0f172a";
      ctx.fillRect(0, 0, 1200, 100);
      ctx.font = `bold 28px ${fontStack}`;
      ctx.fillStyle = "#ffffff";
      ctx.fillText("Strategy Matrix & Growth Progression Analysis", 60, 60);

      let currentY = 150;

      // 1. COMPARISON MATRIX
      if (result.comparison) {
        ctx.font = `bold 22px ${fontStack}`;
        ctx.fillStyle = "#1e293b";
        ctx.fillText("3. Comparative Strategy Matrix", 60, currentY);
        currentY += 24;

        const headers = result.comparison.headers;
        const rows = result.comparison.rows;
        const colW = 1080 / headers.length;
        const rowH = 46;

        // Table Header
        drawRoundRect(ctx, 60, currentY, 1080, rowH, 8, "#f1f5f9", "#e2e8f0", 1);
        ctx.font = `bold 15px ${fontStack}`;
        ctx.fillStyle = "#334155";
        headers.forEach((h, i) => {
          ctx.fillText(String(h), 80 + i * colW, currentY + 28);
        });
        currentY += rowH + 6;

        // Table Rows
        rows.forEach((row, rIdx) => {
          const isHighlight = rIdx === 0;
          drawRoundRect(
            ctx,
            60,
            currentY,
            1080,
            rowH,
            6,
            isHighlight ? "#ecfdf5" : rIdx % 2 === 1 ? "#f8fafc" : "#ffffff",
            isHighlight ? "#10b98150" : "#f1f5f9",
            1
          );

          ctx.font = isHighlight ? `bold 15px ${fontStack}` : `15px ${fontStack}`;
          ctx.fillStyle = isHighlight ? "#047857" : "#1e293b";

          row.forEach((cell, cIdx) => {
            ctx.fillText(String(cell), 80 + cIdx * colW, currentY + 28);
          });
          currentY += rowH + 6;
        });
        currentY += 30;
      }

      // 2. GROWTH PROGRESSION BAR CHART
      if (result.schedule && result.schedule.length > 0) {
        ctx.font = `bold 22px ${fontStack}`;
        ctx.fillStyle = "#1e293b";
        ctx.fillText("4. Multi-Year Corpus Growth Timeline", 60, currentY);
        currentY += 24;

        const chartH = 460;
        drawRoundRect(ctx, 60, currentY, 1080, chartH, 16, "#f8fafc", "#e2e8f0", 1.5);

        // Pick up to 8 milestones from schedule
        const sched = result.schedule;
        const step = Math.max(1, Math.floor(sched.length / 7));
        const milestones = [];
        for (let i = 0; i < sched.length; i += step) {
          milestones.push(sched[i]);
        }
        if (milestones[milestones.length - 1] !== sched[sched.length - 1]) {
          milestones.push(sched[sched.length - 1]);
        }

        // Find max value for scaling bar height
        const keys = Object.keys(sched[0]);
        const valKey = keys.find((k) => k.toLowerCase().includes("balance") || k.toLowerCase().includes("value") || k.toLowerCase().includes("total")) || keys[keys.length - 1];
        const labelKey = keys[0];

        let maxVal = 0;
        milestones.forEach((m) => {
          const v = Number(String(m[valKey] || 0).replace(/[^0-9.]/g, ""));
          if (v > maxVal) maxVal = v;
        });

        const barAreaH = chartH - 130;
        const barBottomY = currentY + chartH - 60;
        const numBars = milestones.length;
        const barSlotW = 1000 / numBars;
        const barW = Math.min(barSlotW * 0.6, 75);

        milestones.forEach((m, idx) => {
          const rawV = Number(String(m[valKey] || 0).replace(/[^0-9.]/g, ""));
          const barH = maxVal > 0 ? Math.max((rawV / maxVal) * barAreaH, 10) : 10;
          const barX = 100 + idx * barSlotW + (barSlotW - barW) / 2;
          const barTopY = barBottomY - barH;

          // Bar Gradient
          const grad = ctx.createLinearGradient(0, barTopY, 0, barBottomY);
          grad.addColorStop(0, "#10b981");
          grad.addColorStop(1, "#059669");

          drawRoundRect(ctx, barX, barTopY, barW, barH, 6, "#10b981");

          // Value Label Above Bar
          ctx.textAlign = "center";
          ctx.font = `bold 13px ${fontStack}`;
          ctx.fillStyle = "#0f172a";
          ctx.fillText(formatCompact(rawV, "currency"), barX + barW / 2, barTopY - 10);

          // Milestone X Label Below Bar
          ctx.font = `600 13px ${fontStack}`;
          ctx.fillStyle = "#64748b";
          ctx.fillText(String(m[labelKey] || `P ${idx + 1}`), barX + barW / 2, barBottomY + 26);
          ctx.textAlign = "left";
        });
      }

      // Footer Banner Page 2
      ctx.strokeStyle = "#e2e8f0";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(60, 1520);
      ctx.lineTo(1140, 1520);
      ctx.stroke();

      ctx.font = `15px ${fontStack}`;
      ctx.fillStyle = "#64748b";
      ctx.fillText("Report generated via WealthMaze • Plan your financial independence at https://wealthmaze.in", 60, 1555);
      ctx.textAlign = "right";
      ctx.fillText(`Page 2 of ${totalPages}`, 1140, 1555);
      ctx.textAlign = "left";

      return canvas;
    };

    // Generate Canvas Pages and Save PDF
    const page1Canvas = renderPage1();
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: [1200, 1600],
    });

    pdf.addImage(page1Canvas.toDataURL("image/png"), "PNG", 0, 0, 1200, 1600);

    const page2Canvas = renderPage2();
    if (page2Canvas) {
      pdf.addPage([1200, 1600], "portrait");
      pdf.addImage(page2Canvas.toDataURL("image/png"), "PNG", 0, 0, 1200, 1600);
    }

    const cleanTitle = (title || "calculator").toLowerCase().replace(/[^a-z0-9]+/g, "-");
    pdf.save(`wealthmaze-${cleanTitle}-dossier.pdf`);
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
