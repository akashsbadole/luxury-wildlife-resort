// components/ForestDistanceSection.jsx

import React, { useEffect, useRef } from "react";
import Image from "next/image"; // Import Next.js Image component
import { Plane, Leaf, TrainFront, Bus, Building2, MapPin } from "lucide-react"; // Added MapPin for variety

// --- GSAP ---
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"; // Ensure correct import path

// Register ScrollTrigger plugin - IMPORTANT!
// Do this once, ideally in your _app.js or layout.js, but here is fine too if isolated.
gsap.registerPlugin(ScrollTrigger);

// --- Location Data ---
// Example data - adjust to your actual locations and distances
const locations = [
  {
    name: "Airport 150 km",
    icon: Plane,
    road: "Nagpur",
    other: "Approx. 2.5 Hour drive",
  },
  {
    name: "Forest",
    icon: Leaf,
    road: "115 km",
    other: "Tadoba-Andhari Tiger Reserve",
  },
  {
    name: "Forest",
    icon: Leaf,
    road: "112 km",
    other: "Painganga Wildlife Sanctuary",
  },
  {
    name: "Forest",
    icon: Leaf,
    road: "177 km",
    other: "Chaprala Wildlife Sanctuary",
  },
  {
    name: "Sanctuary",
    icon: MapPin,
    road: "35 km",
    other: "Tipeshwar Wildlife Sanctuary",
  },
  {
    name: "Train Station",
    icon: TrainFront,
    road: "Adilabad - 35 km",
    other: "Overnight train from Nagpur",
  },
  {
    name: "Main Bus Stop",
    icon: Bus,
    road: "Near Pandharkawada",
    other: "NH44 from Nagpur towards Hyderabad(2.5hr)",
  },
  {
    name: "Nearest Town",
    icon: Building2,
    road: " Pandharkawada",
    other: "Approx. 15 min drive",
  },
];

// Split locations for left and right columns dynamically
const halfwayIndex = Math.ceil(locations.length / 2);
const leftLocations = locations.slice(0, halfwayIndex);
const rightLocations = locations.slice(halfwayIndex);

