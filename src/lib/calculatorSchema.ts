/**
 * WealthMaze — Calculator JSON-LD Schema Generator
 * =================================================
 * Generates complete, Google-validated structured data for every calculator page.
 *
 * Schemas emitted per calculator:
 *   1. SoftwareApplication  — tool name, category, URL, free offer
 *   2. FAQPage              — all FAQ items from calculator config
 *   3. BreadcrumbList       — Home → [Category] → [Calculator]
 *   4. WebPage              — ties everything together with dateModified + keywords
 *
 * HOW TO USE:
 *   import { generateCalculatorSchema } from "@/lib/calculatorSchema";
 *   const schemaJson = generateCalculatorSchema({ config, siteUrl, slug, seoTitle, seoDescription });
 *   <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schemaJson }} />
 *
 * FUTURE CALCULATORS:
 *   Just add a new CalculatorConfig entry to src/data/calculators/*.ts.
 *   Schema is generated automatically — no manual changes needed here.
 */

import { CalculatorConfig, FAQItem } from "@/data/calculators/types";

// ─────────────────────────────────────────────────────────────────────────────
// Category → schema.org applicationSubCategory mapping
// ─────────────────────────────────────────────────────────────────────────────
const CATEGORY_TO_SUBCATEGORY: Record<string, string> = {
  Investing:      "Investment Calculator",
  Retirement:     "Retirement Planning Calculator",
  Savings:        "Savings & Deposit Calculator",
  Loans:          "Loan & EMI Calculator",
  Tax:            "Tax Calculation Tool",
  "Stock Market": "Stock Market Analysis Tool",
  Gold:           "Commodity Investment Calculator",
  Lifestyle:      "Financial Goal Planner",
  "Mutual Funds": "Mutual Fund Return Calculator",
};

// ─────────────────────────────────────────────────────────────────────────────
// Category → audience description
// ─────────────────────────────────────────────────────────────────────────────
const CATEGORY_TO_AUDIENCE: Record<string, string> = {
  Investing:      "Retail investors, mutual fund investors, beginner investors",
  Retirement:     "Working professionals planning retirement, FIRE seekers",
  Savings:        "Fixed income investors, salaried individuals, savers",
  Loans:          "Home loan borrowers, personal loan applicants, car buyers",
  Tax:            "Indian taxpayers, salaried employees, self-employed individuals",
  "Stock Market": "Stock market investors, equity traders, portfolio managers",
  Gold:           "Gold investors, commodity buyers, inflation hedgers",
  Lifestyle:      "Financial planners, goal-oriented savers, wealth builders",
  "Mutual Funds": "Mutual fund investors, SIP investors, passive investors",
};

