import { CalculatorConfig } from "./types";

export const goldCalculators: CalculatorConfig[] = [
  {
    id: "gold-investment-calculator",
    name: "Gold Investment Calculator",
    category: "Gold",
    description: "Calculate the estimated growth and weight of your physical or digital gold investments.",
    seoTitle: "Gold Investment Calculator - Estimate Gold Wealth Growth | WealthMaze",
    seoDescription: "Calculate returns on gold investments. Estimate purchasing power, weight in grams, and value growth over time using WealthMaze.",
    inputs: [
      { id: "investment", label: "Initial Investment Amount", type: "slider", min: 1000, max: 5000000, step: 5000, default: 100000, unit: "₹" },
      { id: "goldRate", label: "Current Gold Rate (per 10g - 24k)", type: "number", default: 72000, unit: "₹" },
      { id: "appreciation", label: "Expected Annual Appreciation", type: "slider", min: 1, max: 20, step: 0.5, default: 8, unit: "%" },
      { id: "years", label: "Holding Period", type: "slider", min: 1, max: 30, step: 1, default: 8, unit: "Yr" },
    ],
    outputs: [
      { id: "goldWeight", label: "Grams of Gold Purchased", format: "number" },
      { id: "investedAmount", label: "Amount Invested", format: "currency" },
      { id: "gainedWealth", label: "Estimated Wealth Gained", format: "currency" },
      { id: "maturityValue", label: "Estimated Maturity Value", format: "currency" },
    ],
    calculate: (inputs) => {
      const amt = inputs.investment;
      const rate = inputs.goldRate;
      const app = inputs.appreciation;
      const t = inputs.years;

      const goldWeight = (amt / rate) * 10; // rate is per 10 grams
      const maturityValue = amt * Math.pow(1 + app / 100, t);
      const gainedWealth = maturityValue - amt;

      const chartData = [];
      for (let yr = 1; yr <= t; yr++) {
        const val = amt * Math.pow(1 + app / 100, yr);
        chartData.push({
          name: `Yr ${yr}`,
          "Gold Investment Value": Math.round(val),
          "Invested Capital": amt,
        });
      }

      return {
        values: { goldWeight, investedAmount: amt, gainedWealth, maturityValue },
        chartData,
      };
    },
    educationalContent: [
      {
        title: "Why Invest in Gold?",
        content: "Gold is historically recognized as a safe-haven asset and a store of value. Unlike paper fiat currency, physical gold cannot be printed, making it an excellent hedge against inflation and currency depreciation. During times of geopolitical tension or stock market crashes, gold prices often appreciate, providing cushion to a diversified portfolio."
      }
    ],
    faqs: [
      { question: "What are the ways to invest in gold?", answer: "Investors can buy physical jewelry/coins, Digital Gold, Gold ETFs, Gold Mutual Funds, or Sovereign Gold Bonds (SGBs) issued by the government, which also pay an annual interest of 2.5%." }
    ]
  },
  {
    id: "gold-sip-calculator",
    name: "Gold SIP Calculator",
    category: "Gold",
    description: "Calculate maturity returns of a Systematic Investment Plan (SIP) in gold.",
    seoTitle: "Gold SIP Calculator - Calculate Regular Gold Savings | WealthMaze",
    seoDescription: "Estimate returns on regular monthly gold purchases. Project your gold weight accumulation and portfolio value with WealthMaze.",
    inputs: [
      { id: "monthlyInvestment", label: "Monthly Savings in Gold", type: "slider", min: 500, max: 500000, step: 500, default: 10000, unit: "₹" },
      { id: "appreciation", label: "Expected Gold Appreciation (p.a.)", type: "slider", min: 1, max: 20, step: 0.5, default: 8, unit: "%" },
      { id: "timePeriod", label: "Investment Duration", type: "slider", min: 1, max: 30, step: 1, default: 10, unit: "Yr" },
    ],
    outputs: [
      { id: "investedAmount", label: "Total Invested", format: "currency" },
      { id: "estReturns", label: "Est. Returns", format: "currency" },
      { id: "totalValue", label: "Accumulated Value", format: "currency" },
    ],
    calculate: (inputs) => {
      const p = inputs.monthlyInvestment;
      const r = inputs.appreciation;
      const t = inputs.timePeriod;

      const i = r / (12 * 100);
      const n = t * 12;

      const totalValue = p * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
      const investedAmount = p * n;
      const estReturns = totalValue - investedAmount;

      const chartData = [];
      for (let yr = 1; yr <= t; yr++) {
        const m = yr * 12;
        const val = p * ((Math.pow(1 + i, m) - 1) / i) * (1 + i);
        chartData.push({
          name: `Yr ${yr}`,
          "Invested Capital": p * m,
          "Gold Portfolio Value": Math.round(val),
        });
      }

      return {
        values: { investedAmount, estReturns, totalValue },
        chartData,
      };
    },
    educationalContent: [
      {
        title: "Accumulating Gold through SIP",
        content: "A Gold SIP is an investment method where you invest a fixed sum of money periodically into gold mutual funds or digital gold. By doing this, you accumulate gold incrementally, mitigating the risk of gold price volatility by purchasing grams of gold at varying prices over time."
      }
    ],
    faqs: [
      { question: "What is digital gold?", answer: "Digital gold is a convenient way to purchase 24k gold online, backed by physical gold stored securely in insured vaults. You can buy digital gold starting from as low as ₹10." }
    ]
  },
  {
    id: "silver-investment-calculator",
    name: "Silver Investment Calculator",
    category: "Gold",
    description: "Calculate the growth and weight of your silver asset holdings over time.",
    seoTitle: "Silver Investment Calculator - Estimate Silver Asset Return | WealthMaze",
    seoDescription: "Calculate returns on silver investments. Estimate weight in kilograms and value appreciation over years using WealthMaze.",
    inputs: [
      { id: "investment", label: "Initial Investment Amount", type: "slider", min: 1000, max: 2000000, step: 5000, default: 50000, unit: "₹" },
      { id: "silverRate", label: "Current Silver Rate (per kg)", type: "number", default: 90000, unit: "₹" },
      { id: "appreciation", label: "Expected Annual Appreciation", type: "slider", min: 1, max: 20, step: 0.5, default: 7, unit: "%" },
      { id: "years", label: "Holding Period", type: "slider", min: 1, max: 30, step: 1, default: 5, unit: "Yr" },
    ],
    outputs: [
      { id: "silverWeight", label: "Kilograms of Silver Purchased", format: "number" },
      { id: "investedAmount", label: "Amount Invested", format: "currency" },
      { id: "gainedWealth", label: "Estimated Wealth Gained", format: "currency" },
      { id: "maturityValue", label: "Estimated Maturity Value", format: "currency" },
    ],
    calculate: (inputs) => {
      const amt = inputs.investment;
      const rate = inputs.silverRate;
      const app = inputs.appreciation;
      const t = inputs.years;

      const silverWeight = amt / rate;
      const maturityValue = amt * Math.pow(1 + app / 100, t);
      const gainedWealth = maturityValue - amt;

      const chartData = [];
      for (let yr = 1; yr <= t; yr++) {
        const val = amt * Math.pow(1 + app / 100, yr);
        chartData.push({
          name: `Yr ${yr}`,
          "Silver Investment Value": Math.round(val),
          "Invested Capital": amt,
        });
      }

      return {
        values: { silverWeight, investedAmount: amt, gainedWealth, maturityValue },
        chartData,
      };
    },
    educationalContent: [
      {
        title: "Investing in Silver",
        content: "Silver is both a precious and an industrial metal. More than half of global silver demand comes from industrial applications (electronics, solar panels, batteries), making it highly sensitive to economic growth. Silver is typically more volatile than gold, but can provide high returns during industrial expansions."
      }
    ],
    faqs: [
      { question: "How is silver purity measured?", answer: "Fine silver has 99.9% purity (999 fineness). Sterling silver has 92.5% purity (925 fineness) and is alloyed with copper for durability." }
    ]
  }
];
