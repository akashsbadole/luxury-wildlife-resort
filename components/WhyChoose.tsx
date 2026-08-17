// components/LuxuryJungleResort.tsx
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Image from "next/image";
import {
  Waves,
  Wifi,
  UtensilsCrossed,
  Mountain,
  MapPin,
  ChevronRight,
  BookA, // Renamed Spa to SpaIcon to avoid conflict
} from "lucide-react";
import Link from "next/link";

// Register ScrollTrigger with GSAP
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const LuxuryJungleResort: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const parallaxRef = useRef<HTMLDivElement>(null);

  // Reset the refs array when component mounts
  cardsRef.current = [];

  // Add card elements to the refs array
  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const parallax = parallaxRef.current;
    const cards = cardsRef.current;

    // Hero parallax effect
    if (parallax) {
      gsap.to(parallax, {
        y: "30%",
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }

    // Header animation
    if (header) {
      gsap.fromTo(
        header.children,
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
            trigger: header,
            start: "top 80%",
          },
        }
      );
    }

    // Cards animation
    if (cards.length > 0) {
      gsap.fromTo(
        cards,
        {
          y: 80,
          opacity: 0,
          scale: 0.9,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          stagger: 0.15,
          duration: 0.8,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: cards[0].parentElement,
            start: "top 85%",
          },
        }
      );
    }

    // Feature icon pulse
    gsap.to(".feature-icon", {
      scale: 1.1,
      duration: 2,
      ease: "power1.inOut",
      repeat: -1,
      yoyo: true,
      stagger: 0.1,
    });

    // Clean up
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      gsap.killTweensOf(".feature-icon");
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-emerald-900 via-emerald-800 to-emerald-900"
    >
      {/* Parallax Hero Background */}
      <div ref={parallaxRef} className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/30 mix-blend-multiply z-10"></div>
        <div className="h-full w-full relative">
          <div className="absolute inset-0 bg-[url('/images/jungle-background.jpg')] bg-cover bg-center"></div>
        </div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-6 py-24 md:py-36">
        {/* Header Section */}
        <div ref={headerRef} className="text-center max-w-4xl mx-auto mb-24">
          <h3 className="text-gold-light font-semibold text-xl mb-3 uppercase tracking-wider">
            Experience Nature's Luxury
          </h3>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8">
            WHY TIPESHWAR? WHY NOW?
          </h2>
          <div className="w-32 h-1 bg-gold-light mx-auto mb-8"></div>
          <p className="text-gray-100 text-lg md:text-xl mb-5 leading-relaxed">
            Although in close proximity to some of the most popular wildlife
            tourist destinations of India, Tipeshwar remains largely
            undiscovered. <br />
            <br />
            This, matched with the demand for slow-travel, makes it a hidden gem
            still off the radar, still sacred, still rooted.
          </p>

          <div className="flex items-center justify-center space-x-3">
            <Link href="https://maps.app.goo.gl/6AaPE4krBMeySdEd6">
              <span className="text-gray-200 mx-auto">
                <span>
                  <MapPin className="text-gold-light " size={20} />
                </span>
                Nestled in the Tipeshwar Wildlife Sanctuary, Tipeshwar,
                Maharashtra
              </span>
            </Link>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-20">
          {/* Private Pool Villa */}
          <div
            ref={addToRefs}
            className="group bg-white/10 backdrop-blur-md rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:bg-white/15 border border-white/20"
          >
            <div className="relative h-64 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
              <div className="absolute inset-0 bg-[url('/images/forest-river.jpg')] bg-cover bg-center group-hover:scale-110 transition-transform duration-700"></div>
              <div className="absolute bottom-4 left-6 z-20">
                <h3 className="text-2xl font-bold text-white mb-2">
                  Earth-crafted Cottages & Village Integration
                </h3>
                <div className="w-16 h-1 bg-gold-light"></div>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-200 mb-6 capitalize">
                mud homes, thatch roofs, bamboo detailing.local guides, folk art
                workshops, traditional cooking Stargazing Nights & Story telling
                Firesides
              </p>
              <div className="flex items-center space-x-6">
                <div className="feature-icon flex items-center justify-center w-12 h-12 rounded-full bg-emerald-800/50 border border-emerald-600/30">
                  <Waves className="text-gold-light" size={20} />
                </div>
                <div className="feature-icon flex items-center justify-center w-12 h-12 rounded-full bg-emerald-800/50 border border-emerald-600/30">
                  <Mountain className="text-gold-light" size={20} />
                </div>
                <div className="feature-icon flex items-center justify-center w-12 h-12 rounded-full bg-emerald-800/50 border border-emerald-600/30">
                  <Wifi className="text-gold-light" size={20} />
                </div>
              </div>
            </div>
          </div>

          {/* Spa Sanctuary */}
          <div
            ref={addToRefs}
            className="group bg-white/10 backdrop-blur-md rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:bg-white/15 border border-white/20"
          >
            <div className="relative h-64 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
              <div className="absolute inset-0 bg-[url('/images/spa.jpg')] bg-cover bg-center group-hover:scale-110 transition-transform duration-700"></div>
              <div className="absolute bottom-4 left-6 z-20">
                <h3 className="text-2xl font-bold text-white mb-2">
                  Wellness Spaces
                </h3>
                <div className="w-16 h-1 bg-gold-light"></div>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-200 mb-6">
                yoga shalas, forest therapy trails, Ayurvedic treatments
              </p>
              <div className="flex items-center space-x-6">
                <div className="feature-icon flex items-center justify-center w-12 h-12 rounded-full bg-emerald-800/50 border border-emerald-600/30">
                  <BookA className="text-gold-light" size={20} />
                </div>
                <div className="feature-icon flex items-center justify-center w-12 h-12 rounded-full bg-emerald-800/50 border border-emerald-600/30">
                  <Waves className="text-gold-light" size={20} />
                </div>
                <div className="feature-icon flex items-center justify-center w-12 h-12 rounded-full bg-emerald-800/50 border border-emerald-600/30">
                  <Wifi className="text-gold-light" size={20} />
                </div>
              </div>
            </div>
          </div>

          {/* Gourmet Dining */}
          <div
            ref={addToRefs}
            className="group bg-white/10 backdrop-blur-md rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:bg-white/15 border border-white/20"
          >
            <div className="relative h-64 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
              <div className="absolute inset-0 bg-[url('/images/tiger-looking.jpg')] bg-cover bg-center group-hover:scale-110 transition-transform duration-700"></div>
              <div className="absolute bottom-4 left-6 z-20">
                <h3 className="text-2xl font-bold text-white mb-2">
                  Nature Immersion
                </h3>
                <div className="w-16 h-1 bg-gold-light"></div>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-200 mb-6">
                wildlife walks, lakeside kayaking, farm harvesting
              </p>
              <div className="flex items-center space-x-6">
                <div className="feature-icon flex items-center justify-center w-12 h-12 rounded-full bg-emerald-800/50 border border-emerald-600/30">
                  <UtensilsCrossed className="text-gold-light" size={20} />
                </div>
                <div className="feature-icon flex items-center justify-center w-12 h-12 rounded-full bg-emerald-800/50 border border-emerald-600/30">
                  <Mountain className="text-gold-light" size={20} />
                </div>
                <div className="feature-icon flex items-center justify-center w-12 h-12 rounded-full bg-emerald-800/50 border border-emerald-600/30">
                  <Wifi className="text-gold-light" size={20} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div
          className="relative max-w-3xl mx-auto text-center py-12 px-8 rounded-2xl overflow-hidden"
          ref={addToRefs}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-forest-deep/95 to-gold/40 backdrop-blur-md"></div>
          <div className="absolute inset-0 bg-[url('/images/forest-scene.jpg')] opacity-10 mix-blend-overlay"></div>
          <div className="relative z-10">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
              THE WORLD IS READY TO TRAVEL DIFFERENTLY. THIS PROJECT IS READY TO
              RECEIVE THEM.
            </h3>
            <p className="text-gray-100 mb-2 max-w-lg mx-auto">
              • Cultural authenticity with minimal commercial dilution
            </p>
            <p className="text-gray-100 mb-2 max-w-lg mx-auto">
              • Proximity to wildlife reserves: Tipeshwar, Tadoba, and Painganga
            </p>
            <p className="text-gray-100 mb-2 max-w-lg mx-auto">
              • Shift toward authentic, regenerative tourism
            </p>
            <p className="text-gray-100 mb-2 max-w-lg mx-auto">
              • Government and international focus on eco-tourism zones
            </p>
            <p className="text-gray-100 mb-2 max-w-lg mx-auto">
              • This is a rare window to invest in a first-mover project that
              values experience over expansion.
            </p>
            <p className="text-gray-100 mb-2 max-w-lg mx-auto">
              • This is a rare window to invest in a first-mover project that
              values experience over expansion.
            </p>
            <Link
              href="/pdf/Resort-Proposal_low-resolution.pdf"
              target="_blank"
              download
              className="group inline-flex items-center btn-gold text-white font-medium px-8 py-4 rounded-full hover:bg-gold-light transition-all duration-300 transform hover:scale-105"
            >
              Download Pdf
              <ChevronRight
                className="ml-2 group-hover:translate-x-1 transition-transform duration-300"
                size={20}
              />
            </Link>
          </div>
        </div>
      </div>

      {/* Background Effects */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black/40 to-transparent"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold/20 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-600/20 rounded-full filter blur-3xl"></div>
    </section>
  );
};

export default LuxuryJungleResort;
