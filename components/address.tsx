import Image from "next/image";
import { Plane, TrainFront, Bus, Car, MapPin } from "lucide-react";

const JOURNEYS = [
  {
    icon: Plane,
    label: "By Air",
    title: "Nagpur Airport",
    detail: "Dr. Babasaheb Ambedkar International Airport",
    distance: "150 km · 2.5-hour drive",
  },
  {
    icon: TrainFront,
    label: "By Rail",
    title: "Adilabad Station",
    detail: "Overnight train from Nagpur, then a short road transfer",
    distance: "35 km",
  },
  {
    icon: Car,
    label: "By Road",
    title: "NH44 from Nagpur",
    detail: "The highway towards Hyderabad, through Vidarbha countryside",
    distance: "2.5 hours",
  },
  {
    icon: Bus,
    label: "Nearest Town",
    title: "Pandharkawada",
    detail: "City and municipal council in the Yavatmal district",
    distance: "9 km · 15 minutes",
  },
];

const TOWNS = [
  { name: "Ralegaon", distance: "65.8 km" },
  { name: "Yavatmal", distance: "78.3 km" },
  { name: "Wardha", distance: "102 km" },
  { name: "Chandrapur", distance: "106 km" },
  { name: "Chimur", distance: "123 km" },
  { name: "Nagpur", distance: "150 km" },
  { name: "Amravati", distance: "173 km" },
  { name: "Nanded", distance: "220 km" },
  { name: "Adilabad", distance: "54.3 km" },
  { name: "Akola", distance: "237 km" },
];

const RESERVES = [
  { name: "Tipeshwar Wildlife Sanctuary", distance: "35 km" },
  { name: "Tadoba-Andhari Tiger Reserve", distance: "115 km" },
  { name: "Painganga Wildlife Sanctuary", distance: "112 km" },
  { name: "Chaprala Wildlife Sanctuary", distance: "177 km" },
];

export default function ForestDistanceSection() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-cream">
      <div
        aria-hidden="true"
        className="glow-orb w-[500px] h-[500px] -bottom-64 -left-40"
        style={{ background: "radial-gradient(circle, rgba(46,74,58,0.4), transparent 70%)" }}
      />
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="eyebrow text-gold uppercase tracking-[0.3em] text-sm font-medium mb-5">
            Getting Here
          </p>
          <h2 className="text-4xl md:text-6xl font-serif font-light text-forest mb-6">
            Your Retreat <span className="gradient-text font-semibold">Awaits</span>
          </h2>
          <p className="text-bark-muted text-lg leading-relaxed">
            Reachable from Nagpur in under three hours, the retreat sits at the
            edge of the Tipeshwar Wildlife Sanctuary — close enough for an
            escape, far enough to be truly away.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-10 lg:gap-14 items-center mb-20">
          <div className="lg:col-span-2">
            <div className="cinematic relative aspect-[4/5] rounded-3xl overflow-hidden border border-gold/25 shadow-2xl">
              <Image
                src="/green-forest-scenes.png"
                alt="Forest pathway leading into Tipeshwar"
                fill
                className="object-cover"
              />
              <div className="absolute bottom-5 left-5 right-5">
                <div className="bg-forest-deep/80 backdrop-blur-sm rounded-2xl border border-gold/25 px-5 py-4">
                  <p className="flex items-center gap-2 text-gold-light text-sm font-medium">
                    <MapPin size={16} />
                    Tipeshwar Wildlife Sanctuary, Maharashtra
                  </p>
                  <p className="text-linen/70 text-xs mt-1">
                    Gate opens with the forest at dawn
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="divide-y divide-gold/15 border-y border-gold/15">
              {JOURNEYS.map((journey) => (
                <div key={journey.label} className="flex items-start gap-5 py-6">
                  <span className="w-12 h-12 flex items-center justify-center rounded-full bg-gold-tint border border-gold/25 flex-shrink-0">
                    <journey.icon className="text-gold-light" size={20} />
                  </span>
                  <div className="flex-1">
                    <p className="text-xs uppercase tracking-[0.25em] text-gold mb-1">
                      {journey.label}
                    </p>
                    <div className="flex items-baseline justify-between gap-4">
                      <h3 className="text-xl md:text-2xl font-serif text-forest">
                        {journey.title}
                      </h3>
                      <span className="text-sm text-gold whitespace-nowrap font-medium">
                        {journey.distance}
                      </span>
                    </div>
                    <p className="text-bark-muted mt-1">{journey.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          <div className="glass rounded-3xl p-8">
            <p className="eyebrow-start text-gold uppercase tracking-[0.25em] text-xs font-medium mb-6">
              Wildlife Reserves Nearby
            </p>
            <div className="space-y-4">
              {RESERVES.map((reserve) => (
                <div
                  key={reserve.name}
                  className="flex items-baseline justify-between gap-4 border-b border-gold/10 pb-3 last:border-0 last:pb-0"
                >
                  <span className="font-serif text-lg text-linen">
                    {reserve.name}
                  </span>
                  <span className="text-sm text-gold-light whitespace-nowrap">
                    {reserve.distance}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="glass rounded-3xl p-8">
            <p className="eyebrow-start text-gold uppercase tracking-[0.25em] text-xs font-medium mb-6">
              Driving Distances
            </p>
            <div className="grid grid-cols-2 gap-x-8 gap-y-3">
              {TOWNS.map((town) => (
                <div
                  key={town.name}
                  className="flex items-baseline justify-between gap-3 border-b border-gold/10 pb-2"
                >
                  <span className="text-bark-light text-sm">{town.name}</span>
                  <span className="text-gold-light text-xs whitespace-nowrap">
                    {town.distance}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}