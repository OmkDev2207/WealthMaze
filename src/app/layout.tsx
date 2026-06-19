import * as React from "react";
import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ThemeToggle } from "@/components/ThemeToggle";
import { AdSlot } from "@/components/AdSlot";
import Link from "next/link";
import { Wallet, Home, Calculator, BookOpen, Compass } from "lucide-react";

import { HeaderNavigation } from "@/components/HeaderNavigation";

export const metadata: Metadata = {
  title: "WealthMaze - Calculate Your Financial Future",
  description: "WealthMaze helps you navigate complex financial decisions through simple, accurate, and easy-to-use calculators. Plan investments, calculate loan EMIs, and track wealth.",
  keywords: ["WealthMaze", "wealthmaze", "wealth", "maze", "weal", "SIP calculator", "age calculator", "gold calculator", "loan calculator", "financial calculators", "investment tools"],
  metadataBase: new URL("https://wealthmaze.com"),
  openGraph: {
    title: "WealthMaze - Calculate Your Financial Future",
    description: "Navigate complex financial decisions through simple, accurate, and easy-to-use calculators.",
    type: "website",
    locale: "en_IN",
    url: "https://wealthmaze.com",
    siteName: "WealthMaze",
  },
  twitter: {
    card: "summary_large_image",
    title: "WealthMaze - Calculate Your Financial Future",
    description: "Navigate complex financial decisions through simple, accurate, and easy-to-use calculators.",
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
      {/* Google AdSense — loads after page is interactive, never blocks render */}
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7662746918059885"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />
      <body className="min-h-full flex flex-col bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-250">
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
          <main className="flex-grow">{children}</main>

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

              {/* Copyright */}
              <div className="text-center text-[10px] font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest pt-2">
                &copy; {new Date().getFullYear()} WealthMaze. All rights reserved.
              </div>
            </div>
          </footer>

          {/* Inject Global Schemas into page */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Organization",
                "name": "WealthMaze",
                "url": "https://wealthmaze.com",
                "logo": "https://wealthmaze.com/logo.png",
              }),
            }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "WebSite",
                "url": "https://wealthmaze.com/",
                "potentialAction": {
                  "@type": "SearchAction",
                  "target": "https://wealthmaze.com/?q={search_term_string}",
                  "query-input": "required name=search_term_string"
                }
              }),
            }}
          />

          {/* Mobile Bottom Tab Navigation */}
          <nav className="fixed bottom-0 left-0 right-0 h-14 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md border-t border-zinc-150 dark:border-zinc-900 flex items-center justify-around z-45 md:hidden print:hidden shadow-[0_-4px_12px_rgba(0,0,0,0.03)] pb-safe">
            <Link
              href="/"
              className="flex flex-col items-center justify-center flex-grow py-1 text-zinc-400 dark:text-zinc-500 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors group"
            >
              <Home className="h-5 w-5 group-hover:scale-110 transition-transform" />
              <span className="text-[9px] font-bold mt-1 uppercase tracking-wider">Home</span>
            </Link>
            <Link
              href="/sip-calculator"
              className="flex flex-col items-center justify-center flex-grow py-1 text-zinc-400 dark:text-zinc-500 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors group"
            >
              <Calculator className="h-5 w-5 group-hover:scale-110 transition-transform" />
              <span className="text-[9px] font-bold mt-1 uppercase tracking-wider">Calculators</span>
            </Link>
            <Link
              href="/blog"
              className="flex flex-col items-center justify-center flex-grow py-1 text-zinc-400 dark:text-zinc-500 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors group"
            >
              <BookOpen className="h-5 w-5 group-hover:scale-110 transition-transform" />
              <span className="text-[9px] font-bold mt-1 uppercase tracking-wider">Blog</span>
            </Link>
            <Link
              href="/about"
              className="flex flex-col items-center justify-center flex-grow py-1 text-zinc-400 dark:text-zinc-500 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors group"
            >
              <Compass className="h-5 w-5 group-hover:scale-110 transition-transform" />
              <span className="text-[9px] font-bold mt-1 uppercase tracking-wider">Explore</span>
            </Link>
          </nav>
        </ThemeProvider>
      </body>
    </html>
  );
}
