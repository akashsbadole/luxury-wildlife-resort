"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"
import { Canvas } from "@react-three/fiber"
import { Loader } from "@/components/loader"
import { Navigation } from "@/components/navigation"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Accommodations } from "@/components/accommodations"
import { Experience } from "@/components/experience"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"
import { ForestScene } from "@/components/forest-scene"
import { useGSAP } from "@gsap/react"

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const mainRef = useRef(null)

  useGSAP(() => {
    // Initialize scroll animations
    const sections = document.querySelectorAll("section")

    sections.forEach((section) => {
      gsap.fromTo(
        section.querySelectorAll(".animate-in"),
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            toggleActions: "play none none none",
          },
        },
      )
    })

    // Parallax effects for images
    document.querySelectorAll(".parallax-img").forEach((img) => {
      gsap.to(img, {
        yPercent: -20,
        ease: "none",
        scrollTrigger: {
          trigger: img,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      })
    })
  }, [])

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <main ref={mainRef} className="relative">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="fixed inset-0 w-full h-full z-0">
            <Canvas camera={{ position: [0, 5, 15], fov: 75 }} dpr={[1, 2]} shadows>
              <ForestScene />
            </Canvas>
          </div>

          <div className="relative z-10">
            <Navigation />
            <Hero />
            <About />
            <Accommodations />
            <Experience />
            <Contact />
            <Footer />
          </div>
        </>
      )}
    </main>
  )
}
