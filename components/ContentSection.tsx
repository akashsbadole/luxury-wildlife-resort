"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ContentSectionProps {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  imageAlt: string;
  reverse?: boolean;
}

export function ContentSection({
  title,
  subtitle,
  description,
  image,
  imageAlt,
  reverse = false,
}: ContentSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".cs-content",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );
      gsap.fromTo(
        ".cs-image",
        { opacity: 0, x: reverse ? 40 : -40, scale: 0.97 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, [reverse]);

  return (
    <section
      ref={sectionRef}
      className={`relative py-24 md:py-32 overflow-hidden ${
        reverse ? "bg-cream-deep" : "bg-forest-deep"
      }`}
    >
      <div
        aria-hidden="true"
        className="glow-orb w-[500px] h-[500px] -top-52 -right-40"
        style={{
          background: `radial-gradient(circle, ${
            reverse ? "rgba(164,121,63,0.3)" : "rgba(46,74,58,0.7)"
          }, transparent 70%)`,
        }}
      />
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div
            className={`cs-content space-y-6 ${
              reverse ? "md:order-2" : ""
            }`}
          >
            <p className="eyebrow-start text-gold-light uppercase tracking-[0.3em] text-xs font-medium">
              The Tipeshwar Story
            </p>
            <h2
              className={`text-4xl md:text-6xl font-serif font-light leading-tight ${
                reverse ? "text-forest" : "text-linen"
              }`}
            >
              {title}
            </h2>
            <h3
              className={`text-xl md:text-2xl font-serif font-medium ${
                reverse ? "text-bark" : "text-gold-light"
              }`}
            >
              {subtitle}
            </h3>
            <p
              className={`text-lg leading-relaxed ${
                reverse ? "text-bark-muted" : "text-linen/80"
              }`}
            >
              {description}
            </p>
            <div
              className={`h-px w-24 bg-gradient-to-r ${
                reverse
                  ? "from-gold to-transparent"
                  : "from-gold-light to-transparent"
              }`}
            />
          </div>

          <div
            className={`cs-image cinematic relative h-[380px] md:h-[520px] rounded-3xl overflow-hidden border border-gold/25 shadow-2xl ${
              reverse ? "md:order-1" : ""
            }`}
          >
            <Image
              src={image}
              alt={imageAlt}
              fill
              className="object-cover img-hover-zoom"
            />
            <span className="absolute bottom-5 left-5 z-10 bg-forest-deep/80 backdrop-blur-sm px-4 py-2 rounded-full border border-gold/30 text-xs tracking-[0.2em] uppercase text-gold-light">
              {imageAlt}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}