export * from "./types";
import { CalculatorConfig } from "./types";
import { investingCalculators } from "./investing";
import { stocksCalculators } from "./stocks";
import { goldCalculators } from "./gold";
import { savingsCalculators } from "./savings";
import { loansCalculators } from "./loans";
import { taxCalculators } from "./tax";
import { lifestyleCalculators } from "./lifestyle";

export const allCalculators: CalculatorConfig[] = [
  ...investingCalculators,
  ...stocksCalculators,
  ...goldCalculators,
  ...savingsCalculators,
  ...loansCalculators,
  ...taxCalculators,
  ...lifestyleCalculators,
];

export const getCalculatorById = (id: string): CalculatorConfig | undefined => {
  return allCalculators.find((c) => c.id === id);
};

export interface CategoryDetails {
  name: string;
  slug: string;
  description: string;
  icon: string;
}

export const categories: CategoryDetails[] = [
  {
    name: "Investing",
    slug: "investing",
    description: "Grow your wealth with mutual funds, compound returns, and SIP planners.",
    icon: "TrendingUp",
  },
  {
    name: "Retirement",
    slug: "retirement",
    description: "Determine your early retirement goals, FIRE numbers, and pension corpus.",
    icon: "Calendar",
  },
  {
    name: "Savings",
    slug: "savings",
    description: "Maximize your fixed income assets like FD, RD, PPF, EPF, and NPS.",
    icon: "ShieldCheck",
  },
  {
    name: "Loans",
    slug: "loans",
    description: "Calculate EMIs, prepayments, and amortization timelines to become debt-free.",
    icon: "Percent",
  },
  {
    name: "Tax",
    slug: "tax",
    description: "Calculate capital gains tax and compare New vs Old tax slabs.",
    icon: "FileText",
  },
  {
    name: "Stock Market",
    slug: "stock-market",
    description: "Calculate dividend yield, stock gains, and trade position sizing.",
    icon: "BarChart3",
  },
  {
    name: "Gold",
    slug: "gold",
    description: "Hedge against inflation by calculating gold/silver investment values.",
    icon: "Coins",
  },
  {
    name: "Lifestyle",
    slug: "lifestyle",
    description: "Plan financial freedom milestones, inflation costs, and timeline targets.",
    icon: "Activity",
  },
];
