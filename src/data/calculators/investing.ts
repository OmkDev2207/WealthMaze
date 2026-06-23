import { CalculatorConfig } from "./types";

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
    seoTitle: "SIP Calculator – Calculate Mutual Fund Returns Online",
    seoDescription: "Use the WealthMaze SIP Calculator to calculate mutual fund returns, systematic investment plan growth, and future compounding wealth corpus instantly.",
    inputs: [
      { id: "monthlyInvestment", label: "Monthly Investment", type: "slider", min: 500, max: 1000000, step: 500, default: 25000, unit: "₹" },
      { id: "expectedReturn", label: "Expected Return Rate (p.a.)", type: "slider", min: 1, max: 30, step: 0.5, default: 12, unit: "%" },
      { id: "timePeriod", label: "Time Period", type: "slider", min: 1, max: 40, step: 1, default: 10, unit: "Yr" },
      { id: "stepUp", label: "Annual Step-up", type: "slider", min: 0, max: 50, step: 1, default: 0, unit: "%" },
    ],
    outputs: [
      { id: "investedAmount", label: "Invested Amount", format: "currency" },
      { id: "estReturns", label: "Est. Returns", format: "currency" },
      { id: "totalValue", label: "Total Value", format: "currency" },
      { id: "purchasingPower", label: "Est. Corpus in Today's Value (6% Inflation)", format: "currency" },
    ],
    calculate: (inputs) => {
      const p = inputs.monthlyInvestment;
      const r = inputs.expectedReturn;
      const t = inputs.timePeriod;
      const stepUp = (inputs.stepUp || 0) / 100;

      const monthlyRate = r / 12 / 100;
      let totalValue = 0;
      let investedAmount = 0;
      let currentMonthlyInvestment = p;

      const chartData = [];

      for (let yr = 1; yr <= t; yr++) {
        for (let month = 1; month <= 12; month++) {
          totalValue = (totalValue + currentMonthlyInvestment) * (1 + monthlyRate);
          investedAmount += currentMonthlyInvestment;
        }
        chartData.push({
          name: `Yr ${yr}`,
          "Invested Amount": Math.round(investedAmount),
          "Total Wealth": Math.round(totalValue),
        });
        currentMonthlyInvestment = currentMonthlyInvestment * (1 + stepUp);
      }

      const estReturns = totalValue - investedAmount;

      const lumpsumEquivalent = investedAmount;
      const lumpsumValue = lumpsumEquivalent * Math.pow(1 + r / 100, t);
      const savingsValue = investedAmount * Math.pow(1 + 4 / 100, t);

      const purchasingPower = totalValue / Math.pow(1 + 0.06, t);

      return {
        values: { investedAmount, estReturns, totalValue, purchasingPower },
        chartData,
        comparison: {
          title: "Alternative Investment Scenarios",
          headers: ["Strategy", "Amount Invested", `Final Value (${t} Yrs)`, "Net Gain"],
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
        title: "Benefits of Systematic Investment Plans (SIP)",
        content: "Use our Systematic Investment Plan (SIP) Calculator to estimate mutual fund growth. A Systematic Investment Plan (SIP) is an investment vehicle offered by mutual funds, allowing investors to invest a fixed amount regularly (monthly, quarterly) rather than a lump sum. This builds discipline, automates savings, and reduces market timing hassles."
      },
      {
        title: "How Does a SIP Calculator calculate returns?",
        content: "The SIP calculator uses the future value of an annuity formula to compute returns. The compound interest is calculated on a monthly frequency because investments occur monthly. The math is governed by the formula:\n\n**FV = P x [ ((1 + i)^n - 1) / i ] x (1 + i)**\n\nWhere:\n- **FV** = Future Value (the terminal maturity value)\n- **P** = Monthly Investment amount\n- **i** = Monthly interest rate (annual expected return / 12 / 100)\n- **n** = Number of monthly payments (duration in years * 12)\n\nThis calculator automates this calculation instantly, saving you from complex calculations and potential manual errors."
      },
      {
        title: "The Power of Rupee Cost Averaging in Stock Market",
        content: "When markets are volatile, a fixed monthly investment buys fewer units when prices are high and more units when prices are low. Over the long term, this averages out the cost of acquisition per unit of mutual funds, reducing the risk of investing a large sum at a market peak. Consequently, investors don't need to try and time market bottoms and tops, which is notoriously difficult to execute consistently."
      },
      {
        title: "How Compounding Accelerates Investment Plans",
        content: "Compound interest is the practice of earning interest on your accumulated interest. As your mutual fund investment earns dividends or capital gains, those gains are reinvested back into the fund to buy more units, which then earn further gains. In the early years of a SIP, the growth might appear slow. However, in years 10, 15, or 20, the compounding curve bends upwards steeply. A SIP of ₹10,000 monthly for 10 years at 12% results in ~₹23 Lakhs, but letting it compound for 20 years results in ~₹1 Crore! Time in the market is significantly more crucial than timing the market."
      }
    ],
    faqs: [
      { question: "What is a SIP calculator?", answer: "A SIP calculator is a free online financial tool that helps you calculate the future value of your regular monthly mutual fund investments based on expected annual return rates." },
      { question: "How does a SIP calculator calculate returns?", answer: "It uses the future value of an annuity formula, compounding monthly returns on your periodic savings over the selected holding duration." },
      { question: "Can I calculate SIP maturity amount online?", answer: "Yes, by entering your monthly savings budget, expected yield, and investment tenure, you can estimate your total maturity corpus instantly." },
      { question: "What is the best SIP investment plan?", answer: "The best SIP investment plan depends on your financial goals, risk profile, and investment horizon. Diversified equity mutual funds are generally recommended for long-term horizons of 5 to 10+ years." }
    ]
  },
  {
    id: "lumpsum-calculator",
    name: "Lumpsum Calculator",
    category: "Investing",
    description: "Calculate the future value of a one-time lumpsum investment.",
    seoTitle: "Lumpsum Calculator – Calculate Compound Interest Returns",
    seoDescription: "Calculate returns on your one-time lumpsum investments. Estimate maturity values of mutual funds, equities, and fixed investments using our calculator.",
    inputs: [
      { id: "lumpsumAmount", label: "Lumpsum Investment", type: "slider", min: 5000, max: 10000000, step: 5000, default: 100000, unit: "₹" },
      { id: "expectedReturn", label: "Expected Return Rate (p.a.)", type: "slider", min: 1, max: 30, step: 0.5, default: 12, unit: "%" },
      { id: "timePeriod", label: "Time Period", type: "slider", min: 1, max: 40, step: 1, default: 10, unit: "Yr" },
    ],
    outputs: [
      { id: "investedAmount", label: "Invested Amount", format: "currency" },
      { id: "estReturns", label: "Est. Returns", format: "currency" },
      { id: "totalValue", label: "Total Value", format: "currency" },
      { id: "purchasingPower", label: "Est. Corpus in Today's Value (6% Inflation)", format: "currency" },
    ],
    calculate: (inputs) => {
      const pv = inputs.lumpsumAmount;
      const r = inputs.expectedReturn;
      const t = inputs.timePeriod;

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

      const fdValue = pv * Math.pow(1 + 6 / 100, t);
      const inflationAdjusted = totalValue / Math.pow(1 + 6 / 100, t);

      const purchasingPower = totalValue / Math.pow(1 + 0.06, t);

      return {
        values: { investedAmount, estReturns, totalValue, purchasingPower },
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
        title: "Understanding Lumpsum Investment Plans",
        content: "Our Lumpsum Calculator projects the future value of one-time investments. A Lumpsum investment is a single, one-off transaction where a large sum of cash is committed to an investment instrument (such as mutual funds, stocks, real estate, or gold) all at once, rather than spreading it over time like a SIP. It is common for windfalls, bonuses, or property proceeds."
      },
      {
        title: "How to calculate Lumpsum returns with compound interest?",
        content: "The Lumpsum Calculator uses the classic compound interest formula to estimate future value:\n\n**FV = PV x (1 + r)^t**\n\nWhere:\n- **FV** = Future Value of the investment\n- **PV** = Present Value (initial lumpsum amount)\n- **r** = Annual return rate (entered as decimal, e.g., 12% = 0.12)\n- **t** = Time period in years\n\nThis simple compounding logic shows the dramatic power of compounding over long durations when money is left untouched."
      },
      {
        title: "SIP vs Lumpsum Investment Plan Comparison",
        content: "Neither is universally superior; the choice depends on market conditions and your cash availability. Lumpsum investing yields higher returns in a bull market because all your money compounds for the entire duration. However, it exposes you to high risk if you invest just before a market crash. SIP mitigates this risk by purchasing units throughout market fluctuations, making it ideal for regular earners, whereas Lumpsum is suited for experienced investors with a lump sum looking for long-term horizons."
      }
    ],
    faqs: [
      { question: "When is the best time to make a lumpsum investment?", answer: "Historically, the best time to invest is when you have the funds available. For equity mutual funds, buying during market corrections or bear runs can improve long-term returns, though market timing is secondary to long investment horizons." },
      { question: "How do I calculate lumpsum compound returns?", answer: "Use our lumpsum calculator to project compounding returns by entering your initial deposit, expected return rate, and investment horizon." }
    ]
  },
  {
    id: "mutual-fund-return-calculator",
    name: "Mutual Fund Return Calculator",
    category: "Investing",
    description: "Calculate expected returns on mutual funds for combined lumpsum and SIP investments.",
    seoTitle: "Mutual Fund Return Calculator – Estimate Growth Online",
    seoDescription: "Use our mutual fund return calculator to project compound growth, estimate lumpsum returns, and plan monthly systematic investments instantly.",
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
      { id: "purchasingPower", label: "Est. Corpus in Today's Value (6% Inflation)", format: "currency" },
    ],
    calculate: (inputs) => {
      const lumpsum = inputs.lumpsumAmount;
      const sip = inputs.monthlySIP;
      const r = inputs.expectedReturn;
      const t = inputs.timePeriod;

      const i = r / (12 * 100);
      const n = t * 12;

      const lumpsumFV = lumpsum * Math.pow(1 + r / 100, t);
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

      const purchasingPower = totalValue / Math.pow(1 + 0.06, t);

      return {
        values: { investedAmount, estReturns, totalValue, purchasingPower },
        chartData,
      };
    },
    educationalContent: [
      {
        title: "How Mutual Fund Return Calculators estimate growth?",
        content: "Our Mutual Fund Return Calculator projects compound growth for your portfolio. Mutual fund schemes pool money from multiple investors to buy diversified assets like stocks, bonds, or corporate debt. Returns are driven by capital appreciation of holdings and dividends. NAV represents the unit value of the fund."
      }
    ],
    faqs: [
      { question: "What is the difference between Direct and Regular plans?", answer: "Direct plans have lower expense ratios because they do not involve broker commissions, leading to slightly higher returns (typically 0.5% to 1.5% more per year) than Regular plans." },
      { question: "How do I calculate mutual fund compounding returns?", answer: "Enter your lumpsum investment, regular monthly SIP contributions, expected return rate, and time period to estimate the future growth of your mutual fund portfolio." }
    ]
  },
  {
    id: "cagr-calculator",
    name: "CAGR Calculator",
    category: "Investing",
    description: "Calculate the Compound Annual Growth Rate (CAGR) of your investments over time.",
    seoTitle: "CAGR Calculator – Calculate Annual Growth Rate Online",
    seoDescription: "Calculate the Compound Annual Growth Rate of stocks, mutual funds, or portfolios. Find the annualized growth rate of investments on WealthMaze.",
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

      const cagrRate = (Math.pow(final / init, 1 / years) - 1) * 100;
      const absoluteGain = ((final - init) / init) * 100;

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
        title: "Benefits of Compound Annual Growth Rate (CAGR)",
        content: "Our CAGR Calculator calculates the Compound Annual Growth Rate of your portfolio. CAGR represents the smoothed annualized rate at which an asset grows if it grows at a steady rate over a specified time period, assuming all profits are reinvested. It provides a standardized metric to compare different assets."
      },
      {
        title: "How to calculate CAGR with the formula?",
        content: "CAGR is calculated mathematically as:\n\n**CAGR = ( Final Value / Initial Value )^(1 / t) - 1**\n\nWhere:\n- **Final Value** = Value at the end of the period\n- **Initial Value** = Initial investment amount\n- **t** = Number of years (can be fractional)\n\nUnlike simple returns, CAGR accounts for compounding, preventing distortions caused by volatile swings."
      }
    ],
    faqs: [
      { question: "Why is CAGR better than Absolute Return?", answer: "Absolute return ignores the time value of money. An absolute return of 100% sounds great, but if it takes 15 years to achieve, it corresponds to a modest CAGR of only ~4.7%. CAGR normalizes growth per year." },
      { question: "How do I calculate CAGR online?", answer: "Enter your initial purchase value, final sale value, and holding tenure in years into the CAGR calculator to see your annualized returns." }
    ]
  },
  {
    id: "xirr-calculator",
    name: "XIRR Calculator",
    category: "Investing",
    description: "Calculate the Extended Internal Rate of Return (XIRR) for irregular cash flows and investments.",
    seoTitle: "XIRR Calculator – Calculate SIP and Portfolio ROI Online",
    seoDescription: "Calculate mutual fund and stock portfolio XIRR. Get an accurate annualized return for irregular buy and sell transaction dates with our calculator.",
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

      const netGain = flows.reduce((sum, f) => sum + f.amount, 0);

      const npv = (r: number) => {
        return flows.reduce((sum, f) => {
          const t = f.days / 365;
          return sum + f.amount / Math.pow(1 + r, t);
        }, 0);
      };

      let r0 = 0.1;
      let r1 = 0.2;
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
        xirrRate = 0;
      }

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
        title: "Benefits of XIRR Calculations for Portfolio Returns",
        content: "Our XIRR Calculator handles irregular cash flows and deposits. XIRR stands for Extended Internal Rate of Return. It is the metric used to calculate the annualized rate of return for a series of irregular cash flows occurring at various dates. Since investors deposit and withdraw money at random intervals, XIRR provides the exact annualized growth."
      }
    ],
    faqs: [
      { question: "Why should I use XIRR instead of CAGR for SIP?", answer: "CAGR assumes a single initial investment and a single final payout. A SIP has multiple transactions at different points in time. XIRR calculates the exact returns by accounting for the specific number of days each installment has been invested." },
      { question: "How do I calculate XIRR online?", answer: "Enter your cash flow values (investments as negative values, withdrawals/final value as positive values) and corresponding dates into the XIRR calculator to see your annualized yield." }
    ]
  },
  {
    id: "swp-calculator",
    name: "SWP Calculator",
    category: "Investing",
    description: "Calculate the cash depletion and balance timeline of a Systematic Withdrawal Plan (SWP).",
    seoTitle: "SWP Calculator – Calculate Systematic Withdrawals Online",
    seoDescription: "Calculate your Systematic Withdrawal Plan (SWP) returns and remaining balance. Estimate how long your mutual fund retirement corpus will last online.",
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
            totalWithdrawn += balance;
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
        title: "Benefits of Systematic Withdrawal Plans (SWP)",
        content: "Our SWP Calculator maps out your retirement cash depletion schedule. A Systematic Withdrawal Plan (SWP) allows you to withdraw a fixed amount of money from your mutual fund scheme at regular intervals (usually monthly). It is commonly used by retirees to generate a steady monthly income from their retirement corpus."
      }
    ],
    faqs: [
      { question: "Is SWP tax-free?", answer: "SWP withdrawals are treated as redemptions of units, so they are subject to Capital Gains Tax (LTCG or STCG) depending on the holding period and asset type, rather than being taxed entirely as income (unlike fixed deposit interest or annuity payouts)." },
      { question: "How do I calculate SWP monthly withdrawals?", answer: "Enter your initial retirement corpus, monthly withdrawal amount, expected rate of return, and tenure into the SWP calculator to view your future balance timeline." }
    ]
  },
  {
    id: "goal-based-investment-calculator",
    name: "Goal Based Investment Calculator",
    category: "Investing",
    description: "Determine the monthly SIP or lumpsum investment needed to reach a specific financial goal.",
    seoTitle: "Goal Calculator – Calculate Savings for Financial Goals",
    seoDescription: "Calculate how much you need to save monthly to reach your financial goals. Plan house, car, or emergency fund investments with WealthMaze.",
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

      const requiredSIP = target * i / ((Math.pow(1 + i, n) - 1) * (1 + i));
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
        title: "Benefits of Goal-Based Investment Plans",
        content: "Our Goal Based Investment Calculator helps you target life milestones. Goal-based investing shifts the focus from chasing arbitrary market returns to funding specific milestones in your life (e.g., buying a home, children's higher education, retirement, or an international vacation). By estimating how much money is required, you can plan properly."
      }
    ],
    faqs: [
      { question: "Should I adjust my goal for inflation?", answer: "Yes, absolutely. A goal of ₹50 Lakhs in 10 years will require a larger nominal corpus because of inflation. If inflation averages 6%, you should set your target goal to ~₹89.5 Lakhs to preserve the purchasing power of your target amount." },
      { question: "How do I calculate monthly SIP for a goal?", answer: "Input your target financial goal amount, investment tenure, and expected return rate to calculate the exact monthly SIP required to reach your goal." }
    ]
  },
  {
    id: "retirement-calculator",
    name: "Retirement Calculator",
    category: "Retirement",
    description: "Determine the corpus you need to retire comfortably and the monthly savings required to build it.",
    seoTitle: "Retirement Calculator – Plan Savings and FIRE Target",
    seoDescription: "Estimate your target retirement savings corpus. Calculate monthly investment targets and FIRE numbers with our free retirement planning tool.",
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

      const initialRetirementExpenses = expenses * Math.pow(1 + inflation / 100, yearsToRetire);

      const postRealRate = ((1 + postRetRate / 100) / (1 + inflation / 100) - 1) * 100;
      const postMonthlyRealRate = postRealRate / (12 * 100);
      const postMonths = retirementYears * 12;

      let corpusNeeded = 0;
      if (postMonthlyRealRate > 0) {
        corpusNeeded = initialRetirementExpenses * ((1 - Math.pow(1 + postMonthlyRealRate, -postMonths)) / postMonthlyRealRate) * (1 + postMonthlyRealRate);
      } else {
        corpusNeeded = initialRetirementExpenses * postMonths;
      }

      const preMonthlyRate = preRetRate / (12 * 100);
      const preMonths = yearsToRetire * 12;
      const requiredMonthlySavings = corpusNeeded * preMonthlyRate / ((Math.pow(1 + preMonthlyRate, preMonths) - 1) * (1 + preMonthlyRate));

      const chartData = [];
      let balance = 0;
      for (let yr = currentAge; yr <= retireAge; yr++) {
        const index = yr - currentAge;
        if (index > 0) {
          balance = balance * (1 + preRetRate / 100) + (requiredMonthlySavings * 12 * (1 + preRetRate / (2 * 100)));
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
        title: "Benefits of Retirement Planning",
        content: "Our Retirement Calculator determines your required post-work wealth corpus. Retirement planning involves establishing how much income you will need in your post-work years and determining how to build that sum during your employment. Inflation is the single biggest threat to retirees, eroding purchasing power over decades."
      }
    ],
    faqs: [
      { question: "What is the 4% rule?", answer: "The 4% rule is a guideline stating that retirees can safely withdraw 4% of their initial retirement portfolio in the first year, and adjust that amount for inflation each subsequent year, with a high probability that the corpus will last at least 30 years." },
      { question: "How do I calculate retirement corpus online?", answer: "Enter your current age, desired retirement age, life expectancy, monthly expenses, inflation, and investment returns to estimate your required retirement nest egg." }
    ]
  },
  {
    id: "fire-calculator",
    name: "FIRE Calculator",
    category: "Retirement",
    description: "Determine when you can achieve Financial Independence, Retire Early (FIRE).",
    seoTitle: "FIRE Calculator – Calculate Financial Independence Early",
    seoDescription: "Calculate your FIRE number. Discover when you can retire early based on your current savings rate and target lifestyle expenses with our calculator.",
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
      const realReturn = inputs.postFireReturn;

      const annualSavings = income * (sRate / 100);
      const annualExpenses = income - annualSavings;

      const swr = realReturn;
      const fireNumber = annualExpenses / (swr / 100);

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
        title: "The Financial Independence, Retire Early (FIRE) Movement Strategy",
        content: "Our FIRE Calculator computes your early retirement nest egg. FIRE is a lifestyle movement defined by extreme savings and investment, allowing proponents to retire far earlier than traditional retirement ages. The strategy is to save a high percentage of income (50-70%) to accumulate a portfolio large enough to cover expenses."
      }
    ],
    faqs: [
      { question: "What is Lean FIRE vs Fat FIRE?", answer: "Lean FIRE involves retiring early on a minimalist budget (expenses under ₹3-4 Lakhs/year), while Fat FIRE accommodates a luxurious, high-spending early retirement lifestyle (expenses exceeding ₹15-20 Lakhs/year)." },
      { question: "How do I calculate my early retirement target?", answer: "Input your age, annual income, current savings, expected return rate, and target SWR percentage into our FIRE calculator to find the years required to reach financial freedom." }
    ]
  },
  {
    id: "net-worth-calculator",
    name: "Net Worth Calculator",
    category: "Investing",
    description: "Calculate your net worth by tabulating all your assets and liabilities.",
    seoTitle: "Net Worth Calculator – Calculate Your Net Worth Online",
    seoDescription: "Determine your net worth. Enter your cash, properties, equity investments, and subtract loans using our free net worth calculator instantly.",
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
        title: "Understanding Assets and Liabilities",
        content: "Our Net Worth Calculator tabulates your personal balance sheet. Your net worth is the absolute measurement of your financial health. It is computed as the total value of everything you own (Assets) minus the total value of everything you owe (Liabilities). A positive, rising net worth indicates good financial progress."
      }
    ],
    faqs: [
      { question: "How often should I calculate my net worth?", answer: "Calculating your net worth once a quarter or once a year is standard. Regular tracking highlights whether your assets are growing faster than your debts over time." },
      { question: "How do I calculate net worth online?", answer: "Enter your bank balances, stock portfolios, real estate properties, and gold assets, and subtract any outstanding loans or debts to compute your net worth." }
    ]
  },
  {
    id: "sip-comparison-calculator",
    name: "SIP Comparison Calculator",
    category: "Investing",
    description: "Compare two Systematic Investment Plan (SIP) scenarios side-by-side to analyze the impact of different monthly investments, expected returns, or time periods.",
    seoTitle: "SIP Comparison Calculator – Compare Mutual Fund SIPs",
    seoDescription: "Compare two different mutual fund SIP investment scenarios side-by-side. Calculate how differences in monthly SIP amounts affect your future returns.",
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

      const iA = rA / (12 * 100);
      const nA = tA * 12;
      const totalValueA = pA * ((Math.pow(1 + iA, nA) - 1) / iA) * (1 + iA);
      const investedA = pA * nA;
      const returnsA = totalValueA - investedA;

      const iB = rB / (12 * 100);
      const nB = tB * 12;
      const totalValueB = pB * ((Math.pow(1 + iB, nB) - 1) / iB) * (1 + iB);
      const investedB = pB * nB;
      const returnsB = totalValueB - investedB;

      const difference = Math.abs(totalValueB - totalValueA);

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
        title: "Benefits of Comparing Mutual Fund SIPs",
        content: "Our SIP Comparison Calculator lets you compare two plans side-by-side. Comparing two investment portfolio scenarios side-by-side helps visualize how minor adjustments to your savings rate or estimated portfolio returns can dramatically compound over time. This makes it easy to understand compounding differences."
      }
    ],
    faqs: [
      { question: "How does return rate affect the final corpus?", answer: "Because compounding is exponential, even a 1% or 2% difference in annual return rates (such as 12% vs 14%) can yield a difference of several lakhs or crores over 20-30 years." },
      { question: "How do I compare two mutual fund SIP plans?", answer: "Enter the monthly installment amounts, return rates, and tenures for both scenarios in the comparison calculator to instantly see differences in maturity value." }
    ]
  },
  {
    id: "step-up-sip-calculator",
    name: "Step-Up SIP Calculator",
    category: "Investing",
    description: "Calculate the future value of your SIP with annual top-up increases.",
    seoTitle: "Step-Up SIP Calculator – Estimate Annual Top-Up ROI",
    seoDescription: "Calculate the future value of your Systematic Investment Plan (SIP) with annual top-up increases. See how increasing monthly SIP speeds wealth growth.",
    inputs: [
      { id: "monthlyInvestment", label: "Starting Monthly SIP", type: "slider", min: 500, max: 1000000, step: 500, default: 10000, unit: "₹" },
      { id: "annualStepUp", label: "Annual Step-Up Increment", type: "slider", min: 1, max: 30, step: 1, default: 10, unit: "%" },
      { id: "expectedReturn", label: "Expected Return Rate (p.a.)", type: "slider", min: 1, max: 30, step: 0.5, default: 12, unit: "%" },
      { id: "timePeriod", label: "Time Period", type: "slider", min: 1, max: 40, step: 1, default: 10, unit: "Yr" },
    ],
    outputs: [
      { id: "investedAmount", label: "Total Invested Amount", format: "currency" },
      { id: "estReturns", label: "Est. Returns", format: "currency" },
      { id: "totalValue", label: "Total Value", format: "currency" },
      { id: "purchasingPower", label: "Est. Corpus in Today's Value (6% Inflation)", format: "currency" },
    ],
    calculate: (inputs) => {
      const p = inputs.monthlyInvestment;
      const stepUp = inputs.annualStepUp / 100;
      const r = inputs.expectedReturn;
      const t = inputs.timePeriod;

      const monthlyRate = r / 12 / 100;
      let totalValue = 0;
      let investedAmount = 0;
      let currentMonthlyInvestment = p;

      const chartData = [];

      for (let yr = 1; yr <= t; yr++) {
        for (let month = 1; month <= 12; month++) {
          totalValue = (totalValue + currentMonthlyInvestment) * (1 + monthlyRate);
          investedAmount += currentMonthlyInvestment;
        }
        chartData.push({
          name: `Yr ${yr}`,
          "Invested Amount": Math.round(investedAmount),
          "Total Wealth": Math.round(totalValue),
        });
        currentMonthlyInvestment = currentMonthlyInvestment * (1 + stepUp);
      }

      const estReturns = totalValue - investedAmount;

      let normalTotalValue = 0;
      const normalInvested = p * t * 12;
      for (let m = 1; m <= t * 12; m++) {
        normalTotalValue = (normalTotalValue + p) * (1 + monthlyRate);
      }
      const normalEstReturns = normalTotalValue - normalInvested;

      const purchasingPower = totalValue / Math.pow(1 + 0.06, t);

      return {
        values: { investedAmount, estReturns, totalValue, purchasingPower },
        chartData,
        comparison: {
          title: "Step-Up SIP vs. Standard SIP Comparison",
          headers: ["Strategy", "Invested Amount", "Est. Returns", "Final Value (Maturity)"],
          rows: [
            ["Step-Up SIP (with annual increments)", formatIndianCurrency(investedAmount), formatIndianCurrency(estReturns), formatIndianCurrency(totalValue)],
            ["Normal SIP (flat contributions)", formatIndianCurrency(normalInvested), formatIndianCurrency(normalEstReturns), formatIndianCurrency(normalTotalValue)],
            ["Net Difference", formatIndianCurrency(investedAmount - normalInvested), formatIndianCurrency(estReturns - normalEstReturns), formatIndianCurrency(totalValue - normalTotalValue)],
          ],
        },
      };
    },
    educationalContent: [
      {
        title: "Benefits of Top-Up Mutual Fund SIPs",
        content: "Our Step-Up SIP Calculator projects compounding top-up contributions. A Step-Up SIP (or Top-Up SIP) is an investment practice where you automatically increase your monthly Systematic Investment Plan contribution by a fixed percentage or absolute amount every year. As your income rises, stepping up your SIP speeds wealth."
      }
    ],
    faqs: [
      { question: "Can I choose a fixed amount instead of a percentage for step-up?", answer: "Yes. Many mutual fund platforms let you increase your monthly contribution by either a flat amount (like ₹1,000 or ₹2,000) or a fixed percentage (like 5%, 10%, or 15%) annually." },
      { question: "How do I calculate a top-up SIP maturity value?", answer: "Enter your starting monthly SIP investment, expected annual step-up percentage, anticipated return rate, and tenure into the step-up calculator to see your accelerated compounding growth." }
    ]
  },
  {
    id: "coast-fire-calculator",
    name: "Coast FIRE Calculator",
    category: "Retirement",
    description: "Calculate how much you need saved today to 'coast' to financial independence.",
    seoTitle: "Coast FIRE Calculator – Plan Early Retirement Savings",
    seoDescription: "Calculate your Coast FIRE number. See how much retirement savings you need today so compounding covers your retirement corpus without additions.",
    inputs: [
      { id: "currentAge", label: "Current Age", type: "slider", min: 18, max: 60, step: 1, default: 30, unit: "Yr" },
      { id: "targetAge", label: "Target Retirement Age", type: "slider", min: 35, max: 75, step: 1, default: 60, unit: "Yr" },
      { id: "currentSavings", label: "Current Retirement Savings", type: "slider", min: 0, max: 50000000, step: 50000, default: 1000000, unit: "₹" },
      { id: "annualExpenses", label: "Future Annual Expenses (in today's values)", type: "slider", min: 50000, max: 5000000, step: 10000, default: 600000, unit: "₹" },
      { id: "expectedReturn", label: "Expected Return Rate (p.a.)", type: "slider", min: 1, max: 18, step: 0.5, default: 10, unit: "%" },
      { id: "inflationRate", label: "Expected Inflation Rate (p.a.)", type: "slider", min: 1, max: 12, step: 0.5, default: 6, unit: "%" },
    ],
    outputs: [
      { id: "targetFIRECorpus", label: "Target retirement Corpus", format: "currency" },
      { id: "coastFIRENumber", label: "Required Coast FIRE Number Today", format: "currency" },
      { id: "projectedSavings", label: "Projected Retirement Savings", format: "currency" },
    ],
    calculate: (inputs) => {
      const currentAge = inputs.currentAge;
      const targetAge = inputs.targetAge;
      const currentSavings = inputs.currentSavings;
      const annualExpenses = inputs.annualExpenses;
      const expectedReturn = inputs.expectedReturn;
      const inflationRate = inputs.inflationRate;

      const yearsToRetire = Math.max(0, targetAge - currentAge);

      const inflationAdjustedExpenses = annualExpenses * Math.pow(1 + inflationRate / 100, yearsToRetire);
      const targetFIRECorpus = inflationAdjustedExpenses * 25;
      const coastFIRENumber = targetFIRECorpus / Math.pow(1 + expectedReturn / 100, yearsToRetire);
      const projectedSavings = currentSavings * Math.pow(1 + expectedReturn / 100, yearsToRetire);

      const chartData = [];
      for (let yr = 0; yr <= yearsToRetire; yr++) {
        const age = currentAge + yr;
        const compoundedSavings = currentSavings * Math.pow(1 + expectedReturn / 100, yr);
        const remainingYears = targetAge - age;
        const neededAtAge = targetFIRECorpus / Math.pow(1 + expectedReturn / 100, remainingYears);
        chartData.push({
          name: `Age ${age}`,
          "Your Savings": Math.round(compoundedSavings),
          "Required Coast Balance": Math.round(neededAtAge),
        });
      }

      const surplus = currentSavings - coastFIRENumber;
      const status = currentSavings >= coastFIRENumber ? "Coast FIRE Achieved!" : "Contributions Needed";

      return {
        values: { targetFIRECorpus, coastFIRENumber, projectedSavings },
        chartData,
        comparison: {
          title: "Coast FIRE Planning Status",
          headers: ["Metric", "Amount", "Details"],
          rows: [
            ["Target Retirement Corpus (at Age " + targetAge + ")", formatIndianCurrency(targetFIRECorpus), "Based on inflation-adjusted expenses"],
            ["Required Coast FIRE Savings Today", formatIndianCurrency(coastFIRENumber), "Amount needed today to grow to target corpus on its own"],
            ["Your Actual Retirement Savings Today", formatIndianCurrency(currentSavings), "Your current investment base"],
            ["Surplus / Shortfall Today", formatIndianCurrency(Math.abs(surplus)), surplus >= 0 ? "Surplus (Coast FIRE reached!)" : "Shortfall (Keep investing)"],
            ["Current Coast Status", status, surplus >= 0 ? "You can 'coast' to retirement" : "Need to continue active retirement additions"],
          ],
        },
      };
    },
    educationalContent: [
      {
        title: "Understanding Coast FIRE and Early Retirement Savings",
        content: "Our Coast FIRE Calculator estimates your target retirement milestones. Coast FIRE is a sub-category of the Financial Independence, Retire Early (FIRE) movement. It refers to a state where you have already saved enough retirement assets today that, even if you never contribute another rupee, the portfolio compounds."
      }
    ],
    faqs: [
      { question: "Does Coast FIRE mean I can stop working entirely today?", answer: "No. Reaching Coast FIRE means you don't need to save *more* for retirement, but you still need to earn enough money to cover your day-to-day living expenses until you reach retirement age." },
      { question: "How do I calculate my Coast FIRE target?", answer: "Enter your current age, target retirement age, current savings, annual expenses, expected returns, and inflation rate into our calculator to check if you have saved enough to coast." }
    ]
  },
  {
    id: "compound-interest-calculator",
    name: "Compound Interest Calculator",
    category: "Investing",
    description: "Calculate how compound interest builds your wealth over time. Compare different compounding frequencies (monthly, quarterly, half-yearly, yearly).",
    seoTitle: "Compound Interest Calculator – Estimate Compounding Growth",
    seoDescription: "Calculate the compounding return on your investments. Estimate future wealth with monthly or quarterly compounding and additional contributions online.",
    inputs: [
      { id: "principal", label: "Initial Principal Amount", type: "slider", min: 1000, max: 10000000, step: 5000, default: 100000, unit: "₹" },
      { id: "monthlyContribution", label: "Additional Monthly Contribution", type: "slider", min: 0, max: 500000, step: 500, default: 5000, unit: "₹" },
      { id: "interestRate", label: "Expected Interest Rate (p.a. %)", type: "slider", min: 1, max: 30, step: 0.5, default: 10, unit: "%" },
      { id: "timePeriod", label: "Time Period (Years)", type: "slider", min: 1, max: 40, step: 1, default: 10, unit: "Yr" },
      { id: "frequency", label: "Compounding Frequency", type: "select", default: 12, options: [
        { label: "Monthly", value: 12 },
        { label: "Quarterly", value: 4 },
        { label: "Half-Yearly", value: 2 },
        { label: "Yearly", value: 1 }
      ]}
    ],
    outputs: [
      { id: "investedAmount", label: "Total Invested Amount", format: "currency" },
      { id: "interestEarned", label: "Interest Earned", format: "currency" },
      { id: "totalValue", label: "Total Accumulated Value", format: "currency" },
    ],
    calculate: (inputs) => {
      const p = inputs.principal;
      const pm = inputs.monthlyContribution;
      const r = inputs.interestRate / 100;
      const t = inputs.timePeriod;
      const freq = inputs.frequency;

      let balance = p;
      let totalInvested = p;
      const chartData = [];

      for (let yr = 1; yr <= t; yr++) {
        const n = freq;
        const pFuture = balance * Math.pow(1 + r/n, n);
        
        let pmtFuture = 0;
        if (pm > 0) {
          if (n === 12) {
            pmtFuture = pm * ((Math.pow(1 + r/12, 12) - 1) / (r/12)) * (1 + r/12);
          } else {
            const effectiveMonthlyRate = Math.pow(1 + r/n, n/12) - 1;
            pmtFuture = pm * ((Math.pow(1 + effectiveMonthlyRate, 12) - 1) / effectiveMonthlyRate) * (1 + effectiveMonthlyRate);
          }
        }

        balance = pFuture + pmtFuture;
        totalInvested += pm * 12;

        chartData.push({
          name: `Yr ${yr}`,
          "Invested Capital": totalInvested,
          "Accumulated Value": Math.round(balance),
        });
      }

      const interestEarned = Math.max(0, balance - totalInvested);

      return {
        values: { investedAmount: totalInvested, interestEarned, totalValue: balance },
        chartData,
      };
    },
    educationalContent: [
      {
        title: "The Mathematical Power of Compound Interest",
        content: "Our Compound Interest Calculator models the acceleration of your wealth over time. Unlike simple interest, which only calculates returns on your initial principal, compound interest calculates interest on your principal plus all accumulated interest. Albert Einstein famously called compound interest the 'eighth wonder of the world' because of its exponential growth properties."
      },
      {
        title: "How Compounding Frequencies Affect Returns",
        content: "The compounding frequency is the number of times interest is calculated and added to the principal balance per year. Standard frequencies are yearly, half-yearly, quarterly, and monthly. The more frequently interest compounds, the more interest you earn because your gains begin generating their own returns sooner. While the nominal interest rate remains the same, the Annual Percentage Yield (APY) increases with higher compounding frequencies."
      }
    ],
    faqs: [
      { question: "What is the difference between simple and compound interest?", answer: "Simple interest is calculated only on the principal amount of a loan or deposit. Compound interest is calculated on the principal plus any accumulated interest from previous periods." },
      { question: "How does the Rule of 72 work?", answer: "The Rule of 72 is a quick mental formula to estimate when an investment will double. Divide 72 by your expected annual interest rate. For example, an investment earning 8% p.a. will double in approximately 9 years (72 / 8 = 9)." },
      { question: "How do I use a compound interest calculator with monthly payments?", answer: "Input your starting principal, additional monthly payments, expected annual interest rate, duration in years, and compounding frequency to calculate the future value of your portfolio." }
    ]
  },
  {
    id: "investment-growth-calculator",
    name: "Investment Growth Calculator",
    category: "Investing",
    description: "Forecast the growth of your investments, portfolios, or mutual funds under various annual return scenarios.",
    seoTitle: "Investment Growth Calculator – Predict Portfolio Value",
    seoDescription: "Calculate the long-term future value of your portfolio. Enter initial investments, monthly contributions, and expected yields to estimate investment growth.",
    inputs: [
      { id: "initialInvestment", label: "Initial Investment", type: "slider", min: 1000, max: 10000000, step: 5000, default: 100000, unit: "₹" },
      { id: "monthlyContribution", label: "Monthly Contribution", type: "slider", min: 0, max: 500000, step: 500, default: 5000, unit: "₹" },
      { id: "expectedReturn", label: "Expected Annual Return Rate (%)", type: "slider", min: 1, max: 30, step: 0.5, default: 12, unit: "%" },
      { id: "timePeriod", label: "Investment Duration (Years)", type: "slider", min: 1, max: 40, step: 1, default: 15, unit: "Yr" },
    ],
    outputs: [
      { id: "investedAmount", label: "Total Capital Invested", format: "currency" },
      { id: "estimatedReturns", label: "Estimated Return Value", format: "currency" },
      { id: "maturityValue", label: "Future Portfolio Value", format: "currency" },
    ],
    calculate: (inputs) => {
      const init = inputs.initialInvestment;
      const monthly = inputs.monthlyContribution;
      const r = inputs.expectedReturn / 100;
      const t = inputs.timePeriod;

      const monthlyRate = r / 12;
      const months = t * 12;

      let balance = init;
      let investedAmount = init;
      const chartData = [];

      for (let m = 1; m <= months; m++) {
        balance = (balance + monthly) * (1 + monthlyRate);
        investedAmount += monthly;

        if (m % 12 === 0) {
          chartData.push({
            name: `Yr ${m / 12}`,
            "Invested Capital": investedAmount,
            "Portfolio Value": Math.round(balance),
          });
        }
      }

      const estimatedReturns = Math.max(0, balance - investedAmount);

      return {
        values: { investedAmount, estimatedReturns, maturityValue: balance },
        chartData,
      };
    },
    educationalContent: [
      {
        title: "Forecasting Your Investment Portfolio Growth",
        content: "Our Investment Growth Calculator helps you visualize the wealth accumulation of your stocks, mutual funds, or real estate assets. Long-term investing relies on the steady appreciation of asset values and the reinvestment of dividends or interest. Even standard index funds tracking indices like the S&P 500 or Nifty 50 have historically averaged returns between 8% to 12% p.a. over long horizons, riding out typical market cycles."
      },
      {
        title: "The Impact of Starting Early on Investment Growth",
        content: "Time is the most critical element in portfolio growth. Starting to invest five years earlier can result in a significantly larger retirement corpus, even if you invest less total money. This is because the compounding curve follows a hockey-stick shape, accelerating dramatically in the later years of your timeline."
      }
    ],
    faqs: [
      { question: "What return rate should I expect on a diversified portfolio?", answer: "A diversified equity index portfolio historically yields around 8% to 12% p.a. long-term, while fixed-income portfolios yield around 4% to 7% p.a. Note that returns fluctuate and past performance is no guarantee of future results." },
      { question: "How do dividend reinvestments affect growth?", answer: "Reinvesting dividends back into the same stock or mutual fund compounds your returns significantly. Instead of cashing out, you buy more shares, accelerating the growth of your total holdings." },
      { question: "How do I calculate future portfolio returns?", answer: "Enter your starting capital, recurring contributions, expected annual yield, and holding period in years into our calculator to forecast your total portfolio value." }
    ]
  },
  {
    id: "financial-independence-calculator",
    name: "Financial Independence Calculator",
    category: "Retirement",
    description: "Determine when you can achieve Financial Independence (FI) and stop working based on your current savings and living expenses.",
    seoTitle: "Financial Independence Calculator – Track Your FI Target",
    seoDescription: "Calculate your Financial Independence number. Determine how many years are required to reach financial freedom based on SWR metrics.",
    inputs: [
      { id: "currentAge", label: "Current Age", type: "slider", min: 18, max: 70, step: 1, default: 30, unit: "Yr" },
      { id: "annualIncome", label: "Net Annual Income", type: "slider", min: 10000, max: 1000000, step: 5000, default: 80000, unit: "₹" },
      { id: "savingsRate", label: "Annual Savings Rate (%)", type: "slider", min: 5, max: 90, step: 5, default: 30, unit: "%" },
      { id: "currentSavings", label: "Current Portfolio / Savings", type: "slider", min: 0, max: 10000000, step: 10000, default: 50000, unit: "₹" },
      { id: "investmentReturn", label: "Expected Return Rate (p.a. %)", type: "slider", min: 1, max: 20, step: 0.5, default: 8, unit: "%" },
      { id: "postFireReturn", label: "Safe Withdrawal Rate (SWR %)", type: "slider", min: 2, max: 8, step: 0.1, default: 4, unit: "%" }
    ],
    outputs: [
      { id: "fireNumber", label: "Target Financial Independence Number", format: "currency" },
      { id: "yearsToFire", label: "Years to Reach Financial Independence", format: "number" },
      { id: "ageAtFire", label: "Age at Financial Independence", format: "number" },
    ],
    calculate: (inputs) => {
      const age = inputs.currentAge;
      const income = inputs.annualIncome;
      const sRate = inputs.savingsRate;
      const currentPortfolio = inputs.currentSavings;
      const r = inputs.investmentReturn;
      const swr = inputs.postFireReturn;

      const annualSavings = income * (sRate / 100);
      const annualExpenses = income - annualSavings;
      const fireNumber = annualExpenses / (swr / 100);

      let portfolio = currentPortfolio;
      let years = 0;
      const chartData = [];

      chartData.push({
        name: `Age ${age}`,
        "Portfolio Value": Math.round(portfolio),
        "FI Target": Math.round(fireNumber),
      });

      const maxSimYears = 60;
      for (let t = 1; t <= maxSimYears; t++) {
        if (portfolio < fireNumber) {
          portfolio = portfolio * (1 + r / 100) + annualSavings;
          years = t;
        } else {
          portfolio = portfolio * (1 + r / 100);
        }
        chartData.push({
          name: `Age ${age + t}`,
          "Portfolio Value": Math.round(portfolio),
          "FI Target": Math.round(fireNumber),
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
        title: "What is Financial Independence (FI)?",
        content: "Our Financial Independence Calculator estimates when your investments can cover your daily expenses. Financial Independence (FI) is achieved when your accumulated portfolio generates enough passive income to pay for your living expenses indefinitely. It means you no longer need to work for money and are free to choose how to spend your time."
      },
      {
        title: "The Math of SWR and Sentry FIRE targets",
        content: "Your target FI number is determined by your annual living expenses and your Safe Withdrawal Rate (SWR). SWR is the percentage of your portfolio you can withdraw each year without running out of money. The industry standard is the 4% rule (derived from the Trinity Study), which states that withdrawing 4% of a diversified portfolio annually will likely sustain it for 30+ years. The math translates to needing a portfolio that is 25 times your annual living expenses."
      }
    ],
    faqs: [
      { question: "What is the 25x Rule?", answer: "The 25x Rule states that you are financially independent when you accumulate 25 times your annual living expenses in assets. For example, if you spend $40,000 per year, your target FI number is $1,000,000 ($40,000 * 25)." },
      { question: "How does the savings rate affect the time to FI?", answer: "Your savings rate is the single most powerful factor. If you save 10% of your income, you must work 9 years to save for 1 year of expenses. If you save 50%, you save 1 year of expenses for every year worked, reducing the time to FI to under 17 years." },
      { question: "How do I calculate my safe withdrawal rate target?", answer: "Enter your current age, income, savings rate, accumulated savings, investment returns, and expected safe withdrawal rate to calculate the exact years needed to achieve financial independence." }
    ]
  }
];
