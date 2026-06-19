import * as React from "react";
import { Metadata } from "next";
import { allCalculators, getCalculatorById } from "@/data/calculators";
import { CalculatorPage } from "@/components/CalculatorPage";
import { notFound as nextNotFound } from "next/navigation";
import { EmbedClassTrigger } from "@/components/EmbedClassTrigger";

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
  const slug = resolvedParams.slug;
  const config = getCalculatorById(slug);

  if (!config) {
    return { title: "Embed - Calculator Not Found | WealthMaze" };
  }

  return {
    title: `Embed: ${config.name} | WealthMaze`,
    description: `Embeddable version of the interactive ${config.name} by WealthMaze.`,
    robots: {
      index: false,
      follow: true,
    },
  };
}

export default async function EmbedPage({ params }: PageProps) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const config = getCalculatorById(slug);

  if (!config) {
    nextNotFound();
  }

  return (
    <div className="min-h-screen bg-transparent p-0">
      <EmbedClassTrigger />
      <main className="w-full max-w-full">
        <CalculatorPage calculatorId={slug} isEmbed={true} />
      </main>
    </div>
  );
}
