"use client";

import * as React from "react";

export function AdSenseLoader() {
  React.useEffect(() => {
    let scriptLoaded = false;

    const loadAdSense = () => {
      if (scriptLoaded) return;
      scriptLoaded = true;

      // Remove all event listeners immediately to prevent multiple loads
      window.removeEventListener("scroll", loadAdSense);
      window.removeEventListener("mousemove", loadAdSense);
      window.removeEventListener("touchstart", loadAdSense);
      window.removeEventListener("keydown", loadAdSense);

      // Create and inject the script element
      const script = document.createElement("script");
      script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7662746918059885";
      script.async = true;
      script.crossOrigin = "anonymous";
      document.head.appendChild(script);
    };

    // Attach event listeners to wait for first user interaction
    window.addEventListener("scroll", loadAdSense, { passive: true });
    window.addEventListener("mousemove", loadAdSense, { passive: true });
    window.addEventListener("touchstart", loadAdSense, { passive: true });
    window.addEventListener("keydown", loadAdSense, { passive: true });

    return () => {
      window.removeEventListener("scroll", loadAdSense);
      window.removeEventListener("mousemove", loadAdSense);
      window.removeEventListener("touchstart", loadAdSense);
      window.removeEventListener("keydown", loadAdSense);
    };
  }, []);

  return null;
}
