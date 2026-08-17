"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { EdgeHoverEffect } from "./edge-hover-effect";
import { triggerSectionTransition } from "./section-transition";

const accommodations = [
  {
    title: "Luxury Treehouse",
    description: "Elevated living spaces with panoramic forest views",
    image: "/images/Image-2-1.jpg",
    features: ["King-size bed", "Private deck", "Outdoor shower", "Mini bar"],
  },
  {
    title: "Safari Tent",
    description: "Canvas luxury with all modern amenities in the wild",
    image: "/images/Image-2-3.jpg",
    features: ["Queen-size bed", "En-suite bathroom", "Private fire pit", "Lounge area"],
  },
  {
    title: "Forest Villa",
    description: "Spacious villas nestled among ancient trees",
    image: "/images/Land-Image-1.jpg",
    features: ["Two bedrooms", "Full kitchen", "Private hot tub", "Fireplace"],
  },
];

export function Accommodations() {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".accommodation-card",
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="suites"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden bg-cream"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="eyebrow text-gold uppercase tracking-[0.25em] text-sm font-medium mb-4 animate-in">
            Suites
          </p>
          <h2 className="text-3xl md:text-5xl font-serif font-semibold text-forest mb-6 animate-in">
            Our <span className="text-bark">Suites</span>
          </h2>
          <p className="text-bark-muted animate-in leading-relaxed">
            Three distinct ways to dwell among the trees — each crafted to dissolve
            the line between comfort and wilderness.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {accommodations.map((item, index) => (
            <div
              key={index}
              className="accommodation-card card-luxury bg-cream-warm rounded-2xl overflow-hidden shadow-lg border border-gold/20 flex flex-col"
            >
              <EdgeHoverEffect className="relative h-64 overflow-hidden img-hover-zoom">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-110"
                />
              </EdgeHoverEffect>

              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-2xl font-serif font-semibold text-forest mb-2">
                  {item.title}
                </h3>
                <p className="text-bark-muted mb-4">{item.description}</p>

                <ul className="space-y-2 mb-6">
                  {item.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-bark">
                      <span className="w-2 h-2 bg-gold rounded-full mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => triggerSectionTransition("booking")}
                  className="mt-auto btn-gold w-full py-3 rounded-lg font-medium"
                >
                  Reserve
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
