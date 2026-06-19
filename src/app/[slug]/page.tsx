import * as React from "react";
import { Metadata } from "next";
import { allCalculators, getCalculatorById } from "@/data/calculators";
import { programmaticPages, getProgrammaticPageById } from "@/data/programmatic";
import { CalculatorPage } from "@/components/CalculatorPage";
import { notFound as nextNotFound } from "next/navigation";
import { siteConfig } from "@/config/site";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const calculatorParams = allCalculators.map((calc) => ({
    slug: calc.id,
  }));
  const programmaticParams = programmaticPages.map((page) => ({
    slug: page.id,
  }));
  return [...calculatorParams, ...programmaticParams];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  const progConfig = getProgrammaticPageById(slug);
  if (progConfig) {
    return {
      title: progConfig.seoTitle,
      description: progConfig.seoDescription,
      keywords: [
        progConfig.name,
        "WealthMaze",
        "financial calculator",
        "SIP planner",
        "investment tool",
        progConfig.seoTitle,
        ...progConfig.name.split(" "),
      ],
      alternates: {
        canonical: `${siteConfig.url}/${progConfig.id}`,
      },
      openGraph: {
        title: progConfig.seoTitle,
        description: progConfig.seoDescription,
        type: "website",
        url: `${siteConfig.url}/${progConfig.id}`,
        siteName: "WealthMaze",
      },
      twitter: {
        card: "summary_large_image",
        title: progConfig.seoTitle,
        description: progConfig.seoDescription,
      },
    };
  }

  const config = getCalculatorById(slug);
  if (!config) {
    return { title: "Calculator Not Found - WealthMaze" };
  }

  return {
    title: config.seoTitle,
    description: config.seoDescription,
    keywords: [
      config.name,
      config.category,
      "WealthMaze",
      `${config.name} calculator`,
      "financial planner",
      "investment tool",
      config.seoTitle,
      ...config.name.split(" "),
    ],
    alternates: {
      canonical: `${siteConfig.url}/${config.id}`,
    },
    openGraph: {
      title: config.seoTitle,
      description: config.seoDescription,
      type: "website",
      url: `${siteConfig.url}/${config.id}`,
      siteName: "WealthMaze",
    },
    twitter: {
      card: "summary_large_image",
      title: config.seoTitle,
      description: config.seoDescription,
    },
  };
}

export default async function CalculatorSlugPage({ params }: PageProps) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  const progConfig = getProgrammaticPageById(slug);
  const calculatorId = progConfig ? progConfig.parentCalculatorId : slug;
  const config = getCalculatorById(calculatorId);

  if (!config) {
    nextNotFound();
  }

  // Build JSON-LD schemas as strings for injection via dangerouslySetInnerHTML
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
    "name": progConfig ? progConfig.name : config.name,
    "description": progConfig ? progConfig.seoDescription : config.description,
    "provider": {
      "@type": "Organization",
      "name": "WealthMaze",
      "url": siteConfig.url,
    },
  });

  const breadcrumbSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": siteConfig.url },
      {
        "@type": "ListItem",
        "position": 2,
        "name": progConfig ? progConfig.name : config.name,
        "item": `${siteConfig.url}/${progConfig ? progConfig.id : config.id}`,
      },
    ],
  });

  return (
    <>
      {/* Next.js App Router Server Components JSON-LD injection */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toolSchema }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbSchema }} />

      <CalculatorPage
        calculatorId={calculatorId}
        overrides={progConfig?.defaultOverrides}
        customTitle={progConfig?.name}
        customDescription={progConfig?.seoDescription}
        customEducationalContent={progConfig?.educationalContent}
      />
    </>
  );
}
