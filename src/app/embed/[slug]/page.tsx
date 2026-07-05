import * as React from "react";
import { Metadata } from "next";
import { allCalculators, getCalculatorById } from "@/data/calculators";
import { programmaticPages, getProgrammaticPageById } from "@/data/programmatic";
import { CalculatorPage } from "@/components/CalculatorPage";
import { notFound as nextNotFound } from "next/navigation";
import { EmbedClassTrigger } from "@/components/EmbedClassTrigger";
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
  const calculatorId = progConfig ? progConfig.parentCalculatorId : slug;
  const config = getCalculatorById(calculatorId);

  if (!config) {
    return { title: "Embed - Calculator Not Found | WealthMaze" };
  }

  const title = progConfig ? progConfig.name : config.name;

  return {
    title: `Embed: ${title} | WealthMaze`,
    description: `Embeddable version of the interactive ${title} by WealthMaze.`,
    robots: {
      index: false,
      follow: false,
    },
    alternates: {
      canonical: `${siteConfig.url}/${slug}`,
    },
  };
}

export default async function EmbedPage({ params }: PageProps) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const progConfig = getProgrammaticPageById(slug);
  const calculatorId = progConfig ? progConfig.parentCalculatorId : slug;
  const config = getCalculatorById(calculatorId);

  if (!config) {
    nextNotFound();
  }

  return (
    <div className="min-h-screen bg-transparent p-0">
      <EmbedClassTrigger />
      <main className="w-full max-w-full">
        <CalculatorPage
          calculatorId={calculatorId}
          overrides={progConfig?.defaultOverrides}
          customTitle={progConfig?.name}
          customDescription={progConfig?.seoDescription}
          customEducationalContent={progConfig?.educationalContent}
          isEmbed={true}
          slug={slug}
        />
      </main>
    </div>
  );
}
