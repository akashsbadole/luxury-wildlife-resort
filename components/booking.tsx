"use client"

import { useRef } from "react"
import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"
import { BookingForm } from "./booking-form"

export function Booking() {
  const sectionRef = useRef(null)

  useGSAP(
    () => {
      gsap.fromTo(
        ".booking-reveal",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.12,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        }
      )
    },
    { scope: sectionRef }
  )

  return (
    <section
      id="booking"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden bg-cream"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <p className="booking-reveal text-gold uppercase tracking-[0.25em] text-sm font-medium mb-4">
            Booking Portal
          </p>
          <h2 className="booking-reveal text-3xl md:text-5xl font-serif font-semibold text-forest mb-6">
            Reserve Your <span className="text-bark">Forest Escape</span>
          </h2>
          <p className="booking-reveal text-bark-muted leading-relaxed">
            Share your preferred dates and suite — our team will confirm
            availability and craft a stay shaped entirely around you.
          </p>
        </div>

        <div className="booking-reveal max-w-5xl mx-auto glass rounded-3xl p-6 md:p-10 shadow-lg">
          <BookingForm />
        </div>
      </div>
    </section>
  )
}
