import * as React from "react";
import { Metadata } from "next";
import { allCalculators, getCalculatorById } from "@/data/calculators";
import { CalculatorPage } from "@/components/CalculatorPage";
import { notFound as nextNotFound } from "next/navigation";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return allCalculators.map((calc) => ({
    slug: calc.id,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const config = getCalculatorById(resolvedParams.slug);

  if (!config) {
    return { title: "Calculator Not Found - WealthMaze" };
  }

  return {
    title: config.seoTitle,
    description: config.seoDescription,
    alternates: {
      canonical: `https://wealthmaze.com/${config.id}`,
    },
    openGraph: {
      title: config.seoTitle,
      description: config.seoDescription,
      type: "website",
      url: `https://wealthmaze.com/${config.id}`,
      siteName: "WealthMaze",
    },
    twitter: {
      card: "summary_large_image",
      title: config.seoTitle,
      description: config.seoDescription,
    },
    // JSON-LD injected via other prop instead of script tags in render tree
  };
}

export default async function CalculatorSlugPage({ params }: PageProps) {
  const resolvedParams = await params;
  const config = getCalculatorById(resolvedParams.slug);

  if (!config) {
    nextNotFound();
  }

  // Build JSON-LD schemas as strings for injection via dangerouslySetInnerHTML
  // These are placed directly in <head> via Next.js metadata + raw approach below
  const faqSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": config.faqs.map((faq: { question: string; answer: string }) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": { "@type": "Answer", "text": faq.answer },
    })),
  });

  const toolSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FinancialProduct",
    "name": config.name,
    "description": config.description,
    "provider": {
      "@type": "Organization",
      "name": "WealthMaze",
      "url": "https://wealthmaze.com",
    },
  });

  const breadcrumbSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://wealthmaze.com" },
      { "@type": "ListItem", "position": 2, "name": config.name, "item": `https://wealthmaze.com/${config.id}` },
    ],
  });

  return (
    <>
      {/*
        Next.js App Router Server Components CAN render <script> tags with
        dangerouslySetInnerHTML as long as they are in a Server Component (no "use client").
        This page is a Server Component, so this is correct and recommended for JSON-LD.
      */}
      {/* eslint-disable-next-line @next/next/no-before-interactive-script-outside-document */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toolSchema }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbSchema }} />

      <CalculatorPage calculatorId={config.id} />
    </>
  );
}
