const WORDS = [
  "Wilderness",
  "Luxury",
  "Serenity",
  "Adventure",
  "Stillness",
  "Safari",
];

export function Marquee() {
  const items = [...WORDS, ...WORDS];
  return (
    <div
      aria-hidden="true"
      className="relative overflow-hidden py-5 bg-forest-deep border-y border-gold/20"
    >
      <div className="marquee-track">
        {items.map((word, i) => (
          <span
            key={i}
            className="flex items-center gap-8 pr-8 font-serif text-2xl md:text-3xl italic text-gold/70 whitespace-nowrap"
          >
            {word}
            <span className="w-1.5 h-1.5 rounded-full bg-gold/50" />
          </span>
        ))}
      </div>
    </div>
  );
}