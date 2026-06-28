import * as React from "react";
import { Metadata } from "next";
import { HomePageClient } from "@/components/HomePageClient";
import { HomeContent } from "@/components/HomeContent";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: siteConfig.metadata.home.title,
  description: siteConfig.metadata.home.description,
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    title: siteConfig.metadata.home.title,
    description: siteConfig.metadata.home.description,
    url: siteConfig.url,
    type: "website",
    siteName: "WealthMaze",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "WealthMaze – Free Financial Calculators for Global Investors",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.metadata.home.title,
    description: siteConfig.metadata.home.description,
    images: ["/og-image.png"],
  },
};

const organizationSchema = JSON.stringify({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteConfig.url}/#organization`,
      "name": "WealthMaze",
      "url": siteConfig.url,
      "logo": {
        "@type": "ImageObject",
        "url": `${siteConfig.url}/favicon.ico`,
        "caption": "WealthMaze - Free Financial Calculators",
      },
      "description": "WealthMaze provides free, accurate financial calculators for SIP, EMI, income tax, retirement, CAGR, and investment planning — built for global investors.",
      "sameAs": [],
    },
    {
      "@type": "WebSite",
      "@id": `${siteConfig.url}/#website`,
      "url": siteConfig.url,
      "name": "WealthMaze",
      "description": "Free financial calculators and investment planning tools for global investors.",
      "publisher": { "@id": `${siteConfig.url}/#organization` },
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": `${siteConfig.url}/calculators?search={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },
  ],
});

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: organizationSchema }} />
      <HomePageClient />
      <HomeContent />
    </>
  );
}
