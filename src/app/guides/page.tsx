import * as React from "react";
import { Metadata } from "next";
import ResourcesPage from "../resources/page";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Free Personal Finance Resources & Guides | WealthMaze",
  description: "Browse WealthMaze's personal finance guides. Access interactive calculators and expert financial guides.",
  alternates: {
    canonical: `${siteConfig.url}/guides`,
  },
};

export default function GuidesPage() {
  return <ResourcesPage />;
}
