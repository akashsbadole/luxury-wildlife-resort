"use client"

import { useState, useEffect } from "react"
import { gsap } from "gsap"
import { Menu, X } from "lucide-react"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)

  const scrollToSection = (id: string) => {
    setIsOpen(false)

    gsap.to(window, {
      duration: 1.5,
      scrollTo: { y: `#${id}`, offsetY: 80 },
      ease: "power3.inOut",
    })
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ${
        scrolled ? "bg-black/40 backdrop-blur-lg py-3" : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <a
          href="#"
          className="text-2xl font-bold text-amber-100 flex items-center"
          onClick={(e) => {
            e.preventDefault()
            scrollToSection("hero")
          }}
        >
          <span className="text-amber-400">WILD</span>LUXURY
        </a>

        <nav className="hidden md:flex items-center space-x-8">
          {["About", "Accommodations", "Experience", "Contact"].map((item) => (
            <button
              key={item}
              className="text-amber-100 hover:text-amber-400 transition-colors"
              onClick={() => scrollToSection(item.toLowerCase())}
            >
              {item}
            </button>
          ))}
          <button className="px-5 py-2 bg-amber-700 hover:bg-amber-600 text-amber-100 rounded-full transition-colors">
            Book Now
          </button>
        </nav>

        <button className="md:hidden text-amber-100" onClick={toggleMenu} aria-label="Toggle menu">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 bg-black/95 backdrop-blur-lg z-50 flex flex-col items-center justify-center transition-transform duration-500 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <nav className="flex flex-col items-center space-y-8">
          {["About", "Accommodations", "Experience", "Contact"].map((item) => (
            <button
              key={item}
              className="text-2xl text-amber-100 hover:text-amber-400 transition-colors"
              onClick={() => scrollToSection(item.toLowerCase())}
            >
              {item}
            </button>
          ))}
          <button className="mt-4 px-8 py-3 bg-amber-700 hover:bg-amber-600 text-amber-100 rounded-full transition-colors text-lg">
            Book Now
          </button>
        </nav>
      </div>
    </header>
  )
}
