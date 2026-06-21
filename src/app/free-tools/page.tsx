import * as React from "react";
import { Metadata } from "next";
import { CalculatorsExplorer } from "@/components/CalculatorsExplorer";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Free Financial Calculators & Planning Tools | WealthMaze",
  description: "Browse WealthMaze's directory of free online calculators. Access interactive SIP calculators, home loan planners, and investment tools.",
  alternates: {
    canonical: `${siteConfig.url}/free-tools`,
  },
};

export default function FreeToolsPage() {
  return <CalculatorsExplorer />;
}
