"use client"

import { useRef } from "react"
import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"
import Image from "next/image"
import {
  Sprout,
  Bird,
  Compass,
  Camera,
  Wind,
  HeartHandshake,
  Leaf,
  Flower2,
} from "lucide-react"

const wellness = [
  {
    icon: <Flower2 className="w-7 h-7 text-forest" />,
    title: "Ayurvedic Spa",
    description:
      "Restorative treatments drawn from forest botanicals and centuries-old Ayurvedic rituals.",
  },
  {
    icon: <Leaf className="w-7 h-7 text-forest" />,
    title: "Forest Bathing",
    description:
      "Guided shinrin-yoku walks that slow the breath and attune the senses to the woods.",
  },
  {
    icon: <HeartHandshake className="w-7 h-7 text-forest" />,
    title: "Yoga Shala",
    description:
      "Open-air practice at dawn and dusk, framed by canopy and birdsong.",
  },
]

const experiences = [
  {
    icon: <Compass className="w-7 h-7 text-forest" />,
    title: "Wildlife Safari",
    description:
      "Expert-led journeys through 50 privately-owned acres beside Tipeshwar.",
  },
  {
    icon: <Bird className="w-7 h-7 text-forest" />,
    title: "Bird Watching",
    description:
      "Quiet hides and lake edges alive with resident and migratory species.",
  },
  {
    icon: <Wind className="w-7 h-7 text-forest" />,
    title: "Nature Walks",
    description:
      "Slow trails rich in biodiversity, with frequent tiger sightings nearby.",
  },
  {
    icon: <Camera className="w-7 h-7 text-forest" />,
    title: "Photography Tours",
    description:
      "Golden-hour guidance for capturing the forest in its most candid light.",
  },
  {
    icon: <Sprout className="w-7 h-7 text-forest" />,
    title: "Adventure Trails",
    description:
      "Hugging the Muchi Dam spillway and reservoir for uninterrupted views.",
  },
]

export function WellnessExperiences() {
  const sectionRef = useRef(null)

  useGSAP(
    () => {
      gsap.fromTo(
        ".wellness-card",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: ".wellness-grid", start: "top 75%" },
        }
      )
      gsap.fromTo(
        ".experience-card",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: ".experience-grid", start: "top 75%" },
        }
      )
    },
    { scope: sectionRef }
  )

  return (
    <section
      id="wellness"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      <div
        className="absolute inset-0 z-0 parallax-bg"
        style={{
          backgroundImage: `url('/images/jungle-background.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-forest-deep/80" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-gold-light uppercase tracking-[0.25em] text-sm font-medium mb-4 animate-in">
            Wellness & Experiences
          </p>
          <h2 className="text-3xl md:text-5xl font-serif font-semibold text-cream mb-6 animate-in">
            Stillness, Then <span className="text-gold-light">Wonder</span>
          </h2>
          <p className="text-cream/80 animate-in leading-relaxed">
            Begin with restoration, wander into the wild. Two rhythms of a single
            forest — one to soften the body, one to awaken the spirit.
          </p>
        </div>

        <h3 className="text-xl font-serif font-semibold text-gold-light mb-8 text-center tracking-wide">
          Wellness
        </h3>
        <div className="wellness-grid grid md:grid-cols-3 gap-6 mb-20">
          {wellness.map((item, index) => (
            <div
              key={index}
              className="wellness-card card-luxury bg-white/95 rounded-2xl p-8 text-center border border-gold/20 hover:border-gold/50 transition-all duration-300"
            >
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-gold-tint rounded-full">
                {item.icon}
              </div>
              <h4 className="text-xl font-serif font-semibold text-forest mb-3">
                {item.title}
              </h4>
              <p className="text-bark-muted">{item.description}</p>
            </div>
          ))}
        </div>

        <h3 className="text-xl font-serif font-semibold text-gold-light mb-8 text-center tracking-wide">
          Experiences
        </h3>
        <div className="experience-grid grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {experiences.map((item, index) => (
            <div
              key={index}
              className="experience-card card-luxury bg-white/95 rounded-2xl p-7 text-center border border-gold/20 hover:border-gold/50 transition-all duration-300"
            >
              <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center bg-gold-tint rounded-full">
                {item.icon}
              </div>
              <h4 className="text-lg font-serif font-semibold text-forest mb-2">
                {item.title}
              </h4>
              <p className="text-bark-muted text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
