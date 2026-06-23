import * as React from "react";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Editorial Policy - Content Standards & Ethics | WealthMaze",
  description: "Learn about WealthMaze's editorial guidelines. We maintain strict financial objectivity, fact-check calculators, and ensure expert oversight.",
  alternates: { canonical: `${siteConfig.url}/editorial-policy` },
  openGraph: {
    title: "Editorial Policy - WealthMaze",
    description: "WealthMaze's content creation, fact-checking, and objectivity guidelines for personal finance tools and guides.",
    url: `${siteConfig.url}/editorial-policy`,
    type: "website",
    siteName: "WealthMaze",
  },
  twitter: {
    card: "summary_large_image",
    title: "Editorial Policy - WealthMaze",
    description: "WealthMaze's content standards, fact-checking procedures, and financial objectivity ethics.",
  },
};

const breadcrumbSchema = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": siteConfig.url },
    { "@type": "ListItem", "position": 2, "name": "Editorial Policy", "item": `${siteConfig.url}/editorial-policy` },
  ],
});

export default function EditorialPolicyPage() {
  const lastUpdated = "June 23, 2026";

  return (
    <>
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <header className="border-b border-zinc-150 dark:border-zinc-800 pb-4">
          <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-white">Editorial Policy</h1>
          <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-2 font-medium">Last Updated: {lastUpdated}</p>
        </header>

        <section className="space-y-6 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
          <p>
            At <strong>WealthMaze</strong> (wealthmaze.in), we are committed to providing our users with highly accurate, objective, and clear financial calculators and educational guides. Because our tools cover subjects related to personal finance, taxation, lending, and retirement planning, we recognize that our content falls under the **YMYL (Your Money or Your Life)** category. We hold ourselves to the highest E-E-A-T standards to protect our users and maintain their trust.
          </p>

          <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-200 mt-8">1. Core Editorial Principles</h2>
          <div className="space-y-4 pl-4 border-l-2 border-emerald-500">
            <p>
              <strong>Accuracy First:</strong> Financial calculations and comparative facts are verified against current regulations, government circulars, and standard banking formulations. 
            </p>
            <p>
              <strong>Absolute Objectivity:</strong> WealthMaze maintains a non-sponsored stance. We do not promote specific brokers, funds, or products. Our recommendations are strictly mathematical and neutral.
            </p>
            <p>
              <strong>User Empowerment:</strong> We write to clarify, not to sell. Our goal is to break down complex financial concepts (such as compounding mechanics and amortization schedules) into simple terms.
            </p>
          </div>

          <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-200 mt-8">2. Content Sourcing & Reference Guidelines</h2>
          <p>
            All educational guides and calculations on WealthMaze rely exclusively on primary, highly authoritative sources:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Indian Tax Slabs & Codes</strong>: Directly sourced from the Income Tax Department of India (incometaxindia.gov.in) and official Finance Bills.</li>
            <li><strong>Savings Schemes Parameters</strong>: Sourced from the National Savings Institute and Ministry of Finance circulars (for PPF, Senior Citizen Savings Schemes, and RD interest structures).</li>
            <li><strong>Regulatory Guidelines</strong>: Adhering strictly to policies issued by the Reserve Bank of India (RBI) for lending/EMIs and the Securities and Exchange Board of India (SEBI) for mutual fund structures.</li>
          </ul>

          <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-200 mt-8">3. AI Content & Editorial Safety Guidelines</h2>
          <p>
            To combat "thin content" and ensure practical, human-written value:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>We do not publish automated, generic, or low-utility AI text templates.</li>
            <li>Generative tools are used exclusively as writing accelerators. All calculations, data tables, and advisory points undergo strict review and verification by financial specialists before publication.</li>
            <li>We enrich all guides with real-world scenarios, mathematical formula breakdowns, and warning boxes outlining specific financial limitations.</li>
          </ul>

          <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-200 mt-8">4. Correction & Revision Policies</h2>
          <p>
            If a policy changes (such as an interest rate adjustment or slab revision), we update our database immediately. Users who identify calculation inconsistencies or text errors are encouraged to report them at <strong>{siteConfig.email}</strong>. Once verified, corrections are published within 24–48 hours, and a record of the update is retained in our internal logs.
          </p>

          <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-200 mt-8">5. Disclosures & Risk Warnings</h2>
          <p>
            All interactive widgets and comparison tables on WealthMaze display mandatory risk disclosures. While we strive to present accurate calculations, our outputs are mathematical simulations and should not be used as a substitute for certified financial or tax advisory consultations.
          </p>
        </section>
      </article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbSchema }} />
    </>
  );
}
