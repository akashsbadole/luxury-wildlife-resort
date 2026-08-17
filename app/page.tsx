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
import { Cursor } from "@/components/cursor";
import { ScrollProgress } from "@/components/scroll-progress";
import { SectionNumbers } from "@/components/section-numbers";
import { FloatingActions } from "@/components/floating-actions";

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

function splitHeadlines() {
  document.querySelectorAll("main section h2").forEach((el) => {
    const h2 = el as HTMLElement;
    if (h2.closest(".cs-content")) return;
    if (h2.querySelector(".st-word")) return;
    h2.classList.remove("animate-in");

    const nodes = Array.from(h2.childNodes);
    h2.innerHTML = "";
    const appendWord = (content: Node | string) => {
      const wrap = document.createElement("span");
      wrap.className = "st-word";
      const inner = document.createElement("span");
      inner.className = "st-inner";
      inner.appendChild(
        typeof content === "string"
          ? document.createTextNode(content)
          : content
      );
      wrap.appendChild(inner);
      h2.appendChild(wrap);
      h2.appendChild(document.createTextNode(" "));
    };
    nodes.forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        (node.textContent ?? "")
          .split(/\s+/)
          .filter(Boolean)
          .forEach((word) => appendWord(word));
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        appendWord(node as Node);
      }
    });

    gsap.fromTo(
      h2.querySelectorAll(".st-inner"),
      { yPercent: 115, rotate: 4 },
      {
        yPercent: 0,
        rotate: 0,
        stagger: 0.05,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: h2,
          start: "top 88%",
          toggleActions: "play none none reverse",
        },
      }
    );
  });
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const mainRef = useRef(null);

  useGSAP(
    () => {
      if (isLoading) return;
      splitHeadlines();

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

    // Cinematic clip-path reveals on framed photos
    document
      .querySelectorAll("main section:not(#home) .cinematic")
      .forEach((el) => {
        if (!el.querySelector("img")) return;
        gsap.fromTo(
          el,
          { clipPath: "inset(0 0 100% 0)" },
          {
            clipPath: "inset(0 0 0% 0)",
            duration: 1.3,
            ease: "power4.inOut",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

    // Hero content drifts away on scroll
    gsap.to(
      [
        "#home .hero-word",
        "#home .hero-sub",
        "#home .hero-cta",
        "#home .scroll-indicator",
      ],
      {
        yPercent: -35,
        opacity: 0,
        stagger: 0.06,
        ease: "none",
        scrollTrigger: {
          trigger: "#home",
          start: "top top",
          end: "bottom top",
          scrub: 0.5,
        },
      }
    );
    },
    { dependencies: [isLoading], revertOnUpdate: true }
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main ref={mainRef} className="relative bg-cream">
      <SectionTransition />
      <Cursor />
      <ScrollProgress />
      <div aria-hidden="true" className="grain" />
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <SectionNumbers />
          <Navigation />
          <FloatingActions />
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