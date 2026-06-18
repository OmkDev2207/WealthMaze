import { CalculatorConfig } from "./types";

export const loansCalculators: CalculatorConfig[] = [
  {
    id: "emi-calculator",
    name: "EMI Calculator",
    category: "Loans",
    description: "Calculate Equated Monthly Installment (EMI) and total interest for home, car, or personal loans.",
    seoTitle: "EMI Calculator - Calculate Loan EMIs & Interest | WealthMaze",
    seoDescription: "Calculate your loan Equated Monthly Installments (EMI). View loan amortization schedule, principal, and interest splits with WealthMaze.",
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
      let cumulativeInterest = 0;
      let cumulativePrincipal = 0;

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

        cumulativeInterest += yearlyInterest;
        cumulativePrincipal += yearlyPrincipal;

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
        title: "What is an Equated Monthly Installment (EMI)?",
        content: "An Equated Monthly Installment (EMI) is a fixed payment amount made by a borrower to a lender at a specified date each calendar month. EMIs are applied to both interest and principal each month, so that over a specified number of years, the loan is fully paid off. In the early stages, the interest component forms the bulk of the payment; over time, the principal share increases."
      }
    ],
    faqs: [
      { question: "How does the interest rate affect my loan EMI?", answer: "A higher interest rate increases both your monthly EMI and the total interest payable. For example, a ₹20 Lakh loan at 8.5% for 15 years has an EMI of ~₹19,695, but at 10%, the EMI jumps to ~₹21,494." }
    ]
  },
  {
    id: "loan-prepayment-calculator",
    name: "Loan Prepayment Calculator",
    category: "Loans",
    description: "Calculate how much interest you can save and how early you can close your loan by making prepayments.",
    seoTitle: "Loan Prepayment Calculator - Save Loan Interest | WealthMaze",
    seoDescription: "Calculate interest savings and tenure reduction by prepaying your home loan or personal loan. Easy-to-use loan prepayment tool by WealthMaze.",
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
          let principal = emi - interest;

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
        title: "How Loan Prepayment Saves Money",
        content: "When you make a prepayment towards a loan, the entire prepaid amount goes directly to reducing your outstanding **Principal Balance**. Since interest is calculated as a percentage of the outstanding principal, a lower principal means less interest accumulates monthly. Consequently, your loan can be closed much earlier, saving thousands in finance charges."
      }
    ],
    faqs: [
      { question: "Are there penalties for home loan prepayment?", answer: "Under RBI rules in India, banks are not allowed to charge prepayment penalties on floating-rate home loans. For fixed-rate loans or personal loans, lenders may charge a 2-4% prepayment fee." }
    ]
  }
];
