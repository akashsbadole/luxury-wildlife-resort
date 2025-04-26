// components/TouristAttractionsSection.tsx

import React, { useEffect, useRef, useState, useCallback, JSX } from "react";
import Image from "next/image";
import {
  Mountain,
  Castle,
  UtensilsCrossed,
  Sparkles,
  Camera,
  MapPin,
  Trees,
  Ticket,
  Eye,
  X,
  LucideIcon,
} from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

// --- Types ---
interface Attraction {
  id: string;
  name: string;
  icon: LucideIcon;
  description: string;
  distance?: string;
  // Position relative to the *edges* of the attraction area (percentage strings)
  position: { top: string; left: string };
}

// --- GSAP Plugin Registration ---
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// --- Attraction Data (Positions near Edges) ---
const attractions: Attraction[] = [
  // Top Edge
  {
    id: "local",
    name: "Local Tribes & Cuisine",
    icon: Trees,
    description: "Local,Tribes & Cuisine",
    distance: "3 km",
    position: { top: "8%", left: "10%" },
  }, // Top-Left
  {
    id: "peak",
    name: "Under 65km",
    icon: Mountain,
    description: `Wai Dam, Spillway and Reservoir - 10 Kms , Jagdamba Temple, Kelapur - 20 Kms Mesolithic Stoneage site. Pardi- 29 Kms, Hot Water Springs, Unkeshwar - 56 Kms, Ancient Datta Temple, Dattapur - 65 Kms`,
    distance: "5 km",
    position: { top: "2%", left: "50%" },
  }, // Top-Center
  {
    id: "cabin",
    name: "After 100km",
    icon: Castle,
    description: `\nAncient Stepwell, Adegaon - 69 Kms
\nChintamani Ganesh Temple, Kalamb - 70 Kms
\nMahadev Temple, Yavatmal — 75+ Kms
\nMahakali Devi Temple, Chandrapur - 126 Kms
\nRenuka Mata Mandir, Mahurgad - 100 Kms`,
    distance: "1.5 km",
    position: { top: "8%", left: "90%" },
  }, // Top-Right
  // Bottom Edge
  {
    id: "vidarbha",
    name: "Vidarbha Style ",
    icon: UtensilsCrossed,
    description:
      "Vidarbha Style with bold flavours, extensive spices, and a mix of vegetarian and non-vegetarian dishes like Pithla-Bhakri, Zunka, Varhadi Dal, Amti, Saoji Mutton, Chicken, Tambdi & Pandhra Rassa, and other tribal specialities!",
    distance: "8 km",
    position: { top: "95%", left: "85%" },
  }, // Bottom-Right
  {
    id: "road",
    name: "Road",
    icon: Sparkles,
    description: `Tipeshwar is well-connected by road, nearest city Pandharkawada.One can take NH44 from Nagpur towards Hyderabad. Tipeshwar is about 2.5 hours from Nagpur.`,
    distance: "12 km",
    position: { top: "102%", left: "50%" },
  }, // Bottom-Center
  {
    id: "airport",
    name: "Airport",
    icon: Camera,
    description: `Dr. Babasaheb Ambedkar International Airport in Nagpur, approximately 150 km away. Travel Time: Approximately 2.5 hours by road`,
    distance: "4 km",
    position: { top: "95%", left: "15%" },
  }, // Bottom-Left
];

