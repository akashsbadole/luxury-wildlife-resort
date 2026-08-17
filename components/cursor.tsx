"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    document.documentElement.classList.add("has-cursor");
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    gsap.set([dot, ring], { xPercent: -50, yPercent: -50 });
    const dotX = gsap.quickTo(dot, "x", { duration: 0.1, ease: "power3.out" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.1, ease: "power3.out" });
    const ringX = gsap.quickTo(ring, "x", { duration: 0.4, ease: "power3.out" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.4, ease: "power3.out" });

    const move = (e: MouseEvent) => {
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
    };

    const hover = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest(
        "a, button, [role='button'], input, textarea, select, label"
      );
      ring.classList.toggle("cursor-ring-active", Boolean(target));
    };

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseover", hover);
    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", hover);
      document.documentElement.classList.remove("has-cursor");
    };
  }, []);

  return (
    <>
      <div ref={dotRef} aria-hidden="true" className="cursor-dot" />
      <div ref={ringRef} aria-hidden="true" className="cursor-ring" />
    </>
  );
}