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
  const [tenure, setTenure] = React.useState(defaultTenure);

  // Sync state if defaultTenure changes from parent inputs
  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTenure(defaultTenure);
  }, [defaultTenure]);

  // Calculate inflation adjusted real value
  const adjustedValue = React.useMemo(() => {
    if (isNaN(futureValue) || isNaN(inflationRate) || isNaN(tenure)) return 0;
    return futureValue / Math.pow(1 + inflationRate / 100, tenure);
  }, [futureValue, inflationRate, tenure]);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  const formatCompactCurrency = (val: number) => {
    if (val >= 10000000) {
      return `${(val / 10000000).toFixed(2)} Cr`;
    }
    if (val >= 100000) {
      return `${(val / 100000).toFixed(2)} Lakh`;
    }
    return formatCurrency(val);
  };

  return (
    <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 p-5 sm:p-6 rounded-2xl shadow-sm dark:shadow-none space-y-6 print:hidden">
      <div className="flex items-center space-x-2 border-b border-zinc-100 dark:border-zinc-900 pb-3">
        <TrendingDown className="h-5 w-5 text-indigo-500" />
        <div className="flex flex-col">
          <h2 className="text-base font-bold text-zinc-900 dark:text-white leading-tight">
            Inflation-Adjusted Purchasing Power
          </h2>
          <span className="text-[10px] font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mt-0.5">
            Real Value & Purchasing Power Calculator
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Actual Future Value Card */}
        <div className="p-4 bg-zinc-50/50 dark:bg-zinc-900/10 border border-zinc-100 dark:border-zinc-900 rounded-xl space-y-1">
          <span className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider block">
            Future Value ({futureValueLabel})
          </span>
          <div className="text-xl font-extrabold text-zinc-800 dark:text-zinc-200 tracking-tight">
            {formatCurrency(futureValue)}
          </div>
          <span className="text-[10px] font-semibold text-zinc-400 dark:text-zinc-500 block">
            Nominal value (not adjusted for inflation)
          </span>
        </div>

        {/* Real Adjusted Value Card */}
        <div className="p-4 bg-gradient-to-br from-indigo-50/30 to-indigo-100/20 dark:from-indigo-950/10 dark:to-indigo-900/5 border border-indigo-100/50 dark:border-indigo-900/25 rounded-xl space-y-1">
          <span className="text-[10px] font-bold text-indigo-500 dark:text-indigo-400 uppercase tracking-wider block">
            Real Value (Adjusted)
          </span>
          <div className="text-xl font-extrabold text-indigo-600 dark:text-indigo-400 tracking-tight">
            {formatCurrency(adjustedValue)}
          </div>
          <span className="text-[10px] font-semibold text-indigo-400 dark:text-indigo-500 block">
            Value in today&apos;s purchasing power
          </span>
        </div>
      </div>

      {/* Sliders Container */}
      <div className="space-y-4 pt-2 border-t border-zinc-150/40 dark:border-zinc-900">
        {/* Inflation Rate Slider */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs font-semibold text-zinc-700 dark:text-zinc-300">
            <span className="flex items-center gap-1">
              Estimated Annual Inflation
              <span className="group relative cursor-pointer">
                <HelpCircle className="h-3.5 w-3.5 text-zinc-400" />
                <span className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 w-48 bg-zinc-900 dark:bg-zinc-800 text-white text-[10px] p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity leading-normal z-50">
                  Historical inflation in India average around 6% to 7% annually.
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
        </div>

        {/* Time Horizon Slider */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs font-semibold text-zinc-700 dark:text-zinc-300">
            <span>Holding Period</span>
            <span className="font-extrabold text-indigo-500">{tenure} Yrs</span>
          </div>
          <input
            type="range"
            min={1}
            max={40}
            step={1}
            value={tenure}
            aria-label="Time period in years slider"
            onChange={(e) => setTenure(Number(e.target.value))}
            className="w-full h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-indigo-500 dark:accent-indigo-400 focus:outline-none"
          />
        </div>
      </div>

      {/* Dynamic Summary Explanation */}
      <div className="flex items-start gap-2.5 p-3.5 bg-zinc-50 dark:bg-zinc-900/30 border border-zinc-200/50 dark:border-zinc-800/80 rounded-xl text-xs text-zinc-550 dark:text-zinc-400 leading-relaxed">
        <Info className="h-4.5 w-4.5 text-indigo-400 shrink-0 mt-0.5" />
        <p>
          At an estimated <strong className="text-zinc-800 dark:text-zinc-200">{inflationRate}%</strong> annual inflation rate, your future value of <strong className="text-zinc-800 dark:text-zinc-200">{formatCompactCurrency(futureValue)}</strong> in <strong className="text-zinc-800 dark:text-zinc-200">{tenure} years</strong> will buy what <strong className="text-indigo-500 dark:text-indigo-400">{formatCompactCurrency(adjustedValue)}</strong> buys today.
        </p>
      </div>
    </div>
  );
}
