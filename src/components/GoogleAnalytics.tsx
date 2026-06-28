/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import Script from "next/script";
import { usePathname } from "next/navigation";

const GA_MEASUREMENT_ID = "G-4LVW5230JP";

// Custom event tracker utilities
export const trackCalculatorUse = (id: string, name: string) => {
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", "use_calculator", {
      calculator_id: id,
      calculator_name: name,
    });
  }
};

export const trackBlogView = (slug: string, title: string) => {
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", "view_blog_post", {
      post_slug: slug,
      post_title: title,
    });
  }
};

export const trackOutboundClick = (url: string) => {
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", "click_outbound", {
      target_url: url,
    });
  }
};

export function GoogleAnalytics() {
  const pathname = usePathname();

  // Track SPA page views on route changes
  React.useEffect(() => {
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("config", GA_MEASUREMENT_ID, {
        page_path: pathname,
      });
    }
  }, [pathname]);

  return (
    <>
      <Script
        id="gtag-base"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  );
}
