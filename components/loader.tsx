"use client"

import { useRef } from "react"
import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"

export function Loader() {
  const loaderRef = useRef(null)

  useGSAP(() => {
    const tl = gsap.timeline()

    tl.to(".loader-text span", {
      y: 0,
      opacity: 1,
      stagger: 0.1,
      duration: 1,
      ease: "power3.out",
    }).to(".loader-progress", {
      width: "100%",
      duration: 2,
      ease: "power2.inOut",
    })
  }, [])

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0a1f0a] text-[#00ff00]"
    >
      <div className="loader-text mb-8 overflow-hidden">
        {["W", "I", "L", "D", "L", "I", "F", "E"].map((letter, index) => (
          <span
            key={index}
            className="inline-block text-6xl md:text-8xl font-bold transform translate-y-full opacity-0"
            style={{
              textShadow: "0 0 10px rgba(255, 215, 0, 0.5)",
              color: "#ffd700",
            }}
          >
            {letter}
          </span>
        ))}
      </div>

      <div className="w-64 h-1 bg-amber-900/30 rounded-full overflow-hidden">
        <div className="loader-progress w-0 h-full bg-amber-500 rounded-full"></div>
      </div>

      <p className="mt-4 text-amber-200/80 italic">Entering the wilderness...</p>
    </div>
  )
}
