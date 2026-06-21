"use client";

import * as React from "react";
import { CalculatorInput } from "@/data/calculators/types";
import { useCurrency } from "@/lib/CurrencyContext";

interface CalculatorFormProps {
  inputs: CalculatorInput[];
  values: Record<string, number>;
  onChange: (id: string, val: number) => void;
  isIndiaSpecific?: boolean;
}

export function CalculatorForm({ inputs, values, onChange, isIndiaSpecific = false }: CalculatorFormProps) {
  const { currencyDetails } = useCurrency();
  const symbol = isIndiaSpecific ? "₹" : currencyDetails.symbol;
  const locale = isIndiaSpecific ? "en-IN" : currencyDetails.locale;

  const handleInputChange = (id: string, rawVal: string) => {
    const num = Number(rawVal.replace(/[^0-9.-]/g, ""));
    if (isNaN(num)) return;
    onChange(id, num);
  };

  return (
    <div className="space-y-6">
      {inputs.map((input) => {
        const value = values[input.id] ?? input.default;

        if (input.type === "select") {
          return (
            <div key={input.id} className="space-y-2">
              <label htmlFor={input.id} className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                {input.label}
              </label>
              <select
                id={input.id}
                value={value}
                onChange={(e) => onChange(input.id, Number(e.target.value))}
                className="w-full h-12 px-4 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-base text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
              >
                {input.options?.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          );
        }

        // Default slider/number hybrid inputs
        const min = input.min ?? 0;
        const max = input.max ?? 100000000;
        const step = input.step ?? 1;

        return (
          <div key={input.id} className="space-y-3">
            <div className="flex justify-between items-center">
              <label htmlFor={`input-num-${input.id}`} className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                {input.label}
              </label>
              <div className="relative flex items-center">
                {input.unit === "₹" && (
                  <span className="absolute left-3 text-sm font-medium text-zinc-400">{symbol}</span>
                )}
                <input
                  id={`input-num-${input.id}`}
                  type="text"
                  value={
                    input.unit === "₹"
                      ? new Intl.NumberFormat(locale).format(value)
                      : value
                  }
                  onChange={(e) => handleInputChange(input.id, e.target.value)}
                  className={`w-36 h-11 text-right pr-4 font-bold text-zinc-900 dark:text-zinc-100 bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all ${
                    input.unit === "₹" ? (symbol.length > 2 ? "pl-11" : symbol.length > 1 ? "pl-9" : "pl-7") : "pl-4"
                  }`}
                />
                {input.unit !== "₹" && input.unit && (
                  <span className="ml-1.5 text-xs font-semibold text-zinc-500 dark:text-zinc-400">
                    {input.unit}
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <input
                type="range"
                id={`input-slide-${input.id}`}
                min={min}
                max={max}
                step={step}
                value={value}
                aria-label={`Slider for ${input.label}`}
                onChange={(e) => onChange(input.id, Number(e.target.value))}
                className="w-full h-1.5 bg-zinc-150 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-emerald-500 dark:accent-emerald-400 focus:outline-none"
              />
            </div>

          </div>
        );
      })}
    </div>
  );
}
