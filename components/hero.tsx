"use client"

import { useRef } from "react"
import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"
import { ChevronDown } from "lucide-react"

export function Hero() {
  const heroRef = useRef(null)

  useGSAP(() => {
    const tl = gsap.timeline()

    tl.fromTo(
      ".hero-title span",
      {
        y: 100,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 1.5,
        ease: "power3.out",
        delay: 0.5,
      },
    )
      .fromTo(".hero-subtitle", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out" }, "-=0.8")
      .fromTo(".hero-button", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out" }, "-=0.6")
      .fromTo(
        ".scroll-indicator",
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          yoyo: true,
          repeat: -1,
          repeatDelay: 0.5,
        },
        "-=0.4",
      )
  }, [])

  const scrollToAbout = () => {
    gsap.to(window, {
      duration: 1.5,
      scrollTo: { y: "#about", offsetY: 80 },
      ease: "power3.inOut",
    })
  }

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
        <h1 className="hero-title text-5xl md:text-7xl lg:text-8xl font-bold text-amber-100 mb-6 overflow-hidden">
          {["LUXURY", "WILDLIFE", "RETREAT"].map((word, index) => (
            <span key={index} className="block overflow-hidden">
              <span className="inline-block transform translate-y-full">{word}</span>
            </span>
          ))}
        </h1>

        <p className="hero-subtitle text-xl md:text-2xl text-amber-200/80 max-w-3xl mx-auto mb-8">
          Experience the perfect harmony of luxury and nature in our exclusive wildlife resort
        </p>

        <button className="hero-button px-8 py-3 bg-amber-700 hover:bg-amber-600 text-amber-100 rounded-full transition-colors text-lg">
          Book Your Adventure
        </button>

        <div
          className="scroll-indicator absolute bottom-10 left-1/2 transform -translate-x-1/2 text-amber-100/70 cursor-pointer"
          onClick={scrollToAbout}
        >
          <p className="text-sm mb-2">Scroll to explore</p>
          <ChevronDown className="mx-auto animate-bounce" />
        </div>
      </div>

      <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px] z-0"></div>
    </section>
  )
}
