"use client";

import * as React from "react";
import Link from "next/link";
import { CheckCircle2, ArrowRight, RotateCcw, Share2, Download, ShieldCheck, AlertCircle, Award, Sparkles, ChevronRight } from "lucide-react";

interface QuestionOption {
  label: string;
  points: number;
}

interface Question {
  id: string;
  category: string;
  question: string;
  options: QuestionOption[];
  actionItem: string;
  actionLinkText?: string;
  actionLinkUrl?: string;
}

const QUESTIONS: Question[] = [
  {
    id: "q1",
    category: "Emergency Fund",
    question: "How many months of expenses do you have saved in an easily accessible account?",
    options: [
      { label: "I have no emergency fund", points: 0 },
      { label: "Less than 1 month", points: 2 },
      { label: "1–2 months", points: 5 },
      { label: "3–5 months", points: 8 },
      { label: "6 months or more", points: 10 },
    ],
    actionItem: "Build your emergency fund to 6 months of expenses. Start with a dedicated high-yield savings account.",
    actionLinkText: "Use Emergency Fund Calculator →",
    actionLinkUrl: "/savings-calculator",
  },
  {
    id: "q2",
    category: "High Interest Debt",
    question: "Do you carry high-interest debt? (credit cards, personal loans above 10%)",
    options: [
      { label: "Yes, and I'm struggling to pay it", points: 0 },
      { label: "Yes, but I'm making minimum payments", points: 3 },
      { label: "Yes, but I'm actively paying it down", points: 6 },
      { label: "No high-interest debt at all", points: 10 },
    ],
    actionItem: "Prioritise eliminating high-interest debt before investing. Every dollar of 20% credit card debt paid off is a guaranteed 20% return.",
    actionLinkText: "Use Loan Calculator →",
    actionLinkUrl: "/emi-calculator",
  },
  {
    id: "q3",
    category: "Savings Rate",
    question: "What percentage of your monthly income do you save or invest?",
    options: [
      { label: "I spend everything I earn", points: 0 },
      { label: "Less than 5%", points: 3 },
      { label: "5–10%", points: 5 },
      { label: "11–20%", points: 8 },
      { label: "More than 20%", points: 10 },
    ],
    actionItem: "Increase your savings rate by 1% every month until you reach 20%. Automate it on payday before you can spend it.",
    actionLinkText: "Use SIP Calculator →",
    actionLinkUrl: "/sip-calculator",
  },
  {
    id: "q4",
    category: "Retirement Planning",
    question: "Are you actively saving for retirement?",
    options: [
      { label: "No, I haven't started", points: 0 },
      { label: "I plan to start soon", points: 3 },
      { label: "Yes, occasionally", points: 5 },
      { label: "Yes, I contribute regularly", points: 8 },
      { label: "Yes, I'm on track for my retirement goal", points: 10 },
    ],
    actionItem: "Start a retirement contribution today — even $50/month invested for 30 years at 10% becomes $113,000.",
    actionLinkText: "Use Retirement Calculator →",
    actionLinkUrl: "/retirement-calculator",
  },
  {
    id: "q5",
    category: "Investment Diversification",
    question: "How is your money currently invested?",
    options: [
      { label: "I don't invest at all", points: 0 },
      { label: "All in cash or savings account", points: 2 },
      { label: "Only in fixed deposits or bonds", points: 4 },
      { label: "Mix of safe and equity investments", points: 7 },
      { label: "Well diversified across stocks, bonds, gold, and cash", points: 10 },
    ],
    actionItem: "Diversify beyond cash. A simple 3-fund portfolio — total market index, international index, bonds — covers 99% of what you need.",
    actionLinkText: "Use Portfolio Return Calculator →",
    actionLinkUrl: "/portfolio-return-calculator",
  },
  {
    id: "q6",
    category: "Insurance Coverage",
    question: "Do you have adequate insurance coverage?",
    options: [
      { label: "No insurance at all", points: 0 },
      { label: "Health insurance only", points: 4 },
      { label: "Health and life insurance", points: 7 },
      { label: "Health, life, and disability/income protection", points: 10 },
    ],
    actionItem: "Get term life insurance and health insurance before any other financial product. These protect everything else you build.",
    actionLinkText: "Read our Guides →",
    actionLinkUrl: "/blog",
  },
  {
    id: "q7",
    category: "Budget Awareness",
    question: "Do you track your monthly income and expenses?",
    options: [
      { label: "No idea where my money goes", points: 0 },
      { label: "Roughly aware but don't track", points: 3 },
      { label: "I track occasionally", points: 6 },
      { label: "I track consistently every month", points: 10 },
    ],
    actionItem: "Track every dollar for 30 days. You cannot optimise what you cannot see. Use any free budgeting app or a simple spreadsheet.",
  },
  {
    id: "q8",
    category: "Financial Goals",
    question: "Do you have specific written financial goals?",
    options: [
      { label: "No financial goals", points: 0 },
      { label: "Vague goals in my head", points: 3 },
      { label: "Clear goals but no plan", points: 6 },
      { label: "Clear goals with a written action plan", points: 10 },
    ],
    actionItem: "Write down one 5-year financial goal today with a specific dollar amount and date. Goals without numbers are wishes.",
    actionLinkText: "Use Financial Freedom Calculator →",
    actionLinkUrl: "/financial-freedom-calculator",
  },
  {
    id: "q9",
    category: "Net Worth Awareness",
    question: "Do you know your current net worth (assets minus liabilities)?",
    options: [
      { label: "No idea", points: 0 },
      { label: "Rough estimate only", points: 5 },
      { label: "Yes, I calculate it regularly", points: 10 },
    ],
    actionItem: "Calculate your net worth right now. It takes 10 minutes and becomes your most important financial metric going forward.",
    actionLinkText: "Use Net Worth Calculator →",
    actionLinkUrl: "/net-worth-calculator",
  },
  {
    id: "q10",
    category: "Income Diversification",
    question: "Do you have any income sources beyond your primary job or business?",
    options: [
      { label: "No, single income source only", points: 0 },
      { label: "Small side income occasionally", points: 4 },
      { label: "One additional consistent income stream", points: 7 },
      { label: "Multiple income streams beyond primary job", points: 10 },
    ],
    actionItem: "Build one additional income stream this year — freelancing, dividend investing, or a digital product. Single income dependency is your biggest financial risk.",
    actionLinkText: "Read our Dividend Guide →",
    actionLinkUrl: "/blog/what-is-a-dividend-60s",
  },
];

