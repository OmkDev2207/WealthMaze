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
  wealthmaze: {
    name: "WealthMaze Editorial Board",
    avatar: "/authors/editorial.png",
    role: "Financial Research & Policy Team",
    bio: "Our team consists of seasoned financial analysts, chartered accountants, and product developers dedicated to making personal finance transparent and mathematical.",
  },
};

export const blogPosts: BlogPost[] = [
  // 1. SIP Calculator
  {
    slug: "what-is-sip",
    title: "What is SIP (Systematic Investment Plan)?",
    description: "Learn how Systematic Investment Plans (SIP) work, the magic of compounding, and how rupee cost averaging builds wealth.",
    publishedAt: "June 18, 2026",
    readTime: "5 min read",
    category: "Investing",
    tags: ["SIP", "Mutual Funds", "Beginners"],
    author: authors.wealthmaze,
    relatedCalculators: ["sip-calculator", "mutual-fund-return-calculator"],
  },
  // 2. Compounding
  {
    slug: "compounding-explained",
    title: "The Magic of Compound Interest: The Eighth Wonder of the World",
    description: "Learn how money grows exponentially over time. Understand the difference between simple and compound growth with real examples.",
    publishedAt: "June 18, 2026",
    readTime: "5 min read",
    category: "Investing",
    tags: ["Compounding", "Investing", "Education"],
    author: authors.wealthmaze,
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
    author: authors.wealthmaze,
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
    author: authors.wealthmaze,
    relatedCalculators: ["emi-calculator"],
  },
  // 5. Car Savings (Target: Car, Savings, Budgeting)
  {
    slug: "buying-a-car-savings",
    title: "Car Savings Guide: How to Budget and Save for a New Vehicle",
    description: "Planning to buy a car? Calculate your car loan EMIs, down payments, and learn how to save and budget for a new vehicle systematically.",
    publishedAt: "June 18, 2026",
    readTime: "5 min read",
    category: "Savings",
    tags: ["Car Purchase", "Savings", "Budgeting"],
    author: authors.wealthmaze,
    relatedCalculators: ["car-loan-emi-calculator", "rd-calculator", "fd-calculator"],
  },
  // 6. House Savings (Target: House, Savings, Home Loan)
  {
    slug: "buying-a-house-financial-roadmap",
    title: "House Downpayment Roadmap: How to Save and Plan for Your Dream Home",
    description: "Planning to buy a house? Learn how to calculate home loan EMIs, build a down payment savings plan, and budget for your home purchase.",
    publishedAt: "June 18, 2026",
    readTime: "5 min read",
    category: "Savings",
    tags: ["Home Purchase", "Savings", "Home Loan"],
    author: authors.wealthmaze,
    relatedCalculators: ["home-loan-emi-calculator", "sip-calculator", "cagr-calculator"],
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
    author: authors.wealthmaze,
    relatedCalculators: ["income-tax-calculator"],
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
    author: authors.wealthmaze,
    relatedCalculators: ["income-tax-calculator"],
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
    author: authors.wealthmaze,
    relatedCalculators: ["income-tax-calculator"],
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
    author: authors.wealthmaze,
    relatedCalculators: ["rd-calculator"],
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
    author: authors.wealthmaze,
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
    author: authors.wealthmaze,
    relatedCalculators: ["sip-calculator", "stock-return-calculator"],
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
    author: authors.wealthmaze,
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
    author: authors.wealthmaze,
    relatedCalculators: ["emi-calculator", "car-loan-emi-calculator"],
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
    author: authors.wealthmaze,
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
    author: authors.wealthmaze,
    relatedCalculators: ["stock-return-calculator"],
  },
];

export const getPostsByCalculatorId = (calculatorId: string): BlogPost[] => {
  return blogPosts.filter((post) => post.relatedCalculators.includes(calculatorId));
};

export const getPostBySlug = (slug: string): BlogPost | undefined => {
  return blogPosts.find((post) => post.slug === slug);
};
