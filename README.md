# WealthMaze 🧭

> **Calculate Your Financial Future** — The fastest, cleanest, and most useful financial calculator platform for investors and savers.

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green)](LICENSE)

---

## 📋 Project Overview

WealthMaze is a production-ready financial calculator platform built for Indian investors and savers. It offers 40+ free financial calculators covering SIP, EMI, gold, tax, retirement, and more — all with interactive charts, educational guides, and a lightning-fast, mobile-first experience.

**Mission:** Help users navigate complex financial decisions through simple, accurate, and easy-to-use calculators.

---

## ✨ Features

- **40+ Financial Calculators** across 8 categories
- **Interactive Recharts Visualizations** — area, bar, pie charts
- **Dark / Light Mode** with smooth transitions
- **Mobile-First Responsive Design**
- **SEO Optimized** — per-page meta, Open Graph, Twitter Cards, canonical URLs
- **Schema.org Structured Data** — Organization, WebSite, FAQPage, FinancialProduct, BreadcrumbList
- **AdSense Ready** — header, sidebar, in-content, and footer ad placeholders
- **Static Site Generation (SSG)** — every calculator page pre-built at compile time
- **Automatic sitemap.xml and robots.txt** generation
- **Educational Content** — 1000+ word guides per calculator with FAQs
- **Legal Compliance** — Privacy Policy, Terms of Service, Disclaimer pages
- **Print-Friendly** — clean CSS print styles

### Calculator Categories

| Category | Calculators |
|---|---|
| 📈 Investing | SIP, Lumpsum, CAGR, SWP, Goal, Retirement, FIRE, Net Worth |
| 📊 Stock Market | Stock Return, Portfolio Return, CAGR, Dividend Yield, Position Size |
| 🥇 Gold | Gold Investment, Gold SIP, Silver Investment |
| 💰 Savings | FD, RD, PPF, EPF, NPS, Savings Growth |
| 🏠 Loans | EMI, Home Loan, Personal Loan, Car Loan, Loan Prepayment |
| 🧾 Tax | Income Tax (Old vs New), Capital Gains, Tax Saving |
| 🌟 Lifestyle | FIRE Check, 1 Crore Timeline, Inflation, Future Value of Money |

---

## 🚀 Installation

### Prerequisites

- Node.js 18.17+ 
- npm 9+

### Clone & Install

```bash
git clone https://github.com/yourusername/wealthmaze.git
cd wealthmaze
npm install
```

---

## 💻 Development Setup

```bash
# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Commands

| Command | Description |
|---|---|
| `npm run dev` | Start local dev server with hot reload |
| `npm run build` | Create optimized production build |
| `npm start` | Start production server locally |
| `npm run lint` | Run ESLint |

---

## 🌐 Deployment Instructions

### Option 1: Vercel (Recommended)

1. Push your code to a GitHub repository.
2. Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Import your GitHub repository.
4. Vercel auto-detects Next.js — no configuration needed.
5. Click **Deploy**.

Your site will be live at `https://your-project.vercel.app`.

**Custom Domain:** Go to Project Settings → Domains → Add `wealthmaze.com`.

### Option 2: Self-Hosted

```bash
npm run build
npm start
```

---

## 📂 Project Structure

```
wealthmaze/
├── public/
│   ├── ads.txt              # Google AdSense publisher file
│   └── favicon.ico
├── src/
│   ├── app/
│   │   ├── [slug]/          # Dynamic calculator pages (SSG)
│   │   ├── about/           # About Us page
│   │   ├── contact/         # Contact Us page
│   │   ├── privacy/         # Privacy Policy
│   │   ├── terms/           # Terms of Service
│   │   ├── disclaimer/      # Legal Disclaimer
│   │   ├── layout.tsx       # Root layout + header/footer
│   │   ├── page.tsx         # Homepage with search & categories
│   │   ├── sitemap.ts       # Auto-generated sitemap.xml
│   │   └── robots.ts        # Auto-generated robots.txt
│   ├── components/
│   │   ├── CalculatorPage.tsx    # Main calculator layout
│   │   ├── CalculatorForm.tsx    # Dynamic input form with sliders
│   │   ├── CalculatorChart.tsx   # Recharts visualizations
│   │   ├── CalculatorResults.tsx # Output cards + share/print
│   │   ├── AdSlot.tsx            # AdSense placeholder components
│   │   ├── ThemeToggle.tsx       # Dark/Light mode toggle
│   │   └── ThemeProvider.tsx     # next-themes wrapper
│   └── data/
│       └── calculators/
│           ├── types.ts          # TypeScript interfaces
│           ├── index.ts          # Registry + categories
│           ├── investing.ts      # SIP, Lumpsum, CAGR, etc.
│           ├── stocks.ts         # Stock calculators
│           ├── gold.ts           # Gold & Silver
│           ├── savings.ts        # FD, RD, PPF, EPF, NPS
│           ├── loans.ts          # EMI, Home, Car, Personal
│           ├── tax.ts            # Income Tax, Capital Gains
│           └── lifestyle.ts      # FIRE, Inflation, etc.
```

---

## 🔧 Environment Variables

No environment variables are required for the base application. The site runs fully statically.

For analytics and ads, you may optionally add:

```bash
# .env.local (never commit this file)
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX      # Google Analytics 4
NEXT_PUBLIC_ADSENSE_PUBLISHER_ID=pub-XXXXXXXXXXXXXXXX  # Google AdSense
```

---

## 💡 AdSense Setup

1. After AdSense approval, open `public/ads.txt`
2. Replace `pub-XXXXXXXXXXXXXXXX` with your real Publisher ID
3. Replace ad slot placeholders in `src/components/AdSlot.tsx` with real `<ins class="adsbygoogle">` tags

---

## 📄 Legal

This project includes:
- [Privacy Policy](/privacy)
- [Terms of Service](/terms)  
- [Disclaimer](/disclaimer)

WealthMaze provides educational financial tools only. Results are estimates and do not constitute financial advice.

---

## 📬 Contact

For questions, bug reports, or advertiser relations: **support@wealthmaze.com**

---

*Built with ❤️ using Next.js, TypeScript, and Tailwind CSS*
