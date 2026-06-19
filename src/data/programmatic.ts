export interface ProgrammaticPageConfig {
  id: string; // Dynamic path matching, e.g., "sip-calculator-1000-per-month"
  parentCalculatorId: string; // The base calculator, e.g., "sip-calculator"
  name: string; // Page Heading
  seoTitle: string; // Custom SEO Title
  seoDescription: string; // Custom SEO Description
  defaultOverrides: Record<string, number>; // Overrides for form fields
  educationalContent: { title: string; content: string }[];
}

export const programmaticPages: ProgrammaticPageConfig[] = [
  {
    id: "sip-calculator-1000-per-month",
    parentCalculatorId: "sip-calculator",
    name: "SIP Calculator for ₹1,000/Month",
    seoTitle: "SIP Calculator for ₹1000 Per Month Mutual Fund | WealthMaze",
    seoDescription: "Calculate the future value of a ₹1,000 monthly SIP investment. See how much wealth you can build over 5, 10, or 20 years with compound returns.",
    defaultOverrides: {
      monthlyInvestment: 1000,
    },
    educationalContent: [
      {
        title: "Starting Small: The Power of a ₹1,000 Monthly SIP",
        content: "Many beginners believe that they need a large sum of money to start investing in mutual funds. However, starting a Systematic Investment Plan (SIP) with just ₹1,000 per month can yield substantial long-term wealth thanks to compounding. By investing ₹1,000 consistently, you build financial discipline and benefit from rupee cost averaging without straining your budget.",
      },
      {
        title: "How Much Wealth Can ₹1,000/Month Build?",
        content: "If you start a SIP of ₹1,000 per month expecting a conservative 12% annual return:\n- **In 10 Years:** You will invest a total of ₹1.2 Lakhs, which compounds to ~₹2.3 Lakhs.\n- **In 20 Years:** Your total investment of ₹2.4 Lakhs compounds to ~₹10 Lakhs.\n- **In 30 Years:** Your total investment of ₹3.6 Lakhs grows to a massive ~₹35 Lakhs!\n\nThis shows that time is the most crucial asset when building wealth. Starting early with ₹1,000 is far better than waiting years to start with ₹5,000.",
      },
    ],
  },
  {
    id: "sip-calculator-5000-per-month",
    parentCalculatorId: "sip-calculator",
    name: "SIP Calculator for ₹5,000/Month",
    seoTitle: "SIP Calculator for ₹5000 Per Month Mutual Fund | WealthMaze",
    seoDescription: "Calculate the future value of a ₹5,000 monthly SIP. Estimate your final maturity wealth, total invested amount, and estimated capital gains over time.",
    defaultOverrides: {
      monthlyInvestment: 5000,
    },
    educationalContent: [
      {
        title: "Scaling Your Wealth: The impact of a ₹5,000 Monthly SIP",
        content: "A ₹5,000 monthly SIP is an excellent sweet spot for young professionals, salaried individuals, and families. It represents a meaningful savings commitment that can build a serious financial cushion for major life goals like buying a home, funding child education, or starting a business.",
      },
      {
        title: "Projections for a ₹5,000 Monthly SIP",
        content: "Assuming an average long-term equity mutual fund return of 12% p.a.:\n- **10 Years:** Total invested is ₹6 Lakhs, compounding to ~₹11.6 Lakhs.\n- **20 Years:** Total invested is ₹12 Lakhs, compounding to ~₹50 Lakhs.\n- **30 Years:** Total invested is ₹18 Lakhs, compounding to a retirement corpus of ~₹1.75 Crores!\n\nBy leveraging the compound interest engine, your money does the heavy lifting, especially in the second half of your investment timeline.",
      },
    ],
  },
  {
    id: "sip-calculator-10-years",
    parentCalculatorId: "sip-calculator",
    name: "10-Year SIP Return Calculator",
    seoTitle: "10-Year SIP Calculator – Estimate Mutual Fund Returns",
    seoDescription: "Plan your medium-term financial goals with our 10-year SIP return calculator. Estimate compounding growth for mutual fund investments over a decade.",
    defaultOverrides: {
      timePeriod: 10,
    },
    educationalContent: [
      {
        title: "Medium-Term Wealth Creation: The 10-Year SIP Horizon",
        content: "A 10-year investment horizon is considered medium-term in equity markets. It is long enough to ride out typical economic cycles and market volatility, making it ideal for targeting milestones like down payments on a house, wedding expenses, or capital to start an enterprise.",
      },
      {
        title: "What to Expect from a 10-Year SIP",
        content: "Over a decade, compound interest begins to show its strength. While the first 3-5 years might show moderate progress, by years 8-10, the returns start outpacing the principal contribution. Historically, diversified equity mutual fund SIPs over a 10-year period have generated compound annual growth rates (CAGR) in the range of 12% to 15%, depending on market cycles.",
      },
    ],
  },
  {
    id: "sip-calculator-20-years",
    parentCalculatorId: "sip-calculator",
    name: "20-Year SIP Return Calculator",
    seoTitle: "20-Year SIP Calculator – Estimate Compounding Returns",
    seoDescription: "Calculate long-term wealth growth with our 20-year SIP calculator. See how compound interest creates retirement or goal corpuses over two decades.",
    defaultOverrides: {
      timePeriod: 20,
    },
    educationalContent: [
      {
        title: "Long-Term Financial Freedom: The 20-Year SIP Advantage",
        content: "Investing for 20 years is a true long-term strategy. This horizon is perfect for retirement planning or building a higher education corpus for your children. Over a 20-year span, short-term market corrections become minor blips on a charts, and the power of compounding takes full control.",
      },
      {
        title: "The Exponential Compounding Curve",
        content: "Between year 10 and year 20 of a SIP, a magical transformation occurs. Because you have a large accumulated base earning returns, the absolute growth in value in the 19th and 20th year alone can exceed the total amount you invested during the entire 20 years. This compounding acceleration is why staying invested for the long term is critical for building significant wealth.",
      },
    ],
  },
  {
    id: "home-loan-emi-calculator",
    parentCalculatorId: "emi-calculator",
    name: "Home Loan EMI Calculator",
    seoTitle: "Home Loan EMI Calculator – Calculate Housing Loan EMIs",
    seoDescription: "Calculate your home loan Equated Monthly Installment (EMI), total interest payable, and view the complete amortization schedule for housing loans.",
    defaultOverrides: {
      interestRate: 8.5,
      tenure: 20,
    },
    educationalContent: [
      {
        title: "Understanding Housing Loan EMIs",
        content: "A home loan is a long-term financial commitment, typically spanning 15 to 30 years. Because of the large principal amount and extended tenure, interest payments can often exceed the original loan principal. Using a dedicated home loan EMI calculator helps you plan your monthly budget and determine your affordability limit.",
      },
      {
        title: "How to Minimize Your Home Loan Interest Burden",
        content: "1. **Opt for Prepayments:** Making even one extra EMI payment every year or prepaying 5% of the outstanding balance annually can reduce your tenure by several years and save lakhs in interest.\n2. **Choose a Shorter Tenure:** While a 20-year loan offers lower EMIs than a 15-year loan, the total interest payable is significantly higher. Choose the shortest tenure you can comfortably afford.\n3. **Negotiate Interest Rates:** Even a 0.5% reduction in interest rates can lead to huge savings over a 20-year period. Track rates and consider home loan balance transfers if competitive rates are available.",
      },
    ],
  },
  {
    id: "car-loan-emi-calculator",
    parentCalculatorId: "emi-calculator",
    name: "Car Loan EMI Calculator",
    seoTitle: "Car Loan EMI Calculator – Calculate Auto Loan EMIs",
    seoDescription: "Calculate car loan EMIs, interest rates, and loan tenures. View your yearly principal and interest breakdown before purchasing your vehicle.",
    defaultOverrides: {
      interestRate: 9.5,
      tenure: 5,
    },
    educationalContent: [
      {
        title: "Planning Your Vehicle Purchase with Car Loan EMIs",
        content: "Car loans typically have shorter tenures, ranging from 3 to 7 years, and slightly higher interest rates compared to home loans. Since cars are depreciating assets, it is important to avoid over-leveraging. A car loan EMI calculator lets you check your monthly outflows and helps you stay within a sensible budget.",
      },
      {
        title: "Best Practices for Auto Finance",
        content: "- **Make a Larger Down Payment:** Try to pay at least 20% of the vehicle value upfront. This reduces your loan amount, interest rate risk, and guards against negative equity (where you owe more than the car is worth).\n- **Follow the 20/4/10 Rule:** Put down at least 20%, finance for no more than 4 years, and ensure total transportation expenses (EMI, insurance, fuel) do not exceed 10% of your gross monthly income.\n- **Check Prepayment Penalties:** Unlike home loans (which have zero prepayment penalties under most regulations), car loans may attract charges for early closure. Always review loan terms.",
      },
    ],
  },
  {
    id: "sip-calculator-2000-per-month",
    parentCalculatorId: "sip-calculator",
    name: "SIP Calculator for ₹2,000/Month",
    seoTitle: "SIP Calculator for ₹2000 Per Month Mutual Fund | WealthMaze",
    seoDescription: "Calculate the future value of a ₹2,000 monthly SIP investment. See how much wealth you can build over 5, 10, or 20 years with compound returns.",
    defaultOverrides: {
      monthlyInvestment: 2000,
    },
    educationalContent: [
      {
        title: "Starting Small: The Power of a ₹2,000 Monthly SIP",
        content: "Starting a Systematic Investment Plan (SIP) with just ₹2,000 per month can yield substantial long-term wealth thanks to compounding. By investing ₹2,000 consistently, you build financial discipline and benefit from rupee cost averaging without straining your budget.",
      },
    ],
  },
  {
    id: "sip-calculator-3000-per-month",
    parentCalculatorId: "sip-calculator",
    name: "SIP Calculator for ₹3,000/Month",
    seoTitle: "SIP Calculator for ₹3000 Per Month Mutual Fund | WealthMaze",
    seoDescription: "Estimate compounding returns for a ₹3,000 monthly mutual fund investment. Check maturity value and total principal paid over 10 to 30 years.",
    defaultOverrides: {
      monthlyInvestment: 3000,
    },
    educationalContent: [
      {
        title: "Growing Your Portfolio: A ₹3,000 Monthly Commitment",
        content: "A ₹3,000 monthly SIP is a fantastic entry point for young professionals. It establishes a strong baseline for investing without putting a major squeeze on daily expenses.",
      },
    ],
  },
  {
    id: "sip-calculator-10000-per-month",
    parentCalculatorId: "sip-calculator",
    name: "SIP Calculator for ₹10,000/Month",
    seoTitle: "SIP Calculator for ₹10000 Per Month Mutual Fund | WealthMaze",
    seoDescription: "Calculate the future value of a ₹10,000 monthly SIP. Analyze total compound returns, principal invested, and long-term compounding growth online.",
    defaultOverrides: {
      monthlyInvestment: 10000,
    },
    educationalContent: [
      {
        title: "Accelerating Wealth: The Power of a ₹10,000 Monthly SIP",
        content: "A monthly commitment of ₹10,000 represents a serious savings discipline. Over 10-20 years, it compounds into a major financial safety net, perfect for retirement planning or child education.",
      },
    ],
  },
  {
    id: "sip-calculator-20000-per-month",
    parentCalculatorId: "sip-calculator",
    name: "SIP Calculator for ₹20,000/Month",
    seoTitle: "SIP Calculator for ₹20000 Per Month Mutual Fund | WealthMaze",
    seoDescription: "Determine the future value of a ₹20,000 monthly SIP. Use the compound interest engine to plan targets like buying a home or early retirement.",
    defaultOverrides: {
      monthlyInvestment: 20000,
    },
    educationalContent: [
      {
        title: "Fast-Tracking Financial Freedom: A ₹20,000 Monthly SIP",
        content: "Investing ₹20,000 monthly puts you on the fast-track to financial independence. At a typical 12% p.a. expected return rate, a ₹20,000 monthly investment grows to over ₹2 Crore in just 22 years.",
      },
    ],
  },
  {
    id: "sip-calculator-15-years",
    parentCalculatorId: "sip-calculator",
    name: "15-Year SIP Return Calculator",
    seoTitle: "15-Year SIP Calculator – Estimate Compounding Returns",
    seoDescription: "Calculate the value of mutual fund investments over a 15-year period. Estimate principal accumulation and compound growth for financial plans.",
    defaultOverrides: {
      timePeriod: 15,
    },
    educationalContent: [
      {
        title: "The 15-Year Compounding Curve",
        content: "A 15-year timeline is considered the standard for long-term equity investing. It allows you to compound capital through multiple business cycles, smoothing out short-term stock market volatility.",
      },
    ],
  },
  {
    id: "sip-calculator-25-years",
    parentCalculatorId: "sip-calculator",
    name: "25-Year SIP Return Calculator",
    seoTitle: "25-Year SIP Calculator – Estimate Long-Term Returns",
    seoDescription: "See how much a monthly SIP grows over 25 years. Check how the hockey-stick compounding curve delivers huge wealth returns over two and a half decades.",
    defaultOverrides: {
      timePeriod: 25,
    },
    educationalContent: [
      {
        title: "Generational Wealth Building: The 25-Year Horizon",
        content: "Over a 25-year investment timeline, the power of compound interest dominates. Because interest is earned on accumulated interest for 300 months, the total returns often dwarf the original principal contributed by several times.",
      },
    ],
  },
  {
    id: "sip-calculator-30-years",
    parentCalculatorId: "sip-calculator",
    name: "30-Year SIP Return Calculator",
    seoTitle: "30-Year SIP Calculator – Plan Retirement Investments",
    seoDescription: "Calculate mutual fund SIP growth over a 30-year career timeline. See how compounding time creates substantial multi-crore retirement corpuses.",
    defaultOverrides: {
      timePeriod: 30,
    },
    educationalContent: [
      {
        title: "The Ultimate Compounding Engine: 30 Years of SIP",
        content: "A 30-year timeline represents a full working career. A modest ₹5,000 monthly SIP can grow to over ₹1.7 Crore in 30 years at 12% p.a., proving that patience is the ultimate wealth builder.",
      },
    ],
  },
  {
    id: "home-loan-emi-calculator-30-lakhs",
    parentCalculatorId: "emi-calculator",
    name: "Home Loan EMI Calculator for ₹30 Lakhs",
    seoTitle: "EMI Calculator for ₹30 Lakhs Home Loan | WealthMaze",
    seoDescription: "Calculate monthly EMI, total interest, and outstanding payment schedule for a ₹30 Lakh housing loan with our free home loan EMI calculator.",
    defaultOverrides: {
      loanAmount: 3000000,
      interestRate: 8.5,
      tenure: 20,
    },
    educationalContent: [
      {
        title: "Planning a ₹30 Lakh Housing Loan",
        content: "For a ₹30 Lakh home loan at an 8.5% interest rate for 20 years, your monthly EMI is ~₹26,035. Understanding this helps you review housing budget limits before applying for finance.",
      },
    ],
  },
  {
    id: "home-loan-emi-calculator-50-lakhs",
    parentCalculatorId: "emi-calculator",
    name: "Home Loan EMI Calculator for ₹50 Lakhs",
    seoTitle: "EMI Calculator for ₹50 Lakhs Home Loan | WealthMaze",
    seoDescription: "Calculate monthly EMI, interest payable, and view the full amortization chart for a ₹50 Lakh housing loan using our free loan calculator.",
    defaultOverrides: {
      loanAmount: 5000000,
      interestRate: 8.5,
      tenure: 20,
    },
    educationalContent: [
      {
        title: "Structuring a ₹50 Lakh Home Loan",
        content: "A ₹50 Lakh home loan at 8.5% p.a. for 20 years carries an EMI of ~₹43,391. Total interest payable amounts to ~₹54.1 Lakhs, proving that making periodic prepayments is highly recommended.",
      },
    ],
  },
  {
    id: "home-loan-emi-calculator-75-lakhs",
    parentCalculatorId: "emi-calculator",
    name: "Home Loan EMI Calculator for ₹75 Lakhs",
    seoTitle: "EMI Calculator for ₹75 Lakhs Home Loan | WealthMaze",
    seoDescription: "Determine monthly EMIs, principal splits, and interest tenure timelines for a ₹75 Lakh home loan with our free mortgage planning calculator.",
    defaultOverrides: {
      loanAmount: 7500000,
      interestRate: 8.5,
      tenure: 20,
    },
    educationalContent: [
      {
        title: "Managing a ₹75 Lakh Mortgage",
        content: "At 8.5% p.a. for 20 years, a ₹75 Lakh home loan requires a monthly EMI of ~₹65,087. Total interest accumulates to ~₹81.2 Lakhs over the full tenure.",
      },
    ],
  },
  {
    id: "car-loan-emi-calculator-5-lakhs",
    parentCalculatorId: "emi-calculator",
    name: "Car Loan EMI Calculator for ₹5 Lakhs",
    seoTitle: "Car Loan EMI Calculator for ₹5 Lakhs Auto Loan",
    seoDescription: "Calculate auto loan EMIs, interest rates, and loan tenures for a ₹5 Lakh vehicle purchase. View yearly principal and interest splits online.",
    defaultOverrides: {
      loanAmount: 500000,
      interestRate: 9.5,
      tenure: 5,
    },
    educationalContent: [
      {
        title: "Auto Finance for a ₹5 Lakh Vehicle Loan",
        content: "A ₹5 Lakh car loan at 9.5% p.a. interest for 5 years requires a monthly payment of ~₹10,501. Always review prepayment policies for vehicle loans.",
      },
    ],
  },
  {
    id: "car-loan-emi-calculator-10-lakhs",
    parentCalculatorId: "emi-calculator",
    name: "Car Loan EMI Calculator for ₹10 Lakhs",
    seoTitle: "Car Loan EMI Calculator for ₹10 Lakhs Auto Loan",
    seoDescription: "Determine monthly EMIs, principal, and interest splits for a ₹10 Lakh auto loan. Estimate car loan payments and interest costs instantly.",
    defaultOverrides: {
      loanAmount: 1000000,
      interestRate: 9.5,
      tenure: 5,
    },
    educationalContent: [
      {
        title: "Vehicle Finance for a ₹10 Lakh Loan",
        content: "For a ₹10 Lakh auto loan at a 9.5% interest rate over a 5-year tenure, the Equated Monthly Installment (EMI) comes out to ~₹21,002.",
      },
    ],
  },
];

export const getProgrammaticPageById = (id: string): ProgrammaticPageConfig | undefined => {
  return programmaticPages.find((p) => p.id === id);
};
