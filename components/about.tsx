"use client"

import Image from "next/image"
import { EdgeHoverEffect } from "./edge-hover-effect"

export function About() {
  return (
    <section id="about" className="relative py-24 md:py-32 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="relative z-10 bg-black/40 backdrop-blur-md rounded-2xl p-8 md:p-12 max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#00ff00] mb-6 animate-in">
                About Our <span className="text-green-800">Wildlife Resort</span>
              </h2>

              <p className="text-[#00ff00]/90 mb-6 animate-in">
                Nestled in the heart of pristine wilderness, our luxury resort offers an unparalleled experience where
                comfort meets the wild. Established in 2010, we have created a sanctuary where guests can immerse
                themselves in nature without compromising on luxury.
              </p>

              <p className="text-[#00ff00]/90 mb-6 animate-in">
                Our eco-friendly resort spans over 500 acres of protected forest, providing a safe haven for diverse
                wildlife while offering guests exclusive access to observe these magnificent creatures in their natural
                habitat.
              </p>

              <div className="flex flex-wrap gap-4 animate-in">
                <div className="bg-amber-900/30 px-4 py-3 rounded-lg">
                  <p className="text-2xl font-bold text-green-800">500+</p>
                  <p className="text-sm text-[#00ff00]/80">Acres of Nature</p>
                </div>

                <div className="bg-amber-900/30 px-4 py-3 rounded-lg">
                  <p className="text-2xl font-bold text-green-800">50+</p>
                  <p className="text-sm text-[#00ff00]/80">Wildlife Species</p>
                </div>

                <div className="bg-amber-900/30 px-4 py-3 rounded-lg">
                  <p className="text-2xl font-bold text-green-800">12</p>
                  <p className="text-sm text-[#00ff00]/80">Luxury Cabins</p>
                </div>
              </div>
            </div>

            <EdgeHoverEffect className="relative h-[400px] md:h-[500px] rounded-xl overflow-hidden animate-in">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
              <Image
                src="/images/Jungle-Resort.jpg"
                alt="Luxury cabin in the forest"
                fill
                className="object-cover parallax-img"
              />
            </EdgeHoverEffect>
          </div>
        </div>
      </div>
    </section>
  )
}
