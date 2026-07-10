import { CalculatorConfig } from "./types";

export const lifestyleCalculators: CalculatorConfig[] = [
  {
    id: "how-long-until-1-crore",
    name: "How Long Until ₹1 Crore?",
    isIndiaSpecific: true,
    category: "Lifestyle",
    description: "Determine the exact time required to build a net worth of ₹1 Crore.",
    seoTitle: "How Long Until 1 Crore Calculator – Target Wealth",
    seoDescription: "Use our how long until 1 Crore calculator to determine the exact time required to build a net worth of ₹1 Crore with compounding interest.",
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
        title: "Milestones of Wealth Accumulation Plan",
        content: "Our How Long Until 1 Crore Calculator makes planning your financial milestones simple. Reaching the first ₹1 Crore (10 Million Rupees) is often the hardest milestone for retail savers. Because compounding depends on the size of the initial capital, growth starts slow. The first ₹1 Crore might take 12 years of savings, but the second ₹1 Crore might take only 4 more years, as the compounded interest earns interest on a much larger scale."
      }
    ],
    faqs: [
      { question: "How can I reach ₹1 Crore faster?", answer: "Increasing your monthly savings rate by even 5% to 10% annually (Step-up SIP) can reduce the time required to hit your target by several years." },
      { question: "How do I use a wealth calculator to determine time to 1 Crore?", answer: "Enter your current savings, monthly savings budget, and expected returns rate into our wealth calculator to estimate the years required to reach ₹1 Crore." }
    ],
  lastUpdated: "July 2026",
  },
  {
    id: "inflation-impact-calculator",
    name: "Inflation Impact Calculator",
    category: "Lifestyle",
    description: "Calculate how inflation erodes the value of your cash and increases the future cost of goods.",
    seoTitle: "Inflation Impact Calculator – Calculate Purchasing Power",
    seoDescription: "Use our free inflation impact calculator to calculate how inflation erodes the purchasing power of your money and increases your future expenses.",
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
        title: "Understanding Inflation and Purchasing Power Loss",
        content: "Use our Inflation Impact Calculator to see how price rises affect your budget. Inflation is the rate at which the general level of prices for goods and services rises, subsequently eroding currency purchasing power. If inflation is 6% per year, an item that costs ₹100 today will cost ₹106 next year. Over 15 years, a lifestyle that costs ₹50,000 monthly will cost ₹1.2 Lakhs monthly simply to buy the exact same goods."
      }
    ],
    faqs: [
      { question: "How do I protect my wealth from inflation?", answer: "To prevent purchasing power loss, store savings in capital-appreciating assets like equities, equity mutual funds, or real estate rather than bank accounts, since cash drag underperforms inflation." },
      { question: "How do I calculate future inflation impact on savings?", answer: "Use our inflation calculator by inputting your current monthly costs, average expected inflation rate, and years in the future to see your purchasing power decay." }
    ],
  lastUpdated: "July 2026",
  },
  {
    id: "financial-freedom-calculator",
    name: "Financial Freedom Calculator",
    category: "Lifestyle",
    description: "Determine your financial freedom score based on assets and Safe Withdrawal Rates.",
    seoTitle: "Financial Freedom Calculator – Calculate SWR Score",
    seoDescription: "Calculate your financial freedom score. Find if your passive investment income can support your current lifestyle and determine safe withdrawal rates.",
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
        title: "Steps to Achieving Financial Freedom",
        content: "Our Financial Freedom Calculator estimates when you can stop working. Financial freedom means having enough passive income (from investments, real estate dividends, or retirement funds) to pay all your living expenses without being actively employed. A Financial Freedom Score of 100% indicates that your investment assets yield enough money under a Safe Withdrawal Rate (like 4%) to sustain your lifestyle indefinitely."
      }
    ],
    faqs: [
      { question: "What is a Safe Withdrawal Rate (SWR)?", answer: "SWR is the conservative percentage of your total investment portfolio that you can withdraw annually without running out of money. The industry standard SWR is 3% to 4%, depending on your local inflation rate and asset allocation." },
      { question: "How do I determine my financial freedom score?", answer: "Enter your total financial assets, monthly living expenses, and expected safe withdrawal rate to check if your passive income covers expenses. A score of 100% or more means you are financially free." }
    ],
  lastUpdated: "July 2026",
  },
  {
    id: "inflation-calculator",
    name: "Inflation Calculator",
    category: "Lifestyle",
    description: "Calculate how inflation affects the purchasing power of your money and increases the future cost of goods and services.",
    seoTitle: "Inflation Calculator – Calculate Future Value and Purchasing Power",
    seoDescription: "Estimate how inflation impacts your money. Calculate future cost of items and purchasing power decay over time with our free inflation calculator.",
    inputs: [
      { id: "amount", label: "Current Cost / Value of Money", type: "slider", min: 100, max: 10000000, step: 1000, default: 50000, unit: "₹" },
      { id: "inflationRate", label: "Expected Annual Inflation Rate", type: "slider", min: 0.5, max: 20, step: 0.1, default: 4, unit: "%" },
      { id: "years", label: "Time Horizon (Years)", type: "slider", min: 1, max: 40, step: 1, default: 10, unit: "Yr" },
    ],
    outputs: [
      { id: "futureCost", label: "Future Adjusted Value (Cost of Item)", format: "currency" },
      { id: "purchasingPower", label: "Future Purchasing Power of Current Sum", format: "currency" },
      { id: "totalLoss", label: "Total Value Lost to Inflation", format: "currency" },
    ],
    calculate: (inputs) => {
      const p = inputs.amount;
      const r = inputs.inflationRate;
      const t = inputs.years;

      const rate = r / 100;
      const futureCost = p * Math.pow(1 + rate, t);
      const purchasingPower = p / Math.pow(1 + rate, t);
      const totalLoss = Math.max(0, p - purchasingPower);

      const chartData = [];
      for (let yr = 0; yr <= t; yr++) {
        chartData.push({
          name: `Yr ${yr}`,
          "Future Cost": Math.round(p * Math.pow(1 + rate, yr)),
          "Purchasing Power": Math.round(p / Math.pow(1 + rate, yr)),
        });
      }

      return {
        values: { futureCost, purchasingPower, totalLoss },
        chartData,
      };
    },
    educationalContent: [
      {
        title: "How Inflation Affects Your Personal Finances",
        content: "Our Inflation Calculator helps you project how price increases erode purchasing power. Inflation is a measure of the rate at which prices for goods and services rise. When inflation occurs, every unit of currency buys a smaller percentage of a good or service. This means your cash loses value over time if it is not invested in assets that grow faster than the rate of inflation."
      },
      {
        title: "Purchasing Power vs. Future Cost",
        content: "This calculator provides two crucial metrics:\n1. **Future Adjusted Cost:** Shows how much money you will need in the future to purchase a product or service that costs a specific amount today.\n2. **Purchasing Power:** Shows what a specific amount of money today will actually be worth in terms of buying power in the future. For example, at a standard 4% inflation rate, $10,000 cash kept under a mattress will only buy $6,755 worth of goods in 10 years."
      }
    ],
    faqs: [
      { question: "What is the historical average inflation rate?", answer: "Historically, inflation in developed economies like the US, UK, and Canada has averaged around 2% to 3% annually, while developing economies can see averages of 5% to 8% or higher. Central banks often target a 2% inflation rate." },
      { question: "How do I beat inflation?", answer: "To preserve your wealth, you must invest in assets that offer historical returns above the inflation rate. These include equities, stock index mutual funds/ETFs, and real estate. Cash and standard checking accounts are eroded by inflation." },
      { question: "How do I calculate future value adjusted for inflation online?", answer: "Input your current sum, average expected inflation rate, and years into the future into our inflation calculator to estimate future costs and purchasing power." }
    ],
  lastUpdated: "July 2026",
  }
];
