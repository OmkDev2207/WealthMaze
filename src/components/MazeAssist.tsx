"use client";

import * as React from "react";
import Link from "next/link";
import { Bot, X, Send, HelpCircle, ArrowRight, User, Clock, ChevronRight } from "lucide-react";
import { allCalculators } from "@/data/calculators";
import { blogPosts } from "@/data/blog/posts";

interface ChatLink {
  name: string;
  url: string;
  category?: string;
  description?: string;
}

interface Message {
  id: string;
  sender: "bot" | "user";
  text: string;
  links?: ChatLink[];
  chips?: string[];
}

// Complete registry of interactive site tools & directory pages
const siteTools: ChatLink[] = [
  {
    name: "Financial Health Score Quiz",
    url: "/financial-health-score",
    category: "Interactive Quiz",
    description: "Take our 10-question evaluation to calculate your personalized score out of 100."
  },
  {
    name: "SIP Goal Planner",
    url: "/sip-goal-planner",
    category: "Goal Planning",
    description: "Target amount calculator showing monthly SIP needed to hit financial milestones."
  },
  {
    name: "Free Financial Tools Explorer",
    url: "/free-tools",
    category: "Directory",
    description: "Browse all interactive personal finance calculators and simulators."
  },
  {
    name: "Comprehensive Financial Guides",
    url: "/guides",
    category: "Knowledge Base",
    description: "Deep-dive tutorials on investing, taxation, loans, and behavioral psychology."
  },
  {
    name: "All Calculators Directory",
    url: "/calculators",
    category: "Directory",
    description: "Search and filter our complete suite of financial planners."
  }
];

// Guided decision tree configuration
const DECISION_TREE: Record<string, { text: string; chips: string[] }> = {
  welcome: {
    text: "👋 Hi! I'm MazeAssist. Ask me any money question or select a tool below to start planning!",
    chips: ["🎯 SIP Goal Planner", "🧮 Calculate Returns", "💸 Loan & EMI Tools", "📚 Explore Blog Guides"],
  },
  returns: {
    text: "Wealth accumulation depends on whether you invest regularly (SIP) or deposit a lump sum. What would you like to model?",
    chips: ["🔄 Monthly SIP Growth", "💰 Lump Sum Compounding", "📈 CAGR Growth Rate", "↩️ Back to main menu"],
  },
  loans: {
    text: "Understanding loan amortization is critical to saving money. What calculation do you need?",
    chips: ["🏠 Calculate Monthly EMI", "💸 Prepayment Interest Savings", "↩️ Back to main menu"],
  },
  blogs: {
    text: "We publish detailed tutorials that explain the psychology and mathematics behind wealth building. What topic interests you?",
    chips: ["🪙 Wealth Psychology", "🌱 Early Investing Power", "💸 Budgeting & Habits", "↩️ Back to main menu"],
  },
};

