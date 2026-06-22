"use client";

import * as React from "react";

export function SpotlightGlow() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    // Only enable mouse-tracking glow on devices with fine pointer (mouse/trackpad) and hover capability
    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!mediaQuery.matches) return;

    const container = containerRef.current;
    if (!container) return;

    // Track state in a ref to avoid recreating event handlers
    let isTracking = false;

    const handleMouseMove = (e: MouseEvent) => {
      if (!isTracking) {
        isTracking = true;
        setIsVisible(true);
      }
      container.style.setProperty("--mouse-x", `${e.clientX}px`);
      container.style.setProperty("--mouse-y", `${e.clientY}px`);
    };

    const handleMouseLeave = () => {
      isTracking = false;
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      // Will be set to true on the first mousemove
      isTracking = false;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-700 ease-out hidden lg:block"
      style={{
        opacity: isVisible ? 1 : 0,
        background: `radial-gradient(
          600px circle at var(--mouse-x, 0px) var(--mouse-y, 0px),
          rgba(16, 185, 129, 0.05) 0%,
          rgba(99, 102, 241, 0.02) 40%,
          transparent 80%
        )`,
      }}
    />
  );
}
