"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Calculator, BookOpen, Compass } from "lucide-react";

export function MobileBottomNav() {
  const pathname = usePathname();

  // Active path check helpers
  const isHomeActive = pathname === "/";
  const isBlogActive = pathname === "/blog" || pathname.startsWith("/blog/");
  const isAboutActive =
    pathname === "/about" ||
    pathname === "/contact" ||
    pathname === "/privacy" ||
    pathname === "/terms" ||
    pathname === "/disclaimer";

  // Any other slug path is a calculator or a programmatic calculator SEO slab
  const isCalculatorActive = !isHomeActive && !isBlogActive && !isAboutActive;

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-14 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md border-t border-zinc-150 dark:border-zinc-900 flex items-center justify-around z-45 md:hidden print:hidden shadow-[0_-4px_12px_rgba(0,0,0,0.03)] pb-safe">
      <Link
        href="/"
        className={`flex flex-col items-center justify-center flex-grow py-1 transition-colors group ${
          isHomeActive
            ? "text-emerald-500 dark:text-emerald-400"
            : "text-zinc-400 dark:text-zinc-500 hover:text-emerald-500 dark:hover:text-emerald-400"
        }`}
      >
        <Home className={`h-5 w-5 transition-transform ${isHomeActive ? "scale-110" : "group-hover:scale-110"}`} />
        <span className={`text-[9px] mt-1 uppercase tracking-wider ${isHomeActive ? "font-extrabold" : "font-bold"}`}>
          Home
        </span>
      </Link>

      <Link
        href="/calculators"
        className={`flex flex-col items-center justify-center flex-grow py-1 transition-colors group ${
          isCalculatorActive
            ? "text-emerald-500 dark:text-emerald-400"
            : "text-zinc-400 dark:text-zinc-500 hover:text-emerald-500 dark:hover:text-emerald-400"
        }`}
      >
        <Calculator className={`h-5 w-5 transition-transform ${isCalculatorActive ? "scale-110" : "group-hover:scale-110"}`} />
        <span className={`text-[9px] mt-1 uppercase tracking-wider ${isCalculatorActive ? "font-extrabold" : "font-bold"}`}>
          Calculators
        </span>
      </Link>

      <Link
        href="/blog"
        className={`flex flex-col items-center justify-center flex-grow py-1 transition-colors group ${
          isBlogActive
            ? "text-emerald-500 dark:text-emerald-400"
            : "text-zinc-400 dark:text-zinc-500 hover:text-emerald-500 dark:hover:text-emerald-400"
        }`}
      >
        <BookOpen className={`h-5 w-5 transition-transform ${isBlogActive ? "scale-110" : "group-hover:scale-110"}`} />
        <span className={`text-[9px] mt-1 uppercase tracking-wider ${isBlogActive ? "font-extrabold" : "font-bold"}`}>
          Blog
        </span>
      </Link>

      <Link
        href="/about"
        className={`flex flex-col items-center justify-center flex-grow py-1 transition-colors group ${
          isAboutActive
            ? "text-emerald-500 dark:text-emerald-400"
            : "text-zinc-400 dark:text-zinc-500 hover:text-emerald-500 dark:hover:text-emerald-400"
        }`}
      >
        <Compass className={`h-5 w-5 transition-transform ${isAboutActive ? "scale-110" : "group-hover:scale-110"}`} />
        <span className={`text-[9px] mt-1 uppercase tracking-wider ${isAboutActive ? "font-extrabold" : "font-bold"}`}>
          Explore
        </span>
      </Link>
    </nav>
  );
}
