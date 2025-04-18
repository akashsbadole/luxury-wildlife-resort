"use client"

import { useEffect, useRef, useCallback, useState } from "react"
import { gsap } from "gsap"

interface EdgeHoverEffectProps {
  children: React.ReactNode
  className?: string
}

export function EdgeHoverEffect({ children, className = "" }: EdgeHoverEffectProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const edgeRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)
  const animationRef = useRef<gsap.core.Tween | null>(null)

  const updateEdgePosition = useCallback((x: number, y: number, rect: DOMRect) => {
    const edge = edgeRef.current
    if (!edge) return

    // Calculate which edge is closest
    const distances = {
      top: y,
      right: rect.width - x,
      bottom: rect.height - y,
      left: x,
    }

    const closestEdge = Object.entries(distances).reduce((a, b) => (a[1] < b[1] ? a : b))[0]

    // Kill any existing animation
    if (animationRef.current) {
      animationRef.current.kill()
    }

    // Position the edge effect
    switch (closestEdge) {
      case "top":
        gsap.set(edge, {
          top: 0,
          left: 0,
          width: "100%",
          height: "2px",
          background: "linear-gradient(to right, transparent, rgba(245, 158, 11, 0.8), transparent)",
        })
        break
      case "right":
        gsap.set(edge, {
          top: 0,
          right: 0,
          width: "2px",
          height: "100%",
          background: "linear-gradient(to bottom, transparent, rgba(245, 158, 11, 0.8), transparent)",
        })
        break
      case "bottom":
        gsap.set(edge, {
          bottom: 0,
          left: 0,
          width: "100%",
          height: "2px",
          background: "linear-gradient(to right, transparent, rgba(245, 158, 11, 0.8), transparent)",
        })
        break
      case "left":
        gsap.set(edge, {
          top: 0,
          left: 0,
          width: "2px",
          height: "100%",
          background: "linear-gradient(to bottom, transparent, rgba(245, 158, 11, 0.8), transparent)",
        })
        break
    }
  }, [])

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const container = containerRef.current
    if (!container) return

    const rect = container.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    updateEdgePosition(x, y, rect)
  }, [updateEdgePosition])

  const handleMouseEnter = useCallback(() => {
    setIsHovering(true)
    const edge = edgeRef.current
    if (!edge) return

    if (animationRef.current) {
      animationRef.current.kill()
    }

    animationRef.current = gsap.to(edge, {
      opacity: 1,
      duration: 0.3,
      ease: "power2.out",
    })
  }, [])

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false)
    const edge = edgeRef.current
    if (!edge) return

    if (animationRef.current) {
      animationRef.current.kill()
    }

    animationRef.current = gsap.to(edge, {
      opacity: 0,
      duration: 0.3,
      ease: "power2.out",
    })
  }, [])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    container.addEventListener("mousemove", handleMouseMove)
    container.addEventListener("mouseenter", handleMouseEnter)
    container.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      container.removeEventListener("mousemove", handleMouseMove)
      container.removeEventListener("mouseenter", handleMouseEnter)
      container.removeEventListener("mouseleave", handleMouseLeave)
      if (animationRef.current) {
        animationRef.current.kill()
      }
    }
  }, [handleMouseMove, handleMouseEnter, handleMouseLeave])

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      {children}
      <div
        ref={edgeRef}
        className="absolute opacity-0 transition-opacity duration-300"
        style={{
          boxShadow: "0 0 20px rgba(245, 158, 11, 0.5)",
        }}
      />
    </div>
  )
} 