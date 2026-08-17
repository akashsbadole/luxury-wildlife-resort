import { triggerSectionTransition } from "./section-transition";

const STATS = [
  { value: "12", label: "Signature Cabins" },
  { value: "500", label: "Acres of Wilderness" },
  { value: "50+", label: "Native Species" },
  { value: "1", label: "Sanctuary at Your Doorstep" },
];

export default function InvestorSection() {
  return (
    <section
      className="relative py-24 md:py-32 overflow-hidden bg-forest-deep border-y border-gold/20"
    >
      <div
        aria-hidden="true"
        className="glow-orb w-[600px] h-[600px] -top-64 left-1/2 -translate-x-1/2"
        style={{ background: "radial-gradient(circle, rgba(164,121,63,0.3), transparent 70%)" }}
      />
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <p className="eyebrow text-gold-light uppercase tracking-[0.3em] text-sm font-medium mb-5 animate-in">
            An Invitation
          </p>
          <h2 className="text-3xl md:text-6xl font-serif font-light text-linen mb-6 animate-in leading-tight">
            An Investment in{" "}
            <span className="gradient-text font-semibold">Stillness</span>
          </h2>
          <p className="text-bark-muted animate-in leading-relaxed text-lg mb-14">
            Tipeshwar Forest Retreat is a rare partnership between hospitality
            and wilderness — twelve cabins set within five hundred acres of
            protected forest, where conscious travel is the only currency.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-gold/20 rounded-2xl overflow-hidden mb-14">
            {STATS.map((stat) => (
              <div key={stat.label} className="bg-forest-deep p-6 md:p-8 animate-in">
                <p className="text-4xl md:text-5xl font-serif text-gold-light mb-2">
                  {stat.value}
                </p>
                <p className="text-xs uppercase tracking-[0.2em] text-bark-muted">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          <div className="animate-in">
            <button
              onClick={() => triggerSectionTransition("contact")}
              className="btn-gold px-10 py-4 rounded-full text-sm font-medium tracking-[0.2em] uppercase text-white"
            >
              Begin the Conversation
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}