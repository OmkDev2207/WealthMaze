import { CalculatorConfig } from "./types";

export const lifestyleCalculators: CalculatorConfig[] = [
  {
    id: "how-long-until-1-crore",
    name: "How Long Until ₹1 Crore?",
    category: "Lifestyle",
    description: "Determine the exact time required to build a net worth of ₹1 Crore.",
    seoTitle: "How Long Until 1 Crore Calculator - Wealth Timer | WealthMaze",
    seoDescription: "Calculate the time needed to reach a corpus of ₹1 Crore. Adjust monthly savings and growth rate assumptions with WealthMaze.",
    inputs: [
      { id: "currentSavings", label: "Current Savings / Portfolio", type: "slider", min: 0, max: 5000000, step: 50000, default: 500000, unit: "₹" },
      { id: "monthlySavings", label: "Monthly Savings Contribution", type: "slider", min: 500, max: 500000, step: 500, default: 25000, unit: "₹" },
      { id: "expectedReturn", label: "Expected Return Rate (p.a.)", type: "slider", min: 1, max: 30, step: 0.5, default: 12, unit: "%" },
    ],
    outputs: [
      { id: "yearsNeeded", label: "Years Required", format: "number" },
      { id: "totalInvested", label: "Total Capital Invested", format: "currency" },
      { id: "returnsNeeded", label: "Returns Needed", format: "currency" },
    ],
    calculate: (inputs) => {
      const init = inputs.currentSavings;
      const monthly = inputs.monthlySavings;
      const r = inputs.expectedReturn;

      const target = 10000000; // 1 Crore = 10,000,000
      const i = r / (12 * 100);

      let balance = init;
      let months = 0;
      const chartData = [];

      chartData.push({
        name: "Month 0",
        "Corpus": Math.round(balance),
        "Target": target,
      });

      const maxMonths = 600; // 50 years max
      while (balance < target && months < maxMonths) {
        months++;
        balance = balance * (1 + i) + monthly;

        if (months % 12 === 0 || balance >= target) {
          chartData.push({
            name: `Yr ${Math.round(months / 12 * 10) / 10}`,
            "Corpus": Math.round(balance),
            "Target": target,
          });
        }
      }

      const yearsNeeded = Math.round((months / 12) * 10) / 10;
      const totalInvested = init + (monthly * months);
      const returnsNeeded = Math.max(0, target - totalInvested);

      return {
        values: { yearsNeeded, totalInvested, returnsNeeded },
        chartData,
      };
    },
    educationalContent: [
      {
        title: "The Milestones to Wealth Creation",
        content: "Reaching the first ₹1 Crore (10 Million Rupees) is often the hardest milestone for retail savers. Because compounding depends on the size of the initial capital, growth starts slow. The first ₹1 Crore might take 12 years of savings, but the second ₹1 Crore might take only 4 more years, as the compounded interest earns interest on a much larger scale."
      }
    ],
    faqs: [
      { question: "How can I reach ₹1 Crore faster?", answer: "Increasing your monthly savings rate by even 5% to 10% annually (Step-up SIP) can reduce the time required to hit your target by several years." }
    ]
  },
  {
    id: "inflation-impact-calculator",
    name: "Inflation Impact Calculator",
    category: "Lifestyle",
    description: "Calculate how inflation erodes the value of your cash and increases the future cost of goods.",
    seoTitle: "Inflation Impact Calculator - Purchasing Power Loss | WealthMaze",
    seoDescription: "Calculate how inflation erodes the purchasing power of your money over time. Estimate future expenses using WealthMaze.",
    inputs: [
      { id: "currentCost", label: "Current Monthly Cost / Price of Item", type: "slider", min: 1000, max: 1000000, step: 5000, default: 50000, unit: "₹" },
      { id: "inflationRate", label: "Average Inflation Rate (p.a.)", type: "slider", min: 1, max: 15, step: 0.1, default: 6, unit: "%" },
      { id: "years", label: "Years into the Future", type: "slider", min: 1, max: 40, step: 1, default: 15, unit: "Yr" },
    ],
    outputs: [
      { id: "futureCost", label: "Future Cost of Same Item", format: "currency" },
      { id: "purchasingPower", label: "Value of Current ₹ Today in Future", format: "currency" },
    ],
    calculate: (inputs) => {
      const cost = inputs.currentCost;
      const inf = inputs.inflationRate;
      const t = inputs.years;

      // Future Cost = Cost * (1 + inf/100)^t
      const futureCost = cost * Math.pow(1 + inf / 100, t);
      // Value of ₹ cost in future = Cost / (1 + inf/100)^t
      const purchasingPower = cost / Math.pow(1 + inf / 100, t);

      const chartData = [];
      for (let yr = 0; yr <= t; yr++) {
        chartData.push({
          name: `Yr ${yr}`,
          "Future Cost": Math.round(cost * Math.pow(1 + inf / 100, yr)),
          "Purchasing Power": Math.round(cost / Math.pow(1 + inf / 100, yr)),
        });
      }

      return {
        values: { futureCost, purchasingPower },
        chartData,
      };
    },
    educationalContent: [
      {
        title: "Inflation: The Silent Tax",
        content: "Inflation is the rate at which the general level of prices for goods and services rises, subsequently eroding currency purchasing power. If inflation is 6% per year, an item that costs ₹100 today will cost ₹106 next year. Over 15 years, a lifestyle that costs ₹50,000 monthly will cost ₹1.2 Lakhs monthly simply to buy the exact same goods."
      }
    ],
    faqs: [
      { question: "How do I protect my wealth from inflation?", answer: "To prevent purchasing power loss, store savings in capital-appreciating assets like equities, equity mutual funds, or real estate rather than bank accounts, since cash drag underperforms inflation." }
    ]
  },
  {
    id: "financial-freedom-calculator",
    name: "Financial Freedom Calculator",
    category: "Lifestyle",
    description: "Determine your financial freedom score based on assets and Safe Withdrawal Rates.",
    seoTitle: "Financial Freedom Calculator - Safe Withdrawal Rate | WealthMaze",
    seoDescription: "Calculate your financial freedom score. Find if your passive investment income can support your current lifestyle using WealthMaze.",
    inputs: [
      { id: "totalCorpus", label: "Total Financial Assets / Net Worth", type: "slider", min: 100000, max: 100000000, step: 100000, default: 12000000, unit: "₹" },
      { id: "monthlyExpenses", label: "Monthly Living Expenses", type: "slider", min: 5000, max: 500000, step: 5000, default: 50000, unit: "₹" },
      { id: "withdrawalRate", label: "Safe Withdrawal Rate (SWR)", type: "slider", min: 2, max: 8, step: 0.1, default: 4, unit: "%" },
    ],
    outputs: [
      { id: "annualPassiveIncome", label: "Annual Passive Income", format: "currency" },
      { id: "monthlyPassiveIncome", label: "Monthly Passive Income", format: "currency" },
      { id: "freedomScore", label: "Financial Freedom Score", format: "percent" },
    ],
    calculate: (inputs) => {
      const corpus = inputs.totalCorpus;
      const expenses = inputs.monthlyExpenses;
      const swr = inputs.withdrawalRate;

      const annualPassiveIncome = corpus * (swr / 100);
      const monthlyPassiveIncome = annualPassiveIncome / 12;
      const freedomScore = (monthlyPassiveIncome / expenses) * 100;

      const chartData = [
        { name: "Required Expense", Amount: expenses },
        { name: "Passive Income", Amount: Math.round(monthlyPassiveIncome) },
      ];

      return {
        values: { annualPassiveIncome, monthlyPassiveIncome, freedomScore },
        chartData,
      };
    },
    educationalContent: [
      {
        title: "What is Financial Freedom?",
        content: "Financial freedom means having enough passive income (from investments, real estate dividends, or retirement funds) to pay all your living expenses without being actively employed. A Financial Freedom Score of 100% indicates that your investment assets yield enough money under a Safe Withdrawal Rate (like 4%) to sustain your lifestyle indefinitely."
      }
    ],
    faqs: [
      { question: "Is the 4% Safe Withdrawal Rate applicable in India?", answer: "Yes, though India has higher inflation than western markets, it also offers higher nominal yields. Many financial planners suggest a SWR of 3% to 3.5% for Indian portfolios to build a safer buffer." }
    ]
  }
];
