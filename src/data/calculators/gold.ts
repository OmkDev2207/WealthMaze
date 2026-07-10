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
        title: "Benefits of Gold Investment Plans",
        content: "Use our Gold Investment Calculator to estimate your future asset values. Gold is historically recognized as a safe-haven asset and a store of value. Unlike paper fiat currency, physical gold cannot be printed, making it an excellent hedge against inflation and currency depreciation. During stock market corrections, gold prices often appreciate, protecting portfolios."
      }
    ],
    faqs: [
      { question: "What is the best gold investment plan?", answer: "Investors can buy physical gold (jewelry/coins), Digital Gold, Gold ETFs, Gold Mutual Funds, or Sovereign Gold Bonds (SGBs) issued by the government, which also pay an annual interest of 2.5%." },
      { question: "How does a gold investment calculator calculate returns?", answer: "A gold investment calculator calculates the growth of your gold portfolio based on the initial investment amount, current gold rate, expected annual appreciation rate, and holding duration." }
    ],
  lastUpdated: "July 2026",
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
        title: "Benefits of Gold Systematic Investment Plans",
        content: "Our Gold SIP Calculator helps you plan regular systematic investments. A Gold SIP is an investment method where you invest a fixed sum of money periodically into gold mutual funds or digital gold. By doing this, you accumulate gold incrementally, mitigating the risk of gold price volatility by purchasing grams of gold at varying prices over time."
      }
    ],
    faqs: [
      { question: "How does the gold SIP calculator calculate returns?", answer: "The gold SIP calculator uses the systematic investment plan compounding formula to project the future value of your regular monthly gold investments." },
      { question: "Can I calculate gold SIP maturity amount online?", answer: "Yes, you can easily calculate gold SIP maturity value and estimated weight accumulation online by inputting your monthly budget and expected growth rate." }
    ],
  lastUpdated: "July 2026",
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
        title: "Benefits of Silver Investment Plans",
        content: "Use the Silver Investment Calculator to project your wealth. Silver is both a precious and an industrial metal. More than half of global silver demand comes from industrial applications (electronics, solar panels, batteries), making it highly sensitive to economic growth. Silver is typically more volatile than gold, but can provide high returns during industrial expansions."
      }
    ],
    faqs: [
      { question: "How is silver purity measured?", answer: "Fine silver has 99.9% purity (999 fineness). Sterling silver has 92.5% purity (925 fineness) and is alloyed with copper for durability." },
      { question: "How do I calculate silver investment returns online?", answer: "Enter your initial investment amount, current silver rate per kg, expected appreciation rate, and holding tenure into the silver investment calculator to estimate your returns instantly." }
    ],
  lastUpdated: "July 2026",
  },
  {
    id: "digital-gold-calculator",
    name: "Digital Gold Calculator",
    category: "Gold",
    description: "Calculate weight in grams, GST tax impacts, buy-sell spreads, and estimated future returns on digital gold investments.",
    seoTitle: "Digital Gold Calculator – Calculate Weight, GST & Net Returns",
    seoDescription: "Estimate your digital gold returns online. Calculate net gold weight in grams after 3% GST, project buy-sell spread impact, and future value growth.",
    inputs: [
      { id: "investment", label: "Investment Amount (Inclusive of GST)", type: "slider", min: 500, max: 2000000, step: 500, default: 10000, unit: "₹" },
      { id: "goldRate", label: "Current Gold Buying Price (per Gram)", type: "number", default: 7200, unit: "₹/g" },
      { id: "gstRate", label: "GST Rate on Purchase", type: "slider", min: 0, max: 10, step: 0.5, default: 3, unit: "%" },
      { id: "spreadRate", label: "Buy-Sell Spread / Platform Fee", type: "slider", min: 0, max: 10, step: 0.5, default: 3, unit: "%" },
      { id: "appreciation", label: "Expected Annual Appreciation", type: "slider", min: 1, max: 20, step: 0.5, default: 8, unit: "%" },
      { id: "years", label: "Investment Tenure", type: "slider", min: 1, max: 30, step: 1, default: 5, unit: "Yr" },
    ],
    outputs: [
      { id: "netInvested", label: "Net Amount Invested", format: "currency" },
      { id: "gstAmount", label: "GST Amount Paid", format: "currency" },
      { id: "goldWeight", label: "Gold Weight Purchased (Grams)", format: "number" },
      { id: "grossMaturity", label: "Gross Maturity Value", format: "currency" },
      { id: "spreadCost", label: "Spread Cost at Sale", format: "currency" },
      { id: "maturityValue", label: "Net Maturity Value", format: "currency" },
      { id: "purchasingPower", label: "Value in Today's Money (6% Inflation)", format: "currency" },
    ],
    calculate: (inputs) => {
      const amt = inputs.investment;
      const rate = inputs.goldRate;
      const gst = inputs.gstRate;
      const spread = inputs.spreadRate;
      const app = inputs.appreciation;
      const t = inputs.years;

      const netInvested = amt / (1 + gst / 100);
      const gstAmount = amt - netInvested;
      const goldWeight = netInvested / rate;
      const grossMaturity = netInvested * Math.pow(1 + app / 100, t);
      const spreadCost = grossMaturity * (spread / 100);
      const maturityValue = grossMaturity - spreadCost;
      const purchasingPower = maturityValue / Math.pow(1.06, t);

      const chartData = [];
      for (let yr = 1; yr <= t; yr++) {
        const grossVal = netInvested * Math.pow(1 + app / 100, yr);
        const spreadAmt = grossVal * (spread / 100);
        const netVal = grossVal - spreadAmt;
        chartData.push({
          name: `Yr ${yr}`,
          "Gold Investment Value": Math.round(netVal),
          "Invested Capital": amt,
        });
      }

      return {
        values: {
          netInvested,
          gstAmount,
          goldWeight,
          grossMaturity,
          spreadCost,
          maturityValue,
          purchasingPower,
        },
        chartData,
      };
    },
    educationalContent: [
      {
        title: "How Does a Digital Gold Calculator Work?",
        content: "Our Digital Gold Calculator helps you compute the net physical gold weight and maturity returns of your online gold purchases. When you buy digital gold on popular platforms, a 3% Goods and Services Tax (GST) is applied to your transaction amount. The remaining capital is used to purchase 24K physical gold, which is stored securely in vaults. When you sell, a transaction spread (the difference between buying and selling rates, usually around 3% to 6%) is applied. This calculator factors in all of these friction costs to show you the real net profit of your gold holdings."
      },
      {
        title: "Digital Gold vs. Sovereign Gold Bonds (SGB) and Gold ETFs",
        content: "While digital gold is highly convenient (allowing investments as low as ₹1), it carries unique costs like GST and buy-sell spreads. In contrast, Gold ETFs are traded on stock exchanges and carry small expense ratios instead of GST. Sovereign Gold Bonds (SGBs) are backed by the government, carry no GST, and pay an additional 2.5% annual interest. Investors looking to accumulate gold should weigh convenience against these fee structures to choose the most cost-efficient route."
      }
    ],
    faqs: [
      { question: "Why is there a difference between the buying and selling price of digital gold?", answer: "Digital gold providers charge a buy-sell spread (usually 3% to 6%) to cover administrative costs, vault insurance, secure physical storage, and transaction fees. This means your gold must appreciate by at least the spread percentage for you to break even." },
      { question: "How is GST calculated on digital gold purchases?", answer: "GST is calculated at a flat 3% on the purchase value of digital gold in India. If you invest ₹10,000, your net investment is ₹9,708.74 and the GST paid is ₹291.26." },
      { question: "Can I take physical delivery of digital gold?", answer: "Yes, most digital gold providers allow you to convert your digital balance into physical gold coins or bars and have them delivered to your home. However, you must pay additional making charges and delivery fees." }
    ],
  lastUpdated: "July 2026",
  }
];
