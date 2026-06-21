import * as React from "react";
import { Metadata } from "next";
import { CalculatorsExplorer } from "@/components/CalculatorsExplorer";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Financial Calculators Directory – Browse 30+ Free Tools | WealthMaze",
  description: "Browse WealthMaze's full directory of 30+ free online financial calculators. Choose from mutual fund SIP calculators, loan EMI calculators, retirement targets, and tax regime tools.",
  alternates: {
    canonical: `${siteConfig.url}/calculators`,
  },
  openGraph: {
    title: "Financial Calculators Directory – Browse 30+ Free Tools | WealthMaze",
    description: "Browse all 30+ free interactive calculators for mutual funds, retirement, taxes, loan prepayments, and gold planning on WealthMaze.",
    url: `${siteConfig.url}/calculators`,
    type: "website",
    siteName: "WealthMaze",
  },
  twitter: {
    card: "summary_large_image",
    title: "Financial Calculators Directory – Browse 30+ Free Tools | WealthMaze",
    description: "Access 30+ free interactive calculators for mutual funds, retirement, taxes, loans, and gold on WealthMaze.",
  },
};

export default function CalculatorsPage() {
  return <CalculatorsExplorer />;
}
