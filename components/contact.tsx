"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { MapPin, Phone, Mail } from "lucide-react";
import { ContactForm } from "@/components/contact-form";

gsap.registerPlugin(ScrollTrigger);

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".contact-form",
        { x: 60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
        }
      );
      gsap.fromTo(
        ".contact-info",
        { x: -60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden bg-cream-deep"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="eyebrow text-gold uppercase tracking-[0.25em] text-sm font-medium mb-4 animate-in">
            Contact
          </p>
          <h2 className="text-3xl md:text-5xl font-serif font-semibold text-forest mb-6 animate-in">
            Begin the <span className="gradient-text">Conversation</span>
          </h2>
          <p className="text-bark-muted animate-in">
            Have questions or ready to book your stay? Reach out to our team for
            personalized assistance.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div className="contact-info glass rounded-3xl p-8 h-full shadow-lg">
            <div className="relative h-48 rounded-xl overflow-hidden mb-8">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3751.1948768345305!2d78.43851477522684!3d19.9161910814691!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd24d0ec3994245%3A0x949922b233325fd8!2sTipeshwar%20Wildlife%20Sanctuary!5e0!3m2!1sen!2sin!4v1745085952900!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-xl"
              />
            </div>

            <div className="space-y-6">
              <div className="flex items-start">
                <MapPin className="w-5 h-5 text-gold mt-1 mr-3 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-forest font-serif text-lg">
                    Location
                  </h4>
                  <p className="text-bark-muted">
                    Beside Muchi Dam, Tipeshwar Wildlife Sanctuary, Maharashtra
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <Phone className="w-5 h-5 text-gold mt-1 mr-3 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-forest font-serif text-lg">
                    Phone
                  </h4>
                  <p className="text-bark-muted">+91 94220 13178</p>
                </div>
              </div>
              <div className="flex items-start">
                <Mail className="w-5 h-5 text-gold mt-1 mr-3 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-forest font-serif text-lg">
                    Email
                  </h4>
                  <p className="text-bark-muted">p.ainchwar@cluster-one.net</p>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-form glass rounded-3xl p-8 shadow-lg">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
