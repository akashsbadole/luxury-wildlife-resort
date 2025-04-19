"use client"

import { useRef, useEffect } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface ContentSectionProps {
  title: string
  subtitle: string
  description: string
  image: string
  imageAlt: string
  reverse?: boolean
}

export function ContentSection({ 
  title, 
  subtitle, 
  description, 
  image, 
  imageAlt,
  reverse = false 
}: ContentSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    if (sectionRef.current && titleRef.current) {
      // Create spans for each word in the title
      const words = title.split(' ').map(word => `<span class="inline-block">${word}</span>`).join(' ')
      if (titleRef.current) {
        titleRef.current.innerHTML = words
      }

      // Animate each word
      gsap.fromTo(
        titleRef.current.querySelectorAll('span'),
        {
          opacity: 0,
          y: 50,
          rotateX: -90,
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          stagger: 0.1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      )

      // Content animation
      gsap.from(sectionRef.current.querySelector('.content-animate'), {
        opacity: 0,
        y: 50,
        duration: 1,
        delay: 0.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      })

      // Image animation
      gsap.from(sectionRef.current.querySelector('.image-animate'), {
        opacity: 0,
        x: reverse ? 50 : -50,
        duration: 1,
        delay: 0.3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      })
    }
  }, [reverse, title])

  return (
    <section ref={sectionRef} className="py-20 overflow-hidden">
      <div className={`container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center ${reverse ? 'direction-rtl' : ''}`}>
        <div className={`space-y-6 ${reverse ? 'md:order-2' : ''}`}>
          <h2 
            ref={titleRef} 
            className="text-4xl md:text-5xl font-bold text-amber-100 perspective-1000"
          >
            {title}
          </h2>
          <div className="content-animate">
            <h3 className="text-xl md:text-2xl text-amber-200/80 font-semibold mb-4">
              {subtitle}
            </h3>
            <p className="text-lg text-amber-100/70">
              {description}
            </p>
          </div>
        </div>
        
        <div className={`image-animate relative h-[500px] ${reverse ? 'md:order-1' : ''}`}>
          <Image
            src={image}
            alt={imageAlt}
            fill
            className="object-cover rounded-2xl"
          />
        </div>
      </div>
    </section>
  )
} 