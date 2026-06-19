// Site Configuration
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  ? process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "")
  : process.env.NEXT_PUBLIC_VERCEL_URL
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : "https://wealthmaze.com";

export const siteConfig = {
  url: siteUrl,
  domain: siteUrl.replace(/^https?:\/\//, ""),
  email: "support@wealthmaze.com",
  keywords: [
    "WealthMaze",
    "wealthmaze",
    "wealthwise",
    "wealth wise",
    "wealwise",
    "weal wise",
    "wealth maze",
    "wealth-maze",
    "wealmaze",
    "weal maze",
    "financial calculator",
    "investment calculator",
    "sip calculator",
    "emi-calculator",
    "retirement planning",
    "wealth planning",
    "investment planning",
    "tax calculator",
    "mutual fund calculator",
    "cagr calculator",
    "financial calculators",
    "investment tools",
  ],
  metadata: {
    home: {
      title: "Financial Calculators & Investment Planning Tools | WealthMaze",
      description: "Plan investments, calculate loan EMIs, and compare retirement scenarios with WealthMaze's free financial calculators. 100% private and fast.",
    },
    blog: {
      title: "WealthMaze Blog - Financial Guides & Investment Tips",
      description: "Read expert articles on mutual fund SIPs, loan EMIs, tax saving, personal budgeting rules, and wealth creation.",
    },
    sip: {
      title: "SIP Calculator - Calculate Mutual Fund SIP Returns | WealthMaze",
      description: "Calculate the future value of your Systematic Investment Plan (SIP) investments. Plan your monthly mutual fund investments with our free SIP calculator.",
    },
    emi: {
      title: "EMI Calculator - Calculate Loan EMIs & Interest | WealthMaze",
      description: "Calculate your loan Equated Monthly Installments (EMI). View loan amortization schedule, principal, and interest splits with WealthMaze.",
    },
    tax: {
      title: "Income Tax Calculator - Compare Old vs New Slabs | WealthMaze",
      description: "Calculate your income tax liability and compare the old vs new tax regimes. Easy tax slab calculations on WealthMaze.",
    },
    retirement: {
      title: "Retirement Calculator - Plan Your Retirement Savings | WealthMaze",
      description: "Estimate the corpus needed for your retirement. Calculate early retirement targets and FIRE numbers with our free retirement tool.",
    },
    mutualFund: {
      title: "Mutual Fund Return Calculator - Estimate Gains | WealthMaze",
      description: "Calculate absolute, CAGR, and future returns on your mutual fund investments for lumpsum and SIP strategies.",
    },
    cagr: {
      title: "CAGR Calculator - Calculate Annual Growth Rate | WealthMaze",
      description: "Calculate the Compound Annual Growth Rate (CAGR) of your stocks, mutual funds, and mutual fund investments quickly.",
    },
    goal: {
      title: "Goal Calculator - Plan Savings for Life Goals | WealthMaze",
      description: "Plan how much you need to save monthly to buy a house, buy a car, or build a wealth fund with our free goal planner.",
    }
  }
};
