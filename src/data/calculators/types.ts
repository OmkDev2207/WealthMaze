/* eslint-disable @typescript-eslint/no-explicit-any */
export interface CalculatorInput {
  id: string;
  label: string;
  type: "number" | "slider" | "select";
  min?: number;
  max?: number;
  step?: number;
  default: number;
  unit?: string;
  placeholder?: string;
  helperText?: string | ((values: Record<string, any>) => string);
  options?: { label: string; value: number }[];
}

export interface CalculatorOutput {
  id: string;
  label: string;
  unit?: string;
  format?: "currency" | "percent" | "number";
}

export interface CalculatorResult {
  values: Record<string, any>;
  chartData: Record<string, any>[];
  schedule?: Record<string, any>[];
  comparison?: {
    title: string;
    headers: string[];
    rows: (string | number)[][];
  };
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface EducationalSection {
  title: string;
  content: string;
}

export interface CalculatorConfig {
  id: string;
  name: string;
  category: "Investing" | "Retirement" | "Loans" | "Tax" | "Savings" | "Gold" | "Mutual Funds" | "Stock Market" | "Lifestyle";
  description: string;
  seoTitle: string;
  seoDescription: string;
  inputs: CalculatorInput[];
  outputs: CalculatorOutput[];
  calculate: (inputs: Record<string, any>) => CalculatorResult;
  educationalContent: EducationalSection[];
  faqs: FAQItem[];
  /** Date string (e.g. "July 2026") indicating when this calculator's rates and formulas were last reviewed */
  lastUpdated: string;
  isIndiaSpecific?: boolean;
}
