"use client";

import { useEffect } from "react";

export function SectionNumbers() {
  useEffect(() => {
    document
      .querySelectorAll("main section:not(#home)")
      .forEach((section, i) => {
        if (section.querySelector(".section-index")) return;
        const badge = document.createElement("span");
        badge.className = "section-index";
        badge.setAttribute("aria-hidden", "true");
        badge.textContent = String(i + 1).padStart(2, "0");
        section.appendChild(badge);
      });
  }, []);

  return null;
}