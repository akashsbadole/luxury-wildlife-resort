"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { triggerSectionTransition } from "./section-transition";

export function Hero() {
  const scopeRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .from(".hero-word", { y: 50, opacity: 0, stagger: 0.15, duration: 1.1 })
        .from(".hero-sub", { y: 24, opacity: 0, duration: 0.8 }, "-=0.6")
        .from(
          ".hero-cta",
          { y: 18, opacity: 0, stagger: 0.1, duration: 0.6 },
          "-=0.4",
        )
        .from(".scroll-indicator", { opacity: 0, duration: 0.6 }, "-=0.2");
    },
    { scope: scopeRef },
  );

  return (
    <section
      id="home"
      ref={scopeRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0 text-white">
        <Image
          src="/images/indian forest.jpg"
          alt="Lush Indian forest"
          fill
          className="parallax-img object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 " />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 text-center">
        <div className="max-w-4xl mx-auto">
          <p className="hero-sub text-gold-light tracking-[0.35em] uppercase text-sm md:text-base mb-6 text-white">
            Luxury Forest Hotel & Retreat
          </p>
          <h1 className="mb-8">
            {["Tipeshwar", "Forest", "Retreat"].map((word, index) => (
              <span
                key={index}
                className="hero-word block text-6xl md:text-8xl lg:text-[7rem] font-serif font-light text-cream leading-[1.05] text-white"
                style={{ textShadow: "0 4px 30px rgba(26, 47, 26, 0.5)" }}
              >
                {word}
              </span>
            ))}
          </h1>
          <p className="hero-sub text-xl md:text-2xl text-cream/80 mb-12 font-light tracking-wide text-white">
            Where the wilderness whispers you home
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              className="hero-cta btn-gold px-10 py-4 rounded-full text-lg font-medium tracking-wider text-white"
              onClick={() => triggerSectionTransition("suites")}
            >
              Explore Suites
            </button>
            <button
              className="hero-cta px-10 py-4 rounded-full text-lg font-medium tracking-wider border border-cream/30 text-cream hover:bg-cream/10 transition-all duration-300 text-white"
              onClick={() => triggerSectionTransition("booking")}
            >
              Book Your Stay
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={() => triggerSectionTransition("suites")}
        className="scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2 text-cream/60 hover:text-gold-light transition-colors duration-300"
        aria-label="Scroll to suites"
      >
        <span className="flex flex-col items-center space-y-2">
          <span className="text-xs tracking-widest uppercase text-white">
            Scroll
          </span>
          <ChevronDown size={20} className="animate-bounce" />
        </span>
      </button>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-cream to-transparent z-[3]" />
    </section>
  );
}
