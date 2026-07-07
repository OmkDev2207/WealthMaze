"use client";

import * as React from "react";

export function AdSenseLoader() {
  React.useEffect(() => {
    let scriptLoaded = false;

    const loadAdSense = (force = false) => {
      if (scriptLoaded) return;

      const consent = localStorage.getItem("cookie-consent");
      if (!force && consent !== "accepted") return;

      scriptLoaded = true;

      // Remove all event listeners immediately to prevent multiple loads
      window.removeEventListener("scroll", handleInteraction);
      window.removeEventListener("mousemove", handleInteraction);
      window.removeEventListener("touchstart", handleInteraction);
      window.removeEventListener("keydown", handleInteraction);

      // Create and inject the script element
      const script = document.createElement("script");
      script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7662746918059885";
      script.async = true;
      script.crossOrigin = "anonymous";
      document.head.appendChild(script);
    };

    const handleInteraction = () => {
      loadAdSense(false);
    };

    // Detect search engine bots/crawlers and page speed tools to bypass lazy-loading and consent gates
    const isBot = /google|bot|crawler|spider|lighthouse|mediapartners/i.test(
      typeof navigator !== "undefined" ? navigator.userAgent || "" : ""
    );

    if (isBot) {
      loadAdSense(true);
    } else {
      // Attach event listeners to wait for first user interaction
      window.addEventListener("scroll", handleInteraction, { passive: true });
      window.addEventListener("mousemove", handleInteraction, { passive: true });
      window.addEventListener("touchstart", handleInteraction, { passive: true });
      window.addEventListener("keydown", handleInteraction, { passive: true });

      // If consent is already accepted, try running it on interaction or load
      const consent = localStorage.getItem("cookie-consent");
      if (consent === "accepted") {
        loadAdSense(false);
      }
    }

    // Listen to custom consent accepted event
    const handleConsentAccepted = () => {
      loadAdSense(false);
    };
    window.addEventListener("cookie-consent-accepted", handleConsentAccepted);

    return () => {
      window.removeEventListener("scroll", handleInteraction);
      window.removeEventListener("mousemove", handleInteraction);
      window.removeEventListener("touchstart", handleInteraction);
      window.removeEventListener("keydown", handleInteraction);
      window.removeEventListener("cookie-consent-accepted", handleConsentAccepted);
    };
  }, []);

  return null;
}
