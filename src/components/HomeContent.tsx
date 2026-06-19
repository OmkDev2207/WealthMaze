import * as React from "react";
import Link from "next/link";
import { HelpCircle, Shield, Award, Landmark, TrendingUp, HelpCircle as HelpIcon, Sparkles } from "lucide-react";
import { siteConfig } from "@/config/site";

export function HomeContent() {
  const faqs = [
    {
      q: "What is a financial calculator and how does it help in planning?",
      a: "A financial calculator is an interactive tool that automates complex mathematical formulas (like future value of annuities, amortization schedules, compound interest, and tax slabs). By inputting your variables, you can estimate compounding wealth growth, determine monthly EMI obligations, compare loan prepayments, and plan retirement targets instantly, removing human calculation errors."
    },
    {
      q: "How does a Systematic Investment Plan (SIP) work?",
      a: "A Systematic Investment Plan (SIP) allows you to invest a fixed amount regularly (monthly or quarterly) into mutual funds. It benefits from Rupee Cost Averaging, where you buy more units when markets are down and fewer when markets are up, averaging your acquisition cost. It also leverages Compounding, where returns earn further returns over time."
    },
    {
      q: "What is the difference between SIP and lumpsum investing?",
      a: "SIP involves investing a fixed sum periodically (averaging market volatility), while lumpsum is a one-time single investment of capital. SIP is ideal for salaried individuals building a regular savings habit, whereas lumpsum is suited for deploying sudden windfalls or inheritance money when market valuations are favorable."
    },
    {
      q: "How is a loan EMI calculated?",
      a: "A loan Equated Monthly Installment (EMI) is calculated using the formula: EMI = [P x r x (1 + r)^n] / [(1 + r)^n - 1]. Where P is the principal loan amount, r is the monthly interest rate (annual interest rate divided by 12 * 100), and n is the total number of monthly payments (tenure in years multiplied by 12)."
    },
    {
      q: "How does loan prepayment help in reducing interest?",
      a: "When you make a loan prepayment, the entire amount goes directly toward reducing your outstanding principal balance. Since monthly interest is calculated as a percentage of the outstanding principal, reducing the principal reduces the interest accumulation, shaving months or years off your tenure."
    },
    {
      q: "What is the 50/30/20 budgeting rule?",
      a: "The 50/30/20 rule is a simple budgeting guideline: allocate 50% of your net income to Needs (housing, utilities, groceries), 30% to Wants (dining out, hobbies, travel), and 20% to Savings, investments, and debt prepayments."
    },
    {
      q: "What is the difference between the Old and New tax regimes in India?",
      a: "The Old Tax Regime offers lower tax rates for lower income brackets and permits various deductions (like Section 80C, 80D, and HRA). The New Tax Regime features simplified, lower tax slabs across the board but eliminates almost all deductions and exemptions. The ideal choice depends on your deductions level."
    },
    {
      q: "What is the 4% rule in retirement planning?",
      a: "The 4% rule is a guideline for retirement withdrawals. It states that if you withdraw 4% of your total retirement portfolio in the first year of retirement, and adjust that amount for inflation in subsequent years, your savings should last at least 30 years without running dry."
    }
  ];

  const faqSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  });

  return (
    <section className="bg-zinc-50/50 dark:bg-zinc-950/40 border-t border-zinc-150 dark:border-zinc-900 py-16 print:hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Why Use WealthMaze Grid */}
        <div className="space-y-8">
          <header className="text-center max-w-3xl mx-auto space-y-2.5">
            <h2 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight">
              Why Use WealthMaze Financial Calculators?
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              High-performance, private, and precise investment planners designed for modern investors.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 bg-white dark:bg-zinc-950 border border-zinc-150 dark:border-zinc-800/80 rounded-2xl space-y-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 text-emerald-500 flex items-center justify-center">
                <Shield className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-zinc-800 dark:text-zinc-100">100% Private & Secure</h3>
              <p className="text-xs text-zinc-400 dark:text-zinc-500 leading-relaxed">
                All calculations are executed locally inside your web browser. We never transmit, store, or sell your net worth details, salary records, or outstanding loan data.
              </p>
            </div>

            <div className="p-5 bg-white dark:bg-zinc-950 border border-zinc-150 dark:border-zinc-800/80 rounded-2xl space-y-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 text-emerald-500 flex items-center justify-center">
                <Award className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-zinc-800 dark:text-zinc-100">Premium Responsive Design</h3>
              <p className="text-xs text-zinc-400 dark:text-zinc-500 leading-relaxed">
                WealthMaze uses a premium dark/light adaptive layout with responsive inputs. Plan your investments seamlessly on a smartphone, tablet, or desktop.
              </p>
            </div>

            <div className="p-5 bg-white dark:bg-zinc-950 border border-zinc-150 dark:border-zinc-800/80 rounded-2xl space-y-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 text-emerald-500 flex items-center justify-center">
                <Landmark className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-zinc-800 dark:text-zinc-100">Verified Financial Algorithms</h3>
              <p className="text-xs text-zinc-400 dark:text-zinc-500 leading-relaxed">
                Our mathematical models conform to standard guidelines from banking regulators and global accounting frameworks, ensuring accurate interest schedules and returns.
              </p>
            </div>
          </div>
        </div>

        {/* Master Financial Planning Guide (1500+ Words) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Extensive Guides */}
          <div className="lg:col-span-8 space-y-12 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-900 p-6 sm:p-8 rounded-3xl">
            
            <article className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-white tracking-tight border-b border-zinc-100 dark:border-zinc-900 pb-3">
                1. Comprehensive Investment Planning & Mutual Fund Compounding
              </h2>
              <p className="text-xs text-zinc-550 dark:text-zinc-400 leading-relaxed">
                Success in investing is rarely about timing the market; it is about time in the market. When you utilize an **investment calculator** or a **mutual fund calculator**, you are examining the math of exponential growth.
              </p>
              <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-500 pt-2">The Power of Systematic Investment Plans (SIP)</h3>
              <p className="text-xs text-zinc-550 dark:text-zinc-400 leading-relaxed">
                A **SIP calculator** helps visualize how small monthly savings build massive long-term wealth. Investing ₹5,000 monthly for 20 years at an expected 12% annual return compounds to approximately ₹50 Lakhs. Crucially, the principal you contribute is only ₹12 Lakhs—the remaining ₹38 Lakhs is the result of compounding interest.
              </p>
              <p className="text-xs text-zinc-550 dark:text-zinc-400 leading-relaxed">
                By automating monthly contributions, you benefit from Rupee Cost Averaging. During stock market dips, your fixed payment buys more mutual fund units; during market peaks, it buys fewer units. This eliminates the stressful need to predict market corrections.
              </p>
              <div className="p-4 bg-zinc-50 dark:bg-zinc-900/60 rounded-xl border border-zinc-150 dark:border-zinc-800 text-[11px] text-zinc-500 dark:text-zinc-400 font-mono">
                Formula: Future Value = P × [ ((1 + i)^n - 1) / i ] × (1 + i)
              </div>
            </article>

            <article className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-white tracking-tight border-b border-zinc-100 dark:border-zinc-900 pb-3">
                2. Debt Management & Loan Interest Minimization (EMI Strategy)
              </h2>
              <p className="text-xs text-zinc-550 dark:text-zinc-400 leading-relaxed">
                Borrowing money can buy assets, but it comes at a cumulative cost. Utilizing an **EMI calculator** allows you to see the true cost of borrowing before signing a mortgage agreement or auto loan contract.
              </p>
              <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-500 pt-2">The Amortization Reality</h3>
              <p className="text-xs text-zinc-550 dark:text-zinc-400 leading-relaxed">
                In the early years of a 20-year home loan, your monthly EMI goes almost entirely toward paying off accumulated interest, not the principal. For a ₹50 Lakh home loan at 8.5% interest, you pay approximately ₹54 Lakhs in interest alone over 20 years—more than doubling the cost of the property.
              </p>
              <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-500 pt-2">Unlocking Savings via Loan Prepayment</h3>
              <p className="text-xs text-zinc-550 dark:text-zinc-400 leading-relaxed">
                By making periodic prepayments (e.g. paying one extra EMI per year, or prepaying 5% of the outstanding principal balance annually), you reduce the outstanding principal directly. Run the numbers on our **loan prepayment calculator** to see how making early repayments saves lakhs in interest and shaves years off the loan tenure.
              </p>
            </article>

            <article className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-white tracking-tight border-b border-zinc-100 dark:border-zinc-900 pb-3">
                3. Tax Planning: Old vs. New Regime Slabs & Capital Gains
              </h2>
              <p className="text-xs text-zinc-550 dark:text-zinc-400 leading-relaxed">
                Tax planning is a core component of overall **wealth planning**. A **tax calculator** helps optimize your income declarations and capital gains liabilities.
              </p>
              <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-500 pt-2">Old vs. New Tax Regimes</h3>
              <p className="text-xs text-zinc-550 dark:text-zinc-400 leading-relaxed">
                Taxpayers in India have the choice of two filing methods:
              </p>
              <ul className="list-disc pl-5 text-xs text-zinc-550 dark:text-zinc-400 space-y-1">
                <li>**Old Tax Regime:** Features higher slab rates but permits tax-deductible exemptions such as Section 80C (PPF, ELSS, Insurance), Section 80D (Health Insurance), and Home Loan Interest under Section 24.</li>
                <li>**New Tax Regime:** Features lower slab rates across the board but eliminates almost all tax deductions.</li>
              </ul>
              <p className="text-xs text-zinc-550 dark:text-zinc-400 leading-relaxed">
                Our **income tax calculator** lets you compute both options side-by-side to identify which regime minimizes your annual tax liability.
              </p>
            </article>

            <article className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-white tracking-tight border-b border-zinc-100 dark:border-zinc-900 pb-3">
                4. Long-Term Retirement Planning & The FIRE Movement
              </h2>
              <p className="text-xs text-zinc-550 dark:text-zinc-400 leading-relaxed">
                Retirement is no longer an age—it is a financial state. With a **retirement calculator** or a **FIRE calculator** (Financial Independence, Retire Early), you can identify your ultimate wealth target.
              </p>
              <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-500 pt-2">The Multiplier & The 4% Rule</h3>
              <p className="text-xs text-zinc-550 dark:text-zinc-400 leading-relaxed">
                To achieve financial independence, you typically need a retirement pool equal to **25x to 30x of your annual living expenses**. According to the Trinity Study (the 4% rule), a diversified portfolio of stocks and debt assets can support a 4% inflation-adjusted withdrawal rate annually for 30+ years without depleting the core principal.
              </p>
              <p className="text-xs text-zinc-550 dark:text-zinc-400 leading-relaxed">
                By entering your target monthly expenses, current savings rate, and expected inflation adjustments, our retirement planners show you exactly how many years remain until you reach your financial freedom milestone.
              </p>
            </article>

          </div>

          {/* Right Column: FAQ Archive */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-zinc-50 dark:bg-zinc-900/30 border border-zinc-150 dark:border-zinc-800 p-5 rounded-2xl space-y-5">
              <div className="flex items-center space-x-2">
                <HelpIcon className="h-5 w-5 text-emerald-500 shrink-0" />
                <h3 className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-wider">
                  FAQ - Frequently Asked Questions
                </h3>
              </div>

              <div className="space-y-4 max-h-[800px] overflow-y-auto pr-1">
                {faqs.map((faq, idx) => (
                  <div key={idx} className="space-y-2 border-b border-zinc-200/50 dark:border-zinc-800/80 pb-3.5 last:border-none last:pb-0">
                    <h4 className="text-xs font-extrabold text-zinc-800 dark:text-zinc-200 leading-snug">
                      {faq.q}
                    </h4>
                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
