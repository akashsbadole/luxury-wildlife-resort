"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { EdgeHoverEffect } from "./edge-hover-effect";

const accommodations = [
  {
    title: "Luxury Treehouse",
    description: "Elevated living spaces with panoramic forest views",
    image: "/images/Image-2-1.jpg",
    features: ["King-size bed", "Private deck", "Outdoor shower", "Mini bar"],
  },
  {
    title: "Safari Tent",
    description: "Canvas luxury with all modern amenities in the wild",
    image: "/images/Image-2-3.jpg",
    features: [
      "Queen-size bed",
      "En-suite bathroom",
      "Private fire pit",
      "Lounge area",
    ],
  },
  {
    title: "Forest Villa",
    description: "Spacious villas nestled among ancient trees",
    image: "/images/Image-2-3.jpg",
    features: ["Two bedrooms", "Full kitchen", "Private hot tub", "Fireplace"],
  },
];

export function Accommodations() {
  const sectionRef = useRef(null);

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
      }
    );
  }, []);

  return (
    <section
      id="accommodations"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-br from-emerald-50 via-green-100/80 to-lime-100"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-[#00ff00] mb-6 animate-in">
            Luxury - <span className="text-green-800">The Core Intent</span>
          </h2>

          <p className="animate-in text-black text-[16px] py-4 capitalize text-justify">
            To create a space that blendrs sophistication with simplicity to
            deliver a meaningful experience. To offer a sanctuary that goes
            beyond luxury, beyond vacation. A place where time slows down, and
            the senses awaken - to birdsong, the rustle of the forest, the scent
            off damp soil, the laughter of village children, and the warmth of
            fire under open skies.
          </p>
          <blockquote className="block border-l-4 border-gray-500 italic capitalize pl-4 text-black text-base py-4 text-justify">
            To nurture the idea that nature is not a destination - it is home.
          </blockquote>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {accommodations.map((item, index) => (
            <div
              key={index}
              className="accommodation-card bg-[#053c36]/90 backdrop-blur-md rounded-2xl overflow-hidden transform transition-transform hover:scale-[1.02]"
            >
              <EdgeHoverEffect className="relative h-64 overflow-hidden">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  fill
                  className="object-contain transition-transform hover:scale-110 duration-700"
                />
              </EdgeHoverEffect>

              <div className="p-6 bg-[#053c36] rounded-b-2xl">
                <h3 className="text-2xl font-bold text-[#00ff00] mb-2">
                  {item.title}
                </h3>
                <p className="text-white mb-4">{item.description}</p>

                <ul className="space-y-2 mb-6">
                  {item.features.map((feature, i) => (
                    <li key={i} className="flex items-center ">
                      <span className="w-2 h-2 bg-amber-400 rounded-full mr-2"></span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <button className="w-full py-3 bg-amber-700/80 hover:bg-amber-600 text-white rounded-lg transition-colors">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
