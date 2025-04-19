"use client"

import { useRef, useEffect } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const images = [
  {
    src: '/images/tiger-looking.jpg',
    alt: 'Tiger Looking',
    title: 'Majestic Tiger'
  },
  {
    src: '/images/forest parrot.jpg',
    alt: 'Forest Parrot',
    title: 'Colorful Wildlife'
  },
  {
    src: '/images/birds watching.jpg',
    alt: 'Birds Watching',
    title: 'Bird Watching'
  },
  {
    src: '/images/tiger roaring.jpg',
    alt: 'Tiger Roaring',
    title: 'Wild Encounters'
  },
  {
    src: '/images/bird see.jpg',
    alt: 'Bird See',
    title: 'Bird Sanctuary'
  }
]

export function ImageGallery() {
  const galleryRef = useRef<HTMLDivElement>(null)
  const imagesRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const gallery = galleryRef.current
    const images = imagesRef.current

    // Initial animation on scroll
    images.forEach((image, index) => {
      if (image) {
        gsap.fromTo(
          image,
          {
            opacity: 0,
            x: index % 2 === 0 ? -50 : 50,
          },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: image,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse",
            },
          }
        )
      }
    })
  }, [])

  return (
    <div ref={galleryRef} className="w-full py-20 bg-black/50">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {images.map((image, index) => (
          <div
            key={index}
            ref={el => imagesRef.current[index] = el}
            className="relative h-[400px] group transition-all duration-500 ease-in-out hover:md:col-span-2"
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover rounded-2xl transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/30 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-2xl font-semibold">{image.title}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 