"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import Image from "next/image"

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return

    // Hide default cursor
    document.body.style.cursor = "none"

    // Handle mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.02,
        ease: "power2.out",
      })
    }

    // Handle hover states with debounce
    const handleMouseEnter = () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current)
      }
      setIsHovering(true)
    }

    const handleMouseLeave = () => {
      hoverTimeoutRef.current = setTimeout(() => {
        setIsHovering(false)
      }, 100)
    }

    // Add hover detection for interactive elements
    const interactiveElements = document.querySelectorAll("a, button, .interactive")
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter)
      el.addEventListener("mouseleave", handleMouseLeave)
    })

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter)
        el.removeEventListener("mouseleave", handleMouseLeave)
      })
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current)
      }
      document.body.style.cursor = "auto"
    }
  }, [])

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-24 h-24 pointer-events-none z-50 transition-all duration-150"
      style={{
        transform: `translate(-50%, -50%) scale(${isHovering ? 1.2 : 1})`,
      }}
    >
      {/* Tiger image */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/tiger-96.png"
          alt="Tiger cursor"
          width={48}
          height={48}
          className="w-full h-full object-contain animate-slight-bounce"
          priority
        />
      </div>

      {/* Glow effect */}
      <div 
        className="absolute inset-0 rounded-full"
        // style={{
        //   boxShadow: isHovering 
        //     ? "0 0 40px rgba(245, 158, 11, 0.6), 0 0 80px rgba(245, 158, 11, 0.3)" 
        //     : "0 0 30px rgba(245, 158, 11, 0.4), 0 0 60px rgba(245, 158, 11, 0.2)",
        // }}
      />

      {/* Floating leaves */}
      <div className="absolute inset-0">
        <div className="absolute w-4 h-4 bg-amber-500/30 rounded-full leaf-1" />
        <div className="absolute w-4 h-4 bg-amber-500/30 rounded-full leaf-2" />
        <div className="absolute w-4 h-4 bg-amber-500/30 rounded-full leaf-3" />
      </div>

      <style jsx>{`
        .leaf-1 {
          top: 20%;
          left: 20%;
          animation: float 3s infinite ease-in-out;
        }
        .leaf-2 {
          top: 60%;
          left: 70%;
          animation: float 2.5s infinite ease-in-out;
          animation-delay: 0.5s;
        }
        .leaf-3 {
          top: 40%;
          left: 50%;
          animation: float 2s infinite ease-in-out;
          animation-delay: 1s;
        }
        @keyframes float {
          0%, 100% {
            transform: translate(0, 0) rotate(0deg);
          }
          25% {
            transform: translate(5px, -5px) rotate(5deg);
          }
          50% {
            transform: translate(-5px, 5px) rotate(-5deg);
          }
          75% {
            transform: translate(5px, 5px) rotate(5deg);
          }
        }
      `}</style>

      <style jsx global>{`
        @keyframes slight-bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-2px);
          }
        }
        .animate-slight-bounce {
          animation: slight-bounce 2s infinite ease-in-out;
        }
      `}</style>
    </div>
  )
} 