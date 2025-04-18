"use client"

import { useRef } from "react"
import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"
import { MapPin, Phone, Mail, Clock } from "lucide-react"
import Image from "next/image"

export function Contact() {
  const sectionRef = useRef(null)

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
      },
    )

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
      },
    )
  }, [])

  return (
    <section id="contact" ref={sectionRef} className="relative py-24 md:py-32 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-amber-100 mb-6 animate-in">
            Contact <span className="text-amber-400">Us</span>
          </h2>

          <p className="text-amber-100/90 animate-in">
            Have questions or ready to book your stay? Reach out to our team for personalized assistance.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div className="contact-info bg-black/40 backdrop-blur-md rounded-2xl p-8 h-full">
            <div className="relative h-48 rounded-xl overflow-hidden mb-8">
              <Image src="/placeholder.svg?height=300&width=500" alt="Resort reception" fill className="object-cover" />
            </div>

            <div className="space-y-6">
              <div className="flex items-start">
                <MapPin className="w-5 h-5 text-amber-400 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-amber-100">Location</h4>
                  <p className="text-amber-200/80">123 Wilderness Road, Forest Reserve, Nature Country</p>
                </div>
              </div>

              <div className="flex items-start">
                <Phone className="w-5 h-5 text-amber-400 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-amber-100">Phone</h4>
                  <p className="text-amber-200/80">+1 (555) 123-4567</p>
                </div>
              </div>

              <div className="flex items-start">
                <Mail className="w-5 h-5 text-amber-400 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-amber-100">Email</h4>
                  <p className="text-amber-200/80">info@wildluxury.com</p>
                </div>
              </div>

              <div className="flex items-start">
                <Clock className="w-5 h-5 text-amber-400 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-amber-100">Hours</h4>
                  <p className="text-amber-200/80">
                    Reservations: 24/7
                    <br />
                    Reception: 6:00 AM - 10:00 PM
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-form bg-black/40 backdrop-blur-md rounded-2xl p-8">
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-amber-100 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full bg-black/30 border border-amber-900/50 rounded-lg px-4 py-3 text-amber-100 focus:outline-none focus:border-amber-500/70"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-amber-100 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full bg-black/30 border border-amber-900/50 rounded-lg px-4 py-3 text-amber-100 focus:outline-none focus:border-amber-500/70"
                    placeholder="Your email"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-amber-100 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  className="w-full bg-black/30 border border-amber-900/50 rounded-lg px-4 py-3 text-amber-100 focus:outline-none focus:border-amber-500/70"
                  placeholder="Subject"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-amber-100 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full bg-black/30 border border-amber-900/50 rounded-lg px-4 py-3 text-amber-100 focus:outline-none focus:border-amber-500/70"
                  placeholder="Your message"
                ></textarea>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full py-3 bg-amber-700 hover:bg-amber-600 text-amber-100 rounded-lg transition-colors"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
