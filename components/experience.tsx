"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import {
  TelescopeIcon as Binoculars,
  Bird,
  Compass,
  Camera,
  LandPlot,
  Wind,
  Fan,
} from "lucide-react";
import { EdgeHoverEffect } from "./edge-hover-effect";
import Image from "next/image";

const experiences = [
  {
    icon: <LandPlot className="w-10 h-10 text-green-800" />,
    title: "Wildlife Safari",
    description: "50 acres of privately-owned land.",
  },
  {
    icon: <Bird className="w-10 h-10 text-green-800" />,
    title: "Gourmet Dining",
    description: "Bordering thr Tipeshwar Wildlife Sanctuary.",
  },
  {
    icon: <Compass className="w-10 h-10 text-green-800" />,
    title: "Adventure Trails",
    description:
      "Hugging the quit waters of the Muchi Dam Spillover & Reservoir.",
  },
  {
    icon: <Fan className="w-10 h-10 text-green-800" />,
    title: "Photography Tours",
    description: "Uninterrupted views, zero commercial pollution.",
  },
  {
    icon: <Wind className="w-10 h-10 text-green-800" />,
    title: "Adventure Trails",
    description:
      "Rich in biodiversity - with freqent tiger sightings and more.",
  },
  {
    icon: <Camera className="w-10 h-10 text-green-800" />,
    title: "Photography Tours",
    description:
      "The land is fertile. untouched. Waiting not to be conquered - but colloborated with nature.",
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
      className="relative py-24 md:py-32 overflow-hidden mx-auto"
    >
      <div
        className="absolute inset-0 z-0 "
        style={{
          backgroundImage: `url('/images/jungle-background.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* <Image
          src="/images/jungle-background.jpg"
          alt="Tiger Forest Background"
          fill
          className="object-cover"
          priority
          quality={100}
        /> */}

        {/* Video Background */}
        {/* <video
          autoPlay
          loop
          muted
          className="absolute inset-0 h-full w-full object-cover z-0"
        >
          <source src={videoSource} type="video/mp4" />
          Your browser does not support the video tag.
        </video> */}
        <div className="absolute inset-0 "></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-[#00ff00] mb-6 animate-in">
            The Land{" "}
            <span className="text-green-800">Unforgettable Experiences</span>
          </h2>

          <div className="bg-black/30 backdrop-saturate-200">
            <p className="text-white animate-in text-[18px] leading-8 py-2">
              This 50-acre, family-owned parcel lies in a region where most land
              is reserved for tribal use, unavailable for private development,
              making it exceptionally rare.
            </p>
            <p className="text-white animate-in text-[18px] leading-8 py-2">
              Elevated above the Muchi Dam Reservoir and surrounded by hills and
              lakes, the site enjoys a naturally pleasant microclimate and
              year-round habitability - ideal for a nature-based resort.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {experiences.map((item, index) => (
            <div
              key={index}
              className="experience-card bg-black/50 backdrop-blur-md rounded-2xl p-6 text-center border border-amber-900/30 hover:border-amber-500/50 transition-all"
            >
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-white rounded-full">
                {item.icon}
              </div>

              <h3 className="text-xl font-bold text-[#00ff00] mb-3">
                {item.title}
              </h3>
              <p className="text-amber-200/80">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center animate-in hidden">
          <button className="px-8 py-3 bg-amber-700 hover:bg-amber-600 text-[#00ff00] rounded-full transition-colors text-lg">
            Explore All Experiences
          </button>
        </div>
      </div>
    </section>
  );
}
