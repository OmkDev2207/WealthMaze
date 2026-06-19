"use client";

import React from "react";

export function EmbedClassTrigger() {
  React.useEffect(() => {
    // Add embed-mode class to html element on mount
    document.documentElement.classList.add("embed-mode");

    // Clean up on unmount
    return () => {
      document.documentElement.classList.remove("embed-mode");
    };
  }, []);

  return null;
}
