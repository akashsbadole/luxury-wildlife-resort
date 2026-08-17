"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ContentSectionProps {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  imageAlt: string;
  reverse?: boolean;
}

export function ContentSection({
  title,
  subtitle,
  description,
  image,
  imageAlt,
  reverse = false,
}: ContentSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (sectionRef.current && titleRef.current) {
      const words = title
        .split(" ")
        .map((word) => `<span class="inline-block">${word}</span>`)
        .join(" ");
      if (titleRef.current) {
        titleRef.current.innerHTML = words;
      }

      gsap.fromTo(
        titleRef.current.querySelectorAll("span"),
        { opacity: 0, y: 50, rotateX: -90 },
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
      );

      gsap.fromTo(
        sectionRef.current.querySelector(".content-animate"),
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.5,
          ease: "power3.out",
          immediateRender: false,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none reverse",
          },
        }
      );

      gsap.from(sectionRef.current.querySelector(".image-animate"), {
        opacity: 1,
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
      });
    }
  }, [reverse, title]);

  return (
    <section ref={sectionRef} className="py-6 md:py-0 overflow-hidden">
      <div
        className={`container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center ${
          reverse ? "bg-cream-deep" : "bg-forest-deep"
        } rounded-3xl overflow-hidden`}
      >
        <div className={`space-y-6 px-5 py-8 ${reverse ? "md:order-2" : ""}`}>
          <h2
            ref={titleRef}
            className={`text-4xl md:text-5xl font-serif font-semibold perspective-1000 ${
              reverse ? "text-forest" : "text-linen"
            }`}
          >
            {title}
          </h2>
          <div className="content-animate">
            <h3
              className={`${
                reverse ? "text-bark" : "text-linen"
              } text-xl md:text-2xl font-serif font-medium mb-4`}
            >
              {subtitle}
            </h3>
            <p
              className={`${
                reverse ? "text-bark-muted" : "text-linen/80"
              } text-lg leading-relaxed`}
            >
              {description}
            </p>
          </div>
        </div>

        <div
          className={`image-animate cinematic relative h-[500px] ${
            reverse ? "md:order-1" : ""
          }`}
        >
          <Image
            src={image}
            alt={imageAlt}
            fill
            className="object-cover rounded-3xl img-hover-zoom"
          />
        </div>
      </div>
    </section>
  );
}
