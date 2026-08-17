"use client";

import Image from "next/image";
import { EdgeHoverEffect } from "./edge-hover-effect";

export function About() {
  return (
    <section
      id="about"
      className="relative py-24 md:py-32 overflow-hidden bg-cream-deep"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="relative z-10 bg-forest-deep/70 backdrop-blur-sm rounded-2xl p-8 md:p-12 max-w-6xl mx-auto shadow-lg border border-gold/20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="eyebrow-start text-gold uppercase tracking-[0.25em] text-sm font-medium mb-4 animate-in">
                The Sanctuary
              </p>
              <h2 className="text-3xl md:text-5xl font-serif font-semibold text-forest mb-6 animate-in">
                About Our <span className="gradient-text">Forest Retreat</span>
              </h2>

              <h3 className="text-xl text-bark mb-6 animate-in py-4 text-justify font-light leading-relaxed">
                In an age of constant noise, concrete, and speed — there lies a
                50-acre promise of silence, simplicity, and soulful stillness.
              </h3>

              <p className="text-bark-muted mb-6 animate-in text-justify leading-relaxed">
                Tucked beside the Muchi Dam spillway and reservoir, embraced by
                the forests of Tipeshwar, the site isn&apos;t just scenic — it&apos;s
                symbolic. A place where life slows down, and where nature is more
                than a backdrop. It becomes the teacher, the healer, and the home.
              </p>

              <p className="text-bark-muted mb-6 animate-in text-justify leading-relaxed">
                Our vision isn&apos;t to build over nature, but to build with it.
              </p>

              <div className="flex flex-wrap gap-4 animate-in">
                <div className="bg-cream px-6 py-4 rounded-xl border border-border-warm/50">
                  <p className="text-3xl font-serif font-semibold text-gold">500+</p>
                  <p className="text-sm text-bark-muted">Acres of Nature</p>
                </div>
                <div className="bg-cream px-6 py-4 rounded-xl border border-border-warm/50">
                  <p className="text-3xl font-serif font-semibold text-gold">50+</p>
                  <p className="text-sm text-bark-muted">Wildlife Species</p>
                </div>
                <div className="bg-cream px-6 py-4 rounded-xl border border-border-warm/50">
                  <p className="text-3xl font-serif font-semibold text-gold">12</p>
                  <p className="text-sm text-bark-muted">Luxury Cabins</p>
                </div>
              </div>
            </div>

            <EdgeHoverEffect className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden animate-in shadow-xl img-hover-zoom">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
              <Image
                src="/images/Image-One.jpg"
                alt="Luxury cabin in the forest"
                fill
                className="object-cover parallax-img"
              />
            </EdgeHoverEffect>
          </div>
        </div>
      </div>
    </section>
  );
}
