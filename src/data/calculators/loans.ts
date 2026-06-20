import { CalculatorConfig } from "./types";

export const loansCalculators: CalculatorConfig[] = [
  {
    id: "emi-calculator",
    name: "EMI Calculator",
    category: "Loans",
    description: "Calculate Equated Monthly Installment (EMI) and total interest for home, car, or personal loans.",
    seoTitle: "EMI Calculator – Calculate Loan EMI and Interest Online",
    seoDescription: "Use our free EMI calculator to calculate loan Equated Monthly Installments, view interest schedules, and plan home or personal loan prepayments.",
    inputs: [
      { id: "loanAmount", label: "Loan Amount", type: "slider", min: 10000, max: 20000000, step: 10000, default: 2000000, unit: "₹" },
      { id: "interestRate", label: "Interest Rate (p.a.)", type: "slider", min: 5, max: 25, step: 0.1, default: 8.5, unit: "%" },
      { id: "tenure", label: "Loan Tenure (in Years)", type: "slider", min: 1, max: 30, step: 1, default: 15, unit: "Yr" },
    ],
    outputs: [
      { id: "monthlyEMI", label: "Monthly EMI", format: "currency" },
      { id: "totalInterest", label: "Total Interest Payable", format: "currency" },
      { id: "totalPayment", label: "Total Payment (Principal + Interest)", format: "currency" },
    ],
    calculate: (inputs) => {
      const p = inputs.loanAmount;
      const r = inputs.interestRate;
      const t = inputs.tenure;

      const monthlyRate = r / (12 * 100);
      const totalMonths = t * 12;

      // EMI = P * r * (1+r)^n / ((1+r)^n - 1)
      const emi = p * monthlyRate * Math.pow(1 + monthlyRate, totalMonths) / (Math.pow(1 + monthlyRate, totalMonths) - 1);
      const totalPayment = emi * totalMonths;
      const totalInterest = totalPayment - p;

      const chartData = [
        { name: "Principal Amount", Value: p },
        { name: "Total Interest", Value: Math.round(totalInterest) },
      ];

      // Schedule (yearly amortization)
      const schedule = [];
      let balance = p;

      for (let yr = 1; yr <= t; yr++) {
        let yearlyInterest = 0;
        let yearlyPrincipal = 0;

        for (let m = 1; m <= 12; m++) {
          const interest = balance * monthlyRate;
          const principal = emi - interest;
          balance -= principal;
          yearlyInterest += interest;
          yearlyPrincipal += principal;
        }



        schedule.push({
          name: `Year ${yr}`,
          "Principal Paid": Math.round(yearlyPrincipal),
          "Interest Paid": Math.round(yearlyInterest),
          "Outstanding Balance": Math.max(0, Math.round(balance)),
        });
      }

      return {
        values: { monthlyEMI: emi, totalInterest, totalPayment },
        chartData,
        schedule,
      };
    },
    educationalContent: [
      {
        title: "How EMIs Are Calculated for Loans",
        content: "Our EMI Calculator simplifies loan tracking and budgeting. An Equated Monthly Installment (EMI) is a fixed payment amount made by a borrower to a lender at a specified date each calendar month. EMIs are applied to both interest and principal each month, so that over a specified number of years, the loan is fully paid off. In the early stages, the interest component forms the bulk of the payment; over time, the principal share increases."
      }
    ],
    faqs: [
      { question: "How does the interest rate affect my loan EMI?", answer: "A higher interest rate increases both your monthly EMI and the total interest payable. For example, a ₹20 Lakh loan at 8.5% for 15 years has an EMI of ~₹19,695, but at 10%, the EMI jumps to ~₹21,494." },
      { question: "How do I calculate loan EMI online?", answer: "Enter your loan principal amount, annual interest rate, and tenure into our free online EMI calculator to instantly view your monthly payment." }
    ]
  },
  {
    id: "loan-prepayment-calculator",
    name: "Loan Prepayment Calculator",
    category: "Loans",
    description: "Calculate how much interest you can save and how early you can close your loan by making prepayments.",
    seoTitle: "Loan Prepayment Calculator – Calculate Interest Savings",
    seoDescription: "Calculate interest savings and tenure reduction by prepaying your home loan or personal loan. Optimize interest costs with our prepayment calculator.",
    inputs: [
      { id: "loanAmount", label: "Current Outstanding Loan", type: "slider", min: 100000, max: 20000000, step: 50000, default: 3000000, unit: "₹" },
      { id: "interestRate", label: "Interest Rate (p.a.)", type: "slider", min: 5, max: 25, step: 0.1, default: 8.5, unit: "%" },
      { id: "tenure", label: "Remaining Tenure (in Years)", type: "slider", min: 1, max: 30, step: 1, default: 20, unit: "Yr" },
      { id: "prepayment", label: "One-Time Prepayment Amount", type: "slider", min: 10000, max: 5000000, step: 10000, default: 200000, unit: "₹" },
      { id: "prepaymentMonth", label: "Prepayment made at Month", type: "slider", min: 1, max: 120, step: 1, default: 12, unit: "Mo" },
    ],
    outputs: [
      { id: "originalInterest", label: "Original Total Interest", format: "currency" },
      { id: "newInterest", label: "New Interest with Prepayment", format: "currency" },
      { id: "interestSaved", label: "Total Interest Saved", format: "currency" },
      { id: "monthsSaved", label: "Months Shaved Off Tenure", format: "number" },
    ],
    calculate: (inputs) => {
      const p = inputs.loanAmount;
      const r = inputs.interestRate;
      const t = inputs.tenure;
      const prepayAmt = inputs.prepayment;
      const prepayMonth = inputs.prepaymentMonth;

      const monthlyRate = r / (12 * 100);
      const totalMonths = t * 12;

      // EMI calculation
      const emi = p * monthlyRate * Math.pow(1 + monthlyRate, totalMonths) / (Math.pow(1 + monthlyRate, totalMonths) - 1);
      const originalInterest = (emi * totalMonths) - p;

      // Scenario with Prepayment
      let balance = p;
      let newInterest = 0;
      let monthsToClose = 0;
      const chartData = [];

      for (let m = 1; m <= totalMonths; m++) {
        if (balance > 0) {
          const interest = balance * monthlyRate;
          const principal = emi - interest;

          // Apply prepayment at specific month
          if (m === prepayMonth) {
            balance -= prepayAmt;
          }

          balance -= principal;
          newInterest += interest;
          monthsToClose = m;

          if (balance < 0) {
            newInterest += balance * monthlyRate; // Adjust final month interest
            balance = 0;
          }
        }

        if (m % 12 === 0 || m === prepayMonth) {
          chartData.push({
            name: `Mo ${m}`,
            "Prepayment Outstanding": Math.max(0, Math.round(balance)),
            "Original Outstanding": Math.max(0, Math.round(p - (m * (emi - (p * monthlyRate))))), // Estimate standard path
          });
        }
      }

      const interestSaved = originalInterest - newInterest;
      const monthsSaved = totalMonths - monthsToClose;

      return {
        values: { originalInterest, newInterest, interestSaved, monthsSaved },
        chartData,
      };
    },
    educationalContent: [
      {
        title: "Benefits of Loan Prepayment Planning",
        content: "Use the Loan Prepayment Calculator to estimate your total savings. When you make a prepayment towards a loan, the entire prepaid amount goes directly to reducing your outstanding Principal Balance. Since interest is calculated as a percentage of the outstanding principal, a lower principal means less interest accumulates monthly. Consequently, your loan can be closed much earlier, saving thousands in finance charges."
      }
    ],
    faqs: [
      { question: "Are there penalties for home loan prepayment?", answer: "Under RBI rules in India, banks are not allowed to charge prepayment penalties on floating-rate home loans. For fixed-rate loans or personal loans, lenders may charge a 2-4% prepayment fee." },
      { question: "How do I calculate home loan prepayment savings?", answer: "Input your outstanding loan principal, interest rate, remaining tenure, and the prepayment amount into our prepayment calculator to see your savings." }
    ]
  },
  {
    id: "loan-comparison-calculator",
    name: "Loan Comparison Calculator",
    category: "Loans",
    description: "Compare two loan scenarios side-by-side to analyze differences in interest rate, principal amount, or tenure.",
    seoTitle: "Loan Comparison Calculator – Compare EMIs Side-by-Side",
    seoDescription: "Compare two loan offers side-by-side. Calculate how differences in principal, interest rates, or tenure affect your monthly EMI and total interest.",
    inputs: [
      { id: "loanAmountA", label: "Scenario A: Loan Amount", type: "slider", min: 100000, max: 20000000, step: 50000, default: 3000000, unit: "₹" },
      { id: "interestRateA", label: "Scenario A: Interest Rate (p.a.)", type: "slider", min: 5, max: 25, step: 0.1, default: 8.5, unit: "%" },
      { id: "tenureA", label: "Scenario A: Loan Tenure", type: "slider", min: 1, max: 30, step: 1, default: 20, unit: "Yr" },
      { id: "loanAmountB", label: "Scenario B: Loan Amount", type: "slider", min: 100000, max: 20000000, step: 50000, default: 3000000, unit: "₹" },
      { id: "interestRateB", label: "Scenario B: Interest Rate (p.a.)", type: "slider", min: 5, max: 25, step: 0.1, default: 9.5, unit: "%" },
      { id: "tenureB", label: "Scenario B: Loan Tenure", type: "slider", min: 1, max: 30, step: 1, default: 20, unit: "Yr" },
    ],
    outputs: [
      { id: "emiA", label: "Scenario A: Monthly EMI", format: "currency" },
      { id: "emiB", label: "Scenario B: Monthly EMI", format: "currency" },
      { id: "interestDifference", label: "Interest Difference", format: "currency" },
    ],
    calculate: (inputs) => {
      const pA = inputs.loanAmountA;
      const rA = inputs.interestRateA;
      const tA = inputs.tenureA;

      const pB = inputs.loanAmountB;
      const rB = inputs.interestRateB;
      const tB = inputs.tenureB;

      // Scenario A calculations
      const monthlyRateA = rA / (12 * 100);
      const totalMonthsA = tA * 12;
      const emiA = pA * monthlyRateA * Math.pow(1 + monthlyRateA, totalMonthsA) / (Math.pow(1 + monthlyRateA, totalMonthsA) - 1);
      const totalPaymentA = emiA * totalMonthsA;
      const totalInterestA = totalPaymentA - pA;

      // Scenario B calculations
      const monthlyRateB = rB / (12 * 100);
      const totalMonthsB = tB * 12;
      const emiB = pB * monthlyRateB * Math.pow(1 + monthlyRateB, totalMonthsB) / (Math.pow(1 + monthlyRateB, totalMonthsB) - 1);
      const totalPaymentB = emiB * totalMonthsB;
      const totalInterestB = totalPaymentB - pB;

      const emiDifference = Math.abs(emiB - emiA);
      const interestDifference = Math.abs(totalInterestB - totalInterestA);

      // Chart data
      const chartData = [
        { name: "Scenario A Total Interest", Value: Math.round(totalInterestA) },
        { name: "Scenario B Total Interest", Value: Math.round(totalInterestB) },
      ];

      // Format currency helper inside calculation
      const formatCurrency = (val: number) => {
        return new Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "INR",
          maximumFractionDigits: 0,
        }).format(val);
      };

      return {
        values: { emiA, emiB, interestDifference },
        chartData,
        comparison: {
          title: "Detailed Loan Offers Comparison",
          headers: ["Offer Metric", "Scenario A", "Scenario B", "Difference"],
          rows: [
            ["Principal Loan Amount", formatCurrency(pA), formatCurrency(pB), formatCurrency(Math.abs(pB - pA))],
            ["Annual Interest Rate", `${rA}%`, `${rB}%`, `${Math.abs(rB - rA).toFixed(1)}%`],
            ["Tenure (Years)", `${tA} Years`, `${tB} Years`, `${Math.abs(tB - tA)} Years`],
            ["Equated Monthly EMI", formatCurrency(emiA), formatCurrency(emiB), formatCurrency(emiDifference)],
            ["Total Interest Payable", formatCurrency(totalInterestA), formatCurrency(totalInterestB), formatCurrency(interestDifference)],
            ["Total Cumulative Cost", formatCurrency(totalPaymentA), formatCurrency(totalPaymentB), formatCurrency(Math.abs(totalPaymentB - totalPaymentA))],
          ],
        },
      };
    },
    educationalContent: [
      {
        title: "How to Compare Loan Offers Effectively",
        content: "Our Loan Comparison Calculator lets you compare two different loan offers. When banks compete for your home loan, even a tiny 0.1% or 0.25% variance in interest rates can save you thousands or lakhs in cumulative interest payments over a 20-year timeline. Comparing offers lets you negotiate effectively and evaluate the benefit of changing loan terms or prepaying."
      }
    ],
    faqs: [
      { question: "Is a lower EMI always better?", answer: "Not necessarily. A lower EMI achieved by extending the loan tenure (e.g. 15 to 20 years) results in a much higher total interest burden. Always compare both the EMI and the total interest payable." },
      { question: "How do I compare two loans side-by-side?", answer: "Enter the principal, interest rates, and tenures for both loan offers into the comparison calculator to instantly see differences in EMIs and total interest." }
    ]
  },
  {
    id: "personal-loan-emi-calculator",
    name: "Personal Loan EMI Calculator",
    category: "Loans",
    description: "Calculate your personal loan EMI, total interest, and repayment timeline.",
    seoTitle: "Personal Loan EMI Calculator – Calculate EMIs Instantly",
    seoDescription: "Calculate your personal loan EMI and total interest payable. Plan your monthly personal loan budget and view the full amortization split instantly.",
    inputs: [
      { id: "loanAmount", label: "Personal Loan Amount", type: "slider", min: 10000, max: 2500005, step: 5000, default: 500000, unit: "₹" },
      { id: "interestRate", label: "Interest Rate (p.a.)", type: "slider", min: 5, max: 30, step: 0.1, default: 12, unit: "%" },
      { id: "tenure", label: "Loan Tenure (in Years)", type: "slider", min: 1, max: 7, step: 1, default: 5, unit: "Yr" },
    ],
    outputs: [
      { id: "emi", label: "Monthly EMI", format: "currency" },
      { id: "interestPayable", label: "Total Interest Payable", format: "currency" },
      { id: "totalPayment", label: "Total Payment (Principal + Interest)", format: "currency" },
    ],
    calculate: (inputs) => {
      const p = inputs.loanAmount;
      const r = inputs.interestRate;
      const t = inputs.tenure;

      const monthlyRate = r / (12 * 100);
      const totalMonths = t * 12;
      const emi = p * monthlyRate * Math.pow(1 + monthlyRate, totalMonths) / (Math.pow(1 + monthlyRate, totalMonths) - 1);
      const totalPayment = emi * totalMonths;
      const interestPayable = totalPayment - p;

      const chartData = [
        { name: "Principal Amount", Value: Math.round(p) },
        { name: "Total Interest", Value: Math.round(interestPayable) },
      ];

      // Format currency helper
      const formatCurrency = (val: number) => {
        return new Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "INR",
          maximumFractionDigits: 0,
        }).format(val);
      };

      // Comparison for alternate tenures
      const comparisonRows = [];
      for (let yr = 2; yr <= 7; yr += 2) {
        if (yr === t) continue;
        const months = yr * 12;
        const altEmi = p * monthlyRate * Math.pow(1 + monthlyRate, months) / (Math.pow(1 + monthlyRate, months) - 1);
        const altTotal = altEmi * months;
        const altInterest = altTotal - p;
        comparisonRows.push([
          `${yr} Years`,
          formatCurrency(altEmi),
          formatCurrency(altInterest),
          formatCurrency(altTotal),
        ]);
      }

      // Add current chosen tenure for context
      comparisonRows.unshift([
        `${t} Years (Chosen)`,
        formatCurrency(emi),
        formatCurrency(interestPayable),
        formatCurrency(totalPayment),
      ]);

      // Sort rows by tenure
      comparisonRows.sort((a, b) => parseInt(a[0]) - parseInt(b[0]));

      return {
        values: { emi, interestPayable, totalPayment },
        chartData,
        comparison: {
          title: "EMI Comparison across Alternate Tenures",
          headers: ["Tenure", "Monthly EMI", "Interest Payable", "Total Cumulative Cost"],
          rows: comparisonRows,
        },
      };
    },
    educationalContent: [
      {
        title: "Benefits of Unsecured Personal Loans",
        content: "Use our Personal Loan EMI Calculator to determine your monthly repayments. A Personal Loan is an unsecured form of credit, which means you do not need to pledge any collateral (like property or gold) to secure the funding. Because of the higher risk for the lender, personal loan interest rates are typically higher (ranging from 10.5% to 24%+ depending on your credit score and salary) and tenures are shorter (generally 1 to 7 years)."
      },
      {
        title: "How Tenure Affects Your Monthly and Lifetime Outflows",
        content: "Choosing a longer loan tenure (e.g. 7 years instead of 3 years) lowers your Equated Monthly Installment (EMI), making it easier on your month-to-month budget. However, it also means interest compounds over a much longer period, significantly increasing the total lifetime cost of your loan. Using a personal loan calculator helps you find the sweet spot: the shortest tenure you can comfortably afford without straining your monthly savings."
      }
    ],
    faqs: [
      { question: "What factors determine my personal loan interest rate?", answer: "Lenders decide your interest rate based on your credit score (CIBIL score), monthly income, employment status, employer profile, and your existing debt-to-income ratio." },
      { question: "Can I prepay or close my personal loan early?", answer: "Yes, most banks allow prepayment or foreclosure after a lock-in period (usually 6 to 12 EMIs). However, unlike home loans, personal loans may attract foreclosure fees of 2% to 4% of the outstanding principal balance." },
      { question: "How does the personal loan EMI calculator work?", answer: "The personal loan EMI calculator uses your principal loan amount, interest rate, and tenure to calculate the exact monthly payment and total interest cost." }
    ]
  }
];
