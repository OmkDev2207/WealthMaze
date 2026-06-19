import { CalculatorConfig, CalculatorResult } from "./types";

// Helper function to format currency in Indian style (Lakhs/Crores)
export const formatIndianCurrency = (value: number): string => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
};

export const investingCalculators: CalculatorConfig[] = [
  {
    id: "sip-calculator",
    name: "SIP Calculator",
    category: "Investing",
    description: "Calculate the future value of your Systematic Investment Plan (SIP) investments.",
    seoTitle: "SIP Calculator - Calculate Mutual Fund SIP Returns | WealthMaze",
    seoDescription: "Calculate the future value of your Systematic Investment Plan (SIP) investments. Plan your monthly mutual fund investments with WealthMaze's free SIP calculator.",
    inputs: [
      { id: "monthlyInvestment", label: "Monthly Investment", type: "slider", min: 500, max: 1000000, step: 500, default: 25000, unit: "₹" },
      { id: "expectedReturn", label: "Expected Return Rate (p.a.)", type: "slider", min: 1, max: 30, step: 0.5, default: 12, unit: "%" },
      { id: "timePeriod", label: "Time Period", type: "slider", min: 1, max: 40, step: 1, default: 10, unit: "Yr" },
    ],
    outputs: [
      { id: "investedAmount", label: "Invested Amount", format: "currency" },
      { id: "estReturns", label: "Est. Returns", format: "currency" },
      { id: "totalValue", label: "Total Value", format: "currency" },
    ],
    calculate: (inputs) => {
      const p = inputs.monthlyInvestment;
      const r = inputs.expectedReturn;
      const t = inputs.timePeriod;

      const i = r / (12 * 100);
      const n = t * 12;

      // FV = P * [((1 + i)^n - 1) / i] * (1 + i)
      const totalValue = p * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
      const investedAmount = p * n;
      const estReturns = totalValue - investedAmount;

      const chartData = [];
      let runningInvested = 0;
      let runningValue = 0;

      for (let yr = 1; yr <= t; yr++) {
        const months = yr * 12;
        const valueAtYear = p * ((Math.pow(1 + i, months) - 1) / i) * (1 + i);
        runningInvested = p * months;
        runningValue = valueAtYear;
        chartData.push({
          name: `Yr ${yr}`,
          "Invested Amount": Math.round(runningInvested),
          "Total Wealth": Math.round(runningValue),
        });
      }

      // Dynamic comparison data: Standard SIP vs Lumpsum vs Savings Account
      const lumpsumEquivalent = investedAmount;
      const lumpsumValue = lumpsumEquivalent * Math.pow(1 + r / 100, t);
      const savingsValue = investedAmount * Math.pow(1 + 4 / 100, t); // 4% savings rate

      return {
        values: { investedAmount, estReturns, totalValue },
        chartData,
        comparison: {
          title: "Alternative Investment Scenarios",
          headers: ["Strategy", "Amount Invested", "Final Value (10 Yrs)", "Net Gain"],
          rows: [
            ["Regular Monthly SIP", formatIndianCurrency(investedAmount), formatIndianCurrency(totalValue), formatIndianCurrency(estReturns)],
            ["One-time Lumpsum", formatIndianCurrency(lumpsumEquivalent), formatIndianCurrency(lumpsumValue), formatIndianCurrency(lumpsumValue - lumpsumEquivalent)],
            ["Traditional Savings (4% p.a.)", formatIndianCurrency(investedAmount), formatIndianCurrency(savingsValue), formatIndianCurrency(savingsValue - investedAmount)],
          ],
        },
      };
    },
    educationalContent: [
      {
        title: "Understanding Systematic Investment Plans (SIP)",
        content: "A Systematic Investment Plan (SIP) is an investment vehicle offered by mutual funds, allowing investors to invest a fixed amount regularly (monthly, quarterly) rather than a lump sum. This builds discipline, automates savings, and reduces the hassle of timing the market. SIP leverages two major financial tenets: Rupee Cost Averaging and Compounding."
      },
      {
        title: "How Does a SIP Calculator Work?",
        content: "The SIP calculator uses the future value of an annuity formula to compute returns. The compound interest is calculated on a monthly frequency because investments occur monthly. The math is governed by the formula:\n\n**FV = P x [ ((1 + i)^n - 1) / i ] x (1 + i)**\n\nWhere:\n- **FV** = Future Value (the terminal maturity value)\n- **P** = Monthly Investment amount\n- **i** = Monthly interest rate (annual expected return / 12 / 100)\n- **n** = Number of monthly payments (duration in years * 12)\n\nThis calculator automates this calculation instantly, saving you from complex calculations and potential manual errors."
      },
      {
        title: "The Power of Rupee Cost Averaging",
        content: "When markets are volatile, a fixed monthly investment buys fewer units when prices are high and more units when prices are low. Over the long term, this averages out the cost of acquisition per unit of mutual funds, reducing the risk of investing a large sum at a market peak. Consequently, investors don't need to try and time market bottoms and tops, which is notoriously difficult to execute consistently."
      },
      {
        title: "Compounding: The Eighth Wonder of the World",
        content: "Compound interest is the practice of earning interest on your accumulated interest. As your mutual fund investment earns dividends or capital gains, those gains are reinvested back into the fund to buy more units, which then earn further gains. In the early years of a SIP, the growth might appear slow. However, in years 10, 15, or 20, the compounding curve bends upwards steeply. A SIP of ₹10,000 monthly for 10 years at 12% results in ~₹23 Lakhs, but letting it compound for 20 years results in ~₹1 Crore! Time in the market is significantly more crucial than timing the market."
      }
    ],
    faqs: [
      { question: "What is the minimum amount I can invest via SIP?", answer: "Many mutual funds allow SIPs to start with as low as ₹100 or ₹500 per month, making it accessible for beginners." },
      { question: "Can I pause or stop a SIP at any time?", answer: "Yes, mutual fund SIPs are highly flexible. You can pause or stop your SIP without penalty, and the accumulated units remain invested." },
      { question: "Is SIP return guaranteed?", answer: "No. Mutual fund returns depend on market performance. The expected return rate is for illustrative estimation; historical averages for equity SIPs over 10+ years typically range between 12% and 15%." }
    ]
  },
  {
    id: "lumpsum-calculator",
    name: "Lumpsum Calculator",
    category: "Investing",
    description: "Calculate the future value of a one-time lumpsum investment.",
    seoTitle: "Lumpsum Calculator - Calculate Compound Interest Returns | WealthMaze",
    seoDescription: "Calculate returns on your one-time lumpsum investments. Estimate the maturity value of mutual funds, equities, and fixed investments using WealthMaze.",
    inputs: [
      { id: "lumpsumAmount", label: "Lumpsum Investment", type: "slider", min: 5000, max: 10000000, step: 5000, default: 100000, unit: "₹" },
      { id: "expectedReturn", label: "Expected Return Rate (p.a.)", type: "slider", min: 1, max: 30, step: 0.5, default: 12, unit: "%" },
      { id: "timePeriod", label: "Time Period", type: "slider", min: 1, max: 40, step: 1, default: 10, unit: "Yr" },
    ],
    outputs: [
      { id: "investedAmount", label: "Invested Amount", format: "currency" },
      { id: "estReturns", label: "Est. Returns", format: "currency" },
      { id: "totalValue", label: "Total Value", format: "currency" },
    ],
    calculate: (inputs) => {
      const pv = inputs.lumpsumAmount;
      const r = inputs.expectedReturn;
      const t = inputs.timePeriod;

      // FV = PV * (1 + r/100)^t
      const totalValue = pv * Math.pow(1 + r / 100, t);
      const investedAmount = pv;
      const estReturns = totalValue - investedAmount;

      const chartData = [];
      for (let yr = 1; yr <= t; yr++) {
        const val = pv * Math.pow(1 + r / 100, yr);
        chartData.push({
          name: `Yr ${yr}`,
          "Invested Amount": Math.round(investedAmount),
          "Total Wealth": Math.round(val),
        });
      }

      // Comparison: Lumpsum vs Fixed Deposit (6% p.a.) vs inflation adjusted purchasing power (6% inflation)
      const fdValue = pv * Math.pow(1 + 6 / 100, t);
      const inflationAdjusted = totalValue / Math.pow(1 + 6 / 100, t);

      return {
        values: { investedAmount, estReturns, totalValue },
        chartData,
        comparison: {
          title: "Growth Comparisons & Purchasing Power",
          headers: ["Scenario", "Initial Investment", "Nominal Value", "Real Purchasing Power (Inflation 6%)"],
          rows: [
            ["Lumpsum Equity (12% p.a.)", formatIndianCurrency(pv), formatIndianCurrency(totalValue), formatIndianCurrency(inflationAdjusted)],
            ["Fixed Deposit (6% p.a.)", formatIndianCurrency(pv), formatIndianCurrency(fdValue), formatIndianCurrency(fdValue / Math.pow(1 + 6 / 100, t))],
          ],
        },
      };
    },
    educationalContent: [
      {
        title: "What is a Lumpsum Investment?",
        content: "A Lumpsum investment is a single, one-off transaction where a large sum of cash is committed to an investment instrument (such as mutual funds, stocks, real estate, or gold) all at once, rather than spreading it over time like a SIP. It is common for investors who receive a sudden windfall, inheritance, bonus, or proceeds from property sales."
      },
      {
        title: "How to Compute Lumpsum Returns?",
        content: "The Lumpsum Calculator uses the classic compound interest formula to estimate future value:\n\n**FV = PV x (1 + r)^t**\n\nWhere:\n- **FV** = Future Value of the investment\n- **PV** = Present Value (initial lumpsum amount)\n- **r** = Annual return rate (entered as decimal, e.g., 12% = 0.12)\n- **t** = Time period in years\n\nThis simple compounding logic shows the dramatic power of compounding over long durations when money is left untouched."
      },
      {
        title: "SIP vs. Lumpsum: Which is Better?",
        content: "Neither is universally superior; the choice depends on market conditions and your cash availability. Lumpsum investing yields higher returns in a bull market because all your money compounds for the entire duration. However, it exposes you to high risk if you invest just before a market crash. SIP mitigates this risk by purchasing units throughout market fluctuations, making it ideal for regular earners, whereas Lumpsum is suited for experienced investors with a lump sum looking for long-term horizons."
      }
    ],
    faqs: [
      { question: "When is the best time to make a lumpsum investment?", answer: "Historically, the best time to invest is when you have the funds available. For equity mutual funds, buying during market corrections or bear runs can improve long-term returns, though market timing is secondary to long investment horizons." },
      { question: "How does inflation affect my lumpsum returns?", answer: "Inflation reduces the purchasing power of your money over time. If your investment earns 12% but inflation is 6%, your real rate of return is approximately 6%. Hence, investing in assets that beat inflation is key." }
    ]
  },
  {
    id: "mutual-fund-return-calculator",
    name: "Mutual Fund Return Calculator",
    category: "Investing",
    description: "Calculate expected returns on mutual funds for combined lumpsum and SIP investments.",
    seoTitle: "Mutual Fund Return Calculator - Estimate MF Growth | WealthMaze",
    seoDescription: "Estimate returns on your equity or debt mutual fund investments. Calculate compound growth for both one-time lumpsum and monthly SIPs.",
    inputs: [
      { id: "lumpsumAmount", label: "Initial Lumpsum Investment", type: "slider", min: 0, max: 10000000, step: 5000, default: 50000, unit: "₹" },
      { id: "monthlySIP", label: "Monthly SIP Contribution", type: "slider", min: 0, max: 500000, step: 500, default: 5000, unit: "₹" },
      { id: "expectedReturn", label: "Expected Return Rate (p.a.)", type: "slider", min: 1, max: 30, step: 0.5, default: 12, unit: "%" },
      { id: "timePeriod", label: "Time Period", type: "slider", min: 1, max: 40, step: 1, default: 10, unit: "Yr" },
    ],
    outputs: [
      { id: "investedAmount", label: "Total Invested", format: "currency" },
      { id: "estReturns", label: "Est. Returns", format: "currency" },
      { id: "totalValue", label: "Total Value", format: "currency" },
    ],
    calculate: (inputs) => {
      const lumpsum = inputs.lumpsumAmount;
      const sip = inputs.monthlySIP;
      const r = inputs.expectedReturn;
      const t = inputs.timePeriod;

      const i = r / (12 * 100);
      const n = t * 12;

      // Calculate Lumpsum portion: FV_l = PV * (1 + r/100)^t
      const lumpsumFV = lumpsum * Math.pow(1 + r / 100, t);
      // Calculate SIP portion: FV_s = P * [((1 + i)^n - 1) / i] * (1 + i)
      const sipFV = sip > 0 ? sip * ((Math.pow(1 + i, n) - 1) / i) * (1 + i) : 0;

      const totalValue = lumpsumFV + sipFV;
      const investedAmount = lumpsum + (sip * n);
      const estReturns = totalValue - investedAmount;

      const chartData = [];
      for (let yr = 1; yr <= t; yr++) {
        const months = yr * 12;
        const lVal = lumpsum * Math.pow(1 + r / 100, yr);
        const sVal = sip > 0 ? sip * ((Math.pow(1 + i, months) - 1) / i) * (1 + i) : 0;
        chartData.push({
          name: `Yr ${yr}`,
          "Invested Amount": Math.round(lumpsum + (sip * months)),
          "Total Wealth": Math.round(lVal + sVal),
        });
      }

      return {
        values: { investedAmount, estReturns, totalValue },
        chartData,
      };
    },
    educationalContent: [
      {
        title: "Understanding Mutual Fund Returns",
        content: "Mutual fund schemes pool money from multiple investors to buy diversified assets like stocks, bonds, or corporate debt. Returns are driven by capital appreciation of the underlying holdings and dividends. They are represented by Net Asset Value (NAV). Since mutual funds do not offer a fixed return, performance is evaluated using annualized measures like CAGR or XIRR."
      }
    ],
    faqs: [
      { question: "What is the difference between Direct and Regular plans?", answer: "Direct plans have lower expense ratios because they do not involve broker commissions, leading to slightly higher returns (typically 0.5% to 1.5% more per year) than Regular plans." }
    ]
  },
  {
    id: "cagr-calculator",
    name: "CAGR Calculator",
    category: "Investing",
    description: "Calculate the Compound Annual Growth Rate (CAGR) of your investments over time.",
    seoTitle: "CAGR Calculator - Compound Annual Growth Rate Calculator | WealthMaze",
    seoDescription: "Calculate the CAGR of your stocks, mutual funds, or portfolio. Find the annualized growth rate of your assets with WealthMaze's CAGR calculator.",
    inputs: [
      { id: "initialValue", label: "Initial Value of Investment", type: "number", default: 100000, unit: "₹" },
      { id: "finalValue", label: "Final Value of Investment", type: "number", default: 250000, unit: "₹" },
      { id: "duration", label: "Duration (in Years)", type: "slider", min: 1, max: 40, step: 0.5, default: 5, unit: "Yr" },
    ],
    outputs: [
      { id: "cagrRate", label: "CAGR", format: "percent" },
      { id: "absoluteGain", label: "Absolute Return", format: "percent" },
    ],
    calculate: (inputs) => {
      const init = inputs.initialValue;
      const final = inputs.finalValue;
      const years = inputs.duration;

      // CAGR = ((Final / Initial) ^ (1 / years)) - 1
      const cagrRate = (Math.pow(final / init, 1 / years) - 1) * 100;
      const absoluteGain = ((final - init) / init) * 100;

      // Chart data: growth path over time at this CAGR
      const chartData = [];
      const cagrDecimal = cagrRate / 100;
      for (let yr = 0; yr <= Math.ceil(years); yr++) {
        const currentYr = yr > years ? years : yr;
        const val = init * Math.pow(1 + cagrDecimal, currentYr);
        chartData.push({
          name: `Yr ${currentYr}`,
          "Investment Value": Math.round(val),
        });
      }

      return {
        values: { cagrRate, absoluteGain },
        chartData,
      };
    },
    educationalContent: [
      {
        title: "What is Compound Annual Growth Rate (CAGR)?",
        content: "CAGR represents the smoothed annualized rate at which an asset grows if it grows at a steady rate over a specified time period, assuming all profits are reinvested. It does not reflect actual volatile year-on-year returns but provides a standardized metric to compare the performance of different asset classes over identical time frames."
      },
      {
        title: "The CAGR Formula",
        content: "CAGR is calculated mathematically as:\n\n**CAGR = ( Final Value / Initial Value )^(1 / t) - 1**\n\nWhere:\n- **Final Value** = Value at the end of the period\n- **Initial Value** = Initial investment amount\n- **t** = Number of years (can be fractional)\n\nUnlike simple returns, CAGR accounts for compounding, preventing distortions caused by volatile swings."
      }
    ],
    faqs: [
      { question: "Why is CAGR better than Absolute Return?", answer: "Absolute return ignores the time value of money. An absolute return of 100% sounds great, but if it takes 15 years to achieve, it corresponds to a modest CAGR of only ~4.7%. CAGR normalizes growth per year." }
    ]
  },
  {
    id: "xirr-calculator",
    name: "XIRR Calculator",
    category: "Investing",
    description: "Calculate the Extended Internal Rate of Return (XIRR) for irregular cash flows and investments.",
    seoTitle: "XIRR Calculator - Calculate SIP and Portfolio Mutual Fund Returns | WealthMaze",
    seoDescription: "Calculate your mutual fund and stock portfolio XIRR. Get an accurate annualized return for irregular buy and sell transactions using WealthMaze.",
    inputs: [
      { id: "flow0", label: "Initial Investment (Year 0)", type: "number", default: -100000, unit: "₹" },
      { id: "flow1", label: "Year 1 Cash Flow (Invested: negative, Received: positive)", type: "number", default: -12000, unit: "₹" },
      { id: "flow2", label: "Year 2 Cash Flow", type: "number", default: -12000, unit: "₹" },
      { id: "flow3", label: "Year 3 Cash Flow", type: "number", default: -12000, unit: "₹" },
      { id: "flow4", label: "Final Portfolio Value (Year 4)", type: "number", default: 175000, unit: "₹" },
    ],
    outputs: [
      { id: "xirrRate", label: "Annualized XIRR", format: "percent" },
      { id: "netGain", label: "Net Profit / Loss", format: "currency" },
    ],
    calculate: (inputs) => {
      const flows = [
        { amount: inputs.flow0, days: 0 },
        { amount: inputs.flow1, days: 365 },
        { amount: inputs.flow2, days: 730 },
        { amount: inputs.flow3, days: 1095 },
        { amount: inputs.flow4, days: 1460 },
      ];

      // Net Gain
      const netGain = flows.reduce((sum, f) => sum + f.amount, 0);

      // Solve for XIRR using Secant Method
      // NPV(r) = Sum( CF_k / (1 + r)^(t_k) ) where t_k = days_k / 365
      const npv = (r: number) => {
        return flows.reduce((sum, f) => {
          const t = f.days / 365;
          return sum + f.amount / Math.pow(1 + r, t);
        }, 0);
      };

      // Secant solver
      let r0 = 0.1; // initial guess 1
      let r1 = 0.2; // initial guess 2
      let xirrRate = 0;
      let iterations = 0;

      while (iterations < 100) {
        const npv0 = npv(r0);
        const npv1 = npv(r1);

        if (Math.abs(npv1 - npv0) < 1e-10) break;

        const rNext = r1 - (npv1 * (r1 - r0)) / (npv1 - npv0);
        r0 = r1;
        r1 = rNext;

        if (Math.abs(r1 - r0) < 1e-6) {
          xirrRate = r1 * 100;
          break;
        }
        iterations++;
      }

      if (iterations >= 100) {
        // Fallback simple rate if solver fails to converge
        xirrRate = 0;
      }

      // Chart data: Net cumulative cash flows over time
      let cumulative = 0;
      const chartData = flows.map((f, idx) => {
        cumulative += f.amount;
        return {
          name: `Yr ${idx}`,
          "Cash Flow": f.amount,
          "Cumulative Outflow": cumulative < 0 ? -cumulative : 0,
        };
      });

      return {
        values: { xirrRate, netGain },
        chartData,
      };
    },
    educationalContent: [
      {
        title: "What is XIRR (Extended Internal Rate of Return)?",
        content: "XIRR stands for Extended Internal Rate of Return. It is the metric used to calculate the annualized rate of return for a series of irregular cash flows occurring at various dates. In personal finance, since investors deposit and withdraw money at random intervals (SIP dates, lump sums, partial profit bookings, dividends), standard CAGR fails. XIRR provides the exact annualized rate of growth for such portfolio transactions."
      }
    ],
    faqs: [
      { question: "Why should I use XIRR instead of CAGR for SIP?", answer: "CAGR assumes a single initial investment and a single final payout. A SIP has multiple transactions at different points in time. XIRR calculates the exact returns by accounting for the specific number of days each installment has been invested." }
    ]
  },
  {
    id: "swp-calculator",
    name: "SWP Calculator",
    category: "Investing",
    description: "Calculate the cash depletion and balance timeline of a Systematic Withdrawal Plan (SWP).",
    seoTitle: "SWP Calculator - Systematic Withdrawal Plan Calculator | WealthMaze",
    seoDescription: "Calculate your Systematic Withdrawal Plan (SWP) returns and remaining balance. Estimate how long your mutual fund corpus will last with WealthMaze.",
    inputs: [
      { id: "totalInvestment", label: "Total Investment Corpus", type: "slider", min: 100000, max: 50000000, step: 50000, default: 5000000, unit: "₹" },
      { id: "monthlyWithdrawal", label: "Monthly Withdrawal Amount", type: "slider", min: 1000, max: 500000, step: 1000, default: 40000, unit: "₹" },
      { id: "expectedReturn", label: "Expected Return Rate (p.a.)", type: "slider", min: 1, max: 20, step: 0.5, default: 8, unit: "%" },
      { id: "timePeriod", label: "Time Period", type: "slider", min: 1, max: 30, step: 1, default: 15, unit: "Yr" },
    ],
    outputs: [
      { id: "totalWithdrawn", label: "Total Withdrawn", format: "currency" },
      { id: "finalBalance", label: "Final Balance", format: "currency" },
    ],
    calculate: (inputs) => {
      const corpus = inputs.totalInvestment;
      const withdrawal = inputs.monthlyWithdrawal;
      const r = inputs.expectedReturn;
      const years = inputs.timePeriod;

      const monthlyRate = r / (12 * 100);
      const totalMonths = years * 12;

      let balance = corpus;
      let totalWithdrawn = 0;
      const chartData = [];

      for (let m = 1; m <= totalMonths; m++) {
        if (balance > 0) {
          const interest = balance * monthlyRate;
          balance = balance + interest - withdrawal;
          totalWithdrawn += withdrawal;
          if (balance < 0) {
            totalWithdrawn += balance; // Adjust if last withdrawal exceeded remaining balance
            balance = 0;
          }
        } else {
          balance = 0;
        }

        if (m % 12 === 0) {
          chartData.push({
            name: `Yr ${m / 12}`,
            "Remaining Balance": Math.round(balance),
            "Total Withdrawn": Math.round(totalWithdrawn),
          });
        }
      }

      return {
        values: { totalWithdrawn, finalBalance: balance },
        chartData,
      };
    },
    educationalContent: [
      {
        title: "What is a Systematic Withdrawal Plan (SWP)?",
        content: "A Systematic Withdrawal Plan (SWP) allows you to withdraw a fixed amount of money from your mutual fund scheme at regular intervals (usually monthly). It is commonly used by retirees to generate a steady monthly income from their accumulated retirement corpus. Unlike an annuity, the remaining balance continues to earn returns in the mutual fund, and you can change the withdrawal amount or stop the plan at any time."
      }
    ],
    faqs: [
      { question: "Is SWP tax-free?", answer: "SWP withdrawals are treated as redemptions of units, so they are subject to Capital Gains Tax (LTCG or STCG) depending on the holding period and asset type, rather than being taxed entirely as income (unlike fixed deposit interest or annuity payouts)." }
    ]
  },
  {
    id: "goal-based-investment-calculator",
    name: "Goal Based Investment Calculator",
    category: "Investing",
    description: "Determine the monthly SIP or lumpsum investment needed to reach a specific financial goal.",
    seoTitle: "Goal Based Investment Calculator - Plan Financial Goals | WealthMaze",
    seoDescription: "Calculate the exact savings needed to reach your target financial goal. Estimate required SIP or lumpsum investments with WealthMaze.",
    inputs: [
      { id: "targetGoal", label: "Target Financial Goal", type: "slider", min: 50000, max: 100000000, step: 50000, default: 5000000, unit: "₹" },
      { id: "expectedReturn", label: "Expected Return Rate (p.a.)", type: "slider", min: 1, max: 30, step: 0.5, default: 12, unit: "%" },
      { id: "timePeriod", label: "Years to Reach Goal", type: "slider", min: 1, max: 40, step: 1, default: 10, unit: "Yr" },
    ],
    outputs: [
      { id: "requiredSIP", label: "Required Monthly SIP", format: "currency" },
      { id: "requiredLumpsum", label: "Or Required Lumpsum", format: "currency" },
    ],
    calculate: (inputs) => {
      const target = inputs.targetGoal;
      const r = inputs.expectedReturn;
      const t = inputs.timePeriod;

      const i = r / (12 * 100);
      const n = t * 12;

      // Required SIP = Target * i / [((1 + i)^n - 1) * (1 + i)]
      const requiredSIP = target * i / ((Math.pow(1 + i, n) - 1) * (1 + i));

      // Required Lumpsum = Target / (1 + r/100)^t
      const requiredLumpsum = target / Math.pow(1 + r / 100, t);

      const chartData = [];
      for (let yr = 1; yr <= t; yr++) {
        const months = yr * 12;
        const sipGrowth = requiredSIP * ((Math.pow(1 + i, months) - 1) / i) * (1 + i);
        const lumpsumGrowth = requiredLumpsum * Math.pow(1 + r / 100, yr);
        chartData.push({
          name: `Yr ${yr}`,
          "SIP Path": Math.round(sipGrowth),
          "Lumpsum Path": Math.round(lumpsumGrowth),
          "Target": target,
        });
      }

      return {
        values: { requiredSIP, requiredLumpsum },
        chartData,
      };
    },
    educationalContent: [
      {
        title: "Introduction to Goal-Based Investing",
        content: "Goal-based investing shifts the focus from chasing arbitrary market returns to funding specific milestones in your life (e.g., buying a home, children's higher education, retirement, or an international vacation). By estimating how much money is required and when, you can invest the exact amount needed under a disciplined plan, avoiding over-saving or falling short of your target."
      }
    ],
    faqs: [
      { question: "Should I adjust my goal for inflation?", answer: "Yes, absolutely. A goal of ₹50 Lakhs in 10 years will require a larger nominal corpus because of inflation. If inflation averages 6%, you should set your target goal to ~₹89.5 Lakhs to preserve the purchasing power of your target amount." }
    ]
  },
  {
    id: "retirement-calculator",
    name: "Retirement Calculator",
    category: "Retirement",
    description: "Determine the corpus you need to retire comfortably and the monthly savings required to build it.",
    seoTitle: "Retirement Calculator - Estimate Retirement Corpus Needed | WealthMaze",
    seoDescription: "Plan your retirement corpus. Estimate monthly savings required, accounting for inflation and post-retirement returns with WealthMaze.",
    inputs: [
      { id: "currentAge", label: "Current Age", type: "slider", min: 18, max: 70, step: 1, default: 30, unit: "Yr" },
      { id: "retirementAge", label: "Desired Retirement Age", type: "slider", min: 40, max: 75, step: 1, default: 55, unit: "Yr" },
      { id: "lifeExpectancy", label: "Life Expectancy", type: "slider", min: 70, max: 100, step: 1, default: 85, unit: "Yr" },
      { id: "monthlyExpenses", label: "Current Monthly Expenses", type: "slider", min: 5000, max: 500000, step: 5000, default: 60000, unit: "₹" },
      { id: "inflationRate", label: "Expected Inflation Rate (p.a.)", type: "slider", min: 2, max: 12, step: 0.5, default: 6, unit: "%" },
      { id: "preReturn", label: "Pre-Retirement Investment Return (p.a.)", type: "slider", min: 4, max: 20, step: 0.5, default: 12, unit: "%" },
      { id: "postReturn", label: "Post-Retirement Return (p.a.)", type: "slider", min: 3, max: 15, step: 0.5, default: 7, unit: "%" },
    ],
    outputs: [
      { id: "inflationAdjustedExpenses", label: "First Year Retired Monthly Expense", format: "currency" },
      { id: "corpusNeeded", label: "Retirement Corpus Needed", format: "currency" },
      { id: "requiredMonthlySavings", label: "Monthly Savings Required", format: "currency" },
    ],
    calculate: (inputs) => {
      const currentAge = inputs.currentAge;
      const retireAge = inputs.retirementAge;
      const lifeExp = inputs.lifeExpectancy;
      const expenses = inputs.monthlyExpenses;
      const inflation = inputs.inflationRate;
      const preRetRate = inputs.preReturn;
      const postRetRate = inputs.postReturn;

      const yearsToRetire = Math.max(1, retireAge - currentAge);
      const retirementYears = Math.max(1, lifeExp - retireAge);

      // Inflation adjusted monthly expenses at the start of retirement
      const initialRetirementExpenses = expenses * Math.pow(1 + inflation / 100, yearsToRetire);

      // Post retirement inflation-adjusted return rate (Real rate of return)
      const postRealRate = ((1 + postRetRate / 100) / (1 + inflation / 100) - 1) * 100;
      const postMonthlyRealRate = postRealRate / (12 * 100);
      const postMonths = retirementYears * 12;

      // Corpus Needed (Present Value of Annuity Due at retirement)
      // Corpus = Expenses * [(1 - (1 + i)^-n) / i] * (1 + i)
      let corpusNeeded = 0;
      if (postMonthlyRealRate > 0) {
        corpusNeeded = initialRetirementExpenses * ((1 - Math.pow(1 + postMonthlyRealRate, -postMonths)) / postMonthlyRealRate) * (1 + postMonthlyRealRate);
      } else {
        // Fallback if real rate of return is <= 0
        corpusNeeded = initialRetirementExpenses * postMonths;
      }

      // Required monthly savings to build the corpus
      const preMonthlyRate = preRetRate / (12 * 100);
      const preMonths = yearsToRetire * 12;
      const requiredMonthlySavings = corpusNeeded * preMonthlyRate / ((Math.pow(1 + preMonthlyRate, preMonths) - 1) * (1 + preMonthlyRate));

      const chartData = [];
      let balance = 0;
      // Accumulation phase
      for (let yr = currentAge; yr <= retireAge; yr++) {
        const index = yr - currentAge;
        if (index > 0) {
          balance = balance * (1 + preRetRate / 100) + (requiredMonthlySavings * 12 * (1 + preRetRate / (2 * 100))); // simple annual accrual
        }
        chartData.push({
          name: `Age ${yr}`,
          "Accumulated Wealth": Math.round(balance),
          "Expenses (Annual)": Math.round(expenses * 12 * Math.pow(1 + inflation / 100, index)),
        });
      }

      return {
        values: { inflationAdjustedExpenses: initialRetirementExpenses, corpusNeeded, requiredMonthlySavings },
        chartData,
      };
    },
    educationalContent: [
      {
        title: "How to Plan for Your Retirement?",
        content: "Retirement planning involves establishing how much income you will need in your post-work years and determining how to build that sum during your employment. Inflation is the single biggest threat to retirees, as a monthly expense of ₹50,000 today will escalate to ₹2.1 Lakhs in 25 years at a 6% inflation rate. Therefore, your retirement corpus must grow even after retirement to prevent you from outliving your money."
      }
    ],
    faqs: [
      { question: "What is the 4% rule?", answer: "The 4% rule is a guideline stating that retirees can safely withdraw 4% of their initial retirement portfolio in the first year, and adjust that amount for inflation each subsequent year, with a high probability that the corpus will last at least 30 years." }
    ]
  },
  {
    id: "fire-calculator",
    name: "FIRE Calculator",
    category: "Retirement",
    description: "Determine when you can achieve Financial Independence, Retire Early (FIRE).",
    seoTitle: "FIRE Calculator - Financial Independence Retire Early | WealthMaze",
    seoDescription: "Calculate your FIRE number. Discover when you can retire early based on your current savings rate and target lifestyle expenses with WealthMaze.",
    inputs: [
      { id: "currentAge", label: "Current Age", type: "slider", min: 18, max: 60, step: 1, default: 28, unit: "Yr" },
      { id: "annualIncome", label: "Net Annual Income", type: "slider", min: 100000, max: 5000000, step: 50000, default: 1200000, unit: "₹" },
      { id: "savingsRate", label: "Savings Rate", type: "slider", min: 5, max: 90, step: 5, default: 40, unit: "%" },
      { id: "currentSavings", label: "Current Portfolio / Savings", type: "slider", min: 0, max: 20000000, step: 50000, default: 500000, unit: "₹" },
      { id: "investmentReturn", label: "Return on Investment (p.a.)", type: "slider", min: 4, max: 20, step: 0.5, default: 10, unit: "%" },
      { id: "postFireReturn", label: "Post-FIRE Real Return Rate", type: "slider", min: 2, max: 10, step: 0.5, default: 4, unit: "%" },
    ],
    outputs: [
      { id: "fireNumber", label: "Target FIRE Number", format: "currency" },
      { id: "yearsToFire", label: "Years to Reach FIRE", format: "number" },
      { id: "ageAtFire", label: "Age at FIRE", format: "number" },
    ],
    calculate: (inputs) => {
      const age = inputs.currentAge;
      const income = inputs.annualIncome;
      const sRate = inputs.savingsRate;
      const currentPortfolio = inputs.currentSavings;
      const r = inputs.investmentReturn;
      const realReturn = inputs.postFireReturn; // e.g. 4% Safe Withdrawal Rate (SWR) implies 25x expenses

      const annualSavings = income * (sRate / 100);
      const annualExpenses = income - annualSavings;

      // FIRE Number = Annual Expenses / (SWR / 100). (e.g. 4% SWR -> 25x expenses)
      const swr = realReturn;
      const fireNumber = annualExpenses / (swr / 100);

      // Solve for years to reach FIRE:
      // Portfolio_t = Current * (1+r)^t + Savings * (((1+r)^t - 1) / r) * (1+r) = FIRE_Number
      let portfolio = currentPortfolio;
      let years = 0;
      const chartData = [];

      chartData.push({
        name: `Age ${age}`,
        "Portfolio Value": Math.round(portfolio),
        "FIRE Target": Math.round(fireNumber),
      });

      const maxSimYears = 60;
      for (let t = 1; t <= maxSimYears; t++) {
        if (portfolio < fireNumber) {
          portfolio = portfolio * (1 + r / 100) + annualSavings;
          years = t;
        } else {
          // Keep compounding even after reaching goal in chart
          portfolio = portfolio * (1 + r / 100);
        }
        chartData.push({
          name: `Age ${age + t}`,
          "Portfolio Value": Math.round(portfolio),
          "FIRE Target": Math.round(fireNumber),
        });
      }

      if (currentPortfolio >= fireNumber) {
        years = 0;
      }

      return {
        values: { fireNumber, yearsToFire: years, ageAtFire: age + years },
        chartData: chartData.slice(0, Math.min(years + 10, maxSimYears)),
      };
    },
    educationalContent: [
      {
        title: "The Financial Independence, Retire Early (FIRE) Movement",
        content: "FIRE is a lifestyle movement defined by extreme savings and investment, allowing proponents to retire far earlier than traditional retirement ages. The strategy is to save a high percentage of income (50-70%) during early working years to accumulate a portfolio large enough to cover living expenses indefinitely, using a Safe Withdrawal Rate (typically 3-4%)."
      }
    ],
    faqs: [
      { question: "What is Lean FIRE vs Fat FIRE?", answer: "Lean FIRE involves retiring early on a minimalist budget (expenses under ₹3-4 Lakhs/year), while Fat FIRE accommodates a luxurious, high-spending early retirement lifestyle (expenses exceeding ₹15-20 Lakhs/year)." }
    ]
  },
  {
    id: "net-worth-calculator",
    name: "Net Worth Calculator",
    category: "Investing",
    description: "Calculate your net worth by tabulating all your assets and liabilities.",
    seoTitle: "Net Worth Calculator - Calculate Your Net Worth | WealthMaze",
    seoDescription: "Determine your net worth. Enter your cash, properties, equity investments, and subtract loans using WealthMaze's free net worth calculator.",
    inputs: [
      { id: "cashBank", label: "Cash & Bank Balance", type: "number", default: 200000, unit: "₹" },
      { id: "mutualFunds", label: "Mutual Funds & ETFs", type: "number", default: 1200000, unit: "₹" },
      { id: "stocks", label: "Direct Stocks / Shares", type: "number", default: 800000, unit: "₹" },
      { id: "realEstate", label: "Real Estate Property Value", type: "number", default: 4500000, unit: "₹" },
      { id: "goldPrecious", label: "Gold & Jewellery", type: "number", default: 500000, unit: "₹" },
      { id: "homeLoan", label: "Home Loan Outstanding", type: "number", default: 2000000, unit: "₹" },
      { id: "otherLoans", label: "Other Loans (Car, Personal)", type: "number", default: 300000, unit: "₹" },
    ],
    outputs: [
      { id: "totalAssets", label: "Total Assets", format: "currency" },
      { id: "totalLiabilities", label: "Total Liabilities", format: "currency" },
      { id: "netWorth", label: "Net Worth", format: "currency" },
    ],
    calculate: (inputs) => {
      const assets = (inputs.cashBank || 0) + (inputs.mutualFunds || 0) + (inputs.stocks || 0) + (inputs.realEstate || 0) + (inputs.goldPrecious || 0);
      const liabilities = (inputs.homeLoan || 0) + (inputs.otherLoans || 0);
      const netWorth = assets - liabilities;

      const chartData = [
        { name: "Cash & Bank", Value: inputs.cashBank || 0 },
        { name: "Mutual Funds", Value: inputs.mutualFunds || 0 },
        { name: "Stocks", Value: inputs.stocks || 0 },
        { name: "Real Estate", Value: inputs.realEstate || 0 },
        { name: "Gold", Value: inputs.goldPrecious || 0 },
      ];

      return {
        values: { totalAssets: assets, totalLiabilities: liabilities, netWorth },
        chartData,
      };
    },
    educationalContent: [
      {
        title: "What is Net Worth?",
        content: "Your net worth is the absolute measurement of your financial health. It is computed as the total value of everything you own (Assets) minus the total value of everything you owe (Liabilities). A positive, rising net worth indicates good financial progress, while a negative net worth suggests high-interest debt burdens that need immediate repayment."
      }
    ],
    faqs: [
      { question: "How often should I calculate my net worth?", answer: "Calculating your net worth once a quarter or once a year is standard. Regular tracking highlights whether your assets are growing faster than your debts over time." }
    ]
  },
  {
    id: "sip-comparison-calculator",
    name: "SIP Comparison Calculator",
    category: "Investing",
    description: "Compare two Systematic Investment Plan (SIP) scenarios side-by-side to analyze the impact of different monthly investments, expected returns, or time periods.",
    seoTitle: "SIP Comparison Calculator - Compare Mutual Fund SIPs Side-by-Side | WealthMaze",
    seoDescription: "Compare two different mutual fund SIP investment scenarios side-by-side. Calculate how differences in monthly SIP amounts, returns, or tenure affect your long-term wealth corpus.",
    inputs: [
      { id: "monthlyInvestmentA", label: "Scenario A: Monthly Investment", type: "slider", min: 500, max: 1000000, step: 500, default: 10000, unit: "₹" },
      { id: "expectedReturnA", label: "Scenario A: Expected Return Rate (p.a.)", type: "slider", min: 1, max: 30, step: 0.5, default: 12, unit: "%" },
      { id: "timePeriodA", label: "Scenario A: Time Period", type: "slider", min: 1, max: 40, step: 1, default: 10, unit: "Yr" },
      { id: "monthlyInvestmentB", label: "Scenario B: Monthly Investment", type: "slider", min: 500, max: 1000000, step: 500, default: 15000, unit: "₹" },
      { id: "expectedReturnB", label: "Scenario B: Expected Return Rate (p.a.)", type: "slider", min: 1, max: 30, step: 0.5, default: 15, unit: "%" },
      { id: "timePeriodB", label: "Scenario B: Time Period", type: "slider", min: 1, max: 40, step: 1, default: 10, unit: "Yr" },
    ],
    outputs: [
      { id: "totalValueA", label: "Scenario A: Total Value", format: "currency" },
      { id: "totalValueB", label: "Scenario B: Total Value", format: "currency" },
      { id: "difference", label: "Wealth Difference", format: "currency" },
    ],
    calculate: (inputs) => {
      const pA = inputs.monthlyInvestmentA;
      const rA = inputs.expectedReturnA;
      const tA = inputs.timePeriodA;
      
      const pB = inputs.monthlyInvestmentB;
      const rB = inputs.expectedReturnB;
      const tB = inputs.timePeriodB;

      // Scenario A calculation
      const iA = rA / (12 * 100);
      const nA = tA * 12;
      const totalValueA = pA * ((Math.pow(1 + iA, nA) - 1) / iA) * (1 + iA);
      const investedA = pA * nA;
      const returnsA = totalValueA - investedA;

      // Scenario B calculation
      const iB = rB / (12 * 100);
      const nB = tB * 12;
      const totalValueB = pB * ((Math.pow(1 + iB, nB) - 1) / iB) * (1 + iB);
      const investedB = pB * nB;
      const returnsB = totalValueB - investedB;

      const difference = Math.abs(totalValueB - totalValueA);

      // Chart Data
      const maxYears = Math.max(tA, tB);
      const chartData = [];
      for (let yr = 1; yr <= maxYears; yr++) {
        const valA = yr <= tA ? pA * ((Math.pow(1 + iA, yr * 12) - 1) / iA) * (1 + iA) : totalValueA;
        const valB = yr <= tB ? pB * ((Math.pow(1 + iB, yr * 12) - 1) / iB) * (1 + iB) : totalValueB;
        chartData.push({
          name: `Yr ${yr}`,
          "Scenario A Wealth": Math.round(valA),
          "Scenario B Wealth": Math.round(valB),
        });
      }

      return {
        values: { totalValueA, totalValueB, difference },
        chartData,
        comparison: {
          title: "Detailed Scenario Comparison",
          headers: ["Metric", "Scenario A", "Scenario B", "Difference"],
          rows: [
            ["Monthly Contribution", formatIndianCurrency(pA), formatIndianCurrency(pB), formatIndianCurrency(Math.abs(pB - pA))],
            ["Annual Return Rate", `${rA}%`, `${rB}%`, `${Math.abs(rB - rA).toFixed(1)}%`],
            ["Tenure (Years)", `${tA} Years`, `${tB} Years`, `${Math.abs(tB - tA)} Years`],
            ["Total Principal Invested", formatIndianCurrency(investedA), formatIndianCurrency(investedB), formatIndianCurrency(Math.abs(investedB - investedA))],
            ["Estimated Interest Earned", formatIndianCurrency(returnsA), formatIndianCurrency(returnsB), formatIndianCurrency(Math.abs(returnsB - returnsA))],
            ["Maturity Corpus Value", formatIndianCurrency(totalValueA), formatIndianCurrency(totalValueB), formatIndianCurrency(difference)],
          ],
        },
      };
    },
    educationalContent: [
      {
        title: "Why Compare SIP Scenarios?",
        content: "Comparing two investment scenarios side-by-side helps visualize how minor adjustments to your savings rate or estimated portfolio returns can dramatically compound over time. This makes it easy to understand the value of increasing your monthly investments (step-up SIP) or searching for funds with slightly better historical yields."
      },
      {
        title: "The Step-Up SIP Concept",
        content: "A Step-Up SIP involves increasing your monthly contribution periodically (e.g., by 10% each year as your income grows). By comparing a flat ₹10,000 monthly SIP with a higher average monthly contribution, you can see how much faster you can achieve major financial targets like buying a car or funding retirement."
      }
    ],
    faqs: [
      { question: "How does return rate affect the final corpus?", answer: "Because compounding is exponential, even a 1% or 2% difference in annual return rates (such as 12% vs 14%) can yield a difference of several lakhs or crores over 20-30 years." }
    ]
  }
];
