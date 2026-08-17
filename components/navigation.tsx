"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { triggerSectionTransition } from "./section-transition";

const NAV_ITEMS = [
  { label: "Home", id: "home" },
  { label: "Suites", id: "suites" },
  { label: "Dining", id: "dining" },
  { label: "Wellness", id: "wellness" },
  { label: "Contact", id: "contact" },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const goToSection = (id: string) => {
    setIsOpen(false);
    triggerSectionTransition(id);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ${
        scrolled
          ? "bg-cream/80 backdrop-blur-md py-3 shadow-sm"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between ">
        <button
          className={`text-2xl font-serif font-semibold flex items-center tracking-wide transition-colors duration-300 ${
            scrolled ? "text-forest" : "text-linen"
          }`}
          onClick={() => goToSection("home")}
        >
          <span
            className={
              scrolled ? "text-forest text-white" : "text-gold-light text-white"
            }
          >
            TIPESHWAR
          </span>
        </button>

        <nav className="hidden md:flex items-center space-x-8">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              className={`nav-link font-medium transition-colors duration-300 ${
                scrolled
                  ? "text-white hover:text-forest"
                  : "text-white hover:text-white"
              }`}
              onClick={() => goToSection(item.id)}
            >
              {item.label}
            </button>
          ))}
          <button
            className="btn-gold px-6 py-2 rounded-full font-medium"
            onClick={() => goToSection("booking")}
          >
            Book Now
          </button>
        </nav>

        <button
          className={`md:hidden transition-colors duration-300 ${
            scrolled ? "text-bark" : "text-linen"
          }`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 bg-cream/95 backdrop-blur-lg z-50 flex flex-col items-center justify-center transition-transform duration-500 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <nav className="flex flex-col items-center space-y-8">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              className="text-2xl font-serif text-bark hover:text-forest transition-colors duration-300"
              onClick={() => goToSection(item.id)}
            >
              {item.label}
            </button>
          ))}
          <button
            className="mt-4 btn-gold px-8 py-3 rounded-full text-lg"
            onClick={() => goToSection("booking")}
          >
            Book Now
          </button>
        </nav>
      </div>
    </header>
  );
}