interface SavedQuizData {
  answers: number[];
  score: number;
  date: string;
}

const LOCAL_STORAGE_KEY = "wealthmaze_financial_health_quiz";

export function FinancialHealthQuiz() {
  const [currentStep, setCurrentStep] = React.useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = React.useState<number[]>(new Array(QUESTIONS.length).fill(-1));
  const [viewState, setViewState] = React.useState<"intro" | "quiz" | "results">("intro");
  const [savedData, setSavedData] = React.useState<SavedQuizData | null>(null);
  
  // Animated score state
  const [displayScore, setDisplayScore] = React.useState<number>(0);

  // Check localStorage on mount
  React.useEffect(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        const parsed: SavedQuizData = JSON.parse(stored);
        if (parsed && Array.isArray(parsed.answers) && typeof parsed.score === "number") {
          setSavedData(parsed);
          setSelectedAnswers(parsed.answers);
        }
      }
    } catch (e) {
      console.error("Failed to read quiz data from localStorage", e);
    }
  }, []);

  // Compute grade details
  const getGradeInfo = (score: number) => {
    if (score >= 85) return { letter: "A", label: "Financially Excellent", color: "text-emerald-500 border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30", barColor: "bg-emerald-500" };
    if (score >= 70) return { letter: "B", label: "Financially Strong", color: "text-emerald-500 border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30", barColor: "bg-emerald-500" };
    if (score >= 50) return { letter: "C", label: "Financially Developing", color: "text-amber-500 border-amber-500 bg-amber-50 dark:bg-amber-950/30", barColor: "bg-amber-500" };
    if (score >= 30) return { letter: "D", label: "Financially Vulnerable", color: "text-orange-500 border-orange-500 bg-orange-50 dark:bg-orange-950/30", barColor: "bg-orange-500" };
    return { letter: "F", label: "Financially At Risk", color: "text-rose-500 border-rose-500 bg-rose-50 dark:bg-rose-950/30", barColor: "bg-rose-500" };
  };

  const totalScore = React.useMemo(() => {
    return selectedAnswers.reduce((acc, optIdx, qIdx) => {
      if (optIdx === -1) return acc;
      return acc + QUESTIONS[qIdx].options[optIdx].points;
    }, 0);
  }, [selectedAnswers]);

  const gradeInfo = getGradeInfo(totalScore);

  // Trigger score count-up animation when switching to results
  React.useEffect(() => {
    if (viewState === "results") {
      let startTime: number | null = null;
      const duration = 1500;
      const targetScore = totalScore;

      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // easeOut timing function: fast at start, slowing as it approaches the end
        const easeOutProgress = 1 - Math.pow(1 - progress, 3);
        const currentVal = Math.round(easeOutProgress * targetScore);
        
        setDisplayScore(currentVal);
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    }
  }, [viewState, totalScore]);

  // Handle option click
  const handleOptionSelect = (optionIndex: number) => {
    const updated = [...selectedAnswers];
    updated[currentStep] = optionIndex;
    setSelectedAnswers(updated);
  };

  // Next or Submit
  const handleNext = () => {
    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Calculate final score and save to localStorage
      const finalScore = selectedAnswers.reduce((acc, optIdx, qIdx) => {
        if (optIdx === -1) return acc;
        return acc + QUESTIONS[qIdx].options[optIdx].points;
      }, 0);

      const toSave: SavedQuizData = {
        answers: selectedAnswers,
        score: finalScore,
        date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      };

      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(toSave));
        setSavedData(toSave);
      } catch (e) {
        console.error("Failed to save quiz data", e);
      }

      setViewState("results");
    }
  };

  // Retake Quiz
  const handleRetake = () => {
    setSelectedAnswers(new Array(QUESTIONS.length).fill(-1));
    setCurrentStep(0);
    setViewState("quiz");
  };

  // Canvas PNG Generation & Download
  const generateAndDownloadPNG = () => {
    const canvas = document.createElement("canvas");
    canvas.width = 1200;
    canvas.height = 630;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Background
    ctx.fillStyle = "#09090b"; // dark zinc-950
    ctx.fillRect(0, 0, 1200, 630);

    // Border
    ctx.strokeStyle = "#27272a";
    ctx.lineWidth = 4;
    ctx.strokeRect(20, 20, 1160, 590);

    // Top-left Logo
    ctx.font = "bold 32px Inter, sans-serif";
    ctx.fillStyle = "#10b981"; // emerald-500
    ctx.fillText("WealthMaze", 60, 80);
    ctx.font = "18px Inter, sans-serif";
    ctx.fillStyle = "#71717a";
    ctx.fillText("FINANCIAL HEALTH ASSESSMENT", 240, 78);

    // Center Score Number
    ctx.font = "bold 130px Inter, sans-serif";
    ctx.fillStyle = "#ffffff";
    const scoreStr = `${totalScore}`;
    const scoreWidth = ctx.measureText(scoreStr).width;
    ctx.fillText(scoreStr, 600 - scoreWidth - 10, 240);

    ctx.font = "bold 44px Inter, sans-serif";
    ctx.fillStyle = "#71717a";
    ctx.fillText("/ 100", 600 + 10, 240);

    // Grade Badge
    const gradeText = `Grade ${gradeInfo.letter} — ${gradeInfo.label}`;
    ctx.font = "bold 28px Inter, sans-serif";
    const badgeWidth = ctx.measureText(gradeText).width + 60;
    const badgeX = 600 - badgeWidth / 2;
    const badgeY = 280;

    ctx.fillStyle = gradeInfo.letter === "A" || gradeInfo.letter === "B" ? "#064e3b" : gradeInfo.letter === "C" ? "#78350f" : "#7f1d1d";
    ctx.beginPath();
    ctx.roundRect(badgeX, badgeY, badgeWidth, 54, 27);
    ctx.fill();
    ctx.strokeStyle = gradeInfo.letter === "A" || gradeInfo.letter === "B" ? "#10b981" : gradeInfo.letter === "C" ? "#f59e0b" : "#ef4444";
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = "#ffffff";
    ctx.fillText(gradeText, badgeX + 30, badgeY + 36);

    // Category Breakdown Preview (10 bars across 2 columns)
    ctx.font = "bold 16px Inter, sans-serif";
    const leftColX = 100;
    const rightColX = 640;
    let startY = 380;

    QUESTIONS.forEach((q, idx) => {
      const colX = idx < 5 ? leftColX : rightColX;
      const rowY = startY + (idx % 5) * 36;
      const pts = selectedAnswers[idx] !== -1 ? q.options[selectedAnswers[idx]].points : 0;

      ctx.fillStyle = "#a1a1aa";
      ctx.fillText(q.category, colX, rowY);

      // Draw bar background
      ctx.fillStyle = "#27272a";
      ctx.beginPath();
      ctx.roundRect(colX + 240, rowY - 14, 200, 16, 8);
      ctx.fill();

      // Draw active fill
      const fillWidth = (pts / 10) * 200;
      ctx.fillStyle = pts >= 8 ? "#10b981" : pts >= 5 ? "#f59e0b" : "#ef4444";
      ctx.beginPath();
      ctx.roundRect(colX + 240, rowY - 14, Math.max(16, fillWidth), 16, 8);
      ctx.fill();

      // Points text
      ctx.fillStyle = "#ffffff";
      ctx.fillText(`${pts}/10`, colX + 455, rowY);
    });

    // Bottom Footer
    ctx.fillStyle = "#18181b";
    ctx.fillRect(22, 560, 1156, 48);
    ctx.font = "bold 20px Inter, sans-serif";
    ctx.fillStyle = "#10b981";
    ctx.fillText("Take the free quiz at wealthmaze.in/financial-health-score", 340, 590);

    // Download PNG
    const link = document.createElement("a");
    link.download = `WealthMaze-Financial-Health-Score-${totalScore}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
      {/* Returning User LocalStorage Banner (Note 2) */}
      {savedData && viewState === "intro" && (
        <div className="p-6 bg-emerald-500/10 border-2 border-emerald-500/30 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-4 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex items-center space-x-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center font-black text-xl shrink-0 shadow-lg shadow-emerald-500/20">
              {savedData.score}
            </div>
            <div>
              <h3 className="text-base font-extrabold text-zinc-900 dark:text-white">
                Welcome back! You last scored {savedData.score}/100 on {savedData.date}.
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Retake the quiz to track your progress after completing your financial action plan.
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3 shrink-0 w-full sm:w-auto justify-center">
            <button
              onClick={() => {
                setSelectedAnswers(savedData.answers);
                setViewState("results");
              }}
              className="px-4 py-2.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-emerald-500 rounded-xl text-xs font-bold text-zinc-800 dark:text-zinc-200 transition-all shadow-sm"
            >
              See My Previous Results
            </button>
            <button
              onClick={handleRetake}
              className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-emerald-500/20 flex items-center space-x-1.5"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Retake Quiz</span>
            </button>
          </div>
        </div>
      )}

      {/* INTRO VIEW */}
      {viewState === "intro" && (
        <div className="text-center space-y-8 max-w-2xl mx-auto py-6">
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Free Personal Finance Assessment</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-black text-zinc-900 dark:text-white tracking-tight leading-tight">
            How Financially Healthy Are You? <br />
            <span className="bg-gradient-to-r from-emerald-500 to-indigo-500 bg-clip-text text-transparent">
              Get Your Score Out of 100
            </span>
          </h1>

          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed">
            Answer 10 quick multiple-choice questions across core pillars of personal finance — emergency savings, debt management, retirement tracking, and insurance protection. Get instant results and a tailored action plan.
          </p>

          <div className="pt-2">
            <button
              onClick={() => setViewState("quiz")}
              className="px-8 py-4 bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white rounded-2xl text-base font-extrabold shadow-xl shadow-emerald-500/25 transition-all duration-200 inline-flex items-center space-x-3 group"
            >
              <span>Start Free 3-Minute Quiz</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Disclaimer 1 — Required Educational Disclaimer */}
          <div className="pt-6 border-t border-zinc-100 dark:border-zinc-900/80">
            <p className="text-[11px] text-zinc-400 dark:text-zinc-500 leading-relaxed max-w-xl mx-auto">
              This quiz is for educational and entertainment purposes only. Your Financial Health Score is a general indicator based on your self-reported answers and does not constitute financial advice, a professional financial assessment, or a recommendation of any kind. Results should not be taken as an accurate measure of your complete financial situation. Please consult a qualified financial advisor for personalised guidance.
            </p>
          </div>
        </div>
      )}

      {/* STEP-BY-STEP QUIZ VIEW */}
      {viewState === "quiz" && (
        <div className="space-y-6 max-w-2xl mx-auto animate-in fade-in duration-200">
          {/* Progress Bar & Header */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-zinc-500 dark:text-zinc-400">
              <span>Question {currentStep + 1} of {QUESTIONS.length}</span>
              <span className="text-emerald-500">{QUESTIONS[currentStep].category}</span>
            </div>
            <div className="w-full h-2.5 bg-zinc-100 dark:bg-zinc-900 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-indigo-500 transition-all duration-300 rounded-full"
                style={{ width: `${((currentStep + 1) / QUESTIONS.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Card */}
          <div className="p-6 sm:p-8 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-lg space-y-6">
            <h2 className="text-xl sm:text-2xl font-extrabold text-zinc-900 dark:text-white leading-snug">
              {QUESTIONS[currentStep].question}
            </h2>

            {/* Options List */}
            <div className="space-y-3">
              {QUESTIONS[currentStep].options.map((opt, optIdx) => {
                const isSelected = selectedAnswers[currentStep] === optIdx;
                return (
                  <button
                    key={optIdx}
                    onClick={() => handleOptionSelect(optIdx)}
                    className={`w-full p-4 rounded-2xl border-2 text-left transition-all duration-150 flex items-center justify-between ${
                      isSelected
                        ? "border-emerald-500 bg-emerald-50/80 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-100 shadow-md shadow-emerald-500/10 font-bold"
                        : "border-zinc-150 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/30 hover:border-zinc-300 dark:hover:border-zinc-700 text-zinc-700 dark:text-zinc-300 font-medium"
                    }`}
                  >
                    <span className="text-sm sm:text-base leading-snug pr-4">{opt.label}</span>
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${
                        isSelected
                          ? "border-emerald-500 bg-emerald-500 text-white"
                          : "border-zinc-300 dark:border-zinc-700"
                      }`}
                    >
                      {isSelected && <CheckCircle2 className="h-4 w-4" />}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Next / Calculate CTA Button */}
            {selectedAnswers[currentStep] !== -1 && (
              <div className="pt-4 border-t border-zinc-100 dark:border-zinc-900 flex justify-end animate-in fade-in duration-200">
                <button
                  onClick={handleNext}
                  className="px-8 py-3.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-sm font-extrabold shadow-lg shadow-emerald-500/20 transition-all flex items-center space-x-2"
                >
                  <span>{currentStep === QUESTIONS.length - 1 ? "Calculate My Score" : "Next Question"}</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* RESULTS VIEW */}
      {viewState === "results" && (
        <div className="space-y-12 animate-in fade-in duration-500">
          {/* 1. Score Display Card */}
          <div className="p-8 sm:p-10 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-xl text-center space-y-6 relative overflow-hidden">
            <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />

            <span className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest block">
              Your Personalised Financial Health Score
            </span>

            {/* Circular Progress Ring Representation */}
            <div className="relative w-48 h-48 mx-auto flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
                <circle
                  cx="60"
                  cy="60"
                  r="52"
                  className="text-zinc-100 dark:text-zinc-900 stroke-current"
                  strokeWidth="12"
                  fill="transparent"
                />
                <circle
                  cx="60"
                  cy="60"
                  r="52"
                  className={`${gradeInfo.barColor} stroke-current transition-all duration-1000`}
                  strokeWidth="12"
                  strokeDasharray="326.72"
                  strokeDashoffset={326.72 - (326.72 * displayScore) / 100}
                  strokeLinecap="round"
                  fill="transparent"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-5xl font-black text-zinc-900 dark:text-white tracking-tight">
                  {displayScore}
                </span>
                <span className="text-xs font-bold text-zinc-400 dark:text-zinc-500 mt-0.5">out of 100</span>
              </div>
            </div>

            {/* Grade Badge */}
            <div className="inline-flex items-center space-x-2 px-6 py-2.5 rounded-2xl border-2 font-black text-base shadow-sm">
              <span className={`px-2.5 py-0.5 rounded-lg text-white text-xs ${gradeInfo.barColor}`}>
                Grade {gradeInfo.letter}
              </span>
              <span className="text-zinc-900 dark:text-white font-extrabold">{gradeInfo.label}</span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
              <button
                onClick={generateAndDownloadPNG}
                className="px-6 py-3 bg-zinc-900 dark:bg-white hover:bg-zinc-800 dark:hover:bg-zinc-100 text-white dark:text-zinc-900 rounded-xl text-xs font-bold transition-all shadow-md flex items-center space-x-2"
              >
                <Download className="h-4 w-4" />
                <span>Download Shareable Scorecard (PNG)</span>
              </button>
              <button
                onClick={handleRetake}
                className="px-5 py-3 bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-xl text-xs font-bold transition-all flex items-center space-x-2"
              >
                <RotateCcw className="h-4 w-4" />
                <span>Retake Quiz</span>
              </button>
            </div>
          </div>

          {/* 2. Breakdown Chart (Horizontal Bars) */}
          <div className="p-6 sm:p-8 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-lg space-y-6">
            <div className="border-b border-zinc-100 dark:border-zinc-900 pb-4">
              <h3 className="text-lg font-extrabold text-zinc-900 dark:text-white">
                10-Pillar Category Breakdown
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                See where your financial foundations are solid (Green) and which areas require immediate reinforcement (Amber/Red).
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
              {QUESTIONS.map((q, idx) => {
                const optIdx = selectedAnswers[idx];
                const pts = optIdx !== -1 ? q.options[optIdx].points : 0;
                const barColor = pts >= 8 ? "bg-emerald-500" : pts >= 5 ? "bg-amber-500" : "bg-rose-500";
                const badgeText = pts >= 8 ? "Strong" : pts >= 5 ? "Developing" : "Needs Work";
                const badgeColor = pts >= 8 ? "text-emerald-500 bg-emerald-50 dark:bg-emerald-950/40" : pts >= 5 ? "text-amber-500 bg-amber-50 dark:bg-amber-950/40" : "text-rose-500 bg-rose-50 dark:bg-rose-950/40";

                return (
                  <div key={q.id} className="p-3.5 rounded-2xl bg-zinc-50/60 dark:bg-zinc-900/30 border border-zinc-100 dark:border-zinc-800/60 space-y-2">
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className="text-zinc-800 dark:text-zinc-200 truncate pr-2">{q.category}</span>
                      <div className="flex items-center space-x-2 shrink-0">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold ${badgeColor}`}>
                          {badgeText}
                        </span>
                        <span className="text-zinc-900 dark:text-white font-black w-10 text-right">{pts}/10</span>
                      </div>
                    </div>
                    <div className="w-full h-2 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                      <div className={`h-full ${barColor} transition-all duration-500 rounded-full`} style={{ width: `${(pts / 10) * 100}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 3. Personalised Action Plan */}
          <div className="p-6 sm:p-8 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-lg space-y-6">
            <div className="border-b border-zinc-100 dark:border-zinc-900 pb-4">
              <h3 className="text-lg font-extrabold text-zinc-900 dark:text-white flex items-center space-x-2">
                <Sparkles className="h-5 w-5 text-emerald-500" />
                <span>Your Personalised Action Plan</span>
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                Targeted steps generated dynamically based on your answers to boost your score toward 100.
              </p>
            </div>

            <div className="space-y-4">
              {QUESTIONS.filter((_, idx) => {
                const optIdx = selectedAnswers[idx];
                return optIdx === -1 || QUESTIONS[idx].options[optIdx].points < 10;
              }).map((q) => {
                return (
                  <div key={q.id} className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-150 dark:border-zinc-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                        {q.category} Priority
                      </span>
                    </div>
                    <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed font-medium">
                      {q.actionItem}
                    </p>
                    {q.actionLinkUrl && q.actionLinkText && (
                      <div className="pt-1">
                        <Link
                          href={q.actionLinkUrl}
                          className="inline-flex items-center text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
                        >
                          <span>{q.actionLinkText}</span>
                        </Link>
                      </div>
                    )}
                  </div>
                );
              })}

              {QUESTIONS.every((_, idx) => selectedAnswers[idx] !== -1 && QUESTIONS[idx].options[selectedAnswers[idx]].points === 10) && (
                <div className="p-8 text-center bg-emerald-500/10 border border-emerald-500/20 rounded-2xl space-y-2">
                  <Award className="h-10 w-10 text-emerald-500 mx-auto" />
                  <h4 className="text-base font-extrabold text-zinc-900 dark:text-white">Flawless Financial Score!</h4>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 max-w-md mx-auto">
                    You scored the maximum 100 points across every pillar of personal finance. Keep maintaining your disciplined budget, investments, and insurance coverage.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* 5. Retake Prompt Box */}
          <div className="p-8 bg-gradient-to-r from-emerald-500/10 via-indigo-500/10 to-emerald-500/10 border border-emerald-500/20 rounded-3xl text-center space-y-4">
            <h4 className="text-lg font-extrabold text-zinc-900 dark:text-white">
              Improve your score — come back in 30 days
            </h4>
            <p className="text-xs text-zinc-600 dark:text-zinc-300 max-w-xl mx-auto leading-relaxed">
              Work on your personalised action plan over the next month, then return to take the quiz again and track your wealth-building progress. Your answers are securely stored on this device.
            </p>
            <div className="pt-2">
              <button
                onClick={handleRetake}
                className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs font-extrabold shadow-md shadow-emerald-500/20 transition-all inline-flex items-center space-x-2"
              >
                <RotateCcw className="h-4 w-4" />
                <span>Retake Quiz Now</span>
              </button>
            </div>
          </div>

          {/* Disclaimer 2 — Required Footnote Disclaimer */}
          <div className="pt-8 border-t border-zinc-200 dark:border-zinc-800 text-center">
            <p className="text-[11px] text-zinc-400 dark:text-zinc-500 leading-relaxed max-w-3xl mx-auto">
              Your WealthMaze Financial Health Score is a self-assessment tool designed to help you think about your finances — not a definitive judgment of your financial health. Scores are calculated solely from your answers to 10 general questions and do not account for your full financial picture, regional differences, or personal circumstances. This is not financial advice. WealthMaze is not responsible for any financial decisions made based on this score.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
