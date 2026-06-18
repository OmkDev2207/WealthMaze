import { CalculatorConfig } from "./types";

export const taxCalculators: CalculatorConfig[] = [
  {
    id: "income-tax-calculator",
    name: "Income Tax Calculator",
    category: "Tax",
    description: "Estimate your income tax liability under the New vs Old tax regimes in India.",
    seoTitle: "Income Tax Calculator FY 2024-25 - Old vs New Regime | WealthMaze",
    seoDescription: "Calculate your income tax liability. Compare tax liabilities under the Old and New tax regimes with latest standard deductions using WealthMaze.",
    inputs: [
      { id: "annualIncome", label: "Gross Annual Income", type: "slider", min: 100000, max: 5000000, step: 50000, default: 1200000, unit: "₹" },
      { id: "sec80C", label: "Deductions under 80C (Old Regime only)", type: "slider", min: 0, max: 150000, step: 5000, default: 150000, unit: "₹" },
      { id: "otherDeductions", label: "Other Deductions (HRA, NPS, 80D - Old Regime)", type: "slider", min: 0, max: 500000, step: 10000, default: 100000, unit: "₹" },
      { id: "newStandardDeduction", label: "Apply Standard Deduction (₹75k for New, ₹50k for Old)", type: "select", default: 1, options: [
        { label: "Yes", value: 1 },
        { label: "No", value: 0 }
      ]}
    ],
    outputs: [
      { id: "newTax", label: "Tax under New Regime", format: "currency" },
      { id: "oldTax", label: "Tax under Old Regime", format: "currency" },
      { id: "taxSavings", label: "Regime Savings", format: "currency" },
    ],
    calculate: (inputs) => {
      const gross = inputs.annualIncome;
      const s80c = inputs.sec80C;
      const otherDed = inputs.otherDeductions;
      const applyStd = inputs.newStandardDeduction;

      // 1. Calculate New Tax Regime
      const stdDedNew = applyStd ? 75000 : 0;
      const taxableNew = Math.max(0, gross - stdDedNew);
      let newTax = 0;

      // Slab rates FY 2024-25 New Regime:
      // Up to 3,000,000: Nil
      // 300,000 - 600,000: 5%
      // 600,000 - 900,000: 10%
      // 900,000 - 1,200,000: 15%
      // 1,200,000 - 1,500,000: 20%
      // Above 1,500,000: 30%
      if (taxableNew <= 700000) {
        // Tax rebate under Sec 87A: tax is nil for income up to 7 Lakhs (excluding standard deduction, taxable income threshold)
        newTax = 0;
      } else {
        let temp = taxableNew;
        if (temp > 1500000) {
          newTax += (temp - 1500000) * 0.30;
          temp = 1500000;
        }
        if (temp > 1200000) {
          newTax += (temp - 1200000) * 0.20;
          temp = 1200000;
        }
        if (temp > 900000) {
          newTax += (temp - 900000) * 0.15;
          temp = 900000;
        }
        if (temp > 600000) {
          newTax += (temp - 600000) * 0.10;
          temp = 600000;
        }
        if (temp > 300000) {
          newTax += (temp - 300000) * 0.05;
        }
        // Add 4% Health & Education cess
        newTax = newTax * 1.04;
      }

      // 2. Calculate Old Tax Regime
      const stdDedOld = applyStd ? 50000 : 0;
      const deductionsOld = s80c + otherDed + stdDedOld;
      const taxableOld = Math.max(0, gross - deductionsOld);
      let oldTax = 0;

      // Slab rates Old Regime:
      // Up to 250,000: Nil
      // 250,000 - 500,000: 5%
      // 500,000 - 1,000,000: 20%
      // Above 1,000,000: 30%
      if (taxableOld <= 500000) {
        // Tax rebate under Sec 87A for income up to 5 Lakhs
        oldTax = 0;
      } else {
        let temp = taxableOld;
        if (temp > 1000000) {
          oldTax += (temp - 1000000) * 0.30;
          temp = 1000000;
        }
        if (temp > 500000) {
          oldTax += (temp - 500000) * 0.20;
          temp = 500000;
        }
        if (temp > 250000) {
          oldTax += (temp - 250000) * 0.05;
        }
        oldTax = oldTax * 1.04;
      }

      const taxSavings = Math.abs(newTax - oldTax);

      const chartData = [
        { name: "New Regime Tax", Tax: Math.round(newTax) },
        { name: "Old Regime Tax", Tax: Math.round(oldTax) },
      ];

      return {
        values: { newTax, oldTax, taxSavings },
        chartData,
      };
    },
    educationalContent: [
      {
        title: "Comparing New vs. Old Tax Regimes",
        content: "India offers taxpayers a choice between two tax regimes: the Old tax regime, which allows multiple deductions like Section 80C, Section 80D, and HRA exemptions but has higher slab rates, and the New tax regime, which features lower tax slabs but eliminates almost all exemptions. Beginning FY 2023-24, the New Tax Regime is the default option."
      }
    ],
    faqs: [
      { question: "Which tax regime is better for me?", answer: "Generally, if your total eligible tax deductions (80C, 80D, HRA, Home Loan Interest) are less than ₹2.5 Lakhs to ₹3 Lakhs, the New Tax Regime will yield a lower tax liability. If you have substantial investments and deductions, the Old Regime may be beneficial." }
    ]
  },
  {
    id: "capital-gains-calculator",
    name: "Capital Gains Tax Calculator",
    category: "Tax",
    description: "Calculate capital gains tax on equity assets, mutual funds, and real estate.",
    seoTitle: "Capital Gains Tax Calculator - Equity & Real Estate | WealthMaze",
    seoDescription: "Calculate short-term (STCG) and long-term (LTCG) capital gains taxes for stocks, mutual funds, and properties with WealthMaze.",
    inputs: [
      { id: "purchasePrice", label: "Purchase Price / Cost of Acquisition", type: "number", default: 500000, unit: "₹" },
      { id: "sellPrice", label: "Sale Value", type: "number", default: 800000, unit: "₹" },
      { id: "holdingMonths", label: "Holding Period (in Months)", type: "slider", min: 1, max: 120, step: 1, default: 18, unit: "Mo" },
      { id: "assetType", label: "Asset Type", type: "select", default: 0, options: [
        { label: "Equity / Shares / Equity Mutual Funds", value: 0 },
        { label: "Debt Mutual Funds / Gold / Bonds", value: 1 },
        { label: "Real Estate Property", value: 2 }
      ]}
    ],
    outputs: [
      { id: "netGain", label: "Net Capital Gains", format: "currency" },
      { id: "taxOwed", label: "Estimated Tax Owed", format: "currency" },
    ],
    calculate: (inputs) => {
      const buy = inputs.purchasePrice;
      const sell = inputs.sellPrice;
      const months = inputs.holdingMonths;
      const asset = inputs.assetType;

      const netGain = Math.max(0, sell - buy);
      let taxOwed = 0;

      if (asset === 0) {
        // Equity
        if (months <= 12) {
          // STCG at 20%
          taxOwed = netGain * 0.20;
        } else {
          // LTCG at 12.5% (with 1.25 Lakh exemption)
          const taxableLTCG = Math.max(0, netGain - 125000);
          taxOwed = taxableLTCG * 0.125;
        }
      } else if (asset === 1) {
        // Debt/Gold (Taxed at income slab rate, assumed flat 20% average for simple estimate)
        taxOwed = netGain * 0.20;
      } else {
        // Real Estate
        if (months <= 24) {
          // STCG (Assumed 20% slab rate)
          taxOwed = netGain * 0.20;
        } else {
          // LTCG at 12.5% without indexation
          taxOwed = netGain * 0.125;
        }
      }

      // Add 4% cess
      taxOwed = taxOwed * 1.04;

      const chartData = [
        { name: "Purchase Cost", Amount: buy },
        { name: "Net Profit", Amount: netGain },
        { name: "Tax Payable", Amount: Math.round(taxOwed) },
      ];

      return {
        values: { netGain, taxOwed },
        chartData,
      };
    },
    educationalContent: [
      {
        title: "Capital Gains Tax Regulations",
        content: "Capital gains are profits earned from the sale of capital assets. They are classified into:\n- **Short-Term Capital Gains (STCG)**: Appreciations on assets held for short periods (less than 12 months for equity, 24 months for property).\n- **Long-Term Capital Gains (LTCG)**: Profits on assets held for longer terms. Under the latest rules, LTCG on listed equities is taxed at 12.5% for gains exceeding ₹1.25 Lakhs per financial year."
      }
    ],
    faqs: [
      { question: "What is indexation in real estate?", answer: "Indexation adjusts the purchase price of property for inflation using the Cost Inflation Index (CII), reducing taxable capital gains. Under the latest rules, indexation is removed for property purchases, and a flat LTCG of 12.5% is applied." }
    ]
  }
];
