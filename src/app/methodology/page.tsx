import * as React from "react";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Calculator Methodology & Formulas - Mathematical Logic | WealthMaze",
  description: "Read our Calculator Methodology. We disclose the exact mathematical formulas, compounding rules, and loan amortization methods used by our calculators.",
  alternates: { canonical: `${siteConfig.url}/methodology` },
  openGraph: {
    title: "Calculator Methodology - WealthMaze",
    description: "Mathematical explanations and compounding formulas for SIP, lumpsum, CAGR, EPF, PPF, and reducing-balance loan EMIs.",
    url: `${siteConfig.url}/methodology`,
    type: "website",
    siteName: "WealthMaze",
  },
  twitter: {
    card: "summary_large_image",
    title: "Calculator Methodology - WealthMaze",
    description: "WealthMaze's mathematical logic, compounding formulas, and calculation standards.",
  },
};

const breadcrumbSchema = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": siteConfig.url },
    { "@type": "ListItem", "position": 2, "name": "Methodology", "item": `${siteConfig.url}/methodology` },
  ],
});

export default function MethodologyPage() {
  const lastUpdated = "June 23, 2026";

  return (
    <>
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <header className="border-b border-zinc-150 dark:border-zinc-800 pb-4">
          <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-white">Calculator Methodology &amp; Mathematical Logic</h1>
          <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-2 font-medium">Last Updated: {lastUpdated}</p>
        </header>

        <section className="space-y-6 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
          <p>
            WealthMaze believes in complete mathematical transparency. We do not use black-box code structures or arbitrary values. This page details the standard financial and algebraic formulas, compounding schedules, and parameters that govern our calculator engines.
          </p>

          {/* 1. Investing */}
          <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-200 mt-8 border-b border-zinc-100 dark:border-zinc-800 pb-2">
            1. Systematic Investment Plan (SIP) &amp; Compounding
          </h2>
          <div className="space-y-4">
            <p>
              Our <strong>SIP Calculator</strong> uses the Future Value (FV) of an annuity due formula. Since contributions are made at the beginning of each monthly interval, the formula is:
            </p>
            <div className="p-4 bg-zinc-50 dark:bg-zinc-900/50 rounded-xl font-mono text-center text-xs text-zinc-800 dark:text-zinc-200">
              FV = P &times; [ ((1 + i)<sup>n</sup> - 1) / i ] &times; (1 + i)
            </div>
            <p className="text-xs text-zinc-500 pl-4">
              Where:<br />
              - <strong>FV</strong> = Future Value (total maturity value)<br />
              - <strong>P</strong> = Monthly contribution amount<br />
              - <strong>i</strong> = Monthly interest rate (expected annual rate / 12 / 100)<br />
              - <strong>n</strong> = Total number of monthly installments (time period in years &times; 12)
            </p>
            <p>
              For <strong>Lumpsum / Compound Interest</strong> calculations, we use standard compound growth:
            </p>
            <div className="p-4 bg-zinc-50 dark:bg-zinc-900/50 rounded-xl font-mono text-center text-xs text-zinc-800 dark:text-zinc-200">
              A = P &times; (1 + r/n)<sup>n &times; t</sup>
            </div>
            <p className="text-xs text-zinc-500 pl-4">
              Where:<br />
              - <strong>A</strong> = Maturity Amount<br />
              - <strong>P</strong> = Principal investment amount<br />
              - <strong>r</strong> = Annual nominal interest rate (decimal form)<br />
              - <strong>n</strong> = Compounding frequency per year (e.g., 12 for monthly, 4 for quarterly)<br />
              - <strong>t</strong> = Tenure in years
            </p>
          </div>

          {/* 2. Loans */}
          <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-200 mt-8 border-b border-zinc-100 dark:border-zinc-800 pb-2">
            2. Loan EMI &amp; Amortization
          </h2>
          <div className="space-y-4">
            <p>
              Equated Monthly Installments (EMI) are calculated strictly under the <strong>reducing-balance method</strong>. The formula is:
            </p>
            <div className="p-4 bg-zinc-50 dark:bg-zinc-900/50 rounded-xl font-mono text-center text-xs text-zinc-800 dark:text-zinc-200">
              EMI = P &times; r &times; [ (1 + r)<sup>n</sup> / ((1 + r)<sup>n</sup> - 1) ]
            </div>
            <p className="text-xs text-zinc-500 pl-4">
              Where:<br />
              - <strong>P</strong> = Outstanding loan principal amount<br />
              - <strong>r</strong> = Monthly interest rate (annual interest rate / 12 / 100)<br />
              - <strong>n</strong> = Loan tenure in months (years &times; 12)
            </p>
            <p>
              <strong>Amortization Timeline Calculation:</strong> For each monthly payment interval:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Interest Portion = Outstanding Principal &times; Monthly Interest Rate</li>
              <li>Principal Portion = EMI - Interest Portion</li>
              <li>Ending Principal = Beginning Principal - Principal Portion</li>
            </ul>
          </div>

          {/* 3. Stocks & CAGR */}
          <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-200 mt-8 border-b border-zinc-100 dark:border-zinc-800 pb-2">
            3. Compound Annual Growth Rate (CAGR)
          </h2>
          <div className="space-y-4">
            <p>
              To evaluate annualized performance of mutual funds, stocks, or real estate assets, the CAGR formula is:
            </p>
            <div className="p-4 bg-zinc-50 dark:bg-zinc-900/50 rounded-xl font-mono text-center text-xs text-zinc-800 dark:text-zinc-200">
              CAGR = (End Value / Start Value)<sup>(1 / t)</sup> - 1
            </div>
            <p className="text-xs text-zinc-500 pl-4">
              Where:<br />
              - <strong>End Value</strong> = Current/maturity asset value<br />
              - <strong>Start Value</strong> = Initial investment cost<br />
              - <strong>t</strong> = Total duration of holding in years (decimal format allowed)
            </p>
          </div>

          {/* 4. Tax */}
          <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-200 mt-8 border-b border-zinc-100 dark:border-zinc-800 pb-2">
            4. Indian Income Tax &amp; Capital Gains Slabs
          </h2>
          <div className="space-y-4">
            <p>
              Tax engines process progressive income brackets (slabs) by applying different tax rates sequentially.
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>New Tax Regime (Section 115BAC)</strong>: Computes tax liabilities based on the progressive slabs updated in the Union Budget Finance Act, with standard deductions automatically factored.</li>
              <li><strong>Old Tax Regime</strong>: Computes tax liabilities including Chapter VI-A deductions (e.g. Section 80C, 80D) as entered by the user.</li>
              <li><strong>Long-Term Capital Gains (LTCG)</strong>: Factored at 12.5% for equity assets (with exemptions up to ₹1.25 Lakhs per financial year) and 20% with indexation or 12.5% without indexation for debt/gold assets in accordance with latest directives.</li>
            </ul>
          </div>

          <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-200 mt-8">5. Disclosures regarding rounding</h2>
          <p>
            To optimize performance and simplify user readability, minor values are rounded to the nearest integer. Actual banking calculations may show tiny variances depending on day count conventions (such as Actual/365 or 30/360 interest bases) and compound rounding intervals.
          </p>
        </section>
      </article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbSchema }} />
    </>
  );
}
