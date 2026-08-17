"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";

const BIRDS = [
  { top: "18%", scale: 0.5, duration: 18, delay: 0, bob: 18 },
  { top: "34%", scale: 0.3, duration: 26, delay: 6, bob: 12 },
  { top: "55%", scale: 0.4, duration: 22, delay: 12, bob: 15 },
];

export function Birds() {
  const scopeRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>(".hero-bird").forEach((bird) => {
          const d = Number(bird.dataset.duration);
          const bob = Number(bird.dataset.bob);
          gsap.fromTo(
            bird,
            { x: -120, y: 0, rotate: -4 },
            {
              x: window.innerWidth + 120,
              rotate: 4,
              duration: d,
              ease: "none",
              repeat: -1,
              delay: Number(bird.dataset.delay),
            },
          );
          gsap.to(bird, {
            y: `-=${bob}`,
            yoyo: true,
            repeat: -1,
            duration: 2.2,
            ease: "sine.inOut",
            delay: Number(bird.dataset.delay),
          });
        });
      });
      return () => mm.revert();
    },
    { scope: scopeRef },
  );

  return (
    <div ref={scopeRef} className="absolute inset-0 z-[2] pointer-events-none" aria-hidden="true">
      {BIRDS.map((bird, i) => (
        <div
          key={i}
          className="hero-bird absolute left-0 will-change-transform"
          style={{ top: bird.top, width: bird.scale * 60 }}
          data-duration={bird.duration}
          data-delay={bird.delay}
          data-bob={bird.bob}
        >
          <Image
            src="/images/kite-bird.png"
            alt=""
            width={147}
            height={169}
            className="w-full h-auto"
            unoptimized
          />
        </div>
      ))}
    </div>
  );
}