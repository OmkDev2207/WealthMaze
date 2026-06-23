import * as React from "react";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Content Update Policy - Frequency & Data Audits | WealthMaze",
  description: "Read our Content Update Policy. We explain how our finance calculators, tax models, and blog guides are regularly audited for policy changes.",
  alternates: { canonical: `${siteConfig.url}/content-update-policy` },
  openGraph: {
    title: "Content Update Policy - WealthMaze",
    description: "Transparency guidelines explaining our database review schedules for tax regulations, loan terms, and interest rates.",
    url: `${siteConfig.url}/content-update-policy`,
    type: "website",
    siteName: "WealthMaze",
  },
  twitter: {
    card: "summary_large_image",
    title: "Content Update Policy - WealthMaze",
    description: "WealthMaze's parameter updates and review schedules for financial calculator engines.",
  },
};

const breadcrumbSchema = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": siteConfig.url },
    { "@type": "ListItem", "position": 2, "name": "Content Update Policy", "item": `${siteConfig.url}/content-update-policy` },
  ],
});

export default function ContentUpdatePolicyPage() {
  const lastUpdated = "June 23, 2026";

  return (
    <>
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <header className="border-b border-zinc-150 dark:border-zinc-800 pb-4">
          <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-white">Content Update & Database Policy</h1>
          <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-2 font-medium">Last Updated: {lastUpdated}</p>
        </header>

        <section className="space-y-6 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
          <p>
            At <strong>WealthMaze</strong>, accuracy is our foundation. Because financial regulations, interest rates, and tax policies change frequently, we follow a strict content review protocol to ensure our calculations and text guides remain up to date. This policy discloses our audit intervals and updating procedures.
          </p>

          <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-200 mt-8">1. Regular Slabs & Parameter Audits</h2>
          <p>
            Our core calculator engines rely on regulatory variables (such as tax regimes and contribution rates). These parameters are audited on the following schedules:
          </p>
          <div className="overflow-x-auto rounded-lg border border-zinc-150 dark:border-zinc-800">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-zinc-50 dark:bg-zinc-900 border-b border-zinc-150 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 font-semibold">
                  <th className="p-3">Data / Parameter Type</th>
                  <th className="p-3">Audit Frequency</th>
                  <th className="p-3">Primary Source Trigger</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-150 dark:divide-zinc-800">
                <tr className="hover:bg-zinc-50/50 dark:hover:bg-zinc-900/10">
                  <td className="p-3 font-semibold text-zinc-800 dark:text-zinc-200">Income Tax Slabs (India)</td>
                  <td className="p-3">Annual (or immediately upon policy changes)</td>
                  <td className="p-3">Union Budget Finance Bill announcements (Ministry of Finance)</td>
                </tr>
                <tr className="hover:bg-zinc-50/50 dark:hover:bg-zinc-900/10">
                  <td className="p-3 font-semibold text-zinc-800 dark:text-zinc-200">PPF & Small Savings Schemes Rates</td>
                  <td className="p-3">Quarterly</td>
                  <td className="p-3">Ministry of Finance quarterly interest rate circulars</td>
                </tr>
                <tr className="hover:bg-zinc-50/50 dark:hover:bg-zinc-900/10">
                  <td className="p-3 font-semibold text-zinc-800 dark:text-zinc-200">EPF & NPS Thresholds</td>
                  <td className="p-3">Annual</td>
                  <td className="p-3">EPFO announcements and PFRDA regulatory circulars</td>
                </tr>
                <tr className="hover:bg-zinc-50/50 dark:hover:bg-zinc-900/10">
                  <td className="p-3 font-semibold text-zinc-800 dark:text-zinc-200">Inflation / Price Indices</td>
                  <td className="p-3">Bi-annual</td>
                  <td className="p-3">Ministry of Statistics and Programme Implementation (MoSPI) data releases</td>
                </tr>
                <tr className="hover:bg-zinc-50/50 dark:hover:bg-zinc-900/10">
                  <td className="p-3 font-semibold text-zinc-800 dark:text-zinc-200">EMI & Lending Parameters</td>
                  <td className="p-3">Monthly / Bi-monthly</td>
                  <td className="p-3">RBI Repo Rate reviews and major commercial bank lending rate updates</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-200 mt-8">2. Content Review & Revision Pipeline</h2>
          <p>
            When a financial parameter is modified (e.g. standard deductions increase or capital gains exemptions change):
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Step 1 (Code Update)</strong>: Our software engineers update the mathematical formulas and default parameters in our data stores (such as `src/data/calculators/tax.ts`).</li>
            <li><strong>Step 2 (Testing)</strong>: We run automated test checks simulating inputs to confirm mathematical accuracy.</li>
            <li><strong>Step 3 (Guide Alignment)</strong>: All explanatory blog articles and guides referencing that parameter are updated simultaneously, and the "Last Updated" timestamp on the page is updated.</li>
          </ul>

          <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-200 mt-8">3. AI-Drafted Articles Refresh Policy</h2>
          <p>
            WealthMaze periodically audits its blog library to verify E-E-A-T relevance. We check our articles for outdated statistics, broken links, or generic paragraphs. If an article is updated with new regulatory information, the revision date is logged, and a note indicating the update is appended to the post.
          </p>

          <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-200 mt-8">4. Feedback & User Reports</h2>
          <p>
            We appreciate user feedback. If you discover a math mismatch or out-of-date guideline, please contact us at <strong>{siteConfig.email}</strong>. We review all reports and update verified bugs immediately.
          </p>
        </section>
      </article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbSchema }} />
    </>
  );
}
