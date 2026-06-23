import { CalculatorConfig } from "./types";

export const goldCalculators: CalculatorConfig[] = [
  {
    id: "gold-investment-calculator",
    name: "Gold Investment Calculator",
    category: "Gold",
    description: "Calculate the estimated growth and weight of your physical or digital gold investments.",
    seoTitle: "Gold Investment Calculator – Calculate Gold ROI Online",
    seoDescription: "Use our gold investment calculator to calculate returns on physical gold, weight in grams, and compound inflation-hedged wealth growth over time.",
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
      { id: "purchasingPower", label: "Est. Corpus in Today's Value (6% Inflation)", format: "currency" },
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

      const purchasingPower = maturityValue / Math.pow(1 + 0.06, t);

      return {
        values: { goldWeight, investedAmount: amt, gainedWealth, maturityValue, purchasingPower },
        chartData,
      };
    },
    educationalContent: [
      {
        title: "Benefits of Gold Investment Plans",
        content: "Use our Gold Investment Calculator to estimate your future asset values. Gold is historically recognized as a safe-haven asset and a store of value. Unlike paper fiat currency, physical gold cannot be printed, making it an excellent hedge against inflation and currency depreciation. During stock market corrections, gold prices often appreciate, protecting portfolios."
      }
    ],
    faqs: [
      { question: "What is the best gold investment plan?", answer: "Investors can buy physical gold (jewelry/coins), Digital Gold, Gold ETFs, Gold Mutual Funds, or Sovereign Gold Bonds (SGBs) issued by the government, which also pay an annual interest of 2.5%." },
      { question: "How does a gold investment calculator calculate returns?", answer: "A gold investment calculator calculates the growth of your gold portfolio based on the initial investment amount, current gold rate, expected annual appreciation rate, and holding duration." }
    ]
  },
  {
    id: "gold-sip-calculator",
    name: "Gold SIP Calculator",
    category: "Gold",
    description: "Calculate maturity returns of a Systematic Investment Plan (SIP) in gold.",
    seoTitle: "Gold SIP Calculator – Plan Regular Gold Savings Online",
    seoDescription: "Use the Gold SIP Calculator to calculate regular monthly gold purchases, project total weight accumulation, and estimate portfolio compounding.",
    inputs: [
      { id: "monthlyInvestment", label: "Monthly Savings in Gold", type: "slider", min: 500, max: 500000, step: 500, default: 10000, unit: "₹" },
      { id: "appreciation", label: "Expected Gold Appreciation (p.a.)", type: "slider", min: 1, max: 20, step: 0.5, default: 8, unit: "%" },
      { id: "timePeriod", label: "Investment Duration", type: "slider", min: 1, max: 30, step: 1, default: 10, unit: "Yr" },
    ],
    outputs: [
      { id: "investedAmount", label: "Total Invested", format: "currency" },
      { id: "estReturns", label: "Est. Returns", format: "currency" },
      { id: "totalValue", label: "Accumulated Value", format: "currency" },
      { id: "purchasingPower", label: "Est. Corpus in Today's Value (6% Inflation)", format: "currency" },
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

      const purchasingPower = totalValue / Math.pow(1 + 0.06, t);

      return {
        values: { investedAmount, estReturns, totalValue, purchasingPower },
        chartData,
      };
    },
    educationalContent: [
      {
        title: "Benefits of Gold Systematic Investment Plans",
        content: "Our Gold SIP Calculator helps you plan regular systematic investments. A Gold SIP is an investment method where you invest a fixed sum of money periodically into gold mutual funds or digital gold. By doing this, you accumulate gold incrementally, mitigating the risk of gold price volatility by purchasing grams of gold at varying prices over time."
      }
    ],
    faqs: [
      { question: "How does the gold SIP calculator calculate returns?", answer: "The gold SIP calculator uses the systematic investment plan compounding formula to project the future value of your regular monthly gold investments." },
      { question: "Can I calculate gold SIP maturity amount online?", answer: "Yes, you can easily calculate gold SIP maturity value and estimated weight accumulation online by inputting your monthly budget and expected growth rate." }
    ]
  },
  {
    id: "silver-investment-calculator",
    name: "Silver Investment Calculator",
    category: "Gold",
    description: "Calculate the growth and weight of your silver asset holdings over time.",
    seoTitle: "Silver Investment Calculator – Calculate Silver Returns",
    seoDescription: "Calculate returns on silver investments. Estimate weight in kilograms, asset value appreciation, and compound silver growth over years on WealthMaze.",
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
      { id: "purchasingPower", label: "Est. Corpus in Today's Value (6% Inflation)", format: "currency" },
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

      const purchasingPower = maturityValue / Math.pow(1 + 0.06, t);

      return {
        values: { silverWeight, investedAmount: amt, gainedWealth, maturityValue, purchasingPower },
        chartData,
      };
    },
    educationalContent: [
      {
        title: "Benefits of Silver Investment Plans",
        content: "Use the Silver Investment Calculator to project your wealth. Silver is both a precious and an industrial metal. More than half of global silver demand comes from industrial applications (electronics, solar panels, batteries), making it highly sensitive to economic growth. Silver is typically more volatile than gold, but can provide high returns during industrial expansions."
      }
    ],
    faqs: [
      { question: "How is silver purity measured?", answer: "Fine silver has 99.9% purity (999 fineness). Sterling silver has 92.5% purity (925 fineness) and is alloyed with copper for durability." },
      { question: "How do I calculate silver investment returns online?", answer: "Enter your initial investment amount, current silver rate per kg, expected appreciation rate, and holding tenure into the silver investment calculator to estimate your returns instantly." }
    ]
  }
];
