"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import {
  Waves,
  Wifi,
  UtensilsCrossed,
  Mountain,
  MapPin,
  ChevronRight,
  BookA,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const CARDS = [
  {
    title: "Earth-Crafted Cottages",
    description:
      "Mud homes, thatch roofs and bamboo detailing — village wisdom refined into five-star comfort, with stargazing nights and storytelling firesides.",
    image: "/images/forest-river.jpg",
    icons: [Waves, Mountain, Wifi],
  },
  {
    title: "Wellness Spaces",
    description:
      "Yoga shalas beneath the canopy, forest therapy trails, and Ayurvedic treatments drawn from traditions of the Vidarbha heartland.",
    image: "/images/spa.jpg",
    icons: [BookA, Waves, Wifi],
  },
  {
    title: "Nature Immersion",
    description:
      "Wildlife walks at dawn, lakeside kayaking, and farm harvesting — guided by people who have lived beside this forest for generations.",
    image: "/images/tiger-looking.jpg",
    icons: [UtensilsCrossed, Mountain, Wifi],
  },
];

const PITCH_POINTS = [
  "Cultural authenticity with minimal commercial dilution",
  "Proximity to wildlife reserves: Tipeshwar, Tadoba, and Painganga",
  "A shift toward authentic, regenerative tourism",
  "Government and international focus on eco-tourism zones",
  "A rare window to invest in a first-mover project that values experience over expansion",
];

const WhyChoose: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".why-card",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden flex items-center bg-forest-deep"
    >
      <div className="absolute inset-0 cinematic">
        <Image
          src="/images/jungle-background.jpg"
          alt=""
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="relative z-10 container mx-auto px-6 py-24 md:py-36">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <p className="eyebrow text-gold-light uppercase tracking-[0.3em] text-sm font-medium mb-5">
            Why Tipeshwar
          </p>
          <h2 className="text-4xl md:text-6xl font-serif font-light text-linen mb-6 leading-tight">
            A Hidden Gem, Still{" "}
            <span className="gradient-text font-semibold">Undiscovered</span>
          </h2>
          <div className="w-24 h-px bg-gold-light/70 mx-auto mb-8" />
          <p className="text-linen/80 text-lg md:text-xl mb-5 leading-relaxed max-w-3xl mx-auto">
            Although in close proximity to some of the most popular wildlife
            destinations of India, Tipeshwar remains largely undiscovered.
            Matched with the demand for slow travel, it stays off the radar —
            still sacred, still rooted.
          </p>
          <Link
            href="https://maps.app.goo.gl/6AaPE4krBMeySdEd6"
            className="inline-flex items-center gap-2 text-gold-light text-sm tracking-wide"
          >
            <MapPin size={18} />
            Nestled in the Tipeshwar Wildlife Sanctuary, Tipeshwar, Maharashtra
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-20">
          {CARDS.map((card) => (
            <div
              key={card.title}
              className="why-card group bg-forest-deep/85 backdrop-blur-sm rounded-2xl overflow-hidden border border-gold/20 card-luxury"
            >
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-deep via-transparent to-transparent" />
              </div>
              <div className="p-7">
                <h3 className="text-2xl font-serif font-semibold text-linen mb-3">
                  {card.title}
                </h3>
                <div className="w-12 h-px bg-gold mb-4" />
                <p className="text-bark-muted mb-6 leading-relaxed">
                  {card.description}
                </p>
                <div className="flex items-center gap-4">
                  {card.icons.map((Icon, i) => (
                    <span
                      key={i}
                      className="w-11 h-11 flex items-center justify-center rounded-full bg-gold-tint border border-gold/25"
                    >
                      <Icon className="text-gold-light" size={18} />
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="relative max-w-4xl mx-auto text-center py-14 px-8 md:px-14 rounded-3xl overflow-hidden border border-gold/25">
          <div className="absolute inset-0 bg-gradient-to-r from-forest-deep/95 via-forest-deep/80 to-gold/30" />
          <div className="absolute inset-0 bg-[url('/images/forest-scene.jpg')] opacity-10 mix-blend-overlay" />
          <div className="relative z-10">
            <h3 className="text-2xl md:text-4xl font-serif font-light text-linen mb-8 leading-snug">
              The world is ready to travel differently.
              <br />
              <span className="text-gold-light italic">
                This project is ready to receive them.
              </span>
            </h3>
            <ul className="max-w-xl mx-auto mb-10 space-y-3 text-left">
              {PITCH_POINTS.map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-3 text-linen/85 leading-relaxed"
                >
                  <span className="mt-2 w-1.5 h-1.5 bg-gold-light rotate-45 flex-shrink-0" />
                  {point}
                </li>
              ))}
            </ul>
            <Link
              href="/pdf/Resort-Proposal_low-resolution.pdf"
              target="_blank"
              download
              className="group inline-flex items-center btn-gold text-white font-medium px-10 py-4 rounded-full"
            >
              Download Proposal
              <ChevronRight
                className="ml-2 group-hover:translate-x-1 transition-transform duration-300"
                size={20}
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;