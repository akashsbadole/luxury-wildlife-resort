"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useGSAP } from "@gsap/react";
import { Loader } from "@/components/loader";
import { Navigation } from "@/components/navigation";
import { Hero } from "@/components/hero";
import { Marquee } from "@/components/marquee";
import { About } from "@/components/about";
import { ContentSection } from "@/components/ContentSection";
import { Accommodations } from "@/components/accommodations";
import { Dining } from "@/components/dining";
import { WellnessExperiences } from "@/components/wellness-experiences";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { SectionTransition } from "@/components/section-transition";
import { Booking } from "@/components/booking";
import DistanceSection from "@/components/address";
import TouristAttractionsSection from "@/components/TouristAttractionsSection";
import WhyChooseUs from "@/components/WhyChoose";
import InvestorSection from "@/components/InvestorSection";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const contentSections = [
  {
    title: "Immerse in Nature",
    subtitle: "Where Wilderness Meets Comfort",
    description:
      "Experience the thrill of the wild while enjoying world-class amenities. Our retreat seamlessly blends into the natural landscape, offering you an authentic forest experience without compromising on luxury.",
    image: "/images/tourist-place-images.png",
    imageAlt: "Peacock in Forest",
  },
  {
    title: "Luxurious Stays",
    subtitle: "Comfort in the Wild",
    description:
      "Our carefully designed suites offer the perfect retreat after a day of adventure. Each room provides stunning views of the surrounding wilderness while ensuring your utmost comfort.",
    image: "/images/Land-Image-1.jpg",
    imageAlt: "Luxury Forest View",
    reverse: true,
  },
  {
    title: "Wildlife Adventures",
    subtitle: "Connect with Nature",
    description:
      "Join our expert guides on carefully crafted safari experiences. Witness the majesty of wildlife in their natural habitat, from dawn safaris to nighttime adventures.",
    image: "/images/Land-Image-2.jpg",
    imageAlt: "Tiger with Baby",
  },
];

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const mainRef = useRef(null);

  useGSAP(() => {
    const sections = document.querySelectorAll("section");

    sections.forEach((section) => {
      gsap.fromTo(
        section.querySelectorAll(".animate-in"),
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        },
      );
    });

    document.querySelectorAll(".parallax-img").forEach((img) => {
      gsap.to(img, {
        yPercent: -15,
        ease: "none",
        scrollTrigger: {
          trigger: img,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
      });
    });
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main ref={mainRef} className="relative bg-cream">
      <SectionTransition />
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Navigation />
          <Hero />
          <Marquee />
          <About />
          <Accommodations />
          <Dining />
          <WellnessExperiences />
          {contentSections.map((section, index) => (
            <ContentSection key={index} {...section} />
          ))}
          <WhyChooseUs />
          <TouristAttractionsSection />
          <DistanceSection />
          <InvestorSection />
          {/* <Booking /> */}
          <Contact />
          <Footer />
        </>
      )}
    </main>
  );
}
