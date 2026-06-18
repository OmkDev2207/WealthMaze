"use client";

import * as React from "react";

interface AdSlotProps {
  position: "header" | "sidebar" | "in-content" | "footer" | "top" | "mid-content";
  className?: string;
}

export function AdSlot({ position, className = "" }: AdSlotProps) {
  // Styles based on positions to match standard AdSense sizes
  // and prevent Cumulative Layout Shift (CLS)
  let sizeClasses = "";
  let label = "ADVERTISEMENT";

  switch (position) {
    case "header":
      // Leaderboard (970x250) for desktop
      sizeClasses = "hidden md:flex w-[970px] h-[250px] mx-auto my-4";
      break;
    case "top":
      // Mobile Top Banner (320x50), hidden on desktop
      sizeClasses = "flex md:hidden w-[320px] h-[50px] mx-auto my-2";
      break;
    case "sidebar":
      // Half Page (300x600)
      sizeClasses = "flex w-full md:w-[300px] h-[600px] mx-auto my-4";
      break;
    case "in-content":
      // Banner in desktop reading content
      sizeClasses = "hidden md:flex w-[728px] h-[90px] mx-auto my-6";
      break;
    case "mid-content":
      // Mobile inline banner (336x280)
      sizeClasses = "flex md:hidden w-[336px] h-[280px] mx-auto my-4";
      break;
    case "footer":
      // Large Leaderboard (970x250) for desktop, standard mobile footer banner (320x50)
      sizeClasses = "flex w-[320px] md:w-[728px] lg:w-[970px] h-[50px] md:h-[250px] mx-auto my-6";
      break;
  }

  return (
    <div
      className={`relative flex flex-col items-center justify-center bg-zinc-50 dark:bg-zinc-950 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-400 dark:text-zinc-600 transition-colors overflow-hidden ${sizeClasses} ${className}`}
      aria-label="Advertisement Placeholder"
    >
      <span className="absolute top-1 left-2 text-[9px] font-semibold tracking-wider text-zinc-400/80 dark:text-zinc-600/80 uppercase">
        {label}
      </span>
      <div className="text-xs font-medium opacity-60">Ad Space</div>
      <div className="text-[10px] opacity-40">AdSense Compliant Slot</div>
    </div>
  );
}
