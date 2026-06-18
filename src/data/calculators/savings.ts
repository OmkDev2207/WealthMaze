import { CalculatorConfig } from "./types";

export const savingsCalculators: CalculatorConfig[] = [
  {
    id: "fd-calculator",
    name: "FD Calculator",
    category: "Savings",
    description: "Calculate maturity value and interest earned on your Fixed Deposits (FD).",
    seoTitle: "FD Calculator - Calculate Fixed Deposit Interest | WealthMaze",
    seoDescription: "Calculate interest earned and maturity value of your Fixed Deposits (FD). Free compounding FD interest calculator by WealthMaze.",
    inputs: [
      { id: "principal", label: "Principal Amount", type: "slider", min: 1000, max: 10000000, step: 5000, default: 100000, unit: "₹" },
      { id: "interestRate", label: "Rate of Interest (p.a.)", type: "slider", min: 2, max: 15, step: 0.1, default: 7.1, unit: "%" },
      { id: "timePeriod", label: "Time Period", type: "slider", min: 1, max: 25, step: 1, default: 5, unit: "Yr" },
      { id: "frequency", label: "Compounding Frequency", type: "select", default: 4, options: [
        { label: "Monthly", value: 12 },
        { label: "Quarterly (Standard)", value: 4 },
        { label: "Half-Yearly", value: 2 },
        { label: "Yearly", value: 1 }
      ]}
    ],
    outputs: [
      { id: "investedAmount", label: "Invested Amount", format: "currency" },
      { id: "interestEarned", label: "Interest Earned", format: "currency" },
      { id: "maturityValue", label: "Maturity Value", format: "currency" },
    ],
    calculate: (inputs) => {
      const p = inputs.principal;
      const r = inputs.interestRate;
      const t = inputs.timePeriod;
      const n = inputs.frequency; // compounding cycles per year

      // A = P * (1 + r/(n*100))^(n*t)
      const maturityValue = p * Math.pow(1 + r / (n * 100), n * t);
      const interestEarned = maturityValue - p;

      const chartData = [];
      for (let yr = 1; yr <= t; yr++) {
        const val = p * Math.pow(1 + r / (n * 100), n * yr);
        chartData.push({
          name: `Yr ${yr}`,
          "Invested Amount": p,
          "Maturity Value": Math.round(val),
        });
      }

      return {
        values: { investedAmount: p, interestEarned, maturityValue },
        chartData,
      };
    },
    educationalContent: [
      {
        title: "How Fixed Deposits Work",
        content: "A Fixed Deposit (FD) is a financial instrument provided by banks and non-banking financial companies (NBFCs) where investors deposit a lumpsum amount for a fixed tenure at a specified interest rate. FDs offer higher interest than regular savings accounts and are considered very low-risk investments."
      }
    ],
    faqs: [
      { question: "Are FD interest returns taxable?", answer: "Yes, interest earned on FDs is fully taxable as per your income tax slab. If your interest income exceeds ₹40,000 (₹50,000 for senior citizens) in a financial year, the bank will deduct Tax Deducted at Source (TDS) at 10%." }
    ]
  },
  {
    id: "rd-calculator",
    name: "RD Calculator",
    category: "Savings",
    description: "Calculate maturity returns of a Recurring Deposit (RD) with quarterly compounding interest.",
    seoTitle: "RD Calculator - Recurring Deposit Maturity Calculator | WealthMaze",
    seoDescription: "Calculate returns on your Recurring Deposits. Account for quarterly compound interest on monthly savings with WealthMaze.",
    inputs: [
      { id: "monthlyDeposit", label: "Monthly Deposit Amount", type: "slider", min: 500, max: 1000000, step: 500, default: 5000, unit: "₹" },
      { id: "interestRate", label: "Rate of Interest (p.a.)", type: "slider", min: 2, max: 15, step: 0.1, default: 6.8, unit: "%" },
      { id: "timePeriod", label: "Tenure (in Years)", type: "slider", min: 1, max: 10, step: 1, default: 3, unit: "Yr" },
    ],
    outputs: [
      { id: "investedAmount", label: "Total Invested", format: "currency" },
      { id: "interestEarned", label: "Interest Earned", format: "currency" },
      { id: "maturityValue", label: "Maturity Value", format: "currency" },
    ],
    calculate: (inputs) => {
      const p = inputs.monthlyDeposit;
      const r = inputs.interestRate;
      const t = inputs.timePeriod;

      const totalMonths = t * 12;
      const investedAmount = p * totalMonths;

      // Quarterly compounding for RD:
      // Interest accumulates monthly, but compounds quarterly.
      // A precise way is to loop monthly:
      let balance = 0;
      let interestAccumulated = 0;
      const chartData = [];

      for (let m = 1; m <= totalMonths; m++) {
        balance += p;
        // Calculate monthly interest share:
        // However, standard bank RD formula:
        // M = P * [ (1 + i)^n - 1 ] / [ 1 - (1 + i)^(-1/3) ]
        // where i = r / 400 (quarterly rate), n = quarters
      }

      // Let's implement the standard Indian Bank formula:
      const i = r / 400; // quarterly interest rate
      const n = t * 4; // number of quarters
      // Formula for RD Maturity:
      const maturityValue = p * ((Math.pow(1 + i, n) - 1) / (1 - Math.pow(1 + i, -1/3)));
      const interestEarned = maturityValue - investedAmount;

      for (let yr = 1; yr <= t; yr++) {
        const q = yr * 4;
        const val = p * ((Math.pow(1 + i, q) - 1) / (1 - Math.pow(1 + i, -1/3)));
        chartData.push({
          name: `Yr ${yr}`,
          "Invested Capital": p * yr * 12,
          "RD Value": Math.round(val),
        });
      }

      return {
        values: { investedAmount, interestEarned, maturityValue },
        chartData,
      };
    },
    educationalContent: [
      {
        title: "Understanding Recurring Deposits",
        content: "A Recurring Deposit (RD) allows you to save a fixed sum of money every month and earn interest rates comparable to Fixed Deposits. It is perfect for individuals who want to build a savings buffer but do not have a large lumpsum amount to invest all at once. RDs compound interest on a quarterly basis."
      }
    ],
    faqs: [
      { question: "Can I withdraw my RD before maturity?", answer: "Yes, you can make premature withdrawals, but banks usually charge a penalty (typically 0.5% to 1% reduction in the applicable interest rate for the period the deposit remained with the bank)." }
    ]
  },
  {
    id: "ppf-calculator",
    name: "PPF Calculator",
    category: "Savings",
    description: "Calculate maturity returns of Public Provident Fund (PPF) investments with annual compounding.",
    seoTitle: "PPF Calculator - Public Provident Fund Calculator | WealthMaze",
    seoDescription: "Calculate PPF returns and interest. Plan your tax-saving 15-year PPF investments with WealthMaze's free PPF calculator.",
    inputs: [
      { id: "yearlyInvestment", label: "Yearly Contribution", type: "slider", min: 500, max: 150000, step: 500, default: 150000, unit: "₹" },
      { id: "interestRate", label: "Interest Rate (p.a.)", type: "slider", min: 5, max: 10, step: 0.05, default: 7.1, unit: "%" },
      { id: "timePeriod", label: "Tenure", type: "slider", min: 15, max: 30, step: 5, default: 15, unit: "Yr" },
    ],
    outputs: [
      { id: "investedAmount", label: "Total Invested", format: "currency" },
      { id: "interestEarned", label: "Interest Earned", format: "currency" },
      { id: "maturityValue", label: "Maturity Value", format: "currency" },
    ],
    calculate: (inputs) => {
      const p = inputs.yearlyInvestment;
      const r = inputs.interestRate;
      const t = inputs.timePeriod;

      const investedAmount = p * t;

      // PPF compounding formula (paid once a year):
      // F = P * [ ((1 + r)^t - 1) / r ] * (1 + r)
      // Note: PPF interest compounds annually at the end of the financial year.
      const rateDec = r / 100;
      const maturityValue = p * ((Math.pow(1 + rateDec, t) - 1) / rateDec) * (1 + rateDec);
      const interestEarned = maturityValue - investedAmount;

      const chartData = [];
      for (let yr = 1; yr <= t; yr++) {
        const val = p * ((Math.pow(1 + rateDec, yr) - 1) / rateDec) * (1 + rateDec);
        chartData.push({
          name: `Yr ${yr}`,
          "Invested Capital": p * yr,
          "PPF Wealth": Math.round(val),
        });
      }

      return {
        values: { investedAmount, interestEarned, maturityValue },
        chartData,
      };
    },
    educationalContent: [
      {
        title: "Public Provident Fund (PPF) Explained",
        content: "PPF is a government-backed, long-term savings scheme in India launched to mobilize small savings. It comes with a lock-in period of 15 years, offering guaranteed risk-free returns. It enjoys EEE (Exempt-Exempt-Exempt) tax status: contributions are deductible under Sec 80C, interest earned is tax-exempt, and maturity proceeds are completely tax-free."
      }
    ],
    faqs: [
      { question: "What is the maximum investment limit in PPF?", answer: "The minimum investment in PPF is ₹500, and the maximum is ₹1.5 Lakhs per financial year. Investing above ₹1.5 Lakhs will not earn any interest and is not eligible for tax deductions." }
    ]
  },
  {
    id: "epf-calculator",
    name: "EPF Calculator",
    category: "Savings",
    description: "Calculate your Employee Provident Fund (EPF) accumulation at retirement, including salary increments.",
    seoTitle: "EPF Calculator - Employee Provident Fund Growth Calculator | WealthMaze",
    seoDescription: "Calculate your EPF corpus at retirement. Account for monthly employee and employer contributions, interest, and yearly wage hikes with WealthMaze.",
    inputs: [
      { id: "basicSalary", label: "Monthly Basic Salary + DA", type: "number", default: 50000, unit: "₹" },
      { id: "increment", label: "Expected Annual Salary Increment", type: "slider", min: 0, max: 25, step: 0.5, default: 8, unit: "%" },
      { id: "interestRate", label: "EPF Interest Rate (p.a.)", type: "slider", min: 5, max: 10, step: 0.05, default: 8.15, unit: "%" },
      { id: "timePeriod", label: "Years Until Retirement", type: "slider", min: 1, max: 40, step: 1, default: 25, unit: "Yr" },
    ],
    outputs: [
      { id: "totalEmployeeContribution", label: "Employee Contribution", format: "currency" },
      { id: "totalEmployerContribution", label: "Employer Contribution", format: "currency" },
      { id: "totalCorpus", label: "Total Accumulated EPF", format: "currency" },
    ],
    calculate: (inputs) => {
      let salary = inputs.basicSalary;
      const inc = inputs.increment / 100;
      const rate = inputs.interestRate / 100;
      const t = inputs.timePeriod;

      let epfBalance = 0;
      let totalEmpCont = 0;
      let totalEmprCont = 0;
      const chartData = [];

      for (let yr = 1; yr <= t; yr++) {
        // Monthly contributions
        const empMonthly = salary * 0.12;
        const emprMonthly = salary * 0.0367; // 3.67% goes to EPF (8.33% goes to EPS)
        const totalMonthlyCont = empMonthly + emprMonthly;

        for (let m = 1; m <= 12; m++) {
          epfBalance += totalMonthlyCont;
          totalEmpCont += empMonthly;
          totalEmprCont += emprMonthly;
        }

        // Add annual interest on average monthly balance
        const annualInterest = epfBalance * rate;
        epfBalance += annualInterest;

        chartData.push({
          name: `Yr ${yr}`,
          "Accumulated EPF": Math.round(epfBalance),
          "Basic Salary (Monthly)": Math.round(salary),
        });

        // Increment salary for next year
        salary = salary * (1 + inc);
      }

      return {
        values: { totalEmployeeContribution: totalEmpCont, totalEmployerContribution: totalEmprCont, totalCorpus: epfBalance },
        chartData,
      };
    },
    educationalContent: [
      {
        title: "Employee Provident Fund (EPF) Rules",
        content: "EPF is a mandatory savings scheme for salaried employees in India. Both the employee and the employer contribute 12% of the employee's basic salary plus dearness allowance monthly. While the entire 12% of the employee contribution goes to the EPF, the employer's 12% contribution is split: 8.33% goes to the Employee Pension Scheme (EPS) and 3.67% goes to the EPF."
      }
    ],
    faqs: [
      { question: "Is EPF interest tax-free?", answer: "Yes, EPF interest is tax-free as long as the employee's contribution does not exceed ₹2.5 Lakhs per year. If it exceeds ₹2.5 Lakhs, interest earned on the excess contribution is taxable." }
    ]
  },
  {
    id: "nps-calculator",
    name: "NPS Calculator",
    category: "Retirement",
    description: "Calculate your pension corpus and monthly pension from the National Pension System (NPS).",
    seoTitle: "NPS Calculator - National Pension Scheme Calculator | WealthMaze",
    seoDescription: "Calculate your NPS maturity corpus and estimated monthly pension. Plan tax-saving retirement savings with WealthMaze.",
    inputs: [
      { id: "monthlyContribution", label: "Monthly NPS Contribution", type: "slider", min: 500, max: 200000, step: 500, default: 10000, unit: "₹" },
      { id: "expectedReturn", label: "Expected Return (p.a.)", type: "slider", min: 4, max: 18, step: 0.5, default: 10, unit: "%" },
      { id: "currentAge", label: "Current Age", type: "slider", min: 18, max: 60, step: 1, default: 30, unit: "Yr" },
      { id: "annuityPercent", label: "Corpus Reinvested in Annuity (%)", type: "slider", min: 40, max: 100, step: 5, default: 40, unit: "%" },
      { id: "annuityReturn", label: "Expected Annuity Return Rate (p.a.)", type: "slider", min: 3, max: 12, step: 0.5, default: 6, unit: "%" },
    ],
    outputs: [
      { id: "totalInvested", label: "Total Amount Invested", format: "currency" },
      { id: "totalCorpus", label: "Maturity NPS Corpus", format: "currency" },
      { id: "lumpsumWithdrawn", label: "Lumpsum Tax-Free Withdrawal (60%)", format: "currency" },
      { id: "monthlyPension", label: "Estimated Monthly Pension", format: "currency" },
    ],
    calculate: (inputs) => {
      const p = inputs.monthlyContribution;
      const r = inputs.expectedReturn;
      const age = inputs.currentAge;
      const annPct = inputs.annuityPercent / 100;
      const annRate = inputs.annuityReturn;

      const yearsToInvest = 60 - age;
      const n = yearsToInvest * 12;
      const i = r / (12 * 100);

      // Accumulation: Standard SIP growth
      const totalCorpus = p * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
      const totalInvested = p * n;

      const annuityCorpus = totalCorpus * annPct;
      const lumpsumWithdrawn = totalCorpus - annuityCorpus;

      // Monthly pension = Annuity Corpus * annual rate / 12 / 100
      const monthlyPension = annuityCorpus * (annRate / 100) / 12;

      const chartData = [];
      for (let yr = 1; yr <= yearsToInvest; yr++) {
        const val = p * ((Math.pow(1 + i, yr * 12) - 1) / i) * (1 + i);
        chartData.push({
          name: `Age ${age + yr}`,
          "Corpus Value": Math.round(val),
          "Invested Capital": p * yr * 12,
        });
      }

      return {
        values: { totalInvested, totalCorpus, lumpsumWithdrawn, monthlyPension },
        chartData,
      };
    },
    educationalContent: [
      {
        title: "National Pension System (NPS) Overview",
        content: "NPS is a voluntary retirement savings scheme designed to facilitate a systematic savings habit. Regulated by PFRDA, it allows investments in equity, corporate debt, and government securities. At age 60, you can withdraw up to 60% of the corpus as tax-free lumpsum, while the remaining 40% must be used to purchase an annuity to receive a monthly pension."
      }
    ],
    faqs: [
      { question: "What are the tax benefits of NPS?", answer: "NPS offers exclusive tax deductions up to ₹50,000 under Section 80CCD(1B), over and above the ₹1.5 Lakhs limit of Section 80C, making it highly attractive for tax saving." }
    ]
  }
];
