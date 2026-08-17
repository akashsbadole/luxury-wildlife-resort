import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { headers } from "next/headers";
import { Toaster } from "@/components/ui/sonner";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

async function getMetadata(): Promise<Metadata> {
  const host = (await headers()).get("host") || "localhost:3000";

  return {
    metadataBase: new URL(`https://${host}`),
    title: "Tipeshwar | Luxury Forest Hotel & Retreat",
    description:
      "A luxury forest hotel where wilderness meets refined comfort. Discover suites, forest-to-table dining, wellness, and curated wildlife experiences in Maharashtra.",
      keywords: [
        "luxury forest hotel",
        "forest retreat",
        "nature experience",
        "premium suites",
        "forest dining",
        "wellness retreat",
        "wildlife sanctuary maharashtra",
        "eco-tourism",
      ],
    authors: [{ name: "Luxury Wildlife Retreat" }],
    openGraph: {
      title: "Tipeshwar | Luxury Forest Hotel & Retreat",
      description:
        "A luxury forest hotel where wilderness meets refined comfort. Discover suites, forest-to-table dining, wellness, and curated wildlife experiences in Maharashtra.",
      url: new URL(`https://${host}`),
      siteName: "Tipeshwar Forest Retreat",
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: "Luxury Wildlife Retreat - Premium Nature Experience",
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Luxury Wildlife Retreat | Premium Nature Experience",
      description:
        "Experience luxury in the heart of nature. Our premium wildlife retreat offers unique accommodations, breathtaking views, and unforgettable experiences in the wilderness.",
      images: ["/og-image.jpg"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const metadata = await getMetadata();

  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable}`}>
      <body className="font-sans" suppressHydrationWarning>
        <Toaster theme="dark" richColors position="top-right" />
        {children}
      </body>
    </html>
  );
}