export function MazeAssist() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [inputValue, setInputValue] = React.useState("");
  const [isTyping, setIsTyping] = React.useState(false);
  
  const chatEndRef = React.useRef<HTMLDivElement>(null);

  // Initialize with welcome message
  React.useEffect(() => {
    setMessages([
      {
        id: "init",
        sender: "bot",
        text: DECISION_TREE.welcome.text,
        chips: DECISION_TREE.welcome.chips,
      },
    ]);
  }, []);

  // Auto-scroll to bottom of chat
  React.useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  // Handle guided chip selections
  // Unified smart NLP engine for both clicked chips and typed inputs
  const processUserQuery = (queryInput: string) => {
    const userMessageId = `user-${Date.now()}`;
    setMessages((prev) => [...prev, { id: userMessageId, sender: "user", text: queryInput }]);
    setInputValue("");

    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const query = queryInput.toLowerCase().trim();
      const responseId = `bot-${Date.now()}`;

      // 1. Navigation & Menu checks
      if (query.includes("back to main menu") || query === "welcome") {
        setMessages((prev) => [...prev, {
          id: responseId,
          sender: "bot",
          text: DECISION_TREE.welcome.text,
          chips: DECISION_TREE.welcome.chips,
        }]);
        return;
      }

      if (query === "🧮 calculate returns" || query === "calculate returns" || query === "returns") {
        setMessages((prev) => [...prev, {
          id: responseId,
          sender: "bot",
          text: DECISION_TREE.returns.text,
          chips: DECISION_TREE.returns.chips,
        }]);
        return;
      }

      if (query === "💸 loan & emi tools" || query === "loan & emi tools" || query === "loans") {
        setMessages((prev) => [...prev, {
          id: responseId,
          sender: "bot",
          text: DECISION_TREE.loans.text,
          chips: DECISION_TREE.loans.chips,
        }]);
        return;
      }

      if (query === "📚 explore blog guides" || query === "explore blog guides" || query === "blogs") {
        setMessages((prev) => [...prev, {
          id: responseId,
          sender: "bot",
          text: DECISION_TREE.blogs.text,
          chips: DECISION_TREE.blogs.chips,
        }]);
        return;
      }

      // Sub-menu chip matches
      if (query.includes("monthly sip growth") || query.includes("sip goal planner") || (query.includes("sip") && query.length < 25)) {
        setMessages((prev) => [...prev, {
          id: responseId,
          sender: "bot",
          text: "💡 **Systematic Investment Plans (SIP)** automate monthly investing, allowing you to harness **Dollar Cost Averaging**—buying more units during market dips and fewer during peaks. Over 15-20 years, compounding turns humble savings into massive wealth!\n\n👇 **Run your numbers or read our guide:**",
          links: [
            { name: "SIP Goal Planner", url: "/sip-goal-planner", category: "Goal Planning", description: "Calculate monthly SIP required to reach target milestones." },
            { name: "SIP Calculator", url: "/sip-calculator", category: "Investing", description: "Project systematic investment accumulation over time." },
            { name: "What is a SIP?", url: "/blog/what-is-sip", category: "Guide", description: "Understand systematic investing and compounding power." }
          ],
          chips: ["↩️ Back to main menu"]
        }]);
        return;
      }

      if (query.includes("lump sum compounding") || query.includes("lumpsum")) {
        setMessages((prev) => [...prev, {
          id: responseId,
          sender: "bot",
          text: "💡 When you invest a **Lump Sum** one-time amount, your entire principal starts earning exponential compound interest immediately. The longer you leave it untouched, the steeper the wealth curve becomes!\n\n👇 **Recommended planners:**",
          links: [
            { name: "Lumpsum Calculator", url: "/lumpsum-calculator", category: "Investing", description: "Project one-time investment returns over decades." },
            { name: "Compounding Explained", url: "/blog/compounding-explained", category: "Guide", description: "The mathematical reality of how money duplicates itself." }
          ],
          chips: ["↩️ Back to main menu"]
        }]);
        return;
      }

      if (query.includes("cagr growth rate") || query.includes("cagr")) {
        setMessages((prev) => [...prev, {
          id: responseId,
          sender: "bot",
          text: "💡 The **Compound Annual Growth Rate (CAGR)** provides a smoothed annual rate of return between an initial investment and final value, eliminating short-term market volatility noise.\n\n👇 **Calculate your CAGR or XIRR:**",
          links: [
            { name: "CAGR Calculator", url: "/cagr-calculator", category: "Stocks", description: "Find annual growth rate between buy and sell points." },
            { name: "What is XIRR?", url: "/blog/what-is-xirr-calculator-guide", category: "Guide", description: "Master calculating returns for multiple irregular cash flows." }
          ],
          chips: ["↩️ Back to main menu"]
        }]);
        return;
      }

      if (query.includes("calculate monthly emi") || query.includes("emi")) {
        setMessages((prev) => [...prev, {
          id: responseId,
          sender: "bot",
          text: "💡 In early amortization years, your monthly **EMI** goes primarily toward paying off accumulated interest rather than principal balance. Understanding this structure helps you strategize repayments.\n\n👇 **Calculate your EMI breakdown:**",
          links: [
            { name: "EMI Calculator", url: "/emi-calculator", category: "Loans", description: "General loan planner for home, car, or personal loans." },
            { name: "How Is Loan EMI Calculated?", url: "/blog/how-is-loan-emi-calculated", category: "Guide", description: "Deep dive into the mathematics behind monthly installments." }
          ],
          chips: ["↩️ Back to main menu"]
        }]);
        return;
      }

      if (query.includes("prepayment interest savings") || query.includes("prepay")) {
        setMessages((prev) => [...prev, {
          id: responseId,
          sender: "bot",
          text: "💡 Making even one extra EMI payment per year or prepaying 5% of your outstanding principal balance annually slashes years off your loan tenure and saves thousands in interest!\n\n👇 **Simulate your prepayment savings:**",
          links: [
            { name: "Loan Prepayment Calculator", url: "/loan-prepayment-calculator", category: "Loans", description: "Find exact interest savings and tenure reduction." },
            { name: "How Is Loan EMI Calculated?", url: "/blog/how-is-loan-emi-calculated", category: "Guide", description: "Deep dive into the mathematics behind monthly installments." }
          ],
          chips: ["↩️ Back to main menu"]
        }]);
        return;
      }

      if (query.includes("wealth psychology") || query.includes("psychology")) {
        setMessages((prev) => [...prev, {
          id: responseId,
          sender: "bot",
          text: "💡 Building enduring wealth is 80% behavioral psychology and only 20% mechanics. High income does not guarantee high wealth if lifestyle inflation takes over!\n\n👇 **Read our top psychology guides:**",
          links: [
            { name: "Why Most People Think About Growing Wealth Wrong", url: "/blog/most-people-think-about-growing-wealth-wrong-at-an-early-age", category: "Guide", description: "Avoiding consumerism traps in early career stages." },
            { name: "Wealth vs Income: High Earners Pitfalls", url: "/blog/wealth-vs-income", category: "Guide", description: "Why high salary doesn't equal financial freedom." }
          ],
          chips: ["↩️ Back to main menu"]
        }]);
        return;
      }

      if (query.includes("early investing power") || query.includes("early")) {
        setMessages((prev) => [...prev, {
          id: responseId,
          sender: "bot",
          text: "💡 Thanks to compounding, starting your investment journey at age 22 versus age 32 can result in more than double the retirement fund, even if you invest less total capital!\n\n👇 **Explore compounding tutorials:**",
          links: [
            { name: "Compounding Explained", url: "/blog/compounding-explained", category: "Guide", description: "See how time magnifies investment returns." },
            { name: "What Nobody Tells You About Your First Salary", url: "/blog/what-nobody-tells-you-about-your-first-salary", category: "Guide", description: "Building financial habits right out of college." }
          ],
          chips: ["↩️ Back to main menu"]
        }]);
        return;
      }

      if (query.includes("budgeting & habits") || query.includes("budgeting") || query.includes("50/30/20")) {
        setMessages((prev) => [...prev, {
          id: responseId,
          sender: "bot",
          text: "💡 Consistency beats perfection. Using frameworks like the **50/30/20 Rule** ensures you pay yourself first while enjoying your current lifestyle without guilt.\n\n👇 **Master budgeting frameworks:**",
          links: [
            { name: "Salary is Not Your Wealth", url: "/blog/salary-is-not-your-wealth", category: "Guide", description: "Converting monthly active earnings into permanent assets." },
            { name: "The 50/30/20 Budgeting Rule", url: "/blog/budget-rule-50-30-20", category: "Guide", description: "Simple allocation framework for needs, wants, and savings." }
          ],
          chips: ["↩️ Back to main menu"]
        }]);
        return;
      }

      // 2. Dynamic NLP Token Scoring across ALL Calculators, Site Tools, and Blogs
      const stopWords = ["what", "when", "where", "which", "who", "how", "why", "can", "you", "tell", "show", "give", "help", "find", "about", "some", "best", "good", "need", "want", "like", "with", "from", "for", "the", "and", "are", "is"];
      const tokens = query.split(/[\s,?._!]+/).filter(t => t.length > 1 && !stopWords.includes(t));
      const searchTokens = tokens.length > 0 ? tokens : [query];

      interface ScoredLink extends ChatLink {
        score: number;
      }
      const scoredLinks: ScoredLink[] = [];

      // Score Site Tools
      siteTools.forEach(tool => {
        let score = 0;
        searchTokens.forEach(token => {
          if (tool.name.toLowerCase().includes(token)) score += 4;
          if (tool.description?.toLowerCase().includes(token)) score += 2;
          if (tool.category?.toLowerCase().includes(token)) score += 2;
        });
        if (query.includes(tool.name.toLowerCase())) score += 6;
        if (score > 0) scoredLinks.push({ ...tool, score });
      });

      // Score All Calculators
      allCalculators.forEach(calc => {
        let score = 0;
        searchTokens.forEach(token => {
          if (calc.name.toLowerCase().includes(token) || calc.id.toLowerCase().includes(token)) score += 4;
          if (calc.category.toLowerCase().includes(token)) score += 3;
          if (calc.description.toLowerCase().includes(token) || calc.seoDescription?.toLowerCase().includes(token)) score += 2;
        });
        if (query.includes(calc.name.toLowerCase()) || query.includes(calc.id.toLowerCase().replace(/-/g, ' '))) score += 6;
        if (score > 0 && !scoredLinks.some(l => l.url === `/${calc.id}`)) {
          scoredLinks.push({
            name: calc.name,
            url: `/${calc.id}`,
            category: calc.category,
            description: calc.description,
            score
          });
        }
      });

      // Score All Blog Posts
      blogPosts.forEach(post => {
        let score = 0;
        searchTokens.forEach(token => {
          if (post.title.toLowerCase().includes(token) || post.slug.toLowerCase().includes(token)) score += 4;
          if (post.tags.some(t => t.toLowerCase().includes(token))) score += 3;
          if (post.category.toLowerCase().includes(token)) score += 2;
          if (post.description.toLowerCase().includes(token)) score += 1;
        });
        if (query.includes(post.title.toLowerCase())) score += 6;
        if (score > 0 && !scoredLinks.some(l => l.url === `/blog/${post.slug}`)) {
          scoredLinks.push({
            name: post.title,
            url: `/blog/${post.slug}`,
            category: "Guide",
            description: post.description,
            score
          });
        }
      });

      scoredLinks.sort((a, b) => b.score - a.score);
      const topLinks = scoredLinks.slice(0, 4);

      let replyText = "";
      if (query.includes("sip") || query.includes("dollar cost") || query.includes("dca") || query.includes("monthly")) {
        replyText = "💡 **Systematic Investment Plans (SIP)** allow you to automate monthly investments. By contributing consistently across market cycles, you benefit from **Dollar Cost Averaging**—buying more mutual fund units when markets dip and fewer when they rise. Over 15-20 years, compounding turns ordinary savings into extraordinary wealth!\n\n👇 **Recommended calculators and guide:**";
      } else if (query.includes("expense ratio") || query.includes("fee") || query.includes("charge")) {
        replyText = "💡 An **Expense Ratio** is the annual management fee charged by mutual funds or ETFs, silently deducted from your daily NAV returns. For example, a 1% fee on a $100,000 portfolio costs you $1,000 every year regardless of market direction! Over decades, keeping fees low preserves tens of thousands of dollars in compounding gains.\n\n👇 **Recommended calculators to check return impact:**";
      } else if (query.includes("health") || query.includes("score") || query.includes("quiz") || query.includes("evaluate") || query.includes("check")) {
        replyText = "💡 Our **Financial Health Score** is an interactive 10-question evaluation measuring your emergency cash buffer, high-interest debt management, savings rate, and investing discipline. You get an instant grade out of 100 with a personalized action plan!\n\n👇 **Recommended tools:**";
      } else if (query.includes("net worth") || query.includes("asset") || query.includes("liability") || query.includes("xirr")) {
        replyText = "💡 Your **Net Worth** is everything you own (assets) minus everything you owe (liabilities)—the ultimate barometer of financial independence. To measure annual return rates across multiple irregular bank and portfolio cash flows, **XIRR** provides your exact personal growth rate.\n\n👇 **Calculate your numbers or read our guides:**";
      } else if (query.includes("retire") || query.includes("fire") || query.includes("4%") || query.includes("four percent") || query.includes("pension") || query.includes("freedom")) {
        replyText = "💡 The **FIRE Movement** (Financial Independence, Retire Early) targets accumulating a portfolio worth **25x to 30x your annual expenses**. Under the landmark **4% Rule**, a diversified portfolio allows you to withdraw 4% adjusted for inflation annually without exhausting capital over a 30-year retirement.\n\n👇 **Recommended calculators and strategy guides:**";
      } else if (query.includes("loan") || query.includes("emi") || query.includes("prepay") || query.includes("mortgage") || query.includes("interest") || query.includes("debt")) {
        replyText = "💡 In early loan tenure years, your monthly **EMI** goes predominantly toward paying interest rather than reducing principal. Making periodic **prepayments** (like 1 extra EMI annually) reduces principal directly, cutting years off your tenure and saving thousands in interest!\n\n👇 **Simulate your loan savings:**";
      } else if (query.includes("gold") || query.includes("sgb") || query.includes("commodity") || query.includes("hedge")) {
        replyText = "💡 While **Gold** historically underperforms productive global equities over long horizons, it serves a vital purpose: acting as a behavioral hedge and crisis buffer during stock market crashes to keep your portfolio stable.\n\n👇 **Model gold returns or read our honest assessment:**";
      } else if (topLinks.length > 0) {
        replyText = `💡 Here are the top interactive calculators and educational guides matching **"${queryInput}"**. Our tools process numbers instantly in your browser with zero data storage.\n\n👇 **Recommended next steps:** Select a tool below to run your numbers or explore the guide:`;
      } else {
        replyText = `💡 I couldn't find an exact title match for **"${queryInput}"**, but I am continuously indexing new tools! You can explore our most popular calculators and deep-dive guides below to jumpstart your wealth building:`;
      }

      const finalLinks = topLinks.length > 0 ? topLinks : [
        { name: "Financial Health Score Quiz", url: "/financial-health-score", category: "Interactive Quiz", description: "Take our 10-question evaluation to get your personalized grade out of 100." },
        { name: "SIP Goal Planner", url: "/sip-goal-planner", category: "Goal Planning", description: "Target amount calculator showing monthly SIP needed to hit milestones." },
        { name: "SIP Calculator", url: "/sip-calculator", category: "Investing", description: "Calculate wealth accumulation through systematic monthly investing." },
        { name: "Is Gold a Good Investment?", url: "/blog/is-gold-a-good-investment", category: "Guide", description: "The honest behavioral case for and against investing in gold." }
      ];

      setMessages((prev) => [...prev, {
        id: responseId,
        sender: "bot",
        text: replyText,
        links: finalLinks,
        chips: ["↩️ Back to main menu"]
      }]);
    }, 500);
  };

  return (
    <>
      {/* Floating Action Button (FAB) */}
      <div className="fixed bottom-[calc(4.5rem+env(safe-area-inset-bottom))] right-4 sm:bottom-5 sm:right-5 z-45 print:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close MazeAssist" : "Open MazeAssist"}
          className={`h-12 w-12 rounded-full bg-gradient-to-tr from-emerald-600 via-emerald-500 to-teal-400 hover:from-emerald-500 hover:to-teal-300 text-white flex items-center justify-center shadow-lg hover:shadow-xl hover:shadow-emerald-500/30 hover:scale-105 active:scale-95 transition-all cursor-pointer relative ${
            isOpen ? "rotate-90" : ""
          }`}
        >
          {isOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Bot className="h-6 w-6" />
          )}
          {!isOpen && (
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border border-white dark:border-zinc-950"></span>
            </span>
          )}
        </button>
      </div>

      {/* Chat Window Panel */}
      {isOpen && (
        <div
          role="dialog"
          aria-labelledby="assist-title"
          className="fixed bottom-[calc(8rem+env(safe-area-inset-bottom))] right-4 sm:bottom-20 sm:right-5 z-45 w-[calc(100vw-2rem)] sm:w-[340px] h-[420px] max-h-[70vh] rounded-2xl border border-zinc-150 dark:border-zinc-800 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 fade-in duration-200 print:hidden"
        >
          {/* Header Panel */}
          <div className="p-3.5 bg-zinc-900 text-white flex items-center justify-between border-b border-zinc-800">
            <div className="flex items-center space-x-2.5">
              <img src="/logo.png" alt="WealthMaze Logo" className="h-7 w-7 rounded-lg object-cover border border-zinc-700 shadow-sm" />
              <div>
                <h3 id="assist-title" className="text-xs font-bold tracking-wide">
                  MazeAssist
                </h3>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close dialog"
              className="h-7 w-7 rounded-lg hover:bg-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Conversation Feed */}
          <div className="flex-grow p-3.5 overflow-y-auto space-y-4 text-sm scrollbar-thin scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-800">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col space-y-1.5 ${
                  msg.sender === "user" ? "items-end" : "items-start"
                }`}
              >
                {/* Chat Bubble */}
                <div
                  className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed whitespace-pre-line ${
                    msg.sender === "user"
                      ? "bg-emerald-500 text-white rounded-tr-none font-medium"
                      : "bg-zinc-100 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 rounded-tl-none border border-zinc-150/40 dark:border-zinc-800/40"
                  }`}
                >
                  {msg.text}
                </div>

                {/* Dynamic Link Cards */}
                {msg.links && msg.links.length > 0 && (
                  <div className="w-[88%] space-y-2 mt-1">
                    {msg.links.map((link, i) => (
                      <Link
                        key={i}
                        href={link.url}
                        onClick={() => setIsOpen(false)}
                        className="group flex flex-col p-2.5 bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 rounded-xl hover:border-emerald-500/50 hover:shadow-sm transition-all"
                      >
                        <div className="flex justify-between items-center text-[9px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                          <span>{link.category}</span>
                          <ArrowRight className="h-3 w-3 text-zinc-300 dark:text-zinc-600 group-hover:translate-x-0.5 group-hover:text-emerald-500 transition-all" />
                        </div>
                        <h4 className="text-[11px] font-bold text-zinc-800 dark:text-zinc-150 mt-1 group-hover:text-emerald-500 transition-colors">
                          {link.name}
                        </h4>
                        {link.description && (
                          <p className="text-[10px] text-zinc-450 dark:text-zinc-400 mt-0.5 line-clamp-1 leading-normal">
                            {link.description}
                          </p>
                        )}
                      </Link>
                    ))}
                  </div>
                )}

                {/* Inline pill suggestions (Chips) */}
                {msg.chips && msg.chips.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1 w-full max-w-[88%]">
                    {msg.chips.map((chip, idx) => (
                      <button
                        key={idx}
                        onClick={() => processUserQuery(chip)}
                        className="text-left px-3 py-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-800/80 hover:bg-emerald-500 hover:text-white dark:hover:bg-emerald-600 text-zinc-700 dark:text-zinc-300 transition-all font-medium border border-zinc-200 dark:border-zinc-700/60 shadow-2xs hover:shadow-sm cursor-pointer flex items-center justify-between group"
                      >
                        {chip}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Typing Indicator Bubble */}
            {isTyping && (
              <div className="flex items-center space-x-1 bg-zinc-100 dark:bg-zinc-900 border border-zinc-150/40 dark:border-zinc-800/40 rounded-2xl rounded-tl-none p-3.5 w-16">
                <span className="h-1.5 w-1.5 rounded-full bg-zinc-400 animate-bounce [animation-delay:-0.3s]"></span>
                <span className="h-1.5 w-1.5 rounded-full bg-zinc-400 animate-bounce [animation-delay:-0.15s]"></span>
                <span className="h-1.5 w-1.5 rounded-full bg-zinc-400 animate-bounce"></span>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Message Input Form */}
          <form
            onSubmit={(e) => { e.preventDefault(); if (inputValue.trim()) processUserQuery(inputValue); }}
            className="p-2.5 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 flex items-center space-x-2 mt-auto"
          >
            <input
              type="text"
              placeholder="Ask a money question or find a tool..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="flex-grow h-9 px-3 bg-white dark:bg-zinc-900 border border-zinc-250 dark:border-zinc-800 rounded-xl text-[11px] text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
            />
            <button
              type="submit"
              disabled={!inputValue.trim()}
              className="h-9 w-9 rounded-xl bg-emerald-500 hover:bg-emerald-600 disabled:bg-zinc-100 dark:disabled:bg-zinc-900 disabled:text-zinc-300 dark:disabled:text-zinc-700 text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
