"use client";

import * as React from "react";

interface AdSlotProps {
  position: "header" | "sidebar" | "in-content" | "footer" | "top" | "mid-content";
  className?: string;
}

export function AdSlot({ position, className = "" }: AdSlotProps) {
  let containerClasses = "";
  let label = "Advertisement";
  let sizeLabel = "";

  switch (position) {
    case "header":
      // Desktop Billboard 970×250 — hidden on mobile
      containerClasses = "hidden md:flex w-full max-w-[970px] mx-auto my-4";
      sizeLabel = "970×250 — Leaderboard";
      break;

    case "top":
      // Mobile Banner — large rectangle instead of tiny 320×50
      containerClasses = "flex md:hidden w-full mx-auto my-3";
      sizeLabel = "320×100 — Mobile Banner";
      break;

    case "sidebar":
      // Half Page 300×600
      containerClasses = "flex w-full md:w-[300px] mx-auto my-4";
      sizeLabel = "300×600 — Half Page";
      break;

    case "in-content":
      // In-article desktop banner
      containerClasses = "hidden md:flex w-full max-w-[728px] mx-auto my-6";
      sizeLabel = "728×90 — In-Content";
      break;

    case "mid-content":
      // Mobile large rectangle — good earning unit
      containerClasses = "flex md:hidden w-full mx-auto my-4";
      sizeLabel = "336×280 — Mobile Rectangle";
      break;

    case "footer":
      // Full-width footer across all sizes
      containerClasses = "flex w-full max-w-[970px] mx-auto my-6";
      sizeLabel = "970×90 — Footer Leaderboard";
      break;
  }

  // Heights matched to standard AdSense unit sizes
  const heightMap: Record<string, number> = {
    header: 250,
    top: 100,
    sidebar: 600,
    "in-content": 90,
    "mid-content": 280,
    footer: 90,
  };

  const height = heightMap[position] ?? 100;

  return (
    <div
      className={`relative flex flex-col items-center justify-center bg-zinc-50 dark:bg-zinc-900/50 border border-dashed border-zinc-200 dark:border-zinc-700 rounded-xl text-zinc-400 dark:text-zinc-500 overflow-hidden print:hidden ${containerClasses} ${className}`}
      style={{ minHeight: height }}
      aria-label="Advertisement Placeholder"
    >
      <span className="absolute top-1.5 left-3 text-[9px] font-bold tracking-widest text-zinc-300 dark:text-zinc-600 uppercase">
        {label}
      </span>
      <div className="text-xs font-semibold opacity-50 mt-2">Ad Space</div>
      <div className="text-[10px] opacity-30 mt-0.5">{sizeLabel}</div>
    </div>
  );
}
