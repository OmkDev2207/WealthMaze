"use client";

import * as React from "react";
import { Info, TrendingDown, HelpCircle } from "lucide-react";

interface InflationAdjusterCardProps {
  futureValue: number;
  futureValueLabel: string;
  defaultTenure: number;
}

export function InflationAdjusterCard({
  futureValue,
  futureValueLabel,
  defaultTenure,
}: InflationAdjusterCardProps) {
  const [inflationRate, setInflationRate] = React.useState(6);

  // tenure is always synced to the calculator's own period — no independent slider
  const tenure = defaultTenure;

  // What ₹1 today erodes to in purchasing power after 'tenure' years at inflationRate%
  // Real Value = FutureValue / (1 + r)^n
  const adjustedValue = React.useMemo(() => {
    if (isNaN(futureValue) || futureValue <= 0 || isNaN(inflationRate) || isNaN(tenure) || tenure <= 0) {
      return futureValue;
    }
    return futureValue / Math.pow(1 + inflationRate / 100, tenure);
  }, [futureValue, inflationRate, tenure]);

  // Purchasing power loss percentage
  const purchasingPowerLoss = futureValue > 0
    ? ((futureValue - adjustedValue) / futureValue) * 100
    : 0;

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(val);

  const formatCompact = (val: number): string => {
    const abs = Math.abs(val);
    const sign = val < 0 ? "-" : "";
    if (abs >= 1_00_00_000) return `${sign}₹${(abs / 1_00_00_000).toFixed(2)} Cr`;
    if (abs >= 1_00_000) return `${sign}₹${(abs / 1_00_000).toFixed(2)} L`;
    return formatCurrency(val);
  };

  return (
    <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 p-5 sm:p-6 rounded-2xl shadow-sm dark:shadow-none space-y-5 print:hidden">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-900 pb-3">
        <div className="flex items-center space-x-2">
          <TrendingDown className="h-5 w-5 text-indigo-500 shrink-0" />
          <div className="flex flex-col">
            <h2 className="text-base font-bold text-zinc-900 dark:text-white leading-tight">
              Inflation-Adjusted Real Value
            </h2>
            <span className="text-[10px] font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mt-0.5">
              Purchasing Power Calculator
            </span>
          </div>
        </div>
        {/* Period badge — locked to calculator tenure */}
        <span className="shrink-0 inline-flex items-center px-2.5 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
          {tenure} yr period
        </span>
      </div>

      {/* Value Cards */}
      <div className="grid grid-cols-2 gap-3">
        {/* Nominal Future Value — calculator output, fixed */}
        <div className="min-w-0 p-4 bg-zinc-50/60 dark:bg-zinc-900/20 border border-zinc-100 dark:border-zinc-800 rounded-xl space-y-1">
          <span className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider block leading-tight">
            {futureValueLabel}
          </span>
          <div
            className="text-lg font-extrabold text-zinc-800 dark:text-zinc-200 tracking-tight break-words"
            title={formatCurrency(futureValue)}
          >
            {formatCompact(futureValue)}
          </div>
          <span className="text-[10px] font-medium text-zinc-400 dark:text-zinc-500 block leading-tight">
            Nominal (at {tenure} yrs)
          </span>
        </div>

        {/* Real Adjusted Value */}
        <div className="min-w-0 p-4 bg-gradient-to-br from-indigo-50/40 to-indigo-100/20 dark:from-indigo-950/15 dark:to-indigo-900/5 border border-indigo-100/60 dark:border-indigo-900/30 rounded-xl space-y-1">
          <span className="text-[10px] font-bold text-indigo-500 dark:text-indigo-400 uppercase tracking-wider block leading-tight">
            Real Value Today
          </span>
          <div
            className="text-lg font-extrabold text-indigo-600 dark:text-indigo-400 tracking-tight break-words"
            title={formatCurrency(adjustedValue)}
          >
            {formatCompact(adjustedValue)}
          </div>
          <span className="text-[10px] font-medium text-indigo-400 dark:text-indigo-500 block leading-tight">
            In today&#39;s money
          </span>
        </div>
      </div>

      {/* Purchasing power loss bar */}
      {purchasingPowerLoss > 0 && (
        <div className="space-y-1.5">
          <div className="flex justify-between text-[10px] font-semibold text-zinc-400 dark:text-zinc-500">
            <span>Purchasing Power Lost to Inflation</span>
            <span className="text-rose-500 font-bold">{purchasingPowerLoss.toFixed(1)}%</span>
          </div>
          <div className="h-2 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-rose-400 to-rose-500 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(purchasingPowerLoss, 100)}%` }}
            />
          </div>
        </div>
      )}

      {/* Inflation Rate Slider — the only customizable parameter */}
      <div className="space-y-2 pt-1 border-t border-zinc-100 dark:border-zinc-900">
        <div className="flex justify-between items-center text-xs font-semibold text-zinc-700 dark:text-zinc-300">
          <span className="flex items-center gap-1">
            Estimated Annual Inflation
            <span className="group relative cursor-pointer">
              <HelpCircle className="h-3.5 w-3.5 text-zinc-400" />
              <span className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 w-52 bg-zinc-900 dark:bg-zinc-800 text-white text-[10px] p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity leading-normal z-50">
                Historical inflation in India averages 5–7% per year. RBI targets 4% CPI inflation. Use 6–7% for conservative estimates.
              </span>
            </span>
          </span>
          <span className="font-extrabold text-indigo-500">{inflationRate}%</span>
        </div>
        <input
          type="range"
          min={1}
          max={15}
          step={0.5}
          value={inflationRate}
          aria-label="Annual inflation rate slider"
          onChange={(e) => setInflationRate(Number(e.target.value))}
          className="w-full h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-indigo-500 dark:accent-indigo-400 focus:outline-none"
        />
        {/* Min / Max markers */}
        <div className="flex justify-between text-[9px] font-semibold text-zinc-300 dark:text-zinc-600">
          <span>1%</span>
          <span>15%</span>
        </div>
      </div>

      {/* Dynamic Summary */}
      <div className="flex items-start gap-2.5 p-3.5 bg-indigo-50/40 dark:bg-indigo-950/10 border border-indigo-100/50 dark:border-indigo-900/20 rounded-xl text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
        <Info className="h-4 w-4 text-indigo-400 shrink-0 mt-0.5" />
        <p>
          At <strong className="text-zinc-800 dark:text-zinc-200">{inflationRate}%</strong> annual inflation,{" "}
          your <strong className="text-zinc-800 dark:text-zinc-200">{futureValueLabel}</strong> of{" "}
          <strong className="text-zinc-800 dark:text-zinc-200">{formatCompact(futureValue)}</strong> received{" "}
          in <strong className="text-zinc-800 dark:text-zinc-200">{tenure} years</strong>{" "}
          will only have the purchasing power of{" "}
          <strong className="text-indigo-600 dark:text-indigo-400">{formatCompact(adjustedValue)}</strong> in today&#39;s money &mdash; a loss of{" "}
          <strong className="text-rose-500">{purchasingPowerLoss.toFixed(1)}%</strong> of real value.
        </p>
      </div>
    </div>
  );
}
