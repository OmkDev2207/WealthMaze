/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { usePathname } from "next/navigation";

const GA_MEASUREMENT_ID = "G-X4F6Z5E8L9";

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
  const [initialized, setInitialized] = React.useState(false);

  React.useEffect(() => {
    let loaded = false;

    const loadGA = () => {
      if (loaded) return;
      loaded = true;

      // Remove event listeners immediately
      window.removeEventListener("scroll", loadGA);
      window.removeEventListener("mousemove", loadGA);
      window.removeEventListener("touchstart", loadGA);
      window.removeEventListener("keydown", loadGA);

      // 1. Inject the tracking library script
      const script = document.createElement("script");
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
      script.async = true;
      document.head.appendChild(script);

      // 2. Initialize gtag global config
      (window as any).dataLayer = (window as any).dataLayer || [];
      const gtag = (...args: any[]) => {
        (window as any).dataLayer.push(args);
      };
      (window as any).gtag = gtag;

      gtag("js", new Date());
      gtag("config", GA_MEASUREMENT_ID, {
        page_path: window.location.pathname,
      });

      setInitialized(true);
    };

    // Listen to first user interaction
    window.addEventListener("scroll", loadGA, { passive: true });
    window.addEventListener("mousemove", loadGA, { passive: true });
    window.addEventListener("touchstart", loadGA, { passive: true });
    window.addEventListener("keydown", loadGA, { passive: true });

    return () => {
      window.removeEventListener("scroll", loadGA);
      window.removeEventListener("mousemove", loadGA);
      window.removeEventListener("touchstart", loadGA);
      window.removeEventListener("keydown", loadGA);
    };
  }, []);

  // Track page views on route changes if already initialized
  React.useEffect(() => {
    if (initialized && typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("config", GA_MEASUREMENT_ID, {
        page_path: pathname,
      });
    }
  }, [pathname, initialized]);

  return null;
}