// --- Debounce Helper ---
function debounce<T extends (...args: any[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
}

// --- Component ---
function TouristAttractionsSection(): JSX.Element {
  const sectionRef = useRef<HTMLElement>(null);
  const attractionAreaRef = useRef<HTMLDivElement>(null); // NEW: Container for attractions + SVG
  const centerImageRef = useRef<HTMLDivElement>(null); // Ref for the central image div itself
  const titleRef = useRef<HTMLHeadingElement>(null);
  const svgOverlayRef = useRef<SVGSVGElement>(null);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);

  const attractionRefs = useRef<Map<string, HTMLDivElement | null>>(new Map());
  const lineRefs = useRef<Map<string, SVGLineElement | null>>(new Map());

  const [showAttractions, setShowAttractions] = useState<boolean>(true);
  const [lineStartPoint, setLineStartPoint] = useState<{
    x: string;
    y: string;
  }>({ x: "50%", y: "50%" }); // Default center

  const blinkTimelineRef = useRef<gsap.core.Timeline | null>(null);

  // --- Calculate Line Start Point ---
  const updateLineStart = useCallback(() => {
    if (
      !attractionAreaRef.current ||
      !centerImageRef.current ||
      !svgOverlayRef.current
    )
      return;

    const areaRect = attractionAreaRef.current.getBoundingClientRect();
    const imageRect = centerImageRef.current.getBoundingClientRect();
    const svgRect = svgOverlayRef.current.getBoundingClientRect(); // Assuming SVG covers the area

    if (areaRect.width === 0 || areaRect.height === 0) return; // Avoid division by zero

    // Calculate center of image relative to the attraction area (and thus SVG)
    const imageCenterX = imageRect.left - areaRect.left + imageRect.width / 2;
    const imageCenterY = imageRect.top - areaRect.top + imageRect.height / 2;

    // Convert to percentage relative to the attraction area (SVG dimensions)
    const startXPercent = (imageCenterX / areaRect.width) * 100;
    const startYPercent = (imageCenterY / areaRect.height) * 100;

    const newStartPoint = { x: `${startXPercent}%`, y: `${startYPercent}%` };

    // Only update state if the value actually changes to prevent infinite loops
    setLineStartPoint((prev) =>
      prev.x !== newStartPoint.x || prev.y !== newStartPoint.y
        ? newStartPoint
        : prev
    );
  }, []); // No dependencies needed here as it reads current DOM state

  // --- Effect for Initial Scroll Animation ---
  useEffect(() => {
    const sectionEl = sectionRef.current;
    const titleEl = titleRef.current;
    const attractionAreaEl = attractionAreaRef.current; // Target the new area
    const toggleButtonEl = toggleButtonRef.current;

    if (!sectionEl || !titleEl || !attractionAreaEl || !toggleButtonEl) return;

    gsap.set([attractionAreaEl, toggleButtonEl], { opacity: 0, y: 30 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionEl,
        start: "top 75%",
        toggleActions: "play none none reverse",
      },
    });

    tl.from(titleEl, { opacity: 0, y: -40, duration: 0.8, ease: "power3.out" });
    tl.to(
      [attractionAreaEl, toggleButtonEl],
      { opacity: 1, y: 0, duration: 1, ease: "power3.out", stagger: 0.2 },
      "-=0.5"
    );

    // Initial calculation of line start point after elements are likely rendered
    const timer = setTimeout(updateLineStart, 100);

    return () => {
      clearTimeout(timer);
      const st = tl.scrollTrigger;
      if (st) st.kill();
      tl.kill();
    };
  }, [updateLineStart]); // Include updateLineStart

  // --- Effect for Resize Handling ---
  useEffect(() => {
    const debouncedUpdate = debounce(updateLineStart, 150);
    window.addEventListener("resize", debouncedUpdate);
    return () => window.removeEventListener("resize", debouncedUpdate);
  }, [updateLineStart]);

  // --- Effect for Attraction Visibility, Lines, Blinking ---
  useEffect(() => {
    const attractionElements = Array.from(
      attractionRefs.current.values()
    ).filter((el) => el !== null) as HTMLElement[];
    const lineElements = Array.from(lineRefs.current.values()).filter(
      (el) => el !== null
    ) as SVGLineElement[];

    blinkTimelineRef.current?.kill();
    blinkTimelineRef.current = null;

    // Update line start points before animating lines
    updateLineStart(); // Ensure start point is current

    if (showAttractions) {
      // --- Animate IN ---
      gsap.to(attractionElements, {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: "back.out(1.7)",
        stagger: 0.08,
        onStart: () =>
          attractionElements.forEach((el) => (el.style.pointerEvents = "auto")),
        overwrite: true,
      });

      gsap.to(lineElements, {
        strokeOpacity: 0.7,
        duration: 0.8,
        delay: 0.2,
        stagger: 0.08,
        overwrite: true,
        onComplete: () => {
          if (lineElements.length > 0) {
            blinkTimelineRef.current = gsap
              .timeline({ repeat: -1, yoyo: true })
              .to(lineElements, {
                strokeOpacity: 0.2,
                duration: 1.0,
                ease: "sine.inOut",
                stagger: { each: 0.15, from: "random" },
              });
          }
        },
      });
    } else {
      // --- Animate OUT ---
      gsap.to(lineElements, {
        strokeOpacity: 0,
        duration: 0.4,
        ease: "power2.in",
        stagger: 0.05,
        overwrite: true,
      });
      gsap.to(attractionElements, {
        opacity: 0,
        scale: 0.8,
        duration: 0.4,
        ease: "power2.in",
        stagger: 0.05,
        delay: 0.1,
        onStart: () =>
          attractionElements.forEach((el) => (el.style.pointerEvents = "none")),
        overwrite: true,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showAttractions]); // updateLineStart is called within, but not a direct dependency for *this* effect's trigger logic

  // --- Event Handlers ---
  const handleToggleClick = (): void => {
    setShowAttractions((prev) => !prev);
  };

  // --- Render Helper ---
  const renderAttractionItem = (attraction: Attraction): JSX.Element => {
    const IconComponent = attraction.icon;
    return (
      <div
        key={attraction.id}
        ref={(el) => {
          if (el) {
            attractionRefs.current.set(attraction.id, el);
          }
        }}
        className="absolute p-4 bg-white/85 backdrop-blur-sm rounded-md shadow-md border border-emerald-200/50 opacity-0 scale-90 pointer-events-none transform-gpu cursor-pointer group" // Simpler styling
        style={{
          top: attraction.position.top,
          left: attraction.position.left,
          transform: "translate(-50%, -50%)",
        }}
        title={attraction.name}
      >
        <div className="flex items-center space-x-2 text-center">
          <IconComponent
            className="w-4 h-4 text-emerald-700 flex-shrink-0 transition-transform duration-200 group-hover:scale-110"
            strokeWidth={1.5}
          />
          <span className="text-[20px] font-medium text-green-900 leading-tight">
            {attraction.name}
          </span>
          {/* Tooltip */}
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max max-w-xs p-2 bg-gray-800 text-white text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
            {attraction.description}
            {attraction.distance && (
              <span className="block mt-1 text-gray-400 text-[10px]">
                ({attraction.distance})
              </span>
            )}
          </div>
        </div>
      </div>
    );
  };

  // --- Component Render ---
  return (
    <section
      ref={sectionRef}
      className="bg-gradient-to-b from-emerald-50 via-green-100 to-lime-100 py-16 md:py-24 overflow-hidden"
    >
      <div className="container mx-auto px-4">
        <h2
          ref={titleRef}
          className="text-3xl md:text-4xl font-bold text-center text-emerald-800 mb-8 md:mb-10 opacity-0"
        >
          Points of Interest
        </h2>
        {/* NEW: Attraction Area - Positioned Relatively, takes up space */}
        <div
          ref={attractionAreaRef}
          className="relative w-full max-w-8xl mx-auto aspect-[4/3] md:aspect-[2/1] my-4 opacity-0" // Adjust aspect ratio as needed, opacity set by GSAP
        >
          {/* Central Image - Positioned Absolutely within the Attraction Area */}
          <div
            ref={centerImageRef}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 md:w-40 md:h-40 lg:w-[500px] lg:h-[500px] rounded-full shadow-xl border-4 border-white/70 z-20 overflow-hidden" // z-20 to be above lines
          >
            <Image
              src="/images/Jungle-Resort.jpg" // *** REPLACE IMAGE ***
              alt="Central view"
              layout="fill"
              objectFit="cover"
              onLoad={updateLineStart}
              quality={80}
              className="rounded-full"
            />
          </div>

          {/* Attractions Layer - Must be within attractionAreaRef */}
          <div className="absolute inset-0 z-10 pointer-events-none">
            {attractions.map(renderAttractionItem)}
          </div>

          {/* SVG Overlay - Covers the entire attractionAreaRef */}
          <svg
            ref={svgOverlayRef}
            className="absolute inset-0 z-0 pointer-events-none w-full h-full" // Behind center image (z-0)
            preserveAspectRatio="none"
          >
            {attractions.map((attr) => (
              <line
                key={`line-${attr.id}`}
                ref={(el) => {
                  if (el) {
                    lineRefs.current.set(attr.id, el);
                  }
                }}
                x1={lineStartPoint.x} // Dynamic start X %
                y1={lineStartPoint.y} // Dynamic start Y %
                x2={attr.position.left} // End X at attraction's % left
                y2={attr.position.top} // End Y at attraction's % top
                stroke="rgba(16, 185, 129, 0.7)"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                strokeOpacity={0} // Start invisible
              />
            ))}
          </svg>
        </div>{" "}
        {/* End attractionAreaRef */}
        {/* Toggle Button */}
        <div className="text-center mt-20">
          <button
            ref={toggleButtonRef}
            onClick={handleToggleClick}
            className="inline-flex items-center px-6 py-3 bg-emerald-600 text-white rounded-full shadow-md hover:bg-emerald-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 font-semibold space-x-2 opacity-0"
          >
            {showAttractions ? (
              <>
                {" "}
                <X size={20} /> <span>Hide Points</span>{" "}
              </>
            ) : (
              <>
                {" "}
                <Eye size={20} /> <span>Show Points</span>{" "}
              </>
            )}
          </button>
        </div>
        <p className="text-xs text-green-700/80 mt-10 text-center">
          *Click "Show Points" to see nearby locations relative to the edges of
          the view.
        </p>
      </div>{" "}
      {/* End container */}
    </section>
  );
}

export default TouristAttractionsSection;
