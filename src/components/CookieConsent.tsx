"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, X } from "lucide-react";

export function CookieConsent() {
  const [showConsent, setShowConsent] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    // Check if consent has already been given
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      // Show consent after a brief delay
      const timer = setTimeout(() => setShowConsent(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setShowConsent(false);
  };

  if (!mounted || !showConsent) return null;

  return (
    <div
      className="fixed bottom-16 left-4 right-4 md:left-auto md:right-8 md:w-[380px] bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 sm:p-5 rounded-2xl shadow-xl z-48 flex flex-col space-y-3 animate-in fade-in slide-in-from-bottom-4 duration-300 print:hidden"
      aria-live="polite"
      id="cookie-consent-banner"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 text-emerald-500 flex items-center justify-center shrink-0">
            <ShieldCheck className="h-4.5 w-4.5" />
          </div>
          <span className="text-xs font-bold text-zinc-900 dark:text-white">
            Cookie Consent
          </span>
        </div>
        <button
          onClick={() => setShowConsent(false)}
          className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 p-0.5 rounded-lg transition-colors focus:outline-none"
          aria-label="Dismiss banner"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <p className="text-[11px] leading-relaxed text-zinc-500 dark:text-zinc-400">
        We use cookies to analyze site traffic and personalize your ad experience via Google AdSense. By clicking "Accept All", you agree to our cookie policies. Read our{" "}
        <Link href="/privacy" className="text-emerald-500 hover:underline font-semibold">
          Privacy Policy
        </Link>{" "}
        for details.
      </p>

      <div className="flex items-center space-x-2 pt-1">
        <button
          onClick={handleAccept}
          className="flex-1 h-9 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs rounded-xl shadow-md shadow-emerald-500/10 transition-colors focus:outline-none"
        >
          Accept All
        </button>
        <button
          onClick={() => setShowConsent(false)}
          className="px-3 h-9 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900 text-xs font-bold rounded-xl transition-colors focus:outline-none"
        >
          Dismiss
        </button>
      </div>
    </div>
  );
}
