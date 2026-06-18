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
    seoTitle: "10 Year SIP Calculator - Estimate 10-Year Mutual Fund Returns | WealthMaze",
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
    seoTitle: "20 Year SIP Calculator - Long-Term Wealth Planning | WealthMaze",
    seoDescription: "Calculate your long-term wealth growth with our 20-year SIP calculator. See how compound interest creates huge retirement or goal corpuses over two decades.",
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
    seoTitle: "Home Loan EMI Calculator - Calculate Housing Loan EMIs | WealthMaze",
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
    seoTitle: "Car Loan EMI Calculator - Calculate Auto Loan EMIs | WealthMaze",
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
];

export const getProgrammaticPageById = (id: string): ProgrammaticPageConfig | undefined => {
  return programmaticPages.find((p) => p.id === id);
};
