import * as React from "react";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "About WealthMaze - Free Financial Calculators for Indian Investors",
  description: "Learn about WealthMaze's mission to make financial planning accessible. Free SIP, EMI, tax, and retirement calculators built for Indian investors.",
  alternates: { canonical: `${siteConfig.url}/about` },
  openGraph: {
    title: "About WealthMaze - Free Financial Calculators",
    description: "WealthMaze provides free, accurate financial calculators for SIP, EMI, tax, and retirement planning. 100% private, zero data collection.",
    url: `${siteConfig.url}/about`,
    type: "website",
    siteName: "WealthMaze",
  },
  twitter: {
    card: "summary_large_image",
    title: "About WealthMaze - Free Financial Calculators",
    description: "WealthMaze provides free, accurate financial calculators. 100% private, zero data collection.",
  },
};

const breadcrumbSchema = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": siteConfig.url },
    { "@type": "ListItem", "position": 2, "name": "About WealthMaze", "item": `${siteConfig.url}/about` },
  ],
});

export default function AboutPage() {
  return (
    <>
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <header className="border-b border-zinc-150 dark:border-zinc-800 pb-4">
        <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-white">About WealthMaze</h1>
        <p className="text-sm text-zinc-400 dark:text-zinc-500 mt-2 font-medium">Calculate Your Financial Future</p>
      </header>

      <section className="space-y-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
        <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-200">Our Mission</h2>
        <p>
          At <strong>WealthMaze</strong>, our mission is to become the fastest, cleanest, and most useful financial calculator platform for investors and savers worldwide. We believe that navigating complex personal finance decisions shouldn&apos;t require complex spreadsheet templates or high-priced consultants. 
        </p>
        <p>
          WealthMaze helps users navigate complex financial decisions through simple, accurate, and easy-to-use calculators. By offering high-UX slider controls, interactive charts, and clear breakdowns, we make planning for SIPs, home loans, retirement milestones, and income taxes accessible to everyone.
        </p>

        <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-200 mt-8">Why Users Choose WealthMaze</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>No Hidden Costs or Account Signups</strong>: All 40+ calculators are completely free to use, require zero personal registration, and operate instantly in the browser.</li>
          <li><strong>Data Privacy first</strong>: We do not store or collect your financial data or inputs. All computations run directly on your device, ensuring maximum security.</li>
          <li><strong>Mobile First Design</strong>: Built with responsive grids so that you can plan your financial future from your smartphone, tablet, or desktop.</li>
          <li><strong>Latest Regulations</strong>: We continuously review and update our calculation engines to reflect the latest rules, such as the New Tax Regime slabs and capital gains updates.</li>
        </ul>

        <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-200 mt-8">Our Editorial & Calculation Standards</h2>
        <p>
          To maintain absolute trust, all mathematical engines on WealthMaze are designed in-house by financial engineering professionals and cross-verified against official regulations and banking standards. Our educational content is entirely original, written with a focus on objectivity, clarity, and user value. We strictly maintain a non-sponsored stance and do not recommend specific stocks, mutual funds, or brokers.
        </p>
      </section>
    </article>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbSchema }} />
    </>
  );
}
