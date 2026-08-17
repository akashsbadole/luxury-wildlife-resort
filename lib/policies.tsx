export type PolicySection = {
  heading: string;
  body: string[];
};

export type Policy = {
  title: string;
  updated: string;
  intro: string;
  sections: PolicySection[];
};

export const policies: Record<string, Policy> = {
  "privacy-policy": {
    title: "Privacy Policy",
    updated: "August 2026",
    intro:
      "Tipeshwar Forest Retreat respects your privacy. This policy explains what we collect, why, and how it is used when you browse our site or contact us.",
    sections: [
      {
        heading: "Information We Collect",
        body: [
          "When you use our contact or booking forms, we collect the details you provide — name, email address, phone number, and any message content.",
          "We do not collect payment information through this website.",
        ],
      },
      {
        heading: "How We Use Your Information",
        body: [
          "Your details are used solely to respond to your enquiry, confirm reservations, and share information you have requested.",
          "We never sell, rent, or share your personal information with third parties for marketing purposes.",
        ],
      },
      {
        heading: "Data Retention",
        body: [
          "Enquiry and booking records are kept only as long as needed to serve you, after which they are securely deleted.",
        ],
      },
      {
        heading: "Your Rights",
        body: [
          "You may request a copy of the data we hold about you, or ask us to delete it, at any time by writing to p.ainchwar@cluster-one.net.",
        ],
      },
      {
        heading: "Contact",
        body: [
          "For any privacy questions, reach us at p.ainchwar@cluster-one.net or +91 94220 13178.",
        ],
      },
    ],
  },
  "terms-and-conditions": {
    title: "Terms & Conditions",
    updated: "August 2026",
    intro:
      "These terms govern your use of the Tipeshwar Forest Retreat website and any reservation made through it.",
    sections: [
      {
        heading: "Reservations",
        body: [
          "A reservation is confirmed only after we acknowledge your request by email or phone. Rates are subject to availability and change without notice.",
          "Check-in is from 2:00 PM and check-out by 11:00 AM unless otherwise agreed.",
        ],
      },
      {
        heading: "Guest Conduct",
        body: [
          "The retreat sits within a wildlife sanctuary. Guests must follow the guidance of our naturalists at all times — staying on marked trails, keeping voices low, and never feeding or approaching wildlife.",
          "We reserve the right to refuse or terminate a stay for conduct that endangers guests, staff, or wildlife.",
        ],
      },
      {
        heading: "Liability",
        body: [
          "Nature is unpredictable. While all activities are led by trained guides, participation in safaris, treks, and water activities is at the guest's own risk.",
          "The retreat is not liable for loss of personal belongings or for events outside our reasonable control.",
        ],
      },
      {
        heading: "Website Use",
        body: [
          "All content on this website, including text, images, and design, is the property of Tipeshwar Forest Retreat and may not be reproduced without permission.",
        ],
      },
    ],
  },
  "cancellation-policy": {
    title: "Cancellation Policy",
    updated: "August 2026",
    intro:
      "Plans change, and we understand. Our cancellation terms are designed to be fair to both guests and the retreat.",
    sections: [
      {
        heading: "More Than 14 Days Before Arrival",
        body: ["Full refund, minus a 10% administration fee."],
      },
      {
        heading: "7 to 14 Days Before Arrival",
        body: ["50% of the total stay is refunded. The remainder may be held as credit toward a future visit within 12 months."],
      },
      {
        heading: "Less Than 7 Days Before Arrival",
        body: ["No refund. The full amount may be held as credit toward a future visit within 12 months."],
      },
      {
        heading: "No-Show",
        body: ["The full reservation amount is charged."],
      },
      {
        heading: "Weather & Sanctuary Closures",
        body: [
          "If the sanctuary closes or access becomes unsafe (e.g., extreme weather), we will offer a full refund or rebooking at no cost.",
        ],
      },
    ],
  },
};

export type Faq = { question: string; answer: string };

export const faqs: Faq[] = [
  {
    question: "How do I reach Tipeshwar Forest Retreat?",
    answer:
      "The nearest airport is Nagpur (150 km, about 2.5 hours by road on NH44). The nearest railhead is Adilabad (35 km). We can arrange transfers on request.",
  },
  {
    question: "What is the best time to visit?",
    answer:
      "The sanctuary is most alive between October and March, when the weather is pleasant and wildlife sightings are frequent. Summers bring the best tiger sightings near water sources.",
  },
  {
    question: "Are safaris included in my stay?",
    answer:
      "Guided nature walks are included. Jungle safaris into the Tipeshwar Wildlife Sanctuary are arranged separately, subject to sanctuary permits and timings.",
  },
  {
    question: "Is the retreat suitable for families and children?",
    answer:
      "Yes. Our cabins accommodate families, and our naturalists run gentle, child-friendly walks and bird-watching sessions.",
  },
  {
    question: "Is there mobile connectivity and electricity?",
    answer:
      "Yes — all cabins have full power, and mobile networks generally work. We simply encourage guests to switch off and listen to the forest.",
  },
  {
    question: "What is your cancellation policy?",
    answer:
      "Full refund (minus 10% admin fee) more than 14 days before arrival; 50% refund 7–14 days before; credit for cancellations within 7 days. See the Cancellation Policy page for details.",
  },
  {
    question: "Do you accommodate dietary requirements?",
    answer:
      "Yes. Our kitchens prepare vegetarian, vegan, and Jain meals, and will happily accommodate allergies and preferences with advance notice.",
  },
];