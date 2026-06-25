"use client";

import * as React from "react";
import Link from "next/link";
import { MessageSquare, X, Send, Sparkles, HelpCircle, ArrowRight, User, Clock, ChevronRight } from "lucide-react";
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

// Guided decision tree configuration
const DECISION_TREE: Record<string, { text: string; chips: string[] }> = {
  welcome: {
    text: "Hello! I am MazeAssist, your WealthMaze helper. I can help you find calculators, read guides, or answer general money questions. What are you looking to do today?",
    chips: ["📈 Calculate Returns", "💸 Manage Loan & Debt", "📝 Estimate Taxes", "📚 Read Blog Articles"],
  },
  returns: {
    text: "Got it! Are you investing a fixed amount monthly (SIP) or making a one-time investment (Lump Sum)?",
    chips: ["🔄 Monthly SIP", "💰 One-time Lump Sum", "📈 CAGR Growth Rate", "↩️ Back to main menu"],
  },
  loans: {
    text: "Loans can be complex. What calculation do you need to perform?",
    chips: ["🏠 Calculate Monthly EMI", "💸 Prepayment Savings", "↩️ Back to main menu"],
  },
  taxes: {
    text: "Taxes depend on your region and income source. What are you estimating?",
    chips: ["💼 Income Tax Slabs", "📈 Capital Gains Tax", "↩️ Back to main menu"],
  },
  blogs: {
    text: "We publish expert guides regularily. What topic are you interested in?",
    chips: ["🪙 Wealth Building", "🌱 Early Investing", "💸 Savings Habits", "↩️ Back to main menu"],
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
  const handleChipClick = (chip: string) => {
    // Add user's choice to messages
    const userMessageId = `user-${Date.now()}`;
    const newMessages = [
      ...messages,
      { id: userMessageId, sender: "user" as const, text: chip },
    ];
    setMessages(newMessages);

    // Trigger bot response
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      
      let botResponse: Message;
      const responseId = `bot-${Date.now()}`;

      // Navigation routing based on chip text
      switch (chip) {
        case "↩️ Back to main menu":
          botResponse = {
            id: responseId,
            sender: "bot",
            text: DECISION_TREE.welcome.text,
            chips: DECISION_TREE.welcome.chips,
          };
          break;
        case "📈 Calculate Returns":
          botResponse = {
            id: responseId,
            sender: "bot",
            text: DECISION_TREE.returns.text,
            chips: DECISION_TREE.returns.chips,
          };
          break;
        case "💸 Manage Loan & Debt":
          botResponse = {
            id: responseId,
            sender: "bot",
            text: DECISION_TREE.loans.text,
            chips: DECISION_TREE.loans.chips,
          };
          break;
        case "📝 Estimate Taxes":
          botResponse = {
            id: responseId,
            sender: "bot",
            text: DECISION_TREE.taxes.text,
            chips: DECISION_TREE.taxes.chips,
          };
          break;
        case "📚 Read Blog Articles":
          botResponse = {
            id: responseId,
            sender: "bot",
            text: DECISION_TREE.blogs.text,
            chips: DECISION_TREE.blogs.chips,
          };
          break;

        // Leaf-nodes: Returns options
        case "🔄 Monthly SIP":
          botResponse = {
            id: responseId,
            sender: "bot",
            text: "Calculate systematic investment growth over time. You can use these tools:",
            links: [
              { name: "SIP Calculator", url: "/sip-calculator", category: "Investing", description: "Project monthly mutual fund SIP returns and compounding." },
              { name: "Gold SIP Calculator", url: "/gold-sip-calculator", category: "Gold", description: "Estimate paper gold monthly SIP returns." }
            ],
            chips: ["↩️ Back to main menu"]
          };
          break;
        case "💰 One-time Lump Sum":
          botResponse = {
            id: responseId,
            sender: "bot",
            text: "Calculate compound growth for one-time investments. These tools are recommended:",
            links: [
              { name: "Lumpsum Calculator", url: "/lumpsum-calculator", category: "Investing", description: "Project one-time mutual fund returns." },
              { name: "Investment Growth Calculator", url: "/investment-growth-calculator", category: "Investing", description: "Compare diverse portfolio scenarios." }
            ],
            chips: ["↩️ Back to main menu"]
          };
          break;
        case "📈 CAGR Growth Rate":
          botResponse = {
            id: responseId,
            sender: "bot",
            text: "Determine annual compounded performance of your stocks or assets:",
            links: [
              { name: "CAGR Calculator", url: "/cagr-calculator", category: "Stocks", description: "Find Compound Annual Growth Rate for buy/sell points." }
            ],
            chips: ["↩️ Back to main menu"]
          };
          break;

        // Leaf-nodes: Loans options
        case "🏠 Calculate Monthly EMI":
          botResponse = {
            id: responseId,
            sender: "bot",
            text: "Estimate monthly loan installments, interest payouts, and amortization schedules:",
            links: [
              { name: "EMI Calculator", url: "/emi-calculator", category: "Loans", description: "General loan planner for home, car, or personal loans." }
            ],
            chips: ["↩️ Back to main menu"]
          };
          break;
        case "💸 Prepayment Savings":
          botResponse = {
            id: responseId,
            sender: "bot",
            text: "Calculate how making lump sum prepayments cuts down interest and shortens loan tenures:",
            links: [
              { name: "Loan Prepayment Calculator", url: "/loan-prepayment-calculator", category: "Loans", description: "Find interest savings and tenure reduction." }
            ],
            chips: ["↩️ Back to main menu"]
          };
          break;

        // Leaf-nodes: Taxes options
        case "💼 Income Tax Slabs":
          botResponse = {
            id: responseId,
            sender: "bot",
            text: "Compare annual tax liabilities under Old vs New Slab regimes:",
            links: [
              { name: "Income Tax Calculator", url: "/income-tax-calculator", category: "Tax", description: "Estimate taxes and deductions." }
            ],
            chips: ["↩️ Back to main menu"]
          };
          break;
        case "📈 Capital Gains Tax":
          botResponse = {
            id: responseId,
            sender: "bot",
            text: "Estimate tax liabilities on mutual funds, stock sales, or real estate assets:",
            links: [
              { name: "Capital Gains Tax Calculator", url: "/capital-gains-calculator", category: "Tax", description: "Short-term & long-term capital gains calculations." }
            ],
            chips: ["↩️ Back to main menu"]
          };
          break;

        // Leaf-nodes: Blogs categories
        case "🪙 Wealth Building":
          botResponse = {
            id: responseId,
            sender: "bot",
            text: "Here are our latest guides on wealth creation habits:",
            links: [
              { name: "Why Most People Never Build Wealth", url: "/blog/why-most-people-never-build-wealth", category: "Guide" },
              { name: "Wealth vs Income: High Earners Pitfalls", url: "/blog/wealth-vs-income", category: "Guide" }
            ],
            chips: ["↩️ Back to main menu"]
          };
          break;
        case "🌱 Early Investing":
          botResponse = {
            id: responseId,
            sender: "bot",
            text: "Learn why time beats higher interest rates:",
            links: [
              { name: "The Power of Starting Early in Compounding", url: "/blog/power-of-starting-early", category: "Guide" }
            ],
            chips: ["↩️ Back to main menu"]
          };
          break;
        case "💸 Savings Habits":
          botResponse = {
            id: responseId,
            sender: "bot",
            text: "Discover how tiny cuts compound into large wealth baskets:",
            links: [
              { name: "How Small Financial Decisions Compound", url: "/blog/small-financial-decisions-compound", category: "Guide" },
              { name: "A Simplified Path to Financial Freedom", url: "/blog/financial-freedom-is-simpler", category: "Guide" }
            ],
            chips: ["↩️ Back to main menu"]
          };
          break;

        default:
          botResponse = {
            id: responseId,
            sender: "bot",
            text: "I didn't quite catch that. Would you like to return to the main menu?",
            chips: ["↩️ Back to main menu"],
          };
      }

      setMessages((prev) => [...prev, botResponse]);
    }, 500);
  };

  // Local conversational search query parser
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userText = inputValue;
    const userMessageId = `user-${Date.now()}`;
    setMessages((prev) => [...prev, { id: userMessageId, sender: "user", text: userText }]);
    setInputValue("");

    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const query = userText.toLowerCase().trim();
      const responseId = `bot-${Date.now()}`;
      
      const foundLinks: ChatLink[] = [];

      // Keyword matchers for calculators mapping
      const keywordMap: Record<string, string[]> = {
        sip: ["sip-calculator", "mutual-fund-return-calculator", "gold-sip-calculator"],
        lump: ["lumpsum-calculator", "investment-growth-calculator"],
        cagr: ["cagr-calculator"],
        xirr: ["xirr-calculator"],
        swp: ["swp-calculator"],
        emi: ["emi-calculator", "loan-prepayment-calculator"],
        loan: ["emi-calculator", "loan-prepayment-calculator"],
        debt: ["loan-prepayment-calculator"],
        tax: ["income-tax-calculator", "capital-gains-calculator"],
        ppf: ["ppf-calculator"],
        epf: ["epf-calculator"],
        nps: ["nps-calculator"],
        fd: ["fd-calculator"],
        rd: ["rd-calculator"],
        retire: ["retirement-calculator", "fire-calculator", "financial-freedom-calculator"],
        fire: ["fire-calculator", "financial-independence-calculator"],
        gold: ["gold-investment-calculator", "gold-sip-calculator"],
        saving: ["savings-calculator", "goal-based-investment-calculator"],
        inflation: ["inflation-calculator", "inflation-impact-calculator"]
      };

      // Scan for matching keywords to collect calculator routes
      Object.keys(keywordMap).forEach((keyword) => {
        if (query.includes(keyword)) {
          keywordMap[keyword].forEach((calcId) => {
            const calc = allCalculators.find((c) => c.id === calcId);
            if (calc && !foundLinks.some((l) => l.url === `/${calc.id}`)) {
              foundLinks.push({
                name: calc.name,
                url: `/${calc.id}`,
                category: calc.category,
                description: calc.description
              });
            }
          });
        }
      });

      // Simple dynamic substring search against all calculators titles
      allCalculators.forEach((calc) => {
        if (calc.name.toLowerCase().includes(query) && !foundLinks.some((l) => l.url === `/${calc.id}`)) {
          foundLinks.push({
            name: calc.name,
            url: `/${calc.id}`,
            category: calc.category,
            description: calc.description
          });
        }
      });

      // Scan blog posts
      blogPosts.forEach((post) => {
        const matchesQuery = 
          post.title.toLowerCase().includes(query) || 
          post.description.toLowerCase().includes(query) ||
          post.tags.some(t => t.toLowerCase().includes(query));

        if (matchesQuery && !foundLinks.some((l) => l.url === `/blog/${post.slug}`)) {
          foundLinks.push({
            name: post.title,
            url: `/blog/${post.slug}`,
            category: "Guide",
            description: post.description
          });
        }
      });

      // Construct bot response bubble
      let botResponse: Message;

      if (foundLinks.length > 0) {
        // Return matching links list (sliced to top 3 for clean layout)
        botResponse = {
          id: responseId,
          sender: "bot",
          text: `I scanned our system and found these matches for "${userText}":`,
          links: foundLinks.slice(0, 3),
          chips: ["↩️ Back to main menu"]
        };
      } else {
        // Fallback response for unmatched items
        botResponse = {
          id: responseId,
          sender: "bot",
          text: `I couldn't find any direct calculator or blog article matching "${userText}". I am configured strictly for financial numbers!\n\nTry searching for common terms like "SIP", "Loan EMI", or "Income Tax". Alternatively, check our most popular tools:`,
          links: [
            { name: "SIP Calculator", url: "/sip-calculator", category: "Investing" },
            { name: "EMI Calculator", url: "/emi-calculator", category: "Loans" },
            { name: "Income Tax Calculator", url: "/income-tax-calculator", category: "Tax" }
          ],
          chips: ["↩️ Back to main menu"]
        };
      }

      setMessages((prev) => [...prev, botResponse]);
    }, 600);
  };

  return (
    <>
      {/* Floating Action Button (FAB) */}
      <div className="fixed bottom-[calc(5rem+env(safe-area-inset-bottom))] right-6 z-45 print:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close MazeAssist" : "Open MazeAssist"}
          className={`h-12 w-12 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer relative ${
            isOpen ? "rotate-90" : ""
          }`}
        >
          {isOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <MessageSquare className="h-5 w-5" />
          )}
          {!isOpen && (
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
          )}
        </button>
      </div>

      {/* Chat Window Panel */}
      {isOpen && (
        <div
          role="dialog"
          aria-labelledby="assist-title"
          className="fixed bottom-[calc(9rem+env(safe-area-inset-bottom))] right-6 z-45 w-[330px] sm:w-[380px] h-[480px] sm:h-[520px] rounded-2xl border border-zinc-150 dark:border-zinc-800 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 fade-in duration-200 print:hidden"
        >
          {/* Header */}
          <header className="px-4 py-3 bg-zinc-50 dark:bg-zinc-900/50 border-b border-zinc-150 dark:border-zinc-800 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="h-7 w-7 rounded-lg bg-emerald-500 flex items-center justify-center text-white">
                <Sparkles className="h-4 w-4" />
              </div>
              <div>
                <h2 id="assist-title" className="text-xs font-bold text-zinc-850 dark:text-zinc-100 tracking-tight leading-none">
                  MazeAssist
                </h2>
                <span className="text-[9px] font-semibold text-emerald-500">
                  Online navigation helper
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg text-zinc-400 hover:text-zinc-650 dark:hover:text-zinc-300 transition-colors focus:outline-none"
              aria-label="Close panel"
            >
              <X className="h-4 w-4" />
            </button>
          </header>

          {/* Messages Container */}
          <div className="flex-grow overflow-y-auto p-4 space-y-4 max-h-[340px] sm:max-h-[380px]">
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
                  <div className="w-[85%] space-y-2 mt-1">
                    {msg.links.map((link, i) => (
                      <Link
                        key={i}
                        href={link.url}
                        onClick={() => setIsOpen(false)}
                        className="group flex flex-col p-2.5 bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 rounded-xl hover:border-emerald-500/50 hover:shadow-sm transition-all"
                      >
                        <div className="flex justify-between items-center text-[9px] font-bold text-zinc-400 dark:text-zinc-500 uppercase">
                          <span>{link.category}</span>
                          <ArrowRight className="h-3 w-3 text-zinc-300 dark:text-zinc-600 group-hover:translate-x-0.5 group-hover:text-emerald-500 transition-all" />
                        </div>
                        <h4 className="text-[11px] font-bold text-zinc-800 dark:text-zinc-150 mt-1 group-hover:text-emerald-500 transition-colors">
                          {link.name}
                        </h4>
                        {link.description && (
                          <p className="text-[10px] text-zinc-450 dark:text-zinc-500 mt-0.5 line-clamp-1">
                            {link.description}
                          </p>
                        )}
                      </Link>
                    ))}
                  </div>
                )}

                {/* Inline pill suggestions (Chips) */}
                {msg.chips && msg.chips.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1 w-full max-w-[85%]">
                    {msg.chips.map((chip, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleChipClick(chip)}
                        className="px-2.5 py-1 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-full text-[10px] font-bold text-zinc-700 dark:text-zinc-300 hover:border-emerald-500/50 hover:text-emerald-500 dark:hover:text-emerald-400 active:scale-95 transition-all shadow-sm cursor-pointer"
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
            onSubmit={handleSendMessage}
            className="p-3 bg-zinc-50 dark:bg-zinc-900/30 border-t border-zinc-150 dark:border-zinc-800 flex items-center space-x-2 mt-auto"
          >
            <input
              type="text"
              placeholder="Ask anything (e.g. SIP, EMI)..."
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
