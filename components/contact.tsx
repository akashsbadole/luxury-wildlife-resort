"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import Image from "next/image";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      ".contact-form",
      {
        x: 100,
        opacity: 0,
      },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      }
    );

    gsap.fromTo(
      ".contact-info",
      {
        x: -100,
        opacity: 0,
      },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      }
    );

    // Add 3D tilt effect to contact cards
    const contactCards =
      document.querySelectorAll<HTMLElement>(".contact-card");
    contactCards.forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        gsap.to(card, {
          rotationY: (x - rect.width / 2) * 0.1,
          rotationX: -(y - rect.height / 2) * 0.1,
          transformPerspective: 1000,
          duration: 0.5,
          ease: "power2.out",
        });
      });

      card.addEventListener("mouseleave", () => {
        gsap.to(card, {
          rotationY: 0,
          rotationX: 0,
          duration: 0.5,
          ease: "power2.out",
        });
      });
    });

    // Add parallax effect to background
    gsap.to(".background-image", {
      yPercent: 20,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden bg-[#053c36]"
    >
      <div className="absolute inset-0 z-0">
        <div className="background-image absolute inset-0"></div>
        <div className="absolute inset-0 bg-black/60" />
      </div>
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-[#00ff00] mb-6 animate-in">
            Contact <span className="text-green-800">Us</span>
          </h2>

          <p className="text-[#00ff00]/90 animate-in">
            Have questions or ready to book your stay? Reach out to our team for
            personalized assistance.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div className="contact-card contact-info bg-black/40 backdrop-blur-md rounded-2xl p-8 h-full transform-gpu transition-transform duration-300 will-change-transform">
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
                <div>
                  <h4 className="font-medium text-[#fff8f0]">
                    We are not offering a packaged product. We're offering a
                    platform - To Redefine Tourism, Support Regeneration, and
                    Create Something Enduring. If this vision aligns with yours,
                    we invite you to walk this path with us.
                  </h4>
                  <h4 className="font-medium text-[#fff8f0] mt-4">
                    The Forest Remembers. The Land Listens. The Dam Holds
                    Stories. And this space is waiting...
                  </h4>
                  <h4 className="font-medium text-[#fff8f0] mt-4">
                    LET'S REWIND TOGETHER
                  </h4>
                </div>
              </div>
              {/* <div className="flex items-start">
                <MapPin className="w-5 h-5 text-green-800 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-[#00ff00]">Location</h4>
                  <p className="text-amber-200/80">123 Wilderness Road, Forest Reserve, Nature Country</p>
                </div>
              </div> */}
              {/* <div className="flex items-start">
                <Phone className="w-5 h-5 text-green-800 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-[#00ff00]">Phone</h4>
                  <p className="text-amber-200/80">+1 (555) 123-4567</p>
                </div>
              </div> */}
              {/* <div className="flex items-start">
                <Mail className="w-5 h-5 text-green-800 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-[#00ff00]">Email</h4>
                  <p className="text-amber-200/80">info@wildluxury.com</p>
                </div>
              </div> */}
              {/* <div className="flex items-start">
                <Clock className="w-5 h-5 text-green-800 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-[#00ff00]">Hours</h4>
                  <p className="text-amber-200/80">
                    Reservations: 24/7
                    <br />
                    Reception: 6:00 AM - 10:00 PM
                  </p>
                </div>
              </div> */}
            </div>
          </div>

          <div className="contact-card contact-form bg-black/40 backdrop-blur-md rounded-2xl p-8 transform-gpu transition-transform duration-300">
            {/* <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-[#00ff00] mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full bg-black/30 border border-amber-900/50 rounded-lg px-4 py-3 text-[#00ff00] focus:outline-none focus:border-amber-500/70"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-[#00ff00] mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full bg-black/30 border border-amber-900/50 rounded-lg px-4 py-3 text-[#00ff00] focus:outline-none focus:border-amber-500/70"
                    placeholder="Your email"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-[#00ff00] mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  className="w-full bg-black/30 border border-amber-900/50 rounded-lg px-4 py-3 text-[#00ff00] focus:outline-none focus:border-amber-500/70"
                  placeholder="Subject"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-[#00ff00] mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full bg-black/30 border border-amber-900/50 rounded-lg px-4 py-3 text-[#00ff00] focus:outline-none focus:border-amber-500/70"
                  placeholder="Your message"
                ></textarea>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full py-3 bg-amber-700 hover:bg-amber-600 text-[#00ff00] rounded-lg transition-colors"
                >
                  Send Message
                </button>
              </div>
            </form> */}

            <h2 className="text-bold leading-9 text-xl text-white mb-6 animate-in">
              <span className="text-[#fff8f0] text-xl underline">Lead</span>{" "}
              Design & Project Management:
            </h2>
            <h3 className="text-bold leading-9 text-xl text-white mb-6 animate-in">
              <span className="text-[#fff8f0] text-xl underline">Cluster</span>{" "}
              One Creative Solutions Pvt. Ltd.{" "}
            </h3>

            <h3 className="text-bold leading-9 text-xl text-white mb-6 animate-in">
              <span className="text-[#fff8f0] text-xl">Contact Person: </span>{" "}
              Parag Ainchwar{" "}
            </h3>

            <div className="flex items-start">
              <Phone className="w-5 h-5 text-green-800 mt-1 mr-3 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-[#00ff00]">Phone</h4>
                <p className="text-amber-200/80">+91 94220 13178</p>
              </div>
            </div>

            <div className="flex items-start">
              <Mail className="w-5 h-5 text-green-800 mt-1 mr-3 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-[#00ff00]">Email</h4>
                <p className="text-amber-200/80">p.ainchwar@cluster-one.net</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
