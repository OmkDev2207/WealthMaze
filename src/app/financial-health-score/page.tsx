import * as React from "react";
import { Metadata } from "next";
import { FinancialHealthQuiz } from "@/components/FinancialHealthQuiz";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Financial Health Score — How Healthy Are Your Finances? | WealthMaze",
  description: "Answer 10 questions and get your personalised Financial Health Score out of 100. Free, instant, no signup required. Find out where you stand and what to fix first.",
  alternates: {
    canonical: `${siteConfig.url}/financial-health-score`,
  },
  openGraph: {
    title: "Financial Health Score — How Healthy Are Your Finances? | WealthMaze",
    description: "Answer 10 questions and get your personalised Financial Health Score out of 100. Free, instant, no signup required. Find out where you stand and what to fix first.",
    url: `${siteConfig.url}/financial-health-score`,
    type: "website",
    siteName: "WealthMaze",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "How financially healthy are you? Take the free WealthMaze quiz",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Financial Health Score — How Healthy Are Your Finances? | WealthMaze",
    description: "Answer 10 questions and get your personalised Financial Health Score out of 100. Free, instant, no signup required. Find out where you stand and what to fix first.",
    images: ["/og-image.png"],
  },
};

export default function FinancialHealthScorePage() {
  return (
    <main className="min-h-screen bg-zinc-50/30 dark:bg-zinc-950/20 py-8">
      <FinancialHealthQuiz />
    </main>
  );
}
