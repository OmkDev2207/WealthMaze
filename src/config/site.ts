// Site Configuration
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  ? process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "")
  : "https://wealthmaze.in";

export const siteConfig = {
  url: siteUrl,
  domain: siteUrl.replace(/^https?:\/\//, ""),
  email: "wealthmazeofficial@gmail.com",
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
      title: "WealthMaze – Financial Calculators, Investment Planning & Wealth Building",
      description: "Free SIP, retirement, financial freedom, net worth, inflation, EMI, and investment calculators. Plan your financial future with WealthMaze's financial planning tools and educational guides.",
    },
    blog: {
      title: "WealthMaze Blog - Financial Guides & Investment Tips",
      description: "Read expert articles on mutual fund SIPs, loan EMIs, tax saving, personal budgeting rules, and wealth creation.",
    },
    sip: {
      title: "SIP Calculator – Calculate Mutual Fund Returns Online",
      description: "Use the WealthMaze SIP Calculator to calculate mutual fund returns, systematic investment plan growth, and future compounding wealth corpus instantly.",
    },
    emi: {
      title: "EMI Calculator – Calculate Loan EMI and Interest Online",
      description: "Use our free EMI calculator to calculate loan Equated Monthly Installments, view interest schedules, and plan home or personal loan prepayments.",
    },
    tax: {
      title: "Income Tax Calculator – Compare Global Slabs Instantly",
      description: "Use our free income tax calculator to compare tax regimes, estimate annual salary tax liability, and calculate capital gains tax rates online.",
    },
    retirement: {
      title: "Retirement Calculator – Plan Savings and FIRE Target",
      description: "Estimate your target retirement savings corpus. Calculate monthly investment targets and FIRE numbers with our free retirement planning tool.",
    },
    mutualFund: {
      title: "Mutual Fund Return Calculator – Estimate Growth Online",
      description: "Use our mutual fund return calculator to project compound growth, estimate lumpsum returns, and plan monthly systematic investments instantly.",
    },
    cagr: {
      title: "CAGR Calculator – Calculate Annual Growth Rate Online",
      description: "Calculate the Compound Annual Growth Rate of stocks, mutual funds, or portfolios. Find the annualized growth rate of investments on WealthMaze.",
    },
    goal: {
      title: "Goal Calculator – Calculate Savings for Financial Goals",
      description: "Calculate how much you need to save monthly to reach your financial goals. Plan house, car, or emergency fund investments with WealthMaze.",
    }
  }
};
