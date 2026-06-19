"use client";

import * as React from "react";
import dynamic from "next/dynamic";

const MobileBottomNav = dynamic(
  () => import("./MobileBottomNav").then((mod) => mod.MobileBottomNav),
  { ssr: false }
);

const CookieConsent = dynamic(
  () => import("./CookieConsent").then((mod) => mod.CookieConsent),
  { ssr: false }
);

export function LayoutClientWidgets() {
  return (
    <>
      <MobileBottomNav />
      <CookieConsent />
    </>
  );
}
