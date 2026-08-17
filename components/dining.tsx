"use client"

import { useRef } from "react"
import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"
import Image from "next/image"
import { EdgeHoverEffect } from "./edge-hover-effect"
import { UtensilsCrossed, Wine, Coffee, Flame } from "lucide-react"

const dining = [
  {
    title: "The Canopy Restaurant",
    tagline: "Forest-to-table fine dining",
    description:
      "Our signature restaurant celebrates the harvest of the forest and the surrounding villages. Seasonal produce, slow-cooked over open flame, served beneath a vaulted timber ceiling.",
    image: "/images/forest-scene.jpg",
    icon: <UtensilsCrossed className="w-6 h-6 text-forest" />,
    highlights: ["Tasting menus", "Local spices", "Wine pairing"],
  },
  {
    title: "Bush Breakfast",
    tagline: "Dawn by the reservoir",
    description:
      "A leisurely morning spread laid out at the edge of the Muchi Dam reservoir — fresh breads, tropical fruit, and filter coffee as mist lifts off the water.",
    image: "/images/Image-One.jpg",
    icon: <Coffee className="w-6 h-6 text-forest" />,
    highlights: ["Riverside seating", "Baked daily", "Bird song"],
  },
  {
    title: "The Lakeside Grill",
    tagline: "Embers & open sky",
    description:
      "Evenings belong to the grill. Sustainable catch and farm meats charred over hardwood, accompanied by village recipes passed down through generations.",
    image: "/images/forest-river.jpg",
    icon: <Flame className="w-6 h-6 text-forest" />,
    highlights: ["Live grill", "Vegetarian feast", "Stargazing"],
  },
  {
    title: "The Roots Bar",
    tagline: "Botanical craft cocktails",
    description:
      "A intimate lounge where foraged botanicals meet rare spirits. Sip a forest-tonic as the daylight fades into the deep green hush of the woods.",
    image: "/images/Jungle-Resort.jpg",
    icon: <Wine className="w-6 h-6 text-forest" />,
    highlights: ["Foraged mixers", "Reserve spirits", "Acoustic nights"],
  },
]

export function Dining() {
  const sectionRef = useRef(null)

  useGSAP(
    () => {
      gsap.fromTo(
        ".dining-card",
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.12,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
        }
      )
    },
    { scope: sectionRef }
  )

  return (
    <section
      id="dining"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden bg-cream-deep"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="eyebrow text-gold uppercase tracking-[0.25em] text-sm font-medium mb-4 animate-in">
            Dining
          </p>
          <h2 className="text-3xl md:text-5xl font-serif font-semibold text-forest mb-6 animate-in">
            Flavours of the <span className="gradient-text">Forest</span>
          </h2>
          <p className="text-bark-muted animate-in leading-relaxed">
            Every meal at Tipeshwar is an extension of the landscape — rooted in
            the land, shaped by the seasons, and shared slowly under the trees.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {dining.map((item, index) => (
            <div
              key={index}
              className="dining-card card-luxury glass rounded-3xl overflow-hidden shadow-lg flex flex-col"
            >
              <EdgeHoverEffect className="relative h-64 overflow-hidden">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-110"
                />
              </EdgeHoverEffect>

              <div className="p-8 flex flex-col flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-11 h-11 flex items-center justify-center bg-gold-tint rounded-full">
                    {item.icon}
                  </span>
                  <span className="text-xs uppercase tracking-widest text-gold font-medium">
                    {item.tagline}
                  </span>
                </div>
                <h3 className="text-2xl font-serif font-semibold text-forest mb-3">
                  {item.title}
                </h3>
                <p className="text-bark-muted mb-6 leading-relaxed">
                  {item.description}
                </p>
                <ul className="flex flex-wrap gap-2 mt-auto">
                  {item.highlights.map((h, i) => (
                    <li
                      key={i}
                      className="text-xs font-medium text-bark bg-cream px-3 py-1.5 rounded-full border border-border-warm/50"
                    >
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
