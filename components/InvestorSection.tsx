// components/InvestorSection.tsx
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import {
  Users,
  Building2,
  FileCheck,
  MapPin,
  Clock,
  ChevronRight,
  Landmark,
} from "lucide-react";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const InvestorSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const elementsRef = useRef<HTMLDivElement[]>([]);

  // Add elements to the ref array
  const addToRefs = (el: HTMLDivElement) => {
    if (el && !elementsRef.current.includes(el)) {
      elementsRef.current.push(el);
    }
  };

  useEffect(() => {
    // Animate section elements
    elementsRef.current.forEach((element, index) => {
      const animationType = element.dataset.animation || "fade";
      const delay = element.dataset.delay || "0";

      if (animationType === "fade") {
        gsap.fromTo(
          element,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: parseFloat(delay),
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 80%",
            },
          }
        );
      } else if (animationType === "words") {
        const words = element.querySelectorAll(".animate-word");
        gsap.fromTo(
          words,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 80%",
            },
          }
        );
      } else if (animationType === "cards") {
        const cards = element.querySelectorAll(".card");
        gsap.fromTo(
          cards,
          { opacity: 0, y: 20, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: 0.15,
            duration: 0.7,
            ease: "back.out(1.5)",
            scrollTrigger: {
              trigger: element,
              start: "top 80%",
            },
          }
        );
      } else if (animationType === "list") {
        const items = element.querySelectorAll(".list-item");
        gsap.fromTo(
          items,
          { opacity: 0, x: -20 },
          {
            opacity: 1,
            x: 0,
            stagger: 0.1,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: element,
              start: "top 80%",
            },
          }
        );
      } else if (animationType === "timeline") {
        const items = element.querySelectorAll(".timeline-item");
        gsap.fromTo(
          items,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.15,
            duration: 0.6,
            ease: "power1.out",
            scrollTrigger: {
              trigger: element,
              start: "top 80%",
            },
          }
        );

        gsap.fromTo(
          element.querySelector(".progress-bar"),
          { width: "0%" },
          {
            width: "100%",
            duration: 1.5,
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: element,
              start: "top 70%",
            },
          }
        );
      } else if (animationType === "line") {
        gsap.fromTo(
          element,
          { width: "0%" },
          {
            width: "100%",
            duration: 1.2,
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: element.parentElement,
              start: "top 70%",
            },
          }
        );
      }
    });

    // Clean up
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20 bg-gradient-to-b from-slate-900 to-slate-800"
    >
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4 px-3 py-1 bg-purple-900/30 rounded-lg border border-purple-500/20">
            <span className="text-purple-300 text-sm tracking-wider">
              INVESTMENT OPPORTUNITY
            </span>
          </div>
          <div ref={addToRefs} data-animation="words">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-2">
              <span className="animate-word inline-block">Partner</span>{" "}
              <span className="animate-word inline-block">in</span>{" "}
              <span className="animate-word inline-block">Conscious</span>{" "}
              <span className="animate-word inline-block">Hospitality</span>
            </h2>
          </div>
        </div>

        {/* Commitment */}
        <div
          ref={addToRefs}
          data-animation="fade"
          className="max-w-3xl mx-auto mb-16 text-center"
        >
          <h3 className="text-xl font-bold text-amber-400 mb-4">
            OUR COMMITMENT
          </h3>
          <p className="text-2xl md:text-3xl font-semibold text-white mb-6">
            THIS IS A DEVELOPMENT GROUNDED IN RESPECT — FOR NATURE, FOR TRIBAL
            CULTURE, AND FOR FUTURE GENERATIONS.
          </p>
          <div
            ref={addToRefs}
            data-animation="line"
            className="h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent mb-6"
          ></div>
          <p className="text-gray-300">
            Our approach emphasizes design sensitivity that allows for
            environmental integration, community partnerships, and cultural
            respect.
          </p>
        </div>

        {/* Where You Come In */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <h3 className="text-2xl font-bold text-white mb-3">
              WHERE YOU COME IN
            </h3>
            <p className="text-gray-300 max-w-2xl mx-auto">
              We're looking for partners to co-dream this project into
              existence.
            </p>
          </div>

          {/* Requirements */}
          <div
            ref={addToRefs}
            data-animation="list"
            className="max-w-2xl mx-auto p-6 bg-white/5 rounded-lg border border-white/10"
          >
            <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
              <span className="inline-flex items-center justify-center w-7 h-7 mr-2 rounded-full bg-purple-600 text-white">
                <Users size={14} />
              </span>
              REQUIREMENT
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <ChevronRight className="text-purple-400 mt-1" size={16} />
                <p className="text-gray-300 ml-2">
                  <span className="text-white font-medium">
                    Interested buyers
                  </span>{" "}
                  for plots at discounted Launch Price in Phase I
                </p>
              </li>
              <li className="flex items-start">
                <ChevronRight className="text-purple-400 mt-1" size={16} />
                <p className="text-gray-300 ml-2">
                  <span className="text-white font-medium">
                    Strategic partners
                  </span>{" "}
                  in hospitality, eco-architecture, or wellness tourism
                </p>
              </li>
              <li className="flex items-start">
                <ChevronRight className="text-purple-400 mt-1" size={16} />
                <p className="text-gray-300 ml-2">
                  <span className="text-white font-medium">Co-creation</span> of
                  a long-term ecosystem of conscious hospitality
                </p>
              </li>
            </ul>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-white mb-8 text-center">
            PROGRESS SO FAR
          </h3>

          <div
            ref={addToRefs}
            data-animation="cards"
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            <div className="card bg-slate-800 rounded-lg p-5 border border-white/5">
              <div className="flex items-center mb-3">
                <div className="p-2 rounded-lg bg-emerald-900/30 text-emerald-400 mr-3">
                  <MapPin size={18} />
                </div>
                <h4 className="text-lg font-semibold text-white">Land</h4>
              </div>
              <p className="text-gray-400">Secured and surveyed</p>
            </div>

            <div className="card bg-slate-800 rounded-lg p-5 border border-white/5">
              <div className="flex items-center mb-3">
                <div className="p-2 rounded-lg bg-blue-900/30 text-blue-400 mr-3">
                  <FileCheck size={18} />
                </div>
                <h4 className="text-lg font-semibold text-white">Planning</h4>
              </div>
              <p className="text-gray-400">
                Site analysis and phased development strategy complete
              </p>
            </div>

            <div className="card bg-slate-800 rounded-lg p-5 border border-white/5">
              <div className="flex items-center mb-3">
                <div className="p-2 rounded-lg bg-amber-900/30 text-amber-400 mr-3">
                  <Clock size={18} />
                </div>
                <h4 className="text-lg font-semibold text-white">Next Steps</h4>
              </div>
              <p className="text-gray-400">
                Infrastructure setup and branding rollout
              </p>
            </div>
          </div>
        </div>

        {/* Journey Ahead */}
        <div ref={addToRefs} data-animation="timeline" className="mb-16">
          <h3 className="text-2xl font-bold text-white mb-8 text-center">
            THE JOURNEY AHEAD
          </h3>
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute left-4 top-4 bottom-4 w-px bg-gray-700">
                <div className="progress-bar w-0 h-full bg-gradient-to-b from-purple-500 to-emerald-500"></div>
              </div>

              <div className="space-y-8">
                <div className="timeline-item flex">
                  <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center flex-shrink-0 z-10 border border-slate-900">
                    <Building2 className="text-white" size={16} />
                  </div>
                  <div className="ml-6">
                    <h4 className="text-lg font-semibold text-white mb-1">
                      ARCHITECTURE & DESIGN
                    </h4>
                    <p className="text-gray-400 max-w-lg">
                      Sustainable structures that blend with nature while
                      providing luxury experiences
                    </p>
                  </div>
                </div>

                <div className="timeline-item flex">
                  <div className="w-8 h-8 rounded-full bg-purple-600/80 flex items-center justify-center flex-shrink-0 z-10 border border-slate-900">
                    <FileCheck className="text-white" size={16} />
                  </div>
                  <div className="ml-6">
                    <h4 className="text-lg font-semibold text-white mb-1">
                      REGULATORY CLEARANCES
                    </h4>
                    <p className="text-gray-400 max-w-lg">
                      Navigating approvals with an environmentally conscious
                      approach
                    </p>
                  </div>
                </div>

                <div className="timeline-item flex">
                  <div className="w-8 h-8 rounded-full bg-purple-600/80 flex items-center justify-center flex-shrink-0 z-10 border border-slate-900">
                    <Landmark className="text-white" size={16} />
                  </div>
                  <div className="ml-6">
                    <h4 className="text-lg font-semibold text-white mb-1">
                      FUNDING
                    </h4>
                    <p className="text-gray-400 max-w-lg">
                      Securing partnerships with aligned investors
                    </p>
                  </div>
                </div>

                <div className="timeline-item flex">
                  <div className="w-8 h-8 rounded-full bg-purple-600/80 flex items-center justify-center flex-shrink-0 z-10 border border-slate-900">
                    <Users className="text-white" size={16} />
                  </div>
                  <div className="ml-6">
                    <h4 className="text-lg font-semibold text-white mb-1">
                      COMMUNITY ENGAGEMENT
                    </h4>
                    <p className="text-gray-400 max-w-lg">
                      Building relationships with local communities
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div
          ref={addToRefs}
          data-animation="fade"
          className="max-w-3xl mx-auto rounded-lg overflow-hidden bg-gradient-to-br from-purple-900/30 via-slate-800/60 to-emerald-900/30"
        >
          <div className="p-8 text-center">
            <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-purple-300 text-sm mb-3">
              LIMITED OPPORTUNITY
            </span>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
              Join Our Vision for Sustainable Luxury
            </h3>
            <p className="text-gray-300 max-w-xl mx-auto mb-6">
              Become part of a transformative project that balances profit with
              purpose, luxury with sustainability, and development with respect.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InvestorSection;
