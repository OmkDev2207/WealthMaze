"use client";

import * as React from "react";
import { useCurrency, SUPPORTED_CURRENCIES } from "@/lib/CurrencyContext";
import { Coins, ChevronDown, Check } from "lucide-react";

export function CurrencySelector() {
  const { currency, setCurrency, currencyDetails } = useCurrency();
  const [isOpen, setIsOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1.5 px-3 h-9 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-xs font-bold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors focus:outline-none"
        aria-label="Select Currency"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <Coins className="h-4 w-4 text-emerald-500" />
        <span className="uppercase">{currencyDetails.code}</span>
        <span className="text-zinc-400 dark:text-zinc-500">({currencyDetails.symbol})</span>
        <ChevronDown className="h-3.5 w-3.5 text-zinc-400" />
      </button>

      {isOpen && (
        <ul
          role="listbox"
          className="absolute right-0 mt-1.5 w-52 max-h-64 overflow-y-auto bg-white dark:bg-zinc-950 border border-zinc-150 dark:border-zinc-900 rounded-2xl shadow-xl py-2 z-55 animate-in fade-in slide-in-from-top-2 duration-150 focus:outline-none"
        >
          {SUPPORTED_CURRENCIES.map((curr) => {
            const isSelected = curr.code === currency;
            return (
              <li key={curr.code} role="option" aria-selected={isSelected}>
                <button
                  onClick={() => {
                    setCurrency(curr.code);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-4 py-2.5 text-xs text-left font-semibold transition-colors ${
                    isSelected
                      ? "text-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20"
                      : "text-zinc-750 dark:text-zinc-350 hover:bg-zinc-50 dark:hover:bg-zinc-900/60"
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <span className="w-6 text-[10px] text-zinc-400 dark:text-zinc-500 font-bold uppercase">
                      {curr.code}
                    </span>
                    <span className="text-zinc-800 dark:text-zinc-200">
                      {curr.name} ({curr.symbol})
                    </span>
                  </div>
                  {isSelected && <Check className="h-3.5 w-3.5 text-emerald-500" />}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
