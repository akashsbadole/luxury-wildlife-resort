"use client";

import { useEffect, useState } from "react";
import { ChevronUp, MessageCircle } from "lucide-react";

export function FloatingActions() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-3">
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
        className={`w-12 h-12 rounded-full bg-forest-deep/90 backdrop-blur-sm border border-gold/40 text-gold-light shadow-lg transition-all duration-300 hover:bg-gold hover:text-white ${
          showTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <ChevronUp size={20} className="mx-auto" />
      </button>
      <a
        href="https://wa.me/919422013178"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg flex items-center justify-center transition-transform duration-300 hover:scale-110"
      >
        <MessageCircle size={26} />
      </a>
    </div>
  );
}