import { CalculatorConfig } from "./types";

export const stocksCalculators: CalculatorConfig[] = [
  {
    id: "stock-return-calculator",
    name: "Stock Return Calculator",
    category: "Stock Market",
    description: "Calculate capital gains and total returns from buying and selling stocks, including dividends.",
    seoTitle: "Stock Return Calculator – Calculate Capital Gains",
    seoDescription: "Calculate gains, returns, and ROI on stocks you bought and sold. Account for brokerage fees, dividend payments, and taxes with our stock return calculator.",
    inputs: [
      { id: "buyPrice", label: "Buy Price per Share", type: "number", default: 150, unit: "₹" },
      { id: "sellPrice", label: "Sell Price per Share", type: "number", default: 220, unit: "₹" },
      { id: "quantity", label: "Number of Shares", type: "number", default: 500, unit: "Qty" },
      { id: "dividend", label: "Total Dividend per Share", type: "number", default: 8, unit: "₹" },
      { id: "charges", label: "Total Transaction Fees / Brokerage", type: "number", default: 150, unit: "₹" },
    ],
    outputs: [
      { id: "totalCost", label: "Total Purchase Cost", format: "currency" },
      { id: "capitalGains", label: "Capital Gains", format: "currency" },
      { id: "dividendIncome", label: "Dividend Income", format: "currency" },
      { id: "totalReturn", label: "Total Net Return", format: "currency" },
      { id: "roi", label: "Return on Investment (ROI)", format: "percent" },
    ],
    calculate: (inputs) => {
      const buy = inputs.buyPrice;
      const sell = inputs.sellPrice;
      const qty = inputs.quantity;
      const div = inputs.dividend;
      const fees = inputs.charges;

      const totalCost = (buy * qty) + fees;
      const totalRevenue = (sell * qty) + (div * qty);
      const capitalGains = (sell - buy) * qty;
      const dividendIncome = div * qty;
      const totalReturn = totalRevenue - totalCost;
      const roi = (totalReturn / totalCost) * 100;

      const chartData = [
        { name: "Initial Investment", Amount: buy * qty },
        { name: "Brokerage Fees", Amount: fees },
        { name: "Capital Gains", Amount: capitalGains > 0 ? capitalGains : 0 },
        { name: "Dividend Income", Amount: dividendIncome },
      ];

      return {
        values: { totalCost, capitalGains, dividendIncome, totalReturn, roi },
        chartData,
      };
    },
    educationalContent: [
      {
        title: "How to Compute Stock Returns and Capital Gains",
        content: "Our Stock Return Calculator estimates your total capital gains and profits. Calculating returns from stock trading is not limited to subtracting buy price from sell price. A comprehensive calculation accounts for:\n1. **Purchase Costs**: Buy price times number of shares, plus buy brokerage.\n2. **Capital Gains**: Sell price minus buy price, times quantity.\n3. **Dividends**: Dividends paid by the corporation during the holding duration.\n4. **Selling Costs**: Sell brokerage and taxes."
      }
    ],
    faqs: [
      { question: "What is the difference between ROI and CAGR in stocks?", answer: "ROI is the absolute return on the stock trade regardless of how long it took. CAGR is the annualized return, which shows how fast your capital grew per year. A 50% ROI over 5 years is a ~8.4% CAGR." },
      { question: "How do I calculate stock return ROI online?", answer: "Enter your share purchase price, sale price, number of shares, dividend payouts, and transaction fees into our stock return calculator to view net ROI." }
    ],
  lastUpdated: "July 2026",
  },
  {
    id: "portfolio-return-calculator",
    name: "Portfolio Return Calculator",
    category: "Stock Market",
    description: "Calculate the weighted average return of a stock and asset portfolio.",
    seoTitle: "Portfolio Return Calculator – Calculate Weighted ROI",
    seoDescription: "Calculate your overall portfolio return. Enter weights and returns for multiple stocks or assets to find your aggregate weighted returns online.",
    inputs: [
      { id: "asset1Weight", label: "Asset 1 Weight (%)", type: "slider", min: 0, max: 100, step: 5, default: 40, unit: "%" },
      { id: "asset1Return", label: "Asset 1 Expected Return", type: "slider", min: -20, max: 40, step: 0.5, default: 15, unit: "%" },
      { id: "asset2Weight", label: "Asset 2 Weight (%)", type: "slider", min: 0, max: 100, step: 5, default: 35, unit: "%" },
      { id: "asset2Return", label: "Asset 2 Expected Return", type: "slider", min: -20, max: 40, step: 0.5, default: 10, unit: "%" },
      { id: "asset3Weight", label: "Asset 3 Weight (%)", type: "slider", min: 0, max: 100, step: 5, default: 25, unit: "%" },
      { id: "asset3Return", label: "Asset 3 Expected Return", type: "slider", min: -20, max: 40, step: 0.5, default: 6, unit: "%" },
    ],
    outputs: [
      { id: "weightedReturn", label: "Total Weighted Portfolio Return", format: "percent" },
    ],
    calculate: (inputs) => {
      const w1 = inputs.asset1Weight;
      const r1 = inputs.asset1Return;
      const w2 = inputs.asset2Weight;
      const r2 = inputs.asset2Return;
      const w3 = inputs.asset3Weight;
      const r3 = inputs.asset3Return;

      const totalWeight = w1 + w2 + w3;
      const weightedReturn = totalWeight > 0 ? ((w1 * r1) + (w2 * r2) + (w3 * r3)) / totalWeight : 0;

      const chartData = [
        { name: "Asset 1", Weight: w1, Return: r1 },
        { name: "Asset 2", Weight: w2, Return: r2 },
        { name: "Asset 3", Weight: w3, Return: r3 },
      ];

      return {
        values: { weightedReturn },
        chartData,
      };
    },
    educationalContent: [
      {
        title: "How Portfolio Return Calculations Work",
        content: "Our Portfolio Return Calculator determines your weighted average return. A portfolio is rarely comprised of a single asset. To calculate your aggregate portfolio return, you cannot take a simple average of the individual returns unless you hold equal values in each asset. Instead, you must calculate a weighted average, where each asset's return is multiplied by its proportion (weight) in the overall portfolio."
      }
    ],
    faqs: [
      { question: "Why must weights sum to 100%?", answer: "Weights represent the percentage distribution of your capital. The calculator normalizes the inputs so that they represent proportions of whatever total capital is allocated." },
      { question: "How do I calculate weighted portfolio return?", answer: "Input the capital weights and expected returns for each asset category in your portfolio to calculate the aggregate weighted portfolio return." }
    ],
  lastUpdated: "July 2026",
  },
  {
    id: "dividend-yield-calculator",
    name: "Dividend Yield Calculator",
    category: "Stock Market",
    description: "Determine the dividend yield percentage of a stock based on share price and annual payouts.",
    seoTitle: "Dividend Yield Calculator – Calculate Dividend Yield",
    seoDescription: "Calculate the dividend yield of any dividend-paying stock. Compare dividend income yields with current stock prices easily with our yield calculator.",
    inputs: [
      { id: "sharePrice", label: "Current Share Price", type: "number", default: 350, unit: "₹" },
      { id: "dividendPerShare", label: "Annual Dividend per Share", type: "number", default: 14, unit: "₹" },
    ],
    outputs: [
      { id: "dividendYield", label: "Dividend Yield", format: "percent" },
    ],
    calculate: (inputs) => {
      const price = inputs.sharePrice;
      const div = inputs.dividendPerShare;

      const dividendYield = price > 0 ? (div / price) * 100 : 0;

      const chartData = [
        { name: "Share Price", Amount: price },
        { name: "Annual Dividend", Amount: div * 10 }, // Scale for visualization
      ];

      return {
        values: { dividendYield },
        chartData,
      };
    },
    educationalContent: [
      {
        title: "Understanding Dividend Yield and Passive Income",
        content: "Our Dividend Yield Calculator estimates your passive investment income. Dividend yield is a financial ratio that shows how much a company pays out in dividends each year relative to its stock price. It is expressed as a percentage and can be calculated by dividing the annual dividend per share by the current price per share. It represents the passive cash flow return on investment from holding a stock."
      }
    ],
    faqs: [
      { question: "Is a high dividend yield always good?", answer: "Not necessarily. Sometimes a high dividend yield is a result of a falling stock price (a 'dividend trap'), which could signal that the company is in financial distress and might cut its dividend in the future." },
      { question: "How do I calculate dividend yield online?", answer: "Enter the current share price and annual dividend per share into our dividend yield calculator to instantly check the percentage dividend return." }
    ],
  lastUpdated: "July 2026",
  },
  {
    id: "position-size-calculator",
    name: "Position Size Calculator",
    category: "Stock Market",
    description: "Determine the ideal number of shares to purchase to manage trading risk.",
    seoTitle: "Position Size Calculator – Calculate Trading Size",
    seoDescription: "Calculate the exact number of shares to buy per trade. Manage trading risk by setting account size and stop loss levels with our size calculator.",
    inputs: [
      { id: "accountSize", label: "Total Account Capital", type: "number", default: 200000, unit: "₹" },
      { id: "riskPercent", label: "Account Risk Limit per Trade", type: "slider", min: 0.5, max: 10, step: 0.5, default: 2, unit: "%" },
      { id: "entryPrice", label: "Entry Price per Share", type: "number", default: 150, unit: "₹" },
      { id: "stopLoss", label: "Stop Loss Price per Share", type: "number", default: 142, unit: "₹" },
    ],
    outputs: [
      { id: "amountToRisk", label: "Max Amount to Risk", format: "currency" },
      { id: "sharesToBuy", label: "Shares to Purchase (Position Size)", format: "number" },
      { id: "totalCost", label: "Total Position Value", format: "currency" },
    ],
    calculate: (inputs) => {
      const size = inputs.accountSize;
      const risk = inputs.riskPercent;
      const entry = inputs.entryPrice;
      const sl = inputs.stopLoss;

      const amountToRisk = size * (risk / 100);
      const riskPerShare = Math.max(0.01, entry - sl);
      const sharesToBuy = Math.floor(amountToRisk / riskPerShare);
      const totalCost = sharesToBuy * entry;

      const chartData = [
        { name: "Total Account", Value: size },
        { name: "Position Size Cost", Value: totalCost },
        { name: "Maximum Risk", Value: amountToRisk },
      ];

      return {
        values: { amountToRisk, sharesToBuy, totalCost },
        chartData,
      };
    },
    educationalContent: [
      {
        title: "Benefits of Position Sizing and Risk Control",
        content: "Our Position Size Calculator manages your capital risk per trade. Position sizing is the most critical element of risk management in stock trading. It determines how many units/shares you should buy based on the size of your trading account and your stop-loss level. Following a strict position sizing model prevents a single bad trade from wiping out a significant portion of your capital."
      }
    ],
    faqs: [
      { question: "What is the 2% risk rule?", answer: "The 2% risk rule states that you should never risk more than 2% of your total trading capital on any single trade. If your stop loss is hit, you only lose 2% of your capital, preserving the rest to fight another day." },
      { question: "How does a position size calculator work?", answer: "The position size calculator uses your total account capital, risk percentage limit per trade, entry price, and stop loss level to determine the ideal share count to buy." }
    ],
  lastUpdated: "July 2026",
  }
];
