"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollToPlugin)
}

export const SECTION_TRANSITION_EVENT = "kilo:section-transition"

export function triggerSectionTransition(targetId: string) {
  if (typeof window === "undefined") return
  window.dispatchEvent(
    new CustomEvent(SECTION_TRANSITION_EVENT, { detail: { targetId } })
  )
}

export function SectionTransition() {
  const overlayRef = useRef<HTMLDivElement>(null)
  const panelCreamRef = useRef<HTMLDivElement>(null)
  const panelGoldRef = useRef<HTMLDivElement>(null)
  const panelForestRef = useRef<HTMLDivElement>(null)
  const isAnimating = useRef(false)

  useEffect(() => {
    const overlay = overlayRef.current
    const cream = panelCreamRef.current
    const gold = panelGoldRef.current
    const forest = panelForestRef.current
    if (!overlay || !cream || !gold || !forest) return

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches

    const handleTransition = (e: Event) => {
      const targetId = (e as CustomEvent<{ targetId: string }>).detail?.targetId
      if (!targetId) return

      const scrollToTarget = () => {
        const el = document.getElementById(targetId)
        if (el) {
          gsap.to(window, {
            duration: reduceMotion ? 0.6 : 0,
            scrollTo: { y: el, offsetY: 80 },
            ease: "power2.inOut",
          })
        }
      }

      if (reduceMotion) {
        scrollToTarget()
        return
      }

      if (isAnimating.current) return
      isAnimating.current = true

      overlay.style.pointerEvents = "auto"
      gsap.set(overlay, { autoAlpha: 1 })

      const tl = gsap.timeline({
        onComplete: () => {
          gsap.set(overlay, { autoAlpha: 0 })
          overlay.style.pointerEvents = "none"
          isAnimating.current = false
        },
      })

      tl.set([cream, gold, forest], { scaleY: 0 })
        .set(cream, { transformOrigin: "bottom" })
        .set(gold, { transformOrigin: "bottom" })
        .set(forest, { transformOrigin: "bottom" })
        .to(cream, { scaleY: 1, duration: 0.45, ease: "power3.inOut" })
        .to(gold, { scaleY: 1, duration: 0.45, ease: "power3.inOut" }, "-=0.32")
        .to(
          forest,
          { scaleY: 1, duration: 0.45, ease: "power3.inOut" },
          "-=0.32"
        )
        .add(scrollToTarget)
        .set(cream, { transformOrigin: "top" })
        .set(gold, { transformOrigin: "top" })
        .set(forest, { transformOrigin: "top" })
        .to(forest, { scaleY: 0, duration: 0.45, ease: "power3.inOut" }, "+=0.05")
        .to(gold, { scaleY: 0, duration: 0.45, ease: "power3.inOut" }, "-=0.32")
        .to(cream, { scaleY: 0, duration: 0.45, ease: "power3.inOut" }, "-=0.32")
    }

    window.addEventListener(SECTION_TRANSITION_EVENT, handleTransition)
    return () => {
      window.removeEventListener(SECTION_TRANSITION_EVENT, handleTransition)
    }
  }, [])

  return (
    <div
      ref={overlayRef}
      aria-hidden="true"
      className="fixed inset-0 z-[100] flex flex-col pointer-events-none opacity-0 invisible"
    >
      <div ref={panelForestRef} className="flex-1 bg-forest-deep" />
      <div ref={panelGoldRef} className="flex-1 bg-gold" />
      <div ref={panelCreamRef} className="flex-1 bg-cream" />
    </div>
  )
}
