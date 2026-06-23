import * as React from "react";
import { Metadata } from "next";
import { allCalculators, getCalculatorById } from "@/data/calculators";
import { programmaticPages, getProgrammaticPageById } from "@/data/programmatic";
import { CalculatorPage } from "@/components/CalculatorPage";
import { notFound as nextNotFound } from "next/navigation";
import { siteConfig } from "@/config/site";
import { generateCalculatorSchema } from "@/lib/calculatorSchema";

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

  let seoTitle = config.seoTitle;
  let seoDescription = config.seoDescription;

  // Map high-CTR overrides
  if (slug === "sip-calculator") {
    seoTitle = siteConfig.metadata.sip.title;
    seoDescription = siteConfig.metadata.sip.description;
  } else if (slug === "emi-calculator") {
    seoTitle = siteConfig.metadata.emi.title;
    seoDescription = siteConfig.metadata.emi.description;
  } else if (slug === "income-tax-calculator") {
    seoTitle = siteConfig.metadata.tax.title;
    seoDescription = siteConfig.metadata.tax.description;
  } else if (slug === "retirement-calculator") {
    seoTitle = siteConfig.metadata.retirement.title;
    seoDescription = siteConfig.metadata.retirement.description;
  } else if (slug === "mutual-fund-return-calculator") {
    seoTitle = siteConfig.metadata.mutualFund.title;
    seoDescription = siteConfig.metadata.mutualFund.description;
  } else if (slug === "cagr-calculator") {
    seoTitle = siteConfig.metadata.cagr.title;
    seoDescription = siteConfig.metadata.cagr.description;
  } else if (slug === "goal-based-investment-calculator") {
    seoTitle = siteConfig.metadata.goal.title;
    seoDescription = siteConfig.metadata.goal.description;
  }

  return {
    title: seoTitle,
    description: seoDescription,
    keywords: [
      config.name,
      config.category,
      "WealthMaze",
      `${config.name} calculator`,
      "financial planner",
      "investment tool",
      seoTitle,
      ...config.name.split(" "),
    ],
    alternates: {
      canonical: `${siteConfig.url}/${config.id}`,
    },
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      type: "website",
      url: `${siteConfig.url}/${config.id}`,
      siteName: "WealthMaze",
    },
    twitter: {
      card: "summary_large_image",
      title: seoTitle,
      description: seoDescription,
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

  // Resolve SEO title/description (same logic as generateMetadata above)
  let seoTitle = config.seoTitle;
  let seoDescription = config.seoDescription;

  if (progConfig) {
    seoTitle = progConfig.seoTitle;
    seoDescription = progConfig.seoDescription;
  } else if (slug === "sip-calculator") {
    seoTitle = siteConfig.metadata.sip.title;
    seoDescription = siteConfig.metadata.sip.description;
  } else if (slug === "emi-calculator") {
    seoTitle = siteConfig.metadata.emi.title;
    seoDescription = siteConfig.metadata.emi.description;
  } else if (slug === "income-tax-calculator") {
    seoTitle = siteConfig.metadata.tax.title;
    seoDescription = siteConfig.metadata.tax.description;
  } else if (slug === "retirement-calculator") {
    seoTitle = siteConfig.metadata.retirement.title;
    seoDescription = siteConfig.metadata.retirement.description;
  } else if (slug === "mutual-fund-return-calculator") {
    seoTitle = siteConfig.metadata.mutualFund.title;
    seoDescription = siteConfig.metadata.mutualFund.description;
  } else if (slug === "cagr-calculator") {
    seoTitle = siteConfig.metadata.cagr.title;
    seoDescription = siteConfig.metadata.cagr.description;
  } else if (slug === "goal-based-investment-calculator") {
    seoTitle = siteConfig.metadata.goal.title;
    seoDescription = siteConfig.metadata.goal.description;
  }

  /**
   * Generate the complete JSON-LD @graph for this calculator page.
   *
   * generateCalculatorSchema() automatically produces:
   *   - WebPage          (name, description, url, dateModified, breadcrumb, mainEntity)
   *   - SoftwareApplication (name, category, subcategory, featureList, audience, free offer, URL)
   *   - BreadcrumbList   (Home → Category → Calculator)
   *   - FAQPage          (every FAQ item from config.faqs)
   *
   * Future calculators: just add a CalculatorConfig to src/data/calculators/*.ts
   * No changes needed in this file or the generator.
   */
  const schemaJson = generateCalculatorSchema({
    config,
    siteUrl: siteConfig.url,
    slug,
    seoTitle,
    seoDescription,
    customName: progConfig?.name,
    customDescription: progConfig?.seoDescription,
  });

  return (
    <>
      {/*
        Single <script> block containing the full @graph JSON-LD.
        Includes: WebPage + SoftwareApplication + BreadcrumbList + FAQPage.
        Validated by: https://validator.schema.org & Google Rich Results Test.
      */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schemaJson }} />

      <CalculatorPage
        calculatorId={calculatorId}
        overrides={progConfig?.defaultOverrides}
        customTitle={progConfig?.name}
        customDescription={progConfig?.seoDescription}
        customEducationalContent={progConfig?.educationalContent}
        slug={slug}
      />
    </>
  );
}
