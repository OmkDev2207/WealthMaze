import * as React from "react";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Financial Disclaimer - WealthMaze Calculators Are Not Financial Advice",
  description: "Important legal disclaimer: WealthMaze calculators provide educational mathematical estimates only. Not professional investment, tax, or financial advice.",
  alternates: { canonical: `${siteConfig.url}/disclaimer` },
  openGraph: {
    title: "Financial Disclaimer - WealthMaze",
    description: "WealthMaze calculators are for educational purposes only. No calculations constitute financial, investment, legal, or tax advice.",
    url: `${siteConfig.url}/disclaimer`,
    type: "website",
    siteName: "WealthMaze",
  },
  twitter: {
    card: "summary_large_image",
    title: "Financial Disclaimer - WealthMaze",
    description: "WealthMaze calculators are for education only — not financial advice.",
  },
};

const breadcrumbSchema = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": siteConfig.url },
    { "@type": "ListItem", "position": 2, "name": "Disclaimer", "item": `${siteConfig.url}/disclaimer` },
  ],
});

export default function DisclaimerPage() {
  const lastUpdated = "June 18, 2026";

  return (
    <>
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
      <header className="border-b border-zinc-150 dark:border-zinc-800 pb-4">
        <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-white">Legal & Financial Disclaimer</h1>
        <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-2 font-medium">Last Updated: {lastUpdated}</p>
      </header>

      <section className="space-y-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
        <h2 className="text-lg font-bold text-zinc-800 dark:text-zinc-200">1. Not Financial or Professional Advice</h2>
        <p>
          The information, calculators, tools, and content provided on <strong>WealthMaze</strong> (wealthmaze.in) are for educational, informational, and illustrative purposes only. Nothing on this website constitutes financial, investment, legal, tax, accounting, or professional advice. 
        </p>
        <p>
          Calculators are mathematical simulation models. The estimates and projections generated are hypothetical, based solely on user inputs and standard financial formulas, and do not represent actual guaranteed future returns, savings, or outcomes.
        </p>

        <h2 className="text-lg font-bold text-zinc-800 dark:text-zinc-200 mt-6">2. No Investment Recommendations</h2>
        <p>
          WealthMaze is completely independent and objective. We do not promote, recommend, or endorse specific mutual fund schemes, direct stocks, exchange-traded funds (ETFs), bonds, cryptocurrencies, insurance policies, or other investment assets. 
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>We do not generate buy, sell, or hold recommendations for any financial instruments.</li>
          <li>All rate of return inputs are entered by the user or preset to standard historic averages solely for convenience. These rates should not be interpreted as predictions of future market performance.</li>
          <li>Investing in equities, mutual funds, debt, and precious metals involves market risks. Principal invested amount can depreciate, and past performance is never a guarantee of future returns.</li>
        </ul>

        <h2 className="text-lg font-bold text-zinc-800 dark:text-zinc-200 mt-6">3. Accuracy of Tax & Debt Estimates</h2>
        <p>
          Tax codes (such as standard deductions, tax regimes, and capital gains exemptions) and loan calculations (like bank interest margins and compounding methods) are complex and subject to policy revisions. WealthMaze updates its systems to reflect standard frameworks, but these calculations may not represent the exact calculations executed by tax authorities (like the Income Tax Department of India) or commercial banking institutions.
        </p>

        <h2 className="text-lg font-bold text-zinc-800 dark:text-zinc-200 mt-6">4. Professional Consultation</h2>
        <p>
          Financial decision-making carries inherent risk. You should always perform your own due diligence and consult with qualified registered financial planners, certified wealth managers, tax practitioners, and legal specialists before making any major financial decisions, commitments, or investment purchases.
        </p>
      </section>
    </article>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbSchema }} />
    </>
  );
}
