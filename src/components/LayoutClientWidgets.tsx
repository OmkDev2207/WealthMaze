"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { AdSenseLoader } from "./AdSenseLoader";

const MobileBottomNav = dynamic(
  () => import("./MobileBottomNav").then((mod) => mod.MobileBottomNav),
  { ssr: false }
);

const CookieConsent = dynamic(
  () => import("./CookieConsent").then((mod) => mod.CookieConsent),
  { ssr: false }
);

const SpotlightGlow = dynamic(
  () => import("./SpotlightGlow").then((mod) => mod.SpotlightGlow),
  { ssr: false }
);

const MazeAssist = dynamic(
  () => import("./MazeAssist").then((mod) => mod.MazeAssist),
  { ssr: false }
);

export function LayoutClientWidgets() {
  return (
    <>
      <MobileBottomNav />
      <CookieConsent />
      <AdSenseLoader />
      <SpotlightGlow />
      <MazeAssist />
    </>
  );
}
