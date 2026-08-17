"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { triggerSectionTransition } from "./section-transition";
import { Birds } from "./birds";

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
      className="relative h-[650px] flex items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <div className="ken-burns cinematic absolute inset-0 z-0 text-white">
        <Image
          src="/images/indian forest.jpg"
          alt="Lush Indian forest"
          fill
          className="parallax-img object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/30 to-black/50" />
      </div>

      <Birds />

      <div
        aria-hidden="true"
        className="glow-orb w-[500px] h-[500px] -top-40 -left-40"
        style={{
          background:
            "radial-gradient(circle, rgba(164,121,63,0.5), transparent 70%)",
        }}
      />
      <div
        aria-hidden="true"
        className="glow-orb w-[400px] h-[400px] -bottom-48 -right-32"
        style={{
          background:
            "radial-gradient(circle, rgba(46,74,58,0.8), transparent 70%)",
        }}
      />

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 text-center">
        <div className="max-w-4xl mx-auto">
          <p className="hero-sub flex items-center justify-center gap-4 text-gold-light tracking-[0.4em] uppercase text-[10px] md:text-xs mb-4">
            <span className="h-px w-10 md:w-16 bg-gold-light/60" />
            Luxury Forest Hotel & Retreat
            <span className="h-px w-10 md:w-16 bg-gold-light/60" />
          </p>
          <h1 className="mb-3">
            {["Tipeshwar", "Forest", "Retreat"].map((word, index) => (
              <span
                key={index}
                className={`hero-word block text-4xl md:text-7xl font-serif leading-[1.05] ${
                  index === 1
                    ? "gradient-text font-semibold"
                    : "text-linen font-light"
                }`}
                style={{ textShadow: "0 4px 30px rgba(0, 0, 0, 0.6)" }}
              >
                {word}
              </span>
            ))}
          </h1>
          <p className="hero-sub text-sm md:text-lg text-linen/85 mb-5 italic font-light tracking-wide">
            Where the wilderness whispers you home
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              className="hero-cta btn-gold px-8 py-3 rounded-full text-sm font-medium tracking-wider text-white"
              onClick={() => triggerSectionTransition("suites")}
            >
              Explore Suites
            </button>
            <button
              className="hero-cta px-8 py-3 rounded-full text-sm font-medium tracking-wider border border-gold-light/50 text-linen hover:bg-gold/20 transition-all duration-300"
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
        className="scroll-indicator absolute bottom-3 left-1/2 -translate-x-1/2 text-linen/60 hover:text-gold-light transition-colors duration-300"
        aria-label="Scroll to suites"
      >
        <span className="flex flex-col items-center space-y-1">
          <span className="text-[10px] tracking-widest uppercase text-white">
            Scroll
          </span>
          <ChevronDown size={16} className="animate-bounce" />
        </span>
      </button>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-cream to-transparent z-[3]" />
    </section>
  );
}
