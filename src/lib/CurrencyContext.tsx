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
  { code: "SGD", symbol: "S$", locale: "en-SG", name: "Singapore Dollar" },
  { code: "JPY", symbol: "¥", locale: "ja-JP", name: "Japanese Yen" },
  { code: "RUB", symbol: "₽", locale: "ru-RU", name: "Russian Ruble" },
  { code: "KRW", symbol: "₩", locale: "ko-KR", name: "South Korean Won" },
  { code: "CNY", symbol: "¥", locale: "zh-CN", name: "Chinese Yuan" },
  { code: "HKD", symbol: "HK$", locale: "zh-HK", name: "Hong Kong Dollar" },
  { code: "NZD", symbol: "NZ$", locale: "en-NZ", name: "New Zealand Dollar" },
  { code: "CHF", symbol: "CHF", locale: "fr-CH", name: "Swiss Franc" },
  { code: "BRL", symbol: "R$", locale: "pt-BR", name: "Brazilian Real" },
  { code: "MXN", symbol: "$", locale: "es-MX", name: "Mexican Peso" },
  { code: "ZAR", symbol: "R", locale: "en-ZA", name: "South African Rand" },
  { code: "SAR", symbol: "ر.س", locale: "ar-SA", name: "Saudi Riyal" },
  { code: "TRY", symbol: "₺", locale: "tr-TR", name: "Turkish Lira" },
  { code: "SEK", symbol: "kr", locale: "sv-SE", name: "Swedish Krona" },
  { code: "NOK", symbol: "kr", locale: "no-NO", name: "Norwegian Krone" },
  { code: "DKK", symbol: "kr", locale: "da-DK", name: "Danish Krone" },
  { code: "ILS", symbol: "₪", locale: "he-IL", name: "Israeli Shekel" },
  { code: "MYR", symbol: "RM", locale: "ms-MY", name: "Malaysian Ringgit" },
  { code: "THB", symbol: "฿", locale: "th-TH", name: "Thai Baht" },
  { code: "IDR", symbol: "Rp", locale: "id-ID", name: "Indonesian Rupiah" },
  { code: "PHP", symbol: "₱", locale: "fil-PH", name: "Philippine Peso" },
  { code: "VND", symbol: "₫", locale: "vi-VN", name: "Vietnamese Dong" },
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
    if (tz.includes("Singapore")) return "SGD";
    if (tz.includes("Tokyo")) return "JPY";
    if (tz.includes("Moscow")) return "RUB";
    if (tz.includes("Seoul")) return "KRW";
    if (tz.includes("Shanghai") || tz.includes("Urumqi") || tz.includes("Chongqing") || tz.includes("Harbin")) return "CNY";
    if (tz.includes("Hong_Kong")) return "HKD";
    if (tz.includes("Auckland") || tz.includes("Chatham")) return "NZD";
    if (tz.includes("Zurich")) return "CHF";
    if (tz.includes("Sao_Paulo") || tz.includes("Brasilia") || tz.includes("Manaus")) return "BRL";
    if (tz.includes("Mexico_City") || tz.includes("Monterrey")) return "MXN";
    if (tz.includes("Johannesburg")) return "ZAR";
    if (tz.includes("Riyadh")) return "SAR";
    if (tz.includes("Istanbul")) return "TRY";
    if (tz.includes("Stockholm")) return "SEK";
    if (tz.includes("Oslo")) return "NOK";
    if (tz.includes("Copenhagen")) return "DKK";
    if (tz.includes("Jerusalem")) return "ILS";
    if (tz.includes("Kuala_Lumpur")) return "MYR";
    if (tz.includes("Bangkok")) return "THB";
    if (tz.includes("Jakarta")) return "IDR";
    if (tz.includes("Manila")) return "PHP";
    if (tz.includes("Ho_Chi_Minh") || tz.includes("Hanoi")) return "VND";
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
    if (lang.includes("SG")) return "SGD";
    if (lang.includes("JP")) return "JPY";
    if (lang.includes("RU")) return "RUB";
    if (lang.includes("KR")) return "KRW";
    if (lang.includes("CN")) return "CNY";
    if (lang.includes("HK")) return "HKD";
    if (lang.includes("NZ")) return "NZD";
    if (lang.includes("CH")) return "CHF";
    if (lang.includes("BR")) return "BRL";
    if (lang.includes("MX")) return "MXN";
    if (lang.includes("ZA")) return "ZAR";
    if (lang.includes("SA")) return "SAR";
    if (lang.includes("TR")) return "TRY";
    if (lang.includes("SE")) return "SEK";
    if (lang.includes("NO")) return "NOK";
    if (lang.includes("DK")) return "DKK";
    if (lang.includes("IL")) return "ILS";
    if (lang.includes("MY")) return "MYR";
    if (lang.includes("TH")) return "THB";
    if (lang.includes("ID")) return "IDR";
    if (lang.includes("PH")) return "PHP";
    if (lang.includes("VN")) return "VND";
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
