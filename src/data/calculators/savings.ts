import { CalculatorConfig } from "./types";

export const savingsCalculators: CalculatorConfig[] = [
  {
    id: "fd-calculator",
    name: "FD Calculator",
    category: "Savings",
    description: "Calculate maturity value and interest earned on your Fixed Deposits (FD).",
    seoTitle: "FD Calculator – Calculate Fixed Deposit Interest",
    seoDescription: "Use our free FD calculator to calculate interest earned and maturity value of your Fixed Deposits. View compounding splits easily.",
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
      { id: "investedPurchasingPower", label: "Total Investment in Today's Value (6% Inflation)", format: "currency" },
      { id: "purchasingPower", label: "Est. Corpus in Today's Value (6% Inflation)", format: "currency" },
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

      const investedPurchasingPower = p / Math.pow(1 + 0.06, t);
      const purchasingPower = maturityValue / Math.pow(1 + 0.06, t);

      return {
        values: { investedAmount: p, interestEarned, maturityValue, investedPurchasingPower, purchasingPower },
        chartData,
      };
    },
    educationalContent: [
      {
        title: "Benefits of Fixed Deposit Investments",
        content: "Our FD Calculator helps you estimate Fixed Deposit returns. A Fixed Deposit (FD) is a financial instrument provided by banks and non-banking financial companies (NBFCs) where investors deposit a lumpsum amount for a fixed tenure at a specified interest rate. FDs offer higher interest than regular savings accounts and are considered very low-risk investments."
      }
    ],
    faqs: [
      { question: "Are FD interest returns taxable?", answer: "Yes, interest earned on FDs is fully taxable as per your income tax slab. If your interest income exceeds ₹40,000 (₹50,000 for senior citizens) in a financial year, the bank will deduct Tax Deducted at Source (TDS) at 10%." },
      { question: "How do I calculate Fixed Deposit interest online?", answer: "Input your deposit principal, interest rate, tenure, and compounding frequency into the FD calculator to instantly view your maturity value." }
    ]
  },
  {
    id: "rd-calculator",
    name: "RD Calculator",
    category: "Savings",
    description: "Calculate maturity returns of a Recurring Deposit (RD) with quarterly compounding interest.",
    seoTitle: "RD Calculator – Calculate Recurring Deposit ROI",
    seoDescription: "Calculate compounding returns on Recurring Deposits. Account for quarterly compound interest on monthly savings with our free RD calculator.",
    inputs: [
      { id: "monthlyDeposit", label: "Monthly Deposit Amount", type: "slider", min: 500, max: 1000000, step: 500, default: 5000, unit: "₹" },
      { id: "interestRate", label: "Rate of Interest (p.a.)", type: "slider", min: 2, max: 15, step: 0.1, default: 6.8, unit: "%" },
      { id: "timePeriod", label: "Tenure (in Years)", type: "slider", min: 1, max: 10, step: 1, default: 3, unit: "Yr" },
    ],
    outputs: [
      { id: "investedAmount", label: "Total Invested", format: "currency" },
      { id: "interestEarned", label: "Interest Earned", format: "currency" },
      { id: "maturityValue", label: "Maturity Value", format: "currency" },
      { id: "investedPurchasingPower", label: "Total Investment in Today's Value (6% Inflation)", format: "currency" },
      { id: "purchasingPower", label: "Est. Corpus in Today's Value (6% Inflation)", format: "currency" },
    ],
    calculate: (inputs) => {
      const p = inputs.monthlyDeposit;
      const r = inputs.interestRate;
      const t = inputs.timePeriod;

      const totalMonths = t * 12;
      const investedAmount = p * totalMonths;

      const i = r / 400; // quarterly interest rate
      const n = t * 4; // number of quarters
      const maturityValue = p * ((Math.pow(1 + i, n) - 1) / (1 - Math.pow(1 + i, -1/3)));
      const interestEarned = maturityValue - investedAmount;

      const chartData = [];
      for (let yr = 1; yr <= t; yr++) {
        const q = yr * 4;
        const val = p * ((Math.pow(1 + i, q) - 1) / (1 - Math.pow(1 + i, -1/3)));
        chartData.push({
          name: `Yr ${yr}`,
          "Invested Capital": p * yr * 12,
          "RD Value": Math.round(val),
        });
      }

      const investedPurchasingPower = investedAmount / Math.pow(1 + 0.06, t);
      const purchasingPower = maturityValue / Math.pow(1 + 0.06, t);

      return {
        values: { investedAmount, interestEarned, maturityValue, investedPurchasingPower, purchasingPower },
        chartData,
      };
    },
    educationalContent: [
      {
        title: "Benefits of Recurring Deposit Plans",
        content: "Use our RD Calculator to plan monthly savings. A Recurring Deposit (RD) allows you to save a fixed sum of money every month and earn interest rates comparable to Fixed Deposits. It is perfect for individuals who want to build a savings buffer but do not have a large lumpsum amount to invest all at once. RDs compound interest on a quarterly basis."
      }
    ],
    faqs: [
      { question: "Can I withdraw my RD before maturity?", answer: "Yes, you can make premature withdrawals, but banks usually charge a penalty (typically 0.5% to 1% reduction in the applicable interest rate for the period the deposit remained with the bank)." },
      { question: "How does a recurring deposit calculator calculate returns?", answer: "It uses the quarterly compounding formula for recurring deposits, accumulating interest monthly based on your regular contributions and interest rate." }
    ]
  },
  {
    id: "ppf-calculator",
    name: "PPF Calculator",
    isIndiaSpecific: true,
    category: "Savings",
    description: "Calculate maturity returns of Public Provident Fund (PPF) investments with annual compounding.",
    seoTitle: "PPF Calculator – Calculate Public Provident Fund ROI",
    seoDescription: "Calculate PPF compounding returns and interest. Plan your tax-saving 15-year PPF investments with our free Public Provident Fund calculator.",
    inputs: [
      { id: "yearlyInvestment", label: "Yearly Contribution", type: "slider", min: 500, max: 150000, step: 500, default: 150000, unit: "₹" },
      { id: "interestRate", label: "Interest Rate (p.a.)", type: "slider", min: 5, max: 10, step: 0.05, default: 7.1, unit: "%" },
      { id: "timePeriod", label: "Tenure", type: "slider", min: 15, max: 30, step: 5, default: 15, unit: "Yr" },
    ],
    outputs: [
      { id: "investedAmount", label: "Total Invested", format: "currency" },
      { id: "interestEarned", label: "Interest Earned", format: "currency" },
      { id: "maturityValue", label: "Maturity Value", format: "currency" },
      { id: "investedPurchasingPower", label: "Total Investment in Today's Value (6% Inflation)", format: "currency" },
      { id: "purchasingPower", label: "Est. Corpus in Today's Value (6% Inflation)", format: "currency" },
    ],
    calculate: (inputs) => {
      const p = inputs.yearlyInvestment;
      const r = inputs.interestRate;
      const t = inputs.timePeriod;

      const investedAmount = p * t;

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

      const investedPurchasingPower = investedAmount / Math.pow(1 + 0.06, t);
      const purchasingPower = maturityValue / Math.pow(1 + 0.06, t);

      return {
        values: { investedAmount, interestEarned, maturityValue, investedPurchasingPower, purchasingPower },
        chartData,
      };
    },
    educationalContent: [
      {
        title: "Benefits of Public Provident Fund Investments",
        content: "Our PPF Calculator helps you project your tax-saving wealth. PPF is a government-backed, long-term savings scheme in India launched to mobilize small savings. It comes with a lock-in period of 15 years, offering guaranteed risk-free returns. It enjoys EEE (Exempt-Exempt-Exempt) tax status: contributions are deductible under Sec 80C, interest earned is tax-exempt, and maturity proceeds are completely tax-free."
      }
    ],
    faqs: [
      { question: "What is the maximum investment limit in PPF?", answer: "The minimum investment in PPF is ₹500, and the maximum is ₹1.5 Lakhs per financial year. Investing above ₹1.5 Lakhs will not earn any interest and is not eligible for tax deductions." },
      { question: "How do I calculate PPF returns online?", answer: "Enter your yearly contribution amount and expected interest rate into the PPF calculator to estimate your maturity value and total interest earned." }
    ]
  },
  {
    id: "epf-calculator",
    name: "EPF Calculator",
    isIndiaSpecific: true,
    category: "Savings",
    description: "Calculate your Employee Provident Fund (EPF) accumulation at retirement, including salary increments.",
    seoTitle: "EPF Calculator – Calculate Employee Provident Fund",
    seoDescription: "Calculate your EPF corpus at retirement. Account for monthly employee and employer contributions, interest, and yearly salary hikes online.",
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
      { id: "investedPurchasingPower", label: "Total Investment in Today's Value (6% Inflation)", format: "currency" },
      { id: "purchasingPower", label: "Est. Corpus in Today's Value (6% Inflation)", format: "currency" },
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
        const empMonthly = salary * 0.12;
        const emprMonthly = salary * 0.0367; // 3.67% goes to EPF (8.33% goes to EPS)
        const totalMonthlyCont = empMonthly + emprMonthly;

        for (let m = 1; m <= 12; m++) {
          epfBalance += totalMonthlyCont;
          totalEmpCont += empMonthly;
          totalEmprCont += emprMonthly;
        }

        const annualInterest = epfBalance * rate;
        epfBalance += annualInterest;

        chartData.push({
          name: `Yr ${yr}`,
          "Accumulated EPF": Math.round(epfBalance),
          "Basic Salary (Monthly)": Math.round(salary),
        });

        salary = salary * (1 + inc);
      }

      const investedAmount = totalEmpCont + totalEmprCont;
      const investedPurchasingPower = investedAmount / Math.pow(1 + 0.06, t);
      const purchasingPower = epfBalance / Math.pow(1 + 0.06, t);

      return {
        values: { totalEmployeeContribution: totalEmpCont, totalEmployerContribution: totalEmprCont, totalCorpus: epfBalance, investedPurchasingPower, purchasingPower },
        chartData,
      };
    },
    educationalContent: [
      {
        title: "Benefits of Employee Provident Fund Savings",
        content: "Our EPF Calculator projects your retirement corpus. EPF is a mandatory savings scheme for salaried employees in India. Both the employee and the employer contribute 12% of the employee's basic salary plus dearness allowance monthly. While the entire 12% of the employee contribution goes to the EPF, the employer's 12% contribution is split: 8.33% goes to the Employee Pension Scheme (EPS) and 3.67% goes to the EPF."
      }
    ],
    faqs: [
      { question: "Is EPF interest tax-free?", answer: "Yes, EPF interest is tax-free as long as the employee's contribution does not exceed ₹2.5 Lakhs per year. If it exceeds ₹2.5 Lakhs, interest earned on the excess contribution is taxable." },
      { question: "How do I calculate EPF maturity corpus?", answer: "Enter your current basic salary, expected annual salary increment, interest rate, and years to retirement into our EPF calculator to estimate your final retirement corpus." }
    ]
  },
  {
    id: "nps-calculator",
    name: "NPS Calculator",
    isIndiaSpecific: true,
    category: "Retirement",
    description: "Calculate your pension corpus and monthly pension from the National Pension System (NPS).",
    seoTitle: "NPS Calculator – Calculate National Pension System",
    seoDescription: "Calculate your NPS maturity corpus and estimated monthly pension. Plan tax-saving retirement savings with our free National Pension System calculator.",
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
      { id: "investedPurchasingPower", label: "Total Investment in Today's Value (6% Inflation)", format: "currency" },
      { id: "purchasingPower", label: "Est. Corpus in Today's Value (6% Inflation)", format: "currency" },
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

      const investedPurchasingPower = totalInvested / Math.pow(1 + 0.06, yearsToInvest);
      const purchasingPower = totalCorpus / Math.pow(1 + 0.06, yearsToInvest);

      return {
        values: { totalInvested, totalCorpus, lumpsumWithdrawn, monthlyPension, investedPurchasingPower, purchasingPower },
        chartData,
      };
    },
    educationalContent: [
      {
        title: "Benefits of National Pension System (NPS) Investments",
        content: "Our NPS Calculator plans your retirement pension. NPS is a voluntary retirement savings scheme designed to facilitate a systematic savings habit. Regulated by PFRDA, it allows investments in equity, corporate debt, and government securities. At age 60, you can withdraw up to 60% of the corpus as tax-free lumpsum, while the remaining 40% must be used to purchase an annuity to receive a monthly pension."
      }
    ],
    faqs: [
      { question: "What are the tax benefits of NPS?", answer: "NPS offers exclusive tax deductions up to ₹50,000 under Section 80CCD(1B), over and above the ₹1.5 Lakhs limit of Section 80C, making it highly attractive for tax saving." },
    ]
  },
  {
    id: "savings-calculator",
    name: "Savings Calculator",
    category: "Savings",
    description: "Calculate how your monthly savings and initial deposit grow over time with compound interest.",
    seoTitle: "Savings Calculator – Track and Plan Your Savings Goals",
    seoDescription: "Calculate the future value of your savings. Estimate interest earned and final balance on monthly savings accounts and High Yield Savings Accounts (HYSA).",
    inputs: [
      { id: "initialSavings", label: "Initial Deposit / Starting Balance", type: "slider", min: 0, max: 10000000, step: 5000, default: 50000, unit: "₹" },
      { id: "monthlySavings", label: "Monthly Savings Contribution", type: "slider", min: 0, max: 500000, step: 1000, default: 5000, unit: "₹" },
      { id: "interestRate", label: "Annual Interest Rate (APY %)", type: "slider", min: 0.5, max: 15, step: 0.1, default: 4.5, unit: "%" },
      { id: "timePeriod", label: "Savings Duration", type: "slider", min: 1, max: 30, step: 1, default: 5, unit: "Yr" },
    ],
    outputs: [
      { id: "totalDeposits", label: "Total Deposits", format: "currency" },
      { id: "interestEarned", label: "Interest Earned", format: "currency" },
      { id: "maturityValue", label: "Total Savings Corpus", format: "currency" },
      { id: "investedPurchasingPower", label: "Total Investment in Today's Value (4% Inflation)", format: "currency" },
      { id: "purchasingPower", label: "Est. Corpus in Today's Value (4% Inflation)", format: "currency" },
    ],
    calculate: (inputs) => {
      const p = inputs.initialSavings;
      const pm = inputs.monthlySavings;
      const r = inputs.interestRate;
      const t = inputs.timePeriod;

      const monthlyRate = r / (12 * 100);
      const totalMonths = t * 12;

      let balance = p;
      let totalDeposits = p;
      const chartData = [];

      for (let m = 1; m <= totalMonths; m++) {
        balance = (balance + pm) * (1 + monthlyRate);
        totalDeposits += pm;

        if (m % 12 === 0) {
          chartData.push({
            name: `Yr ${m / 12}`,
            "Total Deposits": totalDeposits,
            "Interest Earned": Math.round(Math.max(0, balance - totalDeposits)),
            "Savings Value": Math.round(balance),
          });
        }
      }

      const interestEarned = Math.max(0, balance - totalDeposits);
      const investedPurchasingPower = totalDeposits / Math.pow(1 + 0.04, t);
      const purchasingPower = balance / Math.pow(1 + 0.04, t);

      return {
        values: { totalDeposits, interestEarned, maturityValue: balance, investedPurchasingPower, purchasingPower },
        chartData,
      };
    },
    educationalContent: [
      {
        title: "The Importance of Consistent Savings Plan",
        content: "Our Savings Calculator estimates the compounding growth of your periodic contributions. Setting aside a fixed sum monthly builds strong financial discipline and leverages the power of compound interest. High Yield Savings Accounts (HYSA) or Certificate of Deposits (CDs) globally offer higher interest rates than traditional savings accounts, helping your money grow faster while remaining extremely low-risk."
      },
      {
        title: "How Compounding Frequency Affects Savings",
        content: "Most savings accounts compound interest monthly or daily, while standard fixed deposits might compound quarterly. The more frequently interest is compounded, the faster your savings grow, as you earn interest on interest sooner. Over long horizons, even a small difference in the annual yield (APY) can lead to a significantly larger final retirement or emergency fund."
      }
    ],
    faqs: [
      { question: "What is an APY (Annual Percentage Yield)?", answer: "APY is the real rate of return earned on a savings deposit, taking into account the effect of compounding interest over a year. It is slightly higher than the nominal interest rate when interest is compounded more than once a year." },
      { question: "How does inflation affect my savings?", answer: "Inflation erodes the purchasing power of your cash over time. If your savings account interest rate is lower than the inflation rate, the real value (purchasing power) of your money decreases. It is important to compare returns adjusted for inflation." },
      { question: "How do I calculate savings compounding online?", answer: "Input your starting deposit, monthly savings budget, annual interest rate (APY), and duration in years into our savings calculator to instantly view your accumulated savings." }
    ]
  }
];
