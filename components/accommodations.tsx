"use client"

import { useRef } from "react"
import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"
import Image from "next/image"
import { EdgeHoverEffect } from "./edge-hover-effect"

const accommodations = [
  {
    title: "Luxury Treehouse",
    description: "Elevated living spaces with panoramic forest views",
    image: "/images/tiger looking to forest.jpg",
    features: ["King-size bed", "Private deck", "Outdoor shower", "Mini bar"],
  },
  {
    title: "Safari Tent",
    description: "Canvas luxury with all modern amenities in the wild",
    image: "/images/tiger forest.jpg",
    features: ["Queen-size bed", "En-suite bathroom", "Private fire pit", "Lounge area"],
  },
  {
    title: "Forest Villa",
    description: "Spacious villas nestled among ancient trees",
    image: "/images/tiger and babay.jpg",
    features: ["Two bedrooms", "Full kitchen", "Private hot tub", "Fireplace"],
  },
]

export function Accommodations() {
  const sectionRef = useRef(null)

  useGSAP(() => {
    gsap.fromTo(
      ".accommodation-card",
      {
        y: 100,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        stagger: 0.2,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      },
    )
  }, [])

  return (
    <section id="accommodations" ref={sectionRef} className="relative py-24 md:py-32 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-[#00ff00] mb-6 animate-in">
            Luxury <span className="text-green-800">Accommodations</span>
          </h2>

          <p className="text-[#00ff00]/90 animate-in">
            Choose from our selection of premium accommodations, each designed to immerse you in nature while providing
            the ultimate comfort and luxury.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {accommodations.map((item, index) => (
            <div
              key={index}
              className="accommodation-card bg-black/40 backdrop-blur-md rounded-2xl overflow-hidden transform transition-transform hover:scale-[1.02]"
            >
              <EdgeHoverEffect className="relative h-64 overflow-hidden">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform hover:scale-110 duration-700"
                />
              </EdgeHoverEffect>

              <div className="p-6">
                <h3 className="text-2xl font-bold text-[#00ff00] mb-2">{item.title}</h3>
                <p className="text-amber-200/80 mb-4">{item.description}</p>

                <ul className="space-y-2 mb-6">
                  {item.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-[#00ff00]/80">
                      <span className="w-2 h-2 bg-amber-400 rounded-full mr-2"></span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <button className="w-full py-3 bg-amber-700/80 hover:bg-amber-600 text-[#00ff00] rounded-lg transition-colors">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
