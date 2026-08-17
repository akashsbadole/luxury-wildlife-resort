"use client";

import Image from "next/image";
import { Trees, Mountain, Castle, UtensilsCrossed, Plane, MapPin } from "lucide-react";

const GROUPS = [
  {
    label: "Within the Sanctuary",
    items: [
      {
        name: "Local Tribes & Cuisine",
        distance: "3 km",
        description:
          "Vidarbha's bold table — Pithla-Bhakri, Varhadi Dal, Saoji Mutton and tribal specialities.",
        icon: UtensilsCrossed,
      },
      {
        name: "Muchi Dam Spillway & Reservoir",
        distance: "10 km",
        description:
          "The water at the retreat's edge — dawn mist, still water, and the sound of the spillway.",
        icon: MapPin,
      },
    ],
  },
  {
    label: "Under 65 Kilometres",
    items: [
      {
        name: "Jagdamba Temple, Kelapur",
        distance: "20 km",
        description: "An ancient shrine of the region, held sacred by local communities.",
        icon: Castle,
      },
      {
        name: "Mesolithic Stone-Age Site, Pardi",
        distance: "29 km",
        description: "Prehistoric ground — a quiet glimpse into the land before memory.",
        icon: Mountain,
      },
      {
        name: "Hot Water Springs, Unkeshwar",
        distance: "56 km",
        description: "Natural thermal springs, long a place of pilgrimage and pause.",
        icon: Mountain,
      },
    ],
  },
  {
    label: "Beyond 100 Kilometres",
    items: [
      {
        name: "Tadoba-Andhari Tiger Reserve",
        distance: "115 km",
        description: "Maharashtra's oldest national park — the land of the big cat.",
        icon: Trees,
      },
      {
        name: "Nagpur",
        distance: "150 km",
        description:
          "Dr. Babasaheb Ambedkar International Airport — about a 2.5-hour drive home.",
        icon: Plane,
      },
    ],
  },
];

export default function TouristAttractionsSection() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-cream-deep">
      <div
        aria-hidden="true"
        className="glow-orb w-[550px] h-[550px] -top-64 -right-40"
        style={{ background: "radial-gradient(circle, rgba(164,121,63,0.3), transparent 70%)" }}
      />
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="eyebrow text-gold uppercase tracking-[0.3em] text-sm font-medium mb-5">
            Points of Interest
          </p>
          <h2 className="text-4xl md:text-6xl font-serif font-light text-forest mb-6">
            Explore <span className="gradient-text font-semibold">Nearby</span>
          </h2>
          <p className="text-bark-muted text-lg leading-relaxed">
            The retreat sits at the centre of a living landscape — temples,
            springs, tribal villages and wild reserves, each within a
            comfortable drive.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10 md:gap-14 items-start">
          <div className="hidden lg:block relative">
            <div className="cinematic relative aspect-[4/5] rounded-3xl overflow-hidden border border-gold/25 shadow-2xl sticky top-28">
              <Image
                src="/images/Jungle-Resort.jpg"
                alt="Tipeshwar Forest Retreat"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 flex items-end">
                <div className="w-full bg-gradient-to-t from-forest-deep/90 to-transparent p-6">
                  <p className="text-gold-light text-xs tracking-[0.25em] uppercase mb-1">
                    Tipeshwar Forest Retreat
                  </p>
                  <p className="text-linen font-serif text-lg italic">
                    At the heart of it all
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-2 space-y-12">
            {GROUPS.map((group) => (
              <div key={group.label}>
                <p className="eyebrow-start text-gold uppercase tracking-[0.25em] text-xs font-medium mb-6">
                  {group.label}
                </p>
                <div className="divide-y divide-gold/15 border-t border-gold/15">
                  {group.items.map((item) => (
                    <div
                      key={item.name}
                      className="group flex items-start gap-5 py-6 transition-colors duration-300 hover:bg-forest-deep/30 px-3 -mx-3 rounded-xl"
                    >
                      <span className="w-12 h-12 flex items-center justify-center rounded-full bg-gold-tint border border-gold/25 flex-shrink-0 mt-1">
                        <item.icon className="text-gold-light" size={20} />
                      </span>
                      <div className="flex-1">
                        <div className="flex items-baseline justify-between gap-4">
                          <h3 className="text-xl md:text-2xl font-serif text-forest group-hover:text-gold-light transition-colors duration-300">
                            {item.name}
                          </h3>
                          <span className="text-sm text-gold whitespace-nowrap font-medium">
                            {item.distance}
                          </span>
                        </div>
                        <p className="text-bark-muted mt-1.5 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}