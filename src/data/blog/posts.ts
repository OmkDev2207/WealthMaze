export interface Author {
  name: string;
  avatar: string;
  role: string;
  bio: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  readTime: string;
  category: string;
  tags: string[];
  author: Author;
  relatedCalculators: string[]; // List of calculator IDs that link to this post
}

export const authors: Record<string, Author> = {
  omk: {
    name: "Om K.",
    avatar: "https://wealthmaze.in/logo.png",
    role: "Founder, WealthMaze",
    bio: "Om K. is the founder of WealthMaze and an active equity investor with a background in finance management. He studies markets not just through numbers, but through the lens of behavioral finance — understanding why people make the financial decisions they do, and how those decisions shape long-term wealth outcomes. Om built WealthMaze to bridge the gap between complex financial tools and everyday investors who deserve clear, unbiased answers. His writing focuses on the ideas most finance content gets wrong — the psychology, the math, and the real-world decisions that actually determine financial outcomes.",
  },
};

export const blogPosts: BlogPost[] = [
  {
    slug: "is-gold-a-good-investment",
    title: "Is Gold a Good Investment? The Honest Answer Nobody Wants to Give",
    description: "Gold underperforms equities long-term but does something more valuable — it protects investor behaviour during crashes. Here's the honest case for and against gold.",
    publishedAt: "June 28, 2026",
    readTime: "11 min read",
    category: "Investing",
    tags: ["Gold", "Investing", "Portfolio Diversification", "SGB", "ETFs", "Wealth Building"],
    author: authors.omk,
    relatedCalculators: ["cagr-calculator", "net-worth-calculator", "compound-interest-calculator"],
  },
  {
    slug: "how-to-calculate-net-worth",
    title: "How to Calculate Your Net Worth — And Why It's the Only Financial Number That Actually Matters",
    description: "Your salary measures what flows through your hands. Your net worth measures what stays. Learn how to calculate it accurately, what the benchmarks mean, and how to grow it.",
    publishedAt: "June 27, 2026",
    readTime: "10 min read",
    category: "Wealth Building",
    tags: ["Net Worth", "Wealth Building", "Personal Finance", "Investing", "Debt"],
    author: authors.omk,
    relatedCalculators: ["net-worth-calculator", "sip-calculator", "financial-freedom-calculator"],
  },
  {
    slug: "what-is-xirr-calculator-guide",
    title: "What is XIRR? The Only Return Metric That Tells You the Truth About Your Investments",
    description: "XIRR calculates your real annualized return on investments with irregular cash flows. Learn what it is, how it differs from CAGR, and how to use the WealthMaze XIRR Calculator.",
    publishedAt: "June 27, 2026",
    readTime: "10 min read",
    category: "Investing",
    tags: ["XIRR", "Investing", "Returns", "CAGR", "Personal Finance", "Mutual Funds"],
    author: authors.omk,
    relatedCalculators: ["xirr-calculator", "cagr-calculator", "compound-interest-calculator"],
  },
  {
    slug: "why-most-people-retire-poor",
    title: "Why Most People Retire Poor Despite Working Their Entire Lives",
    description: "Most people work 40 years and retire with almost nothing — not because they earned too little, but because of four financial mistakes made every single month.",
    publishedAt: "June 27, 2026",
    readTime: "11 min read",
    category: "Investing",
    tags: ["Retirement", "Wealth Building", "Personal Finance", "Savings", "Investing"],
    author: authors.omk,
    relatedCalculators: ["sip-calculator", "inflation-impact-calculator", "financial-freedom-calculator"],
  },
  {
    slug: "what-nobody-tells-you-about-your-first-salary",
    title: "What Nobody Tells You About Your First Salary",
    description: "Most people celebrate their first salary by spending it. The smarter move is completely different — and it determines your financial life for the next 30 years.",
    publishedAt: "June 26, 2026",
    readTime: "10 min read",
    category: "Investing",
    tags: ["Wealth Building", "First Salary", "Personal Finance", "SIP", "Savings"],
    author: authors.omk,
    relatedCalculators: ["sip-calculator", "step-up-sip-calculator", "emergency-fund-calculator"],
  },
  {
    slug: "salary-is-not-your-wealth",
    title: "Your Salary is Not Your Wealth — Here's What Is",
    description: "You can't get rich by renting your time forever. Real wealth comes from owning assets that earn while you sleep — stocks, SIPs, MFs, and more. Here's why.",
    publishedAt: "June 26, 2026",
    readTime: "10 min read",
    category: "Investing",
    tags: ["Wealth Building", "Assets", "Personal Finance", "SIP"],
    author: authors.omk,
    relatedCalculators: ["sip-calculator", "financial-freedom-calculator", "compound-interest-calculator"],
  },
  {
    slug: "how-to-use-sip-calculator",
    title: "How to Use the WealthMaze SIP Calculator: A Complete Guide with Real Examples",
    description: "Learn how to use the WealthMaze SIP calculator standard, lumpsum, and step-up modes to project and plan your mutual fund investments with real-world scenarios.",
    publishedAt: "June 26, 2026",
    readTime: "9 min read",
    category: "Investing",
    tags: ["SIP", "Calculators", "Guide", "Personal Finance"],
    author: authors.omk,
    relatedCalculators: ["sip-calculator", "step-up-sip-calculator", "mutual-fund-return-calculator", "compound-interest-calculator"],
  },
  // 1. SIP vs FD
  {
    slug: "sip-vs-fd",
    title: "Mutual Fund SIP vs Fixed Deposit: The Real Comparison Nobody Wants to Have",
    description: "Compare risk, returns, tax treatment, and inflation impact of Systematic Investment Plans vs standard bank Fixed Deposits.",
    publishedAt: "June 25, 2026",
    readTime: "12 min read",
    category: "Investing",
    tags: ["SIP", "Fixed Deposit", "Comparison"],
    author: authors.omk,
    relatedCalculators: ["sip-calculator", "fd-calculator", "inflation-impact-calculator", "cagr-calculator"],
  },
  // 2. SIP Mistakes
  {
    slug: "sip-mistakes",
    title: "The Real Reason Your SIP Isn't Building Wealth — And It's Not the Market",
    description: "Understand the psychological and behavioral mistakes that derail SIP returns, and learn how to avoid them with structured discipline.",
    publishedAt: "June 25, 2026",
    readTime: "11 min read",
    category: "Investing",
    tags: ["SIP", "Common Mistakes", "Investing"],
    author: authors.omk,
    relatedCalculators: ["sip-calculator", "step-up-sip-calculator", "sip-comparison-calculator"],
  },
  // 3. SIP Calculator
  {
    slug: "what-is-sip",
    title: "What is SIP? The Investment Method That Turns Market Crashes Into Your Biggest Advantage",
    description: "Learn how Systematic Investment Plans (SIP) work, the magic of compounding, and how rupee cost averaging builds wealth.",
    publishedAt: "June 25, 2026",
    readTime: "10 min read",
    category: "Investing",
    tags: ["SIP", "Mutual Funds", "Beginners"],
    author: authors.omk,
    relatedCalculators: ["sip-calculator", "mutual-fund-return-calculator"],
  },
  {
    slug: "wealth-vs-income",
    title: "Wealth vs Income: Why the Highest Earners Are Often the Least Wealthy",
    description: "Understand the critical difference between high income and true net worth. Learn why high earners often fall into spending traps and how to build lasting assets.",
    publishedAt: "June 25, 2026",
    readTime: "12 min read",
    category: "Investing",
    tags: ["Wealth vs Income", "Net Worth", "Asset Building", "Financial Mindset"],
    author: authors.omk,
    relatedCalculators: ["net-worth-calculator", "financial-freedom-calculator", "sip-calculator"],
  },
  {
    slug: "most-people-think-about-growing-wealth-wrong-at-an-early-age",
    title: "Most People Think About Growing Wealth Wrong at an Early Age",
    description: "At an early age, obsessing over savings is one of the most expensive financial mistakes you can make. Learn why income growth beats savings rate.",
    publishedAt: "June 25, 2026",
    readTime: "8 min read",
    category: "Investing",
    tags: ["Income Growth", "Compounding", "Personal Finance", "Savings"],
    author: authors.omk,
    relatedCalculators: ["sip-calculator", "savings-calculator", "financial-freedom-calculator"],
  },
  // New Articles (June 22, 2026)
  {
    slug: "why-most-people-never-build-wealth",
    title: "Why Most People Never Build Wealth (And How to Avoid It)",
    description: "Understand the primary habits and traps that prevent people from building lasting wealth, and learn the practical steps to avoid them.",
    publishedAt: "June 22, 2026",
    readTime: "5 min read",
    category: "Savings",
    tags: ["Wealth Building", "Financial Habits", "Personal Finance", "Budgeting"],
    author: authors.omk,
    relatedCalculators: ["net-worth-calculator", "savings-calculator", "goal-based-investment-calculator"],
  },
  {
    slug: "power-of-starting-early",
    title: "The Power of Starting Early: Why Time Beats Higher Returns",
    description: "Discover how the time horizon and early compounding outweigh higher investment returns. Compare starting early versus starting late with real-world scenarios.",
    publishedAt: "June 22, 2026",
    readTime: "5 min read",
    category: "Investing",
    tags: ["Compounding", "Early Investing", "SIP", "Time Horizon"],
    author: authors.omk,
    relatedCalculators: ["sip-calculator", "investment-growth-calculator", "compound-interest-calculator"],
  },
  {
    slug: "small-financial-decisions-compound",
    title: "How Small Financial Decisions Compound Over Time",
    description: "See how minor daily or monthly choices compound into massive financial outcomes over decades, and learn how to recognize opportunity costs.",
    publishedAt: "June 22, 2026",
    readTime: "5 min read",
    category: "Savings",
    tags: ["Compounding", "Financial Habits", "Micro Investing", "Savings"],
    author: authors.omk,
    relatedCalculators: ["compound-interest-calculator", "savings-calculator", "sip-calculator"],
  },
  {
    slug: "financial-freedom-is-simpler",
    title: "Financial Freedom Is Simpler Than Most People Think",
    description: "Discover a realistic path to financial freedom. Learn how managing expenses, savings rate, and consistent investing can help you achieve independence without extreme sacrifice.",
    publishedAt: "June 22, 2026",
    readTime: "5 min read",
    category: "Retirement",
    tags: ["Financial Freedom", "Savings Rate", "Retirement Planning", "FIRE"],
    author: authors.omk,
    relatedCalculators: ["financial-freedom-calculator", "fire-calculator", "retirement-calculator"],
  },
  // 2. Compounding
  {
    slug: "compounding-explained",
    title: "The Magic of Compound Interest: The Eighth Wonder of the World",
    description: "Learn how money grows exponentially over time. Understand the difference between simple and compound growth with real examples.",
    publishedAt: "June 18, 2026",
    readTime: "10 min read",
    category: "Investing",
    tags: ["Compounding", "Investing", "Education"],
    author: authors.omk,
    relatedCalculators: ["cagr-calculator", "sip-calculator"],
  },
  // 3. CAGR
  {
    slug: "cagr-explained",
    title: "Understanding CAGR (Compound Annual Growth Rate) in Stock Markets",
    description: "Learn how to calculate and interpret CAGR to evaluate stock returns, mutual fund performance, and benchmark performance.",
    publishedAt: "June 18, 2026",
    readTime: "5 min read",
    category: "Stock Market",
    tags: ["CAGR", "Stocks", "Investment Math"],
    author: authors.omk,
    relatedCalculators: ["cagr-calculator", "stock-return-calculator"],
  },
  // 4. EMI Formula
  {
    slug: "emi-formula-explained",
    title: "How is Loan EMI Calculated? Formula & Math Explained",
    description: "Learn the exact mathematical formula behind Equated Monthly Installments (EMI) and understand how amortization works.",
    publishedAt: "June 18, 2026",
    readTime: "6 min read",
    category: "Loans",
    tags: ["EMI", "Home Loan", "Personal Loan"],
    author: authors.omk,
    relatedCalculators: ["emi-calculator"],
  },
  // 5. How to Save for a Car
  {
    slug: "buying-a-car-savings",
    title: "How to Save for a Car & Buy a Car with Savings",
    description: "Learn how to save for a car and buy a vehicle with your savings. Compare car loan interest vs cash purchases, use budgeting rules, and plan your target.",
    publishedAt: "June 18, 2026",
    readTime: "5 min read",
    category: "Savings",
    tags: ["How to Save for a Car", "Buy Car with Savings", "Car Budgeting", "Savings Plan"],
    author: authors.omk,
    relatedCalculators: ["car-loan-emi-calculator", "rd-calculator", "fd-calculator"],
  },
  // 6. How to Save for a House
  {
    slug: "buying-a-house-financial-roadmap",
    title: "How to Save for a House: Investment & Buying Roadmap",
    description: "Learn how to save for a house and invest to buy your dream home. Calculate down payments, mortgage affordability, and build a savings roadmap.",
    publishedAt: "June 18, 2026",
    readTime: "5 min read",
    category: "Savings",
    tags: ["How to Save for a House", "Invest to Buy House", "Home Down Payment", "Real Estate Planning"],
    author: authors.omk,
    relatedCalculators: ["home-loan-emi-calculator", "emi-calculator", "sip-calculator", "loan-prepayment-calculator"],
  },
  // 7. What is Taxation
  {
    slug: "what-is-taxation",
    title: "What is Taxation? Understanding the Basics",
    description: "An educational overview of how taxation works, why governments levy taxes, and the core principles of a tax system.",
    publishedAt: "June 18, 2026",
    readTime: "5 min read",
    category: "Tax",
    tags: ["Taxation", "Economics", "Education"],
    author: authors.omk,
    relatedCalculators: ["income-tax-calculator", "capital-gains-calculator"],
  },
  // 8. Types of Taxes
  {
    slug: "types-of-taxes",
    title: "The Main Types of Taxes Explained",
    description: "Learn about the difference between Direct and Indirect taxes, including income tax, sales tax, corporate tax, and GST.",
    publishedAt: "June 18, 2026",
    readTime: "5 min read",
    category: "Tax",
    tags: ["Taxation", "GST", "Economics"],
    author: authors.omk,
    relatedCalculators: ["income-tax-calculator", "capital-gains-calculator"],
  },
  // 9. Income Tax Basics
  {
    slug: "income-tax-basics",
    title: "Basics of Income Tax: An Educational Overview",
    description: "A simple introduction to income tax brackets, heads of income, taxable vs gross income, and progressive tax slabs.",
    publishedAt: "June 18, 2026",
    readTime: "5 min read",
    category: "Tax",
    tags: ["Income Tax", "Education", "Basics"],
    author: authors.omk,
    relatedCalculators: ["income-tax-calculator", "capital-gains-calculator"],
  },
  // 10. Budget Rule (Target: Savings, Budgeting, Rules)
  {
    slug: "budget-rule-50-30-20",
    title: "Savings Basics: The 50/30/20 Budgeting Rule Explained",
    description: "Learn the fundamentals of saving money, liquid assets, and how budgeting rules like the 50/30/20 rule help you manage household cash flow.",
    publishedAt: "June 18, 2026",
    readTime: "5 min read",
    category: "Savings",
    tags: ["Budgeting", "Savings", "Financial Habits"],
    author: authors.omk,
    relatedCalculators: ["rd-calculator", "fd-calculator", "sip-calculator"],
  },
  // 11. Liquid vs Non-Liquid Assets (Target: Savings, Liquidity)
  {
    slug: "liquid-vs-non-liquid-assets",
    title: "Liquid Assets vs Non-Liquid Assets: Understanding Liquidity",
    description: "Learn the difference between liquid assets (bank cash, sweep FDs) and non-liquid assets (real estate, jewelry) for financial planning.",
    publishedAt: "June 18, 2026",
    readTime: "5 min read",
    category: "Savings",
    tags: ["Savings", "Liquidity", "Financial Planning"],
    author: authors.omk,
    relatedCalculators: ["fd-calculator", "rd-calculator"],
  },
  // 12. Intro to Financial Markets
  {
    slug: "introduction-to-financial-markets",
    title: "Introduction to Financial Markets and Securities",
    description: "An educational introduction to core financial terms: defining equities (stocks), debt (bonds), and mutual funds.",
    publishedAt: "June 18, 2026",
    readTime: "5 min read",
    category: "Investing",
    tags: ["Beginners", "Stocks", "Bonds", "Mutual Funds"],
    author: authors.omk,
    relatedCalculators: ["sip-calculator", "stock-return-calculator", "mutual-fund-return-calculator"],
  },
  // 13. Index Funds
  {
    slug: "what-is-index-fund",
    title: "What is an Index Fund? Understanding Passive Investing Concepts",
    description: "Learn about passive management strategies, index trackers (Nifty 50, S&P 500), low expense ratios, and index mutual funds.",
    publishedAt: "June 18, 2026",
    readTime: "5 min read",
    category: "Investing",
    tags: ["Passive Investing", "SIP", "Index Funds"],
    author: authors.omk,
    relatedCalculators: ["sip-calculator", "mutual-fund-return-calculator", "cagr-calculator"],
  },
  // 14. Debt-to-Income Ratio
  {
    slug: "debt-to-income-ratio",
    title: "Understanding Debt-to-Income Ratios in Banking",
    description: "Learn the mathematical formula banks use to evaluate loan eligibility, and how front-end and back-end DTI ratios work.",
    publishedAt: "June 18, 2026",
    readTime: "5 min read",
    category: "Loans",
    tags: ["EMI", "Banking Ratios", "Debt"],
    author: authors.omk,
    relatedCalculators: ["emi-calculator", "loan-comparison-calculator", "car-loan-emi-calculator"],
  },
  // 15. Loan Prepayments
  {
    slug: "understanding-loan-prepayments",
    title: "The Mathematics of Loan Prepayments",
    description: "Understand the mathematical effects of prepayments on outstanding principal, future interest charges, and loan tenure.",
    publishedAt: "June 18, 2026",
    readTime: "5 min read",
    category: "Loans",
    tags: ["EMI", "Interest Savings", "Loan Prepayment"],
    author: authors.omk,
    relatedCalculators: ["loan-prepayment-calculator", "home-loan-emi-calculator"],
  },
  // 16. Market Volatility
  {
    slug: "understanding-market-volatility",
    title: "Market Volatility and Financial Cycles Explained",
    description: "An educational guide defining market volatility, standard deviation, and market phases (bull and bear markets).",
    publishedAt: "June 18, 2026",
    readTime: "5 min read",
    category: "Stock Market",
    tags: ["Market Volatility", "Stocks", "Market Cycles"],
    author: authors.omk,
    relatedCalculators: ["stock-return-calculator", "cagr-calculator", "portfolio-return-calculator"],
  },
  // 17. Asset Allocation
  {
    slug: "asset-allocation",
    title: "Asset Allocation 101: Balancing Equity, Debt, and Gold",
    description: "Learn how to balance equity, debt, and gold to minimize portfolio risk and maximize long-term returns.",
    publishedAt: "June 18, 2026",
    readTime: "5 min read",
    category: "Investing",
    tags: ["Asset Allocation", "Portfolio", "Diversification"],
    author: authors.omk,
    relatedCalculators: ["portfolio-return-calculator", "net-worth-calculator", "gold-investment-calculator"],
  },
  // 18. Beginner Investing Guide
  {
    slug: "beginner-investing-guide",
    title: "The Ultimate Guide to Investing for Complete Beginners",
    description: "A complete beginner's guide to understanding stocks, mutual funds, bonds, and starting your investment journey.",
    publishedAt: "June 18, 2026",
    readTime: "6 min read",
    category: "Investing",
    tags: ["Beginners", "Investing", "Education"],
    author: authors.omk,
    relatedCalculators: ["sip-calculator", "mutual-fund-return-calculator", "cagr-calculator", "goal-based-investment-calculator"],
  },
  // 19. Emergency Fund Guide
  {
    slug: "emergency-fund-guide",
    title: "How to Build a Bulletproof Emergency Fund",
    description: "Learn how to calculate, build, and store an emergency fund to secure your household finance against unexpected events.",
    publishedAt: "June 18, 2026",
    readTime: "5 min read",
    category: "Savings",
    tags: ["Emergency Fund", "Savings", "Budgeting"],
    author: authors.omk,
    relatedCalculators: ["fd-calculator", "rd-calculator"],
  },
  // 20. Gold Investment Guide
  {
    slug: "gold-investment-guide",
    title: "Is Gold a Good Investment? Historical Returns & Benefits",
    description: "Explore the role of gold in hedging inflation, historical returns, and how to allocate precious metals in your portfolio.",
    publishedAt: "June 18, 2026",
    readTime: "5 min read",
    category: "Gold",
    tags: ["Gold", "Inflation", "Hedge"],
    author: authors.omk,
    relatedCalculators: ["gold-investment-calculator", "gold-sip-calculator"],
  },
  // 21. Home Loan vs Personal Loan
  {
    slug: "home-loan-vs-personal-loan",
    title: "Home Loan vs Personal Loan: A Detailed Comparison",
    description: "Understand the differences between secured home loans and unsecured personal loans, including rates, tenures, and tax benefits.",
    publishedAt: "June 18, 2026",
    readTime: "5 min read",
    category: "Loans",
    tags: ["Home Loan", "Personal Loan", "EMI"],
    author: authors.omk,
    relatedCalculators: ["emi-calculator", "loan-comparison-calculator", "loan-prepayment-calculator"],
  },
  // 22. Investing Psychology
  {
    slug: "investing-psychology",
    title: "Long-Term Investing Psychology & How to Survive Market Panics",
    description: "Learn how to control emotions, avoid panic selling, and benefit from market corrections using disciplined financial planning.",
    publishedAt: "June 18, 2026",
    readTime: "5 min read",
    category: "Investing",
    tags: ["Psychology", "Stock Market", "Volatility"],
    author: authors.omk,
    relatedCalculators: ["sip-calculator", "portfolio-return-calculator", "cagr-calculator"],
  },
  // 23. Loan Affordability Guide
  {
    slug: "loan-affordability-guide",
    title: "How Much Loan Can I Afford? The 35/40 Debt Rule",
    description: "Use standard banking ratios and the 35/40 rule to calculate your maximum safe loan limit and avoid debt traps.",
    publishedAt: "June 18, 2026",
    readTime: "5 min read",
    category: "Loans",
    tags: ["EMI", "Debt", "Budgeting"],
    author: authors.omk,
    relatedCalculators: ["emi-calculator", "loan-comparison-calculator", "loan-prepayment-calculator"],
  },
  // 24. Passive Investing Basics
  {
    slug: "passive-investing-basics",
    title: "Earn Money Without Effort? The Basics of Passive Investing",
    description: "An educational overview of passive investing, passive mutual funds, low-cost index tracking, and expense ratios.",
    publishedAt: "June 18, 2026",
    readTime: "5 min read",
    category: "Investing",
    tags: ["Passive Investing", "Index Funds", "Investing"],
    author: authors.omk,
    relatedCalculators: ["sip-calculator", "mutual-fund-return-calculator", "cagr-calculator"],
  },
  // 25. Reducing EMI
  {
    slug: "reducing-emi",
    title: "Smart Ways to Reduce Your Loan EMI & Save Lakhs in Interest",
    description: "Learn actionable strategies like tenure extensions, interest rate negotiations, and balance transfers to reduce EMI burden.",
    publishedAt: "June 18, 2026",
    readTime: "5 min read",
    category: "Loans",
    tags: ["EMI", "Interest Savings", "Prepayment"],
    author: authors.omk,
    relatedCalculators: ["emi-calculator", "loan-prepayment-calculator", "loan-comparison-calculator"],
  },
  // 26. Saving First 1 Lakh
  {
    slug: "saving-first-1-lakh",
    title: "Actionable Strategy to Save Your First ₹1 Lakh Faster",
    description: "Actionable budgeting strategies, saving habits, and cash-flow discipline to reach your first ₹1 Lakh milestone starting from zero.",
    publishedAt: "June 18, 2026",
    readTime: "5 min read",
    category: "Savings",
    tags: ["Savings", "Financial Discipline", "Budgeting"],
    author: authors.omk,
    relatedCalculators: ["rd-calculator", "fd-calculator"],
  },
  // 27. SGB vs Physical Gold
  {
    slug: "sgb-vs-physical-gold",
    title: "Sovereign Gold Bonds (SGB) vs Physical Gold: Which is Better?",
    description: "Compare Sovereign Gold Bonds (SGB) with physical gold jewelry, coins, and ETFs on interest, taxation, liquidity, and safety.",
    publishedAt: "June 18, 2026",
    readTime: "5 min read",
    category: "Gold",
    tags: ["SGB", "Gold", "Investing"],
    author: authors.omk,
    relatedCalculators: ["gold-investment-calculator", "gold-sip-calculator"],
  },
  // 28. SIP for Retirement
  {
    slug: "sip-for-retirement",
    title: "Building Your Retirement Corpus with Systematic Investment Plans",
    description: "Learn how to estimate your retirement corpus and plan monthly SIPs to secure your post-retirement financial freedom.",
    publishedAt: "June 18, 2026",
    readTime: "6 min read",
    category: "Retirement",
    tags: ["Retirement", "SIP", "FIRE"],
    author: authors.omk,
    relatedCalculators: ["retirement-calculator", "fire-calculator", "sip-calculator"],
  },
  // 29. SIP for Students
  {
    slug: "sip-for-students",
    title: "How Students Can Start Investing with a ₹500 SIP",
    description: "Learn how students can start small mutual fund SIPs with as little as ₹500, leveraging compounding early.",
    publishedAt: "June 18, 2026",
    readTime: "5 min read",
    category: "Investing",
    tags: ["SIP", "Students", "Beginners"],
    author: authors.omk,
    relatedCalculators: ["sip-calculator", "goal-based-investment-calculator", "rd-calculator"],
  },

  // 32. Tax Policy Basics
  {
    slug: "tax-policy-basics",
    title: "What is Tax Policy? How Governments Design and Levy Taxes",
    description: "Learn the fundamentals of tax policy, how governments design tax systems, who decides tax rates, and the economic principles behind taxation.",
    publishedAt: "June 18, 2026",
    readTime: "5 min read",
    category: "Tax",
    tags: ["Tax Policy", "Economics", "Education"],
    author: authors.omk,
    relatedCalculators: ["income-tax-calculator", "capital-gains-calculator"],
  },
  // 33. Where Do Taxes Go?
  {
    slug: "where-do-taxes-go",
    title: "Where Do Taxes Go? How Tax Revenue is Used by Governments",
    description: "Explore where tax revenue is spent, from public infrastructure and social security to national defense, education, and public healthcare.",
    publishedAt: "June 18, 2026",
    readTime: "5 min read",
    category: "Tax",
    tags: ["Taxation", "Public Spend", "Education"],
    author: authors.omk,
    relatedCalculators: ["income-tax-calculator", "capital-gains-calculator"],
  },
];

export const getPostsByCalculatorId = (calculatorId: string): BlogPost[] => {
  return blogPosts.filter((post) => post.relatedCalculators.includes(calculatorId));
};

export const getPostBySlug = (slug: string): BlogPost | undefined => {
  return blogPosts.find((post) => post.slug === slug);
};

export const getRelatedPosts = (slug: string, category: string, limit = 4): BlogPost[] => {
  return blogPosts
    .filter((p) => p.slug !== slug && p.category === category)
    .slice(0, limit);
};