// ─────────────────────────────────────────────────────────────────────────────
// Interface for the generator input
// ─────────────────────────────────────────────────────────────────────────────
export interface CalculatorSchemaInput {
  /** Full CalculatorConfig from src/data/calculators */
  config: CalculatorConfig;
  /** The canonical base URL (e.g. https://wealthmaze.in) */
  siteUrl: string;
  /** The URL slug for this calculator (e.g. "sip-calculator") */
  slug: string;
  /** Final resolved SEO title (may be override from siteConfig.metadata) */
  seoTitle: string;
  /** Final resolved SEO description */
  seoDescription: string;
  /** Optional: name override for programmatic pages */
  customName?: string;
  /** Optional: description override for programmatic pages */
  customDescription?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Main generator — returns a single minified JSON-LD string
// ─────────────────────────────────────────────────────────────────────────────
export function generateCalculatorSchema(input: CalculatorSchemaInput): string {
  const { config, siteUrl, slug, seoTitle, seoDescription, customName, customDescription } = input;

  const name        = customName ?? config.name;
  const description = customDescription ?? config.seoDescription;
  const pageUrl     = `${siteUrl}/${slug}`;
  const subcategory = CATEGORY_TO_SUBCATEGORY[config.category] ?? "Financial Calculator";
  const audience    = CATEGORY_TO_AUDIENCE[config.category] ?? "Global investors and financial planners";
  const today       = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

  // Derive keywords from name + category + common finance terms
  const keywords = [
    name,
    config.isIndiaSpecific ? `${name} India` : `${name} online`,
    config.category,
    subcategory,
    "free online calculator",
    "WealthMaze",
    "financial planning tool",
    "personal finance calculator",
  ].join(", ");

  // ── 1. SoftwareApplication ──────────────────────────────────────────────
  const softwareApplication = {
    "@type": "SoftwareApplication",
    "@id": `${pageUrl}#tool`,
    "name": name,
    "description": description,
    "url": pageUrl,
    "applicationCategory": "FinanceApplication",
    "applicationSubCategory": subcategory,
    "operatingSystem": "Any (Web Browser)",
    "browserRequirements": "Requires JavaScript enabled",
    "dateModified": today,
    "keywords": keywords,
    "inLanguage": "en-IN",
    "audience": {
      "@type": "Audience",
      "audienceType": audience,
    },
    "featureList": buildFeatureList(config),
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "INR",
      "availability": "https://schema.org/InStock",
      "description": `Free ${name} — no signup required`,
    },
    "provider": {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      "name": "WealthMaze",
      "url": siteUrl,
    },
    "isPartOf": {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      "name": "WealthMaze",
      "url": siteUrl,
    },
  };

  // ── 2. FAQPage ───────────────────────────────────────────────────────────
  const faqItems = buildFAQItems(config.faqs);
  const faqPage = faqItems.length > 0
    ? {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        "mainEntity": faqItems,
      }
    : null;

  // ── 3. BreadcrumbList ────────────────────────────────────────────────────
  const breadcrumbList = {
    "@type": "BreadcrumbList",
    "@id": `${pageUrl}#breadcrumb`,
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": siteUrl,
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": config.category,
        "item": `${siteUrl}/#${config.category.toLowerCase().replace(/\s+/g, "-")}`,
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": name,
        "item": pageUrl,
      },
    ],
  };

  // ── 4. WebPage ───────────────────────────────────────────────────────────
  const webPage = {
    "@type": "WebPage",
    "@id": pageUrl,
    "name": seoTitle,
    "description": seoDescription,
    "url": pageUrl,
    "dateModified": today,
    "inLanguage": "en-IN",
    "isPartOf": { "@id": `${siteUrl}/#website` },
    "breadcrumb": { "@id": `${pageUrl}#breadcrumb` },
    "mainEntity": { "@id": `${pageUrl}#tool` },
    "about": {
      "@type": "Thing",
      "name": name,
      "description": description,
    },
    "publisher": { "@id": `${siteUrl}/#organization` },
  };

  // ── Assemble @graph ──────────────────────────────────────────────────────
  const graph: object[] = [webPage, softwareApplication, breadcrumbList];
  if (faqPage) graph.push(faqPage);

  const schemaObject = {
    "@context": "https://schema.org",
    "@graph": graph,
  };

  return JSON.stringify(schemaObject);
}

// ─────────────────────────────────────────────────────────────────────────────
// Helper: build FAQ mainEntity array
// ─────────────────────────────────────────────────────────────────────────────
function buildFAQItems(faqs: FAQItem[]) {
  return faqs.map((faq) => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer,
    },
  }));
}

// ─────────────────────────────────────────────────────────────────────────────
// Helper: build featureList from config inputs/outputs
// ─────────────────────────────────────────────────────────────────────────────
function buildFeatureList(config: CalculatorConfig): string {
  const inputFeatures = config.inputs.map((i) => i.label);
  const outputFeatures = config.outputs.map((o) => `Output: ${o.label}`);
  const extras = [
    "Interactive sliders",
    "Live chart visualization",
    "Detailed comparison table",
    "Embeddable widget",
    "Mobile friendly",
    "No signup required",
    "100% free",
  ];
  return [...inputFeatures, ...outputFeatures, ...extras].join(", ");
}
