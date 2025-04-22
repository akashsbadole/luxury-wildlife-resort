"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import {
  TelescopeIcon as Binoculars,
  Utensils,
  Compass,
  Camera,
} from "lucide-react";
import { EdgeHoverEffect } from "./edge-hover-effect";
import Image from "next/image";

const experiences = [
  {
    icon: <Binoculars className="w-10 h-10 text-green-800" />,
    title: "Wildlife Safari",
    description:
      "Guided tours to observe exotic wildlife in their natural habitat with expert naturalists.",
  },
  {
    icon: <Utensils className="w-10 h-10 text-green-800" />,
    title: "Gourmet Dining",
    description:
      "Farm-to-table cuisine featuring local ingredients prepared by world-class chefs.",
  },
  {
    icon: <Compass className="w-10 h-10 text-green-800" />,
    title: "Adventure Trails",
    description:
      "Hiking, biking, and horseback riding through scenic wilderness trails.",
  },
  {
    icon: <Camera className="w-10 h-10 text-green-800" />,
    title: "Photography Tours",
    description:
      "Capture stunning wildlife and landscapes with our professional photography guides.",
  },
];

const videoSource = "/video/tiger-hd_1920_1080_24fps.mp4";

export function Experience() {
  const sectionRef = useRef(null);

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
      }
    );
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        {/* <Image
          src="/images/tiger forest.jpg"
          alt="Tiger Forest Background"
          fill
          className="object-cover"
          priority
          quality={100}
        /> */}

        {/* Video Background */}
        <video
          autoPlay
          loop
          muted
          className="absolute inset-0 h-full w-full object-cover z-0"
        >
          <source src={videoSource} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 "></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-[#00ff00] mb-6 animate-in">
            Unforgettable <span className="text-green-800">Experiences</span>
          </h2>

          <p className="text-[#00ff00]/90 animate-in">
            Immerse yourself in a world of adventure and relaxation with our
            curated experiences designed to connect you with nature and luxury.
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

              <h3 className="text-xl font-bold text-[#00ff00] mb-3">
                {item.title}
              </h3>
              <p className="text-amber-200/80">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center animate-in">
          <button className="px-8 py-3 bg-amber-700 hover:bg-amber-600 text-[#00ff00] rounded-full transition-colors text-lg">
            Explore All Experiences
          </button>
        </div>
      </div>
    </section>
  );
}
