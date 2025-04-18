"use client"

import { useRef } from "react"
import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"
import { TelescopeIcon as Binoculars, Utensils, Compass, Camera } from "lucide-react"
import { EdgeHoverEffect } from "./edge-hover-effect"

const experiences = [
  {
    icon: <Binoculars className="w-10 h-10 text-amber-400" />,
    title: "Wildlife Safari",
    description: "Guided tours to observe exotic wildlife in their natural habitat with expert naturalists.",
  },
  {
    icon: <Utensils className="w-10 h-10 text-amber-400" />,
    title: "Gourmet Dining",
    description: "Farm-to-table cuisine featuring local ingredients prepared by world-class chefs.",
  },
  {
    icon: <Compass className="w-10 h-10 text-amber-400" />,
    title: "Adventure Trails",
    description: "Hiking, biking, and horseback riding through scenic wilderness trails.",
  },
  {
    icon: <Camera className="w-10 h-10 text-amber-400" />,
    title: "Photography Tours",
    description: "Capture stunning wildlife and landscapes with our professional photography guides.",
  },
]

export function Experience() {
  const sectionRef = useRef(null)

  useGSAP(() => {
    gsap.fromTo(
      ".experience-card",
      {
        scale: 0.8,
        opacity: 0,
      },
      {
        scale: 1,
        opacity: 1,
        stagger: 0.15,
        duration: 0.8,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      },
    )
  }, [])

  return (
    <section id="experience" ref={sectionRef} className="relative py-24 md:py-32 overflow-hidden">
      <EdgeHoverEffect className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center opacity-20"></div>
      </EdgeHoverEffect>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-amber-100 mb-6 animate-in">
            Unforgettable <span className="text-amber-400">Experiences</span>
          </h2>

          <p className="text-amber-100/90 animate-in">
            Immerse yourself in a world of adventure and relaxation with our curated experiences designed to connect you
            with nature and luxury.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {experiences.map((item, index) => (
            <div
              key={index}
              className="experience-card bg-black/50 backdrop-blur-md rounded-2xl p-6 text-center border border-amber-900/30 hover:border-amber-500/50 transition-all"
            >
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-amber-900/30 rounded-full">
                {item.icon}
              </div>

              <h3 className="text-xl font-bold text-amber-100 mb-3">{item.title}</h3>
              <p className="text-amber-200/80">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center animate-in">
          <button className="px-8 py-3 bg-amber-700 hover:bg-amber-600 text-amber-100 rounded-full transition-colors text-lg">
            Explore All Experiences
          </button>
        </div>
      </div>
    </section>
  )
}
