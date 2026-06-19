import * as React from "react";
import { Metadata } from "next";
import { HomePageClient } from "@/components/HomePageClient";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "WealthMaze - Calculate Your Financial Future",
  description: "WealthMaze helps you navigate complex financial decisions through simple, accurate, and easy-to-use calculators. Plan investments, calculate loan EMIs, and track wealth.",
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    title: "WealthMaze - Calculate Your Financial Future",
    description: "WealthMaze helps you navigate complex financial decisions through simple, accurate, and easy-to-use calculators. Plan investments, calculate loan EMIs, and track wealth.",
    url: siteConfig.url,
    type: "website",
    siteName: "WealthMaze",
  },
  twitter: {
    card: "summary_large_image",
    title: "WealthMaze - Calculate Your Financial Future",
    description: "WealthMaze helps you navigate complex financial decisions through simple, accurate, and easy-to-use calculators. Plan investments, calculate loan EMIs, and track wealth.",
  },
};

export default function HomePage() {
  return <HomePageClient />;
}
