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

        const isCurrencyUnit = input.unit === "$" || input.unit === "₹" || input.unit === "currency";
        const helperTextStr = typeof input.helperText === "function" ? input.helperText(values) : input.helperText;

        if (input.type === "number") {
          return (
            <div key={input.id} className="space-y-1.5">
              <div className="flex justify-between items-center gap-2 sm:gap-4">
                <label htmlFor={`input-num-${input.id}`} className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 flex-1 min-w-0 py-1">
                  {input.label}
                </label>
                <div className="relative flex items-center shrink-0">
                  {isCurrencyUnit && (
                    <span className="absolute left-3 text-sm font-medium text-zinc-400">{symbol}</span>
                  )}
                  <input
                    id={`input-num-${input.id}`}
                    type="text"
                    placeholder={input.placeholder}
                    value={
                      isCurrencyUnit && value !== 0
                        ? new Intl.NumberFormat(locale).format(value)
                        : value
                    }
                    onChange={(e) => handleInputChange(input.id, e.target.value)}
                    className={`w-36 sm:w-44 h-11 text-right pr-4 font-bold text-zinc-900 dark:text-zinc-100 bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all ${
                      isCurrencyUnit ? (symbol.length > 2 ? "pl-11" : symbol.length > 1 ? "pl-9" : "pl-7") : "pl-4"
                    }`}
                  />
                  {!isCurrencyUnit && input.unit && (
                    <span className="ml-1.5 text-xs font-semibold text-zinc-500 dark:text-zinc-400">
                      {input.unit}
                    </span>
                  )}
                </div>
              </div>
              {helperTextStr && (
                <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold leading-relaxed">
                  {helperTextStr}
                </p>
              )}
            </div>
          );
        }

        // Default slider/number hybrid inputs
        const min = input.min ?? 0;
        const max = input.max ?? 100000000;
        const step = input.step ?? 1;

        return (
          <div key={input.id} className="space-y-2">
            <div className="flex justify-between items-center gap-2 sm:gap-4">
              <label htmlFor={`input-num-${input.id}`} className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 flex-1 min-w-0 py-1">
                {input.label}
              </label>
              <div className="relative flex items-center shrink-0">
                {isCurrencyUnit && (
                  <span className="absolute left-3 text-sm font-medium text-zinc-400">{symbol}</span>
                )}
                <input
                  id={`input-num-${input.id}`}
                  type="text"
                  value={
                    isCurrencyUnit
                      ? new Intl.NumberFormat(locale).format(value)
                      : value
                  }
                  onChange={(e) => handleInputChange(input.id, e.target.value)}
                  className={`w-32 sm:w-36 h-11 text-right pr-4 font-bold text-zinc-900 dark:text-zinc-100 bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all ${
                    isCurrencyUnit ? (symbol.length > 2 ? "pl-11" : symbol.length > 1 ? "pl-9" : "pl-7") : "pl-4"
                  }`}
                />
                {!isCurrencyUnit && input.unit && (
                  <span className="ml-1.5 text-xs font-semibold text-zinc-500 dark:text-zinc-400">
                    {input.unit}
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-4 pt-1">
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
            {helperTextStr && (
              <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed pt-0.5">
                {helperTextStr}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