function ForestDistanceSection() {
  // --- Refs for Animation Targets ---
  const sectionRef = useRef(null); // Ref for the whole section (ScrollTrigger trigger)
  const imageContainerRef = useRef(null); // Ref for the image container
  const titleRef = useRef(null); // Ref for the title
  const leftColRef = useRef(null); // Ref for left column items container
  const rightColRef = useRef(null); // Ref for right column items container

  useEffect(() => {
    // Wait for refs to be assigned
    if (
      !sectionRef.current ||
      !imageContainerRef.current ||
      !titleRef.current ||
      !leftColRef.current ||
      !rightColRef.current
    ) {
      // Optional: Add a small delay or wait mechanism if refs aren't ready immediately,
      // though useEffect with [] usually handles this well.
      console.log("GSAP Refs not ready yet, retrying...");
      const timeoutId = setTimeout(() => {
        // Attempt re-initialization (simple example, might need refinement)
        // Note: This recursive call inside setTimeout isn't ideal for production,
        // better to rely on useEffect's timing or a state variable.
        // For now, just log and proceed.
        // setupAnimations(); // Be cautious with direct recursive calls
      }, 100);
      return () => clearTimeout(timeoutId); // Cleanup timeout
      // For robustness, consider a state like [isReady, setIsReady]
      // and only run GSAP when true.
    }

    // --- GSAP Animation Setup ---
    const setupAnimations = () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%", // Animation starts when 75% of the section is visible from top
          end: "bottom 80%", // Defines the scroll range for scrub/toggle actions if used
          toggleActions: "play none none reverse", // Play on enter, reverse on scroll back up past start
          // markers: true, // Uncomment ONLY for debugging trigger points
        },
      });

      // 1. Animate Title (Gentle fade and slide down from top)
      tl.from(titleRef.current, {
        opacity: 1,
        y: -30, // Start 30px above
        duration: 0.8,
        ease: "power3.out",
      });

      // 2. Animate Image Container (Scale up, fade in, slight organic rotation)
      tl.from(
        imageContainerRef.current,
        {
          opacity: 1,
          scale: 0.85, // Start slightly smaller
          rotation: -3, // Start slightly tilted counter-clockwise
          duration: 1.2,
          ease: "elastic.out(1, 0.7)", // Bouncy, natural feel
        },
        "-=0.5"
      ); // Overlap start with title animation by 0.5s

      // 3. Animate Left Column Items (Stagger slide from right, fade in)
      tl.from(
        leftColRef.current.children,
        {
          opacity: 1,
          x: 50, // Start 50px to the right (moves left into view)
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.15, // Delay between each item's animation start
        },
        "-=0.8"
      ); // Overlap start significantly with image animation

      // 4. Animate Right Column Items (Stagger slide from left, fade in)
      tl.from(
        rightColRef.current.children,
        {
          opacity: 1,
          x: -50, // Start 50px to the left (moves right into view)
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.15, // Stagger items
        },
        "<"
      ); // "<" starts this tween at the exact same time the previous one (left column) starts

      // Return the timeline instance for cleanup
      return tl;
    };

    const timeline = setupAnimations();

    // --- Cleanup function ---
    return () => {
      // Kill ScrollTrigger instance and the timeline when the component unmounts
      // Important for preventing memory leaks in Next.js/React SPAs
      if (timeline && timeline.scrollTrigger) {
        timeline.scrollTrigger.kill();
      }
      if (timeline) {
        timeline.kill();
      }
    };
  }, []); // Empty dependency array ensures this runs only once after component mount

  // Helper function to render each location item consistently
  const renderLocationItem = (location, index, side) => (
    <div
      key={`${side}-${index}`}
      // Initial visual state: invisible for GSAP 'from' animation
      // Forest-themed styling: semi-transparent, blur, subtle green border/shadow
      className="bg-white/70 backdrop-blur-sm p-4 rounded-lg border border-green-200/50 shadow-md shadow-green-500/10 hover:shadow-lg hover:shadow-green-500/20 transition-shadow duration-300 opacity-0"
    >
      <div className="flex items-center justify-between space-x-3">
        {/* Left part: Icon and Name */}
        <div className="flex items-center space-x-3 overflow-hidden mr-2">
          {" "}
          {/* Added overflow-hidden + mr-2 */}
          <location.icon
            className="w-6 h-6 text-emerald-700 flex-shrink-0"
            strokeWidth={1.75}
            aria-hidden="true"
          />
          <span className="text-sm md:text-base text-green-900 truncate">
            {" "}
            {/* Added truncate */}
            {location.name}
          </span>
        </div>
        {/* Right part: Distances */}
        <div className="text-right flex flex-col items-end flex-shrink-0 pl-2">
          <span className="text-sm md:text-base font-medium text-emerald-800 whitespace-nowrap">
            {" "}
            {/* Prevent wrapping */}
            {location.road}
            <span className="text-[9px] text-green-700/80 hidden sm:inline ml-1">
              {" "}
              (Road)
            </span>
          </span>
          {location.other && (
            <span className="text-xs md:text-sm text-green-700/90 mt-1">
              {location.other}
            </span>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <section
      ref={sectionRef}
      // Forest-themed background gradient
      className="bg-gradient-to-br from-emerald-50 via-green-100/80 to-lime-100 py-16 md:py-24 overflow-x-hidden" // overflow-x-hidden prevents scrollbars during slide animations
    >
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <h2
          ref={titleRef}
          className="text-3xl md:text-4xl font-bold text-center text-emerald-800 mb-10 " // Start hidden
        >
          Your Forest Retreat Location
        </h2>
        <h3 className="mx-auto text-base md:text-xl font-bold text-center text-emerald-800 mb-2">
          The nearest major town near the proposed site is Pandharkawda, at 9.1
          Km.
        </h3>
        <h3 className="mx-auto text-base md:text-xl font-bold text-center text-emerald-800 mt-2 mb-10">
          Pandharkawda is a City and a Municipal council in Yavatmal district of
          the Vidarbha region in Maharashtra.
        </h3>

        {/* Main Layout Grid: Flex column on mobile, row on medium screens+ */}
        <div className="flex flex-col md:flex-row md:items-start md:space-x-6 lg:space-x-10 mb-10">
          {/* Left Column (Distances) */}
          <div
            ref={leftColRef}
            className="w-full md:w-1/4 space-y-4 md:space-y-5 order-2 md:order-1 mb-8 md:mb-0"
          >
            {leftLocations.map((loc, index) =>
              renderLocationItem(loc, index, "left")
            )}
          </div>

          {/* Center Image Column */}
          <div
            ref={imageContainerRef}
            className="w-full md:w-1/2 flex justify-center items-start md:items-center order-1 md:order-2 mb-8 md:mb-0 px-0 sm:px-4 opacity-0"
          >
            {" "}
            {/* Start hidden, adjust padding */}
            {/* Image Container: Controls size, aspect ratio, shadow, border */}
            <div className="relative w-full max-w-md lg:max-w-lg aspect-[4/3] rounded-xl shadow-xl shadow-green-600/30 overflow-hidden border-4 border-white/50">
              <Image
                src="/green-forest-scenes.png" // Ensure this path is correct relative to /public
                alt="Beautiful green forest pathway with sunlight"
                layout="fill" // Makes image fill the container div
                objectFit="cover" // Scales image to cover container, cropping if needed
                quality={85} // Image quality (0-100)
                priority // Load image sooner if it's critical / above the fold initially
                className="transform transition-transform duration-500 hover:scale-105" // Subtle zoom on hover
              />
            </div>
          </div>

          {/* Right Column (Distances) */}
          <div
            ref={rightColRef}
            className="w-full md:w-1/4 space-y-4 md:space-y-5 order-3 md:order-3"
          >
            {rightLocations.map((loc, index) =>
              renderLocationItem(loc, index, "right")
            )}
          </div>
        </div>

        <div>
          <h4 className="text-center text-emerald-800 mt-2 mb-10 text-[15px]">
            Cities / towns within Driving distance: <b>Maharashtra</b>
          </h4>
          <div className="flex justify-center">
            <div className="bg-white/70 backdrop-blur-sm p-4 rounded-lg border border-green-200/50 shadow-md shadow-green-500/10 hover:shadow-lg hover:shadow-green-500/20 transition-shadow duration-300 md:w-[400px] grid grid-cols-2 gap-5">
              <ul>
                <li className="mb-2 text-gray-700 text-[12px]">
                  Ralegaon - 65.8 Km
                </li>
                <li className="mb-2 text-gray-700 text-[12px]">
                  Yavatmal - 78.3 Km
                </li>
                <li className="mb-2 text-gray-700 text-[12px]">
                  Wardha - 102 Km
                </li>
                <li className="mb-2 text-gray-700 text-[12px]">
                  Chandrapur - 106 Km
                </li>
                <li className="mb-2 text-gray-700 text-[12px]">
                  Chimur - 123 Km
                </li>
                <li className="mb-2 text-gray-700 text-[12px]">
                  Nagpur - 150 Km
                </li>
              </ul>
              <ul>
                <li className="mb-2 text-gray-700 text-[12px]">
                  Amrawati - 173 Km
                </li>
                <li className="mb-2 text-gray-700 text-[12px]">
                  Nanded - 220 Km
                </li>
                <li className="mb-2 text-gray-700 text-[12px]">
                  Akola - 237 Km
                </li>
                <li className="mb-2 text-gray-700 text-[12px]">
                  Gondia - 293 Km
                </li>
                <li className="mb-2 text-gray-700 text-[12px]">
                  Adilabad - 54.3 Km(Telangana)
                </li>
                <li className="mb-2 text-gray-700 text-[12px]">
                  Durg - 374 Km(Chattisgarh)
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Optional Disclaimer Note */}
        <p className="text-xs text-green-700/70 mt-12 text-center">
          *All distances and times are approximate. Enjoy exploring!
        </p>
      </div>
    </section>
  );
}

export default ForestDistanceSection;
