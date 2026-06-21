"use client";

import * as React from "react";

export interface CurrencyDetails {
  code: string;
  symbol: string;
  locale: string;
  name: string;
}

export const SUPPORTED_CURRENCIES: CurrencyDetails[] = [
  { code: "USD", symbol: "$", locale: "en-US", name: "US Dollar" },
  { code: "INR", symbol: "₹", locale: "en-IN", name: "Indian Rupee" },
  { code: "EUR", symbol: "€", locale: "de-DE", name: "Euro" },
  { code: "GBP", symbol: "£", locale: "en-GB", name: "British Pound" },
  { code: "CAD", symbol: "CA$", locale: "en-CA", name: "Canadian Dollar" },
  { code: "AUD", symbol: "A$", locale: "en-AU", name: "Australian Dollar" },
  { code: "AED", symbol: "د.إ", locale: "ar-AE", name: "UAE Dirham" },
];

export const detectUserCurrency = (): string => {
  if (typeof window === "undefined") return "USD";
  const saved = localStorage.getItem("user-currency");
  if (saved) return saved;

  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (tz.includes("Kolkata") || tz.includes("Calcutta")) return "INR";
    if (tz.includes("London")) return "GBP";
    if (tz.includes("Dubai")) return "AED";
    if (tz.includes("Sydney") || tz.includes("Melbourne") || tz.includes("Brisbane") || tz.includes("Adelaide") || tz.includes("Perth")) return "AUD";
    if (tz.includes("Toronto") || tz.includes("Vancouver") || tz.includes("Montreal") || tz.includes("Ottawa")) return "CAD";
    if (tz.includes("Europe")) return "EUR";
    if (tz.includes("New_York") || tz.includes("Chicago") || tz.includes("Denver") || tz.includes("Los_Angeles") || tz.includes("Anchorage") || tz.includes("Honolulu")) {
      return "USD";
    }
  } catch (e) {}

  try {
    const lang = navigator.language || (navigator.languages && navigator.languages[0]) || "";
    if (lang.includes("IN")) return "INR";
    if (lang.includes("GB")) return "GBP";
    if (lang.includes("CA")) return "CAD";
    if (lang.includes("AU")) return "AUD";
    if (lang.includes("AE")) return "AED";
    if (lang.includes("US")) return "USD";
    const eurLocales = ["FR", "DE", "IT", "ES", "NL", "BE", "AT", "FI", "IE", "PT", "GR"];
    if (eurLocales.some(loc => lang.includes(loc))) return "EUR";
  } catch (e) {}

  return "USD";
};

interface CurrencyContextType {
  currency: string;
  currencyDetails: CurrencyDetails;
  setCurrency: (code: string) => void;
  formatCurrency: (value: number, compact?: boolean) => string;
  formatNumber: (value: number, fractionDigits?: number) => string;
}

const CurrencyContext = React.createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = React.useState<string>("USD");

  React.useEffect(() => {
    setCurrencyState(detectUserCurrency());
  }, []);

  const setCurrency = (code: string) => {
    localStorage.setItem("user-currency", code);
    setCurrencyState(code);
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("user-currency-changed"));
    }
  };

  const currencyDetails = React.useMemo(() => {
    return SUPPORTED_CURRENCIES.find(c => c.code === currency) || SUPPORTED_CURRENCIES[0];
  }, [currency]);

  const formatCurrency = React.useCallback((value: number, compact = false): string => {
    if (isNaN(value)) value = 0;
    try {
      const details = SUPPORTED_CURRENCIES.find(c => c.code === currency) || SUPPORTED_CURRENCIES[0];
      
      // Indian standard Crore/Lakh formatting
      if (details.code === "INR" && compact) {
        const abs = Math.abs(value);
        const sign = value < 0 ? "-" : "";
        if (abs >= 1_00_00_000) {
          return `${sign}₹${(abs / 1_00_00_000).toFixed(2)} Cr`;
        }
        if (abs >= 1_00_000) {
          return `${sign}₹${(abs / 1_00_00_000 * 100).toFixed(2)} L`;
        }
      }

      return new Intl.NumberFormat(details.locale, {
        style: "currency",
        currency: details.code,
        maximumFractionDigits: 0,
        ...(compact ? { notation: "compact", compactDisplay: "short" } : {}),
      }).format(value);
    } catch (e) {
      return `${currency} ${value.toLocaleString()}`;
    }
  }, [currency]);

  const formatNumber = React.useCallback((value: number, fractionDigits = 2): string => {
    if (isNaN(value)) value = 0;
    try {
      const details = SUPPORTED_CURRENCIES.find(c => c.code === currency) || SUPPORTED_CURRENCIES[0];
      return new Intl.NumberFormat(details.locale, {
        maximumFractionDigits: fractionDigits,
      }).format(value);
    } catch (e) {
      return value.toLocaleString();
    }
  }, [currency]);

  return (
    <CurrencyContext.Provider value={{ currency, currencyDetails, setCurrency, formatCurrency, formatNumber }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = React.useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
}
