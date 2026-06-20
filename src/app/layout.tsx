import * as React from "react";
import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ThemeToggle } from "@/components/ThemeToggle";
import { AdSlot } from "@/components/AdSlot";
import Link from "next/link";
import { Wallet } from "lucide-react";

import { HeaderNavigation } from "@/components/HeaderNavigation";
import { LayoutClientWidgets } from "@/components/LayoutClientWidgets";
import { siteConfig } from "@/config/site";
import { Analytics } from "@vercel/analytics/next";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";


export const metadata: Metadata = {
  title: "WealthMaze - Calculate Your Financial Future",
  description: "WealthMaze helps you navigate complex financial decisions through simple, accurate, and easy-to-use calculators. Plan investments, calculate loan EMIs, and track wealth.",
  keywords: siteConfig.keywords,
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    title: "WealthMaze - Calculate Your Financial Future",
    description: "Navigate complex financial decisions through simple, accurate, and easy-to-use calculators.",
    type: "website",
    locale: "en_IN",
    url: siteConfig.url,
    siteName: "WealthMaze",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "WealthMaze – Free Financial Calculators for Indian Investors",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "WealthMaze - Calculate Your Financial Future",
    description: "Navigate complex financial decisions through simple, accurate, and easy-to-use calculators.",
    images: ["/og-image.png"],
  }
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
      </head>
      <body className="min-h-full flex flex-col bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-250">
        {/* Skip Navigation – accessibility and SEO */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:bg-emerald-500 focus:text-white focus:font-bold focus:rounded-lg focus:shadow-lg"
        >
          Skip to main content
        </a>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          {/* Header */}
          <header className="sticky top-0 bg-white/85 dark:bg-zinc-950/85 backdrop-blur-md border-b border-zinc-150 dark:border-zinc-900 z-50 print:hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
              <Link href="/" className="flex items-center space-x-2 group">
                <div className="w-9 h-9 rounded-xl bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
                  <Wallet className="h-5 w-5 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-base font-extrabold tracking-tight bg-gradient-to-r from-zinc-900 to-zinc-700 dark:from-white dark:to-zinc-300 bg-clip-text text-transparent">
                    WealthMaze
                  </span>
                  <span className="text-[9px] font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest leading-none">
                    Financial Future
                  </span>
                </div>
              </Link>

              <div className="flex items-center space-x-2 sm:space-x-4">
                <HeaderNavigation />
                <ThemeToggle />
              </div>
            </div>
          </header>

          {/* Desktop Top Leaderboard ad slot */}
          <div className="print:hidden">
            <AdSlot position="header" />
          </div>

          {/* Main Content */}
          <main id="main-content" className="flex-grow pb-16 md:pb-0">{children}</main>

          {/* Footer ad slot */}
          <div className="print:hidden">
            <AdSlot position="footer" />
          </div>

          {/* Footer */}
          <footer className="bg-zinc-50 dark:bg-zinc-950 border-t border-zinc-150 dark:border-zinc-900 py-10 print:hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
              {/* Footer disclaimer */}
              <div className="text-center text-xs leading-relaxed text-zinc-400 dark:text-zinc-500 border-b border-zinc-200/50 dark:border-zinc-900 pb-6 max-w-4xl mx-auto">
                <p>
                  <strong>WealthMaze</strong> provides educational financial tools and calculators. Results are estimates and should not be considered professional financial advice. Information provided is for informational purposes only. WealthMaze does not provide investment, tax, or legal counsel.
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
              </div>

              {/* Social Media Profile Links */}
              <div className="flex items-center justify-center gap-5" aria-label="WealthMaze on social media">
                <a
                  href="https://twitter.com/wealthmaze"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WealthMaze on X (Twitter)"
                  className="text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors"
                >
                  {/* X / Twitter */}
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/wealthmaze"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WealthMaze on Instagram"
                  className="text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors"
                >
                  {/* Instagram */}
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a
                  href="https://www.linkedin.com/company/wealthmaze"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WealthMaze on LinkedIn"
                  className="text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors"
                >
                  {/* LinkedIn */}
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
                <a
                  href="https://www.youtube.com/@wealthmaze"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WealthMaze on YouTube"
                  className="text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors"
                >
                  {/* YouTube */}
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
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

          {/* Google Analytics 4 */}
          <GoogleAnalytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
