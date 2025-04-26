"use client";

import Image from "next/image";
import { EdgeHoverEffect } from "./edge-hover-effect";

export function About() {
  return (
    <section
      id="about"
      className="relative py-24 md:py-32 overflow-hidden bg-[#053c36]"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="relative z-10 bg-black/40 backdrop-blur-md rounded-2xl p-8 md:p-12 max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#00ff00] mb-6 animate-in">
                About Our{" "}
                <span className="text-[#fff8f0]">Wildlife Resort</span>
              </h2>

              <h3 className="text-xl text-[#fff8f0] mb-6 animate-in py-4 text-justify">
                In an Age of Constant Noise, Concrete, and Speed - There lies a
                50-Acre Promise of Silence, simplicity, and Soulful stillness.
              </h3>

              <p className="text-[#fff8f0] mb-6 animate-in text-justify">
                Tucked beside the Muchi dam spillway and Reservoir, embraced by
                the forests of tipeshwar,the proposed site isn't just scenic -
                it's symbolic. A place where life can slow down, and where
                nature is more than a backdrop. It becomes the teacher, the
                healer, and the home.
              </p>

              <p className="text-[#fff8f0] mb-6 animate-in text-justify">
                The Vision for This resort Isn't to build over nature, But to
                build with it.
              </p>

              <div className="flex flex-wrap gap-4 animate-in">
                <div className="bg-[#fff8f0] px-4 py-3 rounded-lg">
                  <p className="text-2xl font-bold text-green-800">500+</p>
                  <p className="text-sm text-black">Acres of Nature</p>
                </div>

                <div className="bg-[#fff8f0] px-4 py-3 rounded-lg">
                  <p className="text-2xl font-bold text-green-800">50+</p>
                  <p className="text-sm text-black">Wildlife Species</p>
                </div>

                <div className="bg-[#fff8f0] px-4 py-3 rounded-lg">
                  <p className="text-2xl font-bold text-green-800">12</p>
                  <p className="text-sm text-black">Luxury Cabins</p>
                </div>
              </div>
            </div>

            <EdgeHoverEffect className="relative h-[400px] md:h-[500px] rounded-xl overflow-hidden animate-in">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
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
