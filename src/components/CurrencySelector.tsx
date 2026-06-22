"use client";
 
import * as React from "react";
import { useCurrency, SUPPORTED_CURRENCIES } from "@/lib/CurrencyContext";
import { Coins, ChevronDown, Check, Search } from "lucide-react";
 
export function CurrencySelector() {
  const { currency, setCurrency, currencyDetails } = useCurrency();
  const [isOpen, setIsOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
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

  React.useEffect(() => {
    if (!isOpen) {
      setSearchQuery("");
    }
  }, [isOpen]);

  const filteredCurrencies = React.useMemo(() => {
    return SUPPORTED_CURRENCIES.filter((curr) =>
      curr.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      curr.code.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);
 
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
        <div
          role="listbox"
          className="absolute right-0 mt-1.5 w-56 max-h-72 overflow-hidden flex flex-col bg-white dark:bg-zinc-950 border border-zinc-150 dark:border-zinc-900 rounded-2xl shadow-xl z-55 animate-in fade-in slide-in-from-top-2 duration-150"
        >
          {/* Dropdown Search Input */}
          <div className="p-2 border-b border-zinc-100 dark:border-zinc-900 flex items-center bg-white dark:bg-zinc-950">
            <div className="relative w-full">
              <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-zinc-400 dark:text-zinc-650" />
              <input
                type="text"
                placeholder="Search country/currency..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-8 pl-8 pr-3 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-[11px] text-zinc-900 dark:text-zinc-100 placeholder-zinc-450 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                autoFocus
              />
            </div>
          </div>

          {/* Currencies List */}
          <ul className="flex-grow overflow-y-auto max-h-56 py-1 focus:outline-none">
            {filteredCurrencies.map((curr) => {
              const isSelected = curr.code === currency;
              return (
                <li key={curr.code} role="option" aria-selected={isSelected}>
                  <button
                    onClick={() => {
                      setCurrency(curr.code);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-4 py-2.5 text-[11px] text-left font-semibold transition-colors ${
                      isSelected
                        ? "text-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20"
                        : "text-zinc-750 dark:text-zinc-350 hover:bg-zinc-50 dark:hover:bg-zinc-900/60"
                    }`}
                  >
                    <div className="flex items-center space-x-2.5">
                      <span className="w-7 text-[10px] text-zinc-400 dark:text-zinc-500 font-bold uppercase">
                        {curr.code}
                      </span>
                      <span className="text-zinc-800 dark:text-zinc-200 truncate max-w-[120px]">
                        {curr.name} ({curr.symbol})
                      </span>
                    </div>
                    {isSelected && <Check className="h-3.5 w-3.5 text-emerald-500" />}
                  </button>
                </li>
              );
            })}

            {filteredCurrencies.length === 0 && (
              <div className="text-center py-6 text-xs text-zinc-405 dark:text-zinc-505">
                No matching currencies.
              </div>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
