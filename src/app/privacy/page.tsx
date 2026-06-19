import * as React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Privacy Policy - How WealthMaze Handles Your Data",
  description: "Read WealthMaze's Privacy Policy. We collect no personal financial data. Understand how Google Analytics and AdSense cookies work on our platform.",
  alternates: { canonical: `${siteConfig.url}/privacy` },
  openGraph: {
    title: "Privacy Policy - WealthMaze",
    description: "WealthMaze collects no personal financial data. All calculations run locally in your browser. Read our full privacy policy.",
    url: `${siteConfig.url}/privacy`,
    type: "website",
    siteName: "WealthMaze",
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy - WealthMaze",
    description: "WealthMaze collects no personal financial data. All calculations run locally in your browser.",
  },
};

const breadcrumbSchema = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": siteConfig.url },
    { "@type": "ListItem", "position": 2, "name": "Privacy Policy", "item": `${siteConfig.url}/privacy` },
  ],
});

export default function PrivacyPage() {
  const lastUpdated = "June 18, 2026";

  return (
    <>
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
      <header className="border-b border-zinc-150 dark:border-zinc-800 pb-4">
        <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-white">Privacy Policy</h1>
        <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-2 font-medium">Last Updated: {lastUpdated}</p>
      </header>

      <section className="space-y-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
        <p>
          At <strong>WealthMaze</strong> (accessible from wealthmaze.vercel.app), one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by WealthMaze and how we use it.
        </p>

        <h2 className="text-lg font-bold text-zinc-800 dark:text-zinc-200 mt-6">1. Log Files &amp; Analytics</h2>
        <p>
          WealthMaze uses third-party analytics services including <strong>Google Analytics 4</strong> and <strong>Vercel Web Analytics</strong>. These services log aggregated, anonymised visitor data including browser type, referring pages, and session duration. This data is not linked to any personally identifiable information and is used solely for understanding how users interact with the site to improve it.
        </p>

        <h2 className="text-lg font-bold text-zinc-800 dark:text-zinc-200 mt-6">2. Financial Data Privacy</h2>
        <p>
          <strong>WealthMaze does not collect, store, or transmit any financial data you enter into our calculators.</strong> All computations — including salary figures, loan amounts, investment amounts, and tax calculations — are performed entirely within your local web browser session. No calculator inputs are sent to our servers.
        </p>

        <h2 className="text-lg font-bold text-zinc-800 dark:text-zinc-200 mt-6">3. Cookies and Web Beacons</h2>
        <p>
          Like any other website, WealthMaze uses cookies. These cookies are used to store your preference settings (such as light/dark mode) and to support the operation of our advertising partner. The information gathered by cookies is used to optimize your experience based on browser type.
        </p>

        <h2 className="text-lg font-bold text-zinc-800 dark:text-zinc-200 mt-6">4. Google AdSense &amp; DART Cookies</h2>
        <p>
          Google, as a third-party vendor, uses cookies (known as DART cookies) to serve ads based upon visits to wealthmaze.vercel.app and other sites on the internet. Visitors may choose to decline DART cookies by visiting the Google ad and content network Privacy Policy at:{" "}
          <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-emerald-500 hover:underline">
            https://policies.google.com/technologies/ads
          </a>.
        </p>

        <h2 className="text-lg font-bold text-zinc-800 dark:text-zinc-200 mt-6">5. Our Advertising Partners</h2>
        <p>
          WealthMaze displays advertisements served by <strong>Google AdSense</strong>. Google AdSense uses cookies and web beacons to measure advertising effectiveness. Their use of your data is governed by Google's Privacy Policy. We do not have access to or control over cookies placed by advertising partners.
        </p>

        <h2 className="text-lg font-bold text-zinc-800 dark:text-zinc-200 mt-6">6. Third-Party Privacy Policies</h2>
        <p>
          WealthMaze's Privacy Policy does not apply to third-party advertisers or external websites we may link to. We advise you to consult the respective Privacy Policies of these third-party services for more detailed information.
        </p>

        <h2 className="text-lg font-bold text-zinc-800 dark:text-zinc-200 mt-6">7. Children's Privacy</h2>
        <p>
          WealthMaze does not knowingly collect any personally identifiable information from children under the age of 13. We encourage parents and guardians to monitor and guide their children's online activity.
        </p>

        <h2 className="text-lg font-bold text-zinc-800 dark:text-zinc-200 mt-6">8. Contact Us</h2>
        <p>
          If you have questions about this Privacy Policy, please contact us via our{" "}
          <Link href="/contact" className="text-emerald-500 hover:underline">Contact page</Link>.
        </p>
      </section>
    </article>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbSchema }} />
    </>
  );
}
