"use client"

import { useRef, useEffect, useState } from "react"
import { gsap } from "gsap"
import { ChevronDown } from "lucide-react"
import Image from "next/image"
import { Dancing_Script } from 'next/font/google'

const dancingScript = Dancing_Script({ 
  subsets: ['latin'],
  display: 'swap',
})

const backgroundImages = [
  {
    src: "/images/tiger-looking.jpg",
    alt: "Majestic Tiger Looking"
  },
  {
    src: "/images/indian forest.jpg",
    alt: "Lush Indian Forest"
  },
  {
    src: "/images/cooku birds.jpg",
    alt: "Beautiful Birds"
  },
  {
    src: "/images/tiger forest.jpg",
    alt: "Tiger in Forest"
  }
]

const birdImages = [
  {
    src: "/images/kite-bird.png",
    width: 200,
    height: 100,
    position: { top: "20%", left: "10%" },
    duration: 3
  },
  {
    src: "/images/birds watching.jpg",
    width: 150,
    height: 75,
    position: { top: "35%", right: "15%" },
    duration: 4
  },
  {
    src: "/images/forest parrot.jpg",
    width: 120,
    height: 60,
    position: { top: "50%", left: "25%" },
    duration: 2.5
  },
  {
    src: "/images/cooku birds.jpg",
    width: 180,
    height: 90,
    position: { top: "25%", right: "30%" },
    duration: 3.5
  },
  {
    src: "/images/bird see.jpg",
    width: 140,
    height: 70,
    position: { top: "65%", left: "40%" },
    duration: 3
  }
]

export function Hero() {
  const [currentImage, setCurrentImage] = useState(0)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)

    // Birds animations
    const birds = document.querySelectorAll('.flying-bird')
    birds.forEach((bird, index) => {
      const birdConfig = birdImages[index]
      
      // Set initial position and opacity
      gsap.set(bird, {
        opacity: 0.7,
        y: 0
      })

      // Create flying animation
      const tl = gsap.timeline({
        repeat: -1,
        defaults: { ease: "power1.inOut" }
      })

      // Upward movement
      tl.to(bird, {
        y: -100,
        duration: birdConfig.duration / 2,
        ease: "power1.out"
      })
      // Return to original position
      .to(bird, {
        y: 0,
        duration: birdConfig.duration / 2,
        ease: "power1.in"
      })
    })

    // Add animation class to gradient text
    document.querySelectorAll('.gradient-text').forEach(el => {
      el.classList.add('animated')
    })

    // Content animations
    gsap.fromTo(
      ".animate-content",
      { 
        y: 30,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease: "power2.out"
      }
    )

    // Background image rotation
    const interval = setInterval(() => {
      setCurrentImage(prev => (prev + 1) % backgroundImages.length)
    }, 6000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Images */}
      {backgroundImages.map((img, index) => (
        <div
          key={img.src}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentImage ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={img.src}
            alt={img.alt}
            fill
            className="object-cover"
            priority={index === 0}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
      ))}

      {/* Flying Birds */}
      {birdImages.map((bird, index) => (
        <div
          key={bird.src}
          className="flying-bird absolute z-10"
          style={{ 
            opacity: 0,
            top: bird.position.top,
            left: bird.position.left,
            right: bird.position.right
          }}
        >
          <Image
            src={bird.src}
            alt="Flying Bird"
            width={bird.width}
            height={bird.height}
            className="object-contain"
          />
        </div>
      ))}

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 text-center">
        <div className="max-w-6xl mx-auto bg-black/10 rounded-2xl p-12 shadow-2xl ">
          <h1 className={`${dancingScript.className} text-7xl md:text-9xl lg:text-[10rem] mb-8 leading-[1.1] gradient-text bg-gradient-to-r from-green-800 via-green-600 to-amber-800 bg-clip-text text-transparent`}>
            {["Luxury", "Wildlife", "Retreat"].map((word, index) => (
              <span key={index} className="block">
                {word}
              </span>
            ))}
          </h1>
          <p className="animate-content text-2xl md:text-3xl text-white mb-10 font-light tracking-wide opacity-0">
            Experience the perfect harmony of luxury and nature
          </p>
          <button className="animate-content px-10 py-4 bg-amber-500 text-white rounded-full text-xl opacity-0 hover:bg-amber-400 transition-colors font-medium tracking-wider shadow-xl hover:scale-105 transform duration-300">
            Start Your Journey
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/70 animate-bounce">
        <ChevronDown size={24} />
      </div>
    </section>
  )
}
