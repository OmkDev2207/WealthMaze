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
                    <li><Link href="/emi-calculator" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Loan EMI Calculator</Link></li>
                    <li><Link href="/retirement-calculator" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Retirement Calculator</Link></li>
                    <li><Link href="/cagr-calculator" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">CAGR Calculator</Link></li>
                    <li><Link href="/income-tax-calculator" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Income Tax Calculator</Link></li>
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

              {/* Social Media Icons — decorative, no profile links yet */}
              <div className="flex items-center justify-center gap-5" aria-label="WealthMaze social media">
                {/* X / Twitter */}
                <span aria-label="X (Twitter)" className="text-zinc-300 dark:text-zinc-600 cursor-default">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </span>
                {/* Instagram */}
                <span aria-label="Instagram" className="text-zinc-300 dark:text-zinc-600 cursor-default">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </span>
                {/* LinkedIn */}
                <span aria-label="LinkedIn" className="text-zinc-300 dark:text-zinc-600 cursor-default">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </span>
                {/* YouTube */}
                <span aria-label="YouTube" className="text-zinc-300 dark:text-zinc-600 cursor-default">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </span>
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
