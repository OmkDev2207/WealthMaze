import * as React from "react";
import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ThemeToggle } from "@/components/ThemeToggle";
import { CurrencySelector } from "@/components/CurrencySelector";
import { AdSlot } from "@/components/AdSlot";
import Link from "next/link";

import { HeaderNavigation } from "@/components/HeaderNavigation";
import { LayoutClientWidgets } from "@/components/LayoutClientWidgets";
import { siteConfig } from "@/config/site";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { CurrencyProvider } from "@/lib/CurrencyContext";

export const metadata: Metadata = {
  title: {
    default: "WealthMaze – Financial Calculators, Investment Planning & Wealth Building",
    template: "%s | WealthMaze",
  },
  description: "Free SIP, retirement, financial freedom, net worth, inflation, EMI, and investment calculators. Plan your financial future with WealthMaze's financial planning tools and educational guides.",
  keywords: siteConfig.keywords,
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: siteConfig.url,
    languages: {
      "en": siteConfig.url,
    },
  },
  openGraph: {
    title: "WealthMaze – Financial Calculators & Wealth Planning",
    description: "Plan investments, retirement and financial freedom using free calculators from WealthMaze.",
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: "WealthMaze",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "WealthMaze – Free Financial Calculators for Global Investors",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "WealthMaze – Financial Calculators & Wealth Planning",
    description: "Free financial calculators and planning tools from WealthMaze.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/logo.png", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-touch-icon.png" },
    ],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
      suppressHydrationWarning
    >
      <head>
        {/* AI Discoverability: llms.txt */}
        <link rel="llms-txt" href="/llms.txt" />
        {/* hreflang: targets all global English speakers */}
        <link rel="alternate" hrefLang="en" href="https://wealthmaze.in/" />
      </head>
      <body className="min-h-full flex flex-col bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-250">
        {/* Skip Navigation – accessibility and SEO */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:bg-emerald-500 focus:text-white focus:font-bold focus:rounded-lg focus:shadow-lg"
        >
          Skip to main content
        </a>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem={true}>
          <CurrencyProvider>
            {/* Header */}
            <header className="sticky top-0 bg-white/85 dark:bg-zinc-950/85 backdrop-blur-md border-b border-zinc-150 dark:border-zinc-900 z-50 print:hidden">
            <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
              <Link href="/" className="flex items-center space-x-2 group">
                <img 
                  src="/logo.png" 
                  alt="WealthMaze Logo" 
                  className="w-9 h-9 rounded-xl object-cover shadow-md shadow-zinc-200/50 dark:shadow-none group-hover:scale-105 transition-transform" 
                />
                <span className="text-sm sm:text-base font-extrabold tracking-tight bg-gradient-to-r from-zinc-900 to-zinc-700 dark:from-white dark:to-zinc-300 bg-clip-text text-transparent">
                  WealthMaze
                </span>
              </Link>

              <div className="flex items-center gap-2 sm:gap-4">
                <div className="order-3 lg:order-1">
                  <HeaderNavigation />
                </div>
                <div className="order-1 lg:order-2">
                  <CurrencySelector />
                </div>
                <div className="order-2 lg:order-3">
                  <ThemeToggle />
                </div>
              </div>
            </div>
          </header>

          {/* Desktop Top Leaderboard ad slot */}
          <div className="print:hidden">
            <AdSlot position="header" />
          </div>

          {/* Main Content */}
          <main id="main-content" className="flex-grow pb-[calc(4.5rem+env(safe-area-inset-bottom))] md:pb-0">{children}</main>

          {/* Footer ad slot */}
          <div className="print:hidden">
            <AdSlot position="footer" />
          </div>

          {/* Footer */}
          <footer className="bg-zinc-50 dark:bg-zinc-950 border-t border-zinc-150 dark:border-zinc-900 py-10 print:hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
              {/* SEO Internal Linking Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 pb-8 border-b border-zinc-200/60 dark:border-zinc-900 text-left max-w-5xl mx-auto">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white mb-3.5">Popular Calculators</h3>
                  <ul className="space-y-2.5 text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                    <li><Link href="/sip-calculator" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">SIP Calculator</Link></li>
                    <li><Link href="/lumpsum-calculator" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Lumpsum Calculator</Link></li>
                    <li><Link href="/xirr-calculator" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">XIRR Calculator</Link></li>
                    <li><Link href="/emi-calculator" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Loan EMI Calculator</Link></li>
                    <li><Link href="/retirement-calculator" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Retirement Calculator</Link></li>
                    <li><Link href="/cagr-calculator" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">CAGR Calculator</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white mb-3.5">Top Guides & Topics</h3>
                  <ul className="space-y-2.5 text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                    <li><Link href="/blog/category/investing" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Investing Guides</Link></li>
                    <li><Link href="/blog/category/wealth-building" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Wealth Building</Link></li>
                    <li><Link href="/blog/category/retirement" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Retirement Planning</Link></li>
                    <li><Link href="/blog/category/savings" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Savings & Budgeting</Link></li>
                    <li><Link href="/blog/category/loans" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Loan Affordability</Link></li>
                    <li><Link href="/blog/category/tax" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Tax Strategies</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white mb-3.5">Explore WealthMaze</h3>
                  <ul className="space-y-2.5 text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                    <li><Link href="/calculators" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">All Calculators Directory</Link></li>
                    <li><Link href="/blog" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Financial Knowledge Base</Link></li>
                    <li><Link href="/financial-health-quiz" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Financial Health Quiz</Link></li>
                    <li><Link href="/about" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">About WealthMaze</Link></li>
                    <li><Link href="/author/om-k" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">About the Author (Om K.)</Link></li>
                    <li><Link href="/methodology" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Calculator Methodology</Link></li>
                    <li><Link href="/contact" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Contact Us</Link></li>
                  </ul>
                </div>
              </div>

              {/* Footer disclaimer */}
              <div className="text-center text-xs leading-relaxed text-zinc-400 dark:text-zinc-500 border-b border-zinc-200/50 dark:border-zinc-900 pb-6 max-w-4xl mx-auto">
                <p>
                  WealthMaze provides free financial calculators, investment planning tools, retirement calculators, SIP calculators, and educational resources designed to help people build long-term wealth.
                </p>
              </div>

              {/* Navigation Links */}
              <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs font-semibold text-zinc-500 dark:text-zinc-400">
                <Link href="/about" className="hover:text-zinc-800 dark:hover:text-white transition-colors">
                  About Us
                </Link>
                <Link href="/author/om-k" className="hover:text-zinc-800 dark:hover:text-white transition-colors">
                  About the Author
                </Link>
                <Link href="/contact" className="hover:text-zinc-800 dark:hover:text-white transition-colors">
                  Contact
                </Link>
                <Link href="/privacy" className="hover:text-zinc-800 dark:hover:text-white transition-colors">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="hover:text-zinc-800 dark:hover:text-white transition-colors">
                  Terms of Service
                </Link>
                <Link href="/disclaimer" className="hover:text-zinc-800 dark:hover:text-white transition-colors">
                  Disclaimer
                </Link>
                <Link href="/editorial-policy" className="hover:text-zinc-800 dark:hover:text-white transition-colors">
                  Editorial Policy
                </Link>
                <Link href="/content-update-policy" className="hover:text-zinc-800 dark:hover:text-white transition-colors">
                  Content Update Policy
                </Link>
                <Link href="/methodology" className="hover:text-zinc-800 dark:hover:text-white transition-colors">
                  Calculator Methodology
                </Link>
              </div>





              {/* Copyright */}
              <div className="text-center text-[10px] font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest pt-2">
                &copy; {new Date().getFullYear()} WealthMaze. All rights reserved.
              </div>
            </div>
          </footer>

          {/* Client-only layout widgets loaded dynamically */}
          <LayoutClientWidgets />

          {/* Vercel Web Analytics */}
          <Analytics />

          {/* Vercel Speed Insights */}
          <SpeedInsights />

          {/* Google Analytics 4 */}
          <GoogleAnalytics />
          </CurrencyProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
